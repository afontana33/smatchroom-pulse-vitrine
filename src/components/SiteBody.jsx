/**
 * Le `<body>` commun aux deux racines du site.
 *
 * Il y a deux root layouts, un par langue (src/app/(fr) et src/app/(en)) : la
 * seule chose qui les distingue est l'attribut `lang` du `<html>` et le bloc
 * `metadata`. Tout le reste (identité en données structurées, consentement,
 * conversions, mesure d'audience) est identique et vit ici, sinon un ajout fait
 * dans une langue serait oublié dans l'autre.
 *
 * L'ordre des composants de fin de page est celui de l'ancien layout unique et
 * compte : ConversionEvents avant Analytics avant CookieConsent.
 */

import Analytics from '@/components/Analytics';
import CookieConsent from '@/components/CookieConsent';
import ConversionEvents from '@/components/ConversionEvents';
import JsonLd from '@/components/JsonLd';
import { graph, organizationSchema, websiteSchema } from '@/lib/schema';

export default function SiteBody({ children }) {
  return (
    <body className="min-h-full flex flex-col">
      {/* Identité de l'entreprise et du site, sur toutes les pages. Les nœuds
          propres à une page (WebPage, Service, FAQPage, Breadcrumb) sont
          ajoutés par la page elle-même et se raccrochent à ces deux-là par
          leur `@id`. Ne pas dupliquer l'organisation dans une page : deux
          déclarations concurrentes de la même entité s'annulent. */}
      <JsonLd data={graph([organizationSchema(), websiteSchema()])} />
      {/* Le bandeau « leads B2B · marchés publics » a été retiré du haut de page :
          c'était un lien sortant vers un autre domaine placé avant même le titre,
          donc une fuite de trafic payé. Il vit maintenant en bas, dans le Footer,
          après que le visiteur a lu la page. Ne pas le remonter ici. */}
      {children}

      {/* Le Meta Pixel n'est plus chargé ici. Il est déclaré comme service
          Tarteaucitron dans CookieConsent et ne s'exécute qu'après acceptation.
          La variante <noscript> a été retirée : sans JavaScript, aucun
          consentement ne peut être recueilli, donc aucun traceur ne doit partir. */}
      {/* Conversions Meta (Lead, Contact) et Google Ads (Prise de rendez-vous).
          Inertes tant que le traceur correspondant n'a pas été autorisé :
          ConversionEvents ne fait rien si fbq ou gtag n'existe pas. */}
      <ConversionEvents />
      {/* Mesure d'audience Umami : sans consentement requis (cookieless,
          auto-hébergée), donc chargée directement et non via Tarteaucitron.
          Le raisonnement complet est dans le composant. */}
      <Analytics />
      <CookieConsent />
    </body>
  );
}
