import { Inter, JetBrains_Mono, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
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

export const metadata = {
  title: "SmatchRoom Pulse — Des agents IA pour les artisans du bâtiment",
  description:
    "Pulse conçoit et déploie des agents IA taillés pour les métiers du bâtiment : prospection de partenaires, relance de devis, qualification de leads, avis Google, conformité. Déployés en 48h sur votre infra (Node.js + Supabase).",
  metadataBase: new URL("https://pulse.smatchroom.com"),
  openGraph: {
    title: "SmatchRoom Pulse — Des agents IA pour le bâtiment",
    description:
      "Des agents IA qui bossent pour votre entreprise du bâtiment : prospection, relance de devis, RDV, SEO local. Déployés en 48h.",
    url: "https://pulse.smatchroom.com",
    siteName: "SmatchRoom Pulse",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${jetbrains.variable} ${bricolage.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
