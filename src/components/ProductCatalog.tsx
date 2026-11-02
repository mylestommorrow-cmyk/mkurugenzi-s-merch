import React, { useState, useMemo } from 'react';
import { ProductCategory, Product } from '../types';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';

interface ProductCatalogProps {
  products: Product[];
  activeCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  onOpenDetails: (product: Product) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'weight-desc';

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  activeCategory,
  onSelectCategory,
  onOpenDetails,
  searchQuery,
  setSearchQuery
}) => {
  const [selectedSizeFilter, setSelectedSizeFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category check
        if (activeCategory !== 'all' && p.category !== activeCategory) {
          return false;
        }
        // Size check
        if (selectedSizeFilter !== 'all') {
          const hasSize = p.availableSizes.some((s) =>
            s.toLowerCase().includes(selectedSizeFilter.toLowerCase())
          );
          if (!hasSize) return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = p.name.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchMaterial = p.material.toLowerCase().includes(q);
          const matchOrigin = p.origin.toLowerCase().includes(q);
          const matchCat = p.category.toLowerCase().includes(q);
          return matchName || matchDesc || matchMaterial || matchOrigin || matchCat;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'weight-desc') return (b.weightGsm || 0) - (a.weightGsm || 0);
        return 0; // featured maintains baseline catalog order
      });
  }, [products, activeCategory, selectedSizeFilter, searchQuery, sortBy]);

  const counts = useMemo(() => {
    return {
      all: products.length,
      shirts: products.filter((p) => p.category === 'shirts').length,
      coats: products.filter((p) => p.category === 'coats').length,
      hats: products.filter((p) => p.category === 'hats').length
    };
  }, [products]);

  return (
    <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-neutral-200">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">
            The Atelier Archive
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950">
            {activeCategory === 'all'
              ? 'All Merchandise'
              : activeCategory === 'shirts'
              ? 'Heavyweight & Interlock Shirts'
              : activeCategory === 'coats'
              ? 'Tailored Wool & Technical Coats'
              : 'Structured Felt Caps & Beanies'}
          </h2>
          <p className="text-sm text-neutral-600 mt-2 max-w-xl">
            {activeCategory === 'all'
              ? 'A cohesive wardrobe system of heavyweight tees, structured overcoats, and artisanal headwear.'
              : activeCategory === 'shirts'
              ? '340 GSM Aegean combed cotton, mocknecks, and architectural Japanese twill overshirts.'
              : activeCategory === 'coats'
              ? '680 GSM double-faced Italian virgin wool, double-breasted trenches, and bonded gabardine.'
              : 'Dense felted merino 6-panel caps, 7-gauge cashmere beanies, and heavy cotton bucket hats.'}
          </p>
        </div>

        {/* Interactive Segmented Filter Tabs: Clean functional buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-neutral-100 rounded-lg shrink-0 self-start md:self-end">
          <button
            onClick={() => onSelectCategory('all')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === 'all'
                ? 'bg-white text-neutral-950 shadow-xs font-semibold'
                : 'text-neutral-600 hover:text-neutral-950'
            }`}
          >
            All Pieces ({counts.all})
          </button>
          <button
            onClick={() => onSelectCategory('shirts')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === 'shirts'
                ? 'bg-white text-neutral-950 shadow-xs font-semibold'
                : 'text-neutral-600 hover:text-neutral-950'
            }`}
          >
            Shirts ({counts.shirts})
          </button>
          <button
            onClick={() => onSelectCategory('coats')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === 'coats'
                ? 'bg-white text-neutral-950 shadow-xs font-semibold'
                : 'text-neutral-600 hover:text-neutral-950'
            }`}
          >
            Coats ({counts.coats})
          </button>
          <button
            onClick={() => onSelectCategory('hats')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === 'hats'
                ? 'bg-white text-neutral-950 shadow-xs font-semibold'
                : 'text-neutral-600 hover:text-neutral-950'
            }`}
          >
            Hats ({counts.hats})
          </button>
        </div>
      </div>

      {/* Filter and Sorting Sub-Bar */}
      <div className="py-5 flex flex-wrap items-center justify-between gap-4 text-xs">
        {/* Left: Size filter & Active Search indicator */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-neutral-500 font-mono uppercase text-[11px]">Filter Size:</span>
          {['all', 'S', 'M', 'L', 'XL'].map((sz) => (
            <button
              key={sz}
              onClick={() => setSelectedSizeFilter(sz)}
              className={`px-2.5 py-1 rounded font-mono transition-colors cursor-pointer ${
                selectedSizeFilter === sz
                  ? 'bg-neutral-900 text-white font-bold'
                  : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200'
              }`}
            >
              {sz === 'all' ? 'All Sizes' : sz}
            </button>
          ))}

          {searchQuery && (
            <div className="flex items-center gap-1.5 bg-neutral-200/70 text-neutral-800 px-2.5 py-1 rounded text-[11px] font-mono">
              <span>Query: "{searchQuery}"</span>
              <button
                onClick={() => setSearchQuery('')}
                className="hover:text-black cursor-pointer"
                aria-label="Clear query"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        {/* Right: Sorting Select */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-3.5 h-3.5 text-neutral-500" />
          <span className="text-neutral-500 font-mono uppercase text-[11px]">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="bg-transparent font-medium text-neutral-800 border border-neutral-200 rounded px-2.5 py-1 cursor-pointer focus:outline-none hover:border-neutral-400"
          >
            <option value="featured">Featured Sequence</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="weight-desc">Fabric Weight (GSM)</option>
          </select>
        </div>
      </div>

      {/* Product Grid: 3 columns on desktop with generous whitespace */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenDetails={onOpenDetails}
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-white border border-neutral-200 rounded-lg p-8 my-6">
          <p className="text-base font-semibold text-neutral-900 mb-2">No matching pieces discovered</p>
          <p className="text-xs text-neutral-500 max-w-md mx-auto mb-6">
            We couldn't find items matching your criteria. Try adjusting your size filter, search term, or viewing all categories.
          </p>
          <button
            onClick={() => {
              onSelectCategory('all');
              setSelectedSizeFilter('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-neutral-900 text-white rounded text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
};
