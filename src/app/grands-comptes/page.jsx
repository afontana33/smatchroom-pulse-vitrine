import {
  ArrowRight, PhoneOff, Users2, BatteryLow, Crosshair, MessagesSquare,
  Handshake, Check, Calendar, Phone, Mail, ShieldCheck,
} from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';

const CALENDLY = 'https://calendly.com/a-fontana-smatchroom/30min';

export const metadata = {
  title: "Division Corporate & Grands Comptes — Ingénierie d'acquisition B2B sur-mesure | SmatchRoom Pulse",
  description:
    "Infrastructure de prospection B2B sur-mesure pour les marchés de niche et réseaux d'envergure : luxe, éco-mobilité, SaaS, industrie de pointe, franchises, gros œuvre. Data engineering, cerveau IA dédié (RAG), frappe multicanale & handoff. Audit stratégique gratuit.",
  alternates: { canonical: 'https://pulse.smatchroom.com/grands-comptes' },
  openGraph: {
    title: "Division Corporate & Grands Comptes — SmatchRoom Pulse",
    description:
      "Ingénierie d'acquisition B2B sur-mesure pour les marchés de niche et réseaux d'envergure. Data engineering, IA dédiée (RAG), multicanal & handoff. Audit stratégique gratuit.",
    url: 'https://pulse.smatchroom.com/grands-comptes',
  },
};

const CHALLENGES = [
  {
    icon: PhoneOff,
    title: 'La barrière téléphonique',
    text: 'Les décideurs (directeurs techniques, chefs de parc, acheteurs) sont de plus en plus difficiles à joindre par appel à froid.',
  },
  {
    icon: Users2,
    title: 'Le coût humain',
    text: "Recruter, former et équiper un prospecteur junior coûte en moyenne 50 000 € par an, avec un taux d'échec et de turnover très élevé.",
  },
  {
    icon: BatteryLow,
    title: "L'usure des équipes",
    text: 'Vos meilleurs commerciaux perdent un temps précieux dans une phase d\'approche chronophage, au lieu de négocier et closer.',
  },
];

const SECTORS = [
  'Luxe', 'Éco-mobilité', 'Logiciels B2B (SaaS)', 'Industrie de pointe',
  'Réseaux de franchises', 'Acteurs du gros œuvre',
];

const STEPS = [
  {
    n: '01',
    icon: Crosshair,
    title: 'Data Engineering & Scraping chirurgical',
    sub: 'Extraction sur-mesure',
    text: "Nous créons des algorithmes sur-mesure pour extraire des bases de données complexes, introuvables sur le marché (ex : établissements haut de gamme avec accès maritime, passoires thermiques industrielles).",
  },
  {
    n: '02',
    icon: MessagesSquare,
    title: 'Cerveau IA dédié (Architecture RAG)',
    sub: 'Entraînement étanche',
    text: "Votre agent est entraîné de manière étanche sur vos plaquettes commerciales, vos tarifs et vos contraintes techniques. Il répond aux objections de vos prospects de manière autonome.",
  },
  {
    n: '03',
    icon: Handshake,
    title: 'Frappe multicanale & Handoff',
    sub: 'Cold-emailing · WhatsApp API',
    text: "Cold-emailing à très haute délivrabilité, numéros WhatsApp API officiels, et transfert instantané (handoff) sur le CRM de votre direction commerciale dès que le prospect est chaud.",
  },
];

const SETUP_ITEMS = [
  "Définition de votre cible idéale (ICP) et extraction de bases de données hautement qualifiées",
  'Création du « cerveau » de l\'agent : vocabulaire technique, arguments de vente, gestion des objections de votre marché',
  "Branchement de l'instance WhatsApp et système d'alerte pour vos commerciaux",
];

const LICENSE_ITEMS = [
  'Prospection active et continue : des centaines de points de contact qualifiés chaque mois',
  'Relances intelligentes automatiques auprès des prospects silencieux',
  "Maintenance complète de l'infrastructure serveurs et mises à jour de l'IA",
];

