'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { PHASE_CONTENT, ANIMATION_CONFIG } from '@/lib/constants';
import { useMagneticCursor } from '@/components/dom/navigation/cursor';

export default function HeroOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  // Use magnetic cursor on CTA button
  useMagneticCursor(buttonRef);
  
  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  
  // Parallax effects
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const subtitleY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  
  // Smooth spring for all transforms
  const smoothTitleY = useSpring(titleY, { stiffness: 100, damping: 30 });
  const smoothSubtitleY = useSpring(subtitleY, { stiffness: 100, damping: 30 });
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });
  
  const content = PHASE_CONTENT.hero;
  
  return (
    <motion.div
      ref={containerRef}
      className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6"
      style={{ opacity: smoothOpacity, scale: smoothScale }}
    >
      {/* Main title */}
      <motion.div
        className="text-center"
        style={{ y: smoothTitleY }}
      >
        {/* Pre-title badge */}
        <motion.div
          className="inline-flex items-center gap-2 glass-panel px-4 py-2 rounded-full mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: ANIMATION_CONFIG.easing.smooth }}
        >
          <span className="w-2 h-2 rounded-full bg-chlorophyll animate-glow-pulse" />
          <span className="text-sm text-holographic-muted font-mono uppercase tracking-wider">
            Protocol Live
          </span>
        </motion.div>
        
        {/* Main headline */}
        <motion.h1
          className="text-display-xl text-gradient-chlorophyll mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: ANIMATION_CONFIG.easing.smooth }}
        >
          {content.title}
        </motion.h1>
        
        {/* Subtitle */}
        <motion.p
          className="text-display-sm text-holographic-muted mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6, ease: ANIMATION_CONFIG.easing.smooth }}
          style={{ y: smoothSubtitleY }}
        >
          {content.subtitle}
        </motion.p>
        
        {/* Description */}
        <motion.p
          className="text-lg text-holographic-dim max-w-xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {content.description}
        </motion.p>
        
        {/* CTA Button */}
        <motion.button
          ref={buttonRef}
          className="magnetic-button glass-button px-10 py-5 rounded-full text-lg font-medium text-chlorophyll glow-chlorophyll hud-border group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6, ease: ANIMATION_CONFIG.easing.smooth }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="flex items-center gap-3">
            {content.cta}
            <motion.svg 
              className="w-5 h-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            >
              <path 
                fillRule="evenodd" 
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" 
                clipRule="evenodd" 
              />
            </motion.svg>
          </span>
        </motion.button>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-xs text-holographic-dim font-mono uppercase tracking-widest">
            Scroll to explore
          </span>
          <motion.div
            className="w-6 h-10 rounded-full border border-holographic-dim/30 flex justify-center pt-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <motion.div
              className="w-1 h-2 rounded-full bg-chlorophyll"
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            />
          </motion.div>
        </div>
      </motion.div>
      
      {/* Corner decorations */}
      <div className="absolute top-8 left-8 w-20 h-20 border-l border-t border-glass-border opacity-30" />
      <div className="absolute top-8 right-8 w-20 h-20 border-r border-t border-glass-border opacity-30" />
      <div className="absolute bottom-8 left-8 w-20 h-20 border-l border-b border-glass-border opacity-30" />
      <div className="absolute bottom-8 right-8 w-20 h-20 border-r border-b border-glass-border opacity-30" />
    </motion.div>
  );
}
