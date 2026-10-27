#!/usr/bin/env tsx
/**
 * Crée l'agent d'un nouveau client à partir de son formulaire d'accueil
 * (pulse.smatchroom.com/bienvenue, table pulse_onboarding). Demande du 27/10/2026.
 *
 * À copier dans agent-chasseur/ et lancer depuis ce dossier :
 *   npx tsx creer-agent.mts --auto            (toutes les fiches remplies sans agent)
 *   npx tsx creer-agent.mts --id 12 [--sans-scrape] [--dry-run]
 *
 * Étapes : zone (villes, codes postaux, départements) depuis geo.api.gouv.fr,
 * messages (M2 par famille, offre, dossier) rédigés par Claude, fiche
 * clients/<slug>.json + .md (inactive, sans WhatsApp), client:sync, scrape des
 * prescripteurs, préparation des M1, alerte WhatsApp à Alexis.
 * Reste manuel : brancher le WhatsApp (QR) puis activer la fiche.
 */
import dotenv from 'dotenv';
import { existsSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
// Réglages : ceux de l'agent, puis Telegram (agent SmatchRoom) et SMTP (site), sans écraser.
for (const f of ['.env', '../agent-chasseur-smatchroom/.env', '/root/smatchroom-ecosystem/smatchroom-pulse/.env', '/root/smatchroom-ecosystem/smatchroom-pulse/.env.local']) {
  if (existsSync(f)) dotenv.config({ path: f, quiet: true } as any);
}
import { execSync } from 'node:child_process';
import { createClient } from '@supabase/supabase-js';

const argv = process.argv.slice(2);
const arg = (n: string) => { const i = argv.indexOf(`--${n}`); return i > -1 ? argv[i + 1] : undefined; };
const DRY = argv.includes('--dry-run');
const SANS_SCRAPE = argv.includes('--sans-scrape');
const ALEXIS = '33771487698';

const sb = createClient(process.env.SUPABASE_URL as string, (process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY) as string);

const CIBLES: Record<string, string[]> = {
  'Agences immobilières': ['agence immobilière', 'gestion locative'],
  'Syndics de copropriété': ['syndic de copropriété'],
  'Gestionnaires de biens': ['administrateur de biens', 'bailleur social'],
  'Architectes et maîtres d’œuvre': ['architecte', "maître d'œuvre", 'bureau d\'études'],
  'Assureurs et experts': ['expert en sinistres', "cabinet d'expertise bâtiment"],
  'Promoteurs et constructeurs': ['promoteur immobilier', 'constructeur de maisons individuelles', 'entreprise générale du bâtiment'],
};

const slugify = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
  .replace(/\b(sarl|sas|sasu|eurl|ei|sa)\b/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40) || 'client';

const dist = (a: number[], b: number[]) => {
  const R = 6371, r = Math.PI / 180;
  const dLat = (b[1] - a[1]) * r, dLon = (b[0] - a[0]) * r;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a[1] * r) * Math.cos(b[1] * r) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
};

async function zone(ville: string, rayonKm: number) {
  const base = await fetch(`https://geo.api.gouv.fr/communes?nom=${encodeURIComponent(ville)}&fields=centre,codeDepartement,population&boost=population&limit=1`).then((r) => r.json());
  const c0 = base?.[0];
  if (c0?.centre == null) throw new Error(`ville introuvable : ${ville}`);
  const toutes: any[] = await fetch('https://geo.api.gouv.fr/communes?fields=nom,centre,population,codesPostaux,codeDepartement&format=json').then((r) => r.json());
  const proches = toutes.filter((c) => c.centre && dist(c0.centre.coordinates, c.centre.coordinates) <= rayonKm);
  // Les villes les plus proches d'abord (au moins 1 500 habitants), pour ne pas laisser une grande ville voisine tout prendre.
  const d0 = (c: any) => dist(c0.centre.coordinates, c.centre.coordinates);
  const villes = proches.filter((c) => (c.population ?? 0) >= 1500).sort((a, b) => d0(a) - d0(b)).slice(0, 30).map((c) => c.nom);
  if (villes.includes(c0.nom) === false) villes.unshift(c0.nom);
  const cps = [...new Set(proches.flatMap((c) => c.codesPostaux ?? []))].sort();
  const depts = [...new Set(proches.map((c) => c.codeDepartement))].sort();
  return { villes, codes_postaux: cps, zone_depts: depts, ville: c0.nom };
}

