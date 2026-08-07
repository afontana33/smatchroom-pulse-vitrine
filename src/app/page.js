import Nav from '@/components/Nav';
import HeroV5 from '@/components/v5/HeroV5';
import TrustedBy from '@/components/TrustedBy';
import ProblemSolution from '@/components/v5/ProblemSolution';
import Piliers from '@/components/v5/Piliers';
import AgentFleet from '@/components/v5/AgentFleet';
import AgentDemo from '@/components/AgentDemo';
import About from '@/components/About';
import SocialProof from '@/components/v5/SocialProof';
import AvisGoogle from '@/components/v5/AvisGoogle';
import Timeline48h from '@/components/v5/Timeline48h';
import TechDiff from '@/components/v5/TechDiff';
import PricingV5 from '@/components/v5/PricingV5';
import LeadsB2BCTA from '@/components/LeadsB2BCTA';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/v5/FinalCTA';
import Footer from '@/components/Footer';

/**
 * Landing v5 — parcours cinématique.
 *
 * Alternance de registres voulue : encre (hero) → clair (problème, agents,
 * démo, résultats, avis, process) → encre (technologie) → clair (tarifs, FAQ)
 * → encre (CTA final). Les blocs sombres cadrent le parcours et cassent la
 * monotonie du milieu de page.
 *
 * Trois sections sont héritées de la v4 parce qu'aucune section v5 ne porte leur
 * fonction : la démo interactive (preuve jouable), « À propos » (l'équipe et les
 * commerciaux terrain) et la FAQ (levée d'objections).
 */
export default function Page() {
  return (
    <main className="flex flex-col">
      <Nav overDark />
      <HeroV5 />
      <TrustedBy />
      <ProblemSolution />
      <Piliers />
      <AgentFleet />
      <AgentDemo />
      <SocialProof />
      <About />
      <AvisGoogle />
      <Timeline48h />
      <TechDiff />
      <PricingV5 />
      <LeadsB2BCTA />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
