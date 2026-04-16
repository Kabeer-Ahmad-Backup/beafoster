'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setEmail('');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="py-12 sm:py-16 md:py-24 bg-cream">
        <div className="container-luxury px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-black mb-4">
              Newsletter
            </h1>
            <div className="w-20 h-px bg-gold mx-auto mb-4" />
            <p className="text-charcoal">Stay updated with our latest events, fashion insights, and exclusive offers.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-24">
        <div className="container-luxury max-w-xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold text-charcoal"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-black text-white hover:bg-charcoal rounded-lg transition-colors duration-300 group disabled:opacity-70"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              {submitStatus === 'success' && (
                <p className="text-center text-gold font-medium">
                  Thank you for subscribing! You&apos;ll receive our next update soon.
                </p>
              )}
            </form>
            <p className="text-sm text-gray-500 mt-6 text-center">
              We respect your privacy. Unsubscribe at any time.
            </p>
            <div className="pt-8 text-center">
              <Link href="/" className="text-gold hover:underline">
                ← Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
