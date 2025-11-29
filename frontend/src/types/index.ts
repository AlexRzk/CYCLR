// Product lifecycle interface
export interface Product {
  id: string;
  name: string;
  image: string;
  purchaseDate: string;
  expiryDate: string;
  stakedAmount: number;
  status: 'active' | 'recycled' | 'expired';
  category?: string;
  manufacturer?: string;
  recycleReward?: number;
}

// Animation state for scrollytelling experience
export interface AnimationState {
  currentPhase: 'hero' | 'production' | 'staking' | 'recycling';
  scrollProgress: number; // 0 to 1
  isInteracting: boolean;
  targetPhase?: 'hero' | 'production' | 'staking' | 'recycling';
}

// Wallet/User state
export interface WalletState {
  isConnected: boolean;
  address: string | null;
  balance: number;
  totalStaked: number;
  totalRewards: number;
}

// UI State for navigation and interactions
export interface UIState {
  isMenuOpen: boolean;
  isCursorHovering: boolean;
  cursorType: 'default' | 'pointer' | 'grab' | 'grabbing' | 'text';
  activeSection: string | null;
  isLoading: boolean;
  loadingProgress: number;
}

// Canvas/3D Scene state
export interface CanvasState {
  isReady: boolean;
  quality: 'low' | 'medium' | 'high';
  mousePosition: { x: number; y: number };
  scrollVelocity: number;
}

// Phase configuration for scrollytelling
export interface PhaseConfig {
  id: string;
  name: string;
  startProgress: number;
  endProgress: number;
  color: string;
  description: string;
}

// Lifecycle stages
export const LIFECYCLE_PHASES: PhaseConfig[] = [
  {
    id: 'hero',
    name: 'Welcome',
    startProgress: 0,
    endProgress: 0.2,
    color: '#00FF94',
    description: 'Enter the circular economy',
  },
  {
    id: 'production',
    name: 'Production',
    startProgress: 0.2,
    endProgress: 0.45,
    color: '#00FF94',
    description: 'Products are created with embedded value',
  },
  {
    id: 'staking',
    name: 'Staking',
    startProgress: 0.45,
    endProgress: 0.7,
    color: '#2563EB',
    description: 'Your value grows while you use',
  },
  {
    id: 'recycling',
    name: 'Recycling',
    startProgress: 0.7,
    endProgress: 1,
    color: '#00FF94',
    description: 'Return and earn your rewards',
  },
];

// Mouse position hook return type
export interface MousePosition {
  x: number;
  y: number;
  normalizedX: number; // -1 to 1
  normalizedY: number; // -1 to 1
}

// Scroll progress hook return type
export interface ScrollProgress {
  progress: number; // 0 to 1
  velocity: number;
  direction: 'up' | 'down' | 'idle';
  phase: PhaseConfig;
}
