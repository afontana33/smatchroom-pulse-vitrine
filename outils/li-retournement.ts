// Retournement des démarches entrantes sur LinkedIn (demande du 28/10/2026).
// Quelqu'un écrit à Alexis pour lui vendre quelque chose : il vend lui-même à des entreprises et cherche des clients,
// c'est donc un prospect. L'agent lui répond une fois, poliment, décline son offre et retourne la question.
// Les agences de prospection (concurrents) reçoivent une proposition de partenariat à la place.
// La conversation part ensuite dans chasseur_signaux (li_etape 'message_envoye') : li-suivi.ts gère réponses, relance, alerte.
//   npx tsx src/li-retournement.ts [--dry-run] [--max=4]
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { config } from './config.js';
import { api, apiForm } from './unipile';
const DRY = process.argv.includes('--dry-run');
const MAX = Number((process.argv.find((a) => a.startsWith('--max=')) ?? '--max=4').slice(6));
const SB = process.env.SUPABASE_URL ?? '', SK = process.env.SUPABASE_SERVICE_KEY ?? '';
const H = { apikey: SK, Authorization: `Bearer ${SK}`, 'content-type': 'application/json' };
const VUS = 'data/li-retournement-vus.json';
const pause = (ms: number) => new Promise((r) => setTimeout(r, ms));
const sansTirets = (t: string) => t.replace(/\s+[-–—]\s+/g, ', ').replace(/[–—]/g, ', ').replace(/,\s*,/g, ',').trim();
const lire = (f: string, d: any) => { try { return JSON.parse(readFileSync(f, 'utf8')); } catch { return d; } };

