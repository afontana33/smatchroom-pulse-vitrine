import { Instrument_Serif } from 'next/font/google';
import { MessageCircle } from 'lucide-react';

// Page publique « Jarvis » (05/11/2026) : envoyée en privé à ceux qui commentent JARVIS sous les posts d'Alexis.
// Parti pris : la page parle comme Jarvis s'utilise, à la voix. Les phrases dites sont en serif italique,
// l'orbe est le seul élément spectaculaire, tout le reste reste sobre.

const serif = Instrument_Serif({ weight: '400', style: ['normal', 'italic'], subsets: ['latin'], display: 'swap' });

export const metadata = {
  title: 'Jarvis, l\'assistante vocale qui pilote une entreprise · SmatchRoom Pulse',
  description:
    "Le schéma de Jarvis : l'assistante vocale d'Alexis Fontana qui gère la prospection, l'agenda, les mails et les relances de SmatchRoom Pulse. Rien ne part sans accord.",
  openGraph: {
    title: 'Jarvis : je pilote mon entreprise à la voix',
    description: "Comment l'assistante vocale de SmatchRoom Pulse est branchée, et ce qu'elle fait dans une journée.",
    images: ['https://cdn.jsdelivr.net/gh/afontana33/smatchroom-pulse-vitrine@pub-assets/reels/jarvis-poster.jpg'],
  },
};

const CALENDLY = 'https://calendly.com/a-fontana-smatchroom/30min';
const WHATSAPP = `https://wa.me/33771487698?text=${encodeURIComponent("Bonjour Alexis, j'ai vu Jarvis et j'aimerais en parler pour mon entreprise.")}`;
const CDN = 'https://cdn.jsdelivr.net/gh/afontana33/smatchroom-pulse-vitrine@pub-assets/reels';
const VIDEO = `${CDN}/reel-jarvis-presentation.mp4`;
const POSTER = `${CDN}/jarvis-poster.jpg`;

// y = position verticale (en % de la hauteur du schéma)
const ENTREES = [
  { titre: 'Ma voix', desc: 'Je lui parle comme à un bras droit, au téléphone ou sur l\'ordinateur.', y: 28 },
  { titre: 'Le brief de 8 h 30', desc: 'Chaque matin sur WhatsApp : ce qui compte aujourd\'hui.', y: 50 },
  { titre: 'Les alertes', desc: 'Un agent silencieux, un compte déconnecté : je le sais tout de suite.', y: 72 },
];

const BRANCHES = [
  { titre: 'WhatsApp', desc: 'Lire une conversation, répondre, écrire.' },
  { titre: 'LinkedIn', desc: 'Suivre les échanges avec les prospects.' },
  { titre: 'Instagram', desc: 'Valider les publications, lire les messages.' },
  { titre: 'Agenda', desc: 'Lire ma journée, créer ou déplacer un rendez-vous.' },
  { titre: 'Mails', desc: 'Résumer l\'important, répondre, en écrire un.' },
  { titre: 'Agents de prospection', desc: 'Pause, reprise, envois par jour, pour moi et mes clients.' },
  { titre: 'Tableau de bord', desc: 'Leads à rappeler, réponses, campagnes qui marchent.' },
].map((b, i, a) => ({ ...b, y: 7 + (i * 86) / (a.length - 1) }));

const JOURNEE = [
  { h: '8 h 30', moi: null, elle: 'Bonjour Alexis. Trois personnes à rappeler, une tâche urgente, deux publications à valider.' },
  { h: '9 h 10', moi: 'Qui m\'a répondu ce matin ?', elle: 'Quatre réponses cette nuit. Deux attendent un appel, je te les mets en tête de liste.' },
  { h: '11 h 00', moi: 'Décale mon rendez-vous de 14 h à jeudi.', elle: 'Jeudi 14 h est libre. Je déplace le rendez-vous avec Pierre, tu confirmes ?' },
  { h: '14 h 30', moi: 'Fais-moi le bilan des campagnes.', elle: 'Les maquettes répondent bien, les mails moins. Je te propose de passer à 12 commerces par jour.' },
  { h: '17 h 45', moi: 'J\'ai eu le client, il veut un devis lundi.', elle: 'C\'est noté sur sa fiche. Je te le rappelle lundi à 9 h.' },
];

