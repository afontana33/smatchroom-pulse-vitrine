'use client';

/**
 * Questions avant de réserver.
 *
 * Remise sur la landing après avoir été retirée par erreur : ce ne sont pas des
 * questions de documentation produit, ce sont les trois objections qui font
 * reporter la prise de rendez-vous (« je ne suis pas à l'aise avec
 * l'informatique », « vous garantissez des résultats », « et si ça ne me
 * convient pas »). Sans réponse sur la page, le visiteur repart sans cliquer.
 *
 * Deux contraintes à ne pas casser :
 *   1. aucune promesse de résultat chiffrée, on n'en a pas le droit et on ne
 *      tiendrait pas ;
 *   2. la réponse sur la mention IA doit rester exacte (art. 50 du règlement
 *      européen sur l'IA), c'est la même formulation que dans les CGV.
 */

import { useState } from 'react';
import { Plus, Minus, Phone } from 'lucide-react';
import { TEL_DISPLAY, TEL_HREF } from '@/components/Nav';
/* Les questions vivent dans lib/faq.js : le bloc FAQPage en données
   structurées lit le même tableau. Deux copies divergeraient, et une FAQPage
   dont les réponses ne sont pas visibles à l'identique sur la page perd son
   extrait enrichi. */
import { QUESTIONS } from '@/lib/faq';
import { fineSpaces } from '@/lib/typo';

function Item({ q, a, open, onToggle }) {
  return (
    <div className="border-b border-[var(--border)] last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-5 py-5 text-left transition-colors hover:text-[var(--primary-ink)]"
        aria-expanded={open}
      >
        <span className="text-base font-semibold text-[var(--foreground)] sm:text-lg">{fineSpaces(q)}</span>
        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-[var(--border-strong)] text-[var(--primary-ink)]">
          {open ? <Minus size={16} /> : <Plus size={16} />}
        </span>
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-300 ${
          open ? 'grid-rows-[1fr] pb-5' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <p className="max-w-3xl leading-relaxed text-[var(--muted-strong)]">{fineSpaces(a)}</p>
        </div>
      </div>
    </div>
  );
}

export default function FaqLp() {
  const [open, setOpen] = useState(0);

  return (
    <section id="questions" className="relative scroll-mt-24 px-5 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 flex items-center gap-4">
          <span className="section-index">Questions</span>
          <span className="h-px flex-1 bg-[var(--border-strong)]" />
        </div>

        <h2 className="mb-12 text-balance text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-[3.1rem]">
          Avant de réserver,{' '}
          <span className="font-serif-it font-normal text-[var(--primary-ink)]">
            ce qu&apos;on nous demande à chaque fois.
          </span>
        </h2>

        <div className="card px-6 sm:px-9">
          {QUESTIONS.map((item, i) => (
            <Item
              key={item.q}
              q={item.q}
              a={item.a}
              open={open === i}
              onToggle={() => setOpen(open === i ? -1 : i)}
            />
          ))}
        </div>

        <p className="mt-8 text-center text-[0.98rem] text-[var(--muted-strong)]">
          Votre question n&apos;y est pas&nbsp;?{' '}
          <a
            href={TEL_HREF}
            className="inline-flex items-center gap-1.5 font-bold text-[var(--primary-ink)] underline-offset-4 hover:underline"
          >
            <Phone size={15} strokeWidth={2.5} />
            {TEL_DISPLAY}
          </a>
        </p>
      </div>
    </section>
  );
}
