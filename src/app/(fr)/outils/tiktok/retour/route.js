/** Retour de la connexion TikTok : vérifie l'état, échange le code contre un jeton, revient sur l'outil. */
import { NextResponse } from 'next/server';
import { autorise, echangerCode } from '@/lib/tiktok-server';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const base = new URL('/outils/tiktok', 'https://pulse.smatchroom.com');
  if (!autorise(request)) return new Response('Accès réservé.', { status: 403 });
  const p = request.nextUrl.searchParams;
  const etat = request.cookies.get('tt_etat')?.value;
  if (p.get('error')) { base.searchParams.set('erreur', p.get('error_description') || p.get('error')); return NextResponse.redirect(base); }
  if (!etat || p.get('state') !== etat || !p.get('code')) { base.searchParams.set('erreur', 'Connexion expirée, recommencez.'); return NextResponse.redirect(base); }
  try {
    await echangerCode(p.get('code'));
    base.searchParams.set('connecte', '1');
  } catch (e) {
    base.searchParams.set('erreur', e.message);
  }
  const res = NextResponse.redirect(base);
  res.cookies.delete('tt_etat');
  return res;
}
