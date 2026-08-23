/**
 * Synchronise les assets Tarteaucitron depuis node_modules vers public/.
 *
 * Tarteaucitron est auto-hébergé : aucun CDN tiers n'est appelé, donc aucun
 * transfert de données vers un éditeur de CMP. Contrepartie : les assets
 * doivent être recopiés à chaque montée de version du paquet.
 *
 *   npm run sync:tarteaucitron
 *
 * Le catalogue officiel `tarteaucitron.services.min.js` pèse ~196 Ko et décrit
 * plusieurs centaines de services dont deux nous concernent. On en extrait les
 * blocs `facebookpixel` et `googleads` verbatim plutôt que de servir le fichier
 * entier sur chaque page. Toute nouvelle intégration (Google Analytics,
 * YouTube, Calendly embarqué…) doit être ajoutée à SERVICES ci-dessous, sinon
 * le service restera introuvable pour le CMP.
 */

import { mkdirSync, copyFileSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'node_modules', 'tarteaucitronjs');
const DEST = join(ROOT, 'public', 'tarteaucitron');

/** Services du catalogue officiel à embarquer. */
const SERVICES = ['facebookpixel', 'googleads'];

const FILES = [
  ['tarteaucitron.min.js', 'tarteaucitron.min.js'],
  [join('lang', 'tarteaucitron.fr.min.js'), join('lang', 'tarteaucitron.fr.min.js')],
  [join('css', 'tarteaucitron.min.css'), join('css', 'tarteaucitron.min.css')],
];

/** Extrait `tarteaucitron.services.<key> = { … };` par comptage d'accolades. */
function extractService(source, key) {
  // Le catalogue minifié supprime les espaces autour du `=`, la version source non.
  const marker = new RegExp(`tarteaucitron\\.services\\.${key}\\s*=\\s*\\{`);
  const found = marker.exec(source);
  if (!found) throw new Error(`Service "${key}" introuvable dans le catalogue Tarteaucitron.`);
  const start = found.index;

  let depth = 0;
  for (let i = start + found[0].length - 1; i < source.length; i += 1) {
    const c = source[i];
    if (c === '{') depth += 1;
    else if (c === '}') {
      depth -= 1;
      if (depth === 0) return source.slice(start, i + 1) + ';';
    }
  }
  throw new Error(`Bloc du service "${key}" non refermé.`);
}

mkdirSync(join(DEST, 'lang'), { recursive: true });
mkdirSync(join(DEST, 'css'), { recursive: true });

for (const [from, to] of FILES) {
  copyFileSync(join(SRC, from), join(DEST, to));
  console.log(`copié  ${to}`);
}

const { version } = JSON.parse(readFileSync(join(SRC, 'package.json'), 'utf8'));
const catalogue = readFileSync(join(SRC, 'tarteaucitron.services.min.js'), 'utf8');

const trimmed = [
  `/* Extrait de tarteaucitronjs@${version} — services : ${SERVICES.join(', ')}.`,
  ` * Généré par scripts/sync-tarteaucitron.mjs. Ne pas éditer à la main. */`,
  ...SERVICES.map((key) => extractService(catalogue, key)),
  '',
].join('\n');

writeFileSync(join(DEST, 'tarteaucitron.services.min.js'), trimmed);
console.log(`généré tarteaucitron.services.min.js (${SERVICES.length} service(s), ${trimmed.length} octets)`);
