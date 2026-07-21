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

// Pour ajouter/remplacer une photo : déposer l'image dans /public/team/<slug>.jpg
// et passer `photo: '/team/<slug>.jpg'`. Sans photo, un avatar initiales s'affiche.
const TEAM = [
  { name: 'Alexis Fontana', role: 'Fondateur', slug: 'alexis', photo: '/team/alexis.jpg' },
  { name: 'Manon', role: 'Co-fondatrice', slug: 'manon', photo: '/team/manon.jpg' },
  { name: 'Laura', role: 'Directrice commerciale', slug: 'laura', photo: '/team/laura.jpg' },
  { name: 'Noa', role: 'Alternant', slug: 'noa', photo: '/team/noa.jpg' },
];

function initials(name) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

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

        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
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

          {/* Colonne équipe */}
          <Reveal delay={90}>
            <div>
              <p className="eyebrow mb-5">L&apos;équipe</p>
              <div className="grid grid-cols-2 gap-4">
                {TEAM.map((m) => (
                  <figure
                    key={m.slug}
                    className="card card-hover grain group relative flex flex-col items-center overflow-hidden p-6 text-center transition-all duration-300"
                  >
                    <div aria-hidden className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(120%_80%_at_20%_0%,var(--primary-soft),transparent_60%)] opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="relative">
                      <div
                        aria-hidden
                        className="absolute -inset-1.5 rounded-2xl bg-[conic-gradient(from_140deg,var(--primary),var(--steel),var(--primary))] opacity-0 blur-[6px] transition-opacity duration-300 group-hover:opacity-60"
                      />
                      {m.photo ? (
                        <img
                          src={m.photo}
                          alt={`${m.name}, ${m.role} de SmatchRoom`}
                          width={128}
                          height={128}
                          className="relative h-28 w-28 rounded-2xl object-cover shadow-[var(--shadow-md)] ring-1 ring-[var(--border-strong)] transition-transform duration-300 group-hover:scale-[1.04]"
                        />
                      ) : (
                        <div className="relative flex h-28 w-28 items-center justify-center rounded-2xl bg-[var(--surface-2)] ring-1 ring-[var(--border-strong)] transition-transform duration-300 group-hover:scale-[1.04]">
                          <span className="font-serif-it text-4xl text-[var(--primary-ink)]">{initials(m.name)}</span>
                        </div>
                      )}
                    </div>
                    <figcaption className="relative mt-5">
                      <p className="font-display text-lg font-semibold leading-tight text-[var(--foreground)]">{m.name}</p>
                      <p className="mt-2 inline-block rounded-full bg-[var(--primary-soft)] px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[var(--primary-ink)]">
                        {m.role}
                      </p>
                    </figcaption>
                  </figure>
                ))}
              </div>
              <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-3 py-1.5 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-[var(--muted-strong)]">
                <MapPin size={13} className="text-[var(--primary-ink)]" /> Bordeaux · France
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
