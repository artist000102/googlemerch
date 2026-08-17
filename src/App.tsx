/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Header/Navbar';
import { HeroBanner } from './components/Home/HeroBanner';
import { FeatureGrids } from './components/Home/FeatureGrids';
import { ProductCarousel } from './components/Home/ProductCarousel';
import { SustainabilityBanner } from './components/Home/SustainabilityBanner';
import { CatalogPage } from './components/Catalog/CatalogPage';
import { ProductDetailPage } from './components/Product/ProductDetailPage';
import { CheckoutPage } from './components/Cart/CheckoutPage';
import { WishlistPage } from './components/Wishlist/WishlistPage';
import { SustainabilityPage } from './components/Static/SustainabilityPage';
import { FaqPage } from './components/Static/FaqPage';
import { Footer } from './components/Footer/Footer';
import { CartDrawer } from './components/Cart/CartDrawer';
import { QuickViewModal } from './components/Modals/QuickViewModal';
import { SizeGuideModal } from './components/Modals/SizeGuideModal';
import { OrderTrackingModal } from './components/Modals/OrderTrackingModal';
import { ToastContainer } from './components/UI/ToastContainer';

const MainRouter: React.FC = () => {
  const { currentView } = useStore();

  // Scroll to top whenever page view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  return (
    <div className="min-h-screen flex flex-col bg-white font-['Roboto',sans-serif] antialiased text-gray-900 selection:bg-blue-100 selection:text-[#1a73e8]">
      {/* Top Header & Mega Navigation */}
      <Navbar />

      {/* Dynamic View Content */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            <HeroBanner />
            <FeatureGrids />
            <SustainabilityBanner />
          </>
        )}

        {currentView === 'shop' && <CatalogPage />}
        {currentView === 'pdp' && <ProductDetailPage />}
        {(currentView === 'cart' || currentView === 'checkout') && <CheckoutPage />}
        {currentView === 'wishlist' && <WishlistPage />}
        {currentView === 'sustainability' && <SustainabilityPage />}
        {currentView === 'faq' && <FaqPage />}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Global Modals & Overlay Drawers */}
      <CartDrawer />
      <QuickViewModal />
      <SizeGuideModal />
      <OrderTrackingModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainRouter />
    </StoreProvider>
  );
}
