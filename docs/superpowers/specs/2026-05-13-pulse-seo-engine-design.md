# Pulse SEO Engine — Design

**Date** : 2026-05-13
**Owner** : Alex Fontana (SmatchRoom)
**Scope** : pulse.smatchroom.com — moteur autonome de Programmatic SEO/GEO sur la thématique "Agent IA"
**Status** : Approved — ready for implementation plan

---

## 1. Objectif

Doter `pulse.smatchroom.com` d'un système autonome de génération et publication d'articles SEO/GEO optimisés autour de la thématique principale "Agent IA", publiant **1 article par jour** sans intervention humaine, afin de capter du trafic organique sur Google et les moteurs IA (Perplexity, ChatGPT, Gemini) et de transférer le PageRank vers les pages transactionnelles via maillage interne.

Le moteur est **dédié à Pulse** et vit dans le repo Pulse (`src/seo-engine/`). Il ne réutilise pas l'infra `agentref.smatchroom.com` (choix explicite du user pour l'isolation du contenu et de la chaîne de build).

---

## 2. Contraintes & décisions clés

| Décision | Choix retenu | Raison |
|---|---|---|
| Langage du moteur | **TypeScript strict** isolé dans `src/seo-engine/` avec son propre `tsconfig.json` | Type-safety pour la logique LLM ; Pulse reste en JS |
| Structure d'URL | **Cluster `/agent-ia/[slug]` + hub `/blog/[slug]`** | Topical authority sur la thématique principale + extensibilité |
| Mode de publication | **MDX en repo + commit git + rebuild Next.js** | Pages 100% SSG, perf max, articles versionnés |
| Maillage interne | **Ancres home (`/#pricing`, `/#process`, `/#use-cases`) + landings `/solutions/[x]`** | Garde le PageRank interne, money pages dédiées |
| Orchestration | **pm2 cron natif** (`cron_restart` + `autorestart:false`) | Logs unifiés avec les autres process VPS (emargeo, pulse-track2-cron) |
| Persistance | **SQLite `better-sqlite3`** | Robuste, atomique, requêtable, suffisant pour 1 article/jour |
| Stack LLM | `@langchain/anthropic` + Sonnet 4.6 (rédaction) + Haiku 4.5 (meta/profilage) | Doctrine FinOps |
| Stratégie git | **Commit direct sur la branche courante** (probablement `main`) avec préfixe `feat(seo):` | Dérogation explicite à la règle "une feature = une branche" pour les commits autonomes du bot. Garde-fou : reset n'opère QUE sur des commits dont le sujet commence par `feat(seo):` |
| Ton éditorial | **Vouvoiement** ("vous", "vos équipes") | Cohérence avec le ton institutionnel Pulse (cf. règle cold mails Pulse-SDR) |

---

## 3. Architecture

### 3.1 Arborescence cible

