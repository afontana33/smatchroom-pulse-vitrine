/*
 * ⚠ BROUILLON — document juridique non validé.
 *
 * Réécriture intégrale de la politique de confidentialité (phase 3 de la mise
 * en conformité). L'ancienne version comptait sept sections et ne mentionnait
 * ni base légale, ni durée chiffrée, ni destinataire nommé, ni transfert hors
 * Union européenne, ni droit de limitation, d'opposition ou de portabilité, ni
 * réclamation CNIL, ni information au titre de l'article 14.
 *
 * À relire et valider par un avocat avant mise en ligne.
 *
 * Cohérence documentaire à maintenir. Toute modification de la liste des
 * sous-traitants, des durées de conservation ou des finalités doit être
 * répercutée dans : /mentions-legales, /cgv-services (article 15),
 * legal/dpa-sous-traitance.md et legal/registre-traitements.md.
 *
 * Les faits techniques de ce document (localisation des serveurs, identité des
 * sous-traitants) ont été vérifiés le 8 août 2026 depuis le
 * dépôt. Ne pas les remplacer par une valeur plausible.
 */

import LegalPage from '@/components/LegalPage';

export const metadata = {
  title: 'Politique de confidentialité · SmatchRoom Pulse',
  description:
    "Traitements de données personnelles mis en œuvre par SMATCHROOM SAS : finalités, bases légales, durées de conservation, destinataires, transferts hors Union européenne et droits des personnes.",
};

