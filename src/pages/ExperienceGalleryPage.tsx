import React, { useState, useRef } from 'react';
import {
  Sparkles,
  Volume2,
  Sun,
  Flame,
  Music,
  Laptop,
  Compass,
  Star,
  ChevronLeft,
  ChevronRight,
  Eye,
  X,
  CheckCircle2,
  Coffee,
  Heart,
  Dog,
  Clock,
  ArrowRight,
} from 'lucide-react';

export type VibeCategory =
  | 'All'
  | 'Quiet Work Corners'
  | 'Weekend Live Music Nights'
  | 'Sunlit Patio & Plants'
  | 'Coffee Roasting Bar';

interface GalleryItem {
  id: string;
  title: string;
  category: Exclude<VibeCategory, 'All'>;
  caption: string;
  emoji: string;
  aspect: 'tall' | 'wide' | 'square';
  lighting: string;
  soundLevel: string;
  bestTime: string;
  tag: string;
  visualColor: string;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  date: string;
  comment: string;
  orderedItem: string;
  verified: boolean;
  avatarEmoji: string;
}

export const ExperienceGalleryPage: React.FC<{
  onExploreMenu: () => void;
  onBookTable: () => void;
}> = ({ onExploreMenu, onBookTable }) => {
  const [selectedVibe, setSelectedVibe] = useState<VibeCategory>('All');
  const [activePhotoModal, setActivePhotoModal] = useState<GalleryItem | null>(null);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  const vibeCategories: { label: VibeCategory; icon: React.ReactNode; desc: string }[] = [
    { label: 'All', icon: <Sparkles className="w-4 h-4" />, desc: 'Complete café perspective' },
    { label: 'Quiet Work Corners', icon: <Laptop className="w-4 h-4" />, desc: '42 dB • Ergonomic focus tables' },
    { label: 'Weekend Live Music Nights', icon: <Music className="w-4 h-4" />, desc: 'Acoustic vinyl & jazz trio' },
    { label: 'Sunlit Patio & Plants', icon: <Sun className="w-4 h-4" />, desc: 'Open-air rain tree breeze' },
    { label: 'Coffee Roasting Bar', icon: <Flame className="w-4 h-4" />, desc: 'Cast-iron Giesen in action' },
  ];

  const galleryItems: GalleryItem[] = [
    {
      id: 'gal-1',
      title: 'Sun-Drenched Oak Focus Bar',
      category: 'Quiet Work Corners',
      caption: 'Handcrafted solid white oak tables with built-in brass power sockets, natural northern daylight, and curated acoustic absorption.',
      emoji: '💻',
      aspect: 'wide',
      lighting: 'Natural 5000K + 2700K Warm Oak Pendants',
      soundLevel: '40 dB • Gentle Whisper Ambient',
      bestTime: '08:00 AM – 12:30 PM',
      tag: 'Focus Haven',
      visualColor: '#8FB4AC',
    },
    {
      id: 'gal-2',
      title: 'Matte Mint Synesso Espresso Bar',
      category: 'Coffee Roasting Bar',
      caption: 'Custom powder-coated dual MVP Hydra machine pulling Chikmagalur single estate shots at 9.2 bars with tactile lever controls.',
      emoji: '☕',
      aspect: 'tall',
      lighting: 'Artisan Brass Spotlight 3000K',
      soundLevel: '55 dB • Steam Wands & Gentle Grinds',
      bestTime: 'All Day Specialty Bar',
      tag: 'Espresso Bar',
      visualColor: '#263238',
    },
    {
      id: 'gal-3',
      title: 'Fiddle Leaf Fig & Rain Tree Verandah',
      category: 'Sunlit Patio & Plants',
      caption: 'Lush tropical open-air patio sheltered beneath decades-old rain trees with terracotta planters, gentle breezes, and dog-friendly seating.',
      emoji: '🌿',
      aspect: 'tall',
      lighting: 'Dappled Natural Canopy Sunlight',
      soundLevel: '38 dB • Rustling Leaves & Birds',
      bestTime: '07:30 AM – 11:30 AM & 04:30 PM',
      tag: 'Pet Patio',
      visualColor: '#D7CCC8',
    },
    {
      id: 'gal-4',
      title: 'Acoustic Vinyl & Evening Jazz Corner',
      category: 'Weekend Live Music Nights',
      caption: 'Saturdays at twilight: low-wattage amber filament globes, vintage Thorens turntable spins, and acoustic double bass duos.',
      emoji: '🎷',
      aspect: 'wide',
      lighting: 'Candlelight & 2200K Edison Filaments',
      soundLevel: '62 dB • Mellow Bossa & Jazz',
      bestTime: 'Fridays & Saturdays 07:00 PM – 10:00 PM',
      tag: 'Live Sessions',
      visualColor: '#263238',
    },
    {
      id: 'gal-5',
      title: 'Cast-Iron Giesen Roasting Lab',
      category: 'Coffee Roasting Bar',
      caption: 'Front-row view of our 5kg Dutch Giesen drum roaster where our head roasters inspect color change from green to golden cinnamon.',
      emoji: '🔥',
      aspect: 'tall',
      lighting: 'Neutral 4000K Color-Grading Light',
      soundLevel: '58 dB • Roaster Tumbling Hum',
      bestTime: 'Tuesdays & Thursdays Morning Roasts',
      tag: 'Roastery Lab',
      visualColor: '#D7CCC8',
    },
    {
      id: 'gal-6',
      title: 'Morning 27-Layer Croissants on Marble',
      category: 'Sunlit Patio & Plants',
      caption: 'Freshly baked French butter viennoiserie displayed on chilled Carrara marble tables, catching the first golden rays of Bangalore morning.',
      emoji: '🥐',
      aspect: 'wide',
      lighting: 'Warm Morning Golden Hour',
      soundLevel: '45 dB • Relaxed Breakfast Clatter',
      bestTime: 'Fresh from Oven at 06:30 AM',
      tag: 'Artisan Bake',
      visualColor: '#8FB4AC',
    },
    {
      id: 'gal-7',
      title: 'Slow Borosilicate Origami Pour-Over Bar',
      category: 'Quiet Work Corners',
      caption: 'Precision manual brew flights showcasing how the same anaerobic lot changes across ceramic, glass, and resin dripper shapes.',
      emoji: '🧪',
      aspect: 'tall',
      lighting: 'Focused Bar Accent 3000K',
      soundLevel: '42 dB • Slow Water Flow',
      bestTime: '02:00 PM – 05:00 PM',
      tag: 'Pour-Over Lab',
      visualColor: '#263238',
    },
    {
      id: 'gal-8',
      title: 'Twilight Patio with Festoon Lighting',
      category: 'Weekend Live Music Nights',
      caption: 'Warm dusk sets in over the brick verandah as guests gather over iced cascara spritzes and card games under warm string bulbs.',
      emoji: '✨',
      aspect: 'wide',
      lighting: 'Warm Filament Festoon Strings',
      soundLevel: '52 dB • Lively Twilight Murmur',
      bestTime: '06:30 PM – 10:30 PM',
      tag: 'Evening Vibe',
      visualColor: '#8FB4AC',
    },
  ];

  const filteredGallery = galleryItems.filter(
    (item) => selectedVibe === 'All' || item.category === selectedVibe
  );

  const testimonials: Testimonial[] = [
    {
      id: 'rev-1',
      name: 'Rohan Mehra',
      role: 'Architect & Daily Regular',
      rating: 5,
      date: 'Visited 2 days ago',
      comment:
        'The acoustic balance here is unlike any other café in Indiranagar. You can take a deep client call in the quiet oak corner, look out at the rain trees, and sip on the cleanest flat white in the city.',
      orderedItem: 'Artisan Flat White & Avocado Tartine',
      verified: true,
      avatarEmoji: '👨‍💼',
    },
    {
      id: 'rev-2',
      name: 'Dr. Priya Nambiar',
      role: 'Botanist & Specialty Coffee Enthusiast',
      rating: 5,
      date: 'Visited last weekend',
      comment:
        'As someone obsessed with plant biology, seeing their direct partnership with Chikmagalur shade estates is wonderful. The cascara cold brew has remarkable floral sweetness without any added sugar.',
      orderedItem: '24-Hour Cascara Nitro Cold Brew',
      verified: true,
      avatarEmoji: '👩‍🔬',
    },
    {
      id: 'rev-3',
      name: 'Julian Vance',
      role: 'Visiting Chef from Lyon',
      rating: 5,
      date: 'Visited this week',
      comment:
        'I am extremely particular about viennoiserie lamination. Maison Moka’s croissants have that true 84% butter shatter and delicate airy honeycomb that rivals Parisian neighborhood boulangeries.',
      orderedItem: 'Golden French Butter Croissant & Cortado',
      verified: true,
      avatarEmoji: '👨‍🍳',
    },
    {
      id: 'rev-4',
      name: 'Sneha & Kabeer',
      role: 'Weekend Verandah Patrons',
      rating: 5,
      date: 'Visited Saturday evening',
      comment:
        'We brought our golden retriever to the sunlit patio for Saturday twilight jazz. The staff brought over a fresh water bowl and the vibe was effortlessly warm and serene.',
      orderedItem: 'Pistachio Cloud Latte & Cinnamon Swirl',
      verified: true,
      avatarEmoji: '🐕',
    },
  ];

  const currentTestimonial = testimonials[currentTestimonialIndex];

  const handleNextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrevTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Card Mouse Move for 3D CSS Perspective Tilt
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((centerY - y) / centerY) * 9;
    const rotateY = ((x - centerX) / centerX) * 9;

    card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)';
  };

  return (
    <div className="min-h-screen bg-[#E2E3E5] text-[#263238] pb-24 animate-in fade-in duration-300">
      {/* 1. Page Header & Introduction */}
      <section className="pt-12 pb-16 lg:pt-16 lg:pb-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            {/* Zero-Pill Discipline Header Kicker */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#8FB4AC] animate-pulse" />
              <span className="text-[11px] font-tech font-bold uppercase tracking-[0.25em] text-[#263238]/70">
                The Café Atmosphere · Page 4 · Spatial Design
              </span>
            </div>

            <h1 className="font-headline text-4xl sm:text-5xl lg:text-6xl font-black text-[#263238] tracking-tight mb-6 leading-[1.08] text-balance">
              Experience the Vibe
            </h1>

            <p className="font-editorial italic text-base sm:text-xl text-[#263238]/85 leading-relaxed max-w-2xl mx-auto">
              Step into our Indiranagar sanctuary: where warm oak counters, live drum roaster aromas, sun-dappled rain tree verandas, and acoustic vinyl melodies shape an unforgettable retreat.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Virtual Vibe Selector (Interactive Tabs) */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/60 backdrop-blur-md rounded-[2.5rem] p-6 sm:p-8 border border-white/80 shadow-[0_15px_35px_rgba(38,50,56,0.04)] mb-10">
            <div className="flex items-center justify-between pb-4 border-b border-[#263238]/10 mb-4 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#8FB4AC]" />
                <span className="font-headline text-xs font-bold uppercase tracking-wider text-[#263238]">
                  Atmosphere Mood Filter
                </span>
              </div>
              <span className="text-[11px] font-tech text-[#263238]/60">
                Filter gallery cards by spatial lighting &amp; decibel ambiance
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {vibeCategories.map((vibe) => {
                const isSelected = selectedVibe === vibe.label;
                return (
                  <button
                    key={vibe.label}
                    onClick={() => setSelectedVibe(vibe.label)}
                    className={`btn-tactile p-4 rounded-2xl text-left transition-all duration-300 cursor-pointer border flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#8FB4AC] text-[#263238] border-[#8FB4AC] shadow-md -translate-y-0.5'
                        : 'bg-[#D7CCC8]/60 hover:bg-[#D7CCC8] text-[#263238]/80 border-white/80'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-headline font-bold text-xs sm:text-sm tracking-tight">{vibe.label}</span>
                      <div className={`p-1.5 rounded-xl ${isSelected ? 'bg-white/80 text-[#263238]' : 'bg-white/50 text-[#263238]/60'}`}>
                        {vibe.icon}
                      </div>
                    </div>
                    <span className={`text-[10px] font-tech block ${isSelected ? 'text-[#263238]/90 font-medium' : 'text-[#263238]/60'}`}>
                      {vibe.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Masonry Photo Gallery Grid with 3D Hover Tilt */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredGallery.map((item) => (
              <div
                key={item.id}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                onClick={() => setActivePhotoModal(item)}
                className="bg-[#D7CCC8] rounded-[2.25rem] p-6 sm:p-7 border border-white/90 shadow-[0_15px_35px_rgba(38,50,56,0.06)] hover:shadow-[0_25px_55px_rgba(38,50,56,0.12)] transition-all duration-300 ease-out will-change-transform flex flex-col justify-between group cursor-pointer relative overflow-hidden"
                style={{
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.15s ease-out, box-shadow 0.25s ease',
                }}
              >
                {/* Visual Preview Box */}
                <div className="relative w-full h-56 rounded-2xl bg-white/85 flex flex-col items-center justify-center border border-white mb-5 overflow-hidden shadow-xs group-hover:scale-[1.02] transition-transform duration-300">
                  {/* Decorative background grid pattern */}
                  <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#263238_1px,transparent_1px)] [background-size:16px_16px]" />

                  {/* Centered Large Visual Emoji & Decorative Lighting Rings */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-20 h-20 rounded-3xl bg-[#E2E3E5] flex items-center justify-center text-4xl shadow-sm border border-white mb-2">
                      {item.emoji}
                    </div>
                    <span className="text-[10px] font-tech font-bold uppercase tracking-widest text-[#263238]/60 bg-white/80 px-2.5 py-0.5 rounded-full border border-white">
                      {item.tag}
                    </span>
                  </div>

                  {/* Quick inspect button overlay */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="p-2 rounded-xl bg-white/90 text-[#263238] shadow-sm">
                      <Eye className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-[11px] font-tech text-[#263238]/60 uppercase tracking-wider mb-2">
                    <span>{item.category}</span>
                    <span className="text-[#8FB4AC] font-bold">• Verified Scene</span>
                  </div>

                  <h3 className="font-serif-luxury text-2xl font-bold text-[#263238] mb-2 group-hover:text-[#263238] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#263238]/75 leading-relaxed mb-6">
                    {item.caption}
                  </p>
                </div>

                {/* Spatial Specs Bar */}
                <div className="pt-4 border-t border-[#263238]/10 space-y-1.5 text-[11px] font-tech text-[#263238]/70">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1.5">
                      <Sun className="w-3.5 h-3.5 text-[#8FB4AC]" />
                      <span>Lighting:</span>
                    </span>
                    <span className="font-bold text-[#263238]">{item.lighting}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1.5">
                      <Volume2 className="w-3.5 h-3.5 text-[#8FB4AC]" />
                      <span>Acoustics:</span>
                    </span>
                    <span className="font-bold text-[#263238]">{item.soundLevel}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Customer Testimonials & Reviews Carousel */}
      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 border border-[#D7CCC8] mb-3 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#8FB4AC]" />
              <span className="text-xs font-semibold tracking-wider uppercase text-[#263238] font-tech">
                Patron Stories & Reviews
              </span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#263238] mb-3">
              Words from Our Community
            </h2>
            <p className="text-[#263238]/75 text-sm sm:text-base leading-relaxed">
              Read impressions from neighborhood creatives, visiting chefs, and daily slow-coffee regulars.
            </p>
          </div>

          {/* Carousel Card Container styled in warm oat (#D7CCC8) */}
          <div className="bg-[#D7CCC8] rounded-3xl p-8 sm:p-12 border border-white/90 shadow-xl relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#263238]/15 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/90 flex items-center justify-center text-3xl shadow-xs border border-white">
                  {currentTestimonial.avatarEmoji}
                </div>
                <div>
                  <h3 className="font-serif-luxury text-2xl font-bold text-[#263238]">
                    {currentTestimonial.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-[#263238]/70 font-tech">
                    <span>{currentTestimonial.role}</span>
                    <span>•</span>
                    <span className="text-[#263238]/50">{currentTestimonial.date}</span>
                  </div>
                </div>
              </div>

              {/* 5-Star Rating & Verified Badge */}
              <div className="flex flex-col sm:items-end gap-1">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                {currentTestimonial.verified && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-500/15 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                    Verified Patron
                  </span>
                )}
              </div>
            </div>

            {/* Testimonial Quote */}
            <blockquote className="font-serif-luxury text-xl sm:text-2xl text-[#263238] font-medium leading-relaxed mb-8 italic">
              "{currentTestimonial.comment}"
            </blockquote>

            {/* Favorite order & Carousel Controls */}
            <div className="pt-6 border-t border-[#263238]/15 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-tech text-[#263238]/80">
                <Coffee className="w-4 h-4 text-[#8FB4AC]" />
                <span>Favorite Order: <strong>{currentTestimonial.orderedItem}</strong></span>
              </div>

              {/* Navigation arrows & page indicator */}
              <div className="flex items-center gap-3">
                <div className="text-xs font-tech font-bold text-[#263238]/60 mr-2">
                  {currentTestimonialIndex + 1} / {testimonials.length}
                </div>
                <button
                  onClick={handlePrevTestimonial}
                  className="p-2.5 rounded-xl bg-white/80 hover:bg-white text-[#263238] transition-all shadow-2xs border border-white cursor-pointer active:scale-95"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextTestimonial}
                  className="p-2.5 rounded-xl bg-[#8FB4AC] hover:bg-[#7fa79f] text-[#263238] transition-all shadow-2xs cursor-pointer active:scale-95"
                  aria-label="Next review"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action bar */}
      <section className="py-6 px-4 max-w-7xl mx-auto">
        <div className="bg-[#D7CCC8]/60 rounded-3xl p-8 sm:p-10 border border-white/80 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#263238]">
              Ready to immerse in the Maison vibe?
            </h3>
            <p className="text-sm text-[#263238]/75 mt-1 max-w-lg">
              Book a sunlit table on the verandah or browse our complete roastery menu for WhatsApp ordering.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onExploreMenu}
              className="px-6 py-3 rounded-xl bg-[#8FB4AC] hover:bg-[#7fa79f] text-[#263238] font-bold text-xs sm:text-sm shadow-xs hover:shadow-md cursor-pointer transition-all"
            >
              Explore Menu (Page 2)
            </button>
            <button
              onClick={onBookTable}
              className="px-6 py-3 rounded-xl bg-[#263238] hover:bg-[#34444c] text-white font-bold text-xs sm:text-sm shadow-xs cursor-pointer transition-all"
            >
              Book Table
            </button>
          </div>
        </div>
      </section>

      {/* Photo Lightbox / Zoom Modal */}
      {activePhotoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div
            className="fixed inset-0 bg-[#263238]/60 backdrop-blur-xs transition-opacity"
            onClick={() => setActivePhotoModal(null)}
          />
          <div className="relative w-full max-w-xl bg-[#E2E3E5] rounded-3xl border border-white shadow-2xl p-6 sm:p-8 z-10 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-[#263238]/10 mb-6">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{activePhotoModal.emoji}</span>
                <div>
                  <span className="text-[10px] font-tech uppercase text-[#263238]/60 font-bold block">
                    {activePhotoModal.category}
                  </span>
                  <h3 className="font-serif-luxury text-xl font-bold text-[#263238]">
                    {activePhotoModal.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setActivePhotoModal(null)}
                className="p-1.5 rounded-full bg-white/70 hover:bg-white text-[#263238]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-[#263238]/85 leading-relaxed mb-6">
              {activePhotoModal.caption}
            </p>

            <div className="bg-white/80 rounded-2xl p-4 border border-white space-y-2 text-xs font-tech mb-6">
              <div className="flex justify-between">
                <span className="text-[#263238]/60">Lighting Profile:</span>
                <span className="font-bold text-[#263238]">{activePhotoModal.lighting}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#263238]/60">Decibel Level:</span>
                <span className="font-bold text-[#263238]">{activePhotoModal.soundLevel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#263238]/60">Recommended Visit Time:</span>
                <span className="font-bold text-[#8FB4AC]">{activePhotoModal.bestTime}</span>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setActivePhotoModal(null)}
                className="px-6 py-2.5 rounded-xl bg-[#8FB4AC] text-[#263238] text-xs font-bold"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
