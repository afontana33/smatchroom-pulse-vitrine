/**
 * rattrapage-ia.js — répond aux prospects restés sans réponse.
 *
 *   node bin/rattrapage-ia.js            aperçu, rien n'est envoyé
 *   node bin/rattrapage-ia.js --envoyer  envoi réel, 90 à 180 s entre deux messages
 *
 * Cible : prospects WhatsApp dont le dernier message (30 derniers jours) est plus
 * récent que notre dernier envoi, et dont le dossier n'a pas été repris par un
 * humain ni clos par un STOP ou un refus.
 */
'use strict';

const { Pool } = require('pg');
const conv = require('../api/lib/conversation-ia');
const senders = require('../api/senders');
require('../api/sinks').enregistrerTous();

const ENVOYER = process.argv.includes('--envoyer');
const IA_OK = ['positif', 'demande_prix', 'objection', 'flou_ou_technique', 'question_robot', 'salutation'];

(async () => {
  const db = new Pool({ connectionString: process.env.DATABASE_URL });
  const { rows } = await db.query(
    `WITH dernier_in AS (
       SELECT DISTINCT ON (contact_id) contact_id, body, classification, received_at
         FROM inbound_messages
        WHERE contact_id IS NOT NULL AND channel = 'whatsapp'
          AND received_at > now() - interval '30 days'
        ORDER BY contact_id, received_at DESC
     ), dernier_out AS (
       SELECT contact_id, max(COALESCE(sent_at, created_at)) AS t
         FROM messages WHERE direction = 'out' GROUP BY contact_id
     )
     SELECT ct.*, co.sector, di.body AS dernier_msg, di.classification, di.received_at
       FROM dernier_in di
       JOIN contacts ct ON ct.id = di.contact_id
       LEFT JOIN companies co ON co.id = ct.company_id
       LEFT JOIN dernier_out dout ON dout.contact_id = di.contact_id
      WHERE (dout.t IS NULL OR di.received_at > dout.t)
        AND di.classification = ANY($1)
        AND ct.phone_e164 IS NOT NULL
      ORDER BY di.received_at`,
    [IA_OK]
  );

  console.log(rows.length + ' prospect(s) en attente de réponse' + (ENVOYER ? ' : ENVOI RÉEL' : ' : aperçu'));
  let n = 0;
  for (const c of rows) {
    const { rows: enrs } = await db.query(
      'SELECT id, state, handed_over_reason, reply_turns FROM enrollments WHERE contact_id = $1 ORDER BY started_at DESC LIMIT 1',
      [c.id]
    );
    const enr = enrs[0];
    if (!conv.peutReprendre(enr)) {
      console.log('\n- ' + (c.first_name || '?') + ' : ignoré (' + (enr ? enr.state + '/' + enr.handed_over_reason : 'sans enrôlement') + ')');
      continue;
    }
    let ia = null;
    try {
      ia = await conv.repondre(db, c, enr);
    } catch (e) {
      console.log('\n- ' + (c.first_name || '?') + ' : erreur IA ' + e.message);
      continue;
    }
    if (!ia) continue;
    const agent = c.agent_scope === 'agent2' ? 'agent2' : 'agent1';
    console.log('\n=== ' + agent + ' · ' + (c.first_name || '?') + ' · ' + (c.sector || '') + ' · ' + c.phone_e164.slice(0, 6) + '…');
    console.log('Prospect : ' + String(c.dernier_msg).slice(0, 200).replace(/\n/g, ' '));
    console.log('Réponse  : ' + String(ia.reponse || '(aucune, transmis)').replace(/\n/g, ' / '));
    console.log('État     : ' + ia.etat + (ia.resume ? ' · ' + ia.resume : ''));

    if (!ENVOYER) continue;
    if (ia.reponse) {
      if (n > 0) await new Promise((ok) => setTimeout(ok, 90000 + Math.floor(Math.random() * 90000)));
      const envoi = await senders.senderWhatsapp.envoyer({ destinataire: c.phone_e164, corps: ia.reponse, agent });
      await db.query(
        `INSERT INTO messages (contact_id, channel, direction, body, provider_message_id, status, sent_at)
         VALUES ($1, 'whatsapp', 'out', $2, $3, 'sent', now())`,
        [c.id, ia.reponse, envoi.provider_message_id]
      );
      n++;
    }
    const actions = await conv.appliquer(db, c, enr, ia, c.dernier_msg);
    console.log('Fait     : ' + actions.join(', '));
  }
  console.log('\n' + n + ' message(s) envoyé(s).');
  await db.end();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
