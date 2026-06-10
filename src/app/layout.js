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
  title: "SmatchRoom Pulse — Infrastructure logicielle qui remplace les processus humains",
  description:
    "Pulse conçoit, entraîne et déploie des Agents IA Industriels Autonomes sur votre infrastructure en 48 heures chronos. Pas une agence. Pas un wrapper ChatGPT.",
  metadataBase: new URL("https://pulse.smatchroom.com"),
  openGraph: {
    title: "SmatchRoom Pulse — Agents IA Industriels Autonomes",
    description:
      "Infrastructure logicielle qui remplace les processus humains. Déploiement en 48h, architecture propriétaire, 100% clé en main.",
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
