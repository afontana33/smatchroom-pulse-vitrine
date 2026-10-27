#!/usr/bin/env tsx
// Essai de la carte de visite : l'envoie depuis le WhatsApp de l'agent du client au numéro donné (à lancer depuis agent-chasseur/).
//   npx tsx test-carte.mts deco-renov 33771487698
import { readFileSync } from 'node:fs';
import { sendFileByUpload } from './src/greenapi.js';
const [slug, num] = process.argv.slice(2);
const f = JSON.parse(readFileSync(`clients/${slug}.json`, 'utf8'));
const creds: any = { host: f.green_api_host, idInstance: String(f.green_api_id_instance), apiToken: f.green_api_token };
const id = await sendFileByUpload(creds, num, `clients/cartes/${f.conversation.carte_fichier}`);
console.log('carte envoyée, idMessage', id || '(vide)');
