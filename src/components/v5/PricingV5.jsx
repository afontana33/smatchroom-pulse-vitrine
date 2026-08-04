'use client';

/**
 * Section 7 — Tarifs.
 *
 * Trois colonnes. Celle du milieu est surélevée, cerclée d'orange et porte le
 * setup barré : c'est l'offre qu'on veut voir choisie. Les colonnes montent en
 * décalé, la centrale en dernier pour qu'elle capte le regard en fin de
 * séquence.
 */

import { motion } from 'framer-motion';
import { ArrowRight, Check, Sparkles, Building2, Unlock } from 'lucide-react';
import { DepthLayer, Rise, TiltCard, useLightMode } from './motion';

const CALENDLY = 'https://calendly.com/a-fontana-smatchroom/30min';

const PLANS = [
  {
    key: 'liberte',
    icon: Unlock,
    emoji: '👉',
    name: 'Liberté',
    badge: 'Sans engagement',
    pitch: 'Idéal pour tester la puissance de l’IA en toute flexibilité.',
    setup: { label: 'Frais de création (setup)', value: '300 €', note: 'payé une seule fois' },
    mrr: { value: '190 €', note: 'HT / mois' },
    total: 'Total 1er mois : 490 € HT',
    features: [
      'Sans engagement, résiliable à tout moment',
      'Agent déployé en 48h',
      'Supervision et ajustements inclus',
    ],
    cta: 'Démarrer sans engagement',
    featured: false,
  },
  {
    key: 'partenaire',
    icon: Sparkles,
    emoji: '⭐',
    name: 'Partenaire',
    badge: 'Le choix n°1',
    pitch: 'Idéal pour s’implanter durablement sur votre secteur et lisser votre budget.',
    setup: { label: 'Frais de création (setup)', value: 'Offerts', strike: '300 €', note: 'vous économisez 300 € HT' },
    mrr: { value: '190 €', note: 'HT / mois' },
    total: 'Engagement 6 mois',
    features: [
      'Setup offert (300 € HT économisés)',
      '6 mois pour laisser l’algorithme verrouiller votre marché',
      'Priorité sur les ajustements et les nouveaux canaux',
    ],
    cta: 'Choisir la formule Partenaire',
    featured: true,
  },
  {
    key: 'corporate',
    icon: Building2,
    emoji: '🏢',
    name: 'Ingénierie Corporate',
    badge: 'PME & Grands Comptes',
    pitch: 'L’infrastructure sur-mesure pour les marchés de niche et les forts volumes.',
    setup: { label: 'Tarif', value: 'Sur devis', note: 'audit stratégique de 30 min offert' },
    mrr: null,
    total: 'Périmètre défini avec vous',
    features: [
      'Data engineering & scraping chirurgical',
      'Entraînement de l’IA sur vos documents techniques',
      'Intégration CRM et handoff instantané',
    ],
    cta: 'Demander un audit',
    featured: false,
  },
];

