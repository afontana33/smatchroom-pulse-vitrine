#!/usr/bin/env python3
"""Corrige l'hôte d'envoi de fichiers Green API (27/10/2026) : essaie <n>.media.green-api.com puis media.green-api.com."""
p = '/root/SMATCHROOM_GLOBAL/smatchroom-ecosystem/agent-chasseur/src/greenapi.ts'
s = open(p).read()
a = """  const media = c.host.replace(/\\/$/, '').replace('.api.', '.media.');
  const res = await fetch(`${media}/waInstance${c.idInstance}/sendFileByUpload/${c.apiToken}`, { method: 'POST', body: fd });
  if (!res.ok) throw new Error(`Green API sendFileByUpload ${res.status}: ${await res.text()}`);
  return ((await res.json()) as any).idMessage ?? '';"""
b = """  const n = (c.host.match(/\\/\\/(\\d+)\\./) ?? [])[1];
  // L'hôte principal de l'instance accepte l'envoi de fichiers (vérifié le 27/10/2026) ; les hôtes « media » en secours.
  const hotes = [c.host.replace(/\\/$/, ''), n ? `https://${n}.media.green-api.com` : '', 'https://media.green-api.com'].filter(Boolean);
  let err: any;
  for (const h of hotes) {
    let res: Response;
    try { res = await fetch(`${h}/waInstance${c.idInstance}/sendFileByUpload/${c.apiToken}`, { method: 'POST', body: fd }); }
    catch (e) { err = e; continue; } // hôte injoignable : on essaie le suivant
    // 5xx (souvent 504) : le fichier part quand même, on ne renvoie pas pour éviter un doublon.
    if (res.status >= 500) { console.warn('[carte] ' + res.status + ' de Green API, envoi considéré comme fait'); return ''; }
    if (res.ok === false) throw new Error(`Green API sendFileByUpload ${res.status}: ${await res.text()}`);
    return ((await res.json()) as any).idMessage ?? '';
  }
  throw err;"""
if b in s: print('déjà fait')
elif a in s: open(p, 'w').write(s.replace(a, b)); print('greenapi.ts : ok')
else: print('MOTIF INTROUVABLE')
