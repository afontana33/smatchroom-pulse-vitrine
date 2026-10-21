/**
 * Simulateur gratuit : le visiteur voit les vrais prescripteurs que l'Agent
 * Partenaires contacterait dans sa ville, et les messages envoyés à son nom.
 *
 * Répond à l'objection « je veux tester avant » : la preuve est concrète et
 * immédiate, sans essai gratuit de l'agent. Logique dans components/lp/Simulateur.jsx,
 * recherche dans app/api/simulateur.
 */

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import { Breadcrumb, CheckList, FaqBlock, PageTitle, Section } from '@/components/seo/Blocks';
import Simulateur from '@/components/lp/Simulateur';
import { GARANTIE } from '@/lib/offers';
import { SITE_URL } from '@/lib/contact';
import { breadcrumbSchema, faqSchema, graph, webPageSchema } from '@/lib/schema';

const TITLE = 'Test gratuit : voyez quels partenaires l’agent contacterait pour vous · SmatchRoom Pulse';
const DESCRIPTION =
  'Indiquez votre activité et votre ville : voyez en moins d’une minute les agences, cabinets et '
  + 'professionnels de votre zone que l’Agent Partenaires contacterait à votre nom.';
const URL = `${SITE_URL}/simulateur`;

const FAQ = [
  {
    q: 'Les résultats sont-ils réels ?',
    a: 'Oui. Ce sont de vrais établissements de votre zone, trouvés à l’instant sur Google Maps, '
      + 'avec la même recherche que celle de l’agent. Une fois lancé, l’agent complète cette liste '
      + 'jusqu’à environ 300 professionnels par mois.',
  },
  {
    q: 'Puis-je tester l’agent gratuitement ?',
    a: 'Ce test est gratuit, une fois par entreprise. L’agent lui-même ne l’est pas, car chaque agent est construit '
      + 'pour vous : liste de partenaires, messages écrits avec vous, numéro WhatsApp dédié. '
      + 'En revanche, le premier mois sert de test : l’abonnement est sans engagement, sans frais '
      + `de création, et la garantie s’applique. ${GARANTIE}`,
  },
  {
    q: 'Combien coûte l’Agent Partenaires ?',
    a: '149 € HT par mois, sans frais de création et sans engagement.',
  },
  {
    q: 'Que faites-vous de mes coordonnées ?',
    a: 'Elles servent uniquement à vous recontacter au sujet de votre test. Elles ne sont '
      + 'ni revendues ni utilisées pour d’autres envois.',
  },
];

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/simulateur' },
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL, type: 'website' },
};

export default function SimulateurPage() {
  const breadcrumb = breadcrumbSchema([
    { name: 'Accueil', url: `${SITE_URL}/` },
    { name: 'Test gratuit', url: URL },
  ]);

  return (
    <>
      <JsonLd
        data={graph([
          webPageSchema({ url: URL, name: TITLE, description: DESCRIPTION, breadcrumb: { '@id': `${URL}#breadcrumb` } }),
          { ...breadcrumb, '@id': `${URL}#breadcrumb` },
          faqSchema(FAQ),
        ])}
      />
      <Nav />
      <main id="main">
        <Section className="pt-28 sm:pt-32">
          <Breadcrumb items={[{ label: 'Accueil', href: '/' }, { label: 'Test gratuit' }]} />
          <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <div className="min-w-0">
              <PageTitle
                lead="Testez gratuitement :"
                accent="voyez qui l’agent contacterait pour vous."
                chapeau="Indiquez votre secteur et votre ville. En moins d’une minute, vous voyez les vrais partenaires de votre zone que l’Agent Partenaires contacterait à votre nom, et la conversation exacte qu’il mènerait avec eux."
              />
              <div className="mt-8">
                <CheckList
                  items={[
                    'De vrais établissements de votre zone, trouvés à l’instant',
                    'La conversation WhatsApp exacte, à votre nom',
                    'Gratuit, une fois par entreprise',
                    `Ensuite : 149 € HT / mois, sans engagement. ${GARANTIE}`,
                  ]}
                />
              </div>
            </div>
            <div className="min-w-0">
              <Simulateur />
            </div>
          </div>
        </Section>
        <Section>
          <FaqBlock items={FAQ} />
        </Section>
      </main>
      <Footer />
    </>
  );
}
