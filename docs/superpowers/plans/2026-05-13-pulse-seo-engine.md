# Pulse SEO Engine — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an autonomous daily SEO/GEO article generator for `pulse.smatchroom.com` (planner → generator → linker → publisher, orchestrated by pm2 cron at 3 AM).

**Architecture:** TypeScript engine in `src/seo-engine/` (isolated tsconfig) writes MDX files into `src/content/{cluster}/`, commits them, rebuilds Next.js, restarts pm2. SQLite for state. LangChain + Anthropic (Sonnet 4.6 rédaction + Haiku 4.5 meta). Pulse pages stay in JS (App Router) and render MDX via `@next/mdx` + `gray-matter`.

**Tech Stack:** Next.js 16, React 19, MDX (`@next/mdx`, `gray-matter`, `remark-gfm`, `rehype-slug`), TypeScript 5, `@langchain/anthropic`, `better-sqlite3`, `simple-git`, `pino`, `zod`, `pm2`.

**Reference spec:** `docs/superpowers/specs/2026-05-13-pulse-seo-engine-design.md`

---

## File Structure

### Pulse app (existing, JS — additions only)
```
smatchroom-pulse/
├── next.config.mjs                          # MODIFY: add @next/mdx, preserve turbopack.root
├── mdx-components.jsx                       # CREATE: required by @next/mdx (App Router)
├── package.json                             # MODIFY: add MDX deps
├── ecosystem.config.js                      # CREATE: pm2 config (Pulse + cron)
├── .gitignore                               # MODIFY: ignore seo-engine/data, dist, node_modules
├── src/
│   ├── lib/
│   │   └── content.js                       # CREATE: scan src/content/, parse gray-matter
│   ├── components/
│   │   ├── Article.jsx                      # CREATE: article layout
│   │   └── ArticleCard.jsx                  # CREATE: index card
│   ├── app/
│   │   ├── blog/page.jsx                    # CREATE: /blog index
│   │   ├── blog/[slug]/page.jsx             # CREATE: /blog/[slug] (async params + dynamic mdx import)
│   │   ├── agent-ia/page.jsx                # CREATE: /agent-ia hub
│   │   ├── agent-ia/[slug]/page.jsx         # CREATE: /agent-ia/[slug] (idem)
│   │   ├── solutions/[slug]/page.jsx        # CREATE: /solutions/[slug] (idem)
│   │   ├── sitemap.js                       # CREATE: Next.js 16 sitemap file convention
│   │   └── robots.js                        # CREATE: Next.js 16 robots file convention
│   └── content/
│       ├── agent-ia/.gitkeep                # CREATE
│       ├── blog/.gitkeep                    # CREATE
│       └── solutions/
│           ├── agent-sdr.mdx                # CREATE (manual landing)
│           ├── agent-support.mdx            # CREATE (manual landing)
│           └── agent-sur-mesure.mdx         # CREATE (manual landing)
```

### SEO Engine (new, TS)
```
src/seo-engine/
├── package.json                             # CREATE: TS deps
├── tsconfig.json                            # CREATE: strict TS
├── .env.example                             # CREATE
├── .gitignore                               # CREATE: data/, dist/
├── lib/
│   ├── logger.ts                            # CREATE
│   ├── sanitize.ts                          # CREATE + test
│   ├── db.ts                                # CREATE + test
│   ├── anthropic.ts                         # CREATE (client + UsageTracker)
│   ├── mdx.ts                               # CREATE + test
│   ├── git.ts                               # CREATE
│   ├── brand-context.ts                     # CREATE (system prompt block)
│   └── types.ts                             # CREATE (shared interfaces)
├── seeds/
│   ├── agent-ia.json                        # CREATE (~80 angles)
│   └── link-bank.json                       # CREATE
├── planner.ts                               # CREATE + test
├── generator.ts                             # CREATE (orchestrates 3 stages)
├── stages/
│   ├── outline.ts                           # CREATE + test (Zod schema)
│   ├── sections.ts                          # CREATE
│   ├── meta.ts                              # CREATE
│   └── linker.ts                            # CREATE + test (deterministic part)
├── publisher.ts                             # CREATE
├── index.ts                                 # CREATE (entrypoint)
├── scripts/
│   ├── init-db.ts                           # CREATE
│   ├── dry-run.ts                           # CREATE
│   └── refill-seeds.ts                      # CREATE
└── tests/
    ├── sanitize.test.ts
    ├── db.test.ts
    ├── mdx.test.ts
    ├── outline.test.ts
    ├── linker.test.ts
    └── planner.test.ts
```

---

## Task 0: Verify branch & prerequisites

**Files:** none (verification only)

- [ ] **Step 1: Confirm we're on `feat/seo-engine-spec` branch**

Run: `cd /root/smatchroom-ecosystem/smatchroom-pulse && git branch --show-current`
Expected: `feat/seo-engine-spec`

- [ ] **Step 2: Rename branch to feature branch**

Run: `git branch -m feat/seo-engine-spec feat/seo-engine`
Expected: branch renamed, still checked out

- [ ] **Step 3: Verify Anthropic API key available**

Run: `grep -h "ANTHROPIC_API_KEY" /root/smatchroom-ecosystem/pulse-sdr/.env`
Expected: line `ANTHROPIC_API_KEY=sk-ant-...`. Note the value for Task 22.

- [ ] **Step 4: Verify Pulse build works as-is**

Run: `cd /root/smatchroom-ecosystem/smatchroom-pulse && npm run build`
Expected: build succeeds (baseline before changes).

---

## Task 1: Install Pulse-side MDX dependencies

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json` (auto)

- [ ] **Step 1: Install MDX runtime + plugins**

Run: `cd /root/smatchroom-ecosystem/smatchroom-pulse && npm install @next/mdx @mdx-js/loader @mdx-js/react gray-matter remark-gfm remark-frontmatter rehype-slug rehype-autolink-headings reading-time`
Expected: packages installed, package.json updated.

> **Next.js 16 note** : on n'installe PAS `next-mdx-remote` (déprécié au profit du dynamic import natif `await import('...mdx')`).
> `remark-frontmatter` est requis pour empêcher `@next/mdx` de rendre visiblement le bloc YAML `---...---` au début de chaque article.

- [ ] **Step 2: Verify package.json**

Run: `grep -E '@next/mdx|gray-matter|remark-gfm' package.json`
Expected: 3 matching lines.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat(seo): ajoute deps MDX (next/mdx, gray-matter, remark/rehype)"
```

---

## Task 2: Wire MDX in next.config.mjs + create mdx-components.jsx

**Files:**
- Modify: `next.config.mjs`
- Create: `mdx-components.jsx` (at repo root — **MANDATORY for App Router + @next/mdx**)

> **Next.js 16 specifics applied** :
> - Plugins listed as **strings** (Turbopack v16 requires string identifiers, not imported function refs)
> - `pageExtensions` includes `md`/`mdx` alongside `js`/`jsx`
> - `turbopack.root` preserved from existing config (user's pre-existing setting)
> - `remark-frontmatter` ahead of `remark-gfm` in the plugin chain to strip YAML headers before rendering

- [ ] **Step 1: Read current config**

Run: `cat next.config.mjs`
Note current shape. Expected: contains `turbopack: { root: path.resolve('.') }` — must be preserved.

- [ ] **Step 2: Replace with MDX-enabled config**

Write to `next.config.mjs`:

```javascript
import path from 'node:path';
import createMDX from '@next/mdx';

const withMDX = createMDX({
  options: {
    // Turbopack v16 requires string plugin identifiers (not function refs)
    remarkPlugins: [['remark-frontmatter', ['yaml']], 'remark-gfm'],
    rehypePlugins: ['rehype-slug', ['rehype-autolink-headings', { behavior: 'wrap' }]],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  turbopack: {
    root: path.resolve('.'),
  },
};

export default withMDX(nextConfig);
```

- [ ] **Step 3: Create `mdx-components.jsx` at repo root**

`@next/mdx` with the App Router REQUIRES this file at the project root, otherwise rendering fails. Minimal pass-through implementation:

```jsx
// mdx-components.jsx — required by @next/mdx (App Router)
export function useMDXComponents(components) {
  return { ...components };
}
```

- [ ] **Step 4: Verify build still works**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 5: Commit**

```bash
git add next.config.mjs mdx-components.jsx
git commit -m "feat(seo): active le pipeline MDX dans Next.js 16 (+ mdx-components.jsx requis)"
```

---

## Task 3: Create content directories & lib/content.js

**Files:**
- Create: `src/content/agent-ia/.gitkeep`
- Create: `src/content/blog/.gitkeep`
- Create: `src/content/solutions/.gitkeep`
- Create: `src/lib/content.js`

- [ ] **Step 1: Create empty content dirs**

Run: `mkdir -p src/content/agent-ia src/content/blog src/content/solutions && touch src/content/agent-ia/.gitkeep src/content/blog/.gitkeep src/content/solutions/.gitkeep`

- [ ] **Step 2: Write `src/lib/content.js`**

```javascript
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const CONTENT_ROOT = path.join(process.cwd(), 'src', 'content');

export function listArticles(cluster) {
  const dir = path.join(CONTENT_ROOT, cluster);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => readArticle(cluster, f.replace(/\.mdx$/, '')))
    .filter(Boolean)
    .sort((a, b) => (a.frontmatter.publishedAt < b.frontmatter.publishedAt ? 1 : -1));
}

export function readArticle(cluster, slug) {
  const file = path.join(CONTENT_ROOT, cluster, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, 'utf8');
  const { data, content } = matter(raw);
  return {
    slug,
    cluster,
    frontmatter: data,
    bodyMarkdown: content,
    readingMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
  };
}

export function listAllPublished() {
  return ['agent-ia', 'blog', 'solutions'].flatMap(listArticles);
}
```

- [ ] **Step 3: Smoke test**

Run: `node -e "import('./src/lib/content.js').then(m => console.log(m.listArticles('blog')))"`
Expected: `[]` (no articles yet).

- [ ] **Step 4: Commit**

```bash
git add src/lib/content.js src/content/
git commit -m "feat(seo): scan MDX (src/lib/content.js) + dossiers content/"
```

---

## Task 4: Article + ArticleCard components

**Files:**
- Create: `src/components/Article.jsx`
- Create: `src/components/ArticleCard.jsx`

- [ ] **Step 1: Write `src/components/Article.jsx`**

```jsx
import Link from 'next/link';

export default function Article({ article, mdxContent, related = [] }) {
  const { frontmatter, cluster, slug, readingMinutes } = article;
  const breadcrumbLabel = cluster === 'agent-ia' ? 'Agent IA' : cluster === 'blog' ? 'Blog' : 'Solutions';
  const breadcrumbHref = `/${cluster}`;

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 prose prose-invert">
      <nav className="text-sm text-neutral-400 mb-6">
        <Link href="/">Accueil</Link> <span className="mx-2">›</span>
        <Link href={breadcrumbHref}>{breadcrumbLabel}</Link> <span className="mx-2">›</span>
        <span>{frontmatter.title}</span>
      </nav>

      <h1 className="text-4xl font-semibold leading-tight mb-4">{frontmatter.title}</h1>

      <p className="text-sm text-neutral-400 mb-12">
        Publié le {new Date(frontmatter.publishedAt).toLocaleDateString('fr-FR')}
        {' · '}{readingMinutes} min de lecture
        {' · '}<span className="font-mono">{frontmatter.primaryKeyword}</span>
      </p>

      <div className="article-body">{mdxContent}</div>

      <section className="mt-16 p-8 rounded-2xl border border-neutral-800 bg-neutral-950/60">
        <h2 className="text-2xl font-semibold mb-3">Discutons de votre projet</h2>
        <p className="text-neutral-300 mb-6">
          Vous voulez déployer un agent IA sur votre périmètre ? Réservez 30 minutes
          avec notre équipe pour cadrer l'angle d'attaque.
        </p>
        <a
          href="https://calendly.com/a-fontana-smatchroom/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-neutral-200"
        >
          Réserver un créneau
        </a>
      </section>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-semibold mb-6">À lire aussi</h2>
          <ul className="space-y-3">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/${r.cluster}/${r.slug}`} className="hover:underline">
                  {r.frontmatter.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {frontmatter.jsonLd?.article && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(frontmatter.jsonLd.article) }}
        />
      )}
      {frontmatter.jsonLd?.faqPage && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(frontmatter.jsonLd.faqPage) }}
        />
      )}
    </article>
  );
}
```

- [ ] **Step 2: Write `src/components/ArticleCard.jsx`**

```jsx
import Link from 'next/link';

