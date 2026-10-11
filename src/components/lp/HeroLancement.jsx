/**
 * Hero de conversion : l'offre d'entrée (Pack Lancement) est visible sans
 * scroller, avec son prix, son contenu et le bouton de rendez-vous.
 *
 * Remplace HeroLp + Packs sur l'accueil. Les preuves suivent immédiatement :
 * ne rien intercaler entre ce bloc et #resultats.
 */

import { ArrowRight, Check, Phone, Star } from 'lucide-react';
import { CALENDLY, TEL_DISPLAY, TEL_HREF } from '@/lib/contact';

const CONTENU = [
  'Votre site internet, clair et rapide sur téléphone',
  'Votre fiche Google créée et remplie',
  '3 mois d’agent de prospection par WhatsApp et email',
];

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
      className={`btn-primary inline-flex items-center justify-center gap-2.5 px-8 py-5 text-base font-bold shadow-[0_14px_40px_-10px_rgba(255,90,31,0.75)] sm:text-lg ${className}`}
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
          <p className="eyebrow">Artisans · TPE · PME</p>
          <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.04] tracking-tight sm:text-5xl lg:text-[3.8rem]">
            Vos meilleurs clients ne vous cherchent pas.{' '}
            <span className="font-serif-it font-normal text-[var(--primary-ink)]">
              On va les chercher.
            </span>
          </h1>
          <p className="mt-4 max-w-lg text-lg sm:mt-6 leading-relaxed text-[var(--muted-strong)]">
            Vous êtes sur le terrain, on vous ramène les rendez-vous.
          </p>

          <div className="hidden sm:block">
            <CtaRdv className="mt-8" />
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-[var(--muted-strong)]">
            <a href={TEL_HREF} className="inline-flex items-center gap-2 font-semibold text-[var(--foreground)]">
              <Phone size={16} aria-hidden className="text-[var(--primary-ink)]" />
              {TEL_DISPLAY}
            </a>
            <a href="#avis" className="inline-flex items-center gap-1.5">
              <Star size={16} aria-hidden className="fill-[var(--primary)] text-[var(--primary)]" />
              <span className="font-semibold text-[var(--foreground)]">5,0</span> sur Google
            </a>
            <a href="#resultats">+90 entreprises accompagnées</a>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="rounded-3xl border-2 border-[var(--primary)] bg-[var(--surface)] p-7 shadow-[var(--shadow-lg)] sm:p-9">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                Pack Lancement
              </h2>
              <span className="rounded-full bg-[var(--primary)] px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white">
                3 mois inclus
              </span>
            </div>

            <p className="mt-5 font-display text-5xl font-bold tracking-tight sm:text-6xl">
              490 € <span className="text-2xl font-semibold text-[var(--muted)]">HT</span>
            </p>
            <p className="mt-2 text-[var(--muted-strong)]">
              en une fois, puis 149 € HT / mois si vous continuez
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

            <CtaRdv className="mt-8 w-full" />
            <p className="mt-3 text-center text-xs text-[var(--muted)]">
              Sans engagement après les 3 mois
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
