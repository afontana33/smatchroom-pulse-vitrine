/**
 * Données des pages par métier et par ville.
 *
 * Pourquoi un fichier de données et pas vingt pages écrites à la main : le
 * gabarit est commun, le contenu ne l'est pas. Chaque entrée porte une prose
 * qui lui est propre (prescripteurs, douleurs, saisonnalité, exemple de
 * message pour les métiers ; tissu économique, communes, métiers dominants
 * pour les villes). C'est la condition pour que ces pages ne soient pas des
 * pages satellites : Google déclasse une grille ville × métier remplie par
 * substitution de variables, et il a raison de le faire.
 *
 * Règles de contenu, non négociables :
 *   - aucun chiffre inventé. Pas de « 350 artisans accompagnés », pas de taux
 *     de réponse, pas de nombre d'habitants sorti de nulle part. Les seuls
 *     chiffres autorisés sont les prix, qui viennent de lib/offers.js.
 *   - aucun nom de client cité sans accord.
 *   - aucune promesse de résultat (même contrainte que la FAQ de la landing).
 *   - les exemples de messages respectent le style des messages froids :
 *     pas de nom entier après « Bonjour, », nom de l'entreprise glissé dans le
 *     corps, aucune URL.
 *
 * Pour ajouter une ville ou un métier : une entrée ici, rien d'autre. Le
 * sitemap, les hubs, le maillage interne et les données structurées se
 * mettent à jour tout seuls. Mais n'ajoutez une ville que si vous avez
 * réellement quelque chose de vrai à en dire.
 */

