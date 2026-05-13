import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import fs from 'node:fs';
import { initSchema, insertTopic, findTopicBySlug, updateTopicStatus, insertArticle, markArticlePublished, monthlyCostUsd, closeDb, startRun, finishRun } from '../lib/db.js';
import { DB_PATH } from '../lib/paths.js';

beforeEach(() => {
  closeDb();
  if (fs.existsSync(DB_PATH)) fs.unlinkSync(DB_PATH);
  initSchema();
});

afterAll(() => closeDb());

describe('db', () => {
  it('inserts and finds a topic by slug', () => {
    const id = insertTopic({
      slug: 'agent-ia-vs-chatbot', title: 'Agent IA vs Chatbot',
      primaryKeyword: 'agent ia vs chatbot', cluster: 'agent-ia',
      searchIntent: 'informational', questionLongTail: 'Quelle différence ?',
      estimatedDifficulty: 3,
    });
    expect(id).toBeGreaterThan(0);
    const found = findTopicBySlug('agent-ia-vs-chatbot');
    expect(found?.status).toBe('pending');
  });

  it('updates topic status', () => {
    insertTopic({
      slug: 'cost-agent-ia', title: 'Coût agent IA',
      primaryKeyword: 'coût agent ia', cluster: 'agent-ia',
      searchIntent: 'commercial', questionLongTail: 'Combien ?',
      estimatedDifficulty: 2,
    });
    updateTopicStatus('cost-agent-ia', 'published');
    expect(findTopicBySlug('cost-agent-ia')?.status).toBe('published');
  });

  it('computes monthly cost', () => {
    const topicId = insertTopic({
      slug: 'x', title: 'X', primaryKeyword: 'x', cluster: 'blog',
      searchIntent: 'informational', questionLongTail: 'X?', estimatedDifficulty: 1,
    });
    insertArticle({ topicId, slug: 'x', cluster: 'blog', mdxPath: '/tmp/x.mdx',
      costUsd: 0.25, inputTokens: 100, outputTokens: 200, cacheReadTokens: 50 });
    markArticlePublished('x');
    expect(monthlyCostUsd()).toBeCloseTo(0.25);
  });

  it('tracks runs', () => {
    const runId = startRun();
    finishRun(runId, { status: 'success', costUsd: 0.3 });
    expect(runId).toBeGreaterThan(0);
  });
});
