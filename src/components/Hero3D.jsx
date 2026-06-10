'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

function ParticleSphere({ color = '#a855f7', count = 4500, radius = [4, 11] }) {
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
          size={0.022}
          sizeAttenuation
          depthWrite={false}
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

function FarParticles() {
  const ref = useRef();
  const positions = useMemo(() => {
    const count = 3500;
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
          color="#9bb0ff"
          size={0.008}
          sizeAttenuation
          depthWrite={false}
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

export default function Hero3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 12], fov: 55 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[6, 4, 4]} intensity={1.0} color="#a855f7" />
      <pointLight position={[-6, -3, -4]} intensity={0.6} color="#6d28d9" />
      <FarParticles />
      <ParticleSphere />
      <EffectComposer>
        <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.025} intensity={1.4} />
        <Vignette offset={0.32} darkness={0.7} />
      </EffectComposer>
    </Canvas>
  );
}
