const INCLUS = ['Un récapitulatif chaque vendredi', 'L’analyse des réponses et des objections', 'L’optimisation des messages', 'L’ajustement des cibles selon les retours', 'Un interlocuteur dédié pour piloter votre prospection'];
const AVIS = [
  { text: 'Il a su m’apporter de précieux conseils et mettre en place des solutions adaptées à mes besoins […] Une personne sérieuse, à l’écoute et investie dans la réussite de ses clients.', author: 'Franck', date: 'Octobre 2026' },
  { text: 'Très bon conseil et bien orienté, plusieurs contacts et retours positifs. Je recommande pour aller chercher des leads et partenariats supplémentaires.', author: 'Jorge', date: 'Juillet 2026' },
];
export default function SuiviHumain() {
  return (
    <section id="suivi" className="relative scroll-mt-24 px-5 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex items-center gap-4"><span className="section-index">Suivi</span><span className="h-px flex-1 bg-[var(--border-strong)]"></span></div>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-balance text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl">Un agent de prospection, <span className="font-serif-it font-normal text-[var(--primary-ink)]">avec un suivi humain chaque semaine.</span></h2>
            <p className="mt-6 text-[var(--muted-strong)]">Nous formons votre agent à votre offre et à vos arguments. Après le lancement, nous lisons les retours et faisons évoluer la prospection avec vous.</p>
            <p className="mt-8 font-semibold">Inclus dans votre abonnement :</p>
            <ul className="mt-3 space-y-2 text-[var(--muted-strong)]">{INCLUS.map((x) => <li key={x}>✓ {x}</li>)}</ul>
            <p className="mt-8 font-semibold">Vous ne gérez pas un logiciel : nous pilotons tout, vous reprenez la main dès qu’un prospect est intéressé.</p>
          </div>
          <div className="grid gap-6">{AVIS.map((a) => (
            <article key={a.author} className="card flex flex-col p-7">
              <p className="flex-1 text-[0.95rem] leading-relaxed text-[var(--muted-strong)]">« {a.text} »</p>
              <div className="mt-6 border-t border-[var(--border)] pt-4"><p className="text-sm font-semibold">{a.author}</p><p className="mt-0.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--muted)]">Avis Google · {a.date}</p></div>
            </article>))}</div>
        </div>
      </div>
    </section>
  );
}
