#!/usr/bin/env python3
"""Carte de visite à la place de « je vous rappelle » (demande du 27/10/2026, Déco-Renov), à lancer une fois sur le VPS :
  python3 outils/carte-visite.py deco-renov
La carte (outils/cartes/<slug>.jpg ou .png ou .pdf) est copiée dans agent-chasseur/clients/cartes/ et envoyée
directement depuis le serveur : elle n'est publiée sur aucun site.
- greenapi.ts : nouvelle fonction sendFileByUpload (fichier envoyé par WhatsApp) ;
- conversation.ts : si la fiche a « carte_fichier », la carte part après le message d'intérêt / de créneau,
  et après toute objection ou question marquée « carte »: true ;
- fiche du client : textes de fin sans proposition d'appel, carte_fichier renseigné.
Sauvegardes .bak-carte. Rejouable sans effet."""
import json, shutil, sys, os
A = '/root/SMATCHROOM_GLOBAL/smatchroom-ecosystem/agent-chasseur/'
slug = sys.argv[1]
O = '/root/smatchroom-ecosystem/smatchroom-pulse/outils/cartes/'
src = next((O + slug + e for e in ('.jpg', '.jpeg', '.png', '.pdf') if os.path.exists(O + slug + e)), None)
if src is None: print('carte introuvable dans', O); sys.exit(1)
os.makedirs(A + 'clients/cartes', exist_ok=True)
dest = A + 'clients/cartes/' + os.path.basename(src)
shutil.copy(src, dest); print('carte copiée :', dest)

def patch(p, reps):
    s = open(p).read()
    if 'carte_fichier' in s or 'sendFileByUpload' in s: print(os.path.basename(p), ': déjà fait'); return
    shutil.copy(p, p + '.bak-carte')
    for a, b in reps:
        if a not in s: print(os.path.basename(p), ': MOTIF INTROUVABLE', a[:60]); sys.exit(1)
        s = s.replace(a, b)
    open(p, 'w').write(s); print(os.path.basename(p), ': ok')

patch(A + 'src/greenapi.ts', [(
"/** Envoie un message WhatsApp avec comportement humanisé. Retourne l'idMessage. */",
"""/** Envoie un fichier local (image, PDF) par WhatsApp, sans URL publique. Retourne l'idMessage. */
export async function sendFileByUpload(c: GreenCreds, e164: string, chemin: string, caption = ''): Promise<string> {
  const { readFileSync } = await import('node:fs');
  const nom = chemin.split('/').pop() ?? 'carte.jpg';
  const type = /\\.pdf$/i.test(nom) ? 'application/pdf' : /\\.png$/i.test(nom) ? 'image/png' : 'image/jpeg';
  const fd = new FormData();
  fd.append('chatId', chatIdFromE164(e164));
  fd.append('fileName', nom);
  if (caption) fd.append('caption', caption);
  fd.append('file', new Blob([readFileSync(chemin)], { type }), nom);
  await sleep(jitter(3000, 4000));
  // Les envois de fichiers passent par l'hôte « media » de l'instance (ex. 7103.media.greenapi.com).
  const media = c.host.replace(/\\/$/, '').replace('.api.', '.media.');
  const res = await fetch(`${media}/waInstance${c.idInstance}/sendFileByUpload/${c.apiToken}`, { method: 'POST', body: fd });
  if (!res.ok) throw new Error(`Green API sendFileByUpload ${res.status}: ${await res.text()}`);
  return ((await res.json()) as any).idMessage ?? '';
}

/** Envoie un message WhatsApp avec comportement humanisé. Retourne l'idMessage. */""")])

patch(A + 'src/conversation.ts', [
("import { sendWhatsApp } from './greenapi.js';", "import { sendWhatsApp, sendFileByUpload } from './greenapi.js';"),
("interface Objection { exemples: string[]; reponse: string; cloture?: boolean }",
 "interface Objection { exemples: string[]; reponse: string; cloture?: boolean; carte?: boolean }"),
("async function passerLaMain(conv: ConvConfig, signature: string, creds: GreenCreds, lead: any, texte: string,\n  motif: string, message?: string, creneau?: string | null): Promise<void> {\n  if (message) { try { await envoyer(creds, lead, remplir(message, variables(lead, conv, creneau)), signature); } catch {} }",
 """/** Carte de visite du client (fiche : carte_fichier, dans clients/cartes/), envoyée après un message positif. */
async function envoyerCarte(conv: ConvConfig, creds: GreenCreds, lead: any): Promise<void> {
  const nom = (conv as any).carte_fichier;
  if (!nom) return;
  try {
    const id = await sendFileByUpload(creds, lead.telephone_e164, path.resolve(__dirname, '../clients/cartes', String(nom)));
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
c.pop('carte_url', None)
c['carte_fichier'] = os.path.basename(src)
c['confirmation_creneau'] = "Avec plaisir ! Je vous laisse ma carte : n'hésitez pas à m'appeler ou à m'écrire dès que vous avez un chantier."
if 'deja_partenaire' in c.get('objections', {}):
    c['objections']['deja_partenaire'].update(carte=True, reponse="Je comprends ! Avoir un peintre de plus sous la main, ça peut toujours servir quand votre partenaire est débordé. Je vous laisse ma carte, gardez-la sous le coude.")
if 'prix' in c.get('faq', {}):
    c['faq']['prix'].update(carte=True, reponse="Ça dépend vraiment du chantier. Je vous laisse ma carte : envoyez-moi les éléments quand vous voulez et je vous fais un devis.")
json.dump(d, open(f, 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
print(f'{slug}.json : ok')