const SECTIONS = [
  {
    title: '1. Qui est responsable de vos données',
    paragraphs: [
      "SMATCHROOM SAS, société par actions simplifiée immatriculée au RCS de Bordeaux sous le numéro 989 883 509, dont le siège est situé 5 rue Fénelon, 33000 Bordeaux, est responsable des traitements décrits à la section 3.",
      "Pour toute question relative à vos données ou pour exercer vos droits : a.fontana@smatchroom.fr, ou par courrier à l'adresse du siège, à l'attention du responsable de la protection des données.",
      "SMATCHROOM SAS n'a pas désigné de délégué à la protection des données. Sa désignation n'est pas obligatoire au regard de la nature et du volume de ses traitements ; le point de contact ci-dessus tient lieu d'interlocuteur unique.",
    ],
  },
  {
    title: '2. Deux rôles distincts, deux régimes',
    paragraphs: [
      "SMATCHROOM intervient à deux titres différents, qu'il faut lire séparément.",
    ],
    list: [
      "En tant que responsable de traitement, pour ses propres traitements : visiteurs du site, prospects démarchés pour son compte, clients, et personnes contactées par ses agents lorsqu'elle prospecte pour elle-même. Ce sont ces traitements qui sont décrits en section 3, et c'est à leur égard que s'exercent les droits décrits en section 7.",
      "En tant que sous-traitant, lorsqu'elle exploite un agent pour le compte d'un client. Dans ce cas, c'est le client qui détermine les finalités et les moyens : il est responsable de traitement, SMATCHROOM agit sur ses instructions documentées. Ce cadre est décrit en section 4.",
    ],
    note: "Si vous avez été contacté par un agent, la section 5 vous indique comment savoir pour le compte de qui il agissait, et comment vous y opposer.",
  },
  {
    title: '3. Traitements dont SMATCHROOM est responsable',
    paragraphs: [
      "Chaque ligne indique la finalité poursuivie, les données traitées, la base légale au sens de l'article 6 du règlement (UE) 2016/679, la durée de conservation et les destinataires.",
    ],
    table: {
      head: ['Finalité', 'Données', 'Base légale', 'Durée', 'Destinataires'],
      rows: [
        [
          'Répondre à une demande de rendez-vous ou de contact',
          'Nom, prénom, adresse de courriel, société, créneau choisi, contenu du message',
          "Mesures précontractuelles prises à votre demande (art. 6.1.b)",
          "3 ans à compter du dernier contact resté sans suite",
          'Calendly, Google Workspace',
        ],
        [
          "Gérer la relation client et exécuter le contrat",
          "Identité et coordonnées de l'interlocuteur, société, contenu des échanges, paramètres de l'agent, éléments d'exécution",
          'Exécution du contrat (art. 6.1.b)',
          "Durée du contrat, puis 5 ans à compter de son terme au titre de la prescription commerciale",
          'Google Workspace, Supabase, Stripe',
        ],
        [
          'Établir la facturation et tenir la comptabilité',
          'Raison sociale, adresse, numéro de TVA, montants, moyens et historique de paiement',
          'Obligation légale (art. 6.1.c), art. L.123-22 du Code de commerce',
          '10 ans à compter de la clôture de l’exercice',
          'Stripe, expert-comptable',
        ],
        [
          'Prospecter des professionnels pour notre propre compte',
          "Raison sociale, secteur, adresse, nom et fonction du dirigeant lorsqu'ils sont publics, adresse de courriel et numéro professionnels, historique des messages envoyés et des réponses",
          "Intérêt légitime à développer notre activité (art. 6.1.f), sauf lorsque la personne démarchée est une personne physique exerçant en nom propre, auquel cas le consentement préalable est requis (art. L.34-5 CPCE)",
          '3 ans à compter du dernier contact, ou immédiatement en cas d’opposition',
          "Fournisseur du modèle d'IA, infrastructure d'acheminement, Supabase",
        ],
        [
          'Conserver la trace des oppositions et des désinscriptions',
          'Adresse de courriel ou numéro de téléphone, date et canal de l’opposition',
          "Obligation légale de respecter l'opposition (art. 6.1.c combiné à l'art. 21)",
          "3 ans à compter de l'opposition, sans effacement anticipé, cette conservation étant la condition du respect de votre demande",
          'Supabase',
        ],
        [
          "Mesurer l'audience de nos campagnes publicitaires",
          "Identifiant de navigateur, pages consultées, adresse IP",
          'Consentement (art. 6.1.a), recueilli via le bandeau de consentement',
          '90 jours pour le cookie, 6 mois pour la preuve de votre choix',
          'Meta',
        ],
        [
          'Assurer la sécurité du site et de l’infrastructure',
          "Adresse IP, horodatage, agent utilisateur, journaux techniques",
          "Intérêt légitime à protéger nos systèmes (art. 6.1.f)",
          '12 mois',
          'Hostinger',
        ],
      ],
    },
    note: "Aucune décision produisant des effets juridiques à votre égard n'est prise sur le seul fondement d'un traitement automatisé. Les agents rédigent et envoient des messages ; ils ne décident ni d'un refus de contracter, ni d'un tarif, ni d'aucune mesure vous affectant juridiquement.",
  },
  {
    title: '4. Traitements dont SMATCHROOM est sous-traitant',
    paragraphs: [
      "Lorsque nous exploitons un agent pour le compte d'un client, nous traitons pour lui des données de prospection : coordonnées professionnelles des cibles, messages envoyés et réponses reçues, statut de chaque échange.",
      "Nous agissons alors uniquement sur ses instructions documentées. C'est lui qui définit les cibles, la finalité et la durée. Un accord de traitement des données conforme à l'article 28 du règlement est conclu avec chaque client ; il est annexé au contrat et n'est pas optionnel.",
      "Nous n'utilisons jamais les données traitées pour le compte d'un client à nos propres fins, ni pour celles d'un autre client. Elles ne sont pas mutualisées entre clients : chaque agent dispose de son périmètre.",
      "Si vous avez été contacté dans ce cadre et souhaitez exercer vos droits, adressez-vous au client concerné, dont l'identité figure dans le message que vous avez reçu. Vous pouvez également nous écrire : nous transmettrons votre demande sans délai et cesserons de vous contacter pour ce compte.",
    ],
  },
  {
    title: '5. Personnes contactées par nos agents',
    paragraphs: [
      "Cette section vous concerne si vous avez reçu un message d'un de nos agents sans nous avoir jamais communiqué vos coordonnées. Elle constitue l'information prévue à l'article 14 du règlement, applicable lorsque les données n'ont pas été collectées auprès de la personne elle-même.",
    ],
    list: [
      "Origine des données : bases de données publiques et registres officiels, notamment la base Sirene de l'INSEE, le registre national des entreprises de l'INPI, les données ouvertes de l'ADEME et les données de valeurs foncières, ainsi que les informations professionnelles publiées par les entreprises elles-mêmes (site internet, fiche d'établissement, annuaire professionnel).",
      "Catégories de données : raison sociale, secteur d'activité, adresse de l'établissement, nom et fonction du dirigeant lorsqu'ils sont publiés, coordonnées professionnelles, et informations publiques relatives à l'activité.",
      "Finalité : vous adresser une proposition commerciale correspondant à votre activité professionnelle.",
      "Responsable : SMATCHROOM lorsque nous prospectons pour notre compte, ou le client pour le compte duquel l'agent agit, dont l'identité est indiquée dans le message reçu.",
      "Caractère automatisé : le message vous a été adressé par un système d'intelligence artificielle. Le message vous l'indique. Voir la page transparence sur l'IA.",
      "Droit d'opposition : vous pouvez vous opposer à tout moment, sans avoir à vous justifier et sans frais, à recevoir de nouveaux messages. Répondre « STOP » au message reçu suffit ; l'opposition est enregistrée automatiquement et définitivement. Vous pouvez aussi écrire à a.fontana@smatchroom.fr.",
      "Délai : nous ne conservons vos coordonnées que trois ans à compter du dernier contact. En cas d'opposition, nous cessons immédiatement toute sollicitation et ne conservons que le strict nécessaire pour ne plus vous recontacter.",
    ],
  },
  {
    title: '6. Destinataires et sous-traitants',
    paragraphs: [
      "Nous ne vendons ni ne louons vos données. Elles ne sont communiquées qu'aux prestataires ci-dessous, pour les seuls besoins indiqués, et aux autorités lorsque la loi l'impose.",
    ],
    table: {
      head: ['Prestataire', 'Rôle', 'Hébergement', 'Hors UE'],
      rows: [
        ['Hostinger International Ltd.', "Hébergement du serveur du site et des agents", 'Paris, France', 'Non'],
        ['Stripe Payments Europe Ltd.', 'Encaissement des paiements et facturation', 'Irlande', "Oui, vers Stripe Inc. aux États-Unis"],
        ['Google Ireland Ltd. (Google Workspace)', 'Messagerie professionnelle et bureautique', 'Union européenne', 'Oui, vers Google LLC aux États-Unis'],
        ['Calendly LLC', 'Prise de rendez-vous', 'États-Unis', 'Oui'],
        ['Meta Platforms Ireland Ltd.', "Mesure des campagnes publicitaires, uniquement si vous y avez consenti", 'Irlande', 'Oui, vers Meta Platforms Inc. aux États-Unis'],
        ['Anthropic, PBC', 'Génération du contenu des messages', 'États-Unis', 'Oui, vers les États-Unis'],
        ['« Green-API » LLC', 'Acheminement des messages WhatsApp', 'Kazakhstan', 'Oui, vers le Kazakhstan'],
        ['Google Ireland Ltd. (Gmail)', 'Envoi des courriels des agents', 'Union européenne', 'Oui, vers Google LLC aux États-Unis'],
        ['Supabase Inc.', "Base de données des cibles, des échanges et des oppositions", 'Paris, France (région eu-west-3)', 'Oui, vers les États-Unis pour l’administration du service'],
        ['Expert-comptable', 'Tenue de la comptabilité', 'France', 'Non'],
      ],
    },
    note: "Cette liste est tenue à jour. Tout nouveau prestataire traitant des données personnelles y est ajouté, et les clients pour le compte desquels nous agissons en sont informés préalablement conformément à l'accord de traitement des données.",
  },
  {
    title: '7. Transferts hors Union européenne',
    paragraphs: [
      "Certains prestataires appartiennent à des groupes dont la maison mère est établie aux États-Unis. Des données peuvent donc y être transférées.",
      "Ces transferts s'appuient sur les clauses contractuelles types adoptées par la Commission européenne par la décision d'exécution (UE) 2021/914, ainsi que, pour les organismes qui y sont certifiés, sur la décision d'adéquation du 10 juillet 2023 relative au cadre de protection des données UE–États-Unis.",
      "L'acheminement de nos messages WhatsApp est assuré par « Green-API » LLC, établie au Kazakhstan. Ce pays ne fait pas l'objet d'une décision d'adéquation de la Commission européenne. Les données transmises à ce prestataire sont limitées au numéro de téléphone du destinataire et au contenu du message envoyé ou reçu.",
      "Vous pouvez obtenir copie des garanties contractuelles invoquées pour chacun de ces transferts en écrivant à a.fontana@smatchroom.fr.",
    ],
  },
  {
    title: '8. Vos droits',
    paragraphs: [
      "Vous disposez des droits suivants sur les données vous concernant.",
    ],
    list: [
      "Droit d'accès (art. 15) : obtenir la confirmation que vos données sont traitées et en recevoir une copie.",
      "Droit de rectification (art. 16) : faire corriger une donnée inexacte ou compléter une donnée incomplète.",
      "Droit à l'effacement (art. 17) : faire supprimer vos données, sous réserve de nos obligations légales de conservation.",
      "Droit à la limitation du traitement (art. 18) : demander le gel de vos données, par exemple pendant l'examen d'une contestation.",
      "Droit d'opposition (art. 21) : vous opposer à un traitement fondé sur notre intérêt légitime. S'agissant de la prospection commerciale, ce droit est absolu : nous cessons immédiatement, sans avoir à en apprécier le motif.",
      "Droit à la portabilité (art. 20) : recevoir dans un format structuré et lisible par machine les données que vous nous avez fournies, lorsque le traitement repose sur votre consentement ou sur un contrat.",
      "Droit de retirer votre consentement à tout moment (art. 7.3), lorsque le traitement repose sur celui-ci. Le retrait s'effectue aussi simplement que l'accord et ne remet pas en cause ce qui a été fait avant. Pour les traceurs, le lien « Gérer mes cookies » du footer suffit.",
      "Droit de définir des directives relatives au sort de vos données après votre décès (art. 85 de la loi Informatique et Libertés), générales ou particulières, et de désigner la personne chargée de leur exécution.",
    ],
  },
  {
    title: '9. Comment exercer vos droits',
    list: [
      "Par courriel à a.fontana@smatchroom.fr, ou par courrier au siège social, 5 rue Fénelon, 33000 Bordeaux.",
      "Nous répondons dans un délai d'un mois à compter de la réception. Ce délai peut être prolongé de deux mois si la demande est complexe ou si nous en recevons un grand nombre ; dans ce cas, nous vous en informons dans le premier mois en vous indiquant le motif.",
      "Nous ne demandons de justificatif d'identité que si nous avons un doute raisonnable sur l'identité du demandeur. Dans ce cas, la copie transmise est utilisée aux seules fins de la vérification et supprimée ensuite.",
      "L'exercice de ces droits est gratuit. Une demande manifestement infondée ou excessive, notamment par son caractère répétitif, peut donner lieu à des frais raisonnables ou à un refus motivé.",
    ],
  },
  {
    title: '10. Réclamation auprès de la CNIL',
    paragraphs: [
      "Si vous estimez, après nous avoir contactés, que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la Commission nationale de l'informatique et des libertés.",
      "CNIL, 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07. Téléphone : 01 53 73 22 22. Réclamation en ligne : https://www.cnil.fr/fr/plaintes",
      "Vous pouvez la saisir directement, sans nous avoir contactés au préalable.",
    ],
  },
  {
    title: '11. Sécurité',
    paragraphs: [
      "Nous mettons en œuvre des mesures techniques et organisationnelles destinées à protéger les données contre l'accès non autorisé, la perte et l'altération : chiffrement des échanges en transit, cloisonnement des données par client, accès nominatifs et limités aux personnes qui en ont besoin, journalisation des accès, sauvegardes régulières.",
      "Le détail de ces mesures figure dans l'accord de traitement des données conclu avec nos clients. Aucun dispositif ne rend un système inviolable ; en cas de violation de données susceptible d'engendrer un risque pour vos droits, nous notifions la CNIL dans les 72 heures et vous informons lorsque le risque est élevé.",
    ],
  },
  {
    title: '12. Traceurs',
    paragraphs: [
      "Les cookies et traceurs déposés sur ce site, leur éditeur, leur finalité, leur durée et les transferts qu'ils impliquent sont détaillés dans la politique cookies, accessible à l'adresse /politique-cookies. Votre choix y est modifiable à tout moment.",
    ],
  },
  {
    title: '13. Modification de la présente politique',
    paragraphs: [
      "Nous pouvons faire évoluer cette politique, notamment pour tenir compte d'un changement de prestataire ou de traitement. La date de dernière mise à jour figure en tête de page. En cas de modification substantielle, les personnes concernées dont nous avons les coordonnées en sont informées.",
    ],
  },
];

export default function ConfidentialitePage() {
  return (
    <LegalPage
      wide
      eyebrow="Protection des données"
      title="Politique de confidentialité"
      subtitle="SmatchRoom Pulse"
      dates={['Dernière mise à jour : 6 août 2026']}
      intro={
        <>
          Vous avez été contacté par un de nos agents et vous voulez que cela cesse ? Répondez
          «&nbsp;STOP&nbsp;» au message reçu, ou écrivez à a.fontana@smatchroom.fr. L&apos;opposition
          est immédiate et définitive. Le détail figure en{' '}
          <span className="font-medium text-[var(--foreground)]">section 5</span>.
        </>
      }
      sections={SECTIONS}
    />
  );
}
