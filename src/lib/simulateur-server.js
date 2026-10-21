/**
 * Partie serveur du simulateur : recherche Apify, cache, et règle « une seule
 * simulation par visiteur » (IP hachée, table pulse_simulateur_runs, 90 jours).
 *
 * Importé uniquement par les routes /api/simulateur. Le cache des recherches
 * vit en mémoire du processus Next : un redémarrage le vide, sans conséquence.
 *
 * Variables d'environnement : APIFY_TOKEN (obligatoire), SUPABASE_URL et
 * SUPABASE_SERVICE_KEY, mêmes noms que dans agent-chasseur/.env (règle « une fois » durable et contacts),
 * SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS (alerte email à chaque contact),
 * LEADS_TO (destinataire, a.fontana@smatchroom.fr par défaut).
 */

import { createHash } from 'node:crypto';
import nodemailer from 'nodemailer';
import { activite } from './simulateur';

const ACTOR = 'compass~crawler-google-places';
const PAR_RECHERCHE = 6; // 3 recherches × 6 = 18 lieux au plus, ~0,06 $ par simulation
const CACHE_MS = 7 * 24 * 3600 * 1000;

const cache = new Map(); // clé `${activite}|${ville}` → { at, lieux }
const runsMemoire = new Map(); // repli sans Supabase : ipHash → { activite, ville }
const JOURS_UNE_FOIS = 90; // une simulation par visiteur sur cette période

export const cleCache = (act, ville) => `${act}|${ville.toLowerCase()}`;

export function lireCache(act, ville) {
  const c = cache.get(cleCache(act, ville));
  if (!c || Date.now() - c.at > CACHE_MS) return null;
  return c.lieux;
}

export function ipDe(request) {
  const h = request.headers;
  /* X-Real-IP d'abord : nginx le fixe à l'adresse réelle, alors que le début
     de X-Forwarded-For peut être fourni par le visiteur lui-même. */
  return h.get('x-real-ip') || (h.get('x-forwarded-for') || '').split(',').pop().trim() || 'inconnue';
}

/* L'IP n'est jamais stockée en clair. */
export function hashIp(ip) {
  return createHash('sha256').update(`pulse-simulateur|${ip}`).digest('hex').slice(0, 32);
}

function supabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return {
    url,
    headers: { 'Content-Type': 'application/json', apikey: key, Authorization: `Bearer ${key}` },
  };
}

/* Dernière simulation de ce visiteur (IP hachée), ou null. */
export async function simulationPrecedente(ipHash) {
  const sb = supabase();
  if (!sb) return runsMemoire.get(ipHash) || null;
  const depuis = new Date(Date.now() - JOURS_UNE_FOIS * 86400_000).toISOString();
  try {
    const res = await fetch(
      `${sb.url}/rest/v1/pulse_simulateur_runs?select=activite,ville&ip_hash=eq.${ipHash}&created_at=gte.${depuis}&order=created_at.desc&limit=1`,
      { headers: sb.headers, cache: 'no-store' },
    );
    if (!res.ok) return runsMemoire.get(ipHash) || null;
    const rows = await res.json();
    return rows[0] || runsMemoire.get(ipHash) || null;
  } catch {
    return runsMemoire.get(ipHash) || null;
  }
}

export async function noterSimulation(ligne) {
  runsMemoire.set(ligne.ip_hash, { activite: ligne.activite, ville: ligne.ville });
  const sb = supabase();
  if (!sb) return;
  await fetch(`${sb.url}/rest/v1/pulse_simulateur_runs`, {
    method: 'POST',
    headers: { ...sb.headers, Prefer: 'return=minimal' },
    body: JSON.stringify(ligne),
    cache: 'no-store',
  }).catch(() => {});
}