async function rediger(d: any, villeBase: string) {
  const prompt = `Tu prépares l'agent de prospection WhatsApp d'un artisan français, qui écrit à des prescripteurs (agences, syndics, gestionnaires, architectes, assureurs) pour qu'ils lui confient des chantiers.
Artisan : ${d.raison_sociale}, ${d.metier}, basé à ${villeBase} (rayon ${d.zone_rayon} km). Prénom qui signe : ${d.prenom_agent}.
Prestations : ${d.services}
Chantiers voulus : ${d.chantiers_voulus || '-'} / refusés : ${d.chantiers_refuses || '-'}
Atouts : ${d.atouts || '-'}

Réponds UNIQUEMENT par un JSON :
{"m2": {"immobilier": "...", "commerce": "...", "prescripteur": "...", "assurance": "..."}, "offre": "...", "dossier": "..."}
- m2 : message envoyé après qu'il a confirmé être le bon interlocuteur. Commence par "Merci !", 2 phrases maximum puis UNE question simple (ex. "Vous avez déjà quelqu'un de confiance pour ça ?"). "immobilier" pour agences/syndics/gestionnaires, "commerce" pour locaux pro et entreprises, "prescripteur" pour architectes et maîtres d'œuvre, "assurance" pour assureurs et experts. Première personne, vouvoiement, cite la zone, aucun prix, aucun délai, aucun chiffre, aucune référence client, aucune certification non fournie ci-dessus, pas d'emoji, pas de point d'exclamation sauf "Merci !".
- offre : 2 à 3 phrases factuelles sur l'entreprise, sa zone et ses prestations, terminées par "L'agent ne donne jamais de prix ni de délai : c'est vu lors du rappel."
- dossier : fiche markdown courte (## Qui, ## Services, ## Zone, ## Règles d'écriture) au format des autres agents : première personne au nom de l'artisan, aucun prix, aucun chiffre inventé, messages courts, vouvoiement.`;
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-api-key': process.env.ANTHROPIC_API_KEY ?? '', 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({ model: process.env.ANTHROPIC_MODEL_AGENT ?? 'claude-sonnet-4-5', max_tokens: 2000, messages: [{ role: 'user', content: prompt }] }),
  });
  const j: any = await r.json();
  const m = String(j?.content?.[0]?.text ?? '').match(/\{[\s\S]*\}/);
  if (m == null) throw new Error(`rédaction impossible (${r.status})`);
  const out = JSON.parse(m[0]);
  for (const k of ['immobilier', 'commerce', 'prescripteur', 'assurance']) if (typeof out?.m2?.[k] !== 'string') throw new Error(`M2 ${k} manquant`);
  return out;
}

async function alerte(texte: string, sujet = 'SmatchRoom Pulse : création d\'agent') {
  const { data: c } = await sb.from('sr_clients').select('green_api_host,green_api_id_instance,green_api_token').eq('id', 1).single();
  if (c) {
    await fetch(`${c.green_api_host}/waInstance${c.green_api_id_instance}/sendMessage/${c.green_api_token}`, {
      method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ chatId: `${ALEXIS}@c.us`, message: texte }),
    }).catch(() => null);
  }
  const { TELEGRAM_BOT_TOKEN: tg, TELEGRAM_CHAT_ID: chat } = process.env;
  if (tg && chat) {
    await fetch(`https://api.telegram.org/bot${tg}/sendMessage`, {
      method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ chat_id: chat, text: texte }),
    }).catch(() => null);
  }
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
    try {
      let nm: any;
      try { nm = createRequire(import.meta.url)('nodemailer'); } catch { nm = createRequire('/root/smatchroom-ecosystem/smatchroom-pulse/package.json')('nodemailer'); }
      const port = Number(SMTP_PORT || 465);
      await nm.createTransport({ host: SMTP_HOST, port, secure: port === 465, auth: { user: SMTP_USER, pass: SMTP_PASS } })
        .sendMail({ from: `"SmatchRoom Pulse" <${SMTP_USER}>`, to: process.env.LEADS_TO || 'a.fontana@smatchroom.fr', subject: sujet, text: texte });
    } catch (e: any) { console.error('[creer-agent] email', e?.message); }
  }
}

const sh = (cmd: string) => execSync(cmd, { stdio: 'pipe', encoding: 'utf8', timeout: 20 * 60_000 });

