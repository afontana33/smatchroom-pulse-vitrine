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
import { BUDGET_META, GARANTIE, META_OFFERS, PACKS_LANCEMENT, PILIER_OFFERS, eur } from '@/lib/offers';
import { METIERS, VILLES } from '@/lib/seo-local';

export const dynamic = 'force-static';

function offerLine(o) {
  if (!o.setup) return `- ${o.name} : ${eur(o.monthly)} € HT par mois, sans frais de fabrication. ${o.description}`;
  if (o.monthly === 0) return `- ${o.name} : ${eur(o.setup)} € HT une seule fois, sans abonnement. ${o.description}`;
  const setup = `${o.setupFrom ? 'à partir de ' : ''}${eur(o.setup)} € HT`;
  const monthly =
    o.monthly == null ? 'mensualité sur devis' : `${eur(o.monthly)} € HT par mois`;
  return `- ${o.name} : ${setup} de fabrication (une seule fois), puis ${monthly}. ${o.description}`;
}

export function GET() {
  const body = `# SmatchRoom Pulse

> Agence de prospection automatisée pour les indépendants, les TPE et les PME.
> Nous fabriquons des agents qui prospectent, répondent, relancent et suivent,
> puis nous les pilotons. Nous ne vendons pas l'accès à une plateforme en
> libre-service.

Exploitée par ${LEGAL.legalName}, ${LEGAL.street}, ${LEGAL.postalCode} ${LEGAL.city}, France.
SIREN ${LEGAL.siren} · TVA ${LEGAL.vat}. Téléphone : ${TEL_DISPLAY} (lundi au vendredi, 9h-19h).

## Ce que nous vendons

Offres d'entrée, les trois Packs Lancement Entrepreneurs (prix payé une seule fois) :
${PACKS_LANCEMENT.map((p) => `- ${p.name} : ${eur(p.setup)} € HT une seule fois. ${p.description}`).join('\n')}

Publicité Facebook et Instagram seule :
${META_OFFERS.map((o) => `- ${o.name} : ${eur(o.setup)} € HT de mise en place (${o.creations}), puis ${eur(o.monthly)} € HT par mois de gestion dès le lancement des annonces.`).join('\n')}
Pour les offres Essentiel et Multi-créations, le client fournit les vidéos : aucun tournage n'est inclus,
et les trois variantes peuvent utiliser les mêmes séquences avec des accroches différentes.
${BUDGET_META} Aucun nombre de demandes, de rendez-vous ou de ventes n'est garanti.

Les trois briques et l'offre B2B :
${PILIER_OFFERS.map(offerLine).join('\n')}

Tous les montants sont hors taxes. L'Agent Clients B2B a trois paliers selon le nombre de numéros
WhatsApp branchés (environ 300 décideurs contactés par mois et par numéro) : Solo
(1 numéro) à 1 200 € HT de fabrication puis 340 € HT par mois, Équipe (2 à 3 numéros)
à 1 200 € HT puis 640 € HT par mois, Réseau (4 numéros et plus) sur devis. Les autres prix sont fermes.
L'Agent Partenaires contacte les prescripteurs (apporteurs d'affaires) ; l'Agent Clients
contacte directement les décideurs des entreprises visées, en priorité celles qui montrent un
signal d'achat (recrutement, création, nouveau dirigeant, réaction LinkedIn). Les deux écrivent
par WhatsApp et par email, jamais par LinkedIn.
Garantie des deux agents : ${GARANTIE}
La garantie ne s'étend pas à la publicité Meta, aux vidéos ni au budget publicitaire.

## Ce que nous ne faisons pas

- Aucune garantie de chiffre d'affaires. Seul engagement : sans rendez-vous
  obtenu dans le mois, le mois suivant n'est pas facturé.
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
- Pack Lancement Entrepreneurs : ${SITE_URL}/pack-lancement
- Agent Partenaires (apporteurs d'affaires) : ${SITE_URL}/apporteur-affaires
- Agent Clients (prospection B2B) : ${SITE_URL}/prospection-b2b
- Site internet et fiche Google : ${SITE_URL}/site-web-artisan
- Publicité Facebook et Instagram : ${SITE_URL}/publicite-facebook-instagram
- Agents par métier : ${SITE_URL}/metiers
- Zones desservies : ${SITE_URL}/agence-ia
- Ressources sur les agents IA : ${SITE_URL}/agent-ia
- Blog : ${SITE_URL}/blog
- Transparence IA : ${SITE_URL}/transparence-ia
- Mentions légales : ${SITE_URL}/mentions-legales
- Conditions de service : ${SITE_URL}/cgv-services

## Prise de contact

Créneau de 15 minutes, gratuit et sans engagement :
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
