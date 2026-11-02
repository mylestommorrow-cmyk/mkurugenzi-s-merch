import React, { useState } from 'react';
import { X, Check, Heart, ShieldCheck, Ruler, ArrowRight, Truck } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { formatPrice, addToCart, isWishlisted, toggleWishlist, openSizeGuide } = useCart();
  
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<string>(product.availableSizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const handleAdd = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 900);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
    >
      {/* Backdrop click to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl border border-neutral-200 overflow-hidden z-10 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-neutral-400 hover:text-neutral-900 bg-white/80 hover:bg-white rounded-full transition-colors shadow-xs"
          aria-label="Close product view"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Left Gallery: High-resolution product image */}
          <div className="md:col-span-6 bg-neutral-100 flex flex-col justify-center relative p-6 sm:p-8">
            <div className="relative aspect-[4/3] md:aspect-square w-full rounded-lg overflow-hidden bg-neutral-200/60 border border-neutral-200">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              {product.tag && (
                <span className="absolute top-3 left-3 text-[11px] font-mono tracking-wider text-neutral-900 bg-white/95 px-2.5 py-1 rounded shadow-xs uppercase border border-neutral-200/80">
                  {product.tag}
                </span>
              )}
            </div>

            {/* Micro provenance bar below image */}
            <div className="mt-4 pt-4 border-t border-neutral-200 flex items-center justify-between text-xs text-neutral-500 font-mono">
              <span>Origin: {product.origin}</span>
              {product.weightGsm && <span>Fabric: {product.weightGsm} GSM</span>}
              <span>Stock: {product.stockCount} Available</span>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Category kicker */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                  {product.category} · Archive Specification
                </span>
                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  className="flex items-center gap-1.5 text-xs text-neutral-600 hover:text-neutral-950 cursor-pointer"
                >
                  <Heart
                    className={`w-4 h-4 ${isWishlisted(product.id) ? 'fill-neutral-900 text-neutral-900' : ''}`}
                  />
                  <span>{isWishlisted(product.id) ? 'Saved' : 'Save Piece'}</span>
                </button>
              </div>

              {/* Title & Price */}
              <h2 id="product-modal-title" className="font-display text-2xl font-bold text-neutral-950 tracking-tight mb-2">
                {product.name}
              </h2>
              <div className="font-mono text-2xl font-semibold text-neutral-950 tabular-nums mb-4">
                {formatPrice(product.price)}
              </div>

              {/* Description */}
              <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Color Selection */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs font-mono uppercase mb-2">
                  <span className="text-neutral-700">Selected Color:</span>
                  <span className="font-semibold text-neutral-950">{selectedColor}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setSelectedColor(c.name)}
                      className={`relative w-8 h-8 rounded-full border-2 transition-all cursor-pointer flex items-center justify-center ${
                        selectedColor === c.name
                          ? 'border-neutral-950 scale-105 shadow-xs'
                          : 'border-transparent hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                      aria-label={`Select color ${c.name}`}
                    >
                      {selectedColor === c.name && (
                        <span className="w-1.5 h-1.5 rounded-full bg-white shadow-xs" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-neutral-700 uppercase">Select Size:</span>
                  <button
                    type="button"
                    onClick={() => openSizeGuide(product.category)}
                    className="flex items-center gap-1 text-neutral-900 underline hover:text-neutral-600 cursor-pointer text-xs"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>View Size Guide</span>
                  </button>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {product.availableSizes.map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      className={`py-2 px-1 text-xs font-mono rounded border transition-colors cursor-pointer text-center ${
                        selectedSize === sz
                          ? 'border-neutral-950 bg-neutral-950 text-white font-bold'
                          : 'border-neutral-200 bg-white text-neutral-800 hover:border-neutral-400'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="mb-6 flex items-center gap-4">
                <span className="text-xs font-mono uppercase text-neutral-700">Quantity:</span>
                <div className="flex items-center border border-neutral-200 rounded-md">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1 text-sm font-mono text-neutral-600 hover:text-neutral-950 hover:bg-neutral-50"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-xs font-mono font-bold tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                    className="px-3 py-1 text-sm font-mono text-neutral-600 hover:text-neutral-950 hover:bg-neutral-50"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Details & Specifications Accordion-Style */}
              <div className="border-t border-neutral-200 pt-4 mb-6 text-xs">
                <span className="font-mono uppercase font-semibold text-neutral-900 block mb-2">
                  Technical Specifications
                </span>
                <ul className="space-y-1.5 text-neutral-600 list-disc list-inside">
                  <li><strong>Composition:</strong> {product.material}</li>
                  <li><strong>Fit Profile:</strong> {product.fit}</li>
                  {product.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Primary Buy CTA & Guarantee */}
            <div className="space-y-3 pt-4 border-t border-neutral-200">
              <button
                type="button"
                onClick={handleAdd}
                className="w-full py-3.5 px-6 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <span>Add to Bag</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums">{formatPrice(product.price * quantity)}</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-between text-[11px] text-neutral-500 font-mono">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5" />
                  <span>Dispatches in 24 Hours</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>30-Day Free Returns</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
