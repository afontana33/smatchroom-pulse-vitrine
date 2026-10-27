/**
 * Formulaire d'accueil des nouveaux clients (demande du 27/10/2026).
 *
 * Après l'appel, Alexis répond « OK pack » ou « OK agent » à l'alerte WhatsApp :
 * le listener de l'agent SmatchRoom crée une ligne pulse_onboarding (token) et
 * envoie le lien /bienvenue/<token> à l'artisan. Ici :
 *   - lecture de la ligne par son token ;
 *   - enregistrement des réponses ;
 *   - client + facture Qonto (paiement par virement uniquement), envoyée par email ;
 *   - alerte à Alexis par WhatsApp et par email.
 *
 * Variables d'environnement : SUPABASE_URL, SUPABASE_SERVICE_KEY, SMTP_*,
 * QONTO_LOGIN et QONTO_SECRET_KEY (clé API Qonto, posée par Alexis dans le .env).
 */

import nodemailer from 'nodemailer';

export const IBAN = 'FR76 1695 8000 0138 2950 9148 375';
export const BIC = 'QNTOFRP1XXX';
const IBAN_BRUT = IBAN.replace(/\s/g, '');
const ALEXIS_WA = '33771487698@c.us';
const QONTO = 'https://thirdparty.qonto.com/v2';

export const OFFRES = {
  pack: {
    titre: 'Pack Lancement Entrepreneurs',
    description:
      'Site internet à votre nom, fiche Google remise au propre et 3 mois d’agent de prospection WhatsApp et email auprès des professionnels de votre zone.',
    ht: 490,
  },
  agent: {
    titre: 'Agent de prospection – 1 mois',
    description:
      'Prospection des agences, syndics, gestionnaires et architectes de votre zone par WhatsApp et email, en votre nom. Sans engagement.',
    ht: 149,
  },
};

export const ttc = (ht) => Math.round(ht * 120) / 100;
export const euros = (n) => `${n.toFixed(2).replace('.', ',')} €`;

function sb() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Supabase non configuré');
  return { url, headers: { 'Content-Type': 'application/json', apikey: key, Authorization: `Bearer ${key}` } };
}

export async function lireAccueil(token) {
  if (!/^[a-z0-9]{12,40}$/i.test(String(token || ''))) return null;
  const s = sb();
  const res = await fetch(
    `${s.url}/rest/v1/pulse_onboarding?select=id,token,offre,entreprise,statut,lead_id&token=eq.${token}&limit=1`,
    { headers: s.headers, cache: 'no-store' },
  );
  if (!res.ok) return null;
  return (await res.json())[0] || null;
}

async function majAccueil(id, champs) {
  const s = sb();
  await fetch(`${s.url}/rest/v1/pulse_onboarding?id=eq.${id}`, {
    method: 'PATCH',
    headers: { ...s.headers, Prefer: 'return=minimal' },
    body: JSON.stringify(champs),
  });
}

/* Passe la ligne de « envoye » à « rempli » une seule fois (deux clics = une facture). */
export async function reserver(id, donnees) {
  const s = sb();
  const res = await fetch(`${s.url}/rest/v1/pulse_onboarding?id=eq.${id}&statut=eq.envoye`, {
    method: 'PATCH',
    headers: { ...s.headers, Prefer: 'return=representation' },
    body: JSON.stringify({ statut: 'rempli', donnees, rempli_at: new Date().toISOString() }),
  });
  if (!res.ok) return false;
  return (await res.json()).length === 1;
}

/* ---------- Qonto ---------- */

function qontoHeaders() {
  const { QONTO_LOGIN, QONTO_SECRET_KEY } = process.env;
  if (!QONTO_LOGIN || !QONTO_SECRET_KEY) return null;
  return { 'Content-Type': 'application/json', Authorization: `${QONTO_LOGIN}:${QONTO_SECRET_KEY}` };
}

async function qonto(chemin, corps) {
  const h = qontoHeaders();
  if (!h) throw new Error('clé API Qonto absente du .env');
  const res = await fetch(`${QONTO}${chemin}`, { method: 'POST', headers: h, body: JSON.stringify(corps) });
  const txt = await res.text();
  if (!res.ok) throw new Error(`Qonto ${chemin} ${res.status} ${txt.slice(0, 300)}`);
  return txt ? JSON.parse(txt) : {};
}

