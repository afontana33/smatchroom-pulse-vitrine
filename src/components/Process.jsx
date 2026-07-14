import { Compass, Cog, GraduationCap, Rocket } from 'lucide-react';
import Reveal from './Reveal';

const STEPS = [
  {
    hour: 'H+0',
    icon: Compass,
    title: 'Audit & Cadrage',
    description:
      "30 min de visio. On comprend votre activité, ce qui vous prend du temps (devis, prospection, relances) et ce qu'on peut automatiser. On vous dit honnêtement si on peut aider.",
  },
  {
    hour: 'H+12',
    icon: Cog,
    title: 'Conception',
    description:
      "On choisit l'agent adapté à votre métier. Il est conçu à partir de vos vraies données : votre zone, vos clients types, vos partenaires.",
  },
  {
    hour: 'H+30',
    icon: GraduationCap,
    title: 'Apprentissage',
    description:
      "L'agent apprend votre métier, votre ton, vos clients. On affine jusqu'à ce que le résultat tienne la route sur le terrain. Pas avant.",
  },
  {
    hour: 'H+48',
    icon: Rocket,
    title: 'Mise en route',
    description:
      "L'agent est déployé et opérationnel. Vous le pilotez depuis un tableau de bord simple, sur votre téléphone. On reste disponibles.",
  },
];

export default function Process() {
  return (
    <section id="process" className="relative px-5 py-24 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-6 flex items-center gap-4">
            <span className="section-index">04 — De zéro à prod</span>
            <span className="h-px flex-1 bg-[var(--border-strong)]" />
          </div>
        </Reveal>

        <Reveal>
          <div className="mb-14 max-w-2xl">
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              <span className="gradient-text">48 heures.</span> Pas 6 mois.
            </h2>
            <p className="mt-4 text-balance text-[var(--muted-strong)] sm:text-lg">
              On ne vend pas un POC. On déploie un agent qui rentre en production le 3ᵉ jour,
              pendant que vous continuez vos chantiers.
            </p>
          </div>
        </Reveal>

        <div className="relative">
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-[var(--primary-line)] to-transparent md:block" />
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            {STEPS.map(({ hour, icon: Icon, title, description }, i) => (
              <Reveal key={i} delay={i * 90}>
                <div className="relative flex flex-col">
                  <div className="relative z-10 mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--surface)] text-[var(--primary-ink)] shadow-md ring-1 ring-[var(--primary-line)]">
                    <Icon size={22} strokeWidth={1.8} />
                  </div>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--primary-ink)]">
                    {hour}
                  </p>
                  <h3 className="mt-1 text-xl font-semibold text-[var(--foreground)]">{title}</h3>
                  <p className="mt-2 text-sm text-[var(--muted-strong)]">{description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
