import { Building2, Utensils, Users, ArrowUpRight } from 'lucide-react';

const CASES = [
  {
    icon: Utensils,
    target: 'Émargeo',
    angle: 'Restauration',
    title: "Le système d'exploitation unifié pour restaurateurs.",
    metric: 'Food Cost stabilisé à 28%',
    description:
      "Intégration de l'assistant vocal ARIA et de 12 modules opérationnels sans surcoût (Planning IA, Pointage QR, HACCP/DLC, Stocks, Prépa-Paie HCR). Élimination de la SaaS-fatigue.",
  },
  {
    icon: Building2,
    target: 'SmatchRoom Pro',
    angle: 'Immobilier',
    title: 'Le sas de sécurité locative automatisé.',
    metric: '−70% de visites physiques inutiles',
    description:
      "Pré-qualification, scoring documentaire prédictif et filtrage anti-touriste des dossiers candidats. Le bailleur ne rencontre plus que des candidats qualifiés.",
  },
  {
    icon: Users,
    target: 'SmatchRoom App',
    angle: 'Colocation',
    title: 'Le Ghost Profiling™ comportemental.',
    metric: '92% de taux de maintien à 6 mois',
    description:
      "Algorithme de matching psycho-comportemental sans questionnaire intrusif pour garantir la stabilité des colocations. Compatibilité de vie, pas le CSP.",
  },
];

export default function UseCases() {
  return (
    <section id="cas-usage" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="eyebrow">Cas d'usage · Déjà en production</p>
          <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            <span className="gradient-text">Notre écosystème propriétaire</span> comme preuve de concept industrielle
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-balance text-[var(--muted)]">
            Pulse a d'abord construit ses agents pour propulser nos propres filiales. Chaque
            cas d'usage tourne en production aujourd'hui, sur infrastructure réelle, avec des
            métriques mesurables.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {CASES.map(({ icon: Icon, target, angle, title, metric, description }) => (
            <article
              key={title}
              className="glass glass-hover group flex flex-col rounded-2xl p-7"
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary-soft)] text-[var(--primary-hover)] ring-1 ring-[var(--border-strong)]">
                  <Icon size={20} strokeWidth={1.8} />
                </div>
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[var(--muted)]">
                  {angle}
                </span>
              </div>
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--primary)]">
                {target}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-white">{title}</h3>
              <p className="mt-3 text-sm text-[var(--muted)]">{description}</p>
              <div className="mt-6 flex items-center justify-between border-t border-[var(--border)] pt-4">
                <span className="font-mono text-sm font-medium text-white">{metric}</span>
                <ArrowUpRight
                  size={16}
                  className="text-[var(--primary-hover)] opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
