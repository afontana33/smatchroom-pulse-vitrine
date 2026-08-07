import {
  ArrowRight, Video, Camera, Clapperboard, Megaphone, Check,
  Calendar, Phone, Mail, PhoneOff, Wallet,
} from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';

const CALENDLY = 'https://calendly.com/a-fontana-smatchroom/30min';

export const metadata = {
  title: 'Pulse Terrain — Vos chantiers filmés, vos clients trouvés | SmatchRoom Pulse',
  description:
    "Production vidéo de vos chantiers et gestion de votre publicité Meta pour attirer des clients particuliers. Deux formules : vous filmez (690 € HT) ou notre vidéaste se déplace (1 490 € HT), plus 200 € HT / mois de gestion. Les demandes sont traitées par votre agent Pulse.",
  alternates: { canonical: 'https://pulse.smatchroom.com/pulse-terrain' },
  openGraph: {
    title: 'Pulse Terrain — Vos chantiers filmés. Vos clients trouvés.',
    description:
      "On filme vos chantiers, on diffuse vos vidéos auprès des particuliers de votre zone sur Facebook et Instagram, et votre agent Pulse traite les demandes immédiatement.",
    url: 'https://pulse.smatchroom.com/pulse-terrain',
  },
};

/* Tableau comparatif : une ligne = un critère, deux colonnes de formules. */
const COMPARE = [
  {
    critere: 'Tournage',
    b1: 'Vous, avec votre téléphone',
    b2: 'Notre vidéaste, sur votre chantier',
  },
  {
    critere: 'Accompagnement',
    b1: 'Script détaillé + visio de 30 min pendant que vous filmez',
    b2: 'Équipe sur place, direction d’acteur, prise de son pro',
  },
  {
    critere: 'Vidéos livrées',
    b1: '2 vidéos verticales',
    b2: '2 vidéos verticales + photos',
  },
  {
    critere: 'Frais de déplacement',
    b1: 'Aucun',
    b2: 'Inclus dans le prix',
  },
  {
    critere: 'Délai de livraison',
    b1: '5 jours après réception de vos rushes',
    b2: '10 jours après le tournage',
  },
  {
    critere: 'Campagne Meta',
    b1: 'Incluse',
    b2: 'Incluse',
  },
  {
    critere: 'Idéal pour',
    b1: 'Démarrer vite, petit budget',
    b2: 'Image soignée, zone concurrentielle',
  },
];

const FORMULES = [
  {
    key: 'b1',
    n: '01',
    icon: Video,
    badge: 'Brique 1',
    title: 'Vous filmez, on fait le reste',
    pitch:
      'La formule la plus rapide et la moins chère. Vous filmez vous-même avec votre téléphone, on vous guide pour que ce soit exploitable.',
    points: [
      'On vous envoie un script simple : 6 plans à filmer, expliqués en langage clair.',
      'Le jour J, on vous accompagne 30 minutes en visio pendant que vous filmez : on vous dit où vous placer, quoi dire, quand recommencer.',
      'Vous nous envoyez les vidéos. On monte 2 vidéos verticales prêtes pour Facebook et Instagram, qu’on fait tourner en alternance dans la campagne.',
      'On crée et on lance votre campagne publicitaire ciblée sur les particuliers de votre secteur.',
    ],
    highlight: 'Aucun frais de déplacement, puisque personne ne se déplace.',
    featured: false,
  },
  {
    key: 'b2',
    n: '02',
    icon: Camera,
    badge: 'Brique 2',
    title: 'On se déplace sur votre chantier',
    pitch:
      'La formule complète, pour une image qui vous démarque vraiment de la concurrence de votre zone.',
    points: [
      'Un vidéaste vient une demi-journée sur l’un de vos chantiers.',
      'On filme le chantier, vos gestes, les finitions, et vous face caméra (on vous dirige, pas besoin de savoir parler devant une caméra).',
      'Si un client satisfait accepte, on enregistre son témoignage : c’est le contenu qui convertit le mieux.',
      'On livre 2 vidéos verticales + une banque de photos réutilisables pour votre site et vos devis.',
      'On crée et on lance votre campagne publicitaire ciblée sur les particuliers de votre secteur.',
    ],
    highlight:
      'Les frais de déplacement, de repas et d’hébergement éventuel sont inclus dans le prix. Vous n’avez aucune note de frais à régler après coup.',
    featured: true,
  },
];

