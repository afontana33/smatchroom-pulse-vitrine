'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Search, FileCheck, Headphones,
  MessageCircle, Mail, Terminal, Star, ArrowRight, Check,
} from 'lucide-react';

/**
 * Démo interactive : trois situations du même agent, rejouées en animation
 * (canal + étapes + conversation). Ce n'est plus un sélecteur de catalogue.
 */

const CHANNEL = {
  whatsapp: { icon: MessageCircle, label: 'WhatsApp', tone: 'text-emerald-400' },
  email: { icon: Mail, label: 'E-mail', tone: 'text-sky-400' },
  terminal: { icon: Terminal, label: 'Moteur', tone: 'text-[var(--primary)]' },
  google: { icon: Star, label: 'Google', tone: 'text-amber-400' },
};

/* Un seul agent, trois situations. Les onglets ne choisissent plus un agent
   du catalogue : ils montrent ce que le Chasseur fait dans la journée. */
const AGENTS = [
  {
    id: 'prospection',
    name: 'Prospection',
    icon: Search,
    channel: 'whatsapp',
    tagline: 'Il va chercher les entreprises de votre secteur.',
    steps: ['Ciblage INSEE / INPI', 'Prise de contact', 'Relance intelligente', 'Handoff'],
    script: [
      { kind: 'system', text: 'Sourcing : 42 syndics & agences ciblés · votre secteur', step: 0 },
      { kind: 'agent', text: "Bonjour, je travaille avec un artisan du bâtiment du secteur, dispo sous 48h. Vous arrive-t-il d'avoir des chantiers à confier en urgence ?", step: 1 },
      { kind: 'prospect', text: 'Ça nous arrive, oui. Vous êtes qui exactement ?', step: 1 },
      { kind: 'agent', text: 'Une entreprise du bâtiment de votre secteur. Je vous mets en relation avec le gérant ?', step: 2 },
      { kind: 'prospect', text: "Ok, qu'il m'appelle.", step: 2 },
      { kind: 'system', text: '✓ Lead chaud → transféré au gérant', step: 3 },
    ],
  },
  {
    id: 'entrant',
    name: 'Demande entrante',
    icon: Headphones,
    channel: 'whatsapp',
    tagline: 'Il répond aux demandes en moins d’une minute, jour et nuit.',
    steps: ['Message entrant', 'Qualification', 'Éligibilité aides', 'RDV posé'],
    script: [
      { kind: 'prospect', text: 'Bonjour, je cherche un devis pour isoler mes combles.', step: 0 },
      { kind: 'agent', text: "Avec plaisir ! C'est pour une résidence principale ? Quelle surface environ ?", step: 1 },
      { kind: 'prospect', text: 'Oui, résidence principale, environ 60 m².', step: 1 },
      { kind: 'agent', text: 'Parfait, vous êtes probablement éligible MaPrimeRénov. Un RDV mardi 10h vous irait ?', step: 2 },
      { kind: 'system', text: '✓ Lead qualifié · RDV posé dans l’agenda', step: 3 },
    ],
  },
  {
    id: 'relance',
    name: 'Relance de devis',
    icon: FileCheck,
    channel: 'whatsapp',
    tagline: 'Il rattrape les devis restés sans réponse.',
    steps: ['Détection devis dormants', 'Relance personnalisée', 'Réponse client', 'Chantier relancé'],
    script: [
      { kind: 'system', text: '3 devis sans réponse depuis 7 jours', step: 0 },
      { kind: 'agent', text: "Bonjour M. Martin, je reviens vers vous pour le devis d'isolation (2 400 €). On planifie les travaux ?", step: 1 },
      { kind: 'prospect', text: "Ah oui, j'avais complètement oublié. On peut en parler cette semaine ?", step: 2 },
      { kind: 'agent', text: 'Bien sûr. Jeudi 14h vous conviendrait ?', step: 2 },
      { kind: 'system', text: '✓ RDV proposé · devis #402 relancé', step: 3 },
    ],
  },
];


function Bubble({ msg }) {
  if (msg.kind === 'system') {
    return (
      <div className="my-1 flex justify-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.06] px-3 py-1 text-center font-mono text-[0.68rem] text-[var(--on-ink-muted)]">
          {msg.text}
        </span>
      </div>
    );
  }
  if (msg.kind === 'log') {
    return (
      <p className="font-mono text-[0.78rem] leading-relaxed text-[var(--on-ink-muted)]">
        {msg.text}
      </p>
    );
  }
  const isAgent = msg.kind === 'agent';
  return (
    <div className={`flex ${isAgent ? 'justify-end' : 'justify-start'}`}>
      <span
        className={[
          'max-w-[85%] rounded-2xl px-3.5 py-2 text-[0.82rem] leading-snug',
          isAgent
            ? 'rounded-br-sm bg-[var(--primary)] text-white'
            : 'rounded-bl-sm bg-white/10 text-[var(--on-ink)]',
        ].join(' ')}
      >
        {msg.text}
      </span>
    </div>
  );
}

