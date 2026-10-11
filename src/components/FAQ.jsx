'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const QUESTIONS = [
  {
    q: "Je suis artisan du bâtiment. C'est fait pour moi ?",
    a: "Oui, c'est exactement notre cible. Notre agent est déjà en production chez des artisans du bâtiment (couverture, isolation, rénovation). Ils s'occupent de trouver des chantiers, relancer vos devis et gérer l'administratif pendant que vous êtes sur le terrain.",
  },
  {
    q: "Je suis une PME/ETI, quelle est la différence avec l'Agent Clients B2B ?",
    a: "L'Agent Chasseur, le site et l'acquisition Meta sont pensés pour les artisans et TPE. L'Agent Clients B2B (paliers Solo, Équipe et Réseau, à partir de 340 € HT par mois) est un SDR IA pour les PME/ETI qui veulent ouvrir de gros comptes (promoteurs, gestionnaires de parcs, majors). Entraîné sur votre vocabulaire technique et vos objections, il cible les décideurs précis et passe le relais à vos commerciaux dès qu'un prospect est chaud.",
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
    a: "Oui. L'agent tourne sur une infrastructure dédiée, pas sur un SaaS générique, et les données d'un client ne sont jamais mutualisées avec celles d'un autre. Un accord de traitement des données (DPA) conforme à l'article 28 du RGPD est annexé au contrat et signé systématiquement : ce n'est pas une option, c'est une obligation dès lors qu'on traite des données pour votre compte.",
  },
  {
    q: "Est-ce que les gens savent qu'ils parlent à une IA ?",
    a: "Oui, et c'est obligatoire. Depuis le 2 août 2026, l'article 50 du règlement européen sur l'IA impose d'informer toute personne qui interagit avec un système d'IA. Nos agents l'indiquent dès le premier message, permettent de s'y opposer en répondant « STOP » et de basculer sur un humain en répondant « HUMAIN ». Cette mention ne peut pas être retirée à la demande d'un client : c'est écrit dans nos conditions de service.",
  },
  {
    q: "Pourquoi 48h et pas plusieurs semaines ?",
    a: "Parce qu'on part d'un agent déjà éprouvé chez d'autres entreprises. Le travail n'est pas de repartir de zéro, mais d'adapter une base solide à votre métier : votre zone, vos clients, vos partenaires. Audit le 1er jour, conception et entraînement le 2e, mise en production le 3e.",
  },
  {
    q: "Et si ça ne me convient pas ?",
    a: "On refuse les missions qu'on ne pense pas pouvoir réussir. Pour celles qu'on prend, on cadre un objectif clair dès le départ. Si l'agent n'est pas au niveau à la mise en route, on continue de l'affiner sans surcoût jusqu'à ce qu'il le soit.",
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
      <div className={`grid overflow-hidden transition-all duration-300 ${open ? 'grid-rows-[1fr] pb-5' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <p className="max-w-3xl text-[var(--muted-strong)]">{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="relative px-5 py-24 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 flex items-center gap-4">
          <span className="section-index">Questions</span>
          <span className="h-px flex-1 bg-[var(--border-strong)]" />
        </div>
        <h2 className="mb-10 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          <span className="gradient-text">Avant de réserver</span>
        </h2>

        <div className="card px-6 sm:px-9">
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
