import { ArrowRight, Check, Package, Rocket, Building2, Calendar } from 'lucide-react';

export const metadata = {
  title: 'Pulse pour les entreprises et PME — SmatchRoom Pulse',
  description:
    "Pulse conçoit et déploie des agents IA sur-mesure pour les PME et structures qui veulent industrialiser leur SEO, leur prospection ou leurs opérations. Diagnostic de cadrage offert.",
  openGraph: {
    title: 'Pulse pour les entreprises et PME',
    description:
      "Agents IA industriels sur-mesure pour PME. SEO, Sales, Marketing — déployés en 48h sur votre infrastructure. Diagnostic offert.",
  },
};

const CALENDLY = 'https://calendly.com/a-fontana-smatchroom/30min';

const TIERS = [
  {
    icon: Package,
    name: 'Config Pilote',
    tagline: '1 Agent Métier Isolé',
    blurb: 'Pour valider un premier cas d\'usage (SEO, Sales ou Marketing) avant de déployer plus large.',
    features: [
      'Intégration à une source de données principale',
      'Déploiement et calibration sous 48 heures',
      'Pipeline d\'évaluation sur vos vraies données',
      '30 jours de support post-déploiement',
    ],
    highlighted: false,
  },
  {
    icon: Rocket,
    name: 'Config Squad',
    tagline: 'Écosystème Multi-Agents',
    blurb: 'Plusieurs agents connectés travaillant ensemble, avec synchronisation complète sur vos outils.',
    features: [
      'Connexion à vos outils existants (CRM, Search Console, APIs)',
      'Monitoring continu et maintenance corrective',
      'Réajustement mensuel des modèles',
      'Account manager dédié',
    ],
    highlighted: true,
    badge: 'Le plus déployé',
  },
  {
    icon: Building2,
    name: 'Config Enterprise',
    tagline: 'Agent Propriétaire Core-Business',
    blurb: 'Pour les structures qui veulent un agent entraîné sur leur corpus complet et une totale indépendance.',
    features: [
      'Possible déploiement sur votre propre serveur',
      'Disponibilité 99,9 % / Astreinte 24/7',
      'Transfert total de la propriété intellectuelle',
      'Code livré, modèle livré, indépendance totale',
    ],
    highlighted: false,
  },
];

