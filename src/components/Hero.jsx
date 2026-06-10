'use client';

import dynamic from 'next/dynamic';
import { ArrowRight, Sparkles } from 'lucide-react';

const Hero3D = dynamic(() => import('./Hero3D'), {
  ssr: false,
  loading: () => null,
});

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[720px] w-full overflow-hidden">
      {/* Fond 3D plein écran */}
      <div className="absolute inset-0 z-0">
        <Hero3D />
      </div>

      {/* Halo radial central */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.18),transparent_55%)]" />

      {/* Contenu */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--primary-soft)] px-4 py-1.5 font-mono text-xs uppercase tracking-[0.18em] text-[var(--primary-hover)] backdrop-blur">
          <Sparkles size={14} />
          <span>SmatchRoom · Pulse</span>
        </div>

        <h1 className="max-w-5xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
          <span className="gradient-text glow-text">
            L'infrastructure logicielle qui remplace les processus humains.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-balance text-lg text-[var(--muted)] md:text-xl">
          Nous ne sommes pas une agence. Nous n'alignons pas des heures de consultants.
          Pulse conçoit, entraîne et déploie des{' '}
          <span className="font-medium text-white">Agents IA Industriels Autonomes</span>{' '}
          sur votre infrastructure en{' '}
          <span className="font-mono text-white">48 heures chronos</span>.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <a
            href="https://calendly.com/a-fontana-smatchroom/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-7 py-3.5 font-medium text-black transition-all hover:bg-[var(--primary-hover)] hover:shadow-[0_0_40px_-5px_var(--primary-glow)]"
          >
            Évaluer mon éligibilité (30 min)
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Indicateurs en bas */}
        <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-wrap items-center justify-center gap-x-8 gap-y-2 px-4 font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--primary)]" />
            48h Time-to-Deploy
          </div>
          <div className="hidden h-3 w-px bg-[var(--border)] md:block" />
          <div>Architecture propriétaire</div>
          <div className="hidden h-3 w-px bg-[var(--border)] md:block" />
          <div>100% Clé en main</div>
        </div>
      </div>
    </section>
  );
}
