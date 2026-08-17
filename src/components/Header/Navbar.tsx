import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  Truck, 
  Globe, 
  Menu, 
  X, 
  ChevronDown, 
  ArrowRight,
  Sparkles,
  Tag,
  Clock,
  Trash2
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { CURRENCIES, PRODUCTS } from '../../data/products';
import { ProductCategory } from '../../types/store';

export const Navbar: React.FC = () => {
  const {
    navigateTo,
    cartTotalQuantity,
    cartSubtotal,
    setIsCartOpen,
    wishlist,
    activeCurrency,
    setCurrency,
    formatPrice,
    setIsOrderTrackingOpen,
    selectedCategory,
    setCategory,
    showToast,
    selectProduct
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  
  // Search Bar state
  const [localSearch, setLocalSearch] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const currencyRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
      if (currencyRef.current && !currencyRef.current.contains(event.target as Node)) {
        setIsCurrencyDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchResults = localSearch.trim() === '' ? [] : PRODUCTS.filter(p => 
    p.title.toLowerCase().includes(localSearch.toLowerCase()) ||
    p.brand.toLowerCase().includes(localSearch.toLowerCase()) ||
    p.itemType.toLowerCase().includes(localSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(localSearch.toLowerCase())
  ).slice(0, 5);

  const popularSearches = ['Nano Banana', '1998 Retro', 'Tumbler', 'Socks', 'Backpack', 'Chrome Dino', 'Pins', 'Journal'];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearch.trim()) {
      setIsSearchFocused(false);
      navigateTo('shop', null, 'All');
    }
  };

  const categories: { name: ProductCategory; label: string; subcategories: string[] }[] = [
    { 
      name: 'Apparel', 
      label: 'Apparel', 
      subcategories: ['Sweatshirts & Hoodies', 'T-Shirts', 'Jackets & Outerwear', 'Kids Apparel', 'All Apparel'] 
    },
    { 
      name: 'Drinkware', 
      label: 'Drinkware', 
      subcategories: ['Bottles & Tumblers', 'Mugs', 'Insulated Drinkware', 'All Drinkware'] 
    },
    { 
      name: 'Bags & Backpacks', 
      label: 'Bags', 
      subcategories: ['Backpacks & Totes', 'Canvas Duffels', 'Commuter Gear', 'All Bags'] 
    },
    { 
      name: 'Accessories', 
      label: 'Accessories', 
      subcategories: ['Pins & Patches', 'Hats & Headwear', 'Socks', 'Plush & Toys', 'Tech Accessories'] 
    },
    { 
      name: 'Stationery', 
      label: 'Stationery', 
      subcategories: ['Journals & Pens', 'Desk Organizers', 'Stickers', 'All Stationery'] 
    },
    { 
      name: 'Collections', 
      label: 'Collections', 
      subcategories: ['Google 1998 Retro', 'YouTube Creators', 'Android Bot', 'Chrome Offline Dino', 'Pixel Series'] 
    },
    { 
      name: 'Sale', 
      label: 'Sale', 
      subcategories: ['Limited Offers', 'Clearance Items', 'Special Bundles'] 
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#dadce0] shadow-xs">
      {/* Top Announcement Bar */}
      <div className="bg-[#202124] text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 truncate">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#4285f4] text-white">
              RETRO 1998
            </span>
            <span className="font-medium text-gray-200">
              Free shipping on orders over $100 | Use code <span className="font-bold text-[#fbbc05] underline cursor-pointer" onClick={() => {
                navigator.clipboard?.writeText('RETRO1998');
                showToast({ title: 'Promo Code Copied!', description: 'Code RETRO1998 copied to clipboard ($15 off $75+)', type: 'info' });
              }}>RETRO1998</span> for $15 off $75+
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-5 text-gray-300 text-xs">
            <button 
              onClick={() => setIsOrderTrackingOpen(true)}
              className="hover:text-white flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <Truck className="w-3.5 h-3.5 text-[#34a853]" />
              <span>Track Order</span>
            </button>
            <button 
              onClick={() => navigateTo('sustainability')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Sustainability
            </button>
            <button 
              onClick={() => navigateTo('faq')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Help & FAQs
            </button>

            {/* Currency Switcher */}
            <div className="relative" ref={currencyRef}>
              <button 
                onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                className="flex items-center space-x-1 text-gray-200 hover:text-white transition-colors cursor-pointer"
              >
                <span>{activeCurrency.flag}</span>
                <span className="font-medium">{activeCurrency.code} ({activeCurrency.symbol})</span>
                <ChevronDown className="w-3 h-3 ml-0.5" />
              </button>

              {isCurrencyDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg border border-gray-200 py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-gray-500 uppercase border-b border-gray-100">
                    Select Currency & Region
                  </div>
                  {Object.values(CURRENCIES).map((curr) => (
                    <button
                      key={curr.code}
                      onClick={() => {
                        setCurrency(curr.code);
                        setIsCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-gray-100 cursor-pointer ${
                        activeCurrency.code === curr.code ? 'bg-blue-50 text-[#1a73e8] font-semibold' : ''
                      }`}
                    >
                      <span className="flex items-center space-x-2">
                        <span>{curr.flag}</span>
                        <span>{curr.name}</span>
                      </span>
                      <span className="font-mono text-gray-500">{curr.symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile menu trigger */}
          <div className="flex items-center lg:hidden mr-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-black hover:bg-gray-100 focus:outline-none cursor-pointer"
              aria-label="Open menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Google Merchandise Store Logo */}
          <div 
            onClick={() => navigateTo('home')} 
            className="flex items-center cursor-pointer select-none group py-2"
          >
            <div className="flex items-center space-x-2.5">
              {/* Google 4-color "G" SVG icon */}
              <svg className="w-8 h-8 transition-transform group-hover:scale-105 duration-200" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
              <div>
                <div className="text-xl font-bold tracking-tight text-[#202124] flex items-center font-['Plus_Jakarta_Sans',sans-serif]">
                  <span className="text-[#4285f4]">G</span>
                  <span className="text-[#ea4335]">o</span>
                  <span className="text-[#fbbc05]">o</span>
                  <span className="text-[#4285f4]">g</span>
                  <span className="text-[#34a853]">l</span>
                  <span className="text-[#ea4335]">e</span>
                  <span className="ml-1.5 text-gray-800 font-semibold text-lg">Merchandise Store</span>
                </div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest font-medium hidden sm:block">
                  Official Branded Gear & 1998 Retro
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Search Bar with Live Suggestions Dropdown */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8 relative" ref={searchContainerRef}>
            <form onSubmit={handleSearchSubmit} className="w-full relative">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  placeholder="Search Google 1998, apparel, drinkware, plush..."
                  className="w-full pl-10 pr-10 py-2.5 bg-[#f1f3f4] text-sm text-[#202124] placeholder-gray-500 rounded-full border border-transparent focus:border-[#1a73e8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                />
                <Search className="w-4 h-4 text-gray-500 absolute left-3.5 pointer-events-none" />
                {localSearch && (
                  <button
                    type="button"
                    onClick={() => setLocalSearch('')}
                    className="absolute right-3 p-1 text-gray-400 hover:text-gray-600 rounded-full cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </form>

            {/* Instant Search Flyout */}
            {isSearchFocused && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 py-3 z-50 overflow-hidden">
                {localSearch.trim() === '' ? (
                  <div className="px-4 py-2">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#fbbc05]" />
                      <span>Popular Trending Searches</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {popularSearches.map((term) => (
                        <button
                          key={term}
                          onClick={() => {
                            setLocalSearch(term);
                            setIsSearchFocused(false);
                            navigateTo('shop', null, 'All');
                          }}
                          className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-blue-50 hover:text-[#1a73e8] rounded-full text-gray-700 transition-colors cursor-pointer"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : searchResults.length > 0 ? (
                  <div>
                    <div className="px-4 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Matching Products ({searchResults.length})
                    </div>
                    <div className="divide-y divide-gray-100">
                      {searchResults.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => {
                            selectProduct(item);
                            setIsSearchFocused(false);
                          }}
                          className="px-4 py-2.5 hover:bg-gray-50 flex items-center space-x-3 cursor-pointer transition-colors"
                        >
                          <img
                            src={item.images[0]}
                            alt={item.title}
                            className="w-12 h-12 object-cover rounded-md bg-[#f1f3f4]"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="text-xs text-gray-500 font-medium">{item.brand}</div>
                            <div className="text-sm font-semibold text-gray-900 truncate">{item.title}</div>
                            <div className="text-xs font-bold text-[#1a73e8]">{formatPrice(item.price)}</div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                        </div>
                      ))}
                    </div>
                    <div className="px-4 pt-2 border-t border-gray-100">
                      <button
                        onClick={() => {
                          setIsSearchFocused(false);
                          navigateTo('shop', null, 'All');
                        }}
                        className="w-full py-2 text-center text-xs font-semibold text-[#1a73e8] hover:bg-blue-50 rounded-md transition-colors cursor-pointer"
                      >
                        View all results for &ldquo;{localSearch}&rdquo;
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="px-4 py-6 text-center text-sm text-gray-500">
                    No products found for &ldquo;{localSearch}&rdquo;.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Header Action Icons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Wishlist Button */}
            <button
              onClick={() => navigateTo('wishlist')}
              className="relative p-2.5 text-gray-700 hover:text-[#ea4335] hover:bg-red-50 rounded-full transition-colors cursor-pointer"
              title="Saved Wishlist"
            >
              <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'fill-[#ea4335] text-[#ea4335]' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#ea4335] text-white text-[10px] font-bold flex items-center justify-center animate-in zoom-in">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center space-x-2.5 bg-[#1a73e8] hover:bg-[#1557b0] text-white px-4 py-2.5 rounded-full font-medium text-sm transition-all shadow-xs hover:shadow-md cursor-pointer group"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-110" />
                {cartTotalQuantity > 0 && (
                  <span className="absolute -top-2 -right-2.5 w-4 h-4 rounded-full bg-[#fbbc05] text-[#202124] text-[10px] font-extrabold flex items-center justify-center">
                    {cartTotalQuantity}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-semibold">
                {cartTotalQuantity === 0 ? 'Cart' : formatPrice(cartSubtotal)}
              </span>
            </button>
          </div>
        </div>

        {/* Desktop Category Navigation Bar */}
        <nav className="hidden lg:flex items-center justify-center space-x-8 border-t border-gray-100 py-3">
          {categories.map((cat) => (
            <div 
              key={cat.name} 
              className="relative group"
              onMouseEnter={() => setActiveMegaMenu(cat.name)}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <button
                onClick={() => setCategory(cat.name)}
                className={`text-sm font-medium py-1 transition-colors flex items-center space-x-1 cursor-pointer ${
                  selectedCategory === cat.name
                    ? 'text-[#1a73e8] font-bold border-b-2 border-[#1a73e8]'
                    : 'text-gray-700 hover:text-[#1a73e8]'
                }`}
              >
                <span>{cat.label}</span>
                {cat.subcategories.length > 0 && (
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#1a73e8] group-hover:rotate-180 transition-transform duration-200" />
                )}
              </button>

              {/* Mega menu flyout */}
              {activeMegaMenu === cat.name && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                  <div className="px-3 py-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    {cat.name} Categories
                  </div>
                  {cat.subcategories.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => {
                        setActiveMegaMenu(null);
                        setCategory(cat.name, sub);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-blue-50 hover:text-[#1a73e8] font-medium flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <span>{sub}</span>
                      <ArrowRight className="w-3 h-3 text-gray-400" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white px-4 pt-3 pb-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-9 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3 pointer-events-none" />
          </form>

          {/* Categories List */}
          <div className="space-y-1">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider px-2 py-1">
              Shop by Category
            </div>
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => {
                  setCategory(cat.name);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium flex items-center justify-between cursor-pointer ${
                  selectedCategory === cat.name ? 'bg-blue-50 text-[#1a73e8] font-bold' : 'text-gray-800 hover:bg-gray-50'
                }`}
              >
                <span>{cat.label}</span>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </button>
            ))}
          </div>

          {/* Mobile Utilities */}
          <div className="border-t border-gray-100 pt-3 space-y-2">
            <button
              onClick={() => {
                setIsOrderTrackingOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center space-x-2 text-sm text-gray-700 py-2 px-2 hover:bg-gray-50 rounded"
            >
              <Truck className="w-4 h-4 text-[#34a853]" />
              <span>Track Existing Order</span>
            </button>
            <button
              onClick={() => {
                navigateTo('sustainability');
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center space-x-2 text-sm text-gray-700 py-2 px-2 hover:bg-gray-50 rounded"
            >
              <Sparkles className="w-4 h-4 text-[#4285f4]" />
              <span>Sustainability Initiatives</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
