"""Branche auto-reponse.ts dans listener.ts et filet-suite.ts (agent-chasseur, 28/10/2026). Idempotent."""
import pathlib, shutil, sys
A = pathlib.Path('/root/SMATCHROOM_GLOBAL/smatchroom-ecosystem/agent-chasseur/src')
shutil.copy('/root/smatchroom-ecosystem/smatchroom-pulse/outils/auto-reponse.ts', A / 'auto-reponse.ts')
p = A / 'listener.ts'; s = p.read_text()
if 'estReponseAuto' not in s:
    ancre = "    if (/^[^\\p{L}\\p{N}]*$/u.test(texte.trim())) {"
    if ancre not in s: print('listener : ANCRE INTROUVABLE'); sys.exit(1)
    bloc = """    {
      const { data: der } = await sb.from(config.tables.conversations).select('created_at').eq('lead_id', lead.id).eq('direction', 'out').order('created_at', { ascending: false }).limit(1);
      const sec = der?.[0] ? (Date.now() - Date.parse(der[0].created_at)) / 1000 : Infinity;
      if (estReponseAuto(texte, sec)) { console.log(`[listener] ${client.slug} lead ${lead.id} : réponse automatique ignorée « ${texte.slice(0, 60)} »`); return; }
    }
"""
    shutil.copy(p, str(p) + '.bak-auto-reponse')
    s = s.replace(ancre, bloc + ancre, 1)
    s = s.replace("import { traiterConversation } from './conversation.js';", "import { traiterConversation } from './conversation.js';\nimport { estReponseAuto } from './auto-reponse.js';", 1)
    p.write_text(s); print('listener : ok')
else: print('listener : déjà fait')
f = A / 'filet-suite.ts'; s = f.read_text()
if 'estReponseAuto' not in s:
    ancre = "      if (!texte || /^[^\\p{L}\\p{N}]*$/u.test(texte)) continue;"
    if ancre not in s: print('filet : ANCRE INTROUVABLE'); sys.exit(1)
    s = s.replace(ancre, ancre + "\n      if (estReponseAuto(texte)) continue; // accueil automatique : on attend la vraie réponse", 1)
    s = s.replace("import { traiterReponseEntrante } from './handoff.js';", "import { traiterReponseEntrante } from './handoff.js';\nimport { estReponseAuto } from './auto-reponse.js';", 1)
    f.write_text(s); print('filet : ok')
else: print('filet : déjà fait')
