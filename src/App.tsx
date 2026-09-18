import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { VideoModal } from './components/VideoModal';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { AllocationDrawer, AllocationItem } from './components/AllocationDrawer';

// Eager HomePage for instant initial paint
import { HomePage } from './pages/HomePage';

// Route-level code-split chunks for secondary pages
const StoryPage = lazy(() => import('./pages/StoryPage').then((m) => ({ default: m.StoryPage })));
const WaterPage = lazy(() => import('./pages/WaterPage').then((m) => ({ default: m.WaterPage })));
const ProductsPage = lazy(() => import('./pages/ProductsPage').then((m) => ({ default: m.ProductsPage })));
const PerformancePage = lazy(() => import('./pages/PerformancePage').then((m) => ({ default: m.PerformancePage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));

// Luxury fallback spinner
function PageLoader() {
  return (
    <div className="w-full min-h-[70vh] flex flex-col items-center justify-center gap-4 bg-brand-dark text-white">
      <div className="w-10 h-10 rounded-full border border-brand-amber/30 border-t-brand-amber animate-spin" />
      <span className="text-[10px] font-mono tracking-mega uppercase text-white/50">Loading Botvor Telemetry...</span>
    </div>
  );
}

gsap.registerPlugin(ScrollTrigger);

export function App() {
  const [loading, setLoading] = useState(true);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  // Cart / Allocation State
  const [allocationItems, setAllocationItems] = useState<AllocationItem[]>([
    { productId: 'botvor-500-still', quantity: 2 },
    { productId: 'botvor-750-sparkling', quantity: 1 },
  ]);

  // Add to cart handler
  const handleAddToCart = (productId: string) => {
    setAllocationItems((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (existing) {
        return prev.map((item) =>
          item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { productId, quantity: 1 }];
    });
    setCartDrawerOpen(true);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setAllocationItems((prev) => {
      return prev
        .map((item) => {
          if (item.productId === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as AllocationItem[];
    });
  };

  const handleRemoveItem = (productId: string) => {
    setAllocationItems((prev) => prev.filter((it) => it.productId !== productId));
  };

  const totalCartCount = allocationItems.reduce((acc, curr) => acc + curr.quantity, 0);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    (window as any).lenis = lenis;
    (window as any).ScrollTrigger = ScrollTrigger;

    const handleLoad = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('load', handleLoad);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      delete (window as any).lenis;
    };
  }, []);

  // Lock Lenis background scroll when modals/drawers are open
  useEffect(() => {
    const lenis = (window as any).lenis as Lenis | undefined;
    if (!lenis) return;
    if (cartDrawerOpen || videoModalOpen) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [cartDrawerOpen, videoModalOpen]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="relative min-h-screen bg-brand-dark text-brand-light selection:bg-brand-amber selection:text-black overflow-x-clip flex flex-col justify-between">
        {/* Desktop Custom Cursor */}
        <CustomCursor />

        {/* Multi-Page Navigation Bar */}
        <Navbar
          cartCount={totalCartCount}
          onOpenCart={() => setCartDrawerOpen(true)}
          onOpenFilmModal={() => setVideoModalOpen(true)}
        />

        {/* Main Routed Content with Code-Split Route Suspense */}
        <main className="flex-1">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route
                path="/"
                element={<HomePage onOpenFilmModal={() => setVideoModalOpen(true)} />}
              />
              <Route path="/story" element={<StoryPage />} />
              <Route path="/water" element={<WaterPage />} />
              <Route
                path="/products"
                element={<ProductsPage onAddToCart={handleAddToCart} />}
              />
              <Route path="/performance" element={<PerformancePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>

        {/* Global Luxury Footer */}
        <Footer />

        {/* Slide-out Allocation / Cart Drawer */}
        <AllocationDrawer
          isOpen={cartDrawerOpen}
          onClose={() => setCartDrawerOpen(false)}
          items={allocationItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
        />

        {/* Fullscreen Campaign Video Modal */}
        <VideoModal
          isOpen={videoModalOpen}
          onClose={() => setVideoModalOpen(false)}
          videoSrc="/videos/hero_optimized.mp4"
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
