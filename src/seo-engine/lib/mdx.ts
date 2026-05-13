import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { CONTENT_DIR, REPO_ROOT } from './paths.js';
import type { GeneratedArticle } from './types.js';

export function mdxPathFor(article: GeneratedArticle): string {
  return path.join(CONTENT_DIR, article.cluster, `${article.slug}.mdx`);
}

export function writeArticleMdx(article: GeneratedArticle): string {
  const filepath = mdxPathFor(article);
  fs.mkdirSync(path.dirname(filepath), { recursive: true });
  const serialized = matter.stringify(article.bodyMarkdown, article.frontmatter);
  fs.writeFileSync(filepath, serialized, 'utf8');
  return filepath;
}

export function relPathFromRepoRoot(absPath: string): string {
  return path.relative(REPO_ROOT, absPath);
}

export function repoRoot(): string {
  return REPO_ROOT;
}
