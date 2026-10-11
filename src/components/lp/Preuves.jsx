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

/**
 * `quote` : la phrase du client, dans SES mots, recueillie et validée par lui.
 *
 * Volontairement à `null` tant qu'on ne l'a pas. Un chiffre seul se lit comme un
 * argument de vendeur, une phrase de client se lit comme une preuve, mais une
 * phrase écrite à sa place est un faux témoignage : même règle que pour les avis
 * Google (voir AvisLp), on n'en fabrique aucune. Dès qu'on a la phrase, on la
 * recopie ici mot pour mot, sans la lisser, et le bloc apparaît tout seul.
 */
const CAS = [
  {
    metric: '10',
    unit: 'rendez-vous',
    sector: 'Conseil aux entreprises',
    client: 'JB Pilotage & Stratégie',
    text: 'Dix rendez-vous décrochés pour son activité de conseil aux entreprises.',
    quote: null,
  },
  {
    metric: '12',
    unit: 'partenaires',
    sector: 'Artisanat & BTP',
    client: 'Mathieu · Isolation by Tryba',
    text: 'Douze apporteurs d’affaires verrouillés sur sa zone, et déjà cinq demandes de devis générées sans qu’il décroche son téléphone.',
    quote: null,
  },
  {
    metric: '3',
    unit: 'clients',
    sector: 'Communication digitale',
    client: 'Manon · Community manager',
    text: 'Trois nouveaux clients en un mois.',
    quote: null,
  },
  {
    metric: '3',
    unit: 'contrats',
    sector: 'Prestation de services',
    client: 'Antoine D. · Nettoyage B2B',
    text: 'Trois contrats d’entretien récurrents signés auprès de cabinets médicaux, en moins de 45 jours.',
    quote: null,
  },
  {
    metric: '6',
    unit: 'chantiers',
    sector: 'Couverture · Lille',
    client: 'David · couvreur à Lille',
    text: 'Treize partenariats d’apport d’affaires noués en un mois, et six chantiers générés grâce à ces partenaires.',
    quote: null,
  },
  {
    metric: '3',
    unit: 'chantiers',
    sector: 'Couverture · Hautes-Pyrénées',
    client: 'DTR Service',
    text: 'Quatre partenaires noués sur une petite zone du 65, et trois chantiers générés grâce à eux.',
    quote: null,
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
          <h2 className="mb-12 max-w-3xl text-balance text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-[3.1rem]">
            Ce que ça donne{' '}
            <span className="font-serif-it font-normal text-[var(--primary-ink)]">
              chez ceux qui l&apos;ont installé.
            </span>
          </h2>
        </Rise>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CAS.map((c, i) => (
            <Rise key={c.client} delay={i * 0.07} className="h-full">
              <figure className="flex h-full flex-col rounded-3xl border border-[var(--border-strong)] bg-[var(--surface)] p-7 shadow-[var(--shadow-lg)]">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-5xl font-bold tracking-tight text-[var(--primary-ink)]">
                    {c.metric}
                  </span>
                  <span className="font-display text-lg font-semibold">{c.unit}</span>
                </div>
                <blockquote className="mt-5 flex-1 text-[1.02rem] leading-relaxed text-[var(--muted-strong)]">
                  {c.quote ? (
                    <p className="font-serif-it text-xl leading-snug text-[var(--foreground)]">« {c.quote} »</p>
                  ) : (
                    <p>{c.text}</p>
                  )}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-[var(--border)] pt-5">
                  <span aria-hidden className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[var(--primary)] font-display font-bold text-white">
                    {c.client[0]}
                  </span>
                  <span>
                    <span className="block font-semibold text-[var(--foreground)]">{c.client}</span>
                    <span className="block font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--muted)]">
                      {c.sector}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Rise>
          ))}
        </div>
      </div>

      {/* Bande pleine largeur : la photo porte le volume, le marquee porte les noms. */}
      <Rise delay={0.05}>
        <div className="relative mt-20 overflow-hidden sm:mt-28">
          <img
            src="/photos/reunion-large.webp"
            alt="Équipe réunie autour d'une table pendant une présentation"
            width={1800}
            height={1200}
            loading="lazy"
            decoding="async"
            className="h-[22rem] w-full object-cover object-center sm:h-[26rem]"
          />
          <div aria-hidden className="absolute inset-0 bg-[var(--ink)]/72" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-5">
            <div className="text-center">
              <p className="font-display text-4xl font-semibold tracking-tight text-white sm:text-6xl">
                +170
              </p>
              <p className="mt-2 text-sm text-white/75 sm:text-base">
                entreprises accompagnées
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