async function creer(ligne: any) {
  const d = ligne.donnees ?? {};
  let slug = slugify(d.raison_sociale || ligne.entreprise || 'client');
  for (let i = 2; existsSync(`clients/${slug}.json`); i++) slug = `${slugify(d.raison_sociale)}-${i}`;
  console.log(`[creer-agent] onboarding ${ligne.id} -> ${slug}`);

  const z = await zone(d.zone_ville, Number(d.zone_rayon) || 30);
  const red = await rediger(d, z.ville);
  const personas = [...new Set((d.cibles?.length ? d.cibles : Object.keys(CIBLES)).flatMap((c: string) => CIBLES[c] ?? []))];
  const prenom = d.prenom_agent || d.prenom;
  const signature = `${prenom} · ${d.raison_sociale}`;
  const notif = String(d.numero_alertes || d.telephone || '').replace(/\D/g, '').replace(/^0/, '33');

  const fiche = {
    nom: d.raison_sociale, actif: false, profil: 'btp', pays: 'FR', email_from_name: d.raison_sociale,
    strict_cp: true, relances: true, zone_depts: z.zone_depts, codes_postaux: z.codes_postaux, villes: z.villes, personas,
    daily_min: 15, daily_max: 20, hour_start: 9, hour_end: 19,
    flux: 'deux_temps',
    flux_config: {
      m1_nom: `Bonjour, je suis ${prenom}. Je parle bien à {prenom} {nom} ?`,
      m1_sans_nom: { defaut: `Bonjour, je suis ${prenom}. C'est bien vous qui vous occupez de {etablissement} ?` },
      redirect: 'Très bien, merci.',
      m2: red.m2,
      signature,
    },
    conversation: {
      humain: prenom, max_tours: 3, signature_premier_message_seulement: true, offre: red.offre,
      demande_creneau: '',
      confirmation_creneau: 'Très bien, je vous rappelle pour en parler.',
      confirmation_email: 'Merci, je vous envoie ça.',
      passage_main: 'Merci pour votre retour, je reviens vers vous rapidement.',
      cloture_refus: 'Très bien, merci pour votre retour. Gardez mes coordonnées si besoin, bonne journée.',
      notification_whatsapp: notif,
      relance_identite: "Bonjour, je reviens vers vous au cas où mon précédent message vous aurait échappé.\n\nC'est bien vous qui vous occupez de {etablissement} ?",
      relance_suite: "Je reviens vers vous. Pas de souci si ce n'est pas le moment.",
      relance_finale: 'Dernier message de ma part. Si vous avez un jour besoin de moi, gardez mon numéro. Bonne journée.',
    },
    onboarding_id: ligne.id,
  };

  if (DRY) { console.log(JSON.stringify(fiche, null, 2)); console.log(red.dossier); return; }
  writeFileSync(`clients/${slug}.json`, JSON.stringify(fiche, null, 2));
  writeFileSync(`clients/${slug}.md`, red.dossier);
  await sb.from('pulse_onboarding').update({ agent_slug: slug }).eq('id', ligne.id);
  console.log(sh(`npm run -s client:sync -- ${slug}`).slice(-300));

  let bilan = '';
  if (SANS_SCRAPE === false) {
    sh(`npx tsx src/scrape.ts --client ${slug}`);
    const g = sh(`npx tsx src/gen-deux-temps.ts --client ${slug} --limit 400`);
    bilan = (g.match(/\[deux-temps\][^\n]*M1 prêts[^\n]*/) ?? [''])[0];
  }
  await sb.from('pulse_onboarding').update({ agent_cree_at: new Date().toISOString(), agent_erreur: null }).eq('id', ligne.id);
  await alerte(`🤖 Agent « ${d.raison_sociale} » préparé (fiche ${slug}, inactif).\n${z.villes.length} villes autour de ${z.ville}, ${personas.length} types de prescripteurs.\n${bilan}\nWhatsApp souhaité : ${String(d.numero_whatsapp || '').slice(0, 60)}.\nÀ faire : acheter l'instance Green API, mettre ses accès dans clients/${slug}.json puis client:sync. Le lien de connexion part tout seul au client une fois payé, et l'agent s'active dès qu'il est connecté.`, `Agent préparé : ${d.raison_sociale}`);
  console.log(`[creer-agent] ${slug} prêt. ${bilan}`);
}

const q = sb.from('pulse_onboarding').select('id, entreprise, donnees, statut, agent_slug');
const { data: lignes, error } = arg('id') ? await q.eq('id', Number(arg('id'))) : await q.in('statut', ['facture', 'erreur']).is('agent_slug', null).is('agent_erreur', null).not('donnees', 'is', null);
if (error) throw new Error(error.message);
for (const l of lignes ?? []) {
  try { await creer(l); } catch (e: any) {
    console.error(`[creer-agent] ${l.id} : ${e.message}`);
    await sb.from('pulse_onboarding').update({ agent_erreur: String(e.message).slice(0, 500) }).eq('id', l.id);
    await alerte(`⚠️ Création automatique de l'agent « ${l.entreprise} » impossible : ${String(e.message).slice(0, 200)}`, `Création d'agent impossible : ${l.entreprise}`);
  }
}
