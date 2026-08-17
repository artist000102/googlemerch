import React from 'react';
import { Heart, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../Product/ProductCard';

export const WishlistPage: React.FC = () => {
  const { wishlist, products, toggleWishlist, addToCart, navigateTo, formatPrice } = useStore();

  const savedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="bg-[#f8f9fa] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-xs mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-[#ea4335] uppercase tracking-wider mb-1">
              <Heart className="w-3.5 h-3.5 fill-[#ea4335]" />
              <span>SAVED ITEMS</span>
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
              My Wishlist ({savedProducts.length})
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Items saved to your personal collection will remain saved in this browser.
            </p>
          </div>

          {savedProducts.length > 0 && (
            <button
              onClick={() => {
                savedProducts.forEach((p) => addToCart(p, p.sizes[0] || 'One Size', p.colors[0], 1));
              }}
              className="px-6 py-3 bg-[#1a73e8] hover:bg-[#1557b0] text-white rounded-full text-xs font-bold transition-all shadow-md cursor-pointer flex items-center justify-center space-x-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Move All to Cart</span>
            </button>
          )}
        </div>

        {/* Wishlist Grid */}
        {savedProducts.length === 0 ? (
          <div className="bg-white rounded-2xl p-16 text-center border border-gray-200 space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 bg-red-50 text-[#ea4335] rounded-full flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Your Wishlist is Empty</h3>
            <p className="text-xs text-gray-500">
              Explore the Google 1998 Retro collection and click the heart icon on any item to save it for later.
            </p>
            <button
              onClick={() => navigateTo('shop')}
              className="px-6 py-2.5 bg-[#1a73e8] hover:bg-[#1557b0] text-white text-xs font-bold rounded-full transition-colors cursor-pointer inline-flex items-center space-x-1.5"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {savedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