const jour = (d) => d.toISOString().slice(0, 10);

/** Crée le client et la facture (virement), puis tente l'envoi par email via Qonto. */
export async function facturer(ligne, d) {
  const offre = OFFRES[ligne.offre];
  /* Une fiche « TEST… » crée une facture en brouillon (supprimable) et ne l'envoie pas. */
  const test = String(ligne.entreprise || '').startsWith('TEST');
  const client = await qonto('/clients', {
    kind: 'company',
    name: d.raison_sociale,
    email: d.email,
    tax_identification_number: d.siret.replace(/\s/g, '').slice(0, 20),
    currency: 'EUR',
    locale: 'fr',
    billing_address: { street_address: d.adresse, city: d.ville, zip_code: d.code_postal, country_code: 'FR' },
  });
  const clientId = client?.client?.id || client?.id;
  const maintenant = new Date();
  const echeance = new Date(maintenant.getTime() + 7 * 86400_000);
  const facture = await qonto('/client_invoices', {
    client_id: clientId,
    issue_date: jour(maintenant),
    due_date: jour(echeance),
    currency: 'EUR',
    status: test ? 'draft' : 'unpaid',
    payment_methods: { iban: IBAN_BRUT },
    items: [
      {
        title: offre.titre,
        description: offre.description,
        quantity: '1',
        unit_price: { value: offre.ht.toFixed(2), currency: 'EUR' },
        vat_rate: '0.2',
      },
    ],
  });
  const inv = facture?.client_invoice || facture;
  await majAccueil(ligne.id, { statut: 'facture', qonto_client_id: clientId, qonto_invoice_id: inv?.id });

  let envoyeeParQonto = false;
  if (test) return { numero: inv?.number || null, id: inv?.id, url: inv?.invoice_url || null, envoyeeParQonto: true };
  try {
    await qonto(`/client_invoices/${inv.id}/send`, {
      send_to: [d.email],
      copy_to_self: true,
      email_title: `Votre facture SmatchRoom Pulse – ${offre.titre}`,
      email_body: `Bonjour ${d.prenom},\n\nMerci pour votre confiance. Vous trouverez ci-joint votre facture, à régler par virement sur l'IBAN indiqué.\n\nÀ très vite,\nAlexis Fontana\nSmatchRoom Pulse`,
    });
    envoyeeParQonto = true;
  } catch (e) {
    console.error('[bienvenue] envoi Qonto', e.message);
  }
  return { numero: inv?.number || null, id: inv?.id, url: inv?.invoice_url || null, envoyeeParQonto };
}

/* ---------- Alertes ---------- */

async function whatsappAlexis(texte) {
  const s = sb();
  const res = await fetch(
    `${s.url}/rest/v1/sr_clients?select=green_api_host,green_api_id_instance,green_api_token&id=eq.1`,
    { headers: s.headers, cache: 'no-store' },
  );
  const c = res.ok ? (await res.json())[0] : null;
  if (!c) return;
  await fetch(`${c.green_api_host}/waInstance${c.green_api_id_instance}/sendMessage/${c.green_api_token}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ chatId: ALEXIS_WA, message: texte }),
  });
}

function transport() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  const port = Number(SMTP_PORT || 465);
  return {
    from: SMTP_USER,
    t: nodemailer.createTransport({ host: SMTP_HOST, port, secure: port === 465, auth: { user: SMTP_USER, pass: SMTP_PASS } }),
  };
}

/* Si Qonto n'a pas pu envoyer la facture, l'artisan reçoit quand même les coordonnées de virement. */
export async function emailVirementClient(d, ligne, numero, url = null) {
  const tr = transport();
  if (!tr) return;
  const offre = OFFRES[ligne.offre];
  const montant = euros(ttc(offre.ht));
  await tr.t.sendMail({
    from: `"Alexis · SmatchRoom Pulse" <${tr.from}>`,
    to: d.email,
    bcc: 'a.fontana@smatchroom.fr',
    subject: `Bienvenue chez SmatchRoom Pulse – règlement ${offre.titre}`,
    text:
      `Bonjour ${d.prenom},\n\nMerci, j'ai bien reçu vos informations : je lance la mise en place.\n\n` +
      `Règlement par virement :\n- Montant : ${montant} TTC (${euros(offre.ht)} HT)\n- Bénéficiaire : SmatchRoom\n` +
      `- IBAN : ${IBAN}\n- BIC : ${BIC}\n- Référence : ${numero || `Pulse ${d.raison_sociale}`}\n\n` +
      (url ? `Votre facture : ${url}\n\n` : `La facture vous est envoyée séparément.\n\n`) +
      `À très vite,\nAlexis Fontana\nSmatchRoom Pulse`,
  });
}

