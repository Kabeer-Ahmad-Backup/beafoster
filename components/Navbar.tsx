'use client';

import { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  /** Avoid hydration mismatch: persisted cart is empty on server, may load on client. */
  const [cartHydrated, setCartHydrated] = useState(false);
  const { openCart, getItemCount } = useCartStore();

  useEffect(() => {
    setCartHydrated(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const itemCount = getItemCount();
  const showCartBadge = cartHydrated && itemCount > 0;
  const badgeLabel = itemCount > 9 ? '9+' : String(itemCount);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    {
      name: 'Services',
      href: '#',
      dropdown: [
        { name: 'All Services', href: '/services' },
        { name: 'Fashion', href: '/fashion' },
        { name: 'Interiors', href: '/interiors' },
      ],
    },
    { name: 'Magazine', href: '/magazine' },
    { name: 'Events', href: '/events' },
    { name: 'Masterclass', href: '/masterclass' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <Fragment>
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-white/80 backdrop-blur-sm'
        }`}
    >
      <div className="container-luxury">
        <div className="flex lg:flex-row items-center justify-between h-16 sm:h-20">
          {/* Mobile Layout: Grid with 3 columns */}
          <div className="lg:hidden grid grid-cols-3 w-full items-center">
            {/* Mobile Hamburger - Left */}
            <button
              className="p-2 hover:bg-cream rounded-lg transition-colors justify-self-start"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-black" />
              ) : (
                <Menu className="w-6 h-6 text-black" />
              )}
            </button>

            {/* Mobile Logo - Center */}
            <Link href="/" className="flex items-center justify-self-center shrink-0">
              <motion.div
                className="relative h-14 w-14 sm:h-16 sm:w-16"
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src="/Logo_1.jpeg"
                  alt="The Black Tie Chandelier Gala"
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
            </Link>

            {/* Mobile Cart - Right */}
            <button
              onClick={openCart}
              className="relative p-2 hover:bg-cream rounded-lg transition-colors group justify-self-end"
              aria-label="Shopping cart"
            >
              <ShoppingBag className="w-5 h-5 text-charcoal group-hover:text-black transition-colors" />
              {showCartBadge && (
                <span className="absolute -top-1 -right-1 min-w-5 h-5 px-0.5 bg-gold text-black text-xs font-bold rounded-full flex items-center justify-center shadow-lg tabular-nums">
                  {badgeLabel}
                </span>
              )}
            </button>
          </div>

          {/* Desktop Layout */}
          {/* Desktop Logo - Left */}
          <Link href="/" className="hidden lg:flex items-center shrink-0">
            <motion.div
              className="relative h-16 w-16 lg:h-[4.5rem] lg:w-[4.5rem]"
              whileHover={{ scale: 1.05 }}
            >
              <Image
                src="/Logo_1.jpeg"
                alt="The Black Tie Chandelier Gala"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div key={link.name} className="relative flex items-center">
                {link.dropdown ? (
                  <div
                    className="relative flex items-center gap-1.5 cursor-pointer"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <Link
                      href={link.href}
                      className="text-sm font-bold text-charcoal hover:text-black transition-colors uppercase tracking-wider"
                    >
                      {link.name}
                    </Link>
                    <ChevronDown className="w-4 h-4 text-charcoal flex-shrink-0" />
                    <AnimatePresence>
                      {servicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full left-0 mt-0.5 w-48 bg-white shadow-lg border border-beige z-[60]"
                          onMouseEnter={() => setServicesOpen(true)}
                          onMouseLeave={() => setServicesOpen(false)}
                        >
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="block px-6 py-3 text-sm text-charcoal hover:bg-cream hover:text-black transition-colors"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className="text-sm font-bold text-charcoal hover:text-black transition-colors uppercase tracking-wider"
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
            <Link
              href="/boutique"
              className="ml-4 px-6 py-2 bg-black text-white text-sm font-bold hover:bg-charcoal transition-colors uppercase tracking-wider"
            >
              Shop Boutique
            </Link>
            <button
              onClick={openCart}
              className="relative p-2 hover:bg-cream rounded-lg transition-colors group ml-4"
              aria-label="Shopping cart"
            >
              <ShoppingBag className="w-5 h-5 text-charcoal group-hover:text-black transition-colors" />
              {showCartBadge && (
                <span className="absolute -top-1 -right-1 min-w-5 h-5 px-0.5 bg-gold text-black text-xs font-bold rounded-full flex items-center justify-center shadow-lg tabular-nums">
                  {badgeLabel}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/50 z-40 top-16 sm:top-20"
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white border-t border-beige shadow-lg relative z-50"
            >
              <div className="container-luxury py-4 sm:py-6 max-h-[calc(100vh-4rem)] sm:max-h-[calc(100vh-5rem)] overflow-y-auto">
                <div className="space-y-1 sm:space-y-2">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {link.dropdown ? (
                        <div>
                          <div className="text-xs sm:text-sm font-bold text-charcoal uppercase tracking-wider mb-2 px-2 sm:px-0">
                            {link.name}
                          </div>
                          <div className="pl-3 sm:pl-4 space-y-1.5 sm:space-y-2">
                            {link.dropdown.map((item) => (
                              <Link
                                key={item.name}
                                href={item.href}
                                className="block text-sm sm:text-base text-charcoal hover:text-black hover:bg-cream px-2 sm:px-3 py-2 rounded transition-colors"
                                onClick={() => setIsOpen(false)}
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <Link
                          href={link.href}
                          className="block text-sm sm:text-base font-bold text-charcoal hover:text-black hover:bg-cream px-2 sm:px-0 py-2.5 sm:py-3 rounded transition-colors uppercase tracking-wider"
                          onClick={() => setIsOpen(false)}
                        >
                          {link.name}
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Mobile CTA Buttons */}
                <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-beige space-y-3">
                  <Link
                    href="/boutique"
                    className="block w-full px-6 py-3 bg-black text-white text-sm font-bold text-center hover:bg-charcoal transition-colors uppercase tracking-wider rounded"
                    onClick={() => setIsOpen(false)}
                  >
                    Shop Boutique
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
    {/* Reserves space for fixed bar so page content starts below the navbar */}
    <div className="h-16 shrink-0 sm:h-20" aria-hidden />
    </Fragment>
  );
}

