# Refonte BTP / Artisans — pulse.smatchroom.com — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Repositionner la home de pulse.smatchroom.com sur la niche unique « artisans du bâtiment (BTP) » avec une identité visuelle Atelier Tech / Terminal-BTP (orange haute-visibilité), en supprimant le double parcours Entreprises/Agences.

**Architecture:** Le site est un Next.js 16 (App Router) mono-page composé de sections dans `src/app/page.js`. Le style repose sur un système de tokens CSS (`src/app/globals.css` : variables `:root` + `@theme inline` de Tailwind v4). Le reskin passe majoritairement par ces variables (violet → orange) donc il se propage à tout le site ; le reste est de la réécriture de copy composant par composant, plus un nouveau composant « terminal live » signature.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS v4 (via `@import "tailwindcss"` + `@theme inline`), Framer Motion, React Three Fiber (`Hero3D`), `next/font/google`, lucide-react.

## Global Constraints

- **Next.js modifié :** ce Next.js a des breaking changes. AVANT d'écrire du code touchant fonts/metadata/config, lire le guide pertinent dans `node_modules/next/dist/docs/01-app/` (voir `AGENTS.md` du repo). Respecter les avis de dépréciation.
- **Langue :** toute la copy en français, **vouvoiement** systématique (jamais « tu »).
- **Niche unique :** artisans du bâtiment (couvreurs, maçons, menuisiers, plombiers, électriciens, chauffagistes, ITE / rénovation énergétique). Aucune mention « commerce / restaurateur / entreprise / PME / agence » en tant que cible. (Les partenaires B2B « syndics, agences » restent mentionnables comme *cibles de prospection pour l'artisan*.)
- **CTA :** tous les CTA pointent vers Calendly `https://calendly.com/a-fontana-smatchroom/30min`.
- **Couleur d'accent :** orange haute-visibilité `#ff5a1f` (hover `#ff7c48`), jaune signal secondaire `#ffce3a`. Réservés aux CTA/accents/statuts.
- **Hors périmètre, ne pas toucher :** `src/seo-engine/`, le blog et son contenu MDX, la config pm2/nginx (aucun déploiement/redémarrage prod). Ne pas supprimer ni créer de pages/routes.
- **Vérification :** chaque tâche se termine par un build qui passe. Commande : `cd /root/smatchroom-ecosystem/smatchroom-pulse && npm run build` (attendu : compilation sans erreur). Les tâches de copy pure (5–9, 11, 13) peuvent être groupées et validées par un seul build en exécution inline, mais chacune reste committée séparément.
- **Branche :** `feat/refonte-btp-artisans` (déjà créée, spec déjà committée dessus).

---

### Task 1: Reskin global des tokens + police display

**Files:**
- Modify: `src/app/globals.css` (variables `:root`, utilitaires, scrollbar, gradients body)
- Modify: `src/app/layout.js` (ajout police display + metadata SEO)

**Interfaces:**
- Produces: variables CSS `--primary`, `--primary-hover`, `--primary-soft`, `--primary-glow`, `--border`, `--border-strong`, `--surface`, `--surface-2`, `--background`, nouvelle `--signal` ; variable de police `--font-bricolage` ; règle globale `h1, h2` en police display. Toutes les tâches suivantes s'appuient sur ces tokens.

- [ ] **Step 1: Lire le guide fonts du Next.js local**

Run: `ls node_modules/next/dist/docs/01-app/` puis lire le fichier traitant de `next/font` (chercher « font » dans l'arbo). Confirmer que l'API `next/font/google` + `variable` est inchangée avant de l'utiliser.

- [ ] **Step 2: Remplacer le bloc `:root` de `globals.css`**

Remplacer le bloc `:root { ... }` actuel (palette violette) par :

```css
:root {
  --background: #0a0a0c;
  --foreground: #f5f5f7;
  --muted: #9a9aa2;
  --primary: #ff5a1f;
  --primary-hover: #ff7c48;
  --primary-soft: rgba(255, 90, 31, 0.15);
  --primary-glow: rgba(255, 90, 31, 0.45);
  --signal: #ffce3a;
  --surface: #111114;
  --surface-2: #191920;
  --border: rgba(255, 90, 31, 0.18);
  --border-strong: rgba(255, 90, 31, 0.42);
}
```

- [ ] **Step 3: Mettre à jour les utilitaires violet-dépendants dans `globals.css`**

Dans `@theme inline`, ajouter sous la ligne `--font-mono: var(--font-jetbrains);` :

```css
  --font-display: var(--font-bricolage);
```

Remplacer la règle `body { background-image: ... }` par :

```css
body {
  background-image:
    radial-gradient(800px circle at 20% 10%, rgba(255, 90, 31, 0.08), transparent 50%),
    radial-gradient(700px circle at 80% 70%, rgba(255, 160, 60, 0.05), transparent 60%);
}
```

Dans `.glow-text`, remplacer `rgba(168, 85, 247, 0.25)` par `rgba(255, 90, 31, 0.25)`.

Remplacer `.gradient-text { background: linear-gradient(180deg, #ffffff 0%, #c084fc 100%); ... }` en changeant `#c084fc` par `#ff7c48`.

Remplacer le thumb de scrollbar `background: linear-gradient(180deg, #a855f7, #6d28d9);` par `background: linear-gradient(180deg, #ff5a1f, #b23610);` et `::-webkit-scrollbar-track { background: #050508; }` par `#0a0a0c`.

Ajouter en fin de fichier une règle de police display :

```css
h1, h2 {
  font-family: var(--font-bricolage), var(--font-inter), system-ui, sans-serif;
  letter-spacing: -0.02em;
}
```

- [ ] **Step 4: Ajouter la police display dans `layout.js`**

Remplacer la ligne d'import par :

```js
import { Inter, JetBrains_Mono, Bricolage_Grotesque } from "next/font/google";
```

Après la déclaration `jetbrains`, ajouter :

```js
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});
```

Dans le `<html className={...}>`, ajouter `${bricolage.variable}` à la liste des variables.

- [ ] **Step 5: Mettre à jour le `metadata` SEO dans `layout.js`**

Remplacer l'objet `metadata` par :

```js
export const metadata = {
  title: "SmatchRoom Pulse — Des agents IA pour les artisans du bâtiment",
  description:
    "Pulse conçoit et déploie des agents IA taillés pour les métiers du bâtiment : prospection de partenaires, relance de devis, qualification de leads, avis Google, conformité. Déployés en 48h sur votre infra (Node.js + Supabase).",
  metadataBase: new URL("https://pulse.smatchroom.com"),
  openGraph: {
    title: "SmatchRoom Pulse — Des agents IA pour le bâtiment",
    description:
      "Des agents IA qui bossent pour votre entreprise du bâtiment : prospection, relance de devis, RDV, SEO local. Déployés en 48h.",
    url: "https://pulse.smatchroom.com",
    siteName: "SmatchRoom Pulse",
    type: "website",
  },
};
```

- [ ] **Step 6: Build**

Run: `cd /root/smatchroom-ecosystem/smatchroom-pulse && npm run build`
Expected: compilation sans erreur.

- [ ] **Step 7: Commit**

```bash
git add src/app/globals.css src/app/layout.js
git commit -m "feat(pulse): reskin tokens orange BTP + police display + metadata"
```

---

### Task 2: Recolorer le fond 3D (Hero3D)

**Files:**
- Modify: `src/components/Hero3D.jsx`

**Interfaces:**
- Consumes: rien. Produces: composant 3D restylé aux couleurs orange, consommé par `Hero`.

- [ ] **Step 1: Remplacer les couleurs hex violettes/bleues**

Dans `Hero3D.jsx`, remplacer le paramètre par défaut `color = '#a855f7'` de `ParticleSphere` par `color = '#ff5a1f'`.
Remplacer la couleur des `FarParticles` `color="#9bb0ff"` par `color="#ffb27a"`.
Chercher toute autre occurrence de `#a855f7`, `#9bb0ff`, `#6d28d9`, `168, 85, 247` dans le fichier (ex. props `<Bloom>`, lumières, `<color attach="background">`) et les remplacer par l'orange (`#ff5a1f`) ou une variante chaude. Ne pas changer la géométrie ni les intensités.

- [ ] **Step 2: Build**

Run: `cd /root/smatchroom-ecosystem/smatchroom-pulse && npm run build`
Expected: compilation sans erreur.

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero3D.jsx
git commit -m "feat(pulse): recolore le fond particules 3D en orange"
```

---

### Task 3: Composant TerminalLive + réécriture du Hero (parcours unique)

**Files:**
- Create: `src/components/TerminalLive.jsx`
- Modify: `src/components/Hero.jsx`

**Interfaces:**
- Produces: `TerminalLive` (default export, composant client sans props) ; `Hero` réécrit sans les deux cartes « Espace ».

- [ ] **Step 1: Créer `src/components/TerminalLive.jsx`**

```jsx
'use client';

import { useEffect, useState } from 'react';

const LINES = [
  { p: '$ pulse run --agent=chasseur', t: 'cmd' },
  { p: '→ 42 couvreurs identifiés · Lille (59)', t: 'out' },
  { p: '✓ WhatsApp envoyé — relance devis #402', t: 'ok' },
  { p: '→ lead qualifié : ITE 120m² · MaPrimeRénov', t: 'out' },
  { p: '✓ RDV posé jeudi 14h · agenda synchronisé', t: 'ok' },
];

const COLOR = {
  cmd: 'text-white',
  out: 'text-[var(--muted)]',
  ok: 'text-[var(--signal)]',
};

export default function TerminalLive() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count >= LINES.length) {
      const reset = setTimeout(() => setCount(0), 2600);
      return () => clearTimeout(reset);
    }
    const next = setTimeout(() => setCount((c) => c + 1), 900);
    return () => clearTimeout(next);
  }, [count]);

  return (
    <div className="glass w-full max-w-lg overflow-hidden rounded-2xl text-left font-mono text-sm">
      <div className="flex items-center gap-2 border-b border-[var(--border)] bg-[var(--surface-2)]/60 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        <span className="ml-2 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
          agents · live
        </span>
      </div>
      <div className="min-h-[170px] space-y-1.5 px-4 py-4">
        {LINES.slice(0, count).map((line, i) => (
          <p key={i} className={COLOR[line.t]}>
            {line.p}
          </p>
        ))}
        <span className="inline-block h-4 w-2 animate-pulse bg-[var(--primary)] align-middle" />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Réécrire `src/components/Hero.jsx`**

Remplacer intégralement le contenu par :

```jsx
'use client';

import dynamic from 'next/dynamic';
import { ArrowRight, Sparkles } from 'lucide-react';
import TerminalLive from './TerminalLive';

const Hero3D = dynamic(() => import('./Hero3D'), {
  ssr: false,
  loading: () => null,
});

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Hero3D />
      </div>

      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,rgba(255,90,31,0.18),transparent_55%)]" />

      <div className="relative z-20 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center gap-12 px-6 py-28 lg:flex-row lg:justify-between lg:text-left">
        <div className="max-w-2xl text-center lg:text-left">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--primary-soft)] px-4 py-1.5 font-mono text-xs uppercase tracking-[0.18em] text-[var(--primary-hover)] backdrop-blur">
            <Sparkles size={14} />
            <span>Agents IA · Bâtiment</span>
          </div>

          <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            <span className="gradient-text glow-text">Des agents IA qui bossent </span>
            <span className="text-white">pour le bâtiment.</span>
          </h1>

          <p className="mt-6 max-w-xl text-balance text-lg text-[var(--muted)] md:text-xl">
            Prospection, relance de devis, qualification de leads, prise de RDV.
            Vos agents tournent <span className="font-medium text-white">24/7</span> pendant
            que vous êtes sur le chantier. Conçus, codés et déployés en{' '}
            <span className="font-mono text-white">48h</span> sur votre infra (Node.js + Supabase).
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:items-start">
            <a
              href="https://calendly.com/a-fontana-smatchroom/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-2xl border border-[var(--primary)] bg-[var(--primary)] px-6 py-4 font-semibold text-black transition-all hover:bg-[var(--primary-hover)] hover:shadow-[0_0_40px_-5px_var(--primary-glow)]"
            >
              Réserver mon diagnostic (gratuit)
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#tarifs"
              className="inline-flex items-center gap-2 rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-2)]/60 px-6 py-4 font-medium text-white backdrop-blur transition-all hover:border-[var(--primary)] hover:bg-white/5"
            >
              Voir les agents
            </a>
          </div>
        </div>

        <div className="w-full max-w-lg lg:w-auto">
          <TerminalLive />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Build**

Run: `cd /root/smatchroom-ecosystem/smatchroom-pulse && npm run build`
Expected: compilation sans erreur.

- [ ] **Step 4: Commit**

```bash
git add src/components/TerminalLive.jsx src/components/Hero.jsx
git commit -m "feat(pulse): hero BTP parcours unique + terminal live signature"
```

---

### Task 4: Nav (suppression du double parcours)

**Files:**
- Modify: `src/components/Nav.jsx`

- [ ] **Step 1: Remplacer le tableau `LINKS`**

```jsx
const LINKS = [
  { href: '#agents', label: 'Les agents' },
  { href: '#cas-usage', label: "Cas d'usage" },
  { href: '#tarifs', label: 'Tarifs' },
  { href: '/agent-ia', label: 'Ressources' },
  { href: '/blog', label: 'Blog' },
];
```

Supprimer la logique `l.highlight` : dans les deux `map`, utiliser une seule classe `'text-sm text-[var(--muted)] transition-colors hover:text-white'` (retirer le ternaire `l.highlight ? ... : ...`).

- [ ] **Step 2: Renommer le CTA**

Remplacer les deux libellés `Demander mon diagnostic` (desktop + mobile) par `Réserver un créneau`.

- [ ] **Step 3: Build + Commit**

```bash
npm run build
git add src/components/Nav.jsx
git commit -m "feat(pulse): nav parcours unique BTP"
```

---

### Task 5: TrustedBy (preuve sociale BTP)

**Files:**
- Modify: `src/components/TrustedBy.jsx`

- [ ] **Step 1: Mettre à jour `CLIENTS` et le libellé**

Remplacer `CLIENTS` par :

```jsx
const CLIENTS = [
  "Tryba",
  "BatInnov",
  "JB Pilotage",
  "NextMove",
  "Émargeo",
];
```

Remplacer le texte `Entreprises accompagnées` par `Artisans & pros du bâtiment`.

- [ ] **Step 2: Build + Commit**

```bash
npm run build
git add src/components/TrustedBy.jsx
git commit -m "feat(pulse): trustedby oriente batiment"
```

---

### Task 6: Manifesto (réécriture BTP)

**Files:**
- Modify: `src/components/Manifesto.jsx`

- [ ] **Step 1: Réécrire le titre**

Remplacer le contenu du `<h2>` par :

```jsx
<span className="gradient-text">Pourquoi SmatchRoom</span> n'est pas une agence comme les autres ?
```

- [ ] **Step 2: Réécrire la citation (`<blockquote>`)**

Remplacer le `<p>` interne du blockquote par :

```jsx
<p className="text-balance text-lg leading-relaxed text-white md:text-xl lg:text-2xl">
  La plupart des agences vous facturent du{' '}
  <span className="text-[var(--primary-hover)]">temps humain</span> et des rapports.
  Les logiciels, eux, vous demandent d'apprendre à vous en servir et de{' '}
  <span className="text-[var(--primary-hover)]">faire le travail vous-même</span>.
  <br className="hidden md:inline" />
  <br className="hidden md:inline" />
  SmatchRoom code des{' '}
  <span className="font-semibold text-white">collaborateurs numériques autonomes</span> pour
  le bâtiment. Ils prospectent, relancent vos devis, qualifient vos leads et prennent vos RDV,
  connectés à vos outils (agenda, WhatsApp, site), et travaillent{' '}
  <span className="font-mono text-white">24h/24, 7j/7</span>.
</p>
```

- [ ] **Step 3: Réécrire le paragraphe de conclusion**

Remplacer le `<p className="mt-4 ...">` par :

```jsx
<p className="mt-4 text-balance text-base text-[var(--muted)] md:text-lg">
  Vous restez sur le chantier ;{' '}
  <span className="font-medium text-white">la machine s'occupe de l'administratif et de trouver vos prochains chantiers.</span>
</p>
```

- [ ] **Step 4: Build + Commit**

```bash
npm run build
git add src/components/Manifesto.jsx
git commit -m "feat(pulse): manifesto oriente artisans batiment"
```

---

### Task 7: Pillars (moteurs reformulés bâtiment)

**Files:**
- Modify: `src/components/Pillars.jsx`

- [ ] **Step 1: Remplacer le tableau `PILLARS`**

```jsx
const PILLARS = [
  {
    icon: Search,
    title: 'Moteur RankSniper',
    domain: 'SEO local',
    tagline: 'Visible sur Google quand on cherche un artisan.',
    bullets: [
      'Analyse les requêtes locales (« couvreur Lille », « ITE 59 ») et les failles de vos concurrents',
      'Rédige et publie des pages métier optimisées, sans que vous touchiez au clavier',
      'Répond aux avis Google et pousse les demandes de devis vers vous',
      'Balises structurées automatiques : vous remontez dans le pack local',
    ],
  },
  {
    icon: BarChart3,
    title: 'SmatchRoom Apex',
    domain: 'Prospection',
    tagline: 'Un flux continu de chantiers qualifiés.',
    bullets: [
      'Sourcing sur données légales (INSEE / INPI) : syndics, agences, maîtres d\'œuvre de votre zone',
      'Détecte les partenaires qui envoient du chantier et les contacte pour vous',
      'Relance vos devis en attente par WhatsApp, au bon moment',
      'Vos numéros restent protégés : cadence lissée, montée en charge anti-blocage',
    ],
  },
  {
    icon: Megaphone,
    title: 'Moteur Orchestrator',
    domain: 'Admin & Ops',
    tagline: 'L\'administratif qui se fait tout seul.',
    bullets: [
      'Qualifie les leads entrants et pose les RDV directement dans votre agenda',
      'Vérifie les attestations (URSSAF, décennale) avant chaque chantier',
      'Compare les devis fournisseurs et repère les écarts de prix',
      'Synthèse hebdo : ce qui a été fait, ce qui attend votre décision',
    ],
  },
];
```

- [ ] **Step 2: Réécrire l'en-tête de section**

Remplacer l'`eyebrow` par `Vos agents, par métier du bâtiment`.
Remplacer le `<h2>` par :

```jsx
<span className="gradient-text">Du vrai code.</span> Pas un wrapper ChatGPT.
```

Remplacer le paragraphe sous le h2 par :

```jsx
Des moteurs conçus, entraînés et opérés en interne. Pas de pile no-code fragile :
du code, des bases de données, des passerelles industrielles — adaptés au bâtiment.
```

- [ ] **Step 3: Réécrire la bande « Usine à agents »**

Remplacer `CUSTOM_EXAMPLES` par :

```jsx
const CUSTOM_EXAMPLES = [
  'Relance de devis',
  'Suivi de chantier',
  'Avis Google',
  'Attestations URSSAF',
  'SAV & garanties',
  'Planning poseurs',
  'Facturation',
  'Appels entrants',
  'MaPrimeRénov',
  'Et le vôtre.',
];
```

Dans la bande, remplacer le paragraphe `On est une usine. ...` par :

```jsx
On est une usine à agents. Si un besoin de votre activité peut être automatisé,
on le conçoit pour vous. Mêmes 48h, même pipeline, même garantie de mise en prod.
```

- [ ] **Step 4: Build + Commit**

```bash
npm run build
git add src/components/Pillars.jsx
git commit -m "feat(pulse): piliers reformules metiers du batiment"
```

---

### Task 8: Process (48h orienté bâtiment)

**Files:**
- Modify: `src/components/Process.jsx`

- [ ] **Step 1: Réécrire les `description` du tableau `STEPS`**

Conserver `hour`, `icon`, `title`. Remplacer les 4 `description` par :

- H+0 (Audit & Cadrage) : `"30 min de visio. On comprend votre activité de bâtiment, ce qui vous prend du temps (devis, prospection, relances) et ce qu'on peut automatiser. On vous dit honnêtement si on peut aider."`
- H+12 (Conception) : `"On choisit l'agent adapté à votre métier. Il est conçu à partir de vos vraies données : votre zone, vos clients types, vos partenaires."`
- H+30 (Apprentissage) : `"L'agent apprend votre métier, votre ton, vos clients. On affine jusqu'à ce que le résultat tienne la route sur le terrain. Pas avant."`
- H+48 (Mise en route) : `"L'agent est déployé et opérationnel. Vous le pilotez depuis un tableau de bord simple, sur votre téléphone. On reste disponibles."`

- [ ] **Step 2: Réécrire le sous-titre de section**

Remplacer le paragraphe sous le h2 par :

```jsx
On ne vend pas un POC. On déploie un agent qui rentre en production le 3ème jour,
pendant que vous continuez vos chantiers.
```

- [ ] **Step 3: Build + Commit**

```bash
npm run build
git add src/components/Process.jsx
git commit -m "feat(pulse): process 48h oriente batiment"
```

---

### Task 9: UseCases (cas BTP réels)

**Files:**
- Modify: `src/components/UseCases.jsx`

- [ ] **Step 1: Remplacer les imports d'icônes et le tableau `CASES`**

Remplacer la ligne d'import par :

```jsx
import { Hammer, FileCheck, Search, ArrowUpRight } from 'lucide-react';
```

Remplacer `CASES` par :

```jsx
const CASES = [
  {
    icon: Hammer,
    target: 'Le Chasseur',
    angle: 'Prospection',
    title: 'Des partenaires d\'apport d\'affaires en pilote automatique.',
    metric: 'WhatsApp lissé · 0 blocage',
    description:
      "En production chez un couvreur à Lille : l'agent identifie syndics et agences, engage la conversation et relance, avec une cadence lissée qui protège le numéro.",
  },
  {
    icon: FileCheck,
    target: 'Le Gestionnaire',
    angle: 'Relance devis',
    title: 'Les devis en attente relancés au bon moment.',
    metric: 'Relances automatiques',
    description:
      "L'agent suit vos devis envoyés, relance les clients qui n'ont pas répondu et remonte les chantiers chauds. Fini les devis oubliés au fond de la boîte mail.",
  },
  {
    icon: Search,
    target: 'Le Visiteur',
    angle: 'SEO local',
    title: 'Trouvé sur Google sur vos requêtes métier.',
    metric: '~3 articles/semaine en autonomie',
    description:
      "En production sur un site d'artisan : publication autonome de contenu optimisé et réponses aux avis, pour remonter dans les recherches locales de votre zone.",
  },
];
```

- [ ] **Step 2: Réécrire l'en-tête de section**

Remplacer le `<h2>` par :

```jsx
<span className="gradient-text">Nos agents tournent déjà</span> pour des artisans
```

Remplacer le paragraphe sous le h2 par :

```jsx
Chaque agent ci-dessous est en production aujourd'hui, sur infrastructure réelle.
Pas de démo : des artisans du bâtiment qui s'en servent au quotidien.
```

- [ ] **Step 3: Build + Commit**

```bash
npm run build
git add src/components/UseCases.jsx
git commit -m "feat(pulse): cas d'usage BTP en production"
```

---

### Task 10: Pricing — grille « Agents à l'unité »

**Files:**
- Modify: `src/components/Pricing.jsx` (remplacement intégral)

**Interfaces:**
- Produces: section `#tarifs` affichant les 6 agents + bandeau offre. Les ancres `#tarifs` (Nav, Footer, Hero « Voir les agents ») pointent ici.

- [ ] **Step 1: Remplacer intégralement `src/components/Pricing.jsx`**

```jsx
import { ArrowRight, Search, ShoppingCart, FileCheck, MapPin, Headphones, ShieldCheck } from 'lucide-react';

const CALENDLY = 'https://calendly.com/a-fontana-smatchroom/30min';

const AGENTS = [
  {
    icon: Search,
    name: 'Le Chasseur',
    role: 'Prospection de partenaires B2B (syndics, agences…)',
    setup: 490,
    mrr: 190,
    highlighted: true,
  },
  {
    icon: ShoppingCart,
    name: "L'Acheteur",
    role: 'Analyse et comparaison des prix fournisseurs / devis',
    setup: 490,
    mrr: 190,
    highlighted: false,
  },
  {
    icon: FileCheck,
    name: 'Le Gestionnaire',
    role: 'Suivi et relance des devis en attente',
    setup: 390,
    mrr: 190,
    highlighted: false,
  },
  {
    icon: MapPin,
    name: 'Le Visiteur',
    role: 'SEO local et réponses aux avis Google',
    setup: 290,
    mrr: 149,
    highlighted: false,
  },
  {
    icon: Headphones,
    name: "L'Accueil 24/7",
    role: 'Prise en charge et qualification des leads entrants',
    setup: 290,
    mrr: 149,
    highlighted: false,
  },
  {
    icon: ShieldCheck,
    name: 'Le Contrôleur',
    role: 'Conformité, attestations URSSAF / décennale',
    setup: 290,
    mrr: 129,
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <section id="tarifs" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="eyebrow">Tarifs</p>
          <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            <span className="gradient-text">Vos agents, à l'unité.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-[var(--muted)]">
            Vous composez votre équipe. Un agent, plusieurs, ou un pack :
            chaque collaborateur numérique a son rôle et son tarif clairs.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {AGENTS.map(({ icon: Icon, name, role, setup, mrr, highlighted }) => (
            <div
              key={name}
              className={[
                'glass glass-hover relative flex flex-col rounded-2xl p-7',
                highlighted ? 'ring-1 ring-[var(--primary)]' : '',
              ].join(' ')}
            >
              {highlighted && (
                <span className="absolute right-5 top-5 rounded-full bg-[var(--primary)] px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-black">
                  Le + demandé
                </span>
              )}
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary-soft)] text-[var(--primary-hover)] ring-1 ring-[var(--border-strong)]">
                <Icon size={22} strokeWidth={1.8} />
              </div>
              <h3 className="text-2xl font-semibold tracking-tight text-white">{name}</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">{role}</p>

              <div className="mt-6 flex items-end gap-4 border-t border-[var(--border)] pt-6">
                <div>
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[var(--muted)]">
                    Installation
                  </p>
                  <p className="font-mono text-xl font-semibold text-white">{setup} €</p>
                </div>
                <div>
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[var(--muted)]">
                    Par mois
                  </p>
                  <p className="font-mono text-xl font-semibold text-[var(--primary-hover)]">{mrr} €</p>
                </div>
              </div>

              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border-strong)] px-5 py-3 text-sm font-medium text-white transition-all hover:border-[var(--primary)] hover:bg-white/5"
              >
                Choisir cet agent
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          ))}
        </div>

        {/* Bandeau offre */}
        <div className="glass relative mt-8 overflow-hidden rounded-2xl p-8 md:p-10">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_30%,var(--primary-soft),transparent_60%)]"
          />
          <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--primary)]">
                Offre de lancement
              </p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                Installation facilitée sur les agents à 490 €
              </h3>
              <p className="mt-3 max-w-2xl text-sm text-[var(--muted)] md:text-base">
                Sur les agents ou packs à 490 € d'installation : payez{' '}
                <span className="font-medium text-white">290 € pendant 20 jours, puis 200 €</span>.
                Et tous les abonnements ne démarrent que{' '}
                <span className="font-medium text-white">le mois suivant</span> la mise en service.
              </p>
            </div>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex flex-shrink-0 items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-6 py-3 font-medium text-black transition-all hover:bg-[var(--primary-hover)] hover:shadow-[0_0_40px_-5px_var(--primary-glow)]"
            >
              En profiter
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Build**

Run: `cd /root/smatchroom-ecosystem/smatchroom-pulse && npm run build`
Expected: compilation sans erreur (vérifier que tous les icônes importés existent dans lucide-react ; sinon substituer par un icône équivalent existant).

- [ ] **Step 3: Commit**

```bash
git add src/components/Pricing.jsx
git commit -m "feat(pulse): pricing grille agents a l'unite + offre lancement"
```

---

### Task 11: FAQ (questions d'artisans, vouvoiement)

**Files:**
- Modify: `src/components/FAQ.jsx`

- [ ] **Step 1: Remplacer le tableau `QUESTIONS`**

```jsx
const QUESTIONS = [
  {
    q: "Je suis artisan du bâtiment. C'est fait pour moi ?",
    a: "Oui, c'est exactement notre cible. Nos agents sont déjà en production chez des artisans du bâtiment (couverture, isolation, rénovation). Ils s'occupent de trouver des chantiers, relancer vos devis et gérer l'administratif pendant que vous êtes sur le terrain.",
  },
  {
    q: "Concrètement, un agent IA pour mon activité, ça fait quoi ?",
    a: "C'est un programme qui travaille pour vous en continu, sans surveillance. Exemples : il contacte des syndics et agences pour vous apporter des chantiers, il relance par message les devis sans réponse, il répond aux avis Google, il vérifie les attestations avant un chantier. Vous n'avez pas à lui dire quoi faire à chaque fois.",
  },
  {
    q: "Je ne suis pas à l'aise avec l'informatique. C'est compliqué ?",
    a: "Non. On s'occupe de tout : mise en place, paramétrage, mise en route. Vous avez un tableau de bord simple, accessible depuis votre téléphone, pour voir ce que fait l'agent. Si quelque chose cloche, vous nous appelez.",
  },
  {
    q: "Ça marche avec WhatsApp ? Je risque un blocage de mon numéro ?",
    a: "Oui, la prospection et les relances passent par WhatsApp. On protège votre numéro avec une montée en charge progressive et une cadence lissée (jamais de rafales). C'est justement pour ça qu'on code nos propres agents plutôt que d'utiliser un outil d'envoi de masse.",
  },
  {
    q: "Mes données et celles de mes clients sont-elles protégées ?",
    a: "Oui. Les agents tournent sur une infrastructure dédiée, pas sur un SaaS générique. On ne conserve que des métriques anonymisées, et on peut signer un accord de traitement des données (DPA) si vous le souhaitez.",
  },
  {
    q: "Pourquoi 48h et pas plusieurs semaines ?",
    a: "Parce qu'on part d'une bibliothèque d'agents déjà éprouvés. Le travail n'est pas de repartir de zéro, mais d'adapter une base solide à votre métier : votre zone, vos clients, vos partenaires. Audit le 1er jour, conception et entraînement le 2e, mise en production le 3e.",
  },
  {
    q: "Je peux prendre un seul agent, ou il faut tout prendre ?",
    a: "Un seul suffit. Vous composez votre équipe à la carte : commencez par l'agent qui vous soulage le plus (souvent Le Chasseur ou Le Gestionnaire), et ajoutez-en d'autres quand vous voyez les résultats.",
  },
  {
    q: "Et si ça ne me convient pas ?",
    a: "On refuse les missions qu'on ne pense pas pouvoir réussir. Pour celles qu'on prend, on cadre un objectif clair dès le départ. Si l'agent n'est pas au niveau à la mise en route, on continue de l'affiner sans surcoût jusqu'à ce qu'il le soit.",
  },
];
```

- [ ] **Step 2: Build + Commit**

```bash
npm run build
git add src/components/FAQ.jsx
git commit -m "feat(pulse): FAQ artisans batiment + vouvoiement"
```

---

### Task 12: ContactCTA (parcours unique)

**Files:**
- Modify: `src/components/ContactCTA.jsx` (remplacement intégral)

- [ ] **Step 1: Remplacer intégralement `src/components/ContactCTA.jsx`**

```jsx
import { ArrowRight, Calendar } from 'lucide-react';

const CALENDLY = 'https://calendly.com/a-fontana-smatchroom/30min';

export default function ContactCTA() {
  return (
    <section id="contact" className="relative overflow-hidden py-32 px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,90,31,0.16),transparent_60%)]" />

      <div className="relative mx-auto max-w-3xl text-center">
        <p className="eyebrow">Passez à l'action</p>
        <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-5xl">
          <span className="gradient-text">On regarde ensemble ce qu'un agent peut faire pour vous.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-balance text-[var(--muted)]">
          30 min de visio. On comprend votre activité de bâtiment, on vous montre ce qu'on peut
          automatiser, et on vous dit honnêtement si c'est pertinent — ou pas.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4">
          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-8 py-4 text-lg font-semibold text-black transition-all hover:bg-[var(--primary-hover)] hover:shadow-[0_0_40px_-5px_var(--primary-glow)]"
          >
            <Calendar size={18} />
            Réserver 30 min (gratuit)
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
            Visio · Sans engagement
          </p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Build + Commit**

```bash
npm run build
git add src/components/ContactCTA.jsx
git commit -m "feat(pulse): CTA final parcours unique BTP"
```

---

### Task 13: Footer (dé-lier le volet entreprises)

**Files:**
- Modify: `src/components/Footer.jsx`

- [ ] **Step 1: Réécrire la tagline**

Remplacer le `<p>` de la colonne Brand par :

```jsx
<p className="mt-4 max-w-md text-sm text-[var(--muted)]">
  L'usine à agents IA du groupe SmatchRoom, taillée pour les artisans du bâtiment.
  Prospection, devis, RDV, SEO local — déployés en 48h sur votre infra.
</p>
```

- [ ] **Step 2: Nettoyer la liste Navigation**

Dans le `<ul>` de la colonne Navigation, supprimer la ligne `<li><a href="/entreprises" ...>Entreprises & PME</a></li>` et remplacer la première ligne par :

```jsx
<li><a href="/#tarifs" className="font-medium text-[var(--primary-hover)] hover:text-white">Les agents</a></li>
```

Conserver les lignes Cas d'usage, Tarifs, FAQ, Blog, Contact.

- [ ] **Step 3: Build + Commit**

```bash
npm run build
git add src/components/Footer.jsx
git commit -m "feat(pulse): footer parcours unique BTP"
```

---

### Task 14: Vérification visuelle finale

**Files:** aucun (vérification)

- [ ] **Step 1: Build de production complet**

Run: `cd /root/smatchroom-ecosystem/smatchroom-pulse && npm run build`
Expected: compilation sans erreur sur toutes les routes.

- [ ] **Step 2: Lancer le serveur et capturer la home**

Utiliser la skill `webapp-testing` (Playwright) : démarrer `npm run start` (ou `npm run dev`) sur un port libre, naviguer sur `http://localhost:<port>/`, prendre un screenshot pleine page desktop (1440px) et un mobile (390px).

- [ ] **Step 3: Revue visuelle (checklist)**

Vérifier sur les captures :
- [ ] Accent orange partout (plus aucun violet visible), fond graphite.
- [ ] Hero : titre « Des agents IA qui bossent pour le bâtiment. » + terminal live animé + un seul bloc CTA (pas les 2 cartes Espace).
- [ ] Aucune mention « commerce / restaurateur / entreprise / PME / agence » comme cible (hors « syndics/agences » en tant que partenaires prospectés).
- [ ] Pricing : 6 agents avec setup + mensuel + bandeau offre.
- [ ] Nav et Footer sans lien « Entreprises ».
- [ ] Titres en police display (Bricolage Grotesque).

- [ ] **Step 4: Signaler les points ouverts au user**

Rappeler pour validation humaine : (a) formulation exacte du bandeau offre, (b) choix de police display (Bricolage Grotesque, swappable), (c) que les pages orphelines `/entreprises` et `/entrepreneurs` existent toujours (reskinnées mais non liées) — décider plus tard : redirection, réécriture ou suppression. **Ne pas déployer en prod sans validation explicite.**

---

## Notes de périmètre / suivi

- **Pages orphelines :** `/entreprises`, `/entrepreneurs`, `/scale`, `/partenaires`, `/solutions/[slug]` conservent leur copy actuelle mais héritent du reskin orange (tokens globaux). Elles ne sont plus liées depuis la home. Traitement (redirect/réécriture/suppression) hors périmètre de ce plan — à arbitrer avec le user.
- **Blog / SEO engine :** inchangés, hérite du reskin visuel.
- **Déploiement :** aucun redémarrage pm2/nginx dans ce plan. Mise en prod sur validation explicite après revue visuelle.
