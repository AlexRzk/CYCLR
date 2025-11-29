'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Preload, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';
import * as THREE from 'three';
import { useCanvasStore, useUIStore } from '@/lib/store';
import DNAHelix from './dna-helix';
import FloatingParticles from './floating-particles';

// Scene content component
function SceneContent() {
  const groupRef = useRef<THREE.Group>(null);
  const mousePosition = useCanvasStore((state) => state.mousePosition);
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Subtle mouse-aware rotation
      const targetX = mousePosition.y * 0.1;
      const targetY = mousePosition.x * 0.1;
      
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetX,
        delta * 2
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetY,
        delta * 2
      );
    }
  });
  
  return (
    <group ref={groupRef}>
      {/* Main interactive DNA Helix */}
      <DNAHelix />
      
      {/* Ambient floating particles */}
      <FloatingParticles count={200} />
    </group>
  );
}

// Camera rig for smooth following
function CameraRig() {
  useFrame((state) => {
    // Subtle camera breathing effect
    state.camera.position.z = 5 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });
  
  return null;
}

export default function Scene() {
  const setReady = useCanvasStore((state) => state.setReady);
  const isLoading = useUIStore((state) => state.isLoading);
  
  // Memoize camera settings
  const cameraProps = useMemo(() => ({
    position: [0, 0, 5] as [number, number, number],
    fov: 75,
    near: 0.1,
    far: 100,
  }), []);
  
  return (
    <div 
      className="canvas-container"
      style={{
        opacity: isLoading ? 0 : 1,
        transition: 'opacity 0.8s ease-out',
      }}
    >
      <Canvas
        camera={cameraProps}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
        }}
        onCreated={() => {
          setReady(true);
        }}
      >
        {/* Performance optimizations */}
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        
        {/* Lighting */}
        <ambientLight intensity={0.2} />
        <pointLight 
          position={[10, 10, 10]} 
          intensity={0.5} 
          color="#00FF94" 
        />
        <pointLight 
          position={[-10, -10, -10]} 
          intensity={0.3} 
          color="#2563EB" 
        />
        
        {/* Fog for depth */}
        <fog attach="fog" args={['#050505', 5, 20]} />
        
        {/* Scene content */}
        <SceneContent />
        
        {/* Camera animation */}
        <CameraRig />
        
        {/* Preload all assets */}
        <Preload all />
      </Canvas>
    </div>
  );
}
