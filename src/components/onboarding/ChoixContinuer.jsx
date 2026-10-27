'use client';

import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

/* Avant d'arrêter : on demande pourquoi, puis on propose une solution adaptée (demande du 27/10/2026). */
const MOTIFS = [
  ['resultats', 'Pas assez de résultats'],
  ['prix', 'C’est trop cher pour moi'],
  ['temps', 'Je n’ai pas le temps de rappeler les contacts'],
  ['carnet', 'Mon carnet est plein, pas besoin en ce moment'],
  ['autre', 'Autre raison'],
];

const OFFRES = {
  resultats: {
    titre: 'Laissez-moi corriger le tir',
    texte: 'Si les retours ne sont pas au rendez-vous, c’est à moi d’ajuster. Dès cette semaine, je change la cible, la zone ou le message de votre agent, et je vous montre ce que je modifie.',
    actions: [
      ['oui', 'cible', 'D’accord, on continue avec ces changements'],
      ['rappel', null, 'Je préfère qu’on en parle d’abord'],
    ],
  },
  prix: {
    titre: 'Parlons-en avant d’arrêter',
    texte: 'Je préfère en discuter avec vous : on peut revoir ensemble la cible et le volume pour que l’agent vous rapporte plus qu’il ne vous coûte.',
    actions: [['rappel', null, 'Oui, appelez-moi']],
  },
  temps: {
    titre: 'On peut ralentir',
    texte: 'Je peux réduire le rythme des envois pour que vous ayez moins de contacts à rappeler, ou mettre l’agent en pause un mois et reprendre ensuite.',
    actions: [
      ['oui', 'rythme', 'Ralentir le rythme et continuer'],
      ['pause', null, 'Pause d’un mois, puis on reprend'],
    ],
  },
  carnet: {
    titre: 'Bonne nouvelle, et on peut faire une pause',
    texte: 'Plutôt que tout arrêter, je mets votre agent en pause un mois et je reviens vers vous ensuite. Vos contacts et vos réglages restent prêts.',
    actions: [['pause', null, 'Pause d’un mois, puis on reprend']],
  },
  autre: {
    titre: 'Merci de m’en dire plus',
    texte: 'Votre retour m’aide à améliorer l’agent. Si vous le souhaitez, je vous appelle pour voir ce qu’on peut faire.',
    actions: [['rappel', null, 'Oui, appelez-moi']],
  },
};

const FINS = {
  non: ['C’est noté.', 'Votre agent s’arrêtera à l’échéance. Merci pour votre confiance et pour votre retour. Si vous voulez le relancer un jour, il suffit de me répondre sur WhatsApp.'],
  rappel: ['C’est noté, je vous appelle très vite.', 'On en parle ensemble avant l’échéance. Après notre échange, vous pourrez donner votre réponse sur cette même page.'],
  pause: ['C’est noté, votre agent se met en pause à l’échéance.', 'Je reviens vers vous dans un mois pour le relancer. Rien à payer pendant la pause.'],
};

