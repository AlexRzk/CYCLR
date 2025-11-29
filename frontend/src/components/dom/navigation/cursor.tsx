'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useUIStore, useCanvasStore } from '@/lib/store';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  
  const cursorType = useUIStore((state) => state.cursorType);
  const isCursorHovering = useUIStore((state) => state.isCursorHovering);
  const setMousePosition = useCanvasStore((state) => state.setMousePosition);
  
  // Smooth spring animations for cursor position
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const dotX = useMotionValue(0);
  const dotY = useMotionValue(0);
  
  // Spring configs for different feels
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const dotSpringConfig = { damping: 20, stiffness: 400, mass: 0.2 };
  
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const dotXSpring = useSpring(dotX, dotSpringConfig);
  const dotYSpring = useSpring(dotY, dotSpringConfig);
  
  useEffect(() => {
    // Check if we're on a touch device
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(pointer: coarse)').matches);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  useEffect(() => {
    if (isMobile) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      
      const { clientX, clientY } = e;
      
      // Update motion values
      cursorX.set(clientX);
      cursorY.set(clientY);
      dotX.set(clientX);
      dotY.set(clientY);
      
      // Update store for 3D effects (normalized -1 to 1)
      const normalizedX = (clientX / window.innerWidth) * 2 - 1;
      const normalizedY = (clientY / window.innerHeight) * 2 - 1;
      setMousePosition(normalizedX, normalizedY);
    };
    
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isMobile, cursorX, cursorY, dotX, dotY, setMousePosition]);
  
  // Don't render on mobile
  if (isMobile) return null;
  
  // Cursor size based on hover state
  const cursorSize = isCursorHovering ? 60 : 40;
  const dotSize = isCursorHovering ? 0 : 4;
  
  return (
    <>
      {/* Main cursor ring */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: cursorSize,
          height: cursorSize,
          opacity: isVisible ? 1 : 0,
          scale: cursorType === 'pointer' ? 1.5 : 1,
        }}
        transition={{
          width: { duration: 0.2 },
          height: { duration: 0.2 },
          scale: { duration: 0.2 },
        }}
      >
        <div 
          className={`
            w-full h-full rounded-full border transition-all duration-200
            ${isCursorHovering 
              ? 'border-chlorophyll bg-chlorophyll/10' 
              : 'border-holographic/50 bg-transparent'
            }
          `}
        />
      </motion.div>
      
      {/* Center dot */}
      <motion.div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: dotXSpring,
          y: dotYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: dotSize,
          height: dotSize,
          opacity: isVisible && !isCursorHovering ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      >
        <div className="w-full h-full rounded-full bg-holographic" />
      </motion.div>
      
      {/* Hide default cursor globally */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>
    </>
  );
}

// Hook to add magnetic effect to elements
export function useMagneticCursor(ref: React.RefObject<HTMLElement>) {
  const setCursorHovering = useUIStore((state) => state.setCursorHovering);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const handleMouseEnter = () => setCursorHovering(true);
    const handleMouseLeave = () => {
      setCursorHovering(false);
      // Reset transform
      element.style.transform = '';
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * 0.2;
      const deltaY = (e.clientY - centerY) * 0.2;
      
      element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    };
    
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mousemove', handleMouseMove);
    };
  }, [ref, setCursorHovering]);
}
