"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

function FloatingSphere() {
  const mesh = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    mesh.current.rotation.x = Math.cos(time / 4) / 8;
    mesh.current.rotation.y = Math.sin(time / 4) / 8;
    mesh.current.position.y = Math.sin(time / 2) / 10;
  });

  return (
    <Float speed={4} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={mesh} args={[1, 64, 64]} scale={2}>
        <MeshDistortMaterial
          color="#8b5cf6"
          speed={3}
          distort={0.4}
          radius={1}
          metalness={0.5}
          roughness={0.2}
          emissive="#6d28d9"
          emissiveIntensity={0.2}
        />
      </Sphere>
    </Float>
  );
}

export function Hero3D() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} />
        <FloatingSphere />
      </Canvas>
    </div>
  );
}
