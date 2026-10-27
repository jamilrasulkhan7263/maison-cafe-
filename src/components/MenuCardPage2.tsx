import React, { useRef } from 'react';
import { MenuItem } from '../types/cafe';
import { Plus, Check, Star, Flame, Leaf, Sparkles, Eye } from 'lucide-react';

interface MenuCardPage2Props {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
  onSelect: (item: MenuItem) => void;
  isAdded?: boolean;
}

export const MenuCardPage2: React.FC<MenuCardPage2Props> = ({
  item,
  onAddToCart,
  onSelect,
  isAdded,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Subtle 3D CSS perspective tilt (transform: perspective(1000px) rotateX/Y)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((centerY - y) / centerY) * 8.5;
    const rotateY = ((x - centerX) / centerX) * 8.5;

    card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-5px) scale3d(1.015, 1.015, 1.015)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)';
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(item)}
      className="bg-[#D7CCC8] rounded-[2.25rem] p-6 sm:p-7 border border-white/85 shadow-[0_15px_35px_rgba(38,50,56,0.06)] hover:shadow-[0_25px_55px_rgba(38,50,56,0.12)] transition-all duration-300 ease-out flex flex-col justify-between group cursor-pointer relative overflow-hidden will-change-transform"
      style={{
        transformStyle: 'preserve-3d',
        transition: 'transform 0.15s ease-out, box-shadow 0.25s ease',
      }}
    >
      {/* Top subtle mint gloss strip */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#8FB4AC] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div>
        {/* Top Header: Emoji / Image Preview Placeholder, Category, Star Rating */}
        <div className="flex items-start justify-between gap-3 mb-4">
          {/* Emoji/Image preview placeholder */}
          <div className="w-14 h-14 rounded-2xl bg-white/90 flex items-center justify-center text-2xl shadow-xs border border-white group-hover:scale-105 transition-transform duration-300">
            {item.emoji}
          </div>

          <div className="flex flex-col items-end">
            {/* Category label (clean unboxed) */}
            <span className="text-[10px] font-tech font-bold uppercase tracking-[0.2em] text-[#263238]/60 mb-1">
              {item.category}
            </span>

            {/* Star rating */}
            <div className="flex items-center text-xs font-headline font-bold text-[#263238]">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 mr-1" />
              <span>{item.rating}</span>
            </div>
          </div>
        </div>

        {/* Dietary Metadata (Zero-Pill Discipline: clean inline text) */}
        <div className="flex items-center gap-2 mb-3 text-[11px] font-tech font-bold text-[#263238]/80">
          {item.tags.includes('Bestseller') && (
            <span className="inline-flex items-center gap-1 text-[#263238] font-bold">
              <Flame className="w-3.5 h-3.5 text-amber-600" />
              Bestseller
            </span>
          )}
          {item.tags.includes('Vegan') && (
            <span className="inline-flex items-center gap-1 text-[#263238]">
              <Leaf className="w-3.5 h-3.5 text-emerald-700" />
              Vegan
            </span>
          )}
          {item.tags.includes('Organic') && (
            <span className="inline-flex items-center gap-1 text-emerald-800">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              Organic
            </span>
          )}
        </div>

        {/* Item Name */}
        <h3 className="font-headline text-xl font-bold text-[#263238] group-hover:text-[#263238] transition-colors leading-snug mb-2 tracking-tight">
          {item.name}
        </h3>

        {/* Description */}
        <p className="font-sans-body text-xs sm:text-sm text-[#263238]/75 leading-relaxed mb-4 line-clamp-2">
          {item.description}
        </p>

        {/* Tasting Notes as clean unboxed text with · separators */}
        {item.tastingNotes && item.tastingNotes.length > 0 && (
          <div className="text-[11px] font-sans-body text-[#263238]/70 mb-5 flex flex-wrap items-center gap-1.5">
            <span className="font-tech text-[10px] uppercase tracking-wider text-[#263238]/50 font-semibold">
              Notes:
            </span>
            {item.tastingNotes.slice(0, 3).map((note, idx) => (
              <span key={note} className="inline-flex items-center gap-1 font-medium">
                <span>{note}</span>
                {idx < Math.min(item.tastingNotes?.length ?? 0, 3) - 1 && (
                  <span className="text-[#263238]/30">·</span>
                )}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Card Footer: Price Tag in ₹ (INR), View Details hint, and 'Add' Button */}
      <div className="pt-4 border-t border-[#263238]/10 flex items-center justify-between mt-auto">
        <div>
          <span className="text-[10px] font-tech text-[#263238]/50 uppercase tracking-wider block">Price</span>
          <span className="font-headline text-xl font-extrabold text-[#263238]">
            ₹{item.price}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick inspect eye */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(item);
            }}
            className="btn-tactile p-2 rounded-xl bg-white/70 hover:bg-white text-[#263238]/60 hover:text-[#263238] transition-colors border border-white"
            title="View Full Ingredients & Allergens"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>

          {/* 'Add' Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(item);
            }}
            className={`btn-tactile px-4 py-2 rounded-2xl text-xs font-headline font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer shadow-xs ${
              isAdded
                ? 'bg-[#263238] text-white shadow-sm'
                : 'bg-[#8FB4AC] hover:bg-[#7fa79f] text-[#263238] hover:shadow-md border border-[#8FB4AC]'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
