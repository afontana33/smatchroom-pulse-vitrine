import { Check, Package, Rocket, Building2, ArrowRight, Store, MessageSquare } from 'lucide-react';

const CALENDLY = 'https://calendly.com/a-fontana-smatchroom/30min';

const TIERS = [
  {
    icon: Package,
    name: 'Config Pilote',
    tagline: '1 Agent Métier Isolé',
    blurb:
      'Idéal pour valider un premier cas d\'usage critique (SEO, Sales ou Marketing).',
    features: [
      'Intégration à une source de données principale',
      'Déploiement et calibration sous 48 heures',
      "Pipeline d'évaluation custom",
      '30 jours de support post-mise en prod',
    ],
    highlighted: false,
    cta: 'Demander mon diagnostic',
  },
  {
    icon: Rocket,
    name: 'Config Squad',
    tagline: 'Écosystème Multi-Agents Collaboratifs',
    blurb:
      'Plusieurs agents connectés via un cerveau contextuel partagé (cross-agent deduplication).',
    features: [
      'Synchronisation complète avec vos outils (CRM, n8n, Search Console, APIs métier)',
      'Monitoring continu et maintenance corrective',
      'Retraining mensuel des modèles',
      'Account manager dédié',
    ],
    highlighted: true,
    cta: 'Demander mon diagnostic',
  },
  {
    icon: Building2,
    name: 'Config Enterprise Engine',
    tagline: 'Agent Vertical Propriétaire Core-Business',
    blurb:
      'Fine-tuning sur votre corpus complet et sécurisation des données.',
    features: [
      'Possibilité de déploiement On-Premise',
      'SLA 99.9% / On-Call 24/7',
      'Transfert total de la propriété intellectuelle (IP)',
      'Modèle livré, code livré, indépendance totale',
    ],
    highlighted: false,
    cta: 'Demander mon diagnostic',
  },
];

export default function Pricing() {
  return (
    <section id="tarifs" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="eyebrow">Tarifs</p>
          <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            <span className="gradient-text">Transparent pour les commerces.</span> Sur-mesure pour les entreprises.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-[var(--muted)]">
            Une fourchette claire pour les TPE. Un diagnostic de cadrage pour les structures plus importantes.
          </p>
        </div>

        {/* Bloc TPE */}
        <div className="glass mb-10 overflow-hidden rounded-2xl p-8 md:p-10">
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
                Un assistant IA conçu pour votre métier, déployé en 48h. Vous savez exactement ce que vous payez, dès le départ — sans surprise.
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
              href="/commerces"
              className="group inline-flex items-center justify-center gap-2 self-start rounded-full bg-[var(--primary)] px-6 py-3 font-medium text-black transition-all hover:bg-[var(--primary-hover)] hover:shadow-[0_0_40px_-5px_var(--primary-glow)] md:self-center"
            >
              Voir l'offre commerces
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Titre configs PME */}
        <div className="mb-8 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
            Pour les entreprises · PME · structures
          </p>
          <p className="mt-2 text-[var(--muted)]">
            Le tarif dépend de votre situation. Le diagnostic de cadrage est offert — 30 min pour qualifier votre cas.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {TIERS.map(({ icon: Icon, name, tagline, blurb, features, highlighted, cta }) => (
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
                  Le plus déployé
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

        {/* Bloc de réassurance final */}
        <div className="mt-10 flex flex-col items-center gap-3 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
            Pas de grille standardisée · Pas de modules cachés · Pas d'engagement 24 mois
          </p>
          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-7 py-3.5 font-medium text-black transition-all hover:bg-[var(--primary-hover)] hover:shadow-[0_0_40px_-5px_var(--primary-glow)]"
          >
            Réserver mon Audit de Cadrage (30 min gratuit)
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
