/**
 * Page de service : le Pack Lancement Entrepreneurs.
 *
 * Cible « création site internet et fiche Google pas cher », « lancer son
 * entreprise trouver des clients ». Même offre que la carte du hero de
 * l'accueil (HeroLancement.jsx) : changer les deux ensemble.
 */

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import {
  Breadcrumb,
  Card,
  CheckList,
  CtaBand,
  FaqBlock,
  LinkGrid,
  PageTitle,
  Section,
  SectionHead,
} from '@/components/seo/Blocks';
import { GARANTIE, PACK_LANCEMENT } from '@/lib/offers';
import { SITE_URL } from '@/lib/contact';
import { breadcrumbSchema, faqSchema, graph, serviceSchema, webPageSchema } from '@/lib/schema';

const META_TITLE = 'Pack Lancement Entrepreneurs : site, fiche Google et prospection, 490 € HT';
const META_DESCRIPTION =
  "Site internet hébergé à votre nom, fiche Google et 3 mois d’Agent Partenaires pour 490 € HT, "
  + "payés une fois. Puis 149 € HT/mois si vous continuez.";

const URL = `${SITE_URL}/pack-lancement`;

const CONTENU = [
  'Votre site internet, clair et rapide sur téléphone, hébergé à votre nom',
  'Votre fiche établissement Google créée et remplie',
  '3 mois d’Agent Partenaires : il vous trouve des apporteurs d’affaires',
  'Mise en place en 48 heures',
];

const FAQ = [
  {
    q: 'Que comprend le Pack Lancement Entrepreneurs ?',
    a: "Un site internet hébergé à votre nom, votre fiche établissement Google créée et remplie, "
      + "et trois mois d'Agent Partenaires, qui contacte par WhatsApp et email les prescripteurs "
      + "de votre zone. Le tout pour 490 € HT, payés une seule fois.",
  },
  {
    q: 'Et après les 3 mois ?',
    a: `Vous continuez sur simple demande écrite, à 149 € HT par mois, sans engagement. ${GARANTIE} Cette garantie porte sur l'abonnement mensuel : les 3 mois du Pack sont payés d'avance et non remboursables une fois le site livré. `
      + "Si vous arrêtez, le site et la fiche Google restent à vous.",
  },
  {
    q: 'Le site m’appartient vraiment ?',
    a: "Oui. Il est hébergé à votre nom, comme le nom de domaine et la fiche Google. Vous ne "
      + "dépendez pas de nous.",
  },
  {
    q: 'À qui s’adresse le pack ?',
    a: "Aux entreprises qui se lancent ou qui n'ont pas encore de présence en ligne : "
      + "indépendants, artisans, TPE, prestataires de services.",
  },
  {
    q: 'Il y a des frais cachés ?',
    a: "Non. 490 € HT pour les trois mois, rien de plus.",
  },
];

export const metadata = {
  title: META_TITLE,
  description: META_DESCRIPTION,
  alternates: { canonical: '/pack-lancement' },
  openGraph: { title: META_TITLE, description: META_DESCRIPTION, url: URL, type: 'article' },
};

export default function PackLancementPage() {
  const breadcrumb = breadcrumbSchema([
    { name: 'Accueil', url: `${SITE_URL}/` },
    { name: 'Pack Lancement Entrepreneurs', url: URL },
  ]);

  return (
    <>
      <JsonLd
        data={graph([
          webPageSchema({
            url: URL,
            name: META_TITLE,
            description: META_DESCRIPTION,
            breadcrumb: { '@id': `${URL}#breadcrumb` },
          }),
          { ...breadcrumb, '@id': `${URL}#breadcrumb` },
          serviceSchema({
            name: PACK_LANCEMENT.name,
            description: META_DESCRIPTION,
            url: URL,
            setup: PACK_LANCEMENT.setup,
            monthly: PACK_LANCEMENT.monthly,
          }),
          faqSchema(FAQ),
        ])}
      />
      <Nav />

      <main className="flex flex-col">
        <Section className="pt-28 sm:pt-32">
          <Breadcrumb items={[{ label: 'Accueil', href: '/' }, { label: 'Pack Lancement Entrepreneurs' }]} />
          <PageTitle
            lead="Tout pour démarrer,"
            accent="490 € HT pour 3 mois."
            chapeau="Un site, une fiche Google et un agent qui vous trouve des apporteurs d’affaires. Payé une seule fois, rien de plus."
          />
        </Section>

        <Section className="pt-0">
          <SectionHead eyebrow="Ce qui est inclus" />
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:gap-16">
            <div>
              <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-[2rem]">
                Exister sur Google et être recommandé
              </h2>
              <div className="mt-7">
                <CheckList items={CONTENU} />
              </div>
            </div>

            <div className="rounded-2xl border-2 border-[var(--primary)] bg-[var(--surface)] p-7">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--muted)]">
                Pack Lancement Entrepreneurs
              </p>
              <p className="mt-4 font-display text-5xl font-bold tracking-tight">490 € HT</p>
              <p className="mt-2 font-semibold">pour 3 mois, payés une seule fois</p>
              <p className="mt-5 border-t border-[var(--border)] pt-5 text-sm leading-relaxed text-[var(--muted-strong)]">
                Ensuite, sur simple demande écrite&nbsp;: 149 € HT / mois, sans engagement. {GARANTIE} Les 3 mois du Pack sont payés d&apos;avance et non remboursables une fois le site livré&nbsp;: la garantie porte sur l&apos;abonnement mensuel qui suit.
              </p>
            </div>
          </div>
        </Section>

        <Section>
          <SectionHead eyebrow="Ce que vous y gagnez" />
          <div className="grid gap-6 md:grid-cols-3">
            <Card title="On vous trouve sur Google">
              Un site lisible sur téléphone et une fiche établissement complète&nbsp;: la première
              chose qu’un client voit de vous.
            </Card>
            <Card title="On vous recommande">
              L’agent contacte les prescripteurs de votre zone. Vous ne parlez qu’aux gens
              intéressés.
            </Card>
            <Card title="Vous restez libre">
              Site et fiche à votre nom, aucun engagement. Si vous arrêtez, le site et la fiche restent à vous.
            </Card>
          </div>
        </Section>

        <Section>
          <FaqBlock items={FAQ} titre="Questions sur le Pack Lancement Entrepreneurs" />
        </Section>

        <Section>
          <LinkGrid
            titre="Le détail de chaque brique"
            links={[
              { href: '/site-web-artisan', label: 'Site internet et fiche Google' },
              { href: '/apporteur-affaires', label: 'Agent Partenaires' },
              { href: '/publicite-facebook-instagram', label: 'Publicité Facebook et Instagram' },
              { href: '/prospection-b2b', label: 'Prospection B2B' },
            ]}
          />
        </Section>

        <Section className="pb-24 sm:pb-32">
          <CtaBand
            titre="On vérifie ensemble que le pack vous correspond"
            texte="15 minutes au téléphone, gratuit et sans engagement."
          />
        </Section>
      </main>

      <Footer />
    </>
  );
}
