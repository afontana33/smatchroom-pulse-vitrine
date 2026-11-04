/**
 * Session de Jarvis.
 * GET  /api/jarvis/session -> { connecte, configure }
 * POST /api/jarvis/session { motdepasse } -> pose le cookie de session si le mot de passe est bon
 */
import { cookieSession, jarvisConfigure, motDePasseValide, sessionValide } from '@/lib/jarvis-auth';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  return Response.json({ connecte: sessionValide(request), configure: jarvisConfigure() }, { headers: { 'cache-control': 'no-store' } });
}

export async function POST(request) {
  const b = await request.json().catch(() => ({}));
  if (jarvisConfigure() === false) return Response.json({ erreur: 'Jarvis n’est pas encore configuré sur le serveur.' }, { status: 503 });
  if (motDePasseValide(b?.motdepasse) === false) {
    await new Promise((r) => setTimeout(r, 1200)); // freine les essais à répétition
    return Response.json({ erreur: 'Mot de passe incorrect.' }, { status: 401 });
  }
  return Response.json({ ok: true }, { headers: { 'set-cookie': cookieSession(), 'cache-control': 'no-store' } });
}
