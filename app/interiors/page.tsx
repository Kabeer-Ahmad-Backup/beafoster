'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Search, Palette, Hammer, Sparkles, ArrowRight, CheckCircle, Home, Building2, Hotel } from 'lucide-react';
import Link from 'next/link';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';

export default function Interiors() {
  const processSteps = [
    {
      icon: Search,
      title: 'Consultation',
      description: 'We begin with an in-depth consultation to understand your vision, lifestyle, and aesthetic preferences.',
    },
    {
      icon: Palette,
      title: 'Design',
      description: 'Our team creates a comprehensive design plan, curating every element to reflect your unique style.',
    },
    {
      icon: Hammer,
      title: 'Execution',
      description: 'With meticulous attention to detail, we bring the design to life, ensuring perfection at every step.',
    },
    {
      icon: Sparkles,
      title: 'Reveal',
      description: 'Experience the transformation as we reveal your beautifully redesigned space, ready for you to enjoy.',
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
            Interiors
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xl md:text-2xl text-charcoal mb-4 max-w-3xl mx-auto"
          >
            Transforming spaces into sanctuaries of luxury and elegance.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg text-charcoal max-w-2xl mx-auto"
          >
            Every space tells a story. We craft interiors that reflect your personality while elevating your everyday experience.
          </motion.p>
        </div>
      </section>

      {/* Before/After Slider Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-white">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16 lg:mb-20"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-black mb-4">
              Our Transformations
            </h2>
            <div className="w-24 h-px bg-gold mx-auto mb-4" />
            <p className="text-base md:text-lg text-charcoal max-w-2xl mx-auto">
              Drag the slider to see the remarkable transformations we've created
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <BeforeAfterSlider
              beforeImage="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80"
              afterImage="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80"
              beforeLabel="Before"
              afterLabel="After"
            />
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-beige">
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
              A seamless journey from concept to completion
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  className="bg-white p-6 md:p-8 rounded-lg border border-beige hover:shadow-xl transition-all duration-300 group relative"
                >
                  {/* Step Number */}
                  <div className="absolute top-4 right-4 text-6xl font-serif text-gold/50">
                    {index + 1}
                  </div>
                  
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="mb-6 flex justify-center"
                  >
                    <div className="p-4 bg-gold/10 rounded-full group-hover:bg-gold/20 transition-colors">
                      <Icon className="w-8 h-8 md:w-10 md:h-10 text-gold" />
                    </div>
                  </motion.div>
                  
                  <h3 className="text-xl md:text-2xl font-serif text-black mb-3 text-center">
                    {step.title}
                  </h3>
                  <p className="text-sm md:text-base text-charcoal leading-relaxed text-center">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Breakdown Section */}
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
            <div className="w-24 h-px bg-gold mx-auto mb-4" />
            <p className="text-base md:text-lg text-charcoal max-w-2xl mx-auto">
              Comprehensive interior design solutions for every space
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                icon: Home,
                title: 'Residential',
                description: 'Transform your home into a sanctuary of luxury and comfort. From single rooms to complete home renovations.',
                features: ['Space planning', 'Color consultation', 'Furniture selection', 'Lighting design'],
              },
              {
                icon: Building2,
                title: 'Commercial',
                description: 'Create inspiring workspaces that reflect your brand identity and enhance productivity.',
                features: ['Office design', 'Retail spaces', 'Restaurant interiors', 'Brand integration'],
              },
              {
                icon: Hotel,
                title: 'Hospitality',
                description: 'Design exceptional hospitality spaces that create memorable experiences for guests.',
                features: ['Hotel design', 'Boutique spaces', 'Lounge areas', 'Guest experiences'],
              },
            ].map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  className="bg-cream p-8 rounded-lg border border-beige hover:shadow-xl transition-all duration-300"
                >
                  <div className="mb-6 flex justify-center">
                    <div className="p-4 bg-gold/10 rounded-full">
                      <Icon className="w-10 h-10 text-gold" />
                    </div>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-serif text-black mb-4 text-center">
                    {service.title}
                  </h3>
                  <p className="text-charcoal mb-6 leading-relaxed text-center">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-charcoal">
                        <CheckCircle className="w-4 h-4 text-gold flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Portfolio Showcase */}
      <section className="py-16 md:py-24 lg:py-32 bg-cream">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16 lg:mb-20"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-black mb-4">
              Featured Projects
            </h2>
            <div className="w-24 h-px bg-gold mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: 'Luxury Penthouse',
                location: 'New York',
                image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80',
              },
              {
                title: 'Modern Office Space',
                location: 'London',
                image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80',
              },
              {
                title: 'Boutique Hotel',
                location: 'Paris',
                image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80',
              },
            ].map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="group cursor-pointer"
              >
                <div className="relative h-64 md:h-80 overflow-hidden rounded-lg mb-4">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform">
                    <h3 className="text-2xl font-serif mb-1">{project.title}</h3>
                    <p className="text-sm opacity-90">{project.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-white">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16 lg:mb-20"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-black mb-4">
              Client Testimonials
            </h2>
            <div className="w-24 h-px bg-gold mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
            {[
              {
                quote: 'The Black Tie Chandelier Gala transformed our home into a masterpiece. Every detail was perfect, and the attention to quality is unmatched.',
                author: 'Sarah Mitchell',
                role: 'Residential Client',
              },
              {
                quote: 'Working with The Black Tie Chandelier Gala was an absolute pleasure. They understood our vision and brought it to life beyond our expectations.',
                author: 'James Anderson',
                role: 'Commercial Client',
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="bg-cream p-8 md:p-10 rounded-lg border border-beige"
              >
                <div className="text-4xl text-gold mb-4">"</div>
                <p className="text-lg text-charcoal leading-relaxed mb-6">
                  {testimonial.quote}
                </p>
                <div>
                  <p className="font-serif text-black font-medium">{testimonial.author}</p>
                  <p className="text-sm text-charcoal">{testimonial.role}</p>
                </div>
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
              Let's Transform Your Space
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Schedule a consultation and discover how we can create a space that reflects your unique style and elevates your lifestyle.
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
                href="/gallery"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gold text-gold font-medium hover:bg-gold/10 transition-colors uppercase tracking-wider"
              >
                View Gallery
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

