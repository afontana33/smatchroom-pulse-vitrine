'use client';
/**
 * Jarvis : on touche l'orbe, on parle, elle répond (04/11/2026).
 * La voix passe par ElevenLabs (client chargé depuis jsDelivr, version figée),
 * avec une URL signée fournie par /api/jarvis/signed-url après connexion.
 */
import { useCallback, useEffect, useRef, useState } from 'react';

const SDK = 'https://cdn.jsdelivr.net/npm/@elevenlabs/client@1.28.0/dist/lib.iife.js';
const SUGGESTIONS = ['Qu’est-ce que je dois faire ?', 'Comment vont mes clients ?', 'Qu’est-ce qui tourne en ce moment ?', 'Qui m’a répondu aujourd’hui ?'];

function chargerSdk() {
  if (typeof window === 'undefined') return Promise.reject(new Error('navigateur requis'));
  if (window.ElevenLabsClient) return Promise.resolve(window.ElevenLabsClient);
  if (window.__jvSdk) return window.__jvSdk;
  window.__jvSdk = new Promise((ok, ko) => {
    const s = document.createElement('script');
    s.src = SDK;
    s.async = true;
    s.onload = () => (window.ElevenLabsClient ? ok(window.ElevenLabsClient) : ko(new Error('SDK introuvable')));
    s.onerror = () => ko(new Error('Impossible de charger la voix'));
    document.head.appendChild(s);
  });
  return window.__jvSdk;
}

const depuis = (min) => {
  if (min == null) return '—';
  if (min < 60) return `il y a ${min} min`;
  if (min < 1440) return `il y a ${Math.round(min / 60)} h`;
  return `il y a ${Math.round(min / 1440)} j`;
};
const etatPouls = (min) => (min == null ? 'arret' : min <= 120 ? 'ok' : min <= 1440 ? 'lent' : 'arret');
const nb = (x) => Number(x ?? 0);

function Pouls({ s }) {
  if (!s) return null;
  const lignes = [
    ['WhatsApp', s.agent_whatsapp_derniere_action_min],
    ['LinkedIn', s.linkedin_derniere_action_min],
    ['Instagram', s.instagram_derniere_action_min],
    [`Agents clients (${nb(s.agents_clients_actifs)})`, s.agents_clients_dernier_envoi_min],
  ];
  return (
    <div className="jv-pouls">
      {lignes.map(([nom, min]) => (
        <span key={nom} className={`jv-pastille ${etatPouls(min)}`} title={depuis(min)}><i />{nom}<em>{depuis(min)}</em></span>
      ))}
    </div>
  );
}

const eur = (x) => `${Math.round(Number(x ?? 0)).toLocaleString('fr-FR')} €`;

function Finances({ f }) {
  if (!f) return null;
  const fa = f.factures;
  const obj = Number(f.objectif_ca_mensuel_ht ?? 0);
  const ca = Number(fa?.ca_mois_ht ?? 0);
  const pct = obj > 0 ? Math.min(100, Math.round((ca / obj) * 100)) : null;
  const ecart = fa ? ca - Number(fa.ca_mois_dernier_meme_date_ht ?? 0) : null;
  return (
    <>
      <h3>Finances <small className="jv-maj">{f.mis_a_jour ? `Qonto · ${f.mis_a_jour}` : ''}</small></h3>
      <div className="jv-ca">
        <div><b>{fa ? eur(ca) : '—'}</b><span>CA du mois HT{ecart != null ? ` · ${ecart >= 0 ? '+' : ''}${eur(ecart)} vs mois dernier` : ''}</span></div>
        {pct != null ? <div className="jv-jauge"><i style={{ width: `${pct}%` }} /><em>{pct} % de l’objectif ({eur(obj)})</em></div> : null}
      </div>
      <p className="jv-ligne"><span>Encaissé ce mois</span><em>{eur(f.encaisse_mois_ttc)}</em></p>
      <p className="jv-ligne"><span>Dépenses · net</span><em>{eur(f.depenses_mois)} · {eur(f.net_mois)}</em></p>
      <p className="jv-ligne"><span>Solde Qonto</span><em>{eur(f.solde)}</em></p>
      {fa ? (
        <>
          <p className="jv-ligne"><span>Récurrent estimé</span><em>{eur(fa.recurrent_estime_ht)} / mois</em></p>
          <p className="jv-ligne"><span>En attente de paiement</span><em>{fa.en_attente?.nombre ?? 0} · {eur(fa.en_attente?.montant_ttc)}</em></p>
          {(fa.en_retard ?? []).slice(0, 3).map((r) => (
            <p key={r.numero + r.client} className="jv-ligne"><span>{r.client}</span><em className="urgent">{eur(r.montant_ttc)} · {r.jours} j de retard</em></p>
          ))}
        </>
      ) : <p className="jv-vide">{f.factures_erreur || 'Factures indisponibles'}</p>}
    </>
  );
}

