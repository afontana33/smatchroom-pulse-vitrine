'use client';

import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

/* Ancres calées sur les sections de la landing v5 (voir src/app/page.js). */
const LINKS = [
  { href: '/#agents', label: 'Les agents' },
  { href: '/#demo', label: 'Démo' },
  { href: '/#cas-clients', label: 'Résultats' },
  { href: '/#avis', label: 'Avis' },
  { href: '/#tarifs', label: 'Tarifs' },
  { href: '/grands-comptes', label: 'Grands Comptes', accent: true },
  { href: '/agent-ia', label: 'Ressources' },
];

const CALENDLY = 'https://calendly.com/a-fontana-smatchroom/30min';

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
        'fixed inset-x-0 top-10 z-50 transition-all duration-300',
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

        <a
          href={CALENDLY}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary hidden items-center gap-2 px-5 py-2.5 text-sm font-semibold lg:inline-flex"
        >
          Réserver un créneau
          <ArrowRight size={15} />
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
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="btn-primary mt-3 inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold"
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
