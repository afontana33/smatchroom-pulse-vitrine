/**
 * POST /api/continuer { token, choix: 'oui' | 'non' } : accord du client pour le mois suivant
 * (lien envoyé 3 jours avant l'échéance par agent-chasseur/renouvellements.mts).
 * Oui : facture Qonto du mois. Non : l'agent sera coupé à l'échéance. Alexis est prévenu.
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

export async function POST(request) {
  let b;
  try {
    b = await request.json();
  } catch {
    return Response.json({ erreur: 'Requête invalide.' }, { status: 400 });
  }
  const r = await lireRenouvellement(b?.token);
  if (!r) return Response.json({ erreur: 'Lien invalide ou expiré.' }, { status: 404 });
  const choix = b?.choix === 'oui' ? 'accepte' : b?.choix === 'non' ? 'refuse' : null;
  if (!choix) return Response.json({ erreur: 'Choix invalide.' }, { status: 400 });
  if ((await repondreRenouvellement(r.id, choix)) === false) {
    return Response.json({ erreur: 'Vous avez déjà répondu, merci.' }, { status: 409 });
  }
  const o = r.pulse_onboarding || {};
  const d = o.donnees || {};
  if (choix === 'refuse') {
    await alerteCourte(`🛑 ${o.entreprise} ne renouvelle pas (échéance du ${r.echeance}). L'agent sera coupé à l'échéance.`);
    return Response.json({ ok: true, choix });
  }
  let fact = null;
  try {
    if (!o.qonto_client_id) throw new Error('client Qonto inconnu');
    fact = await facturerMois(o.qonto_client_id, d);
    await majRenouvellement(r.id, { qonto_invoice_id: fact.id });
    if (fact.envoyeeParQonto === false) await emailVirementClient(d, { offre: 'agent' }, fact.numero, fact.url).catch(() => null);
    await alerteCourte(`🔁 ${o.entreprise} continue : facture ${fact.numero || ''} du mois (${euros(ttc(OFFRES.agent.ht))} TTC) ${fact.envoyeeParQonto ? 'envoyée par Qonto' : 'créée, coordonnées envoyées par email'}.`);
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
