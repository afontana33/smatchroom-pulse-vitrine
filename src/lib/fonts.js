/**
 * Les quatre familles du site, chargées une seule fois.
 *
 * Elles vivaient dans app/layout.js, qui était l'unique racine. Depuis
 * l'ouverture de la version anglaise il y a deux racines, une par langue
 * (src/app/(fr) et src/app/(en)), et `next/font` déduplique par module : les
 * déclarer ici garantit qu'un seul jeu de fichiers est téléchargé, quelle que
 * soit la langue de la page. Les redéclarer dans chaque layout ferait deux
 * préchargements concurrents des mêmes polices.
 */

import { Manrope, JetBrains_Mono, Bricolage_Grotesque, Instrument_Serif } from 'next/font/google';

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  display: 'swap',
});

const bricolage = Bricolage_Grotesque({
  variable: '--font-bricolage',
  subsets: ['latin'],
  display: 'swap',
});

const instrument = Instrument_Serif({
  variable: '--font-instrument',
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
});

/** À poser sur `<html>` : expose les quatre variables CSS lues par globals.css. */
export const fontVariables = [
  manrope.variable,
  jetbrains.variable,
  bricolage.variable,
  instrument.variable,
].join(' ');
