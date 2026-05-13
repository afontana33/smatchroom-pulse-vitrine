import Link from 'next/link';

export default function ArticleCard({ article }) {
  const href = `/${article.cluster}/${article.slug}`;
  return (
    <Link href={href} className="block p-6 rounded-2xl border border-neutral-800 hover:border-neutral-600 transition">
      <h3 className="text-lg font-semibold mb-2">{article.frontmatter.title}</h3>
      <p className="text-sm text-neutral-400 mb-3">{article.frontmatter.metaDescription}</p>
      <p className="text-xs text-neutral-500">
        {new Date(article.frontmatter.publishedAt).toLocaleDateString('fr-FR')}
        {' · '}{article.readingMinutes} min
      </p>
    </Link>
  );
}
