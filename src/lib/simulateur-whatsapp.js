/**
 * Après un test du simulateur (demande du 27/10/2026) : WhatsApp immédiat au
 * visiteur depuis le numéro de l'agent SmatchRoom, puis l'agent mène la
 * conversation et conclut (source « simulateur » dans sr_leads, client 1).
 * Activités B2B (offre Agent Clients) : premier message envoyé, puis reprise par Alexis.
 */

const ALEXIS = '33771487698';
const ZONES = ['33', '32', '41', '352', '262', '590', '594', '596', '269', '687', '689'];

function sb() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return { url, headers: { 'Content-Type': 'application/json', apikey: key, Authorization: `Bearer ${key}` } };
}

export function versE164(tel) {
  let d = String(tel || '').replace(/\D/g, '');
  if (d.startsWith('00')) d = d.slice(2);
  if (d.length === 10 && d.startsWith('0')) d = `33${d.slice(1)}`;
  return d;
}

async function envoyer(c, num, message) {
  const r = await fetch(`${c.green_api_host}/waInstance${c.green_api_id_instance}/sendMessage/${c.green_api_token}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ chatId: `${num}@c.us`, message }),
  });
  const j = await r.json().catch(() => ({}));
  return j?.idMessage || '';
}

export async function engagerWhatsApp(contact, a) {
  const s = sb();
  if (!s) return;
  const num = versE164(contact.telephone);
  if (num.length < 11) return;
  const rc0 = await fetch(`${s.url}/rest/v1/sr_clients?select=green_api_host,green_api_id_instance,green_api_token&id=eq.1`, { headers: s.headers, cache: 'no-store' });
  const c0 = rc0.ok ? (await rc0.json())[0] : null;
  /* Numéros hors France (DOM compris), Belgique, Suisse, Luxembourg : pas de WhatsApp automatique, Alexis prévenu. */
  if (!ZONES.some((z) => num.startsWith(z))) {
    if (c0) await envoyer(c0, ALEXIS, `🌍 Simulateur : ${contact.prenom} ${contact.nom}${contact.entreprise ? ` (${contact.entreprise})` : ''}, ${a.label}, ${contact.ville}. Numéro étranger (+${num.slice(0, 3)}…), pas de WhatsApp automatique. À regarder toi-même.`).catch(() => null);
    return;
  }
  const rc = await fetch(`${s.url}/rest/v1/sr_clients?select=green_api_host,green_api_id_instance,green_api_token&id=eq.1`, { headers: s.headers, cache: 'no-store' });
  const creds = rc.ok ? (await rc.json())[0] : null;
  if (!creds) return;

  const b2b = a.type === 'b2b';
  const n = contact.nb_resultats;
  const msg = b2b
    ? `Bonjour ${contact.prenom}, c'est Alexis, de SmatchRoom Pulse. Merci d'avoir fait le test sur notre site : autour de ${contact.ville}, l'agent a repéré ${n} entreprises récemment créées qui correspondent à vos clients. Vous voulez que je vous montre comment il les contacterait pour vous ?`
    : `Bonjour ${contact.prenom}, c'est Alexis, de SmatchRoom Pulse. Merci d'avoir fait le test sur notre site : autour de ${contact.ville}, l'agent a déjà repéré ${n} professionnels qui pourraient vous recommander (${a.cible}). Vous voulez que je vous explique comment il les contacterait pour vous ?`;

  const champs = {
    client_id: 1,
    nom_entreprise: contact.entreprise || `${contact.prenom} ${contact.nom}`,
    dirigeant: `${contact.prenom} ${contact.nom}`,
    telephone: `+${num}`,
    email: contact.email,
    ville: contact.ville,
    source: 'simulateur',
    canal: 'whatsapp',
    source_ref: `${a.label} · ${n} professionnels trouvés · cibles : ${a.cible}`.slice(0, 300),
    profession: ['batiment', 'renovation'].includes(a.key) ? 'BTP' : 'Autre',
    message_genere: msg,
    priorite: 9,
    statut: 'contacte',
    date_contact: new Date().toISOString(),
    flux_etape: b2b ? 'transmis' : 'en_conversation',
  };

  /* Un même numéro ne crée pas deux leads : on met à jour celui qui existe. */
  const ex = await fetch(`${s.url}/rest/v1/sr_leads?select=id&client_id=eq.1&telephone_e164=eq.${num}&limit=1`, { headers: s.headers, cache: 'no-store' });
  const deja = ex.ok ? (await ex.json())[0] : null;
  const res = await fetch(`${s.url}/rest/v1/sr_leads${deja ? `?id=eq.${deja.id}` : ''}`, {
    method: deja ? 'PATCH' : 'POST',
    headers: { ...s.headers, Prefer: 'return=representation' },
    body: JSON.stringify(champs),
  });
  const lead = res.ok ? (await res.json())[0] : null;
  if (!lead) return;

  const id = await envoyer(creds, num, msg);
  await fetch(`${s.url}/rest/v1/sr_conversations`, {
    method: 'POST',
    headers: { ...s.headers, Prefer: 'return=minimal' },
    body: JSON.stringify({ lead_id: lead.id, client_id: 1, direction: 'out', body: msg, green_message_id: id }),
  });
  if (b2b) {
    await envoyer(
      creds,
      ALEXIS,
      `🧪 Simulateur B2B : ${champs.dirigeant} (${champs.nom_entreprise}), ${a.label}, ${contact.ville}. Premier WhatsApp envoyé, à reprendre toi-même (offre Agent Clients).`,
    );
  }
}
