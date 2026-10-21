/**
 * POST /api/simulateur
 *   { activite, ville, prenom, nom, telephone, entreprise?, email?, consentement }
 * → { total, lieux: [...], conversation: [{ de, texte }…], partenaire, cible }
 *
 * Le test est gratuit mais nominatif : prénom, nom, secteur et téléphone sont
 * obligatoires (demande du 21/10/2026). Chaque test enregistre le contact
 * (pulse_simulateur_leads) et l'envoie par email à Alexis.
 *
 * Une seule simulation par visiteur (IP hachée, 90 jours) : une deuxième
 * demande reçoit 409 { deja: true }. Le navigateur garde le résultat de la
 * première pour le réafficher.
 */

import { APERCU, activite, conversation, nettoyerTexte, nettoyerVille, nomCourt } from '@/lib/simulateur';
import {
  alerterParEmail,
  chercher,
  enregistrerContact,
  hashIp,
  ipDe,
  noterSimulation,
  simulationPrecedente,
} from '@/lib/simulateur-server';

export const dynamic = 'force-dynamic';
export const maxDuration = 90;

const refus = (erreur, status = 400) => Response.json({ erreur }, { status });

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return refus('Requête invalide.');
  }
  const a = activite(body?.activite);
  const ville = nettoyerVille(body?.ville);
  const prenom = nettoyerTexte(body?.prenom, 40);
  const nom = nettoyerTexte(body?.nom, 60);
  const entreprise = nettoyerTexte(body?.entreprise, 60);
  const telephone = nettoyerTexte(body?.telephone, 25).replace(/[^\d+ .]/g, '');
  const email = nettoyerTexte(body?.email, 120);
  const chiffres = telephone.replace(/\D/g, '');

  if (!a) return refus('Choisissez votre secteur d’activité.');
  if (ville.length < 2) return refus('Indiquez votre ville.');
  if (prenom.length < 2 || nom.length < 2) return refus('Indiquez votre prénom et votre nom.');
  if (chiffres.length < 9 || chiffres.length > 15) return refus('Indiquez un numéro de téléphone valide.');
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return refus('Adresse email invalide.');
  if (body?.consentement !== true) return refus('Merci de cocher la case pour lancer le test.');

  /* Sans IP transmise par nginx, tous les visiteurs auraient la même : on ne
     bloque alors pas côté serveur (le navigateur garde quand même le résultat). */
  const ip = ipDe(request);
  const ipHash = hashIp(ip);
  if (ip !== 'inconnue' && (await simulationPrecedente(ipHash))) {
    return Response.json({ deja: true, erreur: 'Vous avez déjà fait votre test gratuit.' }, { status: 409 });
  }

  let lieux;
  try {
    lieux = await chercher(a.key, ville);
  } catch (e) {
    console.error('[simulateur]', e?.message);
    return refus('La recherche n’a pas abouti. Réessayez dans un instant.', 502);
  }
  if (!lieux.length) {
    return refus(
      a.type === 'b2b'
        ? `Aucune création correspondante ces 30 derniers jours autour de « ${ville} ». Essayez une grande ville proche ou un autre secteur.`
        : `Nous n'avons rien trouvé autour de « ${ville} ». Essayez la ville la plus proche.`,
      404,
    );
  }

  await noterSimulation({ ip_hash: ipHash, activite: a.key, ville, prenom, entreprise: entreprise || null });

  /* Le contact est enregistré et envoyé par email avant la réponse : un lead ne
     doit jamais se perdre parce que le visiteur a fermé la page. */
  const contact = {
    prenom,
    nom,
    telephone,
    email: email || null,
    entreprise: entreprise || null,
    metier: a.label,
    ville,
    nb_resultats: lieux.length,
  };
  const envoye = await alerterParEmail(contact).catch((e) => {
    console.error('[simulateur] email', e?.message);
    return false;
  });
  const enregistre = await enregistrerContact({ ...contact, resultats: lieux, email_envoye: envoye }).catch(() => false);
  if (!enregistre || !envoye) {
    console.error('[simulateur] lead', { enregistre, envoye, prenom, nom, telephone, metier: a.label, ville });
  }

  /* L'interlocuteur de l'exemple. Partenaires : le nom le plus court des
     premiers résultats, qui se lit le mieux dans une bulle. B2B : la création
     la plus récente dont on connaît le prénom du dirigeant. */
  const premier =
    a.type === 'b2b'
      ? lieux.find((l) => l.prenomDirigeant) || lieux[0]
      : lieux
          .slice(0, APERCU)
          .reduce((m, l) => (nomCourt(l.nom).length < nomCourt(m.nom).length ? l : m));

  return Response.json({
    type: a.type,
    total: lieux.length,
    /* Le prénom des dirigeants ne sert qu'au message d'exemple : il ne part pas dans la liste. */
    lieux: lieux.map(({ prenomDirigeant, ...l }) => l),
    conversation: conversation(a, {
      nomLieu: premier.nom,
      villeLieu: premier.ville || ville,
      ville,
      prenom,
      entreprise,
      prenomDirigeant: premier.prenomDirigeant,
    }),
    partenaire: nomCourt(premier.nom),
    cible: a.cible,
  });
}
