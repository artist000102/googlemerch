import React, { useState } from 'react';
import { 
  Heart, 
  ShoppingBag, 
  Star, 
  Ruler, 
  Truck, 
  RefreshCw, 
  ShieldCheck, 
  Leaf, 
  ChevronDown, 
  ChevronUp, 
  Plus, 
  Minus, 
  Check, 
  Share2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductSize, ProductColor } from '../../types/store';
import { ProductCard } from './ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { 
    selectedProduct, 
    products, 
    addToCart, 
    addBulkToCart, 
    toggleWishlist, 
    isInWishlist, 
    setIsSizeGuideOpen, 
    formatPrice, 
    navigateTo,
    showToast 
  } = useStore();

  const product = selectedProduct || products[0];

  // Gallery state
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<ProductSize>(product.sizes[0] || 'M');
  const [quantity, setQuantity] = useState<number>(1);

  // Accordion open states
  const [openDetails, setOpenDetails] = useState(true);
  const [openMaterials, setOpenMaterials] = useState(false);
  const [openShipping, setOpenShipping] = useState(false);
  const [openCare, setOpenCare] = useState(false);

  // Bundle selection
  const [includeBundleItem1, setIncludeBundleItem1] = useState(true);
  const [includeBundleItem2, setIncludeBundleItem2] = useState(true);

  // Frequently bought bundle partners
  const bundleItem1 = products.find(p => p.id === 'the-lucky-socks-google-colorway-pack') || products[2];
  const bundleItem2 = products.find(p => p.id === 'top-it-off-google-vintage-corduroy-cap') || products[3];

  const isFavorite = isInWishlist(product.id);

  // Stock for the currently selected size
  const currentStock = product.stockBySize.find(s => s.size === selectedSize)?.available ?? 10;
  const isOutOfStock = currentStock <= 0;

  // Add to cart handler
  const handleAddToCart = () => {
    if (isOutOfStock) {
      showToast({
        title: 'Item Out of Stock',
        description: `Size ${selectedSize} is currently unavailable.`,
        type: 'warning',
      });
      return;
    }

    addToCart(product, selectedSize, selectedColor, quantity);
  };

  // Bundle Add to Cart
  const handleAddBundle = () => {
    // Add primary item
    addToCart(product, 'M', selectedColor, 1);
    if (includeBundleItem1) {
      addToCart(bundleItem1, bundleItem1.sizes[0], bundleItem1.colors[0], 1);
    }
    if (includeBundleItem2) {
      addToCart(bundleItem2, bundleItem2.sizes[0], bundleItem2.colors[0], 1);
    }
    showToast({
      title: 'Bundle Added to Cart! 🎁',
      description: 'Frequently bought together bundle added with special savings.',
      type: 'success',
    });
  };

  const bundleTotal = product.price + 
    (includeBundleItem1 ? bundleItem1.price : 0) + 
    (includeBundleItem2 ? bundleItem2.price : 0);
  const bundleDiscounted = bundleTotal * 0.9; // 10% bundle discount

  // Related products
  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
    .slice(0, 4);

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb Navigation */}
      <div className="bg-[#f8f9fa] border-b border-gray-200 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center space-x-2 text-xs text-gray-500 font-medium overflow-x-auto whitespace-nowrap">
          <button onClick={() => navigateTo('home')} className="hover:text-[#1a73e8] transition-colors cursor-pointer">
            Home
          </button>
          <span>/</span>
          <button onClick={() => navigateTo('shop', null, product.category)} className="hover:text-[#1a73e8] transition-colors cursor-pointer">
            {product.category}
          </button>
          {product.subcategory && (
            <>
              <span>/</span>
              <button onClick={() => navigateTo('shop', null, product.category, product.subcategory)} className="hover:text-[#1a73e8] transition-colors cursor-pointer">
                {product.subcategory}
              </button>
            </>
          )}
          <span>/</span>
          <span className="text-gray-900 font-bold">{product.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Left Column: Multi-Image Gallery */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            {/* Thumbnail Strip */}
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto sm:w-20 shrink-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`aspect-square w-16 sm:w-20 rounded-lg overflow-hidden border-2 bg-[#f1f3f4] p-1 transition-all cursor-pointer ${
                    activeImageIdx === idx 
                      ? 'border-[#1a73e8] ring-2 ring-blue-100' 
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.title} view ${idx + 1}`}
                    className="w-full h-full object-cover mix-blend-multiply"
                  />
                </button>
              ))}
            </div>

            {/* Main Stage Image with Zoom feel */}
            <div className="flex-1 relative aspect-square sm:aspect-4/3 rounded-2xl bg-[#f8f9fa] border border-gray-200 overflow-hidden flex items-center justify-center p-6 sm:p-10 group">
              {/* Product Badges */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
                {product.badge && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#1a73e8] text-white shadow-xs">
                    {product.badge}
                  </span>
                )}
                {product.isRetro1998 && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#4285f4] text-white shadow-xs">
                    1998 HERITAGE
                  </span>
                )}
                {product.isEcoFriendly && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#34a853] text-white shadow-xs">
                    ORGANIC COTTON
                  </span>
                )}
              </div>

              {/* Wishlist Button on Image */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-4 right-4 z-10 p-3 rounded-full shadow-md transition-all cursor-pointer ${
                  isFavorite ? 'bg-red-50 text-[#ea4335]' : 'bg-white/90 text-gray-600 hover:text-[#ea4335] hover:bg-white'
                }`}
                title={isFavorite ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-[#ea4335] text-[#ea4335]' : ''}`} />
              </button>

              <img
                src={product.images[activeImageIdx] || product.images[0]}
                alt={product.title}
                className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Right Column: Product Info & Size/Quantity Matrix Table (Screenshots 11-13) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              {/* Brand & SKU */}
              <div className="flex items-center justify-between text-xs font-semibold text-gray-500 mb-1">
                <span className="text-[#1a73e8] uppercase tracking-widest font-bold">{product.brand}</span>
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-gray-400">{product.sku}</span>
                  <button
                    id="header-wishlist-toggle-btn"
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                      isFavorite 
                        ? 'bg-red-50 text-[#ea4335]' 
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-900'
                    }`}
                    title={isFavorite ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    aria-label={isFavorite ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  >
                    <Heart className={`w-4 h-4 ${isFavorite ? 'fill-[#ea4335] text-[#ea4335]' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Product Title */}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
                {product.title}
              </h1>

              {/* Price & Star Rating */}
              <div className="flex items-center justify-between mt-3 pb-3 border-b border-gray-100">
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl sm:text-3xl font-black text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  {product.compareAtPrice && (
                    <span className="text-base text-gray-400 line-through">
                      {formatPrice(product.compareAtPrice)}
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-1.5 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                  <Star className="w-4 h-4 fill-[#fbbc05] text-[#fbbc05]" />
                  <span className="text-xs font-bold text-gray-900">{product.rating.toFixed(1)}</span>
                  <span className="text-[11px] text-gray-500">({product.reviewCount} reviews)</span>
                </div>
              </div>
            </div>

            {/* Availability & Live Urgency Signal */}
            <div className="flex items-center justify-between text-xs py-1">
              <div className="flex items-center space-x-2 text-[#137333] font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-[#34a853] animate-pulse" />
                <span>In Stock & Ready to Ship</span>
              </div>
              <span className="text-gray-500">Fast carbon-neutral shipping</span>
            </div>

            {/* Short Description */}
            <p className="text-sm text-gray-600 leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Color Selection */}
            {product.colors.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Color: <span className="font-normal text-gray-600">{selectedColor.name}</span>
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`relative w-8 h-8 rounded-full border-2 transition-all cursor-pointer flex items-center justify-center ${
                        selectedColor.name === color.name
                          ? 'border-[#1a73e8] ring-2 ring-offset-2 ring-blue-200 scale-110'
                          : 'border-gray-300 hover:scale-105'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {selectedColor.name === color.name && (
                        <Check className={`w-3.5 h-3.5 ${color.hex === '#FFFFFF' || color.hex === '#F8F9FA' || color.hex === '#E5E0D8' ? 'text-gray-800' : 'text-white'}`} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection Swatches */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                  Size: <span className="font-extrabold text-[#1a73e8]">{selectedSize}</span>
                </span>
                <button
                  id="product-size-guide-btn"
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#1a73e8] hover:underline cursor-pointer"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size Chart & Fit Guide</span>
                </button>
              </div>

              {/* Swatches Grid */}
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2" id="size-swatches-container">
                {product.sizes.map((size) => {
                  const isSelected = selectedSize === size;
                  const stock = product.stockBySize.find(s => s.size === size)?.available ?? 10;
                  const isSizeOOS = stock <= 0;

                  return (
                    <button
                      key={size}
                      id={`size-swatch-${size.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={() => {
                        if (!isSizeOOS) {
                          setSelectedSize(size);
                          if (quantity > stock) setQuantity(Math.max(1, stock));
                        }
                      }}
                      disabled={isSizeOOS}
                      className={`relative py-3 px-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center border cursor-pointer select-none ${
                        isSelected
                          ? 'border-[#1a73e8] bg-blue-50/80 text-[#1a73e8] ring-2 ring-blue-500/20 shadow-xs scale-[1.02]'
                          : isSizeOOS
                          ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed opacity-50 line-through'
                          : 'border-gray-200 bg-white text-gray-800 hover:border-gray-400 hover:bg-gray-50'
                      }`}
                    >
                      <span className="font-extrabold">{size}</span>
                      {stock <= 5 && !isSizeOOS && (
                        <span className="text-[10px] text-amber-600 font-semibold tracking-tight mt-0.5">
                          {stock} left
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Selector & Add to Cart */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-gray-900 uppercase tracking-wider">Quantity</span>
                <span className={`font-semibold ${currentStock <= 5 ? 'text-amber-700' : 'text-[#137333]'}`}>
                  {isOutOfStock 
                    ? 'Currently Out of Stock' 
                    : currentStock <= 5 
                    ? `Only ${currentStock} left in size ${selectedSize}!` 
                    : `${currentStock} in stock`}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Stepper Quantity Button / Controller */}
                <div className="flex items-center justify-between border border-gray-300 rounded-full bg-white px-2 py-1.5 sm:w-36 shrink-0 shadow-xs">
                  <button
                    id="decrease-qty-btn"
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    disabled={quantity <= 1 || isOutOfStock}
                    className="w-8 h-8 rounded-full hover:bg-gray-100 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center text-gray-700 cursor-pointer transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  
                  <span className="font-bold text-gray-900 text-sm px-2 select-none" id="product-qty-value">
                    {quantity}
                  </span>
                  
                  <button
                    id="increase-qty-btn"
                    onClick={() => setQuantity(prev => Math.min(currentStock, prev + 1))}
                    disabled={quantity >= currentStock || isOutOfStock}
                    className="w-8 h-8 rounded-full hover:bg-gray-100 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center text-gray-700 cursor-pointer transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Primary Google Blue Add to Cart Button */}
                <button
                  id="add-to-cart-main-btn"
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className="flex-1 py-3.5 px-6 bg-[#1a73e8] hover:bg-[#1557b0] disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer group"
                >
                  <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <span>
                    {isOutOfStock 
                      ? 'OUT OF STOCK' 
                      : `ADD TO CART • ${formatPrice(product.price * quantity)}`}
                  </span>
                </button>

                {/* Wishlist Button in Action Row */}
                <button
                  id="add-to-wishlist-action-btn"
                  onClick={() => toggleWishlist(product.id)}
                  className={`w-12 h-12 rounded-full border transition-all flex items-center justify-center cursor-pointer shrink-0 shadow-xs ${
                    isFavorite
                      ? 'border-red-200 bg-red-50 text-[#ea4335]'
                      : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                  }`}
                  title={isFavorite ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  aria-label={isFavorite ? 'Remove from Wishlist' : 'Add to Wishlist'}
                >
                  <Heart className={`w-5 h-5 transition-transform ${isFavorite ? 'fill-[#ea4335] text-[#ea4335] scale-110' : 'text-gray-600'}`} />
                </button>
              </div>
            </div>

            {/* Product Feature Accords */}
            <div className="border-t border-gray-200 pt-4 divide-y divide-gray-200 text-xs">
              {/* Accordion 1: Details */}
              <div className="py-3">
                <button
                  onClick={() => setOpenDetails(!openDetails)}
                  className="w-full flex items-center justify-between font-bold text-gray-900 uppercase tracking-wider cursor-pointer"
                >
                  <span>Details & Materials</span>
                  {openDetails ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                </button>
                {openDetails && (
                  <div className="mt-3 space-y-2 text-gray-600 leading-relaxed">
                    <ul className="list-disc pl-4 space-y-1">
                      {product.details.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                    <p className="pt-2 font-medium text-gray-700"><strong>Fabric:</strong> {product.materials}</p>
                  </div>
                )}
              </div>

              {/* Accordion 2: Sustainability */}
              <div className="py-3">
                <button
                  onClick={() => setOpenMaterials(!openMaterials)}
                  className="w-full flex items-center justify-between font-bold text-gray-900 uppercase tracking-wider cursor-pointer"
                >
                  <span className="flex items-center space-x-1.5">
                    <Leaf className="w-3.5 h-3.5 text-[#34a853]" />
                    <span>Sustainability & Origin</span>
                  </span>
                  {openMaterials ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                </button>
                {openMaterials && (
                  <div className="mt-3 text-gray-600 leading-relaxed">
                    <p>{product.sustainabilityNote}</p>
                    <p className="mt-1">Manufactured in accordance with the Google Supplier Code of Conduct.</p>
                  </div>
                )}
              </div>

              {/* Accordion 3: Shipping & Returns */}
              <div className="py-3">
                <button
                  onClick={() => setOpenShipping(!openShipping)}
                  className="w-full flex items-center justify-between font-bold text-gray-900 uppercase tracking-wider cursor-pointer"
                >
                  <span className="flex items-center space-x-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#1a73e8]" />
                    <span>Shipping & Free Returns</span>
                  </span>
                  {openShipping ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                </button>
                {openShipping && (
                  <div className="mt-3 text-gray-600 leading-relaxed space-y-2">
                    <p>• <strong>Free standard ground shipping</strong> on orders $100 and above.</p>
                    <p>• Standard delivery: 3 to 5 business days.</p>
                    <p>• <strong>30-day risk-free return policy</strong> on unworn, unwashed items with tags attached.</p>
                  </div>
                )}
              </div>

              {/* Accordion 4: Care Instructions */}
              <div className="py-3">
                <button
                  onClick={() => setOpenCare(!openCare)}
                  className="w-full flex items-center justify-between font-bold text-gray-900 uppercase tracking-wider cursor-pointer"
                >
                  <span>Care Instructions</span>
                  {openCare ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                </button>
                {openCare && (
                  <div className="mt-3 text-gray-600 leading-relaxed">
                    <p>{product.careInstructions}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Frequently Bought Together Bundle Builder Section */}
        <section className="mt-16 bg-[#f8f9fa] rounded-3xl p-6 sm:p-10 border border-gray-200">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-2 text-xs font-bold text-[#1a73e8] uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-[#fbbc05]" />
              <span>FREQUENTLY BOUGHT TOGETHER</span>
            </div>
            <h3 className="text-2xl font-extrabold text-gray-900 mb-6">
              Complete the Google Heritage Look & Save 10%
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* 3 Bundle Items Stage */}
              <div className="md:col-span-8 flex flex-wrap sm:flex-nowrap items-center gap-4">
                {/* Main Product */}
                <div className="flex-1 bg-white p-3 rounded-xl border border-gray-200 text-center shadow-xs">
                  <img src={product.images[0]} alt={product.title} className="w-20 h-20 object-contain mx-auto mix-blend-multiply" />
                  <div className="text-xs font-bold text-gray-900 mt-2 truncate">{product.title}</div>
                  <div className="text-xs font-semibold text-[#1a73e8]">{formatPrice(product.price)}</div>
                </div>

                <span className="text-gray-400 font-bold text-lg">+</span>

                {/* Bundle Item 1 */}
                <div className="flex-1 bg-white p-3 rounded-xl border border-gray-200 text-center shadow-xs">
                  <img src={bundleItem1.images[0]} alt={bundleItem1.title} className="w-20 h-20 object-contain mx-auto mix-blend-multiply" />
                  <div className="text-xs font-bold text-gray-900 mt-2 truncate">{bundleItem1.title}</div>
                  <div className="text-xs font-semibold text-[#1a73e8]">{formatPrice(bundleItem1.price)}</div>
                  <label className="flex items-center justify-center space-x-1.5 mt-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeBundleItem1}
                      onChange={(e) => setIncludeBundleItem1(e.target.checked)}
                      className="rounded text-[#1a73e8] w-3.5 h-3.5"
                    />
                    <span className="text-[10px] font-semibold text-gray-600">Include</span>
                  </label>
                </div>

                <span className="text-gray-400 font-bold text-lg">+</span>

                {/* Bundle Item 2 */}
                <div className="flex-1 bg-white p-3 rounded-xl border border-gray-200 text-center shadow-xs">
                  <img src={bundleItem2.images[0]} alt={bundleItem2.title} className="w-20 h-20 object-contain mx-auto mix-blend-multiply" />
                  <div className="text-xs font-bold text-gray-900 mt-2 truncate">{bundleItem2.title}</div>
                  <div className="text-xs font-semibold text-[#1a73e8]">{formatPrice(bundleItem2.price)}</div>
                  <label className="flex items-center justify-center space-x-1.5 mt-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeBundleItem2}
                      onChange={(e) => setIncludeBundleItem2(e.target.checked)}
                      className="rounded text-[#1a73e8] w-3.5 h-3.5"
                    />
                    <span className="text-[10px] font-semibold text-gray-600">Include</span>
                  </label>
                </div>
              </div>

              {/* Bundle Action */}
              <div className="md:col-span-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                <div>
                  <div className="text-xs text-gray-500 font-medium">Bundle Price:</div>
                  <div className="flex items-baseline space-x-2 mt-1">
                    <span className="text-2xl font-black text-gray-900">{formatPrice(bundleDiscounted)}</span>
                    <span className="text-sm text-gray-400 line-through">{formatPrice(bundleTotal)}</span>
                  </div>
                  <div className="text-[11px] font-bold text-[#137333] mt-1">
                    You save {formatPrice(bundleTotal - bundleDiscounted)} (10% Bundle Discount)
                  </div>
                </div>

                <button
                  onClick={handleAddBundle}
                  className="w-full py-3 bg-[#1a73e8] hover:bg-[#1557b0] text-white rounded-full text-xs font-bold shadow-md transition-all cursor-pointer flex items-center justify-center space-x-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add All to Cart</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Customer Verified Reviews Section */}
        <section className="mt-16 pt-12 border-t border-gray-200">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                  Customer Reviews
                </h3>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="flex text-[#fbbc05]">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-gray-900">{product.rating.toFixed(1)} out of 5</span>
                  <span className="text-xs text-gray-500">({product.reviewCount} total ratings)</span>
                </div>
              </div>

              <button
                onClick={() => showToast({ title: 'Review Form', description: 'Write a review feature opened for verified Google Store customers.', type: 'info' })}
                className="px-5 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 rounded-full text-xs font-bold text-gray-800 transition-colors shadow-xs cursor-pointer"
              >
                Write a Review
              </button>
            </div>

            {/* Individual Reviews List */}
            <div className="space-y-4">
              {(product.reviews || [
                {
                  id: 'default-1',
                  author: 'Alex G.',
                  location: 'Mountain View, CA',
                  rating: 5,
                  date: 'August 12, 2026',
                  title: 'Top notch quality and super comfortable',
                  comment: 'Wore this all week at Google I/O and got endless compliments. Super warm and pre-shrunk perfectly.',
                  verified: true,
                  sizePurchased: 'L',
                  fitFeedback: 'True to size'
                }
              ]).map((review) => (
                <div key={review.id} className="bg-[#f8f9fa] rounded-2xl p-6 border border-gray-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-[#1a73e8] text-white text-xs font-bold flex items-center justify-center">
                        {review.author.charAt(0)}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-gray-900">{review.author}</div>
                        <div className="text-[10px] text-gray-400">{review.location}</div>
                      </div>
                    </div>
                    <div className="text-[11px] text-gray-500">{review.date}</div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="flex text-[#fbbc05]">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    {review.verified && (
                      <span className="inline-flex items-center space-x-1 text-[10px] font-bold text-[#137333] bg-green-50 px-2 py-0.5 rounded">
                        <Check className="w-3 h-3" />
                        <span>Verified Buyer</span>
                      </span>
                    )}
                    {review.fitFeedback && (
                      <span className="text-[10px] text-gray-500 bg-gray-200 px-2 py-0.5 rounded">
                        Fit: {review.fitFeedback}
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm font-bold text-gray-900">{review.title}</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* You May Also Like Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 pt-12 border-t border-gray-200">
            <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-8">
              You May Also Like
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relProduct) => (
                <ProductCard key={relProduct.id} product={relProduct} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
