import { ArrowRight, Sparkles, Building2, Briefcase, Zap } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden grain">
      {/* Mesh premium clair — deux registres (orange BTP / acier Corporate) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-mesh absolute -left-40 -top-40 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.22),transparent_60%)] blur-3xl" />
        <div className="animate-mesh absolute -right-32 top-10 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(196,181,253,0.24),transparent_60%)] blur-3xl [animation-delay:-6s]" />
        <div className="animate-mesh absolute bottom-0 left-1/2 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(41,75,115,0.16),transparent_60%)] blur-3xl [animation-delay:-11s]" />
      </div>

      <div className="mx-auto flex max-w-5xl flex-col items-center px-5 pb-20 pt-32 text-center sm:px-6 sm:pt-40 lg:pb-28">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-4 py-1.5 font-mono text-xs uppercase tracking-[0.16em] text-[var(--primary-ink)] shadow-sm">
          <Sparkles size={14} />
          <span>Collaborateurs Numériques Autonomes</span>
        </div>

        <h1 className="text-balance text-[2.5rem] font-semibold leading-[1.03] tracking-tight sm:text-6xl lg:text-[4.6rem]">
          <span className="text-[var(--foreground)]">L&apos;Intelligence Artificielle qui </span>
          <span className="gradient-text">prospecte et vend</span>
          <span className="text-[var(--foreground)]"> à votre place.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-balance text-base text-[var(--muted-strong)] sm:text-lg">
          SmatchRoom Pulse conçoit, entraîne et déploie des{' '}
          <span className="font-semibold text-[var(--foreground)]">collaborateurs numériques autonomes</span>.
          Ils travaillent <span className="font-mono text-[var(--primary-ink)]">24/7</span> sur votre infrastructure.
        </p>

        {/* Sélecteur de division */}
        <p className="mt-12 font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
          Sélectionnez votre division
        </p>

        <div className="mt-5 grid w-full gap-4 sm:grid-cols-2">
          {/* Division BTP — registre orange */}
          <a
            href="#btp"
            className="card card-hover group relative flex flex-col overflow-hidden p-7 text-left ring-1 ring-[var(--primary-line)] sm:p-8"
          >
            <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[radial-gradient(circle,var(--primary-soft),transparent_65%)]" />
            <div className="relative flex items-center gap-3">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary-soft)] text-[var(--primary-ink)] ring-1 ring-[var(--primary-line)]">
                <Building2 size={22} strokeWidth={1.8} />
              </span>
              <span className="text-2xl" aria-hidden>🏗️</span>
            </div>
            <h2 className="relative mt-5 text-2xl font-semibold tracking-tight text-[var(--foreground)]">
              Division BTP &amp; Artisanat
            </h2>
            <p className="relative mt-2 flex-1 text-sm text-[var(--muted-strong)]">
              Offres packagées, prêtes à déployer. Agents taillés pour les artisans, courtiers en
              travaux et petites entreprises du bâtiment. Mise en production en 48h.
            </p>
            <span className="relative mt-6 inline-flex items-center gap-2 font-semibold text-[var(--primary-ink)]">
              Voir les offres packagées
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </span>
          </a>

          {/* Division Corporate — registre acier / premium sombre */}
          <a
            href="/grands-comptes"
            className="showcase-dark grain card-hover group relative flex flex-col overflow-hidden rounded-2xl p-7 text-left sm:p-8"
          >
            <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(143,180,224,0.18),transparent_65%)]" />
            <div className="relative flex items-center gap-3">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-[#8fb4e0] ring-1 ring-white/15">
                <Briefcase size={22} strokeWidth={1.8} />
              </span>
              <span className="text-2xl" aria-hidden>👔</span>
            </div>
            <h2 className="relative mt-5 text-2xl font-semibold tracking-tight text-white">
              Division Corporate &amp; Sur-Mesure
            </h2>
            <p className="relative mt-2 flex-1 text-sm text-[var(--on-ink-muted)]">
              Ingénierie d&apos;acquisition B2B pour les autres secteurs et les marchés de niche.
              Infrastructure de prospection conçue sur-mesure. Audit &amp; devis.
            </p>
            <span className="relative mt-6 inline-flex items-center gap-2 font-semibold text-[#8fb4e0]">
              Demander un audit
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </span>
          </a>
        </div>

        {/* Preuves */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <div className="flex items-center gap-2">
            <span className="font-display text-2xl font-semibold text-[var(--foreground)]">+90</span>
            <span className="max-w-[9rem] text-left text-xs leading-tight text-[var(--muted)]">
              Entreprises accompagnées
            </span>
          </div>
          <div className="h-8 w-px bg-[var(--border-strong)]" />
          <div className="flex items-center gap-2">
            <span className="font-display text-2xl font-semibold text-[var(--foreground)]">48h</span>
            <span className="max-w-[9rem] text-left text-xs leading-tight text-[var(--muted)]">
              De l&apos;audit à la mise en production
            </span>
          </div>
          <div className="h-8 w-px bg-[var(--border-strong)]" />
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--primary-soft)] text-[var(--primary-ink)]">
              <Zap size={16} />
            </span>
            <span className="max-w-[9rem] text-left text-xs leading-tight text-[var(--muted)]">
              Sur votre infra, 24/7
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
