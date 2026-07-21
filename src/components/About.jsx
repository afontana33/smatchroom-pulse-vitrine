import { MapPin, ShieldCheck, Code2 } from 'lucide-react';
import Reveal from './Reveal';

const TRUST = [
  {
    icon: MapPin,
    title: 'Made in France',
    text: 'Entreprise technologique basée à Bordeaux.',
  },
  {
    icon: ShieldCheck,
    title: 'Sécurité',
    text: 'Infrastructure conforme RGPD et protection stricte de vos données.',
  },
  {
    icon: Code2,
    title: 'Vraie tech',
    text: 'Pas de bricolage : du code robuste, pensé pour la rentabilité.',
  },
];

export default function About() {
  return (
    <section id="a-propos" className="relative scroll-mt-24 px-5 py-24 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-12 flex items-center gap-4">
            <span className="section-index">À propos de SmatchRoom</span>
            <span className="h-px flex-1 bg-[var(--border-strong)]" />
          </div>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-12">
          {/* Colonne texte */}
          <Reveal>
            <div>
              <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08]">
                L&apos;ingénierie technologique au service du{' '}
                <span className="font-serif-it text-[var(--primary-ink)]">contact humain.</span>
              </h2>

              <div className="mt-6 space-y-4 text-base text-[var(--muted-strong)] sm:text-lg">
                <p>
                  Basée à Bordeaux, SmatchRoom n&apos;est ni une agence de communication traditionnelle,
                  ni un simple revendeur de logiciels. Nous sommes des{' '}
                  <span className="font-semibold text-[var(--foreground)]">ingénieurs en acquisition B2B.</span>
                </p>
                <p>
                  Fondée par <span className="font-semibold text-[var(--foreground)]">Alexis Fontana</span>,
                  notre entreprise est née d&apos;une conviction simple : le talent de vos équipes
                  commerciales ou de vos artisans ne devrait plus être gaspillé dans la prospection à
                  froid, le tri de bases de données ou les relances sans fin. Votre véritable valeur
                  ajoutée est sur le terrain — le conseil, la négociation, l&apos;expertise métier.
                </p>
                <p>
                  C&apos;est pourquoi nous concevons nos propres technologies en interne : extraction de
                  données complexes et IA de pointe, pour créer des collaborateurs numériques invisibles
                  mais redoutablement efficaces.
                </p>
                <p className="text-[var(--foreground)]">
                  <span className="font-semibold">Notre mission :</span> la machine gère la prospection de
                  masse pour que vous vous concentriez sur l&apos;essentiel — l&apos;humain et le closing.
                </p>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {TRUST.map(({ icon: Icon, title, text }) => (
                  <div key={title} className="card flex flex-col gap-2 p-4">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--primary-soft)] text-[var(--primary-ink)] ring-1 ring-[var(--primary-line)]">
                      <Icon size={17} strokeWidth={1.8} />
                    </span>
                    <p className="font-semibold text-[var(--foreground)]">{title}</p>
                    <p className="text-sm text-[var(--muted-strong)]">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Colonne portrait — emplacement photo (fondateur / bureaux) */}
          <Reveal delay={90}>
            <figure className="relative">
              {/*
                Pour remplacer le visuel par une vraie photo (fondateur ou bureaux),
                déposer l'image dans /public et remplacer ce bloc par :
                <img src="/alexis-fontana.jpg" alt="Alexis Fontana, fondateur de SmatchRoom" className="aspect-[4/5] w-full rounded-2xl object-cover shadow-[var(--shadow-lg)]" />
              */}
              <div className="card grain relative flex aspect-[4/5] flex-col justify-between overflow-hidden p-7 shadow-[var(--shadow-lg)]">
                <div aria-hidden className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(120%_90%_at_15%_10%,var(--primary-soft),transparent_55%),radial-gradient(120%_90%_at_90%_100%,var(--steel-soft),transparent_55%)]" />
                <div className="relative">
                  <img
                    src="/alexis-fontana.jpg"
                    alt="Alexis Fontana, fondateur du Groupe SmatchRoom"
                    width={144}
                    height={144}
                    className="h-32 w-32 rounded-2xl object-cover shadow-[var(--shadow-md)] ring-1 ring-[var(--border-strong)] sm:h-36 sm:w-36"
                  />
                </div>
                <figcaption className="relative">
                  <p className="font-display text-2xl font-semibold text-[var(--foreground)]">Alexis Fontana</p>
                  <p className="mt-1 text-sm text-[var(--muted-strong)]">Fondateur du Groupe SmatchRoom</p>
                  <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-[var(--muted-strong)]">
                    <MapPin size={13} className="text-[var(--primary-ink)]" /> Bordeaux · France
                  </p>
                </figcaption>
              </div>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
