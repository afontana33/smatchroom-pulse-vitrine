const CLIENTS = [
  'Tryba', 'BatInnov', 'JB Pilotage & Stratégie', 'NextMove', 'HDS Solutions',
  'Ets Duvernell', 'DTR Service', 'Habitat Multi Services',
];

export default function TrustedBy() {
  const loop = [...CLIENTS, ...CLIENTS];
  return (
    <section className="relative z-20 px-5 py-10 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-7 flex flex-col items-center gap-1 text-center">
          <p className="eyebrow">Ils nous font confiance</p>
          <p className="text-sm text-[var(--muted)]">
            <span className="font-display text-base font-semibold text-[var(--foreground)]">+90</span>{' '}
            artisans &amp; entreprises accompagnés
          </p>
        </div>

        <div className="marquee-group marquee-mask relative overflow-hidden">
          <ul className="animate-marquee flex items-center gap-x-10 pr-10 sm:gap-x-14 sm:pr-14">
            {loop.map((c, i) => (
              <li key={i} className="flex items-center gap-x-10 sm:gap-x-14" aria-hidden={i >= CLIENTS.length}>
                <span className="whitespace-nowrap font-display text-xl font-semibold tracking-tight text-[var(--muted-strong)] transition-colors hover:text-[var(--primary-ink)] sm:text-2xl">
                  {c}
                </span>
                <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--primary)]/40" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
