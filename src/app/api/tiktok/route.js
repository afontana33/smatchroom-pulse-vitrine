/**
 * API de l'outil TikTok (réservé à l'équipe, cookie tt_outil).
 *   GET  ?action=connexion : redirige vers l'autorisation TikTok
 *   GET  ?action=infos     : compte connecté, options de publication (creator_info) et vidéos disponibles
 *   GET  ?action=statut&id : état d'une publication
 *   POST                   : publie une vidéo (choix faits par l'utilisateur dans la page)
 */
import { NextResponse } from 'next/server';
import { randomBytes } from 'node:crypto';
import { autorise, compte, infosCreateur, publier, REDIRECT_URI, SCOPES, statut, videosDisponibles } from '@/lib/tiktok-server';

export const dynamic = 'force-dynamic';
export const maxDuration = 120;

const refus = (msg, status = 400) => Response.json({ erreur: msg }, { status });

export async function GET(request) {
  const p = request.nextUrl.searchParams;
  const action = p.get('action');
  // ouverture de l'accès : /api/tiktok?action=acces&cle=… (une fois par navigateur)
  if (action === 'acces') {
    const cle = process.env.TIKTOK_OUTIL_CLE;
    if (!cle || p.get('cle') !== cle) return refus('Clé incorrecte.', 403);
    const res = NextResponse.redirect(new URL('/outils/tiktok', 'https://pulse.smatchroom.com'));
    res.cookies.set('tt_outil', cle, { httpOnly: true, secure: true, sameSite: 'lax', maxAge: 60 * 60 * 24 * 180, path: '/' });
    return res;
  }
  if (!autorise(request)) return refus('Accès réservé.', 403);
  try {
    if (action === 'connexion') {
      const etat = randomBytes(16).toString('hex');
      const u = new URL('https://www.tiktok.com/v2/auth/authorize/');
      u.searchParams.set('client_key', process.env.TIKTOK_CLIENT_KEY ?? '');
      u.searchParams.set('scope', SCOPES);
      u.searchParams.set('response_type', 'code');
      u.searchParams.set('redirect_uri', REDIRECT_URI);
      u.searchParams.set('state', etat);
      const res = NextResponse.redirect(u);
      res.cookies.set('tt_etat', etat, { httpOnly: true, secure: true, sameSite: 'lax', maxAge: 600, path: '/' });
      return res;
    }
    const c = await compte();
    if (action === 'infos') {
      if (!c) return Response.json({ connecte: false });
      const [createur, videos] = await Promise.all([infosCreateur(c), videosDisponibles()]);
      return Response.json({ connecte: true, createur, videos });
    }
    if (action === 'statut') {
      if (!c) return refus('Compte TikTok non connecté.');
      return Response.json(await statut(c, p.get('id')));
    }
    return refus('Action inconnue.');
  } catch (e) {
    return refus(e.message, 500);
  }
}

export async function POST(request) {
  if (!autorise(request)) return refus('Accès réservé.', 403);
  let b;
  try { b = await request.json(); } catch { return refus('Requête invalide.'); }
  if (!b?.url || !b?.confidentialite) return refus('Choisissez une vidéo et une visibilité.');
  if (!b?.accord) return refus('Acceptez la déclaration d’utilisation de la musique de TikTok.');
  try {
    const c = await compte();
    if (!c) return refus('Compte TikTok non connecté.');
    const createur = await infosCreateur(c);
    if (!(createur.privacy_level_options ?? []).includes(b.confidentialite)) return refus('Visibilité non autorisée pour ce compte.');
    const id = await publier(c, {
      url: b.url,
      titre: b.titre,
      confidentialite: b.confidentialite,
      sansCommentaires: createur.comment_disabled || !b.commentaires,
      sansDuo: createur.duet_disabled || !b.duo,
      sansCollage: createur.stitch_disabled || !b.collage,
      marqueCommerciale: b.commercial && b.maMarque,
      contenuSponsorise: b.commercial && b.sponsorise,
    });
    return Response.json({ publish_id: id });
  } catch (e) {
    return refus(e.message, 500);
  }
}
