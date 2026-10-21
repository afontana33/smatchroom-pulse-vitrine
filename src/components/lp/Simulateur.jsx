'use client';

/**
 * Simulateur « Voyez qui l'agent contacterait pour vous ».
 *
 * Étape 1 : secteur, ville, prénom, nom, téléphone (obligatoires), entreprise
 *           (facultative) → /api/simulateur (20 à 40 s). Le contact
 *           est envoyé par email à Alexis.
 * Étape 2 : la conversation WhatsApp telle que nos agents la mènent, au nom du
 *           visiteur, avec un partenaire trouvé, puis la liste des partenaires.
 *
 * Une seule simulation par visiteur : le serveur refuse la deuxième (409), et le
 * navigateur garde la première (localStorage) pour la réafficher.
 */

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, CheckCheck, ChevronDown, Loader2, MapPin } from 'lucide-react';
import { ACTIVITES } from '@/lib/simulateur';
import { CALENDLY, TEL_DISPLAY, TEL_HREF } from '@/lib/contact';

const STOCKAGE = 'pulse-simulateur-v1';
const RDV = `${CALENDLY}?utm_source=site&utm_medium=simulateur`;

const ETAPES_ATTENTE = [
  'Recherche des professionnels de votre zone sur Google Maps…',
  'Tri par catégorie de partenaires…',
  'Vérification des établissements ouverts…',
  'Rédaction des messages en votre nom…',
];

const champ =
  'block w-full min-w-0 max-w-full rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] px-4 py-3 text-[0.95rem] text-[var(--foreground)] outline-none transition-colors focus:border-[var(--primary)] disabled:opacity-70';

const LISTE_VISIBLE = 6;

function lire() {
  try {
    return JSON.parse(window.localStorage.getItem(STOCKAGE) || 'null');
  } catch {
    return null;
  }
}
function ecrire(v) {
  try {
    window.localStorage.setItem(STOCKAGE, JSON.stringify(v));
  } catch {
    /* navigation privée : le résultat ne sera simplement pas gardé */
  }
}

function Lieu({ l }) {
  return (
    <li className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3">
      <span className="block truncate font-semibold text-[var(--foreground)]">{l.nom}</span>
      <span className="mt-0.5 flex items-center gap-1.5 text-sm text-[var(--muted)]">
        <MapPin size={13} aria-hidden className="flex-shrink-0" />
        <span className="truncate">
          {l.categorie}
          {l.ville ? ` · ${l.ville}` : ''}
        </span>
      </span>
    </li>
  );
}

/* Rendu façon WhatsApp : messages de l'agent à droite (vert), du partenaire à gauche. */
function Conversation({ messages, partenaire }) {
  const heures = ['09:12', '09:26', '09:27', '10:41', '10:41'];
  return (
    <div className="overflow-hidden rounded-3xl border border-[var(--border-strong)] shadow-[var(--shadow-lg)]">
      <div className="flex items-center gap-3 bg-[#075e54] px-4 py-3 text-white">
        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white/20 text-sm font-bold">
          {partenaire.slice(0, 1).toUpperCase()}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[0.95rem] font-semibold">{partenaire}</span>
          <span className="block text-xs text-white/75">WhatsApp</span>
        </span>
      </div>
      <div className="space-y-2 bg-[#ece5dd] px-3 py-4 sm:px-4">
        {messages.map((m, i) => {
          const agent = m.de === 'agent';
          return (
            <div key={i} className={`flex ${agent ? 'justify-end' : 'justify-start'}`}>
              <p
                className={[
                  'max-w-[85%] whitespace-pre-line rounded-xl px-3 pb-1.5 pt-2 text-[0.92rem] leading-snug text-[#111] shadow-sm',
                  agent ? 'rounded-tr-sm bg-[#dcf8c6]' : 'rounded-tl-sm bg-white',
                ].join(' ')}
              >
                {m.texte}
                <span className="mt-1 flex items-center justify-end gap-1 text-[0.68rem] text-[#667781]">
                  {heures[i] || ''}
                  {agent && <CheckCheck size={14} aria-hidden className="text-[#53bdeb]" />}
                </span>
              </p>
            </div>
          );
        })}
        <p className="mx-auto w-fit rounded-lg bg-[#fff3c4] px-3 py-1.5 text-center text-xs font-medium text-[#54470e]">
          À ce moment-là, vous recevez la conversation et vous rappelez.
        </p>
      </div>
    </div>
  );
}