```
smatchroom-pulse/
├── src/
│   ├── app/
│   │   ├── page.js                          # home existante (inchangée)
│   │   ├── blog/
│   │   │   ├── page.jsx                     # index /blog
│   │   │   └── [slug]/page.jsx              # article /blog/[slug]
│   │   ├── agent-ia/
│   │   │   ├── page.jsx                     # hub /agent-ia (cluster topical)
│   │   │   └── [slug]/page.jsx              # article /agent-ia/[slug]
│   │   ├── solutions/
│   │   │   └── [slug]/page.jsx              # landings transactionnelles
│   │   ├── sitemap.xml/route.js             # sitemap dynamique
│   │   └── robots.txt/route.js
│   ├── components/
│   │   ├── Article.jsx                      # layout article
│   │   └── ArticleCard.jsx                  # carte index
│   ├── lib/
│   │   └── content.js                       # scan src/content/, parse gray-matter
│   ├── content/                             # MDX commit dans le repo
│   │   ├── agent-ia/*.mdx
│   │   ├── blog/*.mdx
│   │   └── solutions/*.mdx
│   └── seo-engine/                          # moteur TS isolé
│       ├── tsconfig.json
│       ├── package.json
│       ├── lib/
│       │   ├── anthropic.ts                 # client + caching ephemeral
│       │   ├── db.ts                        # SQLite better-sqlite3
│       │   ├── mdx.ts                       # writer MDX + frontmatter
│       │   ├── git.ts                       # commit helper (simple-git)
│       │   ├── logger.ts                    # pino → stdout
│       │   └── sanitize.ts                  # anti prompt-injection
│       ├── seeds/
│       │   ├── agent-ia.json                # seed bank (~80 angles)
│       │   └── link-bank.json               # ancres + URLs cibles maillage
│       ├── planner.ts                       # Module 1
│       ├── generator.ts                     # Module 2 + linker M3
│       ├── publisher.ts                     # Module 4
│       ├── index.ts                         # orchestrateur (entrypoint cron)
│       ├── scripts/
│       │   ├── init-db.ts                   # bootstrap schema
│       │   ├── dry-run.ts                   # génère mais ne publie pas
│       │   └── refill-seeds.ts              # régénère seed bank (Sonnet, mensuel)
│       └── data/
│           └── seo.db                       # SQLite (gitignored)
├── ecosystem.config.js                      # pm2 (smatchroom-pulse + pulse-seo-daily)
└── docs/superpowers/specs/                  # ce document
```

### 3.2 Flux nominal

```
pm2 cron 0 3 * * *
  └── node dist/seo-engine/index.js
       ├── 1. Planner.pickNextTopic()        ~30s, $0.01
       │     └── seed bank → filtre DB → Haiku raffine titre
       ├── 2. Generator.generate(topic)      ~60s, $0.30
       │     ├── Outline (Sonnet)
       │     ├── Sections H2-by-H2 (Sonnet, cache hit)
       │     ├── Meta + JSON-LD (Haiku)
       │     └── injectInternalLinks(md)     déterministe + cross-link Haiku
       └── 3. Publisher.publish(article)     ~120s
             ├── write src/content/{cluster}/{slug}.mdx
             ├── git commit "feat(seo): publish {slug}"
             ├── npm run build (Next.js)
             ├── pm2 restart smatchroom-pulse
             └── DB update status='published', cost_usd
```

---

## 4. Modules détaillés

### 4.1 Module 1 — `planner.ts` (Keyword Engine)

**Rôle** : produire un sujet de longue traîne non encore traité.

**Interface** :
```typescript
interface TopicProposal {
  slug: string;
  title: string;
  primaryKeyword: string;
  searchIntent: 'informational' | 'commercial' | 'transactional';
  cluster: 'agent-ia' | 'blog';
  questionLongTail: string;
  estimatedDifficulty: 1 | 2 | 3 | 4 | 5;
}

async function pickNextTopic(): Promise<TopicProposal>
```

**Algorithme** :
1. Charger seed bank `seeds/agent-ia.json` (~80 angles initiaux : "comment X", "vs Y", "coût Z", "exemple W", "outils", "cas d'usage" × verticales B2B).
2. Filtrer ceux déjà traités (SQLite `topics`, lookup par slug normalisé).
3. Pondération cluster : ~80% `agent-ia`, ~20% `blog` (élargit le maillage).
4. Appeler **Haiku 4.5** : (a) raffinage titre, (b) reformulation question longue traîne, (c) estimation difficulté. System prompt court, output Zod strict, **prompt caching ephemeral**.
5. Si moins de 10 sujets restent → flag `seed_refill_needed=true` en DB (un cron mensuel séparé régénère via Sonnet).
6. INSERT pending dans `topics`, return `TopicProposal`.

**Early exit** : si un `topics.status='in_progress'` traîne depuis >24h → reprendre celui-ci au lieu d'en créer un nouveau.

### 4.2 Module 2 — `generator.ts` (Content Generator GEO)

**Rôle** : produire l'article complet (MDX + frontmatter SEO + JSON-LD + maillage interne).

**Pipeline 3 étages** :

1. **Outline** (Sonnet 4.6) :
   - Input : `TopicProposal` + system prompt GEO/marque (cache)
   - Output Zod : `{ h2Sections: { title, intent, wordsTarget }[] }`, total ~1800–2200 mots

