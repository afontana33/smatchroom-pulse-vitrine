import Link from 'next/link';
import { CALENDLY } from '@/lib/contact';

export default function Article({ article, mdxContent, related = [] }) {
  const { frontmatter, cluster, slug, readingMinutes } = article;
  const breadcrumbLabel = cluster === 'agent-ia' ? 'Agent IA' : cluster === 'blog' ? 'Blog' : 'Solutions';
  const breadcrumbHref = `/${cluster}`;

  return (
    <article className="mx-auto max-w-3xl px-5 py-16 sm:px-6">
      <nav className="mb-6 text-sm text-[var(--muted)]">
        <Link href="/">Accueil</Link> <span className="mx-2">›</span>
        <Link href={breadcrumbHref}>{breadcrumbLabel}</Link> <span className="mx-2">›</span>
        <span>{frontmatter.title}</span>
      </nav>

      <h1 className="mb-4 text-balance text-3xl font-semibold leading-tight sm:text-4xl">{frontmatter.title}</h1>

      <p className="mb-12 text-sm text-[var(--muted)]">
        Publié le {new Date(frontmatter.publishedAt).toLocaleDateString('fr-FR')}
        {' · '}{readingMinutes} min de lecture
        {' · '}<span className="font-mono">{frontmatter.primaryKeyword}</span>
      </p>

      <div className="article-body">{mdxContent}</div>

      <section className="mt-16 rounded-2xl bg-[var(--ink)] p-6 text-[var(--on-ink)] sm:p-8">
        <h2 className="mb-3 text-2xl font-semibold text-white">Discutons de votre projet</h2>
        <p className="mb-6 text-[var(--on-ink-muted)]">
          Vous voulez déployer un agent IA sur votre périmètre ? Réservez 30 minutes
          avec notre équipe pour cadrer l'angle d'attaque.
        </p>
        <a
          href={CALENDLY}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-flex px-6 py-3 text-sm font-semibold"
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
