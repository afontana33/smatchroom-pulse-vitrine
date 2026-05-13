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
