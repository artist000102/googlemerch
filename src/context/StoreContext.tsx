import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { 
  Product, 
  CartItem, 
  ProductCategory, 
  ProductSize, 
  ProductColor, 
  PromoCode, 
  CurrencyConfig, 
  ShippingOption, 
  OrderConfirmation 
} from '../types/store';
import { PRODUCTS, CURRENCIES, PROMO_CODES, SHIPPING_OPTIONS } from '../data/products';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'info' | 'warning' | 'error';
  actionLabel?: string;
  onAction?: () => void;
}

export type ViewState = 
  | 'home' 
  | 'shop' 
  | 'pdp' 
  | 'cart' 
  | 'checkout' 
  | 'wishlist' 
  | 'order-confirmation'
  | 'tracking'
  | 'sustainability'
  | 'faq'
  | 'returns';

interface StoreContextType {
  // Products & Views
  products: Product[];
  currentView: ViewState;
  selectedProduct: Product | null;
  selectedCategory: ProductCategory;
  selectedSubcategory: string | null;
  searchQuery: string;
  
  // Navigation & Actions
  navigateTo: (view: ViewState, product?: Product | null, category?: ProductCategory, subcategory?: string | null) => void;
  selectProduct: (product: Product) => void;
  setCategory: (category: ProductCategory, subcategory?: string | null) => void;
  setSearchQuery: (query: string) => void;
  
