import { Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-[var(--border)] bg-[var(--surface)]/40 px-6 py-14">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="inline-flex items-center gap-2 text-white">
              <Sparkles size={18} className="text-[var(--primary-hover)]" />
              <span className="font-mono text-sm uppercase tracking-[0.2em]">
                SmatchRoom · Pulse
              </span>
            </div>
            <p className="mt-4 max-w-md text-sm text-[var(--muted)]">
              L'usine à agents IA du groupe SmatchRoom. SEO, Sales, Marketing —
              déployés en 48h, sur ton infra, sur ton métier.
            </p>
          </div>

          {/* Écosystème */}
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--primary)]">
              Écosystème
            </p>
            <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
              <li><a href="https://smatchroom.com" className="hover:text-white">SmatchRoom App</a></li>
              <li><a href="https://pro.smatchroom.com" className="hover:text-white">SmatchRoom Pro</a></li>
              <li><a href="https://émargeo.com" className="hover:text-white">Émargeo</a></li>
              <li><a href="#" className="text-white">SmatchRoom Pulse</a></li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--primary)]">
              Navigation
            </p>
            <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
              <li><a href="/entrepreneurs" className="font-medium text-[var(--primary-hover)] hover:text-white">Artisans & entrepreneurs</a></li>
              <li><a href="/entreprises" className="hover:text-white">Entreprises & PME</a></li>
              <li><a href="/#cas-usage" className="hover:text-white">Cas d'usage</a></li>
              <li><a href="/#tarifs" className="hover:text-white">Tarifs</a></li>
              <li><a href="/#faq" className="hover:text-white">FAQ</a></li>
              <li><a href="/blog" className="hover:text-white">Blog</a></li>
              <li><a href="https://calendly.com/a-fontana-smatchroom/30min" target="_blank" rel="noopener noreferrer" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Mentions légales */}
        <div className="mt-12 grid gap-6 border-t border-[var(--border)] pt-8 text-xs text-[var(--muted)] md:grid-cols-[1fr_auto] md:items-end">
          <div className="space-y-1 font-mono">
            <p className="text-[var(--foreground)]">SMATCHROOM · SAS</p>
            <p>5 rue Fénelon · 33000 Bordeaux · France</p>
            <p>SIREN 989 883 509 — SIRET 989 883 509 00014</p>
            <p>TVA intracommunautaire : FR01 989 883 509</p>
            <p>NAF/APE 62.01Z — Programmation informatique</p>
            <p className="opacity-70">Immatriculée RNE/INPI · 31/07/2025</p>
          </div>
          <div className="text-right">
            <p>© {new Date().getFullYear()} SmatchRoom — Tous droits réservés</p>
            <p className="mt-1 opacity-70">
              <a href="/mentions-legales" className="hover:text-white">Mentions légales</a>
              <span className="mx-2">·</span>
              <a href="/confidentialite" className="hover:text-white">Confidentialité</a>
              <span className="mx-2">·</span>
              <a href="/cgv" className="hover:text-white">CGV</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
