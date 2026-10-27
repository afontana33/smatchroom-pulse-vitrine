# L'agent SmatchRoom conclut lui-même : « Est-ce que vous êtes partant ? » puis envoie le lien d'accueil.
# Usage : python3 closing-agent.py <dossier agent-chasseur-smatchroom>
import sys, os
d = sys.argv[1]
# 1) playbook
p = os.path.join(d, 'src/playbook-artisans.txt'); s = open(p, encoding='utf8').read()
rep = [
 ("Obtenir un créneau pour un appel de 5 minutes, où tu lances tout avec lui. Ne parle du prix que s'il montre de l'intérêt ou s'il le demande. Quand il est intéressé : présente l'offre adaptée (prix et garantie) en 2 ou 3 phrases, puis propose l'appel : « plutôt le matin ou l'après-midi ? ».",
  "Conclure directement sur WhatsApp, sans appel. Ne parle du prix que s'il montre de l'intérêt ou s'il le demande. Quand il est intéressé : présente l'offre adaptée (prix et garantie) en 2 ou 3 phrases, puis demande « Est-ce que vous êtes partant pour démarrer ? ». S'il dit oui : action \"lien\". S'il hésite ou pose une question, réponds-y (voir OBJECTIONS) puis repose la question. S'il préfère en parler de vive voix, propose un appel de 5 minutes : « plutôt le matin ou l'après-midi ? »."),
 ("  puis termine TOUJOURS par : « Je peux vous appeler 5 minutes pour lancer ça, plutôt le matin ou l'après-midi ? »",
  "  puis termine TOUJOURS par : « Est-ce que vous êtes partant pour démarrer ? »"),
 ("puis reviens doucement vers l'appel de 5 minutes)", "puis repose doucement la question « Est-ce que vous êtes partant pour démarrer ? »)"),
]
for a, b in rep:
    assert a in s, a[:60]
    s = s.replace(a, b)
ancre = '{"action": "refus", "message": "Très bien, merci pour votre retour.'
assert ancre in s
s = s.replace(ancre, '{"action": "lien", "offre": "pack" ou "agent", "message": "Parfait, je vous envoie le lien pour démarrer : vous y remplissez vos informations en 5 minutes et je lance tout."} quand il accepte de démarrer (oui, partant, ok, on y va, allons-y). "offre" = "pack" s\'il a accepté le Pack Lancement (pas de site), sinon "agent". Le lien part tout seul juste après ton message : ne l\'écris pas toi-même.\n' + ancre, 1)
open(p, 'w', encoding='utf8').write(s)
# 2) conversation-sr.ts
p = os.path.join(d, 'src/conversation-sr.ts'); s = open(p, encoding='utf8').read()
s = s.replace("import { sendWhatsApp } from './greenapi.js';", "import { sendWhatsApp } from './greenapi.js';\nimport { commandeAlexis } from './commande-alexis.js';", 1)
a = "    if (action === 'rdv') return passer("
assert a in s
s = s.replace(a, """    if (action === 'lien') {
      const offre = String(d.offre) === 'pack' ? 'pack' : 'agent';
      const r = await passer(`🟢 Partant (${offre}) : lien d'accueil envoyé`);
      if (envoyer) return r;
      await commandeAlexis({ id: lead.client_id ?? 1 }, `ok ${offre} ${lead.id}`, sb, true).catch((e: any) => console.error('[conversation] lien', e?.message));
      return r;
    }
""" + a, 1)
open(p, 'w', encoding='utf8').write(s)
print('OK')
