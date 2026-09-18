/**
 * Données structurées schema.org.
 *
 * Ce que ce fichier ne fait volontairement pas :
 *   - aucun `aggregateRating` ni `review`. On n'a pas de flux d'avis fiable
 *     (quota Elfsight mort, scraping Google bloqué depuis le VPS), et inventer
 *     une note est à la fois une violation des règles Google sur les extraits
 *     enrichis et un mensonge commercial. Le jour où les avis Google sont
 *     récupérables proprement, c'est ici qu'ils s'ajoutent, et nulle part
 *     ailleurs.
 *   - aucune promesse de résultat, aucune durée de mise en place inventée.
 *
 * Toutes les valeurs affichables (prix, téléphone, adresse) viennent de
 * lib/contact.js ou des données de page : une donnée structurée qui contredit
 * la page visible fait perdre l'extrait enrichi au lieu de le gagner.
 *
 * `@id` est stable et fondé sur l'URL : c'est ce qui permet aux moteurs de
 * recoller l'organisation, le site et les services au lieu de lire trois
 * entités sans rapport.
 */

import { GEO, LEGAL, OPENING, SITE_NAME, SITE_URL, TEL_E164 } from '@/lib/contact';

export const ORG_ID = `${SITE_URL}/#organization`;
export const SITE_ID = `${SITE_URL}/#website`;

const POSTAL_ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: LEGAL.street,
  postalCode: LEGAL.postalCode,
  addressLocality: LEGAL.city,
  addressRegion: LEGAL.region,
  addressCountry: LEGAL.country,
};

/* Départements réellement couverts en intervention commerciale. Sert de
   `areaServed` par défaut : une agence qui déclare « la France entière » ne
   ressort sur aucune requête locale. */
export const AREA_SERVED = [
  { name: 'Gironde', type: 'AdministrativeArea' },
  { name: 'Landes', type: 'AdministrativeArea' },
  { name: 'Pyrénées-Atlantiques', type: 'AdministrativeArea' },
  { name: 'Lot-et-Garonne', type: 'AdministrativeArea' },
  { name: 'Dordogne', type: 'AdministrativeArea' },
  { name: 'Charente-Maritime', type: 'AdministrativeArea' },
  { name: 'France', type: 'Country' },
];

function areaServed(extra = []) {
  return [
    ...extra.map((name) => ({ '@type': 'City', name })),
    ...AREA_SERVED.map((a) => ({ '@type': a.type, name: a.name })),
  ];
}

/**
 * L'organisation. `ProfessionalService` plutôt que `Organization` seule : c'est
 * un sous-type de LocalBusiness, donc éligible aux résultats locaux, tout en
 * restant exact (prestation de services, pas de point de vente ouvert au
 * public).
 */
