#!/usr/bin/env python3
"""Préparation des messages (generate.ts) : répare la signature au lieu de rejeter le message (28/10/2026).
Constat : 96 prospects d'AS Électricité et de Manon rejetés parce que le modèle signe « Manon » au lieu de
« Manon · Community manager », ou laisse {ville}. On remet la signature exacte de la fiche et la ville connue.
Un message coupé au milieu d'une phrase n'est PAS réparé : il reste rejeté.
Sauvegarde generate.ts.bak-signature. Rejouable sans effet.
  python3 outils/generate-signature.py"""
import shutil, sys
p = '/root/SMATCHROOM_GLOBAL/smatchroom-ecosystem/agent-chasseur/src/generate.ts'
s = open(p, encoding='utf-8').read()
if 'reparerSignature' in s:
    print('generate.ts : déjà fait'); sys.exit(0)
a = "          msg = sortie.texte;\n"
if s.count(a) != 1:
    print('MOTIF INTROUVABLE'); sys.exit(1)
s = s.replace(a, a + "          msg = reparerSignature(msg, pol?.signature, lead.ville);\n")
s += '''

/** Remet la signature exacte de la fiche (« Prénom · Société ») quand le modèle a signé du prénom seul
 *  ou l'a oubliée, et remplace {ville} par la ville connue du prospect. Un corps coupé au milieu d'une
 *  phrase n'est pas réparé : le contrôle le rejettera comme avant. (28/10/2026) */
function reparerSignature(texte: string, signature: string | undefined, ville: string | null | undefined): string {
  let t = String(texte ?? '');
  if (ville) t = t.replace(/\\{\\s*ville\\s*\\}/gi, String(ville));
  const sig = String(signature ?? '').trim();
  if (sig === '') return t;
  const lignes = t.replace(/\\s+$/, '').split('\\n');
  const derniere = (lignes[lignes.length - 1] ?? '').trim();
  if (derniere === sig) return t;
  const prenom = sig.split(/[·|]/)[0].trim().toLowerCase();
  if (prenom && derniere.length <= 70 && derniere.toLowerCase().startsWith(prenom)) lignes.pop();
  while (lignes.length && lignes[lignes.length - 1].trim() === '') lignes.pop();
  const fin = (lignes[lignes.length - 1] ?? '').trim();
  if (/[.?!…)»"]$/.test(fin) === false) return t;
  return lignes.join('\\n') + '\\n\\n' + sig;
}
'''
shutil.copy(p, p + '.bak-signature')
open(p, 'w', encoding='utf-8').write(s)
print('generate.ts : ok')
