'use client';

/**
 * Les trois piliers, prix compris.
 *
 * Volontairement en lignes alternées et non en trois cartes côte à côte : les
 * trois offres n'ont ni le même prix ni le même poids, les aligner en colonnes
 * égales oblige à raboter le texte et donne le rendu « pricing table » qu'on
 * cherche à éviter. Le prix est dans la ligne, pas renvoyé à une section
 * tarifs : le visiteur ne doit pas avoir à scroller pour savoir combien.
 *
 * Les montants sont ceux des pages produit d'origine (/sites, /pulse-terrain,
 * tarifs v5). Toute correction de prix se fait ici et nulle part ailleurs.
 */

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';

const CALENDLY = 'https://calendly.com/a-fontana-smatchroom/30min';

const PILIERS = [
  {
    k: '01',
    label: 'Agents IA',
    title: 'Il prospecte pendant que vous travaillez',
    photo: '/photos/agent.webp',
    alt: "Chef de chantier en gilet de sécurité, téléphone à la main devant un chantier",
    /* Le message est l'apport d'affaires, pas la prospection dans le vide : l'agent
       va chercher ceux qui ont déjà les clients (agences immobilières, cabinets
       d'assurance, architectes, syndics), pas les clients un par un. Ne pas
       revenir à « contacte les entreprises de votre secteur », c'est plus vague
       et ça ne dit pas ce que le partenaire apporte. */
    text: "Votre agent contacte les partenaires qui ont déjà votre clientèle sous la main, agences immobilières, cabinets d'assurance, architectes ou syndics, pour qu'ils vous apportent leur portefeuille. Il écrit des messages personnalisés un par un et répond en moins d'une minute, 7j/7. Vous n'intervenez que sur les gens réellement intéressés.",
    points: [
      'Par WhatsApp et par email, à votre nom',
      'Votre zone, vos métiers cibles, votre discours',
      'Les rendez-vous atterrissent dans votre agenda',
    ],
    price: {
      main: '149 € HT / mois',
      mainNote: 'sans engagement · sans frais de création',
      extra: 'Sans engagement, vous arrêtez quand vous voulez.',
    },
  },
  {
    k: '02',
    label: 'Sites & fiche établissement',
    title: 'Exister quand on tape votre métier sur Google',
    photo: '/photos/menuisier.webp',
    alt: 'Menuisier au travail sur un plan de travail en bois',
    text: "Un site qui donne envie de vous appeler, et votre fiche établissement Google créée, remplie et tenue à jour : horaires, photos de chantiers, zone d'intervention, avis. C'est souvent la première chose qu'un client voit de vous.",
    points: [
      'Site clair, rapide, lisible sur téléphone',
      'Fiche Google créée puis entretenue chaque mois',
      'Pages par ville et par prestation',
    ],
    price: {
      main: '300 € HT',
      mainNote: 'de création, une seule fois',
      then: '20 € HT / mois',
      extra: "Hébergement, nom de domaine et mises à jour compris.",
    },
  },
  {
    k: '03',
    label: 'Acquisition Meta',
    title: 'Vos chantiers filmés, diffusés aux bonnes personnes',
    photo: '/photos/camera.webp',
    alt: 'Vidéaste cadrant un plan sur un moniteur de tournage',
    text: "On filme vos chantiers et on gère vos publicités sur Facebook et Instagram pour faire venir des clients particuliers. Les demandes ne se perdent pas : elles tombent directement dans votre agent.",
    points: [
      'Vous filmez vous-même, ou notre vidéaste se déplace',
      'Montage, diffusion et suivi des campagnes',
      'Les demandes sont rappelées automatiquement',
    ],
    price: {
      main: '690 € HT',
      mainNote: 'si vous filmez · 1 490 € HT avec notre vidéaste',
      then: '200 € HT / mois',
      extra: 'Budget publicitaire en plus, à partir de 15 € par jour.',
    },
  },
];

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

