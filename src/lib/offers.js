/**
 * Miroir numérique des prix, pour les données structurées uniquement.
 *
 * ⚠ Ce fichier n'est JAMAIS affiché. Les prix visibles restent dans
 * `Piliers.jsx` (les trois briques), `Packs.jsx` (les packs),
 * `AgentClients.jsx` (l'offre B2B) et `AutresAgents.jsx` (les cinq agents
 * complémentaires). Une correction de prix se fait donc à deux endroits : la
 * source d'affichage, et ici.
 *
 * Pourquoi ce doublon plutôt qu'un import depuis les composants : les
 * composants portent des chaînes destinées à l'œil (« 690 € HT
 * si vous filmez · 1 490 € HT avec notre vidéaste »), pas des nombres. Les
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
    name: 'Acquisition Meta',
    description:
      'Votre activité filmée, montée et diffusée en publicité sur Facebook et Instagram auprès des clients de votre zone, les demandes tombant directement dans votre agent.',
    setup: 690,
    setupFrom: true,
    monthly: 200,
  },
  {
    key: 'agent-clients-b2b',
    name: 'Agent Clients B2B',
    description:
      "Base de données construite sur mesure pour votre marché, agent entraîné sur votre catalogue et vos objections, qualification du besoin, du budget et du calendrier avant transmission à vos commerciaux.",
    /* Plancher, pas prix ferme : le périmètre (taille du marché à construire,
       nombre d'interlocuteurs, intégrations) fait varier la fabrication du
       simple au quintuple. `setupFrom` déclenche « à partir de » à l'affichage
       et un `minPrice` dans les données structurées. La mensualité est sur
       devis pour la même raison, d'où `monthly: null` : un montant affiché
       plafonnerait de fait les dossiers les plus gros. */
    setup: 490,
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
   uniquement : ni les frais de création ni les 3 mois du Pack Lancement. */
export const GARANTIE = 'Aucun rendez-vous dans le mois ? Le mois suivant ne vous est pas facturé.';

/* Offre d'entrée : site + fiche Google + 3 mois d'Agent Partenaires, payés une
   fois. Affichée dans HeroLancement et /pack-lancement. */
export const PACK_LANCEMENT = {
  key: 'pack-lancement',
  name: 'Pack Lancement',
  description:
    "Site internet hébergé à votre nom, fiche établissement Google et trois mois d'Agent Partenaires, payés une seule fois. Ensuite 149 € HT par mois, sans engagement.",
  setup: 490,
  monthly: 0,
};
