const M = [
  ['Artisan du bâtiment (couvreur, électricien, peintre…)', 'Agences immobilières, syndics, architectes, maîtres d’œuvre'],
  ['Agent immobilier', 'Notaires, diagnostiqueurs, courtiers en crédit'],
  ['Courtier ou assureur', 'Agences immobilières, experts-comptables, conseillers en patrimoine'],
  ['Entreprise de nettoyage ou de services', 'Syndics, gestionnaires de bureaux, commerces'],
  ['Paysagiste, pisciniste, cuisiniste', 'Architectes, constructeurs de maisons, agences'],
  ['Consultant, formateur, coach', 'Experts-comptables, réseaux d’entreprises, CCI'],
];
export default function MetiersPrescripteurs() {
  return (
    <section id="metiers" className="px-5 pb-16 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <h3 className="text-2xl font-semibold tracking-tight">Vous êtes… <span className="font-serif-it font-normal text-[var(--primary-ink)]">votre agent contacte…</span></h3>
        <div className="mt-6 grid gap-3 md:grid-cols-2">{M.map(([a, b]) => (
          <div key={a} className="card p-5"><p className="font-semibold">{a}</p><p className="mt-1 text-sm text-[var(--muted-strong)]">→ {b}</p></div>))}</div>
        <p className="mt-5 text-sm text-[var(--muted)]">Et bien d’autres métiers : on adapte les cibles à votre activité.</p>
      </div>
    </section>
  );
}
