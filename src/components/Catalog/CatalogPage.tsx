import React, { useState, useMemo } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  SlidersHorizontal, 
  X, 
  Search, 
  RotateCcw, 
  Grid3X3, 
  LayoutGrid,
  Check
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../Product/ProductCard';
import { ProductSize, ProductBrand, ItemType, ProductCategory } from '../../types/store';

export const CatalogPage: React.FC = () => {
  const { 
    products, 
    selectedCategory, 
    selectedSubcategory, 
    setCategory, 
    navigateTo 
  } = useStore();

  // Filter States
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<ProductSize[]>([]);
  const [selectedItemTypes, setSelectedItemTypes] = useState<string[]>([]);
  const [priceBracket, setPriceBracket] = useState<string>('all');
  const [ecoOnly, setEcoOnly] = useState<boolean>(false);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [catalogSearch, setCatalogSearch] = useState<string>('');
  const [sortBy, setSortBy] = useState<'relevance' | 'price-low' | 'price-high' | 'rating' | 'newest'>('relevance');
  
  // Accordion toggle states
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    price: true,
    size: true,
    brand: true,
    itemType: true,
  });

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [gridColumns, setGridColumns] = useState<3 | 4>(4);

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const toggleSize = (size: ProductSize) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const toggleItemType = (type: string) => {
    setSelectedItemTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const clearAllFilters = () => {
    setSelectedBrands([]);
    setSelectedSizes([]);
    setSelectedItemTypes([]);
    setPriceBracket('all');
    setEcoOnly(false);
    setInStockOnly(false);
    setCatalogSearch('');
  };

  const hasActiveFilters = 
    selectedBrands.length > 0 || 
    selectedSizes.length > 0 || 
    selectedItemTypes.length > 0 || 
    priceBracket !== 'all' || 
    ecoOnly || 
    inStockOnly || 
    catalogSearch.trim() !== '';

  // Filter and Sort Pipeline
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category match
      if (selectedCategory !== 'All') {
        if (selectedCategory === 'Sale') {
          if (!p.compareAtPrice) return false;
        } else if (selectedCategory === 'Collections') {
          if (selectedSubcategory && !p.featuredCollection?.includes(selectedSubcategory) && p.brand !== selectedSubcategory) {
            // Check brand or collection tag
            const brandMatch = p.brand.toLowerCase().includes(selectedSubcategory.toLowerCase());
            const titleMatch = p.title.toLowerCase().includes(selectedSubcategory.toLowerCase());
            if (!brandMatch && !titleMatch) return false;
          }
        } else if (p.category !== selectedCategory) {
          return false;
        }
      }

      // Subcategory match
      if (selectedSubcategory && selectedCategory !== 'Collections') {
        if (p.subcategory !== selectedSubcategory && p.itemType !== selectedSubcategory) {
          // Allow loose match
          if (!p.title.toLowerCase().includes(selectedSubcategory.toLowerCase()) && 
              !p.subcategory?.toLowerCase().includes(selectedSubcategory.toLowerCase())) {
            return false;
          }
        }
      }

      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) {
        return false;
      }

      // Size filter
      if (selectedSizes.length > 0) {
        const hasSize = selectedSizes.some(s => p.sizes.includes(s));
        if (!hasSize) return false;
      }

      // Item type filter
      if (selectedItemTypes.length > 0 && !selectedItemTypes.includes(p.itemType)) {
        return false;
      }

      // Price bracket filter
      if (priceBracket === 'under-25' && p.price >= 25) return false;
      if (priceBracket === '25-50' && (p.price < 25 || p.price > 50)) return false;
      if (priceBracket === '50-100' && (p.price < 50 || p.price > 100)) return false;
      if (priceBracket === 'over-100' && p.price <= 100) return false;

      // Eco only
      if (ecoOnly && !p.isEcoFriendly) return false;

      // In stock only
      if (inStockOnly && !p.inStock) return false;

      // Search keyword filter
      if (catalogSearch.trim()) {
        const query = catalogSearch.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(query);
        const matchesDesc = p.description.toLowerCase().includes(query);
        const matchesBrand = p.brand.toLowerCase().includes(query);
        const matchesType = p.itemType.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesBrand && !matchesType) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0; // relevance
    });
  }, [
    products, 
    selectedCategory, 
    selectedSubcategory, 
    selectedBrands, 
    selectedSizes, 
    selectedItemTypes, 
    priceBracket, 
    ecoOnly, 
    inStockOnly, 
    catalogSearch, 
    sortBy
  ]);

  // Distinct Filter Options
  const allBrands = useMemo(() => Array.from(new Set(products.map(p => p.brand))), [products]);
  const allItemTypes = useMemo(() => Array.from(new Set(products.map(p => p.itemType))), [products]);
  const allSizes: ProductSize[] = ['XS', 'S', 'M', 'L', 'XL', '2XL', 'One Size'];

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb Bar (Matching Screenshots 8-10) */}
      <div className="bg-[#f8f9fa] border-b border-gray-200 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center space-x-2 text-xs text-gray-500 font-medium">
          <button 
            onClick={() => navigateTo('home')} 
            className="hover:text-[#1a73e8] transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <button 
            onClick={() => setCategory(selectedCategory)} 
            className={`hover:text-[#1a73e8] transition-colors cursor-pointer ${!selectedSubcategory ? 'text-gray-900 font-bold' : ''}`}
          >
            {selectedCategory}
          </button>
          {selectedSubcategory && (
            <>
              <span>/</span>
              <span className="text-gray-900 font-bold">{selectedSubcategory}</span>
            </>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Title & Sorting Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-gray-200 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
              {selectedSubcategory || (selectedCategory === 'All' ? 'All Google Merchandise' : selectedCategory)}
            </h1>
            <p className="text-sm text-gray-500 mt-1 font-medium">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'} Found
            </p>
          </div>

          {/* Controls: Layout toggle, Filter toggle & Sort */}
          <div className="flex items-center space-x-3">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden inline-flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-sm font-semibold transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters {hasActiveFilters ? `(${[...selectedBrands, ...selectedSizes, ...selectedItemTypes].length + (priceBracket !== 'all' ? 1 : 0)})` : ''}</span>
            </button>

            {/* Desktop Grid Columns Toggle */}
            <div className="hidden sm:flex items-center space-x-1 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setGridColumns(3)}
                className={`p-1.5 rounded cursor-pointer transition-colors ${
                  gridColumns === 3 ? 'bg-white shadow-xs text-gray-900' : 'text-gray-500 hover:text-gray-900'
                }`}
                title="3 Columns"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridColumns(4)}
                className={`p-1.5 rounded cursor-pointer transition-colors ${
                  gridColumns === 4 ? 'bg-white shadow-xs text-gray-900' : 'text-gray-500 hover:text-gray-900'
                }`}
                title="4 Columns"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2">
              <label htmlFor="sort-select" className="text-xs font-semibold text-gray-500 hidden sm:inline">
                Sort by:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-gray-300 text-gray-800 text-sm font-medium rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-xs"
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 py-4 border-b border-gray-100">
            <span className="text-xs font-semibold text-gray-500">Active Filters:</span>
            {selectedBrands.map(b => (
              <span key={b} className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-50 text-[#1a73e8] rounded-full text-xs font-semibold">
                <span>{b}</span>
                <button onClick={() => toggleBrand(b)} className="hover:text-blue-900 cursor-pointer"><X className="w-3 h-3" /></button>
              </span>
            ))}
            {selectedSizes.map(s => (
              <span key={s} className="inline-flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-semibold">
                <span>Size: {s}</span>
                <button onClick={() => toggleSize(s)} className="hover:text-black cursor-pointer"><X className="w-3 h-3" /></button>
              </span>
            ))}
            {selectedItemTypes.map(t => (
              <span key={t} className="inline-flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-semibold">
                <span>{t}</span>
                <button onClick={() => toggleItemType(t)} className="hover:text-black cursor-pointer"><X className="w-3 h-3" /></button>
              </span>
            ))}
            {priceBracket !== 'all' && (
              <span className="inline-flex items-center space-x-1 px-3 py-1 bg-green-50 text-[#137333] rounded-full text-xs font-semibold">
                <span>Price: {priceBracket}</span>
                <button onClick={() => setPriceBracket('all')} className="hover:text-green-900 cursor-pointer"><X className="w-3 h-3" /></button>
              </span>
            )}
            {ecoOnly && (
              <span className="inline-flex items-center space-x-1 px-3 py-1 bg-green-50 text-[#137333] rounded-full text-xs font-semibold">
                <span>Eco-Friendly</span>
                <button onClick={() => setEcoOnly(false)} className="hover:text-green-900 cursor-pointer"><X className="w-3 h-3" /></button>
              </span>
            )}
            {inStockOnly && (
              <span className="inline-flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-semibold">
                <span>In Stock Only</span>
                <button onClick={() => setInStockOnly(false)} className="hover:text-black cursor-pointer"><X className="w-3 h-3" /></button>
              </span>
            )}
            <button
              onClick={clearAllFilters}
              className="text-xs font-bold text-[#ea4335] hover:underline flex items-center space-x-1 ml-2 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear All</span>
            </button>
          </div>
        )}

        {/* Main Catalog Body: Left Filter Sidebar + Right Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
          {/* Desktop Left Sidebar Filter Accordion (Screenshots 8-10) */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6 select-none">
            {/* Filter Search */}
            <div className="relative">
              <input
                type="text"
                value={catalogSearch}
                onChange={(e) => setCatalogSearch(e.target.value)}
                placeholder="Search within items..."
                className="w-full pl-8 pr-8 py-2 text-xs bg-[#f1f3f4] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
              {catalogSearch && (
                <button onClick={() => setCatalogSearch('')} className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Quick Toggle Switches */}
            <div className="p-3.5 bg-[#f8f9fa] rounded-xl border border-gray-200 space-y-2.5">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-xs font-semibold text-gray-700">In Stock Only</span>
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded text-[#1a73e8] focus:ring-blue-500 w-4 h-4 cursor-pointer"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-xs font-semibold text-gray-700">Eco-Friendly Materials</span>
                <input
                  type="checkbox"
                  checked={ecoOnly}
                  onChange={(e) => setEcoOnly(e.target.checked)}
                  className="rounded text-[#34a853] focus:ring-green-500 w-4 h-4 cursor-pointer"
                />
              </label>
            </div>

            {/* Accordion 1: Price */}
            <div className="border-t border-gray-200 pt-4">
              <button
                onClick={() => toggleSection('price')}
                className="w-full flex items-center justify-between text-sm font-bold text-gray-900 py-1 cursor-pointer"
              >
                <span>Price</span>
                {openSections.price ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
              </button>

              {openSections.price && (
                <div className="mt-3 space-y-2 text-xs text-gray-600">
                  {[
                    { id: 'all', label: 'All Prices' },
                    { id: 'under-25', label: 'Under $25' },
                    { id: '25-50', label: '$25 - $50' },
                    { id: '50-100', label: '$50 - $100' },
                    { id: 'over-100', label: '$100 and above' },
                  ].map(option => (
                    <label key={option.id} className="flex items-center space-x-2.5 cursor-pointer hover:text-black">
                      <input
                        type="radio"
                        name="price-bracket"
                        checked={priceBracket === option.id}
                        onChange={() => setPriceBracket(option.id)}
                        className="text-[#1a73e8] focus:ring-blue-500 cursor-pointer"
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Accordion 2: Size */}
            <div className="border-t border-gray-200 pt-4">
              <button
                onClick={() => toggleSection('size')}
                className="w-full flex items-center justify-between text-sm font-bold text-gray-900 py-1 cursor-pointer"
              >
                <span>Size</span>
                {openSections.size ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
              </button>

              {openSections.size && (
                <div className="mt-3 grid grid-cols-3 gap-1.5">
                  {allSizes.map(size => {
                    const isSelected = selectedSizes.includes(size);
                    return (
                      <button
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={`py-1.5 px-2 rounded text-xs font-semibold border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#1a73e8] text-white border-[#1a73e8]'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Accordion 3: Brand of Item */}
            <div className="border-t border-gray-200 pt-4">
              <button
                onClick={() => toggleSection('brand')}
                className="w-full flex items-center justify-between text-sm font-bold text-gray-900 py-1 cursor-pointer"
              >
                <span>Brand of Item</span>
                {openSections.brand ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
              </button>

              {openSections.brand && (
                <div className="mt-3 space-y-2 text-xs text-gray-600 max-h-48 overflow-y-auto pr-1">
                  {allBrands.map(brand => {
                    const count = products.filter(p => p.brand === brand).length;
                    return (
                      <label key={brand} className="flex items-center justify-between cursor-pointer hover:text-black">
                        <span className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={selectedBrands.includes(brand)}
                            onChange={() => toggleBrand(brand)}
                            className="rounded text-[#1a73e8] focus:ring-blue-500 w-3.5 h-3.5 cursor-pointer"
                          />
                          <span>{brand}</span>
                        </span>
                        <span className="text-gray-400 text-[11px]">({count})</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Accordion 4: Item Type */}
            <div className="border-t border-gray-200 pt-4">
              <button
                onClick={() => toggleSection('itemType')}
                className="w-full flex items-center justify-between text-sm font-bold text-gray-900 py-1 cursor-pointer"
              >
                <span>Item Type</span>
                {openSections.itemType ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
              </button>

              {openSections.itemType && (
                <div className="mt-3 space-y-2 text-xs text-gray-600 max-h-56 overflow-y-auto pr-1">
                  {allItemTypes.map(type => {
                    const count = products.filter(p => p.itemType === type).length;
                    return (
                      <label key={type} className="flex items-center justify-between cursor-pointer hover:text-black">
                        <span className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={selectedItemTypes.includes(type)}
                            onChange={() => toggleItemType(type)}
                            className="rounded text-[#1a73e8] focus:ring-blue-500 w-3.5 h-3.5 cursor-pointer"
                          />
                          <span>{type}</span>
                        </span>
                        <span className="text-gray-400 text-[11px]">({count})</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          </aside>

          {/* Right Product Grid Display */}
          <main className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="bg-[#f8f9fa] rounded-2xl p-12 text-center border border-gray-200 space-y-4">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto text-[#1a73e8]">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">No matching merchandise found</h3>
                <p className="text-sm text-gray-500 max-w-md mx-auto">
                  Try adjusting your filter options, clearing search terms, or exploring other Google categories.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="inline-flex items-center space-x-2 px-6 py-2.5 bg-[#1a73e8] hover:bg-[#1557b0] text-white rounded-full text-sm font-semibold transition-all cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            ) : (
              <div className={`grid grid-cols-2 sm:grid-cols-2 ${gridColumns === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-4 sm:gap-6`}>
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Sheet Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" onClick={() => setMobileFilterOpen(false)} />
          <div className="relative ml-auto w-full max-w-xs bg-white h-full shadow-2xl p-6 overflow-y-auto flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-900">Filters</h3>
                <button onClick={() => setMobileFilterOpen(false)} className="p-1 text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Price */}
              <div>
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">Price</h4>
                <div className="space-y-2 text-xs">
                  {[
                    { id: 'all', label: 'All Prices' },
                    { id: 'under-25', label: 'Under $25' },
                    { id: '25-50', label: '$25 - $50' },
                    { id: '50-100', label: '$50 - $100' },
                    { id: 'over-100', label: '$100+' },
                  ].map(option => (
                    <label key={option.id} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="mobile-price"
                        checked={priceBracket === option.id}
                        onChange={() => setPriceBracket(option.id)}
                        className="text-[#1a73e8]"
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Mobile Size */}
              <div>
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">Size</h4>
                <div className="grid grid-cols-3 gap-1">
                  {allSizes.map(size => (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`py-1 rounded text-xs font-semibold border ${
                        selectedSizes.includes(size) ? 'bg-[#1a73e8] text-white border-[#1a73e8]' : 'bg-gray-50 text-gray-700 border-gray-200'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Brands */}
              <div>
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">Brand</h4>
                <div className="space-y-1.5 text-xs max-h-40 overflow-y-auto">
                  {allBrands.map(brand => (
                    <label key={brand} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className="rounded text-[#1a73e8]"
                      />
                      <span>{brand}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200 space-y-2">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 bg-[#1a73e8] text-white rounded-xl text-sm font-bold shadow-md cursor-pointer"
              >
                Apply Filters ({filteredProducts.length} Results)
              </button>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="w-full py-2 text-xs font-semibold text-gray-500 hover:text-red-500"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
