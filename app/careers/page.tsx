'use client';

import { motion } from 'framer-motion';
import { Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Careers() {
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
              Careers
            </h1>
            <div className="w-20 h-px bg-gold mx-auto mb-4" />
            <p className="text-charcoal">Join our team and help shape the future of luxury fashion and design.</p>
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
            <p>The Black Tie Chandelier Gala is always seeking talented individuals who share our passion for elegance, creativity, and excellence. Whether in fashion, interiors, events, or editorial, we offer opportunities to grow within a supportive and inspiring environment.</p>

            <h2 className="text-2xl font-serif text-black mt-8 mb-4">Why Join Us</h2>
            <ul className="space-y-3 list-disc list-inside text-charcoal">
              <li>Work with a renowned luxury brand</li>
              <li>Creative and collaborative culture</li>
              <li>Opportunities for growth and development</li>
              <li>Access to exclusive events and industry connections</li>
            </ul>

            <h2 className="text-2xl font-serif text-black mt-8 mb-4">Get in Touch</h2>
            <p>We&apos;d love to hear from you. Send your resume and cover letter to:</p>
            <a
              href="mailto:info@theblacktiechandeliergala.com?subject=Career Inquiry"
              className="inline-flex items-center gap-2 text-gold hover:underline mt-2"
            >
              <Mail className="w-5 h-5" />
              info@theblacktiechandeliergala.com
            </a>

            <div className="pt-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-charcoal rounded-lg transition-colors"
              >
                Contact Us
                <ArrowRight className="w-4 h-4" />
              </Link>
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