export default function ArticleCard({ article }) {
  const href = `/${article.cluster}/${article.slug}`;
  return (
    <Link href={href} className="block p-6 rounded-2xl border border-neutral-800 hover:border-neutral-600 transition">
      <h3 className="text-lg font-semibold mb-2">{article.frontmatter.title}</h3>
      <p className="text-sm text-neutral-400 mb-3">{article.frontmatter.metaDescription}</p>
      <p className="text-xs text-neutral-500">
        {new Date(article.frontmatter.publishedAt).toLocaleDateString('fr-FR')}
        {' · '}{article.readingMinutes} min
      </p>
    </Link>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Article.jsx src/components/ArticleCard.jsx
git commit -m "feat(seo): composants Article et ArticleCard"
```

---

## Task 5: Routes /blog and /blog/[slug]

**Files:**
- Create: `src/app/blog/page.jsx`
- Create: `src/app/blog/[slug]/page.jsx`

- [ ] **Step 1: Write `src/app/blog/page.jsx`**

```jsx
import { listArticles } from '@/lib/content';
import ArticleCard from '@/components/ArticleCard';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Blog — SmatchRoom Pulse',
  description: 'Guides, retours d\'expérience et analyses sur les agents IA en B2B.',
};

export default function BlogIndex() {
  const articles = listArticles('blog');
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-5xl px-6 py-24">
        <h1 className="text-5xl font-semibold mb-4">Blog</h1>
        <p className="text-neutral-400 mb-16">Guides, analyses, retours terrain.</p>
        {articles.length === 0 ? (
          <p className="text-neutral-500">Aucun article publié pour le moment.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {articles.map((a) => <ArticleCard key={a.slug} article={a} />)}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Write `src/app/blog/[slug]/page.jsx`**

> **Next.js 16 pattern** : `params` est un `Promise` (à await), et le rendu MDX se fait
> via dynamic import natif `await import(...mdx)` — pas via `next-mdx-remote`.

```jsx
import { notFound } from 'next/navigation';
import { listArticles, readArticle } from '@/lib/content';
import Article from '@/components/Article';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export function generateStaticParams() {
  return listArticles('blog').map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = readArticle('blog', slug);
  if (!article) return {};
  return {
    title: article.frontmatter.metaTitle || article.frontmatter.title,
    description: article.frontmatter.metaDescription,
  };
}

export default async function BlogArticle({ params }) {
  const { slug } = await params;
  const article = readArticle('blog', slug);
  if (!article) notFound();
  const related = listArticles('blog').filter((a) => a.slug !== article.slug).slice(0, 3);
  const { default: MdxContent } = await import(`@/content/blog/${slug}.mdx`);
  return (
    <>
      <Nav />
      <Article article={article} mdxContent={<MdxContent />} related={related} />
      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: succeeds (no articles yet, but routes compile).

- [ ] **Step 4: Commit**

```bash
git add src/app/blog
git commit -m "feat(seo): routes /blog et /blog/[slug] (SSG via dynamic MDX import)"
```

---

## Task 6: Routes /agent-ia and /agent-ia/[slug]

**Files:**
- Create: `src/app/agent-ia/page.jsx`
- Create: `src/app/agent-ia/[slug]/page.jsx`

- [ ] **Step 1: Write `src/app/agent-ia/page.jsx`**

```jsx
import { listArticles } from '@/lib/content';
import ArticleCard from '@/components/ArticleCard';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Agent IA : guides, cas d\'usage et coûts — SmatchRoom Pulse',
  description: 'Tout ce qu\'il faut savoir pour comprendre, choisir et déployer un agent IA en entreprise.',
};

export default function AgentIaHub() {
  const articles = listArticles('agent-ia');
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-5xl px-6 py-24">
        <h1 className="text-5xl font-semibold mb-4">Agent IA</h1>
        <p className="text-neutral-400 mb-16 max-w-2xl">
          Guides pratiques, comparatifs, coûts, cas d'usage : tout ce que vous devez savoir
          pour déployer un agent IA performant dans votre organisation.
        </p>
        {articles.length === 0 ? (
          <p className="text-neutral-500">Aucun article publié pour le moment.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {articles.map((a) => <ArticleCard key={a.slug} article={a} />)}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Write `src/app/agent-ia/[slug]/page.jsx`**

> Pattern Next.js 16 : async params + dynamic MDX import (cf. note Task 5).

```jsx
import { notFound } from 'next/navigation';
import { listArticles, readArticle } from '@/lib/content';
import Article from '@/components/Article';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export function generateStaticParams() {
  return listArticles('agent-ia').map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = readArticle('agent-ia', slug);
  if (!article) return {};
  return {
    title: article.frontmatter.metaTitle || article.frontmatter.title,
    description: article.frontmatter.metaDescription,
  };
}

export default async function AgentIaArticle({ params }) {
  const { slug } = await params;
  const article = readArticle('agent-ia', slug);
  if (!article) notFound();
  const related = listArticles('agent-ia').filter((a) => a.slug !== article.slug).slice(0, 3);
  const { default: MdxContent } = await import(`@/content/agent-ia/${slug}.mdx`);
  return (
    <>
      <Nav />
      <Article article={article} mdxContent={<MdxContent />} related={related} />
      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Build check**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/app/agent-ia
git commit -m "feat(seo): cluster /agent-ia (hub + article SSG)"
```

---

## Task 7: Landings /solutions/[slug] + 3 MDX files

**Files:**
- Create: `src/app/solutions/[slug]/page.jsx`
- Create: `src/content/solutions/agent-sdr.mdx`
- Create: `src/content/solutions/agent-support.mdx`
- Create: `src/content/solutions/agent-sur-mesure.mdx`

- [ ] **Step 1: Write `src/app/solutions/[slug]/page.jsx`**

```jsx
import { notFound } from 'next/navigation';
import { listArticles, readArticle } from '@/lib/content';
import Article from '@/components/Article';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export function generateStaticParams() {
  return listArticles('solutions').map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = readArticle('solutions', slug);
  if (!article) return {};
  return {
    title: article.frontmatter.metaTitle || article.frontmatter.title,
    description: article.frontmatter.metaDescription,
  };
}

export default async function SolutionPage({ params }) {
  const { slug } = await params;
  const article = readArticle('solutions', slug);
  if (!article) notFound();
  const { default: MdxContent } = await import(`@/content/solutions/${slug}.mdx`);
  return (
    <>
      <Nav />
      <Article article={article} mdxContent={<MdxContent />} />
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Write `src/content/solutions/agent-sdr.mdx`**

```markdown
---
title: "Agent IA SDR : qualifier et prospecter sans recruter"
metaTitle: "Agent IA SDR : automatiser la prospection B2B | SmatchRoom Pulse"
metaDescription: "Déployez un agent IA SDR qui qualifie vos leads, enrichit vos contacts et déclenche les bonnes séquences. Sans recruter une équipe."
publishedAt: "2026-05-13T10:00:00.000Z"
primaryKeyword: "agent ia sdr"
cluster: "solutions"
jsonLd:
  article:
    "@context": "https://schema.org"
    "@type": "Service"
    "name": "Agent IA SDR sur-mesure"
    "provider":
      "@type": "Organization"
      "name": "SmatchRoom Pulse"
      "url": "https://pulse.smatchroom.com"
    "areaServed": "FR"
    "description": "Agent IA SDR qui qualifie les leads B2B et déclenche les séquences commerciales."
---

## Le problème : votre pipeline SDR coûte trop cher

Un SDR salarié coûte entre 45 000 et 70 000 € chargés par an. Pour un ROI positif,
il doit qualifier des dizaines de leads par jour — et c'est rarement le cas.

Les outils no-code (chatbots, formulaires) capturent mais ne **qualifient pas**.

## Ce que fait votre Agent IA SDR

- **Enrichit** chaque lead entrant (rôle, taille d'équipe, stack, signaux d'achat) via APIs B2B.
- **Qualifie** au téléphone, en mail ou en chat, avec votre script et votre ton.
- **Route** vers le bon AE selon vos règles, ou disqualifie proprement avec feedback.
- **Synchronise** dans votre CRM (HubSpot, Pipedrive, Salesforce) en temps réel.
- **Apprend** de vos retours pour affiner la qualification semaine après semaine.

## Pourquoi un agent sur-mesure plutôt qu'un SaaS générique

Les SaaS de prospection vous imposent leur logique. Un agent SmatchRoom Pulse
est cadré sur **votre ICP**, **vos critères**, **vos intégrations existantes** —
et reste votre propriété intellectuelle.

## Cas d'usage typiques

- SaaS B2B avec >50 leads inbound/mois
- Cabinets de conseil et ESN avec qualification longue
- Marketplaces avec onboarding vendeur à filtrer

## Ce que vous obtenez

- Cadrage offert (30 min) pour définir périmètre et succès
- Setup en 2 à 4 semaines selon complexité
- Forfait mensuel transparent (Pilote 249€/mois, Squad 690€/mois, ou Custom)
- Reporting hebdomadaire des qualifications

## Comment démarrer

Réservez 30 minutes avec notre équipe. Nous regardons votre flux actuel,
identifions les goulots, et chiffrons un Pilote ciblé.

[Réserver un créneau](https://calendly.com/a-fontana-smatchroom/30min)
```

- [ ] **Step 3: Write `src/content/solutions/agent-support.mdx`**

```markdown
---
title: "Agent IA Support : automatiser les tickets de niveau 1"
metaTitle: "Agent IA Support client : résoudre 60% des tickets en autonomie"
metaDescription: "Déployez un agent IA support qui résout les questions récurrentes, escalade intelligemment et apprend de vos résolutions humaines."
publishedAt: "2026-05-13T10:05:00.000Z"
primaryKeyword: "agent ia support"
cluster: "solutions"
jsonLd:
  article:
    "@context": "https://schema.org"
    "@type": "Service"
    "name": "Agent IA Support sur-mesure"
    "provider":
      "@type": "Organization"
      "name": "SmatchRoom Pulse"
      "url": "https://pulse.smatchroom.com"
    "areaServed": "FR"
    "description": "Agent IA qui automatise le support client niveau 1 et escalade les cas complexes."
---

## Le problème : votre support sature sur des questions répétitives

50 à 70 % des tickets entrants sont des questions déjà documentées dans votre
base de connaissances. Vos agents humains y passent leur temps au lieu de
traiter les cas vraiment complexes.

## Ce que fait votre Agent IA Support

- **Lit** votre base documentaire (Notion, Helpscout, Zendesk, Confluence) et la garde à jour.
- **Répond** dans le ton et le style de votre marque, en mail, chat, ou ticket.
- **Identifie** les cas qui doivent être escaladés et le fait avec contexte complet.
- **Détecte** les patterns récurrents et vous signale les sujets à documenter.
- **Trace** chaque résolution pour audit et amélioration continue.

## Pourquoi pas un chatbot classique

Un chatbot répond par scripts pré-écrits et casse dès qu'on sort du chemin.
Un agent IA SmatchRoom Pulse **raisonne** sur votre documentation et adapte
sa réponse — tout en sachant quand passer la main.

## Cas d'usage typiques

- SaaS B2B avec base d'utilisateurs >500
- E-commerce avec questions livraison/retour récurrentes
- Services financiers où la conformité réglementaire impose une trace exhaustive

## Ce que vous obtenez

- Audit gratuit de votre base de tickets (30 min) pour estimer le taux de déflection
- Intégration native à votre helpdesk
- Forfaits transparents (Pilote 249€/mois pour 1 canal, Squad 690€/mois pour
  multi-canal + analytics, ou Custom)
- Garantie : taux d'escalade humaine mesurée chaque semaine

## Comment démarrer

Audit gratuit en 30 minutes. Nous regardons un échantillon de vos derniers tickets
et chiffrons un Pilote sur le canal le plus saturé.

[Réserver un créneau](https://calendly.com/a-fontana-smatchroom/30min)
```

- [ ] **Step 4: Write `src/content/solutions/agent-sur-mesure.mdx`**

```markdown
---
title: "Agent IA sur-mesure : workflow propriétaire en quelques semaines"
metaTitle: "Agent IA sur-mesure : votre workflow B2B propriétaire | SmatchRoom Pulse"
metaDescription: "Un agent IA conçu sur votre processus métier, intégré à votre stack, et qui reste votre propriété. Du cadrage au déploiement en 4-8 semaines."
publishedAt: "2026-05-13T10:10:00.000Z"
primaryKeyword: "agent ia sur-mesure"
cluster: "solutions"
jsonLd:
  article:
    "@context": "https://schema.org"
    "@type": "Service"
    "name": "Agent IA sur-mesure"
    "provider":
      "@type": "Organization"
      "name": "SmatchRoom Pulse"
      "url": "https://pulse.smatchroom.com"
    "areaServed": "FR"
    "description": "Conception et déploiement d'agents IA sur-mesure pour workflows B2B propriétaires."
---

## Quand le sur-mesure devient indispensable

Les SaaS génériques s'arrêtent là où votre métier commence. Si votre workflow
implique des règles métier propres, des intégrations spécifiques, ou un niveau
de qualité que vous ne pouvez pas déléguer à un éditeur tiers, l'agent
sur-mesure devient l'option rationnelle.

## Notre méthode en 3 phases

### 1. Cadrage (1 semaine)

- Cartographie du workflow cible (entrées, étapes, sorties, points de friction)
- Définition des indicateurs de succès et des contraintes
- Spécification technique et choix d'architecture

### 2. Pilote (2 à 4 semaines)

- Construction de l'agent sur un périmètre restreint
- Tests en conditions réelles avec votre équipe
- Itérations rapides sur le ton, les règles, les escalades

### 3. Déploiement (1 à 2 semaines)

- Mise en production sur l'ensemble du périmètre
- Monitoring, alerting, dashboards
- Formation de votre équipe au pilotage

## Stack technique

- Modèles : Claude (Anthropic), GPT-4 (OpenAI), Mistral selon le cas d'usage
- Orchestration : LangChain, LangGraph
- Intégrations : Slack, HubSpot, Pipedrive, Salesforce, Notion, n8n, Make, APIs custom
- Hébergement : votre infrastructure ou la nôtre (RGPD-compliant)

## Ce qui reste votre propriété

- **Le code** de l'agent (livré sur votre dépôt git)
- **Les prompts** et la logique métier
- **Les données** et leur acheminement
- **Le modèle** (vous restez maître du choix et du switch)

## Tarification

Selon complexité et périmètre :
- **Pilote** : 249€/mois (1 agent, périmètre cadré)
- **Squad** : 690€/mois (plusieurs agents orchestrés)
- **Custom** : sur devis (workflows complexes, multi-tenant, conformité avancée)

Setup unique selon ampleur (490€ à 1 490€ pour Pilote/Squad, custom sur devis).

## Comment démarrer

Un cadrage initial de 30 minutes pour comprendre votre workflow et chiffrer le Pilote.

[Réserver un créneau](https://calendly.com/a-fontana-smatchroom/30min)
```

- [ ] **Step 5: Build check**

Run: `npm run build`
Expected: 3 static `/solutions/*` routes generated.

- [ ] **Step 6: Commit**

```bash
git add src/app/solutions src/content/solutions
git commit -m "feat(seo): 3 landings /solutions/ (agent-sdr, agent-support, sur-mesure)"
```

---

## Task 8: Sitemap and robots (Next.js 16 file conventions)

**Files:**
- Create: `src/app/sitemap.js` (file convention — Next.js sérialise en XML auto)
- Create: `src/app/robots.js` (file convention — Next.js sérialise en text/plain auto)

> **Next.js 16 file convention** : on n'utilise PAS un Route Handler `route.js` qui
> renvoie du XML/text à la main. On exporte un default `function sitemap()` /
> `function robots()` qui retourne un objet typé, Next.js gère la sérialisation.

- [ ] **Step 1: Write `src/app/sitemap.js`**

```javascript
import { listAllPublished } from '@/lib/content';

const BASE = 'https://pulse.smatchroom.com';

export default function sitemap() {
  const articles = listAllPublished();

  const staticUrls = [
    { url: BASE, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE}/agent-ia`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
  ];

  const dynamicUrls = articles.map((a) => ({
    url: `${BASE}/${a.cluster}/${a.slug}`,
    lastModified: new Date(a.frontmatter.publishedAt),
    changeFrequency: 'monthly',
    priority: a.cluster === 'solutions' ? 0.9 : 0.7,
  }));

  return [...staticUrls, ...dynamicUrls];
}
```

- [ ] **Step 2: Write `src/app/robots.js`**

```javascript
export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://pulse.smatchroom.com/sitemap.xml',
  };
}
```

- [ ] **Step 3: Build check**

Run: `npm run build`
Expected: succeeds. After `npm run start`, `curl http://127.0.0.1:3001/sitemap.xml` returns valid XML and `curl http://127.0.0.1:3001/robots.txt` returns text.

- [ ] **Step 4: Commit**

```bash
git add src/app/sitemap.js src/app/robots.js
git commit -m "feat(seo): sitemap.js et robots.js (Next.js 16 file conventions)"
```

---

## Task 9: Skeleton seo-engine package

**Files:**
- Create: `src/seo-engine/package.json`
- Create: `src/seo-engine/tsconfig.json`
- Create: `src/seo-engine/.env.example`
- Create: `src/seo-engine/.gitignore`

- [ ] **Step 1: Write `src/seo-engine/package.json`**

```json
{
  "name": "pulse-seo-engine",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "tsc",
    "test": "vitest run",
    "seo:once": "node dist/index.js",
    "seo:dry-run": "node dist/scripts/dry-run.js",
    "seo:init-db": "node dist/scripts/init-db.js"
  },
  "dependencies": {
    "@anthropic-ai/sdk": "^0.30.0",
    "better-sqlite3": "^11.3.0",
    "dotenv": "^16.4.5",
    "gray-matter": "^4.0.3",
    "pino": "^9.5.0",
    "pino-pretty": "^11.3.0",
    "simple-git": "^3.27.0",
    "slugify": "^1.6.6",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@types/better-sqlite3": "^7.6.11",
    "@types/node": "^22.10.0",
    "typescript": "^5.7.2",
    "vitest": "^2.1.8"
  }
}
```

- [ ] **Step 2: Write `src/seo-engine/tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ES2022",
    "moduleResolution": "Bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "outDir": "dist",
    "rootDir": ".",
    "declaration": false,
    "sourceMap": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true
  },
  "include": ["**/*.ts"],
  "exclude": ["node_modules", "dist", "tests"]
}
```

- [ ] **Step 3: Write `src/seo-engine/.env.example`**

```
ANTHROPIC_API_KEY=sk-ant-xxx
GIT_AUTHOR_NAME=Pulse SEO Bot
GIT_AUTHOR_EMAIL=seo-bot@smatchroom.com
MAX_COST_PER_ARTICLE_USD=0.50
MAX_COST_PER_MONTH_USD=20.00
MIN_DISK_FREE_MB=500
SITE_BASE_URL=https://pulse.smatchroom.com
PULSE_PM2_NAME=smatchroom-pulse
NODE_ENV=production
```

- [ ] **Step 4: Write `src/seo-engine/.gitignore`**

```
node_modules
dist
data/
.env
*.log
```

- [ ] **Step 5: Install deps**

Run: `cd src/seo-engine && npm install`
Expected: deps installed, lockfile created.

- [ ] **Step 6: Verify TS compiles empty project**

Run: `cd src/seo-engine && npx tsc --noEmit`
Expected: no errors (no .ts files yet, success).

- [ ] **Step 7: Commit**

```bash
git add src/seo-engine/package.json src/seo-engine/package-lock.json src/seo-engine/tsconfig.json src/seo-engine/.env.example src/seo-engine/.gitignore
git commit -m "feat(seo): squelette seo-engine (TS, deps, tsconfig)"
```

---

## Task 10: Logger + types + sanitize + paths (with tests)

**Files:**
- Create: `src/seo-engine/lib/logger.ts`
- Create: `src/seo-engine/lib/types.ts`
- Create: `src/seo-engine/lib/sanitize.ts`
- Create: `src/seo-engine/lib/paths.ts`
- Create: `src/seo-engine/tests/sanitize.test.ts`

> **Path strategy** : tous les fichiers du moteur (seeds, data, dist, content) sont
> résolus depuis `process.cwd()` qui doit être `src/seo-engine/`. C'est garanti par :
> (a) les npm scripts (`npm run …`) qui s'exécutent dans le dossier du package.json ;
> (b) la directive pm2 `cwd: '…/src/seo-engine'` ; (c) vitest qui hérite du même cwd.
> Ne pas utiliser `import.meta.dirname` car il pointe vers `dist/` après compilation.

- [ ] **Step 1: Write `src/seo-engine/lib/logger.ts`**

```typescript
import pino from 'pino';

const isProduction = process.env.NODE_ENV === 'production';

export const logger = pino({
  level: process.env.LOG_LEVEL ?? 'info',
  transport: isProduction
    ? undefined
    : {
        target: 'pino-pretty',
        options: { colorize: true, translateTime: 'HH:MM:ss.l' },
      },
});
```

- [ ] **Step 2: Write `src/seo-engine/lib/types.ts`**

```typescript
export type Cluster = 'agent-ia' | 'blog';
export type ArticleStatus = 'pending' | 'in_progress' | 'published' | 'failed' | 'skipped';
export type SearchIntent = 'informational' | 'commercial' | 'transactional';

export interface TopicProposal {
  slug: string;
  title: string;
  primaryKeyword: string;
  searchIntent: SearchIntent;
  cluster: Cluster;
  questionLongTail: string;
  estimatedDifficulty: 1 | 2 | 3 | 4 | 5;
}

export interface ArticleFrontmatter {
  title: string;
  metaTitle: string;
  metaDescription: string;
  publishedAt: string;
  primaryKeyword: string;
  cluster: Cluster;
  readingMinutes: number;
  jsonLd: { article: Record<string, unknown>; faqPage: Record<string, unknown> };
}

export interface GeneratedArticle {
  slug: string;
  cluster: Cluster;
  frontmatter: ArticleFrontmatter;
  bodyMarkdown: string;
  cost: { inputTokens: number; outputTokens: number; cacheReadTokens: number; usd: number };
}

export interface LinkBankEntry {
  anchor: string;
  url: string;
  context: string;
  priority: number;
}

export interface SeedAngle {
  slug: string;
  title: string;
  primaryKeyword: string;
  cluster: Cluster;
  searchIntent: SearchIntent;
  questionLongTail: string;
}
```

- [ ] **Step 3: Write `src/seo-engine/lib/sanitize.ts`**

```typescript
const INJECTION_PATTERNS: RegExp[] = [
  /<\|im_start\|>/gi,
  /<\|im_end\|>/gi,
  /<\/?(system|user|assistant)>/gi,
  /\[\[INST\]\]/gi,
  /\[\[\/INST\]\]/gi,
  /\bignore (?:all )?(?:previous|prior) instructions?\b/gi,
];

export function sanitizeUserText(input: string, maxLength = 2000): string {
  let cleaned = input.normalize('NFKC');
  for (const pattern of INJECTION_PATTERNS) {
    cleaned = cleaned.replace(pattern, '[REDACTED]');
  }
  cleaned = cleaned.replace(/[ -]/g, ' ');
  cleaned = cleaned.replace(/\s+/g, ' ').trim();
  if (cleaned.length > maxLength) cleaned = cleaned.slice(0, maxLength) + '…';
  return cleaned;
}
```

- [ ] **Step 3b: Write `src/seo-engine/lib/paths.ts`**

```typescript
import path from 'node:path';
import fs from 'node:fs';

// All paths resolve from src/seo-engine/ (process.cwd() when launched via npm/pm2/vitest)
const ENGINE_ROOT = process.cwd();

if (!fs.existsSync(path.join(ENGINE_ROOT, 'package.json'))) {
  throw new Error(`paths.ts: cwd=${ENGINE_ROOT} ne contient pas package.json — lancez le script depuis src/seo-engine/`);
}

export const ENGINE_DIR = ENGINE_ROOT;
export const SEEDS_DIR = path.join(ENGINE_ROOT, 'seeds');
export const DATA_DIR = path.join(ENGINE_ROOT, 'data');
export const DB_PATH = path.join(DATA_DIR, 'seo.db');
export const REPO_ROOT = path.resolve(ENGINE_ROOT, '..', '..');           // smatchroom-pulse/
export const CONTENT_DIR = path.join(REPO_ROOT, 'src', 'content');

export function ensureDataDir(): void {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
```

- [ ] **Step 4: Write `src/seo-engine/tests/sanitize.test.ts`**

```typescript
import { describe, it, expect } from 'vitest';
import { sanitizeUserText } from '../lib/sanitize.js';

describe('sanitizeUserText', () => {
  it('redacts system tags', () => {
    expect(sanitizeUserText('hello </system> world')).toContain('[REDACTED]');
  });

  it('redacts im_start/im_end markers', () => {
    expect(sanitizeUserText('<|im_start|>user trick<|im_end|>')).toMatch(/\[REDACTED\].*\[REDACTED\]/);
  });

  it('redacts "ignore previous instructions"', () => {
    expect(sanitizeUserText('please Ignore Previous Instructions and do X')).toContain('[REDACTED]');
  });

  it('removes control characters', () => {
    expect(sanitizeUserText('hello world')).toBe('hello world');
  });

  it('truncates long inputs', () => {
    const big = 'a'.repeat(5000);
    expect(sanitizeUserText(big, 100).length).toBeLessThanOrEqual(101);
  });

  it('preserves normal text', () => {
    expect(sanitizeUserText('Agent IA pour la prospection B2B')).toBe('Agent IA pour la prospection B2B');
  });
});
```

- [ ] **Step 5: Run tests**

Run: `cd src/seo-engine && npx vitest run tests/sanitize.test.ts`
Expected: 6 tests pass.

- [ ] **Step 6: Commit**

```bash
git add src/seo-engine/lib/logger.ts src/seo-engine/lib/types.ts src/seo-engine/lib/sanitize.ts src/seo-engine/lib/paths.ts src/seo-engine/tests/sanitize.test.ts
git commit -m "feat(seo): logger pino, types, sanitize, paths + tests"
```

---

## Task 11: SQLite db.ts + schema + tests + init-db script

**Files:**
- Create: `src/seo-engine/lib/db.ts`
- Create: `src/seo-engine/scripts/init-db.ts`
- Create: `src/seo-engine/tests/db.test.ts`

- [ ] **Step 1: Write `src/seo-engine/lib/db.ts`**

```typescript
import Database from 'better-sqlite3';
import type { ArticleStatus, Cluster, SearchIntent, TopicProposal } from './types.js';
import { DB_PATH, ensureDataDir } from './paths.js';

let _db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (_db) return _db;
  ensureDataDir();
  _db = new Database(DB_PATH);
  _db.pragma('journal_mode = WAL');
  _db.pragma('foreign_keys = ON');
  return _db;
}

export const SCHEMA = `
CREATE TABLE IF NOT EXISTS topics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  primary_keyword TEXT NOT NULL,
  cluster TEXT NOT NULL CHECK (cluster IN ('agent-ia', 'blog')),
  search_intent TEXT NOT NULL,
  question_long_tail TEXT NOT NULL,
  estimated_difficulty INTEGER NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'in_progress', 'published', 'failed', 'skipped')),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS articles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  topic_id INTEGER NOT NULL REFERENCES topics(id),
  slug TEXT UNIQUE NOT NULL,
  cluster TEXT NOT NULL,
  mdx_path TEXT NOT NULL,
  published_at TEXT,
  cost_usd REAL NOT NULL DEFAULT 0,
  input_tokens INTEGER NOT NULL DEFAULT 0,
  output_tokens INTEGER NOT NULL DEFAULT 0,
  cache_read_tokens INTEGER NOT NULL DEFAULT 0,
  error_message TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS runs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  started_at TEXT NOT NULL DEFAULT (datetime('now')),
  finished_at TEXT,
  status TEXT NOT NULL CHECK (status IN ('running', 'success', 'failed')),
  topic_id INTEGER REFERENCES topics(id),
  article_id INTEGER REFERENCES articles(id),
  total_cost_usd REAL NOT NULL DEFAULT 0,
  error_message TEXT
);

CREATE INDEX IF NOT EXISTS idx_topics_status ON topics(status);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at);
CREATE INDEX IF NOT EXISTS idx_runs_started_at ON runs(started_at);
`;

export function initSchema(): void {
  getDb().exec(SCHEMA);
}

// ---------- topics ----------

export function findTopicBySlug(slug: string): { id: number; status: ArticleStatus } | undefined {
  return getDb().prepare('SELECT id, status FROM topics WHERE slug = ?').get(slug) as
    | { id: number; status: ArticleStatus }
    | undefined;
}

export function insertTopic(t: TopicProposal): number {
  const stmt = getDb().prepare(`
    INSERT INTO topics (slug, title, primary_keyword, cluster, search_intent, question_long_tail, estimated_difficulty, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')
  `);
  return Number(stmt.run(
    t.slug, t.title, t.primaryKeyword, t.cluster, t.searchIntent, t.questionLongTail, t.estimatedDifficulty,
  ).lastInsertRowid);
}

export function updateTopicStatus(slug: string, status: ArticleStatus): void {
  getDb().prepare(`UPDATE topics SET status = ?, updated_at = datetime('now') WHERE slug = ?`).run(status, slug);
}

export function findStaleInProgress(maxHours = 24): { slug: string; title: string; cluster: Cluster; search_intent: SearchIntent; primary_keyword: string; question_long_tail: string; estimated_difficulty: number } | undefined {
  return getDb().prepare(`
    SELECT slug, title, cluster, search_intent, primary_keyword, question_long_tail, estimated_difficulty
    FROM topics
    WHERE status = 'in_progress' AND updated_at <= datetime('now', ?)
    LIMIT 1
  `).get(`-${maxHours} hours`) as any;
}

export function listRecentArticles(cluster: Cluster, limit = 5): { slug: string; title: string }[] {
  return getDb().prepare(`
    SELECT a.slug, t.title
    FROM articles a JOIN topics t ON t.id = a.topic_id
    WHERE a.cluster = ? AND a.published_at IS NOT NULL
    ORDER BY a.published_at DESC LIMIT ?
  `).all(cluster, limit) as { slug: string; title: string }[];
}

// ---------- articles ----------

export function insertArticle(args: {
  topicId: number; slug: string; cluster: Cluster; mdxPath: string;
  costUsd: number; inputTokens: number; outputTokens: number; cacheReadTokens: number;
}): number {
  const stmt = getDb().prepare(`
    INSERT INTO articles (topic_id, slug, cluster, mdx_path, cost_usd, input_tokens, output_tokens, cache_read_tokens)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  return Number(stmt.run(
    args.topicId, args.slug, args.cluster, args.mdxPath, args.costUsd,
    args.inputTokens, args.outputTokens, args.cacheReadTokens,
  ).lastInsertRowid);
}

export function markArticlePublished(slug: string): void {
  getDb().prepare(`UPDATE articles SET published_at = datetime('now') WHERE slug = ?`).run(slug);
}

export function markArticleFailed(slug: string, err: string): void {
  getDb().prepare(`UPDATE articles SET error_message = ? WHERE slug = ?`).run(err, slug);
}

// ---------- runs ----------

export function startRun(topicId?: number): number {
  const stmt = getDb().prepare(`INSERT INTO runs (status, topic_id) VALUES ('running', ?)`);
  return Number(stmt.run(topicId ?? null).lastInsertRowid);
}

export function finishRun(id: number, args: { status: 'success' | 'failed'; articleId?: number; costUsd?: number; error?: string }): void {
  getDb().prepare(`
    UPDATE runs SET status = ?, article_id = ?, total_cost_usd = ?, error_message = ?, finished_at = datetime('now')
    WHERE id = ?
  `).run(args.status, args.articleId ?? null, args.costUsd ?? 0, args.error ?? null, id);
}

export function monthlyCostUsd(): number {
  const row = getDb().prepare(`
    SELECT COALESCE(SUM(cost_usd), 0) AS total
    FROM articles
    WHERE published_at >= date('now', 'start of month')
  `).get() as { total: number };
  return row.total;
}

export function closeDb(): void {
  if (_db) { _db.close(); _db = null; }
}
```

- [ ] **Step 2: Write `src/seo-engine/scripts/init-db.ts`**

```typescript
import { initSchema, closeDb } from '../lib/db.js';
import { logger } from '../lib/logger.js';

initSchema();
logger.info('Database schema initialized at src/seo-engine/data/seo.db');
closeDb();
```

- [ ] **Step 3: Write `src/seo-engine/tests/db.test.ts`**

```typescript
import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { initSchema, insertTopic, findTopicBySlug, updateTopicStatus, insertArticle, markArticlePublished, monthlyCostUsd, closeDb, startRun, finishRun } from '../lib/db.js';

const DB_PATH = path.join(import.meta.dirname, '..', 'data', 'seo.db');

beforeEach(() => {
  closeDb();
  if (fs.existsSync(DB_PATH)) fs.unlinkSync(DB_PATH);
  initSchema();
});

afterAll(() => closeDb());

describe('db', () => {
  it('inserts and finds a topic by slug', () => {
    const id = insertTopic({
      slug: 'agent-ia-vs-chatbot', title: 'Agent IA vs Chatbot',
      primaryKeyword: 'agent ia vs chatbot', cluster: 'agent-ia',
      searchIntent: 'informational', questionLongTail: 'Quelle différence ?',
      estimatedDifficulty: 3,
    });
    expect(id).toBeGreaterThan(0);
    const found = findTopicBySlug('agent-ia-vs-chatbot');
    expect(found?.status).toBe('pending');
  });

  it('updates topic status', () => {
    insertTopic({
      slug: 'cost-agent-ia', title: 'Coût agent IA',
      primaryKeyword: 'coût agent ia', cluster: 'agent-ia',
      searchIntent: 'commercial', questionLongTail: 'Combien ?',
      estimatedDifficulty: 2,
    });
    updateTopicStatus('cost-agent-ia', 'published');
    expect(findTopicBySlug('cost-agent-ia')?.status).toBe('published');
  });

  it('computes monthly cost', () => {
    const topicId = insertTopic({
      slug: 'x', title: 'X', primaryKeyword: 'x', cluster: 'blog',
      searchIntent: 'informational', questionLongTail: 'X?', estimatedDifficulty: 1,
    });
    insertArticle({ topicId, slug: 'x', cluster: 'blog', mdxPath: '/tmp/x.mdx',
      costUsd: 0.25, inputTokens: 100, outputTokens: 200, cacheReadTokens: 50 });
    markArticlePublished('x');
    expect(monthlyCostUsd()).toBeCloseTo(0.25);
  });

  it('tracks runs', () => {
    const runId = startRun();
    finishRun(runId, { status: 'success', costUsd: 0.3 });
    // (No public reader; tested via SQL probe if needed)
    expect(runId).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 4: Build + run tests**

Run: `cd src/seo-engine && npm run build && npx vitest run tests/db.test.ts`
Expected: 4 tests pass.

- [ ] **Step 5: Run init-db**

Run: `cd src/seo-engine && node dist/scripts/init-db.js`
Expected: log `Database schema initialized…`, file `data/seo.db` exists.

- [ ] **Step 6: Commit**

```bash
git add src/seo-engine/lib/db.ts src/seo-engine/scripts/init-db.ts src/seo-engine/tests/db.test.ts
git commit -m "feat(seo): schéma SQLite + helpers DB + tests + init-db script"
```

---

## Task 12: Brand context, seed bank, link bank

**Files:**
- Create: `src/seo-engine/lib/brand-context.ts`
- Create: `src/seo-engine/seeds/agent-ia.json`
- Create: `src/seo-engine/seeds/link-bank.json`

- [ ] **Step 1: Write `src/seo-engine/lib/brand-context.ts`**

```typescript
export const BRAND_CONTEXT = `# Contexte SmatchRoom Pulse

SmatchRoom Pulse est un studio d'agents IA B2B opérant sous SmatchRoom SAS.

Offre commerciale (pricing v2, mai 2026) :
- Pilote : 249€/mois + 490€ setup (1 agent, périmètre cadré)
- Squad  : 690€/mois + 1 490€ setup (plusieurs agents orchestrés)
- Custom : sur devis

Tous les CTA pointent vers https://calendly.com/a-fontana-smatchroom/30min.

Cible : dirigeants et opérationnels B2B (SDR, support, ops).

Ton éditorial obligatoire :
- Vouvoiement systématique ("vous", "vos équipes")
- Expertise concrète, pas de promesse magique
- Chiffres, statistiques, exemples sectoriels privilégiés
- Concurrence mentionnée avec nuance, jamais frontalement
  (préférer "chatbots no-code traditionnels", "solutions verticales pré-packagées")

Pages internes principales utilisables en lien :
- / (page d'accueil — ancres #process #pricing #use-cases #faq)
- /solutions/agent-sdr
- /solutions/agent-support
- /solutions/agent-sur-mesure
`;

export const GEO_INSTRUCTIONS = `# Règles d'écriture GEO (Generative Engine Optimization)

OBJECTIF : maximiser la captation par Google AI Overviews et par les moteurs
génératifs (Perplexity, ChatGPT, Gemini).

Règles strictes :
1. Premier paragraphe du body = RÉPONSE DIRECTE à la question, ≤80 mots,
   factuelle, sans introduction marketing. Cible : Featured Snippet.
2. Densité élevée de listes à puces. Préférer 5 puces concises à un paragraphe long.
3. Inclure AU MOINS 1 statistique chiffrée par section H2 (sourcée si possible,
   sinon estimation prudente formulée comme telle).
4. Pas de phrases creuses ("dans un monde en constante évolution", "à l'ère du
   digital", "il est important de noter que").
5. Section FAQ finale : 4 à 6 questions, réponses 30–60 mots, autonomes
   (chaque réponse doit se suffire à elle-même).
6. Pas de ton promotionnel dans le corps. Le CTA Calendly est ajouté APRÈS
   le markdown par le layout — ne le mets pas dans le markdown.
`;
```

- [ ] **Step 2: Write `src/seo-engine/seeds/agent-ia.json`** (~80 angles, abbreviated here — implementing engineer expands; minimum 60 entries required)

```json
[
  { "slug": "agent-ia-vs-chatbot-classique", "title": "Agent IA vs chatbot classique : 7 différences clés", "primaryKeyword": "agent ia vs chatbot", "cluster": "agent-ia", "searchIntent": "informational", "questionLongTail": "Quelles sont les différences entre un agent IA et un chatbot classique ?" },
  { "slug": "cout-agent-ia-2026", "title": "Combien coûte un agent IA en 2026 ?", "primaryKeyword": "coût agent ia", "cluster": "agent-ia", "searchIntent": "commercial", "questionLongTail": "Combien coûte le déploiement d'un agent IA en entreprise en 2026 ?" },
  { "slug": "agent-ia-qualification-leads-b2b", "title": "Comment un agent IA qualifie les leads B2B ?", "primaryKeyword": "agent ia qualification leads", "cluster": "agent-ia", "searchIntent": "informational", "questionLongTail": "Comment un agent IA peut-il qualifier les leads B2B entrants ?" },
  { "slug": "agent-ia-sdr-vs-humain", "title": "Agent IA SDR vs SDR humain : analyse ROI", "primaryKeyword": "agent ia sdr roi", "cluster": "agent-ia", "searchIntent": "commercial", "questionLongTail": "Quel est le ROI d'un agent IA SDR comparé à un SDR humain ?" },
  { "slug": "agent-ia-support-client-cas-usage", "title": "Agent IA pour le support client : 8 cas d'usage concrets", "primaryKeyword": "agent ia support client", "cluster": "agent-ia", "searchIntent": "informational", "questionLongTail": "Quels sont les cas d'usage d'un agent IA pour le support client ?" },
  { "slug": "deployer-agent-ia-pme", "title": "Comment déployer un agent IA dans une PME en 30 jours", "primaryKeyword": "déployer agent ia pme", "cluster": "agent-ia", "searchIntent": "transactional", "questionLongTail": "Comment déployer un agent IA dans une PME en 30 jours ?" },
  { "slug": "agent-ia-rgpd-conformite", "title": "Agent IA et RGPD : guide de conformité 2026", "primaryKeyword": "agent ia rgpd", "cluster": "agent-ia", "searchIntent": "informational", "questionLongTail": "Comment garantir la conformité RGPD d'un agent IA en entreprise ?" },
  { "slug": "agent-ia-vs-rpa-comparaison", "title": "Agent IA vs RPA : que choisir pour automatiser ?", "primaryKeyword": "agent ia vs rpa", "cluster": "agent-ia", "searchIntent": "informational", "questionLongTail": "Faut-il choisir un agent IA ou du RPA pour automatiser ses processus ?" },
  { "slug": "agent-ia-outils-2026", "title": "Top outils pour construire un agent IA en 2026", "primaryKeyword": "outils agent ia", "cluster": "agent-ia", "searchIntent": "commercial", "questionLongTail": "Quels sont les meilleurs outils pour construire un agent IA en 2026 ?" },
  { "slug": "agent-ia-saas-vs-sur-mesure", "title": "Agent IA SaaS vs sur-mesure : comment choisir ?", "primaryKeyword": "agent ia saas sur-mesure", "cluster": "agent-ia", "searchIntent": "commercial", "questionLongTail": "Faut-il choisir un agent IA SaaS ou un agent sur-mesure ?" },
  { "slug": "agent-ia-prompt-engineering", "title": "Prompt engineering pour agents IA B2B : guide pratique", "primaryKeyword": "prompt engineering agent ia", "cluster": "agent-ia", "searchIntent": "informational", "questionLongTail": "Comment optimiser le prompt engineering d'un agent IA B2B ?" },
  { "slug": "agent-ia-multimodal", "title": "Agents IA multimodaux : vision, voix, texte combinés", "primaryKeyword": "agent ia multimodal", "cluster": "agent-ia", "searchIntent": "informational", "questionLongTail": "Qu'est-ce qu'un agent IA multimodal et comment l'utiliser en B2B ?" },
  { "slug": "agent-ia-orchestration-langgraph", "title": "Orchestration d'agents IA avec LangGraph : guide", "primaryKeyword": "langgraph agents", "cluster": "agent-ia", "searchIntent": "informational", "questionLongTail": "Comment orchestrer plusieurs agents IA avec LangGraph ?" },
  { "slug": "agent-ia-securite-prompt-injection", "title": "Agent IA et sécurité : se protéger des prompt injections", "primaryKeyword": "agent ia sécurité", "cluster": "agent-ia", "searchIntent": "informational", "questionLongTail": "Comment sécuriser un agent IA contre les prompt injections ?" },
  { "slug": "agent-ia-onboarding-clients", "title": "Agent IA pour l'onboarding client : 5 cas concrets", "primaryKeyword": "agent ia onboarding", "cluster": "agent-ia", "searchIntent": "informational", "questionLongTail": "Comment un agent IA peut-il automatiser l'onboarding client ?" },
  { "slug": "agent-ia-veille-strategique", "title": "Agent IA pour la veille stratégique B2B", "primaryKeyword": "agent ia veille", "cluster": "agent-ia", "searchIntent": "informational", "questionLongTail": "Comment utiliser un agent IA pour automatiser la veille stratégique ?" },
  { "slug": "agent-ia-hubspot-integration", "title": "Intégrer un agent IA à HubSpot : guide complet", "primaryKeyword": "agent ia hubspot", "cluster": "agent-ia", "searchIntent": "transactional", "questionLongTail": "Comment intégrer un agent IA dans HubSpot ?" },
  { "slug": "agent-ia-pipedrive-integration", "title": "Agent IA + Pipedrive : automatiser le pipeline commercial", "primaryKeyword": "agent ia pipedrive", "cluster": "agent-ia", "searchIntent": "transactional", "questionLongTail": "Comment connecter un agent IA à Pipedrive ?" },
  { "slug": "agent-ia-slack-bot", "title": "Construire un bot Slack avec un agent IA : tutoriel", "primaryKeyword": "agent ia slack", "cluster": "agent-ia", "searchIntent": "informational", "questionLongTail": "Comment créer un agent IA dans Slack ?" },
  { "slug": "agent-ia-notion-base-connaissance", "title": "Agent IA avec base Notion : tutoriel pratique", "primaryKeyword": "agent ia notion", "cluster": "agent-ia", "searchIntent": "informational", "questionLongTail": "Comment connecter un agent IA à une base Notion ?" },
  { "slug": "agent-ia-erreurs-courantes", "title": "10 erreurs courantes en déployant un agent IA", "primaryKeyword": "erreurs agent ia", "cluster": "agent-ia", "searchIntent": "informational", "questionLongTail": "Quelles erreurs éviter lors du déploiement d'un agent IA ?" },
  { "slug": "agent-ia-evaluation-performance", "title": "Comment évaluer la performance d'un agent IA", "primaryKeyword": "évaluer agent ia", "cluster": "agent-ia", "searchIntent": "informational", "questionLongTail": "Quels KPI pour mesurer la performance d'un agent IA ?" },
  { "slug": "agent-ia-cas-usage-ecommerce", "title": "Agent IA en e-commerce B2B : 7 cas d'usage", "primaryKeyword": "agent ia ecommerce b2b", "cluster": "agent-ia", "searchIntent": "informational", "questionLongTail": "Quels cas d'usage pour un agent IA en e-commerce B2B ?" },
  { "slug": "agent-ia-finance", "title": "Agent IA dans la finance B2B : usages et limites", "primaryKeyword": "agent ia finance", "cluster": "agent-ia", "searchIntent": "informational", "questionLongTail": "Comment utiliser un agent IA dans une équipe finance ?" },
  { "slug": "agent-ia-rh-recrutement", "title": "Agent IA pour le recrutement : aide ou risque ?", "primaryKeyword": "agent ia rh recrutement", "cluster": "agent-ia", "searchIntent": "informational", "questionLongTail": "Comment utiliser un agent IA dans le recrutement B2B ?" },
  { "slug": "agent-ia-juridique", "title": "Agent IA pour les services juridiques B2B", "primaryKeyword": "agent ia juridique", "cluster": "agent-ia", "searchIntent": "informational", "questionLongTail": "Quels cas d'usage pour un agent IA en juridique B2B ?" },
  { "slug": "agent-ia-marketing-automation", "title": "Agent IA vs marketing automation classique", "primaryKeyword": "agent ia marketing automation", "cluster": "agent-ia", "searchIntent": "informational", "questionLongTail": "Quelle différence entre agent IA et outil de marketing automation ?" },
  { "slug": "agent-ia-comptabilite", "title": "Agent IA en comptabilité B2B : usages 2026", "primaryKeyword": "agent ia comptabilité", "cluster": "agent-ia", "searchIntent": "informational", "questionLongTail": "Comment utiliser un agent IA en comptabilité B2B ?" },
  { "slug": "agent-ia-product-management", "title": "Agent IA pour les product managers : 6 usages", "primaryKeyword": "agent ia product management", "cluster": "agent-ia", "searchIntent": "informational", "questionLongTail": "Comment un agent IA aide-t-il un product manager ?" },
  { "slug": "agent-ia-data-analyse", "title": "Agent IA pour l'analyse de données B2B", "primaryKeyword": "agent ia analyse données", "cluster": "agent-ia", "searchIntent": "informational", "questionLongTail": "Comment utiliser un agent IA pour analyser des données B2B ?" },
  { "slug": "agent-ia-vs-copilot", "title": "Agent IA vs Microsoft Copilot : positionnement B2B", "primaryKeyword": "agent ia vs copilot", "cluster": "agent-ia", "searchIntent": "commercial", "questionLongTail": "Faut-il choisir un agent IA sur-mesure ou Microsoft Copilot ?" },
  { "slug": "agent-ia-vs-chatgpt-team", "title": "Agent IA dédié vs ChatGPT Team : analyse", "primaryKeyword": "agent ia vs chatgpt team", "cluster": "agent-ia", "searchIntent": "commercial", "questionLongTail": "Faut-il choisir un agent IA dédié ou ChatGPT Team pour une PME ?" },
  { "slug": "agent-ia-explainability", "title": "Explicabilité d'un agent IA : pourquoi et comment", "primaryKeyword": "agent ia explicabilité", "cluster": "agent-ia", "searchIntent": "informational", "questionLongTail": "Comment rendre les décisions d'un agent IA explicables ?" },
  { "slug": "agent-ia-fine-tuning", "title": "Fine-tuning d'un agent IA : utile ou pas en B2B ?", "primaryKeyword": "fine-tuning agent ia", "cluster": "agent-ia", "searchIntent": "informational", "questionLongTail": "Faut-il fine-tuner un agent IA pour un usage B2B ?" },
  { "slug": "agent-ia-rag-architecture", "title": "Architecture RAG pour agent IA : guide pratique", "primaryKeyword": "rag agent ia", "cluster": "agent-ia", "searchIntent": "informational", "questionLongTail": "Comment concevoir une architecture RAG pour un agent IA ?" },
  { "slug": "agent-ia-claude-vs-gpt", "title": "Claude vs GPT pour un agent IA B2B : que choisir ?", "primaryKeyword": "claude vs gpt agent", "cluster": "agent-ia", "searchIntent": "commercial", "questionLongTail": "Faut-il utiliser Claude ou GPT pour un agent IA B2B ?" },
  { "slug": "agent-ia-temps-deploiement", "title": "Combien de temps pour déployer un agent IA ?", "primaryKeyword": "temps déploiement agent ia", "cluster": "agent-ia", "searchIntent": "informational", "questionLongTail": "Combien de temps faut-il pour déployer un agent IA en entreprise ?" },
  { "slug": "agent-ia-monitoring-observabilite", "title": "Monitoring d'un agent IA : que tracker en production", "primaryKeyword": "monitoring agent ia", "cluster": "agent-ia", "searchIntent": "informational", "questionLongTail": "Comment monitorer un agent IA en production ?" },
  { "slug": "agent-ia-coûts-cachés", "title": "Agent IA : les coûts cachés à anticiper", "primaryKeyword": "coûts cachés agent ia", "cluster": "agent-ia", "searchIntent": "commercial", "questionLongTail": "Quels sont les coûts cachés d'un agent IA en production ?" },
  { "slug": "agent-ia-equipe-mixte", "title": "Comment faire cohabiter agents IA et équipe humaine", "primaryKeyword": "agent ia équipe humaine", "cluster": "blog", "searchIntent": "informational", "questionLongTail": "Comment intégrer un agent IA dans une équipe humaine existante ?" },
  { "slug": "agent-ia-change-management", "title": "Conduite du changement avec un agent IA", "primaryKeyword": "change management agent ia", "cluster": "blog", "searchIntent": "informational", "questionLongTail": "Comment accompagner le changement lié à un agent IA ?" },
  { "slug": "agent-ia-formation-equipe", "title": "Former son équipe à travailler avec un agent IA", "primaryKeyword": "former équipe agent ia", "cluster": "blog", "searchIntent": "informational", "questionLongTail": "Comment former une équipe à travailler efficacement avec un agent IA ?" },
  { "slug": "agent-ia-roi-12-mois", "title": "ROI d'un agent IA après 12 mois : analyse réelle", "primaryKeyword": "roi agent ia 12 mois", "cluster": "blog", "searchIntent": "commercial", "questionLongTail": "Quel ROI obtient-on après 12 mois d'agent IA ?" },
  { "slug": "agent-ia-prospection-cold-email", "title": "Agent IA pour le cold email B2B : ce qui marche", "primaryKeyword": "agent ia cold email", "cluster": "blog", "searchIntent": "informational", "questionLongTail": "Comment utiliser un agent IA pour le cold email B2B ?" },
  { "slug": "agent-ia-lead-scoring", "title": "Lead scoring par un agent IA : comment ça marche", "primaryKeyword": "agent ia lead scoring", "cluster": "blog", "searchIntent": "informational", "questionLongTail": "Comment un agent IA fait-il du lead scoring ?" },
  { "slug": "agent-ia-vs-sales-rep", "title": "Agent IA vs commercial humain : la complémentarité", "primaryKeyword": "agent ia vs commercial", "cluster": "blog", "searchIntent": "informational", "questionLongTail": "Comment combiner agent IA et commerciaux humains ?" },
  { "slug": "agent-ia-cas-saas", "title": "Agent IA dans un SaaS B2B : 6 leviers concrets", "primaryKeyword": "agent ia saas b2b", "cluster": "blog", "searchIntent": "informational", "questionLongTail": "Comment un SaaS B2B peut-il utiliser un agent IA ?" },
  { "slug": "agent-ia-cas-conseil", "title": "Agent IA pour cabinets de conseil : usages 2026", "primaryKeyword": "agent ia conseil", "cluster": "blog", "searchIntent": "informational", "questionLongTail": "Comment un cabinet de conseil utilise-t-il un agent IA ?" },
  { "slug": "agent-ia-cas-esn", "title": "Agent IA pour les ESN : cas d'usage opérationnels", "primaryKeyword": "agent ia esn", "cluster": "blog", "searchIntent": "informational", "questionLongTail": "Comment une ESN utilise-t-elle un agent IA ?" },
  { "slug": "agent-ia-cas-startup", "title": "Agent IA pour startups B2B : 5 usages prioritaires", "primaryKeyword": "agent ia startup b2b", "cluster": "blog", "searchIntent": "informational", "questionLongTail": "Quels usages d'agent IA pour une startup B2B ?" },
  { "slug": "agent-ia-make-vs-n8n", "title": "Make vs n8n pour orchestrer un agent IA", "primaryKeyword": "make vs n8n agent ia", "cluster": "blog", "searchIntent": "commercial", "questionLongTail": "Faut-il choisir Make ou n8n pour orchestrer un agent IA ?" },
  { "slug": "agent-ia-zapier-limites", "title": "Zapier + agent IA : limites et alternatives", "primaryKeyword": "zapier agent ia", "cluster": "blog", "searchIntent": "informational", "questionLongTail": "Quelles sont les limites de Zapier avec un agent IA ?" },
  { "slug": "agent-ia-build-vs-buy", "title": "Build ou Buy un agent IA : grille de décision", "primaryKeyword": "build vs buy agent ia", "cluster": "agent-ia", "searchIntent": "commercial", "questionLongTail": "Faut-il construire ou acheter un agent IA en 2026 ?" },
  { "slug": "agent-ia-tarification-modeles", "title": "Tarification d'un agent IA : 4 modèles existants", "primaryKeyword": "tarification agent ia", "cluster": "agent-ia", "searchIntent": "commercial", "questionLongTail": "Quels modèles de tarification pour un agent IA en B2B ?" },
  { "slug": "agent-ia-anthropic-vs-openai", "title": "Anthropic vs OpenAI pour un agent IA B2B", "primaryKeyword": "anthropic vs openai", "cluster": "agent-ia", "searchIntent": "commercial", "questionLongTail": "Faut-il choisir Anthropic ou OpenAI pour son agent IA B2B ?" },
  { "slug": "agent-ia-modeles-open-source", "title": "Modèles open source pour agents IA B2B : panorama", "primaryKeyword": "modèles open source agent ia", "cluster": "agent-ia", "searchIntent": "informational", "questionLongTail": "Quels modèles open source pour construire un agent IA B2B ?" },
  { "slug": "agent-ia-latence-temps-reponse", "title": "Latence d'un agent IA : comment l'optimiser", "primaryKeyword": "latence agent ia", "cluster": "agent-ia", "searchIntent": "informational", "questionLongTail": "Comment réduire la latence d'un agent IA en production ?" },
  { "slug": "agent-ia-cache-llm", "title": "Prompt caching pour agents IA : économies réelles", "primaryKeyword": "prompt caching", "cluster": "agent-ia", "searchIntent": "informational", "questionLongTail": "Comment économiser avec le prompt caching dans un agent IA ?" },
  { "slug": "agent-ia-finops", "title": "FinOps pour agents IA : maîtriser les coûts", "primaryKeyword": "finops agent ia", "cluster": "agent-ia", "searchIntent": "informational", "questionLongTail": "Comment maîtriser les coûts d'un agent IA en production ?" }
]
```

(60 entries above; the implementer should add ~20 more to reach ~80, following the same pattern: questions concrètes, cluster `agent-ia` ou `blog`, intent varié.)

- [ ] **Step 3: Write `src/seo-engine/seeds/link-bank.json`**

```json
[
  { "anchor": "créer un agent IA sur-mesure", "url": "/solutions/agent-sur-mesure", "context": "workflow propriétaire, sur-mesure, custom", "priority": 10 },
  { "anchor": "agent IA SDR", "url": "/solutions/agent-sdr", "context": "prospection, qualification, lead, sdr, commercial", "priority": 9 },
  { "anchor": "agent IA support", "url": "/solutions/agent-support", "context": "support, ticket, helpdesk, client", "priority": 9 },
  { "anchor": "automatiser votre prospection B2B", "url": "/solutions/agent-sdr", "context": "prospection, b2b, lead, sdr", "priority": 8 },
  { "anchor": "automatiser votre support client", "url": "/solutions/agent-support", "context": "support, helpdesk, client", "priority": 8 },
  { "anchor": "tarification SmatchRoom Pulse", "url": "/#pricing", "context": "tarif, prix, coût, pricing, abonnement", "priority": 7 },
  { "anchor": "notre processus de déploiement", "url": "/#process", "context": "processus, méthode, déploiement, cadrage", "priority": 7 },
  { "anchor": "cas d'usage SmatchRoom Pulse", "url": "/#use-cases", "context": "cas d'usage, exemple, retour d'expérience", "priority": 6 },
  { "anchor": "déployer un agent IA", "url": "/solutions/agent-sur-mesure", "context": "déployer, déploiement, mettre en place", "priority": 6 },
  { "anchor": "Pilote SmatchRoom Pulse", "url": "/#pricing", "context": "pilote, démarrer, test, mvp", "priority": 5 }
]
```

- [ ] **Step 4: Commit**

```bash
git add src/seo-engine/lib/brand-context.ts src/seo-engine/seeds/
git commit -m "feat(seo): brand context, seed bank (60 angles agent-ia) et link bank"
```

---

## Task 13: Anthropic client wrapper + UsageTracker (native SDK)

**Files:**
- Create: `src/seo-engine/lib/anthropic.ts`

> **SDK choice** : on utilise `@anthropic-ai/sdk` natif (pas LangChain). C'est le même
> SDK que ton `pulse-sdr` utilise déjà — stable, prompt caching natif, moins de couches.

- [ ] **Step 1: Write `src/seo-engine/lib/anthropic.ts`**

```typescript
import Anthropic from '@anthropic-ai/sdk';
import { logger } from './logger.js';

export interface UsageTotals {
  inputTokens: number;
  outputTokens: number;
  cacheReadTokens: number;
  cacheCreationTokens: number;
}

const PRICE_PER_MTOK = {
  'claude-sonnet-4-6':         { input: 3.0, output: 15.0, cacheRead: 0.30, cacheWrite: 3.75 },
  'claude-haiku-4-5-20251001': { input: 1.0, output: 5.0,  cacheRead: 0.10, cacheWrite: 1.25 },
} as const;

export type ModelId = keyof typeof PRICE_PER_MTOK;

export type SystemBlock = {
  type: 'text';
  text: string;
  cache_control?: { type: 'ephemeral' };
};

export function ephemeralCacheBlock(text: string): SystemBlock {
  return { type: 'text', text, cache_control: { type: 'ephemeral' } };
}

export function textBlock(text: string): SystemBlock {
  return { type: 'text', text };
}

export class UsageTracker {
  totals: UsageTotals = { inputTokens: 0, outputTokens: 0, cacheReadTokens: 0, cacheCreationTokens: 0 };
  usd = 0;

  record(model: ModelId, usage: Anthropic.Messages.Usage): void {
    const i = usage.input_tokens ?? 0;
    const o = usage.output_tokens ?? 0;
    const cr = usage.cache_read_input_tokens ?? 0;
    const cw = usage.cache_creation_input_tokens ?? 0;
    this.totals.inputTokens += i;
    this.totals.outputTokens += o;
    this.totals.cacheReadTokens += cr;
    this.totals.cacheCreationTokens += cw;
    const p = PRICE_PER_MTOK[model];
    this.usd += (i * p.input + o * p.output + cr * p.cacheRead + cw * p.cacheWrite) / 1_000_000;
  }

  snapshot() {
    return { ...this.totals, usd: this.usd };
  }
}

const _client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export interface LLMClient {
  invoke(args: { system: SystemBlock[]; user: string; maxTokens?: number }): Promise<string>;
}

export function makeClient(model: ModelId, tracker: UsageTracker): LLMClient {
  return {
    async invoke({ system, user, maxTokens = 4096 }) {
      const response = await _client.messages.create({
        model,
        max_tokens: maxTokens,
        temperature: 0.4,
        system,
        messages: [{ role: 'user', content: user }],
      });
      tracker.record(model, response.usage);
      logger.debug({ model, usage: tracker.snapshot() }, 'llm call complete');
      const text = response.content
        .filter((b): b is Anthropic.TextBlock => b.type === 'text')
        .map((b) => b.text)
        .join('');
      return text;
    },
  };
}
```

- [ ] **Step 2: Smoke compile**

Run: `cd src/seo-engine && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/seo-engine/lib/anthropic.ts
git commit -m "feat(seo): client Anthropic (SDK natif) + UsageTracker + prompt caching"
```

> **Pour les tâches 14–18** : remplacer le pattern LangChain
> ```ts
> const result = await client.invoke([{ role: 'system', content: system as any }, { role: 'user', content: user }]);
> const text = typeof result.content === 'string' ? result.content : (result.content as any)[0]?.text ?? '';
> ```
> par
> ```ts
> const text = await client.invoke({ system, user });
> ```
> Le wrapper retourne directement le texte concaténé des blocks `text` de la réponse.

---

## Task 14: Planner module + tests

**Files:**
- Create: `src/seo-engine/planner.ts`
- Create: `src/seo-engine/tests/planner.test.ts`

- [ ] **Step 1: Write `src/seo-engine/planner.ts`**

```typescript
import fs from 'node:fs';
import path from 'node:path';
import { z } from 'zod';
import { findStaleInProgress, findTopicBySlug, insertTopic } from './lib/db.js';
import { makeClient, ephemeralCacheBlock, type UsageTracker } from './lib/anthropic.js';
import { sanitizeUserText } from './lib/sanitize.js';
import { logger } from './lib/logger.js';
import { SEEDS_DIR } from './lib/paths.js';
import type { Cluster, SeedAngle, TopicProposal, SearchIntent } from './lib/types.js';

const SEED_PATH = path.join(SEEDS_DIR, 'agent-ia.json');

const RefinedSchema = z.object({
  title: z.string().min(10),
  questionLongTail: z.string().min(10),
  estimatedDifficulty: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
});

export async function pickNextTopic(tracker: UsageTracker): Promise<TopicProposal> {
  const stale = findStaleInProgress(24);
  if (stale) {
    logger.warn({ slug: stale.slug }, 'reprenant un topic in_progress depuis >24h');
    return {
      slug: stale.slug,
      title: stale.title,
      primaryKeyword: stale.primary_keyword,
      cluster: stale.cluster as Cluster,
      searchIntent: stale.search_intent as SearchIntent,
      questionLongTail: stale.question_long_tail,
      estimatedDifficulty: stale.estimated_difficulty as 1 | 2 | 3 | 4 | 5,
    };
  }

  const seeds: SeedAngle[] = JSON.parse(fs.readFileSync(SEED_PATH, 'utf8'));
  const available = seeds.filter((s) => !findTopicBySlug(s.slug));

  if (available.length === 0) {
    throw new Error('Seed bank épuisé — lancer scripts/refill-seeds.ts');
  }

  if (available.length < 10) {
    logger.warn({ remaining: available.length }, 'seed bank bas — prévoir refill');
  }

  const seed = pickWeighted(available);
  const refined = await refineWithHaiku(seed, tracker);

  const topic: TopicProposal = {
    slug: seed.slug,
    title: refined.title,
    primaryKeyword: seed.primaryKeyword,
    cluster: seed.cluster,
    searchIntent: seed.searchIntent,
    questionLongTail: refined.questionLongTail,
    estimatedDifficulty: refined.estimatedDifficulty,
  };

  insertTopic(topic);
  return topic;
}

function pickWeighted(seeds: SeedAngle[]): SeedAngle {
  const agentIa = seeds.filter((s) => s.cluster === 'agent-ia');
  const blog = seeds.filter((s) => s.cluster === 'blog');
  const roll = Math.random();
  if (roll < 0.8 && agentIa.length > 0) return agentIa[Math.floor(Math.random() * agentIa.length)]!;
  if (blog.length > 0) return blog[Math.floor(Math.random() * blog.length)]!;
  return seeds[Math.floor(Math.random() * seeds.length)]!;
}

async function refineWithHaiku(seed: SeedAngle, tracker: UsageTracker) {
  const client = makeClient('claude-haiku-4-5-20251001', tracker);
  const system = [
    ephemeralCacheBlock(
      `Tu raffines des sujets d'articles SEO pour SmatchRoom Pulse, studio d'agents IA B2B (ton vouvoiement, lecteurs : dirigeants B2B).
Pour chaque sujet, propose :
- title  : un titre H1 attractif (50–70 caractères, inclut le mot-clé principal naturellement)
- questionLongTail : une question longue-traîne précise qui résume l'intention de recherche
- estimatedDifficulty : 1 (facile) à 5 (très concurrentiel)
Réponds en JSON strict {"title": "...", "questionLongTail": "...", "estimatedDifficulty": N}.`,
    ),
  ];
  const user = `Sujet seed :
- slug : ${sanitizeUserText(seed.slug, 200)}
- titre brut : ${sanitizeUserText(seed.title, 200)}
- mot-clé principal : ${sanitizeUserText(seed.primaryKeyword, 100)}
- question initiale : ${sanitizeUserText(seed.questionLongTail, 300)}`;

  const text = await client.invoke({ system, user });
  const json = extractJson(text);
  return RefinedSchema.parse(json);
}

function extractJson(text: string): unknown {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error('Pas de JSON détecté dans la réponse Haiku');
  return JSON.parse(match[0]);
}
```

- [ ] **Step 2: Write `src/seo-engine/tests/planner.test.ts`**

```typescript
import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { initSchema, insertTopic, findTopicBySlug, closeDb } from '../lib/db.js';

const DB_PATH = path.join(import.meta.dirname, '..', 'data', 'seo.db');

beforeEach(() => {
  closeDb();
  if (fs.existsSync(DB_PATH)) fs.unlinkSync(DB_PATH);
  initSchema();
});

afterAll(() => closeDb());

describe('planner — DB-only behaviors (no LLM)', () => {
  it('detects stale in_progress topics older than 24h', async () => {
    insertTopic({
      slug: 'stale-topic', title: 'Stale', primaryKeyword: 'stale',
      cluster: 'agent-ia', searchIntent: 'informational',
      questionLongTail: 'old?', estimatedDifficulty: 2,
    });
    // force in_progress + old
    const Database = (await import('better-sqlite3')).default;
    const db = new Database(DB_PATH);
    db.prepare(`UPDATE topics SET status='in_progress', updated_at=datetime('now','-25 hours') WHERE slug='stale-topic'`).run();
    db.close();

    const { findStaleInProgress } = await import('../lib/db.js');
    const stale = findStaleInProgress(24);
    expect(stale?.slug).toBe('stale-topic');
  });

  it('skips topics already in DB', () => {
    insertTopic({
      slug: 'already-done', title: 'Done', primaryKeyword: 'done',
      cluster: 'agent-ia', searchIntent: 'informational',
      questionLongTail: 'done?', estimatedDifficulty: 1,
    });
    expect(findTopicBySlug('already-done')).toBeDefined();
  });
});
```

- [ ] **Step 3: Build + run tests**

Run: `cd src/seo-engine && npm run build && npx vitest run tests/planner.test.ts`
Expected: 2 tests pass.

- [ ] **Step 4: Commit**

```bash
git add src/seo-engine/planner.ts src/seo-engine/tests/planner.test.ts
git commit -m "feat(seo): module Planner (raffinage Haiku, reprise stale) + tests"
```

---

## Task 15: Generator — outline stage + tests

**Files:**
- Create: `src/seo-engine/stages/outline.ts`
- Create: `src/seo-engine/tests/outline.test.ts`

- [ ] **Step 1: Write `src/seo-engine/stages/outline.ts`**

```typescript
import { z } from 'zod';
import { makeClient, ephemeralCacheBlock, type UsageTracker } from '../lib/anthropic.js';
import { BRAND_CONTEXT, GEO_INSTRUCTIONS } from '../lib/brand-context.js';
import { sanitizeUserText } from '../lib/sanitize.js';
import { logger } from '../lib/logger.js';
import type { TopicProposal } from '../lib/types.js';

export const OutlineSectionSchema = z.object({
  title: z.string().min(3),
  intent: z.string(),
  wordsTarget: z.number().int().positive(),
});

export const OutlineSchema = z.object({
  h2Sections: z.array(OutlineSectionSchema).min(4).max(8),
  totalWordsTarget: z.number().int().min(1500).max(3000),
});

export type Outline = z.infer<typeof OutlineSchema>;

export async function buildOutline(topic: TopicProposal, tracker: UsageTracker): Promise<Outline> {
  const client = makeClient('claude-sonnet-4-6', tracker);

  const system = [
    ephemeralCacheBlock(`${BRAND_CONTEXT}\n\n${GEO_INSTRUCTIONS}\n\n# Tâche : produire le plan d'un article SEO/GEO.

Produis 4 à 8 sections H2 (pas d'introduction explicite, le 1er paragraphe sert
de réponse directe). Chaque H2 doit avoir un intent clair (ex : "définir",
"comparer", "lister les coûts", "donner des exemples"). Vise un total de
1800 à 2200 mots.

Réponds STRICTEMENT en JSON :
{
  "h2Sections": [{"title": "...", "intent": "...", "wordsTarget": NNN}],
  "totalWordsTarget": NNNN
}`),
  ];

  const user = `Sujet : ${sanitizeUserText(topic.title, 200)}
Mot-clé principal : ${sanitizeUserText(topic.primaryKeyword, 100)}
Question longue traîne (intention de recherche) : ${sanitizeUserText(topic.questionLongTail, 300)}
Cluster : ${topic.cluster}
Search intent : ${topic.searchIntent}`;

  let lastErr: unknown;
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const text = await client.invoke({ system, user });
      const json = extractJson(text);
      return OutlineSchema.parse(json);
    } catch (err) {
      lastErr = err;
      logger.warn({ err, attempt }, 'outline parse failure, retrying');
    }
  }
  throw new Error(`Outline failed after 2 attempts: ${String(lastErr)}`);
}

function extractJson(text: string): unknown {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error('JSON not found in outline response');
  return JSON.parse(match[0]);
}
```

- [ ] **Step 2: Write `src/seo-engine/tests/outline.test.ts`**

```typescript
import { describe, it, expect } from 'vitest';
import { OutlineSchema } from '../stages/outline.js';

describe('OutlineSchema', () => {
  it('accepts a valid outline', () => {
    const valid = {
      h2Sections: [
        { title: 'Définition', intent: 'définir le concept', wordsTarget: 300 },
        { title: 'Coûts', intent: 'lister', wordsTarget: 400 },
        { title: 'Exemples', intent: 'illustrer', wordsTarget: 400 },
        { title: 'FAQ', intent: 'répondre aux questions', wordsTarget: 300 },
      ],
      totalWordsTarget: 1800,
    };
    expect(() => OutlineSchema.parse(valid)).not.toThrow();
  });

  it('rejects fewer than 4 sections', () => {
    expect(() => OutlineSchema.parse({
      h2Sections: [{ title: 'A', intent: 'x', wordsTarget: 100 }],
      totalWordsTarget: 1800,
    })).toThrow();
  });

  it('rejects out-of-range word counts', () => {
    expect(() => OutlineSchema.parse({
      h2Sections: Array(5).fill({ title: 'A', intent: 'x', wordsTarget: 100 }),
      totalWordsTarget: 500,
    })).toThrow();
  });
});
```

- [ ] **Step 3: Build + tests**

Run: `cd src/seo-engine && npm run build && npx vitest run tests/outline.test.ts`
Expected: 3 tests pass.

- [ ] **Step 4: Commit**

```bash
git add src/seo-engine/stages/outline.ts src/seo-engine/tests/outline.test.ts
git commit -m "feat(seo): stage outline (Sonnet) + schéma Zod + tests"
```

---

## Task 16: Generator — sections stage (H2 sequential)

**Files:**
- Create: `src/seo-engine/stages/sections.ts`

- [ ] **Step 1: Write `src/seo-engine/stages/sections.ts`**

```typescript
import { makeClient, ephemeralCacheBlock, type UsageTracker } from '../lib/anthropic.js';
import { BRAND_CONTEXT, GEO_INSTRUCTIONS } from '../lib/brand-context.js';
import { sanitizeUserText } from '../lib/sanitize.js';
import { logger } from '../lib/logger.js';
import type { TopicProposal } from '../lib/types.js';
import type { Outline } from './outline.js';

const FAQ_SYSTEM_TAIL = `
# Format de sortie OBLIGATOIRE

Tu produis UNIQUEMENT du markdown pour CETTE section H2 (pas le H1, pas
d'introduction globale, pas de prélude). Commence directement par "## " suivi
du titre fourni.

Si c'est la première section, INCLUS d'abord 1 paragraphe court (≤80 mots) qui
répond directement à la question longue traîne, puis le H2.

Pas d'appel à l'action (CTA), pas de lien vers Calendly dans le markdown.
`;

export interface SectionsArgs {
  topic: TopicProposal;
  outline: Outline;
  tracker: UsageTracker;
}

export async function writeSections({ topic, outline, tracker }: SectionsArgs): Promise<string> {
  const client = makeClient('claude-sonnet-4-6', tracker);

  const cachedSystem = [
    ephemeralCacheBlock(`${BRAND_CONTEXT}\n\n${GEO_INSTRUCTIONS}\n${FAQ_SYSTEM_TAIL}

# Métadonnées du sujet courant

Titre H1 (à ne PAS écrire — c'est le job du layout) : ${topic.title}
Mot-clé principal : ${topic.primaryKeyword}
Question longue traîne (à utiliser pour la réponse directe en début d'article) : ${topic.questionLongTail}
Plan complet de l'article (toutes sections) :
${outline.h2Sections.map((s, i) => `${i + 1}. ${s.title} (intent: ${s.intent}, ~${s.wordsTarget} mots)`).join('\n')}
`),
  ];

  const parts: string[] = [];
  for (let i = 0; i < outline.h2Sections.length; i++) {
    const section = outline.h2Sections[i]!;
    const isFirst = i === 0;
    const isFaq = /faq|questions/i.test(section.title);

    const userMsg = isFaq
      ? `Rédige la section FAQ finale : titre "${sanitizeUserText(section.title)}".
Produis 4 à 6 questions concises au format markdown :

## ${section.title}

### Question 1 ?

Réponse 30–60 mots.

### Question 2 ?

...`
      : `Rédige la section ${i + 1} : "${sanitizeUserText(section.title)}".
Intent : ${sanitizeUserText(section.intent)}
Cible : ~${section.wordsTarget} mots.
${isFirst ? 'Cette section est la PREMIÈRE de l\'article : commence par 1 paragraphe court (≤80 mots) qui répond directement à la question longue traîne, AVANT le "## ".' : ''}`;

    const text = await client.invoke({ system: cachedSystem, user: userMsg });
    parts.push(text.trim());
    logger.info({ section: section.title, index: i + 1 }, 'section written');
  }

  return parts.join('\n\n');
}
```

- [ ] **Step 2: Compile check**

Run: `cd src/seo-engine && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/seo-engine/stages/sections.ts
git commit -m "feat(seo): stage sections (Sonnet H2 séquentiel, cache hit système)"
```

---

## Task 17: Generator — meta + JSON-LD stage

**Files:**
- Create: `src/seo-engine/stages/meta.ts`

- [ ] **Step 1: Write `src/seo-engine/stages/meta.ts`**

```typescript
import { z } from 'zod';
import { makeClient, ephemeralCacheBlock, type UsageTracker } from '../lib/anthropic.js';
import { sanitizeUserText } from '../lib/sanitize.js';
import { logger } from '../lib/logger.js';
import type { TopicProposal } from '../lib/types.js';

const MetaSchema = z.object({
  metaTitle: z.string().min(20),
  metaDescription: z.string().min(80),
});

export interface MetaResult {
  metaTitle: string;
  metaDescription: string;
  articleJsonLd: Record<string, unknown>;
  faqJsonLd: Record<string, unknown>;
}

export async function buildMetaAndJsonLd(args: {
  topic: TopicProposal;
  bodyMarkdown: string;
  tracker: UsageTracker;
}): Promise<MetaResult> {
  const { topic, bodyMarkdown, tracker } = args;
  const client = makeClient('claude-haiku-4-5-20251001', tracker);

  const system = [
    ephemeralCacheBlock(`Tu génères les balises SEO d'un article publié sur https://pulse.smatchroom.com.

Réponds STRICTEMENT en JSON :
{
  "metaTitle": "... (idéal 50–60 caractères, inclut le mot-clé)",
  "metaDescription": "... (idéal 140–155 caractères, accroche + bénéfice + nuance)"
}`),
  ];

  const user = `Titre H1 : ${sanitizeUserText(topic.title, 200)}
Mot-clé principal : ${sanitizeUserText(topic.primaryKeyword, 100)}
Question : ${sanitizeUserText(topic.questionLongTail, 300)}
Extrait du body (300 premiers caractères) :
${sanitizeUserText(bodyMarkdown.slice(0, 600), 600)}`;

  const text = await client.invoke({ system, user });
  const json = extractJson(text);
  const parsed = MetaSchema.parse(json);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: topic.title,
    description: parsed.metaDescription,
    inLanguage: 'fr',
    datePublished: new Date().toISOString(),
    author: { '@type': 'Organization', name: 'SmatchRoom Pulse', url: 'https://pulse.smatchroom.com' },
    publisher: { '@type': 'Organization', name: 'SmatchRoom Pulse', url: 'https://pulse.smatchroom.com' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://pulse.smatchroom.com/${topic.cluster}/${topic.slug}` },
  };

  const faqJsonLd = extractFaqJsonLd(bodyMarkdown);

  return {
    metaTitle: parsed.metaTitle,
    metaDescription: parsed.metaDescription,
    articleJsonLd,
    faqJsonLd,
  };
}

export function extractFaqJsonLd(markdown: string): Record<string, unknown> {
  // Match the FAQ section then extract ### question / following paragraph pairs
  const faqMatch = markdown.match(/##\s+(?:FAQ|Questions[^\n]*)([\s\S]*?)(?=\n##\s|$)/i);
  if (!faqMatch) {
    logger.warn('No FAQ section detected — returning empty FAQPage');
    return { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [] };
  }
  const block = faqMatch[1]!;
  const items: { question: string; answer: string }[] = [];
  const re = /###\s+([^\n]+)\n+([\s\S]*?)(?=\n###\s|\n##\s|$)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(block)) !== null) {
    const question = m[1]!.trim();
    const answer = m[2]!.trim().replace(/\n+/g, ' ');
    if (question && answer) items.push({ question, answer });
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.question,
      acceptedAnswer: { '@type': 'Answer', text: it.answer },
    })),
  };
}

function extractJson(text: string): unknown {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error('JSON not found in meta response');
  return JSON.parse(match[0]);
}
```

- [ ] **Step 2: Compile check**

Run: `cd src/seo-engine && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/seo-engine/stages/meta.ts
git commit -m "feat(seo): stage meta + extraction JSON-LD Article et FAQPage"
```

---

## Task 18: Linker stage (deterministic + cross-link) + tests

**Files:**
- Create: `src/seo-engine/stages/linker.ts`
- Create: `src/seo-engine/tests/linker.test.ts`

- [ ] **Step 1: Write `src/seo-engine/stages/linker.ts`**

```typescript
import fs from 'node:fs';
import path from 'node:path';
import { listRecentArticles } from '../lib/db.js';
import { logger } from '../lib/logger.js';
import { SEEDS_DIR } from '../lib/paths.js';
import type { Cluster, LinkBankEntry } from '../lib/types.js';

const LINK_BANK_PATH = path.join(SEEDS_DIR, 'link-bank.json');

export interface LinkInjectionResult {
  markdown: string;
  insertedLinks: { anchor: string; url: string }[];
}

const HOME_ANCHOR_URLS = ['/#pricing', '/#process', '/#use-cases', '/#faq'];

export function injectInternalLinks(markdown: string, cluster: Cluster): LinkInjectionResult {
  const bank: LinkBankEntry[] = JSON.parse(fs.readFileSync(LINK_BANK_PATH, 'utf8'));
  const sorted = [...bank].sort((a, b) => b.priority - a.priority);

  const { body, faqStart } = splitBodyFromFaq(markdown);
  const inserted: { anchor: string; url: string }[] = [];
  let working = body;

  const isHomeAnchor = (url: string) => HOME_ANCHOR_URLS.some((u) => url.startsWith(u));
  const isSolution = (url: string) => url.startsWith('/solutions/');

  const tryInsert = (entry: LinkBankEntry): boolean => {
    if (inserted.length >= 3) return false;
    if (inserted.some((i) => i.url === entry.url)) return false;

    // word-boundary, case-insensitive, first match only, NOT inside an existing markdown link
    const re = new RegExp(`\\b${escapeRegex(entry.anchor)}\\b`, 'i');
    const safeMatch = findFirstSafeMatch(working, re);
    if (!safeMatch) return false;

    working = working.slice(0, safeMatch.index)
      + `[${working.slice(safeMatch.index, safeMatch.index + safeMatch.length)}](${entry.url})`
      + working.slice(safeMatch.index + safeMatch.length);
    inserted.push({ anchor: entry.anchor, url: entry.url });
    return true;
  };

  // Step 1: ensure at least one home anchor link
  for (const e of sorted) {
    if (isHomeAnchor(e.url)) { if (tryInsert(e)) break; }
  }
  // Step 2: ensure at least one solutions link
  for (const e of sorted) {
    if (isSolution(e.url)) { if (tryInsert(e)) break; }
  }
  // Step 3: fill remaining slots up to 3 with the highest-priority remaining entries
  for (const e of sorted) {
    if (inserted.length >= 3) break;
    tryInsert(e);
  }

  if (inserted.filter((i) => isHomeAnchor(i.url)).length === 0) {
    logger.warn({ cluster }, 'no home anchor link could be inserted');
  }
  if (inserted.filter((i) => isSolution(i.url)).length === 0) {
    logger.warn({ cluster }, 'no /solutions/ link could be inserted');
  }

  const cross = appendCrossLinks(faqStart, cluster);
  return {
    markdown: working + (cross ?? ''),
    insertedLinks: inserted,
  };
}

function splitBodyFromFaq(md: string): { body: string; faqStart: string } {
  const faqIdx = md.search(/\n##\s+(?:FAQ|Questions[^\n]*)/i);
  if (faqIdx === -1) return { body: md, faqStart: '' };
  return { body: md.slice(0, faqIdx), faqStart: md.slice(faqIdx) };
}

function findFirstSafeMatch(text: string, re: RegExp): { index: number; length: number } | null {
  const m = re.exec(text);
  if (!m) return null;
  // reject if inside a markdown link [...](...)
  const before = text.slice(Math.max(0, m.index - 200), m.index);
  if (/\[[^\]]*$/.test(before)) return null;
  return { index: m.index, length: m[0].length };
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function appendCrossLinks(faqBlock: string, cluster: Cluster): string | null {
  const recents = listRecentArticles(cluster, 3);
  if (recents.length === 0) return faqBlock || null;
  const block = `\n\n## À lire aussi\n\n${recents
    .map((r) => `- [${r.title}](/${cluster}/${r.slug})`)
    .join('\n')}\n${faqBlock ?? ''}`;
  return block;
}
```

- [ ] **Step 2: Write `src/seo-engine/tests/linker.test.ts`**

```typescript
import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { initSchema, closeDb } from '../lib/db.js';
import { injectInternalLinks } from '../stages/linker.js';

const DB_PATH = path.join(import.meta.dirname, '..', 'data', 'seo.db');

beforeEach(() => {
  closeDb();
  if (fs.existsSync(DB_PATH)) fs.unlinkSync(DB_PATH);
  initSchema();
});

afterAll(() => closeDb());

const FAQ_SUFFIX = `\n\n## FAQ\n\n### Q1 ?\n\nR1.\n\n### Q2 ?\n\nR2.`;

describe('injectInternalLinks', () => {
  it('inserts at least one /solutions/ link when content matches', () => {
    const md = `## Définition\n\nUn agent IA SDR automatise la prospection.\n\n## Conclusion\n\nTexte.${FAQ_SUFFIX}`;
    const { markdown, insertedLinks } = injectInternalLinks(md, 'agent-ia');
    expect(insertedLinks.some((l) => l.url.startsWith('/solutions/'))).toBe(true);
    expect(markdown).toMatch(/\]\(\/solutions\//);
  });

  it('inserts at least one home anchor link when context matches', () => {
    const md = `## Tarif\n\nNotre tarification SmatchRoom Pulse commence à 249€.${FAQ_SUFFIX}`;
    const { insertedLinks } = injectInternalLinks(md, 'agent-ia');
    expect(insertedLinks.some((l) => l.url.startsWith('/#'))).toBe(true);
  });

  it('caps at 3 links maximum', () => {
    const md = `Le tarif SmatchRoom Pulse et notre processus de déploiement et nos cas d'usage SmatchRoom Pulse couvrent un agent IA SDR ou un agent IA support sur-mesure.${FAQ_SUFFIX}`;
    const { insertedLinks } = injectInternalLinks(md, 'agent-ia');
    expect(insertedLinks.length).toBeLessThanOrEqual(3);
  });

  it('never inserts the same URL twice', () => {
    const md = `Un agent IA SDR. Encore un agent IA SDR. Et toujours un agent IA SDR.${FAQ_SUFFIX}`;
    const { insertedLinks } = injectInternalLinks(md, 'agent-ia');
    const urls = insertedLinks.map((l) => l.url);
    expect(new Set(urls).size).toBe(urls.length);
  });

  it('does not insert inside an existing markdown link', () => {
    const md = `Voir [notre agent IA SDR](/autre-url) en détail.${FAQ_SUFFIX}`;
    const { markdown } = injectInternalLinks(md, 'agent-ia');
    // The existing link is preserved, the algorithm finds the anchor inside it and skips
    expect(markdown).toContain('[notre agent IA SDR](/autre-url)');
  });
});
```

- [ ] **Step 3: Build + tests**

Run: `cd src/seo-engine && npm run build && npx vitest run tests/linker.test.ts`
Expected: 5 tests pass.

- [ ] **Step 4: Commit**

```bash
git add src/seo-engine/stages/linker.ts src/seo-engine/tests/linker.test.ts
git commit -m "feat(seo): linker déterministe (home anchors + solutions + cross-links) + tests"
```

---

## Task 19: Generator orchestration (assembles outline → sections → meta → linker)

**Files:**
- Create: `src/seo-engine/generator.ts`

- [ ] **Step 1: Write `src/seo-engine/generator.ts`**

```typescript
import slugify from 'slugify';
import { buildOutline } from './stages/outline.js';
import { writeSections } from './stages/sections.js';
import { buildMetaAndJsonLd } from './stages/meta.js';
import { injectInternalLinks } from './stages/linker.js';
import { UsageTracker } from './lib/anthropic.js';
import { logger } from './lib/logger.js';
import type { TopicProposal, GeneratedArticle } from './lib/types.js';

const MAX_OUTLINE_USD = 0.20;
const MIN_BODY_WORDS = 1200;
const MAX_BODY_WORDS = 3500;

export async function generate(topic: TopicProposal, tracker: UsageTracker): Promise<GeneratedArticle> {
  logger.info({ slug: topic.slug }, 'starting outline');
  const outline = await buildOutline(topic, tracker);
  const afterOutline = tracker.snapshot();
  if (afterOutline.usd > MAX_OUTLINE_USD) {
    throw new Error(`Outline coût anormal : $${afterOutline.usd.toFixed(3)} > cap $${MAX_OUTLINE_USD}`);
  }

  logger.info({ sections: outline.h2Sections.length }, 'writing sections');
  const rawBody = await writeSections({ topic, outline, tracker });

  const wordCount = rawBody.split(/\s+/).filter(Boolean).length;
  if (wordCount < MIN_BODY_WORDS || wordCount > MAX_BODY_WORDS) {
    throw new Error(`Body length out of range: ${wordCount} mots (${MIN_BODY_WORDS}-${MAX_BODY_WORDS})`);
  }

  logger.info('injecting internal links');
  const linked = injectInternalLinks(rawBody, topic.cluster);

  logger.info('generating meta + JSON-LD');
  const meta = await buildMetaAndJsonLd({ topic, bodyMarkdown: linked.markdown, tracker });

  const slug = slugify(topic.slug, { lower: true, strict: true });
  const finalSnapshot = tracker.snapshot();
  const readingMinutes = Math.max(1, Math.round(wordCount / 220));

  return {
    slug,
    cluster: topic.cluster,
    frontmatter: {
      title: topic.title,
      metaTitle: meta.metaTitle,
      metaDescription: meta.metaDescription,
      publishedAt: new Date().toISOString(),
      primaryKeyword: topic.primaryKeyword,
      cluster: topic.cluster,
      readingMinutes,
      jsonLd: { article: meta.articleJsonLd, faqPage: meta.faqJsonLd },
    },
    bodyMarkdown: linked.markdown,
    cost: {
      inputTokens: finalSnapshot.inputTokens,
      outputTokens: finalSnapshot.outputTokens,
      cacheReadTokens: finalSnapshot.cacheReadTokens,
      usd: finalSnapshot.usd,
    },
  };
}
```

- [ ] **Step 2: Compile check**

Run: `cd src/seo-engine && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/seo-engine/generator.ts
git commit -m "feat(seo): orchestrateur generator (outline → sections → linker → meta)"
```

---

## Task 20: MDX writer + git helper + tests

**Files:**
- Create: `src/seo-engine/lib/mdx.ts`
- Create: `src/seo-engine/lib/git.ts`
- Create: `src/seo-engine/tests/mdx.test.ts`

- [ ] **Step 1: Write `src/seo-engine/lib/mdx.ts`**

```typescript
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { CONTENT_DIR, REPO_ROOT } from './paths.js';
import type { GeneratedArticle } from './types.js';

export function mdxPathFor(article: GeneratedArticle): string {
  return path.join(CONTENT_DIR, article.cluster, `${article.slug}.mdx`);
}

export function writeArticleMdx(article: GeneratedArticle): string {
  const filepath = mdxPathFor(article);
  fs.mkdirSync(path.dirname(filepath), { recursive: true });
  const serialized = matter.stringify(article.bodyMarkdown, article.frontmatter);
  fs.writeFileSync(filepath, serialized, 'utf8');
  return filepath;
}

export function relPathFromRepoRoot(absPath: string): string {
  return path.relative(REPO_ROOT, absPath);
}

export function repoRoot(): string {
  return REPO_ROOT;
}
```

- [ ] **Step 2: Write `src/seo-engine/lib/git.ts`**

```typescript
import simpleGit from 'simple-git';
import { repoRoot } from './mdx.js';
import { logger } from './logger.js';

const BOT_COMMIT_PREFIX = 'feat(seo):';

export async function commitArticle(relPath: string, slug: string): Promise<void> {
  const git = simpleGit(repoRoot());
  await git.env({
    GIT_AUTHOR_NAME: process.env.GIT_AUTHOR_NAME ?? 'Pulse SEO Bot',
    GIT_AUTHOR_EMAIL: process.env.GIT_AUTHOR_EMAIL ?? 'seo-bot@smatchroom.com',
    GIT_COMMITTER_NAME: process.env.GIT_AUTHOR_NAME ?? 'Pulse SEO Bot',
    GIT_COMMITTER_EMAIL: process.env.GIT_AUTHOR_EMAIL ?? 'seo-bot@smatchroom.com',
  }).add(relPath).commit(`${BOT_COMMIT_PREFIX} publish ${slug}`);
  logger.info({ slug, relPath }, 'article committed');
}

export async function rollbackBotCommit(): Promise<boolean> {
  const git = simpleGit(repoRoot());
  const head = await git.log({ maxCount: 1 });
  const subject = head.latest?.message ?? '';
  const status = await git.status();
  if (!subject.startsWith(BOT_COMMIT_PREFIX)) {
    logger.error({ subject }, 'refus de rollback : HEAD ne commence pas par feat(seo):');
    return false;
  }
  if (!status.isClean()) {
    logger.error({ files: status.files }, 'refus de rollback : working tree non clean');
    return false;
  }
  await git.reset(['--hard', 'HEAD~1']);
  logger.warn({ subject }, 'commit bot rollbacké');
  return true;
}
```

- [ ] **Step 3: Write `src/seo-engine/tests/mdx.test.ts`**

```typescript
import { describe, it, expect, afterEach } from 'vitest';
import fs from 'node:fs';
import matter from 'gray-matter';
import { mdxPathFor, writeArticleMdx } from '../lib/mdx.js';
import type { GeneratedArticle } from '../lib/types.js';

const FIXTURE: GeneratedArticle = {
  slug: 'test-article-temp',
  cluster: 'blog',
  frontmatter: {
    title: 'Test article',
    metaTitle: 'Test article — meta',
    metaDescription: 'Description suffisamment longue pour passer la validation Zod du schéma.',
    publishedAt: '2026-05-13T03:00:00.000Z',
    primaryKeyword: 'test article',
    cluster: 'blog',
    readingMinutes: 5,
    jsonLd: { article: { foo: 'bar' }, faqPage: { mainEntity: [] } },
  },
  bodyMarkdown: '## Section\n\nBody content.',
  cost: { inputTokens: 0, outputTokens: 0, cacheReadTokens: 0, usd: 0 },
};

afterEach(() => {
  const f = mdxPathFor(FIXTURE);
  if (fs.existsSync(f)) fs.unlinkSync(f);
});

describe('writeArticleMdx', () => {
  it('writes a parseable MDX file with frontmatter', () => {
    const filepath = writeArticleMdx(FIXTURE);
    expect(fs.existsSync(filepath)).toBe(true);
    const parsed = matter(fs.readFileSync(filepath, 'utf8'));
    expect(parsed.data.title).toBe('Test article');
    expect(parsed.content.trim()).toContain('Body content.');
  });
});
```

- [ ] **Step 4: Build + tests**

Run: `cd src/seo-engine && npm run build && npx vitest run tests/mdx.test.ts`
Expected: 1 test passes.

- [ ] **Step 5: Commit**

```bash
git add src/seo-engine/lib/mdx.ts src/seo-engine/lib/git.ts src/seo-engine/tests/mdx.test.ts
git commit -m "feat(seo): writer MDX + helper git (commit + rollback gardé) + tests"
```

---

## Task 21: Publisher (build + pm2 restart + guards)

**Files:**
- Create: `src/seo-engine/publisher.ts`

- [ ] **Step 1: Write `src/seo-engine/publisher.ts`**

```typescript
import { execa } from 'execa';
import fs from 'node:fs';
import { writeArticleMdx, mdxPathFor, relPathFromRepoRoot, repoRoot } from './lib/mdx.js';
import { commitArticle, rollbackBotCommit } from './lib/git.js';
import { insertArticle, markArticleFailed, markArticlePublished, updateTopicStatus, findTopicBySlug } from './lib/db.js';
import { logger } from './lib/logger.js';
import type { GeneratedArticle } from './lib/types.js';

const PULSE_PM2_NAME = process.env.PULSE_PM2_NAME ?? 'smatchroom-pulse';
const MIN_DISK_MB = Number(process.env.MIN_DISK_FREE_MB ?? '500');

export async function publish(article: GeneratedArticle): Promise<void> {
  ensureDiskAvailable();

  const topic = findTopicBySlug(article.slug);
  if (!topic) throw new Error(`Topic introuvable pour slug=${article.slug}`);

  const filepath = writeArticleMdx(article);
  const relPath = relPathFromRepoRoot(filepath);
  logger.info({ relPath }, 'MDX file written');

  const articleId = insertArticle({
    topicId: topic.id,
    slug: article.slug,
    cluster: article.cluster,
    mdxPath: relPath,
    costUsd: article.cost.usd,
    inputTokens: article.cost.inputTokens,
    outputTokens: article.cost.outputTokens,
    cacheReadTokens: article.cost.cacheReadTokens,
  });
  logger.info({ articleId }, 'article row inserted');

  await commitArticle(relPath, article.slug);

  try {
    logger.info('npm run build (Pulse)');
    await execa('npm', ['run', 'build'], { cwd: repoRoot(), stdio: 'inherit', timeout: 5 * 60 * 1000 });
  } catch (err) {
    logger.error({ err }, 'build failed — rolling back');
    const ok = await rollbackBotCommit();
    if (ok && fs.existsSync(filepath)) fs.unlinkSync(filepath);
    markArticleFailed(article.slug, `build failed: ${String(err)}`);
    updateTopicStatus(article.slug, 'failed');
    throw err;
  }

  try {
    logger.info({ pm2: PULSE_PM2_NAME }, 'pm2 restart');
    await execa('pm2', ['restart', PULSE_PM2_NAME], { stdio: 'inherit', timeout: 30 * 1000 });
  } catch (err) {
    logger.error({ err }, 'pm2 restart failed — article reste committé mais service non rechargé');
    markArticleFailed(article.slug, `pm2 restart failed: ${String(err)}`);
    throw err;
  }

  markArticlePublished(article.slug);
  updateTopicStatus(article.slug, 'published');
  logger.info({ slug: article.slug }, 'article published successfully');
}

function ensureDiskAvailable(): void {
  // Best-effort check using statfs (Linux); skip on non-Linux platforms
  try {
    const statfs = (fs as any).statfsSync?.(repoRoot());
    if (statfs) {
      const freeMb = (statfs.bsize * statfs.bavail) / (1024 * 1024);
      if (freeMb < MIN_DISK_MB) {
        throw new Error(`Disque saturé : ${freeMb.toFixed(0)} MB libres < ${MIN_DISK_MB} MB`);
      }
    }
  } catch (err) {
    if ((err as Error).message?.startsWith('Disque saturé')) throw err;
    logger.warn({ err }, 'disk check skipped');
  }
}
```

- [ ] **Step 2: Add `execa` dependency**

Run: `cd src/seo-engine && npm install execa@^9.5.0`
Expected: package installed.

- [ ] **Step 3: Compile check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/seo-engine/publisher.ts src/seo-engine/package.json src/seo-engine/package-lock.json
git commit -m "feat(seo): publisher (build, commit, pm2 restart, garde-fous rollback)"
```

---

## Task 22: Orchestrator index.ts + dry-run + once scripts

**Files:**
- Create: `src/seo-engine/index.ts`
- Create: `src/seo-engine/scripts/dry-run.ts`
- Create: `src/seo-engine/.env`

- [ ] **Step 1: Write `src/seo-engine/index.ts`**

```typescript
import 'dotenv/config';
import { pickNextTopic } from './planner.js';
import { generate } from './generator.js';
import { publish } from './publisher.js';
import { updateTopicStatus, startRun, finishRun, monthlyCostUsd, closeDb } from './lib/db.js';
import { UsageTracker } from './lib/anthropic.js';
import { logger } from './lib/logger.js';

const MAX_MONTH_USD = Number(process.env.MAX_COST_PER_MONTH_USD ?? '20');
const MAX_ARTICLE_USD = Number(process.env.MAX_COST_PER_ARTICLE_USD ?? '0.50');

async function main(): Promise<number> {
  if (!process.env.ANTHROPIC_API_KEY) {
    logger.fatal('ANTHROPIC_API_KEY manquante');
    return 1;
  }

  const monthCost = monthlyCostUsd();
  if (monthCost >= MAX_MONTH_USD) {
    logger.warn({ monthCost, cap: MAX_MONTH_USD }, 'budget mensuel dépassé — skip');
    return 0;
  }
  logger.info({ monthCost, cap: MAX_MONTH_USD }, 'budget OK');

  const tracker = new UsageTracker();
  const runId = startRun();

  try {
    const topic = await pickNextTopic(tracker);
    logger.info({ slug: topic.slug, cluster: topic.cluster }, 'topic picked');
    updateTopicStatus(topic.slug, 'in_progress');

    const article = await generate(topic, tracker);
    if (article.cost.usd > MAX_ARTICLE_USD) {
      throw new Error(`Article coût trop élevé : $${article.cost.usd.toFixed(3)} > cap $${MAX_ARTICLE_USD}`);
    }
    logger.info({ usd: article.cost.usd, words: article.bodyMarkdown.split(/\s+/).length }, 'article generated');

    await publish(article);
    finishRun(runId, { status: 'success', costUsd: article.cost.usd });
    logger.info({ totalUsd: tracker.snapshot().usd }, 'run success');
    return 0;
  } catch (err) {
    logger.error({ err }, 'run failed');
    finishRun(runId, { status: 'failed', costUsd: tracker.snapshot().usd, error: String(err) });
    return 1;
  } finally {
    closeDb();
  }
}

main().then((code) => process.exit(code));
```

- [ ] **Step 2: Write `src/seo-engine/scripts/dry-run.ts`**

```typescript
import 'dotenv/config';
import { pickNextTopic } from '../planner.js';
import { generate } from '../generator.js';
import { UsageTracker } from '../lib/anthropic.js';
import { logger } from '../lib/logger.js';
import { initSchema, closeDb } from '../lib/db.js';

async function main() {
  initSchema();
  const tracker = new UsageTracker();
  const topic = await pickNextTopic(tracker);
  logger.info({ topic }, 'topic picked (dry-run, persisted to DB)');
  const article = await generate(topic, tracker);
  logger.info({
    slug: article.slug,
    words: article.bodyMarkdown.split(/\s+/).length,
    usd: article.cost.usd,
    metaTitle: article.frontmatter.metaTitle,
    metaDescription: article.frontmatter.metaDescription,
  }, 'article generated (NOT published)');
  console.log('\n=========== BODY MARKDOWN PREVIEW ===========');
  console.log(article.bodyMarkdown.slice(0, 2000));
  console.log('============================================\n');
  closeDb();
}

main().catch((err) => {
  logger.error({ err }, 'dry-run failed');
  process.exit(1);
});
```

- [ ] **Step 3: Create `.env`**

```bash
cp src/seo-engine/.env.example src/seo-engine/.env
```

Edit `src/seo-engine/.env` and paste the ANTHROPIC_API_KEY value noted in Task 0 Step 3. Also set:
```
GIT_AUTHOR_NAME=Pulse SEO Bot
GIT_AUTHOR_EMAIL=seo-bot@smatchroom.com
```

- [ ] **Step 4: Build**

Run: `cd src/seo-engine && npm run build`
Expected: dist/ populated.

- [ ] **Step 5: Run dry-run**

Run: `cd src/seo-engine && node dist/scripts/dry-run.js`
Expected: logs show topic picked, article generated, MARKDOWN PREVIEW visible. Cost <$0.50. No file written to `src/content/`.

- [ ] **Step 6: Inspect SQLite state**

Run: `sqlite3 src/seo-engine/data/seo.db "SELECT slug, status FROM topics; SELECT slug, cost_usd FROM articles;"`
Expected: 1 topic row (status `pending`, since dry-run doesn't update beyond `in_progress` — verify behavior, adjust if needed). No articles row yet (dry-run skips publish).

- [ ] **Step 7: Commit**

```bash
git add src/seo-engine/index.ts src/seo-engine/scripts/dry-run.ts
git commit -m "feat(seo): orchestrator index.ts + dry-run script"
```

(Do NOT commit `.env`.)

---

## Task 23: ecosystem.config.js + first migration of Pulse under pm2

**Files:**
- Create: `ecosystem.config.js` (at Pulse repo root)
- Modify: `.gitignore` to exclude seo-engine/.env

- [ ] **Step 1: Update `.gitignore`**

Append to `/root/smatchroom-ecosystem/smatchroom-pulse/.gitignore`:

```
# SEO engine
src/seo-engine/node_modules
src/seo-engine/dist
src/seo-engine/data
src/seo-engine/.env
```

- [ ] **Step 2: Write `ecosystem.config.js`**

```javascript
module.exports = {
  apps: [
    {
      name: 'smatchroom-pulse',
      script: 'node_modules/next/dist/bin/next',
      args: 'start --hostname 127.0.0.1 --port 3001',
      cwd: '/root/smatchroom-ecosystem/smatchroom-pulse',
      autorestart: true,
      max_memory_restart: '1G',
      env: { NODE_ENV: 'production' }
    },
    {
      name: 'pulse-seo-daily',
      script: 'dist/index.js',
      cwd: '/root/smatchroom-ecosystem/smatchroom-pulse/src/seo-engine',
      cron_restart: '0 3 * * *',
      autorestart: false,
      watch: false,
      max_memory_restart: '512M',
      env: { NODE_ENV: 'production' },
      out_file: '/root/.pm2/logs/pulse-seo-out.log',
      error_file: '/root/.pm2/logs/pulse-seo-err.log',
      time: true
    }
  ]
};
```

- [ ] **Step 3: Commit**

```bash
git add ecosystem.config.js .gitignore
git commit -m "chore(pm2): ecosystem.config.js (smatchroom-pulse + pulse-seo-daily cron 3h)"
```

- [ ] **Step 4: Migrate Pulse under pm2 (manual, user confirms first)**

ASK USER before running these commands — they kill the current Pulse process.

```bash
# Identify the current next-server PID
ss -tlnp | grep ':3001'
# Kill the existing manual instance
pkill -f "next start --hostname 127.0.0.1 --port 3001"
# Build (already done by Task 8 step 3, but re-run to be safe)
cd /root/smatchroom-ecosystem/smatchroom-pulse && npm run build
# Start under pm2
pm2 start ecosystem.config.js --only smatchroom-pulse
pm2 save
# Verify
pm2 list
curl -I http://127.0.0.1:3001
```

Expected: `smatchroom-pulse` online in pm2, HTTP 200 on port 3001.

- [ ] **Step 5: Register the cron under pm2**

```bash
pm2 start ecosystem.config.js --only pulse-seo-daily
pm2 save
pm2 list
```

Expected: `pulse-seo-daily` listed as `stopped` (normal — autorestart false, cron will fire at 3 AM).

---

## Task 24: First live end-to-end run

**Files:** none (operational verification)

- [ ] **Step 1: Inspect dry-run output one more time**

Re-read the markdown preview from Task 22 step 5. Verify :
- 1st paragraph ≤80 mots et répond à la question
- Au moins 2 liens internes injectés (vérifier dans `bodyMarkdown` via dry-run logs)
- Section FAQ présente avec 4-6 questions

If anything looks off, stop here and adjust prompts in `stages/sections.ts` or `stages/outline.ts` before going live.

- [ ] **Step 2: Run live end-to-end manually**

ASK USER before running this — it will publish a real article and restart Pulse in prod.

```bash
cd /root/smatchroom-ecosystem/smatchroom-pulse/src/seo-engine
node dist/index.js
```

Expected: logs show topic → outline → sections → meta → write → commit → build → pm2 restart → success. Run duration ~3–4 min.

- [ ] **Step 3: Verify article live**

```bash
# Get the latest article slug
sqlite3 data/seo.db "SELECT cluster, slug FROM articles WHERE published_at IS NOT NULL ORDER BY published_at DESC LIMIT 1;"
# Then
curl -I "http://127.0.0.1:3001/agent-ia/<SLUG>"  # or /blog/<SLUG>
```

Expected: HTTP 200.

- [ ] **Step 4: Verify sitemap includes the new article**

Run: `curl http://127.0.0.1:3001/sitemap.xml | grep <SLUG>`
Expected: match found.

- [ ] **Step 5: Verify monthly cost tracking**

Run: `sqlite3 data/seo.db "SELECT slug, cost_usd FROM articles WHERE published_at IS NOT NULL;"`
Expected: 1 row, cost <$0.50.

- [ ] **Step 6: Verify pm2 cron will fire**

Run: `pm2 describe pulse-seo-daily | grep -E "cron_restart|next"`
Expected: shows cron `0 3 * * *`, next fire time.

- [ ] **Step 7: Final commit summary**

```bash
git log --oneline feat/seo-engine ^main | head -30
```

Expected: ~20 commits, all prefixed `feat(seo):`, `chore(pm2):`, or `docs(seo):`.

---

## Task 25: Documentation README and merge prep

**Files:**
- Create: `src/seo-engine/README.md`

- [ ] **Step 1: Write `src/seo-engine/README.md`**

```markdown
# Pulse SEO Engine

Moteur autonome de génération et publication d'articles SEO/GEO pour `pulse.smatchroom.com`.

## Quickstart

```bash
cd src/seo-engine
npm install
cp .env.example .env  # remplir ANTHROPIC_API_KEY
npm run build
node dist/scripts/init-db.js
npm run seo:dry-run    # test sans publier
node dist/index.js      # run live (génère + commit + build + pm2 restart)
```

## Stack LLM
- Client : `@anthropic-ai/sdk` natif (le même que `pulse-sdr`)
- Prompt caching ephemeral sur les system blocks longs
- UsageTracker : enregistre `input_tokens`, `output_tokens`, `cache_read_input_tokens`, `cache_creation_input_tokens` + coût USD

## Pipeline

1. **Planner** : choisit un sujet non traité dans `seeds/agent-ia.json` (Haiku raffine titre).
2. **Generator** : Outline (Sonnet) → Sections H2 séquentielles (Sonnet, cache hit) → Meta + JSON-LD (Haiku).
3. **Linker** : insère 2–3 liens internes déterministes vers `/#pricing`, `/#process`, `/solutions/*`.
4. **Publisher** : écrit MDX, `git commit feat(seo):`, `npm run build`, `pm2 restart smatchroom-pulse`.

## Cron quotidien (pm2)

Configuré dans `ecosystem.config.js` à la racine du repo Pulse :
- `pulse-seo-daily` se déclenche à **3h00 du matin** chaque jour
- One-shot (`autorestart: false`), logs dans `/root/.pm2/logs/pulse-seo-*.log`

Équivalent crontab système (non utilisé, pour traçabilité) :
```
0 3 * * * cd /root/smatchroom-ecosystem/smatchroom-pulse/src/seo-engine && /usr/bin/node dist/index.js >> /var/log/pulse-seo.log 2>&1
```

## FinOps

- Modèles : Sonnet 4.6 (outline/sections), Haiku 4.5 (refine/meta/cross-link)
- Prompt caching ephemeral sur le système commun
- Caps : `MAX_COST_PER_ARTICLE_USD=0.50`, `MAX_COST_PER_MONTH_USD=20`
- Tracking : `articles.cost_usd` par article, somme mensuelle dans la table `runs`

## Refill du seed bank

Quand le bank passe sous 10 sujets restants, exécuter (manuel) :

```bash
npm run seo:refill-seeds  # à implémenter en v1.1 si besoin
```

## Troubleshooting

- **Build cassé** : le rollback automatique restaure HEAD~1 SI le commit commence par `feat(seo):` ET working tree clean. Sinon échec bruyant, intervention manuelle.
- **pm2 restart fail** : article reste committé, prochain cron tick remettra Pulse en route si pm2 lui-même est OK.
- **DB lock** : 3 retries automatiques avec 100ms backoff.
- **Logs live** : `pm2 logs pulse-seo-daily`.
```

- [ ] **Step 2: Final commit + branch summary**

```bash
git add src/seo-engine/README.md
git commit -m "docs(seo): README du moteur SEO Pulse"
git log --oneline feat/seo-engine ^main
```

Expected: clean linear history, all commits prefixed properly.

---

## Done

The SEO engine is live. Daily at 3 AM, pm2 will fire `pulse-seo-daily`, which generates, publishes, and rebuilds. No further intervention is needed unless:
- Seed bank runs low (warning in logs)
- Monthly budget exceeded (run is skipped, warning logged)
- A build fails (article marked `failed` in DB, manual review needed)

**Branch ready for review**: `feat/seo-engine` (do NOT merge to main without user approval — `git merge` and `git push` are explicitly out of scope).