/* Lance la recherche Google Maps et renvoie une liste dédoublonnée de lieux. */
export async function chercher(actKey, ville) {
  const enCache = lireCache(actKey, ville);
  if (enCache) return enCache;

  const a = activite(actKey);
  if (!a) throw new Error('activite');
  if (a.type === 'b2b') {
    const lieux = await chercherSignaux(a, ville);
    cache.set(cleCache(actKey, ville), { at: Date.now(), lieux });
    return lieux;
  }
  if (process.env.SIMULATEUR_FIXTURE) { // tests locaux uniquement
    const { readFile } = await import('node:fs/promises');
    return trier(actKey, ville, JSON.parse(await readFile(process.env.SIMULATEUR_FIXTURE, 'utf8')));
  }
  const token = process.env.APIFY_TOKEN;
  if (!token) throw new Error('config');

  const res = await fetch(
    `https://api.apify.com/v2/acts/${ACTOR}/run-sync-get-dataset-items?timeout=60&clean=true`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        searchStringsArray: a.recherches,
        locationQuery: `${ville}, France`,
        maxCrawledPlacesPerSearch: PAR_RECHERCHE,
        language: 'fr',
        scrapePlaceDetailPage: false,
      }),
      signal: AbortSignal.timeout(75_000),
      cache: 'no-store',
    },
  );
  if (!res.ok) throw new Error(`apify ${res.status}`);
  return trier(actKey, ville, await res.json());
}

function trier(actKey, ville, items) {

  const vus = new Set();
  const lieux = [];
  for (const it of Array.isArray(items) ? items : []) {
    if (!it?.title || it.permanentlyClosed || it.temporarilyClosed) continue;
    const id = it.placeId || `${it.title}|${it.address}`;
    if (vus.has(id)) continue;
    vus.add(id);
    lieux.push({
      nom: it.title,
      categorie: it.categoryName || it.searchString || '',
      ville: it.city || ville,
    });
  }
  /* Alterne les catégories pour que l'aperçu montre des profils variés. */
  const parCat = new Map();
  for (const l of lieux) {
    const k = l.categorie;
    if (!parCat.has(k)) parCat.set(k, []);
    parCat.get(k).push(l);
  }
  const files = [...parCat.values()];
  const melange = [];
  while (files.some((f) => f.length)) for (const f of files) if (f.length) melange.push(f.shift());

  cache.set(cleCache(actKey, ville), { at: Date.now(), lieux: melange });
  return melange;
}

