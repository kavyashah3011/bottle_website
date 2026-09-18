import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Trash2, ArrowUpRight, CheckCircle2, ShoppingBag } from 'lucide-react';
import { PRODUCTS } from '../data/products';

export interface AllocationItem {
  productId: string;
  quantity: number;
}

interface AllocationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: AllocationItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
}

export function AllocationDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
}: AllocationDrawerProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    deliveryLocation: 'New York (Executive Courier)',
  });

  // Handle ESC key press for dismissal (solves BUG-06)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const cartProducts = items.map((it) => {
    const p = PRODUCTS.find((prod) => prod.id === it.productId);
    return {
      ...it,
      product: p!,
    };
  }).filter((it) => it.product);

  const subtotal = cartProducts.reduce((acc, curr) => {
    const numericPrice = parseFloat(curr.product.price.replace('$', ''));
    return acc + numericPrice * curr.quantity;
  }, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        deliveryLocation: 'New York (Executive Courier)',
      });
      onClose();
    }, 2500);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-md flex justify-end transition-opacity duration-300"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Private Allocation Drawer"
    >
      <div
        className="w-full max-w-md bg-brand-surface border-l border-white/10 h-full flex flex-col justify-between p-6 sm:p-8 shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-brand-amber/10 border border-brand-amber/40 text-brand-amber">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-mono tracking-mega text-brand-amber uppercase">
                Private Allocation
              </span>
              <span className="text-sm font-bold text-white uppercase">
                Your Vessel Reserve ({items.reduce((a, b) => a + b.quantity, 0)})
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-white/50 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {submitted ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center py-12">
            <CheckCircle2 className="w-16 h-16 text-brand-amber animate-pulse" />
            <h3 className="text-xl font-bold text-white uppercase tracking-tight">
              Allocation Dispatched
            </h3>
            <p className="text-xs text-white/60 max-w-xs leading-relaxed">
              Your priority dispatch request has been routed to our private logistics concierge. A personal courier coordinator will confirm delivery within 60 minutes.
            </p>
          </div>
        ) : cartProducts.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center py-12 text-white/50">
            <span className="text-xs font-mono uppercase tracking-wider">Your allocation is empty</span>
            <p className="text-xs max-w-xs text-white/40">
              Browse our vessel collection and select editions for allocation.
            </p>
          </div>
        ) : (
          <div className="flex-1 flex flex-col gap-6 py-6 overflow-y-auto">
            {/* List of items */}
            <div className="flex flex-col gap-4">
              {cartProducts.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-4"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-white uppercase">
                      {product.name}
                    </span>
                    <span className="text-[11px] font-mono text-brand-amber">
                      {product.volume} • {product.price}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-white/20 rounded-full overflow-hidden bg-black/40">
                      <button
                        onClick={() => onUpdateQuantity(product.id, -1)}
                        className="px-2.5 py-1 text-xs hover:bg-white/10 text-white transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-mono font-bold text-white">
                        {quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(product.id, 1)}
                        className="px-2.5 py-1 text-xs hover:bg-white/10 text-white transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(product.id)}
                      className="text-white/40 hover:text-red-400 p-1 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Delivery Inquiry Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 pt-4 border-t border-white/10 text-xs">
              <span className="text-[10px] font-mono tracking-mega uppercase text-brand-amber">
                Recipient Details
              </span>

              <input
                type="text"
                required
                placeholder="Full Name / Principal"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/15 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-brand-amber"
              />

              <input
                type="email"
                required
                placeholder="Executive Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/15 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-brand-amber"
              />

              <select
                value={formData.deliveryLocation}
                onChange={(e) => setFormData({ ...formData, deliveryLocation: e.target.value })}
                className="w-full px-4 py-2.5 bg-brand-elevated border border-white/15 rounded-xl text-white focus:outline-none focus:border-brand-amber"
              >
                <option>New York (Executive Courier)</option>
                <option>Milan (Galleria Showroom)</option>
                <option>Geneva (Alpine Direct Fleet)</option>
                <option>Tokyo (Ginza Private Hub)</option>
                <option>London (Mayfair Flagship)</option>
              </select>

              <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs text-white/60">
                  <span>Subtotal</span>
                  <span className="font-mono text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-white/60">
                  <span>White-Glove Courier</span>
                  <span className="font-mono text-brand-amber">COMPLIMENTARY</span>
                </div>
                <div className="flex justify-between items-center text-sm font-bold text-white pt-2 border-t border-white/10">
                  <span>Total Reserve</span>
                  <span className="font-mono text-brand-amber">${subtotal.toFixed(2)}</span>
                </div>

                <button
                  type="submit"
                  className="w-full mt-3 py-3.5 rounded-full bg-brand-amber text-black font-extrabold tracking-widest text-xs uppercase hover:bg-white transition-colors duration-300 flex items-center justify-center gap-2 shadow-xl"
                >
                  <span>CONFIRM ALLOCATION DISPATCH</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
