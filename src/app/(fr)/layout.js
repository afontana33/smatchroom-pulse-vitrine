/**
 * Racine française. Le site anglais a la sienne, src/app/(en)/layout.js.
 *
 * Deux racines et non un layout unique avec un `lang` variable : l'attribut
 * `lang` du `<html>` ne peut pas être décidé depuis un layout partagé, qui ne
 * connaît pas le chemin demandé. Or une page anglaise servie en `lang="fr"`
 * est lue avec la prononciation française par les lecteurs d'écran et déclarée
 * française aux moteurs.
 *
 * Conséquence à connaître : passer du français à l'anglais provoque un
 * rechargement complet de page, pas une navigation client. C'est le
 * comportement documenté des racines multiples, et sur un changement de langue
 * il est sans importance.
 *
 * Le corps de page commun aux deux langues est dans components/SiteBody.jsx.
 */

import SiteBody from '@/components/SiteBody';
import { fontVariables } from '@/lib/fonts';
import '../globals.css';

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
    locale: "fr_FR",
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

export default function FrenchRootLayout({ children }) {
  return (
    <html lang="fr" className={`${fontVariables} h-full antialiased`}>
      <SiteBody>{children}</SiteBody>
    </html>
  );
}
