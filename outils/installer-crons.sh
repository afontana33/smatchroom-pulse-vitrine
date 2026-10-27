#!/bin/sh
# Installe (une seule fois) les tâches planifiées de l'automatisation Pulse dans agent-chasseur/.
A=/root/SMATCHROOM_GLOBAL/smatchroom-ecosystem/agent-chasseur
N=/root/.nvm/versions/node/v24.19.0/bin/npx
for f in creer-agent recap-jour paiements renouvellements connexion surveillance-instances; do cp /root/smatchroom-ecosystem/smatchroom-pulse/outils/$f.mts $A/; done
ajoute() { crontab -l | grep -q "$2" || (crontab -l; echo "$1 cd $A && flock -n /tmp/$2.lock $N tsx $2.mts >> logs/$2.log 2>&1") | crontab -; }
ajoute "30 19 * * 1-5" recap-jour
ajoute "15 9-19 * * *" paiements
ajoute "5 10 * * *" renouvellements
ajoute "*/5 8-21 * * *" connexion
ajoute "*/10 * * * *" surveillance-instances
crontab -l | grep -c "recap-jour\|paiements.mts\|renouvellements\|connexion.mts\|creer-agent\|surveillance-instances"
