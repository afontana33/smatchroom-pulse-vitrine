/**
 * Racine anglaise. Voir src/app/(fr)/layout.js pour le raisonnement sur les
 * deux racines et sur l'attribut `lang`.
 *
 * Périmètre volontairement restreint à une page, la landing `/en`. Le reste
 * du site vise des requêtes françaises sur des villes françaises (pages par
 * ville et par métier, blog) ; les traduire produirait des pages sans
 * audience, que Google traite comme du remplissage. Les documents légaux
 * restent en français, seule version qui fait foi.
 *
 * Les textes anglais ne sont pas des traductions mot à mot du français : la
 * cible n'est pas la même. Le site français parle d'abord à l'artisan, la
 * version anglaise s'adresse à des entreprises qui vendent à des entreprises.
 */

import SiteBody from '@/components/SiteBody';
import { fontVariables } from '@/lib/fonts';
import '../globals.css';

export const metadata = {
  title: 'B2B prospecting agents for sales teams · SmatchRoom Pulse',
  description:
    'We build and run the AI agent that works your B2B market: custom database, personalised outreach, need and budget qualified before your reps step in.',
  metadataBase: new URL('https://pulse.smatchroom.com'),
  openGraph: {
    title: 'SmatchRoom Pulse · We go and find your customers',
    description:
      'A digital sales rep, built for your market and run by us. Custom database, outreach in your name, qualified handover to your sales team.',
    url: 'https://pulse.smatchroom.com/en',
    siteName: 'SmatchRoom Pulse',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function EnglishRootLayout({ children }) {
  return (
    <html lang="en" className={`${fontVariables} h-full antialiased`}>
      <SiteBody>{children}</SiteBody>
    </html>
  );
}
