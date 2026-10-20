/**
 * Miroir numérique des prix, pour les données structurées uniquement.
 *
 * ⚠ Ce fichier n'est JAMAIS affiché. Exception depuis le 20/10/2026 :
 * PACKS_LANCEMENT et META_OFFERS sont aussi lus pour l'affichage
 * (PacksLancement.jsx, Piliers.jsx, /publicite-facebook-instagram). Les autres
 * prix visibles restent dans `Piliers.jsx` (les trois briques),
 * `AgentClients.jsx` (l'offre B2B) et `AutresAgents.jsx` (les cinq agents
 * complémentaires). Une correction de prix se fait donc à deux endroits : la
 * source d'affichage, et ici.
 *
 * Pourquoi ce doublon plutôt qu'un import depuis les composants : les
 * composants portent des chaînes destinées à l'œil (« dès 490 € HT
 * de mise en place »), pas des nombres. Les
 * parser pour schema.org donnerait un code fragile qui casse au premier
 * changement de formulation, et un prix faux dans une donnée structurée fait
 * perdre l'extrait enrichi.
 *
 * Les montants sont hors taxes, en euros.
 */

/* Séparateur de milliers à la française : « 1 800 » et non « 1800 ». Le reste du
   site écrit les montants à la main dans le JSX, d'où ce formateur pour les
   pages qui les affichent depuis ces données. */
export const eur = (n) => n.toLocaleString('fr-FR');

/* Chaînes prêtes à l'affichage pour les pages qui rendent les prix depuis ces
   données. Elles passent par ici plutôt que d'écrire le montant elles-mêmes :
   sans ça, chacune réinvente le « à partir de » et le « sur devis », et on
   finit avec deux formulations pour un même prix.

   La version anglaise (/en) lit les mêmes montants : seules les chaînes
   changent, jamais les nombres. C'est ce qui garantit qu'une correction de
   prix ne peut pas laisser une des deux langues en arrière. Séparateur et
   position du symbole suivent chaque langue : « 1 800 € HT » en français,
   « €1,800 excl. VAT » en anglais. */
const FORMAT = {
  fr: {
    num: (n) => n.toLocaleString('fr-FR'),
    setup: (montant, from) => `${from ? 'à partir de ' : ''}${montant}\u00a0€\u00a0HT`,
    monthly: (montant) =>
      montant === null ? 'mensualité sur devis' : `${montant}\u00a0€\u00a0HT\u00a0/\u00a0mois`,
  },
  en: {
    num: (n) => n.toLocaleString('en-GB'),
    setup: (montant, from) => `${from ? 'from ' : ''}€${montant} excl.\u00a0VAT`,
    monthly: (montant) =>
      montant === null ? 'monthly fee on request' : `€${montant} excl.\u00a0VAT\u00a0/\u00a0month`,
  },
};

export const setupLabel = (o, locale = 'fr') => {
  const f = FORMAT[locale] ?? FORMAT.fr;
  return f.setup(f.num(o.setup), o.setupFrom);
};

export const monthlyLabel = (o, locale = 'fr') => {
  const f = FORMAT[locale] ?? FORMAT.fr;
  return f.monthly(o.monthly == null ? null : f.num(o.monthly));
};

export const PILIER_OFFERS = [
  {
    key: 'agent-prospection',
    name: 'Agent Partenaires (apporteurs d’affaires)',
    description:
      "Un agent qui contacte les partenaires et les prospects de votre secteur par WhatsApp et par email, en votre nom, répond en moins d'une minute et vous passe la main sur les interlocuteurs intéressés.",
    setup: 0,
    monthly: 149,
  },
  {
    key: 'site-fiche-google',
    name: 'Site internet et fiche établissement Google',
    description:
      "Un site lisible sur téléphone, des pages par ville et par prestation, et votre fiche établissement Google créée et remplie. Le site est hébergé à votre nom et vous appartient.",
    setup: 300,
    monthly: 0,
  },
  {
    key: 'acquisition-meta',
    name: 'Publicité Facebook et Instagram',
    description:
      'Création de vos publicités à partir de vos vidéos, configuration d’une campagne locale de génération de prospects et d’un formulaire de demande de contact. Budget publicitaire non inclus, réglé par le client directement à Meta.',
    setup: 490,
    setupFrom: true,
    monthly: 200,
  },
  {
    key: 'agent-clients-b2b',
    name: 'Agent Clients B2B',
    description:
      "Base de données construite sur mesure pour votre marché, agent entraîné sur votre catalogue et vos objections, transmission de l'échange complet à vos commerciaux : besoin, et si possible budget et calendrier.",
    /* Plancher, pas prix ferme : le périmètre (taille du marché à construire,
       nombre d'interlocuteurs, intégrations) fait varier la fabrication du
       simple au quintuple. `setupFrom` déclenche « à partir de » à l'affichage
       et un `minPrice` dans les données structurées. La mensualité est sur
       devis pour la même raison, d'où `monthly: null` : un montant affiché
       plafonnerait de fait les dossiers les plus gros. */
    setup: 1200,
    setupFrom: true,
    monthly: 340,
  },
];

