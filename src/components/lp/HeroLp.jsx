'use client';

/**
 * Hero éditorial.
 *
 * Structure reprise de « Editorial Hero » (hero-05, @felipemenezes098 sur
 * 21st.dev) : accroche courte calée à gauche en bas, titre et corps de texte
 * à droite, photo pleine largeur en dessous. Portée en JSX et rebranchée sur
 * les tokens Pulse (ivoire, orange, Bricolage + Instrument Serif) plutôt que
 * sur le thème shadcn d'origine.
 *
 * Le décalage gauche/droite est ce qui fait le registre « magazine » : ne pas
 * le recentrer, c'est lui qui casse le rendu bloc-titre-centré des landings
 * générées.
 */

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';

const CALENDLY = 'https://calendly.com/a-fontana-smatchroom/30min';

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

const media = {
  hidden: { opacity: 0, y: 26, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HeroLp() {
  const reduce = useReducedMotion();
  const animate = !reduce;

  return (
    <section className="relative isolate w-full overflow-hidden">
      <motion.div
        className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 pb-12 pt-32 sm:px-6 sm:pb-14 sm:pt-40 lg:grid-cols-12 lg:pt-44"
        variants={animate ? container : undefined}
        initial={animate ? 'hidden' : false}
        animate={animate ? 'visible' : undefined}
      >
        <motion.div
          variants={animate ? item : undefined}
          className="flex lg:col-span-4 lg:col-start-1 lg:items-end lg:self-stretch"
        >
          <div className="max-w-xs">
            <p className="eyebrow">Bordeaux · partout en France</p>
            <p className="mt-4 text-[0.95rem] leading-relaxed tracking-tight text-[var(--muted-strong)]">
              On digitalise et on automatise les entreprises, de l&apos;artisan seul à la
              grande entreprise.
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={animate ? item : undefined}
          className="flex flex-col items-start gap-6 sm:gap-8 lg:col-span-7 lg:col-start-6"
        >
          <h1 className="text-balance text-4xl font-semibold leading-[1.04] tracking-tight sm:text-5xl lg:text-[4.2rem]">
            Vos meilleurs clients ne vous cherchent pas.{' '}
            <span className="font-serif-it font-normal text-[var(--primary-ink)]">
              On va les chercher.
            </span>
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-[var(--muted-strong)] sm:text-lg">
            Pendant que vous êtes sur le terrain, nos agents prospectent, votre site travaille
            et vos publicités tournent. Vous ne récupérez que les rendez-vous.
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold"
            >
              Réserver un créneau de 30 min
              <ArrowRight size={16} />
            </a>
            <a
              href="#piliers"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--foreground)] underline-offset-4 hover:underline"
            >
              Voir les trois piliers
              <ArrowDown size={15} />
            </a>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        variants={animate ? media : undefined}
        initial={animate ? 'hidden' : false}
        animate={animate ? 'visible' : undefined}
        className="relative w-full"
      >
        <div className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent"
          />
          <img
            src="/photos/chantier.webp"
            alt="Chantier de gros oeuvre vu du dessus, plusieurs compagnons au travail"
            width={2000}
            height={1325}
            fetchPriority="high"
            decoding="async"
            className="aspect-[2/1] w-full object-cover object-center sm:aspect-[9/4]"
          />
        </div>
      </motion.div>
    </section>
  );
}
