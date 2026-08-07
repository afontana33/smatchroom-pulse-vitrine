import {
  ArrowRight, Globe, MapPin, Smartphone, Search, Star, FileText,
  Calendar, Phone, Mail, Check,
} from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';

const CALENDLY = 'https://calendly.com/a-fontana-smatchroom/30min';

export const metadata = {
  title: 'Site web & fiche établissement Google — Exister quand on vous cherche | SmatchRoom Pulse',
  description:
    "Création de votre site vitrine et de votre fiche établissement Google : structure claire, mobile, pages par ville et par prestation, photos, horaires, zone d'intervention, avis. 300 € HT de création puis 20 € HT/mois. Devis packagé si vous prenez aussi l'agent IA et l'acquisition Meta.",
  alternates: { canonical: 'https://pulse.smatchroom.com/sites' },
  openGraph: {
    title: 'Site web & fiche établissement Google — SmatchRoom Pulse',
    description:
      "Un site qui donne envie de vous appeler, et une fiche établissement Google tenue à jour. 300 € HT de création puis 20 € HT/mois.",
    url: 'https://pulse.smatchroom.com/sites',
  },
};

const SITE = [
  {
    icon: Smartphone,
    title: 'Pensé pour le téléphone',
    text: 'Huit visiteurs sur dix vous découvrent depuis un mobile, souvent debout, entre deux rendez-vous. Le site est conçu pour cet écran-là d’abord : chargement rapide, numéro cliquable, formulaire court.',
  },
  {
    icon: FileText,
    title: 'Vos prestations, en clair',
    text: 'Une page par prestation et par zone couverte, écrite dans les mots de vos clients et non dans le jargon du métier. C’est ce qui fait la différence sur les recherches précises.',
  },
  {
    icon: Search,
    title: 'Techniquement propre',
    text: 'Balises, données structurées, plan de site, vitesse : le socle qui permet à Google de comprendre ce que vous faites et où vous le faites.',
  },
];

const FICHE = [
  {
    icon: MapPin,
    title: 'Créée ou reprise en main',
    text: 'On crée votre fiche établissement Google si vous n’en avez pas, on récupère celle qui existe déjà si elle a été ouverte sans vous. Catégories, zone d’intervention, horaires, description : tout est rempli correctement.',
  },
  {
    icon: Star,
    title: 'Photos et avis',
    text: 'Vos réalisations sont publiées régulièrement sur la fiche, et vos avis reçoivent une réponse. Une fiche vivante remonte, une fiche figée descend.',
  },
  {
    icon: Globe,
    title: 'Reliée au site',
    text: 'La fiche et le site se renvoient l’un à l’autre, avec les mêmes informations partout : c’est ce que Google appelle la cohérence, et c’est ce qui vous fait apparaître dans le bloc de résultats locaux.',
  },
];

const LIVRABLES = [
  'Site vitrine responsive, hébergé et maintenu par nos soins',
  'Pages dédiées par prestation et par ville couverte',
  'Formulaire de demande de devis relié à votre agent Pulse',
  'Fiche établissement Google créée ou reprise, entièrement renseignée',
  'Publication de photos de chantier et réponses aux avis',
  'Mentions légales, politique de confidentialité et conformité RGPD',
];

