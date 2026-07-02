'use client';

import dynamic from 'next/dynamic';
import { ArrowRight, Sparkles } from 'lucide-react';
import TerminalLive from './TerminalLive';

const Hero3D = dynamic(() => import('./Hero3D'), {
  ssr: false,
  loading: () => null,
});

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Hero3D />
      </div>

      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,rgba(255,90,31,0.18),transparent_55%)]" />

      <div className="relative z-20 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center gap-12 px-6 py-28 lg:flex-row lg:justify-between lg:text-left">
        <div className="max-w-2xl text-center lg:text-left">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--primary-soft)] px-4 py-1.5 font-mono text-xs uppercase tracking-[0.18em] text-[var(--primary-hover)] backdrop-blur">
            <Sparkles size={14} />
            <span>Agents IA · Bâtiment</span>
          </div>

          <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            <span className="gradient-text glow-text">Des agents IA qui bossent </span>
            <span className="text-white">pour le bâtiment.</span>
          </h1>

          <p className="mt-6 max-w-xl text-balance text-lg text-[var(--muted)] md:text-xl">
            Prospection, relance de devis, qualification de leads, prise de RDV.
            Vos agents tournent <span className="font-medium text-white">24/7</span> pendant
            que vous êtes sur le chantier. Conçus, codés et déployés en{' '}
            <span className="font-mono text-white">48h</span> sur votre infra (Node.js + Supabase).
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:items-start">
            <a
              href="https://calendly.com/a-fontana-smatchroom/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-2xl border border-[var(--primary)] bg-[var(--primary)] px-6 py-4 font-semibold text-black transition-all hover:bg-[var(--primary-hover)] hover:shadow-[0_0_40px_-5px_var(--primary-glow)]"
            >
              Réserver mon diagnostic (gratuit)
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#tarifs"
              className="inline-flex items-center gap-2 rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-2)]/60 px-6 py-4 font-medium text-white backdrop-blur transition-all hover:border-[var(--primary)] hover:bg-white/5"
            >
              Voir les agents
            </a>
          </div>
        </div>

        <div className="w-full max-w-lg lg:w-auto">
          <TerminalLive />
        </div>
      </div>
    </section>
  );
}
