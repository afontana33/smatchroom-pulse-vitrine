'use client';

/**
 * Hero éditorial.
 *
 * Structure reprise de « Editorial Hero » (hero-05, @felipemenezes098 sur
 * 21st.dev) : accroche courte calée à gauche en bas, titre et corps de texte
 * à droite, photo pleine largeur en dessous. Portée en JSX et rebranchée sur
 * les tokens Pulse (ivoire, orange, Bricolage + Instrument Serif) plutôt que
 * sur le thème shadcn d'origine.
 *
 * Le décalage gauche/droite est ce qui fait le registre « magazine » : ne pas
 * le recentrer, c'est lui qui casse le rendu bloc-titre-centré des landings
 * générées.
 *
 * La bande média accepte une vidéo en boucle, muette et décorative. Le repli
 * n'est pas une option de secours : l'image poster est TOUJOURS rendue, et la
 * vidéo vient se poser par-dessus quand elle est autorisée et lisible. Aucun
 * cas ne peut donc laisser une zone noire.
 */

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';

const CALENDLY = 'https://calendly.com/a-fontana-smatchroom/30min';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 14, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const media = {
  hidden: { opacity: 0, y: 26, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Décide si on joue la vidéo. La décision est prise APRÈS le montage et jamais
 * au rendu serveur : le texte et les boutons doivent s'afficher sans attendre
 * quoi que ce soit du média.
 *
 * Conséquence voulue : le <video> n'est monté que si la réponse est oui, donc
 * sur mobile le fichier n'est pas seulement masqué en CSS, il n'est jamais
 * demandé au réseau.
 *
 * Trois refus : écran sous 768 px, mouvement réduit demandé par le système,
 * connexion annoncée lente ou mode économie de données.
 */
function useVideoAllowed() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia('(min-width: 768px)');
    const still = window.matchMedia('(prefers-reduced-motion: reduce)');
    const conn = navigator.connection;

    const decide = () => {
      const slow = conn
        ? conn.saveData === true || ['slow-2g', '2g', '3g'].includes(conn.effectiveType)
        : false;
      setAllowed(wide.matches && !still.matches && !slow);
    };

    decide();
    wide.addEventListener('change', decide);
    still.addEventListener('change', decide);
    conn?.addEventListener?.('change', decide);

    return () => {
      wide.removeEventListener('change', decide);
      still.removeEventListener('change', decide);
      conn?.removeEventListener?.('change', decide);
    };
  }, []);

  return allowed;
}

export default function HeroLp({
  poster = '/photos/hero-maison.webp',
  hasVideo = false,
  hasWebm = false,
}) {
  const reduce = useReducedMotion();
  const animate = !reduce;

  /* `hasVideo` est constaté à la construction : sans hero.mp4 déposé, aucun
     <video> n'est monté et l'image seule reste servie. C'est ce qui permet de
     mettre le dispositif en place avant les médias sans casser le hero. */
  const videoAllowed = useVideoAllowed() && hasVideo;
  /* `playing` ne passe à vrai qu'une fois la première image décodée : avant, la
     vidéo est transparente et c'est le poster qu'on voit. En cas d'erreur on
     repasse à faux et le poster reprend la main, sans zone vide. */
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!videoAllowed) setPlaying(false);
  }, [videoAllowed]);

  return (
    <section className="relative isolate w-full overflow-hidden">
      <motion.div
        className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 pb-12 pt-28 sm:px-6 sm:pb-14 sm:pt-32 lg:grid-cols-12 lg:pt-36"
        variants={animate ? container : undefined}
        initial={animate ? 'hidden' : false}
        animate={animate ? 'visible' : undefined}
      >
        <motion.div
          variants={animate ? item : undefined}
          className="flex lg:col-span-4 lg:col-start-1 lg:items-end lg:self-stretch"
        >
          <div className="max-w-xs">
            <p className="eyebrow">Bordeaux · partout en France</p>
            <p className="mt-4 text-[0.95rem] leading-relaxed tracking-tight text-[var(--muted-strong)]">
              On digitalise et on automatise les entreprises, de l&apos;artisan seul à la
              grande entreprise.
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={animate ? item : undefined}
          className="flex flex-col items-start gap-6 sm:gap-8 lg:col-span-7 lg:col-start-6"
        >
          <h1 className="text-balance text-4xl font-semibold leading-[1.04] tracking-tight sm:text-5xl lg:text-[4.2rem]">
            Vos meilleurs clients ne vous cherchent pas.{' '}
            <span className="font-serif-it font-normal text-[var(--primary-ink)]">
              On va les chercher.
            </span>
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-[var(--muted-strong)] sm:text-lg">
            Pendant que vous êtes sur le terrain, nos agents prospectent, votre site travaille
            et vos publicités tournent. Vous ne récupérez que les rendez-vous.
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold"
            >
              Réserver un créneau de 30 min
              <ArrowRight size={16} />
            </a>
            <a
              href="#piliers"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--foreground)] underline-offset-4 hover:underline"
            >
              Voir les trois piliers
              <ArrowDown size={15} />
            </a>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        variants={animate ? media : undefined}
        initial={animate ? 'hidden' : false}
        animate={animate ? 'visible' : undefined}
        className="relative w-full"
      >
        {/* Le rapport d'image porté par l'enveloppe et non par le média : la
            hauteur de la bande est donc la même qu'avant, que le média soit une
            image ou une vidéo, et elle ne bouge pas au moment où la vidéo
            démarre. */}
        <div className="relative aspect-[2/1] w-full overflow-hidden sm:aspect-[9/4]">
          <img
            src={poster}
            alt="Deux artisans au travail sur le chantier d'une maison, en fin de journée"
            width={2000}
            height={1125}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />

          {videoAllowed && (
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={poster}
              aria-hidden="true"
              tabIndex={-1}
              onCanPlay={() => setPlaying(true)}
              onError={() => setPlaying(false)}
              className={[
                'absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700',
                playing ? 'opacity-100' : 'opacity-0',
              ].join(' ')}
            >
              {/* WebM référencé seulement s'il a été déposé : une source absente
                  coûterait une requête en 404 avant le repli sur le MP4. */}
              {hasWebm && <source src="/photos/hero.webm" type="video/webm" />}
              <source src="/photos/hero.mp4" type="video/mp4" />
            </video>
          )}

          {/* Voile encre, présent uniquement quand la vidéo tourne. Sur l'image de
              repli il n'a rien à faire : aucun texte ne chevauche cette bande dans
              ce hero, donc sur une image fixe le voile n'apporte aucune lisibilité
              et ne fait que salir la photo. Passer la classe en permanence si le
              texte vient un jour se poser sur le média. */}
          <div
            aria-hidden
            className={[
              'absolute inset-0 bg-[var(--ink)] transition-opacity duration-700',
              playing ? 'opacity-50' : 'opacity-0',
            ].join(' ')}
          />
        </div>

        {/* Raccord avec le fond ivoire de la page, inchangé. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent"
        />
      </motion.div>
    </section>
  );
}
