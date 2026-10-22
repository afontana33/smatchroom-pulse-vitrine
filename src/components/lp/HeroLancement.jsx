/**
 * Hero de conversion : le test gratuit, le titre, puis à droite les quatre
 * offres (deux agents, publicité Meta, site et fiche Google) avec leur prix et
 * le bouton de rendez-vous. Les Packs Lancement restent détaillés plus bas
 * (#packs), avec un lien sous le bouton (21/10/2026).
 *
 * Remplace HeroLp + Packs sur l'accueil. Les preuves suivent immédiatement :
 * ne rien intercaler entre ce bloc et #resultats.
 */

import { ArrowRight, Building2, Globe, Handshake, Megaphone, Phone, Radar, Star } from 'lucide-react';
import { CALENDLY, TEL_DISPLAY, TEL_HREF } from '@/lib/contact';

/* Les quatre offres, mises en avant en tête d'accueil à la place du Pack
   Lancement (demande du 21/10/2026). Prix identiques à Piliers.jsx et
   lib/offers.js : les changer ensemble. */
const OFFRES = [
  {
    Icone: Handshake,
    titre: 'Agent Partenaires',
    texte: 'Il trouve les apporteurs d’affaires de votre zone et les contacte en votre nom.',
    prix: '149 € HT / mois',
    href: '/apporteur-affaires',
  },
  {
    Icone: Building2,
    titre: 'Agent Clients B2B',
    texte: 'Il repère les entreprises prêtes à acheter et écrit à leurs dirigeants sur le bon canal : WhatsApp, email ou LinkedIn.',
    prix: 'dès 340 € HT / mois',
    href: '/prospection-b2b',
  },
  {
    Icone: Megaphone,
    titre: 'Publicité Facebook et Instagram',
    texte: 'Vos vidéos montées en publicités locales, avec formulaire de contact.',
    prix: 'dès 490 € HT',
    href: '/publicite-facebook-instagram',
  },
  {
    Icone: Globe,
    titre: 'Site internet et fiche Google',
    texte: 'Un site rapide à votre nom et une fiche Google complète.',
    prix: '300 € HT',
    href: '/site-web-artisan',
  },
];

const PRESSE = [
  { nom: 'RTL2', logo: '/presse/rtl2.webp' },
  { nom: 'Le Figaro', logo: '/presse/le-figaro.webp' },
  { nom: 'Sud Ouest', logo: '/presse/sud-ouest.webp' },
];

