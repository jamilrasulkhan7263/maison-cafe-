import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, MessageCircle, Clock, ChevronRight } from 'lucide-react';
import { MaisonLogo } from './MaisonLogo';

export type AppPage = 'home' | 'menu' | 'story' | 'experience' | 'contact';

interface NavbarProps {
  onOpenReservation: () => void;
  onOpenCart: () => void;
  cartCount: number;
  currentPage: AppPage;
  onNavigate: (page: AppPage) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenReservation,
  onOpenCart,
  cartCount,
  currentPage,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [storeStatus, setStoreStatus] = useState<{
    isOpen: boolean;
    label: string;
  }>({
    isOpen: false,
    label: 'Checking...',
  });

  // Calculate live dynamic store status (Open 7:30 AM till 11:00 PM)
  useEffect(() => {
    const checkStoreStatus = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const currentMinutes = hours * 60 + minutes;

      const openMinutes = 7 * 60 + 30; // 7:30 AM (450 mins)
      const closeMinutes = 23 * 60; // 11:00 PM (1380 mins)

      if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
        setStoreStatus({
          isOpen: true,
          label: 'Open Now · Till 11 PM',
        });
      } else {
        setStoreStatus({
          isOpen: false,
          label: 'Closed',
        });
      }
    };

    checkStoreStatus();
    const interval = setInterval(checkStoreStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { label: 'Home', page: 'home' as const, href: '#home' },
    { label: 'Menu & Ordering', page: 'menu' as const, href: '#menu' },
    { label: 'Our Story', page: 'story' as const, href: '#story' },
    { label: 'Experience', page: 'experience' as const, href: '#experience' },
    { label: 'Reserve & Contact', page: 'contact' as const, href: '#reservation' },
  ];

