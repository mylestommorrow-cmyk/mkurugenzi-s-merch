/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { LookbookModal } from './components/LookbookModal';
import { Footer } from './components/Footer';
import { PRODUCTS } from './data/products';
import { ProductCategory, Product } from './types';
import { Check } from 'lucide-react';

function Storefront() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLookbookOpen, setIsLookbookOpen] = useState(false);
  const { selectedProduct, setSelectedProduct, toastMessage } = useCart();

  const handleSelectCategory = (cat: ProductCategory) => {
    setActiveCategory(cat);
    const catalogElement = document.getElementById('catalog');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenWishlist = () => {
    const catalogElement = document.getElementById('catalog');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900 selection:bg-neutral-950 selection:text-white">
      {/* 1-Row 3-Zone Top Navigation Contract (§2) */}
      <Navbar
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        onOpenWishlist={handleOpenWishlist}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Campaign Hero Section with 2-Column Desktop Split (§1.C) */}
      <Hero
        onSelectCategory={handleSelectCategory}
        onOpenLookbook={() => setIsLookbookOpen(true)}
      />

      {/* Product Catalog Anchor & Responsive Grid (§2.A) */}
      <div id="catalog" className="scroll-mt-18">
        <ProductCatalog
          products={PRODUCTS}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          onOpenDetails={(product: Product) => setSelectedProduct(product)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>

      {/* Editorial Footer (§1.B) */}
      <Footer onSelectCategory={handleSelectCategory} />

      {/* Contiguous Product Detail Modal (§2.A) */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Cart Slide-Over Drawer with Free Shipping Meter & Discounts */}
      <CartDrawer />

      {/* Direct Checkout Modal with Order Confirmation Receipt */}
      <CheckoutModal />

      {/* Sizing & Garment Dimension Guide */}
      <SizeGuideModal />

      {/* Curated Lookbook Ensembles */}
      <LookbookModal
        isOpen={isLookbookOpen}
        onClose={() => setIsLookbookOpen(false)}
        onSelectProduct={(prod) => setSelectedProduct(prod)}
      />

      {/* Floating Feedback Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-950 text-white text-xs px-4 py-3 rounded-lg shadow-2xl flex items-center gap-2.5 border border-neutral-800 animate-in slide-in-from-bottom-2 duration-200">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Storefront />
    </CartProvider>
  );
}
