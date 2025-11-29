'use client';

import { useEffect, useState, useCallback } from 'react';
import { useAnimationStore } from '@/lib/store';
import { LIFECYCLE_PHASES, type PhaseConfig, type ScrollProgress } from '@/types';

export function useScrollProgress(): ScrollProgress {
  const scrollProgress = useAnimationStore((state) => state.scrollProgress);
  const [velocity, setVelocity] = useState(0);
  const [direction, setDirection] = useState<'up' | 'down' | 'idle'>('idle');
  const [lastProgress, setLastProgress] = useState(0);
  
  useEffect(() => {
    const diff = scrollProgress - lastProgress;
    
    if (Math.abs(diff) > 0.001) {
      setVelocity(diff);
      setDirection(diff > 0 ? 'down' : 'up');
    } else {
      setDirection('idle');
      setVelocity(0);
    }
    
    setLastProgress(scrollProgress);
  }, [scrollProgress, lastProgress]);
  
  // Determine current phase
  const phase = LIFECYCLE_PHASES.find(
    (p) => scrollProgress >= p.startProgress && scrollProgress < p.endProgress
  ) || LIFECYCLE_PHASES[LIFECYCLE_PHASES.length - 1];
  
  return {
    progress: scrollProgress,
    velocity,
    direction,
    phase,
  };
}

// Normalized progress within a specific phase (0-1)
export function usePhaseProgress(phaseId: string): number {
  const scrollProgress = useAnimationStore((state) => state.scrollProgress);
  
  const phase = LIFECYCLE_PHASES.find((p) => p.id === phaseId);
  if (!phase) return 0;
  
  const phaseRange = phase.endProgress - phase.startProgress;
  const progressInPhase = scrollProgress - phase.startProgress;
  
  return Math.max(0, Math.min(1, progressInPhase / phaseRange));
}

// Hook to trigger callback when entering/exiting a phase
export function usePhaseTransition(
  callback: (phase: PhaseConfig, direction: 'enter' | 'exit') => void
) {
  const currentPhase = useAnimationStore((state) => state.currentPhase);
  const [lastPhase, setLastPhase] = useState(currentPhase);
  
  const stableCallback = useCallback(callback, [callback]);
  
  useEffect(() => {
    if (currentPhase !== lastPhase) {
      // Find phase configs
      const exitingPhase = LIFECYCLE_PHASES.find((p) => p.id === lastPhase);
      const enteringPhase = LIFECYCLE_PHASES.find((p) => p.id === currentPhase);
      
      if (exitingPhase) stableCallback(exitingPhase, 'exit');
      if (enteringPhase) stableCallback(enteringPhase, 'enter');
      
      setLastPhase(currentPhase);
    }
  }, [currentPhase, lastPhase, stableCallback]);
}
