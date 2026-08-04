'use client';

/**
 * Primitives de scroll cinématique — refonte v5.
 *
 * Système de profondeur à 6 niveaux (depth 0..5) : chaque couche se déplace à
 * une vitesse différente au scroll, ce qui fabrique la sensation de relief.
 * On n'anime que transform / opacity / filter / clip-path (GPU only).
 *
 * Tout est désactivé si l'utilisateur a demandé moins d'animations
 * (prefers-reduced-motion) ou s'il est sur un écran tactile.
 */

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';

/* Facteurs de parallaxe par niveau de profondeur. */
export const DEPTH = {
  0: { factor: 0.1, blur: 8, scale: 1.06 },
  1: { factor: 0.25, blur: 4, scale: 1.04 },
  2: { factor: 0.5, blur: 0, scale: 1 },
  3: { factor: 0.8, blur: 0, scale: 1 },
  4: { factor: 1, blur: 0, scale: 1 },
  5: { factor: 1.2, blur: 0, scale: 1 },
};

/** Vrai sur un appareil tactile : on y allège tous les effets. */
export function useCoarsePointer() {
  const [coarse, setCoarse] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)');
    const on = () => setCoarse(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return coarse;
}

/** Effets lourds coupés : accessibilité ou mobile. */
export function useLightMode() {
  const reduced = useReducedMotion();
  const coarse = useCoarsePointer();
  return Boolean(reduced || coarse);
}

/**
 * Couche de profondeur. À placer dans un conteneur `relative`.
 * Le décor (depth 0,1,2,5) est toujours aria-hidden.
 */
export function DepthLayer({ depth = 2, children, className = '', amplitude = 120, style }) {
  const ref = useRef(null);
  const light = useLightMode();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const { factor, blur } = DEPTH[depth] ?? DEPTH[2];
  const raw = useTransform(scrollYProgress, [0, 1], [amplitude * factor, -amplitude * factor]);
  const y = useSpring(raw, { stiffness: 90, damping: 30, mass: 0.4 });

  const decorative = depth !== 3 && depth !== 4;

  return (
    <motion.div
      ref={ref}
      aria-hidden={decorative || undefined}
      className={className}
      style={{
        y: light ? 0 : y,
        filter: blur ? `blur(${blur}px)` : undefined,
        zIndex: depth,
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Titre qui converge : les fragments arrivent des deux côtés et se rejoignent.
 * `parts` = tableau de { text, className, from } où from vaut 'left' | 'right' | 'up'.
 */
export function SplitConverge({ parts, className = '' }) {
  const light = useLightMode();
  const offset = { left: -80, right: 80, up: 0 };

  return (
    <span className={className}>
      {parts.map((p, i) => (
        <motion.span
          key={i}
          className={p.className}
          style={{ display: 'inline-block', willChange: 'transform, opacity' }}
          initial={
            light
              ? { opacity: 0 }
              : { opacity: 0, x: offset[p.from ?? 'up'] ?? 0, y: p.from === 'up' ? 36 : 0, filter: 'blur(10px)' }
          }
          whileInView={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-12%' }}
          transition={{
            duration: light ? 0.3 : 1.05,
            delay: light ? 0 : i * 0.12,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {p.text}
        </motion.span>
      ))}
    </span>
  );
}

/**
 * Texte qui s'allume mot par mot au fil du scroll (technique Apple).
 * Les mots passent de « éteint » à « encre pleine » à mesure que le bloc traverse
 * l'écran. `tone` choisit la palette : 'light' sur fond ivoire, 'dark' sur fond encre.
 */
export function WordLight({ text, className = '', tone = 'light', accent = [] }) {
  const ref = useRef(null);
  const light = useLightMode();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'start 0.25'],
  });

  const words = text.split(' ');
  const dim = tone === 'dark' ? 'rgba(243,241,236,0.22)' : 'rgba(22,21,27,0.20)';
  const lit = tone === 'dark' ? '#f3f1ec' : 'var(--foreground)';

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word
          key={`${w}-${i}`}
          word={w}
          index={i}
          total={words.length}
          progress={scrollYProgress}
          dim={dim}
          lit={accent.includes(w.replace(/[.,:;!?]/g, '')) ? 'var(--primary-ink)' : lit}
          light={light}
        />
      ))}
    </p>
  );
}

function Word({ word, index, total, progress, dim, lit, light }) {
  const start = index / total;
  const end = Math.min(1, start + 1.6 / total);
  const color = useTransform(progress, [start, end], [dim, lit]);

  return (
    <motion.span style={{ color: light ? lit : color }}>
      {word}{' '}
    </motion.span>
  );
}

/** Apparition sobre au scroll, réutilisée partout. */
export function Rise({ children, delay = 0, y = 28, className = '' }) {
  const light = useLightMode();
  return (
    <motion.div
      className={className}
      initial={light ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: light ? 0.3 : 0.85, delay: light ? 0 : delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Carte qui s'incline vers le curseur. Désactivée au doigt et en reduced-motion.
 * On garde l'inclinaison faible : au-delà de ~8° ça fait gadget.
 */
export function TiltCard({ children, className = '', max = 7 }) {
  const ref = useRef(null);
  const light = useLightMode();
  const [t, setT] = useState({ rx: 0, ry: 0 });

  const onMove = (e) => {
    if (light || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setT({ rx: -py * max * 2, ry: px * max * 2 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setT({ rx: 0, ry: 0 })}
      className={className}
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
      animate={{ rotateX: t.rx, rotateY: t.ry }}
      transition={{ type: 'spring', stiffness: 210, damping: 22 }}
    >
      {children}
    </motion.div>
  );
}

/** Compteur qui s'incrémente quand il entre dans le champ. */
export function CountUp({ to, suffix = '', prefix = '', duration = 1.5, className = '' }) {
  const ref = useRef(null);
  const light = useLightMode();
  const [val, setVal] = useState(light ? to : 0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (light) {
      setVal(to);
      return;
    }
    const el = ref.current;
    if (!el || done) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setDone(true);
        io.disconnect();
        const t0 = performance.now();
        const tick = (now) => {
          const p = Math.min(1, (now - t0) / (duration * 1000));
          setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration, done, light]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {val}
      {suffix}
    </span>
  );
}
