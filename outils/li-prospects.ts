// Suite des commentaires LinkedIn d'Alexis (demande du 28/10/2026) : « le but, un max de prospects ».
// Trois choses, toutes au nom d'Alexis, au vouvoiement, sans tirets de ponctuation :
//   1. Réponses sous les posts des autres : quelqu'un répond à un commentaire d'Alexis → une réponse, une seule fois.
//   2. Invitation après commentaire : 1 jour après le commentaire, l'auteur du post (dirigeant PME B2B France) est invité.
//      La ligne part dans chasseur_signaux (li_etape 'invite') : li-suivi.ts envoie le message à l'acceptation, relance, alerte.
//   3. Invitations reçues : un dirigeant ciblé ajoute Alexis → acceptée, ligne en 'accepte' : li-suivi.ts envoie le message.
// Plafonds prudents : MAX_INVITES invitations et MAX_REPONSES réponses par passage, un passage par heure en journée.
//   npx tsx src/li-prospects.ts [--dry-run]
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { config } from './config.js';
import { api } from './unipile';
const DRY = process.argv.includes('--dry-run');
const MAX_INVITES = 2, MAX_INVITES_JOUR = 6, MAX_REPONSES = 4, MAX_ACCEPTES = 5;
const fic = (() => { try { return readFileSync('/root/unipile.env', 'utf8'); } catch { return ''; } })();
const ACCOUNT_ID = process.env.UNIPILE_ACCOUNT_ID ?? (fic.split('\n').find((l) => l.startsWith('UNIPILE_ACCOUNT_ID=')) ?? '').slice(19).trim();
const SB = process.env.SUPABASE_URL ?? '', SK = process.env.SUPABASE_SERVICE_KEY ?? '';
const H = { apikey: SK, Authorization: `Bearer ${SK}`, 'content-type': 'application/json' };
const COMMENTES = 'data/li-commentes.json', VUES = 'data/li-prospects-vus.json', JOURNAL = 'data/li-prospects-jour.json';
const pause = (ms: number) => new Promise((r) => setTimeout(r, ms));
const sansTirets = (t: string) => t.replace(/\s+[-–—]\s+/g, ', ').replace(/[–—]/g, ', ').replace(/,\s*,/g, ',').trim();
const conf = JSON.parse(readFileSync('signaux/pulse.json', 'utf8'));
const INCLURE = new RegExp(conf.inclure.join('|'), 'i');
const EXCLURE = new RegExp(conf.exclure.join('|'), 'i');
const lire = (f: string, d: any) => { try { return JSON.parse(readFileSync(f, 'utf8')); } catch { return d; } };
const aujourdhui = new Date().toISOString().slice(0, 10);

