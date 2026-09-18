/**
 * Les questions de la page anglaise.
 *
 * Même règle que pour lib/faq.js : ce tableau alimente à la fois le bloc
 * visible et le nœud FAQPage en données structurées, et les deux doivent lire
 * la même source. Google déclasse une FAQPage dont les réponses ne sont pas
 * visibles à l'identique sur la page.
 *
 * Ce n'est pas la traduction de lib/faq.js. Les questions d'un acheteur
 * étranger ne sont pas celles d'un artisan français : le prix, la couverture
 * géographique et la conformité passent devant, et les questions sur la peur
 * de l'informatique n'ont pas lieu d'être.
 *
 * Contraintes de contenu à ne pas casser, identiques au français : aucune
 * promesse de résultat chiffrée, aucune couverture géographique qui n'est pas
 * déjà servie, et la réponse sur la mention IA reste alignée sur l'article 50
 * du règlement européen et sur les CGV.
 */

import { TEL_DISPLAY_INTL } from '@/lib/contact';
import { PILIER_OFFERS, setupLabel } from '@/lib/offers';

/* Le montant n'est pas écrit à la main : la réponse sur le prix est la
   première chose qui se périme, et une FAQ qui contredit le bloc de prix
   quelques centimètres plus haut coûte la vente. */
const AGENT = PILIER_OFFERS.find((o) => o.key === 'agent-clients-b2b');

export const QUESTIONS_EN = [
  {
    q: 'What exactly do you build?',
    a: "One agent, built for your market. It assembles the list of companies worth contacting from public sources, writes to each of them individually rather than sending a mail merge, follows up at sensible intervals, answers replies in under a minute seven days a week, and qualifies the need, the budget and the timeline before handing the conversation to your sales team. You are not buying access to a platform: we build it, we run it, and you talk to us.",
  },
  {
    q: 'How much does it cost?',
    a: `The build fee is ${setupLabel(AGENT, 'en')}, paid once, and the monthly fee is quoted after the audit. That is deliberate: the size of the market to build, the number of decision-makers to reach and the integrations involved change the work by an order of magnitude, so a single fixed monthly price would either overcharge the small scopes or cap the large ones. There is no commission per meeting and no pay-per-result billing.`,
  },
  {
    q: 'Do you guarantee results?',
    a: "No, and nobody serious can. The number of deals also depends on your market, your prices and how your team follows up. What we do commit to is the work: the agreed contact volume genuinely goes out, replies are handled in under a minute, and you see all of it. If the wording is not landing, we rewrite it at no extra cost. We would rather turn down a brief we do not believe in than promise a number.",
  },
  {
    q: 'Which countries and languages do you cover?',
    a: "Today the agents run in France, Belgium and Luxembourg, in French. Other markets and other languages are taken case by case, and we will say so on the audit call rather than after you have signed: phone number formats, postcode rules and the local rules on business outreach all have to be handled properly before a single message is sent.",
  },
  {
    q: 'Where do the contacts come from?',
    a: "Public sources: company registers, professional directories, open data for your sector. We do not buy contact files and we do not collect consumer data. Every contact is attached to an identified company, which is what keeps business-to-business outreach lawful in the EU.",
  },
  {
    q: 'Do the people contacted know they are talking to an AI?',
    a: "Yes, and it is a legal requirement. Since 2 August 2026, Article 50 of the EU AI Act requires that anyone interacting with an AI system be informed of it. Our agents state it in the first message, stop for good when someone replies STOP, and hand the conversation to a person on request. This disclosure cannot be removed at a client's request: it is written into our terms of service.",
  },
  {
    q: "Is our data, and our prospects' data, protected?",
    a: "Yes. Your agent runs on dedicated infrastructure rather than shared software, and one client's data is never mixed with another's. A data processing agreement compliant with Article 28 of the GDPR is attached to the contract and signed as a matter of course.",
  },
  {
    q: 'What if it does not suit us?',
    a: "You stop. There is no lock-in on the monthly fee: you tell us, the next month is not charged, and you keep what was produced, including your contact base. If you would rather talk to someone before committing to anything, call us on " + TEL_DISPLAY_INTL + ' and you will get us, not a support queue.',
  },
];
