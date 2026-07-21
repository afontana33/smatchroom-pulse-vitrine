'use client';

import { useEffect, useState } from 'react';

const LINES = [
  { p: '$ pulse run --agent=chasseur', t: 'cmd' },
  { p: '→ 42 syndics & agences identifiés · votre secteur', t: 'out' },
  { p: '✓ WhatsApp envoyé — relance devis #402', t: 'ok' },
  { p: '→ lead qualifié : ITE 120m² · MaPrimeRénov', t: 'out' },
  { p: '$ pulse run --agent=grands-comptes', t: 'cmd' },
  { p: '→ 3 directeurs techniques ciblés · gros œuvre', t: 'out' },
  { p: '✓ RDV posé jeudi 14h · handoff commercial', t: 'ok' },
];

const COLOR = {
  cmd: 'text-white',
  out: 'text-[var(--on-ink-muted)]',
  ok: 'text-emerald-400',
};

export default function TerminalLive() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count >= LINES.length) {
      const reset = setTimeout(() => setCount(0), 2600);
      return () => clearTimeout(reset);
    }
    const next = setTimeout(() => setCount((c) => c + 1), 850);
    return () => clearTimeout(next);
  }, [count]);

  return (
    <div className="terminal-dark w-full overflow-hidden rounded-2xl text-left font-mono text-[0.8rem] sm:text-sm">
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        <span className="ml-2 text-[0.65rem] uppercase tracking-[0.18em] text-[var(--on-ink-muted)]">
          agents · live
        </span>
        <span className="ml-auto inline-flex items-center gap-1.5 text-[0.6rem] uppercase tracking-[0.16em] text-emerald-400">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          online
        </span>
      </div>
      <div className="h-[300px] space-y-1.5 overflow-hidden px-4 py-4">
        {LINES.slice(0, count).map((line, i) => (
          <p key={i} className={COLOR[line.t]}>
            {line.p}
          </p>
        ))}
        <span className="inline-block h-4 w-2 animate-blink bg-[var(--primary)] align-middle" />
      </div>
    </div>
  );
}
