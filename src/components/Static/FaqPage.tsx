import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Mail, Truck, RefreshCw, ShieldCheck } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const FaqPage: React.FC = () => {
  const { navigateTo, formatPrice } = useStore();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Is this official Google merchandise?',
      a: 'Yes. All merchandise offered in the Google Merchandise Store is officially licensed by Google LLC and manufactured under strict Google brand, quality, and ethical labor guidelines.'
    },
    {
      q: 'What is the 1998 Heritage Collection?',
      a: 'The 1998 Heritage Collection celebrates Google’s founding year with classic vintage color-blocked serif logos, collegiate-cut heavy fleece sweatshirts, dad hats, and throwback accessories.'
    },
    {
      q: 'How does shipping work and do you offer free shipping?',
      a: `We offer Free Standard Ground Shipping on all orders of ${formatPrice(100)} or more. For orders under ${formatPrice(100)}, standard shipping is ${formatPrice(5.99)}. 2-Day Priority (${formatPrice(14.99)}) and Overnight (${formatPrice(24.99)}) options are also available.`
    },
    {
      q: 'What is your return & exchange policy?',
      a: 'We gladly accept returns and size exchanges within 30 days of delivery for any unworn, unwashed items in original condition with tags attached. Return shipping labels are complimentary for domestic exchanges.'
    },
    {
      q: 'How do your apparel sizes fit?',
      a: 'Our apparel follows standard North American unisex sizing. Most styles offer a true-to-size classic fit. Use our interactive Size Chart & Smart Fit Calculator on any product page for exact measurements in inches and cm.'
    },
    {
      q: 'Can I place bulk or team orders for my company/event?',
      a: 'Yes! For corporate bulk orders exceeding 50 units per style, please contact our dedicated business merchandising team via bulk-orders@merch.google.'
    }
  ];

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 bg-blue-50 text-[#1a73e8] px-3.5 py-1 rounded-full text-xs font-bold">
            <HelpCircle className="w-4 h-4" />
            <span>HELP & SUPPORT</span>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-gray-500">
            Find quick answers to common questions about orders, shipping, sizing, and returns.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="border border-gray-200 rounded-2xl divide-y divide-gray-200 overflow-hidden shadow-xs">
          {faqs.map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="p-5 bg-white hover:bg-gray-50 transition-colors">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left font-bold text-gray-900 text-sm cursor-pointer"
                >
                  <span>{item.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-[#1a73e8]" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </button>
                {isOpen && (
                  <div className="mt-3 text-xs text-gray-600 leading-relaxed pr-6 animate-in fade-in duration-150">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Us Card */}
        <div className="bg-[#f8f9fa] rounded-2xl p-6 border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-gray-900">Still have questions?</h4>
            <p className="text-xs text-gray-500">Our Google Merch support team is available Mon-Fri, 9am - 6pm PT.</p>
          </div>
          <a
            href="mailto:support@merch.google"
            className="px-5 py-2.5 bg-[#1a73e8] hover:bg-[#1557b0] text-white rounded-full text-xs font-bold transition-all shadow-xs inline-flex items-center space-x-1.5 shrink-0"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email Customer Care</span>
          </a>
        </div>
      </div>
    </div>
  );
};
