/**
 * Page par métier : « Agent IA de prospection pour les couvreurs », etc.
 *
 * Cible les requêtes qui mêlent un métier et une intention d'outil ou
 * d'automatisation. Le contenu est propre à chaque métier (prescripteurs,
 * douleurs, saisonnalité, exemple de message) et vient de lib/seo-local.js :
 * pas de gabarit rempli par substitution de variables, sinon ces vingt pages
 * seraient des pages satellites et seraient traitées comme telles.
 *
 * Le maillage est croisé : chaque page métier renvoie vers les villes, chaque
 * page ville renvoie vers les métiers. C'est ce qui fait tenir l'ensemble
 * plutôt qu'une collection de pages orphelines.
 */

import { notFound } from 'next/navigation';

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
import { METIERS, VILLES, findMetier } from '@/lib/seo-local';
import { PILIER_OFFERS, eur } from '@/lib/offers';
import { SITE_URL } from '@/lib/contact';
import {
  breadcrumbSchema,
  faqSchema,
  graph,
  serviceSchema,
  webPageSchema,
} from '@/lib/schema';

export function generateStaticParams() {
  return METIERS.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const m = findMetier(slug);
  if (!m) return {};
  return {
    title: m.metaTitle,
    description: m.metaDescription,
    alternates: { canonical: `/metiers/${m.slug}` },
    openGraph: {
      title: m.metaTitle,
      description: m.metaDescription,
      url: `${SITE_URL}/metiers/${m.slug}`,
      type: 'article',
    },
  };
}

