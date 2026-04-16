'use client';

import { motion } from 'framer-motion';
import { Mail, FileText } from 'lucide-react';
import Link from 'next/link';

export default function Press() {
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
              Press
            </h1>
            <div className="w-20 h-px bg-gold mx-auto mb-4" />
            <p className="text-charcoal">Media inquiries and press resources for The Black Tie Chandelier Gala.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-24">
        <div className="container-luxury max-w-3xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8 text-charcoal"
          >
            <p>We welcome press and media inquiries. Our team is available to assist with interview requests, high-resolution images, and brand information.</p>

            <h2 className="text-2xl font-serif text-black mt-8 mb-4">Media Inquiries</h2>
            <p>For press requests, please contact:</p>
            <a
              href="mailto:info@theblacktiechandeliergala.com?subject=Press Inquiry"
              className="inline-flex items-center gap-2 text-gold hover:underline mt-2"
            >
              <Mail className="w-5 h-5" />
              info@theblacktiechandeliergala.com
            </a>

            <h2 className="text-2xl font-serif text-black mt-8 mb-4">About The Black Tie Chandelier Gala</h2>
            <p>The Black Tie Chandelier Gala is a premier luxury brand offering fashion design, interior styling, magazine publication, and exclusive events. Founded with a vision to elevate elegance, we have been crafting refined experiences for over 15 years.</p>

            <h2 className="text-2xl font-serif text-black mt-8 mb-4">Press Kit</h2>
            <p>For logos, images, and brand assets, please reach out to our media team at the email above. We&apos;re happy to provide materials for editorial use.</p>
            <div className="flex items-center gap-2 text-gray-400">
              <FileText className="w-5 h-5" />
              <span>Press kit available upon request</span>
            </div>

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
