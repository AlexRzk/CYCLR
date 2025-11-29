'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ANIMATION_CONFIG } from '@/lib/constants';

// Animated counter component
function AnimatedCounter({ 
  value, 
  suffix = '', 
  prefix = '' 
}: { 
  value: string;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20%' });
  
  return (
    <span ref={ref} className="inline-block">
      {isInView ? (
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: ANIMATION_CONFIG.easing.smooth }}
        >
          {prefix}{value}{suffix}
        </motion.span>
      ) : (
        <span className="opacity-0">{prefix}{value}{suffix}</span>
      )}
    </span>
  );
}

// Stat card component
function StatCard({ 
  label, 
  value, 
  suffix = '',
  prefix = '',
  description,
  delay = 0,
  color = 'chlorophyll'
}: {
  label: string;
  value: string;
  suffix?: string;
  prefix?: string;
  description: string;
  delay?: number;
  color?: 'chlorophyll' | 'cyber';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  
  return (
    <motion.div
      ref={ref}
      className="glass-panel p-6 md:p-8 hud-border"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.6, 
        delay, 
        ease: ANIMATION_CONFIG.easing.smooth 
      }}
    >
      <p className="text-xs font-mono text-holographic-dim uppercase tracking-widest mb-4">
        {label}
      </p>
      
      <p className={`
        text-4xl md:text-5xl font-bold mb-3
        ${color === 'chlorophyll' ? 'text-chlorophyll text-glow-chlorophyll' : 'text-cyber text-glow-cyber'}
      `}>
        <AnimatedCounter value={value} suffix={suffix} prefix={prefix} />
      </p>
      
      <p className="text-sm text-holographic-muted">
        {description}
      </p>
    </motion.div>
  );
}

export default function ImpactData() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);
  
  const stats = [
    {
      label: 'Products in Circulation',
      value: '2.4',
      suffix: 'M+',
      description: 'Active products participating in the circular economy',
      color: 'chlorophyll' as const,
    },
    {
      label: 'Total Value Locked',
      value: '48.2',
      suffix: 'M',
      prefix: '$',
      description: 'Staked value securing the ecosystem',
      color: 'cyber' as const,
    },
    {
      label: 'Rewards Distributed',
      value: '12.8',
      suffix: 'M',
      prefix: '$',
      description: 'Paid out to recyclers and participants',
      color: 'chlorophyll' as const,
    },
    {
      label: 'Materials Recycled',
      value: '847',
      suffix: 'K',
      description: 'Tons of materials returned to production',
      color: 'cyber' as const,
    },
  ];
  
  return (
    <motion.div
      ref={containerRef}
      className="w-full max-w-7xl mx-auto px-6 py-32"
      style={{ opacity, y }}
    >
      {/* Section header */}
      <div className="text-center mb-20">
        <motion.p
          className="text-sm font-mono text-chlorophyll uppercase tracking-widest mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Real Impact
        </motion.p>
        
        <motion.h2
          className="text-display-md text-holographic mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          The Numbers Don&apos;t Lie
        </motion.h2>
        
        <motion.p
          className="text-lg text-holographic-muted max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Every metric represents a step toward a more sustainable future.
          Track our collective impact in real-time.
        </motion.p>
      </div>
      
      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <StatCard
            key={stat.label}
            {...stat}
            delay={i * 0.1}
          />
        ))}
      </div>
      
      {/* Visual accent */}
      <motion.div
        className="mt-20 flex justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="relative w-full max-w-3xl h-[2px]">
          {/* Gradient line */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-chlorophyll to-transparent opacity-50" />
          
          {/* Animated pulse */}
          <motion.div
            className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-transparent via-chlorophyll to-transparent"
            animate={{ 
              left: ['0%', '100%', '0%'],
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </div>
      </motion.div>
      
      {/* Environmental impact callout */}
      <motion.div
        className="mt-20 glass-panel-lg p-8 md:p-12 text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-xs font-mono text-chlorophyll uppercase tracking-widest mb-4">
          Environmental Impact
        </p>
        
        <h3 className="text-display-sm text-holographic mb-4">
          <span className="text-gradient-chlorophyll">324,000</span> tons of CO₂
        </h3>
        
        <p className="text-holographic-muted max-w-xl mx-auto">
          Equivalent emissions prevented through our circular economy protocol.
          That&apos;s like taking 70,000 cars off the road for a year.
        </p>
        
        {/* Visual trees/nature indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-1 rounded-full bg-chlorophyll"
              initial={{ height: 0, opacity: 0 }}
              whileInView={{ 
                height: 20 + Math.random() * 30, 
                opacity: 0.3 + Math.random() * 0.7 
              }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: i * 0.05,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
