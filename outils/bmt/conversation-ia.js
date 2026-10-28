/**
 * conversation-ia.js — l'agent converse vraiment après la première réponse.
 *
 * Avant (28/10/2026) : toute réponse non reconnue (« Vous vendez quoi ? ») était
 * classée « floue » et passée à l'humain sans alerte, donc restait sans suite.
 * Désormais l'agent lit l'historique et la base de connaissance, répond, traite
 * les objections et passe la main (lead + alerte WhatsApp au commercial) dès que
 * le prospect est chaud.
 *
 * STOP, refus net, agressivité et cessation restent traités par le code existant.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const llm = require('./llm');
const leadsLib = require('./leads');

const MAX_REPONSES_IA = 8;

// Raisons de transmission que l'IA peut reprendre : personne ne s'en est occupé.
const REPRENABLES = new Set([
  null, '', 'transmission_humaine', 'flou_ou_technique', 'tours_epuises',
  'fenetre_service_whatsapp_fermee', 'classe_inconnue'
]);

let CONNAISSANCE = null;
function connaissance() {
  if (CONNAISSANCE !== null) return CONNAISSANCE;
  try {
    const dir = path.join(__dirname, '..', '..', 'connaissance');
    CONNAISSANCE = fs.readdirSync(dir)
      .filter((f) => f.endsWith('.md'))
      .sort()
      .map((f) => '### ' + f + '\n' + fs.readFileSync(path.join(dir, f), 'utf8'))
      .join('\n\n')
      .slice(0, 36000);
  } catch (e) {
    CONNAISSANCE = '';
  }
  return CONNAISSANCE;
}

function prenomAgent(scope) {
  return scope === 'agent2'
    ? process.env.CONV_PRENOM_AGENT2 || 'José'
    : process.env.CONV_PRENOM_AGENT1 || 'Lucie';
}

function systemeStable(scope) {
  const moi = prenomAgent(scope);
  const mission = scope === 'agent2'
    ? `TA MISSION (apporteurs d'affaires) : tu recrutes des partenaires qui croisent des entreprises ou des particuliers préoccupés par leurs factures d'énergie (clients, adhérents, réseau). Pour chaque client recommandé et signé, le partenaire touche une commission. Le client recommandé, lui, profite d'un accompagnement gratuit (contrats d'énergie et équipements). Objectif : qu'il accepte un court appel avec toi pour mettre le partenariat en place.`
    : `TA MISSION (prospection entreprises) : tu contactes des entreprises qui consomment beaucoup d'énergie. BLEU M TECH les aide à baisser leurs factures : renégociation des contrats d'électricité et de gaz, et équipements plus économes (solaire, pompes à chaleur…). C'est entièrement gratuit pour l'entreprise : c'est le fournisseur qui rémunère BLEU M TECH. Objectif : qu'il accepte un court appel, ou qu'il envoie une facture récente pour une étude gratuite.`;

  return `Tu es ${moi}, de BLEU M TECH (Perpignan). Tu écris sur WhatsApp à un prospect, à la première personne, en ton nom.

${mission}

RÈGLES DE STYLE
- Vouvoiement toujours. Messages courts : 2 à 4 phrases, comme un humain sur WhatsApp. Pas de liste, pas de gras, pas de signature.
- Réponds d'abord précisément à ce qu'il dit ou demande, puis termine TOUJOURS par UNE seule question qui fait avancer (sauf si tu arrêtes la conversation).
- S'il demande « que puis-je faire pour vous ? » ou « quel est l'objet ? », explique en une phrase pourquoi tu le contactes, puis propose directement l'appel.
- Utilise ce que tu sais de lui (métier, secteur, ville) pour être concret.
- Ne te présente jamais comme « courtier en énergie ». Si on te demande « vous vendez de l'énergie ? » : non, BLEU M TECH aide à payer moins cher (contrats et équipements), sans frais pour le client.
- Jamais de mention d'IA, d'assistant, de robot ou de message automatique. Si on te demande si tu es un robot, réponds simplement que c'est bien toi, ${moi}, de BLEU M TECH.
- Aucun chiffre inventé : pas de montant d'économie, de prix, de pourcentage, de montant d'aide ni de délai d'amortissement. N'écris jamais « 100 % », écris « entièrement gratuit ».
- N'affirme rien qui ne figure pas dans la base de connaissance ci-dessous. Si tu ne sais pas : dis que tu vérifies et que tu le lui précises lors de l'appel.
- Quand il est d'accord pour être rappelé : dis « Je vous appelle » ou « Je vous rappelle », sans promettre d'heure ni de créneau. Demande s'il préfère être appelé sur ce numéro.

COMPORTEMENT
- Ne lâche pas à la première hésitation : rassure, reformule le bénéfice pour lui, propose l'appel ou l'étude gratuite.
- Deuxième refus clair : remercie poliment, dis qu'il peut garder ce numéro si besoin, et arrête.
- « Pas pour le moment » : remercie, dis-lui de garder ce numéro pour plus tard, et arrête.
- Pas la bonne personne, pas décideur, simple particulier (par exemple propriétaire d'un mobil-home, locataire, salarié), pas concerné, entreprise vendue ou fermée : réponds seulement « Très bien, merci, bonne journée. » (précédé si besoin de l'excuse pour le délai) et arrête. Rien d'autre, pas de question.

ÉTAT À RENVOYER
- "chaud" : il accepte un appel, demande à être rappelé, propose un moment, donne un numéro ou un e-mail, envoie ou propose d'envoyer une facture, ou demande un rendez-vous ou un devis.
- "clos" : refus définitif, pas concerné, pas pour le moment.
- "continuer" : sinon.

FORMAT DE SORTIE : uniquement un objet JSON, sans texte autour :
{"reponse": "ton message WhatsApp", "etat": "continuer|chaud|clos", "resume": "une phrase pour le commercial : qui il est, ce qu'il veut"}

BASE DE CONNAISSANCE BLEU M TECH
${connaissance()}`;
}

async function profil(db, contact) {
  let entreprise = {};
  if (contact.company_id) {
    const { rows } = await db.query('SELECT * FROM companies WHERE id = $1', [contact.company_id]);
    entreprise = rows[0] || {};
  }
  const nom = entreprise.name || entreprise.nom || entreprise.raison_sociale || entreprise.legal_name || '';
  const ville = entreprise.city || entreprise.ville || entreprise.commune || contact.city || '';
  const morceaux = [
    contact.first_name ? 'Prénom : ' + contact.first_name : null,
    nom ? 'Entreprise : ' + nom : null,
    contact.sector || entreprise.sector ? 'Secteur : ' + (contact.sector || entreprise.sector) : null,
    ville ? 'Ville : ' + ville : null
  ].filter(Boolean);
  return morceaux.length ? morceaux.join('\n') : 'Peu d\'informations sur ce prospect.';
}

async function historique(db, contactId) {
  const { rows } = await db.query(
    `SELECT * FROM (
       SELECT 'nous' AS qui, body, COALESCE(sent_at, created_at) AS t
         FROM messages WHERE contact_id = $1 AND direction = 'out' AND body IS NOT NULL
       UNION ALL
       SELECT 'prospect', body, received_at FROM inbound_messages
        WHERE contact_id = $1 AND body IS NOT NULL
     ) h ORDER BY t DESC LIMIT 24`,
    [contactId]
  );
  return rows.reverse();
}

function extraireJson(texte) {
  const m = String(texte || '').match(/\{[\s\S]*\}/);
  if (!m) return null;
  try {
    const o = JSON.parse(m[0]);
    if (!o || typeof o.reponse !== 'string') return null;
    const etat = ['continuer', 'chaud', 'clos'].includes(o.etat) ? o.etat : 'continuer';
    let reponse = nettoyer(o.reponse);
    // Filet : une conversation qui continue se termine toujours par une question.
    if (etat === 'continuer' && reponse && !/\?\s*$/.test(reponse)) {
      reponse += ' Ça vous dirait qu\'on en parle rapidement par téléphone ?';
    }
    return { reponse, etat, resume: String(o.resume || '').slice(0, 400) };
  } catch (e) {
    return null;
  }
}

function nettoyer(t) {
  return String(t || '')
    .replace(/\*\*/g, '')
    .replace(/\b100 ?%/g, 'entièrement')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .slice(0, 900);
}

