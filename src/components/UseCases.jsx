import { Hammer, FileCheck, Search, ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal';

const CASES = [
  {
    icon: Hammer,
    target: 'Le Chasseur',
    angle: 'Prospection',
    title: "Des partenaires d'apport d'affaires en pilote automatique.",
    metric: 'WhatsApp lissé · 0 blocage',
    description:
      "En production chez des artisans du bâtiment : l'agent identifie syndics, agences et maîtres d'œuvre, engage la conversation et relance, avec une cadence lissée qui protège le numéro.",
  },
  {
    icon: FileCheck,
    target: 'Le Gestionnaire',
    angle: 'Relance devis',
    title: 'Les devis en attente relancés au bon moment.',
    metric: 'Relances automatiques',
    description:
      "L'agent suit vos devis envoyés, relance les clients sans réponse et remonte les chantiers chauds. Fini les devis oubliés au fond de la boîte mail.",
  },
  {
    icon: Search,
    target: 'Le Visiteur',
    angle: 'SEO local',
    title: 'Trouvé sur Google sur vos requêtes métier.',
    metric: '~3 articles/semaine en autonomie',
    description:
      "En production sur un site d'artisan : publication autonome de contenu optimisé et réponses aux avis, pour remonter dans les recherches locales de votre zone.",
  },
];

export default function UseCases() {
  return (
    <section id="cas-usage" className="relative px-5 py-24 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-6 flex items-center gap-4">
            <span className="section-index">05 — Déjà en production</span>
            <span className="h-px flex-1 bg-[var(--border-strong)]" />
          </div>
        </Reveal>

        <Reveal>
          <div className="mb-14 max-w-2xl">
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              <span className="gradient-text">Nos agents tournent déjà</span> sur le terrain.
            </h2>
            <p className="mt-4 text-balance text-[var(--muted-strong)] sm:text-lg">
              Chaque agent ci-dessous est en production aujourd&apos;hui, sur infrastructure réelle.
              Pas de démo : des pros du bâtiment qui s&apos;en servent au quotidien.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3">
          {CASES.map(({ icon: Icon, target, angle, title, metric, description }, i) => (
            <Reveal key={title} delay={i * 90}>
              <article className="card card-hover group flex h-full flex-col p-6 sm:p-7">
                <div className="mb-5 flex items-center justify-between">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary-soft)] text-[var(--primary-ink)] ring-1 ring-[var(--primary-line)]">
                    <Icon size={20} strokeWidth={1.8} />
                  </div>
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[var(--muted)]">
                    {angle}
                  </span>
                </div>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--primary-ink)]">
                  {target}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-[var(--foreground)]">{title}</h3>
                <p className="mt-3 flex-1 text-sm text-[var(--muted-strong)]">{description}</p>
                <div className="mt-6 flex items-center justify-between border-t border-[var(--border)] pt-4">
                  <span className="font-mono text-sm font-medium text-[var(--foreground)]">{metric}</span>
                  <ArrowUpRight
                    size={16}
                    className="text-[var(--primary-ink)] opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                  />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
