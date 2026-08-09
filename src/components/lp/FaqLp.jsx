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

const QUESTIONS = [
  {
    q: "Je ne suis pas à l'aise avec l'informatique. C'est compliqué ?",
    a: "Non, et c'est le cas de la majorité de nos clients. On s'occupe de tout : mise en place, paramétrage, mise en route. De votre côté, vous avez un tableau de bord simple sur votre téléphone pour voir qui a été contacté et qui a répondu. Si quelque chose cloche, vous appelez le " +
      TEL_DISPLAY +
      ", vous tombez sur nous, pas sur un support.",
  },
  {
    q: 'Vous garantissez des résultats ?',
    a: "Non, et personne de sérieux ne peut le faire : le nombre de chantiers dépend aussi de votre zone, de vos prix et de votre façon de rappeler. Ce qu'on garantit, c'est le travail : le volume de contacts convenu part vraiment, les réponses sont traitées en moins d'une minute, et vous voyez tout dans le tableau de bord. Si le discours ne prend pas, on le réécrit sans surcoût. On préfère refuser une mission qu'on ne pense pas pouvoir réussir plutôt que de promettre un chiffre.",
  },
  {
    q: 'Et si ça ne me convient pas ?',
    a: "Vous arrêtez. La formule à la carte est sans engagement : vous prévenez, le mois suivant n'est pas prélevé, et vous gardez ce qui a été produit (votre site, votre fiche Google, vos contacts). Si vous avez pris la formule Partenaire à 6 mois, c'est le seul cas où vous êtes tenu, et c'est justement en échange des 300 € de création offerts.",
  },
  {
    q: 'Concrètement, la première semaine, il se passe quoi ?',
    a: "Un appel de 30 minutes pour cadrer votre zone, vos métiers cibles et votre discours. Ensuite on construit votre agent sur une base déjà éprouvée chez d'autres entreprises, on vous fait valider les messages avant le premier envoi, puis on met en route en douceur. Vous ne signez rien avant d'avoir lu ce qui va partir en votre nom.",
  },
  {
    q: 'Ça marche avec WhatsApp ? Je risque un blocage de mon numéro ?',
    a: "La prospection passe par WhatsApp et par email. Le risque de blocage existe si on envoie fort dès le premier jour, donc on ne le fait pas : montée en charge progressive, cadence lissée, jamais de rafales, et un numéro dédié plutôt que le vôtre si vous préférez. C'est exactement pour ça qu'on développe nos propres agents au lieu d'utiliser un outil d'envoi de masse.",
  },
  {
    q: "Est-ce que les gens savent qu'ils parlent à une IA ?",
    a: "Oui, et c'est obligatoire. Depuis le 2 août 2026, l'article 50 du règlement européen sur l'IA impose d'informer toute personne qui interagit avec un système d'IA. Nos agents l'indiquent dès le premier message, permettent de s'y opposer en répondant STOP et de basculer sur un humain en répondant HUMAIN. Cette mention ne peut pas être retirée à la demande d'un client : c'est écrit dans nos conditions de service.",
  },
  {
    q: "Je peux ne prendre qu'une seule brique ?",
    a: "Oui, les trois se prennent séparément et beaucoup commencent par l'agent seul. Si vous en voulez deux ou trois, on fait un devis packagé moins cher que la somme des briques.",
  },
  {
    q: 'Mes données et celles de mes clients sont-elles protégées ?',
    a: "Oui. Votre agent tourne sur une infrastructure dédiée, pas sur un logiciel mutualisé, et les données d'un client ne sont jamais mélangées avec celles d'un autre. Un accord de traitement des données conforme à l'article 28 du RGPD est annexé au contrat et signé systématiquement.",
  },
];

function Item({ q, a, open, onToggle }) {
  return (
    <div className="border-b border-[var(--border)] last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-5 py-5 text-left transition-colors hover:text-[var(--primary-ink)]"
        aria-expanded={open}
      >
        <span className="text-base font-semibold text-[var(--foreground)] sm:text-lg">{q}</span>
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
          <p className="max-w-3xl leading-relaxed text-[var(--muted-strong)]">{a}</p>
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