const REGLES = [
  'Elle ne touche ni aux paiements ni aux factures.',
  'Les données restent sur nos serveurs, rien n\'est revendu.',
  'Elle se souvient de mes notes d\'un jour à l\'autre.',
];

const CSS = `
.jv { --cy:#7ff3ff; --vi:#a855f7; --li:#c084fc; --tx:#ECEAF5; --mu:#9aa0b0; --hair:rgba(192,132,252,.18); color:var(--tx); }
.jv-orb { position:relative; border-radius:9999px;
  background: radial-gradient(circle at 34% 28%, #e8fdff 0%, #7ff3ff 14%, #4fa8ff 38%, #7b4dff 68%, #2a1260 88%, #12082e 100%);
  box-shadow: 0 0 90px -10px rgba(127,243,255,.45), 0 0 160px -20px rgba(168,85,247,.55), inset -18px -24px 50px rgba(10,4,30,.55); }
.jv-ring { position:absolute; inset:0; border-radius:9999px; border:1px solid rgba(127,243,255,.28); }
.jv-ring.r2 { border-color: rgba(168,85,247,.22); }
@media (prefers-reduced-motion: no-preference) {
  .jv-orb { animation: jv-breathe 5.5s ease-in-out infinite; }
  .jv-ring { animation: jv-wave 4.4s cubic-bezier(.2,.6,.3,1) infinite; }
  .jv-ring.r2 { animation-delay: 2.2s; }
}
@keyframes jv-breathe { 0%,100% { transform: scale(1); } 50% { transform: scale(1.035); } }
@keyframes jv-wave { 0% { transform: scale(1); opacity:.9; } 100% { transform: scale(1.9); opacity:0; } }
.jv a:focus-visible { outline: 2px solid var(--cy); outline-offset: 3px; }
`;

function Orbe({ taille, anneaux = true }) {
  return (
    <div className="relative" style={{ width: taille, height: taille }} aria-hidden="true">
      {anneaux && <span className="jv-ring" />}
      {anneaux && <span className="jv-ring r2" />}
      <div className="jv-orb h-full w-full" />
    </div>
  );
}

