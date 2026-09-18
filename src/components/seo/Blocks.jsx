/**
 * Briques communes aux pages par métier et par ville.
 *
 * Composants serveur, sans framer-motion : ces pages sont faites pour être lues
 * par un moteur autant que par un humain, et une animation d'apparition qui
 * démarre à `opacity: 0` n'apporte rien ici. Le reste du vocabulaire visuel est
 * celui de la landing (section-index, filet, cartes en rounded-2xl, bande
 * showcase-dark pour l'appel à l'action) pour que la navigation entre les deux
 * ne donne pas l'impression de changer de site.
 */

import { ArrowRight, Check } from 'lucide-react';
import { CALENDLY, TEL_DISPLAY, TEL_HREF } from '@/lib/contact';

export function Breadcrumb({ items }) {
  return (
    <nav aria-label="Fil d'Ariane" className="mb-10">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--muted)]">
        {items.map((it, i) => (
          <li key={it.href || it.label} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden>·</span>}
            {it.href ? (
              <a href={it.href} className="hover:text-[var(--primary-ink)]">
                {it.label}
              </a>
            ) : (
              <span aria-current="page" className="text-[var(--muted-strong)]">
                {it.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function SectionHead({ eyebrow, children }) {
  return (
    <div className="mb-10 flex items-center gap-4">
      <span className="section-index">{eyebrow}</span>
      <span className="h-px flex-1 bg-[var(--border-strong)]" />
      {children}
    </div>
  );
}

/** Titre de page. Un seul par page, c'est le H1. */
export function PageTitle({ lead, accent, chapeau, id }) {
  return (
    <div className="max-w-3xl">
      <h1
        id={id}
        className="text-balance text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-[3.1rem]"
      >
        {lead}{' '}
        <span className="font-serif-it font-normal text-[var(--primary-ink)]">{accent}</span>
      </h1>
      {chapeau && (
        <p className="mt-5 text-[var(--muted-strong)] sm:text-lg">{chapeau}</p>
      )}
    </div>
  );
}

export function Card({ title, children }) {
  return (
    <article className="rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] p-7">
      <h3 className="font-display text-lg font-semibold tracking-tight text-[var(--foreground)] sm:text-xl">
        {title}
      </h3>
      <p className="mt-3 text-[0.95rem] leading-relaxed text-[var(--muted-strong)]">{children}</p>
    </article>
  );
}

export function CheckList({ items }) {
  return (
    <ul className="space-y-3">
      {items.map((it) => (
        <li
          key={it}
          className="flex items-start gap-3 text-[0.95rem] leading-relaxed text-[var(--muted-strong)]"
        >
          <Check
            size={16}
            aria-hidden
            className="mt-1 flex-shrink-0 text-[var(--primary-ink)]"
            strokeWidth={2.4}
          />
          {it}
        </li>
      ))}
    </ul>
  );
}

/**
 * Les questions sont toujours dépliées, jamais en accordéon.
 *
 * Ce n'est pas un choix esthétique : ces pages déclarent une FAQPage en données
 * structurées, et une réponse masquée derrière un clic est une réponse que
 * Google considère comme non visible.
 */
export function FaqBlock({ items, titre = 'Questions fréquentes' }) {
  return (
    <div>
      <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-[2rem]">{titre}</h2>
      <dl className="mt-8 divide-y divide-[var(--border)] border-y border-[var(--border)]">
        {items.map((it) => (
          <div key={it.q} className="py-6">
            <dt className="text-base font-semibold text-[var(--foreground)] sm:text-lg">{it.q}</dt>
            <dd className="mt-2 max-w-3xl leading-relaxed text-[var(--muted-strong)]">{it.a}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/** Maillage interne : la grille de liens vers les pages sœurs. */
export function LinkGrid({ titre, intro, links }) {
  return (
    <div>
      <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-[2rem]">{titre}</h2>
      {intro && <p className="mt-4 max-w-3xl text-[var(--muted-strong)]">{intro}</p>}
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="group flex items-start justify-between gap-4 rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] p-5 transition-colors hover:border-[var(--primary)]"
          >
            <span>
              <span className="block text-[0.98rem] font-semibold text-[var(--foreground)]">
                {l.label}
              </span>
              {l.sub && (
                <span className="mt-1 block text-sm text-[var(--muted)]">{l.sub}</span>
              )}
            </span>
            <ArrowRight
              size={16}
              aria-hidden
              className="mt-1 flex-shrink-0 text-[var(--muted)] transition-colors group-hover:text-[var(--primary-ink)]"
            />
          </a>
        ))}
      </div>
    </div>
  );
}

export function CtaBand({ titre, texte }) {
  return (
    <div className="showcase-dark grain relative flex flex-col items-start justify-between gap-7 overflow-hidden rounded-3xl p-8 sm:p-12 lg:flex-row lg:items-center">
      <div className="relative max-w-2xl">
        <p className="font-display text-xl font-semibold text-white sm:text-2xl">{titre}</p>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-[var(--on-ink-muted)]">{texte}</p>
      </div>
      <div className="relative flex flex-shrink-0 flex-col items-start gap-3">
        <a
          href={CALENDLY}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold"
        >
          Réserver un créneau de 30 min
          <ArrowRight size={16} aria-hidden />
        </a>
        <a
          href={TEL_HREF}
          className="text-sm text-[var(--on-ink-muted)] underline decoration-white/25 underline-offset-4 hover:text-white"
        >
          ou appelez-nous&nbsp;: {TEL_DISPLAY}
        </a>
      </div>
    </div>
  );
}

/** Enveloppe de section : même rythme vertical que la landing. */
export function Section({ children, className = '', id }) {
  return (
    <section id={id} className={`relative px-5 py-16 sm:px-6 sm:py-20 ${className}`}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}
