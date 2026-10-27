# Leads du simulateur (source « simulateur ») : l'agent SmatchRoom mène la conversation et conclut.
# Usage : python3 simulateur-agent.py <dossier agent-chasseur-smatchroom>
import sys, os
d = sys.argv[1]
def patch(rel, pairs):
    p = os.path.join(d, rel); s = open(p, encoding='utf8').read()
    for a, b in pairs:
        if b in s: continue
        assert a in s, (rel, a[:70])
        s = s.replace(a, b, 1)
    open(p, 'w', encoding='utf8').write(s)
patch('src/deux-temps-sr.ts', [("['artisans', 'pack-lancement', 'maps', 'enr', 'formulaire']", "['artisans', 'pack-lancement', 'maps', 'enr', 'formulaire', 'simulateur']")])
patch('src/listener.ts', [("source, website, naf, client_id')", "source, website, naf, client_id, source_ref')")])
patch('src/conversation-sr.ts', [
  ("String(lead.source) === 'formulaire' === false", "['formulaire', 'simulateur'].includes(String(lead.source)) === false"),
  ("Origine : ${lead.source === 'formulaire' ? 'contact entrant (il a rempli le formulaire de ta publicité)' : 'prospection'}",
   "Origine : ${lead.source === 'simulateur' ? `test gratuit sur ton site (${String(lead.source_ref ?? '')})` : lead.source === 'formulaire' ? 'contact entrant (il a rempli le formulaire de ta publicité)' : 'prospection'}"),
])
p = os.path.join(d, 'src/playbook-artisans.txt'); s = open(p, encoding='utf8').read()
if 'TEST DU SITE' not in s:
    s = s.rstrip('\n') + """

TEST DU SITE
- Si la fiche indique « Origine : test gratuit sur ton site », il vient de faire le test sur pulse.smatchroom.com et tu lui as écrit juste après pour lui proposer d'expliquer comment l'agent contacterait les professionnels trouvés. Ne lui demande jamais qui il est.
- Il n'est pas forcément artisan (agent immobilier, conseiller, consultant, entreprise de nettoyage…) : adapte tes exemples à son activité et aux cibles indiquées dans la fiche. L'offre et les prix sont les mêmes.
- Explique en 2 phrases : chaque jour, tu écris en son nom à ces professionnels de sa zone, par WhatsApp et par e-mail, et il est prévenu dès que l'un d'eux est intéressé. Demande s'il a déjà un site si c'est inconnu, puis présente l'offre adaptée et demande s'il est partant.
- Il est demandeur : va plus vite qu'avec un contact à froid, propose de démarrer dès le 2e ou 3e message.
"""
    open(p, 'w', encoding='utf8').write(s)
print('OK')
