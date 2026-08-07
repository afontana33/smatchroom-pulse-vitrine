import { Manrope, JetBrains_Mono, Bricolage_Grotesque, Instrument_Serif } from "next/font/google";
import CookieConsent from "@/components/CookieConsent";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata = {
  title: "SmatchRoom Pulse · La digitalisation des entreprises",
  description:
    "Trois briques pour digitaliser votre entreprise : l'Agent Chasseur, une IA qui prospecte et répond aux demandes 24/7 ; votre site et votre fiche établissement Google ; l'acquisition Meta avec Pulse Terrain (vidéo de chantier et publicité Facebook / Instagram). Division Corporate pour le sur-mesure.",
  metadataBase: new URL("https://pulse.smatchroom.com"),
  // Vérification de domaine Meta : rendue côté serveur dans le <head> statique,
  // condition pour que Meta la voie (une balise injectée en JS n'est pas lue).
  // Balise inerte : elle ne déclenche aucune requête et ne dépose aucun cookie,
  // elle n'est donc pas soumise au consentement. À supprimer le jour où le
  // Meta Pixel est retiré et où plus aucun actif Meta ne pointe vers le domaine.
  verification: {
    other: {
      "facebook-domain-verification": "nflavfb11d2knm89zrqctk2bendkbp",
    },
  },
  openGraph: {
    title: "SmatchRoom Pulse · La digitalisation des entreprises",
    description:
      "Agent IA, site et fiche établissement Google, acquisition Meta : les trois briques pour être trouvé, être rappelé et ne rater aucune demande.",
    url: "https://pulse.smatchroom.com",
    siteName: "SmatchRoom Pulse",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="fr"
      className={`${manrope.variable} ${jetbrains.variable} ${bricolage.variable} ${instrument.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="https://leadb2b.smatchroom.com"
          target="_blank"
          rel="noopener"
          className="fixed inset-x-0 top-0 z-[60] flex h-10 items-center justify-center gap-1.5 bg-orange-600 px-4 text-center text-xs font-semibold text-white hover:bg-orange-500 transition-colors sm:text-sm"
        >
          <span aria-hidden>🏗️</span>
          <span>Vous cherchez des <span className="underline underline-offset-2">leads B2B</span> · marchés publics bâtiment France &amp; Luxembourg&nbsp;?</span>
          <span className="whitespace-nowrap font-bold">Cliquez ici →</span>
        </a>
        {children}

        {/* Le Meta Pixel n'est plus chargé ici. Il est déclaré comme service
            Tarteaucitron dans CookieConsent et ne s'exécute qu'après acceptation.
            La variante <noscript> a été retirée : sans JavaScript, aucun
            consentement ne peut être recueilli, donc aucun traceur ne doit partir. */}
        <CookieConsent />
      </body>
    </html>
  );
}
