# Remplace la section OBJECTIONS du playbook artisans par outils/objections-artisans.txt
# et laisse l'agent répondre à tout (le passage à Alexis reste pour robot/IA, agressivité, litige).
import sys
p = sys.argv[1]
s = open(p, encoding='utf8').read()
new = open(sys.argv[2], encoding='utf8').read().rstrip('\n') + '\n\n'
a = s.index('OBJECTIONS\n'); b = s.index('RÈGLES\n', a)
s = s[:a] + new + s[b:]
old = "s'il demande si tu es un robot ou une IA, s'il pose une question précise que la fiche ne couvre pas, s'il est agressif, s'il parle d'un litige, ou au moindre doute. Dans ce cas tu ne réponds pas : Alexis reprend la main."
assert old in s
s = s.replace(old, "s'il demande si tu es un robot ou une IA, s'il est agressif ou s'il parle d'un litige. Dans ce cas tu ne réponds pas : Alexis reprend la main. Pour toute autre question ou objection, tu réponds toi-même avec les éléments de cette fiche, sans jamais inventer de chiffre ni de promesse.")
open(p, 'w', encoding='utf8').write(s)
print('OK', len(s))