/* Département d'une ville ou d'un code postal (API Géo de l'État). */
async function departementDe(ville) {
  const cp = /^\d{5}$/.test(ville);
  const q = cp ? `codePostal=${ville}` : `nom=${encodeURIComponent(ville)}&boost=population`;
  const res = await fetch(`https://geo.api.gouv.fr/communes?${q}&fields=codeDepartement,nom&limit=1`, {
    signal: AbortSignal.timeout(10_000),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`geo ${res.status}`);
  const [c] = await res.json();
  return c?.codeDepartement || null;
}

const json = (v) => {
  try {
    return typeof v === 'string' ? JSON.parse(v) : v || {};
  } catch {
    return {};
  }
};

/* « Président : RUZZA Jean-Marc Lucien nom d'usage : RUZZA » → « Jean-Marc ». */
function prenomDirigeant(administration) {
  const m = String(administration || '').match(/:\s*(?:[A-ZÀ-ÖØ-Þ'’-]{2,}\s+)+([A-ZÀ-ÖØ-Þ][a-zà-öø-ÿ]+(?:-[A-ZÀ-ÖØ-Þ][a-zà-öø-ÿ]+)?)/);
  return m ? m[1] : null;
}

const dateCourte = (iso) => {
  const [, m, j] = String(iso).split('-');
  return j && m ? `${j}/${m}` : '';
};

/* Signaux d'achat pour l'Agent Clients B2B : sociétés immatriculées ces 30
   derniers jours dans le département, d'après le BODACC (open data, gratuit).
   Les SCI et les holdings sont écartées : ce ne sont pas des clients. */
async function chercherSignaux(a, ville) {
  const dep = await departementDe(ville);
  if (!dep) return [];
  const depuis = new Date(Date.now() - 30 * 86400_000).toISOString().slice(0, 10);
  const where = `familleavis="creation" and numerodepartement="${dep}" and dateparution>="${depuis}"`;
  const url =
    'https://bodacc-datadila.opendatasoft.com/api/explore/v2.1/catalog/datasets/annonces-commerciales/records'
    + `?limit=100&order_by=dateparution%20desc&where=${encodeURIComponent(where)}`;
  const res = await fetch(url, { signal: AbortSignal.timeout(20_000), cache: 'no-store' });
  if (!res.ok) throw new Error(`bodacc ${res.status}`);
  const { results = [] } = await res.json();

  const lieux = [];
  const vus = new Set();
  for (const r of results) {
    const pers = json(r.listepersonnes).personne || {};
    const etab = json(r.listeetablissements).etablissement || {};
    const act = String(etab.activite || '');
    const forme = String(pers.formeJuridique || '');
    const texte = `${act} ${r.commercant || ''}`.toLowerCase();
    if (pers.typePersonne !== 'pm') continue;
    if (/civile|holding/i.test(forme) || /holding|prise de participation|gestion de (ses|son) patrimoine/i.test(act)) continue;
    if (a.filtre && !a.filtre.some((f) => texte.includes(f))) continue;
    if (!r.commercant || vus.has(r.commercant)) continue;
    vus.add(r.commercant);
    const resume = act.split(/[;.]/)[0].trim();
    lieux.push({
      nom: r.commercant,
      categorie: `Nouvelle société · BODACC du ${dateCourte(r.dateparution)}${resume ? ` · ${resume.slice(0, 60)}${resume.length > 60 ? '…' : ''}` : ''}`,
      ville: r.ville || ville,
      signal: 'creation',
      prenomDirigeant: prenomDirigeant(pers.administration),
    });
    if (lieux.length >= 18) break;
  }
  return lieux;
}

/* Enregistre le contact dans Supabase. Renvoie true si l'insertion a réussi. */
export async function enregistrerContact(ligne) {
  const sb = supabase();
  if (!sb) return false;
  const res = await fetch(`${sb.url}/rest/v1/pulse_simulateur_leads`, {
    method: 'POST',
    headers: { ...sb.headers, Prefer: 'return=minimal' },
    body: JSON.stringify(ligne),
    cache: 'no-store',
  });
  return res.ok;
}

const echapper = (v) =>
  String(v ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

/* Envoie l'alerte « nouveau contact » à Alexis. Renvoie true si l'email est parti. */
export async function alerterParEmail(c) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return false;
  const port = Number(SMTP_PORT || 465);
  const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  const lignes = [
    ['Nom', `${c.prenom} ${c.nom}`],
    ['Téléphone', c.telephone],
    ['Secteur', c.metier],
    ['Ville', c.ville],
    ['Entreprise', c.entreprise || '—'],
    ['Email', c.email || '—'],
    ['Partenaires trouvés', String(c.nb_resultats ?? '')],
  ];
  const texte = lignes.map(([k, v]) => `${k} : ${v}`).join('\n');
  const html = `<p>Nouveau test gratuit sur pulse.smatchroom.com/simulateur :</p><table cellpadding="4">${lignes
    .map(([k, v]) => `<tr><td><b>${echapper(k)}</b></td><td>${echapper(v)}</td></tr>`)
    .join('')}</table><p><a href="tel:${echapper(c.telephone.replace(/[^\d+]/g, ''))}">Appeler ${echapper(c.prenom)}</a></p>`;
  await transport.sendMail({
    from: `"SmatchRoom Pulse" <${SMTP_USER}>`,
    to: process.env.LEADS_TO || 'a.fontana@smatchroom.fr',
    subject: `Nouveau lead simulateur : ${c.prenom} ${c.nom} · ${c.metier.split(' (')[0]} · ${c.ville}`,
    text: `Nouveau test gratuit sur pulse.smatchroom.com/simulateur :\n\n${texte}`,
    html,
  });
  return true;
}
