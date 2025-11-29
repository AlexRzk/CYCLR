'use client';

import { ReactNode, useRef } from 'react';
import { ReactLenis, useLenis } from '@studio-freight/react-lenis';
import { useAnimationStore, useCanvasStore } from '@/lib/store';

interface SmoothScrollProps {
  children: ReactNode;
}

// Lenis options for luxury "heavy" scroll feel
const lenisOptions = {
  lerp: 0.1,           // Lower = smoother/heavier feel
  duration: 1.5,       // Longer duration = more momentum
  smoothWheel: true,
  smoothTouch: false,  // Disable on touch for better mobile UX
  wheelMultiplier: 1,
  touchMultiplier: 2,
  infinite: false,
  orientation: 'vertical' as const,
  gestureOrientation: 'vertical' as const,
};

// Inner component that uses the Lenis context
function LenisScrollHandler() {
  const setScrollProgress = useAnimationStore((state) => state.setScrollProgress);
  const setScrollVelocity = useCanvasStore((state) => state.setScrollVelocity);
  const lastScrollRef = useRef(0);
  
  useLenis(({ scroll, limit }) => {
    // Normalize scroll progress between 0 and 1
    const progress = limit > 0 ? scroll / limit : 0;
    
    // Only update if there's meaningful change (performance optimization)
    if (Math.abs(progress - lastScrollRef.current) > 0.001) {
      setScrollProgress(progress);
      lastScrollRef.current = progress;
    }
    
    // Calculate velocity from progress delta
    const velocity = (progress - lastScrollRef.current) * 100;
    setScrollVelocity(velocity);
  });
  
  return null;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <ReactLenis 
      root 
      options={lenisOptions}
    >
      <LenisScrollHandler />
      {children}
    </ReactLenis>
  );
}

// Export a hook to control scroll programmatically
export function useScrollTo() {
  const lenis = useLenis();
  
  const scrollTo = (target: string | number | HTMLElement, options?: {
    offset?: number;
    duration?: number;
    immediate?: boolean;
  }) => {
    lenis?.scrollTo(target, {
      offset: options?.offset ?? 0,
      duration: options?.duration ?? 1.5,
      immediate: options?.immediate ?? false,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Expo ease out
    });
  };
  
  const scrollToTop = (immediate = false) => {
    lenis?.scrollTo(0, { immediate, duration: 1.5 });
  };
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      lenis?.scrollTo(element, { offset: 0, duration: 1.5 });
    }
  };
  
  const stop = () => lenis?.stop();
  const start = () => lenis?.start();
  
  return {
    scrollTo,
    scrollToTop,
    scrollToSection,
    stop,
    start,
    lenis,
  };
}
