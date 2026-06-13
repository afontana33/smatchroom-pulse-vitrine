import { Users } from 'lucide-react';

const CLIENTS = [
  "Tryba",
  "NextMove",
  "Émargeo",
  "Strato",
  "Jb pilotage"
];

export default function TrustedBy() {
  const scrollingList = [...CLIENTS, ...CLIENTS];

  return (
    <section className="relative z-20 flex justify-center px-6 pb-20">
      <div className="glass flex w-full max-w-4xl flex-col items-center justify-center gap-6 rounded-2xl px-8 py-6 sm:flex-row sm:justify-between">

        {/* Compteur +30 */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface-2)] ring-1 ring-[var(--border-strong)]">
            <Users size={18} className="text-[var(--primary-hover)]" />
          </div>
          <div className="text-left">
            <p className="font-mono text-xl font-semibold text-white">+30</p>
            <p className="text-xs uppercase tracking-[0.1em] text-[var(--muted)]">
              Entreprises accompagnées
            </p>
          </div>
        </div>

        <div className="hidden h-10 w-px bg-[var(--border-strong)] sm:block" />

        {/* Défilement vertical */}
        <div className="relative flex h-10 w-full items-center justify-center overflow-hidden sm:w-auto sm:min-w-[200px]">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-3 bg-gradient-to-b from-[rgba(20,20,42,0.9)] to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-3 bg-gradient-to-t from-[rgba(20,20,42,0.9)] to-transparent" />

          <div className="animate-scroll-vertical flex flex-col items-center gap-4 pt-10">
            {scrollingList.map((client, index) => (
              <span
                key={`${client}-${index}`}
                className="font-mono text-lg font-medium text-[var(--primary-hover)]"
              >
                {client}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
