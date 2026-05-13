import Link from 'next/link';

export default function Article({ article, mdxContent, related = [] }) {
  const { frontmatter, cluster, slug, readingMinutes } = article;
  const breadcrumbLabel = cluster === 'agent-ia' ? 'Agent IA' : cluster === 'blog' ? 'Blog' : 'Solutions';
  const breadcrumbHref = `/${cluster}`;

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 prose prose-invert">
      <nav className="text-sm text-neutral-400 mb-6">
        <Link href="/">Accueil</Link> <span className="mx-2">›</span>
        <Link href={breadcrumbHref}>{breadcrumbLabel}</Link> <span className="mx-2">›</span>
        <span>{frontmatter.title}</span>
      </nav>

      <h1 className="text-4xl font-semibold leading-tight mb-4">{frontmatter.title}</h1>

      <p className="text-sm text-neutral-400 mb-12">
        Publié le {new Date(frontmatter.publishedAt).toLocaleDateString('fr-FR')}
        {' · '}{readingMinutes} min de lecture
        {' · '}<span className="font-mono">{frontmatter.primaryKeyword}</span>
      </p>

      <div className="article-body">{mdxContent}</div>

      <section className="mt-16 p-8 rounded-2xl border border-neutral-800 bg-neutral-950/60">
        <h2 className="text-2xl font-semibold mb-3">Discutons de votre projet</h2>
        <p className="text-neutral-300 mb-6">
          Vous voulez déployer un agent IA sur votre périmètre ? Réservez 30 minutes
          avec notre équipe pour cadrer l'angle d'attaque.
        </p>
        <a
          href="https://calendly.com/a-fontana-smatchroom/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-neutral-200"
        >
          Réserver un créneau
        </a>
      </section>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-semibold mb-6">À lire aussi</h2>
          <ul className="space-y-3">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/${r.cluster}/${r.slug}`} className="hover:underline">
                  {r.frontmatter.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {frontmatter.jsonLd?.article && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(frontmatter.jsonLd.article) }}
        />
      )}
      {frontmatter.jsonLd?.faqPage && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(frontmatter.jsonLd.faqPage) }}
        />
      )}
    </article>
  );
}
