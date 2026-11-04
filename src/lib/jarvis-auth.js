/**
 * Jarvis, l'assistante vocale personnelle d'Alexis (04/11/2026).
 * Accès réservé : un mot de passe (dont seule l'empreinte SHA-256 est stockée
 * dans .env.local), puis un cookie de session signé, valable 30 jours.
 * Réglages dans .env.local, jamais dans le code :
 *   JARVIS_MDP_SHA256   empreinte du mot de passe
 *   JARVIS_SECRET       clé de signature des sessions
 *   ELEVENLABS_API_KEY  clé ElevenLabs, utilisée côté serveur seulement
 */
import { createHash, createHmac, timingSafeEqual } from 'node:crypto';

const NOM = 'jarvis_session';
const DUREE = 30 * 86400;

const secret = () => process.env.JARVIS_SECRET || '';
const signer = (v) => createHmac('sha256', secret()).update(v).digest('hex');
const egal = (a, b) => {
  const x = Buffer.from(String(a));
  const y = Buffer.from(String(b));
  return x.length === y.length && timingSafeEqual(x, y);
};

export const jarvisConfigure = () =>
  Boolean(secret() && process.env.JARVIS_MDP_SHA256 && process.env.ELEVENLABS_API_KEY);

export function motDePasseValide(mdp) {
  const attendu = String(process.env.JARVIS_MDP_SHA256 || '').trim().toLowerCase();
  if (attendu === '') return false;
  return egal(createHash('sha256').update(String(mdp ?? '')).digest('hex'), attendu);
}

export function cookieSession() {
  const exp = String(Math.floor(Date.now() / 1000) + DUREE);
  return `${NOM}=${exp}.${signer(exp)}; Path=/; Max-Age=${DUREE}; HttpOnly; Secure; SameSite=Strict`;
}

export function sessionValide(request) {
  if (secret() === '') return false;
  const brut = (request.headers.get('cookie') || '').split(/;\s*/).find((c) => c.startsWith(NOM + '='));
  if (!brut) return false;
  const [exp, sig] = brut.slice(NOM.length + 1).split('.');
  if (!exp || !sig || Number(exp) < Date.now() / 1000) return false;
  return egal(sig, signer(exp));
}
