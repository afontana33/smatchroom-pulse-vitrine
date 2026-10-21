'use client';

/**
 * L'offre anglaise, prix compris.
 *
 * Bande en registre encre, comme la section Agent Clients du site français :
 * c'est la même offre, elle doit avoir le même poids visuel dans les deux
 * langues.
 *
 * Les montants viennent de lib/offers.js via `setupLabel` / `monthlyLabel`,
 * jamais écrits ici. Une correction de prix faite dans offers.js doit tomber
 * sur les deux langues sans qu'on ait à y penser.
 *
 * L'encadré « two agents, two jobs » est repris du français et n'est pas
 * décoratif : sans lui, un lecteur croit qu'on lui vend deux fois la même
 * chose à deux prix.
 */

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { CALENDLY } from '@/lib/contact';
import { PILIER_OFFERS, monthlyLabel, setupLabel } from '@/lib/offers';

const POINTS = [
  'A database built for your market, from public sources',
  'Agent trained on your catalogue, your arguments and your objections',
  'Need, budget and timeline qualified before your reps step in',
  'Every message written one by one, in your name, never a mail merge',
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

export default function AgentEn() {
  const offer = PILIER_OFFERS.find((o) => o.key === 'agent-clients-b2b');

  return (
    <section
      id="agent"
      className="showcase-dark grain relative scroll-mt-24 overflow-hidden px-5 py-24 sm:px-6 sm:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_15%_0%,rgba(124, 58, 237,0.18),transparent_60%)]"
      />

      <div className="relative mx-auto max-w-7xl">
        <Rise>
          <div className="mb-12 flex items-center gap-4">
            <span className="font-mono text-[0.72rem] uppercase tracking-[0.22em] text-[#c4b5fd]">
              You sell to companies
            </span>
            <span className="h-px flex-1 bg-white/15" />
          </div>
        </Rise>

        <div className="grid gap-12 lg:grid-cols-[1fr_minmax(0,22rem)] lg:gap-16">
          <div>
            <Rise delay={0.05}>
              <h2 className="max-w-2xl text-balance text-3xl font-semibold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-[3rem]">
                You need B2B customers,{' '}
                <span className="font-serif-it font-normal text-[#c4b5fd]">
                  we build your digital sales rep.
                </span>
              </h2>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--on-ink-muted)] sm:text-lg">
                Manufacturers, distributors, equipment rental, technical software vendors: your
                buyers are not sitting in any list you can buy. We build the database, train the
                agent on your offer, and it qualifies the need, the budget and the timeline
                before handing the conversation to your team.
              </p>
            </Rise>

            <Rise delay={0.1}>
              <div className="mt-10 rounded-2xl border border-white/15 bg-white/[0.06] p-7 backdrop-blur-sm">
                <h3 className="font-display text-lg font-semibold text-white sm:text-xl">
                  Two agents, two jobs
                </h3>
                <dl className="mt-5 space-y-5">
                  <div>
                    <dt className="text-[0.95rem] font-semibold text-[#c4b5fd]">
                      The Partner agent: it opens doors
                    </dt>
                    <dd className="mt-1.5 text-[0.95rem] leading-relaxed text-[var(--on-ink-muted)]">
                      It introduces your company to the people who already have your customers,
                      and hands over the moment one of them is interested. This is the entry
                      offer on our French site.
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[0.95rem] font-semibold text-[#c4b5fd]">
                      The Client agent: it builds your market
                    </dt>
                    <dd className="mt-1.5 text-[0.95rem] leading-relaxed text-[var(--on-ink-muted)]">
                      Database built from scratch for your sector, agent trained on your own
                      offer, full qualification before handover. This is the one priced below.
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
                      className="mt-0.5 flex-shrink-0 text-[#c4b5fd]"
                      strokeWidth={2.4}
                    />
                    {p}
                  </li>
                ))}
              </ul>
            </Rise>
          </div>

          <Rise delay={0.1} className="lg:self-start">
            <div
              id="pricing"
              className="scroll-mt-28 rounded-2xl border border-white/15 bg-white/[0.06] p-7 backdrop-blur-sm lg:sticky lg:top-28"
            >
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-white/55">
                Client agent
              </p>
              <p className="mt-4 font-display text-4xl font-semibold tracking-tight text-white">
                {setupLabel(offer, 'en')}
              </p>
              <p className="mt-1 text-sm text-white/60">one-off build fee</p>
              {/* Deux formulations parce que le cas « sur devis » ne se colle pas
                  derrière « then » comme un montant le ferait. Le jour où cette
                  offre reprend un prix ferme, la seconde branche tombe juste. */}
              <p className="mt-3 text-lg font-semibold text-[#c4b5fd]">
                {offer.monthly == null
                  ? 'then a monthly fee, quoted after the audit'
                  : `then ${monthlyLabel(offer, 'en')}`}
              </p>
              <p className="mt-5 border-t border-white/15 pt-5 text-sm leading-relaxed text-[var(--on-ink-muted)]">
                No lock-in. Every market takes a different amount of work, so the scope and the
                monthly fee are quoted after the audit, not before.
              </p>
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-6 inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold"
              >
                Book a 30-minute audit
                <ArrowRight size={16} aria-hidden />
              </a>
              <p className="mt-4 text-xs leading-relaxed text-white/50">
                Prices exclude VAT. French VAT applies unless you provide a valid EU VAT number.
              </p>
            </div>
          </Rise>
        </div>
      </div>
    </section>
  );
}
