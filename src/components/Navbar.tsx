import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CurrencyCode, ProductCategory } from '../types';

interface NavbarProps {
  activeCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  onOpenWishlist: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeCategory,
  onSelectCategory,
  onOpenWishlist,
  searchQuery,
  setSearchQuery
}) => {
  const { cartCount, setIsCartOpen, wishlist, currency, setCurrency } = useCart();
  const [showBanner, setShowBanner] = useState(true);
  const [isSearchActive, setIsSearchActive] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-neutral-200/80 transition-all">
      {/* Top promotional announcement - slim, dismissible, under 36px */}
      {showBanner && (
        <div className="bg-neutral-900 text-neutral-100 px-4 py-2 text-xs flex items-center justify-between transition-all">
          <div className="mx-auto flex items-center gap-2 text-center truncate">
            <span className="font-medium tracking-wide">COMPLIMENTARY WORLDWIDE COURIER ON ORDERS OVER $150</span>
            <span aria-hidden="true" className="opacity-40">·</span>
            <span className="text-neutral-400 hidden sm:inline">Use code <span className="font-mono text-white underline decoration-neutral-500">ARCHIVE10</span> for 10% off</span>
          </div>
          <button
            onClick={() => setShowBanner(false)}
            aria-label="Dismiss banner"
            className="text-neutral-400 hover:text-white p-0.5 ml-2 shrink-0 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Top Bar Contract: Zone 1 (Wordmark) - Zone 2 (4-5 Nav Links) - Zone 3 (1 Primary Action Cluster) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => {
            onSelectCategory('all');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-left group cursor-pointer shrink-0"
        >
          <span className="font-display text-xl font-bold tracking-tight text-neutral-950 uppercase whitespace-nowrap">
            Atelier Nord
          </span>
          <span className="sr-only">Home</span>
        </button>

        {/* Zone 2: Navigation Links (single line, no wrapping) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600">
          <button
            onClick={() => {
              onSelectCategory('all');
              const el = document.getElementById('catalog');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`cursor-pointer pb-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
              activeCategory === 'all'
                ? 'border-neutral-900 text-neutral-950 font-semibold'
                : 'border-transparent hover:text-neutral-950'
            }`}
          >
            All Pieces
          </button>
          <button
            onClick={() => {
              onSelectCategory('shirts');
              const el = document.getElementById('catalog');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`cursor-pointer pb-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
              activeCategory === 'shirts'
                ? 'border-neutral-900 text-neutral-950 font-semibold'
                : 'border-transparent hover:text-neutral-950'
            }`}
          >
            Shirts
          </button>
          <button
            onClick={() => {
              onSelectCategory('coats');
              const el = document.getElementById('catalog');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`cursor-pointer pb-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
              activeCategory === 'coats'
                ? 'border-neutral-900 text-neutral-950 font-semibold'
                : 'border-transparent hover:text-neutral-950'
            }`}
          >
            Coats
          </button>
          <button
            onClick={() => {
              onSelectCategory('hats');
              const el = document.getElementById('catalog');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`cursor-pointer pb-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
              activeCategory === 'hats'
                ? 'border-neutral-900 text-neutral-950 font-semibold'
                : 'border-transparent hover:text-neutral-950'
            }`}
          >
            Hats
          </button>
          <button
            onClick={() => {
              const el = document.getElementById('lookbook');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="cursor-pointer pb-1 transition-colors whitespace-nowrap shrink-0 border-b-2 border-transparent text-neutral-600 hover:text-neutral-950"
          >
            Lookbook
          </button>
        </nav>

        {/* Zone 3: Primary Action & Utilities */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Quick search input or toggle */}
          {isSearchActive ? (
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search shirts, coats, hats..."
                autoFocus
                className="w-44 sm:w-56 text-xs bg-neutral-100 border border-neutral-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-neutral-900 text-neutral-900"
              />
              <button
                onClick={() => {
                  setSearchQuery('');
                  setIsSearchActive(false);
                }}
                className="absolute right-2 text-neutral-400 hover:text-neutral-700"
                aria-label="Close search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsSearchActive(true)}
              className="p-2 text-neutral-600 hover:text-neutral-950 transition-colors"
              aria-label="Open search"
            >
              <Search className="w-4 h-4" />
            </button>
          )}

          {/* Currency selector */}
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
            className="bg-transparent text-xs font-mono font-medium text-neutral-700 border border-neutral-200 rounded px-2 py-1 cursor-pointer hover:border-neutral-400 focus:outline-none"
            aria-label="Currency selection"
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="JPY">JPY (¥)</option>
          </select>

          {/* Wishlist button */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2 text-neutral-600 hover:text-neutral-950 transition-colors"
            aria-label="View saved pieces"
          >
            <Heart className="w-4.5 h-4.5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-neutral-900 rounded-full" />
            )}
          </button>

          {/* Primary Action: Shopping Bag */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2.5 px-4 py-2 bg-neutral-950 text-white text-xs font-semibold tracking-wide uppercase rounded-md hover:bg-neutral-800 transition-colors whitespace-nowrap shrink-0 shadow-sm"
            aria-label="Shopping bag"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Bag</span>
            <span className="font-mono tabular-nums bg-white/20 text-white rounded px-1.5 py-0.5 text-[11px]">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
