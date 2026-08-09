'use client';

/**
 * Avis Google.
 *
 * Deux modes seulement :
 *   1. `AVIS` rempli → mur d'avis servi en dur ;
 *   2. `AVIS` vide   → note + renvoi vers la fiche Google.
 *
 * On ne met JAMAIS d'avis inventé ici. Le widget Elfsight de la v5 a été
 * retiré : les deux comptes ont épuisé le quota de vues du plan gratuit le
 * 2026-07-31 et laissaient un trou dans la page. Pour passer en mode 1,
 * recopier les vrais avis de la fiche Google dans `AVIS`, verbatim.
 *
 * Format : { author: 'Prénom L.', role: 'Métier · Ville', stars: 5, text: '…', date: 'Juin 2026' }
 */

import { Star, ArrowUpRight, PenLine } from 'lucide-react';

/* Un seul format d'URL pour les deux boutons : `maps?cid=`, qui ouvre la fiche
   de façon fiable sur tous les navigateurs et dans l'application Google Maps.
   L'ancienne URL « voir les avis » passait par /search avec un fragment
   `#mpd=~…/customers/reviews` : ce fragment est interprété en JavaScript par
   Google et ne survit ni à tous les navigateurs ni aux webviews. Ne pas le
   remettre, et ne pas remettre non plus les paramètres de session (ei, sxsrf,
   sca_esv) qui expirent. */
const GOOGLE_URL = 'https://www.google.com/maps?cid=1742713614499117243';
const REVIEWS_URL = GOOGLE_URL;

const AVIS = [];
const RATING = { score: '5,0', count: null };

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

function Stars({ n = 5, size = 16 }) {
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: n }, (_, i) => (
        <Star key={i} size={size} className="fill-[#fbbc05] text-[#fbbc05]" />
      ))}
    </span>
  );
}

export default function AvisLp() {
  const hasCards = AVIS.length > 0;

  return (
    <section id="avis" className="relative scroll-mt-24 px-5 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex items-center gap-4">
          <span className="section-index">Avis clients</span>
          <span className="h-px flex-1 bg-[var(--border-strong)]" />
        </div>

        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <h2 className="text-balance text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-[3.1rem]">
              Et si vous préférez{' '}
              <span className="font-serif-it font-normal text-[var(--primary-ink)]">
                l&apos;avis des autres au nôtre.
              </span>
            </h2>

            <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="inline-flex items-center gap-2.5 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-4 py-2">
                <GoogleG size={16} />
                <span className="font-display text-lg font-semibold leading-none text-[var(--foreground)]">
                  {RATING.score}
                </span>
                <Stars size={14} />
              </span>
              <span className="text-sm text-[var(--muted-strong)]">
                Note de notre fiche Google{RATING.count ? ` · ${RATING.count} avis` : ''}
              </span>
            </div>

            {/* Information sur le traitement des avis, art. L.111-7-2 du Code de la
                consommation. Le texte doit rester exact : si les avis sont un jour
                collectés, filtrés ou sollicités autrement, il faut le réécrire. */}
            <p className="mt-5 max-w-2xl text-xs leading-relaxed text-[var(--muted)]">
              Ces avis sont déposés librement par nos clients sur notre fiche Google, à laquelle
              nous ne pouvons ni ajouter, ni supprimer, ni réordonner un avis. Nous ne les
              sélectionnons pas, ne les modérons pas et ne rémunérons pas leur publication. La
              note est celle calculée par Google à la date de dernière mise à jour de cette page.
              Aucune vérification de l&apos;achat n&apos;est effectuée par SMATCHROOM&nbsp;: le
              contrôle relève de Google.
            </p>
          </div>

          <div className="flex flex-shrink-0 flex-wrap gap-3">
            <a
              href={REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost inline-flex items-center gap-2 px-5 py-3 text-sm font-medium"
            >
              <GoogleG size={15} /> Voir les avis
              <ArrowUpRight size={14} />
            </a>
            <a
              href={GOOGLE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold"
            >
              <PenLine size={15} /> Laisser un avis
            </a>
          </div>
        </div>

        {hasCards ? (
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {AVIS.map((a, i) => (
              <article
                key={`${a.author}-${i}`}
                className={`card card-hover flex flex-col p-7 ${i % 3 === 1 ? 'lg:mt-8' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <Stars n={a.stars ?? 5} />
                  <GoogleG size={16} />
                </div>
                <p className="mt-5 flex-1 text-[0.95rem] leading-relaxed text-[var(--muted-strong)]">
                  {a.text}
                </p>
                <div className="mt-6 border-t border-[var(--border)] pt-4">
                  <p className="text-sm font-semibold text-[var(--foreground)]">{a.author}</p>
                  <p className="mt-0.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--muted)]">
                    {a.role}
                    {a.date ? ` · ${a.date}` : ''}
                  </p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <a
            href={REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="card card-hover grain group relative mt-14 flex flex-col items-center gap-5 overflow-hidden p-10 text-center sm:p-16"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,var(--primary-soft),transparent_60%)]"
            />
            <span className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--surface)] shadow-[var(--shadow-md)] ring-1 ring-[var(--border-strong)]">
              <GoogleG size={30} />
            </span>
            <Stars size={18} />
            <p className="relative max-w-xl text-lg font-medium text-[var(--foreground)] sm:text-xl">
              Nos clients racontent leur expérience directement sur notre fiche Google. Sans
              filtre, sans montage.
            </p>
            <span className="relative inline-flex items-center gap-2 font-semibold text-[var(--primary-ink)]">
              Ouvrir nos avis Google
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </span>
          </a>
        )}
      </div>
    </section>
  );
}