/** L'IA a-t-elle la main sur ce dossier ? */
function peutReprendre(enrollment) {
  if (!enrollment) return false;
  if (enrollment.state === 'handed_over') return REPRENABLES.has(enrollment.handed_over_reason || null);
  return enrollment.state === 'active' || enrollment.state === 'stopped';
}

/**
 * Produit la réponse de l'agent. Ne l'envoie pas : l'appelant s'en charge.
 * @returns {Promise<null | {reponse, etat, resume}>}
 */
async function repondre(db, contact, enrollment) {
  const { rows: er } = await db.query(
    'SELECT id, state, handed_over_reason FROM enrollments WHERE id = $1',
    [enrollment.id]
  );
  const enr = er[0] || enrollment;
  if (!peutReprendre(enr)) return null;

  const fil = await historique(db, contact.id);
  if (!fil.length || fil[fil.length - 1].qui !== 'prospect') return null;

  const premiereReponse = fil.findIndex((m) => m.qui === 'prospect');
  const nbIa = fil.slice(premiereReponse).filter((m) => m.qui === 'nous').length;
  if (nbIa >= MAX_REPONSES_IA) return { reponse: null, etat: 'chaud', resume: 'Conversation longue, à reprendre par le commercial.' };

  const dernier = fil[fil.length - 1];
  // Message vide (photo, vocal, autocollant) : on ne répond pas à l'aveugle.
  if (!String(dernier.body || '').trim()) return null;
  const heures = (Date.now() - new Date(dernier.t).getTime()) / 3600000;
  const transcript = fil
    .map((m) => (m.qui === 'nous' ? '[Vous] ' : '[Prospect] ') + String(m.body).slice(0, 1200))
    .join('\n');

  const variable = 'CE QUE TU SAIS DU PROSPECT\n' + (await profil(db, contact)) +
    (heures > 12 ? '\n\nSon dernier message date de ' + Math.round(heures) + ' h : commence par t\'excuser brièvement du délai (« Désolé pour ma réponse tardive. »).' : '');

  const sortie = await llm.generer(
    { stable: systemeStable(contact.agent_scope), variable },
    [{ role: 'user', content: 'Conversation WhatsApp jusqu\'ici :\n' + transcript + '\n\nÉcris ta prochaine réponse au prospect, au format JSON demandé.' }],
    { maxTokens: 500 }
  );
  return extraireJson(sortie.texte);
}

