import React from 'react';
import { ArrowRight, Layers, ShieldCheck, Sparkles } from 'lucide-react';
import { ProductCategory } from '../types';

interface HeroProps {
  onSelectCategory: (cat: ProductCategory) => void;
  onOpenLookbook: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectCategory, onOpenLookbook }) => {
  return (
    <section className="relative overflow-hidden border-b border-neutral-200 bg-neutral-900 text-white">
      {/* Hero grid layout: 2-column split on desktop */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px] lg:min-h-[640px] items-stretch">
          {/* Left Column: Editorial Brand Statement & Category Entrances */}
          <div className="lg:col-span-6 py-12 lg:py-20 flex flex-col justify-between pr-0 lg:pr-12 z-10">
            <div>
              {/* Quiet unboxed kicker */}
              <div className="text-xs uppercase tracking-widest text-neutral-400 font-mono mb-4">
                Atelier Nord · Autumn/Winter Archive Edition
              </div>

              {/* Dominant Headline */}
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08] text-balance mb-6">
                The Architecture of Shirts, Coats & Headwear.
              </h1>

              {/* Subtitle measure 65-75ch */}
              <p className="text-neutral-300 text-base sm:text-lg leading-relaxed max-w-xl font-normal mb-8">
                Purposely engineered merchandise with geometric permanence. Heavyweight 340 GSM Aegean cotton tees, tailored 680 GSM Italian virgin wool overcoats, and structured merino felt caps.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => {
                    const el = document.getElementById('catalog');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3.5 bg-white text-neutral-950 text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-neutral-100 transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Shop The Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onOpenLookbook}
                  className="px-6 py-3.5 bg-neutral-800/80 border border-neutral-700 text-neutral-200 text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-neutral-800 hover:text-white transition-colors cursor-pointer"
                >
                  View Styling Lookbook
                </button>
              </div>
            </div>

            {/* Curated 3-Pillar Category Jump Bar */}
            <div className="pt-10 mt-10 border-t border-neutral-800 grid grid-cols-3 gap-4">
              <button
                onClick={() => onSelectCategory('shirts')}
                className="text-left group cursor-pointer"
              >
                <span className="block text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                  01 · Shirts
                </span>
                <span className="block text-sm font-semibold text-white group-hover:text-neutral-300 transition-colors">
                  Heavyweight 340 GSM
                </span>
                <span className="block text-xs text-neutral-400 mt-0.5">
                  Drop-shoulder tees & poplin
                </span>
              </button>

              <button
                onClick={() => onSelectCategory('coats')}
                className="text-left group cursor-pointer"
              >
                <span className="block text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                  02 · Coats
                </span>
                <span className="block text-sm font-semibold text-white group-hover:text-neutral-300 transition-colors">
                  Melton Wool & Trenches
                </span>
                <span className="block text-xs text-neutral-400 mt-0.5">
                  Italian virgin wool & car coats
                </span>
              </button>

              <button
                onClick={() => onSelectCategory('hats')}
                className="text-left group cursor-pointer"
              >
                <span className="block text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                  03 · Hats
                </span>
                <span className="block text-sm font-semibold text-white group-hover:text-neutral-300 transition-colors">
                  Structured Caps & Beanies
                </span>
                <span className="block text-xs text-neutral-400 mt-0.5">
                  6-panel felt & 7-gauge cashmere
                </span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Lookbook Photography */}
          <div className="lg:col-span-6 relative flex items-center justify-center my-6 lg:my-0">
            <div className="relative w-full h-full min-h-[380px] lg:min-h-full rounded-lg overflow-hidden border border-neutral-800 bg-neutral-950">
              <img
                src="/src/assets/images/hero_merchandise_lookbook_1793636044671.jpg"
                alt="Atelier Nord editorial lookbook featuring models in tailored wool coats and structured headwear"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent pointer-events-none" />
              
              {/* Image corner caption with clean unboxed metadata */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-neutral-300 bg-neutral-900/70 backdrop-blur-md px-3.5 py-2 rounded border border-neutral-800">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-white">Full Ensemble</span>
                  <span aria-hidden="true" className="opacity-40">·</span>
                  <span>Overcoat & Felt Headwear</span>
                </div>
                <button
                  onClick={onOpenLookbook}
                  className="text-white hover:underline text-[11px] font-mono cursor-pointer"
                >
                  Shop Ensemble →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust & Craft Adjacency Strip */}
      <div className="border-t border-neutral-800/80 bg-neutral-950/60 py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-neutral-300" />
            <span>Pure Organic Aegean Cotton & Italian Biella Wool</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-neutral-300" />
            <span>Lifetime Architectural Stitch & Seam Guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-neutral-300" />
            <span>Complimentary Global Exchanges & Returns Within 30 Days</span>
          </div>
        </div>
      </div>
    </section>
  );
};
