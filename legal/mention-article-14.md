# Mention à insérer dans le premier message des agents

> ⚠ **BROUILLON — à faire valider par un avocat avant mise en production.**
>
> Ce document fournit le texte exact à insérer dans le **premier message de chaque séquence**
> adressée à une personne dont les données n'ont pas été collectées auprès d'elle.
>
> Il répond à deux obligations distinctes qui se cumulent :
> - **Article 14 du RGPD** : information des personnes lorsque les données ne proviennent pas
>   d'elles. L'information doit être fournie au plus tard lors de la première communication.
> - **Article 50 du règlement (UE) 2024/1689 (AI Act)**, applicable depuis le 2 août 2026 :
>   information sur le caractère automatisé de l'interaction, dès la première interaction.
>
> Le code des agents n'est pas dans ce dépôt. Voir la section 6 de `AUDIT-CONFORMITE.md` pour la
> liste des modifications à faire côté produit.

---

## 1. Ce que la mention doit contenir

| Élément | Fondement | Présent dans le texte ? |
|---|---|---|
| Identité du responsable de traitement | RGPD art. 14.1.a | Oui |
| Finalité du traitement | RGPD art. 14.1.c | Oui |
| Source des données | RGPD art. 14.2.f | Oui |
| Droit d'opposition et modalité d'exercice | RGPD art. 14.2.c et 21.4 | Oui, en un mot |
| Accès à l'information complète | RGPD art. 14.1 | Oui, par renvoi à une URL |
| Caractère automatisé du message | AI Act art. 50 | Oui |
| Moyen de joindre un humain | AI Act art. 50, bonne pratique | Oui |

L'information complète (durées, base légale, destinataires, transferts, ensemble des droits,
réclamation CNIL) figure sur `https://pulse.smatchroom.com/confidentialite`, section 5. Le renvoi
est admis dès lors que la mention immédiate contient les éléments essentiels et que le lien est
direct.

---

## 2. Version messagerie instantanée (WhatsApp)

Contrainte : le message doit rester court, sans URL cliquable pour limiter le risque de blocage.
La mention est placée **à la fin du premier message**, séparée par un saut de ligne.

```
—
Message envoyé automatiquement par un agent IA pour le compte de {NOM_DU_CLIENT}.
Vos coordonnées professionnelles proviennent de sources publiques (INSEE, INPI).
Répondez STOP pour ne plus être contacté, HUMAIN pour parler à quelqu'un.
Infos : pulse.smatchroom.com/confidentialite
```

> Le caractère « — » est ici un séparateur visuel de bloc, pas une ponctuation de phrase.
> Si le rendu pose problème sur un terminal, le remplacer par une ligne vide.

**Variante lorsque SMATCHROOM prospecte pour son propre compte** : remplacer
`pour le compte de {NOM_DU_CLIENT}` par `pour le compte de SMATCHROOM SAS (Bordeaux)`.

---

## 3. Version courriel

En courriel, la contrainte de longueur ne s'applique pas et le lien de désinscription est attendu.
La mention est placée en pied de message.

```
--
Ce message a été rédigé et envoyé par un agent logiciel automatisé (intelligence
artificielle), pour le compte de {NOM_DU_CLIENT}, {FORME_JURIDIQUE} sise
{ADRESSE_DU_CLIENT}, responsable du traitement de vos données.

Finalité : vous adresser une proposition commerciale correspondant à votre
activité professionnelle.

Vos coordonnées professionnelles proviennent de sources publiques : base Sirene
de l'INSEE, registre national des entreprises de l'INPI, et informations
publiées par votre entreprise.

Vous pouvez vous opposer à tout moment, sans avoir à vous justifier et sans
frais, à recevoir de nouveaux messages : répondez STOP à ce courriel, ou
cliquez ici → {LIEN_DESINSCRIPTION}. L'opposition est immédiate et définitive.

Pour échanger avec une personne plutôt qu'avec l'agent, répondez HUMAIN.

Détail des traitements, durées de conservation, destinataires et de vos droits
(accès, rectification, effacement, limitation, opposition, portabilité), et
modalités de réclamation auprès de la CNIL :
https://pulse.smatchroom.com/confidentialite
```

---

## 4. Règles d'implémentation

1. **Premier message de chaque séquence, sans exception.** Y compris lorsqu'un agent reprend un
   contact ancien, change de canal, ou est réaffecté à un autre client. « Première interaction »
   s'apprécie du point de vue du destinataire.
2. **Ne jamais rendre la mention conditionnelle** à un paramètre client, à un test A/B ou à une
   longueur maximale de message. Si le message est trop long, c'est le corps qu'on raccourcit.
3. **`STOP` doit être traité automatiquement**, sans intervention humaine, sur tous les canaux, et
   écrire dans une liste d'opposition **commune à tous les agents et tous les clients**. Une
   opposition exprimée à un agent doit bloquer les autres.
4. **Détection tolérante** : accepter au minimum `STOP`, `stop`, `Stop`, `ARRET`, `ARRÊT`,
   `DESINSCRIPTION`, `DÉSINSCRIPTION`, `UNSUBSCRIBE`, ainsi que les messages contenant ces termes
   dans une phrase. En cas de doute sur l'intention, **traiter comme une opposition**.
5. **`HUMAIN` retire la conversation du traitement automatisé** et déclenche une alerte vers
   l'équipe. Accepter aussi `HUMAN`, `PARLER`, `RAPPELEZ-MOI`, `APPEL`.
6. **Journaliser** la présence de la mention dans chaque premier message envoyé. Sans journal, il
   sera impossible de prouver que l'obligation a été respectée.
7. **Substitution des variables** : `{NOM_DU_CLIENT}`, `{FORME_JURIDIQUE}`, `{ADRESSE_DU_CLIENT}`,
   `{LIEN_DESINSCRIPTION}`. Un agent dont une variable n'est pas résolue **ne doit pas envoyer** :
   échouer en refus, jamais en message tronqué.

---

## 5. Points à trancher avant mise en production

- `[[À COMPLÉTER : mécanisme du lien de désinscription courriel — URL, jeton, page d'atterrissage]]`
- `[[À COMPLÉTER : délai de reprise humaine après « HUMAIN », en jours ouvrés, à annoncer sur /transparence-ia]]`
- `[[À COMPLÉTER : pour chaque client actif, forme juridique et adresse exactes du responsable de traitement]]`
- `[[À COMPLÉTER : validation par un avocat de la suffisance de la mention courte WhatsApp au regard de l'article 14]]`
