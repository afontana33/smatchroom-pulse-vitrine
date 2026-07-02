'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const QUESTIONS = [
  {
    q: "Je suis artisan du bâtiment. C'est fait pour moi ?",
    a: "Oui, c'est exactement notre cible. Nos agents sont déjà en production chez des artisans du bâtiment (couverture, isolation, rénovation). Ils s'occupent de trouver des chantiers, relancer vos devis et gérer l'administratif pendant que vous êtes sur le terrain.",
  },
  {
    q: "Concrètement, un agent IA pour mon activité, ça fait quoi ?",
    a: "C'est un programme qui travaille pour vous en continu, sans surveillance. Exemples : il contacte des syndics et agences pour vous apporter des chantiers, il relance par message les devis sans réponse, il répond aux avis Google, il vérifie les attestations avant un chantier. Vous n'avez pas à lui dire quoi faire à chaque fois.",
  },
  {
    q: "Je ne suis pas à l'aise avec l'informatique. C'est compliqué ?",
    a: "Non. On s'occupe de tout : mise en place, paramétrage, mise en route. Vous avez un tableau de bord simple, accessible depuis votre téléphone, pour voir ce que fait l'agent. Si quelque chose cloche, vous nous appelez.",
  },
  {
    q: "Ça marche avec WhatsApp ? Je risque un blocage de mon numéro ?",
    a: "Oui, la prospection et les relances passent par WhatsApp. On protège votre numéro avec une montée en charge progressive et une cadence lissée (jamais de rafales). C'est justement pour ça qu'on code nos propres agents plutôt que d'utiliser un outil d'envoi de masse.",
  },
  {
    q: "Mes données et celles de mes clients sont-elles protégées ?",
    a: "Oui. Les agents tournent sur une infrastructure dédiée, pas sur un SaaS générique. On ne conserve que des métriques anonymisées, et on peut signer un accord de traitement des données (DPA) si vous le souhaitez.",
  },
  {
    q: "Pourquoi 48h et pas plusieurs semaines ?",
    a: "Parce qu'on part d'une bibliothèque d'agents déjà éprouvés. Le travail n'est pas de repartir de zéro, mais d'adapter une base solide à votre métier : votre zone, vos clients, vos partenaires. Audit le 1er jour, conception et entraînement le 2e, mise en production le 3e.",
  },
  {
    q: "Je peux prendre un seul agent, ou il faut tout prendre ?",
    a: "Un seul suffit. Vous composez votre équipe à la carte : commencez par l'agent qui vous soulage le plus (souvent Le Chasseur ou Le Gestionnaire), et ajoutez-en d'autres quand vous voyez les résultats.",
  },
  {
    q: "Et si ça ne me convient pas ?",
    a: "On refuse les missions qu'on ne pense pas pouvoir réussir. Pour celles qu'on prend, on cadre un objectif clair dès le départ. Si l'agent n'est pas au niveau à la mise en route, on continue de l'affiner sans surcoût jusqu'à ce qu'il le soit.",
  },
];

function Item({ q, a, open, onToggle }) {
  return (
    <div className="border-b border-[var(--border)]">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-[var(--primary-hover)]"
      >
        <span className="text-lg font-medium text-white">{q}</span>
        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-[var(--border-strong)] text-[var(--primary-hover)]">
          {open ? <Minus size={16} /> : <Plus size={16} />}
        </span>
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-300 ${
          open ? 'grid-rows-[1fr] pb-6' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <p className="max-w-3xl text-[var(--muted)]">{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="relative py-32 px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <p className="eyebrow">Questions fréquentes</p>
          <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            <span className="gradient-text">Avant de réserver</span>
          </h2>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/40 px-6 backdrop-blur md:px-10">
          {QUESTIONS.map((item, i) => (
            <Item
              key={i}
              q={item.q}
              a={item.a}
              open={open === i}
              onToggle={() => setOpen(open === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
