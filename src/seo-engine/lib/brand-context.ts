export const BRAND_CONTEXT = `# Contexte SmatchRoom Pulse

SmatchRoom Pulse est un studio d'agents IA B2B opérant sous SmatchRoom SAS.

Offre commerciale (grille octobre 2026, montants HT, sans engagement) :
- Agent Clients B2B, palier Solo : 340€/mois + 490€ de mise en place (1 numéro WhatsApp, environ 300 décideurs contactés par mois, + email)
- Agent Clients B2B, palier Équipe : 640€/mois + 790€ de mise en place (2 à 3 numéros WhatsApp, 600 à 900 décideurs par mois)
- Agent Clients B2B, palier Réseau : sur devis (4 numéros et plus)
- Un numéro WhatsApp ne contacte jamais plus d'environ 300 décideurs par mois
- Mise en place offerte si engagement de 3 mois
- Artisans et TPE : agent de prospection 300€ + 190€/mois ; Pack Lancement 490€ en une fois (site + fiche Google + 3 mois d'agent)
- Ne jamais citer d'autres noms d'offres ni d'autres prix

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
