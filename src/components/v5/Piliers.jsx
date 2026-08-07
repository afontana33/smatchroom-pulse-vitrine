'use client';

/**
 * Section 2 — Les trois briques de la digitalisation.
 *
 * C'est la nouvelle colonne vertébrale du parcours : l'agent IA (le Chasseur),
 * le site et la fiche établissement, l'acquisition Meta. Chaque carte renvoie
 * vers son développement (ancre ou page dédiée) ; aucune ne vend ici.
 */

import { motion } from 'framer-motion';
import { ArrowRight, Bot, Globe, Clapperboard } from 'lucide-react';
import { DepthLayer, Rise, TiltCard, useLightMode } from './motion';

const PILIERS = [
  {
    key: 'agent',
    n: '01',
    icon: Bot,
    label: 'Agent IA',
    title: 'L’Agent Chasseur',
    text: 'Il prospecte les entreprises de votre secteur, rédige des approches personnalisées et répond aux demandes en moins d’une minute, 7j/7. Vous ne parlez qu’à des prospects chauds.',
    href: '#agents',
    cta: 'Voir l’agent',
    external: false,
  },
  {
    key: 'site',
    n: '02',
    icon: Globe,
    label: 'Site & fiche établissement',
    title: 'Exister sur Google',
    text: 'Un site clair qui donne envie de vous appeler, et votre fiche établissement Google créée, remplie et tenue à jour : horaires, photos, zone d’intervention, avis. 300 € HT puis 20 € HT/mois.',
    href: '/sites',
    cta: 'Voir l’offre Sites',
    external: false,
  },
  {
    key: 'meta',
    n: '03',
    icon: Clapperboard,
    label: 'Acquisition Meta',
    title: 'Pulse Terrain',
    text: 'On filme vos chantiers et on gère votre publicité sur Facebook et Instagram pour vous amener des clients particuliers. Les demandes tombent dans votre agent.',
    href: '/pulse-terrain',
    cta: 'Voir Pulse Terrain',
    external: false,
  },
];

export default function Piliers() {
  const light = useLightMode();

  return (
    <section
      id="piliers"
      className="relative isolate scroll-mt-24 overflow-hidden px-5 py-28 sm:px-6 sm:py-36"
    >
      <DepthLayer depth={1} amplitude={130} className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-32 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,var(--primary-soft),transparent_68%)]" />
      </DepthLayer>

      <div className="relative z-[4] mx-auto max-w-7xl">
        <Rise>
          <div className="mb-8 flex items-center gap-4">
            <span className="section-index">Les trois briques</span>
            <span className="h-px flex-1 bg-[var(--border-strong)]" />
          </div>
        </Rise>

        <Rise delay={0.05}>
          <div className="mb-16 max-w-3xl">
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[3.4rem]">
              Digitaliser une entreprise,{' '}
              <span className="gradient-text">c’est trois chantiers.</span>
            </h2>
            <p className="mt-5 text-balance text-[var(--muted-strong)] sm:text-lg">
              Se faire trouver, se faire rappeler, ne rater aucune demande. On prend les trois, ou
              seulement celui qui vous manque. Les trois ensemble, c’est un devis packagé.
            </p>
          </div>
        </Rise>

        <div className="grid gap-6 lg:grid-cols-3">
          {PILIERS.map(({ key, n, icon: Icon, label, title, text, href, cta }, i) => (
            <motion.div
              key={key}
              initial={light ? { opacity: 0 } : { opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <TiltCard className="h-full">
                <article className="card card-hover grain group relative flex h-full flex-col overflow-hidden p-7 sm:p-8">
                  <span className="absolute right-6 top-5 font-display text-4xl font-semibold text-[var(--primary-soft)]">
                    {n}
                  </span>
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary-soft)] text-[var(--primary-ink)] ring-1 ring-[var(--primary-line)] transition-transform duration-500 group-hover:scale-110">
                    <Icon size={21} strokeWidth={1.8} />
                  </div>
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-[var(--primary-ink)]">
                    {label}
                  </p>
                  <h3 className="mt-1.5 text-2xl font-semibold tracking-tight text-[var(--foreground)]">
                    {title}
                  </h3>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-[var(--muted-strong)]">
                    {text}
                  </p>
                  <a
                    href={href}
                    aria-label={`${cta} : ${title}`}
                    className="mt-7 inline-flex items-center gap-2 font-semibold text-[var(--primary-ink)]"
                  >
                    {cta}
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
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
