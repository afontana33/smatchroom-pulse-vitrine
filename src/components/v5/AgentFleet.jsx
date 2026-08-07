'use client';

/**
 * Section 3 — La flotte d'agents.
 *
 * Trois cartes qui montent en cascade puis s'inclinent vers le curseur.
 * Chaque carte porte une « mission » : au survol, un liseré orange se dessine
 * et la pastille de rôle s'illumine. La bannière Corporate ferme la section en
 * registre encre, pour rappeler que le sur-mesure est un autre monde.
 */

import { motion } from 'framer-motion';
import { ArrowRight, Crosshair, Check, Sparkles } from 'lucide-react';
import { DepthLayer, Rise, TiltCard, useLightMode } from './motion';

const CALENDLY = 'https://calendly.com/a-fontana-smatchroom/30min';

const CHASSEUR = {
  emoji: '🤖',
  icon: Crosshair,
  tag: 'Notre agent',
  role: 'Prospection et réponse aux demandes, en pilote automatique.',
  missions: [
    'Il cible les décideurs de votre secteur (syndics, PME, commerces) et rédige des approches ultra-personnalisées, une par une.',
    'Il répond aux demandes entrantes en moins d’une minute, 7j/7, qualifie le besoin et écarte ce qui ne vaut pas le déplacement.',
    'Il relance les devis restés sans réponse au bon moment, sans jamais paraître insistant.',
    'Il vous transmet les prospects chauds directement sur votre téléphone. Vous n’avez qu’à rappeler.',
  ],
}

export default function AgentFleet() {
  const light = useLightMode();

  return (
    <section id="agents" className="relative isolate scroll-mt-24 overflow-hidden px-5 py-28 sm:px-6 sm:py-36">
      {/* depth 1 — nappe orange derrière la carte centrale */}
      <DepthLayer depth={1} amplitude={140} className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-40 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,var(--primary-soft),transparent_68%)]" />
      </DepthLayer>

      {/* depth 2 — pointillés de fond */}
      <DepthLayer depth={2} amplitude={80} className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.55]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(22,21,27,0.10) 1px, transparent 1px)',
            backgroundSize: '26px 26px',
            maskImage: 'radial-gradient(ellipse 60% 50% at 50% 45%, #000 10%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 45%, #000 10%, transparent 75%)',
          }}
        />
      </DepthLayer>

      <div className="relative z-[4] mx-auto max-w-7xl">
        <Rise>
          <div className="mb-8 flex items-center gap-4">
            <span className="section-index">01 — L’agent IA</span>
            <span className="h-px flex-1 bg-[var(--border-strong)]" />
          </div>
        </Rise>

        <Rise delay={0.05}>
          <div className="mb-16 max-w-3xl">
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[3.4rem]">
              Un seul agent, <span className="gradient-text">et il ne dort jamais.</span>
            </h2>
            <p className="mt-5 text-balance text-[var(--muted-strong)] sm:text-lg">
              Plutôt qu’un catalogue d’agents à moitié utilisés, nous n’en déployons qu’un,
              entraîné sur votre métier et votre zone. Opérationnel en 48h.
            </p>
          </div>
        </Rise>

        <motion.div
          initial={light ? { opacity: 0 } : { opacity: 0, y: 70, rotateX: 8 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: '-8%' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <TiltCard max={5}>
            <article className="card group relative overflow-hidden p-7 ring-2 ring-[var(--primary)] sm:p-10">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[radial-gradient(circle,var(--primary-soft),transparent_65%)]"
              />

              <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-start">
                <div>
                  <span className="inline-flex rounded-full bg-[var(--primary)] px-2.5 py-1 font-mono text-[0.56rem] uppercase tracking-[0.16em] text-white">
                    {CHASSEUR.tag}
                  </span>

                  <div className="mt-6 flex items-center gap-3">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary-soft)] text-[var(--primary-ink)] ring-1 ring-[var(--primary-line)] transition-transform duration-500 group-hover:scale-110">
                      <CHASSEUR.icon size={21} strokeWidth={1.8} />
                    </span>
                    <span className="text-2xl" aria-hidden>
                      {CHASSEUR.emoji}
                    </span>
                  </div>

                  <h3 className="mt-6 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
                    L&apos;Agent <span className="font-serif-it">Chasseur</span>
                  </h3>
                  <p className="mt-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-[var(--primary-ink)]">
                    {CHASSEUR.role}
                  </p>

                  <a
                    href={CALENDLY}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Réserver un créneau pour déployer l’Agent Chasseur (nouvelle fenêtre)"
                    className="btn-primary mt-8 inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold"
                  >
                    Déployer l&apos;agent
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </a>
                </div>

                <ul className="space-y-4 border-t border-[var(--border)] pt-7 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                  {CHASSEUR.missions.map((m) => (
                    <li key={m} className="flex gap-3 text-sm leading-relaxed text-[var(--muted-strong)]">
                      <Check size={16} strokeWidth={2.3} className="mt-0.5 flex-shrink-0 text-[var(--primary-ink)]" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </TiltCard>
        </motion.div>

        {/* Bannière sur-mesure, registre encre */}
        <Rise delay={0.12}>
          <div className="showcase-dark grain relative mt-8 overflow-hidden rounded-2xl p-8 sm:p-10">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(143,180,224,0.20),transparent_65%)]"
            />
            <div className="relative flex flex-col items-start gap-7 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <span className="premium-badge inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.18em]">
                  <Sparkles size={12} /> Ingénierie sur-mesure
                </span>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  Votre besoin ne rentre dans aucune case&nbsp;?{' '}
                  <span className="font-serif-it text-[#8fb4e0]">On construit l&apos;agent.</span>
                </h3>
                <p className="mt-3 text-sm text-[var(--on-ink-muted)] sm:text-base">
                  Marchés de niche, forts volumes, données introuvables, intégration CRM : la
                  division Corporate conçoit une infrastructure d&apos;acquisition entièrement
                  dédiée à votre marché.
                </p>
              </div>
              <a
                href="/grands-comptes"
                className="btn-steel inline-flex flex-shrink-0 items-center gap-2 px-6 py-3.5 font-semibold"
              >
                Découvrir l&apos;offre Corporate
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </Rise>
      </div>
    </section>
  );
}
