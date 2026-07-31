import Script from "next/script";
import { Manrope, JetBrains_Mono, Bricolage_Grotesque, Instrument_Serif } from "next/font/google";
import "./globals.css";

const META_PIXEL_ID = "1366680321464821";

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
  title: "SmatchRoom Pulse — L'IA qui prospecte et vend à votre place",
  description:
    "Des collaborateurs numériques autonomes, déployés sur votre infra 24/7. Division BTP & Artisanat : agents packagés (prospection, relance de devis, SEO local, conformité), déployés en 48h. Division Corporate & Sur-Mesure : ingénierie d'acquisition B2B pour les autres secteurs (luxe, SaaS, industrie, franchises).",
  metadataBase: new URL("https://pulse.smatchroom.com"),
  // Vérification de domaine Meta : rendue côté serveur dans le <head> statique,
  // condition pour que Meta la voie (une balise injectée en JS n'est pas lue).
  verification: {
    other: {
      "facebook-domain-verification": "nflavfb11d2knm89zrqctk2bendkbp",
    },
  },
  openGraph: {
    title: "SmatchRoom Pulse — L'IA qui prospecte et vend à votre place",
    description:
      "Deux divisions : BTP & Artisanat (offres packagées, 48h) et Corporate & Sur-Mesure (ingénierie d'acquisition B2B pour les autres secteurs). Des collaborateurs numériques autonomes, 24/7 sur votre infra.",
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

        {/* Meta Pixel — chargé sur toutes les routes depuis le layout racine.
            Script inline : l'id est obligatoire pour que Next puisse le suivre. */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>
      </body>
    </html>
  );
}
