/**
 * Ouvre une conversation vocale avec l'agent Jarvis (ElevenLabs).
 * L'agent est privé : le serveur demande une URL signée à usage unique avec la
 * clé ElevenLabs, qui ne quitte jamais le serveur.
 * GET /api/jarvis/signed-url -> { signedUrl }
 */
import { sessionValide } from '@/lib/jarvis-auth';

export const dynamic = 'force-dynamic';

const AGENT = process.env.JARVIS_AGENT_ID || 'agent_4901m6m0na15ft4s24bv7mc0xz8z';

export async function GET(request) {
  if (sessionValide(request) === false) return Response.json({ erreur: 'Session expirée.' }, { status: 401 });
  const cle = process.env.ELEVENLABS_API_KEY || '';
  if (cle === '') return Response.json({ erreur: 'Clé ElevenLabs absente sur le serveur.' }, { status: 503 });
  try {
    const r = await fetch(`https://api.elevenlabs.io/v1/convai/conversation/get-signed-url?agent_id=${encodeURIComponent(AGENT)}`, {
      headers: { 'xi-api-key': cle },
      cache: 'no-store',
      signal: AbortSignal.timeout(15000),
    });
    const j = await r.json().catch(() => ({}));
    if (r.ok === false || !j.signed_url) {
      console.log(`[jarvis] URL signée refusée : ${r.status}`);
      return Response.json({ erreur: 'ElevenLabs a refusé l’ouverture de la conversation.' }, { status: 502 });
    }
    return Response.json({ signedUrl: j.signed_url }, { headers: { 'cache-control': 'no-store' } });
  } catch (e) {
    console.log(`[jarvis] ElevenLabs injoignable : ${e.message}`);
    return Response.json({ erreur: 'ElevenLabs ne répond pas.' }, { status: 504 });
  }
}
