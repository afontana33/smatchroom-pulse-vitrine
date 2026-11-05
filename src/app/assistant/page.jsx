import { MessageCircle } from 'lucide-react';

// Page publique « Jarvis » (05/11/2026) : envoyée en privé à ceux qui commentent JARVIS sous les posts d'Alexis.
// V3 : pensée d'abord pour le téléphone (la plupart arrivent depuis LinkedIn ou Instagram).
// Texte en Inter, gros et bien contrasté ; l'orbe est le seul élément spectaculaire ;
// la journée est montrée comme une vraie conversation en bulles.

export const metadata = {
  title: 'Jarvis, l\'assistante vocale qui pilote une entreprise · SmatchRoom Pulse',
  description:
    "Le schéma de Jarvis : l'assistante vocale d'Alexis Fontana qui gère la prospection, l'agenda, les mails et les relances de SmatchRoom Pulse. Rien ne part sans accord.",
  openGraph: {
    title: 'Jarvis : je pilote mon entreprise à la voix',
    description: "Comment l'assistante vocale de SmatchRoom Pulse est branchée, et ce qu'elle fait dans une journée.",
    images: ['https://cdn.jsdelivr.net/gh/afontana33/smatchroom-pulse-vitrine@pub-assets/reels/jarvis-poster.jpg'],
  },
};

const CALENDLY = 'https://calendly.com/a-fontana-smatchroom/30min';
const WHATSAPP = `https://wa.me/33771487698?text=${encodeURIComponent("Bonjour Alexis, j'ai vu Jarvis et j'aimerais en parler pour mon entreprise.")}`;
const CDN = 'https://cdn.jsdelivr.net/gh/afontana33/smatchroom-pulse-vitrine@pub-assets/reels';
const VIDEO = `${CDN}/reel-jarvis-presentation.mp4`;
const POSTER = `${CDN}/jarvis-poster.jpg`;

const ENTREES = [
  { titre: 'Ma voix', desc: 'Je lui parle comme à un bras droit, au téléphone ou sur l\'ordinateur.' },
  { titre: 'Le brief de 8 h 30', desc: 'Chaque matin sur WhatsApp : ce qui compte aujourd\'hui.' },
  { titre: 'Les alertes', desc: 'Un agent silencieux, un compte déconnecté : je le sais tout de suite.' },
];

const BRANCHES = [
  { titre: 'WhatsApp', desc: 'Lire une conversation, répondre, écrire.' },
  { titre: 'LinkedIn', desc: 'Suivre les échanges avec les prospects.' },
  { titre: 'Instagram', desc: 'Valider les publications, lire les messages.' },
  { titre: 'Agenda', desc: 'Lire ma journée, créer ou déplacer un rendez-vous.' },
  { titre: 'Mails', desc: 'Résumer l\'important, répondre, en écrire un.' },
  { titre: 'Agents de prospection', desc: 'Pause, reprise, envois par jour, pour moi et mes clients.' },
  { titre: 'Tableau de bord', desc: 'Leads à rappeler, réponses, campagnes qui marchent.' },
];

const JOURNEE = [
  { h: '8 h 30', moi: null, elle: 'Bonjour Alexis. Trois personnes à rappeler, une tâche urgente, deux publications à valider.' },
  { h: '9 h 10', moi: 'Qui m\'a répondu ce matin ?', elle: 'Quatre réponses cette nuit. Deux attendent un appel, je te les mets en tête de liste.' },
  { h: '11 h 00', moi: 'Décale mon rendez-vous de 14 h à jeudi.', elle: 'Jeudi 14 h est libre. Je déplace le rendez-vous avec Pierre, tu confirmes ?' },
  { h: '14 h 30', moi: 'Fais-moi le bilan des campagnes.', elle: 'Les maquettes répondent bien, les mails moins. Je te propose de passer à 12 commerces par jour.' },
  { h: '17 h 45', moi: 'J\'ai eu le client, il veut un devis lundi.', elle: 'C\'est noté sur sa fiche. Je te le rappelle lundi à 9 h.' },
];

const REGLES = [
  'Elle ne touche ni aux paiements ni aux factures.',
  'Les données restent sur nos serveurs, rien n\'est revendu.',
  'Elle se souvient de mes notes d\'un jour à l\'autre.',
];

