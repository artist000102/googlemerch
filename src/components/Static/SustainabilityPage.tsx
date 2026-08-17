import React from 'react';
import { Leaf, RefreshCw, Box, ShieldCheck, HeartHandshake, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const SustainabilityPage: React.FC = () => {
  const { navigateTo } = useStore();

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-green-50 text-[#137333] px-4 py-1.5 rounded-full text-xs font-bold">
            <Leaf className="w-4 h-4 text-[#34a853]" />
            <span>OUR PLANET COMMITMENT</span>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
            Sustainability at the Google Merchandise Store
          </h1>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            From the raw cotton seed to your doorstep, we hold every piece of Google merchandise to the highest ethical and circular environmental standards.
          </p>
        </div>

        {/* 4 Core Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-[#f8f9fa] rounded-2xl p-6 border border-gray-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-green-100 text-[#137333] flex items-center justify-center">
              <Leaf className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">100% Organic & Recycled Fabrics</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Our sweatshirts, t-shirts, and tote bags are woven exclusively from GOTS-certified organic cotton and post-consumer recycled polyester fleece.
            </p>
          </div>

          <div className="bg-[#f8f9fa] rounded-2xl p-6 border border-gray-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#1a73e8] flex items-center justify-center">
              <Box className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Plastic-Free Circular Mailers</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Orders are packaged in 100% recycled paper mailers with water-activated non-toxic starch tape and vegetable-based inks.
            </p>
          </div>

          <div className="bg-[#f8f9fa] rounded-2xl p-6 border border-gray-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#b06000] flex items-center justify-center">
              <RefreshCw className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Carbon-Neutral Ground Shipping</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              We calculate and offset 100% of carbon emissions generated through courier transit for all standard ground deliveries.
            </p>
          </div>

          <div className="bg-[#f8f9fa] rounded-2xl p-6 border border-gray-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#8430ce] flex items-center justify-center">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Fair Trade Certified Labor</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              All factories comply with the rigorous Google Supplier Code of Conduct, ensuring safe workplaces and fair living wages.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <button
            onClick={() => navigateTo('shop')}
            className="px-8 py-3.5 bg-[#137333] hover:bg-[#0d5324] text-white rounded-full font-bold text-sm shadow-md transition-all cursor-pointer inline-flex items-center space-x-2"
          >
            <span>Shop Sustainable Google Gear</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
