import { ArrowRight, Check, HardHat, Mail, MapPin, Calendar } from 'lucide-react';

export const metadata = {
  title: 'Pulse pour les artisans du bâtiment — SmatchRoom Pulse',
  description:
    "Un agent IA qui démarche vos apporteurs d'affaires (notaires, syndics, maîtres d'œuvre, architectes) pendant que vous êtes sur vos chantiers. À partir de 500 € + 150 €/mois.",
  openGraph: {
    title: 'Pulse pour les artisans du bâtiment',
    description:
      "L'agent IA qui prospecte vos apporteurs d'affaires et remplit votre agenda. Opérationnel sous 48h. À partir de 500 € + 150 €/mois.",
  },
};

const CALENDLY = 'https://calendly.com/a-fontana-smatchroom/30min';

const BENEFITS = [
  {
    icon: HardHat,
    title: "L'Agent de Prospection B2B (Votre commercial virtuel)",
    desc: "L'agent Pulse scanne votre région, identifie les meilleurs apporteurs d'affaires (notaires, régies de copropriété, maîtres d'œuvre, architectes, constructeurs) et engage la conversation directement par mail ou WhatsApp avec votre numéro. Il qualifie l'intérêt et vous transfère le contact chaud. Vous n'avez plus qu'à signer le partenariat.",
  },
  {
    icon: Mail,
    title: 'Une réactivité commerciale maximale (Zéro lead perdu)',
    desc: "Un client ou un partenaire vous contacte pour un devis ? L'agent traite les messages entrants en moins d'une heure, répond aux questions basiques et met à jour votre agenda. Vos clients obtiennent une réponse immédiate, même quand vous êtes sur une échelle ou en rendez-vous.",
  },
  {
    icon: MapPin,
    title: 'Un ancrage local puissant sur Google',
    desc: "L'agent optimise votre présence locale pour que votre entreprise ressorte en premier dans votre ville lorsque les professionnels ou les particuliers cherchent votre corps de métier en urgence.",
  },
];

