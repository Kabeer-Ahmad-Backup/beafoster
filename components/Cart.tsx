'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight, Loader2 } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

function formatMoney(n: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(n);
}

export default function Cart() {
  const pathname = usePathname();
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotal, getItemCount } = useCartStore();
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const onCheckout = async () => {
    if (items.length === 0) return;
    setCheckoutError(null);
    setCheckoutLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((i) => ({
            productId: i.productId,
            quantity: i.quantity,
            size: i.size,
          })),
        }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok) {
        setCheckoutError(data.error ?? 'Checkout failed');
        return;
      }
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      setCheckoutError('No checkout URL returned');
    } catch {
      setCheckoutError('Network error. Please try again.');
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeCart}
              className="fixed inset-0 bg-black/50 z-[100]"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-full sm:w-96 md:w-[450px] bg-white shadow-2xl z-[101] flex flex-col overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-beige bg-cream">
                <div>
                  <h2 className="text-xl sm:text-2xl font-serif text-black mb-1">Shopping Cart</h2>
                  {items.length > 0 && (
                    <p className="text-xs sm:text-sm text-charcoal">
                      {getItemCount()} {getItemCount() === 1 ? 'item' : 'items'}
                    </p>
                  )}
                </div>
                <button
                  onClick={closeCart}
                  className="p-2 hover:bg-beige rounded-lg transition-colors group"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5 text-charcoal group-hover:text-black transition-colors" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 sm:p-6 min-h-0">
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center h-full text-center px-4"
                  >
                    <div className="w-24 h-24 sm:w-32 sm:h-32 bg-cream rounded-full flex items-center justify-center mb-6">
                      <ShoppingBag className="w-12 h-12 sm:w-16 sm:h-16 text-charcoal/30" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-serif text-black mb-2">Your cart is empty</h3>
                    <p className="text-sm sm:text-base text-charcoal mb-6 max-w-xs">
                      Add items from the boutique to check out securely with Stripe.
                    </p>
                    <Link
                      href="/boutique"
                      onClick={closeCart}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-charcoal transition-colors text-sm uppercase tracking-wider"
                    >
                      Shop boutique
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                ) : (
                  <div className="space-y-3 sm:space-y-4">
                    {items.map((item, index) => (
                      <motion.div
                        key={item.lineId}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20, scale: 0.9 }}
                        transition={{ delay: index * 0.05 }}
                        className="group flex gap-3 sm:gap-4 p-3 sm:p-4 bg-cream border border-beige hover:border-gold transition-colors"
                      >
                        <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 bg-charcoal overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm sm:text-base font-serif text-black mb-1 truncate">{item.name}</h3>
                          {item.size && item.size !== 'One size' && (
                            <p className="text-xs text-charcoal mb-1">Size: {item.size}</p>
                          )}
                          <p className="text-base sm:text-lg font-serif text-black mb-2">
                            {formatMoney(item.priceCents / 100)}
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-xs text-charcoal mb-2">
                              Subtotal: {formatMoney((item.priceCents * item.quantity) / 100)}
                            </p>
                          )}
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div className="flex items-center border border-beige bg-white">
                              <button
                                onClick={() => updateQuantity(item.lineId, item.quantity - 1)}
                                className="p-1.5 sm:p-2 hover:bg-beige transition-colors group/btn"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3 h-3 sm:w-4 sm:h-4 text-charcoal group-hover/btn:text-black transition-colors" />
                              </button>
                              <span className="w-8 sm:w-10 text-center text-sm sm:text-base text-black font-medium">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.lineId, item.quantity + 1)}
                                className="p-1.5 sm:p-2 hover:bg-beige transition-colors group/btn"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3 sm:w-4 sm:h-4 text-charcoal group-hover/btn:text-black transition-colors" />
                              </button>
                            </div>
                            <button
                              onClick={() => removeItem(item.lineId)}
                              className="p-1.5 sm:p-2 hover:bg-red-50 transition-colors rounded"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 text-charcoal hover:text-red-600 transition-colors" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {items.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border-t border-beige p-4 sm:p-6 bg-cream space-y-4"
                >
                  <div className="flex items-center justify-between text-sm text-charcoal">
                    <span>Subtotal</span>
                    <span className="font-medium">{formatMoney(getTotal())}</span>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-beige">
                    <span className="text-base sm:text-lg font-medium text-black">Total</span>
                    <span className="text-2xl sm:text-3xl font-serif text-black">{formatMoney(getTotal())}</span>
                  </div>

                  <p className="text-xs text-charcoal/90">
                    Shipping is calculated separately where applicable. Stripe securely processes card payments only.
                  </p>

                  {checkoutError && (
                    <p className="text-sm text-red-700 bg-red-50 border border-red-100 px-3 py-2">{checkoutError}</p>
                  )}

                  <div className="space-y-2 sm:space-y-3 pt-2">
                    <button
                      type="button"
                      onClick={onCheckout}
                      disabled={checkoutLoading}
                      className="w-full px-6 py-3 sm:py-4 bg-black text-white hover:bg-charcoal transition-colors text-sm sm:text-base uppercase tracking-wider flex items-center justify-center gap-2 group disabled:opacity-60"
                    >
                      {checkoutLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Redirecting…
                        </>
                      ) : (
                        <>
                          Checkout with Stripe
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                    <Link
                      href="/boutique"
                      onClick={closeCart}
                      className="block w-full px-6 py-3 text-center border-2 border-black text-black hover:bg-black hover:text-white transition-colors text-sm sm:text-base uppercase tracking-wider"
                    >
                      Continue shopping
                    </Link>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
