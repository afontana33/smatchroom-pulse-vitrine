import { listAllPublished } from '@/lib/content';

const BASE = 'https://pulse.smatchroom.com';

export default function sitemap() {
  const articles = listAllPublished();

  const staticUrls = [
    { url: BASE, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/grands-comptes`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
    { url: `${BASE}/entrepreneurs`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
    { url: `${BASE}/sites`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
    { url: `${BASE}/pulse-terrain`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
    { url: `${BASE}/entreprises`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE}/agent-ia`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    // Pages légales : indexables, et attendues par les moteurs comme signal de sérieux.
    { url: `${BASE}/mentions-legales`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
    { url: `${BASE}/confidentialite`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/politique-cookies`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
    { url: `${BASE}/transparence-ia`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/cgv`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
    { url: `${BASE}/cgv-services`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
    { url: `${BASE}/cgv-produits`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
  ];

  const dynamicUrls = articles.map((a) => ({
    url: `${BASE}/${a.cluster}/${a.slug}`,
    lastModified: new Date(a.frontmatter.publishedAt),
    changeFrequency: 'monthly',
    priority: a.cluster === 'solutions' ? 0.9 : 0.7,
  }));

  return [...staticUrls, ...dynamicUrls];
}
