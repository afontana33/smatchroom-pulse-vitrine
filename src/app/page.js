import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import TrustedBy from '@/components/TrustedBy';
import Manifesto from '@/components/Manifesto';
import Pillars from '@/components/Pillars';
import Process from '@/components/Process';
import UseCases from '@/components/UseCases';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import ContactCTA from '@/components/ContactCTA';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    <main className="flex flex-col">
      <Nav />
      <Hero />
      <TrustedBy />
      <Manifesto />
      <Pillars />
      <Process />
      <UseCases />
      <Pricing />
      <FAQ />
      <ContactCTA />
      <Footer />
    </main>
  );
}
