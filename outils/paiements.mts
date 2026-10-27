#!/usr/bin/env tsx
/**
 * Suivi des paiements des factures d'accueil (demande du 27/10/2026), depuis agent-chasseur/ :
 *   npx tsx paiements.mts [--dry-run]
 * - Cherche dans Qonto (compte principal) un virement reçu du bon montant après le formulaire :
 *   paiement noté (paye_at), facture marquée payée si possible, merci au client, alerte Alexis.
 * - Sans paiement : relance WhatsApp au client à J+5 et J+8, alerte Alexis à J+12.
 */
import dotenv from 'dotenv';
import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { createClient } from '@supabase/supabase-js';

for (const f of ['.env', '../agent-chasseur-smatchroom/.env', '/root/smatchroom-ecosystem/smatchroom-pulse/.env', '/root/smatchroom-ecosystem/smatchroom-pulse/.env.local']) {
  if (existsSync(f)) dotenv.config({ path: f, quiet: true } as any);
}
const DRY = process.argv.includes('--dry-run');
const ALEXIS = '33771487698';
const COMPTE = '019d3fab-14f8-734b-a77f-2df0837cc257';
const IBAN = 'FR76 1695 8000 0138 2950 9148 375';
const MONTANT: Record<string, number> = { pack: 588, agent: 178.8 };
const sb = createClient(process.env.SUPABASE_URL as string, (process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY) as string);
const Q = { Authorization: `${process.env.QONTO_LOGIN}:${process.env.QONTO_SECRET_KEY}`, 'content-type': 'application/json' };
const euros = (n: number) => `${n.toFixed(2).replace('.', ',')} €`;

async function creds() {
  const { data } = await sb.from('sr_clients').select('green_api_host,green_api_id_instance,green_api_token').eq('id', 1).single();
  return data;
}
async function wa(num: string, message: string) {
  if (DRY) { console.log(`--- WhatsApp ${num}\n${message}\n`); return; }
  const c: any = await creds();
  if (c == null) return;
  await fetch(`${c.green_api_host}/waInstance${c.green_api_id_instance}/sendMessage/${c.green_api_token}`, {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ chatId: `${String(num).replace(/\D/g, '')}@c.us`, message }),
  }).catch(() => null);
}
async function alexis(texte: string, sujet: string) {
  await wa(ALEXIS, texte);
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
        .sendMail({ from: `"SmatchRoom Pulse" <${SMTP_USER}>`, to: 'a.fontana@smatchroom.fr', subject: sujet, text: texte });
    } catch (e: any) { console.error('[paiements] email', e?.message); }
  }
}

const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

// Factures d'accueil et factures de renouvellement, traitées de la même façon.
const { data: onb, error } = await sb.from('pulse_onboarding')
  .select('id, offre, entreprise, telephone, donnees, rempli_at, relance_paiement, qonto_invoice_id')
  .in('statut', ['facture', 'erreur']).is('paye_at', null).not('rempli_at', 'is', null);
if (error) throw new Error(error.message);
const { data: ren } = await sb.from('pulse_renouvellements')
  .select('id, repondu_at, relance_paiement, qonto_invoice_id, pulse_onboarding(entreprise, telephone, donnees)')
  .eq('statut', 'accepte').is('paye_at', null).not('qonto_invoice_id', 'is', null);
const lignes: any[] = [
  ...(onb ?? []).map((l: any) => ({ ...l, table: 'pulse_onboarding', depuis: l.rempli_at, quoi: 'votre agent' })),
  ...(ren ?? []).map((r: any) => ({ id: r.id, table: 'pulse_renouvellements', offre: 'agent', entreprise: r.pulse_onboarding?.entreprise, telephone: r.pulse_onboarding?.telephone,
    donnees: r.pulse_onboarding?.donnees, depuis: r.repondu_at, relance_paiement: r.relance_paiement, qonto_invoice_id: r.qonto_invoice_id, quoi: 'le mois suivant de votre agent' })),
];
if (lignes.length === 0) { console.log('[paiements] rien en attente'); process.exit(0); }

