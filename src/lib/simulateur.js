/**
 * Simulateur « Qui l'agent contacterait pour vous » (/simulateur).
 *
 * Deux familles d'activités :
 * - Agent Partenaires (type 'partenaires') : recherche Google Maps (acteur Apify
 *   compass/crawler-google-places, le même que les agents) des prescripteurs
 *   de la zone du visiteur ;
 * - Agent Clients B2B (type 'b2b') : recherche de signaux d'achat, les
 *   entreprises créées ces 30 derniers jours dans le département (BODACC,
 *   open data gratuit), filtrées par mots-clés d'activité.
 *
 * Module sans dépendance : importé par la page, le composant client et la
 * route serveur.
 */

export const ACTIVITES = [
  {
    key: 'batiment',
    type: 'partenaires',
    label: 'Artisan du bâtiment (couvreur, plombier, électricien, peintre…)',
    recherches: ['agence immobilière', 'syndic de copropriété', 'architecte'],
    cible: 'agences immobilières, syndics et architectes',
    accroche: 'Je suis artisan',
    benefice: "Quand un de vos clients a des travaux à prévoir, je peux intervenir rapidement et vous faire un retour à chaque chantier.",
  },
  {
    key: 'renovation',
    type: 'partenaires',
    label: 'Rénovation, isolation, énergie',
    recherches: ['agence immobilière', 'diagnostiqueur immobilier', 'architecte'],
    cible: 'agences immobilières, diagnostiqueurs et architectes',
    accroche: 'Je fais de la rénovation',
    benefice: "Sur les biens vendus avec des travaux à prévoir, je peux chiffrer rapidement pour vos acquéreurs.",
  },
  {
    key: 'nettoyage',
    type: 'partenaires',
    label: 'Nettoyage, entretien, maintenance',
    recherches: ['syndic de copropriété', 'agence immobilière', 'centre d\'affaires'],
    cible: 'syndics, agences et centres d\'affaires',
    accroche: 'Je dirige une entreprise de nettoyage',
    benefice: "Pour les immeubles et locaux que vous gérez, je peux prendre le relais sur l'entretien avec un interlocuteur unique.",
  },
  {
    key: 'immobilier',
    type: 'partenaires',
    label: 'Agent ou mandataire immobilier',
    recherches: ['notaire', 'diagnostiqueur immobilier', 'courtier en crédit immobilier'],
    cible: 'notaires, diagnostiqueurs et courtiers',
    accroche: 'Je suis agent immobilier',
    benefice: "Quand un de vos clients vend ou achète, je peux l'accompagner et vous tenir informé à chaque étape.",
  },
  {
    key: 'patrimoine',
    type: 'partenaires',
    label: 'Conseil en patrimoine, assurance, finance',
    recherches: ['expert-comptable', 'notaire', 'avocat'],
    cible: 'experts-comptables, notaires et avocats',
    accroche: 'Je suis conseiller',
    benefice: "Vos clients qui ont une question de patrimoine ou d'assurance peuvent compter sur moi, et je vous tiens informé.",
  },
  {
    key: 'conseil',
    type: 'partenaires',
    label: 'Consultant, formateur, coach',
    recherches: ['expert-comptable', 'espace de coworking', 'chambre de commerce'],
    cible: 'experts-comptables, coworkings et réseaux d\'entreprises',
    accroche: 'J\'accompagne les dirigeants',
    benefice: "Vos clients dirigeants qui ont besoin d'un appui peuvent compter sur moi, et je vous renvoie l'ascenseur.",
  },

  /* Agent Clients B2B : `filtre` = mots cherchés dans l'activité déclarée au
     BODACC (null = toutes les sociétés), `cible` = ce que le signal désigne. */
  {
    key: 'b2b-logiciel',
    type: 'b2b',
    label: 'Logiciel, SaaS, informatique pour entreprises',
    filtre: null,
    cible: 'sociétés qui viennent de se créer',
    accroche: 'Je travaille avec les entreprises qui démarrent sur leurs outils informatiques',
    benefice: "Les premières semaines sont le bon moment pour s'équiper correctement, plutôt que de tout changer dans un an.",
    /* Signaux que l'agent surveille pour ce secteur ; le premier est celui que le test montre en direct. */
    signaux: [
      'Les sociétés qui viennent de se créer : elles choisissent leurs outils maintenant',
      'Les entreprises qui recrutent un premier comptable, commercial ou responsable administratif',
      "Les dirigeants qui publient sur LinkedIn à propos de croissance, d'organisation ou d'outils",
    ],
  },
  {
    key: 'b2b-comptable',
    type: 'b2b',
    label: 'Expertise comptable, juridique, gestion',
    filtre: null,
    cible: 'sociétés qui viennent de se créer',
    accroche: "J'accompagne les sociétés qui se lancent sur leur comptabilité et leur gestion",
    benefice: 'Un premier exercice bien cadré évite beaucoup de mauvaises surprises au bilan.',
    /* Signaux que l'agent surveille pour ce secteur ; le premier est celui que le test montre en direct. */
    signaux: [
      'Les sociétés qui viennent de se créer, avant leur premier exercice',
      'Les changements de dirigeant, de forme juridique ou de siège publiés au BODACC',
      'Les dirigeants qui parlent sur LinkedIn de création, de reprise ou de croissance',
    ],
  },
  {
    key: 'b2b-assurance',
    type: 'b2b',
    label: 'Assurance professionnelle, courtage, prévoyance',
    filtre: null,
    cible: 'sociétés qui viennent de se créer',
    accroche: "J'accompagne les sociétés qui démarrent sur leurs assurances professionnelles",
    benefice: "Je peux comparer pour vous la RC pro, la multirisque ou la décennale avant votre premier client.",
    /* Signaux que l'agent surveille pour ce secteur ; le premier est celui que le test montre en direct. */
    signaux: [
      'Les sociétés qui viennent de se créer : RC pro, multirisque ou décennale à souscrire',
      'Les entreprises qui embauchent leurs premiers salariés : mutuelle et prévoyance obligatoires',
      'Les déménagements de siège et ouvertures de locaux publiés au BODACC',
    ],
  },
  {
    key: 'b2b-btp',
    type: 'b2b',
    label: 'Fournisseur, matériel ou location pour le BTP',
    filtre: ['travaux', 'bâtiment', 'batiment', 'maçonnerie', 'maconnerie', 'plomberie', 'électricité', 'electricite', 'menuiserie', 'couverture', 'peinture', 'rénovation', 'renovation', 'carrelage', 'charpente', 'terrassement', 'isolation', 'chauffage', 'second œuvre', 'gros œuvre'],
    cible: 'entreprises du bâtiment qui viennent de se créer',
    accroche: 'Je fournis les entreprises du bâtiment de la région en matériel',
    benefice: "Pour vos premiers chantiers, je peux vous ouvrir un compte rapidement et vous livrer sur place.",
    /* Signaux que l'agent surveille pour ce secteur ; le premier est celui que le test montre en direct. */
    signaux: [
      'Les entreprises du bâtiment qui viennent de se créer et ouvrent leurs comptes fournisseurs',
      'Les entreprises du bâtiment qui recrutent : signe de chantiers à venir',
      'Les dirigeants du BTP qui publient sur LinkedIn leurs nouveaux chantiers',
    ],
  },
  {
    key: 'b2b-chr',
    type: 'b2b',
    label: 'Fournisseur pour restaurants, bars et hôtels',
    filtre: ['restaura', 'débit de boissons', 'debit de boissons', 'traiteur', 'hôtel', 'hotel', 'café', 'snack', 'pizz', 'brasserie', 'bar ', 'vente à emporter', 'boulangerie'],
    cible: 'restaurants, bars et commerces de bouche qui viennent de se créer',
    accroche: "Je travaille avec les restaurants et les bars de la région",
    benefice: "Pour votre ouverture, je peux vous proposer une offre de démarrage adaptée à votre volume.",
    /* Signaux que l'agent surveille pour ce secteur ; le premier est celui que le test montre en direct. */
    signaux: [
      'Les restaurants, bars et commerces de bouche qui viennent de se créer',
      'Les reprises de fonds de commerce publiées au BODACC',
      'Les établissements qui recrutent du personnel de salle ou de cuisine',
    ],
  },
  {
    key: 'b2b-commerce',
    type: 'b2b',
    label: 'Fournisseur ou services pour commerces',
    filtre: ['commerce de détail', 'vente au détail', 'boutique', 'magasin', 'épicerie', 'epicerie', 'prêt-à-porter', 'pret-a-porter', 'coiffure', 'esthétique', 'esthetique', 'institut'],
    cible: 'commerces qui viennent de se créer',
    accroche: 'Je travaille avec les commerces qui ouvrent dans la région',
    benefice: "Les premiers mois décident souvent de la suite, et je peux vous faire gagner du temps sur l'installation.",
    /* Signaux que l'agent surveille pour ce secteur ; le premier est celui que le test montre en direct. */
    signaux: [
      'Les commerces qui viennent de se créer, avant leur ouverture',
      'Les reprises de fonds de commerce publiées au BODACC',
      'Les commerçants qui annoncent une ouverture ou un agrandissement sur les réseaux',
    ],
  },
  {
    key: 'b2b-marketing',
    type: 'b2b',
    label: 'Marketing, site internet, communication',
    filtre: null,
    cible: 'sociétés qui viennent de se créer',
    accroche: "J'aide les entreprises qui démarrent à se faire connaître dans la région",
    benefice: "Un site et une fiche Google en place dès le lancement, ce sont des clients en plus dès les premières semaines.",
    /* Signaux que l'agent surveille pour ce secteur ; le premier est celui que le test montre en direct. */
    signaux: [
      'Les sociétés qui viennent de se créer, souvent sans site ni fiche Google',
      'Les entreprises qui recrutent un commercial : elles veulent plus de clients',
      'Les dirigeants qui parlent sur LinkedIn de lancement ou de développement commercial',
    ],
  },
  {
    key: 'b2b-rh',
    type: 'b2b',
    label: 'Recrutement, intérim, ressources humaines',
    filtre: null,
    cible: 'sociétés qui viennent de se créer',
    accroche: 'J\'aide les entreprises qui démarrent à recruter leurs premiers salariés',
    benefice: 'Un premier recrutement réussi change tout, et je peux vous faire gagner plusieurs semaines.',
    /* Signaux que l'agent surveille pour ce secteur ; le premier est celui que le test montre en direct. */
    signaux: [
      'Les sociétés qui viennent de se créer et recruteront bientôt',
      "Les entreprises qui publient des offres d'emploi en ce moment",
      'Les dirigeants qui annoncent sur LinkedIn une croissance ou des recrutements',
    ],
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
export function conversation(a, { nomLieu, villeLieu, ville, prenom, entreprise, prenomDirigeant }) {
  const nom = nomCourt(nomLieu);
  const signature = entreprise ? `${prenom} · ${entreprise}` : prenom;
  if (a.type === 'b2b') {
    const salut = prenomDirigeant ? `Bonjour ${prenomDirigeant}, c'est ${prenom}.` : `Bonjour, c'est ${prenom}.`;
    return [
      { de: 'agent', texte: `${salut} Je vous contacte au sujet de ${nom} à ${villeLieu} : c'est bien vous qui venez de la créer ?\n\n${signature}` },
      { de: 'partenaire', texte: "Oui, c'est moi." },
      { de: 'agent', texte: `Merci, et félicitations pour le lancement ! ${a.accroche}. ${a.benefice} Seriez-vous ouvert à un court échange ?` },
      { de: 'partenaire', texte: 'Oui, ça peut m’intéresser. Appelez-moi cette semaine.' },
      { de: 'agent', texte: 'Très bien, je vous rappelle. Merci et bonne journée !' },
    ];
  }
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
