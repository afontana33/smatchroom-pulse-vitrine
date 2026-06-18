import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Conditions Générales de Vente — SmatchRoom Pulse',
  description: "Conditions Générales de Vente et de Service de SmatchRoom Pulse, à destination exclusive d'une clientèle professionnelle (B2B).",
};

const ARTICLES = [
  {
    title: 'Article 1 — Objet et cadre strictement B2B',
    paragraphs: [
      "Les présentes Conditions Générales de Vente et de Service (« CGV ») régissent les relations contractuelles entre la société SMATCHROOM SAS et ses clients agissant exclusivement dans le cadre de leur activité professionnelle (artisans, commerçants, professions libérales, franchises, entreprises).",
      "Le client reconnaît qu'en tant que professionnel, le Code de la consommation ne s'applique pas aux présentes relations, notamment concernant le droit de rétractation qui est expressément exclu.",
    ],
  },
  {
    title: 'Article 2 — Le Vendeur',
    paragraphs: [
      'SMATCHROOM SAS — RCS Bordeaux 989 883 509 — TVA FR01 989 883 509 — Siège social : 5 rue Fénelon, 33000 Bordeaux, France — Email : a.fontana@smatchroom.fr',
    ],
  },
  {
    title: 'Article 3 — Description des Prestations',
    paragraphs: [
      "Pulse fournit une infrastructure d'acquisition et de productivité basée sur l'Intelligence Artificielle. L'offre se compose obligatoirement de deux volets indissociables :",
    ],
    list: [
      "3.1 La Prestation de Configuration et Déploiement (Le « Setup ») : Prestation unique comprenant le développement, le paramétrage initial, l'intégration des API et la mise en ligne de l'agent IA personnalisé connecté aux canaux du client (Mail, WhatsApp, etc.).",
      "3.2 L'Abonnement de Maintenance et d'Infrastructure : Service mensuel récurrent comprenant l'hébergement de l'agent IA, la maintenance technique, les ajustements algorithmiques et la mise à disposition du tableau de bord Pulse.",
    ],
  },
  {
    title: 'Article 4 — Tarifs et Modalités Financières',
    list: [
      "4.1 Prix : Les prix sont stipulés en Euros et Hors Taxes (HT). Ils sont majorés de la TVA au taux en vigueur au jour de la facturation (20 % pour la France). Le tarif applicable est celui validé sur le devis accepté par le client.",
      "4.2 Facturation et Paiement : Les frais de Setup et le premier mois d'abonnement sont facturés dès la signature du devis et payables immédiatement pour lancer le développement. Les mensualités suivantes de l'abonnement sont prélevées automatiquement chaque mois à la date anniversaire du contrat via le système de paiement sécurisé (Stripe / Qonto).",
      "4.3 Pénalités de retard : Tout retard de paiement entraîne de plein droit l'application de pénalités de retard égales à trois fois le taux d'intérêt légal, ainsi qu'une indemnité forfaitaire de 40 € pour frais de recouvrement. Pulse se réserve le droit de suspendre l'accès à l'agent IA en cas de non-paiement sous 48 heures après relance.",
    ],
  },
  {
    title: 'Article 5 — Durée et Résiliation',
    paragraphs: [
      "L'abonnement est conclu pour une durée d'un (1) mois, renouvelable tacitement par périodes successives d'un mois.",
      "Le contrat est sans engagement de durée. Le client peut y mettre fin à tout moment, sans frais, par simple notification écrite (email à a.fontana@smatchroom.fr) au moins cinq (5) jours ouvrés avant la date du prochain prélèvement. Le mois entamé reste intégralement dû.",
    ],
  },
  {
    title: "Article 6 — Propriété Intellectuelle et Licence d'exploitation",
    list: [
      "6.1 Propriété de Pulse : SMATCHROOM SAS conserve l'entière propriété intellectuelle du code source, des algorithmes, des architectures de prompts et de l'infrastructure technologique servant à faire tourner l'agent IA.",
      "6.2 Licence client : Il est concédé au client une licence d'exploitation exclusive de son agent IA sur sa zone géographique d'activité pour la durée de l'abonnement. Le client s'interdit de copier, revendre, sous-louer ou distribuer la technologie Pulse à des tiers.",
    ],
  },
  {
    title: 'Article 7 — Limitation de Responsabilité',
    list: [
      "7.1 Obligations de moyens : Pulse est soumis à une obligation de moyens. L'agent IA est un outil d'aide à l'acquisition. Pulse ne peut garantir un chiffre d'affaires minimum ou un nombre exact de chantiers signés par le client.",
      "7.2 Plateformes tierces (Meta, WhatsApp, Google) : L'agent IA s'appuie sur des infrastructures et des API tierces. Pulse ne pourra en aucun cas être tenu responsable en cas de modification des conditions d'utilisation, de panne, de ralentissement ou de blocage de compte par des plateformes comme WhatsApp (Meta), Google ou les fournisseurs de modèles d'IA (Anthropic, OpenAI).",
      "7.3 Plafond de responsabilité : Si la responsabilité de SMATCHROOM SAS devait être engagée, le montant total des indemnités ne pourra excéder les sommes effectivement versées par le client à Pulse au cours des trois (3) derniers mois.",
    ],
  },
  {
    title: 'Article 8 — Force Majeure',
    paragraphs: [
      "Aucune partie ne sera tenue pour responsable de l'inexécution de ses obligations en cas de force majeure (blocage des réseaux de télécommunication, cyberattaque massive, décision gouvernementale ou modification brutale des API de régulation de l'IA).",
    ],
  },
  {
    title: 'Article 9 — Loi applicable et Attribution de Juridiction',
    paragraphs: [
      "Les présentes CGV sont régies par le droit français. Tout litige relatif à leur interprétation, leur exécution ou leur résiliation sera soumis à la compétence exclusive du Tribunal de Commerce de Bordeaux, nonobstant pluralité de défendeurs ou appel en garantie.",
    ],
  },
];

export default function CGVPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-[var(--background)] px-6 py-32 text-[var(--foreground)]">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow">Cadre contractuel</p>
          <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            <span className="gradient-text">Conditions Générales de Vente et de Service</span>
          </h1>
          <p className="mt-2 text-sm text-[var(--muted)]">SmatchRoom Pulse (B2B)</p>

          <div className="mt-8 space-y-1 font-mono text-xs text-[var(--muted)]">
            <p>Date d'entrée en vigueur : 18 juin 2026</p>
            <p>Dernière mise à jour : 18 juin 2026</p>
          </div>

          <div className="mt-12 space-y-10">
            {ARTICLES.map(({ title, paragraphs, list }) => (
              <section key={title} className="glass rounded-2xl p-6 md:p-8">
                <h2 className="text-lg font-semibold text-white">{title}</h2>
                {paragraphs?.map((p, i) => (
                  <p key={i} className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                    {p}
                  </p>
                ))}
                {list && (
                  <ul className="mt-3 space-y-3">
                    {list.map((item, i) => (
                      <li key={i} className="text-sm leading-relaxed text-[var(--muted)]">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