  const handleLinkClick = (link: (typeof navLinks)[0]) => {
    setMobileMenuOpen(false);
    if (link.page !== currentPage) {
      onNavigate(link.page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (link.href === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const target = document.querySelector(link.href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="sticky top-0 left-0 right-0 z-40 bg-[#E2E3E5]/85 backdrop-blur-xl border-b border-[#D7CCC8]/80 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          {/* Bespoke Logo & Brand Monogram Lockup */}
          <button
            type="button"
            onClick={() => {
              onNavigate('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group cursor-pointer focus:outline-none"
            aria-label="Maison Moka Home"
          >
            <MaisonLogo badgeSize={38} />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-3">
            {/* 5-Page Switcher Architectural Segment */}
            <div className="flex items-center bg-white/60 backdrop-blur-md p-1 rounded-2xl border border-white/80 shadow-2xs mr-1">
              <button
                type="button"
                onClick={() => {
                  onNavigate('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-headline font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  currentPage === 'home'
                    ? 'bg-[#263238] text-white shadow-xs'
                    : 'text-[#263238]/70 hover:text-[#263238] hover:bg-white/50'
                }`}
              >
                P1 Home
              </button>
              <button
                type="button"
                onClick={() => {
                  onNavigate('menu');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-headline font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  currentPage === 'menu'
                    ? 'bg-[#8FB4AC] text-[#263238] shadow-xs'
                    : 'text-[#263238]/70 hover:text-[#263238] hover:bg-white/50'
                }`}
              >
                P2 Menu
              </button>
              <button
                type="button"
                onClick={() => {
                  onNavigate('story');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-headline font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  currentPage === 'story'
                    ? 'bg-[#8FB4AC] text-[#263238] shadow-xs'
                    : 'text-[#263238]/70 hover:text-[#263238] hover:bg-white/50'
                }`}
              >
                P3 Story
              </button>
              <button
                type="button"
                onClick={() => {
                  onNavigate('experience');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-headline font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  currentPage === 'experience'
                    ? 'bg-[#8FB4AC] text-[#263238] shadow-xs'
                    : 'text-[#263238]/70 hover:text-[#263238] hover:bg-white/50'
                }`}
              >
                P4 Vibe
              </button>
              <button
                type="button"
                onClick={() => {
                  onNavigate('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-headline font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  currentPage === 'contact'
                    ? 'bg-[#8FB4AC] text-[#263238] shadow-xs'
                    : 'text-[#263238]/70 hover:text-[#263238] hover:bg-white/50'
                }`}
              >
                P5 Reserve
              </button>
            </div>

            {navLinks.map((link) => {
              const isItemActive = currentPage === link.page;

              return (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => handleLinkClick(link)}
                  className={`text-xs font-sans-body tracking-wide transition-colors relative py-1 cursor-pointer whitespace-nowrap px-2 ${
                    isItemActive
                      ? 'text-[#263238] font-bold after:w-full'
                      : 'text-[#263238]/75 hover:text-[#263238]'
                  } after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-[#8FB4AC] hover:after:w-full after:transition-all after:duration-300`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Elements: Live Status, Cart bag & Book Table */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Live dynamic store status indicator */}
            <div
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-tech font-semibold tracking-wider transition-all ${
                storeStatus.isOpen
                  ? 'bg-white/70 text-emerald-900 border border-emerald-600/20'
                  : 'bg-white/70 text-amber-900 border border-amber-600/20'
              }`}
              title="Calculated from your local system clock"
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  storeStatus.isOpen ? 'bg-emerald-600 animate-pulse' : 'bg-amber-600'
                }`}
              />
              <Clock className="w-3.5 h-3.5 text-[#263238]/50" />
              <span>{storeStatus.label}</span>
            </div>

            {/* Quick Order list trigger */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-xl text-[#263238] bg-white/80 hover:bg-white border border-white/80 hover:border-[#8FB4AC]/50 transition-all shadow-2xs hover:shadow-sm cursor-pointer btn-tactile"
              aria-label="View WhatsApp Order items"
              title="Quick WhatsApp Order list"
            >
              <MessageCircle className="w-4 h-4 text-[#263238]" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#8FB4AC] text-[#263238] text-[11px] font-bold rounded-full flex items-center justify-center shadow-xs border border-white">
                  {cartCount}
                </span>
              )}
            </button>

            {/* 'Book Table' CTA button in #8FB4AC (Navigates directly to Page 5) */}
            <button
              onClick={() => {
                onNavigate('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn-tactile px-5 py-2.5 rounded-2xl bg-[#8FB4AC] hover:bg-[#7fa79f] text-[#263238] text-xs font-headline font-bold uppercase tracking-wider transition-all shadow-sm hover:shadow-md flex items-center gap-2 cursor-pointer border border-[#8FB4AC]"
            >
              <Calendar className="w-4 h-4 text-[#263238]" />
              <span>Book Table</span>
            </button>
          </div>

          {/* Mobile Status Badge & Burger Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenCart}
              className="relative p-2 rounded-lg bg-white/70 text-[#263238] border border-[#D7CCC8]"
              aria-label="Cart"
            >
              <MessageCircle className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#8FB4AC] text-[#263238] text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/70 text-[#263238] hover:bg-white transition-colors border border-[#D7CCC8]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 sm:hidden">
          <div
            className="fixed inset-0 bg-[#263238]/30 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-14 right-0 bottom-0 w-4/5 max-w-sm bg-[#E2E3E5] p-6 shadow-2xl flex flex-col justify-between border-l border-[#D7CCC8] animate-in slide-in-from-right duration-200">
            <div className="space-y-6">
              <div className="pb-4 border-b border-[#263238]/10 flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-[#263238]/60 font-tech font-bold">
                  Pages & Navigation
                </span>
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    storeStatus.isOpen
                      ? 'bg-emerald-500/15 text-emerald-800'
                      : 'bg-amber-500/15 text-amber-800'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      storeStatus.isOpen ? 'bg-emerald-600' : 'bg-amber-600'
                    }`}
                  />
                  {storeStatus.label}
                </span>
              </div>

              {/* 5-Page Switcher in Mobile Drawer */}
              <div className="grid grid-cols-2 gap-2 bg-white/70 p-1.5 rounded-xl border border-[#D7CCC8]">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate('home');
                  }}
                  className={`py-2 rounded-lg text-xs font-bold transition-all text-center ${
                    currentPage === 'home'
                      ? 'bg-[#263238] text-white'
                      : 'text-[#263238]/70 hover:text-[#263238]'
                  }`}
                >
                  P1 Home
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate('menu');
                  }}
                  className={`py-2 rounded-lg text-xs font-bold transition-all text-center ${
                    currentPage === 'menu'
                      ? 'bg-[#8FB4AC] text-[#263238]'
                      : 'text-[#263238]/70 hover:text-[#263238]'
                  }`}
                >
                  P2 Menu
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate('story');
                  }}
                  className={`py-2 rounded-lg text-xs font-bold transition-all text-center ${
                    currentPage === 'story'
                      ? 'bg-[#8FB4AC] text-[#263238]'
                      : 'text-[#263238]/70 hover:text-[#263238]'
                  }`}
                >
                  P3 Story
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate('experience');
                  }}
                  className={`py-2 rounded-lg text-xs font-bold transition-all text-center ${
                    currentPage === 'experience'
                      ? 'bg-[#8FB4AC] text-[#263238]'
                      : 'text-[#263238]/70 hover:text-[#263238]'
                  }`}
                >
                  P4 Vibe
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate('contact');
                  }}
                  className={`col-span-2 py-2 rounded-lg text-xs font-bold transition-all text-center ${
                    currentPage === 'contact'
                      ? 'bg-[#8FB4AC] text-[#263238]'
                      : 'text-[#263238]/70 hover:text-[#263238]'
                  }`}
                >
                  P5 Reserve & Contact
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {navLinks.map((link) => {
                  const isItemActive = currentPage === link.page;

                  return (
                    <button
                      key={link.label}
                      type="button"
                      onClick={() => handleLinkClick(link)}
                      className={`flex items-center justify-between text-base py-2.5 border-b border-[#263238]/5 text-left w-full ${
                        isItemActive ? 'font-bold text-[#263238]' : 'font-medium text-[#263238]/80'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronRight className={`w-4 h-4 ${isItemActive ? 'text-[#263238]' : 'text-[#8FB4AC]'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3 pt-6 border-t border-[#263238]/10">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('contact');
                }}
                className="w-full py-3.5 rounded-xl bg-[#8FB4AC] text-[#263238] text-sm font-semibold tracking-wide flex items-center justify-center gap-2 shadow-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Table</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCart();
                }}
                className="w-full py-3 rounded-xl bg-white/80 text-[#263238] text-sm font-medium border border-[#D7CCC8] flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Order List ({cartCount})</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
