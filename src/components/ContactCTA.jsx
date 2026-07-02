import { ArrowRight, Calendar } from 'lucide-react';

const CALENDLY = 'https://calendly.com/a-fontana-smatchroom/30min';

export default function ContactCTA() {
  return (
    <section id="contact" className="relative overflow-hidden py-32 px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,90,31,0.16),transparent_60%)]" />

      <div className="relative mx-auto max-w-3xl text-center">
        <p className="eyebrow">Passez à l'action</p>
        <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-5xl">
          <span className="gradient-text">On regarde ensemble ce qu'un agent peut faire pour vous.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-balance text-[var(--muted)]">
          30 min de visio. On comprend votre activité de bâtiment, on vous montre ce qu'on peut
          automatiser, et on vous dit honnêtement si c'est pertinent — ou pas.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4">
          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-8 py-4 text-lg font-semibold text-black transition-all hover:bg-[var(--primary-hover)] hover:shadow-[0_0_40px_-5px_var(--primary-glow)]"
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
    </section>
  );
}
