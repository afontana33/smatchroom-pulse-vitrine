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
