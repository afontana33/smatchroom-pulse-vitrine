/**
 * Hub des zones desservies.
 *
 * Cible « agence automatisation Nouvelle-Aquitaine » et sert de parent aux
 * douze pages ville. Déclare aussi l'organisation comme prestataire local
 * multi-territoires, ce que la page d'accueil ne fait pas.
 */

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import {
  Breadcrumb,
  CtaBand,
  LinkGrid,
  PageTitle,
  Section,
  SectionHead,
} from '@/components/seo/Blocks';
import { METIERS, VILLES } from '@/lib/seo-local';
import { LEGAL, SITE_URL } from '@/lib/contact';
import {
  breadcrumbSchema,
  graph,
  itemListSchema,
  webPageSchema,
} from '@/lib/schema';

const TITLE = "Agence d'automatisation et d'agents IA en Nouvelle-Aquitaine · Pulse";
const DESCRIPTION =
  "Agence d'agents IA et d'automatisation basée à Bordeaux : Gironde, Landes, Pays basque, Lot-et-Garonne, Dordogne, Charente. Prospection, accueil 24/7, visibilité locale.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/agence-ia' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/agence-ia`,
    type: 'website',
  },
};

export default function AgenceIaHub() {
  const url = `${SITE_URL}/agence-ia`;
  const breadcrumb = breadcrumbSchema([
    { name: 'Accueil', url: `${SITE_URL}/` },
    { name: 'Zones desservies', url },
  ]);

  return (
    <>
      <JsonLd
        data={graph([
          webPageSchema({
            url,
            name: TITLE,
            description: DESCRIPTION,
            breadcrumb: { '@id': `${url}#breadcrumb` },
          }),
          { ...breadcrumb, '@id': `${url}#breadcrumb` },
          itemListSchema(
            VILLES.map((v) => ({ name: v.nom, url: `${SITE_URL}/agence-ia/${v.slug}` }))
          ),
        ])}
      />
      <Nav />

      <main className="flex flex-col">
        <Section className="pt-28 sm:pt-32">
          <Breadcrumb items={[{ label: 'Accueil', href: '/' }, { label: 'Zones desservies' }]} />
          <PageTitle
            lead="Basés à Bordeaux,"
            accent="au courant de ce qui se passe dans votre ville."
            chapeau={`Le siège est au ${LEGAL.street}, à ${LEGAL.city}. Les agents, eux, travaillent partout : ce qui compte n'est pas notre adresse mais le tissu de prescripteurs autour de vous, et celui-là n'est pas le même à Arcachon qu'à Mont-de-Marsan.`}
          />
        </Section>

        <Section className="pt-0">
          <SectionHead eyebrow="Douze territoires" />
          <LinkGrid
            titre="Où nous avons déjà des agents en service"
            intro="Un agent peut être construit pour n'importe quelle zone en France. Ces douze pages sont celles où nous connaissons réellement le marché local, parce que nous y travaillons."
            links={VILLES.map((v) => ({
              href: `/agence-ia/${v.slug}`,
              label: v.nom,
              sub: `${v.dept} · ${v.deptNum}`,
            }))}
          />
        </Section>

        <Section>
          <LinkGrid
            titre="Par métier"
            intro="Le discours et le calendrier de prospection changent d'un métier à l'autre."
            links={METIERS.map((m) => ({ href: `/metiers/${m.slug}`, label: m.label }))}
          />
        </Section>

        <Section className="pb-24 sm:pb-32">
          <CtaBand
            titre="Votre ville n'est pas listée ?"
            texte="Ce n'est pas bloquant : la zone d'un agent se définit en communes, pas en fonction de nos pages. Appelez-nous, on vous dit franchement si nous connaissons votre marché ou si nous partirions de zéro avec vous."
          />
        </Section>
      </main>

      <Footer />
    </>
  );
}
