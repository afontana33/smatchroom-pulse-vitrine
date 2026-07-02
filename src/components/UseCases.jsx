import { Hammer, FileCheck, Search, ArrowUpRight } from 'lucide-react';

const CASES = [
  {
    icon: Hammer,
    target: 'Le Chasseur',
    angle: 'Prospection',
    title: 'Des partenaires d\'apport d\'affaires en pilote automatique.',
    metric: 'WhatsApp lissé · 0 blocage',
    description:
      "En production chez un couvreur à Lille : l'agent identifie syndics et agences, engage la conversation et relance, avec une cadence lissée qui protège le numéro.",
  },
  {
    icon: FileCheck,
    target: 'Le Gestionnaire',
    angle: 'Relance devis',
    title: 'Les devis en attente relancés au bon moment.',
    metric: 'Relances automatiques',
    description:
      "L'agent suit vos devis envoyés, relance les clients qui n'ont pas répondu et remonte les chantiers chauds. Fini les devis oubliés au fond de la boîte mail.",
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
    <section id="cas-usage" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="eyebrow">Cas d'usage · Déjà en production</p>
          <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            <span className="gradient-text">Nos agents tournent déjà</span> pour des artisans
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-balance text-[var(--muted)]">
            Chaque agent ci-dessous est en production aujourd'hui, sur infrastructure réelle.
            Pas de démo : des artisans du bâtiment qui s'en servent au quotidien.
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
