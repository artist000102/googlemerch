import React, { useState } from 'react';
import { Leaf, RefreshCw, Box, Send, CheckCircle2 } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const SustainabilityBanner: React.FC = () => {
  const { navigateTo, showToast } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      showToast({
        title: 'Welcome to Google Store Insiders!',
        description: 'Check your inbox for your 20% off welcome code (WELCOME20).',
        type: 'success',
      });
    }
  };

  return (
    <div className="space-y-16 py-8">
      {/* Sustainability Pillar Block */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#e6f4ea] rounded-3xl p-8 sm:p-12 border border-[#ceead6] relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center space-x-2 bg-white px-3 py-1 rounded-full text-xs font-bold text-[#137333]">
                <Leaf className="w-3.5 h-3.5 text-[#34a853]" />
                <span>CIRCULAR & CONSCIOUS MERCHANDISE</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#137333] tracking-tight">
                Designed for the future. Made with recycled materials.
              </h2>

              <p className="text-base text-gray-700 leading-relaxed max-w-xl">
                Every Google apparel piece and accessory is crafted following strict environmental standards. From GOTS-certified organic cotton to 100% post-consumer ocean plastic packaging and carbon-neutral ground shipping on every single order.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="bg-white/80 backdrop-blur-xs rounded-xl p-4 border border-green-200">
                  <div className="text-2xl font-black text-[#137333]">100%</div>
                  <div className="text-xs text-gray-600 font-medium mt-1">Plastic-free circular mailers</div>
                </div>
                <div className="bg-white/80 backdrop-blur-xs rounded-xl p-4 border border-green-200">
                  <div className="text-2xl font-black text-[#137333]">Zero</div>
                  <div className="text-xs text-gray-600 font-medium mt-1">Waste water recycling dyes</div>
                </div>
                <div className="bg-white/80 backdrop-blur-xs rounded-xl p-4 border border-green-200">
                  <div className="text-2xl font-black text-[#137333]">Net 0</div>
                  <div className="text-xs text-gray-600 font-medium mt-1">Carbon offset shipping</div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => navigateTo('sustainability')}
                  className="inline-flex items-center space-x-2 bg-[#137333] hover:bg-[#0d5324] text-white px-6 py-3 rounded-full text-sm font-semibold transition-all cursor-pointer shadow-xs"
                >
                  <span>Learn About Our Sustainability Journey</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="aspect-4/3 rounded-2xl overflow-hidden shadow-md bg-white border border-green-200">
                <img
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80"
                  alt="Sustainable materials"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#202124] text-white rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
          {/* Background subtle color dots */}
          <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-[#4285f4]/10 blur-2xl" />
          <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-[#ea4335]/10 blur-2xl" />

          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl font-['Plus_Jakarta_Sans',sans-serif]">
              Join the Google Insider Club
            </h2>
            <p className="text-gray-300 text-base">
              Be the first to hear about limited 1998 Retro drops, exclusive employee collaborations, and secret discount codes.
            </p>

            {subscribed ? (
              <div className="bg-[#34a853]/20 border border-[#34a853] text-green-300 px-6 py-4 rounded-xl inline-flex items-center space-x-2 text-sm font-semibold">
                <CheckCircle2 className="w-5 h-5 text-[#34a853]" />
                <span>You&apos;re subscribed! Use promo code <strong>WELCOME20</strong> at checkout for 20% off.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#4285f4] focus:bg-white/20 transition-all"
                />
                <button
                  type="submit"
                  className="bg-[#1a73e8] hover:bg-[#1557b0] text-white px-7 py-3.5 rounded-full text-sm font-bold transition-all shadow-md cursor-pointer flex items-center justify-center space-x-2 shrink-0"
                >
                  <span>Subscribe</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}

            <div className="text-[11px] text-gray-400 pt-2">
              By subscribing, you agree to our Privacy Policy and Terms of Use. Unsubscribe anytime.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
