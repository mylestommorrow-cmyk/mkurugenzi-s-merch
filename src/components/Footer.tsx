import React, { useState } from 'react';
import { ProductCategory } from '../types';
import { useCart } from '../context/CartContext';
import { ArrowRight, Check } from 'lucide-react';

interface FooterProps {
  onSelectCategory: (cat: ProductCategory) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  const { openSizeGuide } = useCart();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer className="bg-neutral-950 text-neutral-400 text-xs border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand & Purpose */}
          <div className="md:col-span-4 space-y-4">
            <span className="font-display text-xl font-bold tracking-tight text-white uppercase block">
              Atelier Nord
            </span>
            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              Contemporary architectural apparel & essential merchandise. Heavyweight drop-shoulder shirts, tailored wool outerwear, and structured caps designed for enduring permanence.
            </p>
            <div className="text-[11px] font-mono text-neutral-500">
              Copenhagen · Tokyo · New York
            </div>
          </div>

          {/* Catalog Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-mono uppercase font-semibold text-white tracking-wider text-[11px]">
              Collection
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('shirts');
                    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Heavyweight Shirts
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('coats');
                    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Wool Coats & Trenches
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('hats');
                    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Structured Caps & Hats
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    document.getElementById('lookbook')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Lookbook Ensembles
                </button>
              </li>
            </ul>
          </div>

          {/* Care & Concierge */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-mono uppercase font-semibold text-white tracking-wider text-[11px]">
              Assistance
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => openSizeGuide('shirts')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Architectural Sizing Chart
                </button>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Garment Care & Steaming
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Shipping & Customs
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  30-Day Global Returns
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter / Archive Access */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-mono uppercase font-semibold text-white tracking-wider text-[11px]">
              Patron Archive Newsletter
            </h4>
            <p className="text-xs text-neutral-400">
              Receive private preview access to seasonal small-batch releases and textile developments.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-l px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-white text-neutral-950 font-semibold text-xs uppercase tracking-wider rounded-r hover:bg-neutral-200 transition-colors cursor-pointer shrink-0 flex items-center justify-center"
                  aria-label="Subscribe"
                >
                  {subscribed ? <Check className="w-4 h-4 text-emerald-700" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] font-mono text-emerald-400">
                  Welcome to the archive. Your welcome key has been dispatched.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-neutral-500">
          <div>
            © {new Date().getFullYear()} Atelier Nord Apparel & Merchandise. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-neutral-400 cursor-pointer">Privacy Policy</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-neutral-400 cursor-pointer">Terms of Service</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-neutral-400 cursor-pointer">Ethical Sourcing Protocol</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