export default function ChoixContinuer({ token, dejaRepondu, motifInitial }) {
  const [etat, setEtat] = useState(dejaRepondu ? 'deja' : 'choix');
  const [occupe, setOccupe] = useState(false);
  const [motif, setMotif] = useState(motifInitial || '');
  const [detail, setDetail] = useState('');
  const [p, setP] = useState(null);
  const [fin, setFin] = useState('');
  const [erreur, setErreur] = useState('');

  async function repondre(choix, ajustement = null) {
    setErreur('');
    setOccupe(true);
    const res = await fetch('/api/continuer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, choix, motif: motif || undefined, detail: detail || undefined, ajustement }),
    }).catch(() => null);
    const j = res ? await res.json().catch(() => ({})) : {};
    setOccupe(false);
    if (!res || res.ok === false) {
      setErreur(j.erreur || 'Connexion impossible. Réessayez.');
      if (res?.status === 409) setEtat('deja');
      return;
    }
    setP(j.paiement || null);
    setFin(choix);
    setEtat('fini');
  }

  const carte = 'rounded-3xl border-2 border-[var(--primary)] bg-[var(--surface)] p-6 shadow-[var(--shadow-lg)] sm:p-8';
  const btnPrincipal = 'btn-primary inline-flex w-full items-center justify-center px-5 py-3.5 text-sm font-bold disabled:opacity-80';
  const btnSecondaire = 'inline-flex w-full items-center justify-center rounded-xl border border-[var(--border-strong)] px-5 py-3.5 text-sm font-semibold disabled:opacity-80';
  const lienArret = 'w-full text-center text-sm text-[var(--muted-strong)] underline underline-offset-4 disabled:opacity-60';
  const msgErreur = erreur && <p className="text-sm font-semibold text-red-600">{erreur}</p>;

  if (etat === 'deja') return <div className={carte}><p className="font-bold">Vous avez déjà répondu, merci.</p></div>;

  if (etat === 'fini' && fin === 'oui')
    return (
      <div className={carte}>
        <p className="flex items-center gap-2 text-lg font-bold">
          <CheckCircle2 size={22} className="text-[var(--primary)]" aria-hidden />
          Parfait, votre agent continue.
        </p>
        {motif && <p className="mt-2 text-[var(--muted-strong)]">Merci pour votre confiance. Je fais les changements cette semaine et je vous tiens au courant.</p>}
        <p className="mt-2 text-[var(--muted-strong)]">Votre facture vous arrive par email. Règlement par virement :</p>
        {p && (
          <div className="mt-4 space-y-1.5 rounded-2xl bg-[var(--surface-2)] p-4 text-sm">
            <p><strong>Montant :</strong> {p.montant} TTC ({p.ht} HT)</p>
            <p><strong>Bénéficiaire :</strong> SmatchRoom</p>
            <p><strong>IBAN :</strong> <span className="font-mono">{p.iban}</span></p>
            <p><strong>BIC :</strong> <span className="font-mono">{p.bic}</span></p>
            <p><strong>Référence :</strong> {p.reference}</p>
          </div>
        )}
      </div>
    );

  if (etat === 'fini')
    return (
      <div className={carte}>
        <p className="font-bold">{FINS[fin][0]}</p>
        <p className="mt-2 text-[var(--muted-strong)]">{FINS[fin][1]}</p>
      </div>
    );

  if (etat === 'pourquoi')
    return (
      <div className={carte}>
        <p className="text-lg font-bold">Avant d’arrêter, pouvez-vous me dire pourquoi ?</p>
        <p className="mt-1 text-sm text-[var(--muted-strong)]">Votre réponse m’aide vraiment à m’améliorer.</p>
        <div className="mt-5 space-y-2" role="radiogroup">
          {MOTIFS.map(([k, label]) => (
            <label key={k} className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm ${motif === k ? 'border-[var(--primary)] bg-[var(--surface-2)] font-semibold' : 'border-[var(--border-strong)]'}`}>
              <input type="radio" name="motif" value={k} checked={motif === k} onChange={() => setMotif(k)} />
              {label}
            </label>
          ))}
        </div>
        <label htmlFor="motif-detail" className="mt-5 block text-sm font-semibold">Un mot de plus ? (facultatif)</label>
        <textarea
          id="motif-detail"
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          maxLength={1000}
          className="mt-1.5 block min-h-[80px] w-full rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] px-4 py-3 text-[0.95rem] outline-none focus:border-[var(--primary)]"
        />
        <div className="mt-5 space-y-3">
          <button type="button" disabled={!motif} onClick={() => setEtat('offre')} className={btnPrincipal}>Continuer</button>
          <button type="button" onClick={() => setEtat('choix')} className={lienArret}>Retour</button>
          {msgErreur}
        </div>
      </div>
    );

  if (etat === 'offre' && OFFRES[motif])
    return (
      <div className={carte}>
        <p className="text-lg font-bold">{OFFRES[motif].titre}</p>
        <p className="mt-2 text-[var(--muted-strong)]">{OFFRES[motif].texte}</p>
        <div className="mt-6 space-y-3">
          {OFFRES[motif].actions.map(([choix, ajust, label], i) => (
            <button key={label} type="button" disabled={occupe} onClick={() => repondre(choix, ajust)} className={i === 0 ? btnPrincipal : btnSecondaire}>
              {label}
            </button>
          ))}
          <button type="button" disabled={occupe} onClick={() => repondre('non')} className={lienArret}>
            Non merci, j’arrête à l’échéance
          </button>
          {msgErreur}
        </div>
      </div>
    );

  return (
    <div className="space-y-3">
      <button type="button" disabled={occupe} onClick={() => repondre('oui')} className={btnPrincipal}>
        Oui, je continue un mois de plus
      </button>
      <button type="button" disabled={occupe} onClick={() => setEtat('pourquoi')} className={btnSecondaire}>
        Non, je souhaite arrêter
      </button>
      {msgErreur}
    </div>
  );
}
