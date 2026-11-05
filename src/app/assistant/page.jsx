import { ArrowRight, Calendar, Mail, MessageCircle, Linkedin, Instagram, Users, LayoutDashboard, Mic, Sun, ShieldCheck, Bell, Check } from 'lucide-react';

// Page publique « Jarvis » (05/11/2026) : envoyée en privé à ceux qui commentent JARVIS sous les posts d'Alexis.
// Montre comment l'assistante vocale est branchée, sans aucun détail technique sensible.

export const metadata = {
  title: 'Jarvis, l\'assistante vocale qui pilote une entreprise · SmatchRoom Pulse',
  description:
    "Le schéma de Jarvis : l'assistante vocale d'Alexis Fontana qui gère la prospection, l'agenda, les mails et les relances de SmatchRoom Pulse. Rien ne part sans accord.",
  openGraph: {
    title: 'Jarvis : je pilote mon entreprise à la voix',
    description: "Comment l'assistante vocale de SmatchRoom Pulse est branchée, et ce qu'elle fait dans une journée.",
  },
};

const CALENDLY = 'https://calendly.com/a-fontana-smatchroom/30min';
const WHATSAPP = `https://wa.me/33771487698?text=${encodeURIComponent("Bonjour Alexis, j'ai vu Jarvis et j'aimerais en parler pour mon entreprise.")}`;
const VIDEO = 'https://cdn.jsdelivr.net/gh/afontana33/smatchroom-pulse-vitrine@pub-assets/reels/reel-jarvis-presentation.mp4';

const ENTREES = [
  { icon: Mic, titre: 'Ma voix', desc: 'Je lui parle comme à un bras droit, depuis mon téléphone ou mon ordinateur.' },
  { icon: Sun, titre: 'Le brief de 8 h 30', desc: 'Chaque matin, elle m\'envoie sur WhatsApp ce qui compte aujourd\'hui.' },
  { icon: Bell, titre: 'Les alertes', desc: 'Un agent silencieux, un compte déconnecté : je le sais tout de suite.' },
];

const BRANCHES = [
  { icon: MessageCircle, titre: 'WhatsApp', desc: 'Lire une conversation, répondre, envoyer un message.' },
  { icon: Linkedin, titre: 'LinkedIn', desc: 'Suivre les échanges et répondre aux prospects.' },
  { icon: Instagram, titre: 'Instagram', desc: 'Valider les publications, suivre les messages privés.' },
  { icon: Calendar, titre: 'Agenda', desc: 'Lire ma journée, créer ou déplacer un rendez-vous.' },
  { icon: Mail, titre: 'Mails', desc: 'Résumer les mails importants, répondre, en écrire un.' },
  { icon: Users, titre: 'Agents de prospection', desc: 'Pause, reprise, volume d\'envoi par jour, pour moi et pour mes clients.' },
  { icon: LayoutDashboard, titre: 'Tableau de bord', desc: 'Leads à rappeler, réponses, tâches, campagnes qui marchent.' },
];

const JOURNEE = [
  { h: '8 h 30', dit: 'Le brief arrive sur WhatsApp', fait: 'Trois personnes à rappeler, une tâche urgente, deux publications à valider.' },
  { h: '9 h 10', dit: '« Qui m\'a répondu ce matin ? »', fait: 'Elle résume les réponses de la nuit et me dit lesquelles attendent un appel.' },
  { h: '11 h 00', dit: '« Décale mon rendez-vous de 14 h à jeudi. »', fait: 'Elle vérifie que le créneau est libre, me relit le changement, puis le fait.' },
  { h: '14 h 30', dit: '« Fais-moi le bilan des campagnes. »', fait: 'Ce qui répond, ce qui ne répond pas, et ce qu\'elle propose de changer.' },
  { h: '17 h 45', dit: '« J\'ai eu le client, il veut un devis lundi. »', fait: 'Elle enregistre le compte rendu sur sa fiche et me programme un rappel.' },
];

const REGLES = [
  'Rien ne part sans mon accord : elle me relit chaque message et attend mon « oui ».',
  'Elle ne touche ni aux paiements ni aux factures.',
  'Les données restent sur nos serveurs, rien n\'est revendu.',
  'Elle se souvient de mes notes d\'un jour à l\'autre.',
];

