import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, RefreshCw, Zap } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { PRODUCTS } from '../../data/products';

export const HeroBanner: React.FC = () => {
  const { navigateTo, selectProduct, setCategory, formatPrice } = useStore();

  const heroProduct = PRODUCTS.find(p => p.id === 'google-1998-vintage-colorblock-windbreaker') || PRODUCTS[1];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f8f9fa] to-white border-b border-gray-200">
      {/* Subtle Google Colors top accent line */}
      <div className="h-1.5 w-full grid grid-cols-4">
        <div className="bg-[#4285f4]" />
        <div className="bg-[#ea4335]" />
        <div className="bg-[#fbbc05]" />
        <div className="bg-[#34a853]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline, Description & CTAs */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#1a73e8]">
              <Sparkles className="w-3.5 h-3.5 text-[#fbbc05]" />
              <span>THE 1998 HERITAGE ARCHIVE</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#202124] leading-[1.1] font-['Plus_Jakarta_Sans',sans-serif]">
              Retro Vibes in <br />
              <span className="text-[#4285f4]">Full</span>{' '}
              <span className="text-[#ea4335]">Co</span>
              <span className="text-[#fbbc05]">lo</span>
              <span className="text-[#34a853]">r.</span>
            </h1>

            <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
              Step back to 1998. Bold primary colorblocks, vintage serif wordmarks, and heavyweight organic cotton built for modern comfort.
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setCategory('Collections', 'Google 1998 Retro')}
                className="inline-flex items-center justify-center space-x-2.5 bg-[#1a73e8] hover:bg-[#1557b0] text-white px-7 py-3.5 rounded-full font-semibold text-base transition-all shadow-md hover:shadow-lg cursor-pointer group"
              >
                <span>Shop the 1998 Collection</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => setCategory('Apparel')}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-full font-semibold text-sm text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 transition-colors shadow-xs cursor-pointer"
              >
                Explore Apparel
              </button>
            </div>

            {/* Key Value Props Bar */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200 text-xs text-gray-600">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-[#34a853] shrink-0" />
                <span className="font-medium">100% Official Licensed Gear</span>
              </div>
              <div className="flex items-center space-x-2">
                <RefreshCw className="w-4 h-4 text-[#4285f4] shrink-0" />
                <span className="font-medium">Hassle-Free 30-Day Returns</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-[#fbbc05] shrink-0" />
                <span className="font-medium">Free Shipping over {formatPrice(100)}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Product Stage */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Product Card Showcase */}
              <div 
                onClick={() => selectProduct(heroProduct)}
                className="group relative bg-[#f1f3f4] rounded-2xl p-6 sm:p-8 cursor-pointer transition-all duration-300 hover:shadow-xl border border-gray-200"
              >
                {/* Floating pill badge */}
                <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-xs border border-gray-100 flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#ea4335] animate-pulse" />
                  <span>TRENDING NOW</span>
                </div>

                <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-white mb-6">
                  <img
                    src={heroProduct.images[0]}
                    alt={heroProduct.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-xs font-bold text-[#1a73e8] uppercase tracking-wider mb-1">
                      {heroProduct.brand}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#1a73e8] transition-colors">
                      {heroProduct.title}
                    </h3>
                    <div className="text-sm text-gray-500 mt-1">
                      Archival 1998 colorblocked ripstop shell
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-extrabold text-gray-900">
                      ${heroProduct.price.toFixed(2)}
                    </div>
                    <span className="text-xs text-[#34a853] font-medium">In Stock</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
