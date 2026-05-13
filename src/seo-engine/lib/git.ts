import simpleGit from 'simple-git';
import { repoRoot } from './mdx.js';
import { logger } from './logger.js';

const BOT_COMMIT_PREFIX = 'feat(seo):';

export async function commitArticle(relPath: string, slug: string): Promise<void> {
  const git = simpleGit(repoRoot());
  await git.env({
    GIT_AUTHOR_NAME: process.env.GIT_AUTHOR_NAME ?? 'Pulse SEO Bot',
    GIT_AUTHOR_EMAIL: process.env.GIT_AUTHOR_EMAIL ?? 'seo-bot@smatchroom.com',
    GIT_COMMITTER_NAME: process.env.GIT_AUTHOR_NAME ?? 'Pulse SEO Bot',
    GIT_COMMITTER_EMAIL: process.env.GIT_AUTHOR_EMAIL ?? 'seo-bot@smatchroom.com',
  }).add(relPath).commit(`${BOT_COMMIT_PREFIX} publish ${slug}`);
  logger.info({ slug, relPath }, 'article committed');
}

export async function rollbackBotCommit(): Promise<boolean> {
  const git = simpleGit(repoRoot());
  const head = await git.log({ maxCount: 1 });
  const subject = head.latest?.message ?? '';
  const status = await git.status();
  if (!subject.startsWith(BOT_COMMIT_PREFIX)) {
    logger.error({ subject }, 'refus de rollback : HEAD ne commence pas par feat(seo):');
    return false;
  }
  if (!status.isClean()) {
    logger.error({ files: status.files }, 'refus de rollback : working tree non clean');
    return false;
  }
  await git.reset(['--hard', 'HEAD~1']);
  logger.warn({ subject }, 'commit bot rollbacké');
  return true;
}
