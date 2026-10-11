import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

/**
 * Gabarit commun aux pages légales.
 *
 * Les pages légales partageaient le même balisage recopié à l'identique. Un
 * gabarit unique évite qu'une correction (un lien, une mention obligatoire, la
 * date de mise à jour) soit appliquée à une page et oubliée sur les autres.
 *
 * Une `section` accepte : `title`, `paragraphs`, `list`, `table`
 * ({ head: [...], rows: [[...]] }) et `note` (encadré secondaire).
 */
export default function LegalPage({ eyebrow, title, subtitle, dates, sections, intro, wide }) {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-[var(--background)] px-6 py-32 text-[var(--foreground)]">
        <div className={`mx-auto ${wide ? 'max-w-5xl' : 'max-w-3xl'}`}>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            <span className="gradient-text">{title}</span>
          </h1>
          {subtitle && <p className="mt-2 text-sm text-[var(--muted)]">{subtitle}</p>}

          {dates?.length > 0 && (
            <div className="mt-8 space-y-1 font-mono text-xs text-[var(--muted)]">
              {dates.map((d) => (
                <p key={d}>{d}</p>
              ))}
            </div>
          )}

          {intro && (
            <div className="mt-8 rounded-2xl border border-[var(--primary-line)] bg-[var(--primary-soft)] p-5 text-sm leading-relaxed text-[var(--muted-strong)]">
              {intro}
            </div>
          )}

          <div className="mt-12 space-y-10">
            {sections.map(({ title: t, paragraphs, list, table, note }) => (
              <section key={t} className="glass rounded-2xl p-6 md:p-8">
                <h2 className="text-lg font-semibold text-[var(--foreground)]">{t}</h2>

                {paragraphs?.map((p, i) => (
                  <p key={i} className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                    {p}
                  </p>
                ))}

                {list && (
                  <ul className="mt-3 space-y-2.5">
                    {list.map((item, i) => (
                      <li
                        key={i}
                        className="relative pl-5 text-sm leading-relaxed text-[var(--muted)] before:absolute before:left-0 before:top-[0.55em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[var(--primary)]/50"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {table && (
                  <div className="mt-5 overflow-x-auto">
                    <table className="table-stack w-full border-collapse sm:min-w-[40rem] text-left text-sm">
                      <thead>
                        <tr className="border-b border-[var(--border-strong)]">
                          {table.head.map((h) => (
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
                        {table.rows.map((row, i) => (
                          <tr key={i} className="border-b border-[var(--border)] align-top last:border-b-0">
                            {row.map((cell, j) => (
                              <td
                                key={j}
                                data-label={j > 0 ? table.head[j] : undefined}
                                className={`py-4 pr-4 ${
                                  j === 0
                                    ? 'font-medium text-[var(--foreground)]'
                                    : 'text-[var(--muted)]'
                                }`}
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {note && (
                  <p className="mt-5 border-l-2 border-[var(--primary)]/40 pl-4 text-sm leading-relaxed text-[var(--muted-strong)]">
                    {note}
                  </p>
                )}
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
