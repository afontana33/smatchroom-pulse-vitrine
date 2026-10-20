/**
 * Page de service : la publicité Facebook et Instagram (ex « Acquisition Meta »).
 * Offres lues dans lib/offers.js (META_OFFERS). Ne pas présenter l'Agent
 * Partenaires comme l'agent qui rappelle les demandes Meta.
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
import { BUDGET_META, META_OFFERS, PILIER_OFFERS } from '@/lib/offers';
import { CALENDLY, SITE_URL } from '@/lib/contact';
import { breadcrumbSchema, faqSchema, graph, serviceSchema, webPageSchema } from '@/lib/schema';

const META_TITLE = 'Publicité Facebook et Instagram pour entreprise locale';
const META_DESCRIPTION =
  "Nous créons vos publicités Facebook et Instagram et configurons une campagne locale avec "
  + "formulaire de contact. Dès 490 € HT, puis 200 € HT/mois de gestion. Budget réglé par vous à Meta.";

const URL = `${SITE_URL}/publicite-facebook-instagram`;

const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '\u00a0');

const ETAPES = [
  {
    t: 'Une demande de contact',
    d: "Une personne a vu votre publicité et a laissé ses coordonnées dans le formulaire. C'est ce que la campagne produit.",
  },
  {
    t: 'Un prospect qualifié',
    d: "Après échange, cette personne a un vrai besoin, dans votre zone, que vous pouvez traiter.",
  },
  {
    t: 'Un rendez-vous',
    d: "Vous avez convenu d'un appel, d'une visite ou d'un devis à présenter.",
  },
  {
    t: 'Un client signé',
    d: "Le devis est accepté. C'est vous qui faites ce dernier pas, avec votre offre et votre réactivité.",
  },
];

const VIDEOS = [
  'Vous fournissez des vidéos exploitables de votre activité : aucun tournage n’est inclus dans les offres Essentiel et Multi-créations',
  'Les trois variantes de l’offre Multi-créations peuvent utiliser les mêmes séquences, avec des accroches et des angles différents',
  'Exemples d’angles : le besoin de votre client, vos réalisations et vos éléments de confiance, votre offre et la demande de devis',
  'Si vous préférez ne pas filmer, notre vidéaste se déplace (offre avec vidéaste)',
];

const FAQ = [
  {
    q: 'Combien coûte une campagne de publicité Facebook et Instagram ?',
    a: "Meta Essentiel : 490 € HT de mise en place (un montage publicitaire). Meta Multi-créations : "
      + "690 € HT (trois variantes publicitaires). Avec notre vidéaste : 1 490 € HT. Puis 200 € HT par "
      + "mois de gestion dès le lancement des annonces. " + BUDGET_META,
  },
  {
    q: 'Combien de demandes vais-je recevoir ?',
    a: "Nous ne garantissons aucun nombre de demandes, de rendez-vous ou de ventes : cela dépend de "
      + "votre zone, de votre offre, de votre budget et de la façon dont vous traitez les demandes. "
      + "Une demande de contact n'est pas encore un client : c'est à vous de la rappeler et de la "
      + "transformer.",
  },
  {
    q: 'Trois variantes, c’est trois tournages ?',
    a: "Non. Les trois variantes sont créées à partir des vidéos que vous fournissez, souvent les "
      + "mêmes séquences, avec des accroches et des angles différents. Elles permettent de voir quel "
      + "message fonctionne le mieux dans votre zone.",
  },
  {
    q: 'Je garde la main sur le budget ?',
    a: "Oui. Vous définissez votre budget et le réglez directement à Meta depuis votre compte "
      + "publicitaire. Nous ne prenons aucune commission dessus : SmatchRoom facture uniquement la "
      + "création et la gestion de vos campagnes.",
  },
  {
    q: 'Je peux arrêter quand je veux ?',
    a: "Oui, la gestion mensuelle est sans engagement. Les créations réalisées restent à vous.",
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
  const lien = (key) => `${CALENDLY}?utm_source=site&utm_medium=meta&utm_content=${key}`;
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
            lead="Trouvez de nouveaux clients"
            accent="avec la publicité sur Facebook et Instagram."
            chapeau="Nous créons vos publicités et configurons leur diffusion dans votre zone d’intervention. Les personnes intéressées peuvent laisser leurs coordonnées pour être recontactées. Vous recevez ainsi de nouvelles demandes à traiter et à transformer en clients."
          />
        </Section>

        <Section className="pt-0">
          <SectionHead eyebrow="Nos offres" />
          <div className="grid gap-6 lg:grid-cols-3">
            {META_OFFERS.map((o) => (
              <div
                key={o.key}
                className="flex flex-col rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] p-7"
              >
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--muted)]">
                  {o.name}
                </p>
                <p className="mt-4 font-display text-4xl font-semibold tracking-tight">
                  {fmt(o.setup)} € HT
                </p>
                <p className="mt-1 text-sm text-[var(--muted)]">de mise en place · {o.creations}</p>
                <p className="mt-3 text-lg font-semibold text-[var(--primary-ink)]">
                  puis {o.monthly} € HT / mois
                </p>
                <p className="text-sm text-[var(--muted)]">de gestion, dès le lancement des annonces</p>
                <ul className="mt-5 space-y-2 border-t border-[var(--border)] pt-5 text-sm text-[var(--muted-strong)]">
                  {o.included.map((i) => (
                    <li key={i}>· {i}</li>
                  ))}
                </ul>
                <a
                  href={lien(o.key)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary mt-6 inline-flex items-center justify-center px-5 py-3 text-sm font-semibold"
                >
                  En parler 15 minutes
                </a>
              </div>
            ))}
          </div>
          <p className="mt-6 rounded-2xl bg-[var(--surface-2)] px-5 py-4 text-sm leading-relaxed text-[var(--muted-strong)]">
            {BUDGET_META} Gestion sans engagement.
          </p>
          <p className="mt-4 text-sm text-[var(--muted-strong)]">
            Pas encore de site&nbsp;? Les{' '}
            <a href="/pack-lancement" className="font-semibold text-[var(--primary-ink)] hover:underline">
              Packs Lancement
            </a>{' '}
            réunissent site, fiche Google et publicité locale, dès 790 € HT.
          </p>
        </Section>

        <Section>
          <SectionHead eyebrow="Ce que la publicité vous apporte" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {ETAPES.map((e) => (
              <Card key={e.t} title={e.t}>
                {e.d}
              </Card>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-sm text-[var(--muted-strong)]">
            La campagne produit des demandes de contact. Nous ne garantissons aucun nombre de
            prospects, de rendez-vous ou de ventes.
          </p>
        </Section>

        <Section>
          <SectionHead eyebrow="Vos vidéos" />
          <div className="max-w-3xl">
            <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-[2rem]">
              Des publicités à partir de votre vrai travail
            </h2>
            <div className="mt-7">
              <CheckList items={VIDEOS} />
            </div>
          </div>
        </Section>

        <Section>
          <SectionHead eyebrow="Pourquoi ça marche" />
          <div className="grid gap-6 md:grid-cols-3">
            <Card title="Du vrai, pas de la banque d’images">
              Vos clients voient votre travail et votre équipe. C’est ce qui donne envie de vous
              contacter.
            </Card>
            <Card title="Votre zone, pas toute la France">
              Le ciblage se limite à votre secteur d’intervention&nbsp;: chaque euro touche des
              clients que vous pouvez servir.
            </Card>
            <Card title="Votre compte, votre budget">
              Le compte publicitaire est à votre nom et vous réglez le budget directement à Meta.
              Nous facturons la création et la gestion, rien de plus.
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
              { href: '/pack-lancement', label: 'Packs Lancement Entrepreneurs' },
              { href: '/prospection-b2b', label: 'Prospection B2B' },
            ]}
          />
        </Section>

        <Section className="pb-24 sm:pb-32">
          <CtaBand
            titre="On regarde ce que la publicité peut donner dans votre zone"
            texte="15 minutes au téléphone, gratuit et sans engagement. Vous repartez avec une idée claire de l’offre adaptée et du budget à prévoir."
          />
        </Section>
      </main>

      <Footer />
    </>
  );
}
