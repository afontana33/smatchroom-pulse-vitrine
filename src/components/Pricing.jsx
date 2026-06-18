import { Check, ArrowRight, Store, Building2, Shield, Code2, Server } from 'lucide-react';

const CALENDLY = 'https://calendly.com/a-fontana-smatchroom/30min';

const ENTERPRISE_FORMATS = [
  {
    icon: Code2,
    name: 'Audit & CTO Externe',
    tagline: 'Diagnostic d\'architecture · Intervention ponctuelle',
    blurb:
      'On audite votre stack, on identifie les goulots d\'étranglement et on livre un plan d\'action précis. Avec ou sans implémentation.',
    features: [
      'Audit complet de votre infrastructure (Linux, Node.js, APIs, BDD)',
      'Cartographie des pipelines existants et des points de rupture',
      'Recommandations d\'architecture documentées et actionnables',
      'Intervention en tant que CTO externe sur la durée si besoin',
    ],
    highlighted: false,
    cta: 'Demander un audit d\'architecture',
  },
  {
    icon: Server,
    name: 'Forfait Build Freelance Senior',
    tagline: 'Développement · Déploiement · Transfert de propriété',
    blurb:
      'On conçoit, code et stabilise vos agents en production, puis on vous livre le code source complet avec toute la propriété intellectuelle.',
    features: [
      'Développement full-stack en Node.js avec Supabase comme couche de données',
      'Réduction du coût token documentée (Prompt Caching natif, batching)',
      'Déploiement sur votre propre serveur Linux, zéro dépendance SaaS',
      'Transfert total de la PI : code, modèles, documentation. Vous êtes propriétaire.',
    ],
    highlighted: true,
    cta: 'Discuter de mon projet',
  },
];

export default function Pricing() {
  return (
    <section id="tarifs" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="eyebrow">Tarifs</p>
          <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            <span className="gradient-text">Transparent pour les commerces.</span>{' '}
            Souverain pour les entreprises.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-[var(--muted)]">
            Un prix affiché pour les artisans. Une intervention sur-mesure pour les structures qui ont besoin de vraie propriété sur leur infra.
          </p>
        </div>

        {/* Bloc TPE */}
        <div className="glass relative mb-10 overflow-hidden rounded-2xl p-8 md:p-10">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,var(--primary-soft),transparent_60%)]"
          />
          <div className="relative grid gap-8 md:grid-cols-[auto_1fr_auto] md:items-center">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--primary-soft)] text-[var(--primary-hover)] ring-1 ring-[var(--border-strong)]">
              <Store size={26} strokeWidth={1.8} />
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--primary)]">
                Pour les commerces · artisans · indépendants
              </p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white md:text-3xl">
                À partir de <span className="gradient-text">500 €</span> d'installation{' '}
                <span className="text-[var(--muted)]">+</span>{' '}
                <span className="gradient-text">150 €/mois</span>
              </h3>
              <p className="mt-3 max-w-2xl text-sm text-[var(--muted)] md:text-base">
                Un assistant clé en main, sans jargon, déployé en 48h. Vous savez exactement ce que vous payez, dès le départ.
              </p>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {[
                  'Un assistant taillé pour votre activité',
                  'Opérationnel en 48h',
                  'Tableau de bord simple inclus',
                  'Support disponible si besoin',
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-[var(--muted)]">
                    <Check size={15} className="flex-shrink-0 text-[var(--primary-hover)]" strokeWidth={2.5} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <a
              href="/entrepreneurs"
              className="group inline-flex items-center justify-center gap-2 self-start rounded-full bg-[var(--primary)] px-6 py-3 font-medium text-black transition-all hover:bg-[var(--primary-hover)] hover:shadow-[0_0_40px_-5px_var(--primary-glow)] md:self-center"
            >
              Voir l'offre artisans
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Titre section Entreprises */}
        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-2)] px-4 py-1.5">
            <Building2 size={14} className="text-[var(--primary-hover)]" />
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
              Pour les entreprises · agences · PME tech
            </p>
          </div>
          <p className="mt-2 text-[var(--muted)]">
            Intervention sur-mesure. Le tarif est défini lors du diagnostic de cadrage : 30 min pour poser le périmètre précis.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            {['Souveraineté', 'Propriété Intellectuelle transférée', 'Infrastructure dédiée', 'Zéro SaaS tiers'].map((kw) => (
              <span key={kw} className="rounded-full border border-[var(--border-strong)] bg-[var(--primary-soft)]/40 px-3 py-1 font-mono text-xs text-[var(--primary-hover)]">
                {kw}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {ENTERPRISE_FORMATS.map(({ icon: Icon, name, tagline, blurb, features, highlighted, cta }) => (
            <div
              key={name}
              className={[
                'relative flex flex-col rounded-2xl p-8',
                highlighted
                  ? 'border-2 border-[var(--primary)] bg-gradient-to-b from-[var(--primary-soft)] to-[var(--surface)] shadow-[0_0_60px_-10px_var(--primary-glow)]'
                  : 'glass',
              ].join(' ')}
            >
              {highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--primary)] px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-black">
                  Le plus demandé
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
                    <Check
                      size={16}
                      className="mt-0.5 flex-shrink-0 text-[var(--primary-hover)]"
                      strokeWidth={2.5}
                    />
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
                  {cta}
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
            Pas de grille standardisée · Code source livré · Pas d'engagement 24 mois
          </p>
          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-7 py-3.5 font-medium text-black transition-all hover:bg-[var(--primary-hover)] hover:shadow-[0_0_40px_-5px_var(--primary-glow)]"
          >
            Demander un audit d'architecture (30 min gratuit)
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
