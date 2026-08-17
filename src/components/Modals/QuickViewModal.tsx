import React, { useState } from 'react';
import { X, Star, ShoppingBag, ArrowRight, Check, Heart } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductSize, ProductColor } from '../../types/store';

export const QuickViewModal: React.FC = () => {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    addToCart, 
    selectProduct, 
    formatPrice,
    toggleWishlist,
    isInWishlist
  } = useStore();

  const [selectedSize, setSelectedSize] = useState<ProductSize>('M');
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const color = quickViewProduct.colors[selectedColorIdx] || quickViewProduct.colors[0];
  const isFavorite = isInWishlist(quickViewProduct.id);

  const handleAdd = () => {
    addToCart(quickViewProduct, selectedSize, color, quantity);
    setQuickViewProduct(null);
  };

  const handleViewFull = () => {
    selectProduct(quickViewProduct);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto select-none">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
        onClick={() => setQuickViewProduct(null)} 
      />

      <div className="min-h-screen px-4 flex items-center justify-center p-4">
        <div className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
          {/* Close button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-20 p-2 text-gray-400 hover:text-gray-700 bg-white/80 rounded-full hover:bg-gray-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2">
            {/* Image Preview */}
            <div className="bg-[#f8f9fa] p-8 flex items-center justify-center relative">
              <img
                src={quickViewProduct.images[0]}
                alt={quickViewProduct.title}
                className="w-full h-64 object-contain mix-blend-multiply"
              />
            </div>

            {/* Info and Actions */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[11px] font-bold text-[#1a73e8] uppercase tracking-wider">
                  {quickViewProduct.brand}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mt-1">
                  {quickViewProduct.title}
                </h3>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-xl font-extrabold text-gray-900">
                    {formatPrice(quickViewProduct.price)}
                  </span>
                  <div className="flex items-center text-xs text-amber-500 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="ml-1 text-gray-700">{quickViewProduct.rating.toFixed(1)}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                  {quickViewProduct.shortDescription}
                </p>
              </div>

              {/* Sizes Selection */}
              <div>
                <span className="text-xs font-bold text-gray-800 uppercase block mb-1.5">Size</span>
                <div className="flex flex-wrap gap-1.5">
                  {quickViewProduct.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                        selectedSize === s
                          ? 'bg-[#1a73e8] text-white border-[#1a73e8]'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleAdd}
                    className="flex-1 py-3 bg-[#1a73e8] hover:bg-[#1557b0] text-white rounded-full text-xs font-bold shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart ({formatPrice(quickViewProduct.price * quantity)})</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(quickViewProduct.id)}
                    className={`p-3 rounded-full border transition-all cursor-pointer ${
                      isFavorite 
                        ? 'border-red-200 bg-red-50 text-[#ea4335]' 
                        : 'border-gray-300 bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                    title={isFavorite ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  >
                    <Heart className={`w-4 h-4 ${isFavorite ? 'fill-[#ea4335] text-[#ea4335]' : ''}`} />
                  </button>
                </div>

                <button
                  onClick={handleViewFull}
                  className="w-full py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 flex items-center justify-center space-x-1 cursor-pointer"
                >
                  <span>View Full Product Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
