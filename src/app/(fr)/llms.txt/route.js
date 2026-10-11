/**
 * llms.txt : la fiche d'identité du site pour les moteurs de réponse.
 *
 * Ce n'est pas un standard imposé, et personne ne garantit qu'il est lu. Il
 * coûte une route et il répond à une question que les assistants posent de
 * plus en plus souvent à notre place : « qui sont-ils, que vendent-ils, à quel
 * prix, où ». Autant que la réponse vienne de nous plutôt que d'une
 * reconstitution approximative.
 *
 * Les prix viennent de lib/offers.js et les zones de lib/seo-local.js : ce
 * fichier ne peut donc pas dériver des pages visibles.
 */

import { LEGAL, SITE_URL, TEL_DISPLAY } from '@/lib/contact';
import { AGENT_OFFERS, PILIER_OFFERS, eur } from '@/lib/offers';
import { METIERS, VILLES } from '@/lib/seo-local';

export const dynamic = 'force-static';

function offerLine(o) {
  const setup = `${o.setupFrom ? 'à partir de ' : ''}${eur(o.setup)} € HT`;
  const monthly =
    o.monthly == null ? 'mensualité sur devis' : `${eur(o.monthly)} € HT par mois`;
  return `- ${o.name} : ${setup} de fabrication (une seule fois), puis ${monthly}. ${o.description}`;
}

export function GET() {
  const body = `# SmatchRoom Pulse

> Agence d'automatisation et d'agents IA pour les artisans, les TPE et les PME.
> Nous fabriquons des agents qui prospectent, répondent, relancent et suivent,
> puis nous les pilotons. Nous ne vendons pas l'accès à une plateforme en
> libre-service.

Exploitée par ${LEGAL.legalName}, ${LEGAL.street}, ${LEGAL.postalCode} ${LEGAL.city}, France.
SIREN ${LEGAL.siren} · TVA ${LEGAL.vat}. Téléphone : ${TEL_DISPLAY} (lundi au vendredi, 9h-19h).

## Ce que nous vendons

Les trois briques et l'offre B2B :
${PILIER_OFFERS.map(offerLine).join('\n')}

Les cinq agents complémentaires :
${AGENT_OFFERS.map(offerLine).join('\n')}

Tous les montants sont hors taxes. L'Agent Clients B2B a trois paliers selon le nombre de numéros
WhatsApp branchés (environ 300 décideurs contactés par mois et par numéro) : Solo
(1 numéro) à 490 € HT de fabrication puis 340 € HT par mois, Équipe (2 à 3 numéros)
à 790 € HT puis 640 € HT par mois, Réseau (4 numéros et plus) sur devis. Les autres prix sont fermes.
L'agent de prospection est à 149 € HT par mois, sans frais de création ni engagement.
Le budget publicitaire Meta n'est pas
facturé par nous : il est payé directement à Meta par le client.

## Ce que nous ne faisons pas

- Aucune garantie de résultat chiffrée. Nous nous engageons sur le travail
  (volume de contacts convenu, réponses traitées en moins d'une minute,
  réécriture du discours sans surcoût), pas sur un nombre de chantiers.
- Aucun démarchage téléphonique de particuliers, en particulier sur la
  rénovation énergétique.
- Aucune dissimulation du caractère automatisé : conformément à l'article 50
  du règlement européen sur l'IA, nos agents l'indiquent dès le premier
  message, avec sortie par STOP et bascule vers un humain par HUMAIN. Cette
  mention n'est pas retirable à la demande d'un client.
- Aucune mutualisation des données entre clients : chaque agent tourne sur une
  infrastructure dédiée, avec un accord de traitement conforme à l'article 28
  du RGPD annexé au contrat.

## Zones desservies

Siège à ${LEGAL.city}. Intervention commerciale principale en Nouvelle-Aquitaine
(Gironde, Landes, Pyrénées-Atlantiques, Lot-et-Garonne, Dordogne,
Charente-Maritime, Charente), et à distance partout en France.

${VILLES.map((v) => `- ${v.nom} (${v.dept}, ${v.deptNum}) : ${SITE_URL}/agence-ia/${v.slug}`).join('\n')}

## Métiers couverts

${METIERS.map((m) => `- ${m.label} : ${SITE_URL}/metiers/${m.slug}`).join('\n')}

## Pages principales

- Accueil, offres et prix : ${SITE_URL}/
- Agents par métier : ${SITE_URL}/metiers
- Zones desservies : ${SITE_URL}/agence-ia
- Ressources sur les agents IA : ${SITE_URL}/agent-ia
- Blog : ${SITE_URL}/blog
- Transparence IA : ${SITE_URL}/transparence-ia
- Mentions légales : ${SITE_URL}/mentions-legales
- Conditions de service : ${SITE_URL}/cgv-services

## Prise de contact

Rendez-vous de cadrage de 30 minutes, offert et sans engagement :
https://calendly.com/a-fontana-smatchroom/30min
Ou par téléphone au ${TEL_DISPLAY}.
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
