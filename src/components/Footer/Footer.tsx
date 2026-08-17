import React from 'react';
import { Truck, RotateCcw, Mail, HelpCircle, Leaf, ShieldCheck, Globe } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const Footer: React.FC = () => {
  const { navigateTo, setIsOrderTrackingOpen, currency, setCurrency } = useStore();

  return (
    <footer className="bg-white border-t border-gray-200 text-gray-600 select-none">
      {/* 4 Trust Highlights Strip */}
      <div className="border-b border-gray-100 bg-[#f8f9fa] py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-xs">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-blue-100 text-[#1a73e8] flex items-center justify-center shrink-0">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-gray-900">Free Ground Shipping</div>
              <div className="text-[11px] text-gray-500">On all domestic orders over $100</div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-green-100 text-[#137333] flex items-center justify-center shrink-0">
              <RotateCcw className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-gray-900">30-Day Free Returns</div>
              <div className="text-[11px] text-gray-500">Hassle-free exchanges on unworn items</div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-amber-100 text-[#b06000] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-gray-900">100% Authentic Google</div>
              <div className="text-[11px] text-gray-500">Official authorized merchandise</div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-emerald-100 text-[#137333] flex items-center justify-center shrink-0">
              <Leaf className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-gray-900">Eco-Friendly Packaging</div>
              <div className="text-[11px] text-gray-500">Recycled circular shipping mailers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-xs font-semibold text-gray-600 border-b border-gray-100 pb-8">
          <button
            onClick={() => navigateTo('faq')}
            className="hover:text-[#1a73e8] transition-colors cursor-pointer"
          >
            Returns and Exchanges
          </button>
          <span>•</span>
          <a
            href="mailto:support@merch.google"
            className="hover:text-[#1a73e8] transition-colors cursor-pointer"
          >
            Email Us
          </a>
          <span>•</span>
          <button
            onClick={() => setIsOrderTrackingOpen(true)}
            className="hover:text-[#1a73e8] transition-colors cursor-pointer"
          >
            Track Order
          </button>
          <span>•</span>
          <button
            onClick={() => navigateTo('faq')}
            className="hover:text-[#1a73e8] transition-colors cursor-pointer"
          >
            Shipping & FAQs
          </button>
          <span>•</span>
          <button
            onClick={() => navigateTo('sustainability')}
            className="hover:text-[#1a73e8] transition-colors cursor-pointer"
          >
            Sustainability
          </button>
        </div>

        {/* Bottom Legal & Currency Switcher */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-gray-500">
          <div className="text-center md:text-left space-y-1">
            <p>
              Operated under license from Google LLC. All Rights Reserved. © {new Date().getFullYear()} Google LLC.
            </p>
            <p className="text-gray-400">
              Google, Android, YouTube, Chrome, Google Cloud, and Pixel are trademarks of Google LLC.
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1.5 text-xs text-gray-600">
              <Globe className="w-3.5 h-3.5" />
              <span>United States ({currency})</span>
            </div>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as any)}
              className="bg-gray-100 border border-gray-300 text-gray-800 text-[11px] font-bold rounded-md px-2 py-1 cursor-pointer"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="CAD">CAD ($)</option>
              <option value="JPY">JPY (¥)</option>
              <option value="AUD">AUD ($)</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
};
