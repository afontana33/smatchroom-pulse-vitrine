"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";

function AnimatedSphere() {
  const mesh = useRef();
  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = state.clock.getElapsedTime() * 0.15;
    mesh.current.rotation.y = state.clock.getElapsedTime() * 0.2;
  });
  return (
    <Sphere ref={mesh} args={[1.8, 100, 200]} scale={1}>
      <MeshDistortMaterial
        color="#5b0bfc"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.25}
        metalness={0.35}
        transparent
        opacity={0.12}
      />
    </Sphere>
  );
}

function WireframeSphere() {
  const mesh = useRef();
  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = -state.clock.getElapsedTime() * 0.08;
    mesh.current.rotation.y = state.clock.getElapsedTime() * 0.12;
  });
  return (
    <Sphere ref={mesh} args={[2, 32, 32]} scale={1}>
      <meshBasicMaterial color="#294b73" wireframe transparent opacity={0.1} />
    </Sphere>
  );
}

export default function FloatingSphere({ className }) {
  return (
    <div className={className} style={{ pointerEvents: "none" }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.9} />
        <pointLight position={[10, 10, 10]} intensity={0.7} color="#5b0bfc" />
        <pointLight position={[-10, -10, -10]} intensity={0.35} color="#294b73" />
        <AnimatedSphere />
        <WireframeSphere />
      </Canvas>
    </div>
  );
}
