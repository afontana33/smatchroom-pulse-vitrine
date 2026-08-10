'use client';

/**
 * Évènements standard Meta.
 *
 * Le site n'a ni formulaire, ni panier, ni paiement : les deux seules
 * conversions réelles sont le clic sur un lien Calendly (`Lead`) et le clic
 * sur le numéro de téléphone (`Contact`). N'ajouter d'autres évènements
 * standard que le jour où l'action correspondante existe vraiment sur le
 * site : un évènement qui ne se déclenche jamais, ou qui se déclenche sur
 * autre chose que ce qu'il annonce, dégrade l'optimisation des campagnes.
 *
 * Écoute déléguée sur `document` plutôt qu'un `onClick` par bouton : les CTA
 * Calendly sont répartis dans une quinzaine de composants (Nav, Hero, Packs,
 * Piliers, Footer, articles…). Un seul point d'écoute couvre tout, y compris
 * les CTA ajoutés plus tard, sans rien à recâbler.
 *
 * Le garde `typeof window.fbq !== 'function'` est la barrière de consentement :
 * `fbq` n'existe que si Tarteaucitron a chargé le pixel après acceptation
 * (voir [CookieConsent]). Sans consentement, ces clics ne partent nulle part.
 * Ne jamais remplacer ce garde par une file d'attente qui rejouerait les
 * évènements a posteriori.
 */

import { useEffect } from 'react';

/** Phase de capture : l'évènement part même si un handler arrête la propagation. */
const CAPTURE = true;

export default function PixelEvents() {
  useEffect(() => {
    const onClick = (event) => {
      if (typeof window.fbq !== 'function') return;

      const link = event.target?.closest?.('a[href]');
      if (!link) return;

      const href = link.getAttribute('href') || '';

      if (href.startsWith('tel:')) {
        window.fbq('track', 'Contact', {
          content_name: 'appel-telephone',
          content_category: window.location.pathname,
        });
        return;
      }

      if (href.includes('calendly.com')) {
        window.fbq('track', 'Lead', {
          content_name: 'calendly-30min',
          content_category: window.location.pathname,
        });
      }
    };

    document.addEventListener('click', onClick, CAPTURE);
    return () => document.removeEventListener('click', onClick, CAPTURE);
  }, []);

  return null;
}
