/**
 * Section d'accueil « bureau automatique » (04/11/2026).
 *
 * Au-delà de la recherche de clients : l'administratif automatisé, présenté pour
 * tous les secteurs (pas seulement les artisans). Données dans lib/offers.js
 * (BUREAU_AUTO). Seul le prix du pack est affiché ; la page /automatisation
 * détaille les exemples par secteur.
 */

import { ArrowRight, MessageCircle, FileText, CalendarCheck, Star, Send, Receipt } from 'lucide-react';
import { CALENDLY } from '@/lib/contact';
import { BUREAU_AUTO, eur } from '@/lib/offers';

const ICONES = [MessageCircle, FileText, CalendarCheck, Star, Send, Receipt];

export default function BureauAuto() {
  const b = BUREAU_AUTO;
  return (
    <section id="automatisation" className="relative scroll-mt-24 px-5 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-3xl">
          <p className="eyebrow">Au-delà des clients</p>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl">
            Votre bureau,{' '}
            <span className="font-serif-it font-normal text-[var(--primary-ink)]">
              en pilote automatique.
            </span>
          </h2>
          <p className="mt-4 text-[var(--muted-strong)] sm:text-lg">
            Répondre aux clients, relancer les devis, caler les rendez-vous, classer les factures :
            ce travail peut aujourd’hui tourner seul. Avant de recruter une personne de plus,
            regardez ce qui peut être automatisé, quel que soit votre métier.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {b.automatisations.map((a, i) => {
            const Icone = ICONES[i % ICONES.length];
            return (
              <article
                key={a.t}
                className="rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] p-6"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--surface-2)] text-[var(--primary-ink)]">
                  <Icone size={20} aria-hidden />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold tracking-tight">{a.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted-strong)]">{a.d}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col gap-6 rounded-3xl border-2 border-[var(--primary)] bg-[var(--surface)] p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--muted)]">
              {b.name}
            </p>
            <p className="mt-2 font-display text-4xl font-bold tracking-tight">
              {eur(b.setup)} € <span className="text-lg font-semibold text-[var(--muted)]">HT</span>
            </p>
            <p className="mt-1 text-sm font-semibold">
              puis {b.monthly} € HT par mois, sans engagement
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted-strong)]">
              Les six automatisations, construites pour votre façon de travailler et mises en place
              une par une. Vous préférez n’en prendre qu’une ou deux&nbsp;? On l’adapte.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <a
              href={`${CALENDLY}?utm_source=site&utm_medium=bureau&utm_content=${b.key}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold"
            >
              En parler 15 minutes
              <ArrowRight size={16} aria-hidden />
            </a>
            <a
              href="/automatisation"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[var(--foreground)] px-6 py-3 text-sm font-bold text-[var(--foreground)] transition-colors hover:bg-[var(--foreground)] hover:text-[var(--background)]"
            >
              Voir le détail
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
