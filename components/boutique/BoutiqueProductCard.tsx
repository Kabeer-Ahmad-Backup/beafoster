'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { productIsForSale, type BoutiqueProduct } from '@/lib/boutiqueCatalog';
import { useCartStore } from '@/store/cartStore';

function formatMoney(cents: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100);
}

export default function BoutiqueProductCard({
  product,
  index,
}: {
  product: BoutiqueProduct;
  index: number;
}) {
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const needsSize =
    product.sizes.length > 1 || product.sizes[0] !== 'One size';
  const [size, setSize] = useState(
    needsSize ? product.sizes[0] : 'One size'
  );
  const [adding, setAdding] = useState(false);

  const forSale = productIsForSale(product);

  const onAdd = () => {
    if (!forSale) return;
    if (needsSize && !size) return;
    setAdding(true);
    addItem({
      productId: product.id,
      name: product.name,
      priceCents: product.priceCents!,
      image: product.image,
      category: product.category,
      size: needsSize ? size : 'One size',
    });
    openCart();
    setTimeout(() => setAdding(false), 400);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.45 }}
      className="group"
    >
      <div className="bg-white hover:shadow-2xl transition-all duration-500 h-full flex flex-col overflow-hidden border border-transparent hover:border-beige/50 rounded-sm">
        <div className="relative aspect-square overflow-hidden bg-cream/30">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-4 transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-2 left-2 flex flex-col gap-1 items-start">
            <span className="bg-white/90 backdrop-blur text-[10px] uppercase tracking-wider px-2 py-1 text-black border border-beige">
              Exclusive
            </span>
            {!forSale && (
              <span className="bg-charcoal/90 backdrop-blur text-[10px] uppercase tracking-wider px-2 py-1 text-white border border-charcoal/30">
                Coming soon
              </span>
            )}
          </div>
        </div>
        <div className="p-5 flex flex-col flex-grow text-center">
          <div className="mb-2">
            <span className="text-xs uppercase tracking-widest text-gold font-semibold">
              {product.category}
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-serif font-bold text-black mb-2 leading-tight">
            {product.name}
          </h3>
          <p className="text-lg font-serif text-black mb-3">
            {forSale ? formatMoney(product.priceCents!) : (
              <span className="text-charcoal/80 font-sans text-base font-normal tracking-wide">
                Coming soon
              </span>
            )}
          </p>
          <p className="text-sm text-charcoal/90 mb-4 flex-grow line-clamp-4 text-left leading-relaxed">
            {product.description}
          </p>
          {forSale && needsSize && (
            <label className="block text-left mb-3">
              <span className="text-xs uppercase tracking-wider text-charcoal mb-1 block">
                Size
              </span>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full px-3 py-2 bg-cream border border-beige text-sm text-black focus:border-gold focus:outline-none"
              >
                {product.sizes.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
          )}
          <div className="pt-2 border-t border-beige/30 w-full mt-auto">
            <button
              type="button"
              onClick={onAdd}
              disabled={!forSale || adding}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-black text-white hover:bg-charcoal transition-colors text-sm uppercase tracking-widest font-semibold disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-black"
            >
              {!forSale ? 'Coming soon' : adding ? 'Added' : 'Add to cart'}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
