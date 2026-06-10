import { Compass, Cog, GraduationCap, Rocket } from 'lucide-react';

const STEPS = [
  {
    hour: 'H+0',
    icon: Compass,
    title: 'Audit & Cadrage',
    description:
      "30 min de call. On identifie le besoin métier, les sources de données, les SLA. Un brief technique sort en sortie.",
  },
  {
    hour: 'H+12',
    icon: Cog,
    title: 'Architecture',
    description:
      "Choix du modèle, des outils MCP, des tools fonctionnels. Pipeline d'évaluation conçu sur tes vraies données.",
  },
  {
    hour: 'H+30',
    icon: GraduationCap,
    title: 'Entraînement',
    description:
      "Fine-tuning sur ton corpus + RAG contextualisé. On itère contre le pipeline d'éval jusqu'au seuil de qualité défini.",
  },
  {
    hour: 'H+48',
    icon: Rocket,
    title: 'Mise en prod',
    description:
      "Déploiement sur ton infra (cloud ou on-prem), monitoring, alertes. Tu pilotes l'agent depuis un dashboard unique.",
  },
];

export default function Process() {
  return (
    <section id="process" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="eyebrow">De zéro à prod</p>
          <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            <span className="gradient-text">48 heures.</span> Pas 6 mois.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-balance text-[var(--muted)]">
            On ne vend pas un POC. On déploie un agent qui rentre en production le 3ème jour.
          </p>
        </div>

        <div className="relative">
          {/* Ligne de timeline (uniquement sur desktop) */}
          <div className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-[var(--border-strong)] to-transparent md:block" />

          <div className="grid gap-10 md:grid-cols-4">
            {STEPS.map(({ hour, icon: Icon, title, description }, i) => (
              <div key={i} className="relative flex flex-col">
                <div className="relative z-10 mb-6 flex items-center justify-center">
                  <div className="absolute inset-0 -m-2 rounded-full bg-[var(--primary-soft)] blur-xl" />
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[var(--surface-2)] ring-1 ring-[var(--border-strong)]">
                    <Icon size={22} className="text-[var(--primary-hover)]" strokeWidth={1.8} />
                  </div>
                </div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--primary)]">
                  {hour}
                </p>
                <h3 className="mt-1 text-xl font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm text-[var(--muted)]">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
