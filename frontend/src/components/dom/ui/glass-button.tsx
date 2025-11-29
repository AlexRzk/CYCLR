'use client';

import { forwardRef, ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface GlassButtonProps extends Omit<HTMLMotionProps<'button'>, 'ref'> {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
}

const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ children, variant = 'default', size = 'md', glow = false, className = '', ...props }, ref) => {
    const variants = {
      default: 'glass-button text-holographic hover:text-chlorophyll',
      primary: 'glass-button text-chlorophyll glow-chlorophyll',
      ghost: 'bg-transparent text-holographic hover:bg-glass-light',
    };
    
    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };
    
    return (
      <motion.button
        ref={ref}
        className={`
          ${variants[variant]}
          ${sizes[size]}
          ${glow ? 'hud-border' : ''}
          rounded-full font-medium transition-all duration-300
          ${className}
        `}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

GlassButton.displayName = 'GlassButton';

export default GlassButton;
