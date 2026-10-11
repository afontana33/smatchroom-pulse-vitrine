/**
 * Comment l'Agent Clients trouve les entreprises à contacter. Suit
 * #agent-clients : la section B2B dit quoi et combien, celle-ci dit comment.
 * Chiffres repris de la fiche produit B2B d'Alexis (10 oct. 2026).
 */

const ETAPES = [
  ['Votre cible', 'Type d’entreprise, taille, zone, poste du décideur. Défini avec vous en une heure.'],
  ['Plusieurs sources', 'Fiches Google, bases d’entreprises, registre des créations, offres d’emploi, LinkedIn.'],
  ['Les signaux', 'Priorité à ceux qui ont une raison d’acheter maintenant : création, recrutement, nouveau dirigeant, nouveau site.'],
  ['Le bon décideur', 'Nom, email pro et portable vérifié sur WhatsApp. Grands groupes et homonymes écartés.'],
  ['Contact et relances', 'Message court depuis votre numéro, relance à J+3 puis J+7. Un « stop » est définitif.'],
  ['Vous rappelez', 'Dès qu’une personne est intéressée, vous êtes prévenu avec l’historique.'],
];

const CHIFFRES = [
  ['~300', 'décideurs contactés par mois et par numéro WhatsApp'],
  ['20 %', 'de réponses en moyenne'],
  ['1 semaine', 'entre le premier appel et les premiers messages'],
];

export default function MethodeB2B() {
  return (
    <section id="methode-b2b" className="relative scroll-mt-24 px-5 py-24 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <h2 className="max-w-3xl text-balance text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl">
          Comment l’agent trouve{' '}
          <span className="font-serif-it font-normal text-[var(--primary-ink)]">vos clients B2B.</span>
        </h2>

        <ol className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {ETAPES.map(([titre, texte], i) => (
            <li key={titre} className="border-t-2 border-[var(--primary)] pt-5">
              <p className="font-mono text-[0.7rem] tracking-[0.16em] text-[var(--primary-ink)]">
                0{i + 1}
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold tracking-tight">{titre}</h3>
              <p className="mt-2 leading-relaxed text-[var(--muted-strong)]">{texte}</p>
            </li>
          ))}
        </ol>

        <dl className="mt-14 grid gap-6 rounded-3xl bg-[var(--surface)] p-7 sm:grid-cols-3 sm:p-9">
          {CHIFFRES.map(([n, label]) => (
            <div key={label}>
              <dt className="sr-only">{label}</dt>
              <dd>
                <span className="block font-display text-4xl font-bold tracking-tight text-[var(--primary-ink)]">
                  {n}
                </span>
                <span className="mt-1 block text-[var(--muted-strong)]">{label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