export default function PricingV5() {
  const light = useLightMode();

  return (
    <section id="tarifs" className="relative isolate scroll-mt-24 overflow-hidden px-5 py-28 sm:px-6 sm:py-36">
      {/* depth 1 — nappe centrée sous la colonne mise en avant */}
      <DepthLayer depth={1} amplitude={130} className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,var(--primary-soft),transparent_68%)] blur-3xl" />
      </DepthLayer>

      <div className="relative z-[4] mx-auto max-w-7xl">
        <Rise>
          <div className="mb-8 flex items-center gap-4">
            <span className="section-index">Tarifs</span>
            <span className="h-px flex-1 bg-[var(--border-strong)]" />
          </div>
        </Rise>

        <Rise delay={0.05}>
          <div className="mb-16 max-w-3xl">
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[3.4rem]">
              Des tarifs professionnels.{' '}
              <span className="gradient-text">Un retour sur investissement immédiat.</span>
            </h2>
            <p className="mt-5 text-[var(--muted-strong)] sm:text-lg">
              Tous les montants sont indiqués en euros hors taxes.
            </p>
          </div>
        </Rise>

        <div className="grid gap-6 lg:grid-cols-3 lg:items-center">
          {PLANS.map(({ key, icon: Icon, emoji, name, badge, pitch, setup, mrr, total, features, cta, featured }, i) => (
            <motion.div
              key={key}
              initial={light ? { opacity: 0 } : { opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{
                duration: 0.9,
                /* la colonne vedette arrive en dernier */
                delay: featured ? 0.3 : i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={featured ? 'lg:z-10 lg:scale-[1.04]' : ''}
            >
              <TiltCard className="h-full" max={featured ? 6 : 4}>
                <article
                  className={[
                    'card relative flex h-full flex-col overflow-hidden p-7 sm:p-8',
                    featured
                      ? 'ring-2 ring-[var(--primary)] shadow-[var(--shadow-lg)]'
                      : 'card-hover',
                  ].join(' ')}
                >
                  {featured && (
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,var(--primary-soft),transparent_58%)]"
                    />
                  )}

                  <div className="relative flex items-center gap-3">
                    <span
                      className={[
                        'inline-flex h-11 w-11 items-center justify-center rounded-xl ring-1',
                        featured
                          ? 'bg-[var(--primary)] text-white ring-[var(--primary)]'
                          : 'bg-[var(--primary-soft)] text-[var(--primary-ink)] ring-[var(--primary-line)]',
                      ].join(' ')}
                    >
                      <Icon size={19} strokeWidth={1.8} />
                    </span>
                    <span className="text-xl" aria-hidden>
                      {emoji}
                    </span>
                  </div>

                  <p className="relative mt-6 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[var(--primary-ink)]">
                    {badge}
                  </p>
                  <h3 className="relative mt-1.5 text-2xl font-semibold tracking-tight text-[var(--foreground)]">
                    Formule <span className="font-serif-it">{name}</span>
                  </h3>
                  <p className="relative mt-3 text-sm text-[var(--muted-strong)]">{pitch}</p>

                  {/* Bloc prix */}
                  <div className="relative mt-7 border-t border-[var(--border)] pt-6">
                    <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--muted)]">
                      {setup.label}
                    </p>
                    <p className="mt-1 flex items-baseline gap-2.5">
                      {setup.strike && (
                        <span className="font-display text-lg text-[var(--muted)] line-through">
                          {setup.strike}
                        </span>
                      )}
                      <span
                        className={[
                          'font-display text-3xl font-semibold',
                          setup.strike ? 'text-[var(--primary-ink)]' : 'text-[var(--foreground)]',
                        ].join(' ')}
                      >
                        {setup.value}
                      </span>
                    </p>
                    <p className="mt-1 text-xs text-[var(--muted)]">{setup.note}</p>

                    {mrr && (
                      <div className="mt-5">
                        <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--muted)]">
                          Licence IA
                        </p>
                        <p className="mt-1 font-display text-3xl font-semibold text-[var(--foreground)]">
                          {mrr.value}{' '}
                          <span className="text-sm font-normal text-[var(--muted)]">{mrr.note}</span>
                        </p>
                      </div>
                    )}

                    <p
                      className={[
                        'mt-5 inline-flex rounded-lg px-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.12em]',
                        featured
                          ? 'bg-[var(--primary-soft)] text-[var(--primary-ink)]'
                          : 'bg-[var(--surface-2)] text-[var(--muted-strong)]',
                      ].join(' ')}
                    >
                      {total}
                    </p>
                  </div>

                  <ul className="relative mt-6 flex-1 space-y-3">
                    {features.map((f) => (
                      <li key={f} className="flex gap-2.5 text-sm text-[var(--muted-strong)]">
                        <Check
                          size={16}
                          className="mt-0.5 flex-shrink-0 text-[var(--primary-ink)]"
                          strokeWidth={2.3}
                        />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={key === 'corporate' ? '/grands-comptes' : CALENDLY}
                    target={key === 'corporate' ? undefined : '_blank'}
                    rel={key === 'corporate' ? undefined : 'noopener noreferrer'}
                    className={[
                      'group relative mt-8 inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold',
                      featured ? 'btn-primary' : 'btn-ghost',
                    ].join(' ')}
                  >
                    {cta}
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </a>
                </article>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
