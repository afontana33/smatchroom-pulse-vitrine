# Régime applicable à la prospection selon la cible

> ⚠ **NOTE INTERNE — BROUILLON. NE PAS METTRE EN ŒUVRE AVANT VALIDATION PAR UN AVOCAT
> SPÉCIALISÉ EN DONNÉES PERSONNELLES.**
>
> Ce document est une analyse technique produite en interne, pas un avis juridique. Il porte sur
> le point le plus exposé de l'activité : une part importante des cibles des agents (artisans,
> auto-entrepreneurs, entreprises individuelles) sont juridiquement des **personnes physiques**, ce
> qui change le régime applicable. Si l'analyse ci-dessous est exacte, une partie des envois
> actuels repose sur une base légale qui ne tient pas.
>
> Ce point doit être arbitré avant toute nouvelle campagne.

---

## 1. Le partage qui compte

La distinction pertinente n'est pas « B2B contre B2C ». C'est **personne morale contre personne
physique**.

| Cible | Nature juridique | Régime de prospection |
|---|---|---|
| SARL, SAS, SA, SCI, association | Personne morale | Opposition (opt-out) |
| Salarié joint sur son adresse professionnelle nominative (`prenom.nom@societe.fr`) | Personne physique, mais dans un cadre professionnel | Opposition, si l'objet du message est en rapport avec ses fonctions |
| Adresse générique (`contact@`, `devis@`) | Rattachée à la personne morale | Opposition |
| **Entreprise individuelle, auto-entrepreneur, micro-entrepreneur** | **Personne physique** | **Consentement préalable** |
| **Artisan inscrit en nom propre** | **Personne physique** | **Consentement préalable** |
| **Profession libérale en exercice individuel** | **Personne physique** | **Consentement préalable** |
| Numéro de téléphone mobile personnel, même utilisé professionnellement | Donnée personnelle | Consentement préalable, et vérification Bloctel pour la prospection téléphonique |

**Fondement** : article L.34-5 du code des postes et des communications électroniques. La
prospection directe par courrier électronique, télécopie ou automate d'appel vers une **personne
physique** suppose son consentement préalable, sauf si elle est déjà cliente pour un produit ou
service analogue et que le moyen de refuser lui a été offert lors de la collecte.

La doctrine de la CNIL admet l'intérêt légitime pour la prospection B2B **à destination des
personnes morales**, et pour joindre un professionnel sur ses coordonnées professionnelles dès lors
que le message est en rapport avec ses fonctions. Elle ne l'admet pas pour un entrepreneur
individuel démarché sur ses coordonnées propres.

---

## 2. Conséquence concrète pour les agents

Les secteurs actuellement ciblés (couverture, isolation, menuiserie, plomberie, garages,
formation, comptabilité, courtage) comportent une **forte proportion d'entreprises individuelles**.
Aujourd'hui, rien dans la base ne permet de les distinguer avant l'envoi.

**Ce qu'il faut mettre en place, dans l'ordre :**

1. **Qualifier chaque cible en base.** La catégorie juridique est disponible gratuitement dans la
   base Sirene de l'INSEE (champ `categorieJuridiqueUniteLegale`). Les codes `1000` correspondent
   aux personnes physiques (entrepreneurs individuels). Tous les autres codes correspondent à des
   personnes morales.
2. **Ajouter une colonne `nature_juridique`** (`personne_morale` / `personne_physique` / `inconnu`)
   sur la table des cibles, et l'alimenter au moment du sourcing.
3. **Bloquer l'envoi pour `personne_physique` et pour `inconnu`.** Échouer en refus : une cible
   dont on ne sait pas la qualifier ne doit pas être contactée. C'est la même règle que celle
   appliquée à l'appariement d'identité.
4. **Qualifier également l'adresse** : une adresse générique (`contact@`, `info@`, `devis@`,
   `accueil@`) rattachée à une personne morale reste dans le régime de l'opposition, même si
   l'entreprise est petite. Une adresse nominative rattachée à une entreprise individuelle ne l'est
   pas.
