/**
 * Après un test du simulateur (demande du 27/10/2026) : WhatsApp immédiat au
 * visiteur depuis le numéro de l'agent SmatchRoom, puis l'agent mène la
 * conversation et conclut (source « simulateur » dans sr_leads, client 1).
 * Activités B2B (offre Agent Clients, source « simulateur_b2b ») : l'agent comprend l'activité et obtient un appel
 * (fiche playbook-b2b.txt), puis Alexis reprend la main pour vendre.
 */

const ALEXIS = '33771487698';

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
    source: b2b ? 'simulateur_b2b' : 'simulateur',
    canal: 'whatsapp',
    source_ref: `${a.label} · ${n} professionnels trouvés · cibles : ${a.cible}`.slice(0, 300),
    profession: ['batiment', 'renovation'].includes(a.key) ? 'BTP' : 'Autre',
    message_genere: msg,
    priorite: 9,
    statut: 'contacte',
    date_contact: new Date().toISOString(),
    flux_etape: 'en_conversation',
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
      `🧪 Simulateur B2B : ${champs.dirigeant} (${champs.nom_entreprise}), ${a.label}, ${contact.ville}. Premier WhatsApp envoyé : l'agent comprend son activité et te décroche un appel, tu reprends la main ensuite.`,
    );
  }
}

/**
 * Prospect du formulaire de pub Meta (demande du 28/10/2026), reçu depuis la feuille Google
 * « Pulse Meta Prospect » (Apps Script → /api/meta-lead), pour ne perdre personne : celui qui
 * a cliqué sur WhatsApp à la fin du formulaire est déjà en conversation et n'est pas recontacté ;
 * les autres reçoivent le premier WhatsApp de l'agent, qui mène ensuite la vente (source « formulaire »).
 * Retourne 'deja', 'envoye' ou 'invalide'.
 */
export async function engagerFormulaire(p) {
  const s = sb();
  if (!s) return 'invalide';
  const num = versE164(p.telephone);
  if (num.length < 11) return 'invalide';
  const rc = await fetch(`${s.url}/rest/v1/sr_clients?select=green_api_host,green_api_id_instance,green_api_token&id=eq.1`, { headers: s.headers, cache: 'no-store' });
  const creds = rc.ok ? (await rc.json())[0] : null;
  if (!creds) return 'invalide';

  const ex = await fetch(`${s.url}/rest/v1/sr_leads?select=id&client_id=eq.1&telephone_e164=eq.${num}&limit=1`, { headers: s.headers, cache: 'no-store' });
  const deja = ex.ok ? (await ex.json())[0] : null;
  if (deja) {
    const depuis = new Date(Date.now() - 3 * 86400e3).toISOString();
    const cv = await fetch(`${s.url}/rest/v1/sr_conversations?select=id&lead_id=eq.${deja.id}&created_at=gte.${depuis}&limit=1`, { headers: s.headers, cache: 'no-store' });
    if (cv.ok && (await cv.json()).length) return 'deja';
  }

  const nom = String(p.nom || '').trim();
  const prenom = nom.split(/\s+/)[0] || '';
  const msg = `Bonjour${prenom ? ` ${prenom}` : ''}, c'est Alexis, de SmatchRoom Pulse. Merci d'avoir rempli notre formulaire ! Pour vous montrer concrètement ce que votre agent ferait pour vous : quel est votre métier exact, et dans quelle ville êtes-vous ?`;
  const champs = {
    client_id: 1,
    nom_entreprise: nom || 'Contact formulaire',
    dirigeant: nom || null,
    telephone: `+${num}`,
    email: p.email || null,
    source: 'formulaire',
    canal: 'whatsapp',
    source_ref: `Formulaire pub Meta · secteur : ${p.secteur || '?'} · taille : ${p.taille || '?'} · prospection : ${p.prospection || '?'}`.slice(0, 300),
    profession: /btp|bâtiment|batiment|artisan/i.test(String(p.secteur)) ? 'BTP' : 'Autre',
    message_genere: msg,
    priorite: 9,
    statut: 'contacte',
    date_contact: new Date().toISOString(),
    flux_etape: 'en_conversation',
  };
  const res = await fetch(`${s.url}/rest/v1/sr_leads${deja ? `?id=eq.${deja.id}` : ''}`, {
    method: deja ? 'PATCH' : 'POST',
    headers: { ...s.headers, Prefer: 'return=representation' },
    body: JSON.stringify(champs),
  });
  const lead = res.ok ? (await res.json())[0] : null;
  if (!lead) return 'invalide';
  const id = await envoyer(creds, num, msg);
  await fetch(`${s.url}/rest/v1/sr_conversations`, {
    method: 'POST',
    headers: { ...s.headers, Prefer: 'return=minimal' },
    body: JSON.stringify({ lead_id: lead.id, client_id: 1, direction: 'out', body: msg, green_message_id: id }),
  });
  await envoyer(creds, ALEXIS, `📋 Formulaire pub sans clic WhatsApp : ${nom || 'sans nom'} (${p.secteur || '?'}, ${p.taille || '?'}). Ton agent vient de lui écrire.`);
  return 'envoye';
}
