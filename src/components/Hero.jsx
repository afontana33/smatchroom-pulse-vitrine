import { ArrowRight, Sparkles, CalendarCheck, TrendingUp } from 'lucide-react';
import TerminalLive from './TerminalLive';

const CALENDLY = 'https://calendly.com/a-fontana-smatchroom/30min';

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden grain">
      {/* Mesh premium clair */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-mesh absolute -left-40 -top-40 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(255,90,31,0.22),transparent_60%)] blur-3xl" />
        <div className="animate-mesh absolute -right-32 top-10 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(255,176,122,0.28),transparent_60%)] blur-3xl [animation-delay:-6s]" />
        <div className="animate-mesh absolute bottom-0 left-1/3 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(41,75,115,0.14),transparent_60%)] blur-3xl [animation-delay:-11s]" />
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center gap-14 px-5 pb-20 pt-32 sm:px-6 sm:pt-36 lg:flex-row lg:items-center lg:gap-12 lg:pb-28 lg:pt-40">
        {/* Colonne texte */}
        <div className="w-full max-w-2xl text-center lg:text-left">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-4 py-1.5 font-mono text-xs uppercase tracking-[0.16em] text-[var(--primary-ink)] shadow-sm">
            <Sparkles size={14} />
            <span>Agents IA · Artisans &amp; entreprises du bâtiment</span>
          </div>

          <h1 className="text-balance text-[2.5rem] font-semibold leading-[1.03] tracking-tight sm:text-6xl lg:text-[4.4rem]">
            <span className="text-[var(--foreground)]">L&apos;IA qui </span>
            <span className="gradient-text">trouve vos chantiers</span>
            <span className="text-[var(--foreground)]"> pendant que vous êtes sur le terrain.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-balance text-base text-[var(--muted-strong)] sm:text-lg lg:mx-0">
            SmatchRoom Pulse conçoit des <span className="font-semibold text-[var(--foreground)]">collaborateurs numériques autonomes</span> pour
            le bâtiment : prospection, relance de devis, qualification de leads, prise de RDV.
            Ils tournent <span className="font-semibold text-[var(--foreground)]">24/7</span>, déployés en{' '}
            <span className="font-mono text-[var(--primary-ink)]">48h</span> sur votre infra.
          </p>

          <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-4 text-base font-semibold"
            >
              Réserver mon diagnostic (gratuit)
              <ArrowRight size={17} />
            </a>
            <a
              href="#tarifs"
              className="btn-ghost inline-flex items-center justify-center gap-2 px-6 py-4 text-base font-medium"
            >
              Voir les agents &amp; tarifs
            </a>
          </div>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 lg:justify-start">
            <div className="flex items-center gap-2">
              <span className="font-display text-2xl font-semibold text-[var(--foreground)]">+90</span>
              <span className="max-w-[9rem] text-left text-xs leading-tight text-[var(--muted)]">
                Artisans &amp; entreprises accompagnés
              </span>
            </div>
            <div className="h-8 w-px bg-[var(--border-strong)]" />
            <div className="flex items-center gap-2">
              <span className="font-display text-2xl font-semibold text-[var(--foreground)]">48h</span>
              <span className="max-w-[9rem] text-left text-xs leading-tight text-[var(--muted)]">
                De l&apos;audit à la mise en production
              </span>
            </div>
          </div>
        </div>

        {/* Colonne showcase techno */}
        <div className="relative w-full max-w-lg lg:max-w-md lg:flex-1">
          <TerminalLive />

          {/* Cartes flottantes (masquées sur très petit écran) */}
          <div className="animate-floaty absolute -left-4 -top-5 hidden items-center gap-3 rounded-2xl bg-[var(--surface)] px-4 py-3 shadow-lg ring-1 ring-[var(--border)] sm:flex">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--primary-soft)] text-[var(--primary-ink)]">
              <TrendingUp size={17} />
            </span>
            <div className="text-left">
              <p className="font-display text-sm font-semibold text-[var(--foreground)]">Lead qualifié</p>
              <p className="text-[0.7rem] text-[var(--muted)]">à l&apos;instant · ITE 120m²</p>
            </div>
          </div>

          <div className="animate-floaty absolute -bottom-5 -right-3 hidden items-center gap-3 rounded-2xl bg-[var(--surface)] px-4 py-3 shadow-lg ring-1 ring-[var(--border)] sm:flex [animation-delay:-3.5s]">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--steel-soft)] text-[var(--steel)]">
              <CalendarCheck size={17} />
            </span>
            <div className="text-left">
              <p className="font-display text-sm font-semibold text-[var(--foreground)]">RDV posé</p>
              <p className="text-[0.7rem] text-[var(--muted)]">jeudi 14h · handoff</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
