// Visibilité LinkedIn d'Alexis (demande du 27/10/2026) : commente des posts récents de dirigeants de PME B2B.
// Cherche les posts du jour sur des sujets de dirigeants, garde les auteurs qui passent le filtre des titres
// (signaux/pulse.json), et laisse un vrai commentaire sur le fond. Jamais de pitch, jamais de lien.
//   npx tsx src/li-commentaires.ts [--dry-run] [--max=2] [--theme=ia]
// --theme=ia (28/10/2026) : posts sur la prospection automatisée, les agents IA commerciaux, le cold email, quel que soit
// l'auteur. Le commentaire apporte l'angle SmatchRoom Pulse : plusieurs canaux (WhatsApp surtout) et le bon moment (signaux).
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { config } from './config.js';
import { api, recupererUnipile } from './unipile';
const DRY = process.argv.includes('--dry-run');
const MAX = Number((process.argv.find((a) => a.startsWith('--max=')) ?? '--max=2').slice(6));
const fic = (() => { try { return readFileSync('/root/unipile.env', 'utf8'); } catch { return ''; } })();
const ACCOUNT_ID = process.env.UNIPILE_ACCOUNT_ID ?? (fic.split('\n').find((l) => l.startsWith('UNIPILE_ACCOUNT_ID=')) ?? '').slice(19).trim();
const VUS = 'data/li-commentaires-vus.json';
const THEME_IA = process.argv.includes('--theme=ia');
const SUJETS_IA = ['agent IA prospection', 'automatiser la prospection', 'cold email', 'prospection automatisée', 'agent IA commercial',
  'génération de leads', 'séquence de prospection', 'signaux d\'achat', 'outbound B2B', 'prise de rendez-vous automatisée'];
// Aucun tiret de ponctuation (demande d'Alexis) : « a - b », « a – b », « a — b » deviennent « a, b ».
const sansTirets = (t: string) => t.replace(/\s+[-–—]\s+/g, ', ').replace(/[–—]/g, ', ').replace(/,\s*,/g, ',').trim();
const pause = (ms: number) => new Promise((r) => setTimeout(r, ms));
const conf = JSON.parse(readFileSync('signaux/pulse.json', 'utf8'));
const INCLURE = new RegExp(conf.inclure.join('|'), 'i');
const EXCLURE = new RegExp(conf.exclure.join('|'), 'i');
const SUJETS = ['prospection commerciale', 'trouver des clients', 'développement commercial', 'chef d\'entreprise', 'dirigeant PME',
  'recrutement commercial', 'croissance PME', 'bouche-à-oreille clients', 'prescripteurs', 'entrepreneuriat'];

