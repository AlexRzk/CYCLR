import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import type { 
  AnimationState, 
  WalletState, 
  UIState, 
  CanvasState,
  Product 
} from '@/types';

// Animation Store - Controls scrollytelling phases
interface AnimationStore extends AnimationState {
  setPhase: (phase: AnimationState['currentPhase']) => void;
  setScrollProgress: (progress: number) => void;
  setIsInteracting: (isInteracting: boolean) => void;
  reset: () => void;
}

export const useAnimationStore = create<AnimationStore>()(
  subscribeWithSelector((set) => ({
    currentPhase: 'hero',
    scrollProgress: 0,
    isInteracting: false,
    targetPhase: undefined,
    
    setPhase: (phase) => set({ currentPhase: phase }),
    
    setScrollProgress: (progress) => {
      // Determine phase based on scroll progress
      let phase: AnimationState['currentPhase'] = 'hero';
      if (progress >= 0.7) phase = 'recycling';
      else if (progress >= 0.45) phase = 'staking';
      else if (progress >= 0.2) phase = 'production';
      
      set({ scrollProgress: progress, currentPhase: phase });
    },
    
    setIsInteracting: (isInteracting) => set({ isInteracting }),
    
    reset: () => set({
      currentPhase: 'hero',
      scrollProgress: 0,
      isInteracting: false,
    }),
  }))
);

// Wallet Store - Manages user wallet connection and products
interface WalletStore extends WalletState {
  products: Product[];
  connect: (address: string) => void;
  disconnect: () => void;
  updateBalance: (balance: number) => void;
  addProduct: (product: Product) => void;
  updateProductStatus: (id: string, status: Product['status']) => void;
  setProducts: (products: Product[]) => void;
}

export const useWalletStore = create<WalletStore>()(
  subscribeWithSelector((set) => ({
    isConnected: false,
    address: null,
    balance: 0,
    totalStaked: 0,
    totalRewards: 0,
    products: [],
    
    connect: (address) => set({ 
      isConnected: true, 
      address,
      // Mock initial data
      balance: 1500,
      totalStaked: 850,
      totalRewards: 125,
    }),
    
    disconnect: () => set({
      isConnected: false,
      address: null,
      balance: 0,
      totalStaked: 0,
      totalRewards: 0,
      products: [],
    }),
    
    updateBalance: (balance) => set({ balance }),
    
    addProduct: (product) => set((state) => ({
      products: [...state.products, product],
      totalStaked: state.totalStaked + product.stakedAmount,
    })),
    
    updateProductStatus: (id, status) => set((state) => ({
      products: state.products.map((p) => 
        p.id === id ? { ...p, status } : p
      ),
    })),
    
    setProducts: (products) => set({ 
      products,
      totalStaked: products.reduce((acc, p) => acc + p.stakedAmount, 0),
    }),
  }))
);

// UI Store - Navigation, cursor, loading states
interface UIStore extends UIState {
  setMenuOpen: (isOpen: boolean) => void;
  toggleMenu: () => void;
  setCursorHovering: (isHovering: boolean) => void;
  setCursorType: (type: UIState['cursorType']) => void;
  setActiveSection: (section: string | null) => void;
  setLoading: (isLoading: boolean, progress?: number) => void;
}

export const useUIStore = create<UIStore>()(
  subscribeWithSelector((set) => ({
    isMenuOpen: false,
    isCursorHovering: false,
    cursorType: 'default',
    activeSection: null,
    isLoading: true,
    loadingProgress: 0,
    
    setMenuOpen: (isOpen) => set({ isMenuOpen: isOpen }),
    toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
    setCursorHovering: (isHovering) => set({ isCursorHovering: isHovering }),
    setCursorType: (type) => set({ cursorType: type }),
    setActiveSection: (section) => set({ activeSection: section }),
    setLoading: (isLoading, progress = 0) => set({ isLoading, loadingProgress: progress }),
  }))
);

// Canvas Store - 3D scene state
interface CanvasStore extends CanvasState {
  setReady: (isReady: boolean) => void;
  setQuality: (quality: CanvasState['quality']) => void;
  setMousePosition: (x: number, y: number) => void;
  setScrollVelocity: (velocity: number) => void;
}

export const useCanvasStore = create<CanvasStore>()(
  subscribeWithSelector((set) => ({
    isReady: false,
    quality: 'high',
    mousePosition: { x: 0, y: 0 },
    scrollVelocity: 0,
    
    setReady: (isReady) => set({ isReady }),
    setQuality: (quality) => set({ quality }),
    setMousePosition: (x, y) => set({ mousePosition: { x, y } }),
    setScrollVelocity: (velocity) => set({ scrollVelocity: velocity }),
  }))
);

// Combined store selector for complex state derivations
export const useAppState = () => {
  const animation = useAnimationStore();
  const wallet = useWalletStore();
  const ui = useUIStore();
  const canvas = useCanvasStore();
  
  return {
    animation,
    wallet,
    ui,
    canvas,
    // Derived state
    isFullyLoaded: canvas.isReady && !ui.isLoading,
    canInteract: canvas.isReady && !ui.isLoading && !animation.isInteracting,
  };
};
