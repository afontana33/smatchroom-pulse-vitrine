/**
 * Page par ville : « Agence d'IA et d'automatisation à Bordeaux », etc.
 *
 * Cible les requêtes locales à intention commerciale (« agence automatisation
 * <ville> », « agent IA <ville> »), là où la page d'accueil ne peut pas se
 * positionner puisqu'elle ne nomme aucune ville.
 *
 * Le segment d'URL est `/agence-ia/` et non `/villes/` : l'URL est un signal de
 * pertinence faible mais réel, et « villes » ne décrit pas ce qu'on vend.
 *
 * Chaque page porte un contenu local vrai (tissu économique, communes
 * couvertes, particularité du marché) écrit à la main dans lib/seo-local.js.
 * Le jour où l'on voudra ajouter une ville sans avoir rien de vrai à en dire,
 * il faudra s'abstenir : une page locale creuse fait baisser la qualité perçue
 * de tout le dossier, pas seulement la sienne.
 */

import { notFound } from 'next/navigation';

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
import { METIERS, VILLES, findMetier, findVille } from '@/lib/seo-local';
import { AGENT_OFFERS, PILIER_OFFERS, monthlyLabel, setupLabel } from '@/lib/offers';
import { SITE_URL } from '@/lib/contact';
import {
  breadcrumbSchema,
  faqSchema,
  graph,
  serviceSchema,
  webPageSchema,
} from '@/lib/schema';

export function generateStaticParams() {
  return VILLES.map((v) => ({ ville: v.slug }));
}

export async function generateMetadata({ params }) {
  const { ville } = await params;
  const v = findVille(ville);
  if (!v) return {};
  return {
    title: v.metaTitle,
    description: v.metaDescription,
    alternates: { canonical: `/agence-ia/${v.slug}` },
    openGraph: {
      title: v.metaTitle,
      description: v.metaDescription,
      url: `${SITE_URL}/agence-ia/${v.slug}`,
      type: 'website',
    },
  };
}