const depuis = new Date(Math.min(...lignes.map((l: any) => Date.parse(l.depuis))) - 86400_000).toISOString();
const rt = await fetch(`https://thirdparty.qonto.com/v2/transactions?bank_account_id=${COMPTE}&side=credit&settled_at_from=${depuis}&per_page=100`, { headers: Q });
if (rt.ok === false) throw new Error(`Qonto transactions ${rt.status} ${(await rt.text()).slice(0, 200)}`);
const txs: any[] = (await rt.json()).transactions ?? [];
const pris = new Set<string>();
for (const t of ['pulse_onboarding', 'pulse_renouvellements']) {
  const { data } = await sb.from(t).select('paye_transaction_id').not('paye_transaction_id', 'is', null);
  for (const x of data ?? []) pris.add((x as any).paye_transaction_id);
}

for (const l of lignes) {
  const d = l.donnees ?? {};
  const attendu = MONTANT[l.offre] ?? 0;
  const mots = norm(String(d.raison_sociale || l.entreprise || '')).split(/[^a-z0-9]+/).filter((m: string) => m.length > 3 && ['test', 'sarl', 'sasu', 'eurl'].includes(m) === false);
  const candidats = txs.filter((t) => pris.has(t.transaction_id ?? t.id) === false
    && Math.abs(Number(t.amount) - attendu) < 0.01
    && Date.parse(t.settled_at ?? t.emitted_at) >= Date.parse(l.depuis) - 86400_000);
  const parNom = candidats.filter((t) => mots.some((m: string) => norm(`${t.label ?? ''} ${t.reference ?? ''} ${t.note ?? ''}`).includes(m)));
  const tx = parNom[0] ?? (candidats.length === 1 ? candidats[0] : null);

  if (tx) {
    const tid = tx.transaction_id ?? tx.id;
    pris.add(tid);
    console.log(`[paiements] ${l.entreprise} : payé (${tx.label}, ${tx.amount} €)`);
    if (DRY) continue;
    await sb.from(l.table).update({ paye_at: tx.settled_at ?? new Date().toISOString(), paye_transaction_id: tid }).eq('id', l.id);
    if (l.qonto_invoice_id) {
      await fetch(`https://thirdparty.qonto.com/v2/client_invoices/${l.qonto_invoice_id}/mark_as_paid`, { method: 'POST', headers: Q, body: JSON.stringify({ paid_at: String(tx.settled_at ?? '').slice(0, 10) }) }).catch(() => null);
    }
    if (l.telephone) {
      const merci = l.table === 'pulse_onboarding'
        ? `Bonjour ${d.prenom ?? ''}, j'ai bien reçu votre règlement, merci. Votre agent est en préparation, je reviens vers vous très vite pour le lancer.`
        : `Bonjour ${d.prenom ?? ''}, j'ai bien reçu votre règlement, merci. Votre agent continue ce mois-ci.`;
      await wa(l.telephone, merci.replace('Bonjour ,', 'Bonjour,'));
    }
    await alexis(`💶 Paiement reçu : ${l.entreprise} (${euros(attendu)} TTC, ${tx.label})${l.table === 'pulse_renouvellements' ? ', renouvellement' : ''}.${candidats.length > 1 && parNom.length === 0 ? ' À vérifier : plusieurs virements du même montant.' : ''}`, `Paiement reçu : ${l.entreprise}`);
    continue;
  }

  const jours = Math.floor((Date.now() - Date.parse(l.depuis)) / 86400_000);
  const n = l.relance_paiement ?? 0;
  const rappel = `Bonjour ${d.prenom ?? ''}, petit rappel : votre facture SmatchRoom Pulse de ${euros(attendu)} TTC pour ${l.quoi} est en attente de règlement.\nIBAN : ${IBAN}\nBénéficiaire : SmatchRoom\nMerci d'avance.`.replace('Bonjour ,', 'Bonjour,');
  if (jours >= 5 && n === 0 && l.telephone) {
    await wa(l.telephone, rappel);
    if (DRY === false) await sb.from(l.table).update({ relance_paiement: 1 }).eq('id', l.id);
  } else if (jours >= 8 && n === 1 && l.telephone) {
    await wa(l.telephone, rappel);
    if (DRY === false) await sb.from(l.table).update({ relance_paiement: 2 }).eq('id', l.id);
  } else if (jours >= 12 && n === 2) {
    await alexis(`⏳ Impayé depuis ${jours} jours : ${l.entreprise} (${euros(attendu)} TTC), deux relances envoyées. À appeler.`, `Impayé : ${l.entreprise}`);
    if (DRY === false) await sb.from(l.table).update({ relance_paiement: 3 }).eq('id', l.id);
  }
}
