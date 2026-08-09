import Nav from '@/components/Nav';
import HeroLp from '@/components/lp/HeroLp';
import Thesis from '@/components/lp/Thesis';
import TeamLp from '@/components/lp/TeamLp';
import Piliers from '@/components/lp/Piliers';
import Preuves from '@/components/lp/Preuves';
import AvisLp from '@/components/lp/AvisLp';
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
 * Ce qui a été retiré volontairement : la démo interactive, la section
 * technologie, la timeline 48h, la FAQ et le terminal live. Le brief est une
 * page de conversion, pas une documentation produit.
 */
export default function Page() {
  return (
    <main className="flex flex-col">
      <Nav />
      <HeroLp />
      <Thesis />
      <TeamLp />
      <Piliers />
      <Preuves />
      <AvisLp />
      <FinalCtaLp />
      <Footer />
    </main>
  );
}
