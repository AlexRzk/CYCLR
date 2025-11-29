'use client';

import { useEffect, useState, useCallback } from 'react';
import type { MousePosition } from '@/types';

export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });
  
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const { clientX, clientY } = e;
    const normalizedX = (clientX / window.innerWidth) * 2 - 1;
    const normalizedY = (clientY / window.innerHeight) * 2 - 1;
    
    setPosition({
      x: clientX,
      y: clientY,
      normalizedX,
      normalizedY,
    });
  }, []);
  
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);
  
  return position;
}

// Hook for parallax effect based on mouse position
export function useParallax(intensity: number = 1) {
  const { normalizedX, normalizedY } = useMousePosition();
  
  return {
    x: normalizedX * intensity * 20,
    y: normalizedY * intensity * 20,
    rotateX: normalizedY * intensity * 5,
    rotateY: normalizedX * intensity * 5,
  };
}

// Hook for element-relative mouse position
export function useRelativeMousePosition(
  ref: React.RefObject<HTMLElement>
): { x: number; y: number; isInside: boolean } {
  const [relative, setRelative] = useState({ x: 0.5, y: 0.5, isInside: false });
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const isInside = x >= 0 && x <= 1 && y >= 0 && y <= 1;
      
      setRelative({ x, y, isInside });
    };
    
    const handleMouseLeave = () => {
      setRelative({ x: 0.5, y: 0.5, isInside: false });
    };
    
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref]);
  
  return relative;
}
