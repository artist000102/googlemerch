import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Tag, 
  Truck 
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    removeFromCart, 
    updateQuantity, 
    cartSubtotal, 
    cartDiscount, 
    cartShippingPrice, 
    cartGrandTotal, 
    freeShippingThreshold, 
    freeShippingRemaining, 
    appliedPromo, 
    applyPromoCode, 
    removePromoCode, 
    formatPrice, 
    navigateTo 
  } = useStore();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError(null);
    if (!promoInput.trim()) return;

    const result = applyPromoCode(promoInput);
    if (!result.success) {
      setPromoError(result.message);
    } else {
      setPromoInput('');
    }
  };

  const freeShippingPercentage = Math.min(100, Math.round(((freeShippingThreshold - freeShippingRemaining) / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-5 border-b border-gray-200 flex items-center justify-between bg-[#f8f9fa]">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-[#1a73e8]" />
              <h2 className="text-lg font-bold text-gray-900">
                Shopping Cart ({cart.reduce((sum, i) => sum + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-200 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="bg-blue-50/60 p-3.5 border-b border-blue-100">
            <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
              <span className="flex items-center space-x-1.5 text-gray-700">
                <Truck className="w-3.5 h-3.5 text-[#1a73e8]" />
                {freeShippingRemaining > 0 ? (
                  <span>Add <strong className="text-[#1a73e8]">{formatPrice(freeShippingRemaining)}</strong> more for <strong>FREE Shipping</strong>!</span>
                ) : (
                  <span className="text-[#137333] font-bold">🎉 You have unlocked FREE Standard Shipping!</span>
                )}
              </span>
              <span className="text-gray-500">{freeShippingPercentage}%</span>
            </div>
            <div className="w-full h-2 bg-blue-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#1a73e8] transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingPercentage}%` }}
              />
            </div>
          </div>

          {/* Cart Item Rows */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-gray-100">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Your cart is empty</h3>
                <p className="text-xs text-gray-500 max-w-xs">
                  Discover official Google 1998 apparel, tech accessories, and drinkware.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateTo('shop');
                  }}
                  className="px-6 py-2.5 bg-[#1a73e8] hover:bg-[#1557b0] text-white text-xs font-bold rounded-full transition-colors shadow-xs cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="pt-4 first:pt-0 flex space-x-3.5">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    className="w-18 h-18 object-contain rounded-lg bg-[#f1f3f4] p-1 shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-gray-900 truncate">
                          {item.product.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-0.5 cursor-pointer shrink-0"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-[11px] text-gray-500 mt-0.5">
                        <span className="bg-gray-100 px-1.5 py-0.5 rounded font-medium">Size: {item.selectedSize}</span>
                        {item.selectedColor && (
                          <span className="flex items-center space-x-1">
                            <span 
                              className="w-2.5 h-2.5 rounded-full border border-gray-300 inline-block" 
                              style={{ backgroundColor: item.selectedColor.hex }}
                            />
                            <span>{item.selectedColor.name}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-1.5 border border-gray-200 rounded-md p-0.5 bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-gray-500 hover:text-black hover:bg-gray-100 rounded cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-5 text-center text-xs font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-gray-500 hover:text-black hover:bg-gray-100 rounded cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-extrabold text-gray-900">
                        {formatPrice(item.priceAtAddition * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with Checkout Controls & Promo Code */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-gray-200 bg-[#f8f9fa] space-y-4">
              {/* Promo Code Accordion */}
              {appliedPromo ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-1.5 text-[#137333] font-semibold">
                    <Tag className="w-3.5 h-3.5" />
                    <span>{appliedPromo.code} ({appliedPromo.description})</span>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-gray-400 hover:text-red-500 font-bold ml-2 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="space-y-1">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Promo code (e.g. RETRO1998)"
                      className="flex-1 px-3 py-2 text-xs bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-gray-800 hover:bg-black text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && (
                    <div className="text-[11px] text-red-500 font-medium">{promoError}</div>
                  )}
                </form>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">{formatPrice(cartSubtotal)}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-[#137333] font-semibold">
                    <span>Discount</span>
                    <span>-{formatPrice(cartDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span>{cartShippingPrice === 0 ? <strong className="text-[#137333]">FREE</strong> : formatPrice(cartShippingPrice)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200 text-sm font-bold text-gray-900">
                  <span>Total</span>
                  <span className="text-base text-[#1a73e8]">{formatPrice(cartGrandTotal)}</span>
                </div>
              </div>

              {/* Checkout Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateTo('checkout');
                  }}
                  className="w-full py-3.5 bg-[#1a73e8] hover:bg-[#1557b0] text-white rounded-full font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer group"
                >
                  <span>CHECKOUT</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateTo('cart');
                  }}
                  className="w-full py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 transition-colors text-center cursor-pointer"
                >
                  View Full Cart Details
                </button>
              </div>

              <div className="text-[10px] text-center text-gray-400 flex items-center justify-center space-x-1">
                <ShieldCheck className="w-3 h-3 text-[#34a853]" />
                <span>Encrypted 256-Bit SSL Checkout Security</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
