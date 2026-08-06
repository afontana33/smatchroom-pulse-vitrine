import { Search, BarChart3, Megaphone, Factory, ArrowRight, ShieldCheck, Lock } from 'lucide-react';
import Reveal from './Reveal';

const CUSTOM_EXAMPLES = [
  'Relance de devis', 'Suivi de chantier', 'Avis Google', 'Attestations URSSAF',
  'SAV & garanties', 'Planning poseurs', 'Facturation', 'Appels entrants',
  'MaPrimeRénov', 'Et le vôtre.',
];

const PILLARS = [
  {
    icon: Search,
    title: 'Moteur RankSniper',
    domain: 'SEO local',
    tagline: 'Visible sur Google quand on cherche un artisan.',
    bullets: [
      'Analyse les requêtes locales de votre métier (« isolation Bordeaux », « rénovation Nantes »…) et les failles concurrentes',
      'Rédige et publie des pages métier optimisées, sans que vous touchiez au clavier',
      'Répond aux avis Google et pousse les demandes de devis vers vous',
      'Balises structurées automatiques : vous remontez dans le pack local',
    ],
  },
  {
    icon: BarChart3,
    title: 'SmatchRoom Apex',
    domain: 'Prospection',
    tagline: 'Un flux continu de chantiers qualifiés.',
    bullets: [
      "Sourcing sur données légales (INSEE / INPI) : syndics, agences, maîtres d'œuvre de votre zone",
      'Détecte les partenaires qui envoient du chantier et les contacte pour vous',
      'Relance vos devis en attente par WhatsApp, au bon moment',
      'Vos numéros restent protégés : cadence lissée, montée en charge anti-blocage',
    ],
  },
  {
    icon: Megaphone,
    title: 'Moteur Orchestrator',
    domain: 'Admin & Ops',
    tagline: "L'administratif qui se fait tout seul.",
    bullets: [
      'Qualifie les leads entrants et pose les RDV directement dans votre agenda',
      'Vérifie les attestations (URSSAF, décennale) avant chaque chantier',
      'Compare les devis fournisseurs et repère les écarts de prix',
      'Synthèse hebdo : ce qui a été fait, ce qui attend votre décision',
    ],
  },
];

export default function Pillars() {
  return (
    <section id="agents" className="relative px-5 py-24 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-6 flex items-center gap-4">
            <span className="section-index">02 — La technologie</span>
            <span className="h-px flex-1 bg-[var(--border-strong)]" />
          </div>
        </Reveal>

        <Reveal>
          <div className="mb-10 max-w-2xl">
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              <span className="gradient-text">Du vrai code.</span> Pas un wrapper ChatGPT.
            </h2>
            <p className="mt-4 text-balance text-[var(--muted-strong)] sm:text-lg">
              Des moteurs conçus, entraînés et opérés en interne. Pas de pile no-code fragile :
              du vrai code, des bases de données sécurisées (Supabase / Linux), des passerelles industrielles.
            </p>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <div className="mb-12 grid gap-3 sm:grid-cols-2">
            <div className="card flex items-start gap-3 p-5">
              <span className="mt-0.5 inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--steel-soft)] text-[var(--steel)] ring-1 ring-[var(--steel-line)]">
                <ShieldCheck size={18} strokeWidth={1.8} />
              </span>
              <div>
                <p className="font-semibold text-[var(--foreground)]">Prospection encadrée</p>
                <p className="mt-1 text-sm text-[var(--muted-strong)]">
                  Ciblage B2B, base légale documentée, opposition traitée en un mot.
                </p>
              </div>
            </div>
            <div className="card flex items-start gap-3 p-5">
              <span className="mt-0.5 inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--primary-soft)] text-[var(--primary-ink)] ring-1 ring-[var(--primary-line)]">
                <Lock size={18} strokeWidth={1.8} />
              </span>
              <div>
                <p className="font-semibold text-[var(--foreground)]">Protection des domaines</p>
                <p className="mt-1 text-sm text-[var(--muted-strong)]">
                  Cadence lissée, chauffe d&apos;adresses IP, protection totale de vos numéros et e-mails principaux.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3">
          {PILLARS.map(({ icon: Icon, title, domain, tagline, bullets }, i) => (
            <Reveal key={title} delay={i * 90}>
              <div className="card card-hover grain relative flex h-full flex-col overflow-hidden p-6 sm:p-7">
                <div className="mb-5 flex items-start justify-between">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary-soft)] text-[var(--primary-ink)] ring-1 ring-[var(--primary-line)]">
                    <Icon size={22} strokeWidth={1.8} />
                  </div>
                  <span className="chip px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.18em]">
                    {domain}
                  </span>
                </div>
                <h3 className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">{title}</h3>
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-[var(--primary-ink)]">
                  {tagline}
                </p>
                <ul className="mt-6 space-y-3 text-sm text-[var(--muted-strong)]">
                  {bullets.map((b, j) => (
                    <li key={j} className="flex gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--primary)]" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Usine à agents — sur-mesure */}
        <Reveal delay={120}>
          <div className="showcase-dark grain relative mt-6 overflow-hidden rounded-2xl p-7 sm:p-10">
            <div className="relative grid gap-8 md:grid-cols-[auto_1fr_auto] md:items-center">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-[var(--primary)] ring-1 ring-white/15">
                <Factory size={26} strokeWidth={1.8} />
              </div>

              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--primary)]">
                  Usine à agents · sur-mesure
                </p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  Votre besoin n&apos;est pas dans la liste ? On le construit.
                </h3>
                <p className="mt-3 max-w-2xl text-sm text-[var(--on-ink-muted)] sm:text-base">
                  Si un besoin de votre activité peut être automatisé, on le conçoit pour vous.
                  Mêmes 48h, même pipeline, même engagement de mise en production.
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {CUSTOM_EXAMPLES.map((label) => (
                    <li
                      key={label}
                      className="rounded-full border border-white/12 bg-white/5 px-3 py-1 font-mono text-xs text-[var(--on-ink-muted)]"
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
                className="btn-primary inline-flex items-center justify-center gap-2 self-start px-6 py-3.5 font-semibold md:self-center"
              >
                Décrire mon besoin
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
