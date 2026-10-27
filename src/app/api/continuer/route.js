/**
 * POST /api/continuer { token, choix, motif?, detail?, ajustement? } : réponse du client pour le mois suivant
 * (lien envoyé 3 jours avant l'échéance par agent-chasseur/renouvellements.mts).
 * - oui : facture Qonto du mois (avec, si le client voulait arrêter, l'ajustement promis à appliquer).
 * - rappel : le client veut en parler avant de décider ; Alexis l'appelle, le lien reste ouvert.
 * - pause : agent arrêté à l'échéance, relance automatique un mois plus tard.
 * - non : agent coupé à l'échéance.
 * Le motif d'arrêt est toujours demandé avant (demande du 27/10/2026 : savoir pourquoi et essayer de garder le client).
 */
import {
  alerteCourte,
  BIC,
  emailVirementClient,
  euros,
  facturerMois,
  IBAN,
  lireRenouvellement,
  majRenouvellement,
  OFFRES,
  repondreRenouvellement,
  ttc,
} from '@/lib/bienvenue-server';

export const dynamic = 'force-dynamic';

const MOTIFS = {
  resultats: 'pas assez de résultats',
  prix: 'trop cher',
  temps: 'pas le temps de rappeler les contacts',
  carnet: 'carnet plein / pas besoin en ce moment',
  autre: 'autre raison',
};
const AJUSTEMENTS = {
  cible: 'changer la cible, la zone ou le message',
  rythme: 'ralentir le rythme des envois',
};
const STATUTS = { oui: 'accepte', non: 'refuse', rappel: 'rappel', pause: 'pause' };

export async function POST(request) {
  let b;
  try {
    b = await request.json();
  } catch {
    return Response.json({ erreur: 'Requête invalide.' }, { status: 400 });
  }
  const r = await lireRenouvellement(b?.token);
  if (!r) return Response.json({ erreur: 'Lien invalide ou expiré.' }, { status: 404 });
  const choix = STATUTS[b?.choix] ? b.choix : null;
  if (!choix) return Response.json({ erreur: 'Choix invalide.' }, { status: 400 });
  const motif = MOTIFS[b?.motif] ? b.motif : r.motif || null;
  if (choix !== 'oui' && !motif) return Response.json({ erreur: 'Dites-nous pourquoi, en un clic.' }, { status: 400 });
  const detail = String(b?.detail || '').trim().slice(0, 1000) || null;
  const ajustement = AJUSTEMENTS[b?.ajustement] ? b.ajustement : null;

  const extra = {};
  if (motif) extra.motif = motif;
  if (detail) extra.motif_detail = detail;
  if (ajustement || choix === 'rappel' || choix === 'pause') extra.retention = ajustement || choix;
  if ((await repondreRenouvellement(r.id, STATUTS[choix], extra)) === false) {
    return Response.json({ erreur: 'Vous avez déjà répondu, merci.' }, { status: 409 });
  }

  const o = r.pulse_onboarding || {};
  const d = o.donnees || {};
  const tel = o.telephone ? ` · ${o.telephone}` : '';
  const pourquoi = motif ? `\nPourquoi : ${MOTIFS[motif]}${detail ? ` — « ${detail} »` : ''}` : '';
  const echeance = new Date(`${r.echeance}T12:00:00`).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });

  if (choix === 'non') {
    await alerteCourte(`🛑 ${o.entreprise} arrête (échéance du ${echeance}).${pourquoi}\nL'agent sera coupé à l'échéance. Un appel peut encore le faire changer d'avis${tel}.`);
    return Response.json({ ok: true, choix });
  }
  if (choix === 'rappel') {
    await alerteCourte(`📞 À appeler avant le ${echeance} : ${o.entreprise}${tel} hésite à continuer.${pourquoi}\nSon lien reste ouvert : https://pulse.smatchroom.com/continuer/${r.token}`);
    return Response.json({ ok: true, choix });
  }
  if (choix === 'pause') {
    await alerteCourte(`⏸️ ${o.entreprise} met son agent en pause un mois à partir du ${echeance}.${pourquoi}\nRelance automatique dans un mois.`);
    return Response.json({ ok: true, choix });
  }

  let fact = null;
  try {
    if (!o.qonto_client_id) throw new Error('client Qonto inconnu');
    fact = await facturerMois(o.qonto_client_id, d);
    await majRenouvellement(r.id, { qonto_invoice_id: fact.id });
    if (fact.envoyeeParQonto === false) await emailVirementClient(d, { offre: 'agent' }, fact.numero, fact.url).catch(() => null);
    const apresAppel = r.statut === 'rappel' ? `\n💪 Client gardé après ton appel (il hésitait : ${MOTIFS[motif] || '?'}).` : '';
    const garde = apresAppel || (ajustement ? `\n💪 Client gardé (il voulait arrêter : ${MOTIFS[motif] || '?'}${detail ? ` — « ${detail} »` : ''}). Promis : ${AJUSTEMENTS[ajustement]}, à faire cette semaine.` : '');
    await alerteCourte(`🔁 ${o.entreprise} continue : facture ${fact.numero || ''} du mois (${euros(ttc(OFFRES.agent.ht))} TTC) ${fact.envoyeeParQonto ? 'envoyée par Qonto' : 'créée, coordonnées envoyées par email'}.${garde}`);
  } catch (e) {
    await majRenouvellement(r.id, { statut: 'erreur', erreur: String(e?.message).slice(0, 300) });
    await alerteCourte(`⚠️ ${o.entreprise} veut continuer mais la facture n'a pas pu être créée : ${String(e?.message).slice(0, 150)}`);
  }
  return Response.json({
    ok: true,
    choix,
    paiement: { montant: euros(ttc(OFFRES.agent.ht)), ht: euros(OFFRES.agent.ht), iban: IBAN, bic: BIC, reference: fact?.numero || o.entreprise },
  });
}