export default function Piliers() {
  return (
    <section id="piliers" className="relative scroll-mt-24 px-5 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Rise>
          <div className="mb-12 flex items-center gap-4">
            <span className="section-index">Ce que nous installons</span>
            <span className="h-px flex-1 bg-[var(--border-strong)]" />
          </div>
        </Rise>

        <Rise delay={0.05}>
          <div className="mb-20 max-w-3xl">
            <h2 className="text-balance text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-[3.1rem]">
              Trois piliers.{' '}
              <span className="font-serif-it font-normal text-[var(--primary-ink)]">
                Un seul objectif : le téléphone qui sonne.
              </span>
            </h2>
            <p className="mt-5 text-[var(--muted-strong)] sm:text-lg">
              Chacun se prend séparément. Ensemble, ils se renforcent : la publicité amène la
              demande, le site rassure, l&apos;agent rappelle.
            </p>
          </div>
        </Rise>

        <div className="space-y-24 sm:space-y-32">
          {PILIERS.map((p, i) => {
            const flip = i % 2 === 1;
            return (
              <article
                key={p.k}
                className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                <Rise className={flip ? 'lg:order-2' : ''}>
                  <div className="relative">
                    <span className="absolute -left-2 -top-8 font-display text-[5.5rem] font-semibold leading-none text-[var(--foreground)] opacity-[0.07] sm:-left-4 sm:-top-12 sm:text-[8rem]">
                      {p.k}
                    </span>
                    <img
                      src={p.photo}
                      alt={p.alt}
                      width={1200}
                      height={800}
                      loading="lazy"
                      decoding="async"
                      className="relative aspect-[4/3] w-full rounded-2xl object-cover shadow-[var(--shadow-lg)]"
                    />
                  </div>
                </Rise>

                <Rise delay={0.08} className={flip ? 'lg:order-1' : ''}>
                  <div>
                    <p className="eyebrow">{p.label}</p>
                    <h3 className="mt-4 text-balance text-2xl font-semibold leading-tight tracking-tight sm:text-[2rem]">
                      {p.title}
                    </h3>
                    <p className="mt-5 text-[0.98rem] leading-relaxed text-[var(--muted-strong)] sm:text-base">
                      {p.text}
                    </p>

                    <ul className="mt-6 space-y-2.5">
                      {p.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-3 text-[0.95rem] text-[var(--muted-strong)]">
                          <Check
                            size={16}
                            className="mt-0.5 flex-shrink-0 text-[var(--primary-ink)]"
                            strokeWidth={2.4}
                          />
                          {pt}
                        </li>
                      ))}
                    </ul>

                    {p.options ? (
                      <div className="mt-8 grid gap-3 sm:grid-cols-2">
                        {p.options.map((o) => (
                          <div
                            key={o.label}
                            className={[
                              'relative rounded-2xl border p-5',
                              o.badge
                                ? 'border-[var(--primary)] bg-[var(--primary-soft)]'
                                : 'border-[var(--border-strong)] bg-[var(--surface)]',
                            ].join(' ')}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[var(--muted)]">
                                {o.label}
                              </p>
                              {o.badge && (
                                <span className="rounded-full bg-[var(--primary)] px-2.5 py-1 font-mono text-[0.56rem] uppercase tracking-[0.14em] text-white">
                                  {o.badge}
                                </span>
                              )}
                            </div>
                            <p className="mt-4 font-display text-3xl font-semibold tracking-tight text-[var(--foreground)]">
                              {o.setup}
                            </p>
                            <p className="mt-0.5 text-sm text-[var(--muted)]">{o.setupNote}</p>
                            <p className="mt-3 text-lg font-semibold text-[var(--primary-ink)]">
                              puis {o.then}
                            </p>
                            <p className="mt-3 text-sm leading-relaxed text-[var(--muted-strong)]">
                              {o.note}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="mt-8 rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] p-6">
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <span className="font-display text-3xl font-semibold tracking-tight text-[var(--foreground)]">
                            {p.price.main}
                          </span>
                          <span className="text-sm text-[var(--muted)]">{p.price.mainNote}</span>
                        </div>
                        {p.price.then && (
                          <div className="mt-2 flex flex-wrap items-baseline gap-x-3">
                            <span className="text-xl font-semibold text-[var(--primary-ink)]">
                              puis {p.price.then}
                            </span>
                          </div>
                        )}
                        <p className="mt-3 text-sm text-[var(--muted-strong)]">{p.price.extra}</p>
                      </div>
                    )}
                  </div>
                </Rise>
              </article>
            );
          })}
        </div>

        <Rise delay={0.05}>
          <div className="showcase-dark grain relative mt-24 flex flex-col items-start justify-between gap-6 overflow-hidden rounded-3xl p-8 sm:mt-32 sm:p-12 lg:flex-row lg:items-center">
            <div className="relative max-w-2xl">
              <p className="font-display text-xl font-semibold text-white sm:text-2xl">
                Vous en voulez deux, ou les trois ?
              </p>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-[var(--on-ink-muted)]">
                On construit un devis packagé, moins cher que la somme des briques. Pour les PME
                et les grands comptes, le périmètre se définit avec vous : audit de 30 minutes
                offert, puis devis.
              </p>
            </div>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary relative inline-flex flex-shrink-0 items-center gap-2 px-6 py-3.5 text-sm font-semibold"
            >
              Demander un devis
              <ArrowRight size={16} />
            </a>
          </div>
        </Rise>
      </div>
    </section>
  );
}
