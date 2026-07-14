import { Users } from 'lucide-react';

const CLIENTS = ['Tryba', 'BatInnov', 'JB Pilotage', 'NextMove', 'HDS Solutions', 'Duvernell'];

export default function TrustedBy() {
  return (
    <section className="relative z-20 px-5 pb-4 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="glass flex flex-col items-center gap-6 rounded-2xl px-6 py-6 sm:flex-row sm:justify-between sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--primary-soft)] ring-1 ring-[var(--primary-line)]">
              <Users size={18} className="text-[var(--primary-ink)]" />
            </div>
            <div className="text-left">
              <p className="font-display text-2xl font-semibold text-[var(--foreground)]">+90</p>
              <p className="text-xs uppercase tracking-[0.1em] text-[var(--muted)]">
                Artisans &amp; entreprises du bâtiment
              </p>
            </div>
          </div>

          <div className="hidden h-10 w-px bg-[var(--border-strong)] sm:block" />

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {CLIENTS.map((c) => (
              <span
                key={c}
                className="font-mono text-sm font-medium text-[var(--muted-strong)]"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
