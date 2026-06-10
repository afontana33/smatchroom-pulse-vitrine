import { Inter, JetBrains_Mono } from "next/font/google";
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

export const metadata = {
  title: "SmatchRoom Pulse — Assistant IA sur-mesure pour artisans, commerces et entreprises",
  description:
    "Pulse conçoit et déploie un assistant IA taillé pour votre activité — artisan, restaurateur, indépendant ou PME. Il trouve vos clients, améliore votre visibilité et gère vos tâches répétitives. Opérationnel en 48h. À partir de 500 € + 150 €/mois.",
  metadataBase: new URL("https://pulse.smatchroom.com"),
  openGraph: {
    title: "SmatchRoom Pulse — Assistant IA pour commerces et entreprises",
    description:
      "Un assistant IA sur-mesure pour votre métier. Artisans, restaurateurs, indépendants et PME. Opérationnel en 48h. À partir de 500 € + 150 €/mois.",
    url: "https://pulse.smatchroom.com",
    siteName: "SmatchRoom Pulse",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
