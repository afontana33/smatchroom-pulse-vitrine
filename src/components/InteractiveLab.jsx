'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Terminal,
  Send,
  Search,
  Building2,
  Rocket,
  Wand2,
  Code2,
  Calendar,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

const CALENDLY = 'https://calendly.com/a-fontana-smatchroom/30min';

/* ----------------------------------------------------------------
   Données statiques anonymisées — aucune donnée réelle, aucun appel
   API, aucun endpoint Supabase / Green API n'est exposé ici.
   ---------------------------------------------------------------- */
const SECTORS = {
  marketing: {
    label: 'Agence Marketing Digital',
    leadName: 'Agence Tech [Masqué]',
    signals: [
      'Offre de recrutement Sales expirée non pourvue (+7)',
      'CEO actif sur LinkedIn, posts récents sur la croissance (+3)',
      'Stack publicitaire détectée en sous-utilisation (+5)',
    ],
    score: '21/27',
    scoreLabel: 'Hot Lead',
    message1: "Hello, c'est Alexis 👋 C'est bien le WhatsApp de l'équipe growth ?",
    reply: 'Oui c\'est bien nous, c\'est pour quoi ?',
    message2:
      "On a remarqué que votre poste de Sales était ouvert depuis un moment sans candidat retenu. On construit des pipelines de prospection IA qui tournent en autonomie : ça vous libère du temps pendant que vous recrutez. 5 min pour vous montrer comment ça marche sur votre cas ?",
  },
  recrutement: {
    label: 'Cabinet de Recrutement Tech',
    leadName: 'Cabinet R[Masqué]',
    signals: [
      '3 mandats ouverts depuis +60 jours sur LinkedIn (+6)',
      'Equipe interne de 4 recruteurs, charge élevée détectée (+4)',
      'Aucun outil de sourcing automatisé visible (+5)',
    ],
    score: '19/27',
    scoreLabel: 'Hot Lead',
    message1: "Hello, c'est Alexis 👋 C'est bien le WhatsApp du cabinet ?",
    reply: 'Oui c\'est bien nous, c\'est pour quoi ?',
    message2:
      "On a vu que vous aviez plusieurs mandats ouverts depuis un moment. On construit des agents de sourcing qui qualifient des dizaines de profils par jour sans solliciter vos recruteurs. Ça vous parle si je vous montre un cas concret en 5 min ?",
  },
  saas: {
    label: 'Éditeur SaaS',
    leadName: 'Editeur S[Masqué]',
    signals: [
      "Levée de fonds publiée il y a moins de 90 jours (+8)",
      'Équipe Sales en cours de structuration (+4)',
      'Présence SEO faible sur les mots-clés produit (+3)',
    ],
    score: '23/27',
    scoreLabel: 'Hot Lead',
    message1: "Hello, c'est Alexis 👋 C'est bien le WhatsApp de l'équipe revenue ?",
    reply: 'Oui c\'est bien nous, c\'est pour quoi ?',
    message2:
      "Félicitations pour la levée. On accompagne des éditeurs SaaS en phase de structuration commerciale avec des pipelines de prospection et de scoring qui tournent sans intervention humaine. Je vous montre comment en 5 min ?",
  },
};

const LOG_LINES = [
  '[SCANNING LIVE DATA]...',
  '[CROSSING SOURCES: APOLLO.IO, INSEE, LINKEDIN PRESENCE]...',
  '[APPLYING RULE 0: VALIDATING ICP TARGET]...',
  '[SCORING WEAK SIGNALS...]',
];

const SEO_OUTPUT = {
  maillage: ['/blog/[mot-clé]-guide', '/blog/[mot-clé]-cas-usage', '/solutions/[mot-clé]'],
  jsonLd: ['Article', 'FAQPage', 'BreadcrumbList'],
  geo: 'Intention optimisée pour citation par ChatGPT / Gemini / Perplexity',
};

