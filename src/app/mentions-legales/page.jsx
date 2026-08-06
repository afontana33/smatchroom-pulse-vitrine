/*
 * ⚠ BROUILLON — document juridique non validé.
 *
 * Reprise dans Next.js des mentions légales qui étaient servies en HTML
 * statique par nginx depuis /var/www/elite-dev-kit/legal/mentions-legales.html.
 * Copie du fichier d'origine : legal/_sources-nginx/mentions-legales.html.
 *
 * Corrections apportées (phase 4 de la mise en conformité) :
 *   - section Cookies réécrite : l'ancienne affirmait qu'aucun cookie
 *     publicitaire n'était déposé alors qu'un pixel Meta se déclenchait sur
 *     toutes les pages, et mentionnait un cookie de panier Stripe inexistant ;
 *   - section Données personnelles remplacée par un résumé court renvoyant à
 *     /confidentialite, pour supprimer le risque de divergence entre deux
 *     pages qui décrivaient les mêmes traitements différemment ;
 *   - téléphone de l'éditeur et de l'hébergeur ajoutés en placeholder :
 *     l'article 6 III de la LCEN les impose, ils ne figuraient nulle part ;
 *   - mention des marques neutralisée dans l'attente du statut réel de chaque
 *     dépôt (question ouverte n°5 de AUDIT-CONFORMITE.md).
 *
 * À relire et valider par un avocat avant mise en ligne.
 */

import LegalPage from '@/components/LegalPage';

export const metadata = {
  title: 'Mentions légales · SmatchRoom Pulse',
  description:
    "Éditeur, directeur de la publication, hébergeur et informations légales du site pulse.smatchroom.com.",
};

const SECTIONS = [
  {
    title: 'Éditeur du site',
    paragraphs: [
      "Le site pulse.smatchroom.com est édité par SMATCHROOM SAS, société par actions simplifiée au capital social de 1 000 euros.",
    ],
    list: [
      'Siège social : 5 rue Fénelon, 33000 Bordeaux, France',
      'SIREN : 989 883 509 · SIRET du siège : 989 883 509 00014',
      'RCS : Bordeaux 989 883 509',
      'TVA intracommunautaire : FR01 989 883 509',
      'Code NAF/APE : 62.01Z, programmation informatique',
      'Immatriculée au registre national des entreprises le 31 juillet 2025',
      'Président : Alexis Fontana',
      'Courriel : a.fontana@smatchroom.fr',
      'Téléphone : [[À COMPLÉTER : numéro de téléphone de contact de l’éditeur, exigé par l’art. 6 III de la LCEN]]',
    ],
  },
  {
    title: 'Directeur de la publication',
    paragraphs: ['Alexis Fontana, en qualité de président de SMATCHROOM SAS.'],
  },
  {
    title: 'Hébergeur',
    paragraphs: [
      "Le site est hébergé sur un serveur privé virtuel opéré par Hostinger International Ltd.",
    ],
    list: [
      'Adresse : 61 Lordou Vironos Street, 6023 Larnaca, Chypre',
      'Téléphone : [[À COMPLÉTER : numéro de téléphone de l’hébergeur, exigé par l’art. 6 III de la LCEN]]',
      'Site : https://www.hostinger.fr',
    ],
  },
  {
    title: 'Propriété intellectuelle',
    paragraphs: [
      "L'ensemble des contenus présents sur ce site, textes, code, configurations, gabarits, images et design, sont la propriété exclusive de SMATCHROOM SAS, à l'exception des éléments tiers explicitement identifiés (bibliothèques open source, logos de partenaires).",
      "Toute reproduction, représentation, modification, publication, transmission ou dénaturation, totale ou partielle, du site ou de son contenu, par quelque procédé et sur quelque support que ce soit, est interdite sans autorisation écrite préalable de SMATCHROOM SAS.",
      "Les dénominations « SmatchRoom », « SmatchRoom Pulse », « SmatchRoom Pro », « Émargeo » et « Prospector X » sont utilisées par SMATCHROOM SAS à titre de signes distinctifs. [[À COMPLÉTER : statut réel de chaque signe, marque déposée avec numéro et date de dépôt INPI, demande en cours, ou aucun dépôt. Ne rétablir la mention « marque déposée » que pour celles qui le sont effectivement]]",
    ],
  },
  {
    title: 'Données personnelles',
    paragraphs: [
      "SMATCHROOM SAS traite des données personnelles en qualité de responsable de traitement pour ses propres activités, et en qualité de sous-traitant lorsqu'elle exploite un agent pour le compte d'un client.",
      "Le détail des finalités, des bases légales, des durées de conservation, des destinataires, des transferts hors Union européenne et des modalités d'exercice de vos droits figure dans la politique de confidentialité, à l'adresse /confidentialite. C'est le document de référence : les présentes mentions n'en reprennent pas le contenu afin d'éviter toute divergence.",
      "Vous pouvez exercer vos droits en écrivant à a.fontana@smatchroom.fr, et introduire une réclamation auprès de la CNIL, 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07, https://www.cnil.fr",
    ],
  },
  {
    title: 'Cookies',
    paragraphs: [
      "Un seul traceur est déposé sans votre accord : le cookie pulse_consent, qui mémorise pendant six mois votre choix en matière de traceurs. Sans lui, la question vous serait reposée à chaque page.",
      "Le site propose par ailleurs un traceur publicitaire, le Meta Pixel (cookie _fbp, 90 jours, Meta Platforms Ireland Limited). Il n'est chargé qu'après acceptation explicite de votre part via le bandeau de consentement. Refuser est aussi simple qu'accepter, et vous pouvez revenir sur votre choix à tout moment via le lien « Gérer mes cookies » présent en bas de chaque page.",
      "Le détail de chaque traceur, éditeur, finalité, durée de conservation et transfert hors Union européenne, figure dans la politique cookies, à l'adresse /politique-cookies.",
    ],
  },
  {
    title: 'Conditions générales',
    paragraphs: [
      "Les abonnements d'agents IA sont régis par les conditions générales de vente et de service, à l'adresse /cgv-services. La vente de l'Élite Dev Kit est régie par des conditions distinctes, à l'adresse /cgv-produits.",
    ],
  },
  {
    title: 'Transparence sur l’usage de l’intelligence artificielle',
    paragraphs: [
      "Les messages envoyés par nos agents sont générés par un système d'intelligence artificielle. Les informations correspondantes, ainsi que les moyens de s'y opposer et de joindre un interlocuteur humain, figurent à l'adresse /transparence-ia.",
    ],
  },
  {
    title: 'Loi applicable et juridiction',
    paragraphs: [
      "Les présentes mentions légales sont régies par le droit français. Tout litige relatif à leur interprétation ou à leur exécution relève de la compétence des tribunaux de Bordeaux, sauf disposition légale contraire.",
    ],
  },
];

export default function MentionsLegalesPage() {
  return (
    <LegalPage
      eyebrow="Informations légales"
      title="Mentions légales"
      subtitle="pulse.smatchroom.com"
      dates={['Dernière mise à jour : 6 août 2026']}
      sections={SECTIONS}
    />
  );
}
