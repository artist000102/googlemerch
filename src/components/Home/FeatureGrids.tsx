import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductCategory } from '../../types/store';
import { ProductCarousel } from './ProductCarousel';

import androidPlushImg from '../../assets/images/regenerated_image_1787093165631.png';
import youtubeKidsImg from '../../assets/images/regenerated_image_1787093170351.png';
import luckySocksImg from '../../assets/images/regenerated_image_1787093173957.png';

export const FeatureGrids: React.FC = () => {
  const { setCategory, selectProduct, products, formatPrice } = useStore();

  const handleCardClick = (category: ProductCategory, subcategory?: string, productId?: string) => {
    if (productId) {
      const prod = products.find(p => p.id === productId);
      if (prod) {
        selectProduct(prod);
        return;
      }
    }
    setCategory(category, subcategory);
  };

  return (
    <div className="space-y-20 py-8">
      {/* Product Carousel Section: Featured Catalog / Best Sellers right below Hero section */}
      <ProductCarousel />

      {/* Exact Match: Shop Trending Collections Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-[40px] font-bold text-[#3c4043] text-center mb-10 tracking-tight font-['Roboto',sans-serif]">
          Shop Trending Collections
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Card 1: Snuggle Mode On */}
          <div 
            onClick={() => handleCardClick('Accessories', 'Plush & Toys', 'snuggle-mode-android-plush-bot')}
            className="group relative bg-[#eaeceb] rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between pt-10 px-6 sm:px-8 pb-0 min-h-[520px]"
          >
            <div className="flex flex-col items-center text-center">
              <h3 className="text-2xl sm:text-[28px] font-bold text-[#202124] tracking-tight">
                Snuggle Mode On
              </h3>
              <p className="text-sm sm:text-base text-[#5f6368] mt-2 font-normal">
                Tested for Maximum Cuteness
              </p>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleCardClick('Accessories', 'Plush & Toys', 'snuggle-mode-android-plush-bot');
                }}
                className="mt-5 border border-black text-black bg-transparent hover:bg-black hover:text-white px-5 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors cursor-pointer select-none"
              >
                Shop Android
              </button>
            </div>

            <div className="w-full flex items-end justify-center mt-6 overflow-hidden h-[280px] sm:h-[320px]">
              <img
                src={androidPlushImg}
                alt="Snuggle Mode On - Android Plush"
                className="w-full h-full object-contain object-bottom group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Card 2: YouTube Kids */}
          <div 
            onClick={() => handleCardClick('Apparel', 'Kids Apparel', 'youtube-kids-creator-youth-hoodie')}
            className="group relative bg-[#eaeceb] rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between pt-10 px-6 sm:px-8 pb-0 min-h-[520px]"
          >
            <div className="flex flex-col items-center text-center">
              <h3 className="text-2xl sm:text-[28px] font-bold text-[#202124] tracking-tight">
                YouTube Kids
              </h3>
              <p className="text-sm sm:text-base text-[#5f6368] mt-2 font-normal">
                Color, Create, Play
              </p>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleCardClick('Apparel', 'Kids Apparel', 'youtube-kids-creator-youth-hoodie');
                }}
                className="mt-5 border border-black text-black bg-transparent hover:bg-black hover:text-white px-5 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors cursor-pointer select-none"
              >
                Shop YouTube
              </button>
            </div>

            <div className="w-full flex items-end justify-center mt-6 overflow-hidden h-[280px] sm:h-[320px]">
              <img
                src={youtubeKidsImg}
                alt="YouTube Kids Coloring Kit"
                className="w-full h-full object-contain object-bottom group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Card 3: The Lucky Socks */}
          <div 
            onClick={() => handleCardClick('Accessories', 'Socks', 'the-lucky-socks-google-colorway-pack')}
            className="group relative bg-[#eaeceb] rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between pt-10 px-6 sm:px-8 pb-0 min-h-[520px]"
          >
            <div className="flex flex-col items-center text-center">
              <h3 className="text-2xl sm:text-[28px] font-bold text-[#202124] tracking-tight">
                The Lucky Socks
              </h3>
              <p className="text-sm sm:text-base text-[#5f6368] mt-2 font-normal">
                Elevate your everyday stride
              </p>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleCardClick('Accessories', 'Socks', 'the-lucky-socks-google-colorway-pack');
                }}
                className="mt-5 border border-black text-black bg-transparent hover:bg-black hover:text-white px-5 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors cursor-pointer select-none"
              >
                Shop Socks
              </button>
            </div>

            <div className="w-full flex items-end justify-center mt-6 overflow-hidden h-[280px] sm:h-[320px]">
              <img
                src={luckySocksImg}
                alt="The Lucky Socks"
                className="w-full h-full object-contain object-bottom group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3-Column Grid: Sunny Sips, Mix Match Patch, Blank Pages Bold Ideas */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Card 1: Sunny Sips */}
          <div 
            onClick={() => handleCardClick('Drinkware', 'Bottles & Tumblers', 'google-sunny-sips-insulated-tumbler')}
            className="group relative bg-[#f8f9fa] rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div className="p-8 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#ea4335] bg-red-50 px-2.5 py-1 rounded-full">
                Drinkware
              </span>
              <h3 className="text-2xl font-bold text-[#202124] mt-3 group-hover:text-[#1a73e8] transition-colors">
                Sunny Sips
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                Double-wall vacuum insulated bottles and bright tumblers built to keep beverages crisp all day.
              </p>
            </div>

            <div className="px-6 pb-6 pt-2">
              <div className="aspect-4/3 rounded-xl overflow-hidden bg-white">
                <img
                  src="https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=800&q=80"
                  alt="Sunny Sips Drinkware"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm font-semibold text-[#1a73e8] group-hover:underline flex items-center space-x-1">
                  <span>Shop Drinkware</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="text-xs font-bold text-gray-500">From {formatPrice(18.00)}</span>
              </div>
            </div>
          </div>

          {/* Card 2: Mix, Match, Patch */}
          <div 
            onClick={() => handleCardClick('Accessories', 'Pins & Patches', 'mix-match-patch-enamel-pin-set')}
            className="group relative bg-[#f8f9fa] rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div className="p-8 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#4285f4] bg-blue-50 px-2.5 py-1 rounded-full">
                Accessories
              </span>
              <h3 className="text-2xl font-bold text-[#202124] mt-3 group-hover:text-[#1a73e8] transition-colors">
                Mix, Match, Patch
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                Hard enamel pins, embroidered badges, and playful sticker sets to customize your tech carry.
              </p>
            </div>

            <div className="px-6 pb-6 pt-2">
              <div className="aspect-4/3 rounded-xl overflow-hidden bg-white">
                <img
                  src="https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=800&q=80"
                  alt="Mix Match Patch Pins"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm font-semibold text-[#1a73e8] group-hover:underline flex items-center space-x-1">
                  <span>Shop Patches & Pins</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="text-xs font-bold text-gray-500">From {formatPrice(22.00)}</span>
              </div>
            </div>
          </div>

          {/* Card 3: Blank Pages, Bold Ideas */}
          <div 
            onClick={() => handleCardClick('Stationery', 'Journals & Pens', 'blank-pages-bold-ideas-journal')}
            className="group relative bg-[#f8f9fa] rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div className="p-8 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#34a853] bg-green-50 px-2.5 py-1 rounded-full">
                Stationery
              </span>
              <h3 className="text-2xl font-bold text-[#202124] mt-3 group-hover:text-[#1a73e8] transition-colors">
                Blank Pages, Bold Ideas
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                FSC-certified dot grid journals, bamboo stylus pens, and desk companions for your brightest thoughts.
              </p>
            </div>

            <div className="px-6 pb-6 pt-2">
              <div className="aspect-4/3 rounded-xl overflow-hidden bg-white">
                <img
                  src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80"
                  alt="Blank Pages Bold Ideas Stationery"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm font-semibold text-[#1a73e8] group-hover:underline flex items-center space-x-1">
                  <span>Shop Stationery</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="text-xs font-bold text-gray-500">From {formatPrice(14.00)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2-Column Split Grid: Top It Off & Jump it out! */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Card 1: Top It Off */}
          <div 
            onClick={() => handleCardClick('Accessories', 'Hats & Headwear', 'top-it-off-google-vintage-corduroy-cap')}
            className="group relative bg-[#f8f9fa] rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer p-8 flex flex-col justify-between"
          >
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#fbbc05] bg-amber-50 px-2.5 py-1 rounded-full">
                Headwear Collection
              </span>
              <h3 className="text-3xl font-extrabold text-[#202124] mt-3 group-hover:text-[#1a73e8] transition-colors">
                Top It Off
              </h3>
              <p className="text-base text-gray-600 mt-2 max-w-md">
                Vintage wide-wale corduroy dad caps, retro bucket hats, and cozy winter beanies.
              </p>
            </div>

            <div className="mt-6">
              <div className="aspect-16/9 rounded-xl overflow-hidden bg-white mb-4">
                <img
                  src="https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1000&q=80"
                  alt="Top It Off Caps"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[#1a73e8] group-hover:underline flex items-center space-x-1">
                  <span>Shop Headwear</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="text-sm font-bold text-gray-900">{formatPrice(28.00)}</span>
              </div>
            </div>
          </div>

          {/* Card 2: Jump it out! */}
          <div 
            onClick={() => handleCardClick('Apparel', 'T-Shirts', 'jump-it-out-cloud-athletic-tee')}
            className="group relative bg-[#f8f9fa] rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer p-8 flex flex-col justify-between"
          >
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#4285f4] bg-blue-50 px-2.5 py-1 rounded-full">
                Performance & Active
              </span>
              <h3 className="text-3xl font-extrabold text-[#202124] mt-3 group-hover:text-[#1a73e8] transition-colors">
                Jump it out!
              </h3>
              <p className="text-base text-gray-600 mt-2 max-w-md">
                AeroDry moisture-wicking training tees, lightweight athletic layers, and reflective running essentials.
              </p>
            </div>

            <div className="mt-6">
              <div className="aspect-16/9 rounded-xl overflow-hidden bg-white mb-4">
                <img
                  src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80"
                  alt="Jump it out Activewear"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[#1a73e8] group-hover:underline flex items-center space-x-1">
                  <span>Shop Activewear</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="text-sm font-bold text-gray-900">{formatPrice(34.00)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