function DejaFait() {
  return (
    <div className="rounded-3xl border-2 border-[var(--border-strong)] bg-[var(--surface)] p-6 sm:p-8">
      <p className="font-display text-xl font-semibold">Vous avez déjà fait votre simulation gratuite.</p>
      <p className="mt-2 text-[var(--muted-strong)]">
        Elle est limitée à une par entreprise. Pour voir la liste complète de votre zone et lancer
        votre agent, prenons 15 minutes.
      </p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <a
          href={RDV}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold"
        >
          Réserver 15 min
          <ArrowRight size={16} aria-hidden />
        </a>
        <a href={TEL_HREF} className="text-sm text-[var(--muted-strong)] underline underline-offset-4">
          ou appelez le {TEL_DISPLAY}
        </a>
      </div>
    </div>
  );
}

export default function Simulateur() {
  const [form, setForm] = useState({
    activite: '',
    ville: '',
    prenom: '',
    nom: '',
    telephone: '',
    entreprise: '',
    email: '',
    consentement: false,
  });
  const [etat, setEtat] = useState('saisie'); // saisie | attente | resultat | deja
  const [erreur, setErreur] = useState('');
  const [res, setRes] = useState(null);
  const [tick, setTick] = useState(0);
  const [tout, setTout] = useState(false);
  const haut = useRef(null);

  /* Un visiteur qui revient retrouve sa simulation au lieu d'un formulaire vide. */
  useEffect(() => {
    const g = lire();
    if (g?.res) {
      setForm(g.form);
      setRes(g.res);
      setEtat('resultat');
    }
  }, []);

  useEffect(() => {
    if (etat !== 'attente') return undefined;
    const t = setInterval(() => setTick((n) => n + 1), 6000);
    return () => clearInterval(t);
  }, [etat]);

  const maj = (k) => (e) =>
    setForm({ ...form, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

  async function lancer(e) {
    e.preventDefault();
    setErreur('');
    if (!form.activite || form.ville.trim().length < 2) {
      setErreur('Indiquez votre secteur et votre ville.');
      return;
    }
    if (form.prenom.trim().length < 2 || form.nom.trim().length < 2 || form.telephone.replace(/\D/g, '').length < 9) {
      setErreur('Indiquez votre prénom, votre nom et votre téléphone.');
      return;
    }
    if (!form.consentement) {
      setErreur('Cochez la case pour lancer le test.');
      return;
    }
    setTick(0);
    setEtat('attente');
    try {
      const r = await fetch('/api/simulateur', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const d = await r.json().catch(() => ({}));
      if (r.status === 409) {
        setEtat('deja');
        return;
      }
      if (!r.ok) throw new Error(d.erreur || 'La recherche n’a pas abouti.');
      setRes(d);
      setEtat('resultat');
      /* Sur téléphone, le formulaire est sous le texte : on remonte au début du résultat. */
      requestAnimationFrame(() => haut.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
      ecrire({ form: { ...form, telephone: '', email: '' }, res: d });
    } catch (err) {
      setErreur(err.message);
      setEtat('saisie');
    }
  }

  if (etat === 'deja') return <DejaFait />;

  if (etat === 'saisie' || etat === 'attente') {
    const attente = etat === 'attente';
    return (
      <form
        onSubmit={lancer}
        className="rounded-3xl border-2 border-[var(--border-strong)] bg-[var(--surface)] p-6 shadow-[var(--shadow-lg)] sm:p-8"
      >
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--muted)]">
          Test gratuit · une fois par entreprise
        </p>
        {[
          ['activite', 'Votre secteur d’activité', null],
          ['ville', 'Votre ville', { placeholder: 'Ex. : Bordeaux', autoComplete: 'address-level2' }],
          ['prenom', 'Prénom', { placeholder: 'L’agent signe à votre nom', autoComplete: 'given-name' }],
          ['nom', 'Nom', { autoComplete: 'family-name' }],
          ['telephone', 'Téléphone', { type: 'tel', placeholder: '06 12 34 56 78', autoComplete: 'tel' }],
          ['entreprise', 'Entreprise', { placeholder: 'Facultatif', autoComplete: 'organization' }],
        ].map(([k, label, props]) => (
          <div key={k} className="mt-4">
            <label className="block text-sm font-semibold" htmlFor={`sim-${k}`}>
              {label}
            </label>
            {props ? (
              <input
                id={`sim-${k}`}
                className={`${champ} mt-1.5`}
                value={form[k]}
                onChange={maj(k)}
                disabled={attente}
                required={k !== 'entreprise'}
                {...props}
              />
            ) : (
              <select
                id={`sim-${k}`}
                className={`${champ} mt-1.5`}
                value={form[k]}
                onChange={maj(k)}
                disabled={attente}
                required
              >
                <option value="">Choisissez…</option>
                {ACTIVITES.map((a) => (
                  <option key={a.key} value={a.key}>
                    {a.label}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}

        <label className="mt-4 flex items-start gap-2.5 text-xs leading-relaxed text-[var(--muted-strong)]">
          <input
            type="checkbox"
            className="mt-0.5"
            checked={form.consentement}
            onChange={maj('consentement')}
            disabled={attente}
            required
          />
          <span>
            J’accepte d’être recontacté par SmatchRoom Pulse au sujet de ce test. Mes coordonnées ne
            sont ni revendues ni utilisées pour autre chose (
            <a href="/confidentialite" className="underline">
              confidentialité
            </a>
            ).
          </span>
        </label>

        {erreur && <p className="mt-4 text-sm font-semibold text-red-600">{erreur}</p>}

        <button
          type="submit"
          disabled={attente}
          className="btn-primary mt-6 inline-flex w-full items-center justify-center gap-2 px-5 py-3.5 text-sm font-bold disabled:opacity-80"
        >
          {attente ? (
            <>
              <Loader2 size={16} aria-hidden className="animate-spin" />
              Recherche en cours
            </>
          ) : (
            <>
              Lancer mon test gratuit
              <ArrowRight size={16} aria-hidden />
            </>
          )}
        </button>
        <p className="mt-3 text-center text-xs text-[var(--muted)]" aria-live="polite">
          {attente
            ? `${ETAPES_ATTENTE[Math.min(tick, ETAPES_ATTENTE.length - 1)]} (20 à 40 secondes)`
            : 'Gratuit, une fois par entreprise. Résultat en moins d’une minute.'}
        </p>
      </form>
    );
  }

  const liste = tout ? res.lieux : res.lieux.slice(0, LISTE_VISIBLE);
  const caches = res.lieux.length - LISTE_VISIBLE;

  return (
    <div ref={haut} className="scroll-mt-24 space-y-6">
      <div>
        <p className="mb-3 text-sm font-semibold text-[var(--muted-strong)]">
          Voici ce que votre agent écrirait à <strong>{res.partenaire}</strong>, à votre nom :
        </p>
        <Conversation messages={res.conversation} partenaire={res.partenaire} />
        <p className="mt-2 text-xs text-[var(--muted)]">
          Les messages de l’agent sont ceux qu’il enverrait ; les réponses du partenaire sont un exemple.
        </p>
      </div>

      <div className="rounded-3xl border-2 border-[var(--primary)] bg-[var(--surface)] p-6 shadow-[var(--shadow-lg)] sm:p-8">
        <p className="font-display text-2xl font-semibold tracking-tight">
          {res.total} partenaires trouvés autour de {form.ville}
        </p>
        <p className="mt-2 text-sm text-[var(--muted-strong)]">
          {res.cible} de votre zone, trouvés en quelques secondes. Sur un mois, l’agent en contacte
          environ 300, par WhatsApp et par email.
        </p>

        <ul className="mt-5 space-y-2">
          {liste.map((l) => (
            <Lieu key={`${l.nom}-${l.ville}`} l={l} />
          ))}
        </ul>
        {!tout && caches > 0 && (
          <button
            type="button"
            onClick={() => setTout(true)}
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--primary-ink)]"
          >
            Voir les {caches} autres
            <ChevronDown size={15} aria-hidden />
          </button>
        )}

        <p className="mt-5 text-sm font-semibold text-[var(--primary-ink)]">
          Merci {form.prenom.trim()}, je vous rappelle rapidement pour en parler.
        </p>

        <div className="mt-6 flex flex-col gap-3 border-t border-[var(--border)] pt-5 sm:flex-row sm:items-center">
          <a
            href={RDV}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold"
          >
            Lancer mon agent : 15 min d’appel
            <ArrowRight size={16} aria-hidden />
          </a>
          <a href={TEL_HREF} className="text-sm text-[var(--muted-strong)] underline underline-offset-4">
            ou appelez le {TEL_DISPLAY}
          </a>
        </div>
      </div>
    </div>
  );
}
