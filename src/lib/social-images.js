/**
 * Les deux visuels de partage, déclarés une fois pour les deux langues.
 *
 * Ils étaient posés en `app/opengraph-image.jpg` et `app/twitter-image.jpg`,
 * c'est-à-dire par convention de fichier, ce qui laissait Next lire les
 * dimensions réelles et versionner l'URL. Cette convention ne survit pas au
 * passage à deux racines de layout :
 *
 *   - à la racine de `app/`, les fichiers restent servis mais ne sont plus
 *     rattachés aux pages : og:image et twitter:image disparaissent sans que
 *     le build ne le signale ;
 *   - posés dans `app/(fr)/`, ils fonctionnent mais Next préfixe l'URL d'un
 *     hachage (`/opengraph-image-35za9p.jpg`), donc l'adresse publique change ;
 *   - en poser une copie dans `app/(en)/` ferait échouer le build : deux
 *     fichiers de groupes différents revendiqueraient la même URL.
 *
 * Les visuels vivent donc dans `public/`, à l'adresse qu'ils avaient déjà en
 * production, et sont déclarés à la main ici. La contrepartie est que les
 * dimensions ne sont plus lues dans le fichier : elles sont mesurées ci-dessous
 * et doivent être corrigées si l'un des deux visuels est remplacé.
 *
 * ⚠ Une page qui déclare son propre bloc `openGraph` remplace en bloc celui du
 * layout, images comprises. Toute page qui en déclare un doit donc y remettre
 * `images: OG_IMAGES`, sinon elle se partage sans visuel. C'est déjà le cas de
 * plusieurs pages françaises (/prospection-b2b, /metiers/[slug]) depuis avant
 * ce changement.
 */

const OPENGRAPH = {
  url: '/opengraph-image.jpg',
  width: 1200,
  height: 630,
  type: 'image/jpeg',
  alt: 'SmatchRoom Pulse',
};

const TWITTER = {
  url: '/twitter-image.jpg',
  width: 1200,
  height: 630,
  type: 'image/jpeg',
  alt: 'SmatchRoom Pulse',
};

export const OG_IMAGES = [OPENGRAPH];
export const TWITTER_IMAGES = [TWITTER];
