import type { Product } from '@/types';

// Mock products for demo
export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'EcoTech Laptop Pro',
    image: '/products/laptop.jpg',
    purchaseDate: '2024-01-15',
    expiryDate: '2027-01-15',
    stakedAmount: 150,
    status: 'active',
    category: 'Electronics',
    manufacturer: 'EcoTech Industries',
    recycleReward: 45,
  },
  {
    id: '2',
    name: 'Sustainable Phone X',
    image: '/products/phone.jpg',
    purchaseDate: '2024-03-20',
    expiryDate: '2026-03-20',
    stakedAmount: 80,
    status: 'active',
    category: 'Electronics',
    manufacturer: 'GreenMobile Corp',
    recycleReward: 25,
  },
  {
    id: '3',
    name: 'BioCycle Sneakers',
    image: '/products/sneakers.jpg',
    purchaseDate: '2023-08-10',
    expiryDate: '2024-08-10',
    stakedAmount: 35,
    status: 'recycled',
    category: 'Footwear',
    manufacturer: 'CircularStep',
    recycleReward: 12,
  },
  {
    id: '4',
    name: 'Modular Desk System',
    image: '/products/desk.jpg',
    purchaseDate: '2024-02-01',
    expiryDate: '2034-02-01',
    stakedAmount: 200,
    status: 'active',
    category: 'Furniture',
    manufacturer: 'LoopFurniture',
    recycleReward: 60,
  },
];

// Navigation items
export const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Impact', href: '/#impact' },
];

// Phase descriptions for scrollytelling
export const PHASE_CONTENT = {
  hero: {
    title: 'CYCLR',
    subtitle: 'The Circular Economy Protocol',
    description: 'Transform every purchase into an investment. Your products hold value until they return to the cycle.',
    cta: 'Enter the Cycle',
  },
  production: {
    title: 'Birth',
    subtitle: 'Factory → You',
    description: 'Every product begins its journey embedded with staked value. Manufacturers commit to the circular promise.',
    stats: {
      label: 'Products in Cycle',
      value: '2.4M+',
    },
  },
  staking: {
    title: 'Growth',
    subtitle: 'Your Wallet',
    description: 'While you use, your stake grows. Time becomes value. Ownership becomes investment.',
    stats: {
      label: 'Total Value Locked',
      value: '$48.2M',
    },
  },
  recycling: {
    title: 'Return',
    subtitle: 'Recycling Plant',
    description: 'Close the loop. Return your product, claim your rewards. The cycle continues.',
    stats: {
      label: 'Rewards Distributed',
      value: '$12.8M',
    },
  },
};

// Animation durations
export const ANIMATION_CONFIG = {
  fast: 0.2,
  medium: 0.4,
  slow: 0.6,
  verySlow: 1.2,
  easing: {
    smooth: [0.16, 1, 0.3, 1] as const,
    bounce: [0.68, -0.6, 0.32, 1.6] as const,
    sharp: [0.4, 0, 0.2, 1] as const,
  },
};

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};