2. **Sections** (Sonnet 4.6, **cache hit sur system**) :
   - Pour chaque H2 → 1 appel séquentiel (réduit pollution contextuelle inter-sections, garde le cache chaud)
   - Contraintes GEO dans le system prompt :
     - Premier paragraphe du body = **réponse directe** ≤80 mots (Featured Snippet target)
     - Densité élevée de **listes à puces** et **chiffres concrets** (≥1 stat/section)
     - Pas de ton promo
     - FAQ finale 4–6 questions, réponses 30–60 mots

3. **Meta + JSON-LD** (Haiku 4.5) :
   - `metaTitle` (≤60c.), `metaDescription` (≤155c.)
   - `schema.org/Article` + `schema.org/FAQPage` (auto-extrait depuis la section FAQ du markdown)

**Schémas Zod permissifs** (leçon agentref) : pas de `max(X)` strict sur metaTitle/metaDescription pour éviter `OUTPUT_PARSING_FAILURE`. Les contraintes de longueur sont des recommandations dans le prompt, pas des hard caps dans Zod.

**Interface sortie** :
```typescript
interface GeneratedArticle {
  slug: string;
  cluster: 'agent-ia' | 'blog';
  frontmatter: {
    title: string;
    metaTitle: string;
    metaDescription: string;
    publishedAt: string;       // ISO
    primaryKeyword: string;
    cluster: string;
    readingMinutes: number;
  };
  bodyMarkdown: string;        // avec liens internes déjà injectés
  jsonLd: { article: object; faqPage: object };
  cost: { inputTokens: number; outputTokens: number; cacheReadTokens: number; usd: number };
}
```

### 4.3 Module 3 — Linker (intégré dans `generator.ts`)

**Rôle** : insérer 2–3 liens hypertextes internes optimisés dans le markdown.

**Algorithme** :
1. Charger `seeds/link-bank.json` (entrées `{ anchor, url, context, priority }`).
2. Pour chaque entrée, regex word-boundary case-insensitive sur le body. Premier match uniquement.
3. **Règles** :
   - 2 minimum, 3 maximum par article
   - Pas dans H1 ni dans la section FAQ
   - Une URL ne peut apparaître qu'une seule fois
   - **Au moins 1 lien vers une ancre home** (`/#pricing`, `/#process`, `/#use-cases`)
   - **Au moins 1 lien vers une `/solutions/[x]`**
4. **Cross-link bonus** (1 appel Haiku) : lit la liste des 5 derniers articles publiés du même cluster (DB), suggère 1 article connexe si match sémantique évident, sinon skip.

**Format Markdown** : `[anchor text](url)` standard. Le rendu MDX se charge de transformer en `<Link>` côté Next.js si on veut (optimisation future, pas critique).

### 4.4 Module 4 — `publisher.ts`

**Rôle** : matérialiser l'article et déclencher la mise en prod.

**Interface** :
```typescript
async function publish(article: GeneratedArticle): Promise<void>
```

**Étapes** :
1. Écrire `src/content/{cluster}/{slug}.mdx` avec `gray-matter` (frontmatter YAML + body).
2. `git add src/content/{cluster}/{slug}.mdx` + `git commit -m "feat(seo): publish {slug}"` via `simple-git`. **Pas de `git push`** (veto user explicite).
3. `cd ../.. && npm run build` (Next.js détecte les nouveaux MDX via `generateStaticParams` qui scanne `src/content/`).
4. Si build OK → `pm2 restart smatchroom-pulse`. Si build KO → garde-fou rollback (cf. §6).
5. UPDATE `articles` SET `status='published'`, `published_at=now()`, `cost_usd=X`.

### 4.5 Module 0 — `index.ts` (Orchestrator)

```typescript
async function main() {
  const topic = await planner.pickNextTopic();
  await markInProgress(topic);
  const article = await generator.generate(topic);
  await publisher.publish(article);
  await reportRun(article.cost);
}
```

