import React, { useState } from 'react';
import { Sparkles, Star, Flame, ArrowUpDown, Eye, ShoppingBag, Check } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Product } from '../../types/store';

export const ProductCarousel: React.FC = () => {
  const { products, selectProduct, setQuickViewProduct, addToCart, formatPrice } = useStore();
  const [activeFilter, setActiveFilter] = useState<'all' | 'apparel' | 'accessories' | 'bags' | 'drinkware' | 'bundles' | 'new'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating' | 'newest'>('featured');
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Per-card selected states
  const [selectedColors, setSelectedColors] = useState<Record<string, number>>({
    'nano-banana-tee': 0,
    'google-gravity-super-g-bottle': 0,
    'google-marine-layer-1998-crewneck': 0,
    'nano-banana-crewneck': 0,
  });

  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({
    'nano-banana-tee': 'XS',
    'google-marine-layer-1998-crewneck': 'S',
    'nano-banana-crewneck': 'XS',
  });

  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  // Specific 4 showcase products from the replica
  const replicaProductIds = [
    'nano-banana-tee',
    'google-gravity-super-g-bottle',
    'google-marine-layer-1998-crewneck',
    'nano-banana-crewneck',
  ];

  // Get current products based on filter
  const getFilteredProducts = () => {
    let list: Product[] = [];
    if (activeFilter === 'all') {
      const topReplicas = replicaProductIds
        .map(id => products.find(p => p.id === id))
        .filter((p): p is Product => Boolean(p));
      
      // Pad with rest of products up to 12 items
      const rest = products.filter(p => !replicaProductIds.includes(p.id));
      list = [...topReplicas, ...rest].slice(0, 12);
    } else if (activeFilter === 'apparel') {
      list = products.filter(p => p.category === 'Apparel').slice(0, 4);
    } else if (activeFilter === 'accessories') {
      list = products.filter(p => p.category === 'Accessories').slice(0, 4);
    } else if (activeFilter === 'bags') {
      list = products.filter(p => p.category === 'Bags & Packs' || p.subcategory?.includes('Bag')).slice(0, 2);
    } else if (activeFilter === 'drinkware') {
      list = products.filter(p => p.category === 'Drinkware').slice(0, 2);
    } else if (activeFilter === 'bundles') {
      list = products.filter(p => p.compareAtPrice || p.isRetro1998 || p.badge?.includes('Bundle')).slice(0, 5);
    } else if (activeFilter === 'new') {
      list = products.filter(p => p.isNew || p.id.includes('nano')).slice(0, 2);
    } else {
      list = products.slice(0, 12);
    }

    // Apply sorting
    if (sortBy === 'price-low') {
      return [...list].sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'price-high') {
      return [...list].sort((a, b) => b.price - a.price);
    }
    if (sortBy === 'rating') {
      return [...list].sort((a, b) => b.rating - a.rating);
    }
    if (sortBy === 'newest') {
      return [...list].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }
    return list;
  };

  const displayProducts = getFilteredProducts();

  const handleColorSelect = (productId: string, colorIdx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedColors(prev => ({ ...prev, [productId]: colorIdx }));
  };

  const handleSizeSelect = (productId: string, size: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
  };

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    const colorIdx = selectedColors[product.id] || 0;
    const color = product.colors[colorIdx] || product.colors[0];
    const size = selectedSizes[product.id] || product.sizes[0] || 'One Size';

    addToCart(product, size, color, 1);

    setAddedItems(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  const filterTabs = [
    { id: 'all', label: 'All Items', count: 12 },
    { id: 'apparel', label: 'Apparel', count: 4 },
    { id: 'accessories', label: 'Accessories', count: 4 },
    { id: 'bags', label: 'Bags & Packs', count: 2 },
    { id: 'drinkware', label: 'Drinkware', count: 2 },
    { id: 'bundles', label: 'Bundle Deals', count: 5, icon: 'percent' },
    { id: 'new', label: 'New In', count: 2, icon: 'flame' },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Top Filter and Sorting Toolbar */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-100">
        {/* Filter Pills */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 xl:pb-0 scrollbar-none">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`inline-flex items-center space-x-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#111827] text-white shadow-xs'
                    : 'bg-[#f1f3f4] text-[#3c4043] hover:bg-gray-200'
                }`}
              >
                {tab.icon === 'percent' && <span className="text-[#ea8600] font-bold text-xs">%</span>}
                {tab.icon === 'flame' && <Flame className="w-3.5 h-3.5 text-[#ea4335] fill-[#ea4335]" />}
                <span>{tab.label}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-full font-medium ${
                    isActive ? 'bg-white/20 text-white' : 'bg-transparent text-gray-500'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Toolbar Count & Sort */}
        <div className="flex items-center justify-between xl:justify-end gap-5 text-sm text-gray-600 shrink-0">
          <div>
            Showing <span className="font-bold text-gray-900">{activeFilter === 'all' ? '12' : displayProducts.length}</span> items
          </div>

          <div className="relative">
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="inline-flex items-center space-x-2 bg-white border border-gray-200 hover:border-gray-300 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium text-gray-700 hover:text-black shadow-2xs transition-colors cursor-pointer"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-gray-500" />
              <span>
                {sortBy === 'featured' && 'Featured First'}
                {sortBy === 'price-low' && 'Price: Low to High'}
                {sortBy === 'price-high' && 'Price: High to Low'}
                {sortBy === 'rating' && 'Highest Rated'}
                {sortBy === 'newest' && 'Newest Arrivals'}
              </span>
              <span className="text-gray-400 text-xs">▼</span>
            </button>

            {isSortOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-44 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-40">
                {[
                  { id: 'featured', label: 'Featured First' },
                  { id: 'price-low', label: 'Price: Low to High' },
                  { id: 'price-high', label: 'Price: High to Low' },
                  { id: 'rating', label: 'Highest Rated' },
                  { id: 'newest', label: 'Newest Arrivals' },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => {
                      setSortBy(option.id as any);
                      setIsSortOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs transition-colors cursor-pointer ${
                      sortBy === option.id
                        ? 'bg-blue-50 text-[#1a73e8] font-bold'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4-Column Clean Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
        {displayProducts.slice(0, 4).map((product) => {
          const isAdded = addedItems[product.id] || false;
          const selectedColorIdx = selectedColors[product.id] || 0;
          const selectedSize = selectedSizes[product.id] || (product.sizes?.[0] || 'XS');

          // Custom badges matching screenshot exactly
          let badgeElement = null;
          if (product.id === 'nano-banana-tee' || product.badge === 'Most Loved') {
            badgeElement = (
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#ea8600] text-white shadow-xs">
                Most Loved
              </span>
            );
          } else if (product.id === 'google-gravity-super-g-bottle' || product.badge === 'Bundle 15% Off') {
            badgeElement = (
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#1a73e8] text-white shadow-xs flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-white" />
                <span>Bundle 15% Off</span>
              </span>
            );
          } else if (product.id === 'google-marine-layer-1998-crewneck' || product.badge === 'Best Seller') {
            badgeElement = (
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#ea8600] text-white shadow-xs">
                Best Seller
              </span>
            );
          } else if (product.id === 'nano-banana-crewneck' || product.badge === 'New' || product.isNew) {
            badgeElement = (
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#ea4335] text-white shadow-xs">
                New
              </span>
            );
          }

          const isTitleBlue = product.id === 'google-marine-layer-1998-crewneck';

          return (
            <div
              key={product.id}
              onClick={() => selectProduct(product)}
              className="group bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
            >
              {/* Card Image Area */}
              <div className="relative aspect-4/3.8 bg-[#f0f2f5] p-5 flex items-center justify-center overflow-hidden">
                {/* Top Left Badge */}
                {badgeElement && (
                  <div className="absolute top-4 left-4 z-20">
                    {badgeElement}
                  </div>
                )}

                {/* Quick View Button on Hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20 bg-black/5 backdrop-blur-[1px]">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setQuickViewProduct(product);
                    }}
                    className="bg-white/95 hover:bg-white text-gray-900 text-xs font-semibold py-2 px-4 rounded-full shadow-lg flex items-center space-x-1.5 transition-transform hover:scale-105 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-gray-700" />
                    <span>Quick View</span>
                  </button>
                </div>

                {/* Product Image */}
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between space-y-4">
                <div className="space-y-2">
                  {/* Category & Rating Row */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold tracking-wider text-[#5f6368] uppercase text-[11px]">
                      {product.category}
                    </span>
                    <div className="flex items-center space-x-1 font-bold text-[#f59e0b]">
                      <Star className="w-3.5 h-3.5 fill-[#fbbc05] text-[#fbbc05]" />
                      <span>{product.rating.toFixed(1)}</span>
                      <span className="text-gray-400 font-normal">({product.reviewCount})</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className={`text-base font-bold truncate transition-colors ${
                      isTitleBlue ? 'text-[#1a73e8] hover:underline' : 'text-[#202124] hover:text-[#1a73e8]'
                    }`}
                    title={product.title}
                  >
                    {product.id === 'google-marine-layer-1998-crewneck'
                      ? 'Google Marine Layer 1998...'
                      : product.id === 'nano-banana-crewneck'
                      ? 'Nano Banana Crewneck...'
                      : product.title}
                  </h3>

                  {/* Price Row */}
                  <div className="flex items-center flex-wrap gap-2 pt-0.5">
                    <span className="text-xl font-bold text-[#202124]">
                      {formatPrice(product.price)}
                    </span>
                    {product.compareAtPrice && (
                      <span className="text-sm text-gray-400 line-through font-normal">
                        {formatPrice(product.compareAtPrice)}
                      </span>
                    )}
                    {product.id === 'google-gravity-super-g-bottle' && (
                      <span className="text-[11px] font-medium bg-blue-50 text-[#1a73e8] border border-blue-100 px-2 py-0.5 rounded">
                        15% bundle deal
                      </span>
                    )}
                  </div>
                </div>

                {/* Color Swatches and Sizes */}
                <div className="space-y-3 pt-1">
                  {/* Color Swatches */}
                  <div className="flex items-center space-x-2">
                    {product.colors.map((color, idx) => {
                      const isSelected = selectedColorIdx === idx;
                      return (
                        <button
                          key={color.name}
                          onClick={(e) => handleColorSelect(product.id, idx, e)}
                          className={`w-5 h-5 rounded-full border transition-all cursor-pointer ${
                            isSelected
                              ? 'ring-2 ring-[#1a73e8] ring-offset-2 scale-105 border-transparent'
                              : 'border-gray-300 hover:scale-110'
                          }`}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        />
                      );
                    })}
                  </div>

                  {/* Size Buttons (if applicable) */}
                  {product.sizes && product.sizes.length > 1 && (
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {product.sizes.map((size) => {
                        const isSelected = selectedSize === size;
                        return (
                          <button
                            key={size}
                            onClick={(e) => handleSizeSelect(product.id, size, e)}
                            className={`px-2.5 py-1 rounded text-xs font-bold transition-colors cursor-pointer ${
                              isSelected
                                ? 'bg-[#111827] text-white shadow-xs'
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                            }`}
                          >
                            {size}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Add to Cart CTA */}
                <button
                  onClick={(e) => handleAddToCart(product, e)}
                  className={`w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-xs hover:shadow-md ${
                    isAdded
                      ? 'bg-[#34a853] text-white'
                      : 'bg-[#0f172a] hover:bg-black text-white'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Cart</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

