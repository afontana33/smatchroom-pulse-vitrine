/**
 * Les questions de la landing, extraites de FaqLp.jsx.
 *
 * Elles alimentent deux consommateurs : l'accordéon visible et le bloc
 * FAQPage en données structurées. Google déclasse (et peut sanctionner) une
 * FAQPage dont les réponses ne sont pas visibles à l'identique sur la page :
 * les deux doivent donc lire le même tableau, jamais deux copies.
 *
 * Contraintes de contenu à ne pas casser (voir FaqLp.jsx) : aucune promesse de
 * résultat chiffrée, et la réponse sur la mention IA reste alignée sur
 * l'article 50 du règlement européen et sur les CGV.
 */

import { TEL_DISPLAY } from '@/lib/contact';

export const QUESTIONS = [
  {
    q: "Je ne suis pas à l'aise avec l'informatique. C'est compliqué ?",
    a:
      "Non, et c'est le cas de la majorité de nos clients. On s'occupe de tout : mise en place, paramétrage, mise en route. De votre côté, vous avez un tableau de bord simple sur votre téléphone pour voir qui a été contacté et qui a répondu. Si quelque chose cloche, vous appelez le " +
      TEL_DISPLAY +
      ', vous tombez sur nous, pas sur un support.',
  },
  {
    q: 'Vous garantissez des résultats ?',
    a: "Pas un chiffre d'affaires : personne de sérieux ne peut le promettre, il dépend aussi de votre zone, de vos prix et de votre façon de rappeler. Mais on s'engage sur un point : si l'agent ne vous obtient aucun rendez-vous dans le mois, le mois suivant ne vous est pas facturé. Ce qu'on garantit, c'est le travail : le volume de contacts convenu part vraiment, les réponses sont traitées en moins d'une minute, et vous voyez tout dans le tableau de bord. Si le discours ne prend pas, on le réécrit sans surcoût. On préfère refuser une mission qu'on ne pense pas pouvoir réussir plutôt que de promettre un chiffre.",
  },
  {
    q: 'Et si ça ne me convient pas ?',
    a: "Vous arrêtez. Il n'y a pas de durée minimale : vous prévenez par email 30 jours avant la date de renouvellement, et aucune mensualité n'est prélevée ensuite. Votre site et votre fiche Google restent à vous, et on vous remet sur demande les contacts et les échanges.",
  },
  {
    q: 'Concrètement, la première semaine, il se passe quoi ?',
    a: "Un appel de 30 minutes pour cadrer votre zone, vos métiers cibles et votre discours. Ensuite on construit votre agent sur une base déjà éprouvée chez d'autres entreprises, on vous fait valider les messages avant le premier envoi, puis, une fois le paiement et les accès reçus, on met en route sous 48 heures. Comptez environ 48 heures entre le premier appel et les premiers messages. Rien ne part en votre nom avant que vous ayez validé les messages.",
  },
  {
    q: 'Ça marche avec WhatsApp ? Je risque un blocage de mon numéro ?',
    a: "La prospection passe par WhatsApp et par email. Le risque de blocage existe si on envoie fort dès le premier jour, donc on ne le fait pas : montée en charge progressive, cadence lissée, jamais de rafales, et un numéro dédié plutôt que le vôtre si vous préférez. C'est exactement pour ça qu'on développe nos propres agents au lieu d'utiliser un outil d'envoi de masse.",
  },
  {
    q: "Est-ce que les gens savent qu'ils parlent à une IA ?",
    a: "Oui, et c'est obligatoire. Depuis le 2 août 2026, l'article 50 du règlement européen sur l'IA impose d'informer toute personne qui interagit avec un système d'IA. Nos agents l'indiquent dès le premier message, permettent de s'y opposer en répondant STOP et de basculer sur un humain en répondant HUMAIN. Cette mention ne peut pas être retirée à la demande d'un client : c'est écrit dans nos conditions de service.",
  },
  {
    q: "Je peux ne prendre qu'une seule brique ?",
    a: "Oui, les trois se prennent séparément et beaucoup commencent par l'agent seul. Si vous en voulez deux ou trois, on fait un devis packagé moins cher que la somme des briques.",
  },
  {
    q: 'Mes données et celles de mes clients sont-elles protégées ?',
    a: "Oui. Votre agent tourne sur une infrastructure dédiée, pas sur un logiciel mutualisé, et les données d'un client ne sont jamais mélangées avec celles d'un autre. Un accord de traitement des données conforme à l'article 28 du RGPD est annexé au contrat et signé systématiquement.",
  },
];
