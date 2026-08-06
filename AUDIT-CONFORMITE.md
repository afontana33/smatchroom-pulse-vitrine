# Audit de conformité · pulse.smatchroom.com

> **Statut : Phase 0 · inventaire.** Aucune modification de code n'a été faite à ce stade.
> Document de travail interne. Les analyses juridiques qu'il contient sont des constats
> techniques, pas un avis juridique. Validation par un avocat requise avant mise en ligne
> des documents produits aux phases suivantes.

- **Périmètre** : dépôt `smatchroom-ecosystem/smatchroom-pulse` (Next.js, servi sur `127.0.0.1:3001`)
  + fichiers HTML statiques servis par nginx sous le même domaine.
- **Branche** : `feat/conformite-rgpd`
- **Date de l'inventaire** : 2026-08-06
- **Éditeur** : SMATCHROOM SAS · RCS Bordeaux 989 883 509 · NAF 62.01Z · 5 rue Fénelon, 33000 Bordeaux

---

## 0. Constat structurant : le site a deux sources de contenu

Ce point conditionne toutes les phases suivantes et n'était pas dans le brief.

`pulse.smatchroom.com` n'est pas servi par la seule application Next.js. Le vhost
`/etc/nginx/sites-available/pulse.smatchroom.com` intercepte quatre routes en `location = ...`
et les sert depuis des fichiers HTML statiques générés par pandoc, hébergés dans
`/var/www/elite-dev-kit/legal/` :

| Route publique | Servie par | Fichier réel | Sujet réel du document |
|---|---|---|---|
| `/mentions-legales` | nginx (statique) | `/var/www/elite-dev-kit/legal/mentions-legales.html` | SmatchRoom Pulse |
| `/cgv` | nginx (statique) | `/var/www/elite-dev-kit/legal/cgv.html` | **Élite Dev Kit uniquement** (99/399 € TTC) |
| `/privacy` | nginx (statique) | `/var/www/elite-dev-kit/legal/privacy.html` | **SmatchRoom App** (colocation, appli mobile) |
| `/support` | nginx (statique) | `/var/www/elite-dev-kit/legal/support.html` | **SmatchRoom App** (colocation, appli mobile) |
| `/confidentialite` | Next.js | `src/app/confidentialite/page.jsx` | SmatchRoom Pulse |

Conséquences immédiates :

1. **`src/app/cgv/page.jsx` existe dans le dépôt mais n'est jamais servi.** Cette page contient
   déjà des CGV orientées services B2B (« Article 1 — Objet et cadre strictement B2B »,
   « Article 7.1 Obligations de moyens »). Elle est masquée par la règle nginx `location = /cgv`.
   Le visiteur ne voit que les CGV Élite Dev Kit. Il existe donc **deux jeux de CGV contradictoires**
   dans le système, dont un invisible.
2. **`/privacy` et `/support` exposent, sous le domaine Pulse, la documentation d'un autre produit**
   (SmatchRoom App, colocation entre particuliers : Ghost Profiling™, permissions caméra/contacts,
   modération de profils). Un visiteur de Pulse qui atterrit sur `/privacy` lit une politique qui
   ne décrit pas le traitement dont il fait l'objet.
3. **Deux politiques de confidentialité coexistent sur le même domaine** (`/privacy` et
   `/confidentialite`) avec des contenus sans rapport l'une avec l'autre.
