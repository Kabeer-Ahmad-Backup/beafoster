'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const magazines = [
  { year: '2017', title: '2017 Magazine', pdf: '/2017_mag.pdf' },
  { year: '2018', title: '2018 Magazine', pdf: '/2018_mag.pdf' },
];

const FLIPBOOK_URL = 'https://heyzine.com/flip-book/e8603ec929.html';

export default function MagazineFlipbookSection() {
  return (
    <section className="py-12 sm:py-16 md:py-24 lg:py-32 bg-cream">
      <div className="container-luxury">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl md:text-6xl font-serif text-black text-center mb-8 sm:mb-12"
        >
          Magazine
        </motion.h2>
        <div className="w-20 h-px bg-gold mx-auto mb-8 sm:mb-12" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left: 2026 Flipbook */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <p className="text-sm uppercase tracking-wider text-gold font-medium mb-2">Latest Issue</p>
            <h3 className="text-2xl sm:text-3xl font-serif text-black mb-4">2026 Magazine</h3>
            <div className="rounded-lg overflow-hidden border border-beige bg-white shadow-lg min-h-[500px] sm:min-h-[550px] md:min-h-[600px]">
              <iframe
                allowFullScreen
                allow="clipboard-write"
                scrolling="no"
                className="fp-iframe w-full border-0 h-[500px] sm:h-[550px] md:h-[600px]"
                src={FLIPBOOK_URL}
                title="2026 Magazine Flipbook"
              />
            </div>
            <Link
              href="/magazine#flipbook"
              className="inline-flex items-center gap-2 text-charcoal hover:text-black transition-colors uppercase tracking-wider text-sm font-medium mt-4"
            >
              View Full Flipbook
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Right: Past Issues – 2017 & 2018 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="order-1 lg:order-2"
          >
            <p className="text-sm uppercase tracking-wider text-charcoal font-medium mb-4">Past issues</p>
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {magazines.map((mag, index) => (
                <motion.a
                  key={mag.year}
                  href={mag.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
                  className="group block"
                >
                  <div className="relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden rounded-lg bg-white border-2 border-beige group-hover:border-gold transition-all duration-300 hover:shadow-xl">
                    <iframe
                      src={`${mag.pdf}#page=1`}
                      title={mag.title}
                      className="absolute inset-0 w-full h-full pointer-events-none border-0"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <p className="text-lg font-serif font-bold">{mag.year}</p>
                      <span className="inline-flex items-center gap-1 text-sm font-medium uppercase tracking-wider opacity-90 group-hover:opacity-100 transition-opacity">
                        Open PDF
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                  <p className="mt-3 text-base font-serif text-black">
                    {mag.title}
                  </p>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10 sm:mt-12"
        >
          <Link
            href="/magazine"
            className="inline-flex items-center gap-2 text-charcoal hover:text-black transition-colors uppercase tracking-wider text-sm font-medium"
          >
            View Archives
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