`try/catch` global : toute erreur → log structuré pino + UPDATE SQLite `status='failed'` + exit code 1.

---

## 5. Persistance (SQLite)

### 5.1 Schéma

```sql
CREATE TABLE topics (
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

CREATE TABLE articles (
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

CREATE TABLE runs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  started_at TEXT NOT NULL DEFAULT (datetime('now')),
  finished_at TEXT,
  status TEXT NOT NULL CHECK (status IN ('running', 'success', 'failed')),
  topic_id INTEGER REFERENCES topics(id),
  article_id INTEGER REFERENCES articles(id),
  total_cost_usd REAL NOT NULL DEFAULT 0,
  error_message TEXT
);

CREATE INDEX idx_topics_status ON topics(status);
CREATE INDEX idx_articles_published_at ON articles(published_at);
CREATE INDEX idx_runs_started_at ON runs(started_at);
```

### 5.2 Vues utiles
- Coût mensuel cumulé : `SELECT SUM(cost_usd) FROM articles WHERE published_at >= date('now', 'start of month')`
- Sujets disponibles : `SELECT COUNT(*) FROM topics WHERE status='pending'`

---

## 6. Gestion d'erreurs (matrice complète)

| Failure | Behavior |
|---|---|
| Anthropic 5xx / rate limit | Retry exponentiel LangChain (3 tries, backoff 2/4/8s). Échec final → `runs.status='failed'`, on retentera demain |
| Zod parse fail (outline ou sections) | 1 retry avec instruction explicite "respect strictly the schema", sinon `failed` |
| bodyMarkdown <1200 ou >3500 mots | Reject avec re-prompt 1 fois max |
| Slug collision (déjà en DB) | Skip propre, planner repick |
| Disque saturé (`df` <500MB libre) | Exit avant tout appel LLM, log critique |
| `npm run build` KO | **Garde-fou** : check `git log -1 --format=%s` matche `feat(seo):` ET `git status` clean → `git reset --hard HEAD~1`. Sinon échec bruyant sans toucher au git. Pas de `pm2 restart`. Article marqué `failed` |
| `pm2 restart` fail | Log + exit 1. Article reste committé (sera servi au prochain build manuel ou cron suivant) |
| DB lock SQLite | Retry 3x avec 100ms backoff |
| Budget mensuel dépassé | Planner skip le run, log warning |

**Principe** : préférer l'échec bruyant à une action destructive incertaine. Aucun `git reset` ne s'exécute si la moindre vérification échoue.

---

## 7. FinOps (doctrine respectée)

### 7.1 Modèles utilisés

| Étape | Modèle | Justification |
|---|---|---|
| Planner — raffinage | `claude-haiku-4-5` | Tâche déterministe courte |
| Planner — refill seed bank (1×/mois) | `claude-sonnet-4-6` | Créativité requise, faible fréquence |
| Generator — outline | `claude-sonnet-4-6` | Structure SEO/GEO complexe |
| Generator — sections | `claude-sonnet-4-6` | Rédaction qualité |
| Generator — meta + JSON-LD | `claude-haiku-4-5` | Formatage strict |
| Generator — cross-link | `claude-haiku-4-5` | Match sémantique simple |

### 7.2 Prompt caching

System prompt commun aux 3 étages du generator (~3500 tokens : contraintes GEO + ton SmatchRoom Pulse + extrait link bank + contexte produit) chargé une seule fois avec `cache_control: { type: 'ephemeral' }`. Estimation ~80% de discount sur les input des étapes sections (10 appels) et meta.

### 7.3 Budget caps

| Cap | Valeur | Action |
|---|---|---|
| `MAX_COST_PER_ARTICLE_USD` | 0.50 | Early exit si outline >$0.20 (anomalie) |
| `MAX_COST_PER_MONTH_USD` | 20.00 | Planner skip le run si cumul dépassé |
| `MIN_DISK_FREE_MB` | 500 | Exit avant tout appel LLM |

Estimation initiale ~$0.30/article × 30 = **$9/mois** en mode nominal, large marge sous le cap.

### 7.4 Sanitization

