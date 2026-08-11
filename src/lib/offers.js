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
 * composants portent des chaînes destinées à l'œil (« 1 800 € HT », « 690 € HT
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

export const PILIER_OFFERS = [
  {
    key: 'agent-prospection',
    name: 'Agent IA de prospection',
    description:
      "Un agent qui contacte les partenaires et les prospects de votre secteur par WhatsApp et par email, en votre nom, répond en moins d'une minute et vous passe la main sur les interlocuteurs intéressés.",
    setup: 300,
    monthly: 190,
  },
  {
    key: 'site-fiche-google',
    name: 'Site internet et fiche établissement Google',
    description:
      "Un site lisible sur téléphone, des pages par ville et par prestation, et votre fiche établissement Google créée, remplie et tenue à jour chaque mois.",
    setup: 300,
    monthly: 20,
  },
  {
    key: 'acquisition-meta',
    name: 'Acquisition Meta',
    description:
      'Vos chantiers filmés, montés et diffusés en publicité sur Facebook et Instagram auprès des habitants de votre zone, les demandes tombant directement dans votre agent.',
    setup: 690,
    monthly: 200,
  },
  {
    key: 'agent-clients-b2b',
    name: 'Agent Clients B2B',
    description:
      "Base de données construite sur mesure pour votre marché, agent entraîné sur votre catalogue et vos objections, qualification du besoin, du budget et du calendrier avant transmission à vos commerciaux.",
    setup: 1800,
    monthly: 490,
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
