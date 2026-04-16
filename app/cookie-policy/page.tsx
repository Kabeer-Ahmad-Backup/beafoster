'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CookiePolicy() {
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
              Cookie Policy
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
            <p>This Cookie Policy explains how The Black Tie Chandelier Gala uses cookies and similar technologies when you visit our website.</p>

            <h2 className="text-2xl font-serif text-black mt-8 mb-4">What Are Cookies</h2>
            <p>Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and to provide information to website owners.</p>

            <h2 className="text-2xl font-serif text-black mt-8 mb-4">How We Use Cookies</h2>
            <p>We use cookies to enhance your browsing experience, remember your preferences, and understand how you use our website. This helps us improve our site and serve you better.</p>

            <h2 className="text-2xl font-serif text-black mt-8 mb-4">Managing Cookies</h2>
            <p>You can control and manage cookies through your browser settings. Please note that disabling cookies may affect the functionality of our website.</p>

            <h2 className="text-2xl font-serif text-black mt-8 mb-4">Contact Us</h2>
            <p>If you have questions about our use of cookies, please contact us at info@theblacktiechandeliergala.com.</p>

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
