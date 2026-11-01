/**
 * TikTok (outil interne, 01/11/2026) : connexion du compte TikTok de SmatchRoom Pulse
 * et publication de nos propres vidéos avec la Content Posting API.
 *
 * Variables d'environnement (jamais exposées au navigateur) :
 *   TIKTOK_CLIENT_KEY, TIKTOK_CLIENT_SECRET : identifiants de l'app TikTok
 *   TIKTOK_OUTIL_CLE : clé d'accès à la page /outils/tiktok (réservée à l'équipe)
 *   SUPABASE_URL, SUPABASE_SERVICE_KEY : stockage du jeton (table tiktok_comptes)
 */

export const REDIRECT_URI = 'https://pulse.smatchroom.com/outils/tiktok/retour';
export const SCOPES = 'user.info.basic,video.upload,video.publish';
const API = 'https://open.tiktokapis.com/v2';

function sb() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Supabase non configuré');
  const h = { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' };
  return {
    async get(table, query) {
      const r = await fetch(`${url}/rest/v1/${table}?${query}`, { headers: h, cache: 'no-store' });
      if (!r.ok) throw new Error(`Supabase ${table} ${r.status}`);
      return r.json();
    },
    async upsert(table, row) {
      const r = await fetch(`${url}/rest/v1/${table}`, { method: 'POST', headers: { ...h, Prefer: 'resolution=merge-duplicates' }, body: JSON.stringify(row) });
      if (!r.ok) throw new Error(`Supabase ${table} ${r.status}`);
    },
  };
}

/** Accès réservé : la clé est passée une fois dans l'URL (?cle=…), puis gardée dans un cookie httpOnly. */
export function autorise(request) {
  const cle = process.env.TIKTOK_OUTIL_CLE;
  if (!cle) return false;
  return request.cookies.get('tt_outil')?.value === cle;
}

async function jeton(params) {
  const r = await fetch(`${API}/oauth/token/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ client_key: process.env.TIKTOK_CLIENT_KEY ?? '', client_secret: process.env.TIKTOK_CLIENT_SECRET ?? '', ...params }),
  });
  const texte = await r.text();
  let j = {};
  try { j = JSON.parse(texte); } catch {}
  if (!r.ok || j.error) {
    console.error('[tiktok] jeton', r.status, texte.slice(0, 500));
    throw new Error(j.error_description || j.error || `TikTok ${r.status} ${texte.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').slice(0, 160)}`);
  }
  return j;
}

async function enregistrer(t, extra = {}) {
  const now = Date.now();
  await sb().upsert('tiktok_comptes', {
    open_id: t.open_id,
    access_token: t.access_token,
    refresh_token: t.refresh_token,
    expire_at: new Date(now + (t.expires_in ?? 86400) * 1000).toISOString(),
    refresh_expire_at: new Date(now + (t.refresh_expires_in ?? 31536000) * 1000).toISOString(),
    maj_at: new Date().toISOString(),
    ...extra,
  });
}

export async function echangerCode(code) {
  const t = await jeton({ code, grant_type: 'authorization_code', redirect_uri: REDIRECT_URI });
  await enregistrer(t);
  return t.open_id;
}

/** Jeton valide du compte connecté (rafraîchi s'il expire dans moins de 10 minutes). */
export async function compte() {
  const rows = await sb().get('tiktok_comptes', 'select=*&order=maj_at.desc&limit=1');
  const c = rows[0];
  if (!c) return null;
  if (new Date(c.expire_at).getTime() - Date.now() < 600000) {
    const t = await jeton({ grant_type: 'refresh_token', refresh_token: c.refresh_token });
    await enregistrer({ ...t, open_id: c.open_id });
    return { ...c, access_token: t.access_token };
  }
  return c;
}

async function post(path, token, body) {
  const r = await fetch(`${API}${path}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify(body ?? {}),
  });
  const texte = await r.text();
  let j = {};
  try { j = JSON.parse(texte); } catch {}
  if (j.error && j.error.code && j.error.code !== 'ok') throw new Error(`${j.error.code} : ${j.error.message ?? ''}`.trim());
  if (!r.ok || j.data == null) {
    console.error('[tiktok]', path, r.status, texte.slice(0, 500));
    throw new Error(`TikTok ${r.status} sur ${path} : ${texte.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').slice(0, 160)}`);
  }
  return j.data;
}

export async function infosCreateur(c) {
  return post('/post/publish/creator_info/query/', c.access_token);
}

export async function videosDisponibles() {
  const rows = await sb().get('ig_publications', 'select=id,titre,video_url,legende&type=eq.reel&video_url=not.is.null&order=ordre');
  return rows.map((r) => ({ id: r.id, titre: r.titre, url: r.video_url, legende: r.legende }));
}

/** Publication directe : on télécharge notre vidéo puis on l'envoie à TikTok en un seul morceau (64 Mo maximum). */
export async function publier(c, { url, titre, confidentialite, sansCommentaires, sansDuo, sansCollage, marqueCommerciale, contenuSponsorise }) {
  const autorisees = (await videosDisponibles()).map((v) => v.url);
  if (!autorisees.includes(url)) throw new Error('Vidéo inconnue');
  const v = await fetch(url, { cache: 'no-store' });
  if (!v.ok) throw new Error(`Vidéo introuvable (${v.status})`);
  const buf = Buffer.from(await v.arrayBuffer());
  if (buf.length > 64 * 1024 * 1024) throw new Error('Vidéo trop lourde (64 Mo maximum)');
  const init = await post('/post/publish/video/init/', c.access_token, {
    post_info: {
      title: String(titre ?? '').slice(0, 2200),
      privacy_level: confidentialite,
      disable_comment: Boolean(sansCommentaires),
      disable_duet: Boolean(sansDuo),
      disable_stitch: Boolean(sansCollage),
      brand_organic_toggle: Boolean(marqueCommerciale),
      brand_content_toggle: Boolean(contenuSponsorise),
    },
    source_info: { source: 'FILE_UPLOAD', video_size: buf.length, chunk_size: buf.length, total_chunk_count: 1 },
  });
  if (!init.upload_url || !init.publish_id) throw new Error('TikTok n’a pas renvoyé d’adresse d’envoi, réessayez.');
  const up = await fetch(init.upload_url, {
    method: 'PUT',
    headers: { 'Content-Type': 'video/mp4', 'Content-Length': String(buf.length), 'Content-Range': `bytes 0-${buf.length - 1}/${buf.length}` },
    body: buf,
  });
  if (!up.ok) throw new Error(`Envoi de la vidéo refusé (${up.status})`);
  await sb().upsert('tiktok_publications', { publish_id: init.publish_id, open_id: c.open_id, video_url: url, titre: String(titre ?? '').slice(0, 300), confidentialite, statut: 'envoye' });
  return init.publish_id;
}

export async function statut(c, publishId) {
  return post('/post/publish/status/fetch/', c.access_token, { publish_id: publishId });
}
