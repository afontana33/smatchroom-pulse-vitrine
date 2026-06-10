import { ArrowRight, Calendar, Store, Building2 } from 'lucide-react';

export default function ContactCTA() {
  return (
    <section id="contact" className="relative overflow-hidden py-32 px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.16),transparent_60%)]" />

      <div className="relative mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <p className="eyebrow">Passez à l'action</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-5xl">
            <span className="gradient-text">Par où voulez-vous commencer ?</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Carte TPE */}
          <div className="flex flex-col rounded-3xl border border-[var(--border-strong)] bg-gradient-to-b from-[var(--surface-2)] to-[var(--surface)] p-8">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary-soft)] text-[var(--primary-hover)] ring-1 ring-[var(--border-strong)]">
                <Store size={18} strokeWidth={1.8} />
              </div>
              <div>
                <p className="font-semibold text-white">Je suis un commerce</p>
                <p className="text-xs text-[var(--muted)]">artisan · restaurateur · indépendant</p>
              </div>
            </div>
            <p className="mb-6 text-sm text-[var(--muted)]">
              30 min de visio. On comprend votre métier, on vous explique ce qu'on peut faire pour vous, et on vous dit honnêtement si c'est pertinent.
            </p>
            <div className="mt-auto flex flex-col items-center gap-3 text-center">
              <a
                href="https://calendly.com/a-fontana-smatchroom/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-7 py-4 font-medium text-black transition-all hover:bg-[var(--primary-hover)] hover:shadow-[0_0_40px_-5px_var(--primary-glow)]"
              >
                <Calendar size={18} />
                Réserver 30 min (gratuit)
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                Visio · Sans engagement
              </p>
            </div>
          </div>

          {/* Carte PME */}
          <div className="flex flex-col rounded-3xl border border-[var(--border-strong)] bg-gradient-to-b from-[var(--surface-2)] to-[var(--surface)] p-8">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary-soft)] text-[var(--primary-hover)] ring-1 ring-[var(--border-strong)]">
                <Building2 size={18} strokeWidth={1.8} />
              </div>
              <div>
                <p className="font-semibold text-white">Je suis une entreprise</p>
                <p className="text-xs text-[var(--muted)]">PME · structure · équipe</p>
              </div>
            </div>
            <p className="mb-6 text-sm text-[var(--muted)]">
              30 min de visio. On qualifie le besoin, on identifie l'agent qui colle, on vous dit honnêtement si c'est pour Pulse — ou pas.
            </p>
            <div className="mt-auto flex flex-col items-center gap-3 text-center">
              <a
                href="https://calendly.com/a-fontana-smatchroom/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-[var(--border-strong)] px-7 py-4 font-medium text-white transition-all hover:border-[var(--primary)] hover:bg-white/5"
              >
                <Calendar size={18} />
                Réserver mon diagnostic (30 min)
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                Visio · Sans engagement
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
