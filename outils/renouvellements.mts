#!/usr/bin/env tsx
/**
 * Renouvellement mensuel avec l'accord du client (demande du 27/10/2026), depuis agent-chasseur/ :
 *   npx tsx renouvellements.mts [--dry-run]
 * Pour chaque client venu du formulaire d'accueil, payé et dont l'agent existe :
 * - première échéance : 1 mois après le paiement (agent) ou 3 mois (Pack Lancement), puis chaque mois ;
 * - 3 jours avant : WhatsApp au client avec le bilan des 30 derniers jours et le lien
 *   pulse.smatchroom.com/continuer/<token> (oui = facture du mois, non = arrêt) ;
 * - sans « oui » 2 jours après l'échéance (ou « non » / « pause » à l'échéance) : agent coupé, client et Alexis prévenus ;
 *   « rappel » (le client veut en parler) : même délai de 2 jours, Alexis l'appelle entre-temps ;
 * - pause : un mois après la coupure, message au client pour relancer son agent et alerte à Alexis.
 */
import dotenv from 'dotenv';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { randomBytes } from 'node:crypto';
import { createClient } from '@supabase/supabase-js';

for (const f of ['.env', '../agent-chasseur-smatchroom/.env', '/root/smatchroom-ecosystem/smatchroom-pulse/.env', '/root/smatchroom-ecosystem/smatchroom-pulse/.env.local']) {
  if (existsSync(f)) dotenv.config({ path: f, quiet: true } as any);
}
const DRY = process.argv.includes('--dry-run');
const ALEXIS = '33771487698';
const sb = createClient(process.env.SUPABASE_URL as string, (process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY) as string);

async function wa(num: string, message: string) {
  if (DRY) { console.log(`--- WhatsApp ${num}\n${message}\n`); return; }
  const { data: c } = await sb.from('sr_clients').select('green_api_host,green_api_id_instance,green_api_token').eq('id', 1).single();
  if (c == null) return;
  await fetch(`${c.green_api_host}/waInstance${c.green_api_id_instance}/sendMessage/${c.green_api_token}`, {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ chatId: `${String(num).replace(/\D/g, '')}@c.us`, message }),
  }).catch(() => null);
}
async function alexis(texte: string) {
  await wa(ALEXIS, texte);
  const { TELEGRAM_BOT_TOKEN: tg, TELEGRAM_CHAT_ID: chat } = process.env;
  if (DRY === false && tg && chat) {
    await fetch(`https://api.telegram.org/bot${tg}/sendMessage`, {
      method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ chat_id: chat, text: texte }),
    }).catch(() => null);
  }
}

const iso = (d: Date) => d.toISOString().slice(0, 10);
const plusMois = (d: Date, n: number) => { const x = new Date(d); x.setUTCMonth(x.getUTCMonth() + n); return x; };
const jours = (a: Date, b: Date) => Math.floor((a.getTime() - b.getTime()) / 86400_000);
const aujourdhui = new Date(`${iso(new Date())}T00:00:00Z`);

async function bilan(slug: string) {
  const { data: c } = await sb.from('chasseur_clients').select('id').eq('slug', slug).single();
  if (c == null) return '';
  const depuis = new Date(Date.now() - 30 * 86400_000).toISOString();
  const [{ count: env }, { count: rep }, { count: tr }] = await Promise.all([
    sb.from('chasseur_leads').select('id', { count: 'exact', head: true }).eq('client_id', c.id).gte('date_contact', depuis),
    sb.from('chasseur_leads').select('id', { count: 'exact', head: true }).eq('client_id', c.id).gte('date_reponse', depuis),
    sb.from('chasseur_leads').select('id', { count: 'exact', head: true }).eq('client_id', c.id).gte('handoff_at', depuis),
  ]);
  return `Ces 30 derniers jours, votre agent a contacté ${env ?? 0} professionnels de votre zone, ${rep ?? 0} ont répondu et ${tr ?? 0} conversations vous ont été transmises.`;
}

function couperFiche(slug: string) {
  if (DRY) return;
  const p = `clients/${slug}.json`;
  if (existsSync(p)) {
    const f = JSON.parse(readFileSync(p, 'utf8'));
    f.actif = false;
    writeFileSync(p, JSON.stringify(f, null, 2));
    execSync(`npm run -s client:sync -- ${slug}`, { stdio: 'pipe' });
  }
}

