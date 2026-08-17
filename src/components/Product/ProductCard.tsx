import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Star, Check } from 'lucide-react';
import { Product } from '../../types/store';
import { useStore } from '../../context/StoreContext';

interface ProductCardProps {
  product: Product;
  showQuickActions?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  showQuickActions = true 
}) => {
  const { 
    selectProduct, 
    toggleWishlist, 
    isInWishlist, 
    addToCart, 
    setQuickViewProduct,
    formatPrice 
  } = useStore();

  const [isHovered, setIsHovered] = useState(false);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [justAdded, setJustAdded] = useState(false);

  const isFavorite = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(
      product, 
      product.sizes[0] || 'One Size', 
      product.colors[selectedColorIdx] || product.colors[0], 
      1
    );
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      onClick={() => selectProduct(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col bg-white rounded-xl overflow-hidden cursor-pointer transition-all duration-200"
    >
      {/* Product Image Stage */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-[#f1f3f4] p-4 flex items-center justify-center">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
          {product.isRetro1998 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#4285f4] text-white shadow-xs">
              1998 RETRO
            </span>
          )}
          {product.isBestSeller && !product.isRetro1998 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#202124] text-white shadow-xs">
              BEST SELLER
            </span>
          )}
          {product.isEcoFriendly && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#34a853] text-white shadow-xs">
              ECO
            </span>
          )}
          {product.compareAtPrice && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#ea4335] text-white shadow-xs">
              SAVE ${(product.compareAtPrice - product.price).toFixed(0)}
            </span>
          )}
        </div>

        {/* Top Right Wishlist Heart */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-3 right-3 z-20 p-2 rounded-full transition-all duration-200 cursor-pointer shadow-xs ${
            isFavorite 
              ? 'bg-red-50 text-[#ea4335]' 
              : 'bg-white/90 text-gray-500 hover:text-[#ea4335] hover:bg-white'
          }`}
          title={isFavorite ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-[#ea4335] text-[#ea4335]' : ''}`} />
        </button>

        {/* Primary and Secondary Hover Image */}
        <img
          src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
          alt={product.title}
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
        />

        {/* Quick Action Floating Bar on Hover */}
        {showQuickActions && (
          <div className="absolute inset-x-3 bottom-3 z-10 hidden sm:flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={handleQuickView}
              className="flex-1 py-2 px-3 bg-white/95 hover:bg-white text-gray-800 rounded-lg text-xs font-semibold shadow-md hover:shadow-lg flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-gray-600" />
              <span>Quick View</span>
            </button>
            <button
              onClick={handleQuickAdd}
              className={`p-2 rounded-lg text-xs font-semibold shadow-md transition-all cursor-pointer flex items-center justify-center ${
                justAdded 
                  ? 'bg-[#34a853] text-white' 
                  : 'bg-[#1a73e8] hover:bg-[#1557b0] text-white'
              }`}
              title="Quick Add to Cart"
            >
              {justAdded ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
            </button>
          </div>
        )}
      </div>

      {/* Product Details info */}
      <div className="pt-3 pb-1 flex flex-col flex-1">
        {/* Brand & Item Type */}
        <div className="flex items-center justify-between text-[11px] text-gray-500 font-medium mb-1">
          <span className="text-[#1a73e8] font-semibold uppercase tracking-wider">{product.brand}</span>
          <span className="text-gray-400">{product.itemType}</span>
        </div>

        {/* Title */}
        <h4 className="text-sm font-semibold text-gray-900 group-hover:text-[#1a73e8] transition-colors line-clamp-1 mb-1">
          {product.title}
        </h4>

        {/* Rating and Color Swatches */}
        <div className="flex items-center justify-between mt-auto pt-1">
          {/* Price */}
          <div className="flex items-baseline space-x-1.5">
            <span className="text-base font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-xs text-gray-400 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          {/* Star Rating */}
          <div className="flex items-center space-x-1 text-xs text-gray-600">
            <Star className="w-3.5 h-3.5 fill-[#fbbc05] text-[#fbbc05]" />
            <span className="font-semibold">{product.rating.toFixed(1)}</span>
            <span className="text-gray-400 text-[10px]">({product.reviewCount})</span>
          </div>
        </div>

        {/* Color swatches if multiple */}
        {product.colors.length > 1 && (
          <div className="flex items-center space-x-1 mt-2 pt-1 border-t border-gray-100" onClick={(e) => e.stopPropagation()}>
            {product.colors.map((color, idx) => (
              <button
                key={color.name}
                onClick={() => setSelectedColorIdx(idx)}
                style={{ backgroundColor: color.hex }}
                className={`w-3.5 h-3.5 rounded-full border border-gray-300 transition-transform ${
                  selectedColorIdx === idx ? 'ring-2 ring-offset-1 ring-[#1a73e8] scale-110' : 'hover:scale-105'
                }`}
                title={color.name}
              />
            ))}
            <span className="text-[10px] text-gray-400 ml-1">
              +{product.colors.length} {product.colors.length === 1 ? 'color' : 'colors'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
