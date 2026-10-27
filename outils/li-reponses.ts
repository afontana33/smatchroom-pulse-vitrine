// Réponses aux commentaires sur les posts LinkedIn d'Alexis (demande du 27/10/2026).
// Toutes les 30 min en journée : lit ses posts des 21 derniers jours, répond une fois à chaque nouveau commentaire,
// au nom d'Alexis, en vouvoyant. Ne répond ni à lui-même, ni aux commentaires vides ou de pur spam.
//   npx tsx src/li-reponses.ts [--dry-run] [--max=10]
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { config } from './config.js';
import { api } from './unipile';
const DRY = process.argv.includes('--dry-run');
const MAX = Number((process.argv.find((a) => a.startsWith('--max=')) ?? '--max=10').slice(6));
const fic = (() => { try { return readFileSync('/root/unipile.env', 'utf8'); } catch { return ''; } })();
const ACCOUNT_ID = process.env.UNIPILE_ACCOUNT_ID ?? (fic.split('\n').find((l) => l.startsWith('UNIPILE_ACCOUNT_ID=')) ?? '').slice(19).trim();
const VUS = 'data/li-reponses-vues.json';
// Aucun tiret de ponctuation (demande d'Alexis) : « a - b », « a – b », « a — b » deviennent « a, b ».
const sansTirets = (t: string) => t.replace(/\s+[-–—]\s+/g, ', ').replace(/[–—]/g, ', ').replace(/,\s*,/g, ',').trim();
const pause = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function claude(prompt: string): Promise<string> {
  const r = await fetch('https://api.anthropic.com/v1/messages', { method: 'POST', headers: { 'x-api-key': config.anthropic.apiKey, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
    body: JSON.stringify({ model: config.anthropic.model, max_tokens: 400, messages: [{ role: 'user', content: prompt }] }) });
  return String(((await r.json()) as any).content?.[0]?.text ?? '').trim();
}
const PROMPT = (post: string, auteur: string, com: string) => `Tu es Alexis Fontana, fondateur de SmatchRoom Pulse (Bordeaux) : on trouve des clients aux artisans et aux PME en démarchant pour eux, sur WhatsApp et par email, les entreprises et prescripteurs de leur zone.
Quelqu'un a commenté ton post LinkedIn. Écris ta réponse à ce commentaire.
Règles : en français, vouvoiement, 1 à 3 phrases, ton direct et chaleureux, sans jargon. Commence par son prénom si tu le connais. Réponds vraiment à ce qu'il dit (remercie seulement si c'est naturel), et quand c'est possible relance l'échange par une question ouverte. Pas de lien, pas de prix, pas d'emoji en excès (un au maximum), jamais de mention d'intelligence artificielle ni de réponse automatique, pas de signature, aucun tiret (— – -) utilisé comme ponctuation.
Si le commentaire est vide de sens, un simple emoji ou du spam, réponds exactement : RIEN
Ton post : """${post.slice(0, 1500)}"""
Auteur du commentaire : ${auteur}
Commentaire : """${com}"""
Ta réponse (le texte seul) :`;

(async () => {
  if (existsSync('data') === false) mkdirSync('data');
  const vus = new Set<string>(existsSync(VUS) ? JSON.parse(readFileSync(VUS, 'utf8')) : []);
  const moi: any = await api('/users/me');
  const monId = String(moi.provider_id ?? '');
  const j: any = await api(`/users/${encodeURIComponent(monId)}/posts?limit=10`);
  const limite = Date.now() - 21 * 86400e3;
  let faits = 0;
  for (const p of j.items ?? []) {
    if (faits >= MAX) break;
    const d = Date.parse(p.parsed_datetime ?? p.date ?? '') || Date.now();
    if (d < limite || (p.comment_counter ?? 0) === 0) continue;
    await pause(1500);
    const c: any = await api(`/posts/${encodeURIComponent(p.social_id)}/comments?limit=100`);
    for (const com of c.items ?? []) {
      if (faits >= MAX) break;
      const id = String(com.id ?? '');
      const auteurId = String(com.author_details?.id ?? '');
      if (id === '' || vus.has(id)) continue;
      if (auteurId === monId || String(com.author ?? '').includes(String(moi.last_name ?? '§'))) { vus.add(id); continue; }
      const texte = String(com.text ?? '').trim();
      const rep = sansTirets(texte.length < 3 ? 'RIEN' : await claude(PROMPT(String(p.text ?? ''), String(com.author ?? ''), texte)));
      vus.add(id);
      if (rep === '' || rep.startsWith('RIEN')) { console.log(`  - ignoré : ${com.author} « ${texte.slice(0, 60)} »`); continue; }
      console.log(`  > ${com.author} : « ${texte.slice(0, 80)} »\n    réponse : ${rep}`);
      faits++;
      if (DRY) continue;
      await api(`/posts/${encodeURIComponent(p.social_id)}/comments`, { method: 'POST', body: JSON.stringify({ account_id: ACCOUNT_ID, text: rep, comment_id: id }) });
      await pause(20000 + Math.random() * 40000);
    }
  }
  if (DRY === false) writeFileSync(VUS, JSON.stringify([...vus]));
  console.log(`[reponses] ${faits} réponse(s)${DRY ? ' (test, rien publié)' : ''}`);
})().catch((e) => console.log('ERREUR', e.message));
