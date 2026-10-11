/*
 * Page d'aiguillage des conditions générales.
 *
 * Choix de structure : /cgv est conservée plutôt que redirigée en 301.
 *
 * SMATCHROOM vend deux choses de nature différente, soumises à deux régimes
 * différents (contenus numériques toutes taxes comprises pouvant être achetés
 * par un consommateur d'un côté, abonnement de service hors taxes entre
 * professionnels de l'autre). Une redirection aurait envoyé tout le monde vers
 * l'un des deux, donc au moins la moitié des visiteurs vers le mauvais contrat.
 * Or /cgv est l'adresse citée dans les factures, les courriels de confirmation
 * d'achat et le footer historique : elle doit rester valide et neutre.
 *
 * Le contenu de l'ancienne page /cgv (des CGV B2B qui n'ont jamais été servies,
 * masquées par une règle nginx) est repris et complété dans /cgv-services.
 */

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { ArrowRight, FileText, Repeat } from 'lucide-react';

export const metadata = {
  title: 'Conditions générales · SmatchRoom Pulse',
  description:
    "Les conditions générales applicables selon l'offre : abonnements d'agents IA entre professionnels, ou achat de l'Élite Dev Kit.",
};

const CHOIX = [
  {
    href: '/cgv-services',
    icon: Repeat,
    label: 'CGV Services',
    pitch: "Abonnements d'agents IA",
    desc: "Agent Partenaires, Agent Clients, Pack Lancement, site internet, Acquisition Meta et Ingénierie Corporate. Contrat conclu entre professionnels, prix hors taxes, obligation de moyens, réversibilité des données.",
  },
  {
    href: '/cgv-produits',
    icon: FileText,
    label: 'CGV Produits numériques',
    pitch: 'Élite Dev Kit',
    desc: "Pack Starter et Pack Enterprise, contenus téléchargeables. Prix toutes taxes comprises, livraison par lien de téléchargement, droit de rétractation et renonciation expresse.",
  },
];

export default function CGVPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-[var(--background)] px-6 py-32 text-[var(--foreground)]">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow">Cadre contractuel</p>
          <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            <span className="gradient-text">Conditions générales</span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
            Nos deux offres relèvent de régimes distincts. Choisissez celle qui vous concerne.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {CHOIX.map(({ href, icon: Icon, label, pitch, desc }) => (
              <a
                key={href}
                href={href}
                className="group card flex flex-col p-6 transition-transform hover:-translate-y-0.5"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary-soft)] text-[var(--primary-ink)]">
                  <Icon size={18} />
                </span>
                <p className="mt-5 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-[var(--primary-ink)]">
                  {pitch}
                </p>
                <h2 className="mt-1 text-lg font-semibold text-[var(--foreground)]">{label}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--muted)]">{desc}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--primary-ink)]">
                  Lire
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </a>
            ))}
          </div>

          <p className="mt-10 text-xs leading-relaxed text-[var(--muted)]">
            Voir aussi la{' '}
            <a href="/confidentialite" className="underline underline-offset-2 hover:text-[var(--foreground)]">
              politique de confidentialité
            </a>
            , la{' '}
            <a href="/politique-cookies" className="underline underline-offset-2 hover:text-[var(--foreground)]">
              politique cookies
            </a>{' '}
            et les{' '}
            <a href="/mentions-legales" className="underline underline-offset-2 hover:text-[var(--foreground)]">
              mentions légales
            </a>
            .
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
