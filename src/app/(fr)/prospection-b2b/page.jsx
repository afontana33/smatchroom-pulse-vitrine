/**
 * Page de service : la prospection commerciale B2B automatisée.
 *
 * Cible « agence de prospection B2B », « agence de génération de leads » et
 * « prospection commerciale automatique ». Ce sont les requêtes les plus chères
 * du marché, donc les plus intentionnelles, et le site n'avait aucune page à
 * leur donner : la landing parle d'abord aux artisans, ce qui perd un directeur
 * commercial dès la première ligne.
 *
 * Deux offres cohabitent ici et il ne faut pas les confondre : l'agent de
 * prospection, qui écrit aux professionnels de la zone d'un artisan, et l'Agent
 * Clients B2B, qui qualifie des comptes pour une force de vente. Les prix
 * viennent de lib/offers.js, jamais écrits à la main.
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
import { PILIER_OFFERS, eur, monthlyLabel, setupLabel } from '@/lib/offers';
import { SITE_URL } from '@/lib/contact';
import {
  breadcrumbSchema,
  faqSchema,
  graph,
  serviceSchema,
  webPageSchema,
} from '@/lib/schema';

const META_TITLE = 'Agence de prospection B2B : la prospection commerciale automatisée';
const META_DESCRIPTION =
  "Agence de prospection B2B : un agent contacte vos prospects, qualifie le besoin et le "
  + "budget, puis passe la main à vos commerciaux. Prix affichés.";

const URL = `${SITE_URL}/prospection-b2b`;

const CE_QUE_FAIT = [
  'Construit la liste des entreprises de votre marché, à partir de données publiques',
  'Écrit à chacune un message qui lui est propre, pas un publipostage',
  'Relance au bon moment, sans harceler et sans répéter le premier message',
  'Répond en moins d’une minute, sept jours sur sept',
  'Qualifie le besoin, le budget et le calendrier avant de vous passer la main',
  'S’arrête net sur toute demande d’opposition, et la retient',
];

const FAQ = [
  {
    q: 'Combien coûte une agence de prospection B2B ?',
    a: "Chez nous, deux formules. L'agent de prospection est à 99 € HT par mois, "
      + "sans frais de création ni engagement. L'Agent Clients B2B, avec base de données sur mesure et "
      + "qualification avant transmission aux commerciaux, démarre à 490 € HT de fabrication puis 340 € HT par mois "
      + "avec un numéro WhatsApp (environ 300 décideurs par mois), 640 € HT par mois avec 2 à 3 numéros, et sur devis au-delà. Pas de commission au rendez-vous, pas de facturation à la "
      + "performance.",
  },
  {
    q: 'Quelle différence avec un SDR ou un commercial junior ?',
    a: "Le coût et la régularité. Un agent ne prend pas de retard sur les relances, ne décroche "
      + "pas, et ne perd pas le fil d'une conversation de trois semaines. En revanche il ne "
      + "négocie pas et ne signe rien : il amène l'interlocuteur qualifié jusqu'à votre "
      + "commercial, qui garde la vente.",
  },
  {
    q: 'D’où viennent les contacts ?',
    a: "De données publiques : registres d'entreprises, annuaires professionnels, sources "
      + "ouvertes de votre secteur. Nous n'achetons pas de fichiers et nous ne collectons pas de "
      + "données de particuliers. Chaque contact est rattaché à une entreprise identifiée.",
  },
  {
    q: 'Est-ce que c’est légal, et conforme au RGPD ?',
    a: "La prospection entre professionnels est autorisée si l'objet du message concerne l'activité "
      + "de la personne contactée, si l'expéditeur est identifiable et si l'opposition est "
      + "possible et immédiate. Les trois sont tenues. Le caractère automatisé de l'envoi est "
      + "mentionné, et toute opposition est définitive.",
  },
  {
    q: 'Combien de messages par jour ?',
    a: "On démarre bas et on monte progressivement. Un volume élevé dès le premier jour fait "
      + "tomber le canal, quelle que soit la qualité du message. Le rythme se règle avec vous, il "
      + "n'est jamais imposé.",
  },
  {
    q: 'Qu’est-ce que je relis avant que ça parte ?',
    a: "Les premiers messages, systématiquement. Ensuite vous gardez la main : vous voyez les "
      + "conversations en cours et vous pouvez reprendre n'importe laquelle à tout moment.",
  },
  {
    q: 'En combien de temps est-ce en service ?',
    a: "48 heures pour un agent branché sur des données publiques. Une connexion à votre CRM ou à "
      + "votre ERP demande plus de cadrage, et la fourchette est donnée après le premier échange.",
  },
];

export const metadata = {
  title: META_TITLE,
  description: META_DESCRIPTION,
  alternates: { canonical: '/prospection-b2b' },
  openGraph: {
    title: META_TITLE,
    description: META_DESCRIPTION,
    url: URL,
    type: 'article',
  },
};

export default function ProspectionB2BPage() {
  const agent = PILIER_OFFERS.find((o) => o.key === 'agent-prospection');
  const clients = PILIER_OFFERS.find((o) => o.key === 'agent-clients-b2b');

  const breadcrumb = breadcrumbSchema([
    { name: 'Accueil', url: `${SITE_URL}/` },
    { name: 'Prospection B2B', url: URL },
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
            name: 'Prospection commerciale B2B automatisée',
            description: META_DESCRIPTION,
            url: URL,
            setup: agent.setup,
            monthly: agent.monthly,
          }),
          serviceSchema({
            name: clients.name,
            description: clients.description,
            url: URL,
            setup: clients.setup,
            setupFrom: clients.setupFrom,
            monthly: clients.monthly,
          }),
          faqSchema(FAQ),
        ])}
      />
      <Nav />

      <main className="flex flex-col">
        <Section className="pt-28 sm:pt-32">
          <Breadcrumb items={[{ label: 'Accueil', href: '/' }, { label: 'Prospection B2B' }]} />
          <PageTitle
            lead="La prospection commerciale,"
            accent="faite tous les jours, sans vous."
            chapeau="Une agence de prospection classique vous vend des rendez-vous. Nous installons un agent qui travaille votre marché en continu, en votre nom, et qui vous passe la main quand l’interlocuteur est vraiment intéressé."
          />
        </Section>

        <Section className="pt-0">
          <SectionHead eyebrow="Ce que fait l’agent" />
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-16">
            <div>
              <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-[2rem]">
                Le travail que personne n’a le temps de faire
              </h2>
              <p className="mt-4 max-w-2xl text-[var(--muted-strong)]">
                La prospection ne rate pas par manque d’idées. Elle rate parce qu’elle passe après
                les urgences, et qu’une relance oubliée est un prospect perdu&nbsp;:
              </p>
              <div className="mt-7">
                <CheckList items={CE_QUE_FAIT} />
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-2)] p-7">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--muted)]">
                Ce qu’il ne fait pas
              </p>
              <ul className="mt-5 space-y-4 text-[0.95rem] leading-relaxed text-[var(--muted-strong)]">
                <li>Il ne négocie pas et ne signe rien à votre place.</li>
                <li>Il n’écrit pas à des particuliers.</li>
                <li>Il n’invente aucune référence et ne promet aucun délai.</li>
                <li>Il ne relance jamais quelqu’un qui s’est opposé.</li>
              </ul>
              <p className="mt-5 border-t border-[var(--border)] pt-5 text-sm leading-relaxed text-[var(--muted)]">
                Ce sont des règles écrites au cadrage, pas des intentions.
              </p>
            </div>
          </div>
        </Section>

        <Section>
          <SectionHead eyebrow="Deux formules" />
          <h2 className="max-w-3xl text-balance text-2xl font-semibold tracking-tight sm:text-[2rem]">
            Selon que vous vendez un chantier ou un contrat
          </h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
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
                Pour une entreprise qui vend une prestation sur une zone. L’agent écrit aux
                professionnels de votre secteur qui voient les affaires avant vous. Fabrication
                offerte si vous partez sur six mois.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] p-7">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--muted)]">
                Agent Clients B2B
              </p>
              <p className="mt-4 font-display text-4xl font-semibold tracking-tight">
                {setupLabel(clients)}
              </p>
              <p className="mt-1 text-sm text-[var(--muted)]">de fabrication, une seule fois</p>
              <p className="mt-3 text-lg font-semibold text-[var(--primary-ink)]">
                puis {monthlyLabel(clients)}
              </p>
              <p className="mt-5 border-t border-[var(--border)] pt-5 text-sm leading-relaxed text-[var(--muted-strong)]">
                Pour une entreprise qui a des commerciaux à alimenter. Base de données construite
                pour votre marché, agent entraîné sur votre catalogue et vos objections,
                qualification du besoin, du budget et du calendrier avant transmission. Le
                périmètre se chiffre après l’audit : un marché de trois cents acheteurs et un
                marché de trente mille ne demandent pas le même travail.
              </p>
            </div>
          </div>
          <a
            href="/#piliers"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary-ink)] hover:underline"
          >
            Voir toutes les briques et tous les prix
          </a>
        </Section>

        <Section>
          <SectionHead eyebrow="Ce qui change" />
          <h2 className="max-w-3xl text-balance text-2xl font-semibold tracking-tight sm:text-[2rem]">
            Trois différences avec une agence de génération de leads
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <Card title="Vous gardez la base">
              La liste d’entreprises construite pour vous reste la vôtre. Une agence qui facture au
              rendez-vous garde son fichier, et vous repartez de zéro le jour où vous arrêtez.
            </Card>
            <Card title="Le message n’est pas un modèle">
              Chaque message est écrit pour l’entreprise à qui il s’adresse, à partir de ce qui est
              vérifiable sur elle. Un publipostage se reconnaît en une ligne, et il brûle le canal
              pour les mois suivants.
            </Card>
            <Card title="Le prix est fixe">
              Un montant de fabrication, un mensuel, et c’est tout. Pas de commission au rendez-vous
              obtenu, donc aucun intérêt à vous envoyer des rendez-vous qui ne valent rien.
            </Card>
          </div>
        </Section>

        <Section>
          <FaqBlock items={FAQ} titre="Questions sur la prospection B2B" />
        </Section>

        <Section>
          <LinkGrid
            titre="Par métier"
            intro="Les prescripteurs à contacter ne sont pas les mêmes d’un métier à l’autre. Voici ceux que nous avons déjà travaillés."
            links={METIERS.map((m) => ({ href: `/metiers/${m.slug}`, label: m.label }))}
          />
        </Section>

        <Section>
          <LinkGrid
            titre="Aller plus loin"
            links={[
              { href: '/site-web-artisan', label: 'Site internet et fiche Google' },
              { href: '/agence-ia', label: 'Nos zones d’intervention' },
              { href: '/agent-ia', label: 'Comprendre les agents IA' },
              { href: '/blog', label: 'Le journal' },
            ]}
          />
        </Section>

        <Section className="pb-24 sm:pb-32">
          <CtaBand
            titre="On regarde votre marché, et on vous dit ce qui est atteignable"
            texte="Trente minutes au téléphone, sans engagement. Vous repartez avec le volume d’entreprises joignables sur votre cible et le travail que ça représente. Même si vous ne travaillez pas avec nous."
          />
        </Section>
      </main>

      <Footer />
    </>
  );
}
