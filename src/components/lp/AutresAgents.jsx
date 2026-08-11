'use client';

/**
 * Les cinq autres agents.
 *
 * Vient après #agent-clients, qui est une bande sombre, et avant #resultats, qui
 * est claire : cette section reste donc en registre clair. Deux bandes sombres
 * collées feraient lire l'ensemble comme une seule section.
 *
 * Le point de départ de chaque carte est la phrase du client, pas le nom de
 * l'agent : personne ne cherche un « Agent Contrôleur », tout le monde reconnaît
 * « je passe mon temps à réclamer les attestations ». Le nom vient après, en
 * petite capitale, comme une étiquette.
 *
 * Le bloc « fabrication puis mensuel » n'est pas décoratif : c'est la seule
 * réponse à la comparaison avec les plateformes à 39 €/mois. Le retirer laisse
 * les prix de fabrication sans justification.
 *
 * Source unique des prix de ces cinq agents. Les prix des trois piliers restent
 * dans Piliers.jsx, ceux des packs dans Packs.jsx : aucune note comparative
 * entre les deux familles, volontairement.
 */

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { TEL_DISPLAY, TEL_HREF } from '@/components/Nav';

const CALENDLY = 'https://calendly.com/a-fontana-smatchroom/30min';

const AGENTS = [
  {
    name: 'Agent Gestionnaire',
    quote: "J'ai plein de devis en attente, mais jamais le temps de les relancer.",
    text: "Il relance vos devis sans réponse, au bon moment et avec vos mots, jusqu'à obtenir une réponse claire. Vous savez enfin lesquels sont morts et lesquels sont encore vivants.",
    setup: '490 € HT',
    monthly: '119 € HT / mois',
  },
  {
    name: 'Agent Accueil 24/7',
    quote: 'Je rate des appels toute la journée quand je suis sur un chantier.',
    text: "Il répond aux demandes entrantes à toute heure, note le besoin, l'adresse et l'urgence, puis vous transmet le tout. Un client qui n'a pas de réponse appelle le concurrent suivant.",
    setup: '390 € HT',
    monthly: '89 € HT / mois',
  },
  {
    name: 'Agent Visiteur',
    quote: 'Sur Google, on ne me trouve pas.',
    text: "Il travaille votre visibilité locale en continu : pages par ville et par prestation, contenu tenu à jour, fiche établissement alimentée. Pour apparaître quand quelqu'un cherche votre métier près de chez lui.",
    setup: '390 € HT',
    monthly: '89 € HT / mois',
  },
  {
    name: 'Agent Contrôleur',
    quote: 'Je passe mon temps à réclamer les attestations de mes sous-traitants.',
    text: "Il suit les documents de conformité de vos sous-traitants, relance ceux qui manquent et vous alerte avant l'expiration. Vous êtes en règle sans y penser.",
    setup: '390 € HT',
    monthly: '79 € HT / mois',
  },
  {
    name: 'Agent Acheteur',
    quote: 'Mes marges se font manger par le prix des matériaux.',
    text: "Il consulte vos fournisseurs, compare et relance sur vos postes d'achat récurrents. Quelques points de marge récupérés sur l'année suffisent à le payer.",
    setup: '590 € HT',
    monthly: '119 € HT / mois',
  },
];

/* Même animation d'apparition que Piliers, Packs et Preuves, mêmes réglages :
   on ne crée pas une deuxième grammaire de mouvement sur la page. */
