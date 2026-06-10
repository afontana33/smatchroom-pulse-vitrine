import { Quote } from 'lucide-react';

export default function Manifesto() {
  return (
    <section id="manifesto" className="relative py-28 px-6">
      {/* Halo discret */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--primary-soft),transparent_60%)]"
      />

      <div className="relative mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <p className="eyebrow">Notre manifesto</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
            <span className="gradient-text">Pourquoi Pulse</span> n'est pas une agence ordinaire ?
          </h2>
        </div>

        <figure className="glass relative overflow-hidden rounded-2xl p-8 md:p-12">
          <Quote
            size={56}
            strokeWidth={1.2}
            className="absolute -top-2 -left-2 text-[var(--primary)]/15"
            aria-hidden
          />

          <blockquote className="relative">
            <p className="text-balance text-lg leading-relaxed text-white md:text-xl lg:text-2xl">
              Une agence classique vous loue du{' '}
              <span className="text-[var(--primary-hover)]">temps humain</span> et des rapports PDF.
              Les outils SaaS classiques vous forcent à{' '}
              <span className="text-[var(--primary-hover)]">rédiger vos propres prompts</span>.
              <br className="hidden md:inline" />
              <br className="hidden md:inline" />
              Pulse construit des{' '}
              <span className="font-semibold text-white">travailleurs logiciels</span>. Nos agents
              ont leur propre base de données, utilisent des outils (APIs, CRM, Scrapers) et
              prennent des décisions opérationnelles en autonomie{' '}
              <span className="font-mono text-white">24h/7</span>, sans intervention de votre part.
            </p>
          </blockquote>

          <figcaption className="mt-8 flex items-center gap-3 border-t border-[var(--border)] pt-6">
            <div className="h-px w-10 bg-[var(--primary)]" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
              SmatchRoom Pulse — Engineering Manifesto
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