export async function alerterAlexis(ligne, d, fact, erreur) {
  const offre = OFFRES[ligne.offre];
  const resume =
    `✅ Formulaire d'accueil rempli : ${d.raison_sociale} (${offre.titre})\n` +
    `${d.prenom} ${d.nom} · ${d.telephone} · ${d.email}\n${d.metier} · ${d.zone_ville} (${d.zone_rayon} km)\n` +
    (erreur
      ? `⚠️ Facture NON créée : ${erreur}`
      : `🧾 Facture ${fact?.numero || ''} créée${fact?.envoyeeParQonto ? ' et envoyée par Qonto' : ' (envoi Qonto impossible : coordonnées de virement envoyées par email)'}`);
  await whatsappAlexis(resume).catch(() => null);
  const { TELEGRAM_BOT_TOKEN: tg, TELEGRAM_CHAT_ID: chat } = process.env;
  if (tg && chat) {
    await fetch(`https://api.telegram.org/bot${tg}/sendMessage`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ chat_id: chat, text: resume }),
    }).catch(() => null);
  }
  const tr = transport();
  if (!tr) return;
  const lignes = Object.entries(d)
    .map(([k, v]) => `${k} : ${Array.isArray(v) ? v.join(', ') : v}`)
    .join('\n');
  await tr.t
    .sendMail({
      from: `"SmatchRoom Pulse" <${tr.from}>`,
      to: 'a.fontana@smatchroom.fr',
      subject: `Nouveau client : ${d.raison_sociale} – ${offre.titre}`,
      text: `${resume}\n\nRéponses complètes :\n\n${lignes}`,
    })
    .catch(() => null);
}

export async function noterErreur(id, message) {
  await majAccueil(id, { statut: 'erreur', erreur: String(message).slice(0, 500) }).catch(() => null);
}

/* ---------- Renouvellement mensuel (accord du client) ---------- */

export async function lireRenouvellement(token) {
  if (!/^[a-z0-9]{12,40}$/i.test(String(token || ''))) return null;
  const s = sb();
  const res = await fetch(
    `${s.url}/rest/v1/pulse_renouvellements?select=id,token,echeance,statut,motif,onboarding_id,pulse_onboarding(id,entreprise,telephone,donnees,qonto_client_id,agent_slug)&token=eq.${token}&limit=1`,
    { headers: s.headers, cache: 'no-store' },
  );
  if (!res.ok) return null;
  return (await res.json())[0] || null;
}

/* Une réponse par lien : « envoye » (ou « rappel », après l'appel d'Alexis) -> accepte / refuse / rappel / pause. */
export async function repondreRenouvellement(id, statut, extra = {}) {
  const s = sb();
  const res = await fetch(`${s.url}/rest/v1/pulse_renouvellements?id=eq.${id}&statut=in.(envoye,rappel)`, {
    method: 'PATCH',
    headers: { ...s.headers, Prefer: 'return=representation' },
    body: JSON.stringify({ statut, repondu_at: new Date().toISOString(), ...extra }),
  });
  if (!res.ok) return false;
  return (await res.json()).length === 1;
}

export async function majRenouvellement(id, champs) {
  const s = sb();
  await fetch(`${s.url}/rest/v1/pulse_renouvellements?id=eq.${id}`, {
    method: 'PATCH',
    headers: { ...s.headers, Prefer: 'return=minimal' },
    body: JSON.stringify(champs),
  });
}

