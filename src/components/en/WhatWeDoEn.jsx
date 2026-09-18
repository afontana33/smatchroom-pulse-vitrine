'use client';

/**
 * Qui nous sommes, en anglais.
 *
 * Reprend les trois points du Thesis français en les recalant sur la cible
 * B2B : « un interlocuteur plutôt qu'un logiciel » et « en place en 48 heures »
 * restent vrais et parlent autant à une direction commerciale, « de l'artisan
 * seul au grand compte » devient l'échelle, qui est l'argument utile ici.
 */

import { motion, useReducedMotion } from 'framer-motion';

const POINTS = [
  {
    k: '01',
    t: 'A team, not a subscription',
    d: 'You do not get credentials and a tutorial. We build it, we tune it, we watch it run. When something is off, you call us.',
  },
  {
    k: '02',
    t: 'Live in days, not quarters',
    d: 'The time it takes to understand your market and get your messages approved. No integration project, no IT ticket.',
  },
  {
    k: '03',
    t: 'Built per market, not per template',
    d: 'The database, the wording and the qualification questions are written for your sector. Two clients never get the same agent.',
  },
];

function Rise({ children, delay = 0, className }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12%' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function WhatWeDoEn() {
  return (
    <section id="what-we-do" className="relative scroll-mt-24 px-5 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Rise>
          <div className="mb-14 flex items-center gap-4">
            <span className="section-index">Who we are</span>
            <span className="h-px flex-1 bg-[var(--border-strong)]" />
          </div>
        </Rise>

        <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <div>
            <Rise>
              <h2 className="text-balance text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-[3.1rem]">
                We automate the part of selling{' '}
                <span className="font-serif-it font-normal text-[var(--primary-ink)]">
                  that nobody has time for.
                </span>
              </h2>
            </Rise>

            <Rise delay={0.1}>
              <div className="mt-7 space-y-5 text-base leading-relaxed text-[var(--muted-strong)] sm:text-lg">
                <p>
                  SmatchRoom Pulse is a French company, based in Bordeaux. We are not an ad
                  agency and we do not resell software: we build the thing that goes out and
                  finds revenue, then we operate it on your behalf.
                </p>
                <p className="text-[var(--foreground)]">
                  The rule is the same for every client: repetitive work goes to the machine,
                  the human conversation comes back to you.
                </p>
              </div>
            </Rise>
          </div>

          <div className="divide-y divide-[var(--border)] border-y border-[var(--border)] lg:mt-2">
            {POINTS.map((p, i) => (
              <Rise key={p.k} delay={0.14 + i * 0.06}>
                <div className="flex gap-5 py-5">
                  <span className="mt-0.5 font-mono text-[0.7rem] tracking-[0.18em] text-[var(--primary-ink)]">
                    {p.k}
                  </span>
                  <div>
                    <p className="font-display text-lg font-semibold text-[var(--foreground)]">
                      {p.t}
                    </p>
                    <p className="mt-1 text-[0.95rem] leading-relaxed text-[var(--muted-strong)]">
                      {p.d}
                    </p>
                  </div>
                </div>
              </Rise>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
