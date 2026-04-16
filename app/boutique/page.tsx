'use client';

import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import BoutiqueProductCard from '@/components/boutique/BoutiqueProductCard';
import { BOUTIQUE_PRODUCTS } from '@/lib/boutiqueCatalog';

export default function Boutique() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'fashion', name: 'Fashion' },
    { id: 'accessories', name: 'Accessories' },
    { id: 'home', name: 'Home' },
  ];

  const filteredProducts = useMemo(() => {
    return BOUTIQUE_PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch =
        searchQuery === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[30vh] sm:min-h-[35vh] overflow-hidden bg-cream">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-cream via-white to-cream" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl opacity-50" />
        </div>
        <div className="relative h-full flex items-center justify-center py-12 sm:py-16">
          <div className="container-luxury w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto px-4 sm:px-6"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-block mb-3 sm:mb-4"
              >
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-gold font-medium">
                  Our Exclusive Statement Collection in Black and White
                </span>
              </motion.div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-black mb-4 leading-tight">
                B. Sporty
              </h1>
              <div className="w-16 h-px bg-gold/50 mx-auto mb-4" />
              <p className="text-sm sm:text-base text-charcoal/80 leading-relaxed max-w-2xl mx-auto font-light">
                Elevate your style with our exclusive sportswear and lifestyle accessory collection. Everything here is
                designed with you in mind—the person who wants to show up and stand out.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-4 sm:py-6 md:py-8 lg:py-12 bg-white border-b border-beige">
        <div className="container-luxury">
          <div className="mb-4 sm:mb-6 px-4">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-charcoal" />
              <input
                type="text"
                placeholder="Search collection..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-2.5 sm:py-3 md:py-3.5 bg-cream border border-beige focus:border-gold focus:outline-none transition-colors text-sm sm:text-base text-black placeholder-charcoal/50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-charcoal hover:text-black transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center justify-center gap-1.5 sm:gap-2 md:gap-4 flex-wrap px-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-black text-white shadow-md'
                    : 'bg-white text-charcoal border border-beige hover:border-gold hover:text-black'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
        <div className="container-luxury px-4 sm:px-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 sm:mb-12"
          >
            <div className="flex items-center justify-between mb-2 sm:mb-4 px-2">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-black">
                {selectedCategory === 'all'
                  ? 'All Items'
                  : `${categories.find((c) => c.id === selectedCategory)?.name}`}
              </h2>
              <p className="text-sm sm:text-base text-charcoal bg-cream px-3 py-1 rounded-full">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
              </p>
            </div>
            <div className="w-full h-px bg-beige" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product, index) => (
              <BoutiqueProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