  // Cart
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, size: ProductSize, color?: ProductColor, quantity?: number) => void;
  addBulkToCart: (product: Product, items: { size: ProductSize; quantity: number }[], color?: ProductColor) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQuantity: number) => void;
  clearCart: () => void;
  appliedPromo: PromoCode | null;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  
  // Cart Calculations
  cartTotalQuantity: number;
  cartSubtotal: number;
  cartDiscount: number;
  cartShippingPrice: number;
  cartTax: number;
  cartGrandTotal: number;
  freeShippingThreshold: number;
  freeShippingRemaining: number;
  
  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  
  // Recently Viewed
  recentlyViewed: Product[];
  
  // Modals & Drawers
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;
  isOrderTrackingOpen: boolean;
  setIsOrderTrackingOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  
  // Currency & Region
  activeCurrency: CurrencyConfig;
  setCurrency: (code: string) => void;
  formatPrice: (amountInUSD: number) => string;
  
  // Shipping & Orders
  selectedShippingOption: ShippingOption;
  setSelectedShippingOption: (option: ShippingOption) => void;
  lastOrder: OrderConfirmation | null;
  setLastOrder: (order: OrderConfirmation | null) => void;
  
  // Notifications
  toasts: ToastMessage[];
  showToast: (toast: Omit<ToastMessage, 'id'>) => void;
  dismissToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 100.00;

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Local storage hydrated states
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ggl_store_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ggl_store_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ggl_store_recent');
      return saved ? JSON.parse(saved) : ['nano-banana-sweatshirt', 'google-1998-vintage-colorblock-windbreaker'];
    } catch {
      return [];
    }
  });

  // App navigation state
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(PRODUCTS[0]);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Drawers & Modals
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState<boolean>(false);
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState<boolean>(false);

  // Currency & Promo
  const [activeCurrency, setActiveCurrency] = useState<CurrencyConfig>(() => {
    try {
      const saved = localStorage.getItem('ggl_store_currency');
      if (saved && CURRENCIES[saved]) {
        return CURRENCIES[saved];
      }
    } catch {
      // fallback to USD
    }
    return CURRENCIES.USD;
  });
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [selectedShippingOption, setSelectedShippingOption] = useState<ShippingOption>(SHIPPING_OPTIONS[0]);
  const [lastOrder, setLastOrder] = useState<OrderConfirmation | null>(null);

  // Toast Notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync with local storage
  useEffect(() => {
    try {
      localStorage.setItem('ggl_store_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('ggl_store_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('ggl_store_recent', JSON.stringify(recentlyViewedIds));
    } catch {
      // ignore
    }
  }, [recentlyViewedIds]);

  // Toast helper
  const showToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Currency formatter
  const formatPrice = (amountInUSD: number): string => {
    const converted = amountInUSD * activeCurrency.rate;
    if (activeCurrency.code === 'JPY') {
      return `${activeCurrency.symbol}${Math.round(converted).toLocaleString('ja-JP')}`;
    }
    if (activeCurrency.code === 'INR') {
      return `${activeCurrency.symbol}${converted.toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    }
    return `${activeCurrency.symbol}${converted.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const setCurrency = (code: string) => {
    if (CURRENCIES[code]) {
      setActiveCurrency(CURRENCIES[code]);
      try {
        localStorage.setItem('ggl_store_currency', code);
      } catch {
        // ignore
      }
      showToast({
        title: `Currency switched to ${CURRENCIES[code].name}`,
        type: 'info',
      });
    }
  };

  // Navigation handlers
  const navigateTo = (
    view: ViewState, 
    product: Product | null = null, 
    category: ProductCategory = 'All', 
    subcategory: string | null = null
  ) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentView(view);
    if (product) {
      setSelectedProduct(product);
      // Track recently viewed
      setRecentlyViewedIds((prev) => {
        const filtered = prev.filter((id) => id !== product.id);
        return [product.id, ...filtered].slice(0, 8);
      });
    }
    if (category) {
      setSelectedCategory(category);
    }
    setSelectedSubcategory(subcategory);
    setIsCartOpen(false);
    setIsSearchOpen(false);
  };

  const selectProduct = (product: Product) => {
    navigateTo('pdp', product);
  };

  const setCategory = (category: ProductCategory, subcategory: string | null = null) => {
    navigateTo('shop', null, category, subcategory);
  };

  // Cart operations
  const addToCart = (
    product: Product, 
    size: ProductSize, 
    color?: ProductColor, 
    quantity: number = 1
  ) => {
    const selectedColor = color || product.colors[0] || { name: 'Standard', hex: '#202124' };
    const cartItemId = `${product.id}_${size}_${selectedColor.name.toLowerCase().replace(/\s+/g, '-')}`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      } else {
        const newItem: CartItem = {
          id: cartItemId,
          productId: product.id,
          product,
          selectedSize: size,
          selectedColor,
          quantity,
          priceAtAddition: product.price,
        };
        return [newItem, ...prevCart];
      }
    });

    showToast({
      title: `Added to Cart`,
      description: `${quantity}x ${product.title} (${size})`,
      type: 'success',
      actionLabel: 'View Cart',
      onAction: () => setIsCartOpen(true),
    });

    // Auto open side cart drawer for seamless UX
    setIsCartOpen(true);
  };

  const addBulkToCart = (
    product: Product, 
    items: { size: ProductSize; quantity: number }[], 
    color?: ProductColor
  ) => {
    const validItems = items.filter((i) => i.quantity > 0);
    if (validItems.length === 0) return;

    const selectedColor = color || product.colors[0] || { name: 'Standard', hex: '#202124' };
    let totalAdded = 0;

    setCart((prevCart) => {
      let updated = [...prevCart];
      for (const item of validItems) {
        totalAdded += item.quantity;
        const cartItemId = `${product.id}_${item.size}_${selectedColor.name.toLowerCase().replace(/\s+/g, '-')}`;
        const existingIdx = updated.findIndex((ci) => ci.id === cartItemId);
        if (existingIdx > -1) {
          updated[existingIdx] = {
            ...updated[existingIdx],
            quantity: updated[existingIdx].quantity + item.quantity,
          };
        } else {
          updated = [
            {
              id: cartItemId,
              productId: product.id,
              product,
              selectedSize: item.size,
              selectedColor,
              quantity: item.quantity,
              priceAtAddition: product.price,
            },
            ...updated,
          ];
        }
      }
      return updated;
    });

    showToast({
      title: `Added ${totalAdded} items to Cart`,
      description: `${product.title} across multiple sizes`,
      type: 'success',
      actionLabel: 'Checkout',
      onAction: () => navigateTo('checkout'),
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    const item = cart.find((i) => i.id === cartItemId);
    setCart((prev) => prev.filter((i) => i.id !== cartItemId));
    if (item) {
      showToast({
        title: `Removed from Cart`,
        description: item.product.title,
        type: 'info',
      });
    }
  };

  const updateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
  };

  // Promo code engine
  const applyPromoCode = (code: string): { success: boolean; message: string } => {
    const formatted = code.trim().toUpperCase();
    const found = PROMO_CODES.find((p) => p.code === formatted);

    if (!found) {
      return { success: false, message: 'Invalid promo code. Try GOOGLE10 or RETRO1998.' };
    }

    if (found.minSpend && cartSubtotal < found.minSpend) {
      return {
        success: false,
        message: `Promo code ${found.code} requires a minimum order of $${found.minSpend.toFixed(2)}.`,
      };
    }

    setAppliedPromo(found);
    showToast({
      title: `Promo Applied: ${found.code}`,
      description: found.description,
      type: 'success',
    });
    return { success: true, message: `Promo code ${found.code} applied successfully!` };
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    showToast({
      title: 'Promo code removed',
      type: 'info',
    });
  };

  // Wishlist operations
  const toggleWishlist = (productId: string) => {
    const exists = wishlist.includes(productId);
    const prod = PRODUCTS.find((p) => p.id === productId);
    if (exists) {
      setWishlist((prev) => prev.filter((id) => id !== productId));
      showToast({
        title: 'Removed from Wishlist',
        description: prod?.title,
        type: 'info',
      });
    } else {
      setWishlist((prev) => [...prev, productId]);
      showToast({
        title: 'Saved to Wishlist ❤️',
        description: prod?.title,
        type: 'success',
        actionLabel: 'View Wishlist',
        onAction: () => navigateTo('wishlist'),
      });
    }
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Cart Calculations
  const cartTotalQuantity = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.priceAtAddition * item.quantity, 0);
  }, [cart]);

  const cartDiscount = useMemo(() => {
    if (!appliedPromo) return 0;
    if (appliedPromo.discountType === 'percentage') {
      return (cartSubtotal * appliedPromo.value) / 100;
    }
    if (appliedPromo.discountType === 'fixed') {
      return Math.min(appliedPromo.value, cartSubtotal);
    }
    return 0;
  }, [cartSubtotal, appliedPromo]);

  const cartShippingPrice = useMemo(() => {
    if (cart.length === 0) return 0;
    if (appliedPromo?.discountType === 'free_shipping') return 0;
    if (cartSubtotal >= FREE_SHIPPING_THRESHOLD && selectedShippingOption.id === 'standard') {
      return 0;
    }
    return selectedShippingOption.price;
  }, [cart, cartSubtotal, appliedPromo, selectedShippingOption]);

  const cartTax = useMemo(() => {
    const taxableAmount = Math.max(0, cartSubtotal - cartDiscount);
    return taxableAmount * 0.0825; // 8.25% standard sales tax
  }, [cartSubtotal, cartDiscount]);

  const cartGrandTotal = useMemo(() => {
    return Math.max(0, cartSubtotal - cartDiscount + cartShippingPrice + cartTax);
  }, [cartSubtotal, cartDiscount, cartShippingPrice, cartTax]);

  const freeShippingRemaining = useMemo(() => {
    return Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);
  }, [cartSubtotal]);

  const recentlyViewed = useMemo(() => {
    return recentlyViewedIds
      .map((id) => PRODUCTS.find((p) => p.id === id))
      .filter((p): p is Product => !!p);
  }, [recentlyViewedIds]);

  return (
    <StoreContext.Provider
      value={{
        products: PRODUCTS,
        currentView,
        selectedProduct,
        selectedCategory,
        selectedSubcategory,
        searchQuery,
        navigateTo,
        selectProduct,
        setCategory,
        setSearchQuery,
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        addBulkToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        cartTotalQuantity,
        cartSubtotal,
        cartDiscount,
        cartShippingPrice,
        cartTax,
        cartGrandTotal,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        freeShippingRemaining,
        wishlist,
        toggleWishlist,
        isInWishlist,
        recentlyViewed,
        quickViewProduct,
        setQuickViewProduct,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        isOrderTrackingOpen,
        setIsOrderTrackingOpen,
        isSearchOpen,
        setIsSearchOpen,
        activeCurrency,
        setCurrency,
        formatPrice,
        selectedShippingOption,
        setSelectedShippingOption,
        lastOrder,
        setLastOrder,
        toasts,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