export default function GrandsComptesPage() {
  return (
    <main className="flex flex-col">
      <Nav />

      {/* Hero corporate */}
      <section className="relative overflow-hidden grain px-5 pb-16 pt-32 sm:px-6 sm:pt-40">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="animate-mesh absolute -right-40 -top-40 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(41,75,115,0.20),transparent_60%)] blur-3xl" />
          <div className="animate-mesh absolute -left-32 top-20 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(255,90,31,0.14),transparent_60%)] blur-3xl [animation-delay:-8s]" />
        </div>

        <div className="mx-auto max-w-4xl text-center">
          <span className="premium-badge inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.18em]">
            <Crosshair size={13} /> 👔 Division Corporate &amp; Grands Comptes
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-balance text-[2.3rem] font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            <span className="steel-grad">L&apos;Ingénierie d&apos;Acquisition B2B</span> pour les marchés de niche et{' '}
            <span className="font-serif-it text-[var(--steel)]">réseaux d&apos;envergure.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-base text-[var(--muted-strong)] sm:text-lg">
            Vous ciblez des décideurs inaccessibles — directeurs généraux, hôtellerie de luxe,
            acheteurs publics — sur un territoire national ou international&nbsp;? Une solution
            standardisée ne suffit pas. Nous concevons pour vous une{' '}
            <span className="font-semibold text-[var(--foreground)]">infrastructure de prospection sur-mesure.</span>
          </p>
          <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn-steel inline-flex items-center justify-center gap-2 px-6 py-4 text-base font-semibold">
              <Calendar size={17} /> Demander un audit stratégique gratuit
            </a>
            <a href="#ingenierie" className="btn-ghost inline-flex items-center justify-center gap-2 px-6 py-4 text-base font-medium">
              Voir ce que comprend l&apos;ingénierie
            </a>
          </div>
        </div>
      </section>

      {/* Pour qui ? — secteurs */}
      <section className="relative px-5 pt-4 pb-8 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="card grain relative overflow-hidden p-6 text-center sm:p-8">
              <p className="eyebrow eyebrow-steel">Pour qui ?</p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
                {SECTORS.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-[var(--steel-line)] bg-[var(--steel-soft)] px-4 py-2 text-sm font-medium text-[var(--muted-strong)]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Le défi */}
      <section className="relative px-5 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-12 max-w-2xl">
              <div className="mb-6 flex items-center gap-4">
                <span className="section-index">01 — Le défi</span>
                <span className="h-px flex-1 bg-[var(--border-strong)]" />
              </div>
              <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                L&apos;acquisition B2B à froid <span className="steel-grad">s&apos;essouffle.</span>
              </h2>
              <p className="mt-4 text-[var(--muted-strong)] sm:text-lg">
                Sur les marchés de niche et les réseaux d&apos;envergure, l&apos;ouverture de nouveaux
                comptes est le principal moteur de croissance. Mais les méthodes traditionnelles atteignent leurs limites.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-3">
            {CHALLENGES.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 90}>
                <div className="card card-hover flex h-full flex-col p-6 sm:p-7">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--steel-soft)] text-[var(--steel)] ring-1 ring-[var(--steel-line)]">
                    <Icon size={22} strokeWidth={1.8} />
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--foreground)]">{title}</h3>
                  <p className="mt-3 text-sm text-[var(--muted-strong)]">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* L'ingénierie Corporate — 3 piliers */}
      <section id="ingenierie" className="relative scroll-mt-24 px-5 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-12 max-w-2xl">
              <div className="mb-6 flex items-center gap-4">
                <span className="section-index">02 — L&apos;ingénierie Corporate</span>
                <span className="h-px flex-1 bg-[var(--border-strong)]" />
              </div>
              <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Ce que comprend <span className="steel-grad">l&apos;ingénierie Corporate.</span>
              </h2>
              <p className="mt-4 text-[var(--muted-strong)] sm:text-lg">
                Une infrastructure conçue de bout en bout pour votre marché : de l&apos;extraction de la
                donnée jusqu&apos;au transfert du prospect chaud à vos commerciaux.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-3">
            {STEPS.map(({ n, icon: Icon, title, sub, text }, i) => (
              <Reveal key={n} delay={i * 90}>
                <div className="card grain relative flex h-full flex-col overflow-hidden p-6 sm:p-7">
                  <span className="absolute right-5 top-4 font-display text-4xl font-semibold text-[var(--steel-soft)]">{n}</span>
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--steel-soft)] text-[var(--steel)] ring-1 ring-[var(--steel-line)]">
                    <Icon size={22} strokeWidth={1.8} />
                  </div>
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--steel)]">{sub}</p>
                  <h3 className="mt-1 text-xl font-semibold text-[var(--foreground)]">{title}</h3>
                  <p className="mt-3 text-sm text-[var(--muted-strong)]">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Modèle économique */}
      <section id="modele" className="relative px-5 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-12 max-w-2xl">
              <div className="mb-6 flex items-center gap-4">
                <span className="section-index">03 — Budget &amp; tarification</span>
                <span className="h-px flex-1 bg-[var(--border-strong)]" />
              </div>
              <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Votre marché est unique, <span className="steel-grad">notre infrastructure aussi.</span>
              </h2>
              <p className="mt-4 text-[var(--muted-strong)] sm:text-lg">
                Le budget est établi sur-mesure : <span className="font-semibold text-[var(--foreground)]">frais
                d&apos;ingénierie</span> (unique), <span className="font-semibold text-[var(--foreground)]">licence
                mensuelle</span>, et <span className="font-semibold text-[var(--foreground)]">success fee éventuel</span>.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-5 lg:grid-cols-2">
            <Reveal>
              <div className="card flex h-full flex-col p-7 sm:p-9">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--steel)]">Phase 1 · Frais d&apos;ingénierie</p>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-display text-4xl font-semibold text-[var(--foreground)]">Sur devis</span>
                  <span className="text-[var(--muted)]">unique</span>
                </div>
                <p className="mt-2 text-sm text-[var(--muted-strong)]">Audit, data engineering, entraînement de l&apos;IA et déploiement.</p>
                <ul className="mt-6 space-y-3">
                  {SETUP_ITEMS.map((it) => (
                    <li key={it} className="flex gap-2.5 text-sm text-[var(--muted-strong)]">
                      <Check size={17} className="mt-0.5 flex-shrink-0 text-[var(--steel)]" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={90}>
              <div className="card relative flex h-full flex-col p-7 ring-2 ring-[var(--steel)] sm:p-9">
                <span className="premium-badge absolute right-6 top-6 rounded-full px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.16em]">
                  Sans engagement
                </span>
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--steel)]">Phase 2 · Licence mensuelle</p>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-display text-4xl font-semibold text-[var(--foreground)]">Sur devis</span>
                  <span className="text-[var(--muted)]">/ mois</span>
                </div>
                <p className="mt-2 text-sm text-[var(--muted-strong)]">Licence « SDR autonome » · success fee éventuel.</p>
                <ul className="mt-6 space-y-3">
                  {LICENSE_ITEMS.map((it) => (
                    <li key={it} className="flex gap-2.5 text-sm text-[var(--muted-strong)]">
                      <Check size={17} className="mt-0.5 flex-shrink-0 text-[var(--steel)]" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* ROI */}
          <Reveal delay={120}>
            <div className="showcase-dark grain relative mt-6 overflow-hidden rounded-2xl p-7 sm:p-10">
              <div className="relative flex flex-col items-start gap-4 md:flex-row md:items-center">
                <ShieldCheck size={30} className="text-[#8fb4e0]" />
                <p className="text-balance text-base text-[var(--on-ink-muted)] sm:text-lg">
                  <span className="font-semibold text-white">ROI immédiat.</span> Dans l&apos;industrie et le gros œuvre,
                  le panier moyen d&apos;un nouveau compte se chiffre souvent en dizaines de milliers d&apos;euros.
                  L&apos;Agent Chasseur est conçu pour <span className="font-semibold text-white">s&apos;autofinancer dès le premier compte ouvert.</span>
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative px-5 py-16 sm:px-6 sm:py-24">
        <Reveal>
          <div className="mx-auto max-w-4xl">
            <div className="card grain relative overflow-hidden p-8 text-center sm:p-12">
              <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[radial-gradient(circle,var(--steel-soft),transparent_65%)]" />
              <p className="eyebrow eyebrow-steel">Audit stratégique gratuit</p>
              <h2 className="mx-auto mt-4 max-w-2xl text-balance text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
                30 minutes en visio pour cadrer votre marché.
              </h2>
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn-steel mx-auto mt-8 inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold">
                <Calendar size={18} /> Demander mon audit stratégique gratuit
                <ArrowRight size={16} />
              </a>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 border-t border-[var(--border)] pt-8 sm:flex-row sm:gap-8">
                <div className="text-center sm:text-left">
                  <p className="font-display text-lg font-semibold text-[var(--foreground)]">Alexis Fontana</p>
                  <p className="text-sm text-[var(--muted)]">Fondateur du Groupe SmatchRoom</p>
                </div>
                <div className="hidden h-10 w-px bg-[var(--border-strong)] sm:block" />
                <div className="flex flex-col gap-2 text-sm">
                  <a href="tel:+33771487698" className="inline-flex items-center gap-2 text-[var(--muted-strong)] hover:text-[var(--foreground)]">
                    <Phone size={15} className="text-[var(--steel)]" /> 07 71 48 76 98
                  </a>
                  <a href="mailto:a.fontana@smatchroom.fr" className="inline-flex items-center gap-2 text-[var(--muted-strong)] hover:text-[var(--foreground)]">
                    <Mail size={15} className="text-[var(--steel)]" /> a.fontana@smatchroom.fr
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <Footer />
    </main>
  );
}
