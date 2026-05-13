import { makeClient, ephemeralCacheBlock, type UsageTracker } from '../lib/anthropic.js';
import { BRAND_CONTEXT, GEO_INSTRUCTIONS } from '../lib/brand-context.js';
import { sanitizeUserText } from '../lib/sanitize.js';
import { logger } from '../lib/logger.js';
import type { TopicProposal } from '../lib/types.js';
import type { Outline } from './outline.js';

const FAQ_SYSTEM_TAIL = `
# Format de sortie OBLIGATOIRE

Tu produis UNIQUEMENT du markdown pour CETTE section H2 (pas le H1, pas
d'introduction globale, pas de prélude). Commence directement par "## " suivi
du titre fourni.

Si c'est la première section, INCLUS d'abord 1 paragraphe court (≤80 mots) qui
répond directement à la question longue traîne, puis le H2.

Pas d'appel à l'action (CTA), pas de lien vers Calendly dans le markdown.
`;

export interface SectionsArgs {
  topic: TopicProposal;
  outline: Outline;
  tracker: UsageTracker;
}

export async function writeSections({ topic, outline, tracker }: SectionsArgs): Promise<string> {
  const client = makeClient('claude-sonnet-4-6', tracker);

  const cachedSystem = [
    ephemeralCacheBlock(`${BRAND_CONTEXT}\n\n${GEO_INSTRUCTIONS}\n${FAQ_SYSTEM_TAIL}

# Métadonnées du sujet courant

Titre H1 (à ne PAS écrire — c'est le job du layout) : ${topic.title}
Mot-clé principal : ${topic.primaryKeyword}
Question longue traîne (à utiliser pour la réponse directe en début d'article) : ${topic.questionLongTail}
Plan complet de l'article (toutes sections) :
${outline.h2Sections.map((s, i) => `${i + 1}. ${s.title} (intent: ${s.intent}, ~${s.wordsTarget} mots)`).join('\n')}
`),
  ];

  const parts: string[] = [];
  for (let i = 0; i < outline.h2Sections.length; i++) {
    const section = outline.h2Sections[i]!;
    const isFirst = i === 0;
    const isFaq = /faq|questions/i.test(section.title);

    const userMsg = isFaq
      ? `Rédige la section FAQ finale : titre "${sanitizeUserText(section.title)}".
Produis 4 à 6 questions concises au format markdown :

## ${section.title}

### Question 1 ?

Réponse 30–60 mots.

### Question 2 ?

...`
      : `Rédige la section ${i + 1} : "${sanitizeUserText(section.title)}".
Intent : ${sanitizeUserText(section.intent)}
Cible : ~${section.wordsTarget} mots.
${isFirst ? 'Cette section est la PREMIÈRE de l\'article : commence par 1 paragraphe court (≤80 mots) qui répond directement à la question longue traîne, AVANT le "## ".' : ''}`;

    const text = await client.invoke({ system: cachedSystem, user: userMsg });
    parts.push(text.trim());
    logger.info({ section: section.title, index: i + 1 }, 'section written');
  }

  return parts.join('\n\n');
}
