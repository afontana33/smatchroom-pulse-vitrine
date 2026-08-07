'use client';

/**
 * Section 8 — Appel à l'action final.
 *
 * Retour en encre pour fermer la boucle ouverte par le hero : le parcours part
 * du sombre et y revient. Le bloc se rapproche légèrement au scroll (scale) pour
 * donner la sensation d'arriver au bout du couloir.
 */

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CalendarClock } from 'lucide-react';
import { DepthLayer, SplitConverge, useLightMode } from './motion';

const CALENDLY = 'https://calendly.com/a-fontana-smatchroom/30min';

export default function FinalCTA() {
  const ref = useRef(null);
  const light = useLightMode();

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const glow = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

  return (
    <section
      ref={ref}
      id="contact"
      className="showcase-dark grain relative isolate scroll-mt-24 overflow-hidden px-5 py-32 sm:px-6 sm:py-40"
    >
      {/* depth 1 — le halo grossit à mesure qu'on arrive */}
      <DepthLayer depth={1} amplitude={150} className="pointer-events-none absolute inset-0">
        <motion.div
          style={{ opacity: light ? 1 : glow }}
          className="absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,90,31,0.34),transparent_66%)] mix-blend-screen"
        />
      </DepthLayer>

      {/* depth 2 — cercles concentriques */}
      <DepthLayer depth={2} amplitude={90} className="pointer-events-none absolute inset-0">
        {[28, 44, 60].map((r) => (
          <div
            key={r}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06]"
            style={{ width: `${r}rem`, height: `${r}rem` }}
          />
        ))}
      </DepthLayer>

      <motion.div
        style={{ scale: light ? 1 : scale }}
        className="relative z-[4] mx-auto max-w-3xl text-center"
      >
        <h2 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
          <SplitConverge
            parts={[
              { text: 'Prêt à remplir ', from: 'left' },
              /* Le « ? » reste collé au dernier mot : en fragment séparé il tombait
                 seul sur une ligne (chaque fragment est un inline-block). */
              { text: 'votre carnet de commandes ?', from: 'up', className: 'gradient-text-ink' },
            ]}
          />
        </h2>

        <p className="mx-auto mt-7 max-w-xl text-balance text-[var(--on-ink-muted)] sm:text-lg">
          Ne laissez plus vos concurrents prospecter vos futurs clients. Lancez votre agent IA dès
          aujourd&apos;hui.
        </p>

        <div className="mt-11 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary group inline-flex items-center justify-center gap-2.5 px-8 py-[1.15rem] text-base font-semibold"
          >
            <CalendarClock size={18} />
            Réserver mon audit de 30 minutes
            <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#piliers"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/18 bg-white/[0.05] px-7 py-4 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:border-white/35 hover:bg-white/[0.1]"
          >
            Revoir les trois briques
          </a>
        </div>

        <p className="mt-6 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-[var(--on-ink-muted)]">
          Gratuit · sans engagement · 30 minutes
        </p>
      </motion.div>
    </section>
  );
}
