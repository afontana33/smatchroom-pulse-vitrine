# Refonte pulse.smatchroom.com — Focus BTP / Artisans du bâtiment

Date : 2026-07-02
Repo : `smatchroom-ecosystem/smatchroom-pulse` (Next.js 16, App Router, R3F, Framer Motion)
Statut : design validé, en attente de revue spec avant plan d'implémentation

## 1. Objectif

Repositionner le site marketing Pulse sur **une seule niche : l'artisan du bâtiment (BTP)**,
avec une identité visuelle **moderne, dynamique et ostensiblement tech** (« on vend des
agents IA, le site doit prouver qu'on maîtrise le code et l'IA »).

Direction visuelle retenue : **Atelier Tech / Terminal-BTP**.

## 2. Positionnement & narratif

- Cible unique : artisans du bâtiment (couvreurs, maçons, menuisiers, plombiers,
  électriciens, chauffagistes, ITE / rénovation énergétique).
- Promesse : *« Des agents IA qui bossent pour le bâtiment. Relance de devis,
  qualification de leads, prise de RDV — pendant que vous êtes sur le chantier. »*
- La crédibilité technique est **dans le discours et le visuel**, pas en annexe :
  déployé en 48h sur votre infra, Node.js + Supabase + WhatsApp, agents autonomes 24/7.
- Vocabulaire BTP concret partout (devis, chantiers, relance clients, métiers du bâtiment).

## 3. Périmètre

**Dans le périmètre**
- Réécriture de la copy de toutes les sections de la home vers la cible BTP unique.
- Reskin visuel complet (tokens couleur, typo display, motifs terminal/code).
- Suppression du double parcours « Entreprises & Agences / sur-mesure ».
- Refonte de la section Pricing en grille « Agents à l'unité » (cf. §6).

**Hors périmètre (ne pas toucher)**
- Le blog / SEO engine (`src/seo-engine/`, contenu MDX) — inchangé.
- Le déploiement pm2/nginx — aucun redémarrage prod sans validation explicite.
- Les autres filiales / le hub 3D.

## 4. Système visuel

Le site utilise déjà un système de tokens propre (`src/app/globals.css` : variables
`:root` + `@theme inline`). Le reskin passe essentiellement par ces variables.

- **Palette** : bascule violet → **orange haute-visibilité**.
  - `--background` : quasi-noir béton (`#0B0B0D`, actuel `#050508` conservable).
  - `--primary` : orange haute-viz (~`#FF5A1F`) ; `--primary-hover`, `--primary-soft`,
    `--primary-glow`, `--border*` recalés sur l'orange.
  - Jaune signal secondaire réservé aux accents « live » (statuts, badges).
  - Réserver l'orange aux CTA et accents ; le reste reste graphite/blanc cassé.
- **Typo** : conserver **JetBrains Mono** (motifs code/terminal, eyebrows, labels).
  Titres : display grotesk massive et serrée (ajouter une police display via
  `next/font`, ex. une grotesk condensée) ; Inter conservé pour le corps de texte.
- **Motifs signature** :
  - Panneaux « terminal live » : log qui s'écrit (`> agent.relance(devis#402) ✓`,
    `> lead qualifié : couvreur`), curseur clignotant, badges de statut colorés.
  - Objet **3D** conservé au hero (composant R3F `Hero3D`, restylé aux nouvelles couleurs).
  - Grille technique discrète en fond, animations au scroll (Framer Motion déjà présent).
- Mettre à jour les utilitaires CSS liés au violet : `.glow-text`, `.gradient-text`,
  `.glass-hover`, la scrollbar, les `radial-gradient` de fond du `body`.

## 5. Structure de page (squelette conservé, copy + reskin)

Source de vérité : `src/app/page.js`. Sections dans l'ordre actuel :

| Section (composant) | Transformation |
|---|---|
| `Nav` | Reskin sombre/orange, CTA « Réserver un créneau » (Calendly) |
| `Hero` | Titre BTP + panneau terminal live + 3D restylé. **Suppression des 2 cartes « Espace Entreprises » / « Espace Artisans »** → un seul parcours, un seul CTA |
| `TrustedBy` | Orienté « déjà en production » chez des artisans BTP |
| `Manifesto` | Réécrit : le temps de l'artisan est sur le chantier, pas dans l'administratif |
| `Pillars` | Les moteurs propriétaires présentés comme outils métier bâtiment, accent code |
| `Process` | « De zéro à prod en 48h » façon pipeline / étapes terminal |
| `UseCases` | Cas concrets BTP : relance devis, tri des leads entrants, RDV chantier |
| `Pricing` | Refonte totale → grille « Agents à l'unité » (§6). Suppression des blocs actuels « Audit & CTO Externe » / « Forfait Build Freelance Senior » et « Transparent pour les commerces / Souverain pour les entreprises » |
| `FAQ` | Questions d'artisans (données, WhatsApp, engagement, RGPD) |
| `ContactCTA` | Parcours unique BTP. **Retirer le choix « Je suis un commerce » / « Je suis une entreprise »** |
| `Footer` | Reskin |

## 6. Pricing — « Les Agents à l'unité »

Grille remplaçant intégralement le contenu de `src/components/Pricing.jsx`.

| Collaborateur numérique | Rôle principal | Setup | Abonnement / mois |
|---|---|---|---|
| **Le Chasseur** | Prospection de partenaires B2B (syndics, agences…) | 490 € | 190 € |
| **L'Acheteur** | Analyse et comparaison des prix fournisseurs / devis | 490 € | 190 € |
| **Le Gestionnaire** | Suivi et relance des devis en attente | 390 € | 190 € |
| **Le Visiteur** | Optimisation SEO local et réponses aux avis Google | 290 € | 149 € |
| **L'Accueil 24/7** | Prise en charge et qualification des leads entrants | 290 € | 149 € |
| **Le Contrôleur** | Vérification conformité, attestations URSSAF / Décennales | 290 € | 129 € |

**Offre à afficher** : sur les packs ou agents à 490 € de setup, possibilité de payer
**290 € pendant 20 jours puis 200 €** ; tous les abonnements démarrent **le mois suivant**.

> Interprétation à confirmer : le setup 490 € peut être étalé en 290 € (couvrant les
> 20 premiers jours) + 200 € ensuite, et la mensualité (MRR) ne court qu'à partir du
> mois suivant la mise en service. La formulation exacte du bloc offre sera validée
> au rendu.

Tous les CTA pointent vers Calendly : `https://calendly.com/a-fontana-smatchroom/30min`.

## 7. Points à confirmer au rendu

1. Formulation exacte du bloc « offre » (§6).
2. Liste précise des métiers BTP à nommer dans le Hero / UseCases.
3. Ajout d'une police display grotesk (choix de la fonte) vs conserver Inter en plus lourd.

## 8. Non-goals

- Pas de refonte de la structure de navigation ni d'ajout de nouvelles pages.
- Pas de modification du blog ni du moteur SEO.
- Pas de déploiement automatique : build validé en local, mise en prod sur validation.