4. Les fichiers `/var/www/elite-dev-kit/legal/*.html` **n'ont pas de source versionnée retrouvée**
   sur la machine (`/root/elite-dev-kit/` n'existe pas). Toute correction devra soit recréer une
   source versionnée, soit basculer ces routes vers Next.js.

→ **Question ouverte n°1** (voir § 7).

---

## 1. Scripts tiers, pixels, balises et iframes

### 1.1 Traceurs actifs

| # | Traceur | Fichier · ligne | Mécanisme | Finalité présumée | Conditionné à un consentement ? |
|---|---|---|---|---|---|
| T1 | **Meta Pixel** (ID `1366680321464821`) | `src/app/layout.js:76-87` | `<Script id="meta-pixel" strategy="afterInteractive">` — charge `https://connect.facebook.net/en_US/fbevents.js`, puis `fbq('init', …)` et `fbq('track', 'PageView')` | Mesure d'audience publicitaire et retargeting Meta | **NON.** Se déclenche sur toutes les routes, y compris `/confidentialite`, dès le chargement |
| T2 | **Meta Pixel — variante `noscript`** | `src/app/layout.js:88-96` | `<img src="https://www.facebook.com/tr?id=…&ev=PageView&noscript=1">` | Même finalité, fallback sans JavaScript | **NON.** Requête HTTP émise au rendu du HTML, avant toute action utilisateur |
| T3 | **`facebook-domain-verification`** | `src/app/layout.js:40-44` | balise `<meta>` rendue côté serveur via `metadata.verification.other` | Vérification de propriété de domaine par Meta | Sans objet (balise inerte, ne déclenche aucune requête). Utile uniquement si T1/T2 sont conservés |
| T4 | **Elfsight** (widget d'avis Google) | `src/components/v5/AvisGoogle.jsx:32,76-84` | injection dynamique de `https://elfsightcdn.com/platform.js` via `useEffect` | Affichage du mur d'avis Google | **Inactif aujourd'hui** : `ELFSIGHT_APP_ID = ''` désactive l'injection. Code de chargement toujours présent → redevient un traceur tiers dès qu'un ID est renseigné |

**Vérification en production** (`curl https://pulse.smatchroom.com/`) : le HTML servi contient
bien `connect.facebook.net` et 4 occurrences de `facebook`. Aucune occurrence de `cookie`,
`consent`, `axeptio`, `didomi` ou `tarteaucitron`.

### 1.2 Non-traceurs (vérifiés, pas d'action requise)

| Élément | Fichier | Nature |
|---|---|---|
| `dangerouslySetInnerHTML` × 2 | `src/components/Article.jsx:60,66` | Injection de JSON-LD (`Article`, `FAQPage`) — données structurées SEO, aucune requête réseau |
| Polices Google (`Manrope`, `JetBrains_Mono`, `Bricolage_Grotesque`, `Instrument_Serif`) | `src/app/layout.js:2-31` | `next/font/google` : les fichiers sont **téléchargés au build et self-hostés**. Aucune requête vers `fonts.googleapis.com` à l'exécution |
| Calendly | 17 occurrences (`Nav.jsx`, `Footer.jsx`, `Pricing.jsx`, `v5/*.jsx`, pages `/artisans`, `/scale`, `/partenaires`, `/entrepreneurs`, `/grands-comptes`, `/entreprises`…) | **Lien externe `<a href target="_blank" rel="noopener">` uniquement. Aucun iframe, aucun script `assets.calendly.com`.** Pas de traceur au sens CNIL tant qu'il n'est pas embarqué. La page de destination pose ses propres traceurs, mais après clic délibéré et sur un domaine tiers |
| Bandeau leadb2b | `src/app/layout.js:62-71` | Lien interne écosystème, pas de traceur |

### 1.3 Cookies réellement déposés

Non encore mesuré navigateur ouvert (à faire en fin de mission, livrable n°5). Sur la base du code :

- **Meta Pixel** : dépose `_fbp` (cookie first-party, 90 jours) et lit `_fbc` si présent. Peut
  déclencher la lecture de cookies tiers `facebook.com` selon la configuration du navigateur.
- **Stripe** : le tunnel de paiement Élite Dev Kit est hébergé côté Stripe
  (`location = /webhook/stripe` proxy vers `127.0.0.1:3010`). Aucun `stripe.js` n'est chargé
  depuis le site Next.js. → **la mention « panier d'achat Stripe » des mentions légales décrit un
  cookie qui n'est pas déposé par ce site.**
- **Aucun cookie de session applicatif** : le site Next.js n'a ni authentification ni état serveur.

→ La phrase des mentions légales est donc **fausse dans les deux sens** : elle affirme un cookie
qui n'existe pas (session/panier) et nie un cookie qui existe (publicitaire).

---

## 2. Pages légales existantes

| Route | Source | Titre | État |
|---|---|---|---|
| `/mentions-legales` | statique nginx | « Mentions légales · SmatchRoom Pulse » | Éditeur, directeur de publication, hébergeur, PI, données personnelles, cookies, loi applicable. **Manque : téléphone éditeur, téléphone hébergeur. Section cookies fausse.** |
| `/cgv` | statique nginx | « CGV · SmatchRoom Pulse · Élite Dev Kit » | 15 articles, produits numériques uniquement, prix **TTC**. Renvoi ODR (art. 13) à supprimer. Art. 11 renvoie aux mentions légales |
| `/confidentialite` | Next.js | « Politique de Confidentialité » | 7 sections. Dernière mise à jour affichée : 18 juin 2026 |
| `/privacy` | statique nginx | « Politique de confidentialité · SmatchRoom App » | **Hors périmètre Pulse** |
| `/support` | statique nginx | « Support · SmatchRoom App » | **Hors périmètre Pulse** |
| `/cgu` | — | — | **Inexistante** (404 confirmé en production) |
| `/cgv-services` | — | — | **Inexistante** (404 confirmé en production) |
| `/politique-cookies` | — | — | **Inexistante** |
| `/transparence-ia` | — | — | **Inexistante** |

### 2.1 Écarts RGPD art. 13-14 sur `/confidentialite`

| Exigence | Présent ? | Constat |
|---|---|---|
| Identité du responsable de traitement | Partiel | § 1 : raison sociale + adresse. Pas de contact dédié aux données, pas de mention DPO/absence de DPO |
| Coordonnées de contact | Partiel | Un email au § 6 seulement |
| Finalités | Oui | § 3, mais formulées en 3 puces génériques |
| **Base légale par finalité** | **NON** | Aucune base légale n'est indiquée nulle part dans la page |
| **Durées de conservation chiffrées** | **NON** | § 4 : « pendant toute la durée de l'abonnement », aucun chiffre |
| Destinataires / sous-traitants | **NON** | Aucune liste. § 7 cite « Stripe, serveurs cloud sécurisés » |
| **Transferts hors UE** | **NON** | § 7 : « conformes aux standards de sécurité en vigueur ». Aucun mécanisme de garantie (CCT / DPF) |
| Droits : accès, rectification, effacement | Oui | § 6 |
| **Droits : limitation, opposition, portabilité, retrait du consentement, directives post-mortem** | **NON** | Absents |
| **Réclamation CNIL** | **NON** | Absent de cette page (présent uniquement dans les mentions légales) |
| Modalités et délai de réponse | **NON** | Absents |
| **Article 14 (données non collectées auprès de la personne)** | **NON** | Aucune section pour les personnes prospectées par les agents |
| **Distinction responsable / sous-traitant** | Partiel | § 2 mentionne « en tant que sous-traitant » dans une puce. Les deux régimes ne sont pas séparés |
| Décision automatisée / profilage | **NON** | Absent |
| Date de mise à jour | Oui | 18 juin 2026 |

### 2.2 Contradictions entre pages

| # | Mentions légales | Politique de confidentialité | Réalité constatée |
|---|---|---|---|
| C1 | « Aucun cookie de tracking publicitaire n'est déposé » | (muette) | Meta Pixel actif sur toutes les routes |
| C2 | Sous-traitants : Stripe, Google Workspace, Hostinger | « Stripe, serveurs cloud sécurisés » | Liste incomplète des deux côtés : manquent Meta, Calendly, le fournisseur de modèle IA, l'infrastructure d'envoi WhatsApp/email |
| C3 | Durées : 10 ans comptable / 3 ans prospection | « durée de l'abonnement » | Deux régimes différents énoncés pour les mêmes données |
| C4 | Droits : accès, rectification, effacement, opposition, portabilité | Droits : accès, rectification, effacement | Deux listes différentes sur le même site |
| C5 | Réclamation CNIL présente | Absente | — |
| C6 | Finalités : « gestion commerciale, facturation, support client, **envoi du contenu acheté**, communication produit » (vocabulaire Élite Dev Kit) | Finalités : exécution du contrat agent IA, amélioration des algorithmes, sécurité | Les deux pages décrivent deux activités différentes |

---

## 3. Formulaires du site

**Aucun formulaire de collecte de données n'existe sur le site Next.js.**

| Élément | Fichier | Nature | Données collectées |
|---|---|---|---|
| `<input>` du laboratoire interactif | `src/components/InteractiveLab.jsx:301` | Champ de démonstration côté client. Ne transmet rien à un serveur | Aucune (état React local) |
| Lien `mailto:` | `src/app/grands-comptes/page.jsx:317` | Ouvre le client mail du visiteur | Aucune côté site |
| Calendly | 17 emplacements | Collecte hors site (nom, email, créneau) sur `calendly.com` | Traitées par Calendly, puis par SMATCHROOM en tant que responsable |

**Conséquence pour la Phase 3** : l'exigence « lien vers la politique de confidentialité au pied
de chaque formulaire » n'a pas de cible sur ce site. Le point de collecte réel est le clic vers
Calendly. → **Question ouverte n°6.**

---

## 4. CMP (bandeau cookies)

**Aucun.**

- Aucune dépendance CMP dans `package.json`.
- Aucune occurrence de `cookie`, `consent`, `axeptio`, `didomi`, `tarteaucitron`, `cookiebot`
  dans `src/`.
- Aucune occurrence de ces termes dans le HTML servi en production.
- Aucun mécanisme de conservation ni de révocation d'un choix.
- Aucun lien « Gérer mes cookies » dans le footer.

Le Meta Pixel se déclenche donc sans information préalable ni recueil de consentement, sur
l'intégralité du site.

---

## 5. Allégations marketing à caractère juridique ou de conformité

### 5.1 Allégations absolues (à reformuler — Phase 6)

| # | Texte | Fichier · ligne | Visible où | Problème |
|---|---|---|---|---|
| A1 | **« Sécurité absolue »** (titre de pilier) | `src/components/v5/TechDiff.jsx:23` | Home, section « Sous le capot » | Allégation d'absolu invérifiable |
| A2 | « Cadence de prospection lissée pour protéger vos adresses et vos numéros. **Conformité stricte RGPD et CNIL.** » | `src/components/v5/TechDiff.jsx:24` | Home, « Sous le capot » | Auto-déclaration de conformité présentée comme un fait |
| A3 | « Nous gérons **100 %** de la technique » | `src/components/v5/TechDiff.jsx:19` | Home, « Sous le capot » | Chiffre absolu. Portée opérationnelle et non juridique, mais à revoir par cohérence |
| A4 | **« Infrastructure conforme RGPD** et protection stricte de vos données. » | `src/components/About.jsx:13` | Home, section « À propos » (pilier « Sécurité ») | Auto-déclaration de conformité |
| A5 | « **Conformité & RGPD** — Prospection B2B respectant l'intérêt légitime et la CNIL. » | `src/components/Pillars.jsx:79-81` | **Aucune** — composant non importé (code mort, vérifié par `grep -rl Pillars src/`) | À corriger ou supprimer, selon la décision sur le composant |
| A6 | « Mêmes 48h, même **garantie** de mise en production. » | `src/components/Pillars.jsx:145` | Aucune (idem A5) | Engagement de résultat |
| A7 | « notamment concernant la **garantie de déploiement sous 48h** » | `src/app/entrepreneurs/page.jsx:196` | `/entrepreneurs` | Engagement de résultat, non encadré contractuellement (aucunes CGV Services n'existent) |

### 5.2 Allégations sur les avis

| # | Texte | Fichier · ligne | Problème |
|---|---|---|---|
| B1 | « **Avis vérifiés sur notre fiche Google** » + note « **5,0** » | `src/components/v5/AvisGoogle.jsx:124` et `RATING` ligne 44 | Art. L.111-7-2 C. conso : information sur le traitement des avis requise (origine, contrôle éventuel, date). **Aggravant : `AVIS = []`** — la note 5,0 et la mention « avis vérifiés » sont affichées **sans qu'aucun avis ne soit présenté**, et `RATING.count` est `null` (le nombre d'avis n'est pas indiqué) |
| B2 | « Avis vérifiés sur Google » | `src/components/GoogleReviews.jsx:62` | Composant non monté sur la home v5 — à vérifier avant correction |
| B3 | « Source vérifiée et cliquable (simulée) » | `src/components/InteractiveLab.jsx:216` | Correctement marqué « simulée ». Pas d'action |

### 5.3 Logos et témoignages clients — autorisations à obtenir

Aucun logo n'est supprimé à ce stade. Tableau de suivi à compléter par SMATCHROOM.

| Entité citée | Emplacement | Forme | Exposition | Autorisation écrite | Statut |
|---|---|---|---|---|---|
| Tryba | `src/components/TrustedBy.jsx:2` | Nom en marquee | **Élevée** — « Tryba » est une marque nationale et un réseau de franchise. Le client réel est *Isolation by Tryba (Landes)*, un franchisé, pas le groupe. Citer « Tryba » seul laisse croire à une référence groupe | À obtenir | ☐ |
| BatInnov | `TrustedBy.jsx:2` | Nom en marquee | Moyenne | À obtenir | ☐ |
| JB Pilotage & Stratégie | `TrustedBy.jsx:2` | Nom en marquee | Moyenne | À obtenir | ☐ |
| NextMove | `TrustedBy.jsx:2` | Nom en marquee | Moyenne — orthographe à vérifier (NextMove SAS, avec T) | À obtenir | ☐ |
| HDS Solutions | `TrustedBy.jsx:2` | Nom en marquee | **Élevée** — l'agent chasseur HDS a été suspendu (numéro WhatsApp banni le 13/07/2026). Vérifier que la relation commerciale est active | À obtenir | ☐ |
| Ets Duvernell | `TrustedBy.jsx:3` | Nom en marquee | Moyenne — même dossier que HDS Solutions | À obtenir | ☐ |
| DTR Service | `TrustedBy.jsx:3` | Nom en marquee | Faible — client actif | À obtenir | ☐ |
| Habitat Multi Services | `TrustedBy.jsx:3` | Nom en marquee | **Élevée** — d'après l'état interne, l'agent n'a jamais été mis en production (code prêt, non lancé). Une référence affichée sans prestation réalisée est une allégation trompeuse au sens de l'art. L.121-2 C. conso | À obtenir + **vérifier la réalité de la prestation** | ☐ |
| « **Mathieu · Isolation by Tryba** » | `src/components/v5/SocialProof.jsx:20` | Témoignage nominatif + chiffre (12 partenaires, 5 demandes de devis) | **Très élevée** — personne physique identifiable + données chiffrées. Consentement écrit indispensable (droit à l'image / usage du nom + exactitude du chiffre) | À obtenir | ☐ |
| « **Antoine D. · Nettoyage B2B** » | `SocialProof.jsx:30` | Témoignage semi-anonymisé + chiffre (3 contrats en 45 j) | **Élevée** — l'initiale ne suffit pas à écarter l'identification dans un marché local | À obtenir | ☐ |

**Les trois plus exposés, par ordre : Habitat Multi Services (prestation possiblement non réalisée),
« Mathieu · Isolation by Tryba » (personne nommée + chiffres), Tryba (marque de réseau utilisée
pour une référence de franchisé).**

### 5.4 Chiffres de résultats — justificatifs DGCCRF

Note interne : tout chiffre affiché doit pouvoir être justifié sur demande de la DGCCRF
(art. L.121-2 et L.121-3 du Code de la consommation — pratique commerciale trompeuse ;
la charge de la preuve de l'exactitude des allégations pèse sur le professionnel).

| Chiffre | Fichier · ligne | Daté ? | Périmètre défini ? | Risque |
|---|---|---|---|---|
| « **+90** artisans & entreprises accompagnés » | `src/components/TrustedBy.jsx:14-16` | **Non** | **Non** — « accompagnés » n'est pas défini (clients payants ? prospects contactés ? destinataires d'un message d'agent ?). À rapprocher des 8 clients nommés juste en dessous | **Élevé** : l'écart entre 8 noms et « +90 » est visible à l'œil nu |
| « **12** partenaires apporteurs d'affaires verrouillés » + « 5 demandes de devis » | `src/components/v5/SocialProof.jsx:21-23` | **Non** | Partiel (un client) | Moyen — justificatif à conserver côté client |
| « **3** contrats d'entretien récurrents signés » / « en moins de 45 jours » | `SocialProof.jsx:31-33` | **Non** | Partiel | Moyen |
| « **+300** décideurs contactés par semaine » | `SocialProof.jsx:41-42` | **Non** | **Non** — quel client, quelle période, quelle définition de « contacté » | **Élevé** |
| Note Google « **5,0** » sans nombre d'avis | `src/components/v5/AvisGoogle.jsx:44` | Non | Non | Élevé (cf. B1) |
| « déployé en **48h** » | `PricingV5.jsx:31`, `Timeline48h.jsx`, `layout.js:36`, `FAQ.jsx:32-33`, `/entrepreneurs:196` | Sans objet | **Non** — point de départ du délai jamais défini | **Élevé** : promesse répétée, présentée comme « garantie » sur `/entrepreneurs`, et **absente de tout document contractuel** puisqu'aucunes CGV Services n'existent |

### 5.5 Incohérences tarifaires

| Emplacement | Prix affiché |
|---|---|
| Home `/` (`v5/PricingV5.jsx:26-28,44-48`) | Setup **300 € HT** + **190 € HT/mois** ; « Total 1er mois : 490 € HT » |
| `/entrepreneurs:163` | « **500 € HT** » |
| `src/components/Pricing.jsx:11` (composant v4, non monté sur la home) | Setup 290 € + 129 €/mois, par agent |
| `/cgv` (Élite Dev Kit) | 99 € **TTC** / 399 € **TTC** |

Les mentions « HT » sont présentes sur la home. Le mélange HT (services) / TTC (produits
numériques) est juridiquement correct pris isolément — le TTC est obligatoire pour une vente
susceptible de toucher un consommateur — mais **aucune page n'explique cette différence**, et le
prix de `/entrepreneurs` (500 € HT) ne se raccroche à aucune grille.

→ **Question ouverte n°7.**

### 5.6 Autre

- `src/app/cgv/page.jsx:14` affirme : « le client reconnaît qu'en tant que professionnel, le Code
  de la consommation ne s'applique pas ». Formulation trop large : certaines dispositions du Code
  de la consommation s'appliquent aux professionnels. Page actuellement non servie, mais à corriger
  si elle est réactivée.
- Marques : « SmatchRoom », « SmatchRoom Pulse », « SmatchRoom Pro », « Émargeo », « Prospector X »
  déclarées « déposées ou en cours de dépôt » (mentions légales). Statut réel non vérifiable depuis
  le dépôt. → **Question ouverte n°5.**
- Cinq pages n'affichent aucun footer, donc **aucun lien vers les mentions légales, la politique de
  confidentialité ou les CGV** : `/partenaires`, `/entreprises`, `/entrepreneurs`, `/scale`,
  `/artisans`. Manquement art. 6 III LCEN sur ces pages.
- `sitemap.js` ne référence aucune page légale.

---

## 6. À modifier côté agents (hors de ce dépôt) — Phase 5

Le code des agents de prospection ne se trouve pas dans ce dépôt. Les répertoires concernés sur la
machine sont notamment `/root/agent-chasseur/` (moteur générique multi-clients),
`/root/smatchroom-ecosystem/prospector-x/`, `/root/aideetfeu-prospector/`. À traiter dans un
chantier distinct.

| # | Obligation | Fondement | À implémenter |
|---|---|---|---|
| P1 | Le destinataire doit savoir qu'il interagit avec un système d'IA dès la première interaction | Règlement (UE) 2024/1689 (AI Act), art. 50 — **applicable depuis le 2 août 2026**, non reporté par le Digital Omnibus | Mention d'identification automatisée dans le **premier message de chaque séquence**, tous canaux (WhatsApp, email) |
| P2 | Information art. 14 RGPD (données non collectées auprès de la personne) | RGPD art. 14 | Identité du responsable, finalité, catégories de données, **source des données** (INSEE/Sirene, INPI, sources publiques), durée, droits, réclamation CNIL. Texte de référence à produire en Phase 7 (`legal/mention-article-14.md`) |
| P3 | Droit d'opposition exerçable « en un geste » | RGPD art. 21 §2 (opposition sans motif à la prospection) | Opt-out en un clic / une réponse (`STOP`), traité automatiquement, avec blocage définitif en base |
| P4 | Escalade vers un humain | AI Act art. 50 + bonne pratique | Canal humain identifié et joignable indiqué dans le message |
| P5 | Segmentation personnes morales / personnes physiques | Art. L.34-5 CPCE + doctrine CNIL | Les artisans, auto-entrepreneurs et EI sont des **personnes physiques**. Régime de consentement préalable, pas d'opposition. À qualifier en base avant envoi. Note à produire en Phase 7 (`legal/checklist-prospection.md`) |
| P6 | Registre des opt-out et des refus | RGPD art. 5 §2 (responsabilité) | Table dédiée, partagée entre tous les agents et tous les clients |

---

## 7. Questions ouvertes — décision requise avant la Phase 1

| # | Question | Pourquoi je ne peux pas trancher |
|---|---|---|
| **1** | **Que fait-on des routes nginx statiques ?** (a) rapatrier `/mentions-legales` et `/cgv` dans Next.js et retirer les `location =` du vhost ; (b) continuer à éditer les HTML pandoc dans `/var/www/` sans source versionnée ; (c) autre. Et que fait-on de `/privacy` et `/support`, qui documentent SmatchRoom App sous le domaine Pulse ? | Décision d'architecture + intervention sur nginx en production. La recommandation est (a), mais elle touche la prod |
| **2** | **Pixel Meta : option A (retrait) ou option B (consentement) ?** | Décision commerciale. Rien ne sera codé en Phase 1 avant ta réponse |
| **3** | Si option B : CMP auto-hébergé (Tarteaucitron) ou SaaS (Axeptio / Didomi) ? Je te présenterai les implications des deux | Coût, RGPD du CMP lui-même, charge de maintenance |
| **4** | **Numéro de téléphone de l'éditeur** (obligatoire, art. 6 III LCEN) et **numéro de Hostinger** — je ne les invente pas. Aucun numéro n'est présent dans le dépôt | Donnée factuelle absente |
| **5** | **Statut réel de chaque marque** : « SmatchRoom », « SmatchRoom Pulse », « SmatchRoom Pro », « Émargeo », « Prospector X ». Déposée (n° INPI + date) / en cours / ni l'un ni l'autre ? | Affirmer un dépôt inexistant est un risque. Non vérifiable depuis le dépôt |
| **6** | Il n'y a **aucun formulaire** sur le site. Où veux-tu la mention de confidentialité exigée en Phase 3 : sous les CTA Calendly ? Une mention dans le footer suffit-elle ? | Le brief suppose des formulaires qui n'existent pas |
| **7** | Le prix « **500 € HT** » de `/entrepreneurs` ne correspond à aucune grille (home : 300 € setup + 190 €/mois). Lequel fait foi ? Et le composant `Pricing.jsx` (290 € + 129 €/mois par agent, non monté) doit-il être supprimé ? | Décision commerciale |
| **8** | **Le tableau de bord client de la FAQ existe-t-il en ligne, et à quelle URL ?** Nécessaire pour décider s'il faut des CGU (Phase 2.3) | Aucun lien vers un dashboard dans le dépôt |
| **9** | **Promesse 48h** : quel est le point de départ du délai (signature ? réception des accès ? paiement du setup ?), et que se passe-t-il en cas de dépassement ? Indispensable pour l'encadrer dans les CGV Services | Engagement commercial, à définir par toi |
| **10** | **Habitat Multi Services** figure parmi les logos alors que, d'après l'état interne, l'agent n'a jamais été mis en production. Prestation réellement réalisée ou non ? | Fait commercial |
| **11** | **Sur quoi reposent les « +90 artisans & entreprises accompagnés »** et les « +300 décideurs contactés par semaine » ? Définition et période, pour pouvoir dater et périmétrer les chiffres | Justificatif DGCCRF à produire par toi |
| **12** | **Liste des sous-traitants à confirmer** : fournisseur de modèle IA (Anthropic ?), infrastructure WhatsApp (Green API ?), routage email (SMTP / Gmail API ?), hébergement Supabase (région ?). Je ne les inscris pas dans la politique de confidentialité sans confirmation | Une liste de sous-traitants doit être exacte et exhaustive |
| **13** | **Case de renoncement au droit de rétractation** décrite à l'art. 7.2 des CGV Élite Dev Kit : existe-t-elle réellement dans le tunnel Stripe ? Je peux le vérifier en lecture seule via l'API Stripe si tu m'y autorises (clé en mode **LIVE**) | Vérification en dehors du dépôt. Si la case n'existe pas, la clause est inopposable |
| **14** | **Médiateur CNPM** : agrément CECMC valable 3 ans. À vérifier de ton côté que l'adhésion et l'agrément sont en cours de validité | Vérification externe |

---

## 8. Points relevant d'un avocat plutôt que d'une correction technique

À consolider en fin de mission. Premiers éléments :

1. Qualification exacte des rôles responsable de traitement / sous-traitant selon les prestations
   (le sourcing de données par SMATCHROOM pour son client relève d'une analyse au cas par cas).
2. Base légale de la prospection vers des personnes physiques exerçant en nom propre (artisans,
   auto-entrepreneurs, EI) — point n°5 du § 6.
3. Rédaction définitive du DPA et de la clause de responsabilité / plafond.
4. Opposabilité de la clause d'exclusion du droit de rétractation (§ 7 des questions ouvertes).
5. Statut de fournisseur et/ou déployeur au sens de l'AI Act, et obligations qui en découlent.
6. Formulation des allégations de conformité acceptables en communication commerciale.

---

## 9. Journal des phases

| Phase | Objet | Statut |
|---|---|---|
| 0 | Inventaire | ✅ Fait — en attente de validation |
| 1 | Traceurs et cookies | ⏸ Bloquée : questions 2 et 3 |
| 2 | CGV Services + CGU | ⏸ Bloquée : questions 1, 7, 8, 9 |
| 3 | Politique de confidentialité | ⏸ Bloquée : question 12 |
| 4 | Mentions légales | ⏸ Bloquée : questions 1, 4, 5 |
| 5 | Transparence IA | ⏸ À faire |
| 6 | Allégations marketing | ⏸ Bloquée : questions 10, 11 |
| 7 | Documents `legal/` | ⏸ À faire |
| 8 | Nettoyage CGV Produits | ⏸ Bloquée : questions 1, 13, 14 |
