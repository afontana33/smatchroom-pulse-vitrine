'use client';

/**
 * Évènements de conversion, Meta et Google Ads.
 *
 * Le site n'a ni formulaire, ni panier, ni paiement : les deux seules
 * conversions réelles sont le clic sur un lien Calendly et le clic sur le
 * numéro de téléphone. N'ajouter d'autres évènements que le jour où l'action
 * correspondante existe vraiment sur le site : un évènement qui ne se déclenche
 * jamais, ou qui se déclenche sur autre chose que ce qu'il annonce, dégrade
 * l'optimisation des campagnes.
 *
 * Écoute déléguée sur `document` plutôt qu'un `onClick` par bouton : les CTA
 * Calendly sont répartis dans une vingtaine d'ancres (Nav, Hero, Packs,
 * Piliers, Footer, articles…). Un seul point d'écoute couvre tout, y compris
 * les CTA ajoutés plus tard, sans rien à recâbler.
 *
 * Les gardes `typeof window.fbq/gtag !== 'function'` sont la barrière de
 * consentement : ni `fbq` ni `gtag` n'existent tant que Tarteaucitron n'a pas
 * chargé le traceur correspondant après acceptation (voir [CookieConsent]).
 * Les deux régies sont testées séparément, parce que le réglage détaillé du
 * bandeau permet d'en accepter une et de refuser l'autre. Ne jamais remplacer
 * ces gardes par une file d'attente qui rejouerait les évènements a posteriori.
 */

import { useEffect } from 'react';

/** Phase de capture : l'évènement part même si un handler arrête la propagation. */
const CAPTURE = true;

/**
 * Action de conversion « Prise de rendez-vous » du compte Google Ads.
 *
 * Le snippet fourni par Google enveloppe l'appel dans `gtag_report_conversion`,
 * avec un `event_callback` qui retarde la navigation le temps que le ping
 * parte, et un `return false` sur le lien. Rien de tout cela ici : les vingt
 * ancres Calendly du site portent `target="_blank"`, la page courante n'est
 * donc jamais déchargée et le ping a tout le temps d'aboutir. Le jour où un CTA
 * Calendly naviguerait dans l'onglet courant, il faudrait rétablir le callback,
 * sinon la conversion se perdrait une fois sur deux.
 */
const GOOGLE_ADS_RDV = 'AW-18405700898/s7YiCIvYxOYcEKLqwshE';

export default function ConversionEvents() {
  useEffect(() => {
    const onClick = (event) => {
      const link = event.target?.closest?.('a[href]');
      if (!link) return;

      const href = link.getAttribute('href') || '';
      const page = window.location.pathname;

      if (href.startsWith('tel:')) {
        if (typeof window.fbq === 'function') {
          window.fbq('track', 'Contact', {
            content_name: 'appel-telephone',
            content_category: page,
          });
        }
        /* Pas d'équivalent Google Ads : le compte n'a qu'une action de
           conversion, « Prise de rendez-vous », et un appel n'en est pas un.
           Créer l'action côté Google Ads avant d'ajouter un envoi ici, sinon le
           ping est rejeté et la conversion n'apparaît nulle part. */
        return;
      }

      if (href.includes('calendly.com')) {
        if (typeof window.fbq === 'function') {
          window.fbq('track', 'Lead', {
            content_name: 'calendly-30min',
            content_category: page,
          });
        }
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'conversion', { send_to: GOOGLE_ADS_RDV });
        }
      }
    };

    document.addEventListener('click', onClick, CAPTURE);
    return () => document.removeEventListener('click', onClick, CAPTURE);
  }, []);

  return null;
}
