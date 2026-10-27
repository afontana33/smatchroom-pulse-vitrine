#!/bin/sh
# Visibilité LinkedIn (27/10/2026) : réponses aux commentaires, commentaires chez les dirigeants, 3 posts par semaine.
A=/root/SMATCHROOM_GLOBAL/smatchroom-ecosystem/agent-chasseur
O=/root/smatchroom-ecosystem/smatchroom-pulse/outils
cp $O/li-reponses.ts $O/li-commentaires.ts $A/src/
E="env PATH=/root/.nvm/versions/node/v24.19.0/bin:/usr/local/bin:/usr/bin:/bin npx tsx"
ajoute() { crontab -l | grep -q "$2" || (crontab -l; echo "$1 cd $A && flock -n /tmp/$2.lock $E src/$2.ts $3 >> logs/$2.log 2>&1") | crontab -; }
ajoute "*/30 8-20 * * *" li-reponses ""
ajoute "20 9,11,14,16 * * 1-5" li-commentaires "--max=2"
crontab -l | sed 's#^47 8 \* \* 2,4 \(.*li-post.ts\)#47 8 * * 1,3,5 \1#' | crontab -
crontab -l | grep 'li-reponses\|li-commentaires\|li-post.ts' | cut -c1-60
