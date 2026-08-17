import React, { useState } from 'react';
import { X, Truck, Search, CheckCircle2, PackageCheck, Box, Clock } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const OrderTrackingModal: React.FC = () => {
  const { isOrderTrackingOpen, setIsOrderTrackingOpen, lastOrder } = useStore();
  const [orderQuery, setOrderQuery] = useState(lastOrder?.orderNumber || 'GGL-2026-984210');
  const [emailQuery, setEmailQuery] = useState('alex.developer@google.com');
  const [searched, setSearched] = useState(true);

  if (!isOrderTrackingOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto select-none">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
        onClick={() => setIsOrderTrackingOpen(false)} 
      />

      <div className="min-h-screen px-4 flex items-center justify-center p-4">
        <div className="relative bg-white rounded-3xl max-w-lg w-full shadow-2xl p-6 sm:p-8 border border-gray-200 animate-in fade-in zoom-in-95 duration-150 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 pb-4">
            <div className="flex items-center space-x-2">
              <Truck className="w-5 h-5 text-[#34a853]" />
              <h2 className="text-xl font-bold text-gray-900">
                Track Package Shipment
              </h2>
            </div>
            <button
              onClick={() => setIsOrderTrackingOpen(false)}
              className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Form */}
          <form onSubmit={(e) => { e.preventDefault(); setSearched(true); }} className="space-y-3">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Order #</label>
                <input
                  type="text"
                  value={orderQuery}
                  onChange={(e) => setOrderQuery(e.target.value)}
                  placeholder="e.g. GGL-2026-984210"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Billing Email</label>
                <input
                  type="email"
                  value={emailQuery}
                  onChange={(e) => setEmailQuery(e.target.value)}
                  placeholder="alex.developer@google.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2.5 bg-[#1a73e8] hover:bg-[#1557b0] text-white rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center justify-center space-x-1.5"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Lookup Tracking</span>
            </button>
          </form>

          {/* Tracking Timeline Status Display */}
          {searched && (
            <div className="bg-[#f8f9fa] rounded-2xl p-5 border border-gray-200 space-y-4">
              <div className="flex items-center justify-between text-xs border-b border-gray-200 pb-3">
                <div>
                  <span className="text-gray-500 font-medium">Carrier:</span>
                  <span className="font-bold text-gray-900 ml-1">FedEx Carbon-Neutral Ground</span>
                </div>
                <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-blue-100 text-[#1a73e8] font-bold text-[11px]">
                  <Clock className="w-3 h-3" />
                  <span>On Schedule</span>
                </div>
              </div>

              {/* Visual 4-Step Timeline */}
              <div className="space-y-4 pt-2">
                {[
                  { step: 'Order Placed & Verified', date: 'Aug 16, 2026 - 11:30 AM', completed: true },
                  { step: 'Packed in Zero-Waste Mailer', date: 'Aug 16, 2026 - 02:45 PM', completed: true },
                  { step: 'In Transit with FedEx', date: 'Mountain View Hub', current: true },
                  { step: 'Out for Final Delivery', date: 'Expected: Thursday, Aug 20', future: true },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3 text-xs">
                    <div className="mt-0.5">
                      {item.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-[#34a853]" />
                      ) : item.current ? (
                        <div className="w-4 h-4 rounded-full bg-[#1a73e8] flex items-center justify-center text-white text-[10px] font-bold">
                          •
                        </div>
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className={`font-bold ${item.future ? 'text-gray-400' : 'text-gray-900'}`}>
                        {item.step}
                      </div>
                      <div className="text-[11px] text-gray-500">{item.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
