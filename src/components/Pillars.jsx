import { Search, BarChart3, Megaphone, Factory, ArrowRight } from 'lucide-react';

const CUSTOM_EXAMPLES = [
  'Support client',
  'RH & Onboarding',
  'Veille concurrentielle',
  'Légal & Conformité',
  'Finance & Reporting',
  'Ops & Logistique',
  'Procurement',
  'Modération',
  'QA & Tests',
  'Data analyst',
  'Recrutement',
  'Et le vôtre.',
];

const PILLARS = [
  {
    icon: Search,
    title: 'Moteur RankSniper',
    domain: 'SEO',
    tagline: 'Audit, sémantique et publication — 100% automatisés.',
    bullets: [
      'Extraction temps réel des failles SEO des concurrents sur vos requêtes cibles',
      'Rédaction chirurgicale longue traîne (2 000+ mots) optimisée pour les LLM (GEO)',
      'Passerelle Webhook & Upsert : injection directe dans votre CMS (Supabase, WordPress)',
      'Balises JSON-LD structurelles automatisées (Article, FAQ, BreadcrumbList)',
    ],
  },
  {
    icon: BarChart3,
    title: 'SmatchRoom Apex',
    domain: 'Sales',
    tagline: 'Moteur souverain de qualification par signaux faibles.',
    bullets: [
      'Scoring prédictif B2B sur données légales (INSEE / INPI) — 0% hallucination avec validation de sources cliquables',
      'Détection de vulnérabilités commerciales en temps réel : signaux faibles métiers croisés',
      'Pipeline de leads autonome : qualification, personnalisation et envoi — sans intervention humaine',
      'Délivrabilité industrielle : vos domaines et comptes LinkedIn restent hors radar',
    ],
  },
  {
    icon: Megaphone,
    title: 'Moteur Orchestrator',
    domain: 'Marketing',
    tagline: 'Campagnes et itérations multi-canal en autonomie.',
    bullets: [
      'Idéation, copies publicitaires et briefs créatifs auto-générés',
      'A/B testing continu basé sur les données réelles de conversion',
      'FinOps Optimization : Prompt Caching natif (−90% sur les volumes lourds)',
      'Synthèse perf hebdo + recommandations d\'itération',
    ],
  },
];

export default function Pillars() {
  return (
    <section id="agents" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="eyebrow">3 moteurs propriétaires + tout le reste</p>
          <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            <span className="gradient-text">Ingénierie chirurgicale.</span> Pas de SaaS générique.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-balance text-[var(--muted)]">
            Trois moteurs propriétaires conçus, entraînés et opérés en interne. Pas de
            wrapper ChatGPT, pas de pile no-code fragile. Du code, des bases de données,
            des passerelles industrielles.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {PILLARS.map(({ icon: Icon, title, domain, tagline, bullets }) => (
            <div
              key={title}
              className="glass glass-hover group relative flex flex-col rounded-2xl p-7 transition-all"
            >
              <div className="mb-5 flex items-start justify-between">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary-soft)] text-[var(--primary-hover)] ring-1 ring-[var(--border-strong)]">
                  <Icon size={22} strokeWidth={1.8} />
                </div>
                <span className="rounded-full border border-[var(--border-strong)] bg-[var(--surface-2)] px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[var(--muted)]">
                  {domain}
                </span>
              </div>
              <h3 className="text-2xl font-semibold tracking-tight text-white">{title}</h3>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-[var(--primary)]">
                {tagline}
              </p>
              <ul className="mt-6 space-y-3 text-sm text-[var(--muted)]">
                {bullets.map((b, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-[var(--primary)] shadow-[0_0_6px_var(--primary-glow)]" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bande "Usine à agents" — agents sur-mesure au-delà des 3 piliers */}
        <div className="glass relative mt-6 overflow-hidden rounded-2xl p-8 md:p-10">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_50%,var(--primary-soft),transparent_60%)]"
          />
          <div className="relative grid gap-8 md:grid-cols-[auto_1fr_auto] md:items-center">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--primary-soft)] text-[var(--primary-hover)] ring-1 ring-[var(--border-strong)]">
              <Factory size={26} strokeWidth={1.8} />
            </div>

            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--primary)]">
                Usine à agents · sur-mesure
              </p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white md:text-3xl">
                Votre besoin n'est pas dans la liste ? <span className="gradient-text">On le construit.</span>
              </h3>
              <p className="mt-3 max-w-2xl text-sm text-[var(--muted)] md:text-base">
                On est une usine. Si un agent IA peut exister, on le conçoit pour vous —
                dans la limite de ce que la techno permet aujourd'hui. Mêmes 48h, même pipeline,
                même garantie de mise en prod.
              </p>

              <ul className="mt-5 flex flex-wrap gap-2">
                {CUSTOM_EXAMPLES.map((label) => (
                  <li
                    key={label}
                    className="rounded-full border border-[var(--border-strong)] bg-[var(--primary-soft)]/40 px-3 py-1 font-mono text-xs text-[var(--muted)]"
                  >
                    {label}
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="https://calendly.com/a-fontana-smatchroom/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 self-start rounded-full bg-[var(--primary)] px-6 py-3 font-medium text-black transition-all hover:bg-[var(--primary-hover)] hover:shadow-[0_0_40px_-5px_var(--primary-glow)] md:self-center"
            >
              Décrire mon besoin
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
