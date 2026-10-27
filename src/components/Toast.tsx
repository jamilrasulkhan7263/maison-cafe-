import React from 'react';
import { CheckCircle2, ShoppingBag, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'info';
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto glass-card p-4 rounded-2xl shadow-xl border border-white/80 flex items-start gap-3 transform transition-all duration-300 animate-in slide-in-from-top-3"
        >
          <div className="p-1.5 rounded-full bg-[#8FB4AC]/20 text-[#263238] shrink-0 mt-0.5">
            {toast.type === 'info' ? (
              <ShoppingBag className="w-4 h-4 text-[#263238]" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-[#263238]" />
            )}
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-[#263238]">{toast.title}</h4>
            {toast.description && (
              <p className="text-xs text-[#263238]/70 mt-0.5">{toast.description}</p>
            )}
          </div>
          <button
            onClick={() => onDismiss(toast.id)}
            className="text-[#263238]/40 hover:text-[#263238] transition-colors p-1"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