export function CtaRdv({ className = '' }) {
  return (
    <a
      href={CALENDLY}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn-primary inline-flex items-center justify-center gap-2.5 px-8 py-5 text-base font-bold shadow-[0_14px_40px_-10px_rgba(124,58,237,0.75)] sm:text-lg ${className}`}
    >
      Réserver mon créneau gratuit de 15 min
      <ArrowRight size={20} aria-hidden />
    </a>
  );
}

export default function HeroLancement() {
  return (
    <section id="lancement" className="relative scroll-mt-24 px-5 pb-16 pt-24 sm:px-6 sm:pt-32 lg:pt-36">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-6">
          {/* Test gratuit en tête de page (demande du 21/10/2026) : la réponse
              visible à « je veux tester avant ». Mène au simulateur. */}
          <a
            href="/simulateur"
            className="group mb-8 flex w-full max-w-xl items-center gap-4 rounded-2xl border-2 border-[var(--primary)] bg-[var(--surface)] p-4 shadow-[var(--shadow-lg)] transition-transform hover:-translate-y-0.5 sm:p-5"
          >
            <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--primary)] text-white">
              <Radar size={24} aria-hidden />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-display text-xl font-semibold tracking-tight text-[var(--foreground)] sm:text-2xl">
                Tester gratuitement
              </span>
              <span className="mt-0.5 block text-sm text-[var(--muted-strong)]">
                Voyez en 1 minute qui l’agent contacterait pour vous, dans votre ville.
              </span>
            </span>
            <ArrowRight
              size={22}
              aria-hidden
              className="flex-shrink-0 text-[var(--primary-ink)] transition-transform group-hover:translate-x-1"
            />
          </a>
          <p className="eyebrow">Indépendants · TPE · PME · B2B</p>
          <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.04] tracking-tight sm:text-5xl lg:text-[3.8rem]">
            Vos meilleurs clients ne vous cherchent pas.{' '}
            <span className="font-serif-it font-normal text-[var(--primary-ink)]">
              On va les chercher.
            </span>
          </h1>
          <p className="mt-4 max-w-lg text-lg sm:mt-6 leading-relaxed text-[var(--muted-strong)]">
            Vous êtes sur le terrain, on vous ramène les rendez-vous.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-[var(--muted-strong)]">
            <a href={TEL_HREF} className="inline-flex items-center gap-2 font-semibold text-[var(--foreground)]">
              <Phone size={16} aria-hidden className="text-[var(--primary-ink)]" />
              {TEL_DISPLAY}
            </a>
            <a href="#avis" className="inline-flex items-center gap-1.5">
              <Star size={16} aria-hidden className="fill-[var(--primary)] text-[var(--primary)]" />
              <span className="font-semibold text-[var(--foreground)]">5,0</span> sur Google
            </a>
            <a href="#resultats">+170 entreprises accompagnées</a>
          </div>

          {/* Bandeau presse (21/10/2026). Noms en texte tant que les logos
              officiels ne sont pas fournis : déposer le fichier dans
              public/presse/ et renseigner `logo` pour l'afficher à la place. */}
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3">
            <span className="w-full font-mono sm:w-auto text-[0.62rem] uppercase tracking-[0.16em] text-[var(--muted)]">
              Ils ont parlé de nous
            </span>
            {PRESSE.map((m) =>
              m.logo ? (
                <img
                  key={m.nom}
                  src={m.logo}
                  alt={m.nom}
                  height={48}
                  className="h-12 w-auto rounded-lg shadow-[var(--shadow-md)] ring-1 ring-white/10"
                />
              ) : (
                <span key={m.nom} className="font-display text-lg font-semibold tracking-tight text-[var(--foreground)] opacity-85">
                  {m.nom}
                </span>
              ),
            )}
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a href="/apporteur-affaires" className="inline-flex items-center justify-between gap-3 rounded-2xl border-2 border-[var(--border)] bg-[var(--surface)] px-5 py-3.5 text-sm font-semibold text-[var(--foreground)] transition-colors hover:border-[var(--primary)]">Je cherche des apporteurs d&apos;affaires <span aria-hidden className="text-[var(--primary-ink)]">→</span></a>
            <a href="/prospection-b2b" className="inline-flex items-center justify-between gap-3 rounded-2xl border-2 border-[var(--border)] bg-[var(--surface)] px-5 py-3.5 text-sm font-semibold text-[var(--foreground)] transition-colors hover:border-[var(--primary)]">Je veux prospecter des entreprises <span aria-hidden className="text-[var(--primary-ink)]">→</span></a>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="rounded-3xl border-2 border-[var(--primary)] bg-[var(--surface)] p-6 shadow-[var(--shadow-lg)] sm:p-8">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--muted)]">
              Ce que nous faisons pour vous
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              Deux agents, la publicité locale{' '}
              <span className="font-serif-it font-normal text-[var(--primary-ink)]">et votre vitrine.</span>
            </h2>

            <ul className="mt-6 space-y-3">
              {OFFRES.map(({ Icone, titre, texte, prix, href }) => (
                <li key={titre}>
                  <a
                    href={href}
                    className="group flex items-start gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-4 transition-colors hover:border-[var(--primary)]"
                  >
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--primary-soft)] text-[var(--primary-ink)]">
                      <Icone size={20} aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-baseline justify-between gap-x-3">
                        <span className="font-semibold text-[var(--foreground)]">{titre}</span>
                        <span className="text-sm font-semibold text-[var(--primary-ink)]">{prix}</span>
                      </span>
                      <span className="mt-1 block text-sm leading-snug text-[var(--muted-strong)]">{texte}</span>
                    </span>
                    <ArrowRight
                      size={16}
                      aria-hidden
                      className="mt-1 flex-shrink-0 text-[var(--muted)] transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--primary-ink)]"
                    />
                  </a>
                </li>
              ))}
            </ul>

            <p className="mt-5 text-sm text-[var(--muted-strong)]">
              Sans engagement. Aucun rendez-vous dans le mois avec un agent&nbsp;: le mois suivant
              n&apos;est pas facturé.
            </p>

            <CtaRdv className="mt-5 w-full" />

            <a
              href="#packs"
              className="mt-4 block text-center text-sm text-[var(--muted-strong)] underline-offset-4 hover:text-[var(--foreground)] hover:underline"
            >
              Vous lancez votre activité&nbsp;? Packs Lancement dès 490&nbsp;€&nbsp;HT →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