function Boutons({ centre }) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${centre ? 'sm:justify-center' : ''}`}>
      <a href={CALENDLY} target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center justify-center rounded-full bg-[#ECEAF5] px-7 py-3.5 text-[15px] font-semibold text-[#0b0716] transition-colors hover:bg-white">
        Réserver 30 min avec Alexis
      </a>
      <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--hair)] px-7 py-3.5 text-[15px] font-medium text-[var(--tx)] transition-colors hover:border-[var(--li)]">
        <MessageCircle size={16} strokeWidth={1.8} /> En parler sur WhatsApp
      </a>
    </div>
  );
}

function Point({ titre, desc, align = 'left' }) {
  return (
    <div className={align === 'right' ? 'text-right' : ''}>
      <p className="text-[15px] font-semibold text-[var(--tx)]">{titre}</p>
      <p className="mt-0.5 text-sm leading-snug text-[var(--mu)]">{desc}</p>
    </div>
  );
}

// Schéma desktop : l'orbe au centre, les fils dessinés en SVG vers chaque entrée et chaque branche.
function SchemaLarge() {
  const fil = 'rgba(192,132,252,.35)';
  return (
    <div className="relative mx-auto hidden h-[620px] max-w-5xl lg:block">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1000 620" preserveAspectRatio="none" aria-hidden="true">
        {ENTREES.map((e) => {
          const y = (e.y / 100) * 620;
          return <path key={e.titre} d={`M 300 ${y} C 360 ${y}, 380 310, 425 310`} fill="none" stroke={fil} strokeWidth="1" vectorEffect="non-scaling-stroke" />;
        })}
        {BRANCHES.map((b) => {
          const y = (b.y / 100) * 620;
          return (
            <g key={b.titre}>
              <path d={`M 575 310 C 615 310, 620 ${y}, 660 ${y}`} fill="none" stroke={fil} strokeWidth="1" vectorEffect="non-scaling-stroke" />
              <circle cx="660" cy={y} r="2.5" fill="#7ff3ff" />
            </g>
          );
        })}
      </svg>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"><Orbe taille={150} /></div>

      {ENTREES.map((e) => (
        <div key={e.titre} className="absolute left-0 w-[28%] -translate-y-1/2" style={{ top: `${e.y}%` }}>
          <Point {...e} align="right" />
        </div>
      ))}
      {BRANCHES.map((b) => (
        <div key={b.titre} className="absolute right-0 w-[32%] -translate-y-1/2" style={{ top: `${b.y}%` }}>
          <Point {...b} />
        </div>
      ))}

      <p className={`${serif.className} absolute left-0 top-0 w-[28%] text-right text-2xl italic text-[var(--li)]`}>ce qu'elle entend</p>
      <p className={`${serif.className} absolute bottom-[-2.5rem] right-0 w-[32%] text-2xl italic text-[var(--li)]`}>ce qu'elle pilote</p>
    </div>
  );
}

// Schéma mobile : un fil vertical qui descend de l'orbe.
function SchemaEtroit() {
  const Liste = ({ titre, items }) => (
    <div className="relative border-l border-[var(--hair)] pl-6">
      <p className={`${serif.className} -ml-6 mb-5 pl-6 text-2xl italic text-[var(--li)]`}>{titre}</p>
      <ul className="space-y-5">
        {items.map((i) => (
          <li key={i.titre} className="relative">
            <span className="absolute -left-[27.5px] top-2 h-[5px] w-[5px] rounded-full bg-[#7ff3ff]" aria-hidden="true" />
            <Point {...i} />
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <div className="lg:hidden">
      <div className="-ml-[19.5px]"><Orbe taille={40} anneaux={false} /></div>
      <div className="space-y-0 [&>div]:pt-8">
        <Liste titre="ce qu'elle entend" items={ENTREES} />
        <Liste titre="ce qu'elle pilote" items={BRANCHES} />
      </div>
    </div>
  );
}

export default function AssistantPage() {
  return (
    <main className="jv overflow-x-clip pb-28">
      <style>{CSS}</style>

      {/* Ouverture : l'orbe qui écoute, et la phrase. */}
      <section className="relative px-6 pt-32 md:pt-40">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <Orbe taille={168} />
          <h1 className={`${serif.className} mt-14 text-balance text-[44px] leading-[1.02] tracking-[-0.01em] md:text-[76px]`}>
            Je pilote mon entreprise <span className="italic">à la voix.</span>
          </h1>
          <p className="mt-6 max-w-[34rem] text-balance text-[17px] leading-relaxed text-[var(--mu)]">
            Jarvis, c'est mon assistante. Elle lit mes conversations, mon agenda et mes mails,
            règle mes campagnes de prospection et me rappelle ce que je ne dois pas oublier.
          </p>
          <div className="mt-10"><Boutons centre /></div>
        </div>
      </section>

      {/* Elle se présente elle-même. */}
      <section className="px-6 pt-28 md:pt-36">
        <div className="mx-auto grid max-w-4xl items-center gap-12 md:grid-cols-[300px_1fr] md:gap-16">
          <div className="mx-auto w-full max-w-[300px] overflow-hidden rounded-[32px] border border-[var(--hair)] bg-black p-1.5 shadow-[0_30px_80px_-30px_rgba(168,85,247,.6)]">
            <video src={VIDEO} poster={POSTER} controls playsInline preload="none" className="aspect-[9/16] w-full rounded-[26px] bg-black object-cover" />
          </div>
          <div>
            <p className={`${serif.className} text-balance text-[34px] leading-[1.1] md:text-[44px]`}>
              <span className="italic">« Je ne me contente pas de répondre. Je fais avancer les choses. »</span>
            </p>
            <p className="mt-5 max-w-md text-[var(--mu)]">
              Cinquante secondes, sa voix, sans montage : elle explique elle-même ce qu'elle fait pour moi chaque jour.
            </p>
          </div>
        </div>
      </section>

      {/* Le schéma. */}
      <section className="px-6 pt-32 md:pt-40">
        <div className="mx-auto max-w-5xl">
          <h2 className={`${serif.className} mb-16 max-w-xl text-balance text-[38px] leading-[1.05] md:text-[52px]`}>
            Comment elle est branchée.
          </h2>
          <SchemaLarge />
          <SchemaEtroit />
        </div>
      </section>

      {/* Une journée, telle qu'elle se parle. */}
      <section className="px-6 pt-36 md:pt-44">
        <div className="mx-auto max-w-3xl">
          <h2 className={`${serif.className} mb-16 text-balance text-[38px] leading-[1.05] md:text-[52px]`}>
            Une journée ordinaire.
          </h2>
          <ol className="relative border-l border-[var(--hair)]">
            {JOURNEE.map((j) => (
              <li key={j.h} className="relative pb-14 pl-8 last:pb-0 md:pl-12">
                <span className="absolute -left-[4px] top-[0.55rem] h-[7px] w-[7px] rounded-full bg-[var(--vi)]" aria-hidden="true" />
                <p className="text-sm tabular-nums text-[var(--mu)]">{j.h}</p>
                {j.moi ? (
                  <p className={`${serif.className} mt-2 text-balance text-[28px] italic leading-[1.15] md:text-[36px]`}>« {j.moi} »</p>
                ) : (
                  <p className={`${serif.className} mt-2 text-[28px] italic leading-[1.15] text-[var(--mu)] md:text-[36px]`}>Le brief arrive sur WhatsApp.</p>
                )}
                <div className="mt-4 flex max-w-xl items-start gap-3">
                  <span className="jv-orb mt-1 h-3.5 w-3.5 flex-shrink-0" style={{ animation: 'none' }} aria-hidden="true" />
                  <p className="text-[15px] leading-relaxed text-[#c9c6d6]">
                    <span className="sr-only">Jarvis : </span>{j.elle}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* La règle d'or, puis le reste. */}
      <section className="px-6 pt-36 md:pt-44">
        <div className="mx-auto max-w-3xl">
          <p className={`${serif.className} text-balance text-[40px] leading-[1.05] md:text-[60px]`}>
            Rien ne part sans mon accord.
          </p>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-[var(--mu)]">
            Avant chaque message, chaque mail, chaque rendez-vous déplacé, elle me relit ce qu'elle va faire et attend mon « oui ».
          </p>
          <ul className="mt-12 divide-y divide-[var(--hair)] border-y border-[var(--hair)]">
            {REGLES.map((r) => (
              <li key={r} className="py-4 text-[15px] text-[var(--tx)]">{r}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Fin. */}
      <section className="px-6 pt-36 md:pt-44">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Orbe taille={64} anneaux={false} />
          <h2 className={`${serif.className} mt-10 text-balance text-[38px] leading-[1.05] md:text-[56px]`}>
            Vous voulez la même pour votre entreprise ?
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-balance text-[var(--mu)]">
            On regarde ensemble ce qu'elle pourrait prendre en charge chez vous : prospection, relances,
            rendez-vous, suivi client. 30 minutes, sans engagement.
          </p>
          <div className="mt-10"><Boutons centre /></div>
        </div>
      </section>
    </main>
  );
}
