// Relations LinkedIn existantes d'Alexis (demande du 27/10/2026) : pas d'invitation à envoyer, le message part directement.
// Parcourt ses relations, garde les dirigeants de PME qui vendent aux entreprises, prépare un premier message
// et les passe en « accepte » : li-suivi.ts envoie le message, gère les réponses, la relance et les alertes.
//   npx tsx src/li-relations.ts [--max=20] [--dry-run]
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { config } from './config.js';
import { api } from './unipile';
const DRY = process.argv.includes('--dry-run');
const MAX = Number((process.argv.find((a) => a.startsWith('--max=')) ?? '--max=20').slice(6));
const SB = process.env.SUPABASE_URL ?? '', SK = process.env.SUPABASE_SERVICE_KEY ?? '';
const H = { apikey: SK, Authorization: `Bearer ${SK}`, 'content-type': 'application/json' };
const pause = (ms: number) => new Promise((r) => setTimeout(r, ms));
const VUES = 'data/li-relations-vues.json'; // relations déjà examinées (gardées ou non), pour ne jamais les revoir
const conf = JSON.parse(readFileSync('signaux/pulse.json', 'utf8'));
const INCLURE = new RegExp(conf.inclure.join('|'), 'i');
const EXCLURE = new RegExp(conf.exclure.join('|'), 'i');

async function claude(prompt: string): Promise<any> {
  const r = await fetch('https://api.anthropic.com/v1/messages', { method: 'POST', headers: { 'x-api-key': config.anthropic.apiKey, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
    body: JSON.stringify({ model: config.anthropic.model, max_tokens: 2500, messages: [{ role: 'user', content: prompt }] }) });
  const t = String(((await r.json()) as any).content?.[0]?.text ?? '');
  const m = t.match(/\[[\s\S]*\]/);
  if (m == null) throw new Error('réponse IA illisible : ' + t.slice(0, 150));
  return JSON.parse(m[0]);
}
const PROMPT = (gens: any[]) => `Voici des relations LinkedIn d'Alexis, qui vend aux PME françaises un agent de prospection : il repère les entreprises qui ressemblent à leurs clients et écrit à leurs décideurs.
Pour chacune, dis si c'est une bonne cible : dirigeant (ou directeur commercial) d'une PME française qui vend à d'autres entreprises (B2B).
NE SONT PAS des cibles : salariés sans pouvoir de décision, indépendants seuls, consultants, coachs, formateurs, agences de prospection, marketing ou communication (concurrents), recruteurs, artisans du bâtiment, commerces de détail et restaurants (clientèle de particuliers), grands groupes, secteur public, associations, étudiants, personnes hors de France.
${gens.map((g, i) => `${i + 1}. ${g.nom} | ${g.titre}`).join('\n')}
Réponds uniquement par un tableau JSON, un objet par ligne gardée (ignore les autres) : [{"n": numéro, "prenom": "prénom, casse normale", "entreprise": "nom de son entreprise tel qu'écrit dans son titre, ou null"}]`;

const message = (p: string, ent: string | null) =>
  `Bonjour ${p},\n\nOn est en relation ici depuis un moment sans jamais avoir échangé. ${ent ? `Je vois que vous êtes à la tête de ${ent}. ` : ''}Petite question : aujourd'hui, vos nouveaux clients viennent plutôt du bouche-à-oreille, ou vous allez les chercher vous-même ?\n\nAlexis`;

async function dejaEnBase(pid: string, url: string) {
  const r = await fetch(`${SB}/rest/v1/chasseur_signaux?select=id&client_slug=eq.pulse&or=(li_provider_id.eq.${encodeURIComponent(pid)},linkedin_url.eq.${encodeURIComponent(url)})&limit=1`, { headers: H });
  const j: any = await r.json().catch(() => []);
  return Array.isArray(j) && j.length > 0;
}

(async () => {
  if (existsSync('data') === false) mkdirSync('data');
  const vues = new Set<string>(existsSync(VUES) ? JSON.parse(readFileSync(VUES, 'utf8')) : []);
  // 1. Relations pas encore examinées qui passent le filtre des titres
  const candidats: any[] = [];
  let cursor: string | undefined, pages = 0, total = 0;
  do {
    const j = await api(`/users/relations?limit=100${cursor ? `&cursor=${encodeURIComponent(cursor)}` : ''}`);
    for (const x of j.items ?? []) {
      total++;
      const id = String(x.member_id ?? '');
      if (id === '' || vues.has(id) || (x.public_identifier ?? '') === '') continue;
      const titre = String(x.headline ?? '');
      if (INCLURE.test(titre) === false || EXCLURE.test(titre)) { vues.add(id); continue; }
      candidats.push({ id, nom: `${x.first_name ?? ''} ${x.last_name ?? ''}`.trim(), titre, url: String(x.public_profile_url ?? (x.public_identifier ? `https://www.linkedin.com/in/${x.public_identifier}` : '')) });
    }
    cursor = j.cursor ?? undefined; pages++;
    await pause(1500);
  } while (cursor && pages < 30 && candidats.length < MAX * 4);
  console.log(`[relations] ${total} relations parcourues, ${candidats.length} dirigeants à examiner`);

  // 2. Tri par l'IA, par paquets de 25, jusqu'à MAX retenus
  let gardes = 0;
  for (let i = 0; i < candidats.length && gardes < MAX; i += 25) {
    const lot = candidats.slice(i, i + 25);
    let ok: any[] = [];
    try { ok = await claude(PROMPT(lot)); } catch (e) { console.log(`[relations] tri : ${(e as Error).message}`); continue; }
    const retenus = new Map(ok.map((o: any) => [Number(o.n) - 1, o]));
    for (const [k, g] of lot.entries()) {
      vues.add(g.id);
      const o: any = retenus.get(k);
      if (o == null || gardes >= MAX) continue;
      if (await dejaEnBase(g.id, g.url)) continue;
      const msg = message(o.prenom || g.nom.split(' ')[0], o.entreprise);
      console.log(`  + ${g.nom} | ${g.titre.slice(0, 70)}`);
      gardes++;
      if (DRY) continue;
      const row = { client_slug: 'pulse', linkedin_url: g.url, li_provider_id: g.id, nom: g.nom, poste: g.titre, entreprise: o.entreprise ?? '',
        signal_type: 'relation', signal_texte: 'Relation LinkedIn existante', statut: 'li_relation', raison: 'relation existante, dirigeant de PME B2B',
        li_etape: 'accepte', li_accepte_at: new Date().toISOString(), li_message: msg, li_confiance: 0.7 };
      const r = await fetch(`${SB}/rest/v1/chasseur_signaux`, { method: 'POST', headers: { ...H, Prefer: 'return=minimal' }, body: JSON.stringify(row) });
      if (r.ok === false) console.log(`    erreur base ${r.status} ${await r.text()}`);
    }
  }
  if (DRY === false) writeFileSync(VUES, JSON.stringify([...vues]));
  console.log(`[relations] ${gardes} relations prêtes à recevoir un message${DRY ? ' (test, rien écrit)' : ''}`);
})().catch((e) => console.log('ERREUR', e.message));
