import { ArrowRight, Calendar } from 'lucide-react';
import Reveal from './Reveal';

const CALENDLY = 'https://calendly.com/a-fontana-smatchroom/30min';

export default function ContactCTA() {
  return (
    <section id="contact" className="relative px-5 py-16 sm:px-6 sm:py-24">
      <Reveal>
        <div className="showcase-dark grain relative mx-auto max-w-5xl overflow-hidden rounded-3xl px-6 py-16 text-center sm:px-10 sm:py-20">
          <p className="eyebrow text-[var(--primary)]">Passez à l&apos;action</p>
          <h2 className="mx-auto mt-4 max-w-2xl text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            On regarde ensemble ce qu&apos;un agent peut faire{' '}
            <span className="font-serif-it text-[var(--primary)]">pour vous.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-balance text-[var(--on-ink-muted)] sm:text-lg">
            30 min de visio. On comprend votre activité, on vous montre ce qu&apos;on peut
            automatiser, et on vous dit honnêtement si c&apos;est pertinent — ou pas.
          </p>

          <div className="mt-9 flex flex-col items-center gap-4">
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold sm:text-lg"
            >
              <Calendar size={18} />
              Réserver 30 min (gratuit)
              <ArrowRight size={16} />
            </a>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--on-ink-muted)]">
              Visio · Sans engagement
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
