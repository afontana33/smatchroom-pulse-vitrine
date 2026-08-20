export default function Footer() {
  return (
    <footer className="relative mt-auto border-t border-[var(--border)] bg-[var(--surface)] px-5 py-14 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="inline-flex items-center gap-2.5 text-[var(--foreground)]">
              {/* Même pictogramme que le header, voir le commentaire dans
                  Nav.jsx pour le choix du picto plutôt que du logo complet. */}
              <img
                src="/brand/pulse-picto.png"
                alt=""
                aria-hidden
                width={277}
                height={224}
                className="h-7 w-auto shrink-0"
              />
              <span className="font-mono text-sm uppercase tracking-[0.2em]">
                SmatchRoom <span className="text-[var(--primary-ink)]">Pulse</span>
              </span>
            </div>
            <p className="mt-4 max-w-md text-sm text-[var(--muted-strong)]">
              Nous digitalisons et automatisons la recherche de clients, de l&apos;artisan seul à la
              grande entreprise. Trois piliers&nbsp;: les agents IA qui prospectent et répondent
              7j/7, le site et la fiche établissement Google qui vous font exister, l&apos;acquisition
              Meta qui vous amène des clients particuliers.
            </p>
            <a
              href="tel:+33771487698"
              className="mt-5 inline-flex items-baseline gap-2 font-display text-xl font-bold tracking-tight text-[var(--foreground)] hover:text-[var(--primary-ink)]"
            >
              07 71 48 76 98
              <span className="text-xs font-normal text-[var(--muted)]">lun. au ven. · 9h à 19h</span>
            </a>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--primary-ink)]">Écosystème</p>
            <ul className="mt-4 space-y-2 text-sm text-[var(--muted-strong)]">
              <li><a href="https://smatchroom.com" className="hover:text-[var(--foreground)]">smatchroom.com</a></li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--primary-ink)]">Navigation</p>
            <ul className="mt-4 space-y-2 text-sm text-[var(--muted-strong)]">
              <li><a href="/#qui-sommes-nous" className="hover:text-[var(--foreground)]">Qui nous sommes</a></li>
              <li><a href="/#equipe" className="hover:text-[var(--foreground)]">L&apos;équipe</a></li>
              <li><a href="/#piliers" className="hover:text-[var(--foreground)]">Nos offres et nos prix</a></li>
              <li><a href="/#packs" className="hover:text-[var(--foreground)]">Nos packs</a></li>
              <li><a href="/#agent-clients" className="hover:text-[var(--foreground)]">Agent Clients (B2B)</a></li>
              <li><a href="/#autres-agents" className="hover:text-[var(--foreground)]">Nos autres agents</a></li>
              <li><a href="/prospection-b2b" className="hover:text-[var(--foreground)]">Prospection B2B</a></li>
              <li><a href="/site-web-artisan" className="hover:text-[var(--foreground)]">Site internet pour artisan</a></li>
              <li><a href="/metiers" className="hover:text-[var(--foreground)]">Agents par métier</a></li>
              <li><a href="/agence-ia" className="hover:text-[var(--foreground)]">Zones desservies</a></li>
              <li><a href="/#resultats" className="hover:text-[var(--foreground)]">Résultats</a></li>
              <li><a href="/#avis" className="hover:text-[var(--foreground)]">Avis clients</a></li>
              <li><a href="/#questions" className="hover:text-[var(--foreground)]">Questions fréquentes</a></li>
              <li><a href="/blog" className="hover:text-[var(--foreground)]">Blog</a></li>
              <li><a href="/agent-ia" className="hover:text-[var(--foreground)]">Ressources agent IA</a></li>
              <li><a href="https://calendly.com/a-fontana-smatchroom/30min" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--foreground)]">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Renvoi vers leadb2b.smatchroom.com. Il était en bandeau fixe tout en haut
            de page, avant le titre : un lien sortant vers un autre domaine placé là
            fait partir le visiteur avant qu'il ait lu quoi que ce soit. Sa place est
            ici, une fois la page lue. Ne pas le remonter dans le layout. */}
        <a
          href="https://leadb2b.smatchroom.com"
          target="_blank"
          rel="noopener"
          className="mt-12 flex flex-col gap-1 rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-2)] px-6 py-5 transition-colors hover:border-[var(--primary)] sm:flex-row sm:items-center sm:justify-between"
        >
          <span className="text-sm font-semibold text-[var(--foreground)]">
            Vous cherchez des leads B2B sur les marchés publics du bâtiment&nbsp;?
          </span>
          <span className="whitespace-nowrap text-sm font-semibold text-[var(--primary-ink)]">
            France &amp; Luxembourg · voir leadb2b →
          </span>
        </a>

        <div className="mt-12 grid gap-6 border-t border-[var(--border)] pt-8 text-xs text-[var(--muted)] md:grid-cols-[1fr_auto] md:items-end">
          <div className="space-y-1 font-mono">
            <p className="text-[var(--foreground)]">SMATCHROOM · SAS</p>
            <p>5 rue Fénelon · 33000 Bordeaux · France</p>
            <p>SIREN 989 883 509 · SIRET 989 883 509 00014</p>
            <p>TVA intracommunautaire : FR01 989 883 509</p>
            <p>NAF/APE 62.01Z · Programmation informatique</p>
            <p className="opacity-70">Immatriculée RNE/INPI · 31/07/2025</p>
          </div>
          <div className="text-left md:text-right">
            <p>© {new Date().getFullYear()} SmatchRoom · Tous droits réservés</p>
            <p className="mt-1 flex flex-wrap justify-start gap-x-2 gap-y-1 opacity-70 md:justify-end">
              <a href="/mentions-legales" className="hover:text-[var(--foreground)]">Mentions légales</a>
              <span aria-hidden>·</span>
              <a href="/confidentialite" className="hover:text-[var(--foreground)]">Confidentialité</a>
              <span aria-hidden>·</span>
              <a href="/cgv-services" className="hover:text-[var(--foreground)]">CGV Services</a>
              <span aria-hidden>·</span>
              <a href="/cgv-produits" className="hover:text-[var(--foreground)]">CGV Produits</a>
              <span aria-hidden>·</span>
              <a href="/politique-cookies" className="hover:text-[var(--foreground)]">Politique cookies</a>
              <span aria-hidden>·</span>
              <a href="/transparence-ia" className="hover:text-[var(--foreground)]">Transparence IA</a>
              <span aria-hidden>·</span>
              {/* Ouvre le panneau Tarteaucitron : voir CONSENT_HASH dans CookieConsent.jsx.
                  Ce lien est l'unique moyen de revenir sur un choix, il doit rester
                  présent sur toutes les pages. */}
              <a href="#cookies" className="hover:text-[var(--foreground)]">Gérer mes cookies</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
