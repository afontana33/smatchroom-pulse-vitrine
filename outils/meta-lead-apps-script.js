/**
 * Apps Script de la feuille Google « Pulse Meta Prospect » (28/10/2026).
 * Toutes les 10 minutes : chaque nouveau prospect du formulaire de pub (vieux d'au moins 5 minutes,
 * le temps qu'il clique éventuellement sur WhatsApp) est envoyé à pulse.smatchroom.com/api/meta-lead.
 * L'agent ne lui écrit que s'il n'est pas déjà en conversation. Colonne « pulse_envoye » = suivi.
 * Installation : Extensions > Apps Script, coller ce code, remplacer TOKEN, enregistrer,
 * puis Déclencheurs > Ajouter : envoyerNouveaux, déclencheur horaire, toutes les 10 minutes.
 */
const URL_PULSE = 'https://pulse.smatchroom.com/api/meta-lead';
const TOKEN = 'COLLEZ_ICI_LE_JETON';

function envoyerNouveaux() {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  const v = sh.getDataRange().getValues();
  const h = v[0].map(String);
  let col = h.indexOf('pulse_envoye');
  if (col < 0) { col = h.length; sh.getRange(1, col + 1).setValue('pulse_envoye'); }
  const c = (debut) => h.findIndex((x) => x.indexOf(debut) === 0);
  const val = (r, debut) => (c(debut) >= 0 ? String(r[c(debut)] || '') : '');
  for (let i = 1; i < v.length; i++) {
    const r = v[i];
    if (r[col]) continue;
    const cree = new Date(val(r, 'created_time'));
    if (!isNaN(cree) && Date.now() - cree.getTime() < 5 * 60000) continue;
    const corps = {
      id: val(r, 'id'), nom: val(r, 'full_name'), telephone: val(r, 'phone_number').replace(/^p:/, ''),
      email: val(r, 'email'), secteur: val(r, 'votre_secteur'), taille: val(r, 'taille_de_votre'), prospection: val(r, 'qui_fait'),
    };
    const res = UrlFetchApp.fetch(URL_PULSE, {
      method: 'post', contentType: 'application/json', headers: { 'x-token': TOKEN },
      payload: JSON.stringify(corps), muteHttpExceptions: true,
    });
    let etat = String(res.getResponseCode());
    try { etat = JSON.parse(res.getContentText()).etat || etat; } catch (e) {}
    sh.getRange(i + 1, col + 1).setValue(etat + ' · ' + Utilities.formatDate(new Date(), 'Europe/Paris', 'dd/MM HH:mm'));
  }
}
