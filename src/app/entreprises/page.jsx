import { ArrowRight, Check, Building2, Calendar, Server, Code2, Shield, GitBranch, Database, Cpu } from 'lucide-react';
import InteractiveLab from '@/components/InteractiveLab';
import Reveal from '@/components/Reveal';
import Footer from '@/components/Footer';

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
      <section className="relative overflow-hidden grain px-5 pb-20 pt-32 sm:px-6 sm:pb-24 sm:pt-36">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="animate-mesh absolute -right-40 -top-40 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(255,90,31,0.12),transparent_60%)] blur-3xl" />
          <div className="animate-mesh absolute -left-32 top-16 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(255,176,122,0.14),transparent_60%)] blur-3xl [animation-delay:-8s]" />
        </div>
        <div className="relative mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--primary-line)] bg-[var(--primary-soft)] px-4 py-1.5 font-mono text-xs uppercase tracking-[0.18em] text-[var(--primary-ink)]">
            <Building2 size={14} />
            <span>Entreprises · Agences · PME Tech</span>
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-balance text-[2.3rem] font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            <span className="gradient-text">Pipelines d'agents IA industriels,</span>{' '}
            <span className="text-[var(--foreground)]">sur votre infrastructure. Code livré.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-base text-[var(--muted-strong)] sm:text-lg">
            SmatchRoom conçoit et déploie vos pipelines d'automatisation et de scoring en{' '}
            <span className="font-medium text-[var(--foreground)]">Node.js & Supabase</span>, directement sur vos serveurs Linux.
            Zéro dépendance aux SaaS génériques.{' '}
            <span className="font-medium text-[var(--foreground)]">Propriété intellectuelle transférée à 100%.</span>
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
            {['Node.js', 'Supabase', 'Linux / Ubuntu', 'PM2', 'Souveraineté', 'PI transférée'].map((tag) => (
              <span key={tag} className="chip px-3 py-1 font-mono text-xs">
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-10 flex flex-col items-center justify-center gap-3">
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary group inline-flex items-center gap-2 px-7 py-4 text-base font-semibold"
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
      <section className="px-5 pb-16 sm:px-6 sm:pb-20">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="mb-8 flex items-center gap-4">
              <span className="section-index">01 — Ce qui change</span>
              <span className="h-px flex-1 bg-[var(--border-strong)]" />
            </div>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
            ].map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 90}>
                <div className="card card-hover grain flex h-full flex-col p-6">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary-soft)] text-[var(--primary-ink)] ring-1 ring-[var(--primary-line)]">
                    <Icon size={18} strokeWidth={1.8} />
                  </div>
                  <h3 className="font-semibold text-[var(--foreground)]">{title}</h3>
                  <p className="mt-2 text-sm text-[var(--muted-strong)]">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <InteractiveLab />

      {/* Formats d'intervention */}
      <section className="px-5 pb-24 sm:px-6 sm:pb-28">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <p className="eyebrow">Formats d'intervention</p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              <span className="gradient-text">Deux façons de travailler ensemble.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-balance text-[var(--muted-strong)]">
              Pas de grille tarifaire affichée. Le périmètre se définit lors du diagnostic de 30 min. Aucune surprise après.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {FORMATS.map(({ icon: Icon, name, tagline, blurb, features, highlighted, cta }, i) => (
              <Reveal key={name} delay={i * 90}>
                <div
                  className={[
                    'card grain relative flex h-full flex-col p-7 sm:p-8',
                    highlighted
                      ? 'bg-gradient-to-b from-[var(--primary-soft)] to-[var(--surface)] ring-2 ring-[var(--primary)]'
                      : '',
                  ].join(' ')}
                >
                  {highlighted && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--primary)] px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-white">
                      Le plus demandé
                    </span>
                  )}
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary-soft)] text-[var(--primary-ink)] ring-1 ring-[var(--primary-line)]">
                    <Icon size={22} strokeWidth={1.8} />
                  </div>
                  <h3 className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">{name}</h3>
                  <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-[var(--primary-ink)]">
                    {tagline}
                  </p>
                  <p className="mt-3 text-sm text-[var(--muted-strong)]">{blurb}</p>
                  <ul className="mt-6 space-y-3 text-sm text-[var(--muted-strong)]">
                    {features.map((f, j) => (
                      <li key={j} className="flex gap-3">
                        <Check size={16} className="mt-0.5 flex-shrink-0 text-[var(--primary-ink)]" strokeWidth={2.5} />
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
                        'group inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 font-semibold',
                        highlighted ? 'btn-primary' : 'btn-ghost',
                      ].join(' ')}
                    >
                      {cta}
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
            {['Souveraineté totale', 'PI transférée', 'Infrastructure dédiée', 'Pas d\'engagement 24 mois'].map((kw) => (
              <span key={kw} className="flex items-center gap-2">
                <Shield size={10} className="text-[var(--primary-ink)]" />
                {kw}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Preuves — déjà en production */}
      <section className="px-5 pb-24 sm:px-6 sm:pb-28">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <p className="eyebrow">Déjà en production</p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight">
              <span className="gradient-text">On l'a construit pour nos propres filiales d'abord.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-balance text-[var(--muted-strong)]">
              Les agents SmatchRoom tournent en production dans nos propres produits. Métriques réelles, stack identique à ce qu'on déploie chez vous.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PROOFS.map(({ name, sector, metric, label, desc }, i) => (
              <Reveal key={name} delay={i * 90}>
                <article className="card card-hover flex h-full flex-col p-7">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--primary-ink)]">{name}</p>
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[var(--muted)]">{sector}</span>
                  </div>
                  <div className="mb-3 border-b border-[var(--border)] pb-4">
                    <p className="font-display text-3xl font-semibold text-[var(--foreground)]">{metric}</p>
                    <p className="text-sm text-[var(--muted)]">{label}</p>
                  </div>
                  <p className="text-sm text-[var(--muted-strong)]">{desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="px-5 pb-28 sm:px-6 sm:pb-32">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <div className="showcase-dark grain relative overflow-hidden rounded-3xl p-10 text-center md:p-16">
              <p className="eyebrow text-[var(--primary)]">Première étape</p>
              <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl">
                Audit d'architecture. 30 min. Gratuit.
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-balance text-[var(--on-ink-muted)]">
                On analyse votre stack, on identifie où les agents IA font sens, on chiffre les économies potentielles. Si ce n'est pas pertinent pour vous, on vous le dit aussi.
              </p>
              <div className="mt-10 flex flex-col items-center gap-3">
                <a
                  href={CALENDLY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary group inline-flex items-center gap-2 px-8 py-4 text-base font-semibold"
                >
                  <Calendar size={18} />
                  Demander un audit d'architecture
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </a>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--on-ink-muted)]">
                  30 min · Visio · Sans engagement
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <Footer />
    </main>
  );
}
