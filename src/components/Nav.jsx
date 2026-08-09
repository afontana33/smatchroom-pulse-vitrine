'use client';

import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Phone } from 'lucide-react';

/* Le site tient en une page : le menu ne pointe que sur ses ancres, plus le
   blog et les ressources qui restent des pages à part. Ne pas y remettre de
   page produit, elles ont été supprimées (voir les redirections 301 dans
   next.config.mjs). */
const LINKS = [
  { href: '/#qui-sommes-nous', label: 'Qui nous sommes' },
  { href: '/#piliers', label: 'Nos offres' },
  { href: '/#resultats', label: 'Résultats' },
  { href: '/#avis', label: 'Avis' },
  { href: '/#questions', label: 'Questions' },
  { href: '/blog', label: 'Blog' },
];

const CALENDLY = 'https://calendly.com/a-fontana-smatchroom/30min';

/* Deuxième chemin de conversion, assumé : une partie de la cible (artisans,
   dirigeants de TPE) n'ouvrira jamais un agenda pour choisir un créneau, elle
   appelle. Le numéro doit rester lisible en clair, pas caché derrière une icône :
   beaucoup le composent sur un fixe au lieu de cliquer. */
export const TEL_DISPLAY = '07 71 48 76 98';
export const TEL_HREF = 'tel:+33771487698';

function Wordmark({ onDark = false }) {
  return (
    <a
      href="/"
      className={`inline-flex items-center gap-2.5 ${onDark ? 'text-white' : 'text-[var(--foreground)]'}`}
    >
      <span className="relative flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--primary)] text-white shadow-[0_6px_18px_-6px_var(--primary-glow)]">
        <span className="h-2 w-2 animate-pulse-ring rounded-full bg-white" />
      </span>
      <span className="font-mono text-sm uppercase tracking-[0.2em]">
        SmatchRoom{' '}
        <span className={onDark ? 'text-[#ffb27a]' : 'text-[var(--primary-ink)]'}>Pulse</span>
      </span>
    </a>
  );
}

/**
 * `overDark` : la page commence par une section en registre encre (la landing v5).
 * Tant qu'on n'a pas scrollé, la barre est transparente au-dessus de ce fond
 * sombre, donc son texte doit passer en blanc, sinon il est illisible.
 */
export default function Nav({ overDark = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Une fois la barre en verre ivoire, on revient au texte encre. */
  const onDark = overDark && !scrolled;

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-[var(--border)] bg-[rgba(246,244,239,0.82)] backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      ].join(' ')}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3.5 sm:px-6">
        <Wordmark onDark={onDark} />

        <nav className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={[
                'text-sm font-medium transition-colors',
                l.accent
                  ? onDark
                    ? 'text-[#9fc0e8] hover:text-white'
                    : 'text-[var(--steel)] hover:text-[var(--steel-hover)]'
                  : onDark
                    ? 'text-white/75 hover:text-white'
                    : 'text-[var(--muted-strong)] hover:text-[var(--foreground)]',
              ].join(' ')}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={TEL_HREF}
            className={[
              'inline-flex items-center gap-2 text-[0.95rem] font-semibold tracking-tight transition-colors',
              onDark ? 'text-white hover:text-[#ffb27a]' : 'text-[var(--foreground)] hover:text-[var(--primary-ink)]',
            ].join(' ')}
          >
            <Phone size={15} strokeWidth={2.4} className={onDark ? 'text-[#ffb27a]' : 'text-[var(--primary-ink)]'} />
            {TEL_DISPLAY}
          </a>
          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold"
          >
            Réserver un créneau
            <ArrowRight size={15} />
          </a>
        </div>

        {/* Sur mobile le numéro sort du menu burger : un appel ne doit jamais
            demander d'ouvrir un menu d'abord. */}
        <a
          href={TEL_HREF}
          aria-label={`Appeler le ${TEL_DISPLAY}`}
          className={[
            'inline-flex h-10 items-center gap-2 rounded-xl border px-3 text-sm font-semibold lg:hidden',
            onDark
              ? 'border-white/25 bg-white/10 text-white backdrop-blur-md'
              : 'border-[var(--primary)] bg-[var(--primary-soft)] text-[var(--primary-ink)]',
          ].join(' ')}
        >
          <Phone size={15} strokeWidth={2.4} />
          <span className="hidden sm:inline">{TEL_DISPLAY}</span>
          <span className="sm:hidden">Appeler</span>
        </a>

        <button
          onClick={() => setMobileOpen((v) => !v)}
          className={[
            'inline-flex h-10 w-10 items-center justify-center rounded-xl border lg:hidden',
            onDark
              ? 'border-white/20 bg-white/10 text-white backdrop-blur-md'
              : 'border-[var(--border-strong)] bg-[var(--surface)] text-[var(--foreground)]',
          ].join(' ')}
          aria-label="Menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-[var(--border)] bg-[rgba(246,244,239,0.97)] px-5 py-6 backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className={[
                  'rounded-xl px-3 py-3 text-base font-medium transition-colors',
                  l.accent
                    ? 'text-[var(--steel)]'
                    : 'text-[var(--muted-strong)] hover:bg-[var(--surface-2)] hover:text-[var(--foreground)]',
                ].join(' ')}
              >
                {l.label}
              </a>
            ))}
            <a
              href={TEL_HREF}
              onClick={() => setMobileOpen(false)}
              className="mt-3 inline-flex items-center justify-center gap-2.5 rounded-xl border border-[var(--primary)] bg-[var(--primary-soft)] px-5 py-3.5 text-base font-bold tracking-tight text-[var(--primary-ink)]"
            >
              <Phone size={17} strokeWidth={2.4} />
              {TEL_DISPLAY}
            </a>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="btn-primary mt-2 inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold"
            >
              Réserver un créneau
              <ArrowRight size={15} />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
