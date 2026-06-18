import { listAllPublished } from '@/lib/content';

const BASE = 'https://pulse.smatchroom.com';

export default function sitemap() {
  const articles = listAllPublished();

  const staticUrls = [
    { url: BASE, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/entrepreneurs`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
    { url: `${BASE}/entreprises`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE}/agent-ia`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
  ];

  const dynamicUrls = articles.map((a) => ({
    url: `${BASE}/${a.cluster}/${a.slug}`,
    lastModified: new Date(a.frontmatter.publishedAt),
    changeFrequency: 'monthly',
    priority: a.cluster === 'solutions' ? 0.9 : 0.7,
  }));

  return [...staticUrls, ...dynamicUrls];
}
