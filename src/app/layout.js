import { Manrope, JetBrains_Mono, Bricolage_Grotesque, Instrument_Serif } from "next/font/google";
import Analytics from "@/components/Analytics";
import CookieConsent from "@/components/CookieConsent";
import ConversionEvents from "@/components/ConversionEvents";
import JsonLd from "@/components/JsonLd";
import { graph, organizationSchema, websiteSchema } from "@/lib/schema";
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
  /* Le titre porte d'abord ce qui se cherche, puis la promesse. L'ancien titre
     n'ouvrait que sur « On va chercher vos clients à votre place » : bon à
     l'oreille, invisible pour quelqu'un qui tape « agence de prospection » ou
     « site internet artisan ». Ces deux requêtes sont celles de nos clients,
     qui ne cherchent jamais « agent IA ». */
  title: "Prospection B2B et site internet artisan · SmatchRoom Pulse",
  /* Sous 160 caractères : au-delà, Google coupe et choisit lui-même la fin.
     L'ancienne description en faisait 261, dont personne ne voyait la moitié. */
  description:
    "Agence de prospection B2B et de digitalisation pour artisans, TPE et PME : prospection automatisée, site internet et fiche Google. Prix affichés.",
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
    /* Le partage social garde la promesse en tête : personne ne partage un
       titre écrit pour un moteur. */
    title: "SmatchRoom Pulse · On va chercher vos clients à votre place",
    description:
      "Agents IA, site et fiche établissement Google, acquisition Meta : les trois piliers pour être trouvé, être rappelé et ne rater aucune demande.",
    url: "https://pulse.smatchroom.com",
    siteName: "SmatchRoom Pulse",
    type: "website",
    /* Pas de `images` ici : les fichiers app/opengraph-image.jpg et
       app/twitter-image.jpg s'en chargent. La convention de fichier est
       préférable parce que Next lit les dimensions réelles du fichier et
       versionne l'URL, alors qu'une liste écrite à la main peut mentir sur la
       taille et casse silencieusement le jour où l'image change. */
  },
  twitter: {
    /* À déclarer : sans cette ligne le défaut est `summary`, soit une vignette
       carrée rognée. L'image est fournie par app/twitter-image.jpg. */
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="fr"
      className={`${manrope.variable} ${jetbrains.variable} ${bricolage.variable} ${instrument.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Identité de l'entreprise et du site, sur toutes les pages. Les nœuds
            propres à une page (WebPage, Service, FAQPage, Breadcrumb) sont
            ajoutés par la page elle-même et se raccrochent à ces deux-là par
            leur `@id`. Ne pas dupliquer l'organisation dans une page : deux
            déclarations concurrentes de la même entité s'annulent. */}
        <JsonLd data={graph([organizationSchema(), websiteSchema()])} />
        {/* Le bandeau « leads B2B · marchés publics » a été retiré du haut de page :
            c'était un lien sortant vers un autre domaine placé avant même le titre,
            donc une fuite de trafic payé. Il vit maintenant en bas, dans le Footer,
            après que le visiteur a lu la page. Ne pas le remonter ici. */}
        {children}

        {/* Le Meta Pixel n'est plus chargé ici. Il est déclaré comme service
            Tarteaucitron dans CookieConsent et ne s'exécute qu'après acceptation.
            La variante <noscript> a été retirée : sans JavaScript, aucun
            consentement ne peut être recueilli, donc aucun traceur ne doit partir. */}
        {/* Conversions Meta (Lead, Contact) et Google Ads (Prise de rendez-vous).
            Inertes tant que le traceur correspondant n'a pas été autorisé :
            ConversionEvents ne fait rien si fbq ou gtag n'existe pas. */}
        <ConversionEvents />
        {/* Mesure d'audience Umami : sans consentement requis (cookieless,
            auto-hébergée), donc chargée directement et non via Tarteaucitron.
            Le raisonnement complet est dans le composant. */}
        <Analytics />
        <CookieConsent />
      </body>
    </html>
  );
}
