import React, { useState } from 'react';
import { BackgroundCanvas } from './components/3d/BackgroundCanvas';
import { Navbar, AppPage } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { MenuSection } from './components/MenuSection';
import { OurStorySection } from './components/OurStorySection';
import { ExperienceSection } from './components/ExperienceSection';
import { ReservationSection } from './components/ReservationSection';
import { LocationSection } from './components/LocationSection';
import { WhatsAppDrawer } from './components/WhatsAppDrawer';
import { Footer } from './components/Footer';
import { ToastContainer, ToastMessage } from './components/Toast';
import { MenuOrderingPage } from './pages/MenuOrderingPage';
import { AboutStoryPage } from './pages/AboutStoryPage';
import { ExperienceGalleryPage } from './pages/ExperienceGalleryPage';
import { ReservationContactPage } from './pages/ReservationContactPage';
import { CartItem, MenuItem, ReservationData } from './types/cafe';

export default function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Add toast notification
  const addToast = (title: string, description?: string, type: 'success' | 'info' = 'success') => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Add item to WhatsApp order list with optional quantity
  const handleAddToCart = (item: MenuItem, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id ? { ...ci, quantity: ci.quantity + quantity } : ci
        );
      }
      return [...prev, { item, quantity }];
    });

    addToast(
      `Added ${item.name} (${quantity}x)`,
      `₹${item.price * quantity} added to your WhatsApp order list.`,
      'info'
    );
  };

  // Update item quantity in cart
  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((ci) => {
          if (ci.item.id === itemId) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter((ci): ci is CartItem => ci !== null)
    );
  };

  // Remove item from cart
  const handleRemoveItem = (itemId: string) => {
    setCart((prev) => prev.filter((ci) => ci.item.id !== itemId));
  };

  // Clear cart
  const handleClearCart = () => {
    setCart([]);
  };

  // Table reservation confirmed callback
  const handleReservationConfirmed = (res: ReservationData) => {
    addToast(
      'Reservation Confirmed!',
      `Table for ${res.guests} on ${res.date} at ${res.time} reserved for ${res.name}.`,
      'success'
    );
  };

  // Navigate to Page 5 (Reservation & Contact)
  const handleOpenReservation = () => {
    setCurrentPage('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Explore menu navigates to Page 2 (Menu & Ordering Page)
  const handleExploreMenu = () => {
    setCurrentPage('menu');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open WhatsApp order drawer
  const handleOrderWhatsApp = () => {
    setIsCartOpen(true);
  };

  // Set of added item IDs for UI feedback
  const addedItemIds = new Set(cart.map((ci) => ci.item.id));
  const totalCartCount = cart.reduce((acc, ci) => acc + ci.quantity, 0);

  return (
    <div className="relative min-h-screen bg-[#E2E3E5] text-[#263238] overflow-x-hidden selection:bg-[#8FB4AC]/40 selection:text-[#263238]">
      {/* Subtle organic grain overlay for tactile analog depth */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Full-Viewport 3D Background Canvas (Persistent Animation across all 5 pages) */}
      <BackgroundCanvas />

      {/* Floating Toast Alerts */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Sticky Glassmorphic Navigation Bar */}
      <Navbar
        onOpenReservation={handleOpenReservation}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={totalCartCount}
        currentPage={currentPage}
        onNavigate={(page) => {
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Multi-Page Views (Page 1 Home, Page 2 Menu, Page 3 Story, Page 4 Experience, Page 5 Reserve & Contact) */}
      {currentPage === 'home' ? (
        /* PAGE 1: HOME PAGE */
        <main className="relative z-10 animate-in fade-in duration-300">
          {/* Two-Column Hero Section with Interactive 3D Canvas */}
          <HeroSection
            onExploreMenu={handleExploreMenu}
            onOrderWhatsApp={handleOrderWhatsApp}
          />

          <div className="gradient-divider my-2" />

          {/* Features & Highlights Section (3-column grid in soft warm oat #D7CCC8) */}
          <FeaturesSection />

          <div className="gradient-divider my-2" />

          {/* Featured Menu Preview Section with CTA to Page 2 */}
          <MenuSection
            onAddToCart={(it) => handleAddToCart(it, 1)}
            addedItemIds={addedItemIds}
          />

          {/* Banner navigating to Page 2 (Menu & Ordering Page) */}
          <section className="py-8 px-4 max-w-7xl mx-auto">
            <div className="glass-oat-card rounded-[2.5rem] p-8 sm:p-12 border border-white/80 shadow-[0_20px_50px_rgba(38,50,56,0.06)] flex flex-col sm:flex-row items-center justify-between gap-8 text-center sm:text-left relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#8FB4AC]/15 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <span className="text-[11px] font-tech font-bold uppercase tracking-[0.25em] text-[#263238]/60 block mb-2">
                  Full Catalog & Customization
                </span>
                <h3 className="font-headline text-2xl sm:text-3xl font-extrabold text-[#263238] tracking-tight text-balance">
                  Looking for our full culinary & bakery catalog?
                </h3>
                <p className="font-editorial italic text-base text-[#263238]/80 mt-2 max-w-xl">
                  Explore complete origin notes, allergen profiles, and custom brew ratios on Page 2.
                </p>
              </div>

              <button
                onClick={() => {
                  setCurrentPage('menu');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn-tactile px-8 py-4 rounded-2xl bg-[#8FB4AC] hover:bg-[#7fa79f] text-[#263238] font-headline font-bold text-sm tracking-wide shadow-md hover:shadow-xl shrink-0 cursor-pointer relative z-10 border border-[#8FB4AC]"
              >
                Go to Menu & Ordering Page (P2) →
              </button>
            </div>
          </section>

          <div className="gradient-divider my-2" />

          {/* Our Story Brief */}
          <OurStorySection />

          {/* Navigation link to Page 3 */}
          <section className="py-6 px-4 max-w-7xl mx-auto">
            <div className="bg-[#D7CCC8]/70 backdrop-blur-md rounded-[2.5rem] p-8 sm:p-10 border border-white/80 shadow-[0_15px_40px_rgba(38,50,56,0.05)] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
              <div>
                <span className="text-[10px] font-tech font-bold uppercase tracking-[0.25em] text-[#263238]/60 block mb-1">
                  Heritage & Philosophy
                </span>
                <h4 className="font-headline text-xl sm:text-2xl font-bold text-[#263238] tracking-tight">
                  Dive Deeper into Our Agrarian Roots
                </h4>
                <p className="font-sans-body text-xs sm:text-sm text-[#263238]/75 mt-1 max-w-lg">
                  Explore our interactive 4-step craft visualizer, meet the master roasters, and view our direct-trade sustainability pledge.
                </p>
              </div>
              <button
                onClick={() => {
                  setCurrentPage('story');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn-tactile px-7 py-3.5 rounded-2xl bg-[#263238] text-white hover:bg-[#34444c] font-headline font-bold text-xs tracking-wide shadow-sm hover:shadow-lg shrink-0 cursor-pointer"
              >
                Read Full Story (P3) →
              </button>
            </div>
          </section>

          <div className="gradient-divider my-2" />

          {/* Artisanal Roastery Experience Section */}
          <ExperienceSection />

          {/* Banner navigating to Page 4 (Experience & Gallery) */}
          <section className="py-6 px-4 max-w-7xl mx-auto">
            <div className="bg-[#8FB4AC]/20 backdrop-blur-md rounded-[2.5rem] p-8 sm:p-10 border border-[#8FB4AC]/40 shadow-[0_15px_40px_rgba(38,50,56,0.05)] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
              <div>
                <span className="text-[10px] font-tech font-bold uppercase tracking-[0.25em] text-[#263238]/70 block mb-1">
                  Atmosphere & Acoustic Architecture
                </span>
                <h4 className="font-headline text-xl sm:text-2xl font-bold text-[#263238] tracking-tight">
                  Experience the Vibe of Maison Moka
                </h4>
                <p className="font-sans-body text-xs sm:text-sm text-[#263238]/75 mt-1 max-w-lg">
                  Explore our virtual vibe selector, 3D tilt photo masonry gallery, and real guest impressions.
                </p>
              </div>
              <button
                onClick={() => {
                  setCurrentPage('experience');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn-tactile px-7 py-3.5 rounded-2xl bg-[#8FB4AC] text-[#263238] hover:bg-[#7fa79f] font-headline font-bold text-xs tracking-wide shadow-sm hover:shadow-md shrink-0 cursor-pointer border border-[#8FB4AC]"
              >
                Open Gallery & Vibe (P4) →
              </button>
            </div>
          </section>

          <div className="gradient-divider my-2" />

          {/* Table Reservation Engine Preview */}
          <ReservationSection
            onReservationConfirmed={handleReservationConfirmed}
          />

          <div className="gradient-divider my-2" />

          {/* Live Store Status & Map Section */}
          <LocationSection />
        </main>
      ) : currentPage === 'menu' ? (
        /* PAGE 2: MENU & ORDERING PAGE */
        <main className="relative z-10 animate-in fade-in duration-300">
          <MenuOrderingPage
            onBackToHome={() => {
              setCurrentPage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            cart={cart}
            onAddToCart={handleAddToCart}
            onOpenCart={() => setIsCartOpen(true)}
            addedItemIds={addedItemIds}
          />
        </main>
      ) : currentPage === 'story' ? (
        /* PAGE 3: ABOUT & STORY PAGE */
        <main className="relative z-10 animate-in fade-in duration-300">
          <AboutStoryPage
            onExploreMenu={() => {
              setCurrentPage('menu');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onBookTable={handleOpenReservation}
          />
        </main>
      ) : currentPage === 'experience' ? (
        /* PAGE 4: EXPERIENCE & GALLERY PAGE */
        <main className="relative z-10 animate-in fade-in duration-300">
          <ExperienceGalleryPage
            onExploreMenu={() => {
              setCurrentPage('menu');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onBookTable={handleOpenReservation}
          />
        </main>
      ) : (
        /* PAGE 5: RESERVATION & CONTACT PAGE */
        <main className="relative z-10 animate-in fade-in duration-300">
          <ReservationContactPage
            onReservationConfirmed={handleReservationConfirmed}
            onExploreMenu={handleExploreMenu}
          />
        </main>
      )}

      {/* Floating WhatsApp Quick-Order Widget (#25D366 Green + #8FB4AC Mint Accents) */}
      <WhatsAppDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onOpen={() => setIsCartOpen(true)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Global Minimal Dark Charcoal Footer */}
      <Footer />
    </div>
  );
}
