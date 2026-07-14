# Refonte Pulse v4 — modernisation + palier Grands Comptes

Date : 2026-07-14
Statut : validé (en attente go implémentation)

## Objectif

Moderniser `pulse.smatchroom.com` (refonte visuelle marquée), affirmer le
double positionnement **artisans du bâtiment** ET **entreprises (PME/ETI)**,
conserver la grille tarifaire actuelle, passer la preuve sociale à **+90**, et
ajouter un **palier premium « Agent Chasseur Grands Comptes »** (1 800 € HT
setup + 490 € HT/mois) destiné aux PME/ETI qui veulent décrocher des grands
comptes (industrie & BTP) — pas aux grands groupes eux-mêmes.

## Décisions cadrées avec le user

1. **Redesign** : refonte visuelle marquée (nouvelle direction, pas simple refresh).
2. **Direction art** : **thème clair / premium** (PAS un site dark). Objectif : un site qui
   « monte » la technologie SmatchRoom et démontre une maîtrise haut de gamme de l'IA — registre
   Linear / Vercel / Framer : clair, aéré, typographie premium, profondeur douce, micro-interactions
   soignées, accents technologiques maîtrisés.
3. **Grands Comptes** : bloc premium sur la homepage **+ page dédiée** `/grands-comptes`.
4. **Preuve sociale** : `+90 · Artisans & entreprises du bâtiment`.
5. Cible du palier Grands Comptes = « hors grand groupes » (PME/ETI qui chassent des grands comptes).

## Double audience, une seule identité

| Audience | Offre | Traitement visuel |
|----------|-------|-------------------|
| Artisans & TPE bâtiment | Les 6 agents à l'unité (tarifs inchangés) | Orange énergique, concret chantier |
| PME / ETI | Agent Chasseur Grands Comptes 1 800 € + 490 €/mois | Traitement premium : graphite profond, platine, accent acier discret, plus d'air |

Une seule marque, un seul orange. Le premium se distingue par le **traitement**
(profondeur, typo, whitespace, badge « Sur-mesure »), pas par une couleur concurrente.
Un accent acier froid (`--accent-steel`) est utilisé **uniquement** dans les
contextes Grands Comptes pour signaler le registre corporate.

## Système de design (globals.css) — thème CLAIR / premium

Bascule complète du thème sombre actuel vers un thème clair haut de gamme :

- **Base claire** : fond ivoire chaud / quasi-blanc (`--background` ≈ `#f8f7f4`), encre graphite
  profonde pour le texte (`--foreground` ≈ `#14141a`), gris doux pour le muted.
- **Accent** : orange SmatchRoom conservé (`#ff5a1f`) comme accent vibrant sur fond clair ;
  accent acier froid réservé au registre Grands Comptes.
- **Profondeur douce** : ombres portées légères + verre clair (`glass` repensé en clair), hairlines
  fines — plus de neon glow ni de fonds noirs par défaut.
- **Contraste maîtrisé** : possibilité de bandes sombres *ponctuelles* (ex. showcase terminal /
  preuve techno) pour créer du rythme et « montrer la techno », mais le site reste globalement clair.
- **Mesh gradient premium** : dégradés doux (orange → pêche → ivoire, touche acier) animés subtilement
  en fond de hero, + grain léger. Sans dépendance lourde (CSS/SVG, on module l'existant).
- Échelle typographique élargie, display Bricolage plus serré, eyebrows mono conservés.
- Utilitaires nouveaux : `section-index` (numéros 01 — …), `reveal` (apparition au scroll),
  `premium`/`steel` pour le registre corporate, `showcase-dark` pour les bandes sombres ponctuelles.
- Accessibilité : contrastes AA sur fond clair, `prefers-reduced-motion` respecté.

## Composants / fichiers touchés

1. `src/app/globals.css` — extension du design system (couches, mesh, grain, reveal, section-index, premium/steel).
2. `src/components/Reveal.jsx` — **nouveau**, wrapper client IntersectionObserver pour les apparitions au scroll (respecte `prefers-reduced-motion`).
3. `src/components/Hero.jsx` — modernisation (backdrop mesh, type scale, double promesse artisans + entreprises).
4. `src/components/TrustedBy.jsx` — `+90` · « Artisans & entreprises du bâtiment ».
5. `src/components/Manifesto.jsx`, `Pillars.jsx`, `Process.jsx`, `UseCases.jsx`, `FAQ.jsx`, `ContactCTA.jsx`, `Footer.jsx` — restylage éditorial (index de section, reveal, espacements), copie ajustée artisans+entreprises. Tarifs et substance conservés.
6. `src/components/Pricing.jsx` — grille des 6 agents conservée (tarifs identiques), restylée ; ajout d'un **bloc premium Grands Comptes** sous la grille (1 800 € + 490 €/mois, badge « Sur-mesure / PME-ETI », CTA → `/grands-comptes` + Calendly). L'offre de lancement existante est conservée.
7. `src/app/grands-comptes/page.jsx` — **nouvelle page** reprenant le doc corporate :
   - Hero corporate (acquisition B2B grands comptes, industrie & BTP)
   - Le défi (3 cartes : barrière téléphonique / coût humain 50 000 € / usure des équipes)
   - La solution en 3 étapes (Ciblage chirurgical → Approche WhatsApp & e-mail → Handoff)
   - Modèle économique (Phase 1 setup 1 800 € HT · Phase 2 licence 490 € HT/mois · ROI immédiat)
   - Contact / démo (Alexis Fontana · 07 71 48 76 98 · a.fontana@smatchroom.fr · Calendly)
   - `metadata` SEO dédiée.
8. `src/components/Nav.jsx` — ajout lien « Grands Comptes » (→ `/grands-comptes`), desktop + mobile.
9. `src/app/sitemap.js` — ajout de `/grands-comptes`.

## Contraintes

- Next.js 16 (voir `AGENTS.md` : lire les docs dans `node_modules/next/dist/docs/` avant tout code Next spécifique). Suivre les patterns existants.
- Site statique marketing → **aucun appel LLM**, les règles FinOps LLM ne s'appliquent pas ici.
- Vouvoiement systématique (cohérent avec l'existant).
- Prix affichés **HT** explicitement.
- `next build` doit rester clean.
- Branche dédiée (une fonctionnalité = une branche) : `feat/refonte-v4-grands-comptes`.

## Hors périmètre (YAGNI)

- Pas de refonte du SEO engine ni du blog/MDX.
- Pas de nouvelle dépendance lourde (shaders 3D externes) : on module l'existant (R3F déjà présent) + CSS.
- Pas de tarification dynamique / paiement en ligne : les CTA restent Calendly.

## Critères de succès

- Rendu visiblement modernisé et cohérent artisans + entreprises.
- Grille des 6 agents intacte (mêmes prix), preuve sociale à +90.
- Bloc Grands Comptes visible en home + page `/grands-comptes` complète et reliée (Nav + sitemap).
- `next build` sans erreur, responsive mobile OK, `prefers-reduced-motion` respecté.
