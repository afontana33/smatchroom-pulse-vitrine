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

- Modèles : Sonnet 4.6 (outline/sections), Haiku 4.5 (refine/meta)
- Prompt caching ephemeral sur le système commun
- Caps : `MAX_COST_PER_ARTICLE_USD=0.50`, `MAX_COST_PER_MONTH_USD=20`
- Tracking : `articles.cost_usd` par article, somme mensuelle dans la table `runs`

## Troubleshooting

- **Build cassé** : le rollback automatique restaure HEAD~1 SI le commit commence par `feat(seo):` ET working tree clean. Sinon échec bruyant, intervention manuelle.
- **pm2 restart fail** : article reste committé, prochain cron tick remettra Pulse en route si pm2 lui-même est OK.
- **Logs live** : `pm2 logs pulse-seo-daily`.

## Architecture des fichiers

```
src/seo-engine/
├── package.json            # @anthropic-ai/sdk + better-sqlite3 + simple-git + ...
├── tsconfig.json           # strict mode
├── .env.example            # ANTHROPIC_API_KEY, caps FinOps
├── lib/
│   ├── anthropic.ts        # SDK wrapper + UsageTracker
│   ├── db.ts               # SQLite (topics, articles, runs)
│   ├── paths.ts            # résolution depuis process.cwd()
│   ├── mdx.ts              # writer MDX + gray-matter
│   ├── git.ts              # commit + rollback gardé (preset feat(seo):)
│   ├── sanitize.ts         # anti prompt-injection
│   ├── brand-context.ts    # system prompt SmatchRoom Pulse
│   ├── logger.ts           # pino
│   └── types.ts            # interfaces partagées
├── stages/
│   ├── outline.ts          # Sonnet — H2 plan
│   ├── sections.ts         # Sonnet — sections séquentielles
│   ├── meta.ts             # Haiku — meta + JSON-LD Article/FAQPage
│   └── linker.ts           # déterministe — home anchors + /solutions/
├── seeds/
│   ├── agent-ia.json       # 59 angles longue traîne
│   └── link-bank.json      # 10 entrées de maillage interne
├── scripts/
│   ├── init-db.ts          # bootstrap schema SQLite
│   └── dry-run.ts          # génère sans publier
├── tests/                  # vitest (sanitize, db, planner, outline, linker, mdx)
├── planner.ts              # Module 1
├── generator.ts            # Module 2 (orchestre stages)
├── publisher.ts            # Module 4 (build + pm2 + rollback)
└── index.ts                # Orchestrateur principal (entrypoint cron)
```
