#!/usr/bin/env python3
"""Agent SmatchRoom : preuves clients anonymisées + « pas besoin de site » + B2B qui rebondit (28/10/2026).
Chiffres réels des 30 derniers jours (base chasseur_leads, 28/10/2026), clients anonymisés (accord d'Alexis).
Patche playbook-artisans.txt et playbook-b2b.txt (sauvegardes .bak-preuves). Rejouable sans effet.
  python3 outils/preuves-agent.py"""
import shutil, sys
D = '/root/SMATCHROOM_GLOBAL/smatchroom-ecosystem/agent-chasseur-smatchroom/src/'
PREUVES_ART = """- Un couvreur près de Belfort : en un mois, 152 professionnels contactés, 98 ont répondu, 78 conversations lui ont été transmises.
- Un peintre plaquiste en Eure-et-Loir : en un mois, 108 contactés, 64 réponses, 53 conversations transmises.
- Un électricien dans les Landes et les Pyrénées : en un mois, 126 contactés, 62 réponses, 54 conversations transmises.
"""
PREUVES_B2B = """- Un fournisseur industriel (pièces de graissage automatisé) : en un mois, 255 décideurs contactés, 47 réponses, 32 conversations transmises.
- Côté artisans : un couvreur près de Belfort a reçu 78 conversations en un mois sur 152 professionnels contactés.
"""

def patch(nom, reps, marque):
    p = D + nom
    s = open(p, encoding='utf-8').read()
    if marque in s:
        print(nom, ': déjà fait'); return
    shutil.copy(p, p + '.bak-preuves')
    for a, b in reps:
        if a not in s:
            print(nom, ': MOTIF INTROUVABLE', a[:60]); sys.exit(1)
        s = s.replace(a, b, 1)
    open(p, 'w', encoding='utf-8').write(s)
    print(nom, ': ok')

patch('playbook-artisans.txt', [
    ("PREUVES AUTORISÉES (aucune autre, n'invente jamais de chiffre ni de client)\n",
     "PREUVES AUTORISÉES (aucune autre, n'invente jamais de chiffre ni de client ; ne donne jamais le nom de ces clients)\n" + PREUVES_ART),
    ("\nOBJECTIONS (",
     "\n« PAS BESOIN DE SITE » N'EST PAS UN REFUS\nSi on lui propose le Pack Lancement et qu'il répond qu'il n'a pas besoin de site (ou qu'il en a déjà un), ne clos JAMAIS : le site est facultatif. Rebondis : l'essentiel, c'est de recevoir des chantiers ; cite une preuve adaptée à son métier, propose l'agent seul (149 € HT par mois, sans engagement, garantie), puis « Est-ce que vous êtes partant pour démarrer ? ».\n\nOBJECTIONS ("),
], 'PAS BESOIN DE SITE')

patch('playbook-b2b.txt', [
    ("PREUVES AUTORISÉES (aucune autre, n'invente jamais de chiffre ni de client)\n",
     "PREUVES AUTORISÉES (aucune autre, n'invente jamais de chiffre ni de client ; ne donne jamais le nom de ces clients)\n" + PREUVES_B2B),
    ("\nTON OBJECTIF\n",
     "\nORIGINE DU CONTACT\nIl a fait le test gratuit, OU tu l'as contacté parce qu'il montre un signal (recrutement d'un commercial, d'un business developer ou d'un SDR, création, croissance) : regarde l'Origine dans sa fiche et appuie-toi dessus.\n\nRÉPONDS À CE QU'IL DIT, JAMAIS UN TEXTE TOUT FAIT\n- Il recrute un commercial : un commercial met des mois avant de ramener ses premiers clients ; l'agent ouvre des conversations dès la première semaine et lui donnera des rendez-vous à traiter dès son arrivée.\n- Bouche-à-oreille : c'est un bon signe pour la qualité, mais ça ne se pilote pas ; l'agent ajoute un flux régulier de nouveaux décideurs.\n- Il fait déjà tout lui-même : l'agent ne remplace pas sa méthode, il lui fait gagner les heures de recherche, de premiers messages et de relances, et ne lui passe que ceux qui répondent.\n- Pas mûr, pas le moment : demande ce qui le ferait changer d'avis, propose de lui montrer en 10 minutes ce que l'agent trouverait pour lui, sans engagement.\nCite une preuve, puis propose toujours DEUX créneaux précis pour un appel ou une visio de 10 à 15 minutes (par exemple « jeudi 10 h ou vendredi 14 h ? »).\n\nTON OBJECTIF\n"),
], 'RÉPONDS À CE QU')