async function claude(prompt: string, max = 400): Promise<string> {
  const r = await fetch('https://api.anthropic.com/v1/messages', { method: 'POST', headers: { 'x-api-key': config.anthropic.apiKey, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
    body: JSON.stringify({ model: config.anthropic.model, max_tokens: max, messages: [{ role: 'user', content: prompt }] }) });
  return String(((await r.json()) as any).content?.[0]?.text ?? '').trim();
}

const CIBLE = (nom: string, titre: string) => `Alexis vend aux PME françaises un service qui leur trouve des clients en démarchant pour elles.
Cette personne est-elle une bonne cible : dirigeant (ou directeur commercial) d'une PME française qui vend à d'autres entreprises ?
NE SONT PAS des cibles : salariés sans pouvoir de décision, indépendants seuls, consultants, coachs, formateurs, agences de prospection, marketing, communication, web (concurrents), recruteurs, commerces et restaurants, grands groupes, secteur public, associations, étudiants, personnes hors de France. En cas de doute : NON.
${nom} | ${titre}
Réponds par OUI ou NON, puis une barre verticale, puis son prénom avec la casse normale. Exemple : OUI|Marie`;

async function estCible(nom: string, titre: string): Promise<{ ok: boolean; prenom: string }> {
  if (!titre || INCLURE.test(titre) === false || EXCLURE.test(titre)) return { ok: false, prenom: '' };
  const [rep, prenom] = (await claude(CIBLE(nom, titre), 30)).split('|').map((x) => x.trim());
  const p = String(prenom ?? '');
  return { ok: rep?.toUpperCase().startsWith('OUI') === true && p !== '' && /^[A-ZÀ-Ý0-9 .&'-]{4,}$/.test(p) === false, prenom: p };
}

async function dejaEnBase(pid: string, url: string) {
  const r = await fetch(`${SB}/rest/v1/chasseur_signaux?select=id&client_slug=eq.pulse&or=(li_provider_id.eq.${encodeURIComponent(pid)},linkedin_url.eq.${encodeURIComponent(url)})&limit=1`, { headers: H });
  const j: any = await r.json().catch(() => []);
  return Array.isArray(j) && j.length > 0;
}
async function insere(row: any) {
  if (DRY) return;
  const r = await fetch(`${SB}/rest/v1/chasseur_signaux`, { method: 'POST', headers: { ...H, Prefer: 'return=minimal' }, body: JSON.stringify({ client_slug: 'pulse', li_confiance: 0.7, ...row }) });
  if (r.ok === false) console.log(`    erreur base ${r.status} ${(await r.text()).slice(0, 150)}`);
}

const QUESTION = `Petite question : aujourd'hui, vos nouveaux clients viennent plutôt des recommandations, ou c'est vous qui allez les chercher ?`;
const MSG_COMMENTE = (prenom: string) => `Bonjour ${prenom},\n\nMerci d'avoir accepté. J'avais bien aimé votre post, ça m'a fait réfléchir. ${QUESTION}\n\nAlexis`;
const MSG_RECU = (prenom: string) => `Bonjour ${prenom},\n\nMerci pour l'invitation, ravi d'être en relation. ${QUESTION}\n\nAlexis`;
const NOTE_INVITE = (prenom: string) => `Bonjour ${prenom}, j'ai échangé sous votre post, ravi de vous compter dans mon réseau. Alexis`;

const REPONSE = (post: string, moi: string, auteur: string, com: string) => `Tu es Alexis Fontana, fondateur de SmatchRoom Pulse (Bordeaux) : on trouve des clients aux artisans et aux PME en démarchant pour eux.
Sous le post LinkedIn de quelqu'un d'autre, tu avais laissé ce commentaire : """${moi}"""
${auteur} t'a répondu : """${com}"""
Écris ta réponse. En français, vouvoiement, 1 à 2 phrases, ton direct et chaleureux. Commence par son prénom. Réponds vraiment à ce qu'il dit et, si c'est naturel, relance par une question ouverte. N'invente aucun chiffre ni anecdote. Pas de lien, pas de prix, pas de pitch, aucune mention de SmatchRoom, d'intelligence artificielle ou de réponse automatique, aucun tiret (— – -) comme ponctuation.
Si sa réponse est un simple merci, un emoji ou ne demande rien, réponds exactement : RIEN
Post d'origine : """${post.slice(0, 1200)}"""
Ta réponse (le texte seul) :`;

(async () => {
  if (existsSync('data') === false) mkdirSync('data');
  const vus = new Set<string>(lire(VUES, []));
  const journal = lire(JOURNAL, {});
  const invitesJour = journal.date === aujourdhui ? Number(journal.invites ?? 0) : 0;
  const commentes: any[] = lire(COMMENTES, []);
  const moi: any = await api('/users/me');
  const monId = String(moi.provider_id ?? '');

  // 0. Rattrapage : les commentaires d'Alexis des 10 derniers jours lus sur LinkedIn (faits à la main ou avant ce suivi).
  const connus = new Set(commentes.map((c) => String(c.comment_id ?? '')));
  const postsConnus = new Set(commentes.map((c) => String(c.post_id)));
  const mes: any = await api(`/users/${encodeURIComponent(monId)}/comments?limit=40`).catch(() => ({}));
  for (const m of mes.items ?? []) {
    const d = Date.parse(m.date ?? '') || 0;
    if (Date.now() - d > 10 * 86400e3 || connus.has(String(m.id)) || postsConnus.has(String(m.post_id))) continue;
    await pause(1200);
    const post: any = await api(`/posts/${encodeURIComponent(m.post_id)}`).catch(() => ({}));
    const a = post.author ?? {};
    const auteurId = String(post.author?.id ?? post.author_details?.id ?? '');
    if (auteurId === monId || String(post.author?.public_identifier ?? '') === String(moi.public_identifier ?? '§')) continue; // ses propres posts : li-reponses
    commentes.push({ post_id: String(m.post_id), post_url: post.share_url ?? null, comment_id: String(m.id),
      auteur: String(a.name ?? post.author_details?.name ?? ''), poste: String(a.headline ?? post.author_details?.headline ?? ''),
      url: a.public_identifier ? `https://www.linkedin.com/in/${a.public_identifier}` : '', extrait: String(post.text ?? '').slice(0, 300),
      commentaire: String(m.text ?? ''), date: new Date(d).toISOString(), invite: false });
    postsConnus.add(String(m.post_id));
  }

  // 1. Réponses aux réponses sous les posts des autres (commentaires des 10 derniers jours)
  let reponses = 0;
  for (const c of commentes.filter((x) => Date.now() - Date.parse(x.date) < 10 * 86400e3)) {
    if (reponses >= MAX_REPONSES) break;
    await pause(1500);
    const j: any = await api(`/posts/${encodeURIComponent(c.post_id)}/comments?limit=100`).catch(() => ({}));
    const tous: any[] = j.items ?? [];
    // Le commentaire d'Alexis : par son id si connu, sinon par son texte.
    const mien = tous.find((x) => (c.comment_id && String(x.id) === String(c.comment_id)) || String(x.text ?? '').trim() === String(c.commentaire).trim());
    let reps: any[] = [];
    if (mien && Number(mien.reply_counter ?? 0) > 0) {
      const r: any = await api(`/posts/${encodeURIComponent(c.post_id)}/comments?comment_id=${encodeURIComponent(mien.id)}&limit=50`).catch(() => ({}));
      reps = (r.items ?? []).filter((x: any) => String(x.id) !== String(mien.id));
    }
    for (const rep of reps) {
      const id = String(rep.id ?? '');
      if (id === '' || vus.has(id) || String(rep.author_details?.id ?? '') === monId) { if (id) vus.add(id); continue; }
      vus.add(id);
      const texte = String(rep.text ?? '').trim();
      const t = sansTirets(texte.length < 3 ? 'RIEN' : await claude(REPONSE(c.extrait, c.commentaire, String(rep.author ?? ''), texte)));
      if (t === '' || t.startsWith('RIEN')) { console.log(`  - réponse ignorée : ${rep.author} « ${texte.slice(0, 60)} »`); continue; }
      console.log(`  > ${rep.author} a répondu : « ${texte.slice(0, 80)} »\n    réponse : ${t}`);
      reponses++;
      if (DRY === false) {
        await api(`/posts/${encodeURIComponent(c.post_id)}/comments`, { method: 'POST', body: JSON.stringify({ account_id: ACCOUNT_ID, text: t, comment_id: mien.id }) });
        await pause(20000 + Math.random() * 30000);
      }
      if (reponses >= MAX_REPONSES) break;
    }
  }

  // 2. Invitation des auteurs commentés, au moins 1 jour après le commentaire
  let invites = 0;
  for (const c of commentes.filter((x) => x.invite === false && Date.now() - Date.parse(x.date) > 86400e3)) {
    if (invites >= MAX_INVITES || invitesJour + invites >= MAX_INVITES_JOUR) break;
    c.invite = true; // traité une seule fois, retenu ou non
    const ident = String(c.url ?? '').replace(/\/+$/, '').split('/in/')[1]?.split(/[/?]/)[0];
    if (!ident) continue;
    const { ok, prenom } = await estCible(c.auteur, c.poste);
    if (ok === false) { console.log(`  - pas une cible : ${c.auteur} | ${String(c.poste).slice(0, 60)}`); continue; }
    const u: any = await api(`/users/${encodeURIComponent(ident)}`).catch(() => ({}));
    const pid = String(u.provider_id ?? '');
    if (pid === '' || await dejaEnBase(pid, c.url)) continue;
    if (u.network_distance === 'FIRST_DEGREE' || u.is_relationship === true) continue; // déjà en relation : li-relations s'en charge
    console.log(`  + invitation : ${c.auteur} | ${String(c.poste).slice(0, 60)}`);
    invites++;
    if (DRY) continue;
    let r: any = await api('/users/invite', { method: 'POST', body: JSON.stringify({ account_id: ACCOUNT_ID, provider_id: pid, message: NOTE_INVITE(prenom) }) }).catch((e: any) => ({ erreur: e.message }));
    // Les comptes LinkedIn gratuits ont peu de notes d'invitation par mois : sans note si la note est refusée.
    if (r?.erreur) r = await api('/users/invite', { method: 'POST', body: JSON.stringify({ account_id: ACCOUNT_ID, provider_id: pid }) }).catch((e: any) => ({ erreur: e.message }));
    if (r?.erreur) { console.log(`    invitation refusée : ${String(r.erreur).slice(0, 120)}`); continue; }
    await insere({ linkedin_url: c.url, li_provider_id: pid, nom: c.auteur, prenom, poste: c.poste, signal_type: 'commentaire_alexis',
      signal_texte: `Alexis a commenté son post : ${String(c.extrait).slice(0, 200)}`, post_url: c.post_url, li_commentaire: c.commentaire,
      statut: 'li_a_inviter', raison: 'auteur commenté par Alexis', li_etape: 'invite', li_invite_at: new Date().toISOString(), li_message: MSG_COMMENTE(prenom) });
    await pause(30000 + Math.random() * 60000);
  }
  if (DRY === false) writeFileSync(COMMENTES, JSON.stringify(commentes));

  // 3. Invitations reçues : on accepte les dirigeants ciblés et li-suivi leur écrit
  let acceptes = 0;
  const recues: any = await api('/users/invite/received?limit=50').catch(() => ({}));
  for (const inv of recues.items ?? []) {
    if (acceptes >= MAX_ACCEPTES) break;
    const id = String(inv.id ?? '');
    if (id === '' || vus.has(id)) continue;
    vus.add(id);
    const nom = String(inv.inviter?.inviter_name ?? inv.inviter_name ?? '');
    const titre = String(inv.inviter?.inviter_description ?? inv.inviter_description ?? '');
    const pid = String(inv.inviter?.inviter_id ?? inv.inviter_id ?? '');
    const { ok, prenom } = await estCible(nom, titre);
    if (ok === false) { console.log(`  - invitation reçue, pas une cible (laissée en attente) : ${nom} | ${titre.slice(0, 60)}`); continue; }
    const url = String(inv.inviter?.inviter_public_identifier ? `https://www.linkedin.com/in/${inv.inviter.inviter_public_identifier}` : '');
    if (pid && await dejaEnBase(pid, url)) continue;
    console.log(`  + invitation reçue acceptée : ${nom} | ${titre.slice(0, 60)}`);
    acceptes++;
    if (DRY) continue;
    const r: any = await api(`/users/invite/received/${encodeURIComponent(id)}`, { method: 'POST', body: JSON.stringify({ account_id: ACCOUNT_ID, provider: 'LINKEDIN', action: 'accept', shared_secret: inv.specifics?.shared_secret ?? inv.shared_secret }) }).catch((e: any) => ({ erreur: e.message }));
    if (r?.erreur) { console.log(`    acceptation impossible : ${String(r.erreur).slice(0, 120)}`); continue; }
    await insere({ linkedin_url: url, li_provider_id: pid, nom, prenom, poste: titre, signal_type: 'invitation_recue', signal_texte: 'Invitation reçue sur LinkedIn',
      statut: 'li_relation', raison: 'invitation reçue, dirigeant de PME B2B', li_etape: 'accepte', li_accepte_at: new Date().toISOString(), li_message: MSG_RECU(prenom) });
    await pause(15000 + Math.random() * 30000);
  }

  if (DRY === false) {
    writeFileSync(VUES, JSON.stringify([...vus].slice(-5000)));
    writeFileSync(JOURNAL, JSON.stringify({ date: aujourdhui, invites: invitesJour + invites }));
  }
  console.log(`[prospects] ${reponses} réponse(s), ${invites} invitation(s), ${acceptes} invitation(s) reçue(s) acceptée(s)${DRY ? ' (test, rien envoyé)' : ''}`);
})().catch((e) => console.log('ERREUR', e.message));
