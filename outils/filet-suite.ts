/**
 * filet-suite.ts — aucun prospect qui répond ne reste sans suite (28/10/2026).
 *
 * Toutes les 10 minutes : pour chaque client actif, dans ses plages horaires,
 * on cherche les prospects dont le DERNIER message du fil est une réponse
 * entrante, vieille de plus de 10 minutes (et moins de 3 jours), sans passage
 * de main. Ce message est rejoué dans le traitement normal de l'agent
 * (traiterConversation, puis traiterReponseEntrante), exactement comme le
 * listener l'aurait fait. Cas couverts : redémarrage pendant la pause avant
 * envoi, coupure réseau, erreur Green API.
 *
 * Un message n'est rejoué qu'une fois (logs/filet-suite.json).
 *
 *   npx tsx src/filet-suite.ts --dry   aperçu, rien n'est envoyé
 *   npx tsx src/filet-suite.ts         rejoue
 */
import fs from 'node:fs';
import { getSupabase } from './supabase.js';
import { config } from './config.js';
import { traiterConversation } from './conversation.js';
import { traiterReponseEntrante } from './handoff.js';

const ACTIVES = ['attente_identite', 'attente_reponse_m2', 'en_conversation', 'attente_creneau'];
const CLOS = ['cloture', 'blacklist', 'oppose'];
const DRY = process.argv.includes('--dry');
const MAX_PAR_PASSAGE = 6;
const FICHIER = new URL('../logs/filet-suite.json', import.meta.url);

function lireDeja(): Set<number> {
  try { return new Set(JSON.parse(fs.readFileSync(FICHIER, 'utf8'))); } catch { return new Set(); }
}
function ecrireDeja(s: Set<number>) {
  const liste = [...s].slice(-5000);
  fs.writeFileSync(FICHIER, JSON.stringify(liste));
}

function paris(): { h: number; jour: number } {
  const d = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Paris' }));
  return { h: d.getHours(), jour: d.getDay() };
}

async function main() {
  const sb = getSupabase();
  const { h, jour } = paris();
  if (jour === 0 || jour === 6) return;

  const deja = lireDeja();
  const maintenant = Date.now();
  const min = new Date(maintenant - 3 * 24 * 3600_000).toISOString();
  const max = new Date(maintenant - 10 * 60_000).toISOString();

  const { data: clients } = await sb.from(config.tables.clients).select('*').eq('actif', true);
  let rejoues = 0;

  for (const client of clients ?? []) {
    const debut = Number(client.hour_start ?? 9), fin = Number(client.hour_end ?? 19);
    if (h < debut || h >= fin) continue;

    const { data: leads } = await sb.from(config.tables.leads).select('*')
      .eq('client_id', client.id).in('flux_etape', ACTIVES).is('handoff_at', null)
      .gt('date_reponse', min).lt('date_reponse', max);

    for (const lead of leads ?? []) {
      if (rejoues >= MAX_PAR_PASSAGE) break;
      if (CLOS.includes(String(lead.statut))) continue;

      const { data: fil } = await sb.from(config.tables.conversations)
        .select('id, direction, body, created_at').eq('lead_id', lead.id)
        .order('created_at', { ascending: false }).limit(1);
      const dernier = fil?.[0];
      if (!dernier || dernier.direction !== 'in') continue;
      const t = new Date(dernier.created_at).getTime();
      if (t > maintenant - 10 * 60_000 || t < maintenant - 3 * 24 * 3600_000) continue;
      if (deja.has(Number(dernier.id))) continue;

      const texte = String(dernier.body ?? '').trim();
      if (!texte || /^[^\p{L}\p{N}]*$/u.test(texte)) continue;

      console.log(`[filet] ${new Date().toISOString()} ${client.slug} lead ${lead.id} (${lead.nom_entreprise}) [${lead.flux_etape}] sans suite : « ${texte.slice(0, 80)} »`);
      if (DRY) continue;

      deja.add(Number(dernier.id));
      ecrireDeja(deja);
      rejoues++;

      const creds = { host: client.green_api_host, idInstance: client.green_api_id_instance, apiToken: client.green_api_token };
      try {
        if (await traiterConversation(client.slug, creds as any, lead, texte)) {
          console.log(`[filet]   -> suite donnée par l'agent`);
          continue;
        }
      } catch (e: any) {
        console.error(`[filet]   conversation ${client.slug}:`, e.message ?? e);
      }
      try {
        const r = await traiterReponseEntrante(lead, texte, 'whatsapp');
        console.log(`[filet]   -> traitement standard : ${r?.statut ?? '?'}`);
      } catch (e: any) {
        console.error(`[filet]   standard ${client.slug}:`, e.message ?? e);
      }
    }
  }
  if (rejoues) console.log(`[filet] ${rejoues} réponse(s) rejouée(s).`);
}

main().then(() => process.exit(0)).catch((e) => { console.error('[filet] ERR', e); process.exit(1); });
