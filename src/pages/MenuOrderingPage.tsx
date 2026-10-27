import React, { useState, useMemo } from 'react';
import { MenuCategory, MenuItem, CartItem } from '../types/cafe';
import { MENU_ITEMS } from '../data/menuData';
import { MenuCardPage2 } from '../components/MenuCardPage2';
import { ItemDetailModal } from '../components/ItemDetailModal';
import { MaisonLogo } from '../components/MaisonLogo';
import {
  Search,
  X,
  MessageCircle,
  ArrowLeft,
  Flame,
  Leaf,
  Sparkles,
  SlidersHorizontal,
  Info,
} from 'lucide-react';

interface MenuOrderingPageProps {
  onBackToHome: () => void;
  cart: CartItem[];
  onAddToCart: (item: MenuItem, quantity?: number) => void;
  onOpenCart: () => void;
  addedItemIds: Set<string>;
}

const CATEGORIES: MenuCategory[] = [
  'All',
  'Espresso & Hot',
  'Cold Brews & Teas',
  'Breakfast Bowls',
  'Artisanal Bakery',
];

export const MenuOrderingPage: React.FC<MenuOrderingPageProps> = ({
  onBackToHome,
  cart,
  onAddToCart,
  onOpenCart,
  addedItemIds,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'bestseller' | 'vegan' | 'organic'>('all');
  const [selectedItemForModal, setSelectedItemForModal] = useState<MenuItem | null>(null);

  const totalCartCount = cart.reduce((acc, ci) => acc + ci.quantity, 0);
  const cartSubtotal = cart.reduce((acc, ci) => acc + ci.item.price * ci.quantity, 0);

  // Filtered menu items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category match
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }
      // Dietary filter match
      if (dietaryFilter === 'bestseller' && !item.tags.includes('Bestseller')) {
        return false;
      }
      if (dietaryFilter === 'vegan' && !item.tags.includes('Vegan')) {
        return false;
      }
      if (dietaryFilter === 'organic' && !item.tags.includes('Organic')) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = item.name.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchOrigin = item.origin?.toLowerCase().includes(q);
        const matchNotes = item.tastingNotes?.some((n) => n.toLowerCase().includes(q));
        const matchIngredients = item.ingredients.some((ing) => ing.toLowerCase().includes(q));
        return matchName || matchDesc || matchOrigin || matchNotes || matchIngredients;
      }
      return true;
    });
  }, [selectedCategory, searchQuery, dietaryFilter]);

  return (
    <div className="min-h-screen bg-[#E2E3E5] text-[#263238] pb-24">
      {/* 1. Page Header & Live Cart Counter: Sticky top bar with bespoke logo lockup and interactive Cart Button */}
      <header className="sticky top-0 left-0 right-0 z-40 bg-[#E2E3E5]/90 backdrop-blur-xl border-b border-[#D7CCC8]/80 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          {/* Back button & Logo / Title */}
          <div className="flex items-center gap-3.5">
            <button
              onClick={onBackToHome}
              className="btn-tactile p-2.5 rounded-2xl bg-white/70 hover:bg-white text-[#263238] border border-white/80 transition-all flex items-center gap-1.5 text-xs font-headline font-bold uppercase tracking-wider"
              title="Return to Home Page"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </button>

            <div className="flex items-center gap-3">
              <MaisonLogo badgeSize={34} showWordmark={false} />
              <div>
                <h1 className="font-headline text-base sm:text-lg font-extrabold text-[#263238] leading-tight tracking-tight">
                  Our Culinary &amp; Coffee Menu
                </h1>
                <span className="text-[10px] font-tech text-[#263238]/60 uppercase tracking-[0.2em] hidden sm:block">
                  Page 2 · Artisanal Selection &amp; WhatsApp Ordering
                </span>
              </div>
            </div>
          </div>

          {/* Live Interactive Cart Button showing total item count badge */}
          <button
            onClick={onOpenCart}
            className="px-4 py-2.5 rounded-xl bg-[#8FB4AC] hover:bg-[#7ea69d] text-[#263238] font-bold text-xs sm:text-sm tracking-wide transition-all shadow-sm hover:shadow-md flex items-center gap-2.5 cursor-pointer border border-[#8FB4AC]"
            aria-label="Open Cart Drawer"
          >
            <MessageCircle className="w-4 h-4 text-[#263238]" />
            <span className="hidden sm:inline">Order Bag</span>
            <span className="w-5 h-5 rounded-full bg-[#263238] text-white text-[11px] font-tech font-bold flex items-center justify-center">
              {totalCartCount}
            </span>
            {cartSubtotal > 0 && (
              <span className="text-xs font-tech font-bold hidden md:inline ml-1 border-l border-[#263238]/20 pl-2">
                ₹{cartSubtotal}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Intro banner */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#8FB4AC] animate-pulse" />
            <span className="text-[11px] font-tech font-bold uppercase tracking-[0.25em] text-[#263238]/70">
              Hand-Pulled &amp; Freshly Baked Daily
            </span>
          </div>
          <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-black text-[#263238] tracking-tight mb-3 text-balance">
            Explore Flavors, Craft Your Order
          </h2>
          <p className="font-sans-body text-[#263238]/75 text-xs sm:text-sm leading-relaxed">
            Select items to customize, view full ingredient breakdown and allergens, or click Add to queue directly for WhatsApp checkout.
          </p>
        </div>

        {/* 2. Search Bar & Category Filter Tabs */}
        <div className="bg-white/60 backdrop-blur-md rounded-[2rem] p-4 sm:p-5 mb-10 border border-white/80 shadow-[0_15px_35px_rgba(38,50,56,0.04)] space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Horizontal Filter Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`btn-tactile px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-headline tracking-wide transition-all whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#8FB4AC] text-[#263238] shadow-xs font-bold border border-[#8FB4AC]'
                      : 'text-[#263238]/70 hover:bg-white/80 hover:text-[#263238]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Live Search Bar */}
            <div className="relative min-w-[260px] sm:w-72">
              <Search className="w-4 h-4 text-[#263238]/50 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search coffee, tea, ingredients..."
                className="w-full pl-9 pr-8 py-2.5 rounded-2xl bg-white/90 border border-white/80 focus:outline-none focus:ring-2 focus:ring-[#8FB4AC] text-xs sm:text-sm text-[#263238] placeholder:text-[#263238]/40 transition-all shadow-2xs font-sans-body"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#263238]/40 hover:text-[#263238] p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Secondary Dietary Filter Bar */}
          <div className="pt-3 border-t border-[#263238]/10 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-tech text-[#263238]/60 uppercase text-[11px] font-bold">
                Quick Filter:
              </span>
              <button
                onClick={() => setDietaryFilter('all')}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  dietaryFilter === 'all'
                    ? 'bg-[#263238] text-white shadow-2xs'
                    : 'bg-white/80 text-[#263238]/70 hover:bg-white'
                }`}
              >
                All Diets
              </button>
              <button
                onClick={() => setDietaryFilter('bestseller')}
                className={`px-3 py-1 rounded-lg font-medium transition-all flex items-center gap-1 ${
                  dietaryFilter === 'bestseller'
                    ? 'bg-[#263238] text-white shadow-2xs'
                    : 'bg-white/80 text-[#263238]/70 hover:bg-white'
                }`}
              >
                <Flame className="w-3 h-3 text-[#8FB4AC]" />
                Bestsellers
              </button>
              <button
                onClick={() => setDietaryFilter('vegan')}
                className={`px-3 py-1 rounded-lg font-medium transition-all flex items-center gap-1 ${
                  dietaryFilter === 'vegan'
                    ? 'bg-[#263238] text-white shadow-2xs'
                    : 'bg-white/80 text-[#263238]/70 hover:bg-white'
                }`}
              >
                <Leaf className="w-3 h-3 text-[#8FB4AC]" />
                Vegan
              </button>
              <button
                onClick={() => setDietaryFilter('organic')}
                className={`px-3 py-1 rounded-lg font-medium transition-all flex items-center gap-1 ${
                  dietaryFilter === 'organic'
                    ? 'bg-[#263238] text-white shadow-2xs'
                    : 'bg-white/80 text-[#263238]/70 hover:bg-white'
                }`}
              >
                <Sparkles className="w-3 h-3 text-emerald-600" />
                Organic Certified
              </button>
            </div>

            <span className="font-tech text-[#263238]/60 text-[11px]">
              Showing {filteredItems.length} creations • Click any card for ingredients
            </span>
          </div>
        </div>

        {/* 3. Responsive Menu Grid with 3D Hover Tilt */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredItems.map((item) => (
              <MenuCardPage2
                key={item.id}
                item={item}
                onAddToCart={(it) => onAddToCart(it, 1)}
                onSelect={(it) => setSelectedItemForModal(it)}
                isAdded={addedItemIds.has(item.id)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-[#D7CCC8]/60 backdrop-blur-md rounded-[2.5rem] p-12 text-center max-w-md mx-auto my-12 border border-white/80 shadow-[0_15px_35px_rgba(38,50,56,0.04)]">
            <div className="flex justify-center mb-4">
              <MaisonLogo badgeSize={44} showWordmark={false} />
            </div>
            <h4 className="font-headline text-xl font-bold text-[#263238] mb-1 tracking-tight">
              No matching creations found
            </h4>
            <p className="font-sans-body text-xs text-[#263238]/70 mb-5">
              Try adjusting your search terms or dietary filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                setDietaryFilter('all');
              }}
              className="btn-tactile px-6 py-2.5 rounded-2xl bg-[#8FB4AC] text-[#263238] text-xs font-headline font-bold uppercase tracking-wider shadow-xs hover:bg-[#7fa79f] transition-all border border-[#8FB4AC]"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>

      {/* 4. Item Detail Modal */}
      <ItemDetailModal
        item={selectedItemForModal}
        onClose={() => setSelectedItemForModal(null)}
        onAddToCart={onAddToCart}
        isAlreadyAdded={selectedItemForModal ? addedItemIds.has(selectedItemForModal.id) : false}
      />
    </div>
  );
};
