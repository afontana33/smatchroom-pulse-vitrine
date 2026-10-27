/** Connexion du WhatsApp de l'agent par le client lui-même. Non indexé. */
import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { PageTitle, Section } from '@/components/seo/Blocks';
import ConnexionWhatsApp from '@/components/onboarding/ConnexionWhatsApp';
import { instanceParConnexion } from '@/lib/bienvenue-server';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Connecter votre WhatsApp · SmatchRoom Pulse', robots: { index: false, follow: false } };

export default async function Connexion({ params }) {
  const { token } = await params;
  const x = await instanceParConnexion(token).catch(() => null);
  if (!x) notFound();
  return (
    <>
      <Nav />
      <main id="main">
        <Section className="pt-28 sm:pt-32">
          <div className="mx-auto max-w-2xl">
            {x.o.active_at ? (
              <PageTitle
                lead="Reconnectez"
                accent="le WhatsApp de votre agent."
                chapeau="Le téléphone de votre agent s’est déconnecté, il est en pause en attendant. Reliez-le de nouveau en une minute : il reprend juste après, là où il s’était arrêté."
              />
            ) : (
              <PageTitle
                lead="Dernière étape :"
                accent="connectez le WhatsApp de votre agent."
                chapeau="C’est ce numéro qui écrira aux professionnels de votre zone. La connexion prend une minute, et votre agent démarre juste après."
              />
            )}
            <div className="mt-8">
              <ConnexionWhatsApp token={token} />
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
