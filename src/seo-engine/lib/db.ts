import Database from 'better-sqlite3';
import type { ArticleStatus, Cluster, SearchIntent, TopicProposal } from './types.js';
import { DB_PATH, ensureDataDir } from './paths.js';

let _db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (_db) return _db;
  ensureDataDir();
  _db = new Database(DB_PATH);
  _db.pragma('journal_mode = WAL');
  _db.pragma('foreign_keys = ON');
  return _db;
}

export const SCHEMA = `
CREATE TABLE IF NOT EXISTS topics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  primary_keyword TEXT NOT NULL,
  cluster TEXT NOT NULL CHECK (cluster IN ('agent-ia', 'blog')),
  search_intent TEXT NOT NULL,
  question_long_tail TEXT NOT NULL,
  estimated_difficulty INTEGER NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'in_progress', 'published', 'failed', 'skipped')),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS articles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  topic_id INTEGER NOT NULL REFERENCES topics(id),
  slug TEXT UNIQUE NOT NULL,
  cluster TEXT NOT NULL,
  mdx_path TEXT NOT NULL,
  published_at TEXT,
  cost_usd REAL NOT NULL DEFAULT 0,
  input_tokens INTEGER NOT NULL DEFAULT 0,
  output_tokens INTEGER NOT NULL DEFAULT 0,
  cache_read_tokens INTEGER NOT NULL DEFAULT 0,
  error_message TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS runs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  started_at TEXT NOT NULL DEFAULT (datetime('now')),
  finished_at TEXT,
  status TEXT NOT NULL CHECK (status IN ('running', 'success', 'failed')),
  topic_id INTEGER REFERENCES topics(id),
  article_id INTEGER REFERENCES articles(id),
  total_cost_usd REAL NOT NULL DEFAULT 0,
  error_message TEXT
);

CREATE INDEX IF NOT EXISTS idx_topics_status ON topics(status);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at);
CREATE INDEX IF NOT EXISTS idx_runs_started_at ON runs(started_at);
`;

export function initSchema(): void {
  getDb().exec(SCHEMA);
}

export function findTopicBySlug(slug: string): { id: number; status: ArticleStatus } | undefined {
  return getDb().prepare('SELECT id, status FROM topics WHERE slug = ?').get(slug) as
    | { id: number; status: ArticleStatus }
    | undefined;
}

export function insertTopic(t: TopicProposal): number {
  const stmt = getDb().prepare(`
    INSERT INTO topics (slug, title, primary_keyword, cluster, search_intent, question_long_tail, estimated_difficulty, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')
  `);
  return Number(stmt.run(
    t.slug, t.title, t.primaryKeyword, t.cluster, t.searchIntent, t.questionLongTail, t.estimatedDifficulty,
  ).lastInsertRowid);
}

export function updateTopicStatus(slug: string, status: ArticleStatus): void {
  getDb().prepare(`UPDATE topics SET status = ?, updated_at = datetime('now') WHERE slug = ?`).run(status, slug);
}

export function findStaleInProgress(maxHours = 24): { slug: string; title: string; cluster: Cluster; search_intent: SearchIntent; primary_keyword: string; question_long_tail: string; estimated_difficulty: number } | undefined {
  return getDb().prepare(`
    SELECT slug, title, cluster, search_intent, primary_keyword, question_long_tail, estimated_difficulty
    FROM topics
    WHERE status = 'in_progress' AND updated_at <= datetime('now', ?)
    LIMIT 1
  `).get(`-${maxHours} hours`) as any;
}

export function listRecentArticles(cluster: Cluster, limit = 5): { slug: string; title: string }[] {
  return getDb().prepare(`
    SELECT a.slug, t.title
    FROM articles a JOIN topics t ON t.id = a.topic_id
    WHERE a.cluster = ? AND a.published_at IS NOT NULL
    ORDER BY a.published_at DESC LIMIT ?
  `).all(cluster, limit) as { slug: string; title: string }[];
}

export function insertArticle(args: {
  topicId: number; slug: string; cluster: Cluster; mdxPath: string;
  costUsd: number; inputTokens: number; outputTokens: number; cacheReadTokens: number;
}): number {
  const stmt = getDb().prepare(`
    INSERT INTO articles (topic_id, slug, cluster, mdx_path, cost_usd, input_tokens, output_tokens, cache_read_tokens)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  return Number(stmt.run(
    args.topicId, args.slug, args.cluster, args.mdxPath, args.costUsd,
    args.inputTokens, args.outputTokens, args.cacheReadTokens,
  ).lastInsertRowid);
}

export function markArticlePublished(slug: string): void {
  getDb().prepare(`UPDATE articles SET published_at = datetime('now') WHERE slug = ?`).run(slug);
}

export function markArticleFailed(slug: string, err: string): void {
  getDb().prepare(`UPDATE articles SET error_message = ? WHERE slug = ?`).run(err, slug);
}

export function startRun(topicId?: number): number {
  const stmt = getDb().prepare(`INSERT INTO runs (status, topic_id) VALUES ('running', ?)`);
  return Number(stmt.run(topicId ?? null).lastInsertRowid);
}

export function finishRun(id: number, args: { status: 'success' | 'failed'; articleId?: number; costUsd?: number; error?: string }): void {
  getDb().prepare(`
    UPDATE runs SET status = ?, article_id = ?, total_cost_usd = ?, error_message = ?, finished_at = datetime('now')
    WHERE id = ?
  `).run(args.status, args.articleId ?? null, args.costUsd ?? 0, args.error ?? null, id);
}

export function monthlyCostUsd(): number {
  const row = getDb().prepare(`
    SELECT COALESCE(SUM(cost_usd), 0) AS total
    FROM articles
    WHERE published_at >= date('now', 'start of month')
  `).get() as { total: number };
  return row.total;
}

export function closeDb(): void {
  if (_db) { _db.close(); _db = null; }
}
