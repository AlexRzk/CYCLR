'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { PHASE_CONTENT, ANIMATION_CONFIG } from '@/lib/constants';

// Phase card component
function PhaseCard({ 
  phase, 
  index,
  progress 
}: { 
  phase: keyof typeof PHASE_CONTENT;
  index: number;
  progress: number;
}) {
  const content = PHASE_CONTENT[phase];
  const isActive = progress >= index * 0.33 && progress < (index + 1) * 0.33;
  
  return (
    <motion.div
      className={`
        flex-shrink-0 w-[80vw] md:w-[60vw] lg:w-[40vw] h-[60vh]
        glass-panel-lg p-8 md:p-12 flex flex-col justify-between
        transition-all duration-500
        ${isActive ? 'glow-chlorophyll' : ''}
      `}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-20%' }}
      transition={{ duration: 0.6, ease: ANIMATION_CONFIG.easing.smooth }}
    >
      {/* Phase indicator */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-xs font-mono text-holographic-dim uppercase tracking-widest">
            Phase {index + 1}
          </span>
          <div className={`w-8 h-[1px] ${isActive ? 'bg-chlorophyll' : 'bg-glass-border'}`} />
        </div>
        
        {/* Status dot */}
        <div className={`
          w-3 h-3 rounded-full transition-colors duration-300
          ${isActive ? 'bg-chlorophyll animate-glow-pulse' : 'bg-glass-border'}
        `} />
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center">
        <h3 className={`
          text-display-md mb-2 transition-colors duration-300
          ${isActive ? 'text-gradient-chlorophyll' : 'text-holographic'}
        `}>
          {content.title}
        </h3>
        
        <p className="text-lg text-holographic-muted mb-2">
          {content.subtitle}
        </p>
        
        <p className="text-holographic-dim max-w-md">
          {content.description}
        </p>
      </div>
      
      {/* Stats (if available) */}
      {'stats' in content && (
        <div className="pt-6 border-t border-glass-border">
          <p className="text-xs text-holographic-dim font-mono uppercase tracking-wider mb-2">
            {content.stats.label}
          </p>
          <p className={`
            text-3xl font-bold transition-colors duration-300
            ${isActive ? 'text-chlorophyll text-glow-chlorophyll' : 'text-holographic'}
          `}>
            {content.stats.value}
          </p>
        </div>
      )}
    </motion.div>
  );
}

export default function LifecycleScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress through this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });
  
  // Smooth the progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  
  // Transform vertical scroll to horizontal movement
  const x = useTransform(smoothProgress, [0, 1], ['5%', '-75%']);
  
  const phases: (keyof typeof PHASE_CONTENT)[] = ['production', 'staking', 'recycling'];
  
  return (
    <div 
      ref={containerRef}
      className="relative"
      style={{ height: '200vh' }} // Extra height for scroll distance
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        {/* Section header */}
        <div className="absolute top-8 left-8 z-20">
          <motion.div
            className="glass-panel px-4 py-2 rounded-lg"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs font-mono text-holographic-dim uppercase tracking-widest">
              The Lifecycle Journey
            </p>
          </motion.div>
        </div>
        
        {/* Progress indicator */}
        <div className="absolute top-8 right-8 z-20 flex items-center gap-4">
          {phases.map((_, i) => (
            <motion.div
              key={i}
              className="w-8 h-1 rounded-full transition-colors duration-300"
              style={{
                backgroundColor: i <= Math.floor(smoothProgress.get() * 3) 
                  ? '#00FF94' 
                  : 'rgba(255,255,255,0.1)',
              }}
            />
          ))}
        </div>
        
        {/* Horizontal scroll container */}
        <motion.div
          ref={scrollContainerRef}
          className="flex items-center gap-8 px-8"
          style={{ x }}
        >
          {/* Intro spacer */}
          <div className="flex-shrink-0 w-[20vw]" />
          
          {/* Phase cards */}
          {phases.map((phase, i) => (
            <PhaseCard
              key={phase}
              phase={phase}
              index={i}
              progress={smoothProgress.get()}
            />
          ))}
          
          {/* End spacer */}
          <div className="flex-shrink-0 w-[20vw]" />
        </motion.div>
        
        {/* Connection lines */}
        <svg 
          className="absolute inset-0 pointer-events-none z-0"
          width="100%"
          height="100%"
        >
          <motion.line
            x1="10%"
            y1="50%"
            x2="90%"
            y2="50%"
            stroke="rgba(0, 255, 148, 0.1)"
            strokeWidth="1"
            strokeDasharray="4 4"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 2 }}
          />
        </svg>
      </div>
    </div>
  );
}
