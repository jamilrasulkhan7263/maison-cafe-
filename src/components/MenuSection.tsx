import React, { useState, useMemo } from 'react';
import { MenuCategory, MenuItem } from '../types/cafe';
import { MENU_ITEMS } from '../data/menuData';
import { MenuCard } from './MenuCard';
import { Search, X, SlidersHorizontal, Sparkles } from 'lucide-react';

interface MenuSectionProps {
  onAddToCart: (item: MenuItem) => void;
  addedItemIds: Set<string>;
}

const CATEGORIES: MenuCategory[] = [
  'All',
  'Espresso & Hot',
  'Cold Brews & Teas',
  'Breakfast Bowls',
  'Artisanal Bakery',
];

export const MenuSection: React.FC<MenuSectionProps> = ({
  onAddToCart,
  addedItemIds,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'vegan' | 'bestseller'>('all');

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category match
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }
      // Dietary filter match
      if (dietaryFilter === 'veg' && !item.tags.includes('Veg')) {
        return false;
      }
      if (dietaryFilter === 'vegan' && !item.tags.includes('Vegan')) {
        return false;
      }
      if (dietaryFilter === 'bestseller' && !item.tags.includes('Bestseller')) {
        return false;
      }
      // Search query match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchName = item.name.toLowerCase().includes(query);
        const matchDesc = item.description.toLowerCase().includes(query);
        const matchOrigin = item.origin?.toLowerCase().includes(query);
        const matchNotes = item.tastingNotes?.some((n) => n.toLowerCase().includes(query));
        return matchName || matchDesc || matchOrigin || matchNotes;
      }
      return true;
    });
  }, [selectedCategory, searchQuery, dietaryFilter]);

  return (
    <section id="menu" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8FB4AC]" />
            <span className="text-[11px] font-tech font-bold uppercase tracking-[0.2em] text-[#263238]/70">
              The Daily Roastery Catalog
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#263238] tracking-tight mb-4">
            Curated Artisanal{' '}
            <span className="font-editorial italic font-normal text-[#263238]/85">
              Offerings
            </span>
          </h2>
          <p className="text-[#263238]/75 text-sm sm:text-base leading-relaxed font-normal">
            Every extraction is pulled with precision; every pastry is laminated by hand with 84% Normandy butter. Tap to order directly via WhatsApp.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-[#D7CCC8]/40 backdrop-blur-md rounded-[2rem] p-4 sm:p-5 mb-10 shadow-bespoke border border-white/80">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Category Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer active:scale-95 ${
                    selectedCategory === cat
                      ? 'bg-[#8FB4AC] text-[#263238] shadow-xs'
                      : 'text-[#263238]/70 hover:bg-white/60 hover:text-[#263238]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Instant Search Bar & Dietary Quick Filters */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Search Bar */}
              <div className="relative min-w-[240px] sm:w-64">
                <Search className="w-4 h-4 text-[#263238]/50 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search flat white, croissant..."
                  className="w-full pl-9 pr-8 py-2 rounded-xl bg-white/70 border border-white focus:outline-none focus:ring-2 focus:ring-[#8FB4AC] text-xs sm:text-sm text-[#263238] placeholder:text-[#263238]/40 transition-all shadow-2xs"
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

              {/* Dietary quick filter */}
              <div className="flex items-center gap-1.5 bg-white/60 p-1 rounded-xl border border-white">
                <button
                  onClick={() => setDietaryFilter('all')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    dietaryFilter === 'all'
                      ? 'bg-[#263238] text-white'
                      : 'text-[#263238]/70 hover:text-[#263238]'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setDietaryFilter('veg')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    dietaryFilter === 'veg'
                      ? 'bg-[#263238] text-white'
                      : 'text-[#263238]/70 hover:text-[#263238]'
                  }`}
                >
                  Veg
                </button>
                <button
                  onClick={() => setDietaryFilter('vegan')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    dietaryFilter === 'vegan'
                      ? 'bg-[#263238] text-white'
                      : 'text-[#263238]/70 hover:text-[#263238]'
                  }`}
                >
                  Vegan
                </button>
                <button
                  onClick={() => setDietaryFilter('bestseller')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    dietaryFilter === 'bestseller'
                      ? 'bg-[#263238] text-white'
                      : 'text-[#263238]/70 hover:text-[#263238]'
                  }`}
                >
                  ★ Best
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6 px-1">
          <span className="text-xs font-tech text-[#263238]/60 uppercase tracking-wider">
            Showing {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'artisan creations'}
          </span>
          {(searchQuery || dietaryFilter !== 'all' || selectedCategory !== 'All') && (
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                setDietaryFilter('all');
              }}
              className="text-xs text-[#8FB4AC] font-semibold hover:underline"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Responsive Grid with 3D Tilt Cards */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                onAddToCart={onAddToCart}
                isAdded={addedItemIds.has(item.id)}
              />
            ))}
          </div>
        ) : (
          <div className="glass-card rounded-3xl p-12 text-center max-w-md mx-auto my-8">
            <Sparkles className="w-8 h-8 text-[#8FB4AC] mx-auto mb-3 opacity-60" />
            <h4 className="font-serif-luxury text-lg font-bold text-[#263238] mb-1">
              No matching brews found
            </h4>
            <p className="text-xs text-[#263238]/70 mb-4">
              Try adjusting your search terms or selecting another category.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setDietaryFilter('all');
              }}
              className="px-4 py-2 rounded-xl bg-[#8FB4AC] text-[#263238] text-xs font-semibold"
            >
              Show Full Menu
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