export const METIERS = [
  {
    slug: 'couvreur',
    nom: 'couvreur',
    pluriel: 'couvreurs',
    label: 'Couvreurs et charpentiers',
    metaTitle: 'Agent IA de prospection pour couvreurs · SmatchRoom Pulse',
    metaDescription:
      "Un agent IA qui va chercher des chantiers de couverture pour vous : il contacte agences, syndics et assureurs de votre zone, répond en une minute, vous passe la main. 149 €/mois sans engagement.",
    intro:
      "La couverture est un métier d'urgence et de prescription. Un particulier appelle quand il a une fuite, et il appelle le premier qui décroche. Le reste du carnet se remplit par ceux qui voient les toits avant vous : syndics, assureurs, agences immobilières, experts après sinistre.",
    prescripteurs: [
      'Syndics de copropriété, qui votent des travaux de toiture en assemblée générale',
      'Agences immobilières et diagnostiqueurs, sur les biens vendus avec toiture à reprendre',
      "Architectes et maîtres d'œuvre, sur les rénovations lourdes",
    ],
    douleurs: [
      {
        t: 'Les urgences prennent tout le temps disponible',
        d: "Une fuite se traite le jour même, et pendant ce temps personne ne relance les devis de rénovation complète, ceux qui font la marge. L'agent s'occupe de la relance pendant que vous montez sur le toit.",
      },
      {
        t: 'Les appels manqués partent chez le concurrent',
        d: "Sur un toit, avec le bruit, on ne décroche pas. Un particulier qui a de l'eau chez lui n'attend pas le rappel : il descend la liste des résultats Google jusqu'à ce que quelqu'un réponde.",
      },
      {
        t: 'La prescription ne se construit pas par hasard',
        d: 'Un syndic ne vous connaît pas parce que vous êtes bon. Il vous connaît parce que vous êtes passé, ou parce que quelqu’un lui a écrit au bon moment, avant le vote des travaux.',
      },
    ],
    exempleContexte: 'Premier message à un syndic de copropriété',
    exempleMessage:
      "Bonjour, je suis Julien, couvreur sur le secteur. On intervient beaucoup en copropriété, surtout sur les toitures qui commencent à prendre l'eau aux points de raccord. Est-ce que vous avez des immeubles où le sujet toiture revient en assemblée générale en ce moment ? Si oui je vous fais un état des lieux gratuit, sans engagement.",
    saisonnalite:
      "La couverture est saisonnière et la prospection doit l'être aussi. On lance les campagnes de rénovation en fin d'hiver, quand les dégâts de l'hiver sont visibles et que les budgets d'assemblée générale se votent. On garde une cadence basse pendant les gros mois de chantier, pour ne pas générer des devis que vous n'avez pas le temps d'honorer.",
    faq: [
      {
        q: "Est-ce que l'agent peut gérer les demandes d'urgence ?",
        a: "Il peut prendre l'appel ou le message, noter la nature du sinistre, l'adresse et le degré d'urgence, puis vous alerter immédiatement. Il ne s'engage jamais sur un délai d'intervention à votre place : c'est vous qui rappelez et qui décidez.",
      },
      {
        q: 'Vous contactez les particuliers directement ?',
        a: "Non. Pour les particuliers, le canal c'est la publicité et la fiche établissement Google, parce qu'un particulier démarché sur son portable pour une toiture ne répond pas bien. L'agent de prospection, lui, écrit aux professionnels qui ont déjà ces particuliers comme clients.",
      },
    ],
  },
  {
    slug: 'menuisier',
    nom: 'menuisier',
    pluriel: 'menuisiers',
    label: 'Menuisiers et poseurs',
    metaTitle: 'Agent IA de prospection pour menuisiers · SmatchRoom Pulse',
    metaDescription:
      "Un agent IA qui remplit votre carnet en menuiserie : contact des agences, promoteurs et cuisinistes de votre secteur, relance des devis en attente, réponse en une minute.",
    intro:
      "En menuiserie, le devis est long à faire et facile à perdre. Le client compare trois offres, met deux mois à décider, et celui qui l'emporte est souvent celui qui a relancé sans être lourd. C'est exactement le travail qu'un agent fait mieux qu'un humain débordé.",
    prescripteurs: [
      'Agences immobilières, sur les biens à rafraîchir avant mise en location',
      "Cuisinistes et magasins d'ameublement, qui ont besoin d'un poseur fiable",
      'Constructeurs de maisons individuelles et promoteurs, sur les lots menuiserie',
      "Architectes d'intérieur, sur le sur-mesure et l'agencement",
    ],
    douleurs: [
      {
        t: 'Des devis en attente qui dorment',
        d: "Le chiffrage d'une menuiserie sur mesure demande une visite et deux heures de bureau. Quand le client ne répond pas, ce travail est perdu, sauf si quelqu'un relance au bon moment avec les bons mots.",
      },
      {
        t: 'Une concurrence sur le prix des grandes enseignes',
        d: "Face à une enseigne nationale, l'argument n'est pas le tarif, c'est la pose et le délai. Encore faut-il le dire au bon interlocuteur, et le dire avant que le devis d'à côté soit signé.",
      },
      {
        t: 'La pose sous-traitée est une manne mal exploitée',
        d: 'Les cuisinistes et les vendeurs de fenêtres cherchent en permanence des poseurs sérieux. Ce sont des contacts à faire une fois, qui alimentent ensuite plusieurs chantiers par mois.',
      },
    ],
    exempleContexte: 'Premier message à un cuisiniste',
    exempleMessage:
      "Bonjour, je suis Pascal, menuisier poseur dans le coin. Je travaille surtout pour des magasins qui vendent la cuisine mais ne veulent pas gérer la pose. Est-ce que vous avez ce besoin en ce moment, ou est-ce que vos poses sont déjà couvertes ? Je peux passer voir un chantier avec vous, ça vous dira mieux que des explications.",
    saisonnalite:
      "La menuiserie intérieure creuse en été, quand les particuliers partent, et repart fort à la rentrée. Les aides à la rénovation, quand elles bougent, déplacent la demande de fenêtres d'un trimestre à l'autre : le discours de l'agent est réécrit à chaque changement de dispositif, sans surcoût.",
    faq: [
      {
        q: 'Est-ce que la relance de devis est incluse ?',
        a: "C'est un agent à part, l'Agent Gestionnaire, à 490 € de fabrication puis 119 € par mois. Beaucoup de menuisiers commencent par celui-là plutôt que par la prospection : quand on a déjà quarante devis en attente, aller en chercher de nouveaux n'est pas la priorité.",
      },
      {
        q: 'Vous pouvez cibler uniquement le sur-mesure ?',
        a: "Oui. La cible se définit à l'appel de cadrage : type de prescripteur, taille d'entreprise, zone. Si vous ne voulez que de l'agencement et du sur-mesure, l'agent n'écrit pas aux enseignes de fenêtres standard.",
      },
    ],
  },
  {
    slug: 'plombier-chauffagiste',
    nom: 'plombier-chauffagiste',
    pluriel: 'plombiers-chauffagistes',
    label: 'Plombiers et chauffagistes',
    metaTitle: 'Agent IA de prospection pour plombiers chauffagistes · Pulse',
    metaDescription:
      "Un agent IA qui vous amène des contrats d'entretien et des chantiers de chauffage : syndics, agences de gestion locative, bailleurs. Prospection WhatsApp et email à votre nom.",
    intro:
      "Le dépannage fait tourner la journée, l'entretien fait vivre l'entreprise. La différence entre les deux, c'est le contrat récurrent : chaudières, adoucisseurs, pompes à chaleur. Ces contrats ne viennent pas des particuliers un par un, ils viennent des gestionnaires de parc.",
    prescripteurs: [
      'Syndics et administrateurs de biens, sur les contrats d’entretien de chaufferie',
      'Agences de gestion locative, qui ont besoin d’un dépanneur réactif sur leur parc',
      'Bailleurs sociaux et gros propriétaires privés',
      'Cuisinistes et salles de bains, sur les raccordements',
    ],
    douleurs: [
      {
        t: 'Le dépannage empêche de construire du récurrent',
        d: "Les journées sont pleines, donc personne n'appelle les gestionnaires de parc. Et sans contrat d'entretien, l'activité redémarre de zéro chaque mois.",
      },
      {
        t: 'Le téléphone sonne pendant les interventions',
        d: "Les mains dans un ballon d'eau chaude, on ne prend pas la commande suivante. Les demandes du matin qu'on rappelle le soir sont déjà traitées par un autre.",
      },
      {
        t: 'Les aides sur le chauffage changent tous les ans',
        d: "Vos clients arrivent avec des idées fausses sur ce à quoi ils ont droit. Un discours à jour, écrit une fois et corrigé à chaque changement, évite de perdre l'appel sur un malentendu.",
      },
    ],
    exempleContexte: "Premier message à une agence de gestion locative",
    exempleMessage:
      "Bonjour, je suis Karim, plombier chauffagiste sur le secteur. Je travaille avec plusieurs agences qui avaient besoin de quelqu'un qui décroche vraiment quand un locataire n'a plus d'eau chaude. Est-ce que vous êtes bien couverts sur ce type de dépannage en ce moment ? Si votre plombier habituel est débordé je peux prendre le débordement, ça se teste sans rien changer chez vous.",
    saisonnalite:
      "La prospection entretien se lance en fin d'été, avant la première vague de pannes de chauffage : c'est le moment où un gestionnaire écoute. En plein hiver, on baisse la cadence, parce que vous n'avez plus une heure de libre et qu'un contact chaud non rappelé est un contact perdu.",
    faq: [
      {
        q: 'Je fais surtout du dépannage. Ça vaut le coup ?',
        a: "Si votre problème est de rater des appels plutôt que d'en manquer, l'Agent Accueil 24/7 (390 € puis 89 € par mois) sert plus que la prospection. On le dit à l'appel de cadrage, et on ne vend pas l'agent de prospection à quelqu'un qui n'en a pas besoin.",
      },
      {
        q: "L'agent peut-il prendre des rendez-vous d'entretien tout seul ?",
        a: "Il qualifie et il propose des créneaux, mais la confirmation vous revient : sur un parc de chaufferies, un rendez-vous mal calé coûte une demi-journée. Le réglage se décide avec vous.",
      },
    ],
  },
  {
    slug: 'electricien',
    nom: 'électricien',
    pluriel: 'électriciens',
    label: 'Électriciens',
    metaTitle: 'Agent IA de prospection pour électriciens · SmatchRoom Pulse',
    metaDescription:
      "Un agent IA qui prospecte pour votre entreprise d'électricité : mises aux normes, rénovation, bornes de recharge, tertiaire. Contact des prescripteurs de votre zone à votre nom.",
    intro:
      "L'électricité a deux marchés qui n'ont rien à voir : le particulier qui refait son tableau, et le tertiaire qui a besoin d'un contrat de maintenance. Le second se gagne par une prospection régulière que personne n'a le temps de faire.",
    prescripteurs: [
      'Agences immobilières et notaires, sur les mises aux normes avant vente',
      'Gestionnaires de locaux tertiaires, bureaux, commerces, cabinets médicaux',
      'Installateurs de bornes de recharge et gestionnaires de flottes',
      "Maîtres d'œuvre et entreprises générales, sur les lots électricité",
    ],
    douleurs: [
      {
        t: 'Un carnet dépendant d’un seul donneur d’ordre',
        d: 'Beaucoup d’électriciens vivent d’une ou deux entreprises générales. Le jour où l’une arrête, il n’y a pas de deuxième source, et il faut trois mois pour en construire une.',
      },
      {
        t: 'Le diagnostic avant vente est un flux à capter',
        d: "Chaque bien vendu avec une anomalie électrique génère un devis. Ce flux passe par les agences et les diagnostiqueurs, pas par la recherche Google.",
      },
      {
        t: 'Les devis tertiaires demandent du suivi',
        d: 'Un devis envoyé à un gestionnaire de bureaux attend un budget, un trimestre, une validation. Sans relance calendaire, il tombe dans l’oubli.',
      },
    ],
    exempleContexte: 'Premier message à un gestionnaire de locaux tertiaires',
    exempleMessage:
      "Bonjour, je suis Sébastien, électricien. On intervient pas mal sur des bureaux et des commerces, surtout pour les mises aux normes et les petites urgences qui bloquent l'activité. Est-ce que vous avez un électricien attitré sur vos locaux, ou c'est au coup par coup ? Si c'est au coup par coup je peux vous faire une visite de contrôle, ça vous donnera une base pour comparer.",
    saisonnalite:
      "Le tertiaire se prospecte en janvier et en septembre, quand les budgets s'ouvrent. Le particulier suit le rythme des ventes immobilières, donc le printemps. On cale les deux campagnes séparément plutôt que d'envoyer le même message toute l'année.",
    faq: [
      {
        q: 'Je peux viser uniquement le tertiaire ?',
        a: "Oui, et c'est souvent le bon choix : le ticket est plus élevé et le client est plus fidèle. On construit alors la base sur les gestionnaires, les commerces et les cabinets de votre zone, pas sur des particuliers.",
      },
      {
        q: 'Vous gérez les bornes de recharge ?',
        a: "L'agent sait en parler si c'est une de vos prestations, avec vos qualifications réelles. On ne lui fait jamais annoncer une certification que vous n'avez pas : c'est le genre de mensonge qui se retourne au premier rendez-vous.",
      },
    ],
  },
  {
    slug: 'macon',
    nom: 'maçon',
    pluriel: 'maçons',
    label: 'Maçons et gros œuvre',
    metaTitle: 'Agent IA de prospection pour maçons · SmatchRoom Pulse',
    metaDescription:
      "Un agent IA qui va chercher vos chantiers de maçonnerie : extensions, ravalement, gros œuvre. Contact des architectes, agences et syndics de votre secteur, à votre nom.",
    intro:
      "En maçonnerie, un seul chantier peut occuper l'équipe deux mois. Le risque n'est pas de manquer de travail cette semaine, c'est le trou de trois semaines dans quatre mois, celui qu'on ne voit venir qu'une fois qu'il est là.",
    prescripteurs: [
      "Architectes et maîtres d'œuvre, sur les extensions et les surélévations",
      'Syndics, sur les ravalements et les reprises de structure',
      'Agences immobilières, sur les biens vendus avec travaux à prévoir',
      'Constructeurs et promoteurs, sur les lots gros œuvre',
    ],
    douleurs: [
      {
        t: 'Le carnet se voit trop tard',
        d: "Quand on s'aperçoit du trou, il est trop tard pour le combler : un chantier de maçonnerie se signe deux à trois mois avant de démarrer. La prospection doit donc tourner en continu, même quand l'agenda est plein.",
      },
      {
        t: 'Les architectes ne connaissent que deux ou trois entreprises',
        d: "Ils travaillent avec ceux qui les ont contactés et qui ont tenu les délais. Entrer dans cette liste est un travail de mise en relation, pas de publicité.",
      },
      {
        t: 'Les demandes de particuliers sont souvent hors sujet',
        d: 'Beaucoup de temps passé à chiffrer des projets sans budget. Un agent qui pose trois questions avant de transmettre écarte l’essentiel de ce bruit.',
      },
    ],
    exempleContexte: "Premier message à un architecte",
    exempleMessage:
      "Bonjour, je suis Antoine, maçon. On fait beaucoup d'extensions et de reprises en sous-œuvre, avec une équipe qui reste la même d'un chantier à l'autre. Est-ce que vous avez des entreprises de gros œuvre sur lesquelles vous pouvez compter en ce moment, ou vous cherchez encore ? Je peux vous montrer deux chantiers finis, ça parle plus qu'un dossier.",
    saisonnalite:
      "Le gros œuvre se prospecte à contretemps : on écrit aux architectes en automne pour des chantiers de printemps. Les campagnes lancées en même temps que la saison arrivent systématiquement trop tard.",
    faq: [
      {
        q: 'Comment vous évitez les demandes sans budget ?',
        a: "L'agent pose la question du budget et du calendrier avant de vous transmettre quoi que ce soit, dans des termes que vous validez. Ce n'est pas un filtre parfait, mais il écarte la majorité des projets qui n'existent que dans une tête.",
      },
      {
        q: 'Mon équipe est déjà pleine six mois. À quoi bon ?',
        a: "À ne pas repartir de zéro dans six mois. On peut aussi caler la cadence très bas, deux ou trois contacts par jour, uniquement sur des prescripteurs, pour entretenir le réseau sans générer un flux que vous ne pouvez pas traiter.",
      },
    ],
  },
  {
    slug: 'peintre-facadier',
    nom: 'peintre-façadier',
    pluriel: 'peintres et façadiers',
    label: 'Peintres et façadiers',
    metaTitle: 'Agent IA de prospection pour peintres et façadiers · Pulse',
    metaDescription:
      "Un agent IA qui vous amène des chantiers de peinture et de ravalement : syndics, agences de gestion locative, entreprises générales. Prospection à votre nom, 7j/7.",
    intro:
      "La peinture est le métier où le volume compte le plus : beaucoup de petits chantiers, des marges serrées, et une dépendance forte à un ou deux donneurs d'ordre. Diversifier les sources est vital, et c'est un travail de contact répétitif.",
    prescripteurs: [
      'Syndics de copropriété, sur les cages d’escalier et les ravalements',
      'Agences de gestion locative, sur les remises en état entre deux locataires',
      'Entreprises générales et constructeurs, sur les lots peinture',
      'Agences immobilières, sur le home staging avant mise en vente',
    ],
    douleurs: [
      {
        t: 'La remise en état locative est un flux régulier et mal capté',
        d: "Chaque changement de locataire est un petit chantier. Une agence qui gère des centaines de lots en génère toutes les semaines, et elle travaille avec celui qui s'est présenté.",
      },
      {
        t: 'Une dépendance à un donneur d’ordre unique',
        d: "Travailler à 80 % pour une entreprise générale, c'est confortable jusqu'au jour où elle change de prestataire ou tarde à payer.",
      },
      {
        t: 'Le ravalement se décide un an à l’avance',
        d: 'En copropriété, le vote passe en assemblée générale. Être connu du syndic avant le vote change tout, après il est trop tard.',
      },
    ],
    exempleContexte: 'Premier message à une agence de gestion locative',
    exempleMessage:
      "Bonjour, je suis Marc, peintre. Je travaille surtout sur des remises en état entre deux locataires, en général en deux ou trois jours pour ne pas bloquer la relocation. Est-ce que vous avez un peintre disponible sur ce délai en ce moment ? Si vous voulez, je fais le prochain lot au même tarif que votre prestataire actuel, vous comparez sur pièce.",
    saisonnalite:
      "Les façades se prospectent en hiver pour des chantiers d'été, la remise en état locative tourne toute l'année avec un pic à la rentrée universitaire dans les villes étudiantes. On sépare les deux campagnes.",
    faq: [
      {
        q: 'Les petits chantiers valent-ils le coût de la prospection ?',
        a: "Un contact avec une agence de gestion ne vaut pas un chantier, il vaut un flux. C'est pour ça que la cible prioritaire de l'agent est le gestionnaire, pas le particulier qui repeint son salon.",
      },
      {
        q: 'Vous parlez de prix dans les messages ?',
        a: "Non, jamais de tarif dans un premier message : c'est le meilleur moyen d'être comparé avant d'avoir été rencontré. L'agent propose une visite ou un chantier test.",
      },
    ],
  },
  {
    slug: 'paysagiste',
    nom: 'paysagiste',
    pluriel: 'paysagistes',
    label: 'Paysagistes et entretien d’espaces verts',
    metaTitle: 'Agent IA de prospection pour paysagistes · SmatchRoom Pulse',
    metaDescription:
      "Un agent IA qui vous décroche des contrats d'entretien d'espaces verts : syndics, gestionnaires de sites, collectivités, résidences. Prospection WhatsApp et email à votre nom.",
    intro:
      "En paysage, tout se joue sur le contrat annuel d'entretien. Un client qui signe reste plusieurs années, et le chiffre devient prévisible. Le problème, c'est que ces contrats se gagnent auprès de gestionnaires qu'on ne croise jamais sur un chantier de particulier.",
    prescripteurs: [
      'Syndics et administrateurs de biens, sur les espaces verts de résidences',
      'Gestionnaires de sites tertiaires, zones d’activité, sièges d’entreprise',
      'Bailleurs et résidences de services',
      'Promoteurs, sur les aménagements de livraison de programmes neufs',
    ],
    douleurs: [
      {
        t: 'Une activité en dents de scie',
        d: "La création explose au printemps et s'effondre en hiver. Les contrats d'entretien sont ce qui lisse l'année et permet de garder une équipe.",
      },
      {
        t: 'Les appels d’offres passent inaperçus',
        d: 'Les consultations de résidences et de sites tertiaires ne sont pas publiques et se décident entre deux devis connus. Il faut être dans la boucle avant.',
      },
      {
        t: 'Le devis de création demande une visite',
        d: "Chaque projet mange une demi-journée avant même d'être chiffré. Qualifier en amont évite de se déplacer pour rien.",
      },
    ],
    exempleContexte: 'Premier message à un syndic',
    exempleMessage:
      "Bonjour, je suis Nicolas, paysagiste. On entretient plusieurs résidences sur le secteur, avec un passage régulier et un référent unique pour éviter les allers-retours. Est-ce que vous avez des copropriétés où l'entretien des extérieurs pose problème en ce moment ? Je peux passer voir une résidence et vous dire ce que je ferais différemment, sans engagement.",
    saisonnalite:
      "Les contrats d'entretien se prospectent en janvier et février, avant la saison, parce que c'est le moment où un syndic arbitre son budget annuel. Prospecter en mai, c'est arriver quand tout est déjà signé.",
    faq: [
      {
        q: 'Vous ciblez les particuliers ou les professionnels ?',
        a: "Les professionnels pour l'agent de prospection, parce que c'est là que sont les contrats annuels. Pour les particuliers, la fiche établissement Google et la publicité locale fonctionnent mieux qu'un message.",
      },
      {
        q: 'Les collectivités passent par des marchés publics, non ?',
        a: "Souvent oui, et ce n'est pas le même travail : ça se joue sur la veille et le dossier, pas sur la prospection directe. On vous le dit franchement plutôt que de vous vendre un agent qui n'y changera rien.",
      },
    ],
  },
  {
    slug: 'renovation-energetique',
    nom: 'spécialiste de la rénovation énergétique',
    pluriel: 'entreprises de rénovation énergétique',
    label: 'Rénovation énergétique et isolation',
    metaTitle: 'Agent IA de prospection en rénovation énergétique · Pulse',
    metaDescription:
      "Un agent IA qui vous amène des chantiers d'isolation et de rénovation énergétique par la prescription : agences, syndics, diagnostiqueurs. Sans démarchage de particuliers.",
    intro:
      "La rénovation énergétique souffre d'un problème que les autres métiers n'ont pas : le démarchage téléphonique de particuliers a saturé le marché et abîmé la confiance. Le seul chemin propre qui reste, c'est la prescription.",
    prescripteurs: [
      'Diagnostiqueurs immobiliers, qui voient les étiquettes énergie avant tout le monde',
      'Agences immobilières, sur les biens classés F et G difficiles à vendre ou à louer',
      'Syndics, sur les rénovations globales de copropriété',
    ],
    douleurs: [
      {
        t: 'Le démarchage direct est grillé et encadré',
        d: "Le téléphone froid vers les particuliers sur la rénovation énergétique est à la fois très mal reçu et strictement encadré. On ne le fait pas, et on refuse les missions qui le demandent.",
      },
      {
        t: 'Les aides changent et les clients arrivent mal informés',
        d: "Une bonne partie du temps commercial part en explications de dispositifs. Un discours à jour, corrigé à chaque évolution, économise ces heures.",
      },
      {
        t: 'Les biens classés F et G sont un signal identifiable',
        d: "Ce sont des logements où des travaux vont être faits, souvent au moment d'une vente. Les professionnels qui les manipulent sont peu nombreux et joignables.",
      },
    ],
    exempleContexte: 'Premier message à un diagnostiqueur immobilier',
    exempleMessage:
      "Bonjour, je suis Émilie, on fait de la rénovation énergétique sur le secteur. Vous voyez passer des logements classés F ou G où les propriétaires ne savent pas par quoi commencer. Est-ce que ça vous intéresse d'avoir quelqu'un à qui les orienter, avec un retour sur ce qui a été fait ? On fonctionne en apport d'affaires, c'est cadré et payé.",
    saisonnalite:
      "L'activité suit les annonces de dispositifs plus que les saisons. Chaque changement de règle rebat les cartes, et c'est le moment où les prescripteurs cherchent un interlocuteur qui maîtrise le sujet : le discours est réécrit à ce moment-là.",
    faq: [
      {
        q: 'Vous faites du démarchage de particuliers pour l’isolation ?',
        a: "Non, et c'est une limite ferme. La prospection se fait vers des professionnels qui ont les particuliers comme clients. C'est moins volumineux et beaucoup plus solide.",
      },
      {
        q: 'Vous pouvez identifier les logements mal classés ?',
        a: "On sait travailler à partir des données publiques de diagnostics énergétiques, qui sont ouvertes. Ce qu'on n'utilise pas, ce sont les données personnelles des occupants : la cible reste le professionnel, pas l'habitant.",
      },
    ],
  },
];

