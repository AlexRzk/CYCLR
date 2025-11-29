'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useUIStore } from '@/lib/store';
import SmoothScroll from '@/components/layout/smooth-scroll';
import Scene from '@/components/canvas/scene';
import CustomCursor from '@/components/dom/navigation/cursor';

interface ProvidersProps {
  children: ReactNode;
}

// Preloader component
function Preloader() {
  const { isLoading, loadingProgress } = useUIStore();
  
  if (!isLoading) return null;
  
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-void">
      <div className="flex flex-col items-center gap-6">
        {/* Logo/Brand mark */}
        <div className="relative">
          <div className="loader-ring" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-chlorophyll font-mono text-sm font-bold">
              C
            </span>
          </div>
        </div>
        
        {/* Loading bar */}
        <div className="w-48 h-0.5 bg-void-elevated rounded-full overflow-hidden">
          <div 
            className="h-full bg-chlorophyll transition-all duration-300 ease-out-expo"
            style={{ width: `${loadingProgress}%` }}
          />
        </div>
        
        {/* Loading text */}
        <p className="text-holographic-dim text-xs font-mono uppercase tracking-widest">
          Loading Experience
        </p>
      </div>
    </div>
  );
}

export default function Providers({ children }: ProvidersProps) {
  const [isMounted, setIsMounted] = useState(false);
  const setLoading = useUIStore((state) => state.setLoading);
  
  useEffect(() => {
    setIsMounted(true);
    
    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        setLoading(false, 100);
        clearInterval(interval);
      } else {
        setLoading(true, progress);
      }
    }, 200);
    
    return () => clearInterval(interval);
  }, [setLoading]);
  
  // Prevent hydration mismatch
  if (!isMounted) {
    return null;
  }
  
  return (
    <SmoothScroll>
      {/* Preloader */}
      <Preloader />
      
      {/* Global 3D Canvas (fixed background) */}
      <Scene />
      
      {/* Custom Cursor (desktop only) */}
      <CustomCursor />
      
      {/* DOM Content Layer */}
      <div className="dom-layer">
        {children}
      </div>
    </SmoothScroll>
  );
}
