'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useWalletStore } from '@/lib/store';
import { MOCK_PRODUCTS, ANIMATION_CONFIG } from '@/lib/constants';
import { useEffect } from 'react';

// Product card component
function ProductCard({ product, index }: { product: typeof MOCK_PRODUCTS[0]; index: number }) {
  const statusColors = {
    active: 'text-chlorophyll bg-chlorophyll/10 border-chlorophyll/20',
    recycled: 'text-cyber bg-cyber/10 border-cyber/20',
    expired: 'text-holographic-dim bg-holographic-dim/10 border-holographic-dim/20',
  };
  
  return (
    <motion.div
      className="glass-panel p-6 hud-border"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: index * 0.1, 
        duration: 0.4,
        ease: ANIMATION_CONFIG.easing.smooth,
      }}
    >
      {/* Product image placeholder */}
      <div className="w-full h-40 rounded-lg bg-void-elevated mb-4 flex items-center justify-center">
        <span className="text-4xl">📦</span>
      </div>
      
      {/* Product info */}
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="font-medium text-holographic">{product.name}</h3>
          <span className={`
            text-xs px-2 py-1 rounded-full border
            ${statusColors[product.status]}
          `}>
            {product.status}
          </span>
        </div>
        
        <p className="text-sm text-holographic-dim">{product.category}</p>
        
        <div className="pt-3 border-t border-glass-border">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-holographic-dim">Staked</p>
              <p className="text-lg font-bold text-chlorophyll">${product.stakedAmount}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-holographic-dim">Reward</p>
              <p className="text-lg font-bold text-cyber">${product.recycleReward}</p>
            </div>
          </div>
        </div>
        
        {product.status === 'active' && (
          <motion.button
            className="w-full glass-button py-3 rounded-lg text-chlorophyll text-sm font-medium mt-4"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Recycle Now
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}

// Stats card component
function StatsCard({ label, value, suffix, color }: {
  label: string;
  value: string | number;
  suffix?: string;
  color?: 'chlorophyll' | 'cyber';
}) {
  return (
    <div className="glass-panel p-6">
      <p className="text-xs font-mono text-holographic-dim uppercase tracking-wider mb-2">
        {label}
      </p>
      <p className={`text-3xl font-bold ${color === 'cyber' ? 'text-cyber' : 'text-chlorophyll'}`}>
        {value}{suffix}
      </p>
    </div>
  );
}

export default function DashboardPage() {
  const { 
    isConnected, 
    address, 
    balance, 
    totalStaked, 
    totalRewards,
    products,
    setProducts,
    connect,
  } = useWalletStore();
  
  // Load mock products on mount
  useEffect(() => {
    if (products.length === 0) {
      setProducts(MOCK_PRODUCTS);
    }
  }, [products.length, setProducts]);
  
  // Demo: Auto-connect for showcase
  useEffect(() => {
    if (!isConnected) {
      connect('0x1234...5678');
    }
  }, [isConnected, connect]);
  
  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="border-b border-glass-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full glass-panel flex items-center justify-center">
              <span className="text-chlorophyll font-bold">C</span>
            </div>
            <span className="font-medium">CYCLR</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link 
              href="/"
              className="text-sm text-holographic-muted hover:text-holographic transition-colors"
            >
              ← Back to Home
            </Link>
            
            {isConnected && (
              <div className="glass-panel px-4 py-2 rounded-full flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-chlorophyll" />
                <span className="text-sm font-mono">{address?.slice(0, 10)}...</span>
              </div>
            )}
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome section */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-display-sm mb-2">
            Welcome back, <span className="text-gradient-chlorophyll">Recycler</span>
          </h1>
          <p className="text-holographic-muted">
            Track your products, manage stakes, and claim rewards.
          </p>
        </motion.div>
        
        {/* Stats overview */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <StatsCard 
            label="Wallet Balance" 
            value={`$${balance.toLocaleString()}`} 
          />
          <StatsCard 
            label="Total Staked" 
            value={`$${totalStaked.toLocaleString()}`}
            color="chlorophyll"
          />
          <StatsCard 
            label="Rewards Earned" 
            value={`$${totalRewards.toLocaleString()}`}
            color="cyber"
          />
        </motion.div>
        
        {/* Products section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-medium">Your Products</h2>
            <motion.button
              className="glass-button px-4 py-2 rounded-lg text-sm text-chlorophyll"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              + Add Product
            </motion.button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </motion.div>
        
        {/* Quick actions */}
        <motion.div
          className="mt-12 glass-panel-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-lg font-medium mb-6">Quick Actions</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.button
              className="glass-button p-6 rounded-xl text-left"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-2xl mb-3 block">♻️</span>
              <span className="font-medium block mb-1">Batch Recycle</span>
              <span className="text-sm text-holographic-dim">Recycle multiple products at once</span>
            </motion.button>
            
            <motion.button
              className="glass-button p-6 rounded-xl text-left"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-2xl mb-3 block">📊</span>
              <span className="font-medium block mb-1">View Analytics</span>
              <span className="text-sm text-holographic-dim">Track your impact over time</span>
            </motion.button>
            
            <motion.button
              className="glass-button p-6 rounded-xl text-left"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-2xl mb-3 block">🎁</span>
              <span className="font-medium block mb-1">Claim Rewards</span>
              <span className="text-sm text-holographic-dim">Withdraw your earned tokens</span>
            </motion.button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
