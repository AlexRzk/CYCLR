'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useAnimationStore } from '@/lib/store';

interface FloatingParticlesProps {
  count?: number;
  radius?: number;
}

export default function FloatingParticles({
  count = 200,
  radius = 10,
}: FloatingParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const scrollProgress = useAnimationStore((state) => state.scrollProgress);
  
  // Generate random positions and velocities
  const { positions, velocities, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    
    const chlorophyll = new THREE.Color('#00FF94');
    const cyber = new THREE.Color('#2563EB');
    const white = new THREE.Color('#E2E8F0');
    
    for (let i = 0; i < count; i++) {
      // Spherical distribution
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius * Math.cbrt(Math.random()); // Cubic root for uniform distribution
      
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      
      // Random velocities
      vel[i * 3] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
      
      // Random colors (mostly chlorophyll with some variation)
      const colorChoice = Math.random();
      let color: THREE.Color;
      if (colorChoice < 0.6) {
        color = chlorophyll.clone();
      } else if (colorChoice < 0.8) {
        color = cyber.clone();
      } else {
        color = white.clone();
      }
      
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
      
      // Random sizes
      siz[i] = Math.random() * 0.03 + 0.01;
    }
    
    return { positions: pos, velocities: vel, colors: col, sizes: siz };
  }, [count, radius]);
  
  // Animate particles
  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const geometry = pointsRef.current.geometry;
    const positionAttribute = geometry.getAttribute('position');
    const posArray = positionAttribute.array as Float32Array;
    
    const time = state.clock.elapsedTime;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Apply velocity
      posArray[i3] += velocities[i3] + Math.sin(time + i) * 0.001;
      posArray[i3 + 1] += velocities[i3 + 1] + Math.cos(time + i * 0.5) * 0.001;
      posArray[i3 + 2] += velocities[i3 + 2] + Math.sin(time * 0.5 + i) * 0.001;
      
      // Boundary check - wrap around
      const dist = Math.sqrt(
        posArray[i3] ** 2 +
        posArray[i3 + 1] ** 2 +
        posArray[i3 + 2] ** 2
      );
      
      if (dist > radius * 1.5) {
        // Reset to center-ish
        posArray[i3] *= 0.1;
        posArray[i3 + 1] *= 0.1;
        posArray[i3 + 2] *= 0.1;
      }
    }
    
    positionAttribute.needsUpdate = true;
    
    // Scroll-based rotation
    pointsRef.current.rotation.y = scrollProgress * Math.PI * 2;
    pointsRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;
    
    // Opacity based on scroll
    const material = pointsRef.current.material as THREE.PointsMaterial;
    material.opacity = 0.4 + scrollProgress * 0.3;
  });
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