Tous les inputs injectés dans un prompt (titres antérieurs, link bank context, seed) passent par `lib/sanitize.ts` qui strip les patterns d'injection (`</system>`, `<|im_start|>`, balises XML suspectes, séquences markdown malformées).

### 7.5 Early exits Zod
- Slug déjà en DB → skip avant tout appel LLM
- Outline parse fail → 1 retry, puis abandon
- bodyMarkdown hors range → 1 re-prompt, puis abandon

---

## 8. Routes Next.js & rendu MDX

### 8.1 Dépendances ajoutées côté Pulse

```
@next/mdx
@mdx-js/loader
@mdx-js/react
gray-matter
remark-gfm
rehype-slug
rehype-autolink-headings
reading-time
```

### 8.2 Routes

| Route | Type | Source |
|---|---|---|
| `/blog` | static | scan `src/content/blog/*.mdx`, tri `publishedAt` desc |
| `/blog/[slug]` | SSG | `generateStaticParams` lit `src/content/blog/` |
| `/agent-ia` | static | hub topical + grid `src/content/agent-ia/*.mdx` |
| `/agent-ia/[slug]` | SSG | idem |
| `/solutions/[slug]` | SSG | landings rédigées manuellement |
| `/sitemap.xml` | route handler | scan global |
| `/robots.txt` | route handler | référence sitemap |

### 8.3 Layout article (`components/Article.jsx`)

```
[Nav existante]
[Breadcrumb : Accueil > Agent IA > {title}]
[H1 + meta : date · X min · primaryKeyword]
[Body MDX rendu]
[FAQ (déjà dans markdown)]
[CTA bloc "Discuter de votre besoin" → Calendly]
[Cross-link bloc : 3 articles connexes]
[Footer existant]
```

`<script type="application/ld+json">` injecté depuis `frontmatter.jsonLd.article` et `frontmatter.jsonLd.faqPage`.

### 8.4 Landings `/solutions/[x]` initiales

3 landings à rédiger **manuellement en MDX lors de l'initialisation** (pas par le bot, ce sont des money pages) :

1. `/solutions/agent-sdr` — "Agent IA SDR : qualifier et prospecter sans recruter"
2. `/solutions/agent-support` — "Agent IA Support : automatiser les tickets de niveau 1"
3. `/solutions/agent-sur-mesure` — "Agent IA sur-mesure : workflow propriétaire"

Structure ~600 mots : problème → solution → preuves → Calendly CTA. Schema `Service` JSON-LD. Pré-existence requise pour que le link bank ait des cibles dès J1.

### 8.5 Sitemap

Route handler régénéré à chaque build, inclut `/`, `/blog`, `/agent-ia`, `/solutions/*`, tous les articles avec `<lastmod>` = `publishedAt`.

---

## 9. Orchestration pm2

### 9.1 `ecosystem.config.js`

```javascript
module.exports = {
  apps: [
    {
      name: 'smatchroom-pulse',
      script: 'node_modules/next/dist/bin/next',
      args: 'start --hostname 127.0.0.1 --port 3001',
      cwd: '/root/smatchroom-ecosystem/smatchroom-pulse',
      autorestart: true,
      max_memory_restart: '1G'
    },
    {
      name: 'pulse-seo-daily',
      script: 'dist/seo-engine/index.js',
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

### 9.2 Migration one-time de Pulse sous pm2

Pulse est actuellement lancé manuellement. Avant de lancer le cron :
1. Kill l'ancien `next start` manuel
2. `pm2 start ecosystem.config.js --only smatchroom-pulse`
3. `pm2 save`
4. Vérifier nginx (port 3001 inchangé)

Zero downtime nginx car le port 3001 reste le même.

### 9.3 Commande cron équivalente (alternative crontab système)

Fournie pour traçabilité (non utilisée) :
```bash
0 3 * * * cd /root/smatchroom-ecosystem/smatchroom-pulse/src/seo-engine && /usr/bin/node dist/seo-engine/index.js >> /var/log/pulse-seo.log 2>&1
```

---

## 10. Procédure d'initialisation

```bash
cd /root/smatchroom-ecosystem/smatchroom-pulse

