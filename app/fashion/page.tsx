'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Scissors, Sparkles, Heart, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function Fashion() {
  const lookbookImages = [
    { id: 1, src: '/fashion/f1.jpg', alt: 'Fashion Look 1', size: 'tall' },
    { id: 2, src: '/fashion/f2.jpg', alt: 'Fashion Look 2', size: 'wide' },
    { id: 3, src: '/fashion/f3.jpg', alt: 'Fashion Look 3', size: 'tall' },
    { id: 4, src: '/fashion/f4.jpeg', alt: 'Fashion Look 4', size: 'tall' },
    { id: 5, src: '/fashion/f5.jpg', alt: 'Fashion Look 5', size: 'tall' },
    { id: 6, src: '/fashion/f6.jpg', alt: 'Fashion Look 6', size: 'wide' },
    { id: 7, src: '/fashion/f7.webp', alt: 'Fashion Look 7', size: 'tall' },
    { id: 8, src: '/fashion/f8.jpg', alt: 'Fashion Look 8', size: 'tall' },
    { id: 9, src: '/fashion/f9.webp', alt: 'Fashion Look 9', size: 'wide' },
  ];

  const services = [
    {
      icon: Scissors,
      title: 'Couture',
      description: 'Bespoke couture creations tailored to perfection. Each piece is meticulously crafted to embody your unique style and elegance.',
    },
    {
      icon: Sparkles,
      title: 'Styling',
      description: 'Expert styling services to curate your perfect wardrobe. From everyday elegance to special occasions, we bring your vision to life.',
    },
    {
      icon: Heart,
      title: 'Bridal',
      description: 'Your dream wedding dress awaits. Our bridal collection features exquisite designs that make your special day unforgettable.',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh] flex items-center justify-center bg-cream overflow-hidden py-12 sm:py-16 md:py-0">
        <div className="container-luxury text-center z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-7xl font-serif text-black mb-6"
          >
            Fashion
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xl md:text-2xl text-charcoal mb-8 max-w-3xl mx-auto"
          >
            Where elegance meets innovation. Discover our curated collections of couture, ready-to-wear, and bespoke fashion.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <Link
              href="/boutique"
              className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-medium hover:bg-charcoal transition-colors uppercase tracking-wider"
            >
              Shop Collection
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-white">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16 lg:mb-20"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-black mb-4">
              Our Services
            </h2>
            <div className="w-24 h-px bg-gold mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  className="bg-cream p-8 md:p-10 rounded-lg border border-beige hover:shadow-xl transition-all duration-300 group text-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="mb-6 flex justify-center"
                  >
                    <div className="p-4 bg-gold/10 rounded-full group-hover:bg-gold/20 transition-colors">
                      <Icon className="w-10 h-10 md:w-12 md:h-12 text-gold" />
                    </div>
                  </motion.div>
                  <h3 className="text-2xl md:text-3xl font-serif text-black mb-4">
                    {service.title}
                  </h3>
                  <p className="text-charcoal leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lookbook Section - Masonry Grid */}
      <section className="py-16 md:py-24 lg:py-32 bg-beige">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16 lg:mb-20"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-black mb-4">
              Lookbook
            </h2>
            <div className="w-24 h-px bg-gold mx-auto" />
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 max-w-6xl mx-auto">
            {lookbookImages.map((image, index) => {
              const getAspectRatio = () => {
                switch (image.size) {
                  case 'tall':
                    return 'aspect-[3/4]';
                  case 'wide':
                    return 'aspect-[4/3] sm:col-span-2';
                  case 'square':
                    return 'aspect-square';
                  default:
                    return 'aspect-[4/5]';
                }
              };

              return (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.5 }}
                  className={`group cursor-pointer ${image.size === 'wide' ? 'sm:col-span-2' : ''}`}
                >
                  <div className="relative w-full overflow-hidden rounded-lg">
                    <div className={`relative ${getAspectRatio()}`}>
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover transition-all duration-500"
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed Services Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-white">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16 lg:mb-20"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-black mb-4">
              What We Offer
            </h2>
            <div className="w-24 h-px bg-gold mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-3xl md:text-4xl font-serif text-black mb-6">Couture Services</h3>
              <ul className="space-y-4">
                {[
                  'Bespoke garment creation from concept to completion',
                  'Personal fittings and alterations',
                  'Premium fabric selection and sourcing',
                  'Custom embroidery and embellishments',
                  'Wardrobe consultation and planning',
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-1" />
                    <span className="text-charcoal leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-3xl md:text-4xl font-serif text-black mb-6">Styling & Consultation</h3>
              <ul className="space-y-4">
                {[
                  'Personal styling sessions',
                  'Wardrobe assessment and organization',
                  'Event and occasion styling',
                  'Color and style analysis',
                  'Shopping assistance and curation',
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-1" />
                    <span className="text-charcoal leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-cream">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16 lg:mb-20"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-black mb-4">
              Our Process
            </h2>
            <div className="w-24 h-px bg-gold mx-auto mb-4" />
            <p className="text-base md:text-lg text-charcoal max-w-2xl mx-auto">
              From initial consultation to final fitting, we guide you through every step
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {[
              {
                step: '01',
                title: 'Consultation',
                description: 'We begin with understanding your style, preferences, and vision for your perfect look.',
              },
              {
                step: '02',
                title: 'Design',
                description: 'Our designers create custom sketches and select premium fabrics tailored to your needs.',
              },
              {
                step: '03',
                title: 'Creation',
                description: 'Master craftspeople bring your vision to life with meticulous attention to every detail.',
              },
              {
                step: '04',
                title: 'Fitting',
                description: 'Multiple fittings ensure the perfect fit and finish, making adjustments as needed.',
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="text-center"
              >
                <div className="text-6xl md:text-7xl font-serif text-gold/50 mb-4">
                  {item.step}
                </div>
                <h3 className="text-2xl md:text-3xl font-serif text-black mb-4">
                  {item.title}
                </h3>
                <p className="text-charcoal leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-charcoal text-white">
        <div className="container-luxury text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif mb-6">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Schedule a consultation with our team and discover how we can bring your fashion vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-black font-medium hover:bg-gold-light transition-colors uppercase tracking-wider"
              >
                Book Consultation
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/boutique"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gold text-gold font-medium hover:bg-gold/10 transition-colors uppercase tracking-wider"
              >
                Explore Boutique
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