5. **Séparer les numéros de téléphone** : ligne fixe d'établissement contre mobile. Un mobile n'est
   pas présumé professionnel.
6. **Vérifier Bloctel** pour toute prospection téléphonique vocale vers des personnes physiques.
   `[[À COMPLÉTER : SMATCHROOM effectue-t-elle de la prospection téléphonique vocale ? Si oui, une
   inscription auprès de l'organisme gestionnaire de Bloctel est obligatoire]]`

---

## 3. Ce qui reste valable dans tous les cas

Quelle que soit la nature de la cible :

- **Information au titre de l'article 14** : voir `mention-article-14.md`.
- **Mention du caractère automatisé** : article 50 du règlement (UE) 2024/1689.
- **Droit d'opposition absolu** : article 21.2 du RGPD. Il n'a pas à être motivé et ne se discute
  pas, y compris pour les personnes morales représentées par une personne physique identifiée.
- **Liste d'opposition commune** à tous les agents et tous les clients, consultée avant chaque
  envoi.
- **Minimisation** : ne collecter que ce qui sert la finalité. Pas de collecte « au cas où ».
- **Traçabilité** : conserver la source de chaque donnée et la date de collecte, pour pouvoir
  répondre à une demande d'accès.

---

## 4. Pistes pour les personnes physiques

Si l'analyse ci-dessus est confirmée, contacter un artisan en nom propre par message automatisé
suppose l'une des voies suivantes. **Aucune ne doit être mise en œuvre avant validation.**

| Voie | Description | Réserve |
|---|---|---|
| Consentement préalable | Recueil via un formulaire, un salon, un contenu téléchargeable, avec preuve horodatée | Volume faible, sans rapport avec l'échelle actuelle |
| Relation client préexistante | Prospection admise pour un produit analogue si le moyen de refuser a été offert lors de la collecte | Ne concerne que les clients existants |
| Canaux hors L.34-5 | Le courrier postal et le contact téléphonique en direct par un humain ne relèvent pas du même régime | Change le modèle opérationnel |
| Réorientation du ciblage | Concentrer les agents sur les personnes morales, majoritaires chez les cibles de taille moyenne (syndics, agences, promoteurs, gestionnaires de parcs) | Réduit le volume adressable mais sécurise le régime |

---

## 5. Questions à poser à l'avocat

1. La qualification personne physique / personne morale telle qu'exposée en section 1 est-elle
   exacte, et le code `1000` de la base Sirene est-il un critère de tri suffisant ?
2. Un dirigeant de SARL joint sur `prenom.nom@societe.fr` relève-t-il bien du régime d'opposition,
   même lorsque le message est généré par une IA ?
3. Le volume et la nature de la prospection actuelle imposent-ils une analyse d'impact au sens de
   l'article 35 du RGPD ?
4. La mention courte utilisée en messagerie instantanée suffit-elle au regard de l'article 14, ou
   faut-il un renvoi cliquable systématique ?
5. Quelles conséquences tirer des campagnes déjà envoyées à des personnes physiques sans
   consentement préalable ? Faut-il une régularisation, une information a posteriori, une purge ?
6. La qualification de SMATCHROOM comme fournisseur et déployeur au sens du règlement sur l'IA
   emporte-t-elle d'autres obligations que celles de l'article 50 ?

---

## 6. Rappel d'incidents pertinents

- **13 juillet 2026** : deux numéros WhatsApp bannis après envoi automatisé depuis des lignes
  neuves. Au-delà du sujet anti-ban, un bannissement de plateforme signale une pratique que
  l'opérateur qualifie d'abusive, ce qui affaiblit l'argument de l'intérêt légitime.
- **31 juillet 2026** : incident d'appariement d'identité (message adressé à un contact dont le
  nom n'était pas prouvé). La règle retenue depuis, échouer en refus plutôt qu'écrire au hasard,
  est la même que celle proposée au point 3 de la section 2.
