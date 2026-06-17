import { ArrowRight, Check, Building2, Calendar, Server, Code2, Shield, GitBranch, Database, Cpu } from 'lucide-react';
import InteractiveLab from '@/components/InteractiveLab';

export const metadata = {
  title: 'Agents IA industriels pour entreprises & agences — SmatchRoom Pulse',
  description:
    "SmatchRoom conçoit et déploie vos pipelines d'agents IA en Node.js & Supabase, sur votre propre infrastructure Linux. Audit d'architecture, build freelance senior, transfert total de propriété intellectuelle. Sans SaaS tiers.",
  openGraph: {
    title: 'Agents IA industriels pour entreprises & agences — SmatchRoom',
    description:
      "Pipelines d'automatisation et de scoring IA en Node.js & Supabase. Déployés sur votre infra. Propriété intellectuelle transférée. Diagnostic d'architecture offert.",
  },
};

const CALENDLY = 'https://calendly.com/a-fontana-smatchroom/30min';

const FORMATS = [
  {
    icon: Code2,
    name: 'Audit & CTO Externe',
    tagline: 'Diagnostic d\'architecture · Intervention ponctuelle ou récurrente',
    blurb:
      'Vous avez une stack qui tourne mais vous ne savez pas où elle cassera. On audite, on cartographie, on livre un plan d\'action. Avec ou sans implémentation.',
    features: [
      'Audit complet de votre infrastructure (Linux, Node.js, APIs REST, BDD Supabase/Postgres)',
      'Cartographie des pipelines IA existants, détection des goulots et points de rupture',
      'Analyse des coûts token : Prompt Caching, batching, modèle routing. Économies documentées.',
      'Livrable : plan d\'architecture avec priorisation et estimations d\'effort réalistes',
      'Option : intervention CTO externe sur la durée pour piloter les développements',
    ],
    highlighted: false,
    cta: 'Demander un audit d\'architecture',
  },
  {
    icon: Server,
    name: 'Forfait Build Freelance Senior',
    tagline: 'Développement · Déploiement · Transfert de propriété',
    blurb:
      'On conçoit, code et stabilise vos agents en production sur votre infra, puis on vous livre le code source complet. Vous devenez propriétaire à 100%.',
    features: [
      'Architecture Node.js event-driven avec Supabase comme couche de données souveraine',
      'Pipelines de scoring et d\'automatisation sans dépendance aux SaaS tiers',
      'Déploiement direct sur vos serveurs Linux : Ubuntu, PM2, NGINX reverse proxy',
      'Réduction des coûts API documentée : Prompt Caching natif, context compression',
      'Transfert total de la PI : code source, documentation technique, modèles fins. Vous repartez avec tout.',
    ],
    highlighted: true,
    cta: 'Discuter de mon projet',
  },
];

