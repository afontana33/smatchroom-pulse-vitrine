/*
 * ⚠ BROUILLON — document juridique non validé.
 *
 * Information de transparence au titre de l'article 50 du règlement (UE)
 * 2024/1689 (AI Act), applicable depuis le 2 août 2026. Cette échéance n'a pas
 * été reportée par le Digital Omnibus, contrairement aux obligations relatives
 * aux systèmes à haut risque, décalées à décembre 2027.
 *
 * ⚠ Cette page décrit un comportement que le code des agents doit
 * effectivement présenter. Les agents ne sont pas dans ce dépôt : voir la
 * section 6 de AUDIT-CONFORMITE.md pour la liste des modifications à faire
 * côté produit. Tant qu'elles ne sont pas faites, cette page décrit une
 * intention et non un état de fait, ce qui serait à son tour trompeur.
 *
 * À relire et valider par un avocat avant mise en ligne.
 */

import LegalPage from '@/components/LegalPage';

export const metadata = {
  title: 'Transparence sur l’intelligence artificielle · SmatchRoom Pulse',
  description:
    "Comment nos agents s'identifient comme automatisés, comment s'opposer à être contacté et comment joindre un interlocuteur humain.",
};

const SECTIONS = [
  {
    title: 'Ce que fait un agent',
    paragraphs: [
      "Un agent est un programme qui identifie des entreprises correspondant à un profil, rédige un message adapté à chacune et l'envoie par messagerie instantanée ou par courriel. Il lit les réponses reçues et peut y répondre.",
      "Le contenu de ces messages est produit par un modèle de langage. Il n'est pas rédigé par une personne au moment de l'envoi, même s'il a été cadré, testé et supervisé par notre équipe.",
      "Un agent ne prend aucune décision produisant des effets juridiques à votre égard. Il ne refuse pas un contrat, ne fixe pas un prix et n'attribue pas de score conditionnant vos droits.",
    ],
  },
  {
    title: 'Vous êtes informé dès le premier message',
    paragraphs: [
      "L'article 50 du règlement (UE) 2024/1689 impose que toute personne qui interagit avec un système d'intelligence artificielle en soit informée, sauf si cela est évident au regard des circonstances. Nous considérons que ce n'est jamais évident dans un message de prospection.",
      "Le premier message de chaque séquence indique donc explicitement qu'il est envoyé par un système automatisé, au nom de qui il est envoyé, et comment y mettre fin. Cette mention n'est ni une note de bas de page ni une mention en petits caractères.",
      "Nos clients ne peuvent pas demander sa suppression ou son atténuation. C'est une clause de nos conditions générales de service, et nous refusons toute instruction en ce sens.",
    ],
  },
  {
    title: 'Comment vous opposer',
    paragraphs: [
      "Vous pouvez refuser d'être contacté à tout moment, sans avoir à vous justifier et sans frais. C'est un droit absolu en matière de prospection commerciale, prévu à l'article 21 du règlement (UE) 2016/679.",
    ],
    list: [
      "Par messagerie instantanée : répondez « STOP ». L'opposition est enregistrée automatiquement et définitivement, sans intervention humaine et sans délai.",
      "Par courriel : répondez « STOP », ou utilisez le lien de désinscription présent dans le message.",
      "Par écrit : a.fontana@smatchroom.fr. Précisez le numéro ou l'adresse concernés.",
      "Votre coordonnée est alors inscrite dans une liste d'opposition commune à l'ensemble de nos agents et de nos clients. Elle est conservée à cette seule fin, précisément pour que vous ne soyez plus jamais contacté.",
    ],
  },
  {
    title: 'Comment joindre un humain',
    paragraphs: [
      "À tout moment, vous pouvez demander à parler à une personne. Répondez « HUMAIN » au message reçu, ou écrivez à a.fontana@smatchroom.fr.",
      "La conversation est alors retirée du traitement automatisé et reprise par un membre de notre équipe. Nous répondons sous un jour ouvré.",
      "Téléphone : 07 71 48 76 98",
    ],
  },
  {
    title: 'D’où viennent vos coordonnées',
    paragraphs: [
      "Elles proviennent de bases publiques et de registres officiels : base Sirene de l'INSEE, registre national des entreprises de l'INPI, données ouvertes publiques, et informations professionnelles publiées par les entreprises elles-mêmes.",
      "Nous ne les achetons pas à des courtiers en données et nous ne collectons pas de coordonnées personnelles hors du cadre professionnel.",
      "Le détail figure dans la politique de confidentialité, section 5, qui constitue l'information prévue à l'article 14 du règlement (UE) 2016/679.",
    ],
  },
  {
    title: 'Notre rôle au regard du règlement sur l’IA',
    paragraphs: [
      "SMATCHROOM conçoit les agents et les exploite. Elle est donc susceptible d'être à la fois fournisseur et déployeur au sens du règlement (UE) 2024/1689, ce qui emporte des obligations distinctes.",
      "Les agents que nous exploitons ne relèvent pas, à notre analyse, des systèmes à haut risque énumérés à l'annexe III du règlement : ils n'interviennent ni dans l'accès à l'emploi, ni au crédit, ni à un service essentiel, ni dans une décision produisant des effets juridiques. Ils relèvent des obligations de transparence de l'article 50.",
      "Cette qualification est la nôtre. Si vous estimez qu’un de nos agents produit à votre égard un effet qui dépasse ce cadre, écrivez-nous : nous réexaminons le cas et vous répondons sous un jour ouvré.",
    ],
  },
  {
    title: 'Signaler un problème',
    paragraphs: [
      "Si un message reçu vous paraît inexact, inapproprié, ou si la mention d'automatisation vous a semblé absente, écrivez à a.fontana@smatchroom.fr. Nous examinons chaque signalement et corrigeons l'agent concerné.",
      "Vous pouvez également saisir la CNIL pour ce qui relève des données personnelles : https://www.cnil.fr/fr/plaintes",
    ],
  },
];

export default function TransparenceIAPage() {
  return (
    <LegalPage
      eyebrow="Intelligence artificielle"
      title="Transparence sur l’IA"
      subtitle="Messages envoyés par nos agents"
      dates={['Dernière mise à jour : 6 août 2026']}
      intro={
        <>
          Vous avez reçu un message d&apos;un de nos agents et vous voulez que cela s&apos;arrête ?
          Répondez «&nbsp;STOP&nbsp;». C&apos;est immédiat, définitif, et vous n&apos;avez rien à
          justifier. Pour parler à une personne, répondez «&nbsp;HUMAIN&nbsp;».
        </>
      }
      sections={SECTIONS}
    />
  );
}