export const VILLES = [
  {
    slug: 'bordeaux',
    nom: 'Bordeaux',
    dept: 'Gironde',
    deptNum: '33',
    metaTitle: "Agence d'IA et d'automatisation à Bordeaux · SmatchRoom Pulse",
    metaDescription:
      "Agence d'automatisation et d'agents IA basée à Bordeaux : prospection automatisée, accueil téléphonique, sites et fiches Google pour artisans, TPE et PME. Prix affichés.",
    intro:
      "Notre siège est à Bordeaux, 5 rue Fénelon. C'est la ville où nous avons construit nos premiers agents et où nous voyons nos clients en personne quand c'est utile, ce qui reste le meilleur moyen de comprendre un métier avant d'écrire à sa place.",
    tissu:
      "Bordeaux cumule un parc ancien considérable, une pression locative forte et un rythme de transactions immobilières soutenu. Pour un artisan, cela veut dire un flux permanent de remises en état, de mises aux normes et de rénovations avant vente, entièrement piloté par une poignée d'intermédiaires : agences, syndics, diagnostiqueurs, administrateurs de biens. C'est précisément la cible que nos agents savent contacter.",
    specificite:
      "La concurrence est dense sur les recherches génériques du type « couvreur Bordeaux » : s'y battre en publicité coûte cher pour un résultat incertain. Nous privilégions donc deux chemins moins encombrés : la prescription professionnelle, où le nombre d'interlocuteurs est fini et où un message bien écrit se remarque, et le référencement par quartier et par prestation, beaucoup moins disputé que la requête reine.",
    communes: ['Le Bouscat', 'Talence', 'Bègles', 'Caudéran', 'Bastide', 'Chartrons'],
    metiers: ['couvreur', 'renovation-energetique', 'peintre-facadier', 'electricien'],
    faq: [
      {
        q: 'Vous recevez à Bordeaux ?',
        a: "Le siège est bien à Bordeaux et nous nous déplaçons dans la métropole. Cela dit, la plupart des cadrages se font au téléphone en trente minutes : ça évite à un artisan de perdre une demi-journée de chantier.",
      },
      {
        q: 'Vous travaillez avec des entreprises hors Gironde ?',
        a: "Oui, la moitié de nos clients est ailleurs. La ville sert à définir la zone de prospection de l'agent, pas à limiter qui peut travailler avec nous.",
      },
    ],
  },
  {
    slug: 'merignac',
    nom: 'Mérignac',
    dept: 'Gironde',
    deptNum: '33',
    metaTitle: "Agence d'automatisation et d'agents IA à Mérignac · Pulse",
    metaDescription:
      "Agents IA de prospection, accueil 24/7 et visibilité locale pour les artisans et TPE de Mérignac et de l'ouest de la métropole bordelaise. Fabrication puis mensuel léger.",
    intro:
      "Mérignac est une de nos zones d'intervention historiques, avec un profil d'entreprises très différent du centre de Bordeaux : plus de zones d'activité, plus de tertiaire, et beaucoup d'artisans installés sur des locaux avec dépôt.",
    tissu:
      "Le poids des zones d'activité et de l'aéronautique crée une demande tertiaire régulière : maintenance de locaux, électricité, plomberie, entretien d'espaces verts de sites d'entreprise. Ce sont des contrats récurrents, décidés par des gestionnaires de sites joignables par email, et rarement par une recherche Google.",
    specificite:
      "Le pavillonnaire mérignacais des années soixante et soixante-dix arrive à l'âge des gros travaux : toitures, isolation, menuiseries, électricité. Sur ce segment, la fiche établissement Google et les pages par quartier pèsent plus lourd que la publicité, parce que la recherche du particulier est déjà une intention d'achat.",
    communes: ['Pessac', 'Le Haillan', 'Eysines', 'Saint-Médard-en-Jalles', 'Martignas', 'Le Taillan'],
    metiers: ['electricien', 'plombier-chauffagiste', 'paysagiste', 'couvreur'],
    faq: [
      {
        q: 'Vous couvrez toute la métropole depuis Mérignac ?',
        a: "Oui. La zone de prospection se définit en communes, pas en rayon théorique : on liste avec vous celles où vous acceptez d'intervenir, et l'agent ne sort pas de cette liste.",
      },
      {
        q: 'Le tertiaire, ça se prospecte comment ?',
        a: "Par email principalement, vers les gestionnaires de sites et de locaux, avec un discours qui parle de continuité d'activité plutôt que de prix. WhatsApp fonctionne mal sur cette cible.",
      },
    ],
  },
  {
    slug: 'pessac',
    nom: 'Pessac',
    dept: 'Gironde',
    deptNum: '33',
    metaTitle: "Agents IA et automatisation pour artisans à Pessac · Pulse",
    metaDescription:
      "Prospection automatisée, relance de devis et visibilité locale pour les artisans et TPE de Pessac et du sud-ouest de la métropole bordelaise.",
    intro:
      "Pessac mélange campus universitaire, résidentiel étendu et vignoble urbain. Pour un artisan, cela donne trois clientèles distinctes qui ne se prospectent pas de la même manière.",
    tissu:
      "La présence universitaire alimente un parc locatif important, donc un flux régulier de remises en état entre deux locataires : peinture, plomberie, petites réparations. Ce flux passe par les agences de gestion locative et les résidences étudiantes, des interlocuteurs peu nombreux et facilement identifiables.",
    specificite:
      "À côté de cela, le résidentiel pavillonnaire de Pessac génère des chantiers de rénovation lourde, avec des cycles de décision longs où la relance des devis fait la différence. C'est le terrain type de l'Agent Gestionnaire, plus utile ici qu'un volume supplémentaire de contacts entrants.",
    communes: ['Gradignan', 'Talence', 'Canéjan', 'Cestas', 'Léognan', 'Villenave-d’Ornon'],
    metiers: ['peintre-facadier', 'menuisier', 'plombier-chauffagiste', 'macon'],
    faq: [
      {
        q: 'La remise en état locative est-elle un bon marché ?',
        a: "C'est un marché de flux : petits montants, mais réguliers et rapides à exécuter. Il se gagne auprès des gestionnaires, et un seul contact bien placé peut alimenter plusieurs interventions par mois.",
      },
      {
        q: 'Combien de temps avant les premiers retours ?',
        a: "On ne promet pas de délai de résultat. Ce qui est cadré, c'est le travail : les messages partent selon la cadence convenue et chaque réponse est traitée en moins d'une minute.",
      },
    ],
  },
  {
    slug: 'libourne',
    nom: 'Libourne',
    dept: 'Gironde',
    deptNum: '33',
    metaTitle: "Agence d'agents IA pour artisans à Libourne · SmatchRoom Pulse",
    metaDescription:
      "Agents IA de prospection et de relance pour les artisans du Libournais : bâti ancien, patrimoine viticole, rénovation. Prospection à votre nom, WhatsApp et email.",
    intro:
      "Le Libournais est un territoire de bâti ancien et de patrimoine viticole, où les chantiers demandent un savoir-faire particulier. C'est un avantage commercial mal exploité : les entreprises capables de travailler la pierre et le bois anciens sont rares, mais elles ne le disent nulle part.",
    tissu:
      "Entre les centres anciens de Libourne et de Saint-Émilion, les propriétés viticoles et les bourgs alentour, la demande porte sur la restauration plus que sur le neuf : couverture en tuile canal, enduits à la chaux, menuiseries sur mesure, reprises de maçonnerie. Les donneurs d'ordre sont des propriétaires privés, des architectes du patrimoine et des exploitations.",
    specificite:
      "La zone est étendue et peu dense : la prospection y a plus de valeur qu'en métropole, parce qu'un artisan ne peut pas compter sur le passage. En revanche la cadence doit rester basse et le discours très spécialisé, sinon les messages sonnent comme du démarchage générique venu de la ville.",
    communes: ['Saint-Émilion', 'Coutras', 'Castillon-la-Bataille', 'Branne', 'Guîtres', 'Fronsac'],
    metiers: ['macon', 'couvreur', 'menuisier', 'peintre-facadier'],
    faq: [
      {
        q: 'La zone est vaste. Ça vaut le coup de prospecter loin ?',
        a: "On définit la zone avec vous en tenant compte du temps de trajet : un chantier à une heure de route ne se rentabilise que sur un certain montant. L'agent ne contacte personne au-delà de la limite fixée.",
      },
      {
        q: 'Vous savez parler restauration du patrimoine ?',
        a: "L'agent parle avec vos mots et vos références de chantiers, parce que c'est vous qui les fournissez au cadrage. Sur un métier de spécialité, c'est cette précision qui fait la différence avec un message passe-partout.",
      },
    ],
  },
  {
    slug: 'arcachon',
    nom: 'Arcachon',
    dept: 'Gironde',
    deptNum: '33',
    metaTitle: "Agents IA pour artisans du bassin d'Arcachon · Pulse",
    metaDescription:
      "Prospection automatisée et accueil 24/7 pour les artisans du bassin d'Arcachon : résidences secondaires, gestion locative saisonnière, entretien.",
    intro:
      "Le bassin d'Arcachon a une économie du bâtiment dictée par la résidence secondaire. Le client n'habite pas sur place, décide à distance et veut être rassuré : c'est un contexte où la réactivité aux messages compte plus qu'ailleurs.",
    tissu:
      "Un propriétaire qui vit à Paris ou à Bordeaux confie ses travaux à qui répond vite et rend compte par écrit. Les intermédiaires locaux, agences de gestion locative saisonnière, concierges, syndics de résidences, arbitrent une bonne partie de ces chantiers, et cherchent en permanence des artisans fiables hors saison.",
    specificite:
      "La saisonnalité est brutale : impossible d'intervenir en juillet et août dans un logement loué, donc tout se concentre au printemps et à l'automne. Une prospection qui ne tient pas compte de ce calendrier arrive systématiquement au mauvais moment. L'exposition au vent et au sel accélère par ailleurs l'usure des toitures, des façades et des menuiseries : la demande d'entretien y est structurellement plus élevée.",
    communes: ['La Teste-de-Buch', 'Gujan-Mestras', 'Le Teich', 'Biganos', 'Andernos', 'Lège-Cap-Ferret'],
    metiers: ['couvreur', 'menuisier', 'peintre-facadier', 'paysagiste'],
    faq: [
      {
        q: 'Comment gérer les propriétaires à distance ?',
        a: "L'Agent Accueil 24/7 est particulièrement adapté ici : il prend la demande à toute heure, note le besoin et l'adresse, et vous transmet. Un propriétaire qui écrit le dimanche soir n'attend pas le lundi midi.",
      },
      {
        q: 'On prospecte quand, avec la saison ?',
        a: "Deux fenêtres : février-avril pour les travaux d'avant-saison, septembre-novembre pour les reprises d'après-saison. Le reste du temps, on garde une cadence d'entretien du réseau.",
      },
    ],
  },
  {
    slug: 'bayonne',
    nom: 'Bayonne',
    dept: 'Pyrénées-Atlantiques',
    deptNum: '64',
    metaTitle: "Agence d'agents IA pour artisans à Bayonne · SmatchRoom Pulse",
    metaDescription:
      "Agents IA de prospection et de relance pour les artisans et TPE du Pays basque : Bayonne, Anglet, Biarritz. Prospection WhatsApp et email à votre nom.",
    intro:
      "Sur la côte basque, le bâtiment travaille dans un marché immobilier tendu et haut de gamme, avec des clients exigeants sur la finition et le suivi. Le sérieux commercial fait partie de la prestation attendue.",
    tissu:
      "Entre Bayonne, Anglet et Biarritz, la rénovation de standing, les résidences secondaires et la gestion locative saisonnière alimentent une demande continue. Les architectes, maîtres d'œuvre et agences de gestion y jouent un rôle de filtre : ils sélectionnent les entreprises et les recommandent, ou pas.",
    specificite:
      "Deux particularités locales. La proximité de la frontière élargit la concurrence, avec des entreprises espagnoles présentes sur certains lots. Et la clientèle attend un niveau de réponse écrite qui dépasse ce qu'un artisan seul peut tenir depuis un chantier : c'est exactement le trou que comble un agent qui répond en une minute, à votre nom, et qui vous passe la main.",
    communes: ['Anglet', 'Biarritz', 'Saint-Jean-de-Luz', 'Boucau', 'Bidart', 'Hendaye'],
    metiers: ['menuisier', 'couvreur', 'renovation-energetique', 'electricien'],
    faq: [
      {
        q: 'Vous intervenez au Pays basque depuis Bordeaux ?',
        a: "Oui, et sans déplacement nécessaire : le cadrage se fait au téléphone, la mise en route à distance. Ce qui compte c'est de connaître votre marché, pas d'avoir un bureau dans la rue d'à côté.",
      },
      {
        q: 'Les messages peuvent-ils être en basque ou en espagnol ?',
        a: "L'espagnol est possible si une partie de votre clientèle ou de vos prescripteurs est de l'autre côté de la frontière. On ne le fait pas par défaut : un message dans la mauvaise langue est plus dommageable qu'utile.",
      },
    ],
  },
  {
    slug: 'dax',
    nom: 'Dax',
    dept: 'Landes',
    deptNum: '40',
    metaTitle: "Agents IA et automatisation pour artisans à Dax · Pulse",
    metaDescription:
      "Prospection automatisée pour les artisans et TPE de Dax et du sud des Landes : thermalisme, résidences de services, rénovation. Fabrication puis mensuel léger.",
    intro:
      "Dax vit en grande partie du thermalisme, ce qui crée une économie du bâtiment particulière : beaucoup d'établissements recevant du public, des résidences de services, et des exigences de mise aux normes régulières.",
    tissu:
      "Établissements thermaux, résidences de vacances, hôtellerie et logements adaptés forment un parc entretenu par des gestionnaires professionnels, qui planifient leurs travaux hors saison et travaillent avec des entreprises référencées. Pour un artisan, entrer dans ce cercle vaut plusieurs années de chantiers.",
    specificite:
      "Les travaux se concentrent sur les périodes de fermeture, souvent en fin d'automne et en hiver, ce qui inverse le calendrier habituel du bâtiment. Une prospection calée sur les saisons classiques rate la fenêtre de décision, qui se situe plusieurs mois avant.",
    communes: ['Saint-Paul-lès-Dax', 'Tercis', 'Narrosse', 'Mées', 'Rion-des-Landes', 'Pouillon'],
    metiers: ['plombier-chauffagiste', 'electricien', 'peintre-facadier', 'renovation-energetique'],
    faq: [
      {
        q: "Les établissements recevant du public, c'est accessible pour une petite entreprise ?",
        a: "Oui pour les lots d'entretien et de mise aux normes, à condition d'être connu du gestionnaire au moment où il planifie. C'est un travail de contact régulier, pas de réponse à annonce.",
      },
      {
        q: 'Vous connaissez le tissu landais ?',
        a: "Nous y avons des clients actifs, notamment en couverture et en rénovation. Cela dit, ce qui rend un agent pertinent, c'est le cadrage de votre entreprise, pas notre connaissance générale du département.",
      },
    ],
  },
  {
    slug: 'mont-de-marsan',
    nom: 'Mont-de-Marsan',
    dept: 'Landes',
    deptNum: '40',
    metaTitle: "Agence d'agents IA pour artisans à Mont-de-Marsan · Pulse",
    metaDescription:
      "Agents IA de prospection, relance de devis et visibilité locale pour les artisans et TPE de Mont-de-Marsan et du nord des Landes.",
    intro:
      "Mont-de-Marsan est un marché de proximité où la réputation circule vite, dans les deux sens. La prospection y sert moins à se faire connaître qu'à se rappeler régulièrement aux bons interlocuteurs.",
    tissu:
      "Chef-lieu administratif entouré de communes rurales, la ville concentre les services, les bailleurs et les gestionnaires du département, tandis que l'activité de chantier est dispersée sur un large rayon. Cette géométrie favorise les entreprises capables d'organiser leurs tournées, et rend décisive la qualification des demandes avant déplacement.",
    specificite:
      "Le tissu économique est marqué par l'agricole et l'agroalimentaire, qui génèrent des besoins de bâtiments d'activité, d'électricité et de maintenance très différents du résidentiel. Peu d'artisans prospectent explicitement ce segment, ce qui en fait une porte encore ouverte.",
    communes: ['Saint-Pierre-du-Mont', 'Saint-Avit', 'Bougue', 'Campagne', 'Uchacq', 'Bretagne-de-Marsan'],
    metiers: ['electricien', 'macon', 'couvreur', 'paysagiste'],
    faq: [
      {
        q: 'La zone est rurale et étendue, ça change quoi ?',
        a: "Le temps de trajet devient un critère de qualification : l'agent demande la commune et la nature du chantier avant de vous transmettre, pour que vous ne fassiez pas quarante minutes de route pour un devis de deux cents euros.",
      },
      {
        q: 'Le monde agricole se prospecte comment ?',
        a: "Par email et par téléphone plus que par WhatsApp, avec un discours sur la disponibilité et la panne évitée. C'est un segment où la relation compte beaucoup : l'agent ouvre la porte, il ne conclut pas.",
      },
    ],
  },
  {
    slug: 'agen',
    nom: 'Agen',
    dept: 'Lot-et-Garonne',
    deptNum: '47',
    metaTitle: "Agents IA pour artisans et TPE à Agen · SmatchRoom Pulse",
    metaDescription:
      "Prospection automatisée et accueil des demandes pour les artisans d'Agen et du Lot-et-Garonne. Agents IA à votre nom, WhatsApp et email, prix affichés.",
    intro:
      "Agen est un marché de taille moyenne où presque tout le monde se connaît de nom. L'avantage d'un agent, ici, n'est pas le volume : c'est la régularité, celle qu'une entreprise de cinq personnes ne tient pas à la main.",
    tissu:
      "Le parc de logements anciens du centre et des bastides alentour alimente une demande continue de rénovation, tandis que les zones d'activité et l'agroalimentaire font vivre la maintenance de bâtiments. Les gestionnaires de patrimoine locatif et les agences immobilières concentrent une grande partie des décisions de travaux.",
    specificite:
      "Sur un marché de cette taille, un message maladroit se sait. C'est la raison pour laquelle nous n'envoyons jamais de messages uniformes et pourquoi les premiers envois vous sont soumis avant de partir : la réputation locale est un actif qu'une campagne mal écrite peut abîmer durablement.",
    communes: ['Le Passage', 'Bon-Encontre', 'Boé', 'Foulayronnes', 'Pont-du-Casse', 'Colayrac'],
    metiers: ['macon', 'menuisier', 'renovation-energetique', 'plombier-chauffagiste'],
    faq: [
      {
        q: 'Sur un marché où tout le monde se connaît, un agent ne fait pas artificiel ?',
        a: "Il le devient si les messages sont uniformes, et c'est pour ça qu'ils ne le sont pas : chaque message est écrit pour l'entreprise à qui il s'adresse. La mention du caractère automatisé est obligatoire et présente dès le premier message, ce qui vaut mieux qu'un faux naturel démasqué au téléphone.",
      },
      {
        q: 'Vous facturez le déplacement pour un cadrage à Agen ?',
        a: "Il n'y a pas de déplacement : le cadrage se fait en trente minutes au téléphone, et c'est offert.",
      },
    ],
  },
  {
    slug: 'perigueux',
    nom: 'Périgueux',
    dept: 'Dordogne',
    deptNum: '24',
    metaTitle: "Agence d'agents IA pour artisans à Périgueux · Pulse",
    metaDescription:
      "Agents IA de prospection pour les artisans de Périgueux et de Dordogne : bâti ancien, résidences secondaires, restauration du patrimoine.",
    intro:
      "La Dordogne est un département de patrimoine et de résidences secondaires, souvent détenues par des propriétaires étrangers ou parisiens. Les artisans qui savent gérer une relation à distance y ont un avantage net.",
    tissu:
      "Bâti ancien en pierre, toitures en tuile et en lauze, propriétés à restaurer : la demande est technique et le nombre d'entreprises capables de la traiter est limité. Les intermédiaires sont les agences spécialisées dans la vente de propriétés de caractère, les architectes du patrimoine et les gestionnaires de locations saisonnières.",
    specificite:
      "Beaucoup de propriétaires ne sont pas sur place, parfois pas francophones, et jugent une entreprise sur sa capacité à répondre par écrit et à documenter l'avancement. Un agent qui accuse réception, pose les bonnes questions et transmet proprement remplace ici un secrétariat que personne n'a.",
    communes: ['Boulazac', 'Chancelade', 'Coulounieix', 'Trélissac', 'Bergerac', 'Sarlat'],
    metiers: ['macon', 'couvreur', 'menuisier', 'renovation-energetique'],
    faq: [
      {
        q: 'Les propriétaires étrangers, comment on les traite ?',
        a: "L'agent peut répondre en anglais si votre clientèle le justifie. La règle reste la même : on ne fait jamais dire à l'agent une compétence ou une garantie que vous n'avez pas.",
      },
      {
        q: 'Les chantiers de patrimoine sont longs à signer. Ça pose un problème ?',
        a: "Non, c'est même le cas d'usage de la relance : un devis de restauration se décide sur plusieurs mois, et c'est précisément là qu'un relanceur régulier change l'issue.",
      },
    ],
  },
  {
    slug: 'angouleme',
    nom: 'Angoulême',
    dept: 'Charente',
    deptNum: '16',
    metaTitle: "Agents IA et automatisation pour artisans à Angoulême · Pulse",
    metaDescription:
      "Prospection automatisée, relance de devis et visibilité locale pour les artisans et TPE d'Angoulême et de Charente. Prix affichés, sans engagement.",
    intro:
      "Angoulême a un parc ancien important et un marché immobilier accessible, ce qui attire des acheteurs qui rénovent. Pour un artisan, c'est un flux de chantiers de rénovation qui arrive par les agences et les notaires.",
    tissu:
      "Le centre ancien, les faubourgs et les communes de la périphérie concentrent des biens achetés pour être remis à neuf. Les décisions de travaux se prennent souvent juste après la vente, ce qui rend les agences immobilières, les diagnostiqueurs et les courtiers en travaux particulièrement utiles à contacter.",
    specificite:
      "Le rythme est dicté par les transactions : une prospection qui suit le calendrier des ventes, avec un discours orienté sur l'après-achat, touche des gens qui ont un projet daté et un budget déjà financé. C'est très différent d'un message envoyé au hasard à un propriétaire installé depuis vingt ans.",
    communes: ['Soyaux', 'La Couronne', 'Gond-Pontouvre', 'Ruelle-sur-Touvre', 'Saint-Yrieix', 'Cognac'],
    metiers: ['renovation-energetique', 'peintre-facadier', 'electricien', 'plombier-chauffagiste'],
    faq: [
      {
        q: 'Vous ciblez les acheteurs récents ?',
        a: "Indirectement, par les professionnels qui les accompagnent. Nous n'écrivons pas aux particuliers sur la base de données personnelles : la cible de l'agent de prospection est l'entreprise, pas l'habitant.",
      },
      {
        q: 'Un site est-il utile si je prospecte déjà ?',
        a: "Oui, parce que le premier réflexe d'un prescripteur contacté est de vérifier qui vous êtes. Une entreprise introuvable en ligne perd une partie des contacts qu'elle vient de créer.",
      },
    ],
  },
  {
    slug: 'la-rochelle',
    nom: 'La Rochelle',
    dept: 'Charente-Maritime',
    deptNum: '17',
    metaTitle: "Agents IA pour artisans à La Rochelle · SmatchRoom Pulse",
    metaDescription:
      "Agents IA de prospection et d'accueil pour les artisans et TPE de La Rochelle et de Charente-Maritime : locatif étudiant, littoral, résidences secondaires.",
    intro:
      "La Rochelle combine trois demandes : un locatif étudiant très rotatif, un littoral qui abîme les bâtiments, et des résidences secondaires gérées à distance. Chacune se prospecte différemment.",
    tissu:
      "La rotation locative de l'été génère un pic de remises en état sur une fenêtre très courte, arbitré par les agences de gestion et les résidences. À côté, le parc de maisons de bord de mer demande un entretien récurrent des façades, des menuiseries et des couvertures, exposées au vent et au sel.",
    specificite:
      "Le pic de juillet-août est le point critique : les entreprises qui décrochent ces lots sont celles qui ont été référencées au printemps. Une prospection lancée en juin arrive trop tard. C'est un cas où le calendrier de campagne compte plus que le volume de messages.",
    communes: ['Lagord', 'Aytré', 'Périgny', 'Châtelaillon', 'Île de Ré', 'Rochefort'],
    metiers: ['peintre-facadier', 'menuisier', 'couvreur', 'plombier-chauffagiste'],
    faq: [
      {
        q: 'Le pic locatif est très court. Un agent peut suivre ?',
        a: "C'est justement l'intérêt : sur une fenêtre de deux semaines, un agent traite toutes les demandes en moins d'une minute là où un artisan sur chantier rappelle le soir. Mais la campagne doit être lancée au printemps.",
      },
      {
        q: 'Vous couvrez les îles ?',
        a: "Si vous y intervenez, oui. Le temps et le coût de traversée sont intégrés à la qualification, pour ne pas vous envoyer sur un chantier qui perd de l'argent.",
      },
    ],
  },
];

export function findMetier(slug) {
  return METIERS.find((m) => m.slug === slug) || null;
}

export function findVille(slug) {
  return VILLES.find((v) => v.slug === slug) || null;
}
