/**
 * Les deux langues du site, et la correspondance entre leurs pages.
 *
 * Le français vit à la racine (`/`, `/prospection-b2b`, …) et l'anglais sous
 * `/en`. Le français n'a pas été déplacé sous `/fr` : ses URL sont indexées,
 * reçoivent du trafic payé et sont citées dans des devis. Un préfixe de langue
 * les aurait toutes fait passer en 301 pour un bénéfice nul.
 *
 * `PAIRS` est la seule source de vérité de l'appariement. Elle alimente trois
 * consommateurs : les balises hreflang des deux versions, le sélecteur de
 * langue de la barre de navigation, et le sitemap. Une page anglaise sans
 * équivalent français (ou l'inverse) n'a rien à faire ici : hreflang qui
 * pointe sur une page hors sujet est pire que pas de hreflang.
 *
 * Module sans dépendance et sans « use client » : lisible depuis un composant
 * serveur comme depuis le sélecteur de langue, qui est un composant client.
 */

import { SITE_URL } from '@/lib/contact';

export const LOCALES = ['fr', 'en'];

/* Codes hreflang. Le français est régionalisé (fr-FR) parce que l'offre, les
   prix et les mentions légales sont français. L'anglais ne l'est pas : il
   s'adresse à des entreprises anglophones sans pays cible, donc `en` et non
   `en-GB` ni `en-US`. */
export const HREFLANG = { fr: 'fr-FR', en: 'en' };

/* La version anglaise se limite à la landing. Le reste du site (référencement
   local, blog, pages légales) n'existe qu'en français : ajouter une paire ici
   sans la page anglaise correspondante ferait pointer un hreflang sur un 404,
   ce qui invalide le groupe de langues en entier. */
export const PAIRS = [{ fr: '/', en: '/en' }];

/** Le chemin apparié dans l'autre langue, ou null si la page n'existe qu'ici. */
export function counterpart(path, locale) {
  const other = locale === 'fr' ? 'en' : 'fr';
  const pair = PAIRS.find((p) => p[locale] === path);
  return pair ? pair[other] : null;
}

/**
 * Bloc `alternates` de la métadonnée Next, pour une page appariée.
 *
 * `x-default` pointe sur le français : c'est la version complète du site, et
 * c'est elle qui doit servir aux visiteurs dont la langue n'est ni le français
 * ni l'anglais. Une page non appariée ne reçoit qu'un canonical : déclarer un
 * hreflang vers une page qui n'existe pas la fait ignorer en bloc.
 */
export function alternatesFor(path, locale) {
  const pair = PAIRS.find((p) => p[locale] === path);
  if (!pair) return { canonical: path };
  return {
    canonical: path,
    languages: {
      [HREFLANG.fr]: pair.fr,
      [HREFLANG.en]: pair.en,
      'x-default': pair.fr,
    },
  };
}

/** URL absolue, pour les données structurées et le sitemap. */
export const absolute = (path) => `${SITE_URL}${path === '/' ? '' : path}`;