function Rise({ children, delay = 0, className }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function AutresAgents() {
  return (
    <section
      id="autres-agents"
      aria-labelledby="autres-agents-titre"
      className="relative scroll-mt-24 px-5 py-24 sm:px-6 sm:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <Rise>
          <div className="mb-12 flex items-center gap-4">
            <span className="section-index">Toute la famille</span>
            <span className="h-px flex-1 bg-[var(--border-strong)]" />
          </div>
        </Rise>

        <Rise delay={0.05}>
          <div className="mb-16 max-w-3xl">
            <h2
              id="autres-agents-titre"
              className="text-balance text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-[3.1rem]"
            >
              L&apos;agent qui prospecte{' '}
              <span className="font-serif-it font-normal text-[var(--primary-ink)]">
                n&apos;est que le premier.
              </span>
            </h2>
            <p className="mt-5 text-[var(--muted-strong)] sm:text-lg">
              Une fois qu&apos;un agent tourne chez vous, le reste du travail répétitif peut partir
              à la machine lui aussi. Relancer les devis, décrocher quand vous êtes sur le toit,
              courir après les attestations. Le principe ne change pas&nbsp;: la machine fait ce qui
              se répète, vous gardez le contact humain.
            </p>
          </div>
        </Rise>

        {/* Même alignement en `subgrid` que Packs : chaque carte occupe les quatre
            mêmes pistes de la grille parente (citation, nom, description, prix),
            donc les blocs de prix tombent sur la même ligne d'une carte à l'autre
            même quand les citations font une ou deux lignes. La piste de la
            description est en 1fr, c'est elle qui absorbe l'écart. */}
        <Rise>
          <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 md:grid-rows-[auto_auto_1fr_auto] xl:grid-cols-3">
            {AGENTS.map((a) => (
              <article
                key={a.name}
                className="flex h-full flex-col rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] p-7 md:row-span-4 md:grid md:grid-rows-subgrid md:gap-0"
              >
                <p className="font-serif-it text-xl leading-snug text-[var(--foreground)] sm:text-[1.4rem]">
                  «&nbsp;{a.quote}&nbsp;»
                </p>

                <p className="mt-5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--muted)]">
                  {a.name}
                </p>

                <p className="mt-3 text-[0.95rem] leading-relaxed text-[var(--muted-strong)]">
                  {a.text}
                </p>

                <div className="mt-6 border-t border-[var(--border)] pt-5">
                  <p className="font-display text-3xl font-semibold tracking-tight text-[var(--foreground)]">
                    {a.setup}
                  </p>
                  <p className="mt-1 text-sm text-[var(--muted)]">de fabrication, une seule fois</p>
                  <p className="mt-3 text-base font-semibold text-[var(--primary-ink)]">
                    puis {a.monthly}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Rise>

        <Rise delay={0.05}>
          <div className="mt-16 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-10">
            <div className="rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-2)] p-7 sm:p-9">
              <h3 className="text-balance text-xl font-semibold tracking-tight sm:text-2xl">
                Pourquoi une fabrication, puis un mensuel léger&nbsp;?
              </h3>
              <p className="mt-5 text-[0.98rem] leading-relaxed text-[var(--muted-strong)]">
                On ne vous vend pas l&apos;accès à une plateforme. On vous fabrique un agent. Avant
                qu&apos;il ne fasse quoi que ce soit en votre nom, il y a du travail humain&nbsp;:
                monter une infrastructure qui n&apos;est qu&apos;à vous et n&apos;est jamais
                mutualisée avec un autre client, lui apprendre votre vocabulaire, vos arguments, vos
                objections, votre façon de parler d&apos;un chantier, puis le régler et le tester
                jusqu&apos;à ce qu&apos;il tienne la route. C&apos;est ça, les frais de fabrication.
                Ils se paient une seule fois.
              </p>
              <p className="mt-5 text-[0.98rem] leading-relaxed text-[var(--muted-strong)]">
                Ensuite, le mensuel ne paie plus la fabrication&nbsp;: il paie le pilotage. On
                surveille, on ajuste, on réécrit ce qui ne prend pas, et vous nous avez au
                téléphone. C&apos;est pour ça qu&apos;il est bas, et c&apos;est aussi pour ça
                qu&apos;on ne vous demande pas de vous en occuper.
              </p>
            </div>

            {/* Détaché du bloc précédent et marqué par un filet orange : c'est la
                comparaison avec les plateformes en libre-service, elle doit se lire
                seule, même par quelqu'un qui a sauté les deux paragraphes. */}
            <p className="border-l-2 border-[var(--primary)] py-1 pl-6 text-[0.98rem] leading-relaxed text-[var(--muted-strong)] lg:self-center">
              Les plateformes à quelques dizaines d&apos;euros par mois vous vendent un accès&nbsp;:
              à vous d&apos;ouvrir le tableau de bord, de paramétrer, d&apos;écrire vos messages et
              de corriger quand ça ne marche pas. C&apos;est très bien si vous avez le temps. Vous
              êtes sur un chantier de 7h à 18h&nbsp;: vous ne l&apos;avez pas.
            </p>
          </div>
        </Rise>

        <Rise delay={0.05}>
          <div className="mt-12 flex flex-col items-start justify-between gap-7 rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] p-7 sm:p-8 lg:flex-row lg:items-center">
            <p className="max-w-2xl text-[0.98rem] leading-relaxed text-[var(--muted-strong)]">
              On n&apos;en branche jamais plusieurs au départ. On installe celui qui répond à votre
              problème du moment, vous regardez ce que ça donne pendant deux mois, et on ne parle du
              suivant que si le premier a fait ses preuves.{' '}
              <span className="font-semibold text-[var(--foreground)]">
                Une chose à la fois&nbsp;: c&apos;est plus lent sur le papier, c&apos;est beaucoup
                plus solide en vrai.
              </span>
            </p>
            <div className="flex flex-shrink-0 flex-col items-start gap-3">
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Réserver un créneau de 30 minutes pour choisir votre agent"
                className="btn-primary inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold"
              >
                Réserver un créneau de 30 min
                <ArrowRight size={16} aria-hidden />
              </a>
              <a
                href={TEL_HREF}
                className="text-sm text-[var(--muted-strong)] underline decoration-[var(--border-strong)] underline-offset-4 hover:text-[var(--primary-ink)]"
              >
                ou appelez-nous&nbsp;: {TEL_DISPLAY}
              </a>
            </div>
          </div>
        </Rise>
      </div>
    </section>
  );
}
