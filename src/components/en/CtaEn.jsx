'use client';

/**
 * Dernier appel, en anglais.
 *
 * Même dispositif que le français : deux chemins, le numéro en taille de
 * titre à côté du bouton Calendly, et pas de formulaire. Un troisième chemin
 * commencerait à cannibaliser les deux autres.
 *
 * Les horaires sont annoncés en heure de Paris : un visiteur anglophone n'a
 * aucune raison de deviner le fuseau d'une entreprise bordelaise, et
 * « 9h à 19h » sans fuseau fait manquer des appels.
 */

import { ArrowRight, Phone } from 'lucide-react';
import { CALENDLY, TEL_DISPLAY_INTL, TEL_HREF } from '@/lib/contact';

export default function CtaEn() {
  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden">
      <img
        src="/photos/charpente.webp"
        alt="Carpenter at work on a timber roof frame under a clear sky"
        width={1600}
        height={1067}
        loading="lazy"
        decoding="async"
        className="h-[40rem] w-full object-cover object-center sm:h-[42rem]"
      />
      <div aria-hidden className="absolute inset-0 bg-[var(--ink)]/78" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_20%_10%,rgba(124, 58, 237,0.22),transparent_60%)]"
      />

      <div className="absolute inset-0 flex items-center px-5 sm:px-6">
        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-2xl">
            {/* Pas la classe .eyebrow ici : elle force var(--primary-ink), un
                orange sombre illisible sur la photo assombrie. */}
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.22em] text-[#c4b5fd]">
              30 minutes, no commitment
            </p>
            <h2 className="mt-5 text-balance text-3xl font-semibold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-[3.4rem]">
              We look at your market together,{' '}
              <span className="font-serif-it font-normal text-[#c4b5fd]">
                and we tell you what is actually doable.
              </span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              You leave with a clear view of how many reachable accounts your market holds and
              what it would cost to work them. Even if you never become a client.
            </p>

            <a
              href={TEL_HREF}
              className="group mt-8 inline-flex items-center gap-4 text-white transition-colors hover:text-[#c4b5fd]"
            >
              <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[var(--primary)] shadow-[0_10px_30px_-8px_rgba(124, 58, 237,0.7)] sm:h-14 sm:w-14">
                <Phone size={22} strokeWidth={2.4} className="text-white" />
              </span>
              <span>
                <span className="block font-mono text-[0.66rem] uppercase tracking-[0.2em] text-white/60">
                  Call us directly
                </span>
                <span className="block font-display text-[1.9rem] font-bold leading-tight tracking-tight sm:text-[2.6rem]">
                  {TEL_DISPLAY_INTL}
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
                Or book a slot
                <ArrowRight size={17} />
              </a>
              <span className="text-sm text-white/60">Monday to Friday, 9am to 7pm Paris time</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
