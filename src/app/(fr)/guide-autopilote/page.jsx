/**
 * Guide « Mon autopilote d'acquisition » (01/11/2026) : document envoyé en message privé aux personnes
 * qui commentent le post LinkedIn d'Alexis. Montre ce qui tourne, sans donner la recette, et amène
 * à une conversation WhatsApp (reprise par l'agent) ou à un appel. Non indexé : réservé aux demandes.
 */
import Image from 'next/image';
import { CALENDLY } from '@/lib/contact';

export const metadata = {
  title: 'Mon autopilote d’acquisition · SmatchRoom Pulse',
  description: 'Les 7 automatisations qui trouvent nos clients pendant qu’on travaille.',
  robots: { index: false, follow: false },
};

const WA = 'https://wa.me/33771487698?text=' + encodeURIComponent('Bonjour Alexis, je viens du guide Autopilote sur LinkedIn. Je veux voir ce que ça donnerait pour mon activité.');

const BLOCS = [
  {
    t: 'La pub qui répond en 10 minutes',
    avant: 'Les formulaires de mes pubs Facebook arrivaient dans un coin de Meta. Certains attendaient des jours, d’autres n’étaient jamais rappelés.',
    apres: 'Chaque formulaire est récupéré dans les 10 minutes. La personne reçoit un premier message WhatsApp à mon nom, qui reprend ce qu’elle a demandé, et la conversation démarre pendant qu’elle a encore la tête dedans.',
  },
  {
    t: 'Le commercial qui écrit 20 messages par jour',
    avant: 'Prospecter, c’était le soir, quand j’avais encore de l’énergie. Autant dire rarement.',
    apres: 'Chaque jour, un agent écrit à une vingtaine de professionnels ciblés, en mon nom, sur WhatsApp. Il pose des questions, répond aux objections et me passe la main dès que quelqu’un veut un appel. Selon les campagnes, 20 à 40 % des personnes contactées répondent.',
  },
  {
    t: 'La relance qui n’oublie personne',
    avant: '« Je réfléchis et je reviens vers vous. » Et plus rien, parce que personne ne relançait.',
    apres: 'Un prospect intéressé qui ne répond plus depuis 3 jours reçoit une relance courte, qui reprend un détail précis de notre échange. S’il répond, la conversation repart toute seule.',
  },
  {
    t: 'Instagram qui travaille le soir',
    avant: 'Un post de temps en temps, quand j’y pensais, et aucun suivi des commentaires.',
    apres: 'Un contenu part chaque soir à heure fixe, en alternant vidéos face caméra, carrousels et démonstrations. Quelqu’un écrit le mot-clé en commentaire : il reçoit un message privé, et la discussion est lancée.',
  },
  {
    t: 'LinkedIn au bon moment',
    avant: 'Des messages envoyés à des listes froides, qui finissaient ignorés comme tous les autres.',
    apres: 'L’agent repère les entreprises qui montrent un signal : elles recrutent un commercial, viennent d’être créées, commentent un sujet lié au nôtre. Il leur écrit à ce moment précis, avec un message qui part de leur situation.',
  },
  {
    t: 'Des pubs surveillées toutes les heures',
    avant: 'Je regardais mes campagnes une fois par semaine, et je découvrais trop tard celles qui brûlaient du budget.',
    apres: 'Les chiffres de chaque pub sont relevés toutes les heures. Celles qui dépensent sans ramener de contacts sont coupées, avec un plafond de budget qui ne bouge jamais sans mon accord.',
  },
  {
    t: 'Le tableau de bord dans ma poche',
    avant: 'Des prospects éparpillés entre WhatsApp, Instagram, LinkedIn et ma boîte mail.',
    apres: 'Chaque prospect chaud m’arrive en alerte sur WhatsApp, avec le résumé de l’échange. Je réponds « vendu », « perdu » ou « relance » au même endroit, et le suivi se met à jour tout seul.',
  },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0b0912] px-4 pb-24 pt-16 text-[#f4f2fa]">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 flex items-center gap-3">
          <Image src="/brand/pulse-picto-clair.png" alt="" width={40} height={32} />
          <span className="text-sm font-extrabold uppercase tracking-[0.3em] text-[#b69cff]">SmatchRoom Pulse</span>
        </div>

        <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">Mon autopilote d’acquisition</h1>
        <p className="mt-6 text-xl leading-relaxed text-[#cdc9da]">
          Les 7 automatisations qui trouvent nos clients pendant qu’on travaille. Ce qu’elles font, et ce qu’elles ont changé.
        </p>
        <p className="mt-4 text-[#9a95ad]">Par Alexis Fontana, fondateur de SmatchRoom Pulse à Bordeaux.</p>

        <div className="mt-12 rounded-3xl border border-[#2a2440] bg-[#141020] p-6 md:p-8">
          <p className="text-lg leading-relaxed text-[#cdc9da]">
            Il y a quelques mois, mon acquisition dépendait de mon énergie du soir. Aujourd’hui, il ne me reste presque plus que deux choses à faire&nbsp;:
            <strong className="text-[#f4f2fa]"> appeler les personnes qui veulent me parler, et conclure.</strong> Tout le reste tourne sans moi.
          </p>
        </div>

        <ol className="mt-14 space-y-10">
          {BLOCS.map((b, i) => (
            <li key={b.t} className="rounded-3xl border border-[#2a2440] p-6 md:p-8">
              <p className="text-sm font-bold text-[#b69cff]">Automatisation {i + 1}</p>
              <h2 className="mt-2 text-2xl font-extrabold md:text-3xl">{b.t}</h2>
              <p className="mt-5 text-[#9a95ad]"><span className="font-bold text-[#cdc9da]">Avant.</span> {b.avant}</p>
              <p className="mt-3 text-lg leading-relaxed text-[#f4f2fa]"><span className="font-bold text-[#b69cff]">Maintenant.</span> {b.apres}</p>
            </li>
          ))}
        </ol>

        <div className="mt-16 rounded-3xl bg-[#b69cff] p-8 text-[#0b0912] md:p-10">
          <h2 className="text-3xl font-extrabold md:text-4xl">Vous voulez la même chose pour votre activité&nbsp;?</h2>
          <p className="mt-4 text-lg leading-relaxed">
            Chaque activité est différente&nbsp;: un artisan n’a pas besoin des mêmes automatisations qu’une agence ou qu’une PME qui vend aux entreprises.
            On regarde ensemble ce qui vous ferait gagner le plus, entre un agent de prospection qui écrit chaque jour en votre nom, et une automatisation sur mesure de votre acquisition.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a href={WA} className="rounded-full bg-[#0b0912] px-8 py-4 text-center text-lg font-extrabold text-[#f4f2fa]">M’écrire sur WhatsApp</a>
            <a href={CALENDLY} className="rounded-full border-2 border-[#0b0912] px-8 py-4 text-center text-lg font-extrabold">Réserver 15 minutes</a>
          </div>
        </div>

        <p className="mt-12 text-center text-sm text-[#9a95ad]">
          Plus de 170 entreprises accompagnées · <a href="/" className="underline">pulse.smatchroom.com</a>
        </p>
      </div>
    </main>
  );
}
