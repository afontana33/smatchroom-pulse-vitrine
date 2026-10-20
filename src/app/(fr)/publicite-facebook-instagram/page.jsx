/**
 * Page de service : l'Acquisition Meta (publicité Facebook et Instagram).
 *
 * Cible « publicité Facebook entreprise », « agence publicité Instagram » et
 * « publicité locale Facebook ». Prix lus dans lib/offers.js.
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
import { PILIER_OFFERS, eur } from '@/lib/offers';
import { SITE_URL } from '@/lib/contact';
import { breadcrumbSchema, faqSchema, graph, serviceSchema, webPageSchema } from '@/lib/schema';

const META_TITLE = 'Publicité Facebook et Instagram pour entreprise locale';
const META_DESCRIPTION =
  "On filme votre activité et on gère vos publicités Facebook et Instagram dans votre zone. "
  + "Dès 690 € HT, puis 200 € HT/mois. Les demandes sont rappelées.";

const URL = `${SITE_URL}/publicite-facebook-instagram`;

const INCLUS = [
  'Tournage par vous, guidé, ou par notre vidéaste sur place',
  'Montage de vidéos courtes au format Facebook et Instagram',
  'Ciblage de votre zone et de votre clientèle',
  'Diffusion, suivi et ajustement des campagnes chaque semaine',
  'Chaque demande transmise à votre agent, qui rappelle sans délai',
];

const FAQ = [
  {
    q: 'Combien coûte une campagne de publicité Facebook et Instagram ?',
    a: "690 € HT de mise en place si vous filmez vous-même, 1 490 € HT si notre vidéaste se "
      + "déplace, puis 200 € HT par mois de gestion. Le budget publicitaire est payé directement "
      + "par vous à Meta, à partir de 15 € par jour.",
  },
  {
    q: 'Pourquoi de la vidéo plutôt qu’une simple image ?',
    a: "Une vidéo de votre activité réelle montre votre travail et votre visage : elle rassure "
      + "et elle est mieux diffusée par Facebook et Instagram qu'une image de banque.",
  },
  {
    q: 'Que deviennent les demandes reçues ?',
    a: "Elles ne restent pas dans une boîte de réception : elles sont transmises à votre agent, "
      + "qui répond en moins d'une minute et vous passe les personnes intéressées.",
  },
  {
    q: 'Je garde la main sur le budget ?',
    a: "Oui. Le compte publicitaire est à votre nom et le budget est réglé par vous à Meta. Nous "
      + "ne prenons aucune commission dessus.",
  },
  {
    q: 'Je peux arrêter quand je veux ?',
    a: "Oui, la gestion mensuelle est sans engagement. Les vidéos tournées restent à vous.",
  },
];

export const metadata = {
  title: META_TITLE,
  description: META_DESCRIPTION,
  alternates: { canonical: '/publicite-facebook-instagram' },
  openGraph: { title: META_TITLE, description: META_DESCRIPTION, url: URL, type: 'article' },
};

export default function PubliciteMetaPage() {
  const offre = PILIER_OFFERS.find((o) => o.key === 'acquisition-meta');
  const breadcrumb = breadcrumbSchema([
    { name: 'Accueil', url: `${SITE_URL}/` },
    { name: 'Publicité Facebook et Instagram', url: URL },
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
            name: 'Publicité Facebook et Instagram',
            description: META_DESCRIPTION,
            url: URL,
            setup: offre.setup,
            setupFrom: offre.setupFrom,
            monthly: offre.monthly,
          }),
          faqSchema(FAQ),
        ])}
      />
      <Nav />

      <main className="flex flex-col">
        <Section className="pt-28 sm:pt-32">
          <Breadcrumb
            items={[{ label: 'Accueil', href: '/' }, { label: 'Publicité Facebook et Instagram' }]}
          />
          <PageTitle
            lead="Votre activité filmée,"
            accent="diffusée aux bonnes personnes."
            chapeau="On tourne des vidéos courtes de votre travail, on les diffuse sur Facebook et Instagram auprès des clients de votre zone, et chaque demande est rappelée."
          />
        </Section>

        <Section className="pt-0">
          <SectionHead eyebrow="Ce qui est inclus" />
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:gap-16">
            <div>
              <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-[2rem]">
                De la vidéo à la demande rappelée
              </h2>
              <div className="mt-7">
                <CheckList items={INCLUS} />
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] p-7">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--muted)]">
                Acquisition Meta
              </p>
              <p className="mt-4 font-display text-4xl font-semibold tracking-tight">
                {eur(offre.setup)} € HT
              </p>
              <p className="mt-1 text-sm text-[var(--muted)]">
                si vous filmez · 1 490 € HT avec notre vidéaste
              </p>
              <p className="mt-3 text-lg font-semibold text-[var(--primary-ink)]">
                puis {eur(offre.monthly)} € HT / mois
              </p>
              <p className="mt-5 border-t border-[var(--border)] pt-5 text-sm leading-relaxed text-[var(--muted-strong)]">
                Budget publicitaire en plus, payé par vous à Meta, à partir de 15 € par jour.
                Sans engagement.
              </p>
            </div>
          </div>
        </Section>

        <Section>
          <SectionHead eyebrow="Pourquoi ça marche" />
          <div className="grid gap-6 md:grid-cols-3">
            <Card title="Du vrai, pas de la banque d’images">
              Vos clients voient votre travail et votre équipe. C’est ce qui donne envie d’appeler.
            </Card>
            <Card title="Votre zone, pas toute la France">
              Le ciblage se limite à votre secteur d’intervention&nbsp;: chaque euro touche des
              clients que vous pouvez servir.
            </Card>
            <Card title="Aucune demande perdue">
              Une demande rappelée dans la minute se transforme bien plus souvent qu’une demande
              rappelée le soir.
            </Card>
          </div>
        </Section>

        <Section>
          <FaqBlock items={FAQ} titre="Questions sur la publicité Facebook et Instagram" />
        </Section>

        <Section>
          <LinkGrid
            titre="Aller plus loin"
            links={[
              { href: '/apporteur-affaires', label: 'Trouver des apporteurs d’affaires' },
              { href: '/site-web-artisan', label: 'Site internet et fiche Google' },
              { href: '/pack-lancement', label: 'Pack Lancement Entrepreneurs' },
              { href: '/prospection-b2b', label: 'Prospection B2B' },
            ]}
          />
        </Section>

        <Section className="pb-24 sm:pb-32">
          <CtaBand
            titre="On regarde ce que la publicité peut donner dans votre zone"
            texte="15 minutes au téléphone, gratuit et sans engagement. Vous repartez avec une estimation du budget et du volume de demandes."
          />
        </Section>
      </main>

      <Footer />
    </>
  );
}
