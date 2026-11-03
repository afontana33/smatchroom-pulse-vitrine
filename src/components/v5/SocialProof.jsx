'use client';

/**
 * Section 4 · Preuve sociale.
 *
 * Trois cas clients. Le chiffre clé de chaque carte s'incrémente à l'entrée
 * dans le champ : un nombre qui monte se lit comme un résultat acquis, pas
 * comme une promesse. Les cartes arrivent en escalier, décalées verticalement.
 */

import { motion } from 'framer-motion';
import { Trophy, HardHat, Sparkles, Building2 } from 'lucide-react';
import { DepthLayer, Rise, CountUp, useLightMode } from './motion';

// Cas réels relevés le 3 novembre 2026 dans les conversations des agents (accord des clients donné à Alexis).
// Une conversation = un professionnel qui a répondu et échangé au moins deux messages avec l'agent.
const CASES = [
  {
    key: 'couvreur',
    icon: HardHat,
    sector: 'Couverture & zinguerie · Belfort',
    client: 'Franck · Couverture du Lion',
    metric: { value: 85, suffix: '', label: 'conversations avec des prescripteurs en 6 semaines' },
    result:
      'Sur 197 architectes, maîtres d’œuvre et agences contactés, 43 % ont répondu et échangé. Franck reprend la main dès qu’un prescripteur veut travailler avec lui.',
    offset: 'lg:mt-0',
  },
  {
    key: 'peintre',
    icon: Building2,
    sector: 'Peinture & plâtrerie · Eure-et-Loir',
    client: 'Christopher · Déco-Renov',
    metric: { value: 51, suffix: '', label: 'conversations avec des professionnels en 4 semaines' },
    result:
      'Un professionnel contacté sur trois a répondu : architectes, maîtres d’œuvre et gestionnaires qui ont des chantiers de peinture à confier.',
    offset: 'lg:mt-10',
  },
  {
    key: 'aquarium',
    icon: Sparkles,
    sector: 'Aquariums sur mesure · Lille et Belgique',
    client: 'Mathias · Aqua & Scape',
    metric: { value: 28, suffix: '', label: 'conversations avec des décideurs en 5 semaines' },
    result:
      'Cabinets médicaux, hôtels, golfs et concessions : l’agent trouve le bon interlocuteur et lui présente le projet avec une vidéo adaptée à son secteur.',
    offset: 'lg:mt-20',
  },
];

export default function SocialProof() {
  const light = useLightMode();

  return (
    <section
      id="cas-clients"
      className="relative isolate scroll-mt-24 overflow-hidden px-5 py-28 sm:px-6 sm:py-36"
    >
      {/* depth 1 — lueur chaude côté droit */}
      <DepthLayer depth={1} amplitude={130} className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 top-1/4 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(196,181,253,0.20),transparent_66%)]" />
      </DepthLayer>

      {/* depth 2 — trait diagonal qui suit l'escalier des cartes */}
      <DepthLayer depth={2} amplitude={70} className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-1/2 hidden h-px -rotate-2 bg-gradient-to-r from-transparent via-[var(--primary-line)] to-transparent lg:block" />
      </DepthLayer>

      <div className="relative z-[4] mx-auto max-w-7xl">
        <Rise>
          <div className="mb-8 flex items-center gap-4">
            <span className="section-index">Résultats</span>
            <span className="h-px flex-1 bg-[var(--border-strong)]" />
          </div>
        </Rise>

        <Rise delay={0.05}>
          <div className="mb-16 max-w-3xl">
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[3.4rem]">
              Ils ont arrêté de prospecter.{' '}
              <span className="gradient-text">Voici leurs résultats.</span>
            </h2>
          </div>
        </Rise>

        <div className="grid gap-6 lg:grid-cols-3 lg:items-start">
          {CASES.map(({ key, icon: Icon, sector, client, metric, result, offset }, i) => (
            <motion.article
              key={key}
              initial={light ? { opacity: 0 } : { opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ duration: 0.9, delay: i * 0.14, ease: [0.16, 1, 0.3, 1] }}
              className={`card card-hover group relative flex flex-col overflow-hidden p-7 sm:p-8 ${offset}`}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -left-12 -top-12 h-40 w-40 rounded-full bg-[radial-gradient(circle,var(--primary-soft),transparent_65%)]"
              />

              <div className="relative flex items-center justify-between">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary-soft)] text-[var(--primary-ink)] ring-1 ring-[var(--primary-line)]">
                  <Icon size={20} strokeWidth={1.8} />
                </span>
                <Trophy size={18} className="text-[var(--primary)] opacity-70" aria-hidden />
              </div>

              <p className="relative mt-6 font-mono text-[0.64rem] uppercase tracking-[0.18em] text-[var(--muted)]">
                {sector}
              </p>
              <p className="relative mt-1.5 text-base font-semibold text-[var(--foreground)]">
                {client}
              </p>

              <div className="relative mt-7 border-t border-[var(--border)] pt-6">
                <CountUp
                  to={metric.value}
                  prefix={metric.prefix ?? ''}
                  suffix={metric.suffix}
                  className="font-display text-5xl font-semibold leading-none text-[var(--primary-ink)]"
                />
                <p className="mt-2.5 text-sm font-medium leading-snug text-[var(--foreground)]">
                  {metric.label}
                </p>
              </div>

              <p className="relative mt-4 flex-1 text-sm leading-relaxed text-[var(--muted-strong)]">
                {result}
              </p>
            </motion.article>
          ))}
        </div>

        <p className="mt-10 text-xs text-[var(--muted)]">
          Chiffres relevés le 3 novembre 2026. Une conversation correspond à un professionnel qui a répondu et échangé au moins deux messages.
        </p>
      </div>
    </section>
  );
}
