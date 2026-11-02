import React, { useState } from 'react';
import { Heart, Plus, Check } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenDetails }) => {
  const { formatPrice, addToCart, isWishlisted, toggleWishlist, openSizeGuide } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(true);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [quickAddSuccess, setQuickAddSuccess] = useState(false);

  const selectedSize = product.availableSizes[selectedSizeIndex] || product.availableSizes[0];
  const primaryColor = product.colors[0]?.name || 'Standard';

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedSize, primaryColor, 1);
    setQuickAddSuccess(true);
    setTimeout(() => setQuickAddSuccess(false), 1500);
  };

  return (
    <article
      onClick={() => onOpenDetails(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col bg-white border border-neutral-200/90 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
    >
      {/* Product Image Slot: 65-75% height, neutral backdrop */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100 flex items-center justify-center">
        {imageLoaded ? (
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={() => setImageLoaded(false)}
            className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-104"
          />
        ) : (
          /* Zero-broken-image fallback styled container */
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-neutral-400 bg-neutral-100">
            <span className="font-display font-medium text-sm text-neutral-600 mb-1">{product.name}</span>
            <span className="text-xs font-mono">{product.category.toUpperCase()}</span>
          </div>
        )}

        {/* Top Floating Controls: Tag & Wishlist */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {product.tag ? (
            <span className="pointer-events-auto text-[11px] font-mono tracking-wider text-neutral-900 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded shadow-xs border border-neutral-200/60 uppercase">
              {product.tag}
            </span>
          ) : <span />}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`pointer-events-auto p-2 rounded-full transition-colors backdrop-blur-sm ${
              isWishlisted(product.id)
                ? 'bg-neutral-900 text-white'
                : 'bg-white/85 text-neutral-700 hover:text-neutral-950 hover:bg-white'
            }`}
            aria-label={isWishlisted(product.id) ? 'Remove from wishlist' : 'Save piece to wishlist'}
          >
            <Heart
              className={`w-4 h-4 ${isWishlisted(product.id) ? 'fill-current' : ''}`}
            />
          </button>
        </div>

        {/* Hover Action Bar: Quick Size Selector & Quick Add */}
        <div
          className={`absolute bottom-3 left-3 right-3 transition-all duration-200 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none sm:opacity-0'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-white/95 backdrop-blur-md p-2 rounded-md border border-neutral-200 shadow-lg flex items-center justify-between gap-2">
            <div className="flex items-center gap-1 overflow-x-auto py-0.5 no-scrollbar">
              {product.availableSizes.map((sz, idx) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => setSelectedSizeIndex(idx)}
                  className={`px-2 py-1 text-[11px] font-mono rounded transition-colors whitespace-nowrap ${
                    selectedSizeIndex === idx
                      ? 'bg-neutral-900 text-white font-bold'
                      : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleQuickAdd}
              className="px-3 py-1.5 bg-neutral-950 hover:bg-neutral-800 text-white rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
            >
              {quickAddSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Quick Add</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Clean unboxed metadata with subtle dot separator - strictly adheres to Zero-Pill rule */}
          <div className="flex items-center gap-2 text-xs text-neutral-500 font-mono mb-1.5">
            <span className="uppercase">{product.category}</span>
            <span aria-hidden="true" className="opacity-40">·</span>
            <span>{product.origin}</span>
            {product.weightGsm && (
              <>
                <span aria-hidden="true" className="opacity-40">·</span>
                <span>{product.weightGsm} GSM</span>
              </>
            )}
          </div>

          {/* Product Name */}
          <h3 className="text-base font-semibold text-neutral-900 group-hover:text-neutral-700 transition-colors line-clamp-1 mb-1">
            {product.name}
          </h3>

          {/* Short description */}
          <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed mb-3">
            {product.description}
          </p>
        </div>

        {/* Bottom row: Price & Color Swatches */}
        <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
          <div className="font-mono text-base font-semibold text-neutral-950 tabular-nums">
            {formatPrice(product.price)}
          </div>

          <div className="flex items-center gap-1.5" title={`${product.colors.length} colorways available`}>
            {product.colors.map((c) => (
              <span
                key={c.name}
                className="w-3 h-3 rounded-full border border-neutral-300 shadow-2xs"
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};
