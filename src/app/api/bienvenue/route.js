/**
 * POST /api/bienvenue : réponses du formulaire d'accueil d'un nouveau client.
 * Corps : { token, ...champs }. Voir lib/bienvenue-server.js.
 */

import {
  alerterAlexis,
  BIC,
  emailVirementClient,
  euros,
  facturer,
  IBAN,
  lireAccueil,
  noterErreur,
  OFFRES,
  reserver,
  ttc,
} from '@/lib/bienvenue-server';

export const dynamic = 'force-dynamic';

const txt = (v, max = 300) => String(v ?? '').replace(/\s+/g, ' ').trim().slice(0, max);
const long = (v, max = 1500) => String(v ?? '').trim().slice(0, max);

const OBLIGATOIRES = {
  raison_sociale: 'la raison sociale',
  siret: 'le SIRET',
  adresse: 'l’adresse',
  code_postal: 'le code postal',
  ville: 'la ville',
  prenom: 'votre prénom',
  nom: 'votre nom',
  email: 'votre email',
  telephone: 'votre téléphone',
  prenom_agent: 'le prénom qui signe les messages',
  metier: 'votre métier',
  services: 'vos prestations',
  zone_ville: 'votre ville de base',
  zone_rayon: 'le rayon d’intervention',
  numero_alertes: 'le numéro qui reçoit les contacts intéressés',
};

export async function POST(request) {
  let b;
  try {
    b = await request.json();
  } catch {
    return Response.json({ erreur: 'Requête invalide.' }, { status: 400 });
  }
  const ligne = await lireAccueil(b?.token);
  if (!ligne) return Response.json({ erreur: 'Lien invalide ou expiré.' }, { status: 404 });
  if (ligne.statut !== 'envoye') {
    return Response.json({ erreur: 'Ce formulaire a déjà été envoyé. Merci.' }, { status: 409 });
  }

  const d = {
    raison_sociale: txt(b.raison_sociale, 120),
    siret: txt(b.siret, 20),
    adresse: txt(b.adresse, 200),
    code_postal: txt(b.code_postal, 10),
    ville: txt(b.ville, 60),
    prenom: txt(b.prenom, 40),
    nom: txt(b.nom, 60),
    email: txt(b.email, 120),
    telephone: txt(b.telephone, 25),
    prenom_agent: txt(b.prenom_agent, 40),
    metier: txt(b.metier, 80),
    services: long(b.services),
    chantiers_voulus: long(b.chantiers_voulus),
    chantiers_refuses: long(b.chantiers_refuses),
    zone_ville: txt(b.zone_ville, 60),
    zone_rayon: txt(b.zone_rayon, 10),
    villes_exclues: long(b.villes_exclues, 500),
    cibles: Array.isArray(b.cibles) ? b.cibles.map((c) => txt(c, 60)).slice(0, 10) : [],
    atouts: long(b.atouts),
    site_web: txt(b.site_web, 200),
    fiche_google: txt(b.fiche_google, 300),
    numero_whatsapp: txt(b.numero_whatsapp, 40),
    numero_alertes: txt(b.numero_alertes, 25),
    nom_domaine: txt(b.nom_domaine, 120),
    presentation: long(b.presentation),
    style: long(b.style, 500),
    horaires: txt(b.horaires, 200),
    remarques: long(b.remarques),
  };

  for (const [k, label] of Object.entries(OBLIGATOIRES)) {
    if (d[k].length < 2) return Response.json({ erreur: `Indiquez ${label}.` }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) return Response.json({ erreur: 'Adresse email invalide.' }, { status: 400 });
  if (d.siret.replace(/\D/g, '').length !== 14) return Response.json({ erreur: 'Le SIRET doit faire 14 chiffres.' }, { status: 400 });
  if (b.cgv !== true || b.mandat !== true) {
    return Response.json({ erreur: 'Merci de cocher les deux cases pour valider.' }, { status: 400 });
  }

  if ((await reserver(ligne.id, d)) === false) {
    return Response.json({ erreur: 'Ce formulaire a déjà été envoyé. Merci.' }, { status: 409 });
  }

  let fact = null;
  let erreur = null;
  try {
    fact = await facturer(ligne, d);
    if (fact.envoyeeParQonto === false) await emailVirementClient(d, ligne, fact.numero).catch(() => null);
  } catch (e) {
    erreur = e?.message || 'erreur inconnue';
    console.error('[bienvenue]', erreur);
    await noterErreur(ligne.id, erreur);
    await emailVirementClient(d, ligne, null).catch(() => null);
  }
  await alerterAlexis(ligne, d, fact, erreur);

  const offre = OFFRES[ligne.offre];
  return Response.json({
    ok: true,
    paiement: {
      offre: offre.titre,
      montant: euros(ttc(offre.ht)),
      ht: euros(offre.ht),
      iban: IBAN,
      bic: BIC,
      reference: fact?.numero || `Pulse ${d.raison_sociale}`,
    },
  });
}