export default function AgentDemo() {
  const [active, setActive] = useState(0);
  const [count, setCount] = useState(0);
  const timer = useRef(null);

  const agent = AGENTS[active];
  const script = agent.script;
  const shownStep = count > 0 ? script[Math.min(count, script.length) - 1].step : 0;

  useEffect(() => {
    setCount(0);
  }, [active]);

  useEffect(() => {
    clearTimeout(timer.current);
    if (count >= script.length) {
      timer.current = setTimeout(() => setCount(0), 2800);
    } else {
      timer.current = setTimeout(() => setCount((c) => c + 1), count === 0 ? 500 : 1150);
    }
    return () => clearTimeout(timer.current);
  }, [count, script.length]);

  const Ch = CHANNEL[agent.channel];

  return (
    <section id="demo" className="relative px-5 py-24 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center gap-4">
          <span className="section-index">Démo</span>
          <span className="h-px flex-1 bg-[var(--border-strong)]" />
        </div>
        <div className="mb-10 max-w-2xl">
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            <span className="gradient-text">Regardez un agent travailler.</span>
          </h2>
          <p className="mt-4 text-balance text-[var(--muted-strong)] sm:text-lg">
            Trois situations de la journée de l’Agent Chasseur, rejouées étape par étape :
            comment il identifie, contacte et qualifie, puis passe le relais. Reconstitution
            fidèle d’un déroulé réel.
          </p>
        </div>

        {/* Sélecteur de situation */}
        <div className="-mx-5 mb-8 flex snap-x gap-2.5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0 sm:overflow-visible">
          {AGENTS.map((a, i) => {
            const Icon = a.icon;
            const on = i === active;
            return (
              <button
                key={a.id}
                onClick={() => setActive(i)}
                className={[
                  'inline-flex flex-shrink-0 snap-start items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-all',
                  on
                    ? 'border-[var(--primary)] bg-[var(--primary)] text-white shadow-[0_10px_30px_-12px_var(--primary-glow)]'
                    : 'border-[var(--border-strong)] bg-[var(--surface)] text-[var(--muted-strong)] hover:border-[var(--primary-line)]',
                ].join(' ')}
              >
                <Icon size={16} strokeWidth={1.9} />
                {a.name}
              </button>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr] lg:items-stretch">
          {/* Étapes + explication */}
          <div className="card flex flex-col p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary-soft)] text-[var(--primary-ink)] ring-1 ring-[var(--primary-line)]">
                <agent.icon size={20} strokeWidth={1.8} />
              </span>
              <div>
                <p className="font-display text-lg font-semibold text-[var(--foreground)]">{agent.name}</p>
                <p className="text-sm text-[var(--muted)]">{agent.tagline}</p>
              </div>
            </div>

            <ol className="mt-8 space-y-4">
              {agent.steps.map((label, i) => {
                const done = i < shownStep || count >= script.length;
                const current = i === shownStep && count < script.length;
                return (
                  <li key={label} className="flex items-center gap-3">
                    <span
                      className={[
                        'flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border font-mono text-xs transition-all',
                        done
                          ? 'border-[var(--primary)] bg-[var(--primary)] text-white'
                          : current
                            ? 'border-[var(--primary)] bg-[var(--primary-soft)] text-[var(--primary-ink)] animate-pulse-ring'
                            : 'border-[var(--border-strong)] bg-[var(--surface)] text-[var(--muted)]',
                      ].join(' ')}
                    >
                      {done ? <Check size={15} /> : i + 1}
                    </span>
                    <span
                      className={[
                        'text-sm transition-colors',
                        current || done ? 'font-medium text-[var(--foreground)]' : 'text-[var(--muted)]',
                      ].join(' ')}
                    >
                      {label}
                    </span>
                  </li>
                );
              })}
            </ol>

            <a
              href="https://calendly.com/a-fontana-smatchroom/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost group mt-auto inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium"
            >
              Voir l’agent sur mes données
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {/* Device animé */}
          <div className="terminal-dark flex h-[480px] flex-col overflow-hidden rounded-2xl">
            <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white">
                <agent.icon size={16} />
              </span>
              <div className="leading-tight">
                <p className="text-sm font-semibold text-white">{agent.name}</p>
                <p className={`inline-flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] ${Ch.tone}`}>
                  <Ch.icon size={11} /> {Ch.label}
                </p>
              </div>
              <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-emerald-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> live
              </span>
            </div>

            <div className="flex-1 space-y-2.5 overflow-hidden px-4 py-5">
              {script.slice(0, count).map((msg, i) => (
                <Bubble key={`${agent.id}-${i}`} msg={msg} />
              ))}
              {count < script.length && (
                <div className={`flex ${script[count]?.kind === 'agent' ? 'justify-end' : 'justify-start'} ${script[count]?.kind === 'system' || script[count]?.kind === 'log' ? 'hidden' : ''}`}>
                  <span className="inline-flex gap-1 rounded-2xl bg-white/10 px-3 py-2.5">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/60 [animation-delay:-0.2s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/60 [animation-delay:-0.1s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/60" />
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
