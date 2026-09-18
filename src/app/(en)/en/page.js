/**
 * Accueil anglais.
 *
 * Ce n'est pas la traduction de l'accueil français. Le français vend trois
 * briques à des artisans et des TPE (agent, site et fiche Google, acquisition
 * Meta) ; l'anglais vend une seule chose à des entreprises qui vendent à des
 * entreprises : l'agent qui travaille leur marché. Les deux autres briques
 * n'ont pas d'acheteur ici et diluaient la page.
 *
 * Les montants viennent de lib/offers.js et les questions de lib/faq-en.js,
 * jamais écrits dans cette page : ce sont les deux choses qui se périment, et
 * les avoir en double garantit qu'une des deux copies finira fausse.
 */

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import HeroEn from '@/components/en/HeroEn';
import WhatWeDoEn from '@/components/en/WhatWeDoEn';
import AgentEn from '@/components/en/AgentEn';
import HowEn from '@/components/en/HowEn';
import ResultsEn from '@/components/en/ResultsEn';
import CtaEn from '@/components/en/CtaEn';
import { FaqBlock, Section } from '@/components/seo/Blocks';
import { QUESTIONS_EN } from '@/lib/faq-en';
import { PILIER_OFFERS } from '@/lib/offers';
import { TEL_DISPLAY_INTL } from '@/lib/contact';
import { alternatesFor, absolute, HREFLANG } from '@/lib/i18n';
import { faqSchema, graph, serviceSchema, webPageSchema } from '@/lib/schema';

const PATH = '/en';
const URL = absolute(PATH);

const TITLE = 'B2B prospecting agents for sales teams · SmatchRoom Pulse';
const DESCRIPTION =
  'We build and run the AI agent that works your B2B market: custom database, personalised outreach, need and budget qualified before your reps step in.';

/* Nom et description anglais du service, écrits ici et non dans offers.js :
   ce fichier-là porte les montants, qui sont communs aux deux langues, pas la
   prose commerciale, qui ne l'est pas. */
const SERVICE_NAME = 'B2B prospecting agent';
const SERVICE_DESCRIPTION =
  'A database built for your market, an agent trained on your catalogue and your objections, and the need, budget and timeline qualified before the conversation reaches your sales team.';

const NAV_LINKS = [
  { href: '/en#what-we-do', label: 'Who we are' },
  { href: '/en#agent', label: 'What we build' },
  { href: '/en#pricing', label: 'Pricing' },
  { href: '/en#how', label: 'How it goes' },
  { href: '/en#results', label: 'Results' },
  { href: '/en#questions', label: 'Questions' },
];

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: alternatesFor(PATH, 'en'),
  openGraph: {
    title: 'SmatchRoom Pulse · We go and find your customers',
    description: SERVICE_DESCRIPTION,
    url: URL,
    siteName: 'SmatchRoom Pulse',
    locale: 'en_US',
    type: 'website',
  },
};

export default function EnglishHome() {
  const offer = PILIER_OFFERS.find((o) => o.key === 'agent-clients-b2b');

  return (
    <main className="flex flex-col">
      <JsonLd
        data={graph([
          webPageSchema({
            url: URL,
            name: TITLE,
            description: DESCRIPTION,
            lang: HREFLANG.en,
          }),
          serviceSchema({
            name: SERVICE_NAME,
            description: SERVICE_DESCRIPTION,
            url: URL,
            setup: offer.setup,
            setupFrom: offer.setupFrom,
            monthly: offer.monthly,
          }),
          faqSchema(QUESTIONS_EN),
        ])}
      />

      <Nav
        links={NAV_LINKS}
        cta="Book a slot"
        callLabel="Call"
        callAria="Call"
        phone={TEL_DISPLAY_INTL}
        home="/en"
        locale="en"
      />

      <HeroEn />
      <WhatWeDoEn />
      <AgentEn />
      <HowEn />
      <ResultsEn />

      <Section id="questions" className="scroll-mt-24">
        <FaqBlock items={QUESTIONS_EN} titre="Questions we get asked" />
      </Section>

      <CtaEn />
      <Footer locale="en" />
    </main>
  );
}
