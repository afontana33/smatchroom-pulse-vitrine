#!/usr/bin/env python3
"""Corrige l'hôte d'envoi de fichiers Green API (27/10/2026) : essaie <n>.media.green-api.com puis media.green-api.com."""
p = '/root/SMATCHROOM_GLOBAL/smatchroom-ecosystem/agent-chasseur/src/greenapi.ts'
s = open(p).read()
a = """  const media = c.host.replace(/\\/$/, '').replace('.api.', '.media.');
  const res = await fetch(`${media}/waInstance${c.idInstance}/sendFileByUpload/${c.apiToken}`, { method: 'POST', body: fd });
  if (!res.ok) throw new Error(`Green API sendFileByUpload ${res.status}: ${await res.text()}`);
  return ((await res.json()) as any).idMessage ?? '';"""
b = """  const n = (c.host.match(/\\/\\/(\\d+)\\./) ?? [])[1];
  const hotes = [n ? `https://${n}.media.green-api.com` : '', 'https://media.green-api.com'].filter(Boolean);
  let err: any;
  for (const h of hotes) {
    try {
      const res = await fetch(`${h}/waInstance${c.idInstance}/sendFileByUpload/${c.apiToken}`, { method: 'POST', body: fd });
      if (!res.ok) throw new Error(`Green API sendFileByUpload ${res.status}: ${await res.text()}`);
      return ((await res.json()) as any).idMessage ?? '';
    } catch (e) { err = e; }
  }
  throw err;"""
if b in s: print('déjà fait')
elif a in s: open(p, 'w').write(s.replace(a, b)); print('greenapi.ts : ok')
else: print('MOTIF INTROUVABLE')