export default function CommercesPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">

      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-24 pt-36">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.18),transparent_55%)]"
        />
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--primary-soft)] px-4 py-1.5 font-mono text-xs uppercase tracking-[0.18em] text-[var(--primary-hover)]">
            <HardHat size={14} />
            <span>Pour les artisans & entrepreneurs du bâtiment</span>
          </div>
          <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            <span className="gradient-text">Le premier Agent IA qui démarche vos apporteurs d'affaires</span>{' '}
            <span className="text-white">en arrière-plan.</span>
          </h1>
          <h3 className="mt-4 text-balance text-xl font-medium text-[var(--muted)] md:text-2xl">
            Rentabilisé dès votre premier chantier.
          </h3>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-lg text-[var(--muted)]">
            Vous êtes artisan, entrepreneur ou dirigeant de réseau ? Vous n'avez pas le temps de courir après les agences immobilières, les maîtres d'œuvre ou les architectes pour remplir votre carnet de commandes.{' '}
            <span className="text-white">Pulse déploie pour vous un commercial virtuel sur-mesure qui s'en occupe 24h/24.</span>{' '}
            Pendant que vous êtes sur vos chantiers, votre IA prospecte, relance et remplit votre agenda.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3">
            <div className="font-semibold text-white text-xl">
              À partir de <span className="gradient-text">500 €</span> d'installation{' '}
              <span className="text-[var(--muted)]">+</span>{' '}
              <span className="gradient-text">150 €/mois</span>
            </div>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-7 py-3.5 font-medium text-black transition-all hover:bg-[var(--primary-hover)] hover:shadow-[0_0_40px_-5px_var(--primary-glow)]"
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
      <section className="px-6 pb-28">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <p className="eyebrow">Ce que ça fait concrètement</p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              <span className="gradient-text">Il prospecte,</span> vous vous concentrez sur vos chantiers.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {BENEFITS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="glass rounded-2xl p-7">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary-soft)] text-[var(--primary-hover)] ring-1 ring-[var(--border-strong)]">
                  <Icon size={22} strokeWidth={1.8} />
                </div>
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm text-[var(--muted)]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Réassurance technique */}
      <section className="px-6 pb-28">
        <div className="mx-auto max-w-4xl">
          <div className="glass relative overflow-hidden rounded-2xl p-8 md:p-10">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_50%,var(--primary-soft),transparent_60%)]"
            />
            <div className="relative">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--primary)]">
                Infrastructure · Node.js & Supabase · Hébergement souverain
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-white md:text-3xl">
                Une technologie industrielle, testée et approuvée sur le terrain.
              </h3>
              <p className="mt-4 text-[var(--muted)]">
                Nous ne vendons pas une promesse de "Chatbot" générique ou d'usines à gaz en no-code qui cassent à la première mise à jour. Pulse conçoit des agents IA robustes codés en natif (Node.js / Supabase), directement connectés à vos outils du quotidien (Mail, WhatsApp, CRM) et hébergés sur vos propres serveurs sécurisés. Déjà plus de 30 structures — de l'artisan indépendant jusqu'à des concessions de réseaux nationaux comme Tryba — utilisent nos moteurs d'acquisition pour automatiser leur croissance locale et saturer leur planning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tarif clair */}
      <section className="px-6 pb-28">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <p className="eyebrow">Tarif</p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              <span className="gradient-text">Transparent, sans surprise.</span>
            </h2>
          </div>
          <div className="glass rounded-2xl p-8 md:p-10">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-8">
              <div>
                <p className="text-sm text-[var(--muted)]">Installation</p>
                <p className="text-4xl font-semibold text-white">500 €</p>
                <p className="text-xs text-[var(--muted)]">une seule fois, HT</p>
              </div>
              <div className="hidden text-3xl text-[var(--border-strong)] sm:block">+</div>
              <div>
                <p className="text-sm text-[var(--muted)]">Abonnement mensuel</p>
                <p className="text-4xl font-semibold text-white">150 €<span className="text-lg font-normal text-[var(--muted)]">/mois HT</span></p>
                <p className="text-xs text-[var(--muted)]">sans engagement</p>
              </div>
            </div>
            <ul className="mb-8 space-y-3">
              {[
                'Agent conçu sur-mesure pour votre corps de métier',
                'Opérationnel sous 48h après le premier appel',
                'Tableau de bord simple pour suivre ce qu\'il fait',
                'Support disponible si vous avez une question',
                'Vous pouvez arrêter quand vous voulez',
              ].map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-[var(--muted)]">
                  <Check size={15} className="flex-shrink-0 text-[var(--primary-hover)]" strokeWidth={2.5} />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mb-8 rounded-xl border border-[var(--border-strong)] bg-[var(--surface-2)] p-5">
              <p className="text-sm text-[var(--muted)]">
                Sur une année complète, votre infrastructure Pulse vous coûte <span className="text-white font-medium">2 300 € HT</span>. Un seul chantier moyen décroché grâce à un partenaire (rénovation, électricité, menuiserie, peinture, plomberie) oscille entre <span className="text-white font-medium">3 000 € et 15 000 €</span>. Il suffit d'un seul contrat ou de quelques rendez-vous générés par l'IA dans l'année pour que l'agent soit 100 % rentabilisé. Tout le reste, c'est du bénéfice pur pour votre entreprise.
              </p>
            </div>
            <p className="text-xs text-[var(--muted)]/60">
              * Le tarif exact est confirmé lors du diagnostic de cadrage (30 min, offert). Il peut varier selon la complexité de votre besoin. Voir nos{' '}
              <a href="/cgv" className="underline hover:text-[var(--muted)]">CGV</a>{' '}
              pour les détails, notamment concernant la garantie de déploiement sous 48h.
            </p>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="px-6 pb-28">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <p className="eyebrow">Ils utilisent Pulse</p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight">
              <span className="gradient-text">Ce qu'ils en disent</span>
            </h2>
          </div>
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
              <div key={name} className="glass rounded-2xl p-8">
                <p className="text-sm leading-relaxed text-[var(--muted)] italic">« {quote} »</p>
                <div className="mt-5 flex items-center gap-3 border-t border-[var(--border)] pt-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--primary-soft)] font-mono text-sm font-semibold text-[var(--primary-hover)]">
                    {name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{name}</p>
                    <p className="text-xs text-[var(--muted)]">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="relative overflow-hidden px-6 pb-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.14),transparent_60%)]"
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <div className="rounded-3xl border border-[var(--border-strong)] bg-gradient-to-b from-[var(--surface-2)] to-[var(--surface)] p-10 md:p-14">
            <p className="eyebrow">Première étape</p>
            <h2 className="mt-3 text-balance text-2xl font-semibold tracking-tight md:text-4xl">
              <span className="gradient-text">30 minutes pour voir si on peut saturer votre carnet de commandes.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-balance text-[var(--muted)]">
              On étudie votre secteur géographique, on analyse vos concurrents et on vous explique ce qu'on peut brancher pour vous. Si votre zone est déjà prise par un autre artisan ou si ce n'est pas pertinent pour votre métier, on vous le dit aussi.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3">
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-8 py-4 text-base font-medium text-black transition-all hover:bg-[var(--primary-hover)] hover:shadow-[0_0_40px_-5px_var(--primary-glow)]"
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
        </div>
      </section>
    </main>
  );
}
