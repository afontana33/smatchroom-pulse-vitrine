import { execa } from 'execa';
import fs from 'node:fs';
import { writeArticleMdx, relPathFromRepoRoot, repoRoot } from './lib/mdx.js';
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
