/**
 * Injection du graphe schema.org.
 *
 * Composant serveur : la balise part dans le HTML statique, ce qui est la
 * condition pour qu'elle soit lue. Un JSON-LD injecté en JavaScript après
 * consentement (comme les traceurs) ne serait vu par personne.
 *
 * `dangerouslySetInnerHTML` est le seul moyen d'écrire un script non échappé.
 * L'échappement de `<` couvre le seul vecteur réel ici, la fermeture prématurée
 * du script par une chaîne de données.
 */

export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
