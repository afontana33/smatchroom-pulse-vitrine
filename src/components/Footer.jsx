/**
 * Pied de page, dans les deux langues.
 *
 * Un seul composant et deux dictionnaires plutôt qu'un FooterEn cloné :
 * l'identité légale, et la liste des pages légales
 * doivent rester identiques d'une langue à l'autre, et un clone les fait
 * diverger au premier changement d'adresse ou de mention obligatoire.
 *
 * La version anglaise se limite à la landing : la colonne de navigation ne
 * pointe donc que sur ses ancres, jamais sur une page française déguisée en
 * lien anglais. Les documents légaux font exception, ils n'existent qu'en
 * français et sont signalés comme tels.
 */

import { LEGAL, TEL_DISPLAY, TEL_DISPLAY_INTL, TEL_HREF } from '@/lib/contact';

const CONTENT = {
  fr: {
    pitch:
      "Nous digitalisons et automatisons la recherche de clients, de l'artisan seul à la grande entreprise. Trois piliers : les agents IA qui prospectent et répondent 7j/7, le site et la fiche établissement Google qui vous font exister, l'acquisition Meta qui vous amène des clients particuliers.",
    phone: TEL_DISPLAY,
    hours: 'lun. au ven. · 9h à 19h',
    ecosystem: 'Écosystème',
    navTitle: 'Navigation',
    nav: [
      { href: '/#qui-sommes-nous', label: 'Qui nous sommes' },
      { href: '/#piliers', label: 'Nos offres et nos prix' },
      { href: '/#agent-clients', label: 'Agent Clients (B2B)' },
      { href: '/pack-lancement', label: 'Pack Lancement Entrepreneurs' },
      { href: '/apporteur-affaires', label: 'Trouver des apporteurs d’affaires' },
      { href: '/prospection-b2b', label: 'Prospection B2B' },
      { href: '/site-web-artisan', label: 'Site internet et fiche Google' },
      { href: '/publicite-facebook-instagram', label: 'Publicité Facebook et Instagram' },
      { href: '/metiers', label: 'Agents par métier' },
      { href: '/agence-ia', label: 'Zones desservies' },
      { href: '/#resultats', label: 'Résultats' },
      { href: '/#avis', label: 'Avis clients' },
      { href: '/#questions', label: 'Questions fréquentes' },
      { href: '/blog', label: 'Blog' },
      { href: '/agent-ia', label: 'Ressources agent IA' },
      { href: 'https://calendly.com/a-fontana-smatchroom/30min', label: 'Contact', external: true },
    ],
    legalLine: 'Immatriculée RNE/INPI · 31/07/2025',
    vat: 'TVA intracommunautaire : FR01 989 883 509',
    naf: 'NAF/APE 62.01Z · Programmation informatique',
    rights: 'Tous droits réservés',
    legal: [
      { href: '/mentions-legales', label: 'Mentions légales' },
      { href: '/confidentialite', label: 'Confidentialité' },
      { href: '/cgv-services', label: 'CGV Services' },
      { href: '/cgv-produits', label: 'CGV Produits' },
      { href: '/politique-cookies', label: 'Politique cookies' },
      { href: '/transparence-ia', label: 'Transparence IA' },
      { href: '#cookies', label: 'Gérer mes cookies' },
    ],
  },
  en: {
    pitch:
      'We build and run what goes out to find your customers. For companies selling to companies, that means one thing: a digital sales rep trained on your market, your catalogue and your objections, that hands over a qualified conversation to your team.',
    phone: TEL_DISPLAY_INTL,
    hours: 'Mon to Fri · 9am to 7pm Paris time',
    ecosystem: 'Group',
    navTitle: 'Navigation',
    nav: [
      { href: '/en#what-we-do', label: 'What we do' },
      { href: '/en#agent', label: 'The B2B agent' },
      { href: '/en#pricing', label: 'Pricing' },
      { href: '/en#how', label: 'How it goes' },
      { href: '/en#results', label: 'Results' },
      { href: '/en#questions', label: 'Questions' },
      { href: '/', label: 'Site en français', lang: 'fr' },
      { href: 'https://calendly.com/a-fontana-smatchroom/30min', label: 'Contact', external: true },
    ],
    legalLine: 'Registered with the French trade register (RNE/INPI) · 31 July 2025',
    vat: 'EU VAT number: FR01 989 883 509',
    naf: 'NAF/APE 62.01Z · Computer programming',
    rights: 'All rights reserved',
    /* Les documents légaux n'existent qu'en français, et c'est la version qui
       fait foi : les libellés sont en anglais, `lang="fr"` prévient le lecteur
       (et les lecteurs d'écran) que la page d'arrivée est en français. Traduire
       des CGV et une politique de confidentialité sans relecture juridique
       créerait deux textes concurrents sur les mêmes obligations. */
    legal: [
      { href: '/mentions-legales', label: 'Legal notice (FR)', lang: 'fr' },
      { href: '/confidentialite', label: 'Privacy policy (FR)', lang: 'fr' },
      { href: '/cgv-services', label: 'Terms of service (FR)', lang: 'fr' },
      { href: '/politique-cookies', label: 'Cookie policy (FR)', lang: 'fr' },
      { href: '/transparence-ia', label: 'AI transparency (FR)', lang: 'fr' },
      { href: '#cookies', label: 'Manage cookies' },
    ],
  },
};

