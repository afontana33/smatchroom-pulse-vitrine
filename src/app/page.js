import { existsSync } from 'node:fs';
import { join } from 'node:path';

import Nav from '@/components/Nav';
import HeroLp from '@/components/lp/HeroLp';
import Thesis from '@/components/lp/Thesis';
import TeamLp from '@/components/lp/TeamLp';
import Piliers from '@/components/lp/Piliers';
import Packs from '@/components/lp/Packs';
import AgentClients from '@/components/lp/AgentClients';
import AutresAgents from '@/components/lp/AutresAgents';
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
 * AutresAgents arrive juste après : les cinq agents complémentaires (relance de
 * devis, accueil, visibilité, conformité, achats) avec leur prix de fabrication
 * et leur mensuel. Sa place est là et pas plus haut : on ne présente la famille
 * qu'une fois l'agent de prospection compris, sinon le visiteur choisit entre
 * six agents avant d'avoir saisi ce que fait le premier.
 *
 * La FAQ est revenue (FaqLp), juste avant le dernier appel : elle ne documente
 * pas le produit, elle lève les trois objections qui font reporter la prise de
 * rendez-vous. La retirer fait perdre des réservations.
 *
 * Ce qui reste retiré volontairement : la démo interactive, la section
 * technologie, la timeline 48h et le terminal live.
 */
/* Médias du hero constatés à la construction et non au navigateur : une source
   absente coûterait une requête en 404, et un poster absent laisserait une bande
   vide. Tant que hero.mp4 et hero-poster.jpg ne sont pas déposés dans
   public/photos, le hero sert la photo actuelle et ne référence aucune vidéo. */
function heroMedia() {
  const has = (f) => existsSync(join(process.cwd(), 'public', 'photos', f));
  const hasPoster = has('hero-poster.jpg');
  return {
    poster: hasPoster ? '/photos/hero-poster.jpg' : '/photos/hero-maison.webp',
    hasVideo: has('hero.mp4'),
    hasWebm: has('hero.webm'),
  };
}

export default function Page() {
  const hero = heroMedia();

  return (
    <main className="flex flex-col">
      <Nav />
      <HeroLp {...hero} />
      <Thesis />
      <TeamLp />
      <Piliers />
      <Packs />
      <AgentClients />
      <AutresAgents />
      <Preuves />
      <AvisLp />
      <FaqLp />
      <FinalCtaLp />
      <Footer />
    </main>
  );
}
