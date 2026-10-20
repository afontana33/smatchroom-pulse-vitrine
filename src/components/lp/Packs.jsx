'use client';

/**
 * Les packs.
 *
 * Vient après #piliers, qui reste la description des trois briques. Ici on ne
 * réexplique rien : on met en face quatre façons de démarrer, avec le prix.
 * Le site et la fiche établissement Google sont offerts dans chaque pack,
 * c'est l'argument du chapeau, il ne doit pas se perdre dans les cartes.
 *
 * Source unique des prix des packs. Les prix à la carte sont rappelés dans le
 * tableau en bas de section, mais leur source reste `Piliers.jsx` : si un prix
 * de brique change là-bas, il faut le répercuter ici à la main (trois lignes
 * du tableau, et les notes « au lieu de … à la carte » qui en dépendent).
 *
 * « La Machine » est mise en avant par sa bordure et son badge uniquement,
 * même fond que les autres : un fond différent casse la comparaison, l'œil
 * lit une carte d'un autre type au lieu d'une option plus chère.
 */

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check, Minus } from 'lucide-react';

const CALENDLY = 'https://calendly.com/a-fontana-smatchroom/30min';

const PACKS = [
  {
    name: 'La Vitrine',
    sub: 'Vous faire connaître des particuliers',
    hook: 'Vos chantiers filmés et diffusés aux habitants de votre zone.',
    included: ['Site & fiche Google (offert)', 'Acquisition Meta (vous filmez)'],
    excluded: ['Agent IA'],
    setup: '690 € HT',
    monthly: '220 € HT',
    first: '910 € HT',
    note: 'Budget publicitaire en plus, payé directement par vous à Meta, à partir de 15 € par jour',
  },
  {
    name: 'La Machine',
    badge: 'Le plus vendu',
    sub: 'Les pros et les particuliers, en même temps',
    hook: "La publicité amène la demande, l'agent la rappelle. Vous ne faites que signer.",
    included: [
      'Site & fiche Google (offert)',
      'Agent IA',
      'Acquisition Meta (vous filmez)',
    ],
    excluded: [],
    setup: '990 € HT',
    monthly: '410 € HT',
    first: '1 400 € HT',
    note: 'Au lieu de 1 290 € HT de création à la carte',
  },
  {
    name: 'Le Territoire',
    sub: 'Verrouiller votre zone',
    hook: 'Tout le dispositif, notre vidéaste sur vos chantiers, et votre métier réservé sur votre secteur.',
    included: [
      'Site & fiche Google (offert)',
      'Agent IA',
      'Acquisition Meta (notre vidéaste se déplace)',
      '2 tournages par an',
      'Exclusivité de zone',
    ],
    excluded: [],
    setup: '1 490 € HT',
    monthly: '490 € HT',
    first: '1 980 € HT',
    note: 'Zone 1 incluse · zone 2 +250 € HT · zone 3 +500 € HT',
  },
];

const A_LA_CARTE = [
  { offre: 'Agent IA seul', setup: '300 € HT', monthly: '190 € HT', first: '490 € HT' },
  { offre: 'Acquisition Meta seule', setup: '690 € HT', monthly: '200 € HT', first: '890 € HT' },
  { offre: 'Site & fiche Google seul', setup: '300 € HT', monthly: '20 € HT', first: '320 € HT' },
];

/* Même animation d'apparition que Piliers et Preuves, mêmes réglages : on ne
   crée pas une deuxième grammaire de mouvement sur la page. */
