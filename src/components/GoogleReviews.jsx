'use client';

import { useEffect } from 'react';
import { Star, ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal';

// Lien fiche Google (CID SmatchRoom) — pour « voir / laisser un avis ».
const GOOGLE_URL = 'https://www.google.com/maps?cid=1742713614499117243';

// Widget live Elfsight : identifiant de la classe elfsight-app-<ID>.
// Laisser vide => carte CTA seule.
// VIDÉ le 2026-07-31 : les deux comptes Elfsight ont épuisé le quota de vues du
// plan gratuit (« APP_VIEWS_LIMIT_REACHED » en console), le widget ne s'affichait
// plus du tout et laissait un trou dans la page. On sert la carte CTA en attendant
// de mettre les vrais avis en dur.
const ELFSIGHT_APP_ID = '';
const ELFSIGHT_PLATFORM = 'https://elfsightcdn.com/platform.js';

function GoogleG({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden>
      <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
      <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
      <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z" />
      <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
    </svg>
  );
}

export default function GoogleReviews() {
  useEffect(() => {
    if (!ELFSIGHT_APP_ID) return;
    if (document.querySelector('script[src*="elfsightcdn.com/platform.js"]')) return;
    const s = document.createElement('script');
    s.src = ELFSIGHT_PLATFORM;
    s.async = true;
    document.body.appendChild(s);
  }, []);

  return (
    <section id="avis" className="relative scroll-mt-24 px-5 py-24 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-10 flex items-center gap-4">
            <span className="section-index">Avis clients</span>
            <span className="h-px flex-1 bg-[var(--border-strong)]" />
          </div>
        </Reveal>

        <Reveal>
          <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                <span className="gradient-text">Ce que nos clients disent</span> de nous.
              </h2>
              <p className="mt-4 flex items-center gap-2 text-[var(--muted-strong)]">
                <span className="flex">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} size={18} className="fill-[#fbbc05] text-[#fbbc05]" />
                  ))}
                </span>
                <span>Avis vérifiés sur Google</span>
              </p>
            </div>
            <a
              href={GOOGLE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost inline-flex flex-shrink-0 items-center gap-2 px-5 py-3 text-sm font-medium"
            >
              <GoogleG size={16} /> Voir &amp; laisser un avis
              <ArrowUpRight size={15} />
            </a>
          </div>
        </Reveal>

        {ELFSIGHT_APP_ID ? (
          <div className={`elfsight-app-${ELFSIGHT_APP_ID}`} data-elfsight-app-lazy />
        ) : (
          <Reveal delay={80}>
            <a
              href={GOOGLE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="card card-hover grain group relative flex flex-col items-center gap-4 overflow-hidden p-10 text-center sm:p-14"
            >
              <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,var(--primary-soft),transparent_60%)]" />
              <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--surface)] shadow-[var(--shadow-md)] ring-1 ring-[var(--border-strong)]">
                <GoogleG size={26} />
              </span>
              <p className="relative max-w-xl text-lg font-medium text-[var(--foreground)] sm:text-xl">
                Retrouvez tous nos avis clients, en direct sur notre fiche Google.
              </p>
              <span className="relative inline-flex items-center gap-2 font-semibold text-[var(--primary-ink)]">
                Ouvrir nos avis Google
                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
          </Reveal>
        )}
      </div>
    </section>
  );
}
