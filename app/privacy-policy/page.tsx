'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function PrivacyPolicy() {
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
              Privacy Policy
            </h1>
            <div className="w-20 h-px bg-gold mx-auto mb-4" />
            <p className="text-charcoal">Last updated: March 2024</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-24">
        <div className="container-luxury max-w-3xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose prose-lg max-w-none text-charcoal space-y-6"
          >
            <p>The Black Tie Chandelier Gala (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>

            <h2 className="text-2xl font-serif text-black mt-8 mb-4">Information We Collect</h2>
            <p>We may collect personal information you provide directly to us, including your name, email address, phone number, and any other information you choose to provide when contacting us or subscribing to our newsletter.</p>

            <h2 className="text-2xl font-serif text-black mt-8 mb-4">How We Use Your Information</h2>
            <p>We use the information we collect to respond to your inquiries, send you updates about our events and services, improve our website, and communicate with you about The Black Tie Chandelier Gala.</p>

            <h2 className="text-2xl font-serif text-black mt-8 mb-4">Sharing Your Information</h2>
            <p>We do not sell, trade, or otherwise transfer your personal information to third parties except as described in this policy or with your consent.</p>

            <h2 className="text-2xl font-serif text-black mt-8 mb-4">Contact Us</h2>
            <p>If you have questions about this Privacy Policy, please contact us at info@theblacktiechandeliergala.com or PO Box 24026, Columbus, OH 43224–2531.</p>

            <div className="pt-8">
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
