'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function TermsOfService() {
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
              Terms of Service
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
            <p>Welcome to The Black Tie Chandelier Gala. By accessing or using our website, you agree to be bound by these Terms of Service.</p>

            <h2 className="text-2xl font-serif text-black mt-8 mb-4">Use of Our Website</h2>
            <p>You may use our website for lawful purposes only. You agree not to use the site in any way that could damage, disable, or impair the website or interfere with any other party&apos;s use of the site.</p>

            <h2 className="text-2xl font-serif text-black mt-8 mb-4">Intellectual Property</h2>
            <p>All content on this website, including text, images, logos, and design elements, is the property of The Black Tie Chandelier Gala and is protected by copyright and other intellectual property laws.</p>

            <h2 className="text-2xl font-serif text-black mt-8 mb-4">Limitation of Liability</h2>
            <p>The Black Tie Chandelier Gala shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our website or services.</p>

            <h2 className="text-2xl font-serif text-black mt-8 mb-4">Contact Us</h2>
            <p>For questions about these Terms of Service, please contact us at info@theblacktiechandeliergala.com.</p>

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
