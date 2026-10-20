import Nav from '@/components/Nav';
import MetiersPrescripteurs from '@/components/lp/MetiersPrescripteurs';
import HeroLancement from '@/components/lp/HeroLancement';
import Thesis from '@/components/lp/Thesis';
import Piliers from '@/components/lp/Piliers';
import DeuxAgents from '@/components/lp/DeuxAgents';
import AgentClients from '@/components/lp/AgentClients';
import SuiviHumain from '@/components/lp/SuiviHumain';
import MethodeB2B from '@/components/lp/MethodeB2B';
import Preuves from '@/components/lp/Preuves';
import AvisLp from '@/components/lp/AvisLp';
import FaqLp from '@/components/lp/FaqLp';
import FinalCtaLp from '@/components/lp/FinalCtaLp';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import { QUESTIONS } from '@/lib/faq';
import { PACK_LANCEMENT, PILIER_OFFERS } from '@/lib/offers';
import { SITE_URL } from '@/lib/contact';
import { alternatesFor } from '@/lib/i18n';
import { faqSchema, graph, serviceSchema, webPageSchema } from '@/lib/schema';

/**
 * Landing unique.
 *
 * Tout le discours commercial tient sur cette page : les anciennes pages
 * produit (/sites, /pulse-terrain, /grands-comptes, /entreprises,
 * /entrepreneurs, /artisans, /scale, /partenaires) ont été supprimées et
 * redirigent en 301 vers les ancres correspondantes (voir next.config.mjs).
 * Restent à part le blog, les hubs éditoriaux et les pages légales.
 *
 * Ordre voulu (passe conversion 2026-10-11) : offre d'entrée et rendez-vous
 * dès le hero, preuves juste après, puis le détail des piliers, l'offre B2B,
 * qui nous sommes. Packs, AutresAgents et TeamLp retirés de l'accueil.
 *
 * La FAQ est revenue (FaqLp), juste avant le dernier appel : elle ne documente
 * pas le produit, elle lève les trois objections qui font reporter la prise de
 * rendez-vous. La retirer fait perdre des réservations.
 *
 * Ce qui reste retiré volontairement : la démo interactive, la section
 * technologie, la timeline 48h et le terminal live.
 */
/* Canonique déclarée page par page et pas dans le layout : une canonique posée
   dans le layout ferait pointer toutes les pages du site vers l'accueil.

   `alternatesFor` ajoute le couple hreflang fr-FR / en vers la landing
   anglaise. Le hreflang doit être réciproque pour être pris en compte : cette
   page déclare /en, et /en déclare celle-ci. Les autres pages françaises n'ont
   pas d'équivalent anglais et gardent leur seule canonique. */
const META_TITLE = 'Prospection B2B et apporteurs d’affaires · SmatchRoom Pulse';
const META_DESCRIPTION =
  "Agents de prospection par WhatsApp et email dès 149 € HT/mois sans engagement. Pack Lancement Entrepreneurs "
  + "490 € HT : site, fiche Google et 3 mois d'agent.";

export const metadata = {
  title: META_TITLE,
  description: META_DESCRIPTION,
  alternates: alternatesFor('/', 'fr'),
};

export default function Page() {
  /* Les offres présentées sur l'accueil, avec leur prix. */
  const services = [PACK_LANCEMENT, ...PILIER_OFFERS].map((o) =>
    serviceSchema({
      name: o.name,
      description: o.description,
      setup: o.setup,
      setupFrom: o.setupFrom,
      monthly: o.monthly,
    })
  );

  return (
    <main className="flex flex-col">
      <JsonLd
        data={graph([
          webPageSchema({
            url: `${SITE_URL}/`,
            name: META_TITLE,
            description: META_DESCRIPTION,
          }),
          faqSchema(QUESTIONS),
          ...services,
        ])}
      />
      <Nav />
      <HeroLancement />
      <Preuves />
      <AvisLp />
      <Piliers />
      <DeuxAgents />
      <MetiersPrescripteurs />
      <AgentClients />
      <SuiviHumain />
      <MethodeB2B />
      <Thesis />
      <FaqLp />
      <FinalCtaLp />
      <Footer />
    </main>
  );
}
