/*
 * ⚠ BROUILLON — document juridique non validé.
 *
 * Rédigé en interne dans le cadre de la mise en conformité de pulse.smatchroom.com.
 * Il doit être relu et validé par un avocat avant d'être considéré comme opposable.
 * Voir AUDIT-CONFORMITE.md à la racine du dépôt.
 *
 * Cohérence à maintenir : le tableau TRACEURS ci-dessous doit décrire exactement
 * les services déclarés dans src/components/CookieConsent.jsx et générés par
 * scripts/sync-tarteaucitron.mjs. Un traceur ajouté au code sans ligne ici rend
 * cette page fausse.
 *
 * Le tableau EXEMPTES couvre en plus la mesure d'audience de
 * src/components/Analytics.jsx, qui ne passe pas par Tarteaucitron parce
 * qu'elle ne dépose aucun cookie. Si Analytics.jsx cesse d'être anonyme
 * (croisement avec le pixel, `identify`, envoi à un tiers), cette ligne doit
 * remonter dans TRACEURS et le service doit devenir refusable.
 */

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Politique cookies · SmatchRoom Pulse',
  description:
    "Liste des traceurs déposés sur pulse.smatchroom.com : éditeur, finalité, durée de conservation et transferts hors Union européenne.",
};

const MAJ = '23 août 2026';

/** Traceurs soumis au consentement. */
const TRACEURS = [
  {
    nom: '_fbp',
    service: 'Meta Pixel',
    editeur: 'Meta Platforms Ireland Limited (Irlande)',
    finalite:
      "Mesure de l'audience des campagnes publicitaires diffusées sur les services Meta (Facebook, Instagram) et constitution d'audiences de reciblage. Remonte également deux actions de conversion : l'ouverture de la page de réservation Calendly et le clic sur le numéro de téléphone, avec l'adresse de la page d'où part le clic.",
    duree: '90 jours',
    horsUE:
      "Oui. Meta Platforms Ireland Limited transfère des données à Meta Platforms, Inc. (États-Unis). Meta invoque le Data Privacy Framework UE–États-Unis et des clauses contractuelles types.",
    consentement: true,
  },
  {
    nom: '_gcl_au',
    service: 'Google Ads (gtag.js)',
    editeur: 'Google Ireland Limited (Irlande)',
    finalite:
      "Mesure des conversions issues des campagnes publicitaires diffusées sur les services Google (Recherche, Display, YouTube) : permet de rattacher une visite, puis une prise de rendez-vous, au clic publicitaire qui l'a précédée. Remonte une action de conversion : l'ouverture de la page de réservation Calendly. Sert également à constituer des audiences de reciblage.",
    duree: '90 jours',
    horsUE:
      "Oui. Google Ireland Limited transfère des données à Google LLC (États-Unis). Google invoque le Data Privacy Framework UE–États-Unis et des clauses contractuelles types.",
    consentement: true,
  },
];

/** Traceurs exemptés de consentement (art. 82 loi Informatique et Libertés). */
const EXEMPTES = [
  {
    nom: 'aucun cookie',
    service: 'Umami (auto-hébergé)',
    editeur: 'SMATCHROOM SAS (France)',
    finalite:
      "Mesure d'audience : nombre de visites, pages consultées, site ou réseau social d'où vous arrivez, type d'appareil, pays. Sert à savoir quels contenus et quels canaux fonctionnent. Aucun cookie n'est déposé et votre adresse IP n'est pas conservée : elle sert uniquement à calculer une empreinte anonyme, renouvelée chaque jour, qui permet de ne pas compter deux fois la même visite. Aucun profil publicitaire, aucun suivi d'un site à l'autre.",
    duree: 'Statistiques agrégées conservées 13 mois',
    horsUE: "Non. Outil installé sur notre propre serveur en France, aucune donnée transmise à un tiers.",
    consentement: false,
  },
  {
    nom: 'pulse_consent',
    service: 'Tarteaucitron (auto-hébergé)',
    editeur: 'SMATCHROOM SAS (France)',
    finalite:
      "Conserve votre choix d'accepter ou de refuser chaque traceur, afin de ne pas vous redemander à chaque page et de ne rien déclencher sans votre accord.",
    duree: '6 mois',
    horsUE: 'Non. Cookie déposé par notre propre domaine, lu par notre seul serveur.',
    consentement: false,
  },
];