async function claude(prompt: string): Promise<string> {
  const r = await fetch('https://api.anthropic.com/v1/messages', { method: 'POST', headers: { 'x-api-key': config.anthropic.apiKey, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
    body: JSON.stringify({ model: config.anthropic.model, max_tokens: 500, messages: [{ role: 'user', content: prompt }] }) });
  return String(((await r.json()) as any).content?.[0]?.text ?? '').trim();
}

const PROMPT = (nom: string, titre: string, fil: string) => `Tu es Alexis Fontana, fondateur de SmatchRoom Pulse (Bordeaux) : tu trouves des clients aux PME et aux artisans en écrivant pour eux à leurs prospects, sur WhatsApp, LinkedIn et par email.
${nom} (${titre}) t'a écrit sur LinkedIn. Voici la conversation, du plus ancien au plus récent :
"""${fil.slice(0, 2500)}"""
1. Classe ce message :
 DEMARCHAGE : il te propose un produit ou un service (logiciel, formation, prestation, financement, recrutement de commerciaux, sous-traitance, etc.) ;
 CONCURRENT : il vend de la prospection, de la génération de leads, du marketing, de la communication, du web ou du growth ;
 AUTRE : vraie question, ami, client, candidature, offre d'emploi, arnaque, crypto, message déjà en cours d'échange avec toi, personne hors de France.
2. Si DEMARCHAGE : écris la réponse d'Alexis. On le laisse d'abord parler de lui, sans rien vendre : remercie en quelques mots, décline son offre en une demi phrase (pas le besoin en ce moment), puis pose UNE question sincère sur son activité, idéalement sur la façon dont il trouve ses propres clients. Ne présente PAS ce que fait Alexis dans ce message.
   Si CONCURRENT : remercie, dis en une phrase que c'est aussi ton métier, sur le canal WhatsApp, et demande avec curiosité avec quels clients il travaille et sur quels canaux : l'idée est d'explorer un partenariat, sans le proposer frontalement.
Règles : en français courant, 2 ou 3 phrases courtes, 280 caractères au maximum, ton direct et chaleureux. Tutoie s'il t'a tutoyé, sinon vouvoie. Commence par son prénom. Pas de point d'exclamation, aucun anglicisme (leads, pipe, inbound…), aucun tiret (— – -) comme ponctuation, pas de lien, pas de prix, aucune mention d'intelligence artificielle ni de réponse automatique, pas de signature.
Réponds UNIQUEMENT en JSON : {"classe": "DEMARCHAGE" | "CONCURRENT" | "AUTRE", "prenom": "...", "entreprise": "... ou null", "reponse": "... ou null"}`;

async function dejaEnBase(pid: string) {
  const r = await fetch(`${SB}/rest/v1/chasseur_signaux?select=id&client_slug=eq.pulse&li_provider_id=eq.${encodeURIComponent(pid)}&limit=1`, { headers: H });
  const j: any = await r.json().catch(() => []);
  return Array.isArray(j) && j.length > 0;
}

(async () => {
  if (existsSync('data') === false) mkdirSync('data');
  const vus = new Set<string>(lire(VUS, []));
  const j: any = await api('/chats?account_type=LINKEDIN&limit=40');
  let faits = 0;
  for (const chat of j.items ?? []) {
    if (faits >= MAX) break;
    const cid = String(chat.id ?? ''), pid = String(chat.attendee_provider_id ?? '');
    if (cid === '' || pid === '' || vus.has(cid)) continue;
    if (Date.now() - (Date.parse(chat.timestamp ?? '') || 0) > 7 * 86400e3) continue; // conversations de la semaine
    await pause(1200);
    const m: any = await api(`/chats/${encodeURIComponent(cid)}/messages?limit=15`).catch(() => ({}));
    const msgs: any[] = (m.items ?? []).slice().reverse(); // du plus ancien au plus récent
    if (msgs.length === 0) continue;
    // Uniquement les démarches qu'Alexis n'a pas initiées et auxquelles il n'a jamais répondu.
    if (msgs[0].is_sender || msgs.some((x) => x.is_sender)) { vus.add(cid); continue; }
    if (await dejaEnBase(pid)) { vus.add(cid); continue; }
    const u: any = await api(`/users/${encodeURIComponent(pid)}`).catch(() => ({}));
    const nom = `${u.first_name ?? ''} ${u.last_name ?? ''}`.trim() || String(chat.name ?? '');
    const titre = String(u.headline ?? '');
    if (u.location && /france/i.test(String(u.location)) === false && /(paris|lyon|bordeaux|marseille|toulouse|lille|nantes)/i.test(String(u.location)) === false) { vus.add(cid); continue; }
    const fil = msgs.map((x) => String(x.text ?? '')).filter(Boolean).join('\n---\n');
    let d: any = {};
    try { d = JSON.parse((await claude(PROMPT(nom, titre, fil))).match(/\{[\s\S]*\}/)?.[0] ?? '{}'); } catch { continue; }
    vus.add(cid);
    if (d.classe !== 'DEMARCHAGE' && d.classe !== 'CONCURRENT') { console.log(`  - laissé à Alexis (${d.classe ?? '?'}) : ${nom} | ${titre.slice(0, 50)}`); continue; }
    const rep = sansTirets(String(d.reponse ?? ''));
    if (rep.length < 20 || rep.length > 330) continue;
    console.log(`  > ${d.classe} : ${nom} | ${titre.slice(0, 60)}\n    son message : ${fil.slice(0, 120).replace(/\n/g, ' ')}…\n    réponse : ${rep}`);
    faits++;
    if (DRY) continue;
    await apiForm(`/chats/${encodeURIComponent(cid)}/messages`, { text: rep });
    const url = u.public_identifier ? `https://www.linkedin.com/in/${u.public_identifier}` : '';
    const r = await fetch(`${SB}/rest/v1/chasseur_signaux`, { method: 'POST', headers: { ...H, Prefer: 'return=minimal' }, body: JSON.stringify({
      client_slug: 'pulse', linkedin_url: url, li_provider_id: pid, nom, prenom: d.prenom ?? null, poste: titre, entreprise: d.entreprise ?? '',
      signal_type: d.classe === 'CONCURRENT' ? 'demarchage_concurrent' : 'demarchage_recu', signal_texte: fil.slice(0, 500),
      statut: 'li_relation', raison: 'nous a démarchés sur LinkedIn', li_etape: 'message_envoye', li_message: rep,
      li_message_at: new Date().toISOString(), li_chat_id: cid, li_confiance: 0.7 }) });
    if (r.ok === false) console.log(`    erreur base ${r.status} ${(await r.text()).slice(0, 150)}`);
    await pause(30000 + Math.random() * 60000);
  }
  if (DRY === false) writeFileSync(VUS, JSON.stringify([...vus].slice(-5000)));
  console.log(`[retournement] ${faits} démarche(s) retournée(s)${DRY ? ' (test, rien envoyé)' : ''}`);
})().catch((e) => console.log('ERREUR', e.message));
