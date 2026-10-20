/**
 * Comparatif Agent Partenaires / Agent Clients, entre #piliers et #agent-clients.
 *
 * Les deux agents prospectent par WhatsApp et email : sans ce tableau, le
 * visiteur croit que l'Agent Clients est la version chère du même produit.
 * La différence tient en une ligne, qui il contacte : le prescripteur ou le
 * client final.
 */

import { ArrowRight, ShieldCheck } from 'lucide-react';
import { GARANTIE } from '@/lib/offers';

const AGENTS = [
  {
    name: 'Agent Partenaires',
    cible: 'Les prescripteurs qui ont déjà vos clients : agences, cabinets, consultants, réseaux',
    resultat: 'Des apporteurs d’affaires qui vous recommandent',
    pour: 'Indépendants, artisans, TPE',
    prix: '149 € HT / mois',
    prixNote: 'sans engagement',
    href: '/apporteur-affaires',
    lien: 'Voir l’Agent Partenaires',
  },
  {
    name: 'Agent Clients',
    cible: 'Vos clients eux-mêmes : les décideurs des entreprises que vous visez',
    resultat: 'Des demandes d’appel de décideurs, avec leur besoin',
    pour: 'Entreprises qui vendent à des entreprises',
    prix: 'dès 340 € HT / mois',
    prixNote: 'création dès 1 200 € HT',
    href: '/prospection-b2b',
    lien: 'Voir l’Agent Clients',
  },
];

const LIGNES = [
  ['cible', 'Qui il contacte'],
  ['resultat', 'Ce que vous obtenez'],
  ['pour', 'Pour qui'],
];

export default function DeuxAgents() {
  return (
    <section id="deux-agents" className="relative scroll-mt-24 px-5 pb-24 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-balance text-center text-2xl font-semibold tracking-tight sm:text-3xl">
          Deux agents de prospection,{' '}
          <span className="font-serif-it font-normal text-[var(--primary-ink)]">
            deux cibles différentes.
          </span>
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {AGENTS.map((a) => (
            <div
              key={a.name}
              className="flex flex-col rounded-3xl border border-[var(--border-strong)] bg-[var(--surface)] p-7"
            >
              <h3 className="font-display text-2xl font-semibold tracking-tight">{a.name}</h3>
              <dl className="mt-6 flex-1 space-y-4">
                {LIGNES.map(([k, label]) => (
                  <div key={k}>
                    <dt className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--muted)]">
                      {label}
                    </dt>
                    <dd className="mt-1 font-medium leading-snug">{a[k]}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 flex flex-wrap items-end justify-between gap-3 border-t border-[var(--border)] pt-5">
                <p>
                  <span className="block font-display text-2xl font-semibold text-[var(--primary-ink)]">
                    {a.prix}
                  </span>
                  <span className="text-sm text-[var(--muted)]">{a.prixNote}</span>
                </p>
                <a
                  href={a.href}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold underline-offset-4 hover:underline"
                >
                  {a.lien}
                  <ArrowRight size={15} aria-hidden />
                </a>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 flex items-center justify-center gap-3 rounded-2xl border-2 border-[var(--primary)] bg-[var(--surface)] px-6 py-5 text-center text-base font-semibold sm:text-lg">
          <ShieldCheck size={24} aria-hidden className="flex-shrink-0 text-[var(--primary-ink)]" />
          <span>
            Garantie sur les deux agents&nbsp;: {GARANTIE}
            <span className="mt-1 block text-sm font-normal text-[var(--muted-strong)]">Sur l&apos;abonnement mensuel, hors période prépayée du Pack Lancement Entrepreneurs.</span>
          </span>
        </p>
      </div>
    </section>
  );
}
