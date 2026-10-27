'use client';

import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function ChoixContinuer({ token, dejaRepondu }) {
  const [etat, setEtat] = useState(dejaRepondu ? 'deja' : 'choix');
  const [p, setP] = useState(null);
  const [erreur, setErreur] = useState('');

  async function repondre(choix) {
    setErreur('');
    setEtat('envoi');
    const res = await fetch('/api/continuer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, choix }),
    }).catch(() => null);
    const j = res ? await res.json().catch(() => ({})) : {};
    if (!res || res.ok === false) {
      setErreur(j.erreur || 'Connexion impossible. Réessayez.');
      setEtat(res?.status === 409 ? 'deja' : 'choix');
      return;
    }
    setP(j.paiement || null);
    setEtat(choix === 'oui' ? 'oui' : 'non');
  }

  const carte = 'rounded-3xl border-2 border-[var(--primary)] bg-[var(--surface)] p-6 shadow-[var(--shadow-lg)] sm:p-8';
  if (etat === 'deja') return <div className={carte}><p className="font-bold">Vous avez déjà répondu, merci.</p></div>;
  if (etat === 'non')
    return (
      <div className={carte}>
        <p className="font-bold">C’est noté.</p>
        <p className="mt-2 text-[var(--muted-strong)]">Votre agent s’arrêtera à l’échéance. Merci pour votre confiance, et n’hésitez pas à revenir quand vous voulez.</p>
      </div>
    );
  if (etat === 'oui')
    return (
      <div className={carte}>
        <p className="flex items-center gap-2 text-lg font-bold">
          <CheckCircle2 size={22} className="text-[var(--primary)]" aria-hidden />
          Parfait, votre agent continue.
        </p>
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
  return (
    <div className="space-y-3">
      <button type="button" disabled={etat === 'envoi'} onClick={() => repondre('oui')} className="btn-primary inline-flex w-full items-center justify-center px-5 py-3.5 text-sm font-bold disabled:opacity-80">
        Oui, je continue un mois de plus
      </button>
      <button type="button" disabled={etat === 'envoi'} onClick={() => repondre('non')} className="inline-flex w-full items-center justify-center rounded-xl border border-[var(--border-strong)] px-5 py-3.5 text-sm font-semibold disabled:opacity-80">
        Non, j’arrête à l’échéance
      </button>
      {erreur && <p className="text-sm font-semibold text-red-600">{erreur}</p>}
    </div>
  );
}
