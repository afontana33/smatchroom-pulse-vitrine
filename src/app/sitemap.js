import { listAllPublished } from '@/lib/content';
import { METIERS, VILLES } from '@/lib/seo-local';

const BASE = 'https://pulse.smatchroom.com';

export default function sitemap() {
  const articles = listAllPublished();

  /* Pages métier et ville : priorité 0.8, au même niveau que le blog et
     au-dessus des articles. Ce sont des pages de conversion, pas du contenu
     d'appoint. Elles se déduisent de lib/seo-local.js, donc ajouter une entrée
     là-bas suffit à la déclarer ici. */
  const localUrls = [
    /* Les deux pages de service passent en 0.9 : ce sont elles qui portent les
       requêtes commerciales (« agence de prospection B2B », « site internet
       artisan »), que la landing ne pouvait pas cibler sans se contredire. */
    { url: `${BASE}/prospection-b2b`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/site-web-artisan`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/apporteur-affaires`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/pack-lancement`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/simulateur`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/publicite-facebook-instagram`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/metiers`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/agence-ia`, changeFrequency: 'monthly', priority: 0.8 },
    ...METIERS.map((m) => ({
      url: `${BASE}/metiers/${m.slug}`,
      changeFrequency: 'monthly',
      priority: 0.8,
    })),
    ...VILLES.map((v) => ({
      url: `${BASE}/agence-ia/${v.slug}`,
      changeFrequency: 'monthly',
      priority: 0.8,
    })),
  ].map((u) => ({ ...u, lastModified: new Date() }));

  const staticUrls = [
    /* Site en page unique : les anciennes pages produit sont supprimées et
       redirigées (next.config.mjs). Ne pas les remettre ici, un sitemap qui
       déclare des URL en 301 fait perdre du budget de crawl. */
    { url: BASE, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    /* Landing anglaise. Priorité sous celle de l'accueil français : c'est une
       page unique adressée à une audience secondaire, pas une seconde racine
       du site. L'appariement hreflang est déclaré dans les métadonnées des
       deux pages (lib/i18n.js), pas ici. */
    { url: `${BASE}/en`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
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

  return [...staticUrls, ...localUrls, ...dynamicUrls];
}
