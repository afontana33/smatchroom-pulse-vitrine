import { describe, it, expect, afterEach } from 'vitest';
import fs from 'node:fs';
import matter from 'gray-matter';
import { mdxPathFor, writeArticleMdx } from '../lib/mdx.js';
import type { GeneratedArticle } from '../lib/types.js';

const FIXTURE: GeneratedArticle = {
  slug: 'test-article-temp',
  cluster: 'blog',
  frontmatter: {
    title: 'Test article',
    metaTitle: 'Test article — meta',
    metaDescription: 'Description suffisamment longue pour passer la validation Zod du schéma.',
    publishedAt: '2026-05-13T03:00:00.000Z',
    primaryKeyword: 'test article',
    cluster: 'blog',
    readingMinutes: 5,
    jsonLd: { article: { foo: 'bar' }, faqPage: { mainEntity: [] } },
  },
  bodyMarkdown: '## Section\n\nBody content.',
  cost: { inputTokens: 0, outputTokens: 0, cacheReadTokens: 0, usd: 0 },
};

afterEach(() => {
  const f = mdxPathFor(FIXTURE);
  if (fs.existsSync(f)) fs.unlinkSync(f);
});

describe('writeArticleMdx', () => {
  it('writes a parseable MDX file with frontmatter', () => {
    const filepath = writeArticleMdx(FIXTURE);
    expect(fs.existsSync(filepath)).toBe(true);
    const parsed = matter(fs.readFileSync(filepath, 'utf8'));
    expect(parsed.data.title).toBe('Test article');
    expect(parsed.content.trim()).toContain('Body content.');
  });
});
