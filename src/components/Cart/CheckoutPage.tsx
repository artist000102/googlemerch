import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  Check, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  ArrowLeft, 
  ArrowRight, 
  Lock, 
  Tag, 
  CheckCircle2, 
  Printer, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { SHIPPING_OPTIONS } from '../../data/products';
import { CheckoutFormData, OrderConfirmation } from '../../types/store';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartDiscount,
    cartShippingPrice,
    cartTax,
    cartGrandTotal,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    formatPrice,
    selectedShippingOption,
    setSelectedShippingOption,
    lastOrder,
    setLastOrder,
    clearCart,
    navigateTo,
    setIsOrderTrackingOpen,
    showToast
  } = useStore();

  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shipping' | 'payment' | 'confirmation'>('cart');
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState<string | null>(null);

  // Checkout Form State
  const [formData, setFormData] = useState<CheckoutFormData>({
    email: 'alex.developer@google.com',
    newsletterOptIn: true,
    firstName: 'Alex',
    lastName: 'Chen',
    company: '',
    address1: '1600 Amphitheatre Pkwy',
    address2: 'Bldg 43',
    city: 'Mountain View',
    state: 'CA',
    postalCode: '94043',
    country: 'United States',
    phone: '(650) 253-0000',
    shippingOptionId: selectedShippingOption.id,
    paymentMethod: 'gpay',
    cardNumber: '•••• •••• •••• 4242',
    cardExpMonth: '12',
    cardExpYear: '28',
    cardCvv: '888',
    cardName: 'Alex Chen',
    billingSameAsShipping: true,
  });

  const handleInputChange = (field: keyof CheckoutFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError(null);
    if (!promoInput.trim()) return;

    const res = applyPromoCode(promoInput);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoInput('');
    }
  };

  const handlePlaceOrder = () => {
    const orderNumber = `GGL-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const trackingNumber = `1Z99999999${Math.floor(10000000 + Math.random() * 90000000)}`;

    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + (selectedShippingOption.id === 'overnight' ? 1 : selectedShippingOption.id === 'priority' ? 2 : 4));
    const formattedDelivery = deliveryDate.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    const newOrder: OrderConfirmation = {
      orderNumber,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      customer: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        address: `${formData.address1} ${formData.address2 || ''}`,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
        country: formData.country,
      },
      items: [...cart],
      subtotal: cartSubtotal,
      discountAmount: cartDiscount,
      shippingAmount: cartShippingPrice,
      taxAmount: cartTax,
      total: cartGrandTotal,
      currency: 'USD',
      shippingMethod: selectedShippingOption.name,
      estimatedDeliveryDate: formattedDelivery,
      status: 'Processing',
      trackingNumber,
    };

    setLastOrder(newOrder);
    clearCart();
    setCheckoutStep('confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    showToast({
      title: 'Order Confirmed! 🎉',
      description: `Order #${orderNumber} has been received.`,
      type: 'success',
    });
  };

  // If cart is empty and not on confirmation
  if (cart.length === 0 && checkoutStep !== 'confirmation') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 bg-blue-50 text-[#1a73e8] rounded-full flex items-center justify-center mx-auto">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 font-['Plus_Jakarta_Sans',sans-serif]">
          Your Shopping Cart is Empty
        </h1>
        <p className="text-sm text-gray-500 max-w-md mx-auto">
          Your cart currently has no Google gear. Browse our latest 1998 Retro arrivals and apparel to get started.
        </p>
        <button
          onClick={() => navigateTo('shop')}
          className="px-8 py-3.5 bg-[#1a73e8] hover:bg-[#1557b0] text-white font-bold text-sm rounded-full shadow-md transition-all cursor-pointer inline-flex items-center space-x-2"
        >
          <span>Explore Google Store</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#f8f9fa] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Step Progress Bar Header (Screenshot 15) */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="flex items-center justify-between text-xs sm:text-sm font-bold">
            <button
              onClick={() => checkoutStep !== 'confirmation' && setCheckoutStep('cart')}
              className={`flex items-center space-x-2 cursor-pointer ${
                checkoutStep === 'cart' ? 'text-[#1a73e8]' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                checkoutStep === 'cart' ? 'bg-[#1a73e8] text-white' : 'bg-gray-200 text-gray-700'
              }`}>
                1
              </span>
              <span>Shopping Cart</span>
            </button>

            <span className="text-gray-300">─────</span>

            <button
              onClick={() => checkoutStep !== 'confirmation' && setCheckoutStep('shipping')}
              className={`flex items-center space-x-2 cursor-pointer ${
                checkoutStep === 'shipping' ? 'text-[#1a73e8]' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                checkoutStep === 'shipping' ? 'bg-[#1a73e8] text-white' : 'bg-gray-200 text-gray-700'
              }`}>
                2
              </span>
              <span>Shipping Address</span>
            </button>

            <span className="text-gray-300">─────</span>

            <button
              onClick={() => checkoutStep !== 'confirmation' && setCheckoutStep('payment')}
              className={`flex items-center space-x-2 cursor-pointer ${
                checkoutStep === 'payment' ? 'text-[#1a73e8]' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                checkoutStep === 'payment' ? 'bg-[#1a73e8] text-white' : 'bg-gray-200 text-gray-700'
              }`}>
                3
              </span>
              <span>Payment</span>
            </button>
          </div>
        </div>

        {/* Step 4: Order Confirmation View */}
        {checkoutStep === 'confirmation' && lastOrder && (
          <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-sm space-y-8 animate-in fade-in zoom-in-95">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-green-100 text-[#137333] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="inline-block px-3 py-1 bg-green-50 text-[#137333] rounded-full text-xs font-bold">
                ORDER #{lastOrder.orderNumber}
              </div>
              <h1 className="text-3xl font-black text-gray-900 font-['Plus_Jakarta_Sans',sans-serif]">
                Thank You for Your Order, {lastOrder.customer.name}!
              </h1>
              <p className="text-sm text-gray-600 max-w-md mx-auto">
                We have sent an order receipt confirmation to <strong>{lastOrder.customer.email}</strong>.
              </p>
            </div>

            {/* Delivery Timeline Card */}
            <div className="bg-[#f8f9fa] rounded-2xl p-6 border border-gray-200 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200 pb-4">
                <div>
                  <span className="text-xs text-gray-500 font-medium">Estimated Delivery:</span>
                  <div className="text-base font-bold text-gray-900">{lastOrder.estimatedDeliveryDate}</div>
                </div>
                <div>
                  <span className="text-xs text-gray-500 font-medium">Tracking Number:</span>
                  <div className="text-sm font-mono font-bold text-[#1a73e8]">{lastOrder.trackingNumber}</div>
                </div>
              </div>

              {/* Items Ordered List */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Ordered Items</div>
                {lastOrder.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0 text-xs">
                    <div className="flex items-center space-x-3">
                      <img src={item.product.images[0]} alt={item.product.title} className="w-12 h-12 object-contain rounded bg-white p-1" />
                      <div>
                        <div className="font-bold text-gray-900">{item.product.title}</div>
                        <div className="text-gray-500">Size: {item.selectedSize} | Qty: {item.quantity}</div>
                      </div>
                    </div>
                    <div className="font-bold text-gray-900">{formatPrice(item.priceAtAddition * item.quantity)}</div>
                  </div>
                ))}
              </div>

              {/* Order Totals Summary */}
              <div className="border-t border-gray-200 pt-3 space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(lastOrder.subtotal)}</span>
                </div>
                {lastOrder.discountAmount > 0 && (
                  <div className="flex justify-between text-[#137333] font-semibold">
                    <span>Discount</span>
                    <span>-{formatPrice(lastOrder.discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping ({lastOrder.shippingMethod})</span>
                  <span>{lastOrder.shippingAmount === 0 ? 'FREE' : formatPrice(lastOrder.shippingAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Sales Tax</span>
                  <span>{formatPrice(lastOrder.taxAmount)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200 text-base font-extrabold text-gray-900">
                  <span>Total Paid</span>
                  <span className="text-[#1a73e8]">{formatPrice(lastOrder.total)}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => setIsOrderTrackingOpen(true)}
                className="px-6 py-3 bg-[#1a73e8] hover:bg-[#1557b0] text-white rounded-full text-xs font-bold transition-all shadow-md cursor-pointer flex items-center space-x-2"
              >
                <Truck className="w-4 h-4" />
                <span>Track Live Package</span>
              </button>

              <button
                onClick={() => navigateTo('shop')}
                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full text-xs font-bold transition-colors cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}

        {/* Stages 1 to 3 Grid Layout */}
        {checkoutStep !== 'confirmation' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Stage Specific Form / Table */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* STAGE 1: SHOPPING CART TABLE (Screenshot 15) */}
              {checkoutStep === 'cart' && (
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-6">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                    <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
                      Shopping Cart ({cart.reduce((s, i) => s + i.quantity, 0)} Items)
                    </h2>
                    <span className="text-xs text-gray-500 font-medium">All items qualify for 30-day returns</span>
                  </div>

                  <div className="divide-y divide-gray-200">
                    {cart.map((item) => (
                      <div key={item.id} className="py-6 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        {/* Image & Title & Size */}
                        <div className="flex items-center space-x-4">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.title}
                            className="w-20 h-20 object-contain rounded-xl bg-[#f1f3f4] p-1.5 shrink-0"
                          />
                          <div>
                            <span className="text-[11px] font-bold text-[#1a73e8] uppercase">{item.product.brand}</span>
                            <h3 className="text-sm font-bold text-gray-900">{item.product.title}</h3>
                            <div className="text-xs text-gray-500 mt-1 flex items-center space-x-2">
                              <span className="bg-gray-100 px-2 py-0.5 rounded font-semibold text-gray-700">Size: {item.selectedSize}</span>
                              {item.selectedColor && (
                                <span className="flex items-center space-x-1">
                                  <span className="w-2.5 h-2.5 rounded-full border" style={{ backgroundColor: item.selectedColor.hex }} />
                                  <span>{item.selectedColor.name}</span>
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Price, Stepper & Delete */}
                        <div className="flex items-center justify-between sm:justify-end space-x-6">
                          <div className="flex items-center space-x-2 border border-gray-300 rounded-lg p-1 bg-white">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 text-gray-500 hover:text-black rounded cursor-pointer"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 text-gray-500 hover:text-black rounded cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="text-right min-w-[70px]">
                            <div className="text-sm font-black text-gray-900">
                              {formatPrice(item.priceAtAddition * item.quantity)}
                            </div>
                            <div className="text-[10px] text-gray-400">
                              {formatPrice(item.priceAtAddition)} each
                            </div>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors cursor-pointer"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STAGE 2: SHIPPING ADDRESS FORM */}
              {checkoutStep === 'shipping' && (
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-6">
                  <div className="border-b border-gray-200 pb-4">
                    <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
                      Shipping & Contact Information
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">
                      Enter where we should ship your official Google Merchandise.
                    </p>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Email Address for Confirmation</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-gray-700 mb-1">First Name</label>
                        <input
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-gray-700 mb-1">Last Name</label>
                        <input
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Street Address</label>
                      <input
                        type="text"
                        required
                        value={formData.address1}
                        onChange={(e) => handleInputChange('address1', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block font-bold text-gray-700 mb-1">City</label>
                        <input
                          type="text"
                          required
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-gray-700 mb-1">State / Province</label>
                        <input
                          type="text"
                          required
                          value={formData.state}
                          onChange={(e) => handleInputChange('state', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-gray-700 mb-1">ZIP / Postal Code</label>
                        <input
                          type="text"
                          required
                          value={formData.postalCode}
                          onChange={(e) => handleInputChange('postalCode', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    {/* Shipping Method Selector */}
                    <div className="pt-4 border-t border-gray-200">
                      <label className="block font-bold text-gray-900 mb-3 text-sm">Select Shipping Speed</label>
                      <div className="space-y-2.5">
                        {SHIPPING_OPTIONS.map((opt) => (
                          <label
                            key={opt.id}
                            className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all cursor-pointer ${
                              selectedShippingOption.id === opt.id
                                ? 'border-[#1a73e8] bg-blue-50/40 shadow-xs'
                                : 'border-gray-200 hover:border-gray-300 bg-white'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <input
                                type="radio"
                                name="shipping-speed"
                                checked={selectedShippingOption.id === opt.id}
                                onChange={() => setSelectedShippingOption(opt)}
                                className="text-[#1a73e8] focus:ring-blue-500 cursor-pointer"
                              />
                              <div>
                                <div className="font-bold text-gray-900 text-xs sm:text-sm">{opt.name}</div>
                                <div className="text-[11px] text-gray-500">{opt.description}</div>
                              </div>
                            </div>
                            <span className="font-bold text-xs sm:text-sm text-gray-900">
                              {opt.id === 'standard' && cartSubtotal >= 100 ? (
                                <span className="text-[#137333]">FREE</span>
                              ) : (
                                formatPrice(opt.price)
                              )}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STAGE 3: PAYMENT METHOD */}
              {checkoutStep === 'payment' && (
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-6">
                  <div className="border-b border-gray-200 pb-4">
                    <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
                      Payment Method
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">
                      All transactions are secure and encrypted.
                    </p>
                  </div>

                  {/* Google Pay Instant Button */}
                  <button
                    onClick={handlePlaceOrder}
                    className="w-full py-4 bg-black hover:bg-gray-900 text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <span>Fast Checkout with</span>
                    <span className="font-bold tracking-tight">
                      <span className="text-[#4285f4]">G</span>
                      <span className="text-[#ea4335]">o</span>
                      <span className="text-[#fbbc05]">o</span>
                      <span className="text-[#4285f4]">g</span>
                      <span className="text-[#34a853]">l</span>
                      <span className="text-[#ea4335]">e</span>
                      <span className="text-white ml-1">Pay</span>
                    </span>
                  </button>

                  <div className="flex items-center my-4">
                    <div className="flex-1 border-t border-gray-200" />
                    <span className="px-3 text-xs text-gray-400 uppercase font-semibold">Or Pay with Credit Card</span>
                    <div className="flex-1 border-t border-gray-200" />
                  </div>

                  {/* Credit Card Input Form */}
                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Cardholder Name</label>
                      <input
                        type="text"
                        value={formData.cardName}
                        onChange={(e) => handleInputChange('cardName', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Card Number</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.cardNumber}
                          onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
                        />
                        <CreditCard className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-gray-700 mb-1">Expiration (MM/YY)</label>
                        <input
                          type="text"
                          value={`${formData.cardExpMonth}/${formData.cardExpYear}`}
                          onChange={(e) => {
                            const [m, y] = e.target.value.split('/');
                            handleInputChange('cardExpMonth', m || '');
                            handleInputChange('cardExpYear', y || '');
                          }}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-gray-700 mb-1">Security Code (CVV)</label>
                        <div className="relative">
                          <input
                            type="password"
                            maxLength={4}
                            value={formData.cardCvv}
                            onChange={(e) => handleInputChange('cardCvv', e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 pl-8"
                          />
                          <Lock className="w-4 h-4 text-gray-400 absolute left-2.5 top-3" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Order Summary Sidebar (Screenshot 15) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs space-y-4 sticky top-24">
                <h3 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-3">
                  Order Summary
                </h3>

                {/* Promo Code Input (Screenshot 15) */}
                {appliedPromo ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-2.5 flex items-center justify-between text-xs">
                    <span className="font-bold text-[#137333]">Promo: {appliedPromo.code}</span>
                    <button onClick={removePromoCode} className="text-gray-400 hover:text-red-500 cursor-pointer">
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="space-y-1">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        placeholder="Promo Code"
                        className="flex-1 px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-gray-800 hover:bg-black text-white text-xs font-bold rounded-lg cursor-pointer transition-colors"
                      >
                        Add
                      </button>
                    </div>
                    {promoError && <p className="text-[11px] text-red-500">{promoError}</p>}
                  </form>
                )}

                {/* Totals Breakdown */}
                <div className="space-y-2 text-xs text-gray-600 pt-2 border-t border-gray-100">
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
                    <span>Shipping</span>
                    <span>
                      {cartShippingPrice === 0 ? <strong className="text-[#137333]">FREE</strong> : formatPrice(cartShippingPrice)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Estimated Sales Tax</span>
                    <span>{formatPrice(cartTax)}</span>
                  </div>

                  <div className="flex justify-between pt-3 border-t border-gray-200 text-base font-extrabold text-gray-900">
                    <span>Grand Total</span>
                    <span className="text-xl text-[#1a73e8]">{formatPrice(cartGrandTotal)}</span>
                  </div>
                </div>

                {/* Step Action Trigger */}
                <div className="pt-2">
                  {checkoutStep === 'cart' && (
                    <button
                      onClick={() => setCheckoutStep('shipping')}
                      className="w-full py-4 bg-[#1a73e8] hover:bg-[#1557b0] text-white rounded-full font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer group"
                    >
                      <span>CONTINUE TO SHIPPING</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  )}

                  {checkoutStep === 'shipping' && (
                    <div className="space-y-2">
                      <button
                        onClick={() => setCheckoutStep('payment')}
                        className="w-full py-4 bg-[#1a73e8] hover:bg-[#1557b0] text-white rounded-full font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer"
                      >
                        <span>CONTINUE TO PAYMENT</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setCheckoutStep('cart')}
                        className="w-full py-2 text-xs text-gray-500 hover:text-gray-900 font-semibold cursor-pointer"
                      >
                        ← Back to Shopping Cart
                      </button>
                    </div>
                  )}

                  {checkoutStep === 'payment' && (
                    <div className="space-y-2">
                      <button
                        onClick={handlePlaceOrder}
                        className="w-full py-4 bg-[#1a73e8] hover:bg-[#1557b0] text-white rounded-full font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer"
                      >
                        <Lock className="w-4 h-4" />
                        <span>PLACE ORDER ({formatPrice(cartGrandTotal)})</span>
                      </button>
                      <button
                        onClick={() => setCheckoutStep('shipping')}
                        className="w-full py-2 text-xs text-gray-500 hover:text-gray-900 font-semibold cursor-pointer"
                      >
                        ← Back to Shipping
                      </button>
                    </div>
                  )}
                </div>

                <div className="text-[10px] text-center text-gray-400 flex items-center justify-center space-x-1 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#34a853]" />
                  <span>Google Store Guarantee • Official Authorized Retailer</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
