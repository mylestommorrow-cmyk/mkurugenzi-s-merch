import React from 'react';
import { X, ArrowRight, Sparkles } from 'lucide-react';
import { LOOKBOOK_LOOKS, PRODUCTS } from '../data/products';
import { Product } from '../types';

interface LookbookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const LookbookModal: React.FC<LookbookModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-neutral-900 text-white rounded-2xl shadow-2xl overflow-hidden border border-neutral-800 my-8"
      >
        {/* Header */}
        <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>EDITORIAL ARCHIVE · AW2026</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-white">
              Curated Ensembles: Shirts, Outerwear &amp; Headwear
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close lookbook"
            className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Looks List */}
        <div className="p-6 sm:p-8 space-y-12 max-h-[80vh] overflow-y-auto">
          {LOOKBOOK_LOOKS.map((look) => {
            const featuredItems = PRODUCTS.filter((p) =>
              look.featuredProductIds.includes(p.id)
            );

            return (
              <div key={look.id} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center border-b border-neutral-800/80 pb-12 last:border-b-0 last:pb-0">
                {/* Look Photo */}
                <div className="md:col-span-6 rounded-xl overflow-hidden aspect-[4/3] bg-neutral-950 border border-neutral-800">
                  <img
                    src={look.image}
                    alt={look.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Look Details & Products in Look */}
                <div className="md:col-span-6 flex flex-col justify-between">
                  <div>
                    <span className="text-xs uppercase font-mono text-neutral-400">{look.subtitle}</span>
                    <h3 className="text-xl font-bold text-white mt-1 mb-3">{look.title}</h3>
                    <p className="text-xs text-neutral-300 leading-relaxed mb-6">
                      {look.stylingNote}
                    </p>
                  </div>

                  <div>
                    <span className="text-[11px] uppercase font-mono text-neutral-400 block mb-2.5">
                      Garments In This Silhouette:
                    </span>
                    <div className="space-y-2">
                      {featuredItems.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => {
                            onClose();
                            onSelectProduct(item);
                          }}
                          className="flex items-center justify-between p-2.5 bg-neutral-950 hover:bg-neutral-800/80 rounded-lg border border-neutral-800 transition-colors cursor-pointer group"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              referrerPolicy="no-referrer"
                              className="w-10 h-10 object-cover rounded bg-neutral-900"
                            />
                            <div>
                              <div className="text-xs font-semibold text-white group-hover:text-neutral-200">
                                {item.name}
                              </div>
                              <div className="text-[11px] text-neutral-400 capitalize">
                                {item.category} · ${item.price} USD
                              </div>
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
