import { ArrowRight, Search, ShoppingCart, FileCheck, MapPin, Headphones, ShieldCheck } from 'lucide-react';

const CALENDLY = 'https://calendly.com/a-fontana-smatchroom/30min';

const AGENTS = [
  {
    icon: Search,
    name: 'Le Chasseur',
    role: 'Prospection de partenaires B2B (syndics, agences…)',
    setup: 490,
    mrr: 190,
    highlighted: true,
  },
  {
    icon: ShoppingCart,
    name: "L'Acheteur",
    role: 'Analyse et comparaison des prix fournisseurs / devis',
    setup: 490,
    mrr: 190,
    highlighted: false,
  },
  {
    icon: FileCheck,
    name: 'Le Gestionnaire',
    role: 'Suivi et relance des devis en attente',
    setup: 390,
    mrr: 190,
    highlighted: false,
  },
  {
    icon: MapPin,
    name: 'Le Visiteur',
    role: 'SEO local et réponses aux avis Google',
    setup: 290,
    mrr: 149,
    highlighted: false,
  },
  {
    icon: Headphones,
    name: "L'Accueil 24/7",
    role: 'Prise en charge et qualification des leads entrants',
    setup: 290,
    mrr: 149,
    highlighted: false,
  },
  {
    icon: ShieldCheck,
    name: 'Le Contrôleur',
    role: 'Conformité, attestations URSSAF / décennale',
    setup: 290,
    mrr: 129,
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <section id="tarifs" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="eyebrow">Tarifs</p>
          <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            <span className="gradient-text">Vos agents, à l'unité.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-[var(--muted)]">
            Vous composez votre équipe. Un agent, plusieurs, ou un pack :
            chaque collaborateur numérique a son rôle et son tarif clairs.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {AGENTS.map(({ icon: Icon, name, role, setup, mrr, highlighted }) => (
            <div
              key={name}
              className={[
                'glass glass-hover relative flex flex-col rounded-2xl p-7',
                highlighted ? 'ring-1 ring-[var(--primary)]' : '',
              ].join(' ')}
            >
              {highlighted && (
                <span className="absolute right-5 top-5 rounded-full bg-[var(--primary)] px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-black">
                  Le + demandé
                </span>
              )}
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary-soft)] text-[var(--primary-hover)] ring-1 ring-[var(--border-strong)]">
                <Icon size={22} strokeWidth={1.8} />
              </div>
              <h3 className="text-2xl font-semibold tracking-tight text-white">{name}</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">{role}</p>

              <div className="mt-6 flex items-end gap-4 border-t border-[var(--border)] pt-6">
                <div>
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[var(--muted)]">
                    Installation
                  </p>
                  <p className="font-mono text-xl font-semibold text-white">{setup} €</p>
                </div>
                <div>
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[var(--muted)]">
                    Par mois
                  </p>
                  <p className="font-mono text-xl font-semibold text-[var(--primary-hover)]">{mrr} €</p>
                </div>
              </div>

              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border-strong)] px-5 py-3 text-sm font-medium text-white transition-all hover:border-[var(--primary)] hover:bg-white/5"
              >
                Choisir cet agent
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          ))}
        </div>

        {/* Bandeau offre */}
        <div className="glass relative mt-8 overflow-hidden rounded-2xl p-8 md:p-10">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_30%,var(--primary-soft),transparent_60%)]"
          />
          <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--primary)]">
                Offre de lancement
              </p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                Installation facilitée sur les agents à 490 €
              </h3>
              <p className="mt-3 max-w-2xl text-sm text-[var(--muted)] md:text-base">
                Sur les agents ou packs à 490 € d'installation : payez{' '}
                <span className="font-medium text-white">290 € pendant 20 jours, puis 200 €</span>.
                Et tous les abonnements ne démarrent que{' '}
                <span className="font-medium text-white">le mois suivant</span> la mise en service.
              </p>
            </div>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex flex-shrink-0 items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-6 py-3 font-medium text-black transition-all hover:bg-[var(--primary-hover)] hover:shadow-[0_0_40px_-5px_var(--primary-glow)]"
            >
              En profiter
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
