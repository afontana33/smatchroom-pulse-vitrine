/**
 * Coordonnées et identité légale, source unique.
 *
 * Ces valeurs étaient dupliquées dans Nav.jsx, Footer.jsx, les pages légales et
 * chaque composant qui affiche un bouton Calendly. Elles servent maintenant
 * aussi à alimenter les données structurées (lib/schema.js), et une donnée
 * structurée qui contredit la page visible est pire que pas de donnée du tout :
 * d'où la source unique.
 *
 * Module sans « use client » et sans dépendance : importable depuis un composant
 * serveur comme depuis un composant client.
 */

export const TEL_DISPLAY = '07 71 48 76 98';
export const TEL_HREF = 'tel:+33771487698';
export const TEL_E164 = '+33771487698';

/* Format affiché sur les pages anglaises. Le format national français n'est
   pas composable depuis l'étranger : un visiteur qui lit « 07 71 … » sur une
   page en anglais et tape le numéro tel quel n'arrive nulle part. Le lien
   `tel:` est le même dans les deux langues, il porte déjà l'indicatif. */
export const TEL_DISPLAY_INTL = '+33 7 71 48 76 98';

export const CALENDLY = 'https://calendly.com/a-fontana-smatchroom/30min';

export const SITE_URL = 'https://pulse.smatchroom.com';
export const SITE_NAME = 'SmatchRoom Pulse';

/* Identité de la SAS, reprise à l'identique des mentions légales et du Footer. */
export const LEGAL = {
  legalName: 'SMATCHROOM SAS',
  street: '5 rue Fénelon',
  postalCode: '33000',
  city: 'Bordeaux',
  region: 'Nouvelle-Aquitaine',
  country: 'FR',
  siren: '989 883 509',
  siret: '989 883 509 00014',
  vat: 'FR01989883509',
  naf: '62.01Z',
};

/* Coordonnées de la mairie de Bordeaux : le point de référence du rayon
   d'intervention déclaré dans les données structurées. Ce n'est pas la position
   exacte du siège, et ça n'a pas à l'être : `areaServed` décrit une zone
   commerciale, pas un point de vente où le public se déplace. */
export const GEO = { latitude: 44.8378, longitude: -0.5792 };

export const OPENING = {
  days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  opens: '09:00',
  closes: '19:00',
};
