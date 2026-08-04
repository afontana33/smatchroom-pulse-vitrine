'use client';

/**
 * Section 2 — Problème vs Solution.
 *
 * Le titre s'allume mot par mot au scroll (technique Apple), puis deux colonnes
 * se croisent : la colonne « aujourd'hui » arrive de la gauche, désaturée et
 * légèrement basculée ; la colonne « avec Pulse » arrive de la droite, nette et
 * orange. Le contraste de traitement porte l'argument avant même la lecture.
 */

import { motion } from 'framer-motion';
import { Clock, PhoneOff, FileSpreadsheet, Wallet, Check } from 'lucide-react';
import { DepthLayer, WordLight, Rise, useLightMode } from './motion';

const PAIN = [
  { icon: FileSpreadsheet, text: 'Des heures dans un fichier de prospection au lieu du terrain' },
  { icon: PhoneOff, text: 'Du démarchage à froid qui épuise et qui ne répond pas' },
  { icon: Wallet, text: 'Des agences qui facturent du temps humain hors de prix' },
  { icon: Clock, text: 'Des logiciels qui vous laissent faire le travail technique' },
];

const GAIN = [
  'La machine cible, rédige et relance à votre place',
  'Vous ne parlez qu’à des prospects déjà chauds',
  'Aucune ligne de code à écrire, aucun outil à apprendre',
  'Un coût fixe, connu à l’avance, sans temps humain facturé',
];

export default function ProblemSolution() {
  const light = useLightMode();

  return (
    <section id="probleme" className="relative isolate scroll-mt-24 overflow-hidden px-5 py-28 sm:px-6 sm:py-36">
      {/* depth 1 — halo discret côté solution */}
      <DepthLayer depth={1} amplitude={120} className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-1/3 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,var(--primary-soft),transparent_65%)] blur-3xl" />
      </DepthLayer>

      {/* depth 2 — trait vertical qui sépare les deux régimes */}
      <DepthLayer depth={2} amplitude={70} className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-24 hidden h-[60%] w-px bg-gradient-to-b from-transparent via-[var(--border-strong)] to-transparent lg:block" />
      </DepthLayer>

      <div className="relative z-[4] mx-auto max-w-7xl">
        <Rise>
          <div className="mb-8 flex items-center gap-4">
            <span className="section-index">Le constat</span>
            <span className="h-px flex-1 bg-[var(--border-strong)]" />
          </div>
        </Rise>

        <WordLight
          text="Votre vraie valeur ajoutée est sur le terrain. Pas derrière un fichier de prospection."
          accent={['terrain']}
          className="max-w-4xl text-balance text-3xl font-semibold leading-[1.12] tracking-tight sm:text-4xl lg:text-[3.4rem]"
        />

        <Rise delay={0.1}>
          <p className="mt-8 max-w-3xl text-balance text-[var(--muted-strong)] sm:text-lg">
            Que vous cherchiez à signer un chantier de rénovation, un contrat de nettoyage, ou à
            ouvrir de nouveaux comptes PME, la problématique est la même : le démarchage à froid
            épuise.
          </p>
        </Rise>

        <div className="mt-16 grid gap-6 lg:grid-cols-2 lg:gap-10">
          {/* Colonne « aujourd'hui » : désaturée, entre par la gauche */}
          <motion.div
            initial={light ? { opacity: 0 } : { opacity: 0, x: -60, rotate: -1.2 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="card relative overflow-hidden p-7 opacity-90 grayscale-[0.35] sm:p-9"
          >
            <p className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-[var(--muted)]">
              Aujourd&apos;hui
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--muted-strong)]">
              Vous prospectez. Ou vous produisez.
            </h3>
            <ul className="mt-7 space-y-4">
              {PAIN.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3 text-sm text-[var(--muted-strong)]">
                  <span className="mt-0.5 inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--surface-3)] text-[var(--muted)]">
                    <Icon size={14} strokeWidth={1.9} />
                  </span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Colonne « avec Pulse » : nette, entre par la droite */}
          <motion.div
            initial={light ? { opacity: 0 } : { opacity: 0, x: 60, rotate: 1.2 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="card relative overflow-hidden p-7 ring-1 ring-[var(--primary-line)] sm:p-9"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,var(--primary-soft),transparent_65%)]"
            />
            <p className="relative font-mono text-[0.66rem] uppercase tracking-[0.2em] text-[var(--primary-ink)]">
              Avec SmatchRoom Pulse
            </p>
            <h3 className="relative mt-3 text-2xl font-semibold tracking-tight text-[var(--foreground)]">
              La machine prospecte. <span className="font-serif-it">Vous signez.</span>
            </h3>
            <ul className="relative mt-7 space-y-4">
              {GAIN.map((text, i) => (
                <motion.li
                  key={text}
                  initial={light ? { opacity: 0 } : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.25 + i * 0.09 }}
                  className="flex items-start gap-3 text-sm text-[var(--foreground)]"
                >
                  <span className="mt-0.5 inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--primary-soft)] text-[var(--primary-ink)] ring-1 ring-[var(--primary-line)]">
                    <Check size={14} strokeWidth={2.4} />
                  </span>
                  <span>{text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <Rise delay={0.15}>
          <p className="mx-auto mt-14 max-w-3xl text-balance text-center text-lg font-medium text-[var(--foreground)] sm:text-xl">
            Nous codons des collaborateurs numériques qui font le travail ingrat à votre place.{' '}
            <span className="gradient-text font-semibold">
              La machine prospecte. Vous signez les contrats.
            </span>
          </p>
        </Rise>
      </div>
    </section>
  );
}
