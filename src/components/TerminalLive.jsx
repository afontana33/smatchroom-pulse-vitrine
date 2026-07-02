'use client';

import { useEffect, useState } from 'react';

const LINES = [
  { p: '$ pulse run --agent=chasseur', t: 'cmd' },
  { p: '→ 42 couvreurs identifiés · Lille (59)', t: 'out' },
  { p: '✓ WhatsApp envoyé — relance devis #402', t: 'ok' },
  { p: '→ lead qualifié : ITE 120m² · MaPrimeRénov', t: 'out' },
  { p: '✓ RDV posé jeudi 14h · agenda synchronisé', t: 'ok' },
];

const COLOR = {
  cmd: 'text-white',
  out: 'text-[var(--muted)]',
  ok: 'text-[var(--signal)]',
};

export default function TerminalLive() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count >= LINES.length) {
      const reset = setTimeout(() => setCount(0), 2600);
      return () => clearTimeout(reset);
    }
    const next = setTimeout(() => setCount((c) => c + 1), 900);
    return () => clearTimeout(next);
  }, [count]);

  return (
    <div className="glass w-full max-w-lg overflow-hidden rounded-2xl text-left font-mono text-sm">
      <div className="flex items-center gap-2 border-b border-[var(--border)] bg-[var(--surface-2)]/60 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        <span className="ml-2 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
          agents · live
        </span>
      </div>
      <div className="min-h-[170px] space-y-1.5 px-4 py-4">
        {LINES.slice(0, count).map((line, i) => (
          <p key={i} className={COLOR[line.t]}>
            {line.p}
          </p>
        ))}
        <span className="inline-block h-4 w-2 animate-pulse bg-[var(--primary)] align-middle" />
      </div>
    </div>
  );
}
