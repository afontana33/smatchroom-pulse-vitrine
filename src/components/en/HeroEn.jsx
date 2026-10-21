'use client';

/**
 * Hero anglais.
 *
 * Même structure éditoriale que le hero français (accroche courte à gauche en
 * bas, titre et corps à droite) pour que les deux versions se reconnaissent,
 * mais sans bande photo. Toutes les photos du site montrent des chantiers et
 * des artisans : juste sous une promesse adressée à une direction commerciale,
 * elles racontent autre chose que le texte. La preuve par la photo revient
 * plus bas, dans la section résultats, où les cas sont effectivement des
 * entreprises du bâtiment.
 */

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { CALENDLY } from '@/lib/contact';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 14, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HeroEn() {
  const reduce = useReducedMotion();
  const animate = !reduce;

  return (
    <section className="relative isolate w-full overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(1100px_circle_at_75%_-10%,rgba(91, 11, 252,0.10),transparent_65%)]"
      />

      <motion.div
        className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 pb-24 pt-28 sm:px-6 sm:pb-32 sm:pt-32 lg:grid-cols-12 lg:pt-40"
        variants={animate ? container : undefined}
        initial={animate ? 'hidden' : false}
        animate={animate ? 'visible' : undefined}
      >
        <motion.div
          variants={animate ? item : undefined}
          className="flex lg:col-span-4 lg:col-start-1 lg:items-end lg:self-stretch"
        >
          <div className="max-w-xs">
            <p className="eyebrow">Bordeaux, France · working across Europe</p>
            <p className="mt-4 text-[0.95rem] leading-relaxed tracking-tight text-[var(--muted-strong)]">
              We build the digital sales rep that works your market, and we run it for you.
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={animate ? item : undefined}
          className="flex flex-col items-start gap-6 sm:gap-8 lg:col-span-7 lg:col-start-6"
        >
          <h1 className="text-balance text-4xl font-semibold leading-[1.04] tracking-tight sm:text-5xl lg:text-[4.2rem]">
            Your best accounts are not looking for you.{' '}
            <span className="font-serif-it font-normal text-[var(--primary-ink)]">
              We go and find them.
            </span>
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-[var(--muted-strong)] sm:text-lg">
            No seat licence, no dashboard to learn. We build the database for your market, train
            the agent on your catalogue and your objections, and it hands your reps a
            conversation that is already qualified.
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold"
            >
              Book a 30-minute audit
              <ArrowRight size={16} />
            </a>
            <a
              href="#agent"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--foreground)] underline-offset-4 hover:underline"
            >
              See what we build
              <ArrowDown size={15} />
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
