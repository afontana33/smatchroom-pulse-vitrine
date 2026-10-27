#!/usr/bin/env python3
"""Plus de prospects LinkedIn et Instagram (demande du 27/10/2026), à lancer une fois sur le VPS.
- li-relations.ts : messages directs aux relations LinkedIn existantes (20 par jour) ;
- li-recrut.ts : plus de mots-clés d'offres commerciales, 40 entreprises par jour ; li-cadeau 45 ; chauffe LinkedIn 15 ;
- ig-trouve.ts : artisans seulement (sources artisans/sirene, plus d'ENR ni de B2B), 150 recherchés par jour.
Sauvegardes .bak-volume, crontab sauvegardée dans /root/crontab.bak-volume. Rejouable sans effet."""
import shutil, subprocess, os
E = '/root/SMATCHROOM_GLOBAL/smatchroom-ecosystem/'
A, S = E + 'agent-chasseur/', E + 'agent-chasseur-smatchroom/'
O = '/root/smatchroom-ecosystem/smatchroom-pulse/outils/'

shutil.copy(O + 'li-relations.ts', A + 'src/li-relations.ts'); print('li-relations.ts : copié')

def patch(p, a, b):
    s = open(p).read()
    if b in s: print(os.path.basename(p), ': déjà fait'); return
    if a not in s: print(os.path.basename(p), ': MOTIF INTROUVABLE'); return
    if os.path.exists(p + '.bak-volume') is False: shutil.copy(p, p + '.bak-volume')
    open(p, 'w').write(s.replace(a, b)); print(os.path.basename(p), ': ok')

patch(A + 'src/li-recrut.ts',
      "const MOTS = ['business developer', 'commercial B2B', \"chargé d'affaires\", 'ingénieur commercial', 'responsable commercial', 'technico-commercial'];",
      "const MOTS = ['business developer', 'commercial B2B', \"chargé d'affaires\", 'ingénieur commercial', 'responsable commercial', 'technico-commercial', 'commercial terrain', 'attaché commercial', 'key account manager', 'directeur commercial', 'développeur commercial', 'commercial sédentaire'];")
patch(S + 'src/ig-trouve.ts',
      ".is('ig_etape', null).not('website', 'is', null)",
      ".is('ig_etape', null).in('source', ['artisans', 'sirene', 'maps', 'pack-lancement']).not('website', 'is', null)")

c = subprocess.run(['crontab', '-l'], capture_output=True, text=True).stdout
open('/root/crontab.bak-volume', 'w').write(c)
for a, b in [('li-recrut.ts --max=20', 'li-recrut.ts --max=40'), ('li-cadeau.ts --max=25', 'li-cadeau.ts --max=45'),
             ('li-chauffe.ts --max=8', 'li-chauffe.ts --max=15'), ('ig-trouve.ts --max=60', 'ig-trouve.ts --max=150')]:
    c = c.replace(a, b)
if 'li-relations.ts' not in c:
    c = c.rstrip('\n') + '\n50 8 * * 1-5 cd ' + A.rstrip('/') + ' && flock -n /tmp/li-relations.lock npx tsx src/li-relations.ts --max=20 >> logs/li-relations.log 2>&1\n'
subprocess.run(['crontab', '-'], input=c, text=True, check=True)
print('crontab : ok')
print(subprocess.run('crontab -l | grep -o "li-recrut.ts --max=[0-9]*\\|li-cadeau.ts --max=[0-9]*\\|li-chauffe.ts --max=[0-9]*\\|ig-trouve.ts --max=[0-9]*\\|li-relations.ts --max=[0-9]*"', shell=True, capture_output=True, text=True).stdout)
