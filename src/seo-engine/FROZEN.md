# pulse-seo-engine — GELÉ (2026-05-20)

Ce moteur a été **migré vers agentref.smatchroom.com** qui devient le moteur SEO/GEO unique de tout l'écosystème SmatchRoom.

## Pourquoi
- Centralisation : un seul pipeline maintenu (RankSniper v1) au lieu de deux divergents.
- Pulse devient un tenant standard du SaaS multi-tenant `agentref.smatchroom.com`.
- Voir `/root/seo-geo-agents/ARCHITECTURE.md` pour le plan complet.

## Dernier état
- Branche : `feat/seo-engine` (30 commits, **non mergée**, conservée comme archive)
- Dernier article généré : `agent-ia-modeles-open-source` (cluster `agent-ia`) — 2026-05-13
- Cron `pulse-seo-daily` : **supprimé du pm2** le 2026-05-20

## Ce qui sera réutilisé côté Pulse
- Routes Next.js `/blog/[slug]`, `/agent-ia/[slug]` — gardées (réception d'articles via webhook)
- Logique `execa('npm run build')` + `pm2 restart smatchroom-pulse` — réimplémentée dans l'endpoint webhook qui remplace ce moteur
- `seeds/agent-ia.json` (59 angles) — importé en DB agentref comme Keywords pending sur le tenant `pulse.smatchroom.com`

## Ne pas relancer
Ne pas réactiver le cron `pulse-seo-daily`. Ne pas merger `feat/seo-engine` sur `main`. Toute génération SEO/GEO Pulse passe désormais par `https://agentref.smatchroom.com`.
