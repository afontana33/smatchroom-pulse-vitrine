#!/usr/bin/env tsx
/**
 * Surveillance des instances WhatsApp (demande du 27/10/2026), depuis agent-chasseur/, toutes les 10 min :
 *   npx tsx surveillance-instances.mts [--dry-run]
 * Pour chaque agent actif (chasseur_clients.actif) et pour l'agent SmatchRoom (sr_clients id 1) :
 * - déconnecté (notAuthorized) depuis 10 min : le client reçoit un lien pour reconnecter son WhatsApp lui-même
 *   (pulse.smatchroom.com/connexion/<token>, QR ou code de liaison), Alexis est prévenu ; rappel au client 24 h après ;
 * - bloqué par WhatsApp (blocked) ou carton jaune (yellowCard, messages signalés) : alerte immédiate à Alexis ;
 * - injoignable ou en démarrage depuis plus de 30 min : alerte à Alexis ;
 * - de nouveau connecté : Alexis est prévenu.
 * Une alerte par changement d'état (table pulse_instances_etat), jamais de répétition.
 */
import dotenv from 'dotenv';
import { existsSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { randomBytes } from 'node:crypto';
import { createClient } from '@supabase/supabase-js';

for (const f of ['.env', '../agent-chasseur-smatchroom/.env', '/root/smatchroom-ecosystem/smatchroom-pulse/.env', '/root/smatchroom-ecosystem/smatchroom-pulse/.env.local']) {
  if (existsSync(f)) dotenv.config({ path: f, quiet: true } as any);
}
const DRY = process.argv.includes('--dry-run');
const ALEXIS = '33771487698';
const MIN = 60_000;
const sb = createClient(process.env.SUPABASE_URL as string, (process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY) as string);

async function wa(c: any, num: string, message: string) {
  if (DRY) { console.log(`--- WhatsApp ${num}\n${message}\n`); return true; }
  const r = await fetch(`${c.green_api_host}/waInstance${c.green_api_id_instance}/sendMessage/${c.green_api_token}`, {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ chatId: `${String(num).replace(/\D/g, '')}@c.us`, message }),
  }).catch(() => null);
  return Boolean(r?.ok);
}
async function alexis(moi: any, texte: string) {
  if (DRY) { console.log(`--- Alexis\n${texte}\n`); return; }
  // Son propre numéro peut être celui qui est tombé : WhatsApp seulement s'il est connecté, Telegram et email toujours.
  if (moi?.ok) await wa(moi, ALEXIS, texte);
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
        .sendMail({ from: `"SmatchRoom Pulse" <${SMTP_USER}>`, to: 'a.fontana@smatchroom.fr', subject: texte.split('\n')[0].slice(0, 120), text: texte });
    } catch (e: any) { console.error('[surveillance] email', e?.message); }
  }
}
async function etat(c: any): Promise<string> {
  const r = await fetch(`${c.green_api_host}/waInstance${c.green_api_id_instance}/getStateInstance/${c.green_api_token}`, { signal: AbortSignal.timeout(15000) })
    .then((x) => x.json()).catch(() => null);
  return String(r?.stateInstance ?? 'injoignable');
}
const fiche = (slug: string) => { try { return JSON.parse(readFileSync(`clients/${slug}.json`, 'utf8')); } catch { return null; } };

// Agents à surveiller
const { data: clients, error } = await sb.from('chasseur_clients').select('nom, slug, green_api_host, green_api_id_instance, green_api_token').eq('actif', true).not('green_api_id_instance', 'is', null);
if (error) throw new Error(error.message);
const { data: moi } = await sb.from('sr_clients').select('green_api_host, green_api_id_instance, green_api_token').eq('id', 1).single();
const agents: any[] = [...(clients ?? [])];
if (moi) agents.push({ ...moi, nom: 'Ton agent SmatchRoom', slug: 'smatchroom', moi: true });

const { data: lignes } = await sb.from('pulse_instances_etat').select('*');
const avant = new Map((lignes ?? []).map((l: any) => [l.slug, l]));
const etats = await Promise.all(agents.map((a) => etat(a)));
const etatMoi = etats[agents.length - 1];
const expediteur = moi ? { ...moi, ok: etatMoi === 'authorized' } : null;
const maintenant = Date.now();
const LIBELLES: Record<string, string> = {
  notAuthorized: 'déconnecté (le téléphone n\'est plus relié)',
  blocked: 'BLOQUÉ par WhatsApp',
  yellowCard: 'carton jaune de WhatsApp (messages signalés comme spam)',
  injoignable: 'injoignable (Green API ne répond pas)',
  starting: 'en redémarrage',
  sleepMode: 'en veille (téléphone éteint ou sans réseau)',
};

