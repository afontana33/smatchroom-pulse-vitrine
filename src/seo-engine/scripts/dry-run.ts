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
