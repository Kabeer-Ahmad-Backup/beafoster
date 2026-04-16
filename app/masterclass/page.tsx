'use client';

import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Sparkles, Award, Users } from 'lucide-react';
import Link from 'next/link';

export default function Masterclass() {
  const benefits = [
    {
      icon: Award,
      title: 'Expert Instruction',
      description: 'Learn directly from industry leaders with decades of experience',
    },
    {
      icon: Users,
      title: 'Small Class Sizes',
      description: 'Intimate settings ensure personalized attention and feedback',
    },
    {
      icon: BookOpen,
      title: 'Comprehensive Materials',
      description: 'Take home detailed guides, resources, and exclusive content',
    },
    {
      icon: Sparkles,
      title: 'Networking Opportunities',
      description: 'Connect with like-minded creatives and industry professionals',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Two Column */}
      <section className="min-h-[70vh] sm:min-h-[80vh] lg:min-h-[85vh] flex items-center bg-cream relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl" />
        </div>
        <div className="container-luxury w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center py-12 sm:py-16 md:py-20">
            {/* Left: Details */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="px-4 sm:px-0 order-2 lg:order-1"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-black mb-4 sm:mb-6 leading-tight">
                Masterclass
              </h1>
              <div className="w-20 h-px bg-gold mb-6 sm:mb-8" />
              <p className="text-base sm:text-lg md:text-xl text-charcoal mb-6 leading-relaxed">
                Exclusive, hands-on learning experiences in couture design, interior design, personal styling, and luxury brand development—led by industry leaders.
              </p>
              <p className="text-sm sm:text-base text-charcoal/80 mb-8">
                We&apos;re putting the finishing touches on our masterclass programs. Be the first to know when enrollment opens.
              </p>
              <ul className="space-y-3 mb-8 sm:mb-10">
                {benefits.map((benefit, i) => {
                  const Icon = benefit.icon;
                  return (
                    <li key={benefit.title} className="flex items-start gap-3">
                      <Icon className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-charcoal">{benefit.title}</span>
                    </li>
                  );
                })}
              </ul>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-black text-white hover:bg-charcoal transition-colors text-sm uppercase tracking-wider font-medium"
                >
                  Inquire Now
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/events"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-black text-black hover:bg-black hover:text-white transition-colors text-sm uppercase tracking-wider"
                >
                  View Events
                </Link>
              </div>
            </motion.div>

            {/* Right: Prominent Coming Soon Animation */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center justify-center px-4 order-1 lg:order-2"
            >
              <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
                {/* Outer glow - pulsing */}
                <motion.div
                  animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute inset-0 rounded-full bg-[#c4a028]/30"
                />
                {/* Outer ring - thick gold */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-full border-[3px] border-[#c4a028]"
                />
                {/* Middle ring - reverse, dashed */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-10 sm:inset-14 rounded-full border-2 border-dashed border-[#c4a028]/80"
                />
                {/* Inner card - dark background for contrast */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="absolute inset-14 sm:inset-20 md:inset-24 rounded-full bg-charcoal flex items-center justify-center border-2 border-[#c4a028] shadow-2xl"
                >
                  <div className="text-center px-6">
                    <motion.p
                      animate={{ opacity: [0.9, 1, 0.9], scale: [0.98, 1, 0.98] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      className="text-lg sm:text-xl uppercase tracking-[0.35em] text-[#c4a028] font-semibold block mb-2"
                    >
                      Coming
                    </motion.p>
                    <motion.p
                      animate={{ opacity: [0.9, 1, 0.9], scale: [0.98, 1, 0.98] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.25 }}
                      className="text-4xl sm:text-5xl md:text-6xl font-serif text-white font-bold block"
                    >
                      Soon
                    </motion.p>
                    {/* Animated underline */}
                    <motion.div
                      animate={{ scaleX: [0.5, 1, 0.5] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                      className="h-0.5 bg-[#c4a028] mx-auto mt-4 origin-center"
                      style={{ width: '80%' }}
                    />
                  </div>
                </motion.div>
                {/* Corner accents */}
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className="absolute top-2 right-2 w-3 h-3 rounded-full bg-[#c4a028]"
                />
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                  className="absolute bottom-2 left-2 w-3 h-3 rounded-full bg-[#c4a028]"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Benefits Section */}
      <section className="py-12 sm:py-16 md:py-24 lg:py-32 bg-cream">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-black mb-3 sm:mb-4">
              Why Choose Our Masterclasses
            </h2>
            <div className="w-20 sm:w-24 h-px bg-gold mx-auto mb-3 sm:mb-4" />
            <p className="text-sm sm:text-base md:text-lg text-charcoal max-w-2xl mx-auto px-4">
              Experience the difference of learning from industry leaders
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-white p-5 sm:p-6 md:p-8 border border-beige hover:border-gold transition-colors group text-center"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-cream rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-gold transition-colors">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-charcoal group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-serif text-black mb-2 sm:mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-charcoal leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Inquire Now - CTA Section */}
      <section className="py-12 sm:py-16 md:py-24 lg:py-32 bg-charcoal">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto px-4"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-4 sm:mb-6">
              Be the First to Know
            </h2>
            <div className="w-20 sm:w-24 h-px bg-gold mx-auto mb-4 sm:mb-6" />
            <p className="text-sm sm:text-base md:text-lg text-white/80 mb-6 sm:mb-8 leading-relaxed">
              Our masterclasses are launching soon. Inquire now to be notified when enrollment opens and secure early access to our exclusive learning experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gold text-black hover:bg-gold/90 transition-colors text-xs sm:text-sm uppercase tracking-wider font-medium"
              >
                Inquire Now
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </Link>
              <Link
                href="/events"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white hover:bg-white hover:text-black transition-colors text-xs sm:text-sm uppercase tracking-wider"
              >
                View Events
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