export function organizationSchema() {
  return {
    '@type': ['ProfessionalService', 'Organization'],
    '@id': ORG_ID,
    name: SITE_NAME,
    legalName: LEGAL.legalName,
    url: SITE_URL,
    /* Logo de l'organisation, lu par Google pour le panneau de connaissance et
       les résultats de marque. Contraintes de Google : URL absolue, image
       accessible aux robots, fond opaque et au moins 112 px de côté. Le
       pictogramme détouré ne convient pas ici (transparence), c'est la version
       aplatie sur blanc qui est servie. */
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/brand/pulse-logo-512.png`,
      width: 512,
      height: 512,
    },
    image: `${SITE_URL}/brand/pulse-logo-512.png`,
    description:
      "Agence d'automatisation et d'intelligence artificielle pour les artisans, les TPE et les PME : agents IA qui prospectent et répondent, sites et fiches établissement Google, acquisition Meta.",
    telephone: TEL_E164,
    address: POSTAL_ADDRESS,
    geo: { '@type': 'GeoCoordinates', latitude: GEO.latitude, longitude: GEO.longitude },
    areaServed: areaServed(),
    vatID: LEGAL.vat,
    taxID: LEGAL.siret,
    identifier: [
      { '@type': 'PropertyValue', name: 'SIREN', value: LEGAL.siren },
      { '@type': 'PropertyValue', name: 'SIRET', value: LEGAL.siret },
      { '@type': 'PropertyValue', name: 'NAF', value: LEGAL.naf },
    ],
    /* Devise et fourchette de prix : signal de qualification pour les moteurs,
       cohérent avec les prix affichés (20 € à 200 € par mois sur les offres à
       prix ferme, l'Agent Clients B2B étant sur devis). */
    priceRange: '€€',
    currenciesAccepted: 'EUR',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: OPENING.days,
        opens: OPENING.opens,
        closes: OPENING.closes,
      },
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: TEL_E164,
        contactType: 'sales',
        areaServed: 'FR',
        /* L'anglais est déclaré depuis l'ouverture de /en : un site anglais
           dont le point de contact annonce « français uniquement » se
           contredit. À retirer si la version anglaise est un jour dépubliée. */
        availableLanguage: ['fr', 'en'],
      },
    ],
    sameAs: ['https://smatchroom.com'],
    knowsAbout: [
      "Agent IA de prospection",
      "Automatisation commerciale",
      "Prospection WhatsApp et email",
      "Référencement local et fiche établissement Google",
      "Publicité Meta pour artisans",
      "Digitalisation des TPE du bâtiment",
    ],
  };
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    /* Les deux langues du site, déclarées ensemble. Ce nœud porte un `@id`
       unique et se retrouve donc à l'identique sur une page française et sur
       une page anglaise : y mettre la langue de la page courante ferait deux
       déclarations contradictoires de la même entité. La langue d'une page
       précise est portée par son nœud WebPage. */
    inLanguage: ['fr-FR', 'en'],
    publisher: { '@id': ORG_ID },
  };
}

/**
 * Un service vendu, avec son prix réel.
 *
 * `setup` est un montant unique et `monthly` un abonnement : les deux sont
 * déclarés comme deux offres distinctes du même service, avec
 * `billingDuration`/`unitText` pour le mensuel. Déclarer le seul prix de
 * fabrication ferait remonter « à partir de 300 € » sans le récurrent, ce qui
 * est trompeur.
 *
 * `setupFrom` : la fabrication est un plancher et non un prix ferme. On sort
 * alors un `minPrice` au lieu d'un `price`, sinon le moteur annonce un tarif
 * fixe que la page ne promet pas. Un `monthly` absent ne produit aucune offre
 * mensuelle : c'est le cas « sur devis », et inventer un montant pour remplir
 * le champ serait un prix faux dans une donnée structurée.
 */
export function serviceSchema({ name, description, url, setup, setupFrom, monthly, cities = [] }) {
  const offers = [];
  if (setup != null) {
    offers.push({
      '@type': 'Offer',
      name: 'Fabrication',
      priceCurrency: 'EUR',
      valueAddedTaxIncluded: false,
      description: 'Frais de fabrication, une seule fois',
      ...(setupFrom
        ? {
            priceSpecification: {
              '@type': 'PriceSpecification',
              minPrice: String(setup),
              priceCurrency: 'EUR',
              valueAddedTaxIncluded: false,
            },
          }
        : { price: String(setup) }),
    });
  }
  if (monthly != null) {
    offers.push({
      '@type': 'Offer',
      name: 'Pilotage mensuel',
      priceCurrency: 'EUR',
      valueAddedTaxIncluded: false,
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: String(monthly),
        priceCurrency: 'EUR',
        billingIncrement: 1,
        unitCode: 'MON',
        unitText: 'mois',
      },
    });
  }

  return {
    '@type': 'Service',
    name,
    description,
    ...(url ? { url, '@id': `${url}#service` } : {}),
    serviceType: name,
    provider: { '@id': ORG_ID },
    areaServed: areaServed(cities),
    ...(offers.length ? { offers } : {}),
  };
}

export function faqSchema(questions) {
  return {
    '@type': 'FAQPage',
    mainEntity: questions.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

/** Fil d'Ariane. `items` : [{ name, url }], la page courante incluse. */
export function breadcrumbSchema(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

/** `lang` : code hreflang de la page. Le défaut couvre tout le site français. */
export function webPageSchema({ url, name, description, breadcrumb, lang = 'fr-FR' }) {
  return {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: lang,
    isPartOf: { '@id': SITE_ID },
    about: { '@id': ORG_ID },
    ...(breadcrumb ? { breadcrumb } : {}),
  };
}

export function articleSchema({ url, title, description, publishedAt, updatedAt, section }) {
  return {
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: title,
    description,
    url,
    inLanguage: 'fr-FR',
    ...(publishedAt ? { datePublished: new Date(publishedAt).toISOString() } : {}),
    ...(updatedAt || publishedAt
      ? { dateModified: new Date(updatedAt || publishedAt).toISOString() }
      : {}),
    ...(section ? { articleSection: section } : {}),
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    isPartOf: { '@id': SITE_ID },
  };
}

export function itemListSchema(items) {
  return {
    '@type': 'ItemList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      url: it.url,
    })),
  };
}

/** Assemble un graphe unique. Un seul bloc par page, pas dix balises éparses. */
export function graph(nodes) {
  return { '@context': 'https://schema.org', '@graph': nodes.filter(Boolean) };
}