const TARIFS = [
  {
    poste: 'Production',
    cadence: 'une seule fois',
    detail: 'Tournage ou montage des rushes, 2 vidéos livrées, création et lancement de la campagne.',
    b1: '690 € HT',
    b2: '1 490 € HT',
  },
  {
    poste: 'Gestion mensuelle',
    cadence: 'tous les mois',
    detail: 'Diffusion, optimisation, suivi des demandes, point mensuel.',
    b1: '200 € HT / mois',
    b2: '200 € HT / mois',
    same: 'pour les deux formules',
  },
  {
    poste: 'Budget publicitaire Meta',
    cadence: 'payé directement par vous',
    detail: 'À partir de 15 € / jour conseillé.',
    b1: 'À partir de 15 € / jour',
    b2: 'À partir de 15 € / jour',
    same: 'payé directement par vous',
  },
];

const MENTIONS = [
  'Le budget publicitaire n’est pas facturé par nous : il est payé directement par vous à Meta, depuis votre propre compte. Vous gardez la main dessus, vous pouvez l’augmenter ou l’arrêter quand vous voulez, et vous savez exactement ce que vous dépensez.',
  'La production est facturée une seule fois. Ensuite, seule la gestion mensuelle court : il n’y a pas de nouveau tournage ni de nouveaux frais à prévoir.',
  'Sans engagement de durée. La gestion mensuelle s’arrête sur simple demande, avec un préavis d’un mois.',
];

const ETAPES = [
  'Un appel de 30 minutes pour comprendre votre métier, votre zone et le type de chantiers que vous voulez attirer.',
  'Le tournage : le vôtre ou le nôtre, selon la formule choisie.',
  'Le montage et la mise en ligne de votre campagne, sous 5 à 10 jours.',
  'Les demandes arrivent. Votre agent les traite. Vous ne prenez que les rendez-vous qui vous intéressent.',
  'Un point mensuel : ce que ça a coûté, ce que ça a rapporté, ce qu’on ajuste.',
];

