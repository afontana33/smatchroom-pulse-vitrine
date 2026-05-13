export const BRAND_CONTEXT = `# Contexte SmatchRoom Pulse

SmatchRoom Pulse est un studio d'agents IA B2B opérant sous SmatchRoom SAS.

Offre commerciale (pricing v2, mai 2026) :
- Pilote : 249€/mois + 490€ setup (1 agent, périmètre cadré)
- Squad  : 690€/mois + 1 490€ setup (plusieurs agents orchestrés)
- Custom : sur devis

Tous les CTA pointent vers https://calendly.com/a-fontana-smatchroom/30min.

Cible : dirigeants et opérationnels B2B (SDR, support, ops).

Ton éditorial obligatoire :
- Vouvoiement systématique ("vous", "vos équipes")
- Expertise concrète, pas de promesse magique
- Chiffres, statistiques, exemples sectoriels privilégiés
- Concurrence mentionnée avec nuance, jamais frontalement
  (préférer "chatbots no-code traditionnels", "solutions verticales pré-packagées")

Pages internes principales utilisables en lien :
- / (page d'accueil — ancres #process #pricing #use-cases #faq)
- /solutions/agent-sdr
- /solutions/agent-support
- /solutions/agent-sur-mesure
`;

export const GEO_INSTRUCTIONS = `# Règles d'écriture GEO (Generative Engine Optimization)

OBJECTIF : maximiser la captation par Google AI Overviews et par les moteurs
génératifs (Perplexity, ChatGPT, Gemini).

Règles strictes :
1. Premier paragraphe du body = RÉPONSE DIRECTE à la question, ≤80 mots,
   factuelle, sans introduction marketing. Cible : Featured Snippet.
2. Densité élevée de listes à puces. Préférer 5 puces concises à un paragraphe long.
3. Inclure AU MOINS 1 statistique chiffrée par section H2 (sourcée si possible,
   sinon estimation prudente formulée comme telle).
4. Pas de phrases creuses ("dans un monde en constante évolution", "à l'ère du
   digital", "il est important de noter que").
5. Section FAQ finale : 4 à 6 questions, réponses 30–60 mots, autonomes
   (chaque réponse doit se suffire à elle-même).
6. Pas de ton promotionnel dans le corps. Le CTA Calendly est ajouté APRÈS
   le markdown par le layout — ne le mets pas dans le markdown.
`;
