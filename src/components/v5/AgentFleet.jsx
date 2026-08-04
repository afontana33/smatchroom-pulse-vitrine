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
import { ArrowRight, Crosshair, Briefcase, MapPin, Sparkles } from 'lucide-react';
import { DepthLayer, Rise, TiltCard, useLightMode } from './motion';

const CALENDLY = 'https://calendly.com/a-fontana-smatchroom/30min';

const AGENTS = [
  {
    key: 'chasseur',
    emoji: '🤖',
    icon: Crosshair,
    name: 'Le Chasseur',
    tag: 'Le best-seller',
    role: 'Prospection B2B en pilote automatique.',
    mission:
      'Il cible les décideurs de votre secteur (syndics, PME, commerces), rédige des approches ultra-personnalisées et vous envoie les demandes de devis directement sur votre téléphone. Vous ne parlez qu’à des prospects chauds.',
    highlighted: true,
  },
  {
    key: 'gestionnaire',
    emoji: '💼',
    icon: Briefcase,
    name: 'Le Gestionnaire',
    tag: 'Suivi & relance',
    role: 'Suivi client et relance de devis.',
    mission:
      'Fini les devis oubliés. L’agent suit vos propositions commerciales et relance les clients silencieux avec tact au bon moment, pour maximiser votre taux de signature sans paraître intrusif.',
    highlighted: false,
  },
  {
    key: 'visiteur',
    emoji: '📍',
    icon: MapPin,
    name: 'Le Visiteur',
    tag: 'SEO local',
    role: 'SEO local et e-réputation.',
    mission:
      'Il rédige du contenu optimisé pour vous faire remonter sur Google dans votre ville, et répond intelligemment à tous vos avis clients pour prouver votre réactivité.',
    highlighted: false,
  },
];

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
            <span className="section-index">La flotte</span>
            <span className="h-px flex-1 bg-[var(--border-strong)]" />
          </div>
        </Rise>

        <Rise delay={0.05}>
          <div className="mb-16 max-w-3xl">
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[3.4rem]">
              Choisissez votre <span className="gradient-text">collaborateur numérique.</span>
            </h2>
            <p className="mt-5 text-balance text-[var(--muted-strong)] sm:text-lg">
              Déploiement express en 48h. Conçus sur-mesure pour votre zone géographique et vos
              cibles.
            </p>
          </div>
        </Rise>

        <div className="grid gap-6 lg:grid-cols-3">
          {AGENTS.map(({ key, emoji, icon: Icon, name, tag, role, mission, highlighted }, i) => (
            <motion.div
              key={key}
              initial={light ? { opacity: 0 } : { opacity: 0, y: 70, rotateX: 8 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ duration: 0.9, delay: i * 0.13, ease: [0.16, 1, 0.3, 1] }}
              className={highlighted ? 'lg:-mt-6' : ''}
            >
              <TiltCard className="h-full">
                <article
                  className={[
                    'card card-hover group relative flex h-full flex-col overflow-hidden p-7 sm:p-8',
                    highlighted ? 'ring-2 ring-[var(--primary)]' : '',
                  ].join(' ')}
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full bg-[radial-gradient(circle,var(--primary-soft),transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />

                  {highlighted && (
                    <span className="absolute right-6 top-6 rounded-full bg-[var(--primary)] px-2.5 py-1 font-mono text-[0.56rem] uppercase tracking-[0.16em] text-white">
                      {tag}
                    </span>
                  )}

                  <div className="relative flex items-center gap-3">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary-soft)] text-[var(--primary-ink)] ring-1 ring-[var(--primary-line)] transition-transform duration-500 group-hover:scale-110">
                      <Icon size={21} strokeWidth={1.8} />
                    </span>
                    <span className="text-2xl" aria-hidden>
                      {emoji}
                    </span>
                  </div>

                  <h3 className="relative mt-6 text-2xl font-semibold tracking-tight text-[var(--foreground)]">
                    L&apos;Agent <span className="font-serif-it">{name.replace('Le ', '')}</span>
                  </h3>

                  <p className="relative mt-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-[var(--primary-ink)]">
                    {role}
                  </p>

                  <p className="relative mt-5 flex-1 text-sm leading-relaxed text-[var(--muted-strong)]">
                    {mission}
                  </p>

                  <a
                    href={CALENDLY}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative mt-7 inline-flex items-center gap-2 font-semibold text-[var(--primary-ink)]"
                  >
                    Déployer cet agent
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </a>
                </article>
              </TiltCard>
            </motion.div>
          ))}
        </div>

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