const CSS = `
.jv { --cy:#7ff3ff; --vi:#a855f7; --li:#c084fc; --tx:#f5f5f7; --mu:#c3c6d3; --hair:rgba(192,132,252,.22); color:var(--tx); }
.jv-orb { border-radius:9999px;
  background: radial-gradient(circle at 34% 28%, #e8fdff 0%, #7ff3ff 14%, #4fa8ff 38%, #7b4dff 68%, #2a1260 88%, #12082e 100%);
  box-shadow: 0 0 70px -10px rgba(127,243,255,.45), 0 0 120px -20px rgba(168,85,247,.55), inset -10px -14px 30px rgba(10,4,30,.5); }
.jv-ring { position:absolute; inset:0; border-radius:9999px; border:1px solid rgba(127,243,255,.3); }
.jv-ring.r2 { border-color: rgba(168,85,247,.25); }
@media (prefers-reduced-motion: no-preference) {
  .jv-vit { animation: jv-breathe 5.5s ease-in-out infinite; }
  .jv-ring { animation: jv-wave 4.4s cubic-bezier(.2,.6,.3,1) infinite; }
  .jv-ring.r2 { animation-delay: 2.2s; }
}
@keyframes jv-breathe { 0%,100% { transform: scale(1); } 50% { transform: scale(1.04); } }
@keyframes jv-wave { 0% { transform: scale(1); opacity:.9; } 100% { transform: scale(1.8); opacity:0; } }
.jv a:focus-visible { outline: 2px solid var(--cy); outline-offset: 3px; }
`;

function Orbe({ taille, vivante = false }) {
  return (
    <div className="relative flex-shrink-0" style={{ width: taille, height: taille }} aria-hidden="true">
      {vivante && <span className="jv-ring" />}
      {vivante && <span className="jv-ring r2" />}
      <div className={`jv-orb h-full w-full ${vivante ? 'jv-vit' : ''}`} />
    </div>
  );
}

