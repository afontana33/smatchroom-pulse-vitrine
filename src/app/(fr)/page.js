import Nav from '@/components/Nav';
import HeroLancement from '@/components/lp/HeroLancement';
import Thesis from '@/components/lp/Thesis';
import TeamLp from '@/components/lp/TeamLp';
import Piliers from '@/components/lp/Piliers';
import AgentClients from '@/components/lp/AgentClients';
import Preuves from '@/components/lp/Preuves';
import AvisLp from '@/components/lp/AvisLp';
import FaqLp from '@/components/lp/FaqLp';
import FinalCtaLp from '@/components/lp/FinalCtaLp';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import { QUESTIONS } from '@/lib/faq';
import { ALL_OFFERS } from '@/lib/offers';
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
 * qui nous sommes et l'équipe. Packs et AutresAgents retirés de l'accueil.
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
export const metadata = {
  alternates: alternatesFor('/', 'fr'),
};

export default function Page() {
  /* Les neuf prestations vendues, avec leur prix. L'accueil est la page qui les
     porte toutes : c'est donc ici que le catalogue est déclaré, pas en morceaux
     sur des pages qui n'existent plus. */
  const services = ALL_OFFERS.map((o) =>
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
            name: 'SmatchRoom Pulse · On va chercher vos clients à votre place',
            description:
              "Agence d'automatisation et d'IA pour artisans, TPE et PME : agents IA qui prospectent et répondent 7j/7, sites et fiches établissement Google, acquisition Meta. Prix affichés.",
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
      <AgentClients />
      <Thesis />
      <TeamLp />
      <FaqLp />
      <FinalCtaLp />
      <Footer />
    </main>
  );
}
