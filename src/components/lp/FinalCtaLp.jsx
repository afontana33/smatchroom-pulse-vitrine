'use client';

/**
 * Dernier appel.
 *
 * Photo pleine largeur, voile encre, deux chemins et pas un seul. Le créneau
 * Calendly ne suffit pas : une partie de la cible ne réserve jamais dans un
 * agenda, elle décroche. Le numéro est donc affiché en grand, à la taille d'un
 * titre, à côté du bouton. Pas de formulaire en revanche : trois chemins
 * commenceraient à se cannibaliser.
 */

import { ArrowRight, Phone } from 'lucide-react';
import { TEL_DISPLAY, TEL_HREF } from '@/components/Nav';

const CALENDLY = 'https://calendly.com/a-fontana-smatchroom/30min';

export default function FinalCtaLp() {
  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden">
      <img
        src="/photos/poignee-main.webp"
        alt="Poignée de main entre deux personnes en chemise dans un bureau"
        width={1800}
        height={1202}
        loading="lazy"
        decoding="async"
        className="h-[40rem] w-full object-cover object-center sm:h-[42rem]"
      />
      <div aria-hidden className="absolute inset-0 bg-[var(--ink)]/78" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_20%_10%,rgba(124,58,237,0.22),transparent_60%)]"
      />

      <div className="absolute inset-0 flex items-center px-5 sm:px-6">
        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-2xl">
            {/* Pas la classe .eyebrow ici : elle force var(--primary-ink), un
                orange sombre illisible sur la photo assombrie. */}
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.22em] text-[#c4b5fd]">
              15 minutes, gratuit et sans engagement
            </p>
            <h2 className="mt-5 text-balance text-3xl font-semibold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-[3.4rem]">
              On regarde votre secteur ensemble,{' '}
              <span className="font-serif-it font-normal text-[#c4b5fd]">
                et on vous dit ce qui est faisable.
              </span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              Vous repartez avec une idée claire du volume de clients atteignable près de chez
              vous et du budget que ça demande. Même si vous ne travaillez pas avec nous.
            </p>

            {/* Le numéro d'abord, en taille de titre : c'est le chemin le plus court
                pour quelqu'un qui est déjà convaincu. Ne pas le réduire en petite
                ligne sous le bouton. */}
            <a
              href={TEL_HREF}
              className="group mt-8 inline-flex items-center gap-4 text-white transition-colors hover:text-[#c4b5fd]"
            >
              <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[var(--primary)] shadow-[0_10px_30px_-8px_rgba(124,58,237,0.7)] sm:h-14 sm:w-14">
                <Phone size={22} strokeWidth={2.4} className="text-white" />
              </span>
              <span>
                <span className="block font-mono text-[0.66rem] uppercase tracking-[0.2em] text-white/60">
                  Appelez-nous directement
                </span>
                <span className="block font-display text-[1.9rem] font-bold leading-tight tracking-tight sm:text-[2.6rem]">
                  {TEL_DISPLAY}
                </span>
              </span>
            </a>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 px-7 py-4 text-sm font-semibold sm:text-base"
              >
                Réserver mon créneau gratuit de 15 min
                <ArrowRight size={17} />
              </a>
              <span className="text-sm text-white/60">Du lundi au vendredi, 9h à 19h</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
