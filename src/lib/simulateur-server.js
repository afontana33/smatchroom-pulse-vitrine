/**
 * Partie serveur du simulateur : recherche (mémoire, annuaire des entreprises, Apify en dernier recours), et règle « une seule
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

/* ───────── Économie Apify (31/10/2026) ─────────
   Octobre : ~210 recherches Apify payantes pour 4 contacts. Désormais :
   1. mémoire durable Supabase (maps_requetes + maps_cache, 90 jours) ;
   2. annuaire des entreprises de l'État (gratuit) en source principale ;
   3. Apify seulement si l'annuaire et la mémoire trouvent moins de MIN_LIEUX lieux,
      au plus APIFY_PAR_IP_JOUR par visiteur et APIFY_MAX_JOUR pour tout le site ;
   4. au plus RECHERCHES_PAR_IP_JOUR tests par visiteur et par jour, robots refusés. */
export const RECHERCHES_PAR_IP_JOUR = 5;
const APIFY_PAR_IP_JOUR = 1;
const APIFY_MAX_JOUR = Number(process.env.SIMULATEUR_APIFY_MAX_JOUR || 5);
const MIN_LIEUX = 5;
const CACHE_DURABLE_JOURS = 90;

const norm = (s) => String(s ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/\s+/g, ' ').trim();
const majuscule = (s) => s.charAt(0).toUpperCase() + s.slice(1);

/* Robots et scripts : pas de recherche du tout. */
export function estRobot(request) {
  const ua = request.headers.get('user-agent') || '';
  if (!ua || /bot|crawl|spider|slurp|curl|wget|python|httpx|axios|node-fetch|go-http|java\/|headless|phantom|scrapy|okhttp/i.test(ua)) return true;
  const origine = request.headers.get('origin') || request.headers.get('referer') || '';
  return !/smatchroom\.(com|fr)|localhost|127\.0\.0\.1/i.test(origine);
}

async function compter(filtre) {
  const sb = supabase();
  if (!sb) return 0;
  try {
    const res = await fetch(`${sb.url}/rest/v1/pulse_simulateur_recherches?select=id&${filtre}`, {
      headers: { ...sb.headers, Prefer: 'count=exact', Range: '0-0' },
      cache: 'no-store',
    });
    return Number((res.headers.get('content-range') || '/0').split('/')[1]) || 0;
  } catch {
    return 0;
  }
}
const depuis24h = () => `created_at=gte.${new Date(Date.now() - 86400_000).toISOString()}`;

/* Nombre de tests de ce visiteur ces dernières 24 h. */
export const recherchesRecentes = (ipHash) => compter(`ip_hash=eq.${ipHash}&${depuis24h()}`);

/* Le test déjà fait par ce visiteur (90 jours), ou null : un seul test par personne. */
export async function testPrecedent(ipHash) {
  const sb = supabase();
  if (!sb) return null;
  try {
    const depuis = new Date(Date.now() - JOURS_UNE_FOIS * 86400_000).toISOString();
    const r = await fetch(`${sb.url}/rest/v1/pulse_simulateur_recherches?select=activite,ville&ip_hash=eq.${ipHash}&nb=gt.0&created_at=gte.${depuis}&order=created_at.asc&limit=1`,
      { headers: sb.headers, cache: 'no-store' });
    return r.ok ? (await r.json())[0] || null : null;
  } catch {
    return null;
  }
}

export async function noterRecherche(ligne) {
  const sb = supabase();
  if (!sb) return;
  await fetch(`${sb.url}/rest/v1/pulse_simulateur_recherches`, {
    method: 'POST',
    headers: { ...sb.headers, Prefer: 'return=minimal' },
    body: JSON.stringify(ligne),
    cache: 'no-store',
  }).catch(() => {});
}

async function apifyAutorise(ipHash) {
  if (!supabase()) return false; // sans compteur durable, pas de dépense
  const [ip, total] = await Promise.all([
    ipHash ? compter(`ip_hash=eq.${ipHash}&source=eq.apify&${depuis24h()}`) : 0,
    compter(`source=eq.apify&${depuis24h()}`),
  ]);
  return ip < APIFY_PAR_IP_JOUR && total < APIFY_MAX_JOUR;
}

