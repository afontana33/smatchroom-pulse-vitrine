import { ArrowRight, Check, Store, Utensils, Wrench, ShoppingBag, Calendar } from 'lucide-react';

export const metadata = {
  title: 'Pulse pour les commerces et artisans — SmatchRoom Pulse',
  description:
    "Un assistant IA sur-mesure pour les artisans, restaurateurs et indépendants. Il trouve vos clients, améliore votre visibilité et gère vos tâches répétitives — pendant que vous faites votre métier. À partir de 500 € + 150 €/mois.",
  openGraph: {
    title: 'Pulse pour les commerces et artisans',
    description:
      "Un assistant IA sur-mesure pour les artisans, restaurateurs et indépendants. Opérationnel en 48h. À partir de 500 € + 150 €/mois.",
  },
};

const CALENDLY = 'https://calendly.com/a-fontana-smatchroom/30min';

const BENEFITS = [
  {
    icon: Store,
    title: 'Il trouve vos clients',
    desc: "L'assistant repère chaque jour de nouveaux prospects dans votre zone et leur envoie un message personnalisé en votre nom. Vous ne cherchez plus — vous recevez.",
  },
  {
    icon: ShoppingBag,
    title: 'Il vous rend visible sur Google',
    desc: "Il publie régulièrement du contenu sur votre site pour que les gens vous trouvent quand ils cherchent votre service dans votre ville.",
  },
  {
    icon: Calendar,
    title: 'Il gère les tâches répétitives',
    desc: "Répondre aux demandes de devis, envoyer des rappels, mettre à jour votre agenda : les petites tâches qui mangent votre temps, il les prend en charge.",
  },
];

const PROFILES = [
  { icon: Utensils, label: 'Restaurateurs' },
  { icon: Wrench, label: 'Artisans' },
  { icon: ShoppingBag, label: 'Commerces de proximité' },
  { icon: Store, label: 'Indépendants' },
];

