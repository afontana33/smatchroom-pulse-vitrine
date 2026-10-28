/**
 * POST /api/meta-lead (28/10/2026) : prospect du formulaire de pub Meta, envoyé par l'Apps Script
 * de la feuille Google « Pulse Meta Prospect » (outils/meta-lead-apps-script.js).
 * En-tête x-token = META_LEAD_TOKEN (.env du site). Corps : { id, nom, telephone, email, secteur, taille, prospection }.
 * Réponse : { etat: 'envoye' | 'deja' | 'invalide' | 'test' }.
 */
import { timingSafeEqual } from 'node:crypto';
import { engagerFormulaire } from '@/lib/simulateur-whatsapp';

export const dynamic = 'force-dynamic';

function autorise(request) {
  const attendu = process.env.META_LEAD_TOKEN || '';
  const recu = request.headers.get('x-token') || '';
  if (attendu.length < 16 || recu.length !== attendu.length) return false;
  return timingSafeEqual(Buffer.from(recu), Buffer.from(attendu));
}

export async function POST(request) {
  if (!autorise(request)) return Response.json({ erreur: 'non autorisé' }, { status: 401 });
  let p;
  try {
    p = await request.json();
  } catch {
    return Response.json({ erreur: 'corps invalide' }, { status: 400 });
  }
  const tel = String(p?.telephone || '').replace(/^p:/, '');
  if (/test lead|dummy/i.test(tel) || /test lead|dummy/i.test(String(p?.nom || ''))) return Response.json({ etat: 'test' });
  const etat = await engagerFormulaire({ ...p, telephone: tel }).catch(() => 'invalide');
  return Response.json({ etat });
}
