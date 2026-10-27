#!/usr/bin/env tsx
/**
 * Connexion du WhatsApp des nouveaux agents et activation (demande du 27/10/2026), depuis agent-chasseur/ :
 *   npx tsx connexion.mts [--dry-run]
 * Pour chaque client payé dont l'agent est prêt :
 * - dès que l'instance Green API est renseignée dans sa fiche (green_api_*, puis client:sync),
 *   envoie au client le lien pulse.smatchroom.com/connexion/<token> (QR en direct ou code de liaison) ;
 * - dès que l'instance est connectée : fiche « actif »: true, client:sync, client et Alexis prévenus.
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

const { data: lignes, error } = await sb.from('pulse_onboarding')
  .select('id, entreprise, telephone, donnees, agent_slug, connexion_token, connexion_envoye_at')
  .not('paye_at', 'is', null).not('agent_slug', 'is', null).is('active_at', null);
if (error) throw new Error(error.message);

for (const o of lignes ?? []) {
  const { data: c } = await sb.from('chasseur_clients').select('green_api_host,green_api_id_instance,green_api_token').eq('slug', o.agent_slug).single();
  if (c?.green_api_id_instance == null) continue; // instance pas encore achetée / renseignée
  const st = await fetch(`${c.green_api_host}/waInstance${c.green_api_id_instance}/getStateInstance/${c.green_api_token}`).then((r) => r.json()).catch(() => ({}));
  const prenom = o.donnees?.prenom ?? '';

  if (st?.stateInstance === 'authorized') {
    console.log(`[connexion] ${o.entreprise} : connecté, activation`);
    if (DRY) continue;
    const p = `clients/${o.agent_slug}.json`;
    if (existsSync(p)) {
      const f = JSON.parse(readFileSync(p, 'utf8'));
      f.actif = true;
      writeFileSync(p, JSON.stringify(f, null, 2));
      execSync(`npm run -s client:sync -- ${o.agent_slug}`, { stdio: 'pipe' });
    }
    await sb.from('pulse_onboarding').update({ active_at: new Date().toISOString() }).eq('id', o.id);
    if (o.telephone) await wa(o.telephone, `Bonjour ${prenom}, votre agent est connecté et démarre aujourd'hui. Il monte en charge doucement les premiers jours pour protéger le numéro. Je vous préviens dès qu'un professionnel est intéressé.`.replace('Bonjour ,', 'Bonjour,'));
    await alexis(`🚀 Agent activé : ${o.entreprise} (${o.agent_slug}). WhatsApp connecté, envois dès le prochain créneau.`);
    continue;
  }

  if (o.connexion_envoye_at == null) {
    const token = o.connexion_token ?? randomBytes(9).toString('hex');
    console.log(`[connexion] ${o.entreprise} : lien de connexion envoyé`);
    if (DRY === false) await sb.from('pulse_onboarding').update({ connexion_token: token, connexion_envoye_at: new Date().toISOString() }).eq('id', o.id);
    if (o.telephone) await wa(o.telephone, `Bonjour ${prenom}, votre agent est prêt. Dernière étape, une minute : connectez le WhatsApp qui enverra les messages, ici : https://pulse.smatchroom.com/connexion/${token}\nDès que c'est fait, il démarre.`.replace('Bonjour ,', 'Bonjour,'));
    await alexis(`🔗 Lien de connexion WhatsApp envoyé à ${o.entreprise}. Page à ouvrir avec lui si besoin : https://pulse.smatchroom.com/connexion/${token}`);
  }
}
