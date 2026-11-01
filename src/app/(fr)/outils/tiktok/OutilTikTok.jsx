'use client';

/**
 * Outil interne de publication TikTok, conforme aux règles d'interface de la Content Posting API :
 * compte connecté affiché, visibilité choisie par l'utilisateur (aucune valeur par défaut),
 * interactions désactivées par défaut, déclaration de contenu commercial, consentement musique,
 * aperçu de la vidéo et suivi de la publication.
 */
import { useEffect, useState } from 'react';

const LIBELLES = {
  PUBLIC_TO_EVERYONE: 'Tout le monde',
  MUTUAL_FOLLOW_FRIENDS: 'Amis',
  FOLLOWER_OF_CREATOR: 'Abonnés',
  SELF_ONLY: 'Moi uniquement',
};
const MUSIQUE = 'https://www.tiktok.com/legal/page/global/music-usage-confirmation/en';
const MARQUE = 'https://www.tiktok.com/legal/page/global/bc-policy/en';

export default function OutilTikTok() {
  const [etat, setEtat] = useState({ charge: true });
  const [video, setVideo] = useState('');
  const [titre, setTitre] = useState('');
  const [conf, setConf] = useState('');
  const [inter, setInter] = useState({ commentaires: false, duo: false, collage: false });
  const [commercial, setCommercial] = useState(false);
  const [maMarque, setMaMarque] = useState(false);
  const [sponsorise, setSponsorise] = useState(false);
  const [accord, setAccord] = useState(false);
  const [envoi, setEnvoi] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    if (q.get('erreur')) setMessage(q.get('erreur'));
    fetch('/api/tiktok?action=infos', { cache: 'no-store' })
      .then(async (r) => ({ ok: r.ok, status: r.status, j: await r.json().catch(() => ({})) }))
      .then(({ ok, status, j }) => {
        if (status === 403) setEtat({ interdit: true });
        else if (!ok) setEtat({ erreur: j.erreur || 'Erreur' });
        else setEtat(j);
      })
      .catch(() => setEtat({ erreur: 'Erreur réseau' }));
  }, []);

  useEffect(() => {
    if (!envoi?.id || envoi.fini) return;
    const t = setInterval(async () => {
      const r = await fetch(`/api/tiktok?action=statut&id=${encodeURIComponent(envoi.id)}`, { cache: 'no-store' });
      const j = await r.json().catch(() => ({}));
      const s = j.status || 'PROCESSING';
      setEnvoi((e) => ({ ...e, statut: s, fini: ['PUBLISH_COMPLETE', 'FAILED'].includes(s), raison: j.fail_reason }));
    }, 4000);
    return () => clearInterval(t);
  }, [envoi?.id, envoi?.fini]);

  if (etat.charge) return <Cadre><p>Chargement…</p></Cadre>;
  if (etat.interdit) return <Cadre><p>Accès réservé à l’équipe SmatchRoom Pulse.</p></Cadre>;
  if (etat.erreur) return <Cadre><p className="text-red-400">{etat.erreur}</p></Cadre>;

  if (!etat.connecte) {
    return (
      <Cadre>
        <p className="mb-6 text-[#cdc9da]">Connectez le compte TikTok de SmatchRoom Pulse pour publier nos vidéos.</p>
        {message && <p className="mb-4 text-red-400">{message}</p>}
        <a href="/api/tiktok?action=connexion" className="inline-block rounded-full bg-white px-6 py-3 font-bold text-black">Se connecter avec TikTok</a>
      </Cadre>
    );
  }

  const c = etat.createur ?? {};
  const choisie = etat.videos.find((v) => v.url === video);
  const options = c.privacy_level_options ?? [];
  const marqueSansPrive = commercial && sponsorise;
  const pret = video && conf && accord && (!commercial || maMarque || sponsorise) && !envoi?.encours;

  async function publierVideo() {
    setMessage('');
    setEnvoi({ encours: true });
    const r = await fetch('/api/tiktok', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: video, titre, confidentialite: conf, ...inter, commercial, maMarque, sponsorise, accord }),
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) { setEnvoi(null); setMessage(j.erreur || 'Publication refusée'); return; }
    setEnvoi({ id: j.publish_id, statut: 'PROCESSING' });
  }

  return (
    <Cadre>
      <div className="mb-8 flex items-center gap-4">
        {c.creator_avatar_url && <img src={c.creator_avatar_url} alt="" className="h-14 w-14 rounded-full" />}
        <div>
          <p className="text-sm text-[#9a95ad]">Publication sur le compte</p>
          <p className="text-lg font-bold">{c.creator_nickname} <span className="font-normal text-[#9a95ad]">@{c.creator_username}</span></p>
        </div>
      </div>

      <label className="mb-2 block font-bold" htmlFor="video">Vidéo</label>
      <select id="video" value={video} onChange={(e) => { setVideo(e.target.value); const v = etat.videos.find((x) => x.url === e.target.value); setTitre(v ? v.legende.replace(/#\w+/g, '').trim().slice(0, 2000) : ''); }}
        className="mb-4 w-full rounded-lg bg-[#1a1626] p-3">
        <option value="">Choisir une vidéo</option>
        {etat.videos.map((v) => <option key={v.id} value={v.url}>{v.titre}</option>)}
      </select>
      {choisie && <video src={choisie.url} controls className="mb-6 max-h-[420px] rounded-xl" />}

      <label className="mb-2 block font-bold" htmlFor="titre">Légende</label>
      <textarea id="titre" value={titre} onChange={(e) => setTitre(e.target.value)} rows={5} maxLength={2200} className="mb-6 w-full rounded-lg bg-[#1a1626] p-3" />

      <label className="mb-2 block font-bold" htmlFor="conf">Qui peut voir cette vidéo ?</label>
      <select id="conf" value={conf} onChange={(e) => setConf(e.target.value)} className="mb-6 w-full rounded-lg bg-[#1a1626] p-3">
        <option value="">Choisir</option>
        {options.map((o) => <option key={o} value={o} disabled={marqueSansPrive && o === 'SELF_ONLY'}>{LIBELLES[o] ?? o}{marqueSansPrive && o === 'SELF_ONLY' ? ' (impossible pour un contenu de marque)' : ''}</option>)}
      </select>

      <p className="mb-2 font-bold">Autoriser les utilisateurs à :</p>
      <div className="mb-6 flex flex-wrap gap-6">
        {[['commentaires', 'Commenter', c.comment_disabled], ['duo', 'Faire un duo', c.duet_disabled], ['collage', 'Faire un collage', c.stitch_disabled]].map(([k, l, off]) => (
          <label key={k} className={`flex items-center gap-2 ${off ? 'opacity-40' : ''}`}>
            <input type="checkbox" disabled={off} checked={!off && inter[k]} onChange={(e) => setInter({ ...inter, [k]: e.target.checked })} /> {l}
          </label>
        ))}
      </div>

      <label className="mb-2 flex items-center gap-2 font-bold">
        <input type="checkbox" checked={commercial} onChange={(e) => { setCommercial(e.target.checked); if (!e.target.checked) { setMaMarque(false); setSponsorise(false); } }} />
        Divulguer le contenu commercial
      </label>
      {commercial && (
        <div className="mb-4 ml-6 space-y-2 text-[#cdc9da]">
          <label className="flex items-center gap-2"><input type="checkbox" checked={maMarque} onChange={(e) => setMaMarque(e.target.checked)} /> Votre marque (la vidéo sera indiquée « Contenu promotionnel »)</label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={sponsorise} onChange={(e) => { setSponsorise(e.target.checked); if (e.target.checked && conf === 'SELF_ONLY') setConf(''); }} /> Contenu de marque (la vidéo sera indiquée « Partenariat rémunéré »)</label>
          {!maMarque && !sponsorise && <p className="text-sm text-amber-300">Choisissez au moins une option.</p>}
        </div>
      )}

      <label className="mb-6 mt-4 flex items-start gap-2 text-sm text-[#cdc9da]">
        <input type="checkbox" className="mt-1" checked={accord} onChange={(e) => setAccord(e.target.checked)} />
        <span>En publiant, vous acceptez la <a href={MUSIQUE} target="_blank" rel="noreferrer" className="underline">déclaration d’utilisation de la musique</a> de TikTok{sponsorise ? <> et sa <a href={MARQUE} target="_blank" rel="noreferrer" className="underline">politique sur le contenu de marque</a></> : null}.</span>
      </label>

      {message && <p className="mb-4 text-red-400">{message}</p>}
      <button type="button" disabled={!pret} onClick={publierVideo} className="rounded-full bg-[#b69cff] px-8 py-3 font-bold text-black disabled:opacity-40">
        {envoi?.encours ? 'Envoi en cours…' : 'Publier sur TikTok'}
      </button>

      {envoi?.id && (
        <p className="mt-6 text-[#cdc9da]">
          {envoi.statut === 'PUBLISH_COMPLETE' ? '✅ Vidéo publiée sur TikTok.'
            : envoi.statut === 'FAILED' ? `❌ Publication échouée : ${envoi.raison ?? ''}`
            : 'Vidéo envoyée. TikTok la traite, elle peut mettre quelques minutes à apparaître sur le profil…'}
        </p>
      )}
    </Cadre>
  );
}

function Cadre({ children }) {
  return (
    <main className="min-h-screen bg-[#0b0912] px-4 py-16 text-[#f4f2fa]">
      <div className="mx-auto max-w-2xl">
        <p className="mb-2 text-sm font-bold uppercase tracking-[0.3em] text-[#b69cff]">SmatchRoom Pulse</p>
        <h1 className="mb-8 text-3xl font-extrabold">Publication TikTok</h1>
        {children}
      </div>
    </main>
  );
}
