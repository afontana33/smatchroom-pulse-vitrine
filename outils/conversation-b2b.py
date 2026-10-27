#!/usr/bin/env python3
"""Conversation B2B du simulateur (demande du 27/10/2026), à lancer une fois sur le VPS.
- copie playbook-b2b.txt dans agent-chasseur-smatchroom/src/ ;
- conversation-sr.ts : fiche B2B pour la source « simulateur_b2b », action « ignorer » (réponses automatiques),
  pas de lien d'accueil en B2B (l'agent vise un appel, Alexis vend) ;
- listener.ts / deux-temps-sr.ts : la source « simulateur_b2b » passe dans la conversation comme « simulateur » ;
- playbook-artisans.txt : action « ignorer » aussi pour les artisans.
Sauvegardes en .bak-b2b. Rejouable sans effet."""
import shutil, sys
S = '/root/SMATCHROOM_GLOBAL/smatchroom-ecosystem/agent-chasseur-smatchroom/src/'
P = '/root/smatchroom-ecosystem/smatchroom-pulse/outils/playbook-b2b.txt'

def patch(nom, reps):
    p = S + nom
    s = open(p).read()
    if 'simulateur_b2b' in s or 'ignorer' in s and nom.endswith('.txt'):
        print(f'{nom} : déjà fait'); return
    shutil.copy(p, p + '.bak-b2b')
    for a, b in reps:
        if a not in s:
            print(f'{nom} : motif introuvable -> {a[:70]}'); sys.exit(1)
        s = s.replace(a, b)
    open(p, 'w').write(s)
    print(f'{nom} : ok')

shutil.copy(P, S + 'playbook-b2b.txt')
print('playbook-b2b.txt : copié')

patch('conversation-sr.ts', [
    ("const FICHE = '" + S + "playbook-artisans.txt';",
     "const FICHE = '" + S + "playbook-artisans.txt';\nconst FICHE_B2B = '" + S + "playbook-b2b.txt';"),
    ("async function ia(fiche: string, historique: string, texte: string): Promise<any> {",
     "async function ia(fiche: string, historique: string, texte: string, chemin = FICHE): Promise<any> {"),
    ("system: readFileSync(FICHE, 'utf8')", "system: readFileSync(chemin, 'utf8')"),
    ("['formulaire', 'simulateur']", "['formulaire', 'simulateur', 'simulateur_b2b']"),
    ("const d = await ia(fiche, historique, texte);\n    const action = String(d.action ?? 'humain');",
     "const b2b = String(lead.source) === 'simulateur_b2b';\n    const d = await ia(fiche, historique, texte, b2b ? FICHE_B2B : FICHE);\n"
     "    let action = String(d.action ?? 'humain');\n    if (b2b && action === 'lien') action = 'humain';"),
    ("if (action === 'humain' || msg === '')",
     "if (action === 'ignorer') { await sb.from(T.leads).update({ flux_etape: 'en_conversation' }).eq('id', lead.id); return { etat: 'pris' }; }\n"
     "    if (action === 'humain' || msg === '')"),
])
# Le motif « Origine » de la fiche vaut aussi pour la source simulateur_b2b.
patch2 = S + 'conversation-sr.ts'
s = open(patch2).read()
if "lead.source === 'simulateur' ?" in s:
    s = s.replace("lead.source === 'simulateur' ?", "String(lead.source).startsWith('simulateur') ?")
    open(patch2, 'w').write(s)

for nom in ['listener.ts', 'deux-temps-sr.ts']:
    s = open(S + nom).read()
    if "'simulateur']" in s and 'simulateur_b2b' not in s:
        patch(nom, [("'simulateur']", "'simulateur', 'simulateur_b2b']")])
    else:
        print(f'{nom} : rien à changer')

patch('playbook-artisans.txt', [
    ('{"action": "repondre", "message": "..."}',
     '{"action": "repondre", "message": "..."}\n'
     '{"action": "ignorer"} si le message est une réponse automatique (message d\'accueil ou d\'absence d\'un compte WhatsApp Business, du type « Merci de nous avoir contactés… »). Tu ne réponds pas et tu attends sa vraie réponse.'),
])
