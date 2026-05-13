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
