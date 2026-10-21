/**
 * Hero de conversion : l'offre d'entrée (Pack Lancement Partenaires, le premier
 * des trois Packs Lancement Entrepreneurs) est visible sans scroller, avec son
 * prix, son contenu et le bouton de rendez-vous. Les deux autres packs sont
 * annoncés sous le bouton et détaillés dans PacksLancement (#packs).
 *
 * Remplace HeroLp + Packs sur l'accueil. Les preuves suivent immédiatement :
 * ne rien intercaler entre ce bloc et #resultats.
 */

import { ArrowRight, Check, Phone, Radar, Star } from 'lucide-react';
import { CALENDLY, TEL_DISPLAY, TEL_HREF } from '@/lib/contact';
import { PACKS_LANCEMENT } from '@/lib/offers';

const CONTENU = [
  'Votre site internet, hébergé à votre nom : il reste à vous si vous arrêtez',
  'Votre fiche Google créée ou optimisée',
  '3 mois d’Agent Partenaires : il vous trouve des apporteurs d’affaires',
];

const AUTRES = PACKS_LANCEMENT.slice(1);

const BENEFICES = [
  'En place en 48 heures',
  'Vous ne parlez qu’aux gens intéressés',
  'Les rendez-vous arrivent dans votre agenda',
];

export function CtaRdv({ className = '' }) {
  return (
    <a
      href={CALENDLY}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn-primary inline-flex items-center justify-center gap-2.5 px-8 py-5 text-base font-bold shadow-[0_14px_40px_-10px_rgba(91, 11, 252,0.75)] sm:text-lg ${className}`}
    >
      Réserver mon créneau gratuit de 15 min
      <ArrowRight size={20} aria-hidden />
    </a>
  );
}

export default function HeroLancement() {
  return (
    <section id="lancement" className="relative scroll-mt-24 px-5 pb-16 pt-24 sm:px-6 sm:pt-32 lg:pt-36">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-6">
          {/* Test gratuit en tête de page (demande du 21/10/2026) : la réponse
              visible à « je veux tester avant ». Mène au simulateur. */}
          <a
            href="/simulateur"
            className="group mb-8 flex w-full max-w-xl items-center gap-4 rounded-2xl border-2 border-[var(--primary)] bg-[var(--surface)] p-4 shadow-[var(--shadow-lg)] transition-transform hover:-translate-y-0.5 sm:p-5"
          >
            <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--primary)] text-white">
              <Radar size={24} aria-hidden />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-display text-xl font-semibold tracking-tight text-[var(--foreground)] sm:text-2xl">
                Tester gratuitement
              </span>
              <span className="mt-0.5 block text-sm text-[var(--muted-strong)]">
                Voyez en 1 minute qui l’agent contacterait pour vous, dans votre ville.
              </span>
            </span>
            <ArrowRight
              size={22}
              aria-hidden
              className="flex-shrink-0 text-[var(--primary-ink)] transition-transform group-hover:translate-x-1"
            />
          </a>
          <p className="eyebrow">Indépendants · TPE · PME · B2B</p>
          <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.04] tracking-tight sm:text-5xl lg:text-[3.8rem]">
            Vos meilleurs clients ne vous cherchent pas.{' '}
            <span className="font-serif-it font-normal text-[var(--primary-ink)]">
              On va les chercher.
            </span>
          </h1>
          <p className="mt-4 max-w-lg text-lg sm:mt-6 leading-relaxed text-[var(--muted-strong)]">
            Vous êtes sur le terrain, on vous ramène les rendez-vous.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-[var(--muted-strong)]">
            <a href={TEL_HREF} className="inline-flex items-center gap-2 font-semibold text-[var(--foreground)]">
              <Phone size={16} aria-hidden className="text-[var(--primary-ink)]" />
              {TEL_DISPLAY}
            </a>
            <a href="#avis" className="inline-flex items-center gap-1.5">
              <Star size={16} aria-hidden className="fill-[var(--primary)] text-[var(--primary)]" />
              <span className="font-semibold text-[var(--foreground)]">5,0</span> sur Google
            </a>
            <a href="#resultats">+170 entreprises accompagnées</a>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a href="/apporteur-affaires" className="inline-flex items-center justify-between gap-3 rounded-2xl border-2 border-[var(--border)] bg-[var(--surface)] px-5 py-3.5 text-sm font-semibold text-[var(--foreground)] transition-colors hover:border-[var(--primary)]">Je cherche des apporteurs d&apos;affaires <span aria-hidden className="text-[var(--primary-ink)]">→</span></a>
            <a href="/prospection-b2b" className="inline-flex items-center justify-between gap-3 rounded-2xl border-2 border-[var(--border)] bg-[var(--surface)] px-5 py-3.5 text-sm font-semibold text-[var(--foreground)] transition-colors hover:border-[var(--primary)]">Je veux prospecter des entreprises <span aria-hidden className="text-[var(--primary-ink)]">→</span></a>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="rounded-3xl border-2 border-[var(--primary)] bg-[var(--surface)] p-7 shadow-[var(--shadow-lg)] sm:p-9">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                Pack Lancement Partenaires
              </h2>
              <span className="rounded-full bg-[var(--primary)] px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white">
                Tout compris
              </span>
            </div>

            <p className="mt-5 font-display text-5xl font-bold tracking-tight sm:text-6xl">
              490 € <span className="text-2xl font-semibold text-[var(--muted)]">HT</span>
            </p>
            <p className="mt-2 text-lg font-semibold">
              pour 3 mois, payés une seule fois. Rien de plus.
            </p>

            <ul className="mt-7 space-y-3">
              {CONTENU.map((c) => (
                <li key={c} className="flex items-start gap-3 font-medium">
                  <Check size={20} aria-hidden strokeWidth={2.6} className="mt-0.5 flex-shrink-0 text-[var(--primary-ink)]" />
                  {c}
                </li>
              ))}
            </ul>

            <ul className="mt-7 grid gap-2 border-t border-[var(--border)] pt-6 sm:grid-cols-3">
              {BENEFICES.map((b) => (
                <li key={b} className="text-sm font-semibold leading-snug text-[var(--primary-ink)]">
                  {b}
                </li>
              ))}
            </ul>

            <p className="mt-7 rounded-2xl bg-[var(--surface-2)] px-5 py-4 text-sm text-[var(--muted-strong)]">
              Après 3 mois, vous continuez sur simple demande écrite&nbsp;:{' '}
              <span className="font-semibold text-[var(--foreground)]">149 € HT / mois</span>, sans
              engagement. Aucun rendez-vous dans le mois&nbsp;: le suivant n&apos;est pas facturé. Les 3 mois inclus sont payés d&apos;avance et non remboursables une fois le site livré&nbsp;: la garantie porte sur l&apos;abonnement mensuel qui suit.
            </p>

            <CtaRdv className="mt-6 w-full" />

            <a
              href="#packs"
              className="mt-5 flex flex-col gap-1 rounded-2xl border border-[var(--border)] px-5 py-4 text-sm transition-colors hover:border-[var(--primary)] sm:flex-row sm:items-center sm:justify-between"
            >
              <span className="text-[var(--muted-strong)]">
                Avec publicité Facebook et Instagram&nbsp;:{' '}
                {AUTRES.map((p, i) => (
                  <span key={p.key}>
                    {i > 0 && ' · '}
                    <span className="font-semibold text-[var(--foreground)]">
                      {p.short} {p.setup}&nbsp;€&nbsp;HT
                    </span>
                  </span>
                ))}
              </span>
              <span className="whitespace-nowrap font-semibold text-[var(--primary-ink)]">
                Voir les 3 packs →
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
