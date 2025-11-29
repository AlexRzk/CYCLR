'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useAnimationStore, useCanvasStore } from '@/lib/store';

interface DNAHelixProps {
  radius?: number;
  height?: number;
  turns?: number;
  pointsPerTurn?: number;
}

export default function DNAHelix({
  radius = 1,
  height = 6,
  turns = 3,
  pointsPerTurn = 20,
}: DNAHelixProps) {
  const meshRef = useRef<THREE.Group>(null);
  const strand1Ref = useRef<THREE.Points>(null);
  const strand2Ref = useRef<THREE.Points>(null);
  const connectorsRef = useRef<THREE.LineSegments>(null);
  
  const scrollProgress = useAnimationStore((state) => state.scrollProgress);
  const currentPhase = useAnimationStore((state) => state.currentPhase);
  const scrollVelocity = useCanvasStore((state) => state.scrollVelocity);
  
  // Generate helix geometry
  const { strand1Positions, strand2Positions, connectorPositions } = useMemo(() => {
    const totalPoints = turns * pointsPerTurn;
    const strand1 = new Float32Array(totalPoints * 3);
    const strand2 = new Float32Array(totalPoints * 3);
    const connectors: number[] = [];
    
    for (let i = 0; i < totalPoints; i++) {
      const t = i / totalPoints;
      const angle = t * turns * Math.PI * 2;
      const y = (t - 0.5) * height;
      
      // Strand 1
      strand1[i * 3] = Math.cos(angle) * radius;
      strand1[i * 3 + 1] = y;
      strand1[i * 3 + 2] = Math.sin(angle) * radius;
      
      // Strand 2 (offset by PI)
      strand2[i * 3] = Math.cos(angle + Math.PI) * radius;
      strand2[i * 3 + 1] = y;
      strand2[i * 3 + 2] = Math.sin(angle + Math.PI) * radius;
      
      // Connectors (every few points)
      if (i % 4 === 0) {
        connectors.push(
          strand1[i * 3], strand1[i * 3 + 1], strand1[i * 3 + 2],
          strand2[i * 3], strand2[i * 3 + 1], strand2[i * 3 + 2]
        );
      }
    }
    
    return {
      strand1Positions: strand1,
      strand2Positions: strand2,
      connectorPositions: new Float32Array(connectors),
    };
  }, [radius, height, turns, pointsPerTurn]);
  
  // Color based on current phase
  const targetColor = useMemo(() => {
    switch (currentPhase) {
      case 'staking':
        return new THREE.Color('#2563EB'); // Cyber blue
      case 'recycling':
        return new THREE.Color('#4DFFC0'); // Bright chlorophyll
      default:
        return new THREE.Color('#00FF94'); // Neon chlorophyll
    }
  }, [currentPhase]);
  
  // Animation frame
  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    // Base rotation
    meshRef.current.rotation.y += delta * 0.1;
    
    // Scroll-driven untwist effect
    const untwistAmount = scrollProgress * Math.PI * 0.5;
    meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.1 + untwistAmount * 0.2;
    
    // Scale breathing
    const scale = 1 + Math.sin(time * 0.8) * 0.02;
    meshRef.current.scale.setScalar(scale);
    
    // Velocity-based effects
    const velocityScale = 1 + Math.abs(scrollVelocity) * 0.001;
    meshRef.current.scale.y = scale * velocityScale;
    
    // Update strand colors (lerp toward target)
    if (strand1Ref.current && strand2Ref.current) {
      const material1 = strand1Ref.current.material as THREE.PointsMaterial;
      const material2 = strand2Ref.current.material as THREE.PointsMaterial;
      
      material1.color.lerp(targetColor, delta * 2);
      material2.color.lerp(targetColor, delta * 2);
    }
    
    // Update connector colors
    if (connectorsRef.current) {
      const material = connectorsRef.current.material as THREE.LineBasicMaterial;
      material.color.lerp(targetColor.clone().multiplyScalar(0.5), delta * 2);
    }
  });
  
  return (
    <group ref={meshRef} position={[0, 0, 0]}>
      {/* Strand 1 */}
      <points ref={strand1Ref}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={strand1Positions}
            count={strand1Positions.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color="#00FF94"
          transparent
          opacity={0.9}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
      
      {/* Strand 2 */}
      <points ref={strand2Ref}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={strand2Positions}
            count={strand2Positions.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color="#00FF94"
          transparent
          opacity={0.9}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
      
      {/* Connectors */}
      <lineSegments ref={connectorsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={connectorPositions}
            count={connectorPositions.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#00FF94"
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
      
      {/* Glow sphere at center */}
      <mesh>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial
          color="#00FF94"
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}