# 1. Dépendances Pulse (MDX rendering)
npm install @next/mdx @mdx-js/loader @mdx-js/react gray-matter remark-gfm rehype-slug rehype-autolink-headings reading-time

# 2. Dépendances seo-engine
cd src/seo-engine
npm install
npm run build  # tsc → dist/

# 3. Init DB + seed bank
node dist/scripts/init-db.js

# 4. Variables d'env
cp .env.example .env
# remplir : ANTHROPIC_API_KEY (réutiliser pulse-sdr/.env), GIT_AUTHOR_NAME, GIT_AUTHOR_EMAIL

# 5. Test dry-run (génère sans publier)
npm run seo:dry-run

# 6. Premier run live manuel pour valider
npm run seo:once  # = node dist/seo-engine/index.js

# 7. Migration Pulse sous pm2 + cron enregistré
cd ../..
pm2 start ecosystem.config.js
pm2 save

# 8. Vérifications
pm2 list  # smatchroom-pulse: online ; pulse-seo-daily: stopped (normal, cron only)
```

---

## 11. Hors scope (explicitement)

- **Backoffice admin** pour relire/éditer les articles avant publication (le user a accepté la publication 100% autonome).
- **A/B testing de titres** (peut être ajouté plus tard via colonnes `topics`).
- **Multi-langue** (FR uniquement v1).
- **Soumission directe à Google Search Console / IndexNow** (à considérer en v2 pour accélérer l'indexation).
- **Génération d'images** d'illustration (v2, MidJourney/DALL-E à intégrer).
- **Réutilisation de l'infra `agentref.smatchroom.com`** (choix explicite d'isolation).

---

## 12. Métriques de succès

- 30 articles publiés/mois sans intervention
- Coût mensuel < $20
- 0 build cassé en production (taux de rollback < 5%)
- Indexation Google des 90% des articles publiés sous 14 jours (mesurable via GSC en v2)
- Au moins 2 liens internes / article respectés, ≥1 vers `/solutions/`

---

## 13. Annexe — Contexte produit Pulse (injecté dans le system prompt du generator)

Le system prompt du generator inclut un bloc statique (cache hit) qui contextualise la marque pour éviter le contenu générique et garantir l'alignement avec l'offre :

```
SmatchRoom Pulse est un studio d'agents IA B2B opérant sous SmatchRoom SAS.
Offre commerciale (pricing v2, 2026-05) :
  - Pilote : 249€/mois + 490€ setup (1 agent, périmètre cadré)
  - Squad  : 690€/mois + 1 490€ setup (plusieurs agents orchestrés)
  - Custom : sur devis
Tous les CTA pointent vers Calendly (https://calendly.com/a-fontana-smatchroom/30min).
Cible : dirigeants et opérationnels B2B (SDR, support, ops).
Ton : vouvoiement systématique, expertise concrète, pas de promesse magique,
chiffres et exemples privilégiés.
Concurrence à mentionner avec nuance, jamais frontalement (ex : "chatbots
no-code traditionnels", "solutions verticales pré-packagées").
```

Ce bloc est versionné dans `seo-engine/lib/brand-context.ts` et constitue ~1200 tokens du system prompt cachable.

---

## 14. Risques connus

| Risque | Mitigation |
|---|---|
| Sonnet produit du contenu fade/répétitif sur le long terme | Refill seed bank mensuel + diversité de templates de questions |
| Build Next.js casse silencieusement sur un MDX malformé | Validation `gray-matter` + `remark-mdx` côté seo-engine avant commit |
| `pm2 restart smatchroom-pulse` interrompt brièvement le service | Acceptable (Next.js redémarre en <2s, nginx tient le coup) — sinon basculer vers `pm2 reload` |
| Sujet généré collide avec une recherche brand existante | Blacklist statique dans `seeds/agent-ia.json` (noms concurrents, sujets sensibles) |
| Anthropic API en panne complète | Le cron skipe la journée, retry naturel le lendemain |
