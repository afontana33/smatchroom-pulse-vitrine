#!/usr/bin/env tsx
/**
 * Agent Partenaires de Tanguy Duplay (AS Courtage, assurance de prêt), demande du 28/10/2026.
 * Monté à la main : l'outil creer-agent.mts est pensé pour les artisans du bâtiment.
 * À lancer depuis agent-chasseur/, la clé Green API dans GA_TOKEN (jamais écrite dans le dépôt) :
 *   read -s GA_TOKEN && GA_TOKEN=$GA_TOKEN npx tsx creer-tanguy.mts [--sans-scrape]
 * Fiche clients/tanguy-duplay.json (inactive), client:sync, ligne pulse_onboarding (facture F-2026-062)
 * pour que paiements.mts repère le virement et que connexion.mts envoie le lien QR puis active l'agent.
 */
import dotenv from 'dotenv';
import { existsSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { randomBytes } from 'node:crypto';
import { createClient } from '@supabase/supabase-js';
for (const f of ['.env', '../agent-chasseur-smatchroom/.env']) if (existsSync(f)) dotenv.config({ path: f, quiet: true } as any);

const SLUG = 'tanguy-duplay';
const SANS_SCRAPE = process.argv.includes('--sans-scrape');
const TOKEN = String(process.env.GA_TOKEN ?? '').trim();
if (TOKEN.length < 20) throw new Error('GA_TOKEN manquant : lancer « read -s GA_TOKEN » puis coller la clé');
const sb = createClient(process.env.SUPABASE_URL as string, (process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY) as string);

// Premier lot : bassin stéphanois et Haute-Loire (les autres villes de sa liste viendront ensuite).
const VILLES = ['Saint-Étienne', 'Saint-Chamond', 'Firminy', 'Roanne', 'Montbrison', 'Saint-Priest-en-Jarez', 'Andrézieux-Bouthéon',
  'Saint-Genest-Lerpt', "L'Étrat", 'Saint-Jean-Bonnefonds', 'Sorbiers', 'Rive-de-Gier', 'Saint-Galmier', 'Montrond-les-Bains',
  'Le Puy-en-Velay', 'Yssingeaux', 'Monistrol-sur-Loire'];
const PERSONAS = ['agence immobilière', 'agent immobilier', 'conciergerie location courte durée', 'constructeur de maisons individuelles',
  'courtier en crédit immobilier', 'expert-comptable', 'notaire', 'conseiller en gestion de patrimoine',
  'conseil en création et reprise d\'entreprise', 'domiciliation d\'entreprise'];

const cps = new Set<string>();
for (const v of VILLES) {
  const j: any[] = await fetch(`https://geo.api.gouv.fr/communes?nom=${encodeURIComponent(v)}&fields=nom,codesPostaux,codeDepartement&boost=population&limit=3`).then((r) => r.json());
  const c = j.find((x) => ['42', '43'].includes(x.codeDepartement));
  if (c == null) { console.log(`  ! ville introuvable : ${v}`); continue; }
  for (const cp of c.codesPostaux ?? []) cps.add(cp);
}

const M2_IMMO = "Merci ! Je suis courtier en assurance de prêt immobilier dans la Loire et la Haute-Loire : je compare l'assurance proposée par la banque de vos acquéreurs avec d'autres assureurs, à garanties équivalentes, ce qui allège souvent le coût total de leur crédit. Vous avez déjà quelqu'un vers qui orienter vos acquéreurs pour ça ?";
const M2_PRESCRIPTEUR = "Merci ! Je suis courtier en assurance de prêt dans la Loire et la Haute-Loire : quand vos clients empruntent, je compare l'assurance de leur banque avec d'autres offres à garanties équivalentes, et je m'occupe aussi de leur prévoyance. Vous avez déjà un partenaire pour ça ?";
const M2_ENTREPRISE = "Merci ! Je suis courtier en assurance dans la Loire et la Haute-Loire : j'accompagne les créateurs et repreneurs d'entreprise sur leur assurance de prêt, leur responsabilité civile professionnelle et leur prévoyance. Vous avez déjà quelqu'un vers qui orienter vos clients pour ça ?";

const fiche = {
  nom: 'AS Courtage · Tanguy Duplay', actif: false, profil: 'btp', pays: 'FR', email_from_name: 'Tanguy · AS Courtage',
  strict_cp: true, relances: true, zone_depts: ['42', '43'], codes_postaux: [...cps], villes: VILLES, personas: PERSONAS,
  daily_min: 15, daily_max: 20, hour_start: 9, hour_end: 19,
  green_api_host: 'https://7107.api.greenapi.com', green_api_id_instance: '7107653460', green_api_token: TOKEN,
  flux: 'deux_temps',
  flux_config: {
    m1_nom: 'Bonjour, je suis Tanguy. Je parle bien à {prenom} {nom} ?',
    m1_sans_nom: { defaut: "Bonjour, je suis Tanguy. C'est bien vous qui vous occupez de {etablissement} ?" },
    redirect: 'Très bien, merci.',
    m2: { immobilier: M2_IMMO, prescripteur: M2_PRESCRIPTEUR, assurance: M2_PRESCRIPTEUR, commerce: M2_ENTREPRISE },
    signature: 'Tanguy · AS Courtage',
  },
  conversation: {
    humain: 'Tanguy', max_tours: 3, signature_premier_message_seulement: true,
    offre: "Tanguy Duplay est courtier du réseau AS Courtage, basé à Saint-Romain-Lachalm (43), et intervient dans la Loire et la Haute-Loire. Il compare l'assurance de prêt immobilier des emprunteurs avec celle de leur banque, à garanties équivalentes, y compris en cours de crédit, et s'occupe aussi de la prévoyance et des assurances des professionnels. L'agent ne donne jamais de prix ni de taux : c'est vu lors du rappel.",
    demande_creneau: '',
    confirmation_creneau: 'Très bien, je vous rappelle pour en parler.',
    confirmation_email: 'Merci, je vous envoie ça.',
    passage_main: 'Merci pour votre retour, je reviens vers vous rapidement.',
    cloture_refus: 'Très bien, merci pour votre retour. Gardez mes coordonnées si besoin, bonne journée.',
    notification_whatsapp: '33618795267',
    relance_identite: "Bonjour, je reviens vers vous au cas où mon précédent message vous aurait échappé.\n\nC'est bien vous qui vous occupez de {etablissement} ?",
    relance_suite: "Je reviens vers vous. Pas de souci si ce n'est pas le moment.",
    relance_finale: 'Dernier message de ma part. Si vous avez un jour besoin de moi, gardez mon numéro. Bonne journée.',
  },
};
const dossier = `## Qui
Tanguy Duplay, courtier du réseau AS Courtage, basé à Saint-Romain-Lachalm (43).

## Services
Assurance de prêt immobilier (comparaison avec l'assurance de la banque, à garanties équivalentes, à la souscription ou en cours de crédit), prévoyance, assurances des professionnels (responsabilité civile, prévoyance des indépendants).

## Zone
Loire et Haute-Loire pour commencer : bassin stéphanois, Roanne, Montbrison, Le Puy-en-Velay, Yssingeaux, Monistrol-sur-Loire.

## Règles d'écriture
Première personne au nom de Tanguy, vouvoiement, messages courts. Aucun prix, aucun taux, aucun pourcentage d'économie, aucun chiffre inventé. Ne jamais promettre une acceptation de dossier. Quand l'interlocuteur est intéressé : « Très bien, je vous rappelle pour en parler. »
`;

writeFileSync(`clients/${SLUG}.json`, JSON.stringify(fiche, null, 2));
writeFileSync(`clients/${SLUG}.md`, dossier);
console.log(`[tanguy] fiche écrite : ${VILLES.length} villes, ${cps.size} codes postaux, ${PERSONAS.length} types de prescripteurs`);
console.log(execSync(`npm run -s client:sync -- ${SLUG}`, { encoding: 'utf8' }).slice(-300));

// Ligne d'accueil : paiement suivi par paiements.mts (178,80 € TTC = offre « agent »), puis lien QR et activation par connexion.mts.
const { data: deja } = await sb.from('pulse_onboarding').select('id').eq('agent_slug', SLUG).maybeSingle();
if (deja == null) {
  const { error } = await sb.from('pulse_onboarding').insert({
    token: randomBytes(12).toString('hex'), offre: 'agent', entreprise: 'AS Courtage · Tanguy Duplay',
    telephone: '33618795267', statut: 'facture', rempli_at: new Date().toISOString(), agent_slug: SLUG, agent_cree_at: new Date().toISOString(),
    qonto_client_id: '01a1835b-7146-7db8-a2a5-51350445ebff', qonto_invoice_id: '01a1835b-84af-7b67-a794-2b841a5e9a11',
    donnees: { prenom: 'Tanguy', nom: 'Duplay', raison_sociale: 'AS Courtage', email: 'Tanguy.duplay@ascourtage.fr', numero_whatsapp: '0618795267' },
  });
  console.log(error ? `[tanguy] accueil : ${error.message}` : '[tanguy] ligne d\'accueil créée (suivi du paiement et lien QR automatiques)');
}

if (SANS_SCRAPE === false) {
  console.log(execSync(`npx tsx src/scrape.ts --client ${SLUG} --budget 8`, { encoding: 'utf8', timeout: 40 * 60_000 }).slice(-600));
  const g = execSync(`npx tsx src/gen-deux-temps.ts --client ${SLUG} --limit 400`, { encoding: 'utf8', timeout: 20 * 60_000 });
  console.log((g.match(/\[deux-temps\][^\n]*/g) ?? []).slice(-3).join('\n'));
}
console.log('[tanguy] prêt. Reste : Tanguy flashe le QR (lien envoyé automatiquement après paiement).');