function MonCote({ e }) {
  const a = e.mon_agent_aujourdhui ?? {};
  const taches = (e.taches ?? []).slice(0, 6);
  const rep = (e.reponses_du_jour ?? []).slice(0, 4);
  const alertes = (e.alertes_recentes ?? []).slice(0, 3);
  return (
    <aside className="jv-panneau">
      <h2>Mon côté</h2>
      <div className="jv-chiffres">
        <div><b>{nb(a.messages_envoyes)}</b><span>envoyés</span></div>
        <div><b>{nb(a.personnes_qui_ont_repondu)}</b><span>réponses</span></div>
        <div><b>{nb(a.messages_linkedin)}</b><span>LinkedIn</span></div>
        <div><b>{(e.leads_a_rappeler ?? []).length}</b><span>à rappeler</span></div>
      </div>
      <Finances f={e.finances} />
      <h3>À faire</h3>
      {taches.length ? taches.map((t) => (
        <p key={t.titre} className="jv-ligne"><span>{t.titre}</span><em className={t.quand === 'urgent' ? 'urgent' : ''}>{t.quand}</em></p>
      )) : <p className="jv-vide">Rien en attente</p>}
      <h3>Réponses du jour</h3>
      {rep.length ? rep.map((r) => (
        <p key={r.qui + r.heure} className="jv-ligne bloc"><span>{r.qui} <em>{r.heure}</em></span><small>{r.dernier_message}</small></p>
      )) : <p className="jv-vide">Aucune pour l’instant</p>}
      {alertes.length ? <h3>Dernières alertes</h3> : null}
      {alertes.map((x) => <p key={x.quand + x.texte} className="jv-ligne bloc"><span><em>{x.quand}</em></span><small>{x.texte}</small></p>)}
    </aside>
  );
}

function MesClients({ e }) {
  const agents = e.agents_clients ?? [];
  const insta = e.instagram ?? [];
  const s = e.systemes ?? {};
  return (
    <aside className="jv-panneau">
      <h2>Mes clients</h2>
      <div className="jv-agents">
        {agents.map((g) => (
          <div key={g.client} className="jv-agent">
            <p><b>{g.client}</b><em>{g.dernier_envoi ? `dernier envoi ${g.dernier_envoi}` : 'aucun envoi'}</em></p>
            <p className="jv-mini"><span>Aujourd’hui {nb(g.envoyes_aujourdhui)} envois · {nb(g.reponses_aujourdhui)} réponses</span><span>7 j : {nb(g.reponses_7j)}/{nb(g.envoyes_7j)}{nb(g.transmis_7j) ? ` · ${nb(g.transmis_7j)} chauds` : ''}</span></p>
          </div>
        ))}
        {agents.length === 0 ? <p className="jv-vide">Aucun agent actif</p> : null}
      </div>
      {insta.length ? <h3>Instagram</h3> : null}
      {insta.map((i) => (
        <p key={i.compte} className="jv-ligne"><span>{i.compte}</span><em>{nb(i.messages_envoyes)} DM · {nb(i.conversations)} conv.</em></p>
      ))}
      <h3>Publications</h3>
      <p className="jv-ligne"><span>À valider</span><em className={nb(s.publications_a_valider) ? 'urgent' : ''}>{nb(s.publications_a_valider)}</em></p>
      <p className="jv-ligne"><span>En montage · en file</span><em>{nb(s.publications_en_montage)} · {nb(s.publications_en_file)}</em></p>
    </aside>
  );
}

