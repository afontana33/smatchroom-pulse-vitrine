import path from 'node:path';
import fs from 'node:fs';

const ENGINE_ROOT = process.cwd();

if (!fs.existsSync(path.join(ENGINE_ROOT, 'package.json'))) {
  throw new Error(`paths.ts: cwd=${ENGINE_ROOT} ne contient pas package.json — lancez le script depuis src/seo-engine/`);
}

export const ENGINE_DIR = ENGINE_ROOT;
export const SEEDS_DIR = path.join(ENGINE_ROOT, 'seeds');
export const DATA_DIR = path.join(ENGINE_ROOT, 'data');
export const DB_PATH = path.join(DATA_DIR, 'seo.db');
export const REPO_ROOT = path.resolve(ENGINE_ROOT, '..', '..');
export const CONTENT_DIR = path.join(REPO_ROOT, 'src', 'content');

export function ensureDataDir(): void {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