export default function InteractiveLab() {
  /* ---------------- Module 1 : NextMove ---------------- */
  const [sector, setSector] = useState('marketing');
  const [m1Status, setM1Status] = useState('idle'); // idle | running | done
  const [logLines, setLogLines] = useState([]);

  const runNextMove = () => {
    setM1Status('running');
    setLogLines([]);
    setM2Status('idle');
    LOG_LINES.forEach((line, i) => {
      setTimeout(() => {
        setLogLines((prev) => [...prev, line]);
      }, i * 480);
    });
    setTimeout(() => setM1Status('done'), LOG_LINES.length * 480 + 300);
  };

  /* ---------------- Module 2 : Apex WhatsApp ---------------- */
  const [m2Status, setM2Status] = useState('idle'); // idle | typing1 | msg1 | reply | typing2 | msg2
  const data = SECTORS[sector];

  const runApex = () => {
    setM2Status('typing1');
    setTimeout(() => setM2Status('msg1'), 3000);
    setTimeout(() => setM2Status('reply'), 4000);
    setTimeout(() => setM2Status('typing2'), 4800);
    setTimeout(() => setM2Status('msg2'), 7000);
  };

  /* ---------------- Module 3 : RankSniper ---------------- */
  const [keyword, setKeyword] = useState('');
  const [seoGenerated, setSeoGenerated] = useState(false);

  /* auto-scroll terminal */
  const termRef = useRef(null);
  useEffect(() => {
    if (termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight;
  }, [logLines]);

  return (
    <section className="relative overflow-hidden px-6 py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.10),transparent_60%)]"
      />
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <p className="eyebrow">Pulse Interactive Lab</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            <span className="gradient-text">Voyez nos moteurs tourner.</span> En direct, sous vos yeux.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-[var(--muted)]">
            Une simulation visuelle avec des données d'exemple anonymisées. Aucune donnée réelle, aucun appel à notre infrastructure de production.
          </p>
        </div>

        {/* MODULE 1 + 2 */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Module 1 : NextMove */}
          <div className="glass relative flex flex-col rounded-2xl p-7">
            <div className="mb-5 flex items-center gap-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 ring-1 ring-cyan-400/30">
                <Search size={18} strokeWidth={1.8} />
              </div>
              <div>
                <p className="font-semibold text-white">Moteur NextMove V2</p>
                <p className="text-xs text-[var(--muted)]">Détection d'intention par signaux faibles</p>
              </div>
            </div>

            <label className="mb-2 font-mono text-xs uppercase tracking-[0.15em] text-[var(--muted)]">
              Secteur cible
            </label>
            <select
              value={sector}
              onChange={(e) => {
                setSector(e.target.value);
                setM1Status('idle');
                setM2Status('idle');
                setLogLines([]);
              }}
              className="mb-4 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--surface-2)] px-4 py-2.5 text-sm text-white outline-none focus:border-cyan-400"
            >
              {Object.entries(SECTORS).map(([key, s]) => (
                <option key={key} value={key} className="bg-[var(--surface-2)]">
                  {s.label}
                </option>
              ))}
            </select>

            <button
              onClick={runNextMove}
              disabled={m1Status === 'running'}
              className="mb-4 inline-flex items-center justify-center gap-2 rounded-full bg-cyan-500 px-5 py-2.5 text-sm font-medium text-black transition-all hover:bg-cyan-400 disabled:opacity-60"
            >
              <Terminal size={15} />
              {m1Status === 'running' ? 'Scan en cours…' : 'Lancer le moteur NextMove'}
            </button>

            {/* Faux terminal de logs */}
            {(m1Status === 'running' || m1Status === 'done') && (
              <div
                ref={termRef}
                className="mb-4 h-32 overflow-y-auto rounded-xl border border-cyan-400/20 bg-black/60 p-3 font-mono text-[0.7rem] leading-relaxed text-cyan-300"
              >
                {logLines.map((line, i) => (
                  <div key={i} className="animate-[fadeIn_0.2s_ease-in]">
                    {line}
                  </div>
                ))}
              </div>
            )}

            {/* Fiche lead */}
            {m1Status === 'done' && (
              <div className="animate-[fadeIn_0.4s_ease-in] rounded-xl border border-[var(--border-strong)] bg-[var(--surface-2)] p-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="font-semibold text-white">{data.leadName}</p>
                  <span className="rounded-full bg-red-500/15 px-2.5 py-1 font-mono text-[0.65rem] text-red-400">
                    {data.score} · {data.scoreLabel}
                  </span>
                </div>
                <ul className="mb-3 space-y-1.5">
                  {data.signals.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-[var(--muted)]">
                      <CheckCircle2 size={13} className="mt-0.5 flex-shrink-0 text-cyan-400" />
                      {s}
                    </li>
                  ))}
                </ul>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-cyan-400">
                  Source vérifiée et cliquable (simulée)
                </p>

                {m2Status === 'idle' && (
                  <button
                    onClick={runApex}
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-medium text-black transition-all hover:bg-emerald-400"
                  >
                    <Send size={14} />
                    Déclencher le pipeline Apex WhatsApp
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Module 2 : Apex WhatsApp mockup */}
          <div className="glass flex flex-col items-center justify-center rounded-2xl p-7">
            <div className="mb-5 flex w-full items-center gap-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-400/30">
                <Rocket size={18} strokeWidth={1.8} />
              </div>
              <div>
                <p className="font-semibold text-white">SmatchRoom Apex</p>
                <p className="text-xs text-[var(--muted)]">Outreach WhatsApp autonome</p>
              </div>
            </div>

            {/* Smartphone mockup */}
            <div className="w-full max-w-[280px] overflow-hidden rounded-[1.75rem] border border-[var(--border-strong)] bg-[#0b141a] shadow-[0_0_60px_-10px_rgba(16,185,129,0.25)]">
              <div className="flex items-center gap-2 bg-[#1f2c34] px-4 py-3">
                <div className="h-7 w-7 rounded-full bg-emerald-500/30" />
                <div>
                  <p className="text-xs font-medium text-white">Prospect</p>
                  <p className="text-[0.6rem] text-emerald-400">
                    {m2Status === 'typing1' || m2Status === 'typing2' ? 'en train d\'écrire…' : 'en ligne'}
                  </p>
                </div>
              </div>
              <div className="flex min-h-[220px] flex-col gap-2 bg-[#0b141a] p-3">
                {(m2Status === 'msg1' || m2Status === 'reply' || m2Status === 'typing2' || m2Status === 'msg2') && (
                  <div className="ml-auto max-w-[85%] rounded-lg bg-emerald-600/90 px-3 py-2 text-xs text-white animate-[fadeIn_0.3s_ease-in]">
                    {data.message1}
                  </div>
                )}
                {(m2Status === 'reply' || m2Status === 'typing2' || m2Status === 'msg2') && (
                  <div className="mr-auto max-w-[85%] rounded-lg bg-[#1f2c34] px-3 py-2 text-xs text-white animate-[fadeIn_0.3s_ease-in]">
                    {data.reply}
                  </div>
                )}
                {m2Status === 'typing2' && (
                  <div className="ml-auto flex gap-1 rounded-lg bg-emerald-600/60 px-3 py-2 text-xs text-white">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white [animation-delay:-0.2s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white [animation-delay:-0.1s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white" />
                  </div>
                )}
                {m2Status === 'msg2' && (
                  <div className="ml-auto max-w-[85%] rounded-lg bg-emerald-600/90 px-3 py-2 text-xs text-white animate-[fadeIn_0.3s_ease-in]">
                    {data.message2}
                  </div>
                )}
                {m2Status === 'idle' && (
                  <p className="m-auto text-center text-xs text-[var(--muted)]">
                    Lancez le scan NextMove puis déclenchez Apex pour voir la conversation démarrer.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* MODULE 3 : RankSniper */}
        <div className="glass relative mt-6 overflow-hidden rounded-2xl p-7">
          <div className="mb-5 flex items-center gap-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary-soft)] text-[var(--primary-hover)] ring-1 ring-[var(--border-strong)]">
              <Wand2 size={18} strokeWidth={1.8} />
            </div>
            <div>
              <p className="font-semibold text-white">Moteur RankSniper</p>
              <p className="text-xs text-[var(--muted)]">Aperçu du pipeline SEO chirurgical</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Entrez votre mot-clé cible (ex: agent ia recrutement)"
              className="flex-1 rounded-xl border border-[var(--border-strong)] bg-[var(--surface-2)] px-4 py-2.5 text-sm text-white outline-none focus:border-[var(--primary)]"
            />
            <button
              onClick={() => setSeoGenerated(true)}
              disabled={!keyword.trim()}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-5 py-2.5 text-sm font-medium text-black transition-all hover:bg-[var(--primary-hover)] disabled:opacity-50"
            >
              <Code2 size={15} />
              Générer la structure
            </button>
          </div>

          {seoGenerated && keyword.trim() && (
            <div className="mt-5 animate-[fadeIn_0.4s_ease-in] rounded-xl border border-[var(--border-strong)] bg-black/40 p-4 font-mono text-xs text-[var(--muted)]">
              <pre className="overflow-x-auto whitespace-pre-wrap">
{`{
  "keyword": "${keyword.trim()}",
  "maillage": [
    "${SEO_OUTPUT.maillage[0].replace('[mot-clé]', keyword.trim().replace(/\s+/g, '-').toLowerCase())}",
    "${SEO_OUTPUT.maillage[1].replace('[mot-clé]', keyword.trim().replace(/\s+/g, '-').toLowerCase())}",
    "${SEO_OUTPUT.maillage[2].replace('[mot-clé]', keyword.trim().replace(/\s+/g, '-').toLowerCase())}"
  ],
  "jsonLd": ${JSON.stringify(SEO_OUTPUT.jsonLd)},
  "geo": "${SEO_OUTPUT.geo}"
}`}
              </pre>
              <p className="mt-3 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-[var(--primary-hover)]">
                Structure prête à être injectée dans Supabase en 48h
              </p>
            </div>
          )}
        </div>

        {/* CTA final */}
        <div className="mt-10 flex flex-col items-center gap-3 text-center">
          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex max-w-xl items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-8 py-4 text-center text-base font-medium text-black transition-all hover:bg-[var(--primary-hover)] hover:shadow-[0_0_40px_-5px_var(--primary-glow)]"
          >
            <Calendar size={18} />
            Vous voulez voir ce pipeline tourner en direct sur vos propres cibles ? Réservez votre diagnostic
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </a>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
            30 min · Gratuit · Sans engagement
          </p>
        </div>
      </div>
    </section>
  );
}
