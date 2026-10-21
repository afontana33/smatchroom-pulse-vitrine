/**
 * Simulateur « Qui l'agent contacterait pour vous » (/simulateur).
 *
 * Le visiteur choisit son activité et sa ville ; la route /api/simulateur
 * cherche sur Google Maps (acteur Apify compass/crawler-google-places, le même
 * que les agents) les prescripteurs de sa zone. Le site montre les premiers,
 * puis la liste complète contre un prénom et un téléphone.
 *
 * Module sans dépendance : importé par la page, le composant client et les
 * routes serveur. Une activité = des recherches Google Maps (les catégories
 * de prescripteurs que l'agent viserait) et l'exemple de message.
 */

export const ACTIVITES = [
  {
    key: 'batiment',
    label: 'Artisan du bâtiment (couvreur, plombier, électricien, peintre…)',
    recherches: ['agence immobilière', 'syndic de copropriété', 'architecte'],
    cible: 'agences immobilières, syndics et architectes',
    accroche: 'Je suis artisan',
    benefice: "Quand un de vos clients a des travaux à prévoir, je peux intervenir rapidement et vous faire un retour à chaque chantier.",
  },
  {
    key: 'renovation',
    label: 'Rénovation, isolation, énergie',
    recherches: ['agence immobilière', 'diagnostiqueur immobilier', 'architecte'],
    cible: 'agences immobilières, diagnostiqueurs et architectes',
    accroche: 'Je fais de la rénovation',
    benefice: "Sur les biens vendus avec des travaux à prévoir, je peux chiffrer rapidement pour vos acquéreurs.",
  },
  {
    key: 'nettoyage',
    label: 'Nettoyage, entretien, maintenance',
    recherches: ['syndic de copropriété', 'agence immobilière', 'centre d\'affaires'],
    cible: 'syndics, agences et centres d\'affaires',
    accroche: 'Je dirige une entreprise de nettoyage',
    benefice: "Pour les immeubles et locaux que vous gérez, je peux prendre le relais sur l'entretien avec un interlocuteur unique.",
  },
  {
    key: 'immobilier',
    label: 'Agent ou mandataire immobilier',
    recherches: ['notaire', 'diagnostiqueur immobilier', 'courtier en crédit immobilier'],
    cible: 'notaires, diagnostiqueurs et courtiers',
    accroche: 'Je suis agent immobilier',
    benefice: "Quand un de vos clients vend ou achète, je peux l'accompagner et vous tenir informé à chaque étape.",
  },
  {
    key: 'patrimoine',
    label: 'Conseil en patrimoine, assurance, finance',
    recherches: ['expert-comptable', 'notaire', 'avocat'],
    cible: 'experts-comptables, notaires et avocats',
    accroche: 'Je suis conseiller',
    benefice: "Vos clients qui ont une question de patrimoine ou d'assurance peuvent compter sur moi, et je vous tiens informé.",
  },
  {
    key: 'conseil',
    label: 'Consultant, formateur, coach',
    recherches: ['expert-comptable', 'espace de coworking', 'chambre de commerce'],
    cible: 'experts-comptables, coworkings et réseaux d\'entreprises',
    accroche: 'J\'accompagne les dirigeants',
    benefice: "Vos clients dirigeants qui ont besoin d'un appui peuvent compter sur moi, et je vous renvoie l'ascenseur.",
  },
];

export const activite = (key) => ACTIVITES.find((a) => a.key === key) || null;

/* Nombre de prescripteurs montrés avant de laisser ses coordonnées. */
export const APERCU = 5;

/* La conversation telle que nos agents la mènent (flux en deux temps) :
   identification, présentation après réponse, puis passage de main.
   Les réponses du partenaire sont un exemple, signalé comme tel à l'écran.
   Règles reprises des agents : prénom seul au début, société uniquement dans
   la signature du premier message, l'agent parle à la première personne au
   nom du client, et ne promet ni heure ni créneau. */
export function conversation(a, { nomLieu, villeLieu, ville, prenom, entreprise }) {
  const nom = nomCourt(nomLieu);
  const signature = entreprise ? `${prenom} · ${entreprise}` : prenom;
  return [
    { de: 'agent', texte: `Bonjour, c'est ${prenom}. Je vous contacte au sujet de ${nom} à ${villeLieu} : c'est bien vous qui vous en occupez ?\n\n${signature}` },
    { de: 'partenaire', texte: "Oui, c'est moi." },
    { de: 'agent', texte: `Merci ! ${a.accroche} sur ${ville} et alentours. ${a.benefice} Seriez-vous ouvert à un court échange ?` },
    { de: 'partenaire', texte: 'Oui, pourquoi pas. Appelez-moi, je suis disponible cette semaine.' },
    { de: 'agent', texte: 'Très bien, je vous rappelle. Merci et bonne journée !' },
  ];
}

/* « Rachel Girard – Conseillère … | Pietrapolis » → « Rachel Girard ». */
export const nomCourt = (n) => String(n).split(/ [|–—] /)[0].trim();

/* Nettoie un champ texte court (prénom, entreprise). */
export const nettoyerTexte = (v, n = 50) =>
  String(v || '').replace(/[<>{}\[\]]/g, '').replace(/\s+/g, ' ').trim().slice(0, n);

/* Normalise une saisie de ville : lettres, chiffres, espaces, tirets, apostrophes. */
export function nettoyerVille(v) {
  return String(v || '')
    .replace(/[^\p{L}\p{N}\s'’-]/gu, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 60);
}