function Carte({ icon: Icon, titre, desc }) {
  return (
    <div className="glass flex gap-4 rounded-2xl p-5">
      <div className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--primary-soft)] text-[var(--primary-hover)] ring-1 ring-[var(--border-strong)]">
        <Icon size={18} strokeWidth={1.8} />
      </div>
      <div>
        <h3 className="font-semibold text-white">{titre}</h3>
        <p className="mt-1 text-sm text-[var(--muted)]">{desc}</p>
      </div>
    </div>
  );
}

function Boutons() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <a href={CALENDLY} target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-6 py-3 font-semibold text-black transition hover:bg-[var(--primary-hover)]">
        Réserver 30 min avec Alexis <ArrowRight size={16} />
      </a>
      <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
        className="glass inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold text-white">
        <MessageCircle size={16} /> En parler sur WhatsApp
      </a>
    </div>
  );
}

export default function AssistantPage() {
  return (
    <main className="pb-24">
      <section className="px-6 pt-32 pb-16">
        <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="eyebrow">Jarvis · l'assistante de SmatchRoom Pulse</p>
            <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
              <span className="gradient-text">Je pilote mon entreprise à la voix.</span>
            </h1>
            <p className="mt-5 text-balance text-lg text-[var(--muted)]">
              Jarvis lit mes conversations, mon agenda et mes mails, règle mes campagnes de prospection
              et me rappelle ce que je ne dois pas oublier. Voici comment elle est branchée.
            </p>
            <div className="mt-8"><Boutons /></div>
          </div>
          <div className="mx-auto w-full max-w-[300px] overflow-hidden rounded-[28px] border border-[var(--border-strong)] shadow-[0_0_60px_-10px_var(--primary-glow)]">
            <video src={VIDEO} controls playsInline preload="metadata" className="aspect-[9/16] w-full bg-black object-cover" />
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <p className="eyebrow">Le schéma</p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">Ce qui entre, ce qu'elle pilote.</h2>
          </div>
          <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto_1.3fr]">
            <div className="space-y-4">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--primary)]">Elle écoute</p>
              {ENTREES.map((e) => <Carte key={e.titre} {...e} />)}
            </div>
            <div className="flex justify-center py-6">
              <div className="relative flex h-40 w-40 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[radial-gradient(circle_at_35%_30%,#7ff3ff_0%,#4fa8ff_35%,#7b4dff_75%,#1a1040_100%)] shadow-[0_0_80px_-5px_var(--primary-glow)]">
                <span className="text-xl font-semibold tracking-[0.25em] text-white drop-shadow">JARVIS</span>
              </div>
            </div>
            <div className="space-y-3">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--primary)]">Elle pilote</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {BRANCHES.map((b) => <Carte key={b.titre} {...b} />)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <p className="eyebrow">Une journée avec Jarvis</p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">Je parle, elle fait.</h2>
          </div>
          <ol className="space-y-4">
            {JOURNEE.map((j) => (
              <li key={j.h} className="glass grid gap-2 rounded-2xl p-5 sm:grid-cols-[90px_1fr]">
                <span className="font-mono text-sm text-[var(--primary-hover)]">{j.h}</span>
                <div>
                  <p className="font-semibold text-white">{j.dit}</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">{j.fait}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-3xl">
          <div className="glass rounded-2xl p-8">
            <div className="mb-5 flex items-center gap-3">
              <ShieldCheck className="text-[var(--primary-hover)]" size={22} />
              <h2 className="text-2xl font-semibold tracking-tight text-white">Les règles</h2>
            </div>
            <ul className="space-y-3">
              {REGLES.map((r) => (
                <li key={r} className="flex gap-3 text-[var(--foreground)]">
                  <Check size={16} className="mt-1 flex-shrink-0 text-[var(--primary-hover)]" strokeWidth={2.5} />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            <span className="gradient-text">Vous voulez la même pour votre entreprise ?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-balance text-[var(--muted)]">
            On regarde ensemble ce qu'elle pourrait prendre en charge chez vous : prospection, relances,
            rendez-vous, suivi client. 30 minutes, sans engagement.
          </p>
          <div className="mt-8 flex justify-center"><Boutons /></div>
        </div>
      </section>
    </main>
  );
}
