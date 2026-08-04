'use client';

/**
 * Section 5 — La promesse des 48 heures.
 *
 * Timeline scrubbée : la ligne verticale se remplit exactement au rythme du
 * scroll, et chaque jalon s'allume quand la ligne l'atteint. Le scroll devient
 * littéralement le temps qui passe, ce qui rend la promesse « 48h » tangible.
 */

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Search, Cpu, GraduationCap, Rocket } from 'lucide-react';
import { DepthLayer, Rise, useLightMode } from './motion';

const STEPS = [
  {
    hour: 'H+0',
    icon: Search,
    title: 'Audit & cadrage',
    text: '30 min de visio. On comprend votre activité, vos cibles, et on valide la faisabilité.',
  },
  {
    hour: 'H+12',
    icon: Cpu,
    title: 'Conception technique',
    text: 'Nous construisons la base de données spécifique à votre secteur et paramétrons l’infrastructure.',
  },
  {
    hour: 'H+30',
    icon: GraduationCap,
    title: 'Apprentissage de l’IA',
    text: 'L’agent adopte votre ton, votre vocabulaire métier et vos arguments commerciaux.',
  },
  {
    hour: 'H+48',
    icon: Rocket,
    title: 'Mise en production',
    text: 'L’agent démarre sa prospection. Vous recevez vos premiers leads.',
  },
];

export default function Timeline48h() {
  const ref = useRef(null);
  const light = useLightMode();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.7', 'end 0.6'],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 80, damping: 26, mass: 0.4 });

  return (
    <section
      id="process"
      className="relative isolate scroll-mt-24 overflow-hidden px-5 py-28 sm:px-6 sm:py-36"
    >
      {/* depth 1 — halo froid : registre « atelier technique » */}
      <DepthLayer depth={1} amplitude={120} className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-1/3 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,var(--steel-soft),transparent_65%)] blur-3xl" />
      </DepthLayer>

      <div className="relative z-[4] mx-auto max-w-5xl">
        <Rise>
          <div className="mb-8 flex items-center gap-4">
            <span className="section-index">Le processus</span>
            <span className="h-px flex-1 bg-[var(--border-strong)]" />
          </div>
        </Rise>

        <Rise delay={0.05}>
          <h2 className="mb-20 max-w-3xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[3.4rem]">
            De l&apos;audit à la production en{' '}
            <span className="gradient-text">48 heures.</span>{' '}
            <span className="font-serif-it text-[var(--muted)]">Pas en 6 mois.</span>
          </h2>
        </Rise>

        <div ref={ref} className="relative">
          {/* Rail de la timeline */}
          <div
            aria-hidden
            className="absolute left-[1.35rem] top-2 h-[calc(100%-1rem)] w-px bg-[var(--border-strong)] sm:left-[1.6rem]"
          />
          {/* Remplissage scrubbé */}
          <motion.div
            aria-hidden
            style={{ scaleY: light ? 1 : fill, transformOrigin: 'top' }}
            className="absolute left-[1.35rem] top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-[var(--primary)] via-[var(--primary)] to-[var(--primary-hover)] shadow-[0_0_14px_var(--primary-glow)] sm:left-[1.6rem]"
          />

          <ol className="space-y-12 sm:space-y-16">
            {STEPS.map(({ hour, icon: Icon, title, text }, i) => (
              <Step
                key={hour}
                hour={hour}
                Icon={Icon}
                title={title}
                text={text}
                index={i}
                total={STEPS.length}
                progress={fill}
                light={light}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Step({ hour, Icon, title, text, index, total, progress, light }) {
  /* Le jalon s'allume quand le remplissage dépasse sa position sur le rail.
     Les hooks restent inconditionnels : c'est le `style` qui arbitre. */
  const at = index / (total - 1 || 1);
  const reached = useTransform(progress, (p) => (p >= at * 0.92 ? 1 : 0));
  const opacity = useTransform(progress, [Math.max(0, at - 0.12), at], [0.45, 1]);
  const scale = useTransform(reached, [0, 1], [0.88, 1]);

  return (
    <motion.li
      style={{ opacity: light ? 1 : opacity }}
      className="relative flex gap-6 pl-0 sm:gap-8"
    >
      {/* Pastille */}
      <motion.span
        style={{ scale: light ? 1 : scale }}
        className="relative z-[1] inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--surface)] text-[var(--primary-ink)] shadow-[var(--shadow-sm)] sm:h-[3.2rem] sm:w-[3.2rem]"
      >
        <Icon size={19} strokeWidth={1.8} />
        <motion.span
          aria-hidden
          style={{ opacity: light ? 1 : reached }}
          className="absolute inset-0 rounded-full ring-2 ring-[var(--primary)]"
        />
      </motion.span>

      <div className="pt-1">
        <p className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-[var(--primary-ink)]">
          {hour}
        </p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-[var(--foreground)] sm:text-2xl">
          {title}
        </h3>
        <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-[var(--muted-strong)] sm:text-base">
          {text}
        </p>
      </div>
    </motion.li>
  );
}