export default function EntreprisesPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">

      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-24 pt-36">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.18),transparent_55%)]"
        />
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--primary-soft)] px-4 py-1.5 font-mono text-xs uppercase tracking-[0.18em] text-[var(--primary-hover)]">
            <Building2 size={14} />
            <span>Pour les entreprises et PME</span>
          </div>
          <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            <span className="gradient-text">Des agents IA industriels</span>{' '}
            <span className="text-white">sur votre infrastructure, en 48h.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-lg text-[var(--muted)]">
            Pulse conçoit, entraîne et déploie des agents autonomes pour les équipes qui veulent industrialiser leur SEO, leur prospection ou leurs opérations — sans dépendre d'un SaaS générique.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-7 py-3.5 font-medium text-black transition-all hover:bg-[var(--primary-hover)] hover:shadow-[0_0_40px_-5px_var(--primary-glow)]"
            >
              <Calendar size={18} />
              Réserver un diagnostic (30 min, offert)
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
            30 min · Visio · Sans engagement
          </p>
        </div>
      </section>

      {/* Configs */}
      <section id="configs" className="px-6 pb-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="eyebrow">Modèles de déploiement</p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              <span className="gradient-text">Chaque situation est unique.</span> On s'adapte.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-balance text-[var(--muted)]">
              Le tarif exact est défini lors du diagnostic de cadrage — 30 min pour qualifier votre cas et poser le périmètre précis.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {TIERS.map(({ icon: Icon, name, tagline, blurb, features, highlighted, badge }) => (
              <div
                key={name}
                className={[
                  'relative flex flex-col rounded-2xl p-8',
                  highlighted
                    ? 'border-2 border-[var(--primary)] bg-gradient-to-b from-[var(--primary-soft)] to-[var(--surface)] shadow-[0_0_60px_-10px_var(--primary-glow)]'
                    : 'glass',
                ].join(' ')}
              >
                {badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--primary)] px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-black">
                    {badge}
                  </span>
                )}
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary-soft)] text-[var(--primary-hover)] ring-1 ring-[var(--border-strong)]">
                  <Icon size={22} strokeWidth={1.8} />
                </div>
                <h3 className="text-2xl font-semibold tracking-tight text-white">{name}</h3>
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-[var(--primary)]">
                  {tagline}
                </p>
                <p className="mt-3 text-sm text-[var(--muted)]">{blurb}</p>
                <ul className="mt-6 space-y-3 text-sm text-[var(--foreground)]">
                  {features.map((f, i) => (
                    <li key={i} className="flex gap-3">
                      <Check size={16} className="mt-0.5 flex-shrink-0 text-[var(--primary-hover)]" strokeWidth={2.5} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-8">
                  <a
                    href={CALENDLY}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={[
                      'group inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 font-medium transition-all',
                      highlighted
                        ? 'bg-[var(--primary)] text-black hover:bg-[var(--primary-hover)] hover:shadow-[0_0_40px_-5px_var(--primary-glow)]'
                        : 'border border-[var(--border-strong)] text-white hover:bg-white/5',
                    ].join(' ')}
                  >
                    Demander un diagnostic
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
            Pas de modules cachés · Pas d'engagement 24 mois · Diagnostic offert
          </p>
        </div>
      </section>

      {/* Preuves */}
      <section className="px-6 pb-28">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <p className="eyebrow">Déjà en production</p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight">
              <span className="gradient-text">On l'a d'abord construit pour nous-mêmes.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-balance text-[var(--muted)]">
              Les agents Pulse tournent en production dans nos propres filiales. Ce ne sont pas des démos — ce sont des outils réels, avec des métriques réelles.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                name: 'Émargeo',
                sector: 'Restauration',
                metric: '28%',
                label: 'Food Cost stabilisé',
                desc: 'Système d\'exploitation unifié pour restaurateurs : planning IA, stocks, HACCP, prépa-paie.',
              },
              {
                name: 'SmatchRoom Pro',
                sector: 'Immobilier',
                metric: '−70%',
                label: 'Visites inutiles éliminées',
                desc: 'Pré-qualification et scoring documentaire prédictif pour ne rencontrer que des candidats qualifiés.',
              },
              {
                name: 'SmatchRoom App',
                sector: 'Colocation',
                metric: '92%',
                label: 'Taux de maintien à 6 mois',
                desc: 'Matching comportemental sans questionnaire pour garantir la stabilité des colocations.',
              },
            ].map(({ name, sector, metric, label, desc }) => (
              <article key={name} className="glass rounded-2xl p-7">
                <div className="mb-4 flex items-center justify-between">
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--primary)]">{name}</p>
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[var(--muted)]">{sector}</span>
                </div>
                <div className="mb-3 border-b border-[var(--border)] pb-4">
                  <p className="font-mono text-3xl font-semibold text-white">{metric}</p>
                  <p className="text-sm text-[var(--muted)]">{label}</p>
                </div>
                <p className="text-sm text-[var(--muted)]">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="relative overflow-hidden px-6 pb-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.14),transparent_60%)]"
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <div className="rounded-3xl border border-[var(--border-strong)] bg-gradient-to-b from-[var(--surface-2)] to-[var(--surface)] p-10 md:p-16">
            <p className="eyebrow">Lancement de pilote</p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              <span className="gradient-text">Réservez votre diagnostic.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-balance text-[var(--muted)]">
              30 min de visio. On qualifie le besoin, on identifie l'agent qui colle, on vous dit honnêtement si c'est pour Pulse — ou pas.
            </p>
            <div className="mt-10 flex flex-col items-center gap-3">
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-8 py-4 text-base font-medium text-black transition-all hover:bg-[var(--primary-hover)] hover:shadow-[0_0_40px_-5px_var(--primary-glow)]"
              >
                <Calendar size={18} />
                Choisir un créneau sur Calendly
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                30 min · Visio · Sans engagement
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