export default function Footer({ locale = 'fr' }) {
  const t = CONTENT[locale] ?? CONTENT.fr;

  return (
    <footer className="relative mt-auto border-t border-[var(--border)] bg-[var(--surface)] px-5 py-14 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="inline-flex items-center gap-2.5 text-[var(--foreground)]">
              {/* Même pictogramme que le header, voir le commentaire dans
                  Nav.jsx pour le choix du picto plutôt que du logo complet. */}
              <img
                src="/brand/pulse-picto.png"
                alt=""
                aria-hidden
                width={277}
                height={224}
                className="h-7 w-auto shrink-0"
              />
              <span className="font-mono text-sm uppercase tracking-[0.2em]">
                SmatchRoom <span className="text-[var(--primary-ink)]">Pulse</span>
              </span>
            </div>
            <p className="mt-4 max-w-md text-sm text-[var(--muted-strong)]">{t.pitch}</p>
            <a
              href={TEL_HREF}
              className="mt-5 inline-flex items-baseline gap-2 font-display text-xl font-bold tracking-tight text-[var(--foreground)] hover:text-[var(--primary-ink)]"
            >
              {t.phone}
              <span className="text-xs font-normal text-[var(--muted)]">{t.hours}</span>
            </a>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--primary-ink)]">
              {t.ecosystem}
            </p>
            <ul className="mt-4 space-y-2 text-sm text-[var(--muted-strong)]">
              <li>
                <a href="https://smatchroom.com" className="hover:text-[var(--foreground)]">
                  smatchroom.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--primary-ink)]">
              {t.navTitle}
            </p>
            <ul className="mt-4 space-y-2 text-sm text-[var(--muted-strong)]">
              {t.nav.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    lang={l.lang}
                    hrefLang={l.lang}
                    {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="hover:text-[var(--foreground)]"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 grid gap-6 border-t border-[var(--border)] pt-8 text-xs text-[var(--muted)] md:grid-cols-[1fr_auto] md:items-end">
          <div className="space-y-1 font-mono">
            <p className="text-[var(--foreground)]">SMATCHROOM · SAS</p>
            <p>
              {LEGAL.street} · {LEGAL.postalCode} {LEGAL.city} · France
            </p>
            <p>
              SIREN {LEGAL.siren} · SIRET {LEGAL.siret}
            </p>
            <p>{t.vat}</p>
            <p>{t.naf}</p>
            <p className="opacity-70">{t.legalLine}</p>
          </div>
          <div className="text-left md:text-right">
            <p>
              © {new Date().getFullYear()} SmatchRoom · {t.rights}
            </p>
            <p className="mt-1 flex flex-wrap justify-start gap-x-2 gap-y-1 opacity-70 md:justify-end">
              {t.legal.map((l, i) => (
                <span key={l.href} className="flex items-center gap-x-2">
                  {i > 0 && <span aria-hidden>·</span>}
                  {/* Le lien #cookies ouvre le panneau Tarteaucitron : voir
                      CONSENT_HASH dans CookieConsent.jsx. C'est l'unique moyen de
                      revenir sur un choix, il doit rester présent sur toutes les
                      pages, dans les deux langues. */}
                  <a
                    href={l.href}
                    lang={l.lang}
                    hrefLang={l.lang}
                    className="hover:text-[var(--foreground)]"
                  >
                    {l.label}
                  </a>
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
