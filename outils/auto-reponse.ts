/**
 * Réponses automatiques WhatsApp Business (accueil, absence, horaires), demande du 28/10/2026.
 * Constat Aqua & Scape : « Bienvenue chez Mega Motors ! », « Merci d'avoir contacté La Villa Monceau ! »…
 * arrivent quelques secondes après notre message et faisaient passer le prospect à l'humain pour rien.
 * Ces messages sont journalisés mais ne déclenchent rien : l'agent attend la vraie réponse.
 */
const MOTIFS = [
  /merci (beaucoup )?(d['’]avoir|de nous avoir|pour votre) (contact|écrit|message|intérêt)/i,
  /merci pour l['’]intérêt que vous portez/i,
  /bienvenue (chez|à|au|dans)/i,
  /nous (vous )?(répondrons|reviendrons|recontacterons|rappellerons)/i,
  /(dans les|au) (plus )?(brefs? délais|vite|tôt)/i,
  /(nos|les) horaires|du lundi au (vendredi|samedi)|ouverts? du/i,
  /(actuellement|momentanément) (fermé|absent|indisponible)|en congés?|absent(e)? du bureau/i,
  /(message|réponse) automatique|ceci est un message/i,
  /notre équipe (est là|vous répondra|reviendra)/i,
  /permanence (téléphonique|24)/i,
];

/** secondes : délai depuis notre dernier message sortant (Infinity si inconnu). */
export function estReponseAuto(texte: string, secondes = Infinity): boolean {
  const t = String(texte ?? '').trim();
  if (t.length < 25) return false; // « Bonjour oui », « c'est moi » : toujours humain
  const motifs = MOTIFS.filter((m) => m.test(t)).length;
  if (motifs >= 2) return true;
  if (motifs === 1 && (secondes < 120 || t.length > 120)) return true;
  return secondes < 6 && t.length > 80; // un long texte arrivé en moins de 6 s n'a pas été tapé
}