export default async function VillePage({ params }) {
  const { ville } = await params;
  const v = findVille(ville);
  if (!v) notFound();

  const url = `${SITE_URL}/agence-ia/${v.slug}`;
  const metiersPhares = v.metiers.map(findMetier).filter(Boolean);

  const breadcrumb = breadcrumbSchema([
    { name: 'Accueil', url: `${SITE_URL}/` },
    { name: 'Zones desservies', url: `${SITE_URL}/agence-ia` },
    { name: v.nom, url },
  ]);

  /* Les prestations déclarées avec la ville en `areaServed` : c'est ce qui
     relie l'offre au territoire pour les moteurs, là où la page d'accueil ne
     déclare qu'une couverture départementale. */
  const services = [...PILIER_OFFERS, ...AGENT_OFFERS].map((o) =>
    serviceSchema({
      name: `${o.name} à ${v.nom}`,
      description: o.description,
      setup: o.setup,
      setupFrom: o.setupFrom,
      monthly: o.monthly,
      cities: [v.nom, ...v.communes],
    })
  );

  return (
    <>
      <JsonLd
        data={graph([
          webPageSchema({
            url,
            name: v.metaTitle,
            description: v.metaDescription,
            breadcrumb: { '@id': `${url}#breadcrumb` },
          }),
          { ...breadcrumb, '@id': `${url}#breadcrumb` },
          ...services,
          faqSchema(v.faq),
        ])}
      />
      <Nav />

      <main className="flex flex-col">
        <Section className="pt-28 sm:pt-32">
          <Breadcrumb
            items={[
              { label: 'Accueil', href: '/' },
              { label: 'Zones desservies', href: '/agence-ia' },
              { label: v.nom },
            ]}
          />
          <PageTitle
            lead={`Agents IA et automatisation`}
            accent={`à ${v.nom}.`}
            chapeau={v.intro}
          />
        </Section>

        <Section className="pt-0">
          <SectionHead eyebrow={`${v.dept} · ${v.deptNum}`} />
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-[2rem]">
                Ce que le marché local a de particulier
              </h2>
              <p className="mt-5 leading-relaxed text-[var(--muted-strong)]">{v.tissu}</p>
              <p className="mt-4 leading-relaxed text-[var(--muted-strong)]">{v.specificite}</p>
            </div>

            <div className="rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-2)] p-7">
              <h3 className="font-display text-lg font-semibold tracking-tight sm:text-xl">
                Communes couvertes autour de {v.nom}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                Liste indicative. La zone réelle se fixe avec vous au cadrage, commune par
                commune, en tenant compte de vos temps de trajet.
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {[v.nom, ...v.communes].map((c) => (
                  <li
                    key={c}
                    className="chip px-3 py-1.5 text-[0.82rem] font-medium text-[var(--muted-strong)]"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        <Section>
          <SectionHead eyebrow="Métiers dominants ici" />
          <h2 className="max-w-3xl text-balance text-2xl font-semibold tracking-tight sm:text-[2rem]">
            Les métiers pour lesquels on nous appelle le plus à {v.nom}
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {metiersPhares.map((m) => (
              <Card key={m.slug} title={m.label}>
                {m.intro}{' '}
                <a
                  href={`/metiers/${m.slug}`}
                  className="font-semibold text-[var(--primary-ink)] hover:underline"
                >
                  Voir la page {m.nom}
                </a>
              </Card>
            ))}
          </div>
        </Section>

        <Section>
          <SectionHead eyebrow="Ce qu'on installe" />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {PILIER_OFFERS.map((o) => (
              <article
                key={o.key}
                className="flex flex-col rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] p-6"
              >
                <h3 className="font-display text-lg font-semibold leading-tight tracking-tight">
                  {o.name}
                </h3>
                <p className="mt-3 flex-1 text-[0.92rem] leading-relaxed text-[var(--muted-strong)]">
                  {o.description}
                </p>
                <p className="mt-5 border-t border-[var(--border)] pt-4 font-display text-2xl font-semibold tracking-tight">
                  {setupLabel(o)}
                </p>
                <p className="mt-0.5 text-sm text-[var(--muted)]">de fabrication</p>
                <p className="mt-2 text-[0.95rem] font-semibold text-[var(--primary-ink)]">
                  puis {monthlyLabel(o)}
                </p>
              </article>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            Montants hors taxes, identiques partout&nbsp;: nous n&apos;avons pas de tarif à la
            ville. Le détail des formules, des packs et des cinq agents complémentaires est sur{' '}
            <a href="/#piliers" className="font-semibold text-[var(--primary-ink)] hover:underline">
              la page d&apos;accueil
            </a>
            .
          </p>
        </Section>

        <Section>
          <FaqBlock items={v.faq} titre={`Questions sur ${v.nom}`} />
        </Section>

        <Section>
          <LinkGrid
            titre="Aller plus loin"
            intro="Le détail des deux prestations, hors de la zone d'intervention."
            links={[
              { href: '/prospection-b2b', label: 'La prospection B2B en détail' },
              { href: '/site-web-artisan', label: 'Site internet et fiche Google' },
            ]}
          />
        </Section>

        <Section>
          <LinkGrid
            titre="Tous les métiers"
            links={METIERS.map((m) => ({ href: `/metiers/${m.slug}`, label: m.label }))}
          />
        </Section>

        <Section>
          <LinkGrid
            titre="Les autres territoires"
            links={VILLES.filter((x) => x.slug !== v.slug).map((x) => ({
              href: `/agence-ia/${x.slug}`,
              label: x.nom,
              sub: `${x.dept} · ${x.deptNum}`,
            }))}
          />
        </Section>

        <Section className="pb-24 sm:pb-32">
          <CtaBand
            titre={`Trente minutes pour regarder votre zone autour de ${v.nom}`}
            texte="On liste les prescripteurs réellement joignables autour de vous, on vous dit ce qui est faisable et ce qui ne l'est pas. Sans engagement, et même si vous ne travaillez pas avec nous."
          />
        </Section>
      </main>

      <Footer />
    </>
  );
}
