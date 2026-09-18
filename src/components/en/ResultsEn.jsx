'use client';

/**
 * Résultats, en anglais.
 *
 * Les chiffres et les noms sont exactement ceux de la section française
 * (lp/Preuves.jsx) : ce sont des résultats clients réels, on ne les arrondit
 * pas à la hausse, on n'en invente pas pour étoffer la page anglaise et on ne
 * fabrique aucune citation. Les mêmes trois cas, les mêmes huit noms, le même
 * « +90 ».
 *
 * La photo de chantier est assumée ici, à l'inverse du hero : ces trois cas
 * sont bien des entreprises du bâtiment et des services, la photo dit donc la
 * vérité du portefeuille plutôt que de décorer une promesse.
 */

import { motion, useReducedMotion } from 'framer-motion';

const CASES = [
  {
    metric: '12',
    unit: 'partners',
    sector: 'Construction trades',
    client: 'Mathieu · Isolation by Tryba',
    text: 'Twelve referral partners locked in on his territory, and five quote requests already generated without him picking up the phone.',
  },
  {
    metric: '3',
    unit: 'contracts',
    sector: 'B2B services',
    client: 'Antoine D. · B2B cleaning',
    text: 'Three recurring maintenance contracts signed with medical practices, in under 45 days.',
  },
  {
    metric: '13',
    unit: 'partnerships',
    sector: 'Roofing · Lille',
    client: 'David · roofer in Lille',
    text: 'Thirteen referral partnerships established and two quote requests, in one month.',
  },
];

const CLIENTS = [
  'Tryba',
  'BatInnov',
  'JB Pilotage & Stratégie',
  'NextMove',
  'HDS Solutions',
  'Ets Duvernell',
  'DTR Service',
  'Habitat Multi Services',
];

function Rise({ children, delay = 0 }) {
  const reduce = useReducedMotion();
  if (reduce) return <div>{children}</div>;
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function ResultsEn() {
  const loop = [...CLIENTS, ...CLIENTS];

  return (
    <section id="results" className="relative scroll-mt-24 pb-0 pt-24 sm:pt-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <Rise>
          <div className="mb-12 flex items-center gap-4">
            <span className="section-index">Results</span>
            <span className="h-px flex-1 bg-[var(--border-strong)]" />
          </div>
        </Rise>

        <Rise delay={0.05}>
          <h2 className="mb-6 max-w-3xl text-balance text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-[3.1rem]">
            What it did{' '}
            <span className="font-serif-it font-normal text-[var(--primary-ink)]">
              for the companies that installed it.
            </span>
          </h2>
        </Rise>

        <Rise delay={0.08}>
          <p className="mb-16 max-w-2xl text-[var(--muted-strong)]">
            These are client figures, reported as they were measured. Most of our portfolio is
            French, in construction and business services, which is where the method was proven
            first.
          </p>
        </Rise>

        <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
          {CASES.map((c, i) => (
            <Rise key={c.client} delay={i * 0.07}>
              <div className="grid gap-4 py-9 sm:grid-cols-[minmax(0,10rem)_1fr] sm:gap-10 lg:grid-cols-[minmax(0,14rem)_minmax(0,16rem)_1fr]">
                <div>
                  <p className="font-display text-4xl font-semibold tracking-tight text-[var(--primary-ink)] sm:text-5xl">
                    {c.metric}
                  </p>
                  <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[var(--muted)]">
                    {c.unit}
                  </p>
                </div>
                <div>
                  <p className="font-display text-base font-semibold text-[var(--foreground)]">
                    {c.client}
                  </p>
                  <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[var(--muted)]">
                    {c.sector}
                  </p>
                </div>
                <div>
                  <p className="text-[0.98rem] leading-relaxed text-[var(--muted-strong)]">
                    {c.text}
                  </p>
                </div>
              </div>
            </Rise>
          ))}
        </div>
      </div>

      <Rise delay={0.05}>
        <div className="relative mt-20 overflow-hidden sm:mt-28">
          <img
            src="/photos/chantier-large.webp"
            alt="Wide view of a construction site with several teams at work"
            width={1800}
            height={1352}
            loading="lazy"
            decoding="async"
            className="h-[22rem] w-full object-cover object-center sm:h-[26rem]"
          />
          <div aria-hidden className="absolute inset-0 bg-[var(--ink)]/72" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-5">
            <div className="text-center">
              <p className="font-display text-4xl font-semibold tracking-tight text-white sm:text-6xl">
                +90
              </p>
              <p className="mt-2 text-sm text-white/75 sm:text-base">
                companies and independent trades supported
              </p>
            </div>

            <div className="marquee-group marquee-mask relative w-full max-w-5xl overflow-hidden">
              <ul className="animate-marquee flex items-center gap-x-10 pr-10 sm:gap-x-14 sm:pr-14">
                {loop.map((c, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-x-10 sm:gap-x-14"
                    aria-hidden={i >= CLIENTS.length}
                  >
                    <span className="whitespace-nowrap font-display text-lg font-semibold tracking-tight text-white/80 sm:text-2xl">
                      {c}
                    </span>
                    <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--primary)]" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Rise>
    </section>
  );
}
