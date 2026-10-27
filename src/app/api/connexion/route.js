/**
 * Connexion du WhatsApp d'un agent client, sans visio (demande du 27/10/2026).
 * GET  /api/connexion?token=… -> { etat: 'connecte' | 'qr' | 'attente', qr? } (QR renouvelé à chaque appel)
 * POST /api/connexion { token, numero } -> { code } (liaison par numéro de téléphone, sur un seul téléphone)
 */
import { codeLiaison, etatConnexion, instanceParConnexion } from '@/lib/bienvenue-server';
import { versE164 } from '@/lib/simulateur-whatsapp';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const token = new URL(request.url).searchParams.get('token');
  const x = await instanceParConnexion(token).catch(() => null);
  if (!x) return Response.json({ erreur: 'Lien invalide.' }, { status: 404 });
  return Response.json(await etatConnexion(x.c));
}

export async function POST(request) {
  const b = await request.json().catch(() => ({}));
  const x = await instanceParConnexion(b?.token).catch(() => null);
  if (!x) return Response.json({ erreur: 'Lien invalide.' }, { status: 404 });
  const num = versE164(b?.numero);
  if (num.length < 11) return Response.json({ erreur: 'Numéro invalide.' }, { status: 400 });
  const code = await codeLiaison(x.c, num).catch(() => null);
  if (!code) return Response.json({ erreur: 'Impossible d’obtenir un code pour l’instant. Utilisez le QR code ou réessayez dans une minute.' }, { status: 502 });
  return Response.json({ code });
}
