'use client';

/**
 * Section 6 — Différenciation technique, registre encre.
 *
 * Rupture de fond volontaire au milieu du parcours clair : on passe en encre
 * pour installer le sérieux technique, puis on ressort en ivoire vers les
 * tarifs. Le titre s'allume mot par mot sur fond sombre.
 */

import { motion } from 'framer-motion';
import { Bot, KeyRound, ShieldCheck, Users } from 'lucide-react';
import { DepthLayer, WordLight, Rise, useLightMode } from './motion';

const PILLARS = [
  {
    icon: KeyRound,
    title: 'Service clé en main',
    text: 'Vous ne touchez à aucun ordinateur. Nous gérons la technique de bout en bout : sourcing des données, rédaction, routage, supervision.',
  },
  {
    icon: ShieldCheck,
    title: 'Mesures de sécurité renforcées',
    text: 'Cadence de prospection lissée pour protéger vos adresses et vos numéros. Infrastructure dédiée, traitement encadré par un accord de sous-traitance signé avec vous.',
  },
  {
    icon: Bot,
    title: 'Agents identifiés comme automatisés',
    text: 'L’agent indique dès le premier message qu’il est automatisé, permet de s’y opposer en un mot et de joindre un humain. Voir la page transparence sur l’IA.',
  },
  {
    icon: Users,
    title: 'Un partenaire humain',
    text: 'Derrière la machine, notre équipe à Bordeaux vous accompagne sur la stratégie de vente et ajuste les agents avec vous.',
  },
];

export default function TechDiff() {
  const light = useLightMode();

  return (
    <section
      id="technologie"
      className="showcase-dark grain relative isolate scroll-mt-24 overflow-hidden px-5 py-28 sm:px-6 sm:py-36"
    >
      {/* depth 1 — atmosphère froide */}
      <DepthLayer depth={1} amplitude={140} className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(41,75,115,0.40),transparent_66%)] mix-blend-screen" />
        <div className="absolute -right-24 bottom-0 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(124, 58, 237,0.20),transparent_66%)] mix-blend-screen" />
      </DepthLayer>

      {/* depth 2 — grille */}
      <DepthLayer depth={2} amplitude={80} className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(ellipse 65% 60% at 50% 50%, #000 20%, transparent 78%)',
            WebkitMaskImage: 'radial-gradient(ellipse 65% 60% at 50% 50%, #000 20%, transparent 78%)',
          }}
        />
      </DepthLayer>

      <div className="relative z-[4] mx-auto max-w-7xl">
        <Rise>
          <div className="mb-8 flex items-center gap-4">
            <span className="font-mono text-[0.66rem] uppercase tracking-[0.22em] text-[#8fb4e0]">
              Sous le capot
            </span>
            <span className="h-px flex-1 bg-white/12" />
          </div>
        </Rise>

        <WordLight
          text="De la vraie tech. Pas du bricolage."
          tone="dark"
          className="max-w-3xl text-balance text-3xl font-semibold leading-[1.12] tracking-tight sm:text-4xl lg:text-[3.4rem]"
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {PILLARS.map(({ icon: Icon, title, text }, i) => (
            <motion.div
              key={title}
              initial={light ? { opacity: 0 } : { opacity: 0, y: 44, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ duration: 0.9, delay: i * 0.13, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-2xl border border-white/12 bg-white/[0.04] p-7 backdrop-blur-sm transition-colors duration-500 hover:border-white/25 hover:bg-white/[0.07] sm:p-8"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.07] text-[#8fb4e0] ring-1 ring-white/12 transition-transform duration-500 group-hover:scale-110">
                <Icon size={21} strokeWidth={1.8} />
              </span>
              <h3 className="mt-6 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--on-ink-muted)]">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
