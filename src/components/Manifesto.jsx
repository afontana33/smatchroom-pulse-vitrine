import Reveal from './Reveal';

export default function Manifesto() {
  return (
    <section id="manifesto" className="relative px-5 py-24 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="mb-10 flex items-center gap-4">
            <span className="section-index">01 — Manifeste</span>
            <span className="h-px flex-1 bg-[var(--border-strong)]" />
          </div>
        </Reveal>

        <Reveal delay={80}>
          <figure className="card grain relative overflow-hidden p-7 sm:p-12">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[radial-gradient(circle,var(--primary-soft),transparent_65%)]"
            />
            <blockquote className="relative">
              <p className="text-balance text-xl font-medium leading-snug tracking-tight text-[var(--foreground)] sm:text-2xl lg:text-[2rem]">
                Les agences vous facturent du <span className="font-serif-it text-[var(--primary-ink)]">temps humain</span>.
                Les logiciels vous demandent de <span className="font-serif-it text-[var(--primary-ink)]">faire le travail vous-même</span>.
                Nous, on code des collaborateurs numériques qui <span className="accent-text">le font à votre place</span>.
              </p>
            </blockquote>

            <p className="relative mt-6 max-w-2xl text-base text-[var(--muted-strong)] sm:text-lg">
              SmatchRoom conçoit des agents IA autonomes pour le bâtiment. Ils prospectent,
              relancent vos devis, qualifient vos leads et posent vos RDV — connectés à vos outils
              (agenda, WhatsApp, site) et opérationnels 24h/24. Vous restez sur le chantier ;{' '}
              <span className="font-semibold text-[var(--foreground)]">la machine trouve vos prochains chantiers.</span>
            </p>

            <figcaption className="relative mt-8 flex items-center gap-3 border-t border-[var(--border)] pt-6">
              <div className="h-px w-10 bg-[var(--primary)]" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                SmatchRoom Pulse — Engineering Manifesto
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
