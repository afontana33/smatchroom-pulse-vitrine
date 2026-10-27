'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

const champ =
  'block w-full rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] px-4 py-3 text-[0.95rem] text-[var(--foreground)] outline-none focus:border-[var(--primary)]';
const carte = 'rounded-3xl border-2 border-[var(--border-strong)] bg-[var(--surface)] p-6 sm:p-8';

export default function ConnexionWhatsApp({ token }) {
  const [etat, setEtat] = useState({ etat: 'attente' });
  const [numero, setNumero] = useState('');
  const [code, setCode] = useState('');
  const [erreur, setErreur] = useState('');

  /* Le QR code de WhatsApp change toutes les 20 secondes : on le recharge toutes les 5 secondes. */
  useEffect(() => {
    let fini = false;
    const tour = async () => {
      const j = await fetch(`/api/connexion?token=${token}`, { cache: 'no-store' }).then((r) => r.json()).catch(() => null);
      if (fini || j == null) return;
      setEtat(j);
      if (j.etat === 'connecte') fini = true;
    };
    tour();
    const t = setInterval(() => (fini ? clearInterval(t) : tour()), 5000);
    return () => { fini = true; clearInterval(t); };
  }, [token]);

  async function demanderCode(e) {
    e.preventDefault();
    setErreur('');
    setCode('');
    const r = await fetch('/api/connexion', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token, numero }) }).catch(() => null);
    const j = r ? await r.json().catch(() => ({})) : {};
    if (!r || r.ok === false) setErreur(j.erreur || 'Réessayez dans un instant.');
    else setCode(j.code);
  }

  if (etat.etat === 'connecte')
    return (
      <div className={`${carte} border-[var(--primary)]`}>
        <p className="flex items-center gap-2 text-lg font-bold">
          <CheckCircle2 size={22} className="text-[var(--primary)]" aria-hidden />
          C’est connecté.
        </p>
        <p className="mt-2 text-[var(--muted-strong)]">Votre agent démarre dans quelques minutes. Je vous préviens sur WhatsApp dès qu’un professionnel est intéressé.</p>
      </div>
    );

  return (
    <div className="space-y-6">
      <div className={carte}>
        <p className="font-bold">Option 1 : vous êtes sur un ordinateur</p>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-[var(--muted-strong)]">
          <li>Sur le téléphone du numéro à connecter, ouvrez WhatsApp.</li>
          <li>Menu (⋮ ou Réglages), puis « Appareils connectés », puis « Connecter un appareil ».</li>
          <li>Scannez le code ci-dessous. Il se met à jour tout seul.</li>
        </ol>
        <div className="mt-5 flex justify-center">
          {etat.etat === 'qr' ? (
            <img src={`data:image/png;base64,${etat.qr}`} alt="QR code de connexion WhatsApp" className="h-64 w-64 rounded-xl bg-white p-2" />
          ) : (
            <p className="text-sm text-[var(--muted-strong)]">Chargement du code…</p>
          )}
        </div>
      </div>

      <div className={carte}>
        <p className="font-bold">Option 2 : vous n’avez que votre téléphone</p>
        <form onSubmit={demanderCode} className="mt-3 space-y-3">
          <input className={champ} type="tel" placeholder="Numéro WhatsApp à connecter" value={numero} onChange={(e) => setNumero(e.target.value)} required />
          <button type="submit" className="btn-primary inline-flex w-full items-center justify-center px-5 py-3 text-sm font-bold">
            Recevoir mon code de connexion
          </button>
        </form>
        {erreur && <p className="mt-3 text-sm font-semibold text-red-600">{erreur}</p>}
        {code && (
          <div className="mt-4 rounded-2xl bg-[var(--surface-2)] p-4 text-sm">
            <p className="text-center font-mono text-2xl font-bold tracking-widest">{code}</p>
            <p className="mt-3 text-[var(--muted-strong)]">
              Dans WhatsApp : « Appareils connectés », puis « Connecter un appareil », puis « Se connecter avec le numéro de téléphone », et saisissez ce code.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
