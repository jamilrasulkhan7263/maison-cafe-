import React, { useState } from 'react';
import { CartItem } from '../types/cafe';
import {
  MessageCircle,
  X,
  Plus,
  Minus,
  Trash2,
  Send,
  Coffee,
  CheckCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface WhatsAppDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  cart: CartItem[];
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
}

export const WhatsAppDrawer: React.FC<WhatsAppDrawerProps> = ({
  isOpen,
  onClose,
  onOpen,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [orderType, setOrderType] = useState<'Dine-in' | 'Takeaway'>('Dine-in');
  const [tableNumber, setTableNumber] = useState('');
  const [specialNote, setSpecialNote] = useState('');

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + item.item.price * item.quantity,
    0
  );

  const handleSendToWhatsApp = () => {
    if (cart.length === 0) return;

    let itemsText = cart
      .map(
        (ci) =>
          `• ${ci.quantity}x ${ci.item.name} (₹${ci.item.price * ci.quantity})`
      )
      .join('\n');

    let msg = `*☕ MAISON MOKA - ARTISANAL ORDER*\n`;
    msg += `--------------------------------\n`;
    msg += `*Customer:* ${customerName.trim() || 'Guest'}\n`;
    msg += `*Order Type:* ${orderType}${
      orderType === 'Dine-in' && tableNumber ? ` (Table ${tableNumber})` : ''
    }\n\n`;
    msg += `*Items Ordered:*\n${itemsText}\n\n`;
    msg += `*Subtotal:* ₹${subtotal} (Incl. taxes)\n`;

    if (specialNote.trim()) {
      msg += `*Notes:* ${specialNote.trim()}\n`;
    }
    msg += `--------------------------------\n`;
    msg += `Please confirm my order and estimated prep time!`;

    const encoded = encodeURIComponent(msg);
    // Open WhatsApp
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  return (
    <>
      {/* Floating Bottom-Right WhatsApp Quick-Order Action Button */}
      <aside aria-label="WhatsApp quick order actions" className="fixed bottom-6 right-6 z-40">
        <button
          onClick={isOpen ? onClose : onOpen}
          className="btn-tactile relative px-6 py-4 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-[0_15px_35px_rgba(37,211,102,0.35)] hover:shadow-[0_20px_45px_rgba(37,211,102,0.45)] transition-all duration-300 flex items-center gap-3 border-2 border-[#8FB4AC] group cursor-pointer"
          aria-label="Open WhatsApp quick-order drawer"
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5 text-white" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-3 -right-3 min-w-[22px] h-5 px-1 bg-[#263238] text-[#8FB4AC] font-tech text-[11px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                {totalItemsCount}
              </span>
            )}
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-headline font-bold uppercase tracking-wider leading-none text-white">
              {isOpen ? 'Close Order Tray' : 'Order via WhatsApp'}
            </span>
            {totalItemsCount > 0 && (
              <span className="text-[10px] font-tech font-bold text-[#263238] bg-[#8FB4AC] px-2 py-0.5 rounded-md mt-1 inline-block w-fit">
                {totalItemsCount} item{totalItemsCount > 1 ? 's' : ''} · ₹{subtotal}
              </span>
            )}
          </div>
          {isOpen ? (
            <ChevronDown className="w-4 h-4 text-white/80" />
          ) : (
            <ChevronUp className="w-4 h-4 text-white/80 group-hover:-translate-y-0.5 transition-transform" />
          )}
        </button>
      </aside>

      {/* Slide-over / Slide-up Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#263238]/40 backdrop-blur-xs transition-opacity"
            onClick={onClose}
          />

          <aside aria-label="WhatsApp quick order drawer" className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md glass-panel p-6 sm:p-7 shadow-2xl flex flex-col justify-between border-l border-white/80 animate-in slide-in-from-right duration-300 font-sans-body">
              {/* Header */}
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#263238]/10">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#8FB4AC] flex items-center justify-center text-[#263238] shadow-xs">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-headline text-lg font-extrabold text-[#263238] tracking-tight">
                        WhatsApp Quick-Order
                      </h3>
                      <p className="text-[11px] font-tech text-[#263238]/60">
                        Pre-formats your order for instant WhatsApp chat
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="btn-tactile p-1.5 rounded-xl text-[#263238]/50 hover:text-[#263238] hover:bg-white/50 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Dine-in vs Takeaway selector */}
                <div className="grid grid-cols-2 gap-2 mt-4 bg-white/60 p-1.5 rounded-2xl border border-white">
                  <button
                    type="button"
                    onClick={() => setOrderType('Dine-in')}
                    className={`btn-tactile py-2 rounded-xl text-xs font-headline font-bold uppercase tracking-wider transition-all ${
                      orderType === 'Dine-in'
                        ? 'bg-[#8FB4AC] text-[#263238] shadow-xs'
                        : 'text-[#263238]/70 hover:text-[#263238]'
                    }`}
                  >
                    Dine-in Table
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('Takeaway')}
                    className={`btn-tactile py-2 rounded-xl text-xs font-headline font-bold uppercase tracking-wider transition-all ${
                      orderType === 'Takeaway'
                        ? 'bg-[#8FB4AC] text-[#263238] shadow-xs'
                        : 'text-[#263238]/70 hover:text-[#263238]'
                    }`}
                  >
                    Takeaway Pick-up
                  </button>
                </div>

                {/* Optional Customer info */}
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Your Name (optional)"
                    className="w-full px-3 py-1.5 rounded-xl bg-white/70 border border-white text-xs text-[#263238] focus:outline-none focus:ring-1 focus:ring-[#8FB4AC]"
                  />
                  {orderType === 'Dine-in' ? (
                    <input
                      type="text"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      placeholder="Table No. (if seated)"
                      className="w-full px-3 py-1.5 rounded-xl bg-white/70 border border-white text-xs text-[#263238] focus:outline-none focus:ring-1 focus:ring-[#8FB4AC]"
                    />
                  ) : (
                    <input
                      type="text"
                      disabled
                      placeholder="Ready in ~10 mins"
                      className="w-full px-3 py-1.5 rounded-xl bg-white/40 border border-white text-xs text-[#263238]/60"
                    />
                  )}
                </div>
              </div>

              {/* Items List (Scrollable) */}
              <div className="flex-1 overflow-y-auto py-4 space-y-3 my-2 pr-1">
                {cart.length === 0 ? (
                  <div className="text-center py-12 text-[#263238]/60">
                    <Coffee className="w-10 h-10 mx-auto mb-3 opacity-30 text-[#8FB4AC]" />
                    <h4 className="font-semibold text-sm text-[#263238]">Your Order is Empty</h4>
                    <p className="text-xs text-[#263238]/60 mt-1 max-w-[220px] mx-auto">
                      Click "+ Add to Order" on any espresso, cold brew, or pastry on our menu!
                    </p>
                  </div>
                ) : (
                  cart.map((cartItem) => (
                    <div
                      key={cartItem.item.id}
                      className="glass-card p-3.5 rounded-2xl border border-white/80 shadow-xs flex items-center justify-between gap-3"
                    >
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-[#263238] truncate">
                          {cartItem.item.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[11px] font-tech font-semibold text-[#8FB4AC]">
                            ₹{cartItem.item.price} each
                          </span>
                          <span className="text-[10px] text-[#263238]/50">
                            • Sub: ₹{cartItem.item.price * cartItem.quantity}
                          </span>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-1.5 bg-white/80 rounded-xl p-1 border border-white">
                        <button
                          onClick={() => onUpdateQuantity(cartItem.item.id, -1)}
                          className="p-1 rounded-lg hover:bg-white text-[#263238]/70 hover:text-[#263238]"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold font-tech px-1 min-w-[16px] text-center">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(cartItem.item.id, 1)}
                          className="p-1 rounded-lg hover:bg-white text-[#263238]/70 hover:text-[#263238]"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(cartItem.item.id)}
                        className="text-[#263238]/30 hover:text-rose-600 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Special Note & Footer Actions */}
              <div className="pt-3 border-t border-[#263238]/10 space-y-3">
                <input
                  type="text"
                  value={specialNote}
                  onChange={(e) => setSpecialNote(e.target.value)}
                  placeholder="Special instructions (e.g. oat milk, less sugar)"
                  className="w-full px-3 py-2 rounded-xl bg-white/70 border border-white text-xs text-[#263238] focus:outline-none focus:ring-1 focus:ring-[#8FB4AC]"
                />

                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#263238]/60">Order Subtotal</span>
                  <span className="text-base font-bold font-tech text-[#263238]">
                    ₹{subtotal}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {cart.length > 0 && (
                    <button
                      onClick={onClearCart}
                      className="px-3 py-3 rounded-xl bg-white/70 hover:bg-white text-[#263238]/70 text-xs font-semibold border border-white"
                      title="Clear all items"
                    >
                      Clear
                    </button>
                  )}
                  <button
                    onClick={handleSendToWhatsApp}
                    disabled={cart.length === 0}
                    className="flex-1 py-3.5 rounded-xl bg-[#263238] hover:bg-[#34444c] disabled:opacity-40 text-white font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-[#8FB4AC]" />
                    <span>Send Order to WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};
