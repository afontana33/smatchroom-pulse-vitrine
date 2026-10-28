"""LinkedIn : dès qu'Alexis écrit lui-même dans une conversation, l'agent se retire (28/10/2026). Idempotent.
li-suivi.ts : chaque message envoyé par l'agent est noté (data/li-auto-textes.json) ; un message d'Alexis qui
n'est ni le premier message ni un message noté = écrit à la main → étape 'humain', plus de réponse ni de relance."""
import pathlib, re, shutil, sys
p = pathlib.Path('/root/SMATCHROOM_GLOBAL/smatchroom-ecosystem/agent-chasseur/src/li-suivi.ts')
s = p.read_text()
if 'li-auto-textes' in s:
    print('li-suivi : déjà fait'); sys.exit(0)
shutil.copy(p, str(p) + '.bak-main-alexis')
aide = """import * as fsAuto from 'node:fs';
const REG_AUTO = 'data/li-auto-textes.json';
const normAuto = (t: any) => String(t ?? '').replace(/\\s+/g, ' ').trim().slice(0, 200);
const autos = new Set<string>((() => { try { return JSON.parse(fsAuto.readFileSync(REG_AUTO, 'utf8')); } catch { return []; } })());
async function envoyerAuto(chat: string, text: string) {
  autos.add(normAuto(text));
  try { fsAuto.writeFileSync(REG_AUTO, JSON.stringify([...autos].slice(-3000))); } catch { /* best effort */ }
  return apiForm(`/chats/${chat}/messages`, { text });
}
"""
i = s.index('async function classer(')
s = s[:i] + aide + s[i:]
n0 = s.count('apiForm(`/chats/${r.li_chat_id}/messages`')
s = re.sub(r"apiForm\(`/chats/\$\{r\.li_chat_id\}/messages`, \{ text: ([^}]+?) \}\)", r"envoyerAuto(r.li_chat_id, \1)", s)
ancre = "async function repondre(r: any, items: any[]) {\n"
garde = """  // Alexis a écrit lui-même (message ni premier, ni envoyé par l'agent) : on lui laisse la conversation.
  const manuel = items.some((x) => (x.is_sender === 1 || x.is_sender === true) && normAuto(x.text) !== '' && normAuto(x.text) !== normAuto(r.li_message) && autos.has(normAuto(x.text)) === false);
  if (manuel) { if (DRY === false) await maj(r.id, { li_etape: 'humain' }); console.log(`[suivi] ${r.nom} : Alexis a repris la main, agent retiré`); return true; }
"""
if ancre not in s: print('li-suivi : ANCRE INTROUVABLE'); sys.exit(1)
s = s.replace(ancre, ancre + garde, 1)
p.write_text(s)
print(f'li-suivi : ok ({n0} envoi(s) suivis)')
