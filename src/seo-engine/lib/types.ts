export type Cluster = 'agent-ia' | 'blog';
export type ArticleStatus = 'pending' | 'in_progress' | 'published' | 'failed' | 'skipped';
export type SearchIntent = 'informational' | 'commercial' | 'transactional';

export interface TopicProposal {
  slug: string;
  title: string;
  primaryKeyword: string;
  searchIntent: SearchIntent;
  cluster: Cluster;
  questionLongTail: string;
  estimatedDifficulty: 1 | 2 | 3 | 4 | 5;
}

export interface ArticleFrontmatter {
  title: string;
  metaTitle: string;
  metaDescription: string;
  publishedAt: string;
  primaryKeyword: string;
  cluster: Cluster;
  readingMinutes: number;
  jsonLd: { article: Record<string, unknown>; faqPage: Record<string, unknown> };
}

export interface GeneratedArticle {
  slug: string;
  cluster: Cluster;
  frontmatter: ArticleFrontmatter;
  bodyMarkdown: string;
  cost: { inputTokens: number; outputTokens: number; cacheReadTokens: number; usd: number };
}

export interface LinkBankEntry {
  anchor: string;
  url: string;
  context: string;
  priority: number;
}

export interface SeedAngle {
  slug: string;
  title: string;
  primaryKeyword: string;
  cluster: Cluster;
  searchIntent: SearchIntent;
  questionLongTail: string;
}