/* Les cinq agents complémentaires. Même ordre et mêmes montants que
   AutresAgents.jsx. */
export const AGENT_OFFERS = [
  {
    key: 'agent-gestionnaire',
    name: 'Agent Gestionnaire',
    description:
      'Relance automatique des devis sans réponse, au bon moment et avec vos mots, jusqu’à obtenir une réponse claire.',
    setup: 490,
    monthly: 119,
  },
  {
    key: 'agent-accueil',
    name: 'Agent Accueil 24/7',
    description:
      "Réponse aux demandes entrantes à toute heure : le besoin, l'adresse et l'urgence sont notés puis transmis.",
    setup: 390,
    monthly: 89,
  },
  {
    key: 'agent-visiteur',
    name: 'Agent Visiteur',
    description:
      'Travail continu de la visibilité locale : pages par ville et par prestation, contenu tenu à jour, fiche établissement alimentée.',
    setup: 390,
    monthly: 89,
  },
  {
    key: 'agent-controleur',
    name: 'Agent Contrôleur',
    description:
      'Suivi des documents de conformité des sous-traitants, relance de ceux qui manquent et alerte avant expiration.',
    setup: 390,
    monthly: 79,
  },
  {
    key: 'agent-acheteur',
    name: 'Agent Acheteur',
    description:
      "Consultation des fournisseurs, comparaison et relance sur les postes d'achat récurrents.",
    setup: 590,
    monthly: 119,
  },
];

export const ALL_OFFERS = [...PILIER_OFFERS, ...AGENT_OFFERS];

/* Garantie des deux agents (Partenaires et Clients), sur les mensualités
   uniquement : ni les frais de création ni les 3 mois du Pack Lancement Entrepreneurs. */
export const GARANTIE = 'Aucun rendez-vous dans le mois ? Le mois suivant ne vous est pas facturé.';

/* Budget publicitaire : phrase unique, affichée près de chaque offre qui
   comprend de la publicité Meta. Ne pas y ajouter de minimum de budget. */
export const BUDGET_META =
  'Budget publicitaire non inclus : vous définissez votre budget et le réglez directement à Meta depuis votre compte publicitaire. SmatchRoom facture la création et la gestion de vos campagnes.';

/* Les trois Packs Lancement Entrepreneurs (validés le 20/10/2026). Affichés par
   PacksLancement.jsx (accueil et /pack-lancement) ; la carte du hero reprend le
   Pack Partenaires. `monthly` = 0 : le prix du pack est payé une fois ; les frais
   récurrents éventuels (gestion Meta, Agent Partenaires après 3 mois) sont
   décrits dans `recurring`, pas dans les données structurées. */
