"""BLEU M TECH Agent 1 : nouvelle présentation (question facile) et relance « photo de facture » (28/10/2026). Idempotent.
Copie conversation-ia.js, remplace les deux textes « en deux mots » de formulations.js. La séquence se met à jour en SQL."""
import pathlib, shutil, sys
B = pathlib.Path('/root/SMATCHROOM_GLOBAL/bleumtech/api/lib')
shutil.copy('/root/smatchroom-ecosystem/smatchroom-pulse/outils/bmt/conversation-ia.js', B / 'conversation-ia.js')
p = B / 'formulations.js'; s = p.read_text()
if 'beaucoup n’ont pas revu le leur' in s:
    print('formulations : déjà fait'); sys.exit(0)
ancien = ("      'Merci {Prénom} \\u0021 Je vous explique en deux mots : on compare votre contrat d’électricité ' +\n"
          "      'avec les offres du moment et on vous dit s’il y a quelque chose à gagner. S’il n’y a rien, on vous le dit aussi. ' +\n"
          "      'Ça ne vous coûte rien : c’est le fournisseur retenu qui nous rémunère. ' +\n"
          "      'On peut vous appeler 5 minutes cette semaine pour en parler, plutôt le matin ou l’après-midi ?',")
nouveau = ("      'Merci {Prénom} \\u0021 Je regarde les contrats d’électricité des entreprises du secteur : ' +\n"
           "      'beaucoup n’ont pas revu le leur depuis la signature. Vous êtes plutôt sur un prix fixe, ou ça bouge tous les mois ?',")
n = s.count(ancien)
if n == 0: print('formulations : ANCRE INTROUVABLE'); sys.exit(1)
shutil.copy(p, str(p) + '.bak-accroche')
p.write_text(s.replace(ancien, nouveau))
print(f'formulations : ok ({n} texte(s))')