const PROOFS = [
  {
    name: 'Émargeo',
    sector: 'Restauration',
    metric: '28%',
    label: 'Food Cost stabilisé',
    desc: 'Système d\'exploitation unifié pour restaurateurs : assistant vocal, plannings IA, suivi des stocks et HACCP. Tout sur serveur dédié.',
  },
  {
    name: 'SmatchRoom Pro',
    sector: 'Immobilier',
    metric: '−70%',
    label: 'Visites inutiles éliminées',
    desc: 'Pipeline de scoring documentaire prédictif : pré-qualification automatique des candidats locatifs sans intervention manuelle.',
  },
  {
    name: 'SmatchRoom App',
    sector: 'Colocation',
    metric: '92%',
    label: 'Taux de maintien à 6 mois',
    desc: 'Moteur de matching comportemental basé sur des signaux faibles : zéro questionnaire, déduction par inférence contextuelle.',
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
            <span>Entreprises · Agences · PME Tech</span>
          </div>
          <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            <span className="gradient-text">Pipelines d'agents IA industriels,</span>{' '}
            <span className="text-white">sur votre infrastructure. Code livré.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-lg text-[var(--muted)]">
            SmatchRoom conçoit et déploie vos pipelines d'automatisation et de scoring en{' '}
            <span className="text-white font-medium">Node.js & Supabase</span>, directement sur vos serveurs Linux.
            Zéro dépendance aux SaaS génériques.{' '}
            <span className="text-white font-medium">Propriété intellectuelle transférée à 100%.</span>
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {['Node.js', 'Supabase', 'Linux / Ubuntu', 'PM2', 'Souveraineté', 'PI transférée'].map((tag) => (
              <span key={tag} className="rounded-full border border-[var(--border-strong)] bg-[var(--surface-2)] px-3 py-1 font-mono text-xs text-[var(--muted)]">
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-10 flex flex-col items-center justify-center gap-3">
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-7 py-3.5 font-medium text-black transition-all hover:bg-[var(--primary-hover)] hover:shadow-[0_0_40px_-5px_var(--primary-glow)]"
            >
              <Calendar size={18} />
              Demander un audit d'architecture (30 min)
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
              Visio · Gratuit · Sans engagement
            </p>
          </div>
        </div>
      </section>

      {/* Différenciateurs techniques */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                icon: GitBranch,
                title: 'Code source livré',
                desc: 'Chaque pipeline est le vôtre : Node.js typé, documenté, avec les tests d\'intégration. Aucun vendor lock-in possible.',
              },
              {
                icon: Database,
                title: 'Supabase souverain',
                desc: 'Vos données restent dans votre instance Supabase auto-hébergée. On ne passe par aucun SaaS tiers qui peut couper l\'accès.',
              },
              {
                icon: Cpu,
                title: 'Coûts token optimisés',
                desc: 'Prompt Caching natif, context compression, model routing : on documente les économies réalisées sur votre volume de production.',
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="glass rounded-2xl p-6">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary-soft)] text-[var(--primary-hover)] ring-1 ring-[var(--border-strong)]">
                  <Icon size={18} strokeWidth={1.8} />
                </div>
                <h3 className="font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm text-[var(--muted)]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <InteractiveLab />

      {/* Formats d'intervention */}
      <section className="px-6 pb-28">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <p className="eyebrow">Formats d'intervention</p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              <span className="gradient-text">Deux façons de travailler ensemble.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-balance text-[var(--muted)]">
              Pas de grille tarifaire affichée. Le périmètre se définit lors du diagnostic de 30 min. Aucune surprise après.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {FORMATS.map(({ icon: Icon, name, tagline, blurb, features, highlighted, cta }) => (
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
                    {cta}
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
            {['Souveraineté totale', 'PI transférée', 'Infrastructure dédiée', 'Pas d\'engagement 24 mois'].map((kw) => (
              <span key={kw} className="flex items-center gap-2">
                <Shield size={10} className="text-[var(--primary)]" />
                {kw}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Preuves — déjà en production */}
      <section className="px-6 pb-28">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <p className="eyebrow">Déjà en production</p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight">
              <span className="gradient-text">On l'a construit pour nos propres filiales d'abord.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-balance text-[var(--muted)]">
              Les agents SmatchRoom tournent en production dans nos propres produits. Métriques réelles, stack identique à ce qu'on déploie chez vous.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {PROOFS.map(({ name, sector, metric, label, desc }) => (
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
            <p className="eyebrow">Première étape</p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              <span className="gradient-text">Audit d'architecture. 30 min. Gratuit.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-balance text-[var(--muted)]">
              On analyse votre stack, on identifie où les agents IA font sens, on chiffre les économies potentielles. Si ce n'est pas pertinent pour vous, on vous le dit aussi.
            </p>
            <div className="mt-10 flex flex-col items-center gap-3">
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-8 py-4 text-base font-medium text-black transition-all hover:bg-[var(--primary-hover)] hover:shadow-[0_0_40px_-5px_var(--primary-glow)]"
              >
                <Calendar size={18} />
                Demander un audit d'architecture
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
