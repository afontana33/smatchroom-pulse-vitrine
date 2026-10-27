#!/usr/bin/env tsx
/**
 * Récap journalier (demande du 27/10/2026), à lancer depuis agent-chasseur/ en semaine vers 19 h 30 :
 *   npx tsx recap-jour.mts [--dry-run] [--sans-clients]
 * - Alexis : récap global de tous les agents (WhatsApp, Telegram, email), avec alertes
 *   (agent actif sans envoi, stock de messages bas, impayés).
 * - Chaque client : bilan court de son agent sur WhatsApp, envoyé par son propre numéro
 *   au numéro de notification de sa fiche (conversation.notification_whatsapp). Pas d'envoi si rien ne s'est passé.
 */
import dotenv from 'dotenv';
import { existsSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { createClient } from '@supabase/supabase-js';

for (const f of ['.env', '../agent-chasseur-smatchroom/.env', '/root/smatchroom-ecosystem/smatchroom-pulse/.env', '/root/smatchroom-ecosystem/smatchroom-pulse/.env.local']) {
  if (existsSync(f)) dotenv.config({ path: f, quiet: true } as any);
}
const DRY = process.argv.includes('--dry-run');
const SANS_CLIENTS = process.argv.includes('--sans-clients');
const ALEXIS = '33771487698';
const EXCLUS = new Set(['manon']); // comme le récap du vendredi
const sb = createClient(process.env.SUPABASE_URL as string, (process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY) as string);

const wa = async (c: any, num: string, message: string) => {
  if (DRY) { console.log(`--- WhatsApp ${num}\n${message}\n`); return; }
  await fetch(`${c.green_api_host}/waInstance${c.green_api_id_instance}/sendMessage/${c.green_api_token}`, {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ chatId: `${String(num).replace(/\D/g, '')}@c.us`, message }),
  }).catch(() => null);
};

async function alexis(texte: string, sujet: string) {
  const { data: c } = await sb.from('sr_clients').select('green_api_host,green_api_id_instance,green_api_token').eq('id', 1).single();
  if (c) await wa(c, ALEXIS, texte);
  if (DRY) return;
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
    } catch (e: any) { console.error('[recap-jour] email', e?.message); }
  }
}

const fiche = (slug: string) => {
  try { return JSON.parse(readFileSync(`clients/${slug}.json`, 'utf8')); } catch { return null; }
};
const pl = (n: number, s: string, p = `${s}s`) => `${n} ${n > 1 ? p : s}`;

const { data, error } = await sb.rpc('recap_jour_agents');
if (error || data == null) throw new Error(error?.message ?? 'récap vide');
const r: any = data;
const jour = new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'Europe/Paris' });

const lignes: string[] = [];
const alertes: string[] = [];
let totEnv = 0, totRep = 0, totTr = 0;
for (const c of r.clients as any[]) {
  if (EXCLUS.has(c.slug)) continue;
  totEnv += c.sortants; totRep += c.reponses; totTr += c.transmis.length;
  lignes.push(`• ${c.nom} : ${c.sortants} envoyés (${pl(c.premiers, "nouveau", "nouveaux")}) · ${pl(c.reponses, 'réponse')} · ${c.transmis.length} transmis · stock ${c.stock}`);
  if (c.sortants === 0) alertes.push(`${c.nom} : aucun envoi aujourd'hui`);
  if (c.stock < 30) alertes.push(`${c.nom} : plus que ${c.stock} messages prêts`);

  // Bilan du client
  if (SANS_CLIENTS || c.sortants === 0) continue;
  const f = fiche(c.slug);
  const num = f?.conversation?.notification_whatsapp;
  if (f?.green_api_id_instance == null || num == null || String(num).trim() === '') continue;
  const tr = (c.transmis as any[]).slice(0, 5).map((t) => `- ${t.nom}${t.ville ? ` (${t.ville})` : ''}`).join('\n');
  const msg = `Bilan du jour de votre agent : ${pl(c.premiers, 'nouveau professionnel contacté', 'nouveaux professionnels contactés')}, ${pl(c.sortants, 'message envoyé', 'messages envoyés')} au total, ${pl(c.reponses, 'réponse')}.`
    + (c.transmis.length ? `\n\nConversations qui vous ont été transmises :\n${tr}` : '')
    + `\n\nBonne soirée,\nAlexis · SmatchRoom Pulse`;
  await wa(f, num, msg);
}

const s = r.smatchroom, a = r.accueil;
if (s.stock < 30) alertes.push(`Ton agent : plus que ${s.stock} WhatsApp prêts`);
if (a.impayes > 0) alertes.push(`${pl(a.impayes, 'facture d\'accueil', 'factures d\'accueil')} en attente de paiement`);

const texte = `📊 Récap du ${jour}\n\n`
  + `Agents clients : ${totEnv} messages envoyés, ${pl(totRep, 'réponse')}, ${totTr} transmis.\n${lignes.join('\n')}\n\n`
  + `Ton agent SmatchRoom : ${s.premiers} nouveaux contacts, ${s.sortants} messages, ${pl(s.reponses, 'réponse')}, stock ${s.stock}.\n`
  + `Ventes : ${a.liens} liens d'accueil, ${a.remplis} formulaires remplis, ${a.payes} paiements reçus, ${a.agents} agents créés.`
  + (alertes.length ? `\n\n⚠️ À regarder :\n${alertes.map((x) => `- ${x}`).join('\n')}` : '');
await alexis(texte, `Récap du ${jour}`);
console.log(texte);
