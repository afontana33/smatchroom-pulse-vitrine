import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Politique de Confidentialité — SmatchRoom Pulse',
  description: 'Politique de confidentialité et de protection des données personnelles de SmatchRoom Pulse.',
};

const SECTIONS = [
  {
    title: '1. Responsable de traitement',
    paragraphs: [
      "La société SMATCHROOM SAS, sise 5 rue Fénelon, 33000 Bordeaux, est responsable du traitement des données personnelles collectées dans le cadre de l'utilisation de l'infrastructure Pulse.",
    ],
  },
  {
    title: '2. Données collectées',
    paragraphs: ['Dans le cadre de nos services B2B, nous collectons :'],
    list: [
      "Données d'identification : Nom du contact, email professionnel, numéro de téléphone, nom de l'entreprise.",
      "Données techniques : Logs de connexion, adresses IP nécessaires au fonctionnement des agents IA, données de configuration des outils tiers (API).",
      "Données de prospection : Nous traitons, pour le compte de nos clients (en tant que sous-traitant), les données nécessaires à l'automatisation de leurs campagnes (listes de prospects, messages, retours).",
    ],
  },
  {
    title: '3. Finalité du traitement',
    paragraphs: ['Les données sont collectées pour :'],
    list: [
      "L'exécution du contrat (fourniture de l'agent IA).",
      'La maintenance et l\'amélioration de nos algorithmes.',
      'La sécurité des infrastructures et la lutte contre la fraude informatique.',
    ],
  },
  {
    title: '4. Conservation des données',
    paragraphs: [
      "Les données professionnelles sont conservées pendant toute la durée de l'abonnement. À la résiliation du contrat, les données spécifiques au client (listes de prospects, historique des échanges) sont supprimées ou restituées sur demande, sauf obligation légale de conservation (factures).",
    ],
  },
  {
    title: '5. Sécurité et confidentialité',
    paragraphs: [
      "SMATCHROOM SAS s'engage à mettre en œuvre les mesures techniques et organisationnelles appropriées pour protéger les données contre toute intrusion, perte ou accès non autorisé. Nos accès aux outils tiers (Google/Meta) sont strictement limités au fonctionnement de l'agent IA.",
    ],
  },
  {
    title: '6. Vos droits',
    paragraphs: [
      'Conformément au RGPD, vous disposez d\'un droit d\'accès, de rectification et d\'effacement de vos données personnelles. Vous pouvez exercer ces droits en contactant : a.fontana@smatchroom.fr.',
    ],
  },
  {
    title: '7. Transfert de données',
    paragraphs: [
      'SMATCHROOM SAS ne vend ni ne loue les données personnelles à des tiers. Les données peuvent transiter via des outils de traitement conformes aux standards de sécurité en vigueur (Stripe, serveurs cloud sécurisés).',
    ],
  },
];

export default function ConfidentialitePage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-[var(--background)] px-6 py-32 text-[var(--foreground)]">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow">Protection des données</p>
          <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            <span className="gradient-text">Politique de Confidentialité</span>
          </h1>
          <p className="mt-2 text-sm text-[var(--muted)]">SmatchRoom Pulse</p>

          <div className="mt-8 font-mono text-xs text-[var(--muted)]">
            <p>Dernière mise à jour : 18 juin 2026</p>
          </div>

          <div className="mt-12 space-y-10">
            {SECTIONS.map(({ title, paragraphs, list }) => (
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
