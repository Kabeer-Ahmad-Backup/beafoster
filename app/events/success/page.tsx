'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import CheckoutReceiptDetails from '@/components/checkout/CheckoutReceiptDetails';

function SuccessInner() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <div className="min-h-screen bg-cream px-4 pb-20 pt-8 print:bg-white">
      <div className="container-luxury mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="border border-beige bg-white p-8 shadow-lg sm:p-10 print:border-0 print:shadow-none"
        >
          <CheckCircle className="mx-auto mb-6 h-16 w-16 text-gold" aria-hidden />
          <h1 className="mb-3 text-center font-serif text-3xl text-black">You&apos;re booked</h1>
          <p className="mb-2 text-center leading-relaxed text-charcoal">
            Thank you for supporting The Black Tie Chandelier Gala. Your receipt is below if Stripe&apos;s email
            hasn&apos;t arrived yet.
          </p>
          <CheckoutReceiptDetails sessionId={sessionId} />
          <div className="no-print mt-10 text-center">
            <Link
              href="/events"
              className="inline-block bg-black px-8 py-3 text-sm uppercase tracking-widest text-white transition-colors hover:bg-charcoal"
            >
              Back to event
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function EventsTicketSuccessPage() {
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
