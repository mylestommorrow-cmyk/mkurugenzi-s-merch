import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShoppingBag, ShieldCheck, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartCount,
    subtotal,
    freeShippingThreshold,
    freeShippingRemaining,
    shippingFee,
    discountAmount,
    total,
    formatPrice,
    promoCode,
    applyPromoCode,
    setIsCheckoutOpen
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [promoFeedback, setPromoFeedback] = useState<{ success: boolean; message: string } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyPromoCode(couponInput);
    setPromoFeedback(res);
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const progressPercent = Math.min(100, Math.round(((freeShippingThreshold - freeShippingRemaining) / freeShippingThreshold) * 100));

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shopping bag"
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-neutral-950/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-neutral-200">
          {/* Header */}
          <div className="px-6 py-5 border-b border-neutral-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-neutral-900" />
              <h2 className="font-display text-lg font-bold text-neutral-950 uppercase tracking-tight">
                Shopping Bag
              </h2>
              <span className="font-mono text-xs text-neutral-500 tabular-nums">
                ({cartCount} {cartCount === 1 ? 'item' : 'items'})
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 text-neutral-400 hover:text-neutral-900 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-6 py-3 bg-neutral-50 border-b border-neutral-200/80 text-xs">
            {freeShippingRemaining > 0 ? (
              <div>
                <p className="text-neutral-700 mb-1.5 font-medium">
                  Add <span className="font-mono font-bold text-neutral-950">{formatPrice(freeShippingRemaining)}</span> more for complimentary courier delivery
                </p>
                <div className="w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-neutral-900 h-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            ) : (
              <p className="text-emerald-700 font-medium flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Complimentary worldwide courier delivery unlocked</span>
              </p>
            )}
          </div>

          {/* Cart Itemized List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-neutral-100">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-display font-semibold text-neutral-900 text-base mb-1">
                  Your bag is empty
                </h3>
                <p className="text-xs text-neutral-500 max-w-xs mb-6">
                  Explore our curated merchandise of heavyweight tees, sculpted trench coats, and felt headwear.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-4 py-2 bg-neutral-900 text-white rounded text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-colors"
                >
                  Start Exploring
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="py-4 flex gap-4">
                  {/* Thumbnail */}
                  <div className="w-20 h-24 bg-neutral-100 rounded overflow-hidden shrink-0 border border-neutral-200">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-xs font-semibold text-neutral-900 line-clamp-1">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-neutral-400 hover:text-red-600 transition-colors p-0.5"
                          aria-label={`Remove ${item.name} from bag`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Variant text metadata */}
                      <div className="text-[11px] font-mono text-neutral-500 mt-1 flex items-center gap-1.5">
                        <span>Size: {item.size}</span>
                        <span aria-hidden="true" className="opacity-40">·</span>
                        <span>{item.color}</span>
                      </div>
                    </div>

                    {/* Quantity Stepper & Item Total */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-neutral-200 rounded">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-neutral-600 hover:text-black"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="px-2 py-0.5 text-xs font-mono font-medium tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-neutral-600 hover:text-black"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <div className="font-mono text-xs font-semibold text-neutral-900 tabular-nums">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-6 bg-neutral-50 border-t border-neutral-200 space-y-4">
              {/* Promo code redemption */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-2.5 w-3.5 h-3.5 text-neutral-400" />
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Promo code (ARCHIVE10)"
                    className="w-full text-xs bg-white border border-neutral-300 rounded pl-8 pr-3 py-2 font-mono uppercase focus:outline-none focus:ring-1 focus:ring-neutral-900 text-neutral-900"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 text-xs font-semibold uppercase tracking-wider rounded transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </form>

              {promoFeedback && (
                <div
                  className={`text-[11px] font-mono ${
                    promoFeedback.success ? 'text-emerald-700' : 'text-red-600'
                  }`}
                >
                  {promoFeedback.message}
                </div>
              )}

              {/* Cost Calculations */}
              <div className="space-y-1.5 text-xs pt-2 border-t border-neutral-200/80">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums">{formatPrice(subtotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount ({promoCode})</span>
                    <span className="font-mono tabular-nums">-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-neutral-600">
                  <span>Estimated Shipping</span>
                  <span className="font-mono tabular-nums">
                    {shippingFee === 0 ? 'Complimentary' : formatPrice(shippingFee)}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-semibold text-neutral-950 pt-2 border-t border-neutral-200">
                  <span>Estimated Total</span>
                  <span className="font-mono text-base tabular-nums">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Checkout Action */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 px-4 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-[11px] text-center text-neutral-400 font-mono">
                Tax calculated during secure checkout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
