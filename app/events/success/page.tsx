'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

function SuccessInner() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <div className="min-h-screen bg-cream px-4 pb-20 pt-8">
      <div className="container-luxury mx-auto max-w-lg text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="border border-beige bg-white p-10 shadow-lg"
        >
          <CheckCircle className="mx-auto mb-6 h-16 w-16 text-gold" aria-hidden />
          <h1 className="mb-3 font-serif text-3xl text-black">You&apos;re booked</h1>
          <p className="mb-6 leading-relaxed text-charcoal">
            Thank you for supporting The Black Tie Chandelier Gala. Stripe will email your receipt. We look forward to
            seeing you at the event.
            {sessionId && (
              <span className="mt-2 block text-sm text-charcoal/80">
                Reference: {sessionId.slice(0, 24)}…
              </span>
            )}
          </p>
          <Link
            href="/events"
            className="inline-block bg-black px-8 py-3 text-sm uppercase tracking-widest text-white transition-colors hover:bg-charcoal"
          >
            Back to event
          </Link>
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
