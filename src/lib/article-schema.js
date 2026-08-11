/**
 * Graphe schema.org d'un article, partagé par les trois clusters éditoriaux
 * (/blog, /agent-ia, /solutions), dont les pages sont par ailleurs identiques.
 *
 * Le fil d'Ariane est déclaré ici et non dans un composant visible : la page
 * d'article n'affiche pas de fil d'Ariane, et schema.org ne l'exige pas pour
 * `BreadcrumbList`. C'est le seul cas du site où une donnée structurée n'a pas
 * de contrepartie visible, parce que c'est la hiérarchie d'URL qu'elle décrit,
 * pas un contenu.
 */

import { SITE_URL } from '@/lib/contact';
import { articleSchema, breadcrumbSchema, graph, webPageSchema } from '@/lib/schema';

const HUBS = {
  blog: { label: 'Blog', path: '/blog' },
  'agent-ia': { label: 'Ressources agent IA', path: '/agent-ia' },
  /* /solutions n'a pas de page hub : le fil remonte donc directement à
     l'accueil, sans inventer un niveau intermédiaire qui renverrait un 404. */
  solutions: null,
};

export function articleGraph(article) {
  const { cluster, slug, frontmatter } = article;
  const url = `${SITE_URL}/${cluster}/${slug}`;
  const title = frontmatter.metaTitle || frontmatter.title;
  const description = frontmatter.metaDescription;
  const hub = HUBS[cluster];

  const breadcrumb = breadcrumbSchema([
    { name: 'Accueil', url: `${SITE_URL}/` },
    ...(hub ? [{ name: hub.label, url: `${SITE_URL}${hub.path}` }] : []),
    { name: frontmatter.title, url },
  ]);

  /* Une partie des articles porte déjà son propre nœud Article dans le
     frontmatter (`jsonLd.article`), écrit par le moteur SEO et rendu par
     Article.jsx. Dans ce cas on ne le redéclare pas : deux Article concurrents
     sur la même URL, c'est le moyen le plus sûr de n'en voir aucun retenu. On
     n'ajoute alors que ce qui manque, WebPage et le fil d'Ariane. */
  const hasOwnArticle = Boolean(frontmatter.jsonLd?.article);

  return graph([
    webPageSchema({ url, name: title, description, breadcrumb: { '@id': `${url}#breadcrumb` } }),
    { ...breadcrumb, '@id': `${url}#breadcrumb` },
    hasOwnArticle
      ? null
      : articleSchema({
          url,
          title: frontmatter.title,
          description,
          publishedAt: frontmatter.publishedAt,
          updatedAt: frontmatter.updatedAt,
          section: hub ? hub.label : 'Solutions',
        }),
  ]);
}