for (const [i, a] of agents.entries()) {
  const e = etats[i];
  const p: any = avant.get(a.slug);
  const depuis = p && p.etat === e ? Date.parse(p.depuis) : maintenant;
  const ligne: any = { slug: a.slug, etat: e, depuis: new Date(depuis).toISOString(), maj_at: new Date().toISOString(),
    alerte_at: p && p.etat === e ? p.alerte_at : null, relance_client_at: p && p.etat === e ? p.relance_client_at : null,
    connexion_token: p?.connexion_token ?? null };
  const duree = maintenant - depuis;

  if (e === 'authorized') {
    if (p && p.etat !== 'authorized' && p.alerte_at) await alexis(expediteur, `✅ ${a.nom} : WhatsApp de nouveau connecté, l'agent reprend.`);
  } else if (ligne.alerte_at == null) {
    const urgent = ['blocked', 'yellowCard'].includes(e);
    const seuil = e === 'notAuthorized' ? 10 * MIN : urgent ? 0 : 30 * MIN;
    if (duree >= seuil) {
      let texte = `⚠️ ${a.nom} : WhatsApp ${LIBELLES[e] ?? e}.`;
      if (e === 'blocked') texte += '\nL\'agent ne peut plus envoyer. Il faut un nouveau numéro : préviens le client.';
      if (e === 'yellowCard') texte += '\nRalentis les envois de cet agent quelques jours (daily_min/max) pour éviter le blocage.';
      if (e === 'notAuthorized' && a.moi) texte += '\nC\'est ton numéro : reconnecte-le depuis la console Green API (QR code).';
      if (e === 'notAuthorized' && a.moi == null) {
        // Lien de reconnexion pour le client : celui de son formulaire d'accueil s'il existe, sinon un lien dédié.
        const { data: o } = await sb.from('pulse_onboarding').select('connexion_token, telephone, donnees').eq('agent_slug', a.slug).not('connexion_token', 'is', null).limit(1).maybeSingle();
        const token = o?.connexion_token ?? ligne.connexion_token ?? randomBytes(9).toString('hex');
        ligne.connexion_token = o?.connexion_token ? ligne.connexion_token : token;
        const f = fiche(a.slug);
        const num = o?.telephone || f?.conversation?.notification_whatsapp;
        const prenom = o?.donnees?.prenom || f?.prenom || '';
        const lien = `https://pulse.smatchroom.com/connexion/${token}`;
        const envoye = num && expediteur?.ok
          ? await wa(expediteur, num, `Bonjour ${prenom}, le WhatsApp de votre agent s'est déconnecté, il est en pause en attendant. Pour le relancer, une minute suffit : ouvrez ce lien et suivez les étapes (QR code ou code de liaison) : ${lien}`.replace('Bonjour ,', 'Bonjour,'))
          : false;
        texte += envoye ? `\nLien de reconnexion envoyé au client : ${lien}` : `\nLien de reconnexion à lui envoyer : ${lien}`;
        if (envoye) ligne.relance_client_at = new Date().toISOString();
      }
      await alexis(expediteur, texte);
      ligne.alerte_at = new Date().toISOString();
    }
  } else if (e === 'notAuthorized' && a.moi == null && ligne.relance_client_at && maintenant - Date.parse(ligne.relance_client_at) >= 24 * 60 * MIN && duree < 3 * 24 * 60 * MIN) {
    // Toujours déconnecté 24 h après : un rappel au client, puis on laisse Alexis gérer.
    const f = fiche(a.slug);
    const { data: o } = await sb.from('pulse_onboarding').select('telephone, donnees, connexion_token').eq('agent_slug', a.slug).limit(1).maybeSingle();
    const num = o?.telephone || f?.conversation?.notification_whatsapp;
    const token = o?.connexion_token ?? ligne.connexion_token;
    if (num && token && expediteur?.ok) {
      await wa(expediteur, num, `Petit rappel : votre agent est toujours en pause car son WhatsApp est déconnecté. Pour le relancer : https://pulse.smatchroom.com/connexion/${token}`);
      await alexis(expediteur, `⏳ ${a.nom} : toujours déconnecté après 24 h, rappel envoyé au client. Appelle-le si ça ne bouge pas.`);
    }
    // Un seul rappel : la date est repoussée très loin, elle repart à zéro au prochain changement d'état.
    ligne.relance_client_at = new Date(maintenant + 10 * 365 * 24 * 60 * MIN).toISOString();
  }

  console.log(`[surveillance] ${a.slug} : ${e}${e === 'authorized' ? '' : ` depuis ${Math.round(duree / MIN)} min`}`);
  if (DRY === false) await sb.from('pulse_instances_etat').upsert(ligne);
}