/* Mémoire durable : clé « simulateur|activité|ville ». */
const cleDurable = (act, ville) => norm(`simulateur|${act}|${ville}`);

async function lireDurable(act, ville) {
  const sb = supabase();
  if (!sb) return null;
  try {
    const limite = new Date(Date.now() - CACHE_DURABLE_JOURS * 86400_000).toISOString();
    const r = await fetch(
      `${sb.url}/rest/v1/maps_requetes?select=place_ids&cle=eq.${encodeURIComponent(cleDurable(act, ville))}&run_at=gte.${limite}&limit=1`,
      { headers: sb.headers, cache: 'no-store' },
    );
    const [ligne] = r.ok ? await r.json() : [];
    const ids = ligne?.place_ids || [];
    if (!ids.length) return null;
    const liste = ids.map((id) => `"${String(id).replace(/"/g, '')}"`).join(',');
    const f = await fetch(
      `${sb.url}/rest/v1/maps_cache?select=place_id,titre,categorie,ville&place_id=in.(${encodeURIComponent(liste)})`,
      { headers: sb.headers, cache: 'no-store' },
    );
    if (!f.ok) return null;
    const parId = new Map((await f.json()).map((x) => [x.place_id, x]));
    const lieux = ids.map((id) => parId.get(id)).filter(Boolean).map((x) => ({ nom: x.titre, categorie: x.categorie || '', ville: x.ville || ville }));
    return lieux.length ? lieux : null;
  } catch {
    return null;
  }
}

async function ecrireDurable(act, ville, lieux, source, coutUsd) {
  const sb = supabase();
  if (!sb || !lieux.length) return;
  const fiches = lieux.map((l) => ({
    place_id: l.id, titre: l.nom, categorie: l.categorie || null, ville: l.ville || null,
    adresse: l.adresse || null, telephone: l.telephone || null, website: l.website || null,
    lat: l.lat ?? null, lng: l.lng ?? null, note: l.note ?? null, nb_avis: l.nbAvis ?? null,
    ferme: false, source, requete: `simulateur ${act}`, fetched_at: new Date().toISOString(),
  }));
  try {
    await fetch(`${sb.url}/rest/v1/maps_cache?on_conflict=place_id`, {
      method: 'POST', headers: { ...sb.headers, Prefer: 'resolution=merge-duplicates,return=minimal' },
      body: JSON.stringify(fiches), cache: 'no-store',
    });
    await fetch(`${sb.url}/rest/v1/maps_requetes?on_conflict=cle`, {
      method: 'POST', headers: { ...sb.headers, Prefer: 'resolution=merge-duplicates,return=minimal' },
      body: JSON.stringify([{ cle: cleDurable(act, ville), terme: `simulateur ${act}`, zone: ville, source,
        max_par_recherche: PAR_RECHERCHE, place_ids: lieux.map((l) => l.id), nb_resultats: lieux.length,
        cout_usd: coutUsd, run_at: new Date().toISOString() }]),
      cache: 'no-store',
    });
  } catch (e) {
    console.error('[simulateur] mémoire', e?.message);
  }
}

/* Correspondance recherche Google Maps → code d'activité (NAF) de l'annuaire des
   entreprises de l'État (recherche-entreprises.api.gouv.fr, gratuit). OpenStreetMap
   bloque le VPS (31/10/2026). q : mot obligatoire quand un code couvre plusieurs métiers. */
const NAF = {
  'agence immobilière': { naf: '68.31Z' },
  'syndic de copropriété': { naf: '68.32A' },
  architecte: { naf: '71.11Z' },
  'diagnostiqueur immobilier': { naf: '71.20B', q: 'diagnostic' },
  "centre d'affaires": { naf: '82.11Z' },
  notaire: { naf: '69.10Z', q: 'notaire' },
  'courtier en crédit immobilier': { naf: '66.19B', q: 'courtage' },
  'expert-comptable': { naf: '69.20Z' },
  avocat: { naf: '69.10Z', q: 'avocat' },
  'espace de coworking': { naf: '82.11Z' },
  'chambre de commerce': { naf: '94.11Z' },
};

