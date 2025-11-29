'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useScrollProgress } from '@/lib/hooks/use-scroll-progress';
import { useAnimationStore } from '@/lib/store';
import HeroOverlay from '@/components/dom/sections/hero-overlay';
import LifecycleScroll from '@/components/dom/sections/lifecycle-scroll';
import ImpactData from '@/components/dom/sections/impact-data';
import StickyNav from '@/components/dom/navigation/sticky-nav';

export default function ExperiencePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { progress } = useScrollProgress();
  const currentPhase = useAnimationStore((state) => state.currentPhase);
  
  // Main scroll progress for page-level animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });
  
  // Smooth out scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  
  // Background color transition based on phase
  const bgOpacity = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0, 0.1, 0.15, 0.2]);
  
  return (
    <>
      {/* Sticky Navigation */}
      <StickyNav />
      
      {/* Main scrollytelling container */}
      <div 
        ref={containerRef}
        className="relative min-h-[500vh]" // Extended for smooth scrolling
      >
        {/* Gradient overlays that respond to scroll */}
        <motion.div 
          className="fixed inset-0 pointer-events-none z-[1]"
          style={{ opacity: bgOpacity }}
        >
          <div 
            className={`
              absolute inset-0 transition-colors duration-1000
              ${currentPhase === 'staking' 
                ? 'bg-gradient-to-b from-cyber/10 via-transparent to-transparent'
                : 'bg-gradient-to-b from-chlorophyll/10 via-transparent to-transparent'
              }
            `}
          />
        </motion.div>
        
        {/* Section 1: Hero */}
        <section 
          id="hero"
          className="section-sticky"
          style={{ height: '120vh' }}
        >
          <HeroOverlay />
        </section>
        
        {/* Section 2: Lifecycle Journey (Horizontal scroll trigger) */}
        <section 
          id="lifecycle"
          className="relative"
          style={{ minHeight: '200vh' }}
        >
          <LifecycleScroll />
        </section>
        
        {/* Section 3: Impact Data */}
        <section 
          id="impact"
          className="section-marker"
        >
          <ImpactData />
        </section>
        
        {/* Section 4: Call to Action */}
        <section 
          id="cta"
          className="section-marker pb-32"
        >
          <CTASection />
        </section>
      </div>
      
      {/* Phase indicator (debug/dev only - can be removed) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 left-4 z-50 glass-panel px-4 py-2 text-xs font-mono">
          <div className="text-holographic-dim">Phase: {currentPhase}</div>
          <div className="text-chlorophyll">Progress: {(progress * 100).toFixed(1)}%</div>
        </div>
      )}
    </>
  );
}

// CTA Section Component
function CTASection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'center center'],
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, 0]);
  
  return (
    <motion.div
      ref={containerRef}
      className="w-full max-w-4xl mx-auto px-6 text-center"
      style={{ opacity, y }}
    >
      <h2 className="text-display-lg text-gradient-chlorophyll mb-6">
        Join the Cycle
      </h2>
      
      <p className="text-holographic-muted text-lg md:text-xl mb-12 max-w-2xl mx-auto">
        Every product returned. Every material reused. Every action rewarded.
        The future of ownership is circular.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <motion.button
          className="glass-button px-8 py-4 rounded-full text-chlorophyll font-medium magnetic-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          Launch App
        </motion.button>
        
        <motion.button
          className="glass-button px-8 py-4 rounded-full text-holographic font-medium magnetic-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          Read Whitepaper
        </motion.button>
      </div>
      
      {/* Trust indicators */}
      <div className="mt-20 pt-12 border-t border-glass-border">
        <p className="text-holographic-dim text-sm mb-6">Trusted by forward-thinking brands</p>
        <div className="flex justify-center items-center gap-12 opacity-50">
          {/* Placeholder brand logos */}
          {['BRAND', 'BRAND', 'BRAND', 'BRAND'].map((brand, i) => (
            <div key={i} className="text-holographic-muted font-mono text-sm">
              {brand}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
