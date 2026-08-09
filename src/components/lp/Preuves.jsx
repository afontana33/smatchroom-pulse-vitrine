'use client';

/**
 * Résultats et entreprises accompagnées.
 *
 * Les trois cas et leurs chiffres viennent de la section « preuve sociale » de
 * la v5 : ce sont des résultats clients réels, on ne les arrondit pas à la
 * hausse et on n'en invente pas de nouveaux. Même règle que pour les avis
 * Google : si un chiffre n'est pas vérifiable, il ne monte pas sur la page.
 */

import { motion, useReducedMotion } from 'framer-motion';

const CAS = [
  {
    metric: '12',
    unit: 'partenaires',
    sector: 'Artisanat & BTP',
    client: 'Mathieu · Isolation by Tryba',
    text: 'Douze apporteurs d’affaires verrouillés sur sa zone, et déjà cinq demandes de devis générées sans qu’il décroche son téléphone.',
  },
  {
    metric: '3',
    unit: 'contrats',
    sector: 'Prestation de services',
    client: 'Antoine D. · Nettoyage B2B',
    text: 'Trois contrats d’entretien récurrents signés auprès de cabinets médicaux, en moins de 45 jours.',
  },
  {
    metric: '13',
    unit: 'partenariats',
    sector: 'Couverture · Lille',
    client: 'David · couvreur à Lille',
    text: 'Treize partenariats d’apport d’affaires noués et deux demandes de devis, en un mois.',
  },
];

const CLIENTS = [
  'Tryba',
  'BatInnov',
  'JB Pilotage & Stratégie',
  'NextMove',
  'HDS Solutions',
  'Ets Duvernell',
  'DTR Service',
  'Habitat Multi Services',
];

function Rise({ children, delay = 0, className }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Preuves() {
  const loop = [...CLIENTS, ...CLIENTS];

  return (
    /* Pas de padding bas : la bande photo ferme la section à ras, sinon elle
       flotte au milieu de 200 px de vide avant les avis. */
    <section id="resultats" className="relative scroll-mt-24 pb-0 pt-24 sm:pt-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <Rise>
          <div className="mb-12 flex items-center gap-4">
            <span className="section-index">Résultats</span>
            <span className="h-px flex-1 bg-[var(--border-strong)]" />
          </div>
        </Rise>

        <Rise delay={0.05}>
          <h2 className="mb-16 max-w-3xl text-balance text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-[3.1rem]">
            Ce que ça donne{' '}
            <span className="font-serif-it font-normal text-[var(--primary-ink)]">
              chez ceux qui l&apos;ont installé.
            </span>
          </h2>
        </Rise>

        <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
          {CAS.map((c, i) => (
            <Rise key={c.client} delay={i * 0.07}>
              <div className="grid gap-4 py-9 sm:grid-cols-[minmax(0,10rem)_1fr] sm:gap-10 lg:grid-cols-[minmax(0,14rem)_minmax(0,16rem)_1fr]">
                <div>
                  <p className="font-display text-4xl font-semibold tracking-tight text-[var(--primary-ink)] sm:text-5xl">
                    {c.metric}
                  </p>
                  <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[var(--muted)]">
                    {c.unit}
                  </p>
                </div>
                <div>
                  <p className="font-display text-base font-semibold text-[var(--foreground)]">
                    {c.client}
                  </p>
                  <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[var(--muted)]">
                    {c.sector}
                  </p>
                </div>
                <p className="text-[0.98rem] leading-relaxed text-[var(--muted-strong)]">
                  {c.text}
                </p>
              </div>
            </Rise>
          ))}
        </div>
      </div>

      {/* Bande pleine largeur : la photo porte le volume, le marquee porte les noms. */}
      <Rise delay={0.05}>
        <div className="relative mt-20 overflow-hidden sm:mt-28">
          <img
            src="/photos/chantier-large.webp"
            alt="Vue large d'un chantier de construction avec plusieurs équipes au travail"
            width={1800}
            height={1352}
            loading="lazy"
            decoding="async"
            className="h-[22rem] w-full object-cover object-center sm:h-[26rem]"
          />
          <div aria-hidden className="absolute inset-0 bg-[var(--ink)]/72" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-5">
            <div className="text-center">
              <p className="font-display text-4xl font-semibold tracking-tight text-white sm:text-6xl">
                +90
              </p>
              <p className="mt-2 text-sm text-white/75 sm:text-base">
                artisans et entreprises accompagnés
              </p>
            </div>

            <div className="marquee-group marquee-mask relative w-full max-w-5xl overflow-hidden">
              <ul className="animate-marquee flex items-center gap-x-10 pr-10 sm:gap-x-14 sm:pr-14">
                {loop.map((c, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-x-10 sm:gap-x-14"
                    aria-hidden={i >= CLIENTS.length}
                  >
                    <span className="whitespace-nowrap font-display text-lg font-semibold tracking-tight text-white/80 sm:text-2xl">
                      {c}
                    </span>
                    <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--primary)]" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Rise>
    </section>
  );
}
