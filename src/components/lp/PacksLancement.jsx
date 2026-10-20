/**
 * Les trois Packs Lancement Entrepreneurs, en cartes comparables.
 *
 * Utilisé sur l'accueil (#packs) et sur /pack-lancement. Les données viennent
 * de lib/offers.js (PACKS_LANCEMENT) : une correction de prix se fait là-bas.
 *
 * Règles de présentation (brief du 20/10/2026) :
 * - frais récurrents et budget publicitaire affichés juste sous le prix, près du
 *   bouton, pas seulement dans la FAQ ;
 * - aucune mention de popularité non démontrée (« le plus choisi ») ;
 * - le bouton mène au rendez-vous Calendly existant, avec le pack choisi en
 *   paramètre utm_content pour le retrouver dans la réservation.
 */

import { ArrowRight, Check, Minus } from 'lucide-react';
import { CALENDLY } from '@/lib/contact';
import { BUDGET_META, PACKS_LANCEMENT } from '@/lib/offers';

const lienPack = (key) =>
  `${CALENDLY}?utm_source=site&utm_medium=pack&utm_content=${key}`;

export function PacksCards() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {PACKS_LANCEMENT.map((p) => (
        <article
          key={p.key}
          className={[
            'relative flex flex-col rounded-3xl border-2 bg-[var(--surface)] p-6 sm:p-7',
            p.badge
              ? 'border-[var(--primary)] shadow-[var(--shadow-lg)]'
              : 'border-[var(--border-strong)]',
          ].join(' ')}
        >
          <div className="flex min-h-[2rem] flex-wrap items-center justify-between gap-2">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--muted)]">
              Pack Lancement
            </p>
            {p.badge && (
              <span className="rounded-full bg-[var(--primary)] px-3 py-1 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-white">
                {p.badge}
              </span>
            )}
          </div>
          <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight">{p.short}</h3>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted-strong)] lg:min-h-[4.25rem]">{p.pitch}</p>

          <p className="mt-6 font-display text-5xl font-bold tracking-tight">
            {p.setup} € <span className="text-xl font-semibold text-[var(--muted)]">HT</span>
          </p>
          <p className="mt-1 text-sm font-semibold">payés une seule fois</p>

          <div className="mt-4 rounded-2xl bg-[var(--surface-2)] px-4 py-3.5 text-sm">
            <p className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-[var(--muted)]">
              Ensuite
            </p>
            <ul className="mt-2 space-y-1.5">
              {p.recurring.map((r) => (
                <li key={r} className="leading-snug text-[var(--foreground)]">
                  {r}
                </li>
              ))}
            </ul>
            {p.meta && (
              <p className="mt-2.5 border-t border-[var(--border)] pt-2.5 text-xs leading-relaxed text-[var(--muted-strong)]">
                {BUDGET_META}
              </p>
            )}
          </div>

          <a
            href={lienPack(p.key)}
            target="_blank"
            rel="noopener noreferrer"
            className={[
              'mt-5 inline-flex w-full items-center justify-center gap-2 px-5 py-3.5 text-sm font-bold',
              p.badge
                ? 'btn-primary'
                : 'rounded-full border-2 border-[var(--foreground)] text-[var(--foreground)] transition-colors hover:bg-[var(--foreground)] hover:text-[var(--background)]',
            ].join(' ')}
          >
            {p.cta}
            <ArrowRight size={16} aria-hidden />
          </a>

          {p.creations && (
            <p className="mt-6 text-sm font-semibold text-[var(--primary-ink)]">{p.creations}</p>
          )}
          <ul className={`${p.creations ? 'mt-3' : 'mt-6'} space-y-2.5 border-t border-[var(--border)] pt-4`}>
            {p.included.map((c) => (
              <li key={c} className="flex items-start gap-2.5 text-sm">
                <Check size={16} aria-hidden strokeWidth={2.6} className="mt-0.5 flex-shrink-0 text-[var(--primary-ink)]" />
                {c}
              </li>
            ))}
            {p.excluded && (
              <li className="flex items-start gap-2.5 text-sm text-[var(--muted)]">
                <Minus size={16} aria-hidden className="mt-0.5 flex-shrink-0" />
                {p.excluded}
              </li>
            )}
          </ul>
        </article>
      ))}
    </div>
  );
}

export const NOTE_PACKS =
  "Les trois mois d'Agent Partenaires inclus sont payés d'avance et non remboursables une fois le site livré : la garantie « aucun rendez-vous dans le mois, le mois suivant n'est pas facturé » porte sur l'abonnement mensuel de l'Agent Partenaires qui suit. Elle ne s'applique pas à la publicité Meta, aux vidéos ni au budget publicitaire. Les créations publicitaires sont réalisées à partir des vidéos que vous fournissez : aucun tournage n'est inclus dans les packs.";

export default function PacksLancement() {
  return (
    <section id="packs" className="relative scroll-mt-24 px-5 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-3xl">
          <p className="eyebrow">Packs Lancement Entrepreneurs</p>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl">
            Votre site, votre fiche Google,{' '}
            <span className="font-serif-it font-normal text-[var(--primary-ink)]">
              et le levier qui vous convient.
            </span>
          </h2>
          <p className="mt-4 text-[var(--muted-strong)] sm:text-lg">
            Trois formules payées une seule fois : les partenaires qui vous recommandent, la
            publicité locale sur Facebook et Instagram, ou les deux.
          </p>
        </div>

        <PacksCards />

        <p className="mt-8 max-w-4xl text-xs leading-relaxed text-[var(--muted)]">{NOTE_PACKS}</p>
      </div>
    </section>
  );
}
