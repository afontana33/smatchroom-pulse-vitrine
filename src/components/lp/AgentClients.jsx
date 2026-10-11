'use client';

/**
 * Agent Clients : l'offre pour les entreprises qui vendent à des entreprises.
 *
 * Traitement volontairement différent des packs : bande pleine largeur en
 * registre encre, deux colonnes. Ce n'est pas un cinquième pack et ça ne doit
 * pas en avoir l'apparence, sinon on compare son plancher à 990 € alors que ce
 * n'est ni le même travail ni la même cible.
 *
 * L'encadré « Deux agents, deux métiers » est le cœur de la section : sans lui,
 * un lecteur croit qu'on lui vend deux fois la même chose à deux prix.
 */

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { GARANTIE } from '@/lib/offers';

const CALENDLY = 'https://calendly.com/a-fontana-smatchroom/30min';

const PALIERS = [
  { name: 'Solo', volume: "1 numéro WhatsApp · ~300 décideurs / mois", monthly: '340 € HT / mois', setup: 'création 490 € HT' },
  { name: 'Équipe', volume: '2 à 3 numéros · 600 à 900 décideurs / mois', monthly: '640 € HT / mois', setup: 'création 790 € HT' },
  { name: 'Réseau', volume: '4 numéros et plus · 1 200 décideurs et plus', monthly: 'sur devis', setup: 'création sur devis' },
];

const POINTS = [
  'Base de données construite pour votre marché',
  'Signaux d’achat repérés sur LinkedIn, contact par WhatsApp et email',
  'Agent entraîné sur votre catalogue et vos objections',
  'Besoin, budget et calendrier qualifiés avant transmission',
];

function Rise({ children, delay = 0, className }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function AgentClients() {
  return (
    <section
      id="agent-clients"
      className="showcase-dark grain relative scroll-mt-24 overflow-hidden px-5 py-24 sm:px-6 sm:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_15%_0%,rgba(255,90,31,0.18),transparent_60%)]"
      />

      <div className="relative mx-auto max-w-7xl">
        <Rise>
          <div className="mb-12 flex items-center gap-4">
            <span className="font-mono text-[0.72rem] uppercase tracking-[0.22em] text-[#ffb27a]">
              Vous vendez à des entreprises
            </span>
            <span className="h-px flex-1 bg-white/15" />
          </div>
        </Rise>

        <div className="grid gap-12 lg:grid-cols-[1fr_minmax(0,22rem)] lg:gap-16">
          <div>
            <Rise delay={0.05}>
              <h2 className="max-w-2xl text-balance text-3xl font-semibold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-[3rem]">
                Vous recherchez des clients B2B,{' '}
                <span className="font-serif-it font-normal text-[#ffb27a]">
                  nous créons votre commercial digital.
                </span>
              </h2>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--on-ink-muted)] sm:text-lg">
                Industriels, distributeurs, loueurs de matériel, éditeurs de solutions
                techniques&nbsp;: vos acheteurs ne se trouvent dans aucun fichier tout fait. On
                construit la base, on entraîne l&apos;agent sur votre catalogue, vos arguments et
                vos objections, et il qualifie le besoin, le budget et le calendrier avant de
                passer la main à vos commerciaux.
              </p>
            </Rise>

            <Rise delay={0.1}>
              <div className="mt-10 rounded-2xl border border-white/15 bg-white/[0.06] p-7 backdrop-blur-sm">
                <h3 className="font-display text-lg font-semibold text-white sm:text-xl">
                  Deux agents, deux métiers
                </h3>
                <dl className="mt-5 space-y-5">
                  <div>
                    <dt className="text-[0.95rem] font-semibold text-[#ffb27a]">
                      Agent Partenaires&nbsp;: il ouvre des portes
                    </dt>
                    <dd className="mt-1.5 text-[0.95rem] leading-relaxed text-[var(--on-ink-muted)]">
                      Il présente votre entreprise aux prescripteurs de votre métier et vous
                      passe la main dès qu&apos;un interlocuteur est intéressé. Inclus dans le
                      Pack Lancement.
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[0.95rem] font-semibold text-[#ffb27a]">
                      Agent Clients&nbsp;: il construit votre marché
                    </dt>
                    <dd className="mt-1.5 text-[0.95rem] leading-relaxed text-[var(--on-ink-muted)]">
                      Il contacte directement vos clients potentiels&nbsp;: base de données
                      créée sur mesure, agent entraîné sur votre offre, qualification complète
                      avant transmission.
                    </dd>
                  </div>
                </dl>
              </div>
            </Rise>

            <Rise delay={0.14}>
              <ul className="mt-8 space-y-3">
                {POINTS.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-3 text-[0.95rem] text-[var(--on-ink-muted)]"
                  >
                    <Check
                      size={16}
                      aria-hidden
                      className="mt-0.5 flex-shrink-0 text-[#ffb27a]"
                      strokeWidth={2.4}
                    />
                    {p}
                  </li>
                ))}
              </ul>
            </Rise>
          </div>

          <Rise delay={0.1} className="lg:self-start">
            <div className="rounded-2xl border border-white/15 bg-white/[0.06] p-7 backdrop-blur-sm lg:sticky lg:top-28">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-white/55">
                Agent Clients
              </p>
              <p className="mt-4 text-sm text-white/60">à partir de</p>
              <p className="mt-0.5 font-display text-4xl font-semibold tracking-tight text-white">
                340 € HT
              </p>
              <p className="mt-1 text-sm text-white/60">par mois, sans engagement</p>
              <p className="mt-3 text-sm font-semibold text-[#ffb27a]">{GARANTIE}</p>
              <ul className="mt-5 space-y-4 border-t border-white/15 pt-5">
                {PALIERS.map((t) => (
                  <li key={t.name} className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-[0.95rem] font-semibold text-white">{t.name}</p>
                      <p className="mt-0.5 text-xs text-white/55">{t.volume}</p>
                    </div>
                    <div className="flex-shrink-0 whitespace-nowrap text-right">
                      <p className="text-[0.95rem] font-semibold text-[#ffb27a]">{t.monthly}</p>
                      <p className="mt-0.5 text-xs text-white/55">{t.setup}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-white/15 pt-5 text-sm leading-relaxed text-[var(--on-ink-muted)]">
                Création offerte si vous partez sur 3 mois. Chaque numéro WhatsApp branché (un par
                commercial, par exemple) contacte environ 300 décideurs par mois, en plus de l&apos;email.
              </p>
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Demander un audit de 30 minutes pour l'Agent Clients"
                className="btn-primary mt-6 inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold"
              >
                Demander un audit de 30 min
                <ArrowRight size={16} aria-hidden />
              </a>
            </div>
          </Rise>
        </div>
      </div>
    </section>
  );
}
