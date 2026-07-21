import { ArrowRight, Search, ShoppingCart, FileCheck, MapPin, Headphones, ShieldCheck, Crosshair, Check } from 'lucide-react';
import Reveal from './Reveal';

const CALENDLY = 'https://calendly.com/a-fontana-smatchroom/30min';

const AGENTS = [
  { icon: Search, name: 'Le Chasseur', role: 'Prospection de partenaires B2B (syndics, agences…)', setup: 490, mrr: 190, highlighted: true },
  { icon: ShoppingCart, name: "L'Acheteur", role: 'Analyse et comparaison des prix fournisseurs / devis', setup: 490, mrr: 190, highlighted: false },
  { icon: FileCheck, name: 'Le Gestionnaire', role: 'Suivi et relance des devis en attente', setup: 390, mrr: 190, highlighted: false },
  { icon: MapPin, name: 'Le Visiteur', role: 'SEO local et réponses aux avis Google', setup: 290, mrr: 149, highlighted: false },
  { icon: Headphones, name: "L'Accueil 24/7", role: 'Prise en charge et qualification des leads entrants', setup: 290, mrr: 149, highlighted: false },
  { icon: ShieldCheck, name: 'Le Contrôleur', role: 'Conformité, attestations URSSAF / décennale', setup: 290, mrr: 129, highlighted: false },
];

const GC_FEATURES = [
  'Ciblage chirurgical des décideurs (directeurs techniques, chefs de parc, acheteurs)',
  'Approche conversationnelle WhatsApp & e-mail, entraînée sur votre marché',
  'Handoff : dès qu\'un prospect est chaud, l\'agent passe le relais à vos commerciaux',
];

export default function Pricing() {
  return (
    <section id="tarifs" className="relative px-5 py-24 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-6 flex items-center gap-4">
            <span className="section-index">06 — Tarifs</span>
            <span className="h-px flex-1 bg-[var(--border-strong)]" />
          </div>
        </Reveal>

        <Reveal>
          <div className="mb-14 max-w-2xl">
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              <span className="gradient-text">Vos agents, à l&apos;unité.</span>
            </h2>
            <p className="mt-4 text-balance text-[var(--muted-strong)] sm:text-lg">
              Vous composez votre équipe. Un agent, plusieurs, ou un pack : chaque collaborateur
              numérique a son rôle et son tarif clairs. Tarifs en euros HT.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {AGENTS.map(({ icon: Icon, name, role, setup, mrr, highlighted }, i) => (
            <Reveal key={name} delay={i * 70}>
              <div
                className={[
                  'card card-hover relative flex h-full flex-col p-6 sm:p-7',
                  highlighted ? 'ring-2 ring-[var(--primary)]' : '',
                ].join(' ')}
              >
                {highlighted && (
                  <span className="absolute right-5 top-5 rounded-full bg-[var(--primary)] px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-white">
                    Le + demandé
                  </span>
                )}
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary-soft)] text-[var(--primary-ink)] ring-1 ring-[var(--primary-line)]">
                  <Icon size={22} strokeWidth={1.8} />
                </div>
                <h3 className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">{name}</h3>
                <p className="mt-2 flex-1 text-sm text-[var(--muted-strong)]">{role}</p>

                <div className="mt-6 flex items-end gap-5 border-t border-[var(--border)] pt-5">
                  <div>
                    <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--muted)]">Installation</p>
                    <p className="font-display text-xl font-semibold text-[var(--foreground)]">{setup} € <span className="text-xs font-normal text-[var(--muted)]">HT</span></p>
                  </div>
                  <div>
                    <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--muted)]">Par mois</p>
                    <p className="font-display text-xl font-semibold text-[var(--primary-ink)]">{mrr} € <span className="text-xs font-normal text-[var(--muted)]">HT</span></p>
                  </div>
                </div>

                <a
                  href={CALENDLY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost group mt-6 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium"
                >
                  Choisir cet agent
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Offre de lancement */}
        <Reveal delay={80}>
          <div className="card relative mt-6 overflow-hidden p-7 sm:p-9">
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_30%,var(--primary-soft),transparent_58%)]" />
            <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--primary-ink)]">Offre de lancement</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--foreground)]">
                  Installation facilitée sur les agents à 490 €
                </h3>
                <p className="mt-3 max-w-2xl text-sm text-[var(--muted-strong)] sm:text-base">
                  Sur les agents ou packs à 490 € d&apos;installation : payez{' '}
                  <span className="font-semibold text-[var(--foreground)]">290 € pendant 20 jours, puis 200 €</span>.
                  Et tous les abonnements ne démarrent que{' '}
                  <span className="font-semibold text-[var(--foreground)]">le mois suivant</span> la mise en service.
                </p>
              </div>
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex flex-shrink-0 items-center justify-center gap-2 px-6 py-3.5 font-semibold">
                En profiter
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </Reveal>

        {/* Palier premium — Grands Comptes */}
        <Reveal delay={100}>
          <div id="grands-comptes-teaser" className="showcase-dark grain relative mt-6 overflow-hidden rounded-2xl p-7 sm:p-10">
            <div className="relative grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
              <div>
                <span className="premium-badge inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.18em]">
                  <Crosshair size={13} /> Palier PME / ETI · sur-mesure
                </span>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
                  L&apos;Agent Chasseur <span className="font-serif-it text-[#8fb4e0]">Grands Comptes</span>
                </h3>
                <p className="mt-3 max-w-xl text-sm text-[var(--on-ink-muted)] sm:text-base">
                  Pour les PME et ETI de l&apos;industrie & du BTP qui veulent ouvrir des grands comptes
                  (promoteurs, gestionnaires de parcs, majors de la construction). Un SDR IA autonome
                  qui prospecte, qualifie, et passe le relais à vos commerciaux sur des prospects chauds.
                </p>
                <ul className="mt-6 space-y-2.5">
                  {GC_FEATURES.map((f) => (
                    <li key={f} className="flex gap-2.5 text-sm text-[var(--on-ink-muted)]">
                      <Check size={17} className="mt-0.5 flex-shrink-0 text-[#8fb4e0]" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-white/12 bg-white/[0.04] p-6 sm:p-7">
                <div className="flex items-end justify-between gap-4 border-b border-white/10 pb-5">
                  <div>
                    <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--on-ink-muted)]">Tarif</p>
                    <p className="font-display text-2xl font-semibold text-white">Sur devis</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--on-ink-muted)]">Engagement</p>
                    <p className="font-display text-2xl font-semibold text-[#8fb4e0]">Aucun</p>
                  </div>
                </div>
                <p className="mt-4 text-xs text-[var(--on-ink-muted)]">
                  Offre sur-mesure, adaptée à votre marché et vos objectifs. ROI conçu pour s&apos;autofinancer dès le premier compte ouvert.
                </p>
                <a href="/grands-comptes" className="btn-steel mt-5 inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 font-semibold">
                  Découvrir l&apos;offre Grands Comptes
                  <ArrowRight size={16} />
                </a>
                <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="mt-3 block text-center font-mono text-xs uppercase tracking-[0.14em] text-[var(--on-ink-muted)] underline-offset-4 hover:text-white hover:underline">
                  ou réserver une démo de 15 min
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