/** Applique l'état : lead + alerte si chaud, arrêt si clos. */
async function appliquer(db, contact, enrollment, ia, corps) {
  const actions = [];
  await db.query('UPDATE enrollments SET next_send_at = NULL WHERE id = $1', [enrollment.id]);

  if (ia.etat === 'clos') {
    await db.query(
      `UPDATE enrollments SET state = 'stopped', stopped_at = COALESCE(stopped_at, now()),
              stopped_reason = 'ia_clos' WHERE id = $1 AND state <> 'stopped'`,
      [enrollment.id]
    );
    actions.push('ia_clos');
    return actions;
  }

  if (ia.etat === 'chaud') {
    await db.query(
      `UPDATE enrollments SET state = 'handed_over', handed_over_at = now(),
              handed_over_reason = 'ia_chaud' WHERE id = $1`,
      [enrollment.id]
    );
    const { rows: deja } = await db.query(
      "SELECT 1 FROM leads WHERE contact_id = $1 AND created_at > now() - interval '30 days' LIMIT 1",
      [contact.id]
    );
    if (!deja.length) {
      const cree = await leadsLib.creer(db, {
        source_agent: contact.agent_scope === 'agent2' ? 'agent2' : 'agent1',
        channel: 'whatsapp',
        contact_id: contact.id,
        company_id: contact.company_id,
        first_name: contact.first_name,
        phone: contact.phone_e164,
        email: contact.email,
        audience: 'pro',
        qualification: {
          audience: 'pro',
          echeance: 'moins_3_mois',
          classe: 'positif',
          secteur: contact.sector,
          resume: ia.resume,
          reponse: String(corps || '').slice(0, 500)
        }
      });
      try {
        await leadsLib.livrer(db, cree.lead.id, {});
      } catch (e) {
        actions.push('livraison_en_echec:' + String(e.message).slice(0, 60));
      }
      actions.push('ia_chaud_lead_' + cree.lead.id);
    } else {
      actions.push('ia_chaud_lead_existant');
    }
    return actions;
  }

  // On garde la main : l'enrôlement reste ouvert mais plus aucun envoi programmé.
  if (enrollment.state === 'handed_over') {
    await db.query(
      `UPDATE enrollments SET state = 'active', handed_over_at = NULL, handed_over_reason = NULL
        WHERE id = $1`,
      [enrollment.id]
    );
  }
  actions.push('ia_continue');
  return actions;
}

module.exports = { repondre, appliquer, peutReprendre, MAX_REPONSES_IA };
