/*
 * ⚠ BROUILLON — document juridique non validé.
 *
 * Reprise dans Next.js des CGV « Élite Dev Kit » qui étaient servies en HTML
 * statique par nginx depuis /var/www/elite-dev-kit/legal/cgv.html. La copie du
 * fichier d'origine est conservée dans legal/_sources-nginx/cgv.html.
 *
 * Corrections apportées à cette occasion (phase 8 de la mise en conformité) :
 *   - suppression du renvoi à la plateforme européenne ODR, fermée le
 *     20 juillet 2025 en application du règlement (UE) 2024/3228 ;
 *   - l'article sur les données personnelles renvoie désormais à
 *     /confidentialite et non plus aux mentions légales ;
 *   - ajout d'un renvoi vers les CGV Services pour lever l'ambiguïté entre les
 *     deux offres.
 *
 * ⚠ L'article 7.2 décrit une case à cocher de renonciation au droit de
 * rétractation dans le tunnel Stripe. Sa présence effective n'a pas été
 * vérifiée. Si elle n'existe pas, la clause est inopposable : voir la question
 * ouverte n°13 dans AUDIT-CONFORMITE.md.
 *
 * À relire et valider par un avocat avant mise en ligne.
 */

import LegalPage from '@/components/LegalPage';

export const metadata = {
  title: 'CGV Produits numériques · SmatchRoom Pulse',
  description:
    "Conditions générales de vente de l'Élite Dev Kit, contenus numériques téléchargeables édités par SMATCHROOM SAS.",
};

