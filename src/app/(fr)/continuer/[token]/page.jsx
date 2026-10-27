/** Accord du client pour le mois suivant de son agent. Non indexé. */
import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { PageTitle, Section } from '@/components/seo/Blocks';
import ChoixContinuer from '@/components/onboarding/ChoixContinuer';
import { euros, lireRenouvellement, OFFRES, ttc } from '@/lib/bienvenue-server';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Votre agent · SmatchRoom Pulse', robots: { index: false, follow: false } };

export default async function Continuer({ params }) {
  const { token } = await params;
  const r = await lireRenouvellement(token).catch(() => null);
  if (!r) notFound();
  const echeance = new Date(`${r.echeance}T12:00:00`).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });
  return (
    <>
      <Nav />
      <main id="main">
        <Section className="pt-28 sm:pt-32">
          <div className="mx-auto max-w-2xl">
            <PageTitle
              lead="On continue"
              accent="le mois prochain ?"
              chapeau={`Votre agent prospecte pour ${r.pulse_onboarding?.entreprise || 'vous'} jusqu’au ${echeance}. Pour continuer un mois de plus : ${euros(OFFRES.agent.ht)} HT (${euros(ttc(OFFRES.agent.ht))} TTC), sans engagement. Sans réponse, l’agent s’arrête à cette date.`}
            />
            <div className="mt-8">
              <ChoixContinuer token={r.token} dejaRepondu={r.statut !== 'envoye'} />
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
