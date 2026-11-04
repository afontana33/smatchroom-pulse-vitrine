/**
 * Page de service : l'automatisation de l'administratif (04/11/2026).
 *
 * Pour tous les secteurs, pas seulement les artisans. Cible « automatiser son
 * entreprise », « assistant administratif automatisé », « automatisation TPE ».
 * Seul le prix du Pack Bureau automatique est affiché (lib/offers.js,
 * BUREAU_AUTO) ; le détail par automatisation se donne en rendez-vous.
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
import { BUREAU_AUTO, eur } from '@/lib/offers';
import { CALENDLY, SITE_URL } from '@/lib/contact';
import { breadcrumbSchema, faqSchema, graph, serviceSchema, webPageSchema } from '@/lib/schema';

const META_TITLE = 'Automatiser son entreprise : secrétariat, devis, rendez-vous';
const META_DESCRIPTION =
  'Secrétariat WhatsApp 24 h/24, devis et relances, rendez-vous, avis Google, suivi client, '
  + 'comptabilité : automatisez votre administratif avant de recruter. Pack Bureau automatique '
  + `dès ${eur(BUREAU_AUTO.setup)} € HT, puis ${BUREAU_AUTO.monthly} € HT par mois.`;

const URL = `${SITE_URL}/automatisation`;

const SECTEURS = [
  {
    t: 'Artisan, entreprise du bâtiment',
    d: 'Les demandes de devis reçoivent une réponse même pendant que vous êtes sur le chantier, les visites techniques se calent seules et vos clients reçoivent l’avancement des travaux.',
  },
  {
    t: 'Agence immobilière, mandataire',
    d: 'Chaque demande sur une annonce est qualifiée tout de suite (budget, secteur, financement), les visites sont proposées et rappelées, et les avis arrivent après chaque vente.',
  },
  {
    t: 'Cabinet : comptable, conseil, assurance',
    d: 'Les pièces manquantes sont réclamées automatiquement, les rendez-vous de bilan se planifient seuls et chaque client sait où en est son dossier.',
  },
  {
    t: 'Commerce, restauration, services',
    d: 'Les questions (horaires, réservation, disponibilité) trouvent une réponse à toute heure, les réservations sont confirmées et les clients satisfaits laissent un avis.',
  },
];

const RECRUTER = [
  'Un salaire chargé de l’ordre de 2 800 à 3 500 € par mois pour un poste administratif ou commercial à temps plein',
  'Des semaines de recrutement et de formation avant d’être opérationnel',
  'Des horaires de bureau, des congés et des absences à remplacer',
];

const AUTOMATISER = [
  `${eur(BUREAU_AUTO.setup)} € HT de mise en place, puis ${BUREAU_AUTO.monthly} € HT par mois, sans engagement`,
  'Une mise en place progressive en 2 à 3 semaines, une automatisation après l’autre',
  'Disponible 24 h sur 24, 7 jours sur 7, sans oubli ni relance oubliée',
];

const ETAPES = [
  { t: '1. Un appel de 30 minutes', d: 'Vous nous montrez comment vous travaillez aujourd’hui : outils, demandes, tâches qui vous prennent du temps.' },
  { t: '2. On choisit ensemble', d: 'Nous repérons ce qui peut être automatisé et ce qui doit rester entre vos mains. Vous validez chaque scénario.' },
  { t: '3. Mise en place', d: 'Nous branchons les automatisations une par une sur vos outils existants : WhatsApp, agenda, mails, logiciel comptable.' },
  { t: '4. Suivi', d: 'Nous ajustons au fil des semaines. Vous gardez la main : vous pouvez reprendre une conversation ou couper une automatisation à tout moment.' },
];

const FAQ = [
  {
    q: 'Combien coûte le Pack Bureau automatique ?',
    a: `${eur(BUREAU_AUTO.setup)} € HT de mise en place, puis ${BUREAU_AUTO.monthly} € HT par mois, sans engagement. `
      + 'Il comprend les six automatisations. Si vous n’en voulez qu’une ou deux, nous vous faisons une proposition adaptée.',
  },
  {
    q: 'Est-ce que je dois changer d’outils ?',
    a: 'Non. Nous partons de ce que vous utilisez déjà : votre numéro WhatsApp, votre agenda, votre boîte mail et votre logiciel de devis ou de comptabilité, quand c’est possible.',
  },
  {
    q: 'Mes clients vont-ils parler à un robot ?',
    a: 'Les réponses partent en votre nom, avec votre ton, et vous recevez chaque demande importante. Vous pouvez reprendre la conversation à tout moment, et ce qui demande votre jugement (un prix, un litige) reste entre vos mains.',
  },
  {
    q: 'Combien de temps pour la mise en place ?',
    a: 'Deux à trois semaines pour l’ensemble du pack. Les premières automatisations, comme le secrétariat WhatsApp ou les rappels de rendez-vous, sont souvent actives dès la première semaine.',
  },
  {
    q: 'Et pour trouver de nouveaux clients ?',
    a: 'C’est notre autre métier : l’agent qui démarche vos apporteurs d’affaires, la publicité Facebook et Instagram et le site internet. Les deux se combinent très bien.',
  },
];

export const metadata = {
  title: META_TITLE,
  description: META_DESCRIPTION,
  alternates: { canonical: '/automatisation' },
  openGraph: { title: META_TITLE, description: META_DESCRIPTION, url: URL, type: 'article' },
};

export default function AutomatisationPage() {
  const b = BUREAU_AUTO;
  const breadcrumb = breadcrumbSchema([
    { name: 'Accueil', url: `${SITE_URL}/` },
    { name: 'Automatisation', url: URL },
  ]);

  return (
    <>
      <JsonLd
        data={graph([
          webPageSchema({ url: URL, name: META_TITLE, description: META_DESCRIPTION, breadcrumb: { '@id': `${URL}#breadcrumb` } }),
          { ...breadcrumb, '@id': `${URL}#breadcrumb` },
          serviceSchema({ name: b.name, description: META_DESCRIPTION, url: URL, setup: b.setup, monthly: b.monthly }),
          faqSchema(FAQ),
        ])}
      />
      <Nav />

      <main className="flex flex-col">
        <Section className="pt-28 sm:pt-32">
          <Breadcrumb items={[{ label: 'Accueil', href: '/' }, { label: 'Automatisation' }]} />
          <PageTitle
            lead="Automatisez votre bureau"
            accent="avant de recruter."
            chapeau="Répondre aux clients, relancer les devis, caler les rendez-vous, demander des avis, classer les factures : une grande partie de ce travail peut aujourd’hui tourner seule, à distance, pour une fraction du prix d’un salarié. Quel que soit votre métier."
          />
        </Section>

        <Section className="pt-0">
          <SectionHead eyebrow="Ce que nous automatisons" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {b.automatisations.map((a) => (
              <Card key={a.t} title={a.t}>
                {a.d}
              </Card>
            ))}
          </div>
        </Section>

        <Section>
          <SectionHead eyebrow="Selon votre métier" />
          <div className="grid gap-6 md:grid-cols-2">
            {SECTEURS.map((s) => (
              <Card key={s.t} title={s.t}>
                {s.d}
              </Card>
            ))}
          </div>
        </Section>

        <Section>
          <SectionHead eyebrow="Recruter ou automatiser" />
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] p-7">
              <h2 className="text-xl font-semibold tracking-tight">Recruter une personne de plus</h2>
              <ul className="mt-5 space-y-3 text-sm text-[var(--muted-strong)]">
                {RECRUTER.map((r) => (
                  <li key={r}>· {r}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border-2 border-[var(--primary)] bg-[var(--surface)] p-7">
              <h2 className="text-xl font-semibold tracking-tight">Automatiser avec Pulse</h2>
              <div className="mt-5">
                <CheckList items={AUTOMATISER} />
              </div>
            </div>
          </div>
          <p className="mt-6 max-w-3xl text-sm text-[var(--muted-strong)]">
            L’idée n’est pas de remplacer votre équipe, mais de lui rendre le temps passé au
            téléphone et sur les papiers.
          </p>
        </Section>

        <Section>
          <SectionHead eyebrow="Le pack complet" />
          <div className="flex flex-col gap-6 rounded-3xl border-2 border-[var(--primary)] bg-[var(--surface)] p-7 sm:p-9 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--muted)]">{b.name}</p>
              <p className="mt-3 font-display text-5xl font-bold tracking-tight">
                {eur(b.setup)} € <span className="text-xl font-semibold text-[var(--muted)]">HT</span>
              </p>
              <p className="mt-1 text-lg font-semibold text-[var(--primary-ink)]">puis {b.monthly} € HT par mois</p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted-strong)]">
                Les six automatisations, sans engagement. Besoin d’une seule&nbsp;? Nous vous
                faisons une proposition sur mesure.
              </p>
            </div>
            <a
              href={`${CALENDLY}?utm_source=site&utm_medium=automatisation&utm_content=${b.key}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center justify-center px-6 py-3.5 text-sm font-bold"
            >
              En parler 15 minutes
            </a>
          </div>
        </Section>

        <Section>
          <SectionHead eyebrow="Comment ça se passe" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {ETAPES.map((e) => (
              <Card key={e.t} title={e.t}>
                {e.d}
              </Card>
            ))}
          </div>
        </Section>

        <Section>
          <FaqBlock items={FAQ} titre="Questions sur l’automatisation" />
        </Section>

        <Section>
          <LinkGrid
            titre="Trouver aussi de nouveaux clients"
            links={[
              { href: '/apporteur-affaires', label: 'Trouver des apporteurs d’affaires' },
              { href: '/publicite-facebook-instagram', label: 'Publicité Facebook et Instagram' },
              { href: '/site-web-artisan', label: 'Site internet et fiche Google' },
              { href: '/prospection-b2b', label: 'Prospection B2B' },
            ]}
          />
        </Section>

        <Section className="pb-24 sm:pb-32">
          <CtaBand
            titre="On regarde ensemble ce qui peut tourner seul chez vous"
            texte="15 minutes au téléphone, gratuit et sans engagement. Vous repartez avec la liste des tâches automatisables dans votre entreprise."
          />
        </Section>
      </main>

      <Footer />
    </>
  );
}
