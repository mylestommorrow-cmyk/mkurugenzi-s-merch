import React, { useState } from 'react';
import { X, CheckCircle, Shield, Truck, CreditCard, DollarSign, ArrowLeft, Printer } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CustomerDetails, OrderConfirmation } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    subtotal,
    discountAmount,
    shippingFee,
    total,
    formatPrice,
    currency,
    completeOrder,
    lastOrder
  } = useCart();

  const [step, setStep] = useState<'details' | 'payment' | 'confirmation'>('details');

  const [form, setForm] = useState<CustomerDetails>({
    fullName: 'Alexander Vance',
    email: 'alexander.vance@archive-mail.com',
    phone: '+1 (555) 392-1084',
    address: '450 West 24th Street, Apt 8B',
    city: 'New York',
    postalCode: '10011',
    country: 'United States',
    paymentMethod: 'card',
    shippingMethod: 'standard'
  });

  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4829');
  const [cardExpiry, setCardExpiry] = useState('11/28');
  const [cardCvc, setCardCvc] = useState('892');
  const [confirmedOrder, setConfirmedOrder] = useState<OrderConfirmation | null>(null);

  if (!isCheckoutOpen) return null;

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePlaceOrder = () => {
    const order = completeOrder(form);
    setConfirmedOrder(order);
    setStep('confirmation');
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setStep('details');
  };

  const calculatedTotal = total + (form.shippingMethod === 'express' ? 20 : 0);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
    >
      <div className="fixed inset-0" onClick={step === 'confirmation' ? handleClose : undefined} />

      <div className="relative w-full max-w-3xl bg-white rounded-xl shadow-2xl border border-neutral-200 overflow-hidden z-10 my-8">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-base tracking-tight text-neutral-900 uppercase">
              Atelier Nord Checkout
            </span>
            <span aria-hidden="true" className="text-neutral-400">·</span>
            <span className="text-xs font-mono text-neutral-500 uppercase">
              {step === 'details' ? '1. Shipping & Contact' : step === 'payment' ? '2. Payment Selection' : '3. Order Receipt'}
            </span>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-900 rounded-full transition-colors"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: Details & Shipping Address */}
        {step === 'details' && (
          <form onSubmit={handleDetailsSubmit} className="p-6 sm:p-8 space-y-6">
            <h3 id="checkout-modal-title" className="text-lg font-bold text-neutral-950 font-display">
              Shipping Destination & Contact
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1 sm:col-span-2">
                <label className="font-mono text-neutral-700 uppercase">Full Name</label>
                <input
                  type="text"
                  required
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className="w-full bg-white border border-neutral-300 rounded px-3 py-2 text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-neutral-700 uppercase">Email Address</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-white border border-neutral-300 rounded px-3 py-2 text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-neutral-700 uppercase">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-white border border-neutral-300 rounded px-3 py-2 text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="font-mono text-neutral-700 uppercase">Street Address</label>
                <input
                  type="text"
                  required
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="w-full bg-white border border-neutral-300 rounded px-3 py-2 text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-neutral-700 uppercase">City</label>
                <input
                  type="text"
                  required
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="w-full bg-white border border-neutral-300 rounded px-3 py-2 text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-neutral-700 uppercase">Postal Code</label>
                <input
                  type="text"
                  required
                  value={form.postalCode}
                  onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                  className="w-full bg-white border border-neutral-300 rounded px-3 py-2 text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="font-mono text-neutral-700 uppercase">Country</label>
                <select
                  value={form.country}
                  onChange={(e) => setForm({ ...form, country: e.target.value })}
                  className="w-full bg-white border border-neutral-300 rounded px-3 py-2 text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                >
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="Japan">Japan</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                </select>
              </div>
            </div>

            {/* Delivery Courier Speed */}
            <div className="border-t border-neutral-200 pt-4 space-y-2">
              <label className="block text-xs font-mono uppercase text-neutral-700 font-semibold">
                Delivery Courier Selection
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <label
                  onClick={() => setForm({ ...form, shippingMethod: 'standard' })}
                  className={`p-3.5 rounded border cursor-pointer flex flex-col justify-between transition-colors ${
                    form.shippingMethod === 'standard'
                      ? 'border-neutral-950 bg-neutral-50'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-neutral-900">Standard Courier</span>
                    <span className="font-mono tabular-nums text-neutral-700">
                      {shippingFee === 0 ? 'Complimentary' : formatPrice(shippingFee)}
                    </span>
                  </div>
                  <span className="text-[11px] text-neutral-500">3–5 Business Days (Carbon Neutral)</span>
                </label>

                <label
                  onClick={() => setForm({ ...form, shippingMethod: 'express' })}
                  className={`p-3.5 rounded border cursor-pointer flex flex-col justify-between transition-colors ${
                    form.shippingMethod === 'express'
                      ? 'border-neutral-950 bg-neutral-50'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-neutral-900">DHL Express Priority</span>
                    <span className="font-mono tabular-nums text-neutral-700">
                      {formatPrice((shippingFee === 0 ? 0 : shippingFee) + 20)}
                    </span>
                  </div>
                  <span className="text-[11px] text-neutral-500">1–2 Business Days with Signature</span>
                </label>
              </div>
            </div>

            {/* Footer Continue Action */}
            <div className="border-t border-neutral-200 pt-5 flex items-center justify-between">
              <div className="text-xs text-neutral-600">
                <span>Order Total: </span>
                <span className="font-mono text-sm font-bold text-neutral-950 tabular-nums">
                  {formatPrice(calculatedTotal)}
                </span>
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors cursor-pointer"
              >
                Continue to Payment
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: Payment Method */}
        {step === 'payment' && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-neutral-950 font-display">
                Select Payment Method
              </h3>
              <button
                onClick={() => setStep('details')}
                className="text-xs text-neutral-500 hover:text-neutral-900 flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Shipping</span>
              </button>
            </div>

            {/* Payment Options */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setForm({ ...form, paymentMethod: 'card' })}
                className={`p-3.5 rounded border text-left cursor-pointer transition-colors ${
                  form.paymentMethod === 'card'
                    ? 'border-neutral-950 bg-neutral-50'
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <CreditCard className="w-4 h-4 text-neutral-900 mb-2" />
                <div className="text-xs font-semibold text-neutral-900">Credit / Debit Card</div>
                <div className="text-[11px] text-neutral-500">Visa, Mastercard, Amex</div>
              </button>

              <button
                type="button"
                onClick={() => setForm({ ...form, paymentMethod: 'applepay' })}
                className={`p-3.5 rounded border text-left cursor-pointer transition-colors ${
                  form.paymentMethod === 'applepay'
                    ? 'border-neutral-950 bg-neutral-50'
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <div className="font-mono text-sm font-bold mb-2"> Pay</div>
                <div className="text-xs font-semibold text-neutral-900">Apple Pay Express</div>
                <div className="text-[11px] text-neutral-500">Biometric 1-touch</div>
              </button>

              <button
                type="button"
                onClick={() => setForm({ ...form, paymentMethod: 'cod' })}
                className={`p-3.5 rounded border text-left cursor-pointer transition-colors ${
                  form.paymentMethod === 'cod'
                    ? 'border-neutral-950 bg-neutral-50'
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <DollarSign className="w-4 h-4 text-neutral-900 mb-2" />
                <div className="text-xs font-semibold text-neutral-900">Cash on Delivery (COD)</div>
                <div className="text-[11px] text-neutral-500">Pay upon package arrival</div>
              </button>
            </div>

            {/* Payment Input Details */}
            {form.paymentMethod === 'card' && (
              <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-lg space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="font-mono text-neutral-700 uppercase">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full bg-white border border-neutral-300 rounded px-3 py-2 font-mono text-neutral-900 focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-mono text-neutral-700 uppercase">Expiration</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full bg-white border border-neutral-300 rounded px-3 py-2 font-mono text-neutral-900 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-mono text-neutral-700 uppercase">CVC Code</label>
                    <input
                      type="text"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full bg-white border border-neutral-300 rounded px-3 py-2 font-mono text-neutral-900 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {form.paymentMethod === 'applepay' && (
              <div className="p-6 bg-neutral-50 border border-neutral-200 rounded-lg text-center text-xs text-neutral-600">
                <p className="font-semibold text-neutral-900 mb-1">Apple Pay Express Authentication</p>
                <p>Card credentials will be tokenized and charged safely via your registered Apple Wallet.</p>
              </div>
            )}

            {form.paymentMethod === 'cod' && (
              <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-700 space-y-1.5">
                <p className="font-semibold text-neutral-900">Cash on Delivery Verified Terms</p>
                <p className="text-[11px] text-neutral-600">
                  Total amount of <span className="font-mono font-bold text-neutral-900">{formatPrice(calculatedTotal)}</span> will be collected in local currency by the courier driver upon physical handover. Exact cash or contactless mobile terminal supported.
                </p>
              </div>
            )}

            {/* Summary Line */}
            <div className="border-t border-neutral-200 pt-4 flex items-center justify-between text-xs">
              <div>
                <span className="text-neutral-500">Shipping to: </span>
                <span className="font-medium text-neutral-900">{form.city}, {form.country}</span>
              </div>
              <div className="font-mono text-base font-bold text-neutral-950 tabular-nums">
                Total: {formatPrice(calculatedTotal)}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handlePlaceOrder}
              className="w-full py-3.5 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors cursor-pointer shadow-sm"
            >
              Authorize & Place Order · {formatPrice(calculatedTotal)}
            </button>
          </div>
        )}

        {/* STEP 3: Order Confirmation & Receipt */}
        {step === 'confirmation' && confirmedOrder && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex p-3 rounded-full bg-emerald-50 text-emerald-600 mb-2">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold font-display text-neutral-950 tracking-tight">
                Order {confirmedOrder.orderId} Confirmed
              </h3>
              <p className="text-xs text-neutral-600 max-w-md mx-auto">
                Thank you, {confirmedOrder.customer.fullName}. We have received your order and our atelier is preparing your pieces for dispatch.
              </p>
            </div>

            {/* Post-order status card */}
            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-5 space-y-4 text-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-neutral-200 font-mono">
                <div>
                  <span className="text-neutral-500">Order Reference: </span>
                  <span className="font-bold text-neutral-950">{confirmedOrder.orderId}</span>
                </div>
                <div>
                  <span className="text-neutral-500">Date: </span>
                  <span className="text-neutral-950">{confirmedOrder.orderDate}</span>
                </div>
                <div>
                  <span className="text-neutral-500">Estimated Delivery: </span>
                  <span className="font-bold text-neutral-950">{confirmedOrder.estimatedDelivery}</span>
                </div>
              </div>

              {/* Itemized receipt */}
              <div className="space-y-2.5">
                <div className="font-mono uppercase text-neutral-500 text-[11px]">
                  Purchased Atelier Pieces ({confirmedOrder.items.length})
                </div>
                {confirmedOrder.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-12 bg-neutral-200 rounded overflow-hidden shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-medium text-neutral-900">{item.name}</div>
                        <div className="text-[11px] font-mono text-neutral-500">
                          Qty: {item.quantity} · Size: {item.size} · {item.color}
                        </div>
                      </div>
                    </div>
                    <div className="font-mono tabular-nums text-neutral-950 font-medium">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t border-neutral-200 pt-3 space-y-1 font-mono text-neutral-600">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="tabular-nums">{formatPrice(confirmedOrder.subtotal)}</span>
                </div>
                {confirmedOrder.discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Archive Discount:</span>
                    <span className="tabular-nums">-{formatPrice(confirmedOrder.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span className="tabular-nums">
                    {confirmedOrder.shipping === 0 ? 'Complimentary' : formatPrice(confirmedOrder.shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-neutral-950 font-bold text-sm pt-2 border-t border-neutral-200">
                  <span>Total Paid:</span>
                  <span className="tabular-nums">{formatPrice(confirmedOrder.total)}</span>
                </div>
              </div>

              {/* Shipping Address confirmation */}
              <div className="pt-2 text-[11px] text-neutral-500 border-t border-neutral-200">
                <span>Shipping to: </span>
                <span className="text-neutral-800">
                  {confirmedOrder.customer.address}, {confirmedOrder.customer.city},{' '}
                  {confirmedOrder.customer.postalCode}, {confirmedOrder.customer.country}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto px-4 py-2.5 border border-neutral-300 rounded text-xs font-semibold uppercase tracking-wider text-neutral-700 hover:text-neutral-950 hover:bg-neutral-50 flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Invoice</span>
              </button>

              <button
                onClick={handleClose}
                className="w-full sm:flex-1 px-6 py-2.5 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