const SECTIONS = [
  {
    title: "Ce que cette page couvre",
    paragraphs: [
      "Un cookie est un fichier déposé sur votre appareil lors de la consultation d'un site. La même réglementation s'applique aux techniques équivalentes : pixels invisibles, balises, stockage local. Le terme « traceur » les désigne toutes dans cette page.",
      "Nous utilisons un outil de mesure d'audience installé sur notre propre serveur, décrit ci-dessous, qui ne dépose aucun cookie. Nous n'utilisons aucun outil d'analyse de comportement (heatmap, enregistrement de session) et aucun réseau publicitaire autre que ceux listés ci-dessous.",
    ],
  },
  {
    title: 'Votre choix, et comment le changer',
    paragraphs: [
      "Aucun traceur soumis à consentement n'est déposé ni exécuté avant que vous ayez cliqué. Fermer le bandeau, faire défiler la page ou naviguer d'une page à l'autre ne vaut pas acceptation.",
      "Refuser est aussi simple qu'accepter : les deux boutons sont présentés côte à côte, au même niveau et dans le même format. Vous pouvez aussi ouvrir le réglage détaillé et n'autoriser qu'une partie des finalités.",
      "Votre choix est conservé 6 mois, puis la question vous est reposée. Vous pouvez le modifier à tout moment, y compris pour revenir sur une acceptation, via le lien « Gérer mes cookies » présent en bas de chaque page.",
      "Si vous refusez, aucune fonctionnalité du site n'est dégradée : les traceurs concernés ne servent qu'à la mesure publicitaire.",
    ],
  },
  {
    title: 'Services tiers atteints depuis ce site',
    paragraphs: [
      "Les boutons « Réserver un créneau » et « Demander un audit » ouvrent une page hébergée par Calendly, dans un nouvel onglet. Calendly n'est pas intégré dans nos pages : aucun script, aucune iframe et aucun cookie Calendly n'est chargé tant que vous restez sur pulse.smatchroom.com.",
      "À partir du moment où vous ouvrez cette page, vous êtes sur un service opéré par Calendly LLC, qui dépose ses propres traceurs et applique sa propre politique. Les informations que vous y saisissez (nom, adresse email, créneau) nous sont ensuite transmises pour organiser le rendez-vous.",
      "Les polices de caractères du site sont servies depuis nos propres serveurs. Aucune requête n'est adressée à Google Fonts lors de votre visite.",
    ],
  },
  {
    title: 'Réglage depuis votre navigateur',
    paragraphs: [
      "Vous pouvez également configurer votre navigateur pour bloquer ou supprimer les cookies. Ce réglage s'applique à tous les sites et peut affecter le fonctionnement de certains d'entre eux. La marche à suivre est décrite dans l'aide de votre navigateur, et sur le site de la CNIL.",
    ],
  },
  {
    title: 'Pour aller plus loin',
    paragraphs: [
      "Le détail des traitements de données personnelles, les bases légales, les durées de conservation et vos droits figurent dans notre politique de confidentialité.",
      "Pour toute question relative aux traceurs : a.fontana@smatchroom.fr.",
    ],
  },
];

function TableTraceurs({ rows }) {
  return (
    <div className="mt-5 overflow-x-auto">
      <table className="table-stack w-full border-collapse sm:min-w-[46rem] text-left text-sm">
        <thead>
          <tr className="border-b border-[var(--border-strong)]">
            {['Nom', 'Service et éditeur', 'Finalité', 'Durée', 'Transfert hors UE'].map((h) => (
              <th
                key={h}
                scope="col"
                className="py-3 pr-4 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-[var(--primary-ink)]"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((t) => (
            <tr key={t.nom} className="border-b border-[var(--border)] align-top last:border-b-0">
              <th scope="row" className="py-4 pr-4 font-mono text-xs font-medium text-[var(--foreground)]">
                {t.nom}
              </th>
              <td data-label="Service et éditeur" className="py-4 pr-4 text-[var(--muted-strong)]">
                <span className="block font-medium text-[var(--foreground)]">{t.service}</span>
                {t.editeur}
              </td>
              <td data-label="Finalité" className="py-4 pr-4 text-[var(--muted)]">{t.finalite}</td>
              <td data-label="Durée" className="py-4 pr-4 whitespace-nowrap text-[var(--muted-strong)]">{t.duree}</td>
              <td data-label="Transfert hors UE" className="py-4 text-[var(--muted)]">{t.horsUE}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PolitiqueCookiesPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-[var(--background)] px-6 py-32 text-[var(--foreground)]">
        <div className="mx-auto max-w-4xl">
          <p className="eyebrow">Traceurs</p>
          <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            <span className="gradient-text">Politique cookies</span>
          </h1>
          <p className="mt-2 text-sm text-[var(--muted)]">SmatchRoom Pulse</p>

          <div className="mt-8 font-mono text-xs text-[var(--muted)]">
            <p>Dernière mise à jour : {MAJ}</p>
          </div>

          <div className="mt-12 space-y-10">
            <section className="glass rounded-2xl p-6 md:p-8">
              <h2 className="text-lg font-semibold">Traceurs soumis à votre consentement</h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                Ils ne sont déposés qu&apos;après acceptation de votre part, finalité par finalité.
              </p>
              <TableTraceurs rows={TRACEURS} />
            </section>

            <section className="glass rounded-2xl p-6 md:p-8">
              <h2 className="text-lg font-semibold">Traceurs déposés sans consentement</h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                L&apos;article 82 de la loi Informatique et Libertés dispense de consentement les
                traceurs strictement nécessaires, ainsi que la mesure d&apos;audience anonyme qui
                sert uniquement à produire des statistiques pour notre compte. Deux cas ici : le
                cookie qui mémorise votre choix, sans lequel nous serions obligés de vous reposer
                la question à chaque page, et notre compteur de visites, qui ne dépose rien sur
                votre appareil et ne permet pas de vous identifier.
              </p>
              <TableTraceurs rows={EXEMPTES} />
            </section>

            {SECTIONS.map(({ title, paragraphs }) => (
              <section key={title} className="glass rounded-2xl p-6 md:p-8">
                <h2 className="text-lg font-semibold">{title}</h2>
                {paragraphs.map((p, i) => (
                  <p key={i} className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                    {p}
                  </p>
                ))}
              </section>
            ))}

            <section className="glass rounded-2xl p-6 md:p-8">
              <h2 className="text-lg font-semibold">Modifier votre choix maintenant</h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                Le panneau de réglage s&apos;ouvre depuis n&apos;importe quelle page du site.
              </p>
              <a
                href="#cookies"
                className="btn-primary mt-5 inline-flex items-center justify-center px-6 py-3 text-sm font-semibold"
              >
                Gérer mes cookies
              </a>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
