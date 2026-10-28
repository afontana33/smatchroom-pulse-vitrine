#!/usr/bin/env python3
"""Prospects B2B de l'agent SmatchRoom (LinkedIn, offres d'emploi, B2B) : après leur réponse à la question,
l'agent rédige lui-même la suite avec playbook-b2b.txt (rebondit, preuve, deux créneaux) au lieu d'envoyer
le texte figé message_m3, puis mène la conversation jusqu'à l'appel (28/10/2026).
Sauvegardes .bak-b2bconv. Rejouable sans effet.
  python3 outils/b2b-conversation.py"""
import shutil, sys
D = '/root/SMATCHROOM_GLOBAL/smatchroom-ecosystem/agent-chasseur-smatchroom/src/'
B2B = "['linkedin', 'b2b', 'france_travail', 'indeed', 'ft_crm']"

def patch(nom, reps):
    p = D + nom
    s = open(p, encoding='utf-8').read()
    if 'B2B_SOURCES' in s:
        print(nom, ': déjà fait'); return
    shutil.copy(p, p + '.bak-b2bconv')
    for a, b in reps:
        if s.count(a) != 1:
            print(nom, ': MOTIF', s.count(a), 'x ->', a[:70]); sys.exit(1)
        s = s.replace(a, b)
    open(p, 'w', encoding='utf-8').write(s)
    print(nom, ': ok')

patch('deux-temps-sr.ts', [
    ("export const ACTIVES = ",
     f"const B2B_SOURCES = {B2B};\nexport const ACTIVES = "),
    ("['artisans', 'pack-lancement', 'maps', 'enr', 'formulaire', 'simulateur', 'simulateur_b2b'].includes(String(lead.source ?? ''))",
     "['artisans', 'pack-lancement', 'maps', 'enr', 'formulaire', 'simulateur', 'simulateur_b2b', ...B2B_SOURCES].includes(String(lead.source ?? ''))"),
    ("    if (q.intention === 'repond' && q.confiance >= 0.6 && lead.message_m3) {",
     """    if (q.intention === 'repond' && q.confiance >= 0.6 && B2B_SOURCES.includes(String(lead.source ?? ''))) {
      // B2B : plus de texte figé, l'agent rebondit sur sa réponse avec la fiche B2B (28/10/2026).
      if (!(await verrou('en_conversation'))) return { etat: 'pris' };
      const { converser } = await import('./conversation-sr.js');
      return converser(creds, lead, texte, historique, (hist ?? []).filter((m: any) => m.direction === 'out').length);
    }
    if (q.intention === 'repond' && q.confiance >= 0.6 && lead.message_m3) {"""),
])

patch('conversation-sr.ts', [
    ("const FICHE_B2B = ",
     f"const B2B_SOURCES = {B2B};\nconst FICHE_B2B = "),
    ("const b2b = String(lead.source) === 'simulateur_b2b';",
     "const b2b = String(lead.source) === 'simulateur_b2b' || B2B_SOURCES.includes(String(lead.source));"),
    (": 'prospection'}`",
     ": B2B_SOURCES.includes(String(lead.source)) ? `prospection B2B, tu l'as contacté sur ce signal : ${String(lead.source_ref ?? lead.source)}` : 'prospection'}`"),
])
