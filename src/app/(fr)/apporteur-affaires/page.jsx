/**
 * Page de service : l'Agent Partenaires (apporteurs d'affaires).
 *
 * Cible « trouver des apporteurs d'affaires », « réseau de prescripteurs » et
 * « apporteur d'affaires artisan / TPE ». À ne pas confondre avec
 * /prospection-b2b, qui porte l'Agent Clients (contact direct des acheteurs).
 * Prix lus dans lib/offers.js.
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
import { METIERS } from '@/lib/seo-local';
import { GARANTIE, PILIER_OFFERS, eur } from '@/lib/offers';
import { SITE_URL } from '@/lib/contact';
import { breadcrumbSchema, faqSchema, graph, serviceSchema, webPageSchema } from '@/lib/schema';

const META_TITLE = 'Trouver des apporteurs d’affaires : l’Agent Partenaires';
const META_DESCRIPTION =
  "Un agent contacte par WhatsApp et email les prescripteurs qui ont déjà vos clients : agences, "
  + "cabinets, consultants. 149 € HT/mois, sans engagement.";

const URL = `${SITE_URL}/apporteur-affaires`;

const PRESCRIPTEURS = [
  'Agences immobilières et administrateurs de biens',
  'Cabinets d’assurance et experts après sinistre',
  'Architectes, maîtres d’œuvre, bureaux d’études',
  'Syndics de copropriété et gestionnaires de patrimoine',
  'Experts-comptables, consultants et réseaux d’entreprises',
  'Commerces et entreprises complémentaires de votre métier',
];

const ETAPES = [
  ['On cadre en 30 minutes', 'Votre zone, votre métier, les prescripteurs qui comptent pour vous et votre façon de parler.'],
  ['L’agent constitue la liste', 'Les prescripteurs de votre secteur, à partir de données publiques : fiches Google, registres, annuaires professionnels.'],
  ['Il les contacte à votre nom', 'Un message court et personnalisé, depuis votre WhatsApp et votre email, puis des relances espacées.'],
  ['Vous rappelez les intéressés', 'Dès qu’un prescripteur veut vous recommander, vous êtes prévenu avec l’historique de l’échange.'],
];

const FAQ = [
  {
    q: 'Qu’est-ce qu’un apporteur d’affaires ?',
    a: "Un professionnel qui voit passer vos futurs clients avant vous et vous les recommande : "
      + "l'agent immobilier qui vend une maison à rénover, l'assureur qui gère un sinistre, "
      + "l'architecte qui cherche une entreprise. Un seul bon prescripteur peut amener plusieurs "
      + "chantiers ou contrats par an.",
  },
  {
    q: 'Combien coûte l’Agent Partenaires ?',
    a: `149 € HT par mois, sans frais de création et sans engagement. ${GARANTIE} `
      + "Il est aussi inclus dans le Pack Lancement Entrepreneurs : site, fiche Google et 3 mois d'agent pour 490 € HT.",
  },
  {
    q: 'Quelle différence avec l’Agent Clients ?',
    a: "L'Agent Partenaires contacte les prescripteurs, ceux qui ont déjà vos clients. L'Agent "
      + "Clients contacte directement vos clients potentiels, des décideurs en entreprise : il est "
      + "fait pour les sociétés qui vendent à d'autres entreprises.",
  },
  {
    q: 'Les messages partent de mon numéro ?',
    a: "Oui, de votre WhatsApp et de votre boîte mail, signés de votre prénom. Les prescripteurs "
      + "vous répondent directement, et vous voyez chaque conversation sur votre téléphone.",
  },
  {
    q: 'Je risque un blocage de mon WhatsApp ?',
    a: "Le volume monte progressivement, quelques messages par jour au départ, avec un rythme "
      + "humain et uniquement aux heures de bureau. Un « stop » arrête tout, définitivement.",
  },
  {
    q: 'En combien de temps ça démarre ?',
    a: "Environ une semaine entre l’appel de cadrage et les premiers messages : vous validez les messages, puis la mise en route se fait sous 48 heures après réception du paiement et des accès. Les premières réponses arrivent en "
      + "général dans la semaine.",
  },
];

export const metadata = {
  title: META_TITLE,
  description: META_DESCRIPTION,
  alternates: { canonical: '/apporteur-affaires' },
  openGraph: { title: META_TITLE, description: META_DESCRIPTION, url: URL, type: 'article' },
};

export default function ApporteurAffairesPage() {
  const agent = PILIER_OFFERS.find((o) => o.key === 'agent-prospection');
  const breadcrumb = breadcrumbSchema([
    { name: 'Accueil', url: `${SITE_URL}/` },
    { name: 'Apporteurs d’affaires', url: URL },
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
            name: 'Agent Partenaires : recherche d’apporteurs d’affaires',
            description: META_DESCRIPTION,
            url: URL,
            setup: agent.setup,
            monthly: agent.monthly,
          }),
          faqSchema(FAQ),
        ])}
      />
      <Nav />

      <main className="flex flex-col">
        <Section className="pt-28 sm:pt-32">
          <Breadcrumb items={[{ label: 'Accueil', href: '/' }, { label: 'Apporteurs d’affaires' }]} />
          <PageTitle
            lead="Des apporteurs d’affaires,"
            accent="sans passer vos soirées à les chercher."
            chapeau="L’Agent Partenaires contacte les professionnels qui ont déjà vos clients sous la main, et vous passe ceux qui veulent vous recommander. Par WhatsApp et par email, à votre nom."
          />
        </Section>

        <Section className="pt-0">
          <SectionHead eyebrow="Qui il contacte" />
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:gap-16">
            <div>
              <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-[2rem]">
                Les prescripteurs de votre métier, pas vos clients un par un
              </h2>
              <p className="mt-4 max-w-2xl text-[var(--muted-strong)]">
                Un prescripteur vous apporte un portefeuille, pas un contact. L’agent cible ceux qui
                comptent dans votre secteur&nbsp;:
              </p>
              <div className="mt-7">
                <CheckList items={PRESCRIPTEURS} />
              </div>
            </div>

            <div className="rounded-2xl border-2 border-[var(--primary)] bg-[var(--surface)] p-7">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--muted)]">
                Agent Partenaires
              </p>
              <p className="mt-4 font-display text-4xl font-semibold tracking-tight">
                {eur(agent.monthly)} € HT
              </p>
              <p className="mt-1 text-sm text-[var(--muted)]">par mois, sans frais de création</p>
              <p className="mt-5 border-t border-[var(--border)] pt-5 text-sm font-semibold leading-relaxed">
                Sans engagement. {GARANTIE}
              </p>
              <a
                href="/pack-lancement"
                className="mt-4 inline-flex text-sm font-semibold text-[var(--primary-ink)] hover:underline"
              >
                Inclus dans le Pack Lancement Entrepreneurs à 490 € HT
              </a>
            </div>
          </div>
        </Section>

        <Section>
          <SectionHead eyebrow="Comment ça marche" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {ETAPES.map(([t, d]) => (
              <Card key={t} title={t}>
                {d}
              </Card>
            ))}
          </div>
        </Section>

        <Section>
          <SectionHead eyebrow="Résultats" />
          <div className="grid gap-6 md:grid-cols-3">
            <Card title="12 partenaires">
              Mathieu, Isolation by Tryba&nbsp;: douze apporteurs d’affaires sur sa zone et cinq
              demandes de devis.
            </Card>
            <Card title="6 chantiers">
              David, couvreur à Lille&nbsp;: treize partenariats noués en un mois, six chantiers
              générés grâce à eux.
            </Card>
            <Card title="3 chantiers">
              DTR Service, couvreur dans le 65&nbsp;: quatre partenaires sur une petite zone, trois
              chantiers.
            </Card>
          </div>
        </Section>

        <Section>
          <FaqBlock items={FAQ} titre="Questions sur les apporteurs d’affaires" />
        </Section>

        <Section>
          <LinkGrid
            titre="Par métier"
            intro="Les prescripteurs ne sont pas les mêmes d’un métier à l’autre."
            links={METIERS.map((m) => ({ href: `/metiers/${m.slug}`, label: m.label }))}
          />
        </Section>

        <Section>
          <LinkGrid
            titre="Aller plus loin"
            links={[
              { href: '/pack-lancement', label: 'Pack Lancement Entrepreneurs' },
              { href: '/prospection-b2b', label: 'Agent Clients (prospection B2B)' },
              { href: '/site-web-artisan', label: 'Site internet et fiche Google' },
              { href: '/publicite-facebook-instagram', label: 'Publicité Facebook et Instagram' },
            ]}
          />
        </Section>

        <Section className="pb-24 sm:pb-32">
          <CtaBand
            titre="On regarde ensemble les prescripteurs de votre zone"
            texte="15 minutes au téléphone, gratuit et sans engagement. Vous repartez avec une idée claire du nombre de partenaires atteignables près de chez vous."
          />
        </Section>
      </main>

      <Footer />
    </>
  );
}
