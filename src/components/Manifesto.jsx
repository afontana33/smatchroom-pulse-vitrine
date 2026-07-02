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
            <span className="gradient-text">Pourquoi SmatchRoom</span> n'est pas une agence comme les autres ?
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
              La plupart des agences vous facturent du{' '}
              <span className="text-[var(--primary-hover)]">temps humain</span> et des rapports.
              Les logiciels, eux, vous demandent d'apprendre à vous en servir et de{' '}
              <span className="text-[var(--primary-hover)]">faire le travail vous-même</span>.
              <br className="hidden md:inline" />
              <br className="hidden md:inline" />
              SmatchRoom code des{' '}
              <span className="font-semibold text-white">collaborateurs numériques autonomes</span> pour
              le bâtiment. Ils prospectent, relancent vos devis, qualifient vos leads et prennent vos RDV,
              connectés à vos outils (agenda, WhatsApp, site), et travaillent{' '}
              <span className="font-mono text-white">24h/24, 7j/7</span>.
            </p>
          </blockquote>

          <p className="mt-4 text-balance text-base text-[var(--muted)] md:text-lg">
            Vous restez sur le chantier ;{' '}
            <span className="font-medium text-white">la machine s'occupe de l'administratif et de trouver vos prochains chantiers.</span>
          </p>

          <figcaption className="mt-8 flex items-center gap-3 border-t border-[var(--border)] pt-6">
            <div className="h-px w-10 bg-[var(--primary)]" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
              SmatchRoom — Engineering Manifesto
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
