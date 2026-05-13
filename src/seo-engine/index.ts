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