function Boutons() {
  return (
    <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:justify-center">
      <a href={CALENDLY} target="_blank" rel="noopener noreferrer"
        className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[var(--vi)] px-7 text-[16px] font-semibold text-white transition-colors hover:bg-[#9333ea]">
        Réserver 30 min avec Alexis
      </a>
      <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
        className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-white/25 px-7 text-[16px] font-semibold text-white transition-colors hover:border-white/60">
        <MessageCircle size={18} strokeWidth={2} /> En parler sur WhatsApp
      </a>
    </div>
  );
}

function Titre({ children }) {
  return <h2 className="text-balance text-[30px] font-bold leading-[1.1] tracking-[-0.02em] sm:text-[42px]">{children}</h2>;
}

function Liste({ titre, items }) {
  return (
    <div>
      <p className="mb-4 text-[15px] font-semibold text-[var(--li)]">{titre}</p>
      <ul className="divide-y divide-[var(--hair)] border-y border-[var(--hair)]">
        {items.map((i) => (
          <li key={i.titre} className="flex gap-3 py-3.5">
            <span className="mt-[9px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--cy)]" aria-hidden="true" />
            <p className="text-[16px] leading-snug">
              <span className="font-semibold text-white">{i.titre}</span>
              <span className="text-[var(--mu)]"> · {i.desc}</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AssistantPage() {
  return (
    <main className="jv overflow-x-clip pb-24">
      <style>{CSS}</style>

      {/* Ouverture */}
      <section className="px-5 pt-28 sm:pt-36">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <Orbe taille={112} vivante />
          <h1 className="mt-10 text-balance text-[38px] font-bold leading-[1.05] tracking-[-0.03em] sm:text-[60px]">
            Je pilote mon entreprise à la voix.
          </h1>
          <p className="mt-5 text-pretty text-[18px] leading-relaxed text-[var(--mu)]">
            Jarvis, c'est mon assistante. Elle lit mes conversations, mon agenda et mes mails,
            règle mes campagnes de prospection et me rappelle ce que je ne dois pas oublier.
          </p>
          <div className="mt-8 w-full sm:w-auto"><Boutons /></div>
        </div>
      </section>

      {/* Elle se présente */}
      <section className="px-5 pt-20 sm:pt-28">
        <div className="mx-auto grid max-w-4xl items-center gap-8 md:grid-cols-[280px_1fr] md:gap-14">
          <div className="mx-auto w-full max-w-[260px] overflow-hidden rounded-[28px] border border-[var(--hair)] bg-black p-1 shadow-[0_24px_70px_-28px_rgba(168,85,247,.7)] md:max-w-[280px]">
            <video src={VIDEO} poster={POSTER} controls playsInline preload="none" className="aspect-[9/16] w-full rounded-[24px] bg-black object-cover" />
          </div>
          <div className="text-center md:text-left">
            <p className="text-balance text-[24px] font-semibold leading-snug text-white sm:text-[30px]">
              « Je ne me contente pas de répondre. Je fais avancer les choses. »
            </p>
            <p className="mt-3 text-[17px] leading-relaxed text-[var(--mu)]">
              Cinquante secondes : elle se présente elle-même, avec sa vraie voix.
            </p>
          </div>
        </div>
      </section>

      {/* Une journée en conversation */}
      <section className="px-5 pt-20 sm:pt-28">
        <div className="mx-auto max-w-2xl">
          <Titre>Une journée avec elle.</Titre>
          <p className="mt-3 text-[17px] text-[var(--mu)]">Je parle, elle fait. Toujours après mon « oui ».</p>
          <div className="mt-8 space-y-7">
            {JOURNEE.map((j) => (
              <div key={j.h}>
                <p className="mb-2.5 text-center text-[13px] font-medium tabular-nums text-[var(--mu)]">{j.h}</p>
                {j.moi && (
                  <div className="mb-2.5 flex justify-end">
                    <p className="max-w-[85%] rounded-[20px] rounded-br-md bg-[var(--vi)] px-4 py-2.5 text-[16px] font-medium leading-snug text-white">
                      <span className="sr-only">Alexis : </span>{j.moi}
                    </p>
                  </div>
                )}
                <div className="flex items-end gap-2">
                  <Orbe taille={26} />
                  <p className="max-w-[85%] rounded-[20px] rounded-bl-md border border-white/10 bg-[#171528] px-4 py-2.5 text-[16px] leading-snug text-[var(--tx)]">
                    <span className="sr-only">Jarvis : </span>{j.elle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Le schéma */}
      <section className="px-5 pt-20 sm:pt-28">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-2xl"><Titre>Comment elle est branchée.</Titre></div>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_auto_1.15fr] lg:items-center lg:gap-12">
            <Liste titre="Ce qu'elle entend" items={ENTREES} />
            <div className="hidden lg:block"><Orbe taille={130} vivante /></div>
            <Liste titre="Ce qu'elle pilote" items={BRANCHES} />
          </div>
        </div>
      </section>

      {/* Les règles */}
      <section className="px-5 pt-20 sm:pt-28">
        <div className="mx-auto max-w-2xl rounded-[28px] border border-[var(--hair)] bg-[#100d1d] px-6 py-8 sm:px-10 sm:py-10">
          <Titre>Rien ne part sans mon accord.</Titre>
          <p className="mt-3 text-[17px] leading-relaxed text-[var(--mu)]">
            Avant chaque message, chaque mail, chaque rendez-vous déplacé, elle me relit ce qu'elle va faire et attend mon « oui ».
          </p>
          <ul className="mt-6 space-y-3">
            {REGLES.map((r) => (
              <li key={r} className="flex gap-3 text-[16px] leading-snug text-white">
                <span className="mt-[9px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--cy)]" aria-hidden="true" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Fin */}
      <section className="px-5 pt-20 sm:pt-28">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <Orbe taille={56} />
          <h2 className="mt-8 text-balance text-[30px] font-bold leading-[1.1] tracking-[-0.02em] sm:text-[42px]">
            Vous voulez la même pour votre entreprise ?
          </h2>
          <p className="mt-4 text-pretty text-[17px] leading-relaxed text-[var(--mu)]">
            On regarde ensemble ce qu'elle pourrait prendre en charge chez vous : prospection, relances,
            rendez-vous, suivi client. 30 minutes, sans engagement.
          </p>
          <div className="mt-8 w-full sm:w-auto"><Boutons /></div>
        </div>
      </section>
    </main>
  );
}
