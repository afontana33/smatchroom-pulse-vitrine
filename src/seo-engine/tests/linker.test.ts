import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import fs from 'node:fs';
import { initSchema, closeDb } from '../lib/db.js';
import { DB_PATH } from '../lib/paths.js';
import { injectInternalLinks } from '../stages/linker.js';

beforeEach(() => {
  closeDb();
  if (fs.existsSync(DB_PATH)) fs.unlinkSync(DB_PATH);
  initSchema();
});

afterAll(() => closeDb());

const FAQ_SUFFIX = `\n\n## FAQ\n\n### Q1 ?\n\nR1.\n\n### Q2 ?\n\nR2.`;

describe('injectInternalLinks', () => {
  it('inserts at least one /solutions/ link when content matches', () => {
    const md = `## Définition\n\nUn agent IA SDR automatise la prospection.\n\n## Conclusion\n\nTexte.${FAQ_SUFFIX}`;
    const { markdown, insertedLinks } = injectInternalLinks(md, 'agent-ia');
    expect(insertedLinks.some((l) => l.url.startsWith('/solutions/'))).toBe(true);
    expect(markdown).toMatch(/\]\(\/solutions\//);
  });

  it('inserts at least one home anchor link when context matches', () => {
    const md = `## Tarif\n\nNotre tarification SmatchRoom Pulse commence à 249€.${FAQ_SUFFIX}`;
    const { insertedLinks } = injectInternalLinks(md, 'agent-ia');
    expect(insertedLinks.some((l) => l.url.startsWith('/#'))).toBe(true);
  });

  it('caps at 3 links maximum', () => {
    const md = `Le tarif SmatchRoom Pulse et notre processus de déploiement et nos cas d'usage SmatchRoom Pulse couvrent un agent IA SDR ou un agent IA support sur-mesure.${FAQ_SUFFIX}`;
    const { insertedLinks } = injectInternalLinks(md, 'agent-ia');
    expect(insertedLinks.length).toBeLessThanOrEqual(3);
  });

  it('never inserts the same URL twice', () => {
    const md = `Un agent IA SDR. Encore un agent IA SDR. Et toujours un agent IA SDR.${FAQ_SUFFIX}`;
    const { insertedLinks } = injectInternalLinks(md, 'agent-ia');
    const urls = insertedLinks.map((l) => l.url);
    expect(new Set(urls).size).toBe(urls.length);
  });

  it('does not insert inside an existing markdown link', () => {
    const md = `Voir [notre agent IA SDR](/autre-url) en détail.${FAQ_SUFFIX}`;
    const { markdown } = injectInternalLinks(md, 'agent-ia');
    expect(markdown).toContain('[notre agent IA SDR](/autre-url)');
  });
});
