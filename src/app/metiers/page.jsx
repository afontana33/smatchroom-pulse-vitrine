/**
 * Hub des pages métier.
 *
 * Sert deux fonctions : donner un point d'entrée indexable aux huit pages
 * métier, et exister comme cible de lien depuis le pied de page. Sans hub, ces
 * pages ne sont atteignables que par le sitemap, ce qui les laisse au fond de
 * la file de crawl.
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
import { SITE_URL } from '@/lib/contact';
import {
  breadcrumbSchema,
  graph,
  itemListSchema,
  webPageSchema,
} from '@/lib/schema';

const TITLE = "Agents IA par métier du bâtiment · SmatchRoom Pulse";
const DESCRIPTION =
  "Couvreur, menuisier, plombier, électricien, maçon, peintre, paysagiste, rénovation énergétique : comment un agent IA prospecte, relance et répond pour chaque métier.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/metiers' },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${SITE_URL}/metiers`, type: 'website' },
};

export default function MetiersHub() {
  const url = `${SITE_URL}/metiers`;
  const breadcrumb = breadcrumbSchema([
    { name: 'Accueil', url: `${SITE_URL}/` },
    { name: 'Métiers', url },
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
            METIERS.map((m) => ({ name: m.label, url: `${SITE_URL}/metiers/${m.slug}` }))
          ),
        ])}
      />
      <Nav />

      <main className="flex flex-col">
        <Section className="pt-28 sm:pt-32">
          <Breadcrumb items={[{ label: 'Accueil', href: '/' }, { label: 'Métiers' }]} />
          <PageTitle
            lead="Un agent, oui,"
            accent="mais pas le même selon le métier."
            chapeau="Un couvreur ne vit pas des mêmes prescripteurs qu'un paysagiste, et ne prospecte pas à la même saison. Le moteur est commun, le discours et le calendrier sont propres à chaque métier. Voici ce que ça donne pour le vôtre."
          />
        </Section>

        <Section className="pt-0">
          <SectionHead eyebrow="Huit métiers" />
          <LinkGrid
            titre="Choisissez votre métier"
            links={METIERS.map((m) => ({
              href: `/metiers/${m.slug}`,
              label: m.label,
              sub: m.intro.split('.')[0] + '.',
            }))}
          />
        </Section>

        <Section>
          <LinkGrid
            titre="Ou par territoire"
            intro="Nos agents tournent surtout en Nouvelle-Aquitaine, où nous connaissons le tissu de prescripteurs."
            links={VILLES.map((v) => ({
              href: `/agence-ia/${v.slug}`,
              label: v.nom,
              sub: `${v.dept} · ${v.deptNum}`,
            }))}
          />
        </Section>

        <Section className="pb-24 sm:pb-32">
          <CtaBand
            titre="Votre métier n'est pas dans la liste ?"
            texte="La liste ne fait que refléter les métiers sur lesquels nous avons déjà des agents en service. On travaille aussi hors bâtiment, et le cadrage de trente minutes sert précisément à savoir si on a quelque chose à vous apporter, ou pas."
          />
        </Section>
      </main>

      <Footer />
    </>
  );
}
