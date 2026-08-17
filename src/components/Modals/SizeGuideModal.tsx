import React, { useState } from 'react';
import { X, Ruler, Sparkles, Check } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useStore();
  const [unit, setUnit] = useState<'in' | 'cm'>('in');
  
  // Fit Finder Calculator state
  const [heightFeet, setHeightFeet] = useState(5);
  const [heightInches, setHeightInches] = useState(10);
  const [weightLbs, setWeightLbs] = useState(165);
  const [fitPreference, setFitPreference] = useState<'slim' | 'regular' | 'relaxed'>('regular');

  if (!isSizeGuideOpen) return null;

  // Simple smart calculation for size recommendation
  const calculateRecommendedSize = () => {
    const totalInches = heightFeet * 12 + heightInches;
    if (weightLbs < 135) return fitPreference === 'relaxed' ? 'S' : 'XS';
    if (weightLbs < 155) return fitPreference === 'relaxed' ? 'M' : 'S';
    if (weightLbs < 185) return fitPreference === 'slim' ? 'M' : fitPreference === 'relaxed' ? 'XL' : 'L';
    if (weightLbs < 215) return fitPreference === 'slim' ? 'L' : 'XL';
    return '2XL';
  };

  const recommended = calculateRecommendedSize();

  const sizeChartInches = [
    { size: 'XS', chest: '34 - 36', length: '26.5', sleeve: '32.5' },
    { size: 'S', chest: '36 - 38', length: '27.5', sleeve: '33.5' },
    { size: 'M', chest: '39 - 41', length: '28.5', sleeve: '34.5' },
    { size: 'L', chest: '42 - 44', length: '29.5', sleeve: '35.5' },
    { size: 'XL', chest: '45 - 48', length: '30.5', sleeve: '36.5' },
    { size: '2XL', chest: '49 - 52', length: '31.5', sleeve: '37.5' },
  ];

  const sizeChartCm = [
    { size: 'XS', chest: '86 - 91', length: '67.3', sleeve: '82.5' },
    { size: 'S', chest: '91 - 96', length: '69.8', sleeve: '85.0' },
    { size: 'M', chest: '99 - 104', length: '72.4', sleeve: '87.6' },
    { size: 'L', chest: '106 - 112', length: '74.9', sleeve: '90.2' },
    { size: 'XL', chest: '114 - 122', length: '77.5', sleeve: '92.7' },
    { size: '2XL', chest: '124 - 132', length: '80.0', sleeve: '95.3' },
  ];

  const activeChart = unit === 'in' ? sizeChartInches : sizeChartCm;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto select-none">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
        onClick={() => setIsSizeGuideOpen(false)} 
      />

      <div className="min-h-screen px-4 flex items-center justify-center p-4">
        <div className="relative bg-white rounded-3xl max-w-xl w-full shadow-2xl p-6 sm:p-8 border border-gray-200 animate-in fade-in zoom-in-95 duration-150 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 pb-4">
            <div className="flex items-center space-x-2">
              <Ruler className="w-5 h-5 text-[#1a73e8]" />
              <h2 className="text-xl font-bold text-gray-900">
                Official Google Size & Fit Guide
              </h2>
            </div>
            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Smart Fit Finder Interactive Tool */}
          <div className="bg-blue-50/60 rounded-2xl p-5 border border-blue-100 space-y-3">
            <div className="flex items-center space-x-2 text-xs font-bold text-[#1a73e8] uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#fbbc05]" />
              <span>Smart Fit Recommendation Engine</span>
            </div>

            <div className="grid grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Height</label>
                <div className="flex items-center space-x-1">
                  <select
                    value={heightFeet}
                    onChange={(e) => setHeightFeet(Number(e.target.value))}
                    className="bg-white border border-gray-300 rounded px-2 py-1.5 text-xs font-bold"
                  >
                    {[4, 5, 6, 7].map((f) => (
                      <option key={f} value={f}>{f} ft</option>
                    ))}
                  </select>
                  <select
                    value={heightInches}
                    onChange={(e) => setHeightInches(Number(e.target.value))}
                    className="bg-white border border-gray-300 rounded px-2 py-1.5 text-xs font-bold"
                  >
                    {[...Array(12)].map((_, i) => (
                      <option key={i} value={i}>{i} in</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Weight ({weightLbs} lbs)</label>
                <input
                  type="range"
                  min={100}
                  max={260}
                  value={weightLbs}
                  onChange={(e) => setWeightLbs(Number(e.target.value))}
                  className="w-full h-2 bg-blue-200 rounded-lg cursor-pointer accent-[#1a73e8] mt-2"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Fit Preference</label>
                <select
                  value={fitPreference}
                  onChange={(e) => setFitPreference(e.target.value as any)}
                  className="bg-white border border-gray-300 rounded px-2 py-1.5 text-xs font-bold w-full"
                >
                  <option value="slim">Slim Athletic</option>
                  <option value="regular">Standard Regular</option>
                  <option value="relaxed">Relaxed Oversized</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-blue-200 text-xs">
              <span className="text-gray-700">Recommended Size For You:</span>
              <span className="inline-flex items-center space-x-1.5 bg-[#1a73e8] text-white px-3 py-1 rounded-full font-bold shadow-xs">
                <Check className="w-3.5 h-3.5" />
                <span>Size {recommended}</span>
              </span>
            </div>
          </div>

          {/* Unit Toggle & Table */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-gray-800 uppercase tracking-wider">Garment Measurements</span>
              <div className="flex items-center space-x-1 bg-gray-100 p-0.5 rounded-lg text-xs font-bold">
                <button
                  onClick={() => setUnit('in')}
                  className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                    unit === 'in' ? 'bg-white shadow-xs text-gray-900' : 'text-gray-500'
                  }`}
                >
                  Inches
                </button>
                <button
                  onClick={() => setUnit('cm')}
                  className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                    unit === 'cm' ? 'bg-white shadow-xs text-gray-900' : 'text-gray-500'
                  }`}
                >
                  Centimeters
                </button>
              </div>
            </div>

            <div className="border border-gray-200 rounded-xl overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#f8f9fa] border-b border-gray-200 text-gray-700 font-bold uppercase">
                  <tr>
                    <th className="py-2.5 px-3">Size</th>
                    <th className="py-2.5 px-3">Chest ({unit})</th>
                    <th className="py-2.5 px-3">Body Length ({unit})</th>
                    <th className="py-2.5 px-3">Sleeve Length ({unit})</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {activeChart.map((row) => (
                    <tr key={row.size} className={`hover:bg-gray-50 ${row.size === recommended ? 'bg-blue-50/50 font-bold text-[#1a73e8]' : ''}`}>
                      <td className="py-2 px-3">{row.size} {row.size === recommended ? '★' : ''}</td>
                      <td className="py-2 px-3">{row.chest}</td>
                      <td className="py-2 px-3">{row.length}</td>
                      <td className="py-2 px-3">{row.sleeve}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="text-[11px] text-gray-500 space-y-1 bg-gray-50 p-3 rounded-lg border border-gray-200">
            <p><strong>Chest:</strong> Measure across the fullest part of the chest, keeping tape horizontal under arms.</p>
            <p><strong>Body Length:</strong> Measured from highest point of shoulder to bottom hem.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