async function communeDe(ville) {
  const cp = /^\d{5}$/.test(ville);
  const q = cp ? `codePostal=${ville}` : `nom=${encodeURIComponent(ville)}&boost=population`;
  const res = await fetch(`https://geo.api.gouv.fr/communes?${q}&fields=nom,code,codesPostaux,codeDepartement&limit=1`, {
    signal: AbortSignal.timeout(10_000), cache: 'no-store',
  });
  if (!res.ok) return null;
  const [c] = await res.json();
  return c?.codesPostaux?.length ? c : null;
}

/* « JCM (CIMM IMMOBILIER - IMMOLIAISON) » → « Cimm Immobilier ». */
function nomLisible(n) {
  let s = String(n || '').trim();
  const m = s.match(/\(([^)]+)\)/);
  if (m) s = m[1].split(/\s+-\s+|,/)[0].trim();
  if (s === s.toUpperCase()) s = s.toLowerCase().replace(/(^|[\s'’-])([a-zà-ÿ])/g, (_x, p, c) => p + c.toUpperCase());
  return s;
}

async function annuaire(params) {
  try {
    const res = await fetch(`https://recherche-entreprises.api.gouv.fr/search?${params}&etat_administratif=A&per_page=25`, {
      headers: { 'User-Agent': 'SmatchRoomPulse/1.0 (pulse.smatchroom.com)' },
      signal: AbortSignal.timeout(15_000), cache: 'no-store',
    });
    return res.ok ? (await res.json()).results || [] : [];
  } catch {
    return [];
  }
}

/* Recherche gratuite dans l'annuaire des entreprises : la commune, puis le département. */
async function chercherAnnuaire(a, ville) {
  const c = await communeDe(ville);
  if (!c) return [];
  const zones = [`code_postal=${c.codesPostaux.slice(0, 10).join(',')}`, `departement=${c.codeDepartement}`];
  const parRecherche = a.recherches.map(() => []);
  const vus = new Set();
  for (const zone of zones) {
    for (const [i, s] of a.recherches.entries()) {
      const r = NAF[s];
      if (!r || parRecherche[i].length >= PAR_RECHERCHE) continue;
      const res = await annuaire(`activite_principale=${r.naf}&${zone}${r.q ? `&q=${encodeURIComponent(r.q)}` : ''}`);
      /* Les entreprises locales d'abord : siège dans le département. */
      res.sort((x, y) => Number(!String(x.siege?.code_postal || '').startsWith(c.codeDepartement)) - Number(!String(y.siege?.code_postal || '').startsWith(c.codeDepartement)));
      for (const e of res) {
        const nom = nomLisible(e.nom_complet);
        const k = norm(nom);
        if (!k || vus.has(k) || parRecherche[i].length >= PAR_RECHERCHE) continue;
        const et = (e.matching_etablissements || [])[0] || e.siege || {};
        vus.add(k);
        parRecherche[i].push({
          id: `annuaire:${et.siret || e.siren}`, nom, categorie: majuscule(s),
          ville: nomLisible(et.libelle_commune || c.nom), adresse: et.adresse || null,
          lat: et.latitude ? Number(et.latitude) : null, lng: et.longitude ? Number(et.longitude) : null,
        });
      }
    }
    if (parRecherche.flat().length >= MIN_LIEUX * 2) break;
  }
  return melanger(parRecherche.flat());
}

/* Alterne les catégories pour que l'aperçu montre des profils variés. */
function melanger(lieux) {
  const parCat = new Map();
  for (const l of lieux) {
    if (!parCat.has(l.categorie)) parCat.set(l.categorie, []);
    parCat.get(l.categorie).push(l);
  }
  const files = [...parCat.values()];
  const sortie = [];
  while (files.some((f) => f.length)) for (const f of files) if (f.length) sortie.push(f.shift());
  return sortie;
}

const public_ = (lieux) => lieux.map(({ nom, categorie, ville, signal, prenomDirigeant }) =>
  ({ nom, categorie, ville, ...(signal ? { signal } : {}), ...(prenomDirigeant ? { prenomDirigeant } : {}) }));

/* Cherche les partenaires : mémoire, puis annuaire (gratuit), puis Apify en dernier recours.
   ctx = { ipHash, etape } sert au journal et aux plafonds Apify. */
export async function chercher(actKey, ville, ctx = {}) {
  const noter = (source, nb, cout = 0) =>
    ctx.etape === 'recherche' && ctx.ipHash && noterRecherche({ ip_hash: ctx.ipHash, activite: actKey, ville, source, nb, cout_usd: cout });

  const enCache = lireCache(actKey, ville);
  if (enCache) { await noter('memoire', enCache.length); return enCache; }

  const a = activite(actKey);
  if (!a) throw new Error('activite');
  if (a.type === 'b2b') {
    const lieux = await chercherSignaux(a, ville);
    cache.set(cleCache(actKey, ville), { at: Date.now(), lieux });
    await noter('bodacc', lieux.length);
    return lieux;
  }
  if (process.env.SIMULATEUR_FIXTURE) { // tests locaux uniquement
    const { readFile } = await import('node:fs/promises');
    return trier(actKey, ville, JSON.parse(await readFile(process.env.SIMULATEUR_FIXTURE, 'utf8')));
  }

  const durable = await lireDurable(actKey, ville);
  if (durable && durable.length >= MIN_LIEUX) {
    cache.set(cleCache(actKey, ville), { at: Date.now(), lieux: durable });
    await noter('cache', durable.length);
    return durable;
  }

  const osm = await chercherAnnuaire(a, ville).catch((e) => { console.error('[simulateur] annuaire', e?.message); return []; });
  if (osm.length >= MIN_LIEUX || !(await apifyAutorise(ctx.ipHash)) || !process.env.APIFY_TOKEN) {
    const lieux = osm.length >= (durable?.length || 0) ? osm : durable;
    const sortie = public_(lieux);
    if (osm.length) await ecrireDurable(actKey, ville, osm, 'annuaire', 0);
    cache.set(cleCache(actKey, ville), { at: Date.now(), lieux: sortie });
    await noter('annuaire', sortie.length);
    return sortie;
  }

  const token = process.env.APIFY_TOKEN;
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
  if (!res.ok) {
    console.error('[simulateur] apify', res.status);
    if (osm.length) return public_(osm);
    throw new Error(`apify ${res.status}`);
  }
  const complets = trierComplet(ville, await res.json());
  await noterRecherche({ ip_hash: ctx.ipHash || 'inconnue', activite: actKey, ville, source: 'apify', nb: complets.length, cout_usd: 0.19 });
  await ecrireDurable(actKey, ville, complets.filter((l) => l.id && !l.id.includes('|')), ACTOR, 0.19);
  const sortie = public_(complets.length ? complets : osm);
  cache.set(cleCache(actKey, ville), { at: Date.now(), lieux: sortie });
  return sortie;
}

function trierComplet(ville, items) {
  const vus = new Set();
  const lieux = [];
  for (const it of Array.isArray(items) ? items : []) {
    if (!it?.title || it.permanentlyClosed || it.temporarilyClosed) continue;
    const id = it.placeId || `${it.title}|${it.address}`;
    if (vus.has(id)) continue;
    vus.add(id);
    lieux.push({
      id,
      nom: it.title,
      categorie: it.categoryName || it.searchString || '',
      ville: it.city || ville,
      adresse: it.address || null, telephone: it.phone || null, website: it.website || null,
      lat: it.location?.lat, lng: it.location?.lng, note: it.totalScore ?? null, nbAvis: it.reviewsCount ?? null,
    });
  }
  return melanger(lieux);
}

function trier(actKey, ville, items) {
  const melange = public_(trierComplet(ville, items));
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
    ['Nom', `${c.prenom} ${c.nom || ''}`.trim()],
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
    subject: `Nouveau lead simulateur : ${`${c.prenom} ${c.nom || ''}`.trim()} · ${c.metier.split(' (')[0]} · ${c.ville}`,
    text: `Nouveau test gratuit sur pulse.smatchroom.com/simulateur :\n\n${texte}`,
    html,
  });
  return true;
}
