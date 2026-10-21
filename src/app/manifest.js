/**
 * Manifeste d'application web.
 *
 * Sert deux choses concrètes ici : l'icône retenue quand un visiteur ajoute le
 * site à son écran d'accueil, et la couleur de la barre du navigateur sur
 * Android. Le site n'est pas une application installable et ne prétend pas
 * l'être : `display` reste en `browser`, sans écran de démarrage ni barre
 * masquée, sinon on promet une application là où il n'y a qu'un site.
 *
 * Les libellés reprennent mot pour mot le titre et la description de
 * app/layout.js. Ne pas les réécrire ici : deux formulations concurrentes du
 * même site finissent par diverger.
 */

export default function manifest() {
  return {
    name: 'SmatchRoom Pulse · On va chercher vos clients à votre place',
    short_name: 'SmatchRoom Pulse',
    description:
      'Nous digitalisons et automatisons la recherche de clients, de l’artisan seul à la grande entreprise.',
    lang: 'fr',
    start_url: '/',
    display: 'browser',
    /* Fond blanc, comme les icônes : c'est la couleur sur laquelle le
       pictogramme a été aplati, donc aucun liseré au chargement.
       `theme_color` prend l'orange du site (--primary de globals.css) et non le
       violet du logo : c'est la teinte de l'interface, pas celle de la marque
       imprimée. */
    background_color: '#ffffff',
    theme_color: '#5b0bfc',
    icons: [
      {
        src: '/brand/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/brand/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
