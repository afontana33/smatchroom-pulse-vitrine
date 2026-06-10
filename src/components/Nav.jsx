'use client';

import { useState, useEffect } from 'react';
import { Sparkles, Menu, X } from 'lucide-react';

const LINKS = [
  { href: '/commerces', label: 'Commerces', highlight: true },
  { href: '/entreprises', label: 'Entreprises' },
  { href: '#cas-usage', label: "Cas d'usage" },
  { href: '#tarifs', label: 'Tarifs' },
  { href: '/agent-ia', label: 'Ressources' },
  { href: '/blog', label: 'Blog' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-[var(--border)] bg-black/60 backdrop-blur-md'
          : 'bg-transparent',
      ].join(' ')}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#" className="inline-flex items-center gap-2 text-white">
          <Sparkles size={18} className="text-[var(--primary-hover)]" />
          <span className="font-mono text-sm uppercase tracking-[0.2em]">
            SmatchRoom <span className="text-[var(--primary-hover)]">·</span> Pulse
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={
                l.highlight
                  ? 'text-sm font-medium text-[var(--primary-hover)] transition-colors hover:text-white'
                  : 'text-sm text-[var(--muted)] transition-colors hover:text-white'
              }
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="https://calendly.com/a-fontana-smatchroom/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-full bg-[var(--primary)] px-5 py-2 text-sm font-medium text-black transition-colors hover:bg-[var(--primary-hover)] md:inline-flex"
        >
          Demander mon diagnostic
        </a>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-[var(--border)] bg-black/90 px-6 py-6 backdrop-blur-md md:hidden">
          <nav className="flex flex-col gap-4">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="text-base text-[var(--muted)] hover:text-white"
              >
                {l.label}
              </a>
            ))}
            <a
              href="https://calendly.com/a-fontana-smatchroom/30min"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-[var(--primary)] px-5 py-3 text-sm font-medium text-black"
            >
              Demander mon diagnostic
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
