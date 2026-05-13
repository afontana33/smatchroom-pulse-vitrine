import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const CONTENT_ROOT = path.join(process.cwd(), 'src', 'content');

export function listArticles(cluster) {
  const dir = path.join(CONTENT_ROOT, cluster);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => readArticle(cluster, f.replace(/\.mdx$/, '')))
    .filter(Boolean)
    .sort((a, b) => (a.frontmatter.publishedAt < b.frontmatter.publishedAt ? 1 : -1));
}

export function readArticle(cluster, slug) {
  const file = path.join(CONTENT_ROOT, cluster, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, 'utf8');
  const { data, content } = matter(raw);
  return {
    slug,
    cluster,
    frontmatter: data,
    bodyMarkdown: content,
    readingMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
  };
}

export function listAllPublished() {
  return ['agent-ia', 'blog', 'solutions'].flatMap(listArticles);
}
