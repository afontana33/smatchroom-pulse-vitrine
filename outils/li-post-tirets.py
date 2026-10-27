#!/usr/bin/env python3
"""Posts LinkedIn sans tirets de ponctuation (demande du 27/10/2026). À lancer une fois sur le VPS :
  python3 outils/li-post-tirets.py
- consigne ajoutée au prompt de li-post.ts ;
- filet de sécurité avant publication : « a - b », « a – b », « a — b » deviennent « a, b » ;
  un tiret en début de ligne (liste) devient « • ». Les mots composés (bouche-à-oreille) ne bougent pas.
Sauvegarde li-post.ts.bak-tirets. Rejouable sans effet."""
import shutil, sys
p = '/root/SMATCHROOM_GLOBAL/smatchroom-ecosystem/agent-chasseur/src/li-post.ts'
s = open(p, encoding='utf-8').read()
if 'sansTirets' in s:
    print('li-post.ts : déjà fait'); sys.exit(0)
reps = [
    ("Réponds uniquement par le texte du post.`;",
     "Aucun tiret utilisé comme ponctuation (ni -, ni –, ni —) : utilise des virgules, des points ou des deux-points.\nRéponds uniquement par le texte du post.`;"),
    ("  const texte = (await rediger(PROMPT(angle, deja)))",
     "  const texte = sansTirets(await rediger(PROMPT(angle, deja)))"),
]
for a, b in reps:
    if a not in s:
        print('MOTIF INTROUVABLE :', a[:60]); sys.exit(1)
    s = s.replace(a, b, 1)
fn = ("// Aucun tiret de ponctuation (demande d'Alexis, 27/10/2026).\n"
      "const sansTirets = (t: string) => t.replace(/^[ \\t]*[-–—][ \\t]+/gm, '• ').replace(/[ \\t]+[-–—][ \\t]+/g, ', ')"
      ".replace(/[–—]/g, ', ').replace(/,[ \\t]*,/g, ',');\n")
i = s.index('\nconst ', s.index('import')) + 1
s = s[:i] + fn + s[i:]
shutil.copy(p, p + '.bak-tirets')
open(p, 'w', encoding='utf-8').write(s)
print('li-post.ts : ok')
