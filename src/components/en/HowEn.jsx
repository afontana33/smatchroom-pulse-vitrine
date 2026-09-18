'use client';

/**
 * Le déroulé des premières semaines.
 *
 * Section propre à la version anglaise : sur le site français, la même
 * information est répartie dans la FAQ et dans les blocs de prix. Un acheteur
 * B2B étranger ne connaît ni l'entreprise ni le marché français, et la
 * première question qu'il se pose n'est pas le prix mais « qui fait quoi, et
 * quand ». Les étapes décrivent le processus réellement suivi, y compris la
 * validation des messages avant le premier envoi, qui est une obligation
 * qu'on s'impose et non une option commerciale.
 */

import { motion, useReducedMotion } from 'framer-motion';

const STEPS = [
  {
    k: '01',
    when: 'Day 0',
    t: 'A 30-minute audit',
    d: 'Your market, the accounts worth opening, who decides, and what you say when you sell. We tell you plainly whether we think it will work. We turn down briefs we do not believe in.',
  },
  {
    k: '02',
    when: 'Week 1',
    t: 'We build the list and the wording',
    d: 'The database is assembled from public sources for your sector, then the messages are written. You read and approve every template before anything is sent in your name.',
  },
  {
    k: '03',
    when: 'Week 2',
    t: 'Slow start, on purpose',
    d: 'Volume ramps up gradually. Sending hard on day one burns the channel whatever the message quality, so we never do it. The pace is set with you.',
  },
  {
    k: '04',
    when: 'Ongoing',
    t: 'It runs, we watch it',
    d: 'Replies are answered in under a minute, seven days a week, and follow-ups stop the moment someone answers. Interested contacts land with your reps. If the wording is not landing, we rewrite it at no extra cost.',
  },
];

function Rise({ children, delay = 0 }) {
  const reduce = useReducedMotion();
  if (reduce) return <div>{children}</div>;
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function HowEn() {
  return (
    <section id="how" className="relative scroll-mt-24 px-5 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Rise>
          <div className="mb-12 flex items-center gap-4">
            <span className="section-index">How it goes</span>
            <span className="h-px flex-1 bg-[var(--border-strong)]" />
          </div>
        </Rise>

        <Rise delay={0.05}>
          <h2 className="mb-16 max-w-3xl text-balance text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-[3.1rem]">
            Four steps,{' '}
            <span className="font-serif-it font-normal text-[var(--primary-ink)]">
              and nothing leaves in your name unread.
            </span>
          </h2>
        </Rise>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[var(--border)] sm:grid-cols-2">
          {STEPS.map((s, i) => (
            <Rise key={s.k} delay={i * 0.06}>
              <div className="h-full bg-[var(--surface)] p-7">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-mono text-[0.7rem] tracking-[0.18em] text-[var(--primary-ink)]">
                    {s.k}
                  </span>
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[var(--muted)]">
                    {s.when}
                  </span>
                </div>
                <p className="mt-5 font-display text-lg font-semibold tracking-tight text-[var(--foreground)] sm:text-xl">
                  {s.t}
                </p>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-[var(--muted-strong)]">
                  {s.d}
                </p>
              </div>
            </Rise>
          ))}
        </div>
      </div>
    </section>
  );
}
