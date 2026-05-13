import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import fs from 'node:fs';
import { initSchema, insertTopic, findTopicBySlug, closeDb } from '../lib/db.js';
import { DB_PATH } from '../lib/paths.js';

beforeEach(() => {
  closeDb();
  if (fs.existsSync(DB_PATH)) fs.unlinkSync(DB_PATH);
  initSchema();
});

afterAll(() => closeDb());

describe('planner — DB-only behaviors (no LLM)', () => {
  it('detects stale in_progress topics older than 24h', async () => {
    insertTopic({
      slug: 'stale-topic', title: 'Stale', primaryKeyword: 'stale',
      cluster: 'agent-ia', searchIntent: 'informational',
      questionLongTail: 'old?', estimatedDifficulty: 2,
    });
    const Database = (await import('better-sqlite3')).default;
    const db = new Database(DB_PATH);
    db.prepare(`UPDATE topics SET status='in_progress', updated_at=datetime('now','-25 hours') WHERE slug='stale-topic'`).run();
    db.close();

    const { findStaleInProgress } = await import('../lib/db.js');
    const stale = findStaleInProgress(24);
    expect(stale?.slug).toBe('stale-topic');
  });

  it('skips topics already in DB', () => {
    insertTopic({
      slug: 'already-done', title: 'Done', primaryKeyword: 'done',
      cluster: 'agent-ia', searchIntent: 'informational',
      questionLongTail: 'done?', estimatedDifficulty: 1,
    });
    expect(findTopicBySlug('already-done')).toBeDefined();
  });
});
