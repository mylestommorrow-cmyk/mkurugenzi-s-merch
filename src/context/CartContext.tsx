import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, CurrencyCode, OrderConfirmation, CustomerDetails } from '../types';
import { CURRENCIES, PRODUCTS } from '../data/products';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  
  // Currency
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  formatPrice: (usdAmount: number) => string;

  // Promo code
  promoCode: string;
  setPromoCode: (code: string) => void;
  promoDiscountPercent: number;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  discountAmount: number;
  shippingFee: number;
  freeShippingThreshold: number;
  freeShippingRemaining: number;
  total: number;

  // Wishlist
  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  // Selected product modal
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;

  // Size guide modal
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;
  sizeGuideCategory: 'shirts' | 'coats' | 'hats';
  openSizeGuide: (category: 'shirts' | 'coats' | 'hats') => void;

  // Checkout & Orders
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  lastOrder: OrderConfirmation | null;
  completeOrder: (customer: CustomerDetails) => OrderConfirmation;
  
  // Notification banner / toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('atelier_nord_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('atelier_nord_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    try {
      const saved = localStorage.getItem('atelier_nord_currency');
      return (saved as CurrencyCode) || 'USD';
    } catch {
      return 'USD';
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [sizeGuideCategory, setSizeGuideCategory] = useState<'shirts' | 'coats' | 'hats'>('shirts');
  
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscountPercent, setPromoDiscountPercent] = useState(0);
  const [lastOrder, setLastOrder] = useState<OrderConfirmation | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('atelier_nord_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('atelier_nord_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  const setCurrency = (c: CurrencyCode) => {
    setCurrencyState(c);
    try {
      localStorage.setItem('atelier_nord_currency', c);
    } catch (e) {
      console.error(e);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2800);
  };

  const formatPrice = (usdAmount: number): string => {
    const config = CURRENCIES[currency] || CURRENCIES.USD;
    const converted = usdAmount * config.rate;
    if (currency === 'JPY') {
      return `${config.symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${config.symbol}${converted.toFixed(2)}`;
  };

  const addToCart = (product: Product, size: string, color: string, quantity = 1) => {
    const cartItemId = `${product.id}-${size}-${color}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          productId: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          image: product.image,
          size,
          color,
          quantity
        }
      ];
    });
    showToast(`Added ${product.name} (${size}) to your bag`);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const updated = exists ? prev.filter((id) => id !== productId) : [...prev, productId];
      showToast(exists ? 'Removed from saved pieces' : 'Added to saved pieces');
      return updated;
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const openSizeGuide = (cat: 'shirts' | 'coats' | 'hats') => {
    setSizeGuideCategory(cat);
    setIsSizeGuideOpen(true);
  };

  const applyPromoCode = (code: string) => {
    const cleaned = code.trim().toUpperCase();
    if (cleaned === 'ARCHIVE10') {
      setPromoDiscountPercent(10);
      setPromoCode('ARCHIVE10');
      showToast('10% archive patron discount applied');
      return { success: true, message: '10% discount applied to your order!' };
    } else if (cleaned === 'NORD20') {
      setPromoDiscountPercent(20);
      setPromoCode('NORD20');
      showToast('20% seasonal collector discount applied');
      return { success: true, message: '20% seasonal discount applied!' };
    }
    return { success: false, message: 'Invalid promo code. Try ARCHIVE10' };
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
  const freeShippingThreshold = 150;
  const freeShippingRemaining = Math.max(0, freeShippingThreshold - subtotal);
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 15;
  const discountAmount = (subtotal * promoDiscountPercent) / 100;
  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  const completeOrder = (customer: CustomerDetails): OrderConfirmation => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const orderId = `ATN-${randomNum}`;
    const date = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    
    // 3 business days later
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + (customer.shippingMethod === 'express' ? 2 : 4));
    const estimatedDelivery = deliveryDate.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });

    const confirmation: OrderConfirmation = {
      orderId,
      orderDate: date,
      items: [...cart],
      subtotal,
      discount: discountAmount,
      shipping: customer.shippingMethod === 'express' ? shippingFee + 20 : shippingFee,
      total: total + (customer.shippingMethod === 'express' ? 20 : 0),
      currency,
      customer,
      estimatedDelivery
    };

    setLastOrder(confirmation);
    clearCart();
    return confirmation;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        isCartOpen,
        setIsCartOpen,
        currency,
        setCurrency,
        formatPrice,
        promoCode,
        setPromoCode,
        promoDiscountPercent,
        applyPromoCode,
        discountAmount,
        shippingFee,
        freeShippingThreshold,
        freeShippingRemaining,
        total,
        wishlist,
        toggleWishlist,
        isWishlisted,
        selectedProduct,
        setSelectedProduct,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        sizeGuideCategory,
        openSizeGuide,
        isCheckoutOpen,
        setIsCheckoutOpen,
        lastOrder,
        completeOrder,
        toastMessage,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
