import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenProductDetails: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  onOpenProductDetails
}) => {
  const { wishlist, toggleWishlist, addToCart, formatPrice } = useCart();

  if (!isOpen) return null;

  const wishlistedProducts = wishlist
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is Product => !!p);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Saved pieces"
      className="fixed inset-0 z-50 overflow-hidden"
    >
      <div
        className="fixed inset-0 bg-neutral-950/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-neutral-200">
          {/* Header */}
          <div className="px-6 py-5 border-b border-neutral-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-neutral-950 fill-neutral-950" />
              <h2 className="font-display text-lg font-bold text-neutral-950 uppercase tracking-tight">
                Saved Pieces
              </h2>
              <span className="font-mono text-xs text-neutral-500 tabular-nums">
                ({wishlist.length})
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-neutral-400 hover:text-neutral-900 transition-colors"
              aria-label="Close saved pieces"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-neutral-100">
            {wishlistedProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 mb-4">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="font-display font-semibold text-neutral-900 text-base mb-1">
                  No Saved Pieces
                </h3>
                <p className="text-xs text-neutral-500 max-w-xs mb-6">
                  Save shirts, coats, and hats to review later or combine into curated looks.
                </p>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-neutral-900 text-white rounded text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  Browse Catalog
                </button>
              </div>
            ) : (
              wishlistedProducts.map((p) => (
                <div key={p.id} className="py-4 flex gap-4">
                  <div
                    onClick={() => {
                      onOpenProductDetails(p);
                      onClose();
                    }}
                    className="w-20 h-24 bg-neutral-100 rounded overflow-hidden shrink-0 border border-neutral-200 cursor-pointer"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4
                          onClick={() => {
                            onOpenProductDetails(p);
                            onClose();
                          }}
                          className="text-xs font-semibold text-neutral-900 hover:text-neutral-700 cursor-pointer line-clamp-1"
                        >
                          {p.name}
                        </h4>
                        <button
                          onClick={() => toggleWishlist(p.id)}
                          className="text-neutral-400 hover:text-red-600 transition-colors p-0.5"
                          aria-label={`Remove ${p.name} from saved`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] font-mono text-neutral-500 mt-1">
                        {p.category.toUpperCase()} · {p.weightGsm ? `${p.weightGsm} GSM` : p.origin}
                      </div>

                      <div className="font-mono text-xs font-semibold text-neutral-900 mt-1.5 tabular-nums">
                        {formatPrice(p.price)}
                      </div>
                    </div>

                    <div className="pt-2 flex items-center gap-2">
                      <button
                        onClick={() => {
                          addToCart(p, p.availableSizes[0] || 'M', p.colors[0]?.name || 'Standard', 1);
                        }}
                        className="px-3 py-1.5 bg-neutral-950 hover:bg-neutral-800 text-white text-[11px] font-semibold uppercase tracking-wider rounded transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Move to Bag</span>
                      </button>

                      <button
                        onClick={() => {
                          onOpenProductDetails(p);
                          onClose();
                        }}
                        className="px-2.5 py-1.5 border border-neutral-200 hover:border-neutral-400 text-neutral-700 text-[11px] font-mono rounded cursor-pointer transition-colors"
                      >
                        Inspect Specs
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {wishlistedProducts.length > 0 && (
            <div className="p-6 bg-neutral-50 border-t border-neutral-200">
              <button
                onClick={() => {
                  wishlistedProducts.forEach((p) => {
                    addToCart(p, p.availableSizes[0] || 'M', p.colors[0]?.name || 'Standard', 1);
                  });
                }}
                className="w-full py-3 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors cursor-pointer shadow-sm"
              >
                Add All Saved Pieces to Bag ({wishlistedProducts.length})
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
