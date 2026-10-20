/**
 * Page de service : les trois Packs Lancement Entrepreneurs (Partenaires,
 * Publicité locale, Ultime). Cartes partagées avec l'accueil (PacksLancement.jsx).
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
  CtaBand,
  FaqBlock,
  LinkGrid,
  PageTitle,
  Section,
  SectionHead,
} from '@/components/seo/Blocks';
import { PacksCards, NOTE_PACKS } from '@/components/lp/PacksLancement';
import { BUDGET_META, GARANTIE, PACKS_LANCEMENT } from '@/lib/offers';
import { SITE_URL } from '@/lib/contact';
import { breadcrumbSchema, faqSchema, graph, serviceSchema, webPageSchema } from '@/lib/schema';

const META_TITLE = 'Packs Lancement Entrepreneurs : site, fiche Google, partenaires et publicité locale, dès 490 € HT';
const META_DESCRIPTION =
  "Site internet hébergé à votre nom et fiche Google, avec l’Agent Partenaires (490 € HT), "
  + "la publicité Facebook et Instagram (790 € HT) ou les deux (990 € HT). Payés une fois.";

const URL = `${SITE_URL}/pack-lancement`;

const FAQ = [
  {
    q: 'Quelle différence entre les trois packs ?',
    a: "Les trois comprennent votre site internet hébergé à votre nom et votre fiche Google créée "
      + "ou optimisée. Le Pack Partenaires (490 € HT) ajoute trois mois d'Agent Partenaires, qui "
      + "contacte les prescripteurs de votre zone. Le Pack Publicité locale (790 € HT) ajoute un "
      + "montage publicitaire et une campagne locale sur Facebook et Instagram, sans Agent "
      + "Partenaires. Le Pack Ultime (990 € HT) réunit les deux, avec trois variantes publicitaires.",
  },
  {
    q: 'Quels frais après le prix du pack ?',
    a: "Pack Partenaires : rien pendant trois mois, puis 149 € HT par mois si vous poursuivez "
      + "l'Agent Partenaires, sans engagement. Pack Publicité locale : 200 € HT par mois de gestion "
      + "Meta dès le lancement des annonces. Pack Ultime : 200 € HT par mois de gestion Meta dès le "
      + "lancement des annonces (non incluse dans les 990 €), puis 149 € HT par mois pour l'Agent "
      + "Partenaires après les trois mois inclus si vous poursuivez, soit 349 € HT par mois avec les "
      + "deux services. " + BUDGET_META,
  },
  {
    q: 'Faut-il tourner des vidéos ?',
    a: "Aucun tournage n'est inclus dans les packs : vous fournissez des vidéos exploitables de "
      + "votre activité. Les trois variantes du Pack Ultime peuvent utiliser les mêmes séquences, "
      + "avec des accroches et des angles différents (le besoin du client, vos réalisations et vos "
      + "éléments de confiance, l'offre et la demande de devis). Ce ne sont pas trois tournages.",
  },
  {
    q: 'La publicité garantit-elle des clients ?',
    a: "Non. La publicité vous apporte des demandes de contact : des personnes qui laissent leurs "
      + "coordonnées. Certaines deviennent des prospects qualifiés, puis des rendez-vous, puis des "
      + "clients signés, selon votre zone, votre offre et votre réactivité. Nous ne garantissons "
      + "aucun nombre de demandes, de rendez-vous ou de ventes.",
  },
  {
    q: 'Et la garantie de l’Agent Partenaires ?',
    a: `${GARANTIE} Elle porte sur l'abonnement mensuel de l'Agent Partenaires qui suit les trois mois inclus : ces trois mois sont payés d'avance et non remboursables une fois le site livré. `
      + "Elle ne s'étend pas à la publicité Meta, aux vidéos ni au budget publicitaire.",
  },
  {
    q: 'Le site m’appartient vraiment ?',
    a: "Oui. Il est hébergé à votre nom, comme le nom de domaine et la fiche Google. Vous ne "
      + "dépendez pas de nous. Si vous arrêtez, le site et la fiche restent à vous.",
  },
  {
    q: 'À qui s’adressent les packs ?',
    a: "Aux entreprises qui se lancent ou qui n'ont pas encore de présence en ligne : "
      + "indépendants, artisans, TPE, prestataires de services.",
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
    { name: 'Packs Lancement Entrepreneurs', url: URL },
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
          ...PACKS_LANCEMENT.map((p) =>
            serviceSchema({
              name: p.name,
              description: p.description,
              url: URL,
              setup: p.setup,
              monthly: p.monthly,
            })
          ),
          faqSchema(FAQ),
        ])}
      />
      <Nav />

      <main className="flex flex-col">
        <Section className="pt-28 sm:pt-32">
          <Breadcrumb items={[{ label: 'Accueil', href: '/' }, { label: 'Packs Lancement Entrepreneurs' }]} />
          <PageTitle
            lead="Tout pour démarrer,"
            accent="trois packs dès 490 € HT."
            chapeau="Un site et une fiche Google, avec l’agent qui vous trouve des apporteurs d’affaires, la publicité locale sur Facebook et Instagram, ou les deux. Payé une seule fois."
          />
        </Section>

        <Section className="pt-0">
          <SectionHead eyebrow="Les trois packs" />
          <PacksCards />
          <p className="mt-8 max-w-4xl text-xs leading-relaxed text-[var(--muted)]">{NOTE_PACKS}</p>
        </Section>

        <Section>
          <SectionHead eyebrow="Ce que vous y gagnez" />
          <div className="grid gap-6 md:grid-cols-3">
            <Card title="On vous trouve sur Google">
              Un site lisible sur téléphone et une fiche établissement complète&nbsp;: la première
              chose qu’un client voit de vous.
            </Card>
            <Card title="On vous recommande, ou on vous voit">
              L’agent contacte les prescripteurs de votre zone, la publicité touche les clients
              de votre secteur. Selon le pack, l’un, l’autre ou les deux.
            </Card>
            <Card title="Vous restez libre">
              Site et fiche à votre nom, aucun engagement. Si vous arrêtez, le site et la fiche restent à vous.
            </Card>
          </div>
        </Section>

        <Section>
          <FaqBlock items={FAQ} titre="Questions sur les Packs Lancement" />
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
            titre="On choisit ensemble le pack qui vous correspond"
            texte="15 minutes au téléphone, gratuit et sans engagement."
          />
        </Section>
      </main>

      <Footer />
    </>
  );
}
