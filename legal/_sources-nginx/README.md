# Sauvegarde des pages légales servies par nginx

Copie conforme du contenu de `/var/www/elite-dev-kit/legal/` au 6 août 2026,
avant toute modification.

Ces fichiers HTML sont générés par pandoc et servis directement par nginx sur
`pulse.smatchroom.com`, en court-circuitant l'application Next.js :

```
location = /mentions-legales { alias /var/www/elite-dev-kit/legal/mentions-legales.html; }
location = /cgv             { alias /var/www/elite-dev-kit/legal/cgv.html; }
location = /privacy         { alias /var/www/elite-dev-kit/legal/privacy.html; }
location = /support         { alias /var/www/elite-dev-kit/legal/support.html; }
```

Aucune source versionnée n'a été retrouvée sur la machine : `/root/elite-dev-kit/`
n'existe pas. Ces copies servent de référence pour la reprise du contenu dans
Next.js (phases 2 et 4 de la mise en conformité) et de point de retour arrière.

Une fois la reprise faite et les `location =` retirés du vhost, ce dossier peut
être supprimé.