const heureParis = () => {
  const t = new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris', weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' });
  return t.charAt(0).toUpperCase() + t.slice(1);
};

export default function JarvisApp() {
  const [phase, setPhase] = useState('chargement'); // chargement | connexion | pret | ouverture | en_ligne
  const [mode, setMode] = useState('listening');
  const [messages, setMessages] = useState([]);
  const [erreur, setErreur] = useState('');
  const [mdp, setMdp] = useState('');
  const [horloge, setHorloge] = useState('');
  const [etat, setEtat] = useState(null);
  const conv = useRef(null);
  const orbe = useRef(null);
  const fil = useRef(null);

  useEffect(() => {
    const t0 = setTimeout(() => setHorloge(heureParis()), 0);
    const t = setInterval(() => setHorloge(heureParis()), 30000);
    fetch('/api/jarvis/session', { cache: 'no-store' })
      .then((r) => r.json())
      .then((j) => {
        if (j.configure === false) { setErreur('Jarvis n’est pas encore configuré sur le serveur.'); setPhase('connexion'); return; }
        setPhase(j.connecte ? 'pret' : 'connexion');
      })
      .catch(() => { setErreur('Serveur injoignable.'); setPhase('connexion'); });
    chargerSdk().catch(() => {});
    return () => { clearTimeout(t0); clearInterval(t); conv.current?.endSession?.().catch?.(() => {}); };
  }, []);

  // L'orbe respire avec la voix : volume de Jarvis quand elle parle, le tien quand elle écoute.
  useEffect(() => {
    let id;
    const boucle = () => {
      const c = conv.current;
      let v = 0;
      try { v = c ? (mode === 'speaking' ? c.getOutputVolume() : c.getInputVolume()) : 0; } catch { v = 0; }
      if (orbe.current) orbe.current.style.setProperty('--jv-vol', String(Math.min(1, v * 2.2)));
      id = requestAnimationFrame(boucle);
    };
    id = requestAnimationFrame(boucle);
    return () => cancelAnimationFrame(id);
  }, [mode]);

  // Tableau de bord : chargé à la connexion puis rafraîchi toutes les 45 s.
  const connecte = phase === 'pret' || phase === 'ouverture' || phase === 'en_ligne';
  useEffect(() => {
    if (connecte === false) return undefined;
    let fini = false;
    const charger = () => fetch('/api/jarvis/etat', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => { if (fini === false && j && j.systemes) setEtat(j); })
      .catch(() => {});
    const t0 = setTimeout(charger, 0);
    const t = setInterval(charger, 45000);
    return () => { fini = true; clearTimeout(t0); clearInterval(t); };
  }, [connecte]);

  useEffect(() => { fil.current?.scrollTo({ top: fil.current.scrollHeight, behavior: 'smooth' }); }, [messages]);

  const seConnecter = async (e) => {
    e.preventDefault();
    setErreur('');
    const r = await fetch('/api/jarvis/session', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ motdepasse: mdp }) }).catch(() => null);
    const j = r ? await r.json().catch(() => ({})) : {};
    if (r && r.ok) { setMdp(''); setPhase('pret'); } else setErreur(j.erreur || 'Connexion impossible.');
  };

  const arreter = useCallback(async () => {
    const c = conv.current;
    conv.current = null;
    try { await c?.endSession(); } catch {}
    setPhase('pret');
    setMode('listening');
  }, []);

  const demarrer = useCallback(async () => {
    if (phase === 'en_ligne' || phase === 'ouverture') { arreter(); return; }
    setErreur('');
    setPhase('ouverture');
    try {
      const flux = await navigator.mediaDevices.getUserMedia({ audio: true });
      flux.getTracks().forEach((t) => t.stop());
    } catch {
      setErreur('Autorise le micro pour parler à Jarvis.');
      setPhase('pret');
      return;
    }
    try {
      const [sdk, r] = await Promise.all([chargerSdk(), fetch('/api/jarvis/signed-url', { cache: 'no-store' })]);
      if (r.status === 401) { setPhase('connexion'); return; }
      const j = await r.json();
      if (!j.signedUrl) throw new Error(j.erreur || 'Ouverture refusée');
      conv.current = await sdk.Conversation.startSession({
        signedUrl: j.signedUrl,
        connectionType: 'websocket',
        onConnect: () => setPhase('en_ligne'),
        onDisconnect: () => { conv.current = null; setPhase((p) => (p === 'connexion' ? p : 'pret')); setMode('listening'); },
        onModeChange: ({ mode: m }) => setMode(m),
        onMessage: ({ message, source }) => {
          if (!message) return;
          setMessages((l) => [...l.slice(-30), { qui: source === 'user' ? 'moi' : 'jarvis', texte: message, id: `${Date.now()}-${Math.random()}` }]);
        },
        onError: (m) => setErreur(typeof m === 'string' ? m : 'Erreur de connexion.'),
      });
    } catch (e) {
      conv.current = null;
      setErreur(e?.message || 'Impossible de joindre Jarvis.');
      setPhase('pret');
    }
  }, [phase, arreter]);

  const suggerer = (t) => {
    const c = conv.current;
    if (c && typeof c.sendUserMessage === 'function') {
      c.sendUserMessage(t);
      setMessages((l) => [...l.slice(-30), { qui: 'moi', texte: t, id: `${Date.now()}` }]);
    }
  };

  const enLigne = phase === 'en_ligne';
  const statut = {
    chargement: 'Initialisation…',
    connexion: 'Accès protégé',
    pret: 'Touche l’orbe pour me parler',
    ouverture: 'Connexion…',
    en_ligne: mode === 'speaking' ? 'Jarvis te répond' : 'Je t’écoute',
  }[phase];

  return (
    <main className="jv-app">
      <div className="jv-grille" aria-hidden="true" />
      <header className="jv-haut">
        <span className="jv-marque">JARVIS<i>·</i>SMATCHROOM</span>
        <span className="jv-horloge">{horloge}</span>
      </header>

      {phase === 'connexion' ? (
        <form className="jv-acces" onSubmit={seConnecter}>
          <div className="jv-orbe jv-orbe-petite" aria-hidden="true"><i /><i /><i /><b /></div>
          <h1>Bonjour Alexis</h1>
          <label htmlFor="jv-mdp">Mot de passe</label>
          <input id="jv-mdp" type="password" autoComplete="current-password" value={mdp} onChange={(e) => setMdp(e.target.value)} autoFocus />
          <button type="submit">Entrer</button>
          {erreur ? <p className="jv-erreur">{erreur}</p> : null}
        </form>
      ) : (
        <div className="jv-scene">
        <Pouls s={etat?.systemes} />
        {etat ? <MonCote e={etat} /> : <aside className="jv-panneau attente" />}
        <section className="jv-centre">
          <button
            type="button"
            ref={orbe}
            className={`jv-orbe ${enLigne ? 'actif' : ''} ${enLigne && mode === 'speaking' ? 'parle' : ''} ${phase === 'ouverture' ? 'ouvre' : ''}`}
            onClick={demarrer}
            disabled={phase === 'chargement'}
            aria-label={enLigne ? 'Terminer la conversation' : 'Parler à Jarvis'}
          >
            <i /><i /><i /><b />
          </button>
          <p className="jv-statut" aria-live="polite">{statut}</p>
          {enLigne ? <p className="jv-aide">Touche l’orbe pour raccrocher</p> : null}
          {erreur ? <p className="jv-erreur">{erreur}</p> : null}

          {enLigne ? (
            <div className="jv-suggestions">
              {SUGGESTIONS.map((s) => <button key={s} type="button" onClick={() => suggerer(s)}>{s}</button>)}
            </div>
          ) : null}

          <div className="jv-fil" ref={fil} aria-live="polite">
            {messages.map((m) => (
              <p key={m.id} className={`jv-msg ${m.qui}`}><span>{m.qui === 'moi' ? 'Toi' : 'Jarvis'}</span>{m.texte}</p>
            ))}
          </div>
        </section>
        {etat ? <MesClients e={etat} /> : <aside className="jv-panneau attente" />}
        </div>
      )}
    </main>
  );
}
