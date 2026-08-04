export default function LeadsB2BCTA() {
  return (
    <section className="w-full px-5 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-[var(--border-strong)] bg-[var(--surface)] shadow-sm">
        <div className="flex flex-col items-start gap-8 p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--background)] px-4 py-1.5 font-mono text-xs uppercase tracking-[0.16em] text-[var(--primary-ink)]">
              🏗️ SmatchRoom Leads B2B
            </div>
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-[var(--foreground)] sm:text-4xl">
              Vous cherchez des chantiers gros œuvre&nbsp;?
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--muted)]">
              Recevez chaque matin les <strong className="text-[var(--foreground)]">appels d'offres publics du bâtiment</strong> en
              France et au Luxembourg · marchés à forte valeur, contacts et liens de dépôt officiels.
              Data 100&nbsp;% officielle (TED / UE), <strong className="text-[var(--foreground)]">3 leads offerts</strong> pour démarrer.
            </p>
          </div>
          <a
            href="https://leadb2b.smatchroom.com"
            target="_blank"
            rel="noopener"
            className="btn-primary inline-flex shrink-0 items-center justify-center rounded-xl px-7 py-4 text-base font-semibold"
          >
            Cliquez ici · découvrir les chantiers →
          </a>
        </div>
      </div>
    </section>
  );
}
