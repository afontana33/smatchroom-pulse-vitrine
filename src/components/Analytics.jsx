'use client';

/**
 * Mesure d'audience Umami (auto-hébergée sur le VPS, tableau de bord sur
 * stats.smatchroom.com).
 *
 * Pourquoi elle existe : Search Console ne remonte que la recherche Google.
 * Le trafic Facebook, Instagram, LinkedIn, e-mail, direct et les réponses des
 * IA n'y apparaissent pas du tout. Sans cet outil, ce trafic n'est mesuré
 * nulle part.
 *
 * Pourquoi elle n'est PAS dans Tarteaucitron, contrairement au Meta Pixel :
 * Umami ne dépose aucun cookie et ne suit personne d'un site à l'autre. La
 * session est un hachage non réversible (IP + user-agent + identifiant du site,
 * tournant chaque jour), l'IP n'est jamais stockée, les données restent sur
 * notre serveur et ne partent chez aucune régie. C'est le périmètre exact de
 * l'exemption de consentement de la CNIL pour la mesure d'audience. Le jour où
 * l'un de ces points change (croisement avec le pixel, envoi à un tiers,
 * `identify` avec des données personnelles), l'exemption tombe et il faut la
 * basculer dans Tarteaucitron comme service refusable.
 * La page politique-cookies documente ce traceur : la mettre à jour avec ce
 * composant.
 *
 * Pourquoi le script est servi depuis /px/ et non depuis stats.smatchroom.com :
 * les bloqueurs de pub coupent les requêtes vers un domaine d'analytics tiers,
 * ce qui ferait disparaître une part du trafic (jusqu'à ~30 % selon l'audience).
 * En first-party, nginx relaie /px/script.js et /px/api/send vers le service
 * local (snippets/umami-collect.conf). Le tracker déduit l'endpoint du dossier
 * de son propre src : renommer /px/ d'un seul côté casse la collecte en silence.
 */

import Script from 'next/script';
import { useEffect } from 'react';

/** Site « SmatchRoom Pulse » dans Umami. Public par nature : il est dans le HTML. */
const UMAMI_WEBSITE_ID = '50b8aea2-3e28-4c6e-915c-fedcd3f98297';

/** Phase de capture : l'évènement part même si un handler arrête la propagation. */
const CAPTURE = true;

export default function Analytics() {
  useEffect(() => {
    const onClick = (event) => {
      // `umami` n'existe pas avant le chargement du script, et pas du tout si
      // un bloqueur a malgré tout filtré /px/. Un clic non mesuré est préférable
      // à une exception dans la page.
      if (typeof window.umami?.track !== 'function') return;

      const link = event.target?.closest?.('a[href]');
      if (!link) return;

      const href = link.getAttribute('href') || '';

      // Mêmes deux conversions que les régies (voir [ConversionEvents]) : le site
      // n'a ni formulaire, ni panier. `page` permet de savoir quelle page
      // déclenche les prises de rendez-vous, pas seulement combien il y en a.
      if (href.startsWith('tel:')) {
        window.umami.track('appel-telephone', { page: window.location.pathname });
        return;
      }

      if (href.includes('calendly.com')) {
        window.umami.track('rdv-calendly', { page: window.location.pathname });
      }
    };

    document.addEventListener('click', onClick, CAPTURE);
    return () => document.removeEventListener('click', onClick, CAPTURE);
  }, []);

  return (
    <Script
      src="/px/script.js"
      data-website-id={UMAMI_WEBSITE_ID}
      strategy="afterInteractive"
    />
  );
}
