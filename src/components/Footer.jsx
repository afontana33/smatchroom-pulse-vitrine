export default function Footer() {
  return (
    <footer className="relative mt-auto border-t border-[var(--border)] bg-[var(--surface)] px-5 py-14 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="inline-flex items-center gap-2.5 text-[var(--foreground)]">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--primary)] text-white">
                <span className="h-2 w-2 rounded-full bg-white" />
              </span>
              <span className="font-mono text-sm uppercase tracking-[0.2em]">
                SmatchRoom <span className="text-[var(--primary-ink)]">Pulse</span>
              </span>
            </div>
            <p className="mt-4 max-w-md text-sm text-[var(--muted-strong)]">
              L&apos;usine à agents IA du groupe SmatchRoom. Division BTP &amp; Artisanat : agents packagés
              déployés en 48h. Division Corporate &amp; Sur-Mesure : ingénierie d&apos;acquisition B2B pour
              les autres secteurs. Des collaborateurs numériques autonomes, 24/7 sur votre infra.
            </p>
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
              <li><a href="/#agents" className="hover:text-[var(--foreground)]">Les agents</a></li>
              <li><a href="/#cas-clients" className="hover:text-[var(--foreground)]">Résultats</a></li>
              <li><a href="/#avis" className="hover:text-[var(--foreground)]">Avis clients</a></li>
              <li><a href="/#tarifs" className="hover:text-[var(--foreground)]">Tarifs</a></li>
              <li><a href="/grands-comptes" className="font-medium text-[var(--steel)] hover:text-[var(--steel-hover)]">Grands Comptes</a></li>
              <li><a href="/#faq" className="hover:text-[var(--foreground)]">FAQ</a></li>
              <li><a href="/blog" className="hover:text-[var(--foreground)]">Blog</a></li>
              <li><a href="https://calendly.com/a-fontana-smatchroom/30min" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--foreground)]">Contact</a></li>
            </ul>
          </div>
        </div>

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
