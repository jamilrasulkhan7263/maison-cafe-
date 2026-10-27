import React, { useRef } from 'react';
import { MenuItem } from '../types/cafe';
import { Plus, Check, Flame, Leaf, Coffee, Award, Sparkles } from 'lucide-react';

interface MenuCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
  isAdded?: boolean;
}

export const MenuCard: React.FC<MenuCardProps> = ({ item, onAddToCart, isAdded }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation between -10 and +10 degrees
    const rotateX = ((centerY - y) / centerY) * 9;
    const rotateY = ((x - centerX) / centerX) * 9;

    card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px) scale3d(1.015, 1.015, 1.015)`;
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
      className="glass-card-bespoke rounded-[2.25rem] p-7 transition-all duration-300 ease-out border border-white/80 shadow-[0_15px_35px_rgba(38,50,56,0.06)] hover:shadow-[0_25px_50px_rgba(38,50,56,0.1)] flex flex-col justify-between group relative overflow-hidden will-change-transform"
      style={{
        transformStyle: 'preserve-3d',
        transition: 'transform 0.15s ease-out, box-shadow 0.25s ease',
      }}
    >
      {/* Top ambient highlight on card */}
      <div
        className="absolute top-0 left-0 right-0 h-1 opacity-90 transition-opacity"
        style={{
          background:
            item.category === 'Artisanal Bakery'
              ? 'linear-gradient(90deg, #D7CCC8, #8FB4AC)'
              : 'linear-gradient(90deg, #8FB4AC, #D7CCC8)',
        }}
      />

      <div>
        {/* Category & Dietary Metadata (Zero-Pill Discipline: unboxed text with · separators) */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[10px] font-tech uppercase tracking-[0.2em] text-[#263238]/60 font-bold">
            {item.category}
          </span>

          <div className="flex items-center gap-2 text-[11px] font-tech font-bold text-[#263238]/80">
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
          </div>
        </div>

        {/* Item Title & Price */}
        <div className="flex items-baseline justify-between gap-3 mb-2">
          <h3 className="font-headline text-xl font-bold text-[#263238] group-hover:text-[#263238] transition-colors leading-snug tracking-tight">
            {item.name}
          </h3>
          <span className="font-headline text-lg font-extrabold text-[#263238] shrink-0">
            ₹{item.price}
          </span>
        </div>

        {/* Description */}
        <p className="font-sans-body text-xs sm:text-sm text-[#263238]/75 leading-relaxed mb-4">
          {item.description}
        </p>

        {/* Origin / Notes */}
        {item.origin && (
          <div className="text-[11px] text-[#263238]/60 font-tech mb-3 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8FB4AC]" />
            <span>Origin: {item.origin}</span>
          </div>
        )}

        {/* Tasting Notes as clean unboxed text with subtle separator dots */}
        {item.tastingNotes && item.tastingNotes.length > 0 && (
          <div className="text-[11px] font-sans-body text-[#263238]/70 mb-5 flex flex-wrap items-center gap-1.5">
            <span className="font-tech text-[10px] uppercase tracking-wider text-[#263238]/50 font-semibold">
              Notes:
            </span>
            {item.tastingNotes.map((note, idx) => (
              <span key={note} className="inline-flex items-center gap-1.5 font-medium">
                <span>{note}</span>
                {idx < (item.tastingNotes?.length ?? 0) - 1 && <span className="text-[#263238]/30">·</span>}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer / Add to WhatsApp order action */}
      <div className="pt-4 border-t border-[#263238]/10 flex items-center justify-between mt-auto">
        <span className="text-[11px] font-tech text-[#263238]/60">
          {item.calories ? `${item.calories} · ` : ''}
          {item.prepTime || 'Freshly made'}
        </span>

        <button
          onClick={() => onAddToCart(item)}
          className={`btn-tactile px-4 py-2 rounded-2xl text-xs font-headline font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
            isAdded
              ? 'bg-[#263238] text-white shadow-sm'
              : 'bg-[#8FB4AC] hover:bg-[#7ea69d] text-[#263238] shadow-xs hover:shadow-md border border-[#8FB4AC]'
          }`}
          title="Add to WhatsApp Order list"
        >
          {isAdded ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Added</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" />
              <span>Add to Order</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