export default function CommercesPage() {
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
            <Store size={14} />
            <span>Pour les commerces et artisans</span>
          </div>
          <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            <span className="gradient-text">Votre assistant IA,</span>{' '}
            <span className="text-white">conçu pour votre métier.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-lg text-[var(--muted)]">
            Vous avez un commerce, un restaurant, un atelier. Vous n'avez pas le temps de faire votre marketing, de chercher des clients, de gérer les tâches répétitives.{' '}
            <span className="text-white">Pulse s'en charge à votre place.</span>
          </p>
          <div className="mt-8 flex flex-col items-center gap-3">
            <div className="font-semibold text-white text-xl">
              À partir de <span className="gradient-text">500 €</span> d'installation{' '}
              <span className="text-[var(--muted)]">+</span>{' '}
              <span className="gradient-text">150 €/mois</span>
            </div>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-7 py-3.5 font-medium text-black transition-all hover:bg-[var(--primary-hover)] hover:shadow-[0_0_40px_-5px_var(--primary-glow)]"
            >
              <Calendar size={18} />
              Réserver 30 min (gratuit)
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--muted)]">
              Visio · Sans engagement · Opérationnel en 48h
            </p>
          </div>
        </div>
      </section>

      {/* Pour qui */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-4xl">
          <p className="mb-6 text-center text-sm text-[var(--muted)]">Fait pour :</p>
          <div className="flex flex-wrap justify-center gap-3">
            {PROFILES.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-2)] px-4 py-2 text-sm text-white"
              >
                <Icon size={15} className="text-[var(--primary-hover)]" strokeWidth={1.8} />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bénéfices */}
      <section className="px-6 pb-28">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <p className="eyebrow">Ce que ça fait concrètement</p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              <span className="gradient-text">Il travaille,</span> vous vous concentrez sur votre cœur de métier.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {BENEFITS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="glass rounded-2xl p-7">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary-soft)] text-[var(--primary-hover)] ring-1 ring-[var(--border-strong)]">
                  <Icon size={22} strokeWidth={1.8} />
                </div>
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm text-[var(--muted)]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preuve Émargeo */}
      <section className="px-6 pb-28">
        <div className="mx-auto max-w-4xl">
          <div className="glass relative overflow-hidden rounded-2xl p-8 md:p-10">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_50%,var(--primary-soft),transparent_60%)]"
            />
            <div className="relative">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--primary)]">
                Émargeo · Restauration · Notre propre produit
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-white md:text-3xl">
                On l'a d'abord construit pour nos propres restaurants.
              </h3>
              <p className="mt-4 text-[var(--muted)]">
                Émargeo est le logiciel qu'on a développé pour notre propre activité dans la restauration. Il intègre un assistant vocal, la gestion des plannings, le suivi des stocks et des coûts alimentaires. On ne vend pas une promesse — on a d'abord résolu le problème pour nous-mêmes.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="font-mono text-2xl font-semibold text-white">28%</div>
                <div className="text-sm text-[var(--muted)]">Food Cost mesuré · stabilisé grâce à l'assistant</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tarif clair */}
      <section className="px-6 pb-28">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <p className="eyebrow">Tarif</p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              <span className="gradient-text">Transparent, sans surprise.</span>
            </h2>
          </div>
          <div className="glass rounded-2xl p-8 md:p-10">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-8">
              <div>
                <p className="text-sm text-[var(--muted)]">Installation</p>
                <p className="text-4xl font-semibold text-white">500 €</p>
                <p className="text-xs text-[var(--muted)]">une seule fois</p>
              </div>
              <div className="hidden text-3xl text-[var(--border-strong)] sm:block">+</div>
              <div>
                <p className="text-sm text-[var(--muted)]">Abonnement mensuel</p>
                <p className="text-4xl font-semibold text-white">150 €<span className="text-lg font-normal text-[var(--muted)]">/mois</span></p>
                <p className="text-xs text-[var(--muted)]">sans engagement long terme</p>
              </div>
            </div>
            <ul className="mb-8 space-y-3">
              {[
                'Assistant conçu sur-mesure pour votre activité',
                'Opérationnel en 48h après le premier appel',
                'Tableau de bord simple pour suivre ce qu\'il fait',
                'Support disponible si vous avez une question',
                'Vous pouvez arrêter quand vous voulez',
              ].map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-[var(--muted)]">
                  <Check size={15} className="flex-shrink-0 text-[var(--primary-hover)]" strokeWidth={2.5} />
                  {f}
                </li>
              ))}
            </ul>
            <p className="text-xs text-[var(--muted)]/60">
              * Le tarif exact est confirmé lors du diagnostic de cadrage (30 min, offert). Il peut varier selon la complexité de votre besoin. Voir nos{' '}
              <a href="/cgv" className="underline hover:text-[var(--muted)]">CGV</a>{' '}
              pour les détails, notamment concernant la garantie de déploiement en 48h.
            </p>
          </div>
        </div>
      </section>

      {/* Témoignages — placeholders */}
      <section className="px-6 pb-28">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <p className="eyebrow">Ils utilisent Pulse</p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight">
              <span className="gradient-text">Ce qu'ils en disent</span>
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="glass rounded-2xl border-2 border-dashed border-[var(--border-strong)] p-8 text-center"
              >
                <p className="text-sm italic text-[var(--muted)]/50">
                  — Témoignage client à renseigner —
                </p>
                <p className="mt-3 text-xs text-[var(--muted)]/30">Nom · Métier · Ville</p>
              </div>
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
          <div className="rounded-3xl border border-[var(--border-strong)] bg-gradient-to-b from-[var(--surface-2)] to-[var(--surface)] p-10 md:p-14">
            <p className="eyebrow">Première étape</p>
            <h2 className="mt-3 text-balance text-2xl font-semibold tracking-tight md:text-4xl">
              <span className="gradient-text">30 min pour voir si on peut vous aider.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-balance text-[var(--muted)]">
              On comprend votre activité, on vous explique ce qu'on peut faire pour vous. Si ce n'est pas pertinent, on vous le dit aussi.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3">
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-8 py-4 text-base font-medium text-black transition-all hover:bg-[var(--primary-hover)] hover:shadow-[0_0_40px_-5px_var(--primary-glow)]"
              >
                <Calendar size={18} />
                Réserver mon créneau (gratuit)
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
