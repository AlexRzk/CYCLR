'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useAnimationStore, useUIStore, useWalletStore } from '@/lib/store';
import { NAV_ITEMS, ANIMATION_CONFIG } from '@/lib/constants';

export default function StickyNav() {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const isMenuOpen = useUIStore((state) => state.isMenuOpen);
  const toggleMenu = useUIStore((state) => state.toggleMenu);
  const isConnected = useWalletStore((state) => state.isConnected);
  const address = useWalletStore((state) => state.address);
  const currentPhase = useAnimationStore((state) => state.currentPhase);
  
  // Track scroll for nav background
  const { scrollY } = useScroll();
  
  useEffect(() => {
    return scrollY.on('change', (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);
  
  // Format wallet address
  const formatAddress = (addr: string | null) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };
  
  return (
    <>
      {/* Main navigation */}
      <motion.nav
        ref={navRef}
        className={`
          fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-500
          ${isScrolled ? 'bg-void/80 backdrop-blur-xl' : 'bg-transparent'}
        `}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5, ease: ANIMATION_CONFIG.easing.smooth }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-full glass-panel flex items-center justify-center glow-sm group-hover:glow transition-shadow duration-300">
              <span className="text-chlorophyll font-bold text-lg">C</span>
              {/* Animated ring */}
              <motion.div
                className="absolute inset-0 rounded-full border border-chlorophyll/30"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <span className="text-holographic font-medium hidden sm:block">CYCLR</span>
          </Link>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm text-holographic-muted hover:text-holographic transition-colors duration-200 link-underline"
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          {/* Right side: Connect button + Menu */}
          <div className="flex items-center gap-4">
            {/* Phase indicator (subtle) */}
            <div className="hidden lg:flex items-center gap-2 text-xs font-mono">
              <span className={`
                w-2 h-2 rounded-full transition-colors duration-300
                ${currentPhase === 'staking' ? 'bg-cyber' : 'bg-chlorophyll'}
              `} />
              <span className="text-holographic-dim uppercase">{currentPhase}</span>
            </div>
            
            {/* Connect/Wallet button */}
            <motion.button
              className="glass-button px-5 py-2.5 rounded-full text-sm font-medium magnetic-button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isConnected ? (
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-chlorophyll" />
                  <span className="text-holographic">{formatAddress(address)}</span>
                </span>
              ) : (
                <span className="text-chlorophyll">Connect</span>
              )}
            </motion.button>
            
            {/* Mobile menu button */}
            <button
              className="md:hidden glass-button p-2.5 rounded-lg"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <motion.span
                  className="w-full h-0.5 bg-holographic origin-left"
                  animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? -1 : 0 }}
                />
                <motion.span
                  className="w-full h-0.5 bg-holographic"
                  animate={{ opacity: isMenuOpen ? 0 : 1, x: isMenuOpen ? 10 : 0 }}
                />
                <motion.span
                  className="w-full h-0.5 bg-holographic origin-left"
                  animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? 1 : 0 }}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>
      
      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-void/90 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
            />
            
            {/* Menu content */}
            <motion.div
              className="absolute inset-x-4 top-24 glass-panel-lg p-8"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: ANIMATION_CONFIG.easing.smooth }}
            >
              <nav className="flex flex-col gap-6">
                {NAV_ITEMS.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="text-2xl text-holographic hover:text-chlorophyll transition-colors"
                      onClick={toggleMenu}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              
              {/* Mobile connect button */}
              <motion.button
                className="w-full mt-8 glass-button px-6 py-4 rounded-xl text-chlorophyll font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {isConnected ? `Connected: ${formatAddress(address)}` : 'Connect Wallet'}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
