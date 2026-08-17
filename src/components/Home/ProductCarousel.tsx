import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../Product/ProductCard';

export const ProductCarousel: React.FC = () => {
  const { products, setCategory } = useStore();
  const [activeTab, setActiveTab] = useState<'trending' | 'retro' | 'eco' | 'kids'>('trending');
  const scrollRef = useRef<HTMLDivElement>(null);

  const filterProducts = () => {
    switch (activeTab) {
      case 'retro':
        return products.filter((p) => p.isRetro1998 || p.brand === 'Google 1998');
      case 'eco':
        return products.filter((p) => p.isEcoFriendly);
      case 'kids':
        return products.filter((p) => p.isKids || p.brand === 'YouTube' || p.brand === 'Chrome');
      case 'trending':
      default:
        return products.filter((p) => p.isBestSeller || p.isNew);
    }
  };

  const currentProducts = filterProducts();

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header and Filter Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-gray-200 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-[#1a73e8] uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#fbbc05]" />
            <span>Featured Catalog</span>
          </div>
          <h2 className="text-3xl font-extrabold text-[#202124] tracking-tight">
            Best Sellers & New In
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => setActiveTab('trending')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'trending'
                ? 'bg-[#202124] text-white shadow-xs'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Trending Top Picks
          </button>
          <button
            onClick={() => setActiveTab('retro')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'retro'
                ? 'bg-[#1a73e8] text-white shadow-xs'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            1998 Retro Archive
          </button>
          <button
            onClick={() => setActiveTab('eco')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'eco'
                ? 'bg-[#34a853] text-white shadow-xs'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Eco-Friendly
          </button>
          <button
            onClick={() => setActiveTab('kids')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'kids'
                ? 'bg-[#ea4335] text-white shadow-xs'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Kids & Plush
          </button>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative group/carousel">
        {/* Navigation arrows */}
        <button
          onClick={() => handleScroll('left')}
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/95 border border-gray-200 shadow-lg text-gray-700 hover:text-black hover:bg-white flex items-center justify-center transition-all opacity-0 group-hover/carousel:opacity-100 cursor-pointer"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={() => handleScroll('right')}
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/95 border border-gray-200 shadow-lg text-gray-700 hover:text-black hover:bg-white flex items-center justify-center transition-all opacity-0 group-hover/carousel:opacity-100 cursor-pointer"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Scrollable Products Row */}
        <div
          ref={scrollRef}
          className="flex space-x-6 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="w-[260px] sm:w-[280px] shrink-0 snap-start"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* View All Button */}
      <div className="text-center mt-8">
        <button
          onClick={() => setCategory('All')}
          className="inline-flex items-center space-x-2 text-sm font-bold text-[#1a73e8] hover:text-[#1557b0] hover:underline cursor-pointer"
        >
          <span>Explore all {products.length} Google merchandise products</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
