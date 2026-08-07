import { ArrowRight, Check, HardHat, Mail, MapPin, Calendar } from 'lucide-react';
import Reveal from '@/components/Reveal';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Pulse pour les artisans du bâtiment — SmatchRoom Pulse',
  description:
    "Un agent IA qui démarche vos apporteurs d'affaires (notaires, syndics, maîtres d'œuvre, architectes) pendant que vous êtes sur vos chantiers. 300 € HT de création puis 190 € HT/mois, sans engagement.",
  openGraph: {
    title: 'Pulse pour les artisans du bâtiment',
    description:
      "L'agent IA qui prospecte vos apporteurs d'affaires et remplit votre agenda. Opérationnel sous 48h. 300 € HT de création puis 190 € HT/mois, sans engagement.",
  },
};

const CALENDLY = 'https://calendly.com/a-fontana-smatchroom/30min';

const BENEFITS = [
  {
    icon: HardHat,
    nickname: 'Brique 1 · Agent IA',
    title: "L'Agent de Prospection B2B (Votre commercial virtuel)",
    desc: "L'agent Pulse scanne votre région, identifie les meilleurs apporteurs d'affaires (notaires, régies de copropriété, maîtres d'œuvre, architectes, constructeurs) et engage la conversation directement par mail ou WhatsApp avec votre numéro. Il qualifie l'intérêt et vous transfère le contact chaud. Vous n'avez plus qu'à signer le partenariat.",
  },
  {
    icon: Mail,
    nickname: 'Brique 1 · Agent IA',
    title: 'Une réactivité commerciale maximale (Zéro lead perdu)',
    desc: "Un client ou un partenaire vous contacte pour un devis ? L'agent interne traite les messages entrants en moins d'une heure, répond aux questions basiques et met à jour votre agenda. Vos clients obtiennent une réponse immédiate, même quand vous êtes sur une échelle ou en rendez-vous.",
  },
  {
    icon: MapPin,
    nickname: 'Brique 2 · Site & fiche Google',
    title: 'Un ancrage local puissant sur Google',
    desc: "On crée votre site et votre fiche établissement Google, puis on les tient à jour : photos de chantier, horaires, zone d'intervention, réponses aux avis. C'est ce qui vous fait ressortir dans votre ville quand un professionnel ou un particulier cherche votre corps de métier en urgence.",
  },
];

