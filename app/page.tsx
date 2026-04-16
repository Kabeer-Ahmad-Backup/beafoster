'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShoppingBag, Calendar, Award, ChevronLeft, ChevronRight, BookOpen, Star } from 'lucide-react';
import MagazineFlipbookSection from '@/components/MagazineFlipbookSection';
import { upcomingEvent } from '@/lib/eventData';
import { getProduct, productIsForSale } from '@/lib/boutiqueCatalog';
import { useRef } from 'react';

function formatPrice(cents: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);
}

export default function Home() {
  const fashionScrollRef = useRef<HTMLDivElement>(null);
  const accessoriesScrollRef = useRef<HTMLDivElement>(null);
  const interiorScrollRef = useRef<HTMLDivElement>(null);

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const boutiqueProducts = {
    fashion: [
      { id: 'BSHOODIEB', name: 'Hoodie Black', price: 0, image: '/BSPORTY/BSHOODIEB/unisex-heavy-blend-hoodie-black-front-6952cd1a5f854.jpg' },
      { id: 'BSHatB', name: 'Hat B', price: 0, image: '/BSPORTY/BSHatB/classic-dad-hat-black-front-6931c9111da74.jpg' },
      { id: 'BSLongSleeveB', name: 'Long Sleeve Black', price: 0, image: '/BSPORTY/BSLongSleeveB/unisex-garment-dyed-heavyweight-long-sleeve-shirt-black-front-6931c719aa2c6.jpg' },
      { id: 'BSSweatpantsB', name: 'Sweatpants Black', price: 0, image: '/BSPORTY/BSSweatpantsB/unisex-fleece-sweatpants-black-front-6931c86884b88.jpg' },
    ],
    accessories: [
      { id: 'BSDuffleAB', name: 'Duffle A B', price: 0, image: '/BSPORTY/BSDuffleAB/all-over-print-duffle-bag-white-front-6931db0dbfbfd.jpg' },
      { id: 'BSToteB', name: 'Tote Black', price: 0, image: '/BSPORTY/BSToteB/all-over-print-large-tote-bag-w-pocket-black-front-6931cac8c000a.jpg' },
      { id: 'BSTumblerLogoB', name: 'Tumbler Black', price: 0, image: '/BSPORTY/BSTumblerLogoB/stainless-steel-tumbler-black-front-6931dea66be41.jpg' },
      { id: 'BSFannyB', name: 'Fanny Pack', price: 0, image: '/BSPORTY/BSFannyB/all-over-print-fanny-pack-white-front-6931e52bb839e.jpg' },
    ],
    home: [
      { id: 'BSBlanketBoxW', name: 'Blanket Box', price: 0, image: '/BSPORTY/BSBlanketBoxW/throw-blanket-50x60-front-6931dd58613a8.jpg' },
      { id: 'BSMugBS', name: 'Mug B S', price: 0, image: '/BSPORTY/BSMugBS/enamel-mug-white-12-oz-front-6931cba939d13.jpg' },
      { id: 'BSPillowB', name: 'Pillow Black', price: 0, image: '/BSPORTY/BSPillowB/all-over-print-basic-pillow-18x18-front-6931ccc50feb6.jpg' },
      { id: 'BSPoster', name: 'Framed Poster', price: 0, image: '/BSPORTY/BSPoster/matte-paper-framed-poster-with-mat-(in)-black-12x16-front-6931ddf2bc22e.jpg' },
    ]
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh] lg:min-h-[85vh] flex items-center justify-center overflow-hidden bg-cream py-8 sm:py-12 md:py-16">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-cream via-cream/95 to-cream" />
          <Image
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80"
            alt="Luxury Fashion"
            fill
            className="object-cover opacity-10"
            priority
          />
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Gold Accent Lines */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="absolute top-1/4 left-0 right-0 h-px bg-gold/30"
          />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.7 }}
            className="absolute bottom-1/4 left-0 right-0 h-px bg-gold/30"
          />

          {/* Decorative Circles */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{ duration: 2, delay: 0.8 }}
            className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full border border-gold/20"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{ duration: 2, delay: 1 }}
            className="absolute bottom-1/4 left-1/4 w-48 h-48 rounded-full border border-gold/20"
          />

          {/* Floating Elements */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-20 right-10 w-2 h-2 bg-gold rounded-full opacity-60"
          />
          <motion.div
            animate={{
              y: [0, 20, 0],
              rotate: [0, -5, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute bottom-20 left-10 w-3 h-3 bg-gold rounded-full opacity-40"
          />
        </div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="container-luxury text-center z-10 relative"
        >
          {/* Small Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-4 sm:mb-6"
          >
            <span className="inline-block text-sm sm:text-base md:text-lg uppercase tracking-[0.3em] text-charcoal/70 border-t border-b border-gold/30 py-2 px-4 font-bold">
              Welcome
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-serif text-black mb-4 sm:mb-6 leading-tight px-4 relative inline-block"
          >
            <span className="relative block">
              <span className="block">The Black Tie</span>
              <span className="block">Chandelier Gala</span>
              {/* Decorative underline */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gold origin-left"
              />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mb-6 sm:mb-8 md:mb-10 px-4"
          >
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-charcoal tracking-[0.2em] uppercase font-bold mb-2">
              Dr. Bea Foster, Ph.D.
            </p>
            <div className="w-16 sm:w-20 h-px bg-gold mx-auto my-4" />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
          >
            <Link
              href="/about"
              className="group relative w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-black text-white text-sm sm:text-base font-medium hover:bg-charcoal transition-all duration-300 uppercase tracking-wider flex items-center justify-center gap-2 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Read More
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <motion.div
                className="absolute inset-0 bg-gold"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Welcome Letter Section */}
      <section className="py-12 sm:py-16 md:py-24 lg:py-32 bg-white">
        <div className="container-luxury px-4 sm:px-0">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h2
              variants={fadeUpVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-black mb-6 sm:mb-8"
            >
              Welcome to The Black Tie Chandelier
            </motion.h2>

            <motion.div variants={fadeUpVariants} className="text-left space-y-6 text-charcoal text-lg font-light leading-relaxed">
              <p className="font-serif italic text-2xl text-center mb-8">Dear Friend,</p>

              <p>Welcome. I am so grateful that you are here.</p>

              <p>
                My name is Dr. Bea Foster, Ph.D., and for more than fifty years I have lived in the world of design, fashion, beauty, and transformation.
                I have dressed windows and rooms, walked runways, mentored women and men, and created spaces that make people feel seen, elegant, and at home.
              </p>

              <p>Today, my work has grown into something even deeper.</p>

              <p>
                The Black Tie Chandelier Gala and the programs connected to it were born from both great love and great loss.
                After losing two precious granddaughters to cancer, I knew I had to find a way to keep their memory alive and to turn my pain into purpose.
                On the wings of those two little butterflies, I chose to move forward—to help others feel good about themselves again, to strengthen the weak,
                and to encourage healing, hope, and new beginnings.
              </p>

              <p className="font-medium text-black">This space—this website, this Gala, these courses—is part of that promise.</p>

              <div className="bg-cream p-8 rounded-lg border border-gold/20 my-8">
                <h3 className="font-serif text-2xl text-center mb-6">My heart’s desire is to:</h3>
                <ul className="space-y-4 max-w-2xl mx-auto">
                  <li className="flex items-start gap-3">
                    <span className="text-gold text-xl">✦</span>
                    <span>Help you rediscover your beauty, inside and out</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gold text-xl">✦</span>
                    <span>Encourage you to stand taller, walk in confidence, and believe in your future</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gold text-xl">✦</span>
                    <span>Offer elegant experiences and simple tools that help you grow, flourish, and feel fabulous at any age</span>
                  </li>
                </ul>
              </div>

              <blockquote className="border-l-4 border-gold pl-6 py-4 my-10 italic text-xl sm:text-2xl font-serif text-black/80">
                “The sky is the limit—all you have to do is reach for it.
                Your path has been cleared, the mountains have been moved,
                the door has been opened.
                All you have to do is walk through with a smile, grace, elegance, and determination.”
              </blockquote>

              <p>
                If you are ready to upgrade your sense of style, renew your confidence, or simply step into a room—and into your life—with more grace and assurance,
                you are in the right place and the right time.
              </p>

              <p>
                Together with my right hand, Dr. Mellinda DePriest, and a growing circle of supporters, we are here to direct you, guide you, inspire you,
                and encourage you in every way we can.
              </p>

              <div className="text-center my-10 space-y-4">
                <h3 className="text-2xl font-serif mb-6">I want you to BEA:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
                  <div className="bg-charcoal text-white p-4 uppercase tracking-widest text-sm">BEA beautiful</div>
                  <div className="bg-charcoal text-white p-4 uppercase tracking-widest text-sm">BEA adventurous</div>
                  <div className="bg-charcoal text-white p-4 uppercase tracking-widest text-sm">BEA blessed and abundant</div>
                  <div className="bg-charcoal text-white p-4 uppercase tracking-widest text-sm">BEA brave</div>
                </div>
                <p className="text-sm italic mt-2 text-gray-500">— never giving up and never giving in</p>
              </div>

              <p>
                Thank you for visiting, for believing in what we are building, and for helping keep my granddaughters’ memory alive as we work to bring comfort, confidence, and change to others.
              </p>

              <div className="mt-12 text-center">
                <p className="italic mb-2">With love, elegance, and gratitude,</p>
                <div className="font-serif text-2xl font-bold">Dr. Bea Foster, Ph.D.</div>
                <div className="text-sm uppercase tracking-wide text-gold mt-1">Founder, The Black Tie Chandelier Gala</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 sm:py-16 md:py-24 lg:py-32 bg-cream">
        <div className="container-luxury px-4 sm:px-0">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-black text-center mb-8 sm:mb-12 md:mb-16"
          >
            Our Services
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: 'Fashion',
                description: 'Bespoke couture and ready-to-wear collections',
                image: '/fashion/f9.webp',
                href: '/fashion',
              },
              {
                title: 'Interiors',
                description: 'Transformative luxury interior design',
                image: '/interior_des.jpg',
                href: '/interiors',
              },
              {
                title: 'Magazine',
                description: 'Editorial excellence and storytelling',
                image: '/Magazine_des.jpg',
                href: '/magazine',
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group cursor-pointer"
              >
                <Link href={service.href}>
                  <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden bg-charcoal">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 text-white">
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold md:font-extrabold mb-1 sm:mb-2 uppercase tracking-wide">{service.title}</h3>
                      <p className="text-sm sm:text-base md:text-lg font-semibold opacity-95">{service.description}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mini Boutique Preview */}
      <section className="py-12 sm:py-16 md:py-24 lg:py-32 bg-white">
        <div className="container-luxury px-4 sm:px-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-black mb-3 sm:mb-4">
              B. Sporty
            </h2>
            <div className="w-16 sm:w-20 h-px bg-gold mx-auto mb-4 sm:mb-6" />
            <p className="text-base sm:text-lg md:text-xl text-charcoal/80 leading-relaxed max-w-2xl mx-auto mb-6 sm:mb-8 font-medium">
              Elevate your style with our exclusive sportswear and lifestyle collection
            </p>
            <Link
              href="/boutique"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-black text-white text-sm sm:text-base font-medium hover:bg-charcoal transition-colors uppercase tracking-wider group"
            >
              View All Products
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Three Column Sliders */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
            {/* Fashion Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col"
            >
              <h3 className="text-xl sm:text-2xl font-serif text-black mb-4 sm:mb-6 text-center md:text-left">
                Fashion
              </h3>
              <div className="relative">
                <div
                  ref={fashionScrollRef}
                  className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
                >
                  {boutiqueProducts.fashion.map((product) => {
                    const listed = getProduct(product.id);
                    return (
                    <Link
                      key={product.id}
                      href="/boutique"
                      className="group flex-shrink-0 w-48 sm:w-56"
                    >
                      <div className="bg-white border border-beige/50 hover:shadow-xl transition-all duration-500">
                        <div className="relative h-48 sm:h-56 bg-cream/30 overflow-hidden">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-3 sm:p-4 text-center">
                          <h4 className="text-base sm:text-lg md:text-xl font-serif font-bold text-black mb-2 line-clamp-1">
                            {product.name}
                          </h4>
                          <span className="text-sm sm:text-base uppercase tracking-wider !text-gold">
                            {!listed
                              ? 'Shop boutique'
                              : productIsForSale(listed)
                                ? formatPrice(listed.priceCents!)
                                : 'Coming soon'}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );})}
                </div>
                <div className="flex justify-center md:justify-start gap-2 mt-4">
                  <button
                    onClick={() => {
                      if (fashionScrollRef.current) {
                        fashionScrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
                      }
                    }}
                    className="p-2 bg-cream hover:bg-beige border border-beige rounded-full transition-colors"
                    aria-label="Scroll left"
                  >
                    <ChevronLeft className="w-4 h-4 text-charcoal" />
                  </button>
                  <button
                    onClick={() => {
                      if (fashionScrollRef.current) {
                        fashionScrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
                      }
                    }}
                    className="p-2 bg-cream hover:bg-beige border border-beige rounded-full transition-colors"
                    aria-label="Scroll right"
                  >
                    <ChevronRight className="w-4 h-4 text-charcoal" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Accessories Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-col"
            >
              <h3 className="text-xl sm:text-2xl font-serif text-black mb-4 sm:mb-6 text-center md:text-left">
                Accessories
              </h3>
              <div className="relative">
                <div
                  ref={accessoriesScrollRef}
                  className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
                >
                  {boutiqueProducts.accessories.map((product) => {
                    const listed = getProduct(product.id);
                    return (
                    <Link
                      key={product.id}
                      href="/boutique"
                      className="group flex-shrink-0 w-48 sm:w-56"
                    >
                      <div className="bg-white border border-beige/50 hover:shadow-xl transition-all duration-500">
                        <div className="relative h-48 sm:h-56 bg-cream/30 overflow-hidden">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-3 sm:p-4 text-center">
                          <h4 className="text-base sm:text-lg md:text-xl font-serif font-bold text-black mb-2 line-clamp-1">
                            {product.name}
                          </h4>
                          <span className="text-sm sm:text-base uppercase tracking-wider !text-gold">
                            {!listed
                              ? 'Shop boutique'
                              : productIsForSale(listed)
                                ? formatPrice(listed.priceCents!)
                                : 'Coming soon'}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );})}
                </div>
                <div className="flex justify-center md:justify-start gap-2 mt-4">
                  <button
                    onClick={() => {
                      if (accessoriesScrollRef.current) {
                        accessoriesScrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
                      }
                    }}
                    className="p-2 bg-cream hover:bg-beige border border-beige rounded-full transition-colors"
                    aria-label="Scroll left"
                  >
                    <ChevronLeft className="w-4 h-4 text-charcoal" />
                  </button>
                  <button
                    onClick={() => {
                      if (accessoriesScrollRef.current) {
                        accessoriesScrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
                      }
                    }}
                    className="p-2 bg-cream hover:bg-beige border border-beige rounded-full transition-colors"
                    aria-label="Scroll right"
                  >
                    <ChevronRight className="w-4 h-4 text-charcoal" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Interior Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col"
            >
              <h3 className="text-xl sm:text-2xl font-serif text-black mb-4 sm:mb-6 text-center md:text-left">
                Home
              </h3>
              <div className="relative">
                <div
                  ref={interiorScrollRef}
                  className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
                >
                  {boutiqueProducts.home.map((product) => {
                    const listed = getProduct(product.id);
                    return (
                    <Link
                      key={product.id}
                      href="/boutique"
                      className="group flex-shrink-0 w-48 sm:w-56"
                    >
                      <div className="bg-white border border-beige/50 hover:shadow-xl transition-all duration-500">
                        <div className="relative h-48 sm:h-56 bg-cream/30 overflow-hidden">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-3 sm:p-4 text-center">
                          <h4 className="text-base sm:text-lg md:text-xl font-serif font-bold text-black mb-2 line-clamp-1">
                            {product.name}
                          </h4>
                          <span className="text-sm sm:text-base uppercase tracking-wider !text-gold">
                            {!listed
                              ? 'Shop boutique'
                              : productIsForSale(listed)
                                ? formatPrice(listed.priceCents!)
                                : 'Coming soon'}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );})}
                </div>
                <div className="flex justify-center md:justify-start gap-2 mt-4">
                  <button
                    onClick={() => {
                      if (interiorScrollRef.current) {
                        interiorScrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
                      }
                    }}
                    className="p-2 bg-cream hover:bg-beige border border-beige rounded-full transition-colors"
                    aria-label="Scroll left"
                  >
                    <ChevronLeft className="w-4 h-4 text-charcoal" />
                  </button>
                  <button
                    onClick={() => {
                      if (interiorScrollRef.current) {
                        interiorScrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
                      }
                    }}
                    className="p-2 bg-cream hover:bg-beige border border-beige rounded-full transition-colors"
                    aria-label="Scroll right"
                  >
                    <ChevronRight className="w-4 h-4 text-charcoal" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Books by Bea + Upcoming Event - Two Column */}
      <section className="py-12 sm:py-16 md:py-24 lg:py-32 bg-cream">
        <div className="container-luxury px-4 sm:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20">
            {/* Left Column: Books by Bea */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-black mb-3 sm:mb-4">
                Books by Bea
              </h2>
              <div className="w-16 sm:w-20 h-px bg-gold mb-4 sm:mb-6" />
              <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed mb-8 font-medium">
                Discover Dr. Bea Foster&apos;s inspiring stories of resilience, beauty, and finding light through the darkness
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                {/* Book 1: Designing In The Dark */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="bg-white border border-beige overflow-hidden hover:shadow-xl transition-shadow group"
                >
                  <div className="p-6 sm:p-8 flex flex-col h-full">
                    <div className="flex items-center gap-2 mb-4">
                      <BookOpen className="w-6 h-6 text-gold" />
                      <span className="text-sm uppercase tracking-wider text-gold font-medium">Kindle Edition</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-serif text-black mb-2 group-hover:text-gold transition-colors">
                      Designing In The Dark
                    </h3>
                    <p className="text-base text-charcoal mb-3">by Bea Foster</p>
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                      ))}
                      <span className="text-sm text-charcoal ml-1">5.0 (7 reviews)</span>
                    </div>
                    <p className="text-base text-charcoal leading-relaxed mb-6 flex-1 line-clamp-4">
                      A reflection and reminder of how we all can achieve through it all. If it can happen for me it can happen for you. A little Black girl from Alabama, how I found my way with determination and learned wisdom, along with my faith in God.
                    </p>
                    <a
                      href="https://www.amazon.com/Designing-Dark-Bea-Foster-ebook/dp/B08RHVC5Q1?ref_=ast_author_dp&th=1&psc=1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-black text-white text-sm font-semibold hover:bg-charcoal transition-colors uppercase tracking-wider group/btn"
                    >
                      Buy on Amazon
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </motion.div>

                {/* Book 2: Bea and Beauty */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="bg-white border border-beige overflow-hidden hover:shadow-xl transition-shadow group"
                >
                  <div className="p-6 sm:p-8 flex flex-col h-full">
                    <div className="flex items-center gap-2 mb-4">
                      <BookOpen className="w-6 h-6 text-gold" />
                      <span className="text-sm uppercase tracking-wider text-gold font-medium">Paperback</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-serif text-black mb-2 group-hover:text-gold transition-colors">
                      Bea and Beauty
                    </h3>
                    <p className="text-base text-charcoal mb-3">by Bea Foster</p>
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                      ))}
                      <span className="text-sm text-charcoal ml-1">5.0 (1 review)</span>
                    </div>
                    <p className="text-base text-charcoal leading-relaxed mb-6 flex-1 line-clamp-4">
                      A small quick read, warm and humorous with life experiences—a young Black girl growing up with her mother and grandmother in Montgomery, Alabama, ending up in Columbus, Ohio.
                    </p>
                    <a
                      href="https://www.amazon.com/Bea-Beauty-Foster/dp/1716439272?ref_=ast_author_dp&th=1&psc=1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-black text-white text-sm font-semibold hover:bg-charcoal transition-colors uppercase tracking-wider group/btn"
                    >
                      Buy on Amazon
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Column: Upcoming Event */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-col"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-black mb-3 sm:mb-4">
                Upcoming Event
              </h2>
              <div className="w-16 sm:w-20 h-px bg-gold mb-4 sm:mb-6" />
              <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed mb-8 font-medium">
                Join us for an evening of elegance and celebration
              </p>

              <Link href="/events" className="group flex-1 block">
                <div className="bg-white border border-beige overflow-hidden hover:shadow-xl transition-shadow h-full flex flex-col">
                  <div className="relative h-56 sm:h-64 md:h-72 lg:h-80 bg-charcoal flex-1 min-h-[200px]">
                    <Image
                      src="/Pictures 4/1 (1).JPG"
                      alt={upcomingEvent.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 sm:p-8">
                    <div className="flex items-center gap-2 text-sm text-charcoal mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>{upcomingEvent.date}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-serif text-black mb-2 group-hover:text-gold transition-colors">
                      {upcomingEvent.title}
                    </h3>
                    <p className="text-base text-charcoal mb-6">{upcomingEvent.location}</p>
                    <span className="inline-flex items-center gap-2 text-gold font-medium uppercase tracking-wider text-sm group-hover:gap-3 transition-all">
                      View Event Details
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Magazine Highlights - Flipbook Style */}
      <MagazineFlipbookSection />

      {/* Stats Section */}
      <section className="py-12 sm:py-16 md:py-24 lg:py-32 bg-beige text-black relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gold hidden md:block" />
          <div className="absolute top-0 left-2/4 w-px h-full bg-gold hidden md:block" />
          <div className="absolute top-0 left-3/4 w-px h-full bg-gold hidden md:block" />
        </div>

        <div className="container-luxury relative z-10 px-4 sm:px-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-black mb-3 sm:mb-4">
              Our Legacy in Numbers
            </h2>
            <div className="w-20 sm:w-24 h-px bg-gold mx-auto" />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-12">
            {[
              { number: '15+', label: 'Years of Excellence', icon: Award },
              { number: '500+', label: 'Happy Clients', icon: ShoppingBag },
              { number: '200+', label: 'Projects Completed', icon: Calendar },
              { number: '50+', label: 'Awards Won', icon: Award },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  className="text-center group"
                >
                  <div className="mb-4 sm:mb-6 flex justify-center">
                    <div className="p-3 sm:p-4 bg-gold/20 rounded-full group-hover:bg-gold/30 transition-colors">
                      <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-gold" />
                    </div>
                  </div>
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.2, type: 'spring', stiffness: 200 }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif text-gold mb-2 sm:mb-4 font-bold"
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-xs sm:text-sm uppercase tracking-wider text-charcoal group-hover:text-black transition-colors px-2">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
