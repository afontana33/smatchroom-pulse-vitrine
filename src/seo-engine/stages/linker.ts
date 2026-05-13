import fs from 'node:fs';
import path from 'node:path';
import { listRecentArticles } from '../lib/db.js';
import { logger } from '../lib/logger.js';
import { SEEDS_DIR } from '../lib/paths.js';
import type { Cluster, LinkBankEntry } from '../lib/types.js';

const LINK_BANK_PATH = path.join(SEEDS_DIR, 'link-bank.json');

export interface LinkInjectionResult {
  markdown: string;
  insertedLinks: { anchor: string; url: string }[];
}

const HOME_ANCHOR_URLS = ['/#pricing', '/#process', '/#use-cases', '/#faq'];

export function injectInternalLinks(markdown: string, cluster: Cluster): LinkInjectionResult {
  const bank: LinkBankEntry[] = JSON.parse(fs.readFileSync(LINK_BANK_PATH, 'utf8'));
  const sorted = [...bank].sort((a, b) => b.priority - a.priority);

  const { body, faqStart } = splitBodyFromFaq(markdown);
  const inserted: { anchor: string; url: string }[] = [];
  let working = body;

  const isHomeAnchor = (url: string) => HOME_ANCHOR_URLS.some((u) => url.startsWith(u));
  const isSolution = (url: string) => url.startsWith('/solutions/');

  const tryInsert = (entry: LinkBankEntry): boolean => {
    if (inserted.length >= 3) return false;
    if (inserted.some((i) => i.url === entry.url)) return false;

    const re = new RegExp(`\\b${escapeRegex(entry.anchor)}\\b`, 'i');
    const safeMatch = findFirstSafeMatch(working, re);
    if (!safeMatch) return false;

    working = working.slice(0, safeMatch.index)
      + `[${working.slice(safeMatch.index, safeMatch.index + safeMatch.length)}](${entry.url})`
      + working.slice(safeMatch.index + safeMatch.length);
    inserted.push({ anchor: entry.anchor, url: entry.url });
    return true;
  };

  for (const e of sorted) {
    if (isHomeAnchor(e.url)) { if (tryInsert(e)) break; }
  }
  for (const e of sorted) {
    if (isSolution(e.url)) { if (tryInsert(e)) break; }
  }
  for (const e of sorted) {
    if (inserted.length >= 3) break;
    tryInsert(e);
  }

  if (inserted.filter((i) => isHomeAnchor(i.url)).length === 0) {
    logger.warn({ cluster }, 'no home anchor link could be inserted');
  }
  if (inserted.filter((i) => isSolution(i.url)).length === 0) {
    logger.warn({ cluster }, 'no /solutions/ link could be inserted');
  }

  const cross = appendCrossLinks(faqStart, cluster);
  return {
    markdown: working + (cross ?? ''),
    insertedLinks: inserted,
  };
}

function splitBodyFromFaq(md: string): { body: string; faqStart: string } {
  const faqIdx = md.search(/\n##\s+(?:FAQ|Questions[^\n]*)/i);
  if (faqIdx === -1) return { body: md, faqStart: '' };
  return { body: md.slice(0, faqIdx), faqStart: md.slice(faqIdx) };
}

function findFirstSafeMatch(text: string, re: RegExp): { index: number; length: number } | null {
  const m = re.exec(text);
  if (!m) return null;
  const before = text.slice(Math.max(0, m.index - 200), m.index);
  if (/\[[^\]]*$/.test(before)) return null;
  return { index: m.index, length: m[0].length };
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function appendCrossLinks(faqBlock: string, cluster: Cluster): string | null {
  // cluster cross-link only works for 'agent-ia' and 'blog' (DB cluster constraint)
  if (cluster !== 'agent-ia' && cluster !== 'blog') return faqBlock || null;
  const recents = listRecentArticles(cluster, 3);
  if (recents.length === 0) return faqBlock || null;
  const block = `\n\n## À lire aussi\n\n${recents
    .map((r) => `- [${r.title}](/${cluster}/${r.slug})`)
    .join('\n')}\n${faqBlock ?? ''}`;
  return block;
}
