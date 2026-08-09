'use client';

/**
 * Dernier appel.
 *
 * Photo pleine largeur, voile encre, une seule action. Pas de formulaire :
 * le seul chemin de conversion de la page est le créneau Calendly, et un
 * deuxième chemin concurrent ferait baisser les deux.
 */

import { ArrowRight } from 'lucide-react';

const CALENDLY = 'https://calendly.com/a-fontana-smatchroom/30min';

export default function FinalCtaLp() {
  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden">
      <img
        src="/photos/charpente.webp"
        alt="Charpentier au travail sur une charpente en bois, ciel dégagé"
        width={1600}
        height={1067}
        loading="lazy"
        decoding="async"
        className="h-[34rem] w-full object-cover object-center sm:h-[38rem]"
      />
      <div aria-hidden className="absolute inset-0 bg-[var(--ink)]/78" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_20%_10%,rgba(255,90,31,0.22),transparent_60%)]"
      />

      <div className="absolute inset-0 flex items-center px-5 sm:px-6">
        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-2xl">
            {/* Pas la classe .eyebrow ici : elle force var(--primary-ink), un
                orange sombre illisible sur la photo assombrie. */}
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.22em] text-[#ffb27a]">
              30 minutes, sans engagement
            </p>
            <h2 className="mt-5 text-balance text-3xl font-semibold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-[3.4rem]">
              On regarde votre secteur ensemble,{' '}
              <span className="font-serif-it font-normal text-[#ffb27a]">
                et on vous dit ce qui est faisable.
              </span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              Vous repartez avec une idée claire du volume de clients atteignable près de chez
              vous et du budget que ça demande. Même si vous ne travaillez pas avec nous.
            </p>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-9 inline-flex items-center gap-2 px-7 py-4 text-sm font-semibold sm:text-base"
            >
              Réserver mon créneau
              <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
