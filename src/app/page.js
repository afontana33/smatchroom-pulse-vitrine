import Nav from '@/components/Nav';
import HeroLp from '@/components/lp/HeroLp';
import Thesis from '@/components/lp/Thesis';
import TeamLp from '@/components/lp/TeamLp';
import Piliers from '@/components/lp/Piliers';
import Packs from '@/components/lp/Packs';
import AgentClients from '@/components/lp/AgentClients';
import Preuves from '@/components/lp/Preuves';
import AvisLp from '@/components/lp/AvisLp';
import FaqLp from '@/components/lp/FaqLp';
import FinalCtaLp from '@/components/lp/FinalCtaLp';
import Footer from '@/components/Footer';

/**
 * Landing unique.
 *
 * Tout le discours commercial tient sur cette page : les anciennes pages
 * produit (/sites, /pulse-terrain, /grands-comptes, /entreprises,
 * /entrepreneurs, /artisans, /scale, /partenaires) ont été supprimées et
 * redirigent en 301 vers les ancres correspondantes (voir next.config.mjs).
 * Restent à part le blog, les hubs éditoriaux et les pages légales.
 *
 * Ordre voulu : on se présente avant de vendre (thèse, équipe), on vend avec
 * les prix affichés dans la section (piliers), puis on prouve (résultats,
 * avis). La preuve arrive après le prix : elle sert à lever le doute, pas à
 * créer l'envie.
 *
 * Piliers décrit les trois briques, Packs les assemble en quatre points
 * d'entrée avec le prix du montage, AgentClients traite à part les entreprises
 * qui vendent à des entreprises. Les trois se suivent et ne se répètent pas :
 * ne pas remettre de description de brique dans Packs, ni de pack dans
 * AgentClients.
 *
 * La FAQ est revenue (FaqLp), juste avant le dernier appel : elle ne documente
 * pas le produit, elle lève les trois objections qui font reporter la prise de
 * rendez-vous. La retirer fait perdre des réservations.
 *
 * Ce qui reste retiré volontairement : la démo interactive, la section
 * technologie, la timeline 48h et le terminal live.
 */
export default function Page() {
  return (
    <main className="flex flex-col">
      <Nav />
      <HeroLp />
      <Thesis />
      <TeamLp />
      <Piliers />
      <Packs />
      <AgentClients />
      <Preuves />
      <AvisLp />
      <FaqLp />
      <FinalCtaLp />
      <Footer />
    </main>
  );
}
