'use client';

/**
 * Gestion du consentement aux traceurs (CMP).
 *
 * Tarteaucitron, auto-hébergé depuis `public/tarteaucitron/` : aucun appel à un
 * CDN ni à un éditeur de CMP tiers, donc aucun sous-traitant supplémentaire à
 * déclarer dans la politique de confidentialité.
 *
 * Ce que ce composant garantit, et qu'il ne faut pas casser :
 *
 *   1. Aucun traceur non essentiel n'est exécuté avant une action explicite.
 *      `highPrivacy: true` désactive le consentement implicite (pas de
 *      « en continuant votre navigation vous acceptez »), et ni le Meta Pixel
 *      ni le tag Google Ads ne sont dans le layout : ils n'existent que comme
 *      services Tarteaucitron, déclenchés par `job.push(…)` une fois le
 *      consentement donné.
 *   2. Il n'y a plus de variante `<noscript>` du pixel. Sans JavaScript, le
 *      consentement ne peut pas être recueilli, donc le traceur ne doit pas
 *      partir : l'absence de repli est le comportement correct, pas un oubli.
 *   3. « Tout refuser » et « Tout accepter » sont rendus par la même classe
 *      `.tarteaucitronCTAButton`, donc à parité de taille, de graisse et de
 *      contraste. Les surcharges de `globals.css` maintiennent cette parité :
 *      ne pas styler un seul des deux boutons.
 *   4. Le choix est révocable à tout moment via le lien « Gérer mes cookies »
 *      du footer, qui pointe sur `#cookies` (valeur de `hashtag`).
 *
 * Ajouter un traceur = ajouter son service dans `SERVICES` de
 * `scripts/sync-tarteaucitron.mjs`, le pousser dans `job` ici, ET l'ajouter au
 * tableau de `/politique-cookies`. Les trois doivent rester alignés.
 */

import { useEffect } from 'react';

const META_PIXEL_ID = '1726028198959218';

/* Tag Google Ads (gtag.js). Chargé par le service `googleads` du catalogue
   Tarteaucitron, jamais depuis le layout : la balise dépose `_gcl_au`, elle est
   donc soumise au consentement au même titre que le pixel Meta. Conséquence
   assumée : tant qu'aucun visiteur n'a accepté, le vérificateur de balise de
   Google Ads la déclare inactive. C'est le comportement attendu, pas une
   panne. */
const GOOGLE_ADS_ID = 'AW-18405700898';

/** Durée de conservation du choix. La CNIL recommande 6 mois au maximum. */
const CONSENT_LIFETIME_DAYS = 182;

/** Fragment d'URL qui rouvre le panneau. Utilisé par le lien du footer. */
export const CONSENT_HASH = '#cookies';

export default function CookieConsent() {
  useEffect(() => {
    if (document.getElementById('tarteaucitron-lib')) return;

    // Lus au parsing de tarteaucitron.min.js : doivent exister avant son chargement.
    window.tarteaucitronForceLanguage = 'fr';
    window.tarteaucitronExpireInDay = true;
    window.tarteaucitronForceExpire = CONSENT_LIFETIME_DAYS;

    // Le libellé par défaut du lien du bandeau est « Politique de confidentialité »
    // alors que privacyUrl pointe sur la politique cookies. On le renomme pour
    // que l'intitulé corresponde à la page réellement ouverte.
    window.tarteaucitronCustomText = {
      alertBigPrivacy:
        'Nous utilisons deux traceurs publicitaires, Meta et Google Ads, pour mesurer nos campagnes. Ils ne seront déposés que si vous les acceptez. Refuser ne dégrade aucune fonctionnalité du site.',
      privacyUrl: 'Voir la politique cookies',
    };

    const script = document.createElement('script');
    script.id = 'tarteaucitron-lib';
    script.src = '/tarteaucitron/tarteaucitron.min.js';
    script.async = true;

    script.onload = () => {
      const tac = window.tarteaucitron;
      if (!tac) return;

      tac.init({
        privacyUrl: '/politique-cookies',
        readmoreLink: '/politique-cookies',
        hashtag: CONSENT_HASH,
        cookieName: 'pulse_consent',

        orientation: 'bottom',
        showAlertSmall: false,
        showIcon: false,
        cookieslist: true,
        groupServices: false,
        closePopup: false,

        // Les deux CTA, au même niveau. Ne pas passer DenyAllCta à false.
        AcceptAllCta: true,
        DenyAllCta: true,
        highPrivacy: true,
        mandatory: true,
        mandatoryCta: false,

        moreInfoLink: true,
        removeCredit: false,
        useExternalCss: false,
        useExternalJs: false,
        adblocker: false,
        handleBrowserDNTRequest: false,

        // Modes « consentement » des régies : inutiles ici, et ils poussent des
        // signaux vers Google/Bing/Piano avant tout choix.
        googleConsentMode: false,
        bingConsentMode: false,
        pianoConsentMode: false,
        softConsentMode: false,
        partnersList: false,
      });

      tac.user.facebookpixelId = META_PIXEL_ID;
      tac.user.googleadsId = GOOGLE_ADS_ID;
      (tac.job = tac.job || []).push('facebookpixel', 'googleads');
    };

    document.head.appendChild(script);
  }, []);

  return null;
}