export default function CommercesPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">

      {/* Hero */}
      <section className="relative overflow-hidden grain px-5 pb-24 pt-36 sm:px-6">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="animate-mesh absolute -right-40 -top-40 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(255,90,31,0.16),transparent_60%)] blur-3xl" />
          <div className="animate-mesh absolute -left-32 top-24 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(255,176,122,0.16),transparent_60%)] blur-3xl [animation-delay:-8s]" />
        </div>
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--primary-soft)] px-4 py-1.5 font-mono text-xs uppercase tracking-[0.18em] text-[var(--primary-ink)]">
            <HardHat size={14} />
            <span>Pour les artisans & entrepreneurs du bâtiment</span>
          </div>
          <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            <span className="gradient-text">Le premier Agent IA qui démarche vos apporteurs d'affaires</span>{' '}
            <span className="text-[var(--foreground)]">en arrière-plan.</span>
          </h1>
          <h3 className="mt-4 text-balance text-xl font-medium text-[var(--muted-strong)] md:text-2xl">
            Rentabilisé dès votre premier chantier.
          </h3>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-lg text-[var(--muted-strong)]">
            Vous êtes artisan, entrepreneur ou dirigeant de réseau ? Vous n'avez pas le temps de courir après les agences immobilières, les maîtres d'œuvre ou les architectes pour remplir votre carnet de commandes.{' '}
            <span className="font-medium text-[var(--foreground)]">Pulse déploie pour vous un commercial virtuel sur-mesure qui s'en occupe 24h/24.</span>{' '}
            Pendant que vous êtes sur vos chantiers, votre IA prospecte, relance et remplit votre agenda.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3">
            <div className="text-xl font-semibold text-[var(--foreground)]">
              <span className="text-[var(--primary-ink)]">300 €</span> de création{' '}
              <span className="text-[var(--muted)]">+</span>{' '}
              <span className="text-[var(--primary-ink)]">190 €/mois</span>
            </div>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary group inline-flex items-center gap-2 px-7 py-3.5 font-medium"
            >
              <Calendar size={18} />
              Réserver 30 min (gratuit)
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--muted)]">
              Visio · Sans engagement · Opérationnel sous 48h
            </p>
          </div>
        </div>
      </section>

      {/* Bénéfices */}
      <section className="px-5 pb-28 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="mb-14 text-center">
              <p className="eyebrow">Ce que ça fait concrètement</p>
              <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                <span className="gradient-text">Il prospecte,</span> vous vous concentrez sur vos chantiers.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-balance text-[var(--muted-strong)]">
                Trois agents IA spécialisés. Choisissez le premier agent que vous souhaitez déployer dans votre entreprise :
              </p>
            </div>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {BENEFITS.map(({ icon: Icon, nickname, title, desc }, i) => (
              <Reveal key={title} delay={i * 90}>
                <div className="card card-hover grain relative flex h-full flex-col overflow-hidden p-7">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary-soft)] text-[var(--primary-ink)] ring-1 ring-[var(--primary-line)]">
                      <Icon size={22} strokeWidth={1.8} />
                    </div>
                    <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                      Agent {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--primary-ink)]">
                    {nickname}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-[var(--foreground)]">{title}</h3>
                  <p className="mt-3 text-sm text-[var(--muted-strong)]">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Réassurance technique */}
      <section className="px-5 pb-28 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <div className="showcase-dark grain relative overflow-hidden rounded-2xl p-8 md:p-10">
              <div className="relative">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--primary)]">
                  Infrastructure · Node.js & Supabase · Hébergement souverain
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-white md:text-3xl">
                  Une technologie industrielle, testée et approuvée sur le terrain.
                </h3>
                <p className="mt-4 text-[var(--on-ink-muted)]">
                  Nous ne vendons pas une promesse de "Chatbot" générique ou d'usines à gaz en no-code qui cassent à la première mise à jour. Pulse conçoit des agents IA robustes codés en natif (Node.js / Supabase), directement connectés à vos outils du quotidien (Mail, WhatsApp, CRM) et hébergés sur nos propres serveurs sécurisés. Déjà plus de 30 structures, de l'artisan indépendant jusqu'à des concessions de réseaux nationaux comme Tryba, utilisent nos moteurs d'acquisition pour automatiser leur croissance locale et saturer leur planning.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Tarif clair */}
      <section className="px-5 pb-28 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <div className="mb-12 text-center">
              <p className="eyebrow">Tarif</p>
              <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                <span className="gradient-text">Transparent, sans surprise.</span>
              </h2>
            </div>
          </Reveal>
          <Reveal>
            <div className="card p-8 md:p-10">
              <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-8">
                <div>
                  <p className="text-sm text-[var(--muted)]">Frais de création (setup)</p>
                  <p className="text-4xl font-semibold text-[var(--foreground)]">300 € HT</p>
                  <p className="text-xs text-[var(--muted)]">une seule fois</p>
                </div>
                <div className="hidden text-3xl text-[var(--border-strong)] sm:block">+</div>
                <div>
                  <p className="text-sm text-[var(--muted)]">Abonnement mensuel</p>
                  <p className="text-4xl font-semibold text-[var(--foreground)]">190 €<span className="text-lg font-normal text-[var(--muted)]">/mois HT</span></p>
                  <p className="text-xs text-[var(--muted)]">sans engagement</p>
                </div>
              </div>
              <ul className="mb-8 space-y-3">
                {[
                  'Agent Chasseur entraîné sur votre corps de métier et votre zone',
                  'Opérationnel sous 48h après le premier appel',
                  'Tableau de bord simple pour suivre ce qu\'il fait',
                  'Support disponible si vous avez une question',
                  'Vous pouvez arrêter quand vous voulez',
                ].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-[var(--muted-strong)]">
                    <Check size={15} className="flex-shrink-0 text-[var(--primary-ink)]" strokeWidth={2.5} />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mb-8 rounded-xl border border-[var(--border-strong)] bg-[var(--surface-2)] p-5">
                <p className="text-sm text-[var(--muted-strong)]">
                  Sur une année complète, le déploiement de votre Agent Chasseur vous coûte <span className="font-medium text-[var(--foreground)]">2 580 € HT</span>. Un seul chantier moyen décroché grâce à un partenaire (rénovation, électricité, menuiserie, peinture, plomberie) oscille entre <span className="font-medium text-[var(--foreground)]">3 000 € et 15 000 €</span>. Il suffit d'un seul contrat ou de quelques rendez-vous générés par l'IA dans l'année pour que l'agent soit 100 % rentabilisé. Tout le reste, c'est du bénéfice pur pour votre entreprise.
                </p>
              </div>
              <p className="text-xs text-[var(--muted)]">
                * Le tarif exact est confirmé lors du diagnostic de cadrage (30 min, offert). Il peut varier selon la complexité de votre besoin. Voir nos{' '}
                <a href="/cgv" className="underline hover:text-[var(--foreground)]">CGV</a>{' '}
                pour les détails, notamment concernant le délai de déploiement de 48h, son point de
                départ et ses conditions.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Témoignages */}
      <section className="px-5 pb-28 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="mb-10 text-center">
              <p className="eyebrow">Ils utilisent Pulse</p>
              <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight">
                <span className="gradient-text">Ce qu'ils en disent</span>
              </h2>
            </div>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                quote: "En trois semaines, l'assistant m'a mis en contact avec des promoteurs et des gestionnaires de copropriétés que je n'aurais jamais démarché seul. Ces partenaires m'ont déjà apporté plusieurs chantiers. Le retour sur investissement est là.",
                name: "Mathieu Lescut",
                role: "Franchisé Tryba · Pau",
              },
              {
                quote: "Je n'avais pas le temps de faire du réseau. J'ai branché l'agent Pulse la semaine dernière : il a décroché 3 nouveaux partenariats locaux avec des apporteurs d'affaires en seulement 7 jours. La machine tourne toute seule en arrière-plan.",
                name: "Karim Bensalem",
                role: "Plombier indépendant · Marseille",
              },
              {
                quote: "J'étais sceptique sur l'IA pour le bâtiment, mais les résultats sont indiscutables. L'agent a ciblé et contacté les syndics et agences immobilières de mes arrondissements cibles. Résultat : j'ai récupéré deux gros chantiers de rénovation complète en moins d'un mois.",
                name: "Valentin Girard",
                role: "Électricien · Paris",
              },
              {
                quote: "L'agent tourne pendant que je suis sur mes chantiers. Il m'a décroché des rendez-vous réguliers avec des maîtres d'œuvre sur la métropole lilloise. Mon planning est plein pour les 3 prochains mois, je recommande Pulse les yeux fermés.",
                name: "Benoît Mercier",
                role: "Peintre en bâtiment · Lille",
              },
            ].map(({ quote, name, role }) => (
              <div key={name} className="card card-hover p-8">
                <p className="text-sm leading-relaxed text-[var(--muted-strong)] italic">« {quote} »</p>
                <div className="mt-5 flex items-center gap-3 border-t border-[var(--border)] pt-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--primary-soft)] font-mono text-sm font-semibold text-[var(--primary-ink)] ring-1 ring-[var(--primary-line)]">
                    {name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--foreground)]">{name}</p>
                    <p className="text-xs text-[var(--muted)]">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="relative overflow-hidden px-5 pb-32 sm:px-6">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="animate-mesh absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,90,31,0.14),transparent_60%)] blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-3xl text-center">
          <Reveal>
            <div className="card grain relative overflow-hidden p-10 md:p-14">
              <p className="eyebrow">Première étape</p>
              <h2 className="mt-3 text-balance text-2xl font-semibold tracking-tight md:text-4xl">
                <span className="gradient-text">30 minutes pour voir si on peut saturer votre carnet de commandes.</span>
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-balance text-[var(--muted-strong)]">
                On étudie votre secteur géographique, on analyse vos concurrents et on vous explique ce qu'on peut brancher pour vous. Si votre zone est déjà prise par un autre artisan ou si ce n'est pas pertinent pour votre métier, on vous le dit aussi.
              </p>
              <div className="mt-8 flex flex-col items-center gap-3">
                <a
                  href={CALENDLY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary group inline-flex items-center gap-2 px-8 py-4 text-base font-medium"
                >
                  <Calendar size={18} />
                  Réserver mon créneau (Gratuit)
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </a>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                  30 min · Visio · Sans engagement · Le tarif exact est confirmé lors de ce diagnostic.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <Footer />
    </main>
  );
}
