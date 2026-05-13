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