const { data: clients, error } = await sb.from('pulse_onboarding')
  .select('id, offre, entreprise, telephone, donnees, paye_at, agent_slug').not('paye_at', 'is', null).not('agent_slug', 'is', null);
if (error) throw new Error(error.message);

for (const o of clients ?? []) {
  const { data: rens } = await sb.from('pulse_renouvellements').select('id, echeance, statut, motif, retention, relance_pause_at').eq('onboarding_id', o.id);
  const par = new Map((rens ?? []).map((r: any) => [r.echeance, r]));
  let e = plusMois(new Date(`${String(o.paye_at).slice(0, 10)}T00:00:00Z`), o.offre === 'pack' ? 3 : 1);
  while (par.get(iso(e))?.statut === 'accepte') e = plusMois(e, 1);
  const r: any = par.get(iso(e));
  const prenom = o.donnees?.prenom ?? '';
  if (r?.statut === 'coupe') {
    // Pause d'un mois demandée par le client : on revient vers lui un mois après la coupure.
    if (r.retention === 'pause' && r.relance_pause_at == null && jours(aujourdhui, e) >= 30) {
      console.log(`[renouvellements] ${o.entreprise} : fin de la pause, relance`);
      if (DRY === false) await sb.from('pulse_renouvellements').update({ relance_pause_at: new Date().toISOString() }).eq('id', r.id);
      if (o.telephone) await wa(o.telephone, `Bonjour ${prenom}, ça fait un mois que votre agent est en pause. On le relance ? Il reprend là où il s'était arrêté, avec vos réglages. Répondez-moi simplement ici.`.replace('Bonjour ,', 'Bonjour,'));
      await alexis(`⏯️ Fin de pause pour ${o.entreprise} : message de relance envoyé${o.telephone ? ` (${o.telephone})` : ''}. S'il dit oui, réactive son agent et fais la facture.`);
    }
    continue;
  }

  if (r == null && jours(e, aujourdhui) <= 3) {
    const token = randomBytes(9).toString('hex');
    const date = e.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', timeZone: 'UTC' });
    const msg = `Bonjour ${prenom}, ${await bilan(o.agent_slug)}\n\nVotre mois se termine le ${date}. On continue un mois de plus (149 € HT, sans engagement) ? Un clic suffit : https://pulse.smatchroom.com/continuer/${token}\nSans réponse, l'agent s'arrêtera à cette date.`.replace('Bonjour ,', 'Bonjour,');
    console.log(`[renouvellements] ${o.entreprise} : lien pour l'échéance ${iso(e)}`);
    if (DRY === false) await sb.from('pulse_renouvellements').insert({ onboarding_id: o.id, token, echeance: iso(e) });
    if (o.telephone) await wa(o.telephone, msg);
    continue;
  }

  const delai = ['refuse', 'pause'].includes(r?.statut) ? 0 : 2;
  if (r && ['envoye', 'refuse', 'rappel', 'pause'].includes(r.statut) && jours(aujourdhui, e) >= delai) {
    console.log(`[renouvellements] ${o.entreprise} : agent coupé (${r.statut})`);
    if (DRY === false) await sb.from('pulse_renouvellements').update({ statut: 'coupe' }).eq('id', r.id);
    couperFiche(o.agent_slug);
    const msg = r.statut === 'pause'
      ? `Bonjour ${prenom}, comme convenu, votre agent est en pause pour un mois à partir d'aujourd'hui. Je reviens vers vous ensuite pour le relancer.`
      : `Bonjour ${prenom}, comme convenu, votre agent est en pause depuis aujourd'hui. Merci pour votre confiance : si vous voulez le relancer, il suffit de me répondre ici.`;
    if (o.telephone) await wa(o.telephone, msg.replace('Bonjour ,', 'Bonjour,'));
    const raison = { refuse: 'a dit non', pause: 'pause d\'un mois', rappel: 'voulait en parler, pas de réponse après', envoye: 'pas de réponse au renouvellement' }[r.statut as string];
    await alexis(`⏸️ Agent coupé : ${o.entreprise} (${raison}${r.motif ? `, motif : ${r.motif}` : ''}).`);
  }
}
