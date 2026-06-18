'use client';

import dynamic from 'next/dynamic';
import { ArrowRight, Sparkles, Store, Building2 } from 'lucide-react';

const Hero3D = dynamic(() => import('./Hero3D'), {
  ssr: false,
  loading: () => null,
});

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[720px] w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Hero3D />
      </div>

      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.18),transparent_55%)]" />

      <div className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--primary-soft)] px-4 py-1.5 font-mono text-xs uppercase tracking-[0.18em] text-[var(--primary-hover)] backdrop-blur">
          <Sparkles size={14} />
          <span>SmatchRoom · Pulse</span>
        </div>

        <h1 className="max-w-5xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
          <span className="gradient-text glow-text">
            L'écosystème d'agents IA industriels,{' '}
          </span>
          <span className="text-white">déployés sur votre infrastructure.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-balance text-lg text-[var(--muted)] md:text-xl">
          SmatchRoom conçoit, code et stabilise vos pipelines d'automatisation et de scoring en{' '}
          <span className="font-medium text-white">Node.js & Supabase</span>
          {', zéro dépendance aux SaaS génériques. '}
          <span className="font-mono text-white">Déployé en 48h.</span>
        </p>

        <div className="mt-10 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
          <a
            href="/entreprises"
            className="group flex items-center gap-3 rounded-2xl border border-[var(--primary)] bg-[var(--primary)] px-6 py-4 text-left font-medium text-black transition-all hover:bg-[var(--primary-hover)] hover:shadow-[0_0_40px_-5px_var(--primary-glow)]"
          >
            <Building2 size={20} className="flex-shrink-0" />
            <div>
              <div className="text-sm font-semibold leading-tight">Espace Entreprises & Agences</div>
              <div className="text-xs font-normal opacity-70">Sur-mesure · Infrastructure dédiée</div>
            </div>
            <ArrowRight size={16} className="ml-auto transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="/entrepreneurs"
            className="group flex items-center gap-3 rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-2)]/60 px-6 py-4 text-left font-medium text-white backdrop-blur transition-all hover:border-[var(--primary)] hover:bg-white/5"
          >
            <Store size={20} className="flex-shrink-0 text-[var(--primary-hover)]" />
            <div>
              <div className="text-sm font-semibold leading-tight">Espace Artisans & Commerçants</div>
              <div className="text-xs font-normal text-[var(--muted)]">Packagé · Clé en main · 48h</div>
            </div>
            <ArrowRight size={16} className="ml-auto opacity-50 transition-transform group-hover:translate-x-1 group-hover:opacity-100" />
          </a>
        </div>

      </div>
    </section>
  );
}