export default async function MetierPage({ params }) {
  const { slug } = await params;
  const m = findMetier(slug);
  if (!m) notFound();

  const url = `${SITE_URL}/metiers/${m.slug}`;
  const agent = PILIER_OFFERS.find((o) => o.key === 'agent-prospection');

  const breadcrumb = breadcrumbSchema([
    { name: 'Accueil', url: `${SITE_URL}/` },
    { name: 'Métiers', url: `${SITE_URL}/metiers` },
    { name: m.label, url },
  ]);

  return (
    <>
      <JsonLd
        data={graph([
          webPageSchema({
            url,
            name: m.metaTitle,
            description: m.metaDescription,
            breadcrumb: { '@id': `${url}#breadcrumb` },
          }),
          { ...breadcrumb, '@id': `${url}#breadcrumb` },
          serviceSchema({
            name: `Agent IA de prospection pour ${m.pluriel}`,
            description: m.metaDescription,
            url,
            setup: agent.setup,
            monthly: agent.monthly,
          }),
          faqSchema(m.faq),
        ])}
      />
      <Nav />

      <main className="flex flex-col">
        <Section className="pt-28 sm:pt-32">
          <Breadcrumb
            items={[
              { label: 'Accueil', href: '/' },
              { label: 'Métiers', href: '/metiers' },
              { label: m.label },
            ]}
          />
          <PageTitle
            lead={`Un agent qui prospecte`}
            accent={`à la place des ${m.pluriel}.`}
            chapeau={m.intro}
          />
        </Section>

        <Section className="pt-0">
          <SectionHead eyebrow="Qui il contacte" />
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-16">
            <div>
              <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-[2rem]">
                Les gens qui ont déjà vos clients
              </h2>
              <p className="mt-4 max-w-2xl text-[var(--muted-strong)]">
                L&apos;agent ne démarche pas des particuliers un par un. Il écrit aux
                professionnels de votre zone qui voient les chantiers avant vous, et qui ont
                intérêt à connaître une entreprise fiable&nbsp;:
              </p>
              <div className="mt-7">
                <CheckList items={m.prescripteurs} />
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-2)] p-7">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--muted)]">
                {m.exempleContexte}
              </p>
              <p className="mt-5 font-serif-it text-lg leading-relaxed text-[var(--foreground)]">
                «&nbsp;{m.exempleMessage}&nbsp;»
              </p>
              <p className="mt-5 border-t border-[var(--border)] pt-5 text-sm leading-relaxed text-[var(--muted)]">
                Un exemple, pas un modèle&nbsp;: chaque message est écrit pour l&apos;entreprise à
                qui il s&apos;adresse, et vous relisez les premiers avant le moindre envoi.
              </p>
            </div>
          </div>
        </Section>

        <Section>
          <SectionHead eyebrow="Ce que ça règle" />
          <h2 className="max-w-3xl text-balance text-2xl font-semibold tracking-tight sm:text-[2rem]">
            Les trois problèmes qu&apos;on nous décrit le plus souvent
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {m.douleurs.map((d) => (
              <Card key={d.t} title={d.t}>
                {d.d}
              </Card>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border-l-2 border-[var(--primary)] bg-[var(--surface-2)] py-6 pl-6 pr-7">
            <h3 className="text-lg font-semibold tracking-tight">
              Le calendrier compte autant que le message
            </h3>
            <p className="mt-3 max-w-3xl leading-relaxed text-[var(--muted-strong)]">
              {m.saisonnalite}
            </p>
          </div>
        </Section>

        <Section>
          <SectionHead eyebrow="Le prix" />
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:gap-16">
            <div>
              <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-[2rem]">
                {eur(agent.setup)} € de fabrication, puis {eur(agent.monthly)} € par mois
              </h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-[var(--muted-strong)]">
                La fabrication paie le travail humain qui a lieu avant le premier message&nbsp;:
                l&apos;infrastructure qui n&apos;est qu&apos;à vous, l&apos;apprentissage de votre
                vocabulaire et de vos objections, le réglage et les tests. Le mensuel paie le
                pilotage&nbsp;: on surveille, on ajuste, on réécrit ce qui ne prend pas.
              </p>
              <p className="mt-4 max-w-2xl leading-relaxed text-[var(--muted-strong)]">
                Si vous partez sur six mois, la fabrication est offerte. Sinon c&apos;est sans
                engagement, et vous arrêtez quand vous voulez.
              </p>
              <a
                href="/#piliers"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary-ink)] hover:underline"
              >
                Voir les trois briques et tous les prix
              </a>
            </div>

            <div className="rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] p-7">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--muted)]">
                Agent de prospection
              </p>
              <p className="mt-4 font-display text-4xl font-semibold tracking-tight">
                {eur(agent.setup)} € HT
              </p>
              <p className="mt-1 text-sm text-[var(--muted)]">de fabrication, une seule fois</p>
              <p className="mt-3 text-lg font-semibold text-[var(--primary-ink)]">
                puis {eur(agent.monthly)} € HT / mois
              </p>
              <p className="mt-5 border-t border-[var(--border)] pt-5 text-sm leading-relaxed text-[var(--muted-strong)]">
                Formule Partenaire&nbsp;: fabrication offerte si vous partez sur 6 mois.
              </p>
            </div>
          </div>
        </Section>

        <Section>
          <FaqBlock items={m.faq} titre={`Questions des ${m.pluriel}`} />
        </Section>

        <Section>
          <LinkGrid
            titre="Votre secteur d'intervention"
            intro="La zone de prospection se définit en communes, avec vous. Voici les territoires où nous avons déjà des agents en service."
            links={VILLES.map((v) => ({
              href: `/agence-ia/${v.slug}`,
              label: v.nom,
              sub: `${v.dept} · ${v.deptNum}`,
            }))}
          />
        </Section>

        <Section>
          <LinkGrid
            titre="Aller plus loin"
            intro="La prospection n'est qu'une des trois briques. Les deux autres pages détaillent le reste."
            links={[
              { href: '/prospection-b2b', label: 'La prospection B2B en détail' },
              { href: '/site-web-artisan', label: 'Site internet et fiche Google' },
            ]}
          />
        </Section>

        <Section>
          <LinkGrid
            titre="Les autres métiers"
            links={METIERS.filter((x) => x.slug !== m.slug).map((x) => ({
              href: `/metiers/${x.slug}`,
              label: x.label,
            }))}
          />
        </Section>

        <Section className="pb-24 sm:pb-32">
          <CtaBand
            titre={`On regarde votre zone, et on vous dit ce qui est faisable`}
            texte="Trente minutes au téléphone, sans engagement. Vous repartez avec une idée claire des prescripteurs joignables autour de vous et du travail que ça demande. Même si vous ne travaillez pas avec nous."
          />
        </Section>
      </main>

      <Footer />
    </>
  );
}