export default function PulseTerrainPage() {
  return (
    <main className="flex flex-col">
      <Nav />

      {/* Hero */}
      <section className="grain relative overflow-hidden px-5 pb-16 pt-32 sm:px-6 sm:pt-40">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="animate-mesh absolute -right-40 -top-40 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(255,90,31,0.16),transparent_60%)] blur-3xl" />
          <div className="animate-mesh absolute -left-32 top-20 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(255,176,122,0.16),transparent_60%)] blur-3xl [animation-delay:-8s]" />
        </div>

        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--primary-line)] bg-[var(--primary-soft)] px-3.5 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[var(--primary-ink)]">
            <Clapperboard size={13} /> Pulse Terrain
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-balance text-[2.3rem] font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Vos chantiers filmés.{' '}
            <span className="gradient-text">Vos clients trouvés.</span>
          </h1>

          <div className="mx-auto mt-7 max-w-2xl space-y-4 text-left text-base text-[var(--muted-strong)] sm:text-lg">
            <p className="text-balance">
              Vous faites du bon travail. Le problème, c’est que personne ne le voit.
            </p>
            <p>
              Aujourd’hui, quand un particulier de votre secteur cherche un artisan pour refaire sa
              salle de bain ou sa toiture, il tombe sur des plateformes qui revendent son numéro à
              cinq entreprises. Pas sur vous.
            </p>
            <p>
              Pulse Terrain change ça : on filme vos chantiers, on diffuse vos vidéos auprès des
              particuliers de votre zone sur Facebook et Instagram, et les demandes qui arrivent
              sont traitées immédiatement par votre agent Pulse, même quand vous êtes sur un toit.
            </p>
          </div>

          <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Réserver 30 minutes avec SmatchRoom Pulse (nouvelle fenêtre)"
              className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-4 text-base font-semibold"
            >
              <Calendar size={17} /> Réserver 30 minutes
            </a>
            <a
              href="#formules"
              className="btn-ghost inline-flex items-center justify-center gap-2 px-6 py-4 text-base font-medium"
            >
              Voir les deux formules
            </a>
          </div>
        </div>
      </section>

      {/* 01 — Deux formules */}
      <section id="formules" className="relative scroll-mt-24 px-5 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="mb-12 max-w-2xl">
              <div className="mb-6 flex items-center gap-4">
                <span className="section-index">01 — Deux formules</span>
                <span className="h-px flex-1 bg-[var(--border-strong)]" />
              </div>
              <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                La différence entre les deux tient à une seule chose :{' '}
                <span className="gradient-text">qui tient la caméra.</span>
              </h2>
              <p className="mt-4 text-[var(--muted-strong)] sm:text-lg">
                Le reste, le montage, la campagne, le suivi, est identique.
              </p>
            </div>
          </Reveal>

          {/* Desktop : tableau. Mobile : une carte par formule (pas de scroll horizontal). */}
          <Reveal>
            <div className="card hidden overflow-hidden md:block">
              <table className="w-full border-collapse text-left text-sm">
                <caption className="sr-only">
                  Comparatif des deux formules Pulse Terrain, critère par critère
                </caption>
                <thead>
                  <tr className="border-b border-[var(--border-strong)] bg-[var(--surface-2)]">
                    <th scope="col" className="w-[22%] px-6 py-4 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--muted)]">
                      Critère
                    </th>
                    <th scope="col" className="px-6 py-4 text-base font-semibold text-[var(--foreground)]">
                      <span className="block font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--muted)]">
                        Brique 1
                      </span>
                      Vous filmez
                    </th>
                    <th scope="col" className="border-l border-[var(--border)] bg-[var(--primary-soft)] px-6 py-4 text-base font-semibold text-[var(--foreground)]">
                      <span className="block font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--primary-ink)]">
                        Brique 2
                      </span>
                      On se déplace
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE.map(({ critere, b1, b2 }) => (
                    <tr key={critere} className="border-b border-[var(--border)] last:border-b-0">
                      <th scope="row" className="px-6 py-4 align-top font-semibold text-[var(--foreground)]">
                        {critere}
                      </th>
                      <td className="px-6 py-4 align-top text-[var(--muted-strong)]">{b1}</td>
                      <td className="border-l border-[var(--border)] bg-[var(--primary-soft)] px-6 py-4 align-top text-[var(--muted-strong)]">
                        {b2}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <div className="grid gap-5 md:hidden">
            {[
              { badge: 'Brique 1', name: 'Vous filmez', pick: (r) => r.b1, featured: false },
              { badge: 'Brique 2', name: 'On se déplace', pick: (r) => r.b2, featured: true },
            ].map((col) => (
              <Reveal key={col.badge}>
                <div
                  className={[
                    'card p-6',
                    col.featured ? 'ring-2 ring-[var(--primary)]' : '',
                  ].join(' ')}
                >
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--primary-ink)]">
                    {col.badge}
                  </p>
                  <h3 className="mt-1 text-xl font-semibold text-[var(--foreground)]">{col.name}</h3>
                  <dl className="mt-5 space-y-4">
                    {COMPARE.map((r) => (
                      <div key={r.critere} className="border-t border-[var(--border)] pt-3">
                        <dt className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--muted)]">
                          {r.critere}
                        </dt>
                        <dd className="mt-1 text-sm text-[var(--muted-strong)]">{col.pick(r)}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 02 — Le détail des deux briques */}
      <section className="relative px-5 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="mb-12 flex items-center gap-4">
              <span className="section-index">02 — Le détail</span>
              <span className="h-px flex-1 bg-[var(--border-strong)]" />
            </div>
          </Reveal>

          <div className="grid gap-5 lg:grid-cols-2">
            {FORMULES.map(({ key, n, icon: Icon, badge, title, pitch, points, highlight, featured }, i) => (
              <Reveal key={key} delay={i * 90}>
                <article
                  className={[
                    'card grain relative flex h-full flex-col overflow-hidden p-6 sm:p-8',
                    featured ? 'ring-2 ring-[var(--primary)]' : 'card-hover',
                  ].join(' ')}
                >
                  <span className="absolute right-6 top-5 font-display text-4xl font-semibold text-[var(--primary-soft)]">
                    {n}
                  </span>
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary-soft)] text-[var(--primary-ink)] ring-1 ring-[var(--primary-line)]">
                    <Icon size={22} strokeWidth={1.8} />
                  </div>
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--primary-ink)]">
                    {badge}
                  </p>
                  <h3 className="mt-1 text-xl font-semibold tracking-tight text-[var(--foreground)] sm:text-2xl">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm text-[var(--muted-strong)] sm:text-base">{pitch}</p>

                  <ul className="mt-6 flex-1 space-y-3">
                    {points.map((p) => (
                      <li key={p} className="flex gap-2.5 text-sm text-[var(--muted-strong)]">
                        <Check size={16} strokeWidth={2.3} className="mt-0.5 flex-shrink-0 text-[var(--primary-ink)]" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-7 rounded-xl bg-[var(--primary-soft)] px-4 py-3 text-sm font-medium text-[var(--foreground)] ring-1 ring-[var(--primary-line)]">
                    {highlight}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 03 — Tarifs */}
      <section id="tarifs-terrain" className="relative scroll-mt-24 px-5 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="mb-12 max-w-2xl">
              <div className="mb-6 flex items-center gap-4">
                <span className="section-index">03 — Tarifs</span>
                <span className="h-px flex-1 bg-[var(--border-strong)]" />
              </div>
              <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Ce que vous payez, <span className="gradient-text">et quand.</span>
              </h2>
            </div>
          </Reveal>

          <Reveal>
            <div className="card hidden overflow-hidden md:block">
              <table className="w-full border-collapse text-left text-sm">
                <caption className="sr-only">
                  Tarifs Pulse Terrain par poste et par formule, en euros hors taxes
                </caption>
                <thead>
                  <tr className="border-b border-[var(--border-strong)] bg-[var(--surface-2)]">
                    <th scope="col" className="w-[40%] px-6 py-4 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--muted)]">
                      Poste
                    </th>
                    <th scope="col" className="px-6 py-4 text-base font-semibold text-[var(--foreground)]">
                      Brique 1 · Vous filmez
                    </th>
                    <th scope="col" className="border-l border-[var(--border)] bg-[var(--primary-soft)] px-6 py-4 text-base font-semibold text-[var(--foreground)]">
                      Brique 2 · On se déplace
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {TARIFS.map(({ poste, cadence, detail, b1, b2 }) => (
                    <tr key={poste} className="border-b border-[var(--border)] last:border-b-0">
                      <th scope="row" className="px-6 py-5 align-top">
                        <span className="block text-base font-semibold text-[var(--foreground)]">
                          {poste}{' '}
                          <span className="font-normal text-[var(--muted)]">({cadence})</span>
                        </span>
                        <span className="mt-1 block text-sm font-normal text-[var(--muted-strong)]">
                          {detail}
                        </span>
                      </th>
                      <td className="px-6 py-5 align-top">
                        <span className="font-display text-2xl font-semibold text-[var(--foreground)]">
                          {b1}
                        </span>
                      </td>
                      <td className="border-l border-[var(--border)] bg-[var(--primary-soft)] px-6 py-5 align-top">
                        <span className="font-display text-2xl font-semibold text-[var(--foreground)]">
                          {b2}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <div className="grid gap-5 md:hidden">
            {TARIFS.map(({ poste, cadence, detail, b1, b2, same }) => (
              <Reveal key={poste}>
                <div className="card p-6">
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--muted)]">
                    {cadence}
                  </p>
                  <h3 className="mt-1 text-xl font-semibold text-[var(--foreground)]">{poste}</h3>
                  <p className="mt-2 text-sm text-[var(--muted-strong)]">{detail}</p>
                  {same ? (
                    <div className="mt-5 border-t border-[var(--border)] pt-4">
                      <p className="font-display text-3xl font-semibold text-[var(--foreground)]">{b1}</p>
                      <p className="mt-1 text-xs text-[var(--muted)]">{same}</p>
                    </div>
                  ) : (
                    <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-[var(--border)] pt-4">
                      <div>
                        <dt className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--muted)]">
                          Brique 1
                        </dt>
                        <dd className="mt-1 font-display text-2xl font-semibold text-[var(--foreground)]">
                          {b1}
                        </dd>
                      </div>
                      <div className="rounded-xl bg-[var(--primary-soft)] p-3">
                        <dt className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--primary-ink)]">
                          Brique 2
                        </dt>
                        <dd className="mt-1 font-display text-2xl font-semibold text-[var(--foreground)]">
                          {b2}
                        </dd>
                      </div>
                    </dl>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <ul className="mt-8 space-y-4">
              {MENTIONS.map((m) => (
                <li key={m} className="flex gap-3 text-sm leading-relaxed text-[var(--muted-strong)]">
                  <Wallet size={16} strokeWidth={1.8} className="mt-0.5 flex-shrink-0 text-[var(--primary-ink)]" />
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* 04 — Ce qui nous différencie d'une agence classique */}
      <section className="relative px-5 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <div className="mb-12 flex items-center gap-4">
              <span className="section-index">04 — Face à une agence</span>
              <span className="h-px flex-1 bg-[var(--border-strong)]" />
            </div>
          </Reveal>

          <Reveal>
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Ce qui nous différencie{' '}
              <span className="gradient-text">d’une agence classique.</span>
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <Reveal>
              <div className="card flex h-full flex-col p-6 sm:p-7">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--surface-2)] text-[var(--muted-strong)] ring-1 ring-[var(--border-strong)]">
                  <PhoneOff size={22} strokeWidth={1.8} />
                </div>
                <p className="text-sm leading-relaxed text-[var(--muted-strong)] sm:text-base">
                  Une agence vous fait une belle vidéo, lance une campagne, et vous laisse gérer les
                  appels. Résultat : la moitié des demandes ne sont jamais rappelées, parce que vous
                  êtes sur un chantier quand le téléphone sonne.
                </p>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <div className="card grain flex h-full flex-col overflow-hidden p-6 ring-2 ring-[var(--primary)] sm:p-7">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary-soft)] text-[var(--primary-ink)] ring-1 ring-[var(--primary-line)]">
                  <Megaphone size={22} strokeWidth={1.8} />
                </div>
                <p className="text-sm leading-relaxed text-[var(--muted-strong)] sm:text-base">
                  Chez nous, les demandes générées par la publicité tombent directement dans votre
                  agent Pulse. Il répond en moins d’une minute, 7j/7, qualifie le besoin, et ne vous
                  transmet que ce qui vaut le déplacement.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 05 — Comment ça se passe */}
      <section className="relative px-5 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <div className="mb-12">
              <div className="mb-6 flex items-center gap-4">
                <span className="section-index">05 — Le déroulé</span>
                <span className="h-px flex-1 bg-[var(--border-strong)]" />
              </div>
              <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Comment <span className="gradient-text">ça se passe.</span>
              </h2>
            </div>
          </Reveal>

          <ol className="relative space-y-8">
            <span
              aria-hidden
              className="absolute left-[1.35rem] top-3 h-[calc(100%-1.5rem)] w-px bg-[var(--border-strong)] sm:left-[1.6rem]"
            />
            {ETAPES.map((texte, i) => (
              <Reveal key={texte} as="li" delay={i * 80} className="relative flex gap-6 sm:gap-8">
                <span className="relative z-[1] inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--surface)] font-display text-base font-semibold text-[var(--primary-ink)] shadow-[var(--shadow-sm)] sm:h-[3.2rem] sm:w-[3.2rem]">
                  {i + 1}
                </span>
                <p className="pt-3 text-sm leading-relaxed text-[var(--muted-strong)] sm:text-base">
                  {texte}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA final */}
      <section id="contact" className="relative scroll-mt-24 px-5 pb-24 pt-8 sm:px-6">
        <Reveal>
          <div className="mx-auto max-w-4xl">
            <div className="card grain relative overflow-hidden p-8 text-center sm:p-12">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,var(--primary-soft),transparent_60%)]"
              />
              <div className="relative">
                <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                  Parlons de <span className="gradient-text">votre secteur.</span>
                </h2>
                <p className="mx-auto mt-5 max-w-2xl text-balance text-[var(--muted-strong)] sm:text-lg">
                  30 minutes, gratuit, sans engagement. On vous dit franchement si votre zone et
                  votre métier s’y prêtent, et si ce n’est pas le cas, on vous le dira aussi.
                </p>

                <a
                  href={CALENDLY}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Réserver 30 minutes avec SmatchRoom Pulse (nouvelle fenêtre)"
                  className="btn-primary mx-auto mt-9 inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold"
                >
                  <Calendar size={18} /> Réserver 30 minutes
                  <ArrowRight size={16} />
                </a>

                <div className="mt-10 flex flex-col items-center justify-center gap-4 border-t border-[var(--border)] pt-8 sm:flex-row sm:gap-8">
                  <div className="text-center sm:text-left">
                    <p className="font-display text-lg font-semibold text-[var(--foreground)]">
                      Alexis Fontana
                    </p>
                    <p className="text-sm text-[var(--muted)]">Fondateur du Groupe SmatchRoom</p>
                  </div>
                  <div className="hidden h-10 w-px bg-[var(--border-strong)] sm:block" />
                  <div className="flex flex-col gap-2 text-sm">
                    <a
                      href="tel:+33771487698"
                      aria-label="Appeler le 07 71 48 76 98"
                      className="inline-flex items-center gap-2 text-[var(--muted-strong)] hover:text-[var(--foreground)]"
                    >
                      <Phone size={15} className="text-[var(--primary-ink)]" /> 07 71 48 76 98
                    </a>
                    <a
                      href="mailto:a.fontana@smatchroom.fr"
                      aria-label="Écrire à a.fontana@smatchroom.fr"
                      className="inline-flex items-center gap-2 text-[var(--muted-strong)] hover:text-[var(--foreground)]"
                    >
                      <Mail size={15} className="text-[var(--primary-ink)]" /> a.fontana@smatchroom.fr
                    </a>
                  </div>
                </div>

                <p className="mt-8 text-xs leading-relaxed text-[var(--muted)]">
                  Tarifs HT. Les résultats d’une campagne publicitaire dépendent du secteur, de la
                  zone et de la saison : nous nous engageons sur la mise en place et le suivi du
                  dispositif, pas sur un nombre de chantiers signés.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <Footer />
    </main>
  );
}
