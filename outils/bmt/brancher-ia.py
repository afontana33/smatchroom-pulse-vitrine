"""Branche conversation-ia.js dans traitement-entrant.js (BLEU M TECH, 28/10/2026).

Idempotent : ne fait rien si le branchement est déjà présent.
"""
import pathlib
import sys

p = pathlib.Path("/root/bleumtech/api/lib/traitement-entrant.js")
s = p.read_text()

if "conversation-ia" in s:
    print("deja branche")
    sys.exit(0)

ancre_const = "async function traiter(db, entrant) {"
const = """// Classes confiées à la conversation IA (28/10/2026). STOP, refus, agressivité,
// cessation et « pas maintenant » restent sur les réponses fixes.
const CLASSES_IA = new Set(['positif', 'demande_prix', 'objection', 'flou_ou_technique', 'question_robot']);

"""

ancre_bloc = "  // 4. Politique de tours."
bloc = """  // 3 bis. Conversation IA (28/10/2026) : l'agent répond vraiment au lieu de
  // passer la main sans alerte. La toute première réponse positive du flux deux
  // temps garde la présentation validée.
  const premiereIdentite = Boolean(
    enrollment && classification.classe === 'positif' && Number(enrollment.reply_turns || 0) === 0
  );
  if (enrollment && CLASSES_IA.has(classification.classe) && !premiereIdentite &&
      process.env.CONV_IA !== 'off') {
    try {
      const convIa = require('./conversation-ia');
      const ia = await convIa.repondre(db, contact, enrollment);
      if (ia) {
        resultat.reponse = ia.reponse || null;
        const faites = await convIa.appliquer(db, contact, enrollment, ia, corps);
        resultat.actions.push('conversation_ia:' + ia.etat, ...faites);
        return resultat;
      }
    } catch (e) {
      resultat.actions.push('ia_erreur:' + String(e.message).slice(0, 80));
    }
  }

"""

if ancre_const not in s or ancre_bloc not in s:
    print("ANCRE INTROUVABLE, rien modifie")
    sys.exit(1)

s = s.replace(ancre_const, const + ancre_const, 1)
s = s.replace(ancre_bloc, bloc + ancre_bloc, 1)
p.write_text(s)
print("branche OK")
