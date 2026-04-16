'use client';

import { useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

function SuccessInner() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const clearCart = useCartStore((s) => s.clearCart);

  useEffect(() => {
    if (sessionId) {
      clearCart();
    }
  }, [sessionId, clearCart]);

  return (
    <div className="min-h-screen bg-cream px-4 pb-20 pt-8">
      <div className="container-luxury max-w-lg mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white border border-beige p-10 shadow-lg"
        >
          <CheckCircle className="w-16 h-16 text-gold mx-auto mb-6" aria-hidden />
          <h1 className="text-3xl font-serif text-black mb-3">Thank you</h1>
          <p className="text-charcoal leading-relaxed mb-6">
            Your payment was received. You will get a confirmation email from Stripe with your receipt.
            {sessionId && (
              <span className="block mt-2 text-sm text-charcoal/80">
                Order reference: {sessionId.slice(0, 20)}…
              </span>
            )}
          </p>
          <Link
            href="/boutique"
            className="inline-block px-8 py-3 bg-black text-white hover:bg-charcoal transition-colors text-sm uppercase tracking-widest"
          >
            Back to boutique
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default function BoutiqueSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen justify-center bg-cream pt-8">
          <p className="text-charcoal">Loading…</p>
        </div>
      }
    >
      <SuccessInner />
    </Suspense>
  );
}
