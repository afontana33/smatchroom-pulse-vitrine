import { Manrope, JetBrains_Mono, Bricolage_Grotesque, Instrument_Serif } from "next/font/google";
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
  title: "SmatchRoom Pulse — Agents IA pour les artisans & entreprises du bâtiment",
  description:
    "Pulse conçoit et déploie des agents IA pour le bâtiment : prospection, relance de devis, qualification de leads, SEO local, conformité. Et l'Agent Chasseur Grands Comptes pour les PME/ETI qui visent les grands comptes. Déployés en 48h sur votre infra (Node.js + Supabase).",
  metadataBase: new URL("https://pulse.smatchroom.com"),
  openGraph: {
    title: "SmatchRoom Pulse — Agents IA pour le bâtiment",
    description:
      "Des agents IA qui travaillent pour votre entreprise du bâtiment : prospection, relance de devis, RDV, SEO local. Palier Grands Comptes pour les PME/ETI. Déployés en 48h.",
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
          <span>Vous cherchez des <span className="underline underline-offset-2">leads B2B</span> — marchés publics bâtiment France &amp; Luxembourg&nbsp;?</span>
          <span className="whitespace-nowrap font-bold">Cliquez ici →</span>
        </a>
        {children}
      </body>
    </html>
  );
}