async function claude(prompt: string): Promise<string> {
  const r = await fetch('https://api.anthropic.com/v1/messages', { method: 'POST', headers: { 'x-api-key': config.anthropic.apiKey, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
    body: JSON.stringify({ model: config.anthropic.model, max_tokens: 400, messages: [{ role: 'user', content: prompt }] }) });
  return String(((await r.json()) as any).content?.[0]?.text ?? '').trim();
}
const PROMPT = (auteur: string, titre: string, post: string) => `Tu es Alexis Fontana, fondateur de SmatchRoom Pulse à Bordeaux : tu aides les artisans et les PME à trouver des clients en démarchant pour eux, sur WhatsApp et par email, les entreprises et prescripteurs de leur zone. Tu as été restaurateur puis commercial dans le BTP.
Voici un post LinkedIn de ${auteur} (${titre}). Écris un commentaire qui apporte quelque chose : un avis précis ou une question pertinente sur le fond du post. N'invente JAMAIS de chiffre, de pourcentage, de nombre d'années d'expérience, de clients ni d'anecdote : tu ne cites que des faits présents dans le post. Orthographe et grammaire impeccables.
Règles : en français, 2 phrases maximum et 280 caractères maximum, ton direct et naturel comme un dirigeant qui écrit vite depuis son téléphone, vouvoiement si tu t'adresses à l'auteur. Une seule idée, ou une seule question. Ne parle pas de ton parcours (restauration, BTP) sauf si le post porte exactement là-dessus. Interdit : « Super post », « Merci pour ce partage », « Vous pointez », « J'aime bien », flatterie, tirets (— – -) utilisés comme ponctuation, parler de SmatchRoom ou de tes services, des artisans si le post n'en parle pas, lien, hashtag, prix, mention d'intelligence artificielle.
Si l'auteur ou le sujet du post ne concerne pas la France (Québec, Afrique, Belgique… ), réponds exactement : RIEN
Si le post n'a rien à voir avec l'entreprise, le commerce ou l'entrepreneuriat, ou s'il porte sur un drame personnel, un décès, la politique ou une offre d'emploi, réponds exactement : RIEN
Post : """${post.slice(0, 2000)}"""
Ton commentaire (le texte seul) :`;
const PROMPT_IA = (auteur: string, titre: string, post: string) => `Tu es Alexis Fontana, fondateur de SmatchRoom Pulse à Bordeaux. Ta conviction, tirée de ton terrain : une prospection qui marche, c'est le bon canal et le bon moment. Le bon canal : pour les patrons de TPE et d'artisans, l'email est souvent le moins lu, WhatsApp fait répondre bien davantage, LinkedIn complète. Le bon moment : écrire quand un signal le justifie (l'entreprise recrute un commercial, vient d'être créée, change de dirigeant), plutôt qu'à froid sur une liste.
Voici un post LinkedIn de ${auteur} (${titre}) sur la prospection ou l'automatisation commerciale. Écris un commentaire qui reconnaît en quelques mots UN point précis et juste du post, puis apporte ton angle (canal ou moment, celui qui manque le plus au post) comme un constat de terrain ou une question ouverte à l'auteur.
Règles : en français, 2 ou 3 phrases courtes, 300 caractères maximum, vouvoiement, ton direct de dirigeant, sans agressivité ni moquerie envers l'auteur. Aucun chiffre, aucun pourcentage, aucune anecdote inventée. Ne nomme pas SmatchRoom, pas de lien, pas de prix, pas de hashtag, pas d'emoji, aucun tiret (— – -) comme ponctuation. Interdit : « Super post », « Merci pour ce partage », « Vous pointez », « Vous visez juste », « la vraie question », « selon nous », flatterie.
Si le post est une offre d'emploi, une annonce de recrutement ou une publicité pour un produit, réponds exactement : RIEN
Si l'auteur ou le sujet ne concerne pas la France, ou si le post ne parle pas vraiment de prospection, de vente ou d'automatisation commerciale, réponds exactement : RIEN
Post : """${post.slice(0, 2000)}"""
Ton commentaire (le texte seul) :`;

(async () => {
  if (existsSync('data') === false) mkdirSync('data');
  const vus = new Set<string>(existsSync(VUS) ? JSON.parse(readFileSync(VUS, 'utf8')) : []);
  const sujets = [...(THEME_IA ? SUJETS_IA : SUJETS)].sort(() => Math.random() - 0.5).slice(0, 3);
  const items = await recupererUnipile({ queries: sujets, postedLimit: '24h', maxComments: 0 });
  const posts = items.sort(() => Math.random() - 0.5).filter((i: any) => i.type === 'post' && i.id && vus.has(String(i.id)) === false
    && i.author?.linkedinUrl && (THEME_IA || (INCLURE.test(i.author.position ?? '') && EXCLURE.test(i.author.position ?? '') === false))
    && String(i.content ?? '').length > 200
    && (THEME_IA === false || /(job ?alert|nous recrutons|nous recherchons|on recrute|offre d'emploi|\bcdi\b|postulez)/i.test(String(i.content ?? '')) === false));
  console.log(`[commentaires] ${items.length} résultats, ${posts.length} posts de dirigeants`);
  let faits = 0;
  for (const p of posts) {
    if (faits >= MAX) break;
    vus.add(String(p.id));
    const t = sansTirets(await claude((THEME_IA ? PROMPT_IA : PROMPT)(p.author.name, p.author.position, String(p.content))));
    if (t === '' || t.startsWith('RIEN') || t.length > (THEME_IA ? 340 : 320) || /\d+ ?(%|ans)/.test(t)) continue;
    console.log(`  > ${p.author.name} | ${String(p.author.position).slice(0, 60)}\n    post : ${String(p.content).slice(0, 100).replace(/\n/g, ' ')}…\n    commentaire : ${t}`);
    faits++;
    if (DRY) continue;
    const envoi: any = await api(`/posts/${encodeURIComponent(p.id)}/comments`, { method: 'POST', body: JSON.stringify({ account_id: ACCOUNT_ID, text: t }) });
    // Suivi (28/10/2026) : li-prospects.ts invite l'auteur le lendemain et surveille les réponses à ce commentaire.
    const COMMENTES = 'data/li-commentes.json';
    const liste: any[] = existsSync(COMMENTES) ? JSON.parse(readFileSync(COMMENTES, 'utf8')) : [];
    liste.push({ post_id: String(p.id), post_url: p.url ?? p.linkedinUrl ?? null, comment_id: envoi?.comment_id ?? envoi?.id ?? null,
      auteur: p.author.name, poste: p.author.position, url: p.author.linkedinUrl, extrait: String(p.content).slice(0, 300),
      commentaire: t, date: new Date().toISOString(), invite: false });
    writeFileSync(COMMENTES, JSON.stringify(liste.slice(-500)));
    await pause(60000 + Math.random() * 120000);
  }
  if (DRY === false) writeFileSync(VUS, JSON.stringify([...vus]));
  console.log(`[commentaires] ${faits} commentaire(s)${DRY ? ' (test, rien publié)' : ''}`);
})().catch((e) => console.log('ERREUR', e.message));
