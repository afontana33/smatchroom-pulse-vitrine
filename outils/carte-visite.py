#!/usr/bin/env python3
"""Carte de visite à la place de « je vous rappelle » (demande du 27/10/2026, Déco-Renov), à lancer une fois sur le VPS :
  python3 outils/carte-visite.py deco-renov https://pulse.smatchroom.com/cartes/deco-renov.jpg
- greenapi.ts : nouvelle fonction sendFileByUrl (image envoyée par WhatsApp) ;
- conversation.ts : si la fiche a « carte_url », la carte part après le message d'intérêt / de créneau,
  et après toute objection ou question marquée « carte »: true ;
- fiche du client : textes de fin sans proposition d'appel, carte_url renseignée.
Sauvegardes .bak-carte. Rejouable sans effet."""
import json, shutil, sys, os
A = '/root/SMATCHROOM_GLOBAL/smatchroom-ecosystem/agent-chasseur/'
slug, url = sys.argv[1], sys.argv[2]

def patch(p, reps):
    s = open(p).read()
    if 'carte_url' in s or 'sendFileByUrl' in s: print(os.path.basename(p), ': déjà fait'); return
    shutil.copy(p, p + '.bak-carte')
    for a, b in reps:
        if a not in s: print(os.path.basename(p), ': MOTIF INTROUVABLE', a[:60]); sys.exit(1)
        s = s.replace(a, b)
    open(p, 'w').write(s); print(os.path.basename(p), ': ok')

patch(A + 'src/greenapi.ts', [(
"/** Envoie un message WhatsApp avec comportement humanisé. Retourne l'idMessage. */",
"""/** Envoie un fichier (image, PDF) depuis une URL publique. Retourne l'idMessage. */
export async function sendFileByUrl(c: GreenCreds, e164: string, urlFile: string, fileName: string, caption = ''): Promise<string> {
  await sleep(jitter(3000, 4000));
  const res = await post(c, 'sendFileByUrl', { chatId: chatIdFromE164(e164), urlFile, fileName, caption });
  return res.idMessage ?? '';
}

/** Envoie un message WhatsApp avec comportement humanisé. Retourne l'idMessage. */""")])

patch(A + 'src/conversation.ts', [
("import { sendWhatsApp } from './greenapi.js';", "import { sendWhatsApp, sendFileByUrl } from './greenapi.js';"),
("interface Objection { exemples: string[]; reponse: string; cloture?: boolean }",
 "interface Objection { exemples: string[]; reponse: string; cloture?: boolean; carte?: boolean }"),
("async function passerLaMain(conv: ConvConfig, signature: string, creds: GreenCreds, lead: any, texte: string,\n  motif: string, message?: string, creneau?: string | null): Promise<void> {\n  if (message) { try { await envoyer(creds, lead, remplir(message, variables(lead, conv, creneau)), signature); } catch {} }",
 """/** Carte de visite du client (fiche : carte_url), envoyée en image après un message positif. */
async function envoyerCarte(conv: ConvConfig, creds: GreenCreds, lead: any): Promise<void> {
  const url = (conv as any).carte_url;
  if (!url) return;
  try {
    const id = await sendFileByUrl(creds, lead.telephone_e164, url, String(url).split('/').pop() ?? 'carte.jpg');
    await getSupabase().from(config.tables.conversations).insert({ lead_id: lead.id, client_id: lead.client_id, direction: 'out', body: '[carte de visite]', green_message_id: id });
  } catch (e: any) { console.error('[conversation] carte :', e.message ?? e); }
}

async function passerLaMain(conv: ConvConfig, signature: string, creds: GreenCreds, lead: any, texte: string,
  motif: string, message?: string, creneau?: string | null, carte = false): Promise<void> {
  if (message) { try { await envoyer(creds, lead, remplir(message, variables(lead, conv, creneau)), signature); } catch {} }
  if (carte) await envoyerCarte(conv, creds, lead);"""),
("const main = (motif: string, message?: string, creneau?: string | null) => passerLaMain(conv, sigEnvoi, creds, lead, texte, motif, message, creneau);",
 "const main = (motif: string, message?: string, creneau?: string | null, carte = false) => passerLaMain(conv, sigEnvoi, creds, lead, texte, motif, message, creneau, carte);"),
("await main('créneau obtenu', conv.confirmation_creneau, a.creneau); return true; }",
 "await main('créneau obtenu', conv.confirmation_creneau, a.creneau, true); return true; }"),
("if (!conv.demande_creneau) { await main('intérêt, rappel à prévoir', conv.confirmation_creneau); return true; }",
 "if (!conv.demande_creneau) { await main('intérêt, rappel à prévoir', conv.confirmation_creneau, null, true); return true; }"),
("if (await envoyer(creds, lead, remplir(o.reponse, V), sigEnvoi)) { await etapeSuivante('en_conversation'); return true; }",
 "if (await envoyer(creds, lead, remplir(o.reponse, V), sigEnvoi)) { if (o.carte) await envoyerCarte(conv, creds, lead); await etapeSuivante('en_conversation'); return true; }"),
("if (q && await envoyer(creds, lead, remplir(q.reponse, V), sigEnvoi)) { await etapeSuivante('en_conversation'); return true; }",
 "if (q && await envoyer(creds, lead, remplir(q.reponse, V), sigEnvoi)) { if ((q as any).carte) await envoyerCarte(conv, creds, lead); await etapeSuivante('en_conversation'); return true; }"),
])

f = A + f'clients/{slug}.json'
d = json.load(open(f, encoding='utf-8'))
if os.path.exists(f + '.bak-carte') is False: shutil.copy(f, f + '.bak-carte')
c = d['conversation']
c['carte_url'] = url
c['confirmation_creneau'] = "Avec plaisir ! Je vous laisse ma carte : n'hésitez pas à m'appeler ou à m'écrire dès que vous avez un chantier."
if 'deja_partenaire' in c.get('objections', {}):
    c['objections']['deja_partenaire'].update(carte=True, reponse="Je comprends ! Avoir un peintre de plus sous la main, ça peut toujours servir quand votre partenaire est débordé. Je vous laisse ma carte, gardez-la sous le coude.")
if 'prix' in c.get('faq', {}):
    c['faq']['prix'].update(carte=True, reponse="Ça dépend vraiment du chantier. Je vous laisse ma carte : envoyez-moi les éléments quand vous voulez et je vous fais un devis.")
json.dump(d, open(f, 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
print(f'{slug}.json : ok')