export default function SitesPage() {
  return (
    <main className="flex flex-col">
      <Nav />

      {/* Hero */}
      <section className="grain relative overflow-hidden px-5 pb-16 pt-32 sm:px-6 sm:pt-40">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="animate-mesh absolute -right-40 -top-40 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(255,90,31,0.14),transparent_60%)] blur-3xl" />
          <div className="animate-mesh absolute -left-32 top-20 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(41,75,115,0.16),transparent_60%)] blur-3xl [animation-delay:-8s]" />
        </div>

        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--primary-line)] bg-[var(--primary-soft)] px-3.5 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[var(--primary-ink)]">
            <Globe size={13} /> Site &amp; fiche établissement
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-balance text-[2.3rem] font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Exister <span className="gradient-text">quand on vous cherche.</span>
          </h1>
          <div className="mx-auto mt-7 max-w-2xl space-y-4 text-left text-base text-[var(--muted-strong)] sm:text-lg">
            <p>
              Un client qui a entendu parler de vous tape votre nom sur Google. S’il ne trouve
              qu’un annuaire, une page Facebook abandonnée et aucun horaire, il appelle le suivant.
            </p>
            <p>
              Cette brique règle les deux endroits où on vous cherche vraiment : votre site et votre
              fiche établissement Google. Le reste du temps, ce sont l’agent et la publicité qui
              vont chercher les clients.
            </p>
          </div>

          <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Réserver 30 minutes pour un devis site et fiche établissement (nouvelle fenêtre)"
              className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-4 text-base font-semibold"
            >
              <Calendar size={17} /> Lancer mon site · 30 min
            </a>
            <a
              href="#livrables"
              className="btn-ghost inline-flex items-center justify-center gap-2 px-6 py-4 text-base font-medium"
            >
              Voir ce qui est livré
            </a>
          </div>
        </div>
      </section>

      {/* 01 — Le site */}
      <section className="relative px-5 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-12 max-w-2xl">
              <div className="mb-6 flex items-center gap-4">
                <span className="section-index">01 — Le site</span>
                <span className="h-px flex-1 bg-[var(--border-strong)]" />
              </div>
              <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Un site qui donne envie <span className="gradient-text">de vous appeler.</span>
              </h2>
              <p className="mt-4 text-[var(--muted-strong)] sm:text-lg">
                Pas une vitrine décorative : une page qui répond aux trois questions que se pose un
                client, ce que vous faites, où vous le faites, et comment vous joindre.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-3">
            {SITE.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 90}>
                <div className="card card-hover flex h-full flex-col p-6 sm:p-7">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary-soft)] text-[var(--primary-ink)] ring-1 ring-[var(--primary-line)]">
                    <Icon size={22} strokeWidth={1.8} />
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--foreground)]">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted-strong)]">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 02 — La fiche établissement */}
      <section className="relative px-5 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-12 max-w-2xl">
              <div className="mb-6 flex items-center gap-4">
                <span className="section-index">02 — La fiche établissement</span>
                <span className="h-px flex-1 bg-[var(--border-strong)]" />
              </div>
              <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                La fiche Google, <span className="gradient-text">c’est la première impression.</span>
              </h2>
              <p className="mt-4 text-[var(--muted-strong)] sm:text-lg">
                Pour une recherche locale, la fiche est vue avant le site. C’est elle qui affiche
                votre note, vos horaires, vos photos et le bouton « Appeler ».
              </p>
            </div>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-3">
            {FICHE.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 90}>
                <div className="card card-hover flex h-full flex-col p-6 sm:p-7">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary-soft)] text-[var(--primary-ink)] ring-1 ring-[var(--primary-line)]">
                    <Icon size={22} strokeWidth={1.8} />
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--foreground)]">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted-strong)]">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 03 — Livrables & tarif */}
      <section id="livrables" className="relative scroll-mt-24 px-5 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="mb-12 flex items-center gap-4">
              <span className="section-index">03 — Ce qui est livré</span>
              <span className="h-px flex-1 bg-[var(--border-strong)]" />
            </div>
          </Reveal>

          <div className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
            <Reveal>
              <div className="card h-full p-6 sm:p-8">
                <h2 className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">
                  Le périmètre standard
                </h2>
                <ul className="mt-6 space-y-3">
                  {LIVRABLES.map((l) => (
                    <li key={l} className="flex gap-2.5 text-sm text-[var(--muted-strong)]">
                      <Check size={16} strokeWidth={2.3} className="mt-0.5 flex-shrink-0 text-[var(--primary-ink)]" />
                      <span>{l}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={90}>
              <div className="card grain relative h-full overflow-hidden p-6 ring-2 ring-[var(--primary)] sm:p-8">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,var(--primary-soft),transparent_60%)]"
                />
                <div className="relative">
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--primary-ink)]">
                    Création (une seule fois)
                  </p>
                  <p className="mt-1 font-display text-4xl font-semibold text-[var(--foreground)]">
                    300 € HT
                  </p>

                  <div className="mt-6 border-t border-[var(--border)] pt-5">
                    <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--primary-ink)]">
                      Hébergement et suivi
                    </p>
                    <p className="mt-1 font-display text-4xl font-semibold text-[var(--foreground)]">
                      20 €{' '}
                      <span className="text-base font-normal text-[var(--muted)]">HT / mois</span>
                    </p>
                  </div>

                  <p className="mt-6 text-sm leading-relaxed text-[var(--muted-strong)]">
                    La mensualité couvre l’hébergement, les mises à jour et la tenue de la fiche
                    établissement. Si vous prenez plusieurs briques, l’agent, le site et
                    l’acquisition Meta, on vous fait un{' '}
                    <span className="font-semibold text-[var(--foreground)]">devis packagé</span>{' '}
                    plutôt que trois factures.
                  </p>
                  <a
                    href={CALENDLY}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Réserver 30 minutes pour lancer votre site et votre fiche établissement (nouvelle fenêtre)"
                    className="btn-primary mt-8 inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold"
                  >
                    Lancer mon site
                    <ArrowRight size={15} />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
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
                  On regarde où vous en êtes,{' '}
                  <span className="gradient-text">gratuitement.</span>
                </h2>
                <p className="mx-auto mt-5 max-w-2xl text-balance text-[var(--muted-strong)] sm:text-lg">
                  30 minutes pour faire le tour de votre site actuel et de votre fiche Google, et
                  vous dire ce qui manque. Sans engagement.
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
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <Footer />
    </main>
  );
}
