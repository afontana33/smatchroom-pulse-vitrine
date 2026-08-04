'use client';

/**
 * Section 1 — Hero cinématique, registre encre.
 *
 * Six couches de profondeur : fond encre grainé (0), glows orange/acier (1),
 * grille technique (2), sphère de particules R3F (3), texte et CTA (4),
 * scanline et poussières (5). Le bas de la section fond vers l'ivoire pour
 * enchaîner sans couture sur les sections claires.
 *
 * La sphère 3D est chargée à la demande et jamais sur mobile : c'est le poste
 * le plus coûteux de la page.
 */

import dynamic from 'next/dynamic';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CalendarClock, Zap } from 'lucide-react';
import { DepthLayer, SplitConverge, useLightMode, CountUp } from './motion';

const Hero3D = dynamic(() => import('../Hero3D'), { ssr: false });

const CALENDLY = 'https://calendly.com/a-fontana-smatchroom/30min';

const PROOFS = [
  { value: 90, suffix: '+', label: 'Entreprises accompagnées' },
  { value: 48, suffix: 'h', label: "De l'audit à la production" },
  { value: 24, suffix: '/7', label: 'Sans interruption' },
];

export default function HeroV5() {
  const ref = useRef(null);
  const light = useLightMode();

  /* Le contenu s'éloigne et s'estompe pendant qu'on quitte le hero. */
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const sphereScale = useTransform(scrollYProgress, [0, 1], [1, 1.35]);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[92vh] w-full flex-col justify-center overflow-hidden bg-[var(--ink)]"
    >
      {/* depth 0 — fond encre + grain */}
      <div aria-hidden className="grain absolute inset-0 z-0 bg-[var(--ink)]" />

      {/* depth 1 — atmosphère : glows additifs */}
      <DepthLayer depth={1} amplitude={160} className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-0 h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle,rgba(255,90,31,0.30),transparent_65%)] blur-[90px] mix-blend-screen" />
        <div className="absolute -right-32 top-24 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(255,176,122,0.20),transparent_65%)] blur-[90px] mix-blend-screen [animation-delay:-6s]" />
        <div className="absolute bottom-0 left-1/3 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(41,75,115,0.34),transparent_65%)] blur-[90px] mix-blend-screen [animation-delay:-11s]" />
      </DepthLayer>

      {/* depth 2 — grille technique */}
      <DepthLayer depth={2} amplitude={90} className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.10) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, #000 25%, transparent 78%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, #000 25%, transparent 78%)',
          }}
        />
      </DepthLayer>

      {/* depth 3 — la sphère de particules, l'objet héros */}
      {!light && (
        <motion.div
          aria-hidden
          style={{ scale: sphereScale }}
          className="pointer-events-none absolute inset-0 z-[3] opacity-70"
        >
          <Hero3D />
        </motion.div>
      )}

      {/* depth 4 — contenu */}
      <motion.div
        style={{ y: light ? 0 : contentY, opacity: light ? 1 : contentOpacity }}
        className="relative z-[4] mx-auto flex w-full max-w-5xl flex-col items-center px-5 pb-24 pt-36 text-center sm:px-6 sm:pt-44"
      >
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[#ffb27a] backdrop-blur-md"
        >
          <Zap size={13} className="fill-[#ffb27a]" />
          L&apos;ingénierie d&apos;acquisition B2B
        </motion.span>

        <h1 className="text-balance text-[2.6rem] font-semibold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-[4.7rem]">
          <SplitConverge
            parts={[
              { text: 'L’Intelligence Artificielle ', from: 'left' },
              { text: 'qui prospecte, ', from: 'right' },
              { text: 'relance', from: 'up', className: 'gradient-text-ink' },
              { text: ' et ', from: 'up' },
              { text: 'vend', from: 'up', className: 'gradient-text-ink' },
              { text: ' à votre place.', from: 'left' },
            ]}
          />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-7 max-w-2xl text-balance text-base leading-relaxed text-[var(--on-ink-muted)] sm:text-lg"
        >
          Artisans, prestataires de services ou entreprises B2B : arrêtez de perdre votre temps à
          chercher des clients. SmatchRoom conçoit, entraîne et déploie vos{' '}
          <span className="font-semibold text-white">collaborateurs numériques autonomes</span>. Ils
          travaillent <span className="font-mono text-[#ffb27a]">24h/24</span> pour sédentariser
          votre chiffre d&apos;affaires.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center"
        >
          <a
            href="#agents"
            className="btn-primary group inline-flex items-center justify-center gap-2.5 px-7 py-4 text-[0.95rem] font-semibold"
          >
            Découvrir nos agents
            <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 rounded-xl border border-white/18 bg-white/[0.05] px-7 py-4 text-[0.95rem] font-semibold text-white backdrop-blur-md transition-colors hover:border-white/35 hover:bg-white/[0.1]"
          >
            <CalendarClock size={17} />
            Réserver un audit · 30 min
          </a>
        </motion.div>

        {/* Preuves chiffrées */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
          {PROOFS.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 + i * 0.1 }}
              className="flex items-center gap-3"
            >
              <CountUp
                to={p.value}
                suffix={p.suffix}
                className="font-display text-3xl font-semibold text-white"
              />
              <span className="max-w-[8.5rem] text-left text-xs leading-tight text-[var(--on-ink-muted)]">
                {p.label}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* depth 5 — scanline + fondu vers l'ivoire */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-48 bg-gradient-to-b from-transparent to-[var(--background)]"
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-px bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-60"
        animate={light ? undefined : { y: ['0vh', '92vh'], opacity: [0, 0.5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
      />
    </section>
  );
}