/** Facture du mois suivant (149 € HT) pour un client Qonto existant, envoyée par Qonto. */
export async function facturerMois(clientId, d) {
  const offre = OFFRES.agent;
  const maintenant = new Date();
  const facture = await qonto('/client_invoices', {
    client_id: clientId,
    issue_date: jour(maintenant),
    due_date: jour(new Date(maintenant.getTime() + 7 * 86400_000)),
    currency: 'EUR',
    status: 'unpaid',
    payment_methods: { iban: IBAN_BRUT },
    items: [{ title: offre.titre, description: offre.description, quantity: '1', unit_price: { value: offre.ht.toFixed(2), currency: 'EUR' }, vat_rate: '0.2' }],
  });
  const inv = facture?.client_invoice || facture;
  let envoyeeParQonto = false;
  try {
    await qonto(`/client_invoices/${inv.id}/send`, {
      send_to: [d.email],
      copy_to_self: true,
      email_title: `Votre facture SmatchRoom Pulse – ${offre.titre}`,
      email_body: `Bonjour ${d.prenom},\n\nMerci de continuer avec nous. Voici votre facture du mois, à régler par virement sur l'IBAN indiqué.\n\nAlexis Fontana\nSmatchRoom Pulse`,
    });
    envoyeeParQonto = true;
  } catch (e) {
    console.error('[continuer] envoi Qonto', e.message);
  }
  return { numero: inv?.number || null, id: inv?.id, url: inv?.invoice_url || null, envoyeeParQonto };
}

export { whatsappAlexis };

/** Alerte courte à Alexis : WhatsApp + Telegram. */
export async function alerteCourte(texte) {
  await whatsappAlexis(texte).catch(() => null);
  const { TELEGRAM_BOT_TOKEN: tg, TELEGRAM_CHAT_ID: chat } = process.env;
  if (tg && chat) {
    await fetch(`https://api.telegram.org/bot${tg}/sendMessage`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ chat_id: chat, text: texte }),
    }).catch(() => null);
  }
}

/* ---------- Connexion du WhatsApp de l'agent (QR en direct ou code de liaison) ---------- */

export async function instanceParConnexion(token) {
  if (!/^[a-z0-9]{12,40}$/i.test(String(token || ''))) return null;
  const s = sb();
  const r1 = await fetch(`${s.url}/rest/v1/pulse_onboarding?select=id,entreprise,agent_slug,active_at&connexion_token=eq.${token}&limit=1`, { headers: s.headers, cache: 'no-store' });
  let o = r1.ok ? (await r1.json())[0] : null;
  if (!o) {
    /* Lien de reconnexion envoyé par la surveillance des instances (clients sans formulaire d'accueil). */
    const r0 = await fetch(`${s.url}/rest/v1/pulse_instances_etat?select=slug&connexion_token=eq.${token}&limit=1`, { headers: s.headers, cache: 'no-store' });
    const e = r0.ok ? (await r0.json())[0] : null;
    if (e?.slug) {
      const rn = await fetch(`${s.url}/rest/v1/chasseur_clients?select=nom&slug=eq.${e.slug}&limit=1`, { headers: s.headers, cache: 'no-store' });
      const n = rn.ok ? (await rn.json())[0] : null;
      o = { id: null, entreprise: n?.nom || '', agent_slug: e.slug, active_at: new Date().toISOString() };
    }
  }
  if (!o?.agent_slug) return null;
  const r2 = await fetch(`${s.url}/rest/v1/chasseur_clients?select=green_api_host,green_api_id_instance,green_api_token&slug=eq.${o.agent_slug}&limit=1`, { headers: s.headers, cache: 'no-store' });
  const c = r2.ok ? (await r2.json())[0] : null;
  if (!c?.green_api_id_instance) return null;
  return { o, c };
}

export async function etatConnexion(c) {
  const base = `${c.green_api_host}/waInstance${c.green_api_id_instance}`;
  const st = await fetch(`${base}/getStateInstance/${c.green_api_token}`, { cache: 'no-store' }).then((r) => r.json()).catch(() => ({}));
  if (st?.stateInstance === 'authorized') return { etat: 'connecte' };
  const qr = await fetch(`${base}/qr/${c.green_api_token}`, { cache: 'no-store' }).then((r) => r.json()).catch(() => ({}));
  if (qr?.type === 'alreadyLogged') return { etat: 'connecte' };
  if (qr?.type === 'qrCode') return { etat: 'qr', qr: qr.message };
  return { etat: 'attente' };
}

export async function codeLiaison(c, numero) {
  const r = await fetch(`${c.green_api_host}/waInstance${c.green_api_id_instance}/getAuthorizationCode/${c.green_api_token}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ phoneNumber: Number(String(numero).replace(/\D/g, '')) }),
  });
  const j = await r.json().catch(() => ({}));
  return j?.status ? j.code : null;
}
