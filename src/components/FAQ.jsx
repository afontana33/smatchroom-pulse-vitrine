'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const QUESTIONS = [
  {
    q: "Concrètement, c'est quoi un agent IA Pulse ?",
    a: "Un programme autonome qui exécute une mission métier (SEO, Sales, Marketing) en utilisant des outils (APIs, CRMs, search, code). Il n'attend pas un prompt humain à chaque tâche : il observe, décide, agit, et rend compte. Pulse construit, entraîne et déploie ces agents sur ton infra.",
  },
  {
    q: "Quels modèles utilisez-vous ?",
    a: "On choisit le modèle selon la mission : Claude pour le raisonnement long et la production de contenu, GPT pour les tools complexes, Mistral pour les déploiements souverains, et des modèles locaux (Llama, Qwen) pour les cas on-premise. Tout est interchangeable.",
  },
  {
    q: "Mes données quittent-elles mon SI ?",
    a: "Par défaut non. Les agents tournent sur ton cloud (AWS, GCP, OVH, Scaleway) ou ton on-premise. On ne logge que des métriques anonymisées chez nous, et tu peux désactiver même ça. Pour les pilotes, on peut héberger côté Pulse avec un DPA en bonne et due forme.",
  },
  {
    q: "Pourquoi 48h et pas 2 semaines ?",
    a: "Parce qu'on a une bibliothèque d'agents pré-architecturés. Le travail n'est pas de partir de zéro : c'est d'adapter une base éprouvée à ton contexte (data, ton, intégrations). Les 48h sont chronométrées : audit J1 matin, archi J1 après-midi, entraînement J2, prod J3 matin.",
  },
  {
    q: "Que se passe-t-il après les 48h ?",
    a: "Tu peux gérer l'agent toi-même (on livre la doc et l'accès au dashboard) ou nous laisser le pilotage. La plupart de nos clients commencent en autonomie et reviennent vers nous au 1er pivot métier (nouvelle source de données, nouveau canal, etc.).",
  },
  {
    q: "Et si l'agent ne convient pas ?",
    a: "On refuse les missions qu'on ne pense pas pouvoir réussir. Pour celles qu'on prend, le pilote a un seuil de qualité contractuel sur ton pipeline d'évaluation. Si on ne l'atteint pas en 48h, on continue jusqu'à l'atteindre — sans surcoût.",
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
