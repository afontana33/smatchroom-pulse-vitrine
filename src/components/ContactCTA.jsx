import { ArrowRight, Calendar } from 'lucide-react';

export default function ContactCTA() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden py-32 px-6"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.16),transparent_60%)]" />

      <div className="relative mx-auto max-w-4xl">
        <div className="rounded-3xl border border-[var(--border-strong)] bg-gradient-to-b from-[var(--surface-2)] to-[var(--surface)] p-10 text-center md:p-16">
          <p className="eyebrow">Lancement de pilote</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-5xl">
            <span className="gradient-text">Réserve ton créneau de cadrage.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-balance text-[var(--muted)] md:text-lg">
            30 min de visio. On qualifie le besoin, on identifie l'agent qui colle,
            on te dit honnêtement si c'est pour Pulse — ou pas.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4">
            <a
              href="https://calendly.com/a-fontana-smatchroom/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-8 py-4 text-base font-medium text-black transition-all hover:bg-[var(--primary-hover)] hover:shadow-[0_0_40px_-5px_var(--primary-glow)]"
            >
              <Calendar size={18} />
              Choisir un créneau sur Calendly
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
              30 min · Visio · Sans engagement
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
