/**
 * Tableau de bord de Jarvis : le point du jour (tâches, alertes, agents clients, pouls des systèmes).
 * Réservé à la session Jarvis. Le serveur interroge Supabase avec sa propre clé d'accès
 * (JARVIS_ETAT_CLE dans .env.local), qui ne quitte jamais le serveur.
 * GET /api/jarvis/etat -> le JSON de public.jarvis_etat
 */
import { sessionValide } from '@/lib/jarvis-auth';

export const dynamic = 'force-dynamic';

const URL_SB = process.env.JARVIS_SUPABASE_URL || 'https://obipcpievkvrikbrgfrk.supabase.co';
const CLE_PUBLIQUE = process.env.JARVIS_SUPABASE_PUBLISHABLE || 'sb_publishable_W7PPIOO4aQPPzt6jKAU0fg_Lp0bNFJY';

export async function GET(request) {
  if (sessionValide(request) === false) return Response.json({ erreur: 'Session expirée.' }, { status: 401 });
  const cle = process.env.JARVIS_ETAT_CLE || '';
  if (cle === '') return Response.json({ erreur: 'Tableau de bord non configuré.' }, { status: 503 });
  try {
    const r = await fetch(`${URL_SB}/rest/v1/rpc/jarvis_etat`, {
      method: 'POST',
      headers: { apikey: CLE_PUBLIQUE, 'content-type': 'application/json' },
      body: JSON.stringify({ p_cle: cle }),
      cache: 'no-store',
      signal: AbortSignal.timeout(15000),
    });
    if (r.ok === false) {
      console.log(`[jarvis] tableau de bord refusé : ${r.status}`);
      return Response.json({ erreur: 'Données indisponibles.' }, { status: 502 });
    }
    return Response.json(await r.json(), { headers: { 'cache-control': 'no-store' } });
  } catch (e) {
    console.log(`[jarvis] Supabase injoignable : ${e.message}`);
    return Response.json({ erreur: 'Données indisponibles.' }, { status: 504 });
  }
}
