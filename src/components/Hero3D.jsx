'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleSphere({ color = '#7c3aed', count = 3200, radius = [4, 11] }) {
  const groupRef = useRef();

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = radius[0] + Math.random() * (radius[1] - radius[0]);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count, radius]);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += 0.0004;
    groupRef.current.rotation.x += 0.0001;
  });

  return (
    <group ref={groupRef}>
      <Points positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={color}
          size={0.028}
          sizeAttenuation
          depthWrite={false}
          opacity={0.9}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

function FarParticles() {
  const ref = useRef();
  const positions = useMemo(() => {
    const count = 2200;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 22 + Math.random() * 30;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.y += 0.00015;
  });

  return (
    <group ref={ref}>
      <Points positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#c4b5fd"
          size={0.011}
          sizeAttenuation
          depthWrite={false}
          opacity={0.45}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

/**
 * Sphère de particules du hero.
 *
 * Deux mesures de perf commandent ce fichier :
 *   - le rendu est mis en pause dès que le hero quitte l'écran ou que l'onglet
 *     passe en arrière-plan (`frameloop: 'never'`). Sans ça la boucle WebGL
 *     tournait pendant tout le scroll : 2 fps dans le corps de page ;
 *   - plus de post-traitement (EffectComposer + Bloom). Cette seule passe
 *     coûtait 20 fps sur le hero (2 fps avec, 22 sans). Le halo vient de
 *     particules plus grosses en blending additif, et la vignette est refaite
 *     en CSS statique dans HeroV5.
 */
export default function Hero3D() {
  const holder = useRef(null);
  const [actif, setActif] = useState(true);

  useEffect(() => {
    const el = holder.current;
    if (!el) return;

    let visible = true;
    const maj = () => setActif(visible && document.visibilityState === 'visible');

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        maj();
      },
      /* un peu de marge pour que la sphère tourne déjà quand on remonte */
      { rootMargin: '10% 0px' }
    );
    io.observe(el);
    document.addEventListener('visibilitychange', maj);

    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', maj);
    };
  }, []);

  return (
    <div ref={holder} className="h-full w-full">
      <Canvas
        frameloop={actif ? 'always' : 'never'}
        camera={{ position: [0, 0, 12], fov: 55 }}
        dpr={[1, 1.25]}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[6, 4, 4]} intensity={1.0} color="#5b0bfc" />
        <pointLight position={[-6, -3, -4]} intensity={0.6} color="#5b0bfc" />
        <FarParticles />
        <ParticleSphere />
      </Canvas>
    </div>
  );
}
