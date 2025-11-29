'use client';

import { ReactNode, forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface GlassCardProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  children: ReactNode;
  variant?: 'default' | 'lg' | 'hud';
  hover?: boolean;
  glow?: 'chlorophyll' | 'cyber' | 'none';
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, variant = 'default', hover = false, glow = 'none', className = '', ...props }, ref) => {
    const variants = {
      default: 'glass-panel',
      lg: 'glass-panel-lg',
      hud: 'glass-panel hud-border',
    };
    
    const glowStyles = {
      chlorophyll: 'glow-chlorophyll',
      cyber: 'glow-cyber',
      none: '',
    };
    
    return (
      <motion.div
        ref={ref}
        className={`
          ${variants[variant]}
          ${glowStyles[glow]}
          ${className}
        `}
        whileHover={hover ? { scale: 1.02, y: -2 } : undefined}
        transition={{ duration: 0.2 }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

GlassCard.displayName = 'GlassCard';

export default GlassCard;
