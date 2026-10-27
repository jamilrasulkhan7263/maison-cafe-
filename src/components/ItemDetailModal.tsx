import React, { useState } from 'react';
import { MenuItem } from '../types/cafe';
import {
  X,
  Star,
  Clock,
  Flame,
  Plus,
  Minus,
  Check,
  Leaf,
  Sparkles,
  Info,
  ShieldAlert,
  ShoppingBag,
} from 'lucide-react';

interface ItemDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, quantity: number) => void;
  isAlreadyAdded?: boolean;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  item,
  onClose,
  onAddToCart,
  isAlreadyAdded,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  if (!item) return null;

  const handleAdd = () => {
    onAddToCart(item, quantity);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#263238]/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-[#E2E3E5] rounded-[2.5rem] border border-white/90 shadow-[0_25px_60px_rgba(38,50,56,0.18)] overflow-hidden z-10 animate-in zoom-in-95 duration-300">
        {/* Header Visual with Soft Warm Oat banner and Emoji / Image Preview */}
        <div className="relative bg-[#D7CCC8] p-6 sm:p-8 flex items-center justify-between border-b border-white/60">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/90 flex items-center justify-center text-3xl shadow-xs border border-white shrink-0">
              {item.emoji}
            </div>
            <div>
              <span className="text-[10px] font-tech uppercase tracking-[0.2em] text-[#263238]/60 font-bold block mb-1">
                {item.category}
              </span>
              <h3 className="font-headline text-2xl font-black text-[#263238] leading-tight tracking-tight">
                {item.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center text-amber-500 text-xs font-headline font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-500 mr-1" />
                  <span>{item.rating}</span>
                </div>
                <span className="text-[11px] text-[#263238]/60 font-tech">
                  ({item.reviewCount} verified reviews)
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="btn-tactile p-2 rounded-2xl bg-white/70 hover:bg-white text-[#263238] transition-colors border border-white shrink-0 self-start"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto font-sans-body">
          {/* Metadata Row: Zero-Pill Discipline */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#263238]/10 text-xs font-tech font-bold text-[#263238]/80">
            <div className="flex items-center gap-2">
              {item.tags.includes('Bestseller') && (
                <span className="inline-flex items-center gap-1 text-[#263238]">
                  <Flame className="w-3.5 h-3.5 text-amber-600" />
                  Bestseller
                </span>
              )}
              {item.tags.includes('Vegan') && (
                <span className="inline-flex items-center gap-1 text-emerald-800">
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
            <span className="text-xs text-[#263238]/65 font-tech flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#8FB4AC]" />
              {item.prepTime}
            </span>
          </div>

          {/* Description */}
          <p className="font-sans-body text-sm text-[#263238]/85 leading-relaxed">
            {item.description}
          </p>

          {/* Origin & Calories */}
          <div className="grid grid-cols-2 gap-3 bg-white/60 p-4 rounded-2xl border border-white/80 text-xs font-sans-body">
            {item.origin && (
              <div>
                <span className="text-[#263238]/50 font-tech block text-[10px] uppercase tracking-wider">Origin</span>
                <span className="font-headline font-bold text-[#263238]">{item.origin}</span>
              </div>
            )}
            <div>
              <span className="text-[#263238]/50 font-tech block text-[10px] uppercase tracking-wider">Calories</span>
              <span className="font-headline font-bold text-[#263238]">{item.calories}</span>
            </div>
          </div>

          {/* Tasting Notes */}
          {item.tastingNotes && item.tastingNotes.length > 0 && (
            <div>
              <h4 className="text-[11px] font-tech font-bold uppercase tracking-[0.2em] text-[#263238]/70 mb-2">
                Flavor Profile &amp; Volatiles
              </h4>
              <div className="flex flex-wrap gap-2 text-xs font-sans-body text-[#263238]/80">
                {item.tastingNotes.map((note) => (
                  <span
                    key={note}
                    className="font-medium px-3 py-1.5 rounded-xl bg-white/70 text-[#263238] border border-white/80"
                  >
                    • {note}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Ingredients list */}
          <div>
            <h4 className="text-[11px] font-tech font-bold uppercase tracking-[0.2em] text-[#263238]/70 mb-2 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-[#8FB4AC]" />
              <span>Full Ingredients Profile</span>
            </h4>
            <div className="bg-white/60 rounded-2xl p-4 border border-white/80">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#263238]/85">
                {item.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8FB4AC]" />
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Allergen Notes */}
          <div>
            <h4 className="text-[11px] font-tech font-bold uppercase tracking-[0.2em] text-[#263238]/70 mb-2 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
              <span>Allergen Notice</span>
            </h4>
            <div className="bg-amber-500/10 rounded-2xl p-3 border border-amber-500/20 text-xs text-amber-900 font-sans-body">
              {item.allergens.join(', ')}
            </div>
          </div>
        </div>

        {/* Modal Footer: Quantity Stepper & 'Add to Order' Button */}
        <div className="p-6 bg-white/80 backdrop-blur-md border-t border-[#D7CCC8]/80 flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-tech text-[#263238]/50 uppercase tracking-wider block">Total Price</span>
            <span className="text-2xl font-black font-headline text-[#263238]">
              ₹{item.price * quantity}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Quantity Stepper */}
            <div className="flex items-center gap-2 bg-[#E2E3E5] rounded-2xl p-1 border border-white/80">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="btn-tactile w-8 h-8 rounded-xl bg-white/80 hover:bg-white text-[#263238] flex items-center justify-center transition-colors shadow-2xs"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-7 text-center font-headline font-bold text-sm text-[#263238]">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="btn-tactile w-8 h-8 rounded-xl bg-white/80 hover:bg-white text-[#263238] flex items-center justify-center transition-colors shadow-2xs"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 'Add to Order' Button */}
            <button
              onClick={handleAdd}
              className={`btn-tactile px-6 py-3 rounded-2xl font-headline font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-md ${
                justAdded
                  ? 'bg-[#263238] text-white'
                  : 'bg-[#8FB4AC] hover:bg-[#7fa79f] text-[#263238] hover:shadow-xl border border-[#8FB4AC]'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 text-[#263238]" />
                  <span>Add to Order</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