function Rise({ children, delay = 0, className }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Packs() {
  return (
    <section id="packs" className="relative scroll-mt-24 px-5 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Rise>
          <div className="mb-12 flex items-center gap-4">
            <span className="section-index">Nos packs</span>
            <span className="h-px flex-1 bg-[var(--border-strong)]" />
          </div>
        </Rise>

        <Rise delay={0.05}>
          <div className="mb-16 max-w-3xl">
            <h2 className="text-balance text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-[3.1rem]">
              Trois piliers,{' '}
              <span className="font-serif-it font-normal text-[var(--primary-ink)]">
                trois façons de démarrer.
              </span>
            </h2>
            <p className="mt-5 text-[var(--muted-strong)] sm:text-lg">
              Le site et la fiche établissement Google sont offerts dans chaque pack. Vous ne
              payez que ce qui va chercher les clients.
            </p>
          </div>
        </Rise>

        {/* Alignement des cartes en `subgrid` : chaque carte occupe les cinq mêmes
            pistes de la grille parente (badge, nom, accroche, inclusions, prix),
            donc les blocs de prix se retrouvent sur la même ligne d'une carte à
            l'autre même quand les listes d'inclusions n'ont pas le même nombre de
            points. Un simple `mt-auto` alignerait le bas des cartes, pas les prix.
            La piste des inclusions est en 1fr, c'est elle qui absorbe l'écart. */}
        <Rise>
          <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 md:grid-rows-[auto_auto_auto_auto_1fr_auto] xl:grid-cols-3">
            {PACKS.map((p) => (
              <article
                key={p.name}
                className={[
                  'flex h-full flex-col rounded-2xl bg-[var(--surface)] p-7',
                  /* row-span doit valoir exactement le nombre d'enfants de l'article
                     (badge, nom, sous-titre, accroche, inclusions, prix) : une piste
                     de moins et le bloc prix se superpose à la liste. */
                  'md:row-span-6 md:grid md:grid-rows-subgrid md:gap-0',
                  p.badge
                    ? 'border-2 border-[var(--primary)] shadow-[var(--shadow-lg)]'
                    : 'border border-[var(--border-strong)]',
                ].join(' ')}
              >
                {/* Le badge est sur sa propre ligne au-dessus du nom, et non à côté :
                    à côté, il rognait la largeur disponible et « La Machine » passait
                    sur deux lignes alors que le nom doit rester l'élément le plus
                    lisible de la carte. */}
                <div className="mb-3 flex items-start">
                  {p.badge ? (
                    <span className="rounded-full bg-[var(--primary)] px-2.5 py-1 font-mono text-[0.56rem] uppercase tracking-[0.14em] text-white">
                      {p.badge}
                    </span>
                  ) : (
                    <span aria-hidden className="block h-[1.375rem]" />
                  )}
                </div>

                <h3 className="font-display text-2xl font-semibold leading-tight tracking-tight text-[var(--foreground)] sm:text-[1.75rem]">
                  {p.name}
                </h3>

                <p className="mt-2 font-mono text-[0.62rem] uppercase leading-relaxed tracking-[0.16em] text-[var(--muted)]">
                  {p.sub}
                </p>

                <p className="mt-5 text-[0.95rem] leading-relaxed text-[var(--muted-strong)]">
                  {p.hook}
                </p>

                <ul className="mt-6 space-y-2.5">
                  {p.included.map((inc) => (
                    <li
                      key={inc}
                      className="flex items-start gap-3 text-[0.92rem] text-[var(--muted-strong)]"
                    >
                      <Check
                        size={16}
                        aria-hidden
                        className="mt-0.5 flex-shrink-0 text-[var(--primary-ink)]"
                        strokeWidth={2.4}
                      />
                      {inc}
                    </li>
                  ))}
                  {p.excluded.map((exc) => (
                    <li
                      key={exc}
                      className="flex items-start gap-3 text-[0.92rem] text-[var(--muted)]"
                    >
                      <Minus
                        size={16}
                        aria-hidden
                        className="mt-0.5 flex-shrink-0 text-[var(--muted)]"
                        strokeWidth={2.4}
                      />
                      <span className="line-through decoration-[var(--border-strong)]">{exc}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex h-full flex-col pt-8 md:mt-0">
                  <p className="font-display text-3xl font-semibold tracking-tight text-[var(--foreground)]">
                    {p.setup}
                  </p>
                  <p className="mt-1 text-base font-semibold text-[var(--primary-ink)]">
                    puis {p.monthly} par mois
                  </p>
                  <p className="mt-2 text-sm text-[var(--muted)]">
                    Total du premier mois&nbsp;: {p.first} (création + première mensualité)
                  </p>
                  <p className="mt-4 border-t border-[var(--border)] pt-4 text-xs leading-relaxed text-[var(--muted)]">
                    {p.note}
                  </p>
                  <a
                    href={CALENDLY}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Réserver un créneau de 30 minutes pour le pack ${p.name}`}
                    /* mt-auto : la note de bas de carte n'a pas la même longueur d'un
                       pack à l'autre, sans ça les boutons se décalent verticalement. */
                    className={[
                      'mt-5 inline-flex w-full items-center justify-center gap-2 px-5 py-3 text-sm font-semibold md:mt-auto md:pt-3',
                      p.badge ? 'btn-primary' : 'btn-ghost',
                    ].join(' ')}
                  >
                    Réserver un créneau
                    <ArrowRight size={15} aria-hidden />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </Rise>

          <Rise delay={0.05}>
            <div className="mt-12 rounded-2xl border-2 border-[var(--primary)] bg-[var(--surface)] p-7 sm:p-8">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--primary-ink)]">
                Vous lancez votre entreprise
              </p>
              <div className="mt-3 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                  <h3 className="font-display text-2xl font-semibold leading-tight tracking-tight text-[var(--foreground)] sm:text-[1.75rem]">
                    Pack Lancement Entrepreneurs
                  </h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-[var(--muted-strong)]">
                    Votre site, votre fiche établissement Google et 3 mois d&apos;agent de
                    prospection qui contacte les prescripteurs de votre zone par WhatsApp et par
                    email.
                  </p>
                </div>
                <div className="flex-shrink-0 lg:text-right">
                  <p className="font-display text-3xl font-semibold tracking-tight text-[var(--foreground)]">
                    490 € HT
                  </p>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    en une fois pour les 3 premiers mois, puis 190 € HT / mois si vous continuez
                  </p>
                  <a
                    href={CALENDLY}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Réserver un créneau de 30 minutes pour le Pack Lancement Entrepreneurs"
                    className="btn-primary mt-4 inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold"
                  >
                    Réserver un créneau
                    <ArrowRight size={15} aria-hidden />
                  </a>
                </div>
              </div>
            </div>
          </Rise>

        <Rise delay={0.05}>
          <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-2)] p-7 sm:p-8 lg:flex-row lg:items-center">
            <p className="max-w-2xl text-[0.98rem] leading-relaxed text-[var(--muted-strong)]">
              Sans engagement, au prix affiché.
            </p>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Réserver un créneau de 30 minutes pour choisir votre pack"
              className="btn-primary inline-flex flex-shrink-0 items-center gap-2 px-6 py-3.5 text-sm font-semibold"
            >
              Réserver un créneau de 30 min
              <ArrowRight size={16} aria-hidden />
            </a>
          </div>
        </Rise>

        <Rise delay={0.05}>
          <div className="mt-20 sm:mt-24">
            <h3 className="text-balance text-xl font-semibold tracking-tight sm:text-2xl">
              Vous n&apos;avez besoin que d&apos;une brique&nbsp;?
            </h3>

            {/* overflow-x-auto sur l'enveloppe uniquement : le tableau garde ses
                quatre colonnes sur mobile sans faire déborder la page. */}
            <div className="mt-6 overflow-x-auto rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)]">
              <table className="w-full min-w-[34rem] border-collapse text-left">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th
                      scope="col"
                      className="px-6 py-4 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--muted)]"
                    >
                      Offre
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--muted)]"
                    >
                      Création
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--muted)]"
                    >
                      Mensuel
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--muted)]"
                    >
                      Total 1er mois
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {A_LA_CARTE.map((l) => (
                    <tr
                      key={l.offre}
                      className="border-b border-[var(--border)] last:border-b-0"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 text-[0.95rem] font-semibold text-[var(--foreground)]"
                      >
                        {l.offre}
                      </th>
                      <td className="px-6 py-4 text-[0.95rem] text-[var(--muted-strong)]">
                        {l.setup}
                      </td>
                      <td className="px-6 py-4 text-[0.95rem] text-[var(--muted-strong)]">
                        {l.monthly}
                      </td>
                      <td className="px-6 py-4 text-[0.95rem] font-semibold text-[var(--primary-ink)]">
                        {l.first}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-6 max-w-3xl text-xs leading-relaxed text-[var(--muted)]">
              Tous les montants sont indiqués hors taxes. Le budget publicitaire Meta n&apos;est
              pas facturé par SmatchRoom&nbsp;: il est payé directement par vous depuis votre
              compte publicitaire.
            </p>
          </div>
        </Rise>
      </div>
    </section>
  );
}
