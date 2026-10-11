/**
 * Page de service : le site internet et la fiche établissement Google.
 *
 * Pourquoi une page à part alors que la landing décrit déjà la brique : un
 * artisan qui cherche « site internet artisan » ne cherche pas une agence
 * d'automatisation, il cherche un site. Il arrivait jusqu'ici sur une page
 * unique qui lui parlait d'abord de prospection, ce qui est la deuxième
 * question, pas la première.
 *
 * Le contenu ne recopie pas la section Piliers : il traite ce que la landing ne
 * traite pas, à savoir ce qui distingue un site qui fait venir des appels d'un
 * site qui ne sert que de carte de visite.
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
import { METIERS, VILLES } from '@/lib/seo-local';
import { PILIER_OFFERS, eur } from '@/lib/offers';
import { SITE_URL } from '@/lib/contact';
import {
  breadcrumbSchema,
  faqSchema,
  graph,
  serviceSchema,
  webPageSchema,
} from '@/lib/schema';

const META_TITLE = 'Site internet pour artisan : création et fiche Google';
const META_DESCRIPTION =
  "Création de site internet pour artisan : pages par ville et par prestation, fiche "
  + "établissement Google. 300 € une seule fois, sans abonnement.";

const URL = `${SITE_URL}/site-web-artisan`;

const FAQ = [
  {
    q: 'Combien coûte un site internet pour un artisan ?',
    a: "300 € HT une seule fois, sans abonnement. Le site est hébergé à votre nom et vous "
      + "appartient. Il n'y a pas de frais cachés et pas d'engagement de durée.",
  },
  {
    q: 'En combien de temps le site est-il en ligne ?',
    a: "Comptez 48 heures une fois que nous avons vos photos de chantier, vos zones "
      + "d'intervention et vos prestations. Le plus long n'est pas la fabrication, c'est de "
      + "rassembler ces trois choses.",
  },
  {
    q: "Faut-il un site quand on a déjà une fiche Google ?",
    a: "Les deux se tiennent. Une fiche établissement sans site plafonne vite : Google a peu de "
      + "matière pour vous positionner sur autre chose que votre nom. Un site sans fiche est "
      + "invisible dans la carte, qui est pourtant ce que voit un particulier pressé.",
  },
  {
    q: 'Est-ce que je peux modifier le site moi-même ?',
    a: "Les changements courants, textes, photos, prestations, zones, se demandent et sont faits "
      + "dans la journée. Nous ne vous laissons pas seul devant un éditeur : c'est la raison "
      + "pour laquelle la plupart des sites d'artisans ne sont jamais mis à jour.",
  },
  {
    q: 'Le site m’appartient ?',
    a: "Oui. Il n'y a pas d'abonnement : le site est hébergé à votre nom, le nom de domaine "
      + "et la fiche établissement Google sont à vous. Vous ne dépendez pas de nous.",
  },
  {
    q: 'Vous travaillez pour quels métiers ?',
    a: "Couvreurs, menuisiers, plombiers chauffagistes, électriciens, maçons, peintres "
      + "façadiers, paysagistes et entreprises de rénovation énergétique. Un métier qui n'est "
      + "pas dans la liste n'est pas un refus, c'est une question à poser.",
  },
];

const CE_QUE_CONTIENT = [
  'Une page par prestation, écrite avec vos mots de métier',
  'Une page par commune de votre zone d’intervention',
  'Vos chantiers en photos, avant et après',
  'Un bouton d’appel visible en permanence sur téléphone',
  'Un formulaire qui arrive dans votre boîte, pas dans un tableau de bord',
  'La fiche établissement Google créée et remplie',
];

export const metadata = {
  title: META_TITLE,
  description: META_DESCRIPTION,
  alternates: { canonical: '/site-web-artisan' },
  openGraph: {
    title: META_TITLE,
    description: META_DESCRIPTION,
    url: URL,
    type: 'article',
  },
};

export default function SiteWebArtisanPage() {
  const offre = PILIER_OFFERS.find((o) => o.key === 'site-fiche-google');

  const breadcrumb = breadcrumbSchema([
    { name: 'Accueil', url: `${SITE_URL}/` },
    { name: 'Site internet pour artisan', url: URL },
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
            name: 'Création de site internet pour artisan et fiche établissement Google',
            description: META_DESCRIPTION,
            url: URL,
            setup: offre.setup,
            monthly: offre.monthly,
          }),
          faqSchema(FAQ),
        ])}
      />
      <Nav />

      <main className="flex flex-col">
        <Section className="pt-28 sm:pt-32">
          <Breadcrumb
            items={[{ label: 'Accueil', href: '/' }, { label: 'Site internet pour artisan' }]}
          />
          <PageTitle
            lead="Un site internet d’artisan"
            accent="qui fait sonner le téléphone."
            chapeau="La plupart des sites d’artisans sont des cartes de visite en ligne. Personne ne les trouve, et ceux qui les trouvent n’appellent pas. Voici ce que nous faisons différemment, et ce que ça coûte."
          />
        </Section>

        <Section className="pt-0">
          <SectionHead eyebrow="Ce que vous recevez" />
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-16">
            <div>
              <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-[2rem]">
                Un site, une fiche Google, et les deux entretenus
              </h2>
              <p className="mt-4 max-w-2xl text-[var(--muted-strong)]">
                Nous ne livrons pas un fichier et une facture. Le site est fabriqué, mis en ligne,
                puis tenu tous les mois, au même titre que la fiche établissement&nbsp;:
              </p>
              <div className="mt-7">
                <CheckList items={CE_QUE_CONTIENT} />
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] p-7">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--muted)]">
                Site et fiche établissement
              </p>
              <p className="mt-4 font-display text-4xl font-semibold tracking-tight">
                {eur(offre.setup)} € HT
              </p>
              <p className="mt-1 text-sm text-[var(--muted)]">de fabrication, une seule fois</p>
              <p className="mt-3 text-lg font-semibold text-[var(--primary-ink)]">
                puis {eur(offre.monthly)} € HT / mois
              </p>
              <p className="mt-5 border-t border-[var(--border)] pt-5 text-sm leading-relaxed text-[var(--muted-strong)]">
                Sans engagement. Le nom de domaine et la fiche établissement restent votre
                propriété.
              </p>
            </div>
          </div>
        </Section>

        <Section>
          <SectionHead eyebrow="Le vrai problème" />
          <h2 className="max-w-3xl text-balance text-2xl font-semibold tracking-tight sm:text-[2rem]">
            Pourquoi un site d’artisan ne ramène rien
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <Card title="Une seule page pour tout le métier">
              Un site qui dit « couverture, zinguerie, isolation » sur une seule page ne répond
              précisément à aucune recherche. Un particulier tape une prestation et une commune,
              pas un catalogue.
            </Card>
            <Card title="Aucune commune nommée">
              Sans page dédiée à votre zone, vous êtes en concurrence avec la France entière sur un
              mot générique. Nommer les communes est ce qui vous met devant, à cinq kilomètres de
              chez vous.
            </Card>
            <Card title="Une fiche Google laissée vide">
              La fiche est souvent le premier contact, avant le site. Photos absentes, horaires
              faux, aucune réponse aux avis&nbsp;: le particulier passe au suivant sans jamais
              ouvrir le site.
            </Card>
          </div>

          <div className="mt-10 rounded-2xl border-l-2 border-[var(--primary)] bg-[var(--surface-2)] py-6 pl-6 pr-7">
            <h3 className="text-lg font-semibold tracking-tight">
              Un site n’est pas un canal d’acquisition à lui seul
            </h3>
            <p className="mt-3 max-w-3xl leading-relaxed text-[var(--muted-strong)]">
              Il capte les gens qui vous cherchent déjà, ou qui cherchent votre métier près de chez
              eux. Il ne va chercher personne. C’est le travail de l’agent de prospection, qui
              écrit aux professionnels de votre zone, et celui de la publicité Meta, qui va chercher
              les particuliers. Les trois se complètent&nbsp;: aucun ne remplace les deux autres.
            </p>
          </div>
        </Section>

        <Section>
          <SectionHead eyebrow="Comment ça se passe" />
          <div className="grid gap-6 md:grid-cols-3">
            <Card title="1 · Vous envoyez la matière">
              Vos photos de chantier, vos prestations, vos communes. Un appel de trente minutes
              suffit à cadrer le reste.
            </Card>
            <Card title="2 · Nous fabriquons">
              Le site est écrit et mis en ligne sous 48 heures. La fiche établissement est créée ou
              reprise dans la foulée.
            </Card>
            <Card title="3 · Nous tenons">
              Chaque mois&nbsp;: photos ajoutées, horaires vérifiés, publications sur la fiche,
              corrections demandées faites dans la journée.
            </Card>
          </div>
        </Section>

        <Section>
          <FaqBlock items={FAQ} titre="Questions sur le site et la fiche Google" />
        </Section>

        <Section>
          <LinkGrid
            titre="Votre métier"
            intro="Ce que nous écrivons sur votre site dépend de ce que vous faites. Voici les métiers pour lesquels nous avons déjà les pages et le vocabulaire."
            links={METIERS.map((m) => ({ href: `/metiers/${m.slug}`, label: m.label }))}
          />
        </Section>

        <Section>
          <LinkGrid
            titre="Votre zone"
            intro="Les communes servent de pages à part entière sur votre site. Voici les territoires où nous travaillons déjà."
            links={VILLES.map((v) => ({
              href: `/agence-ia/${v.slug}`,
              label: v.nom,
              sub: `${v.dept} · ${v.deptNum}`,
            }))}
          />
        </Section>

        <Section className="pb-24 sm:pb-32">
          <CtaBand
            titre="On regarde ce que donne votre nom sur Google, en direct"
            texte="Trente minutes au téléphone, sans engagement. Vous voyez ce que voit un particulier qui cherche votre métier dans votre commune, et ce qu’il faudrait changer. Même si vous ne travaillez pas avec nous."
          />
        </Section>
      </main>

      <Footer />
    </>
  );
}
