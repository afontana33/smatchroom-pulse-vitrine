#!/usr/bin/env python3
"""Contacts entrants (formulaire de pub, simulateur) : l'agent mène la vente au bout (demande du 28/10/2026).
Constat sur Gabriel (plombier, Strasbourg) : prix au 4e message, abandon au premier « j'attendrai », lien du site oublié.
Ajoute au playbook artisans une section prioritaire CONTACTS ENTRANTS. Sauvegarde .bak-entrants. Rejouable sans effet.
  python3 outils/entrants-closing.py"""
import shutil, sys
p = '/root/SMATCHROOM_GLOBAL/smatchroom-ecosystem/agent-chasseur-smatchroom/src/playbook-artisans.txt'
s = open(p, encoding='utf-8').read()
PREUVE = """PREUVE POUR LES CONTACTS ENTRANTS (28/10/2026) : avant le prix, donne UN résultat réel, le plus proche de son métier, sans nom de client :
- un couvreur près de Belfort : 152 partenaires contactés, 98 réponses, 78 transmis en un mois ;
- un peintre en Eure-et-Loir : 108 contactés, 64 réponses, 53 transmis ;
- un électricien : 126 contactés, 62 réponses, 54 transmis.
N'invente jamais d'autre chiffre. Après la preuve, donne le prix et la garantie, puis laisse-lui le choix : « On démarre cette semaine, ou vous préférez que je vous appelle 5 minutes pour vous montrer ? ».
"""
if 'CONTACTS ENTRANTS' in s:
    if 'PREUVE POUR LES CONTACTS ENTRANTS' in s:
        print('playbook : déjà fait'); sys.exit(0)
    shutil.copy(p, p + '.bak-preuve')
    s = s.replace('CONTACTS ENTRANTS (prioritaire sur les autres règles)', PREUVE + 'CONTACTS ENTRANTS (prioritaire sur les autres règles)', 1)
    open(p, 'w', encoding='utf-8').write(s)
    print('playbook : preuve ajoutée'); sys.exit(0)
SECTION = """CONTACTS ENTRANTS (prioritaire sur les autres règles)
Quand l'origine est un formulaire, une pub ou le simulateur, c'est LUI qui nous a contactés : il a un besoin. Ton but est de conclure, pas de le laisser partir.
1. Découverte avant tout prix (une question par message) : son métier et sa ville ; comment il trouve ses clients aujourd'hui (bouche-à-oreille, plateformes, rien) ; ce qu'il voudrait de plus (plus de chantiers, des chantiers plus réguliers, sortir des plateformes, remplir les mois creux).
2. Reformule son besoin en une phrase et montre, avec un exemple concret de son métier et de sa ville, ce que l'agent ferait pour lui. Seulement ensuite : le site (s'il n'en a pas, Pack Lancement), puis le prix et la garantie, puis « Est-ce que vous êtes partant pour démarrer ? ».
3. S'il hésite (« j'attendrai », « je réfléchis », « pas pour le moment », « c'est cher ») : n'abandonne JAMAIS au premier refus. Demande avec bienveillance ce qui le retient (le prix, le moment, un doute sur le résultat ?), réponds à cette objection précise (voir OBJECTIONS), puis propose une étape sans risque : le test gratuit sur pulse.smatchroom.com/simulateur pour voir les professionnels que l'agent contacterait dans sa ville, ou un appel de 5 minutes avec Alexis. Rappelle que c'est sans engagement et que la garantie s'applique.
4. Ce n'est qu'au deuxième refus clair que tu t'arrêtes : remercie-le, et laisse toujours le site dans une vraie phrase, par exemple « Je vous laisse le site pour en voir plus : pulse.smatchroom.com. Je reste disponible ici quand vous voulez. »
5. La règle « pas pour le moment » de la prospection à froid ne s'applique PAS aux contacts entrants.

"""
i = s.index('OBJECTIONS')
shutil.copy(p, p + '.bak-entrants')
s = s[:i] + PREUVE + SECTION + s[i:]
s = s.replace("- Je veux réfléchir : bien sûr, propose 5 minutes d'appel pour répondre à ses questions, sinon laisse pulse.smatchroom.com.",
              "- Je veux réfléchir : bien sûr ; demande ce qui le fait hésiter et réponds-y, puis propose le test gratuit (pulse.smatchroom.com/simulateur) ou 5 minutes d'appel. Laisse toujours le site dans une phrase complète, jamais seul.")
open(p, 'w', encoding='utf-8').write(s)
print('playbook : ok')