const ARTICLES = [
  {
    title: 'Article 1 · Objet et champ d’application',
    paragraphs: [
      "Les présentes conditions générales de vente régissent la vente du Pack Starter Élite et du Pack Enterprise Engine, ensemble dénommés « le Kit » ou « les Produits », composés de contenus numériques téléchargeables (documents PDF, fichiers de configuration .json et .md, gabarits, bibliothèque de prompts) édités par SMATCHROOM SAS.",
      "L'acheteur reconnaît avoir pris connaissance des présentes et les avoir acceptées sans réserve avant toute commande. La validation de la commande emporte acceptation pleine et entière.",
      "Les présentes ne couvrent pas les abonnements d'agents IA, régis par des conditions distinctes accessibles à l'adresse /cgv-services.",
    ],
  },
  {
    title: 'Article 2 · Vendeur',
    list: [
      'SMATCHROOM SAS, société par actions simplifiée au capital de 1 000 euros',
      'Siège social : 5 rue Fénelon, 33000 Bordeaux, France',
      'RCS Bordeaux 989 883 509 · TVA intracommunautaire FR01 989 883 509',
      'Courriel : a.fontana@smatchroom.fr',
      'Téléphone : 07 71 48 76 98',
    ],
  },
  {
    title: 'Article 3 · Produits proposés',
    paragraphs: ['3.1 Pack Starter Élite, 99 € TTC :'],
    list: [
      'Playbook PDF complet de production',
      'Fichier settings.json préconfiguré (9 plugins Claude Code)',
      'Gabarit CLAUDE.md universel',
      'Auto-memory blueprints (schémas de mémoire à deux niveaux)',
      "Licence d'usage personnel pour un développeur",
      'Accès aux mises à jour mineures pendant 6 mois à compter de l’achat',
    ],
    note: "Les Produits sont des contenus numériques fournis sur un support immatériel au sens de l'article L.221-13 du Code de la consommation. Ils sont livrés par voie électronique, sous forme d'un lien de téléchargement transmis par courriel après paiement. Leur usage suppose des compétences techniques préalables (Node.js, Git, administration de serveur). Le Kit n'inclut aucune prestation de conseil, de formation, d'accompagnement ni de support technique.",
  },
  {
    title: 'Article 3 bis · Pack Enterprise Engine, 399 € TTC',
    list: [
      "L'intégralité du Pack Starter Élite",
      "Licence commerciale d'équipe, jusqu'à 10 développeurs au sein d'une même entité juridique",
      'Bibliothèque de prompts spécialisés (frontend, backend, data, devops, sécurité)',
      '7 gabarits CLAUDE.md par stack (SaaS, marketing, agent IA, scraping, API, mobile, pipeline de données)',
      'Auto-memory blueprints avancés (patterns de knowledge graph)',
      'Accès aux mises à jour majeures pendant 12 mois à compter de l’achat',
    ],
  },
  {
    title: 'Article 4 · Prix',
    paragraphs: [
      "Les prix sont indiqués en euros et toutes taxes comprises, incluant la taxe sur la valeur ajoutée française au taux en vigueur, soit 20 % au jour de la vente. Une facture conforme aux exigences légales françaises est émise automatiquement après paiement.",
      "Pour les clients professionnels établis dans l'Union européenne hors de France et disposant d'un numéro de TVA intracommunautaire valide, la facture est émise hors taxes par autoliquidation, en application de l'article 196 de la directive 2006/112/CE.",
      "Pour les clients établis hors de l'Union européenne, la taxe sur la valeur ajoutée française n'est pas applicable.",
    ],
    note: "Les tarifs des abonnements d'agents IA sont, eux, exprimés hors taxes. Cette différence tient à la nature des offres : le Kit peut être acquis par un consommateur, ce qui impose un affichage toutes taxes comprises, tandis que les abonnements sont réservés aux professionnels.",
  },
  {
    title: 'Article 5 · Commande et paiement',
    paragraphs: [
      "L'acheteur valide sa commande depuis la page produit, puis complète le formulaire de paiement Stripe.",
      "Le paiement est traité par Stripe Payments Europe Ltd. (Irlande), par carte bancaire ou tout autre moyen accepté par Stripe. SMATCHROOM SAS ne conserve aucune donnée bancaire ; celles-ci sont traitées exclusivement par Stripe selon ses propres conditions.",
      "La commande est conclue après réception du paiement. Un courriel de confirmation incluant la facture et le lien de téléchargement est envoyé à l'adresse renseignée.",
    ],
  },
  {
    title: 'Article 6 · Livraison',
    paragraphs: [
      "La livraison s'effectue par voie électronique, immédiatement après confirmation du paiement, à l'adresse de courriel renseignée par l'acheteur.",
      "Le lien de téléchargement est valable 30 jours à compter de son envoi. En cas de difficulté, l'acheteur peut écrire à a.fontana@smatchroom.fr pour obtenir un nouveau lien.",
    ],
  },
  {
    title: 'Article 7 · Droit de rétractation et renonciation expresse',
    paragraphs: [
      "7.1 En vertu de l'article L.221-18 du Code de la consommation, l'acheteur consommateur dispose en principe d'un délai de quatorze jours pour exercer son droit de rétractation, sans avoir à se justifier ni à payer de pénalités.",
      "7.2 Conformément à l'article L.221-28, 13° du même code, ce droit ne peut être exercé pour les contrats de fourniture d'un contenu numérique non fourni sur un support matériel dont l'exécution a commencé après accord préalable exprès du consommateur et renoncement exprès à son droit de rétractation.",
      "Ce consentement est matérialisé par une case à cocher obligatoire au moment du paiement, libellée « J'accepte le téléchargement immédiat et je renonce expressément à mon droit de rétractation de 14 jours ». À défaut de cocher cette case, le droit de rétractation reste applicable et le téléchargement est différé de quatorze jours.",
    ],
  },
  {
    title: 'Article 8 · Licences et propriété intellectuelle',
    list: [
      "Pack Starter : licence d'usage non exclusive, non cessible et non transférable, pour un développeur, sur tout projet personnel ou professionnel.",
      "Pack Enterprise : licence commerciale pour dix développeurs au maximum au sein d'une même entité juridique, sur tout projet personnel ou professionnel.",
      "L'acheteur s'interdit de redistribuer, revendre ou partager publiquement tout ou partie du Kit, d'en intégrer le contenu dans un produit concurrent destiné à la revente, de retirer les mentions de propriété intellectuelle, et de proposer des prestations de formation ou de conseil fondées directement sur le Kit sans accord écrit préalable.",
      "Toute violation est constitutive de contrefaçon au sens des articles L.335-2 et suivants du Code de la propriété intellectuelle. SMATCHROOM SAS se réserve le droit de révoquer la licence sans remboursement en cas de violation établie.",
    ],
  },
  {
    title: 'Article 9 · Mises à jour',
    paragraphs: [
      "Les mises à jour mineures, corrections et ajouts incrémentaux sont adressées par courriel aux acheteurs du Pack Starter pendant 6 mois et du Pack Enterprise pendant 12 mois. Les mises à jour majeures, refonte d'architecture ou ajout de modules, sont incluses uniquement pour le Pack Enterprise pendant 12 mois.",
      "Au-delà de ces durées, SMATCHROOM SAS n'a aucune obligation de maintenance ni de mise à jour. L'acheteur conserve un usage perpétuel des versions reçues.",
    ],
  },
  {
    title: 'Article 10 · Garanties et limitation de responsabilité',
    paragraphs: [
      "Les Produits sont fournis en l'état, conformément à leur description sur la page produit au jour de l'achat, pour des environnements répondant aux prérequis indiqués.",
    ],
    list: [
      "SMATCHROOM SAS n'est pas responsable des coûts d'usage d'interfaces de programmation tierces générés par l'usage du Kit, des dommages indirects tels que la perte d'exploitation, de chance ou de données, des incompatibilités liées à des versions non supportées d'outils tiers, ni des conséquences d'une configuration erronée ou d'un usage non conforme aux instructions fournies.",
      "La responsabilité totale cumulée de SMATCHROOM SAS ne peut excéder le montant payé par l'acheteur pour le Produit concerné.",
      "Ces limitations ne s'appliquent pas dans les cas où la loi les écarte, notamment au titre de la garantie légale de conformité et de la garantie des vices cachés lorsque l'acheteur est un consommateur.",
    ],
  },
  {
    title: 'Article 11 · Données personnelles',
    paragraphs: [
      "Le traitement des données personnelles de l'acheteur, adresse de courriel, nom et données de facturation, est décrit dans la politique de confidentialité accessible à l'adresse /confidentialite, qui précise les finalités, les bases légales, les durées de conservation, les destinataires et les modalités d'exercice des droits.",
      "Les traceurs déposés sur le site sont détaillés à l'adresse /politique-cookies.",
    ],
  },
  {
    title: 'Article 12 · Force majeure',
    paragraphs: [
      "Aucune partie ne peut être tenue responsable d'un manquement résultant d'un cas de force majeure au sens de l'article 1218 du Code civil, notamment une défaillance massive d'infrastructure tierce ou une attaque informatique de grande ampleur.",
    ],
  },
  {
    title: 'Article 13 · Réclamations et médiation',
    paragraphs: [
      "Toute réclamation doit être adressée par courriel à a.fontana@smatchroom.fr. SMATCHROOM SAS s'engage à répondre sous cinq jours ouvrés.",
      "Conformément à l'article L.612-1 du Code de la consommation, en cas de litige non résolu après réclamation écrite, l'acheteur consommateur peut recourir gratuitement au médiateur de la consommation suivant : CNPM Médiation Consommation, 27 avenue de la Libération, 42400 Saint-Chamond, https://cnpm-mediation-consommation.eu",
    ],
    note: "Le renvoi à la plateforme européenne de règlement en ligne des litiges a été supprimé : cette plateforme a définitivement fermé le 20 juillet 2025 en application du règlement (UE) 2024/3228, et les professionnels ne sont plus tenus d'en afficher le lien.",
  },
  {
    title: 'Article 14 · Loi applicable et juridiction',
    paragraphs: [
      "Les présentes sont régies par le droit français. Tout litige relatif à leur formation, leur interprétation ou leur exécution relève de la compétence des tribunaux de Bordeaux, sous réserve des dispositions impératives applicables aux contrats conclus avec des consommateurs.",
    ],
  },
  {
    title: 'Article 15 · Modification des conditions',
    paragraphs: [
      "SMATCHROOM SAS se réserve le droit de modifier les présentes à tout moment. Les conditions applicables sont celles en vigueur au jour de la commande.",
    ],
  },
];

export default function CGVProduitsPage() {
  return (
    <LegalPage
      eyebrow="Cadre contractuel"
      title="Conditions générales de vente"
      subtitle="Élite Dev Kit · contenus numériques téléchargeables"
      dates={["Date d'entrée en vigueur : 21 mai 2026", 'Dernière mise à jour : 6 août 2026']}
      intro={
        <>
          Ces conditions s&apos;appliquent à l&apos;achat de l&apos;Élite Dev Kit. Les abonnements
          d&apos;agents IA relèvent de conditions distinctes disponibles sur la page{' '}
          <a href="/cgv-services" className="font-medium text-[var(--primary-ink)] underline underline-offset-2">
            CGV Services
          </a>
          .
        </>
      }
      sections={ARTICLES}
    />
  );
}
