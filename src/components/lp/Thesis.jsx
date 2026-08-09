'use client';

/**
 * Qui nous sommes · ce que nous faisons.
 *
 * Une seule idée par colonne : la photo porte le métier de nos clients, le
 * texte porte le nôtre. Volontairement sans vocabulaire technique (pas de
 * scraping, pas de LLM, pas de pipeline) : la page s'adresse à un artisan
 * autant qu'à un directeur commercial.
 */

import { motion, useReducedMotion } from 'framer-motion';

const POINTS = [
  {
    k: '01',
    t: 'Un interlocuteur, pas un logiciel',
    d: 'Vous ne recevez pas des identifiants et un tutoriel. On installe, on règle, on suit.',
  },
  {
    k: '02',
    t: 'En place en 48 heures',
    d: 'Le temps de comprendre votre métier et votre zone, et c’est en route.',
  },
  {
    k: '03',
    t: 'De l’artisan seul au grand compte',
    d: 'Un couvreur dans les Landes ou une direction commerciale nationale : même méthode, autre échelle.',
  },
];

function Rise({ children, delay = 0, className }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12%' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Thesis() {
  return (
    <section id="qui-sommes-nous" className="relative scroll-mt-24 px-5 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Rise>
          <div className="mb-14 flex items-center gap-4">
            <span className="section-index">Qui nous sommes</span>
            <span className="h-px flex-1 bg-[var(--border-strong)]" />
          </div>
        </Rise>

        <div className="grid gap-12 lg:grid-cols-[0.85fr_1fr] lg:gap-16">
          <Rise>
            <figure className="relative">
              <img
                src="/photos/atelier.webp"
                alt="Artisan dans son atelier, établi et outils suspendus au mur"
                width={1400}
                height={932}
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full rounded-2xl object-cover shadow-[var(--shadow-lg)]"
              />
              <figcaption className="mt-4 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-[var(--muted)]">
                Nos clients font le métier. Nous faisons venir les clients.
              </figcaption>
            </figure>
          </Rise>

          <div>
            <Rise delay={0.08}>
              <h2 className="text-balance text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-[3.1rem]">
                Nous digitalisons et automatisons{' '}
                <span className="font-serif-it font-normal text-[var(--primary-ink)]">
                  la recherche de clients.
                </span>
              </h2>
            </Rise>

            <Rise delay={0.14}>
              <div className="mt-7 space-y-5 text-base leading-relaxed text-[var(--muted-strong)] sm:text-lg">
                <p>
                  SmatchRoom Pulse est une entreprise bordelaise. Ni agence de communication,
                  ni revendeur de logiciels : nous installons chez vous ce qui va chercher le
                  chiffre d&apos;affaires, puis nous le pilotons à votre place.
                </p>
                <p className="text-[var(--foreground)]">
                  La règle est la même pour tout le monde : le travail répétitif part à la
                  machine, le contact humain vous revient.
                </p>
              </div>
            </Rise>

            <div className="mt-10 divide-y divide-[var(--border)] border-y border-[var(--border)]">
              {POINTS.map((p, i) => (
                <Rise key={p.k} delay={0.18 + i * 0.06}>
                  <div className="flex gap-5 py-5">
                    <span className="mt-0.5 font-mono text-[0.7rem] tracking-[0.18em] text-[var(--primary-ink)]">
                      {p.k}
                    </span>
                    <div>
                      <p className="font-display text-lg font-semibold text-[var(--foreground)]">
                        {p.t}
                      </p>
                      <p className="mt-1 text-[0.95rem] leading-relaxed text-[var(--muted-strong)]">
                        {p.d}
                      </p>
                    </div>
                  </div>
                </Rise>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
