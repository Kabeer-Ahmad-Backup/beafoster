'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter, Linkedin, Mail, Phone, MapPin, ArrowRight, Heart } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const footerSections = {
    services: {
      title: 'Services',
      links: [
        { name: 'Fashion', href: '/fashion' },
        { name: 'Interiors', href: '/interiors' },
        { name: 'Magazine', href: '/magazine' },
        { name: 'Events', href: '/events' },
        { name: 'Masterclass', href: '/masterclass' },
      ],
    },
    company: {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Our Story', href: '/about#story' },
        { name: 'Philosophy', href: '/about#philosophy' },
        { name: 'Gallery', href: '/gallery' },
        { name: 'Blogs', href: '/blogs' },
      ],
    },
    connect: {
      title: 'Connect',
      links: [
        { name: 'Contact', href: '/contact' },
        { name: 'Newsletter', href: '/newsletter' },
        { name: 'Careers', href: '/careers' },
        { name: 'Press', href: '/press' },
      ],
    },
  };

  const socialLinks = [
    { name: 'Instagram', href: 'https://www.instagram.com/theblacktiechandeliergala/?hl=en', icon: Instagram },
    { name: 'Facebook', href: 'https://www.facebook.com/p/The-Black-Tie-Chandelier-Gala-100084365270413/', icon: Facebook },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'LinkedIn', href: '#', icon: Linkedin },
  ];

  return (
    <footer className="bg-charcoal text-white mt-0 md:mt-0 lg:mt-0 relative overflow-hidden">
      {/* Top Decorative Line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-1/4 w-px h-full bg-gold" />
        <div className="absolute top-20 left-2/4 w-px h-full bg-gold" />
        <div className="absolute top-20 left-3/4 w-px h-full bg-gold" />
      </div>

      <div className="container-luxury relative z-10">
        {/* Main Footer Content */}
        <div className="pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-8 sm:pb-12 md:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20">
            {/* Brand Section - Takes 4 columns */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-4"
            >
              <Link href="/" className="inline-block mb-4 sm:mb-6">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white mb-3 sm:mb-4">
                  <span className="block">The Black Tie</span>
                  <span className="block">Chandelier Gala</span>
                </h2>
                <div className="w-12 sm:w-16 h-px bg-gold" />
              </Link>
              
              <p className="text-sm sm:text-base text-gray-300 mb-6 sm:mb-8 leading-relaxed max-w-md">
                Crafting luxury experiences through couture, interior design, and editorial excellence. 
                Elevating elegance for over 15 years.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                <a 
                  href="mailto:info@theblacktiechandeliergala.com" 
                  className="flex items-center gap-2 sm:gap-3 text-gray-300 hover:text-gold transition-colors group"
                >
                  <div className="p-2 sm:p-2.5 bg-white/5 rounded-lg group-hover:bg-gold/20 transition-all duration-300 flex-shrink-0">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-sm sm:text-base break-all">info@theblacktiechandeliergala.com</span>
                </a>
                <a 
                  href="tel:+16142045024" 
                  className="flex items-center gap-2 sm:gap-3 text-gray-300 hover:text-gold transition-colors group"
                >
                  <div className="p-2 sm:p-2.5 bg-white/5 rounded-lg group-hover:bg-gold/20 transition-all duration-300 flex-shrink-0">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-sm sm:text-base">+1 (614) 204-5024</span>
                </a>
                <div className="flex items-start gap-2 sm:gap-3 text-gray-300">
                  <div className="p-2 sm:p-2.5 bg-white/5 rounded-lg flex-shrink-0">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-sm sm:text-base">PO Box 24026, Columbus, OH 43224–2531</span>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <p className="text-xs sm:text-sm uppercase tracking-wider text-gray-400 mb-3 sm:mb-4">
                  Follow Us
                </p>
                <div className="flex items-center gap-2 sm:gap-3">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.name}
                        href={social.href}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * index, type: 'spring' }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="p-2.5 sm:p-3 bg-white/5 hover:bg-gold/20 rounded-lg transition-all duration-300 group"
                        aria-label={social.name}
                      >
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300 group-hover:text-gold transition-colors" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Links Sections - Takes 8 columns, divided into 3 */}
            <div className="lg:col-span-8 space-y-8 md:grid md:grid-cols-3 md:gap-8 md:space-y-0 lg:gap-12">
              {/* Services */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h3 className="text-xs sm:text-sm font-medium uppercase tracking-wider text-white mb-3 sm:mb-4 md:mb-6">
                  {footerSections.services.title}
                </h3>
                <ul className="flex flex-wrap gap-x-4 gap-y-2 sm:gap-x-6 sm:gap-y-3 md:flex-col md:space-y-3 md:space-x-0 md:gap-0">
                  {footerSections.services.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm sm:text-base text-gray-300 hover:text-gold transition-all duration-300 inline-flex items-center gap-2 group whitespace-nowrap"
                      >
                        <span className="w-0 h-px bg-gold group-hover:w-3 sm:group-hover:w-4 transition-all duration-300" />
                        <span>{link.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Company */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-xs sm:text-sm font-medium uppercase tracking-wider text-white mb-3 sm:mb-4 md:mb-6">
                  {footerSections.company.title}
                </h3>
                <ul className="flex flex-wrap gap-x-4 gap-y-2 sm:gap-x-6 sm:gap-y-3 md:flex-col md:space-y-3 md:space-x-0 md:gap-0">
                  {footerSections.company.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm sm:text-base text-gray-300 hover:text-gold transition-all duration-300 inline-flex items-center gap-2 group whitespace-nowrap"
                      >
                        <span className="w-0 h-px bg-gold group-hover:w-3 sm:group-hover:w-4 transition-all duration-300" />
                        <span>{link.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Connect */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h3 className="text-xs sm:text-sm font-medium uppercase tracking-wider text-white mb-3 sm:mb-4 md:mb-6">
                  {footerSections.connect.title}
                </h3>
                <ul className="flex flex-wrap gap-x-4 gap-y-2 sm:gap-x-6 sm:gap-y-3 mb-4 sm:mb-6 md:mb-8 md:flex-col md:space-y-3 md:space-x-0 md:gap-0">
                  {footerSections.connect.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm sm:text-base text-gray-300 hover:text-gold transition-all duration-300 inline-flex items-center gap-2 group whitespace-nowrap"
                      >
                        <span className="w-0 h-px bg-gold group-hover:w-3 sm:group-hover:w-4 transition-all duration-300" />
                        <span>{link.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Newsletter Signup */}
                <div className="mt-6 sm:mt-8">
                  <p className="text-xs sm:text-sm uppercase tracking-wider text-gray-400 mb-3 sm:mb-4">
                    Newsletter
                  </p>
                  <form className="flex flex-col gap-2 sm:gap-3">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm sm:text-base placeholder-gray-500 focus:outline-none focus:border-gold/50 focus:bg-white/10 transition-all"
                    />
                    <button
                      type="submit"
                      className="flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-gold/20 hover:bg-gold/30 border border-gold/30 text-white text-sm sm:text-base rounded-lg transition-all duration-300 group"
                    >
                      Subscribe
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-6 sm:pt-8 md:pt-10 pb-6 sm:pb-8 md:pb-10 border-t border-white/10"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
            <div className="text-center sm:text-left">
              <p className="text-xs sm:text-sm text-gray-400">
                © {new Date().getFullYear()} The Black Tie Chandelier Gala. All rights reserved. Made by{' '}
                <a
                  href="https://loftyrankers.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-gold transition-colors"
                >
                  Lofty Rankers
                </a>{' '}
                with{' '}
                <Heart
                  className="inline-block h-3.5 w-3.5 shrink-0 align-[-0.125em] fill-gold/90 text-gold"
                  aria-hidden
                />
                <span className="sr-only"> love</span>
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 text-xs sm:text-sm text-gray-400">
              <Link 
                href="/privacy-policy" 
                className="hover:text-gold transition-colors relative group"
              >
                Privacy Policy
                <span className="absolute bottom-0 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
              </Link>
              <span className="text-gray-600 hidden sm:inline">•</span>
              <Link 
                href="/terms-of-service" 
                className="hover:text-gold transition-colors relative group"
              >
                Terms of Service
                <span className="absolute bottom-0 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
              </Link>
              <span className="text-gray-600 hidden sm:inline">•</span>
              <Link 
                href="/cookie-policy" 
                className="hover:text-gold transition-colors relative group"
              >
                Cookie Policy
                <span className="absolute bottom-0 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
              </Link>
              <span className="text-gray-600 hidden sm:inline">•</span>
              <Link
                href="/admin"
                className="hover:text-gold transition-colors relative group text-gray-500"
              >
                Orders admin
                <span className="absolute bottom-0 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
