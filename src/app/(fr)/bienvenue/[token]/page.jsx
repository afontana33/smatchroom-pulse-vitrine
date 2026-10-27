/**
 * Formulaire d'accueil d'un nouveau client, lien personnel envoyé par WhatsApp
 * après l'appel d'Alexis. Non indexé. Logique : components/onboarding/FormulaireAccueil.jsx,
 * envoi : app/api/bienvenue.
 */

import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { PageTitle, Section } from '@/components/seo/Blocks';
import FormulaireAccueil from '@/components/onboarding/FormulaireAccueil';
import { BIC, euros, IBAN, lireAccueil, OFFRES, ttc } from '@/lib/bienvenue-server';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Bienvenue · SmatchRoom Pulse',
  robots: { index: false, follow: false },
};

export default async function Bienvenue({ params }) {
  const { token } = await params;
  const ligne = await lireAccueil(token).catch(() => null);
  if (!ligne) notFound();
  const offre = OFFRES[ligne.offre];
  const paiement = {
    offre: offre.titre,
    montant: euros(ttc(offre.ht)),
    ht: euros(offre.ht),
    iban: IBAN,
    bic: BIC,
  };

  return (
    <>
      <Nav />
      <main id="main">
        <Section className="pt-28 sm:pt-32">
          <div className="mx-auto max-w-2xl">
            <PageTitle
              lead="Bienvenue chez SmatchRoom Pulse"
              accent={ligne.entreprise ? ligne.entreprise : 'On démarre.'}
              chapeau={`Ces informations me servent à préparer votre agent${
                ligne.offre === 'pack' ? ' et votre site' : ''
              }, et à établir votre facture. Comptez 5 minutes. Votre offre : ${offre.titre}, ${paiement.ht} HT.`}
            />
            <div className="mt-8">
              <FormulaireAccueil token={ligne.token} offre={ligne.offre} dejaRempli={ligne.statut !== 'envoye'} paiement={paiement} />
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
