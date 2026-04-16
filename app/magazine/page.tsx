'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Magazine() {
  const archivesScrollRef = useRef<HTMLDivElement>(null);

  const archives = [
    {
      year: '2017',
      title: '2017 Magazine',
      pdf: '/2017_mag.pdf',
    },
    {
      year: '2018',
      title: '2018 Magazine',
      pdf: '/2018_mag.pdf',
    },
  ];

  const adPricing = [
    {
      size: 'Full Page',
      dimensions: '8.5" × 11"',
      price: '$4,500',
      description: 'Maximum visibility with a full-page advertisement',
      features: ['Premium placement', 'High-resolution printing', 'Digital inclusion'],
    },
    {
      size: 'Half Page',
      dimensions: '8.5" × 5.5"',
      price: '$2,500.00',
      description: 'Prominent placement with half-page advertisement',
      features: ['Strategic positioning', 'Quality printing', 'Digital inclusion'],
    },
    {
      size: 'Quarter Page',
      dimensions: '4.25" × 5.5"',
      price: '$900.00',
      description: 'Cost-effective option with quarter-page advertisement',
      features: ['Targeted reach', 'Standard printing', 'Digital inclusion'],
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-cream relative overflow-hidden">
        <div className="container-luxury w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-black mb-4">
              Magazine
            </h1>
            <div className="w-20 h-px bg-gold mx-auto mb-6" />
            <p className="text-lg text-charcoal leading-relaxed">
              Explore our collection of magazine issues. Browse the archives below to view past editions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2026 Magazine – Flipbook */}
      <section id="flipbook" className="py-12 md:py-20 lg:py-24 bg-white">
        <div className="container-luxury px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <span className="text-xs sm:text-sm uppercase tracking-wider text-gold font-medium">Latest Issue</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-black mt-2 mb-4">
              2026 Magazine
            </h2>
            <div className="w-20 h-px bg-gold mx-auto mb-4" />
            <p className="text-charcoal max-w-xl mx-auto">
              Flip through the digital edition below
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="rounded-lg overflow-hidden border border-beige bg-white shadow-lg"
          >
            <iframe
              allowFullScreen
              allow="clipboard-write"
              scrolling="no"
              className="fp-iframe w-full border-0"
              src="https://heyzine.com/flip-book/e8603ec929.html"
              title="2026 Magazine Flipbook"
              style={{ height: '500px' }}
            />
          </motion.div>
          <p className="text-center mt-4 text-sm text-charcoal">
            <a href="/Magazine_2026.pdf" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">
              Download PDF
            </a>
          </p>
        </div>
      </section>

      {/* Archives Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-white">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16 lg:mb-20"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-black mb-4">
              Past Issues
            </h2>
            <div className="w-24 h-px bg-gold mx-auto mb-4" />
            <p className="text-base md:text-lg text-charcoal max-w-2xl mx-auto">
              Browse through our collection of past issues (2017, 2018)
            </p>
          </motion.div>

          <div className="relative">
            {/* Slider Container */}
            <div
              ref={archivesScrollRef}
              className="flex gap-6 md:gap-8 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {archives.map((issue, index) => (
                <motion.a
                  key={issue.year}
                  href={issue.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group flex-shrink-0 w-48 sm:w-56 md:w-64"
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-lg mb-4 bg-cream border-2 border-beige group-hover:border-gold transition-colors">
                    <iframe
                      src={`${issue.pdf}#page=1`}
                      title={issue.title}
                      className="absolute inset-0 w-full h-full pointer-events-none border-0"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="inline-flex items-center gap-1 text-sm font-medium uppercase tracking-wider">
                        View PDF
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-serif text-black">
                      {issue.title}
                    </h3>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={() => {
                  if (archivesScrollRef.current) {
                    archivesScrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
                  }
                }}
                className="p-3 bg-cream hover:bg-beige border border-beige rounded-full transition-colors group"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5 text-charcoal group-hover:text-black" />
              </button>
              <button
                onClick={() => {
                  if (archivesScrollRef.current) {
                    archivesScrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
                  }
                }}
                className="p-3 bg-cream hover:bg-beige border border-beige rounded-full transition-colors group"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5 text-charcoal group-hover:text-black" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Advertising Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-beige">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16 lg:mb-20"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-black mb-4">
              Advertising Opportunities
            </h2>
            <div className="w-24 h-px bg-gold mx-auto mb-4" />
            <p className="text-base md:text-lg text-charcoal max-w-2xl mx-auto">
              Reach our exclusive audience of luxury enthusiasts and industry professionals
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
            {adPricing.map((ad, index) => (
              <motion.div
                key={ad.size}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="bg-white p-8 rounded-lg border border-beige hover:shadow-xl transition-all duration-300"
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl md:text-3xl font-serif text-black mb-2">
                    {ad.size}
                  </h3>
                  <p className="text-sm text-charcoal mb-4">
                    {ad.dimensions}
                  </p>
                  <div className="text-4xl md:text-5xl font-serif text-gold mb-4">
                    {ad.price}
                  </div>
                </div>
                <p className="text-charcoal mb-6 text-center leading-relaxed">
                  {ad.description}
                </p>
                <ul className="space-y-3">
                  {ad.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-charcoal">
                      <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full mt-6 px-6 py-3 bg-black text-white font-medium hover:bg-charcoal transition-colors uppercase tracking-wider text-sm">
                  Inquire Now
                </button>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-charcoal mb-4">
              For custom advertising packages and editorial features, please contact us
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 text-charcoal hover:text-black transition-colors uppercase tracking-wider text-sm"
            >
              Contact Sales Team
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

    </div>
  );
}