export const PACKS_LANCEMENT = [
  {
    key: 'pack-lancement-partenaires',
    name: 'Pack Lancement Partenaires',
    short: 'Partenaires',
    pitch: 'Lancez votre présence en ligne et développez un réseau de professionnels susceptibles de vous recommander.',
    description:
      "Site internet hébergé à votre nom, fiche établissement Google et trois mois d'Agent Partenaires, payés une seule fois. Pas de publicité Meta incluse. Ensuite 149 € HT par mois pour l'Agent Partenaires si vous poursuivez, sans engagement.",
    setup: 490,
    monthly: 0,
    included: [
      'Site internet, hébergé à votre nom',
      'Fiche Google Business Profile créée ou optimisée',
      '3 mois d’Agent Partenaires inclus',
    ],
    creations: null,
    excluded: 'Pas de publicité Meta incluse',
    recurring: ['Après les 3 mois : Agent Partenaires à 149 € HT / mois si vous poursuivez, sans engagement'],
    meta: false,
    cta: 'Choisir le Pack Partenaires',
  },
  {
    key: 'pack-lancement-publicite-locale',
    name: 'Pack Lancement Publicité locale',
    short: 'Publicité locale',
    pitch: 'Lancez votre présence en ligne et obtenez de nouvelles demandes de contact grâce à la publicité locale sur Facebook et Instagram.',
    description:
      "Site internet hébergé à votre nom, fiche établissement Google, un montage publicitaire à partir de vos vidéos, textes publicitaires, campagne locale de génération de prospects sur Facebook et Instagram et formulaire de demande de contact. Pas d'Agent Partenaires inclus. Gestion Meta 200 € HT par mois dès le lancement des annonces ; budget publicitaire réglé par le client directement à Meta.",
    setup: 790,
    monthly: 0,
    included: [
      'Site internet, hébergé à votre nom',
      'Fiche Google Business Profile créée ou optimisée',
      '1 montage publicitaire à partir de vos vidéos',
      'Rédaction des textes publicitaires',
      'Campagne locale Facebook et Instagram configurée',
      'Formulaire de demande de contact',
    ],
    creations: '1 création publicitaire',
    excluded: 'Pas d’Agent Partenaires inclus',
    recurring: ['Gestion Meta : 200 € HT / mois dès le lancement des annonces'],
    meta: true,
    cta: 'Choisir le Pack Publicité locale',
  },
  {
    key: 'pack-lancement-ultime',
    name: 'Pack Lancement Ultime',
    short: 'Ultime',
    badge: 'Les deux leviers réunis',
    pitch: 'Combinez votre présence en ligne, la recherche de partenaires et la publicité locale pour développer plusieurs sources d’opportunités.',
    description:
      "Site internet hébergé à votre nom, fiche établissement Google, trois mois d'Agent Partenaires, trois variantes publicitaires à partir de vos vidéos avec accroches et textes adaptés, campagne locale de génération de prospects sur Facebook et Instagram et formulaire de demande de contact. Gestion Meta 200 € HT par mois dès le lancement des annonces (non incluse dans le prix du pack) ; budget publicitaire réglé par le client directement à Meta. Après les trois mois, Agent Partenaires à 149 € HT par mois si poursuite.",
    setup: 990,
    monthly: 0,
    included: [
      'Site internet, hébergé à votre nom',
      'Fiche Google Business Profile créée ou optimisée',
      '3 mois d’Agent Partenaires inclus',
      '3 variantes publicitaires à partir de vos vidéos',
      'Accroches et textes adaptés à chaque variante',
      'Campagne locale Facebook et Instagram configurée',
      'Formulaire de demande de contact',
    ],
    creations: '3 variantes publicitaires',
    recurring: [
      'Gestion Meta : 200 € HT / mois dès le lancement des annonces (non incluse dans les 990 €)',
      'Après les 3 mois : Agent Partenaires à 149 € HT / mois si vous poursuivez',
      'Soit 349 € HT / mois si vous gardez les deux services',
    ],
    meta: true,
    cta: 'Choisir le Pack Ultime',
  },
];

/* Rétrocompatibilité : l'offre d'entrée historique est le Pack Partenaires. */
export const PACK_LANCEMENT = PACKS_LANCEMENT[0];

/* Offres de publicité Facebook et Instagram seules. L'offre avec vidéaste
   garde son périmètre d'origine. */
export const META_OFFERS = [
  {
    key: 'meta-essentiel',
    name: 'Meta Essentiel',
    setup: 490,
    monthly: 200,
    creations: '1 montage publicitaire',
    included: [
      '1 montage publicitaire à partir de vos vidéos',
      'Textes publicitaires',
      'Campagne locale de génération de prospects configurée',
      'Formulaire de demande de contact',
    ],
  },
  {
    key: 'meta-multi',
    name: 'Meta Multi-créations',
    setup: 690,
    monthly: 200,
    creations: '3 variantes publicitaires',
    included: [
      '3 variantes publicitaires à partir de vos vidéos',
      'Accroches et textes adaptés',
      'Campagne locale de génération de prospects configurée',
      'Formulaire de demande de contact',
    ],
  },
  {
    key: 'meta-videaste',
    name: 'Avec notre vidéaste',
    setup: 1490,
    monthly: 200,
    creations: 'Tournage sur place par notre vidéaste',
    included: [
      'Notre vidéaste se déplace pour filmer votre activité',
      'Montage, diffusion et suivi des campagnes',
    ],
  },
];
