/**
 * B. Sporty — catalog with server-validated prices (cents).
 * Checkout recomputes totals from this file; client prices are display-only.
 */

export type BoutiqueCategory = 'fashion' | 'accessories' | 'home';

export type BoutiqueProduct = {
  id: string;
  name: string;
  /** `null` = coming soon (not purchasable yet) */
  priceCents: number | null;
  category: BoutiqueCategory;
  image: string;
  description: string;
  /** If set, customer must pick one; use ['One size'] for single-SKU items */
  sizes: string[];
};

export function productIsForSale(p: BoutiqueProduct): boolean {
  return p.priceCents !== null && p.priceCents > 0;
}

const apparel = ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'] as const;
const apparelZip = ['M', 'L', 'XL', '2XL', '3XL', '4XL'] as const;
const sweatpants = ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'] as const;
const braCups = ['A', 'B', 'C'] as const;
const teeSizes = ['S', 'M', 'L', 'XL', '2XL', '3XL'] as const;

export const BOUTIQUE_PRODUCTS: BoutiqueProduct[] = [
  {
    id: 'BSBeanie',
    name: 'Beanie',
    priceCents: 2500,
    category: 'fashion',
    image: '/BSPORTY/BSBeanie.jpg',
    description: 'Cotton knit, one size fits all, unisex black. Exclusive B. Sporty Collection. Plus shipping.',
    sizes: ['One size'],
  },
  {
    id: 'BSHatB',
    name: 'Hat — Black',
    priceCents: 3500,
    category: 'fashion',
    image: '/BSPORTY/BSHatB/classic-dad-hat-black-front-6931c9111da74.jpg',
    description: 'Cotton blend, adjustable back, black & white, one size. Exclusive B. Sporty Collection. Plus shipping.',
    sizes: ['One size'],
  },
  {
    id: 'BSHatW',
    name: 'Hat — White',
    priceCents: 3500,
    category: 'fashion',
    image: '/BSPORTY/BSHatW/classic-dad-hat-white-front-6931c98e7f671.jpg',
    description: 'Cotton, one size fits all, white. Exclusive B. Sporty Collection. Plus shipping.',
    sizes: ['One size'],
  },
  {
    id: 'BSHOODIEB',
    name: 'Hoodie — Black',
    priceCents: 8800,
    category: 'fashion',
    image: '/BSPORTY/BSHOODIEB/unisex-heavy-blend-hoodie-black-front-6952cd1a5f854.jpg',
    description: 'Unisex pullover, long sleeves. 50% cotton / 50% polyester. Exclusive B. Sporty Collection. Plus shipping.',
    sizes: [...apparel],
  },
  {
    id: 'BSHOODIEW',
    name: 'Hoodie — White',
    priceCents: 8800,
    category: 'fashion',
    image: '/BSPORTY/BSHOODIEW/unisex-heavy-blend-hoodie-white-front-6952c9970d36a.jpg',
    description: 'Unisex pullover, long sleeves. 50% cotton / 50% polyester. Exclusive B. Sporty Collection. Plus shipping.',
    sizes: [...apparel],
  },
  {
    id: 'BSHoddieB',
    name: 'Hoodie — Black (Eco Raglan)',
    priceCents: 8800,
    category: 'fashion',
    image: '/BSPORTY/BSHoddieB/unisex-eco-raglan-hoodie-black-front-6932533ecd0c8.jpg',
    description: 'Unisex pullover, long sleeves. 50% cotton / 50% polyester. Exclusive B. Sporty Collection. Plus shipping.',
    sizes: [...apparel],
  },
  {
    id: 'BSLongSleeveB',
    name: 'Long Sleeve — Black (Crew)',
    priceCents: 7000,
    category: 'fashion',
    image: '/BSPORTY/BSLongSleeveB/unisex-garment-dyed-heavyweight-long-sleeve-shirt-black-front-6931c719aa2c6.jpg',
    description: 'Unisex crew neck. 50% cotton / 50% polyester. Exclusive B. Sporty Collection. Plus shipping.',
    sizes: [...apparel],
  },
  {
    id: 'BSLongSleeveBB',
    name: 'Long Sleeve — Black (Garment Dyed)',
    priceCents: 7000,
    category: 'fashion',
    image: '/BSPORTY/BSLongSleeveBB/unisex-garment-dyed-heavyweight-long-sleeve-shirt-black-front-6931c7ce49e79.jpg',
    description: 'Unisex crew neck. 50% cotton / 50% polyester. Exclusive B. Sporty Collection. Plus shipping.',
    sizes: [...apparel],
  },
  {
    id: 'BSLongSleeveWB',
    name: 'Long Sleeve — White',
    priceCents: 7000,
    category: 'fashion',
    image: '/BSPORTY/BSLongSleeveWB/unisex-garment-dyed-heavyweight-long-sleeve-shirt-white-front-6931c81949a35.jpg',
    description: 'Unisex crew neck. 50% cotton / 50% polyester. Exclusive B. Sporty Collection. Plus shipping.',
    sizes: [...apparel],
  },
  {
    id: 'BSTeeLightW',
    name: 'Unisex Lightweight T-Shirt — White',
    priceCents: 3750,
    category: 'fashion',
    image: '/BSPORTY/BSLongSleeveWB/unisex-garment-dyed-heavyweight-long-sleeve-shirt-white-front-6931c81949a35.jpg',
    description: 'Unisex lightweight tee, white. S–3XL. Exclusive B. Sporty Collection. Plus shipping. (Image representative.)',
    sizes: [...teeSizes],
  },
  {
    id: 'BSSportsBraW',
    name: 'Sports Bra — White',
    priceCents: 4800,
    category: 'fashion',
    image: '/BSPORTY/BSSportsBraW/all-over-print-padded-sports-bra-white-front-6931cc0c63816.jpg',
    description: 'Polyester 4-way stretch. Exclusive B. Sporty Collection. Plus shipping.',
    sizes: [...braCups],
  },
  {
    id: 'BSSportsBraZBPipping',
    name: 'Sports Bra — Zebra',
    priceCents: 4800,
    category: 'fashion',
    image: '/BSPORTY/BSSportsBraZBPipping/all-over-print-padded-sports-bra-black-front-6931cc8b798b3.jpg',
    description: 'Zebra pattern, polyester 4-way stretch. Exclusive B. Sporty Collection. Plus shipping.',
    sizes: [...braCups],
  },
  {
    id: 'BSSweatpantsB',
    name: 'Sweatpants — Black (Cuffed)',
    priceCents: 6500,
    category: 'fashion',
    image: '/BSPORTY/BSSweatpantsB/unisex-fleece-sweatpants-black-front-6931c86884b88.jpg',
    description: 'Unisex, runs small. Polyester / spandex. Exclusive B. Sporty Collection. Plus shipping.',
    sizes: [...sweatpants],
  },
  {
    id: 'BSSweatpantsW',
    name: 'Sweatpants — White (Cuffed)',
    priceCents: 6500,
    category: 'fashion',
    image: '/BSPORTY/BSSweatpantsW/unisex-fleece-sweatpants-white-front-6931c8a989c91.jpg',
    description: 'Unisex, runs small. Polyester / spandex. Exclusive B. Sporty Collection. Plus shipping.',
    sizes: [...sweatpants],
  },
  {
    id: 'BSWideSweatpantsFrontB',
    name: 'Wide Leg Sweatpants — Black',
    priceCents: 7500,
    category: 'fashion',
    image: '/BSPORTY/BSWideSweatpantsFrontB/all-over-print-unisex-wide-leg-pants-white-front-695d3da4c96ee.jpg',
    description: 'Exclusive design, spandex blend. Exclusive B. Sporty Collection. Plus shipping.',
    sizes: [...sweatpants],
  },
  {
    id: 'BSZipHoddieB',
    name: 'Zip Hoodie — Black',
    priceCents: 8500,
    category: 'fashion',
    image: '/BSPORTY/BSZipHoddieB/unisex-heavy-blend-zip-hoodie-black-front-6932509c2f92f.jpg',
    description: 'Spandex blend, zip front. Exclusive B. Sporty Collection. Plus shipping.',
    sizes: [...apparelZip],
  },
  {
    id: 'BSZipHoddieEB',
    name: 'Zip Hoodie — Black / Gold',
    priceCents: 8500,
    category: 'fashion',
    image: '/BSPORTY/BSZipHoddieEB/unisex-heavy-blend-zip-hoodie-black-front-693251567724d.jpg',
    description: 'Spandex gold accent, zip front. Exclusive B. Sporty Collection. Plus shipping.',
    sizes: [...apparelZip],
  },
  {
    id: 'BSZipHoddieW',
    name: 'Zip Hoodie — White',
    priceCents: 8500,
    category: 'fashion',
    image: '/BSPORTY/BSZipHoddieW/unisex-heavy-blend-zip-hoodie-white-front-693252cceaaed.jpg',
    description: 'Spandex blend, zip front, white. Exclusive B. Sporty Collection. Plus shipping.',
    sizes: [...apparelZip],
  },
  {
    id: 'BSDuffleAB',
    name: 'Duffle — Black with White Logo',
    priceCents: 17000,
    category: 'accessories',
    image: '/BSPORTY/BSDuffleAB/all-over-print-duffle-bag-white-front-6931db0dbfbfd.jpg',
    description: 'One size 22.5" × 55". Polyurethane front & back, white print. Zip top, detachable strap. Plus shipping.',
    sizes: ['One size'],
  },
  {
    id: 'BSDuffleATB',
    name: 'Duffle — Black & White Print with Logo',
    priceCents: 17000,
    category: 'accessories',
    image: '/BSPORTY/BSDuffleATB/all-over-print-duffle-bag-white-front-6931dbfd1baf2.jpg',
    description: 'One size 22.5" × 55". Polyurethane front & back print. Zip top, detachable strap. Plus shipping.',
    sizes: ['One size'],
  },
  {
    id: 'BSDuffleB',
    name: 'Duffle — Black',
    priceCents: 17000,
    category: 'accessories',
    image: '/BSPORTY/BSDuffleB/all-over-print-duffle-bag-white-front-6931db62de613.jpg',
    description: 'One size 22.5" × 55". Polyurethane front & back, black. Zip top, detachable strap. Plus shipping.',
    sizes: ['One size'],
  },
  {
    id: 'BSToteZ',
    name: 'Tote — Zebra',
    priceCents: 4800,
    category: 'accessories',
    image: '/BSPORTY/BSToteZ/all-over-print-large-tote-bag-w-pocket-black-front-6931cb1573644.jpg',
    description: 'Synthetic, 21" × 37". Exclusive B. Sporty Collection. Plus shipping.',
    sizes: ['One size'],
  },
  {
    id: 'BSToteB',
    name: 'Large Tote — Zebra',
    priceCents: 5341,
    category: 'accessories',
    image: '/BSPORTY/BSToteB/all-over-print-large-tote-bag-w-pocket-black-front-6931cac8c000a.jpg',
    description: 'All-over synthetic zebra, 16" × 20", black. Exclusive B. Sporty Collection. Plus shipping.',
    sizes: ['One size'],
  },

  // Coming soon — pricing not yet available
  {
    id: 'BSMenSlides',
    name: 'Men Slides',
    priceCents: null,
    category: 'fashion',
    image: '/BSPORTY/BSMenSlides/mens-slides-black-front-2-6931c9ce5eec9.jpg',
    description: 'Exclusive B. Sporty Collection.',
    sizes: ['One size'],
  },
  {
    id: 'BSSocksB',
    name: 'Socks — Black',
    priceCents: null,
    category: 'fashion',
    image: '/BSPORTY/BSSocksB/embroidered-crew-socks-black-left-6931ca46cc7aa.jpg',
    description: 'Exclusive B. Sporty Collection.',
    sizes: ['One size'],
  },
  {
    id: 'BSSocksW',
    name: 'Socks — White',
    priceCents: null,
    category: 'fashion',
    image: '/BSPORTY/BSSocksW/embroidered-crew-socks-white-left-6931ca6361ff0.jpg',
    description: 'Exclusive B. Sporty Collection.',
    sizes: ['One size'],
  },
  {
    id: 'BSSportsBraZWPipping',
    name: 'Sports Bra — White (Zebra Piping)',
    priceCents: null,
    category: 'fashion',
    image: '/BSPORTY/BSSportsBraZWPipping/all-over-print-padded-sports-bra-white-front-6931cc5668900.jpg',
    description: 'Exclusive B. Sporty Collection.',
    sizes: [...braCups],
  },
  {
    id: 'BSWideSweatpantsBackB',
    name: 'Wide Leg Sweatpants — Black (Back Print)',
    priceCents: null,
    category: 'fashion',
    image: '/BSPORTY/BSWideSweatpantsBackB/all-over-print-unisex-wide-leg-pants-white-front-695d3e75373ca.jpg',
    description: 'Exclusive B. Sporty Collection.',
    sizes: [...sweatpants],
  },
  {
    id: 'BSWideSweatpantsBackW',
    name: 'Wide Leg Sweatpants — White (Back Print)',
    priceCents: null,
    category: 'fashion',
    image: '/BSPORTY/BSWideSweatpantsBackW/all-over-print-unisex-wide-leg-pants-white-front-695d3eb6a8c94.jpg',
    description: 'Exclusive B. Sporty Collection.',
    sizes: [...sweatpants],
  },
  {
    id: 'BSWideSweatpantsFrontW',
    name: 'Wide Leg Sweatpants — White (Front Print)',
    priceCents: null,
    category: 'fashion',
    image: '/BSPORTY/BSWideSweatpantsFrontW/all-over-print-unisex-wide-leg-pants-white-front-695d3d1b7d0fe.jpg',
    description: 'Exclusive B. Sporty Collection.',
    sizes: [...sweatpants],
  },
  {
    id: 'BSWomenSlides',
    name: 'Women Slides',
    priceCents: null,
    category: 'fashion',
    image: '/BSPORTY/BSWomenSlides/womens-slides-white-front-2-6931c9fb90653.jpg',
    description: 'Exclusive B. Sporty Collection.',
    sizes: ['One size'],
  },
  {
    id: 'BSZipHoddieLeftW',
    name: 'Zip Hoodie — White (Left Chest)',
    priceCents: null,
    category: 'fashion',
    image: '/BSPORTY/BSZipHoddieLeftW/unisex-heavy-blend-zip-hoodie-white-front-693250e938979.jpg',
    description: 'Exclusive B. Sporty Collection.',
    sizes: [...apparelZip],
  },
  {
    id: 'BSDuffleAW',
    name: 'Duffle — All White',
    priceCents: null,
    category: 'accessories',
    image: '/BSPORTY/BSDuffleAW/all-over-print-duffle-bag-white-front-6931db9078cf4.jpg',
    description: 'Exclusive B. Sporty Collection.',
    sizes: ['One size'],
  },
  {
    id: 'BSDuffleW',
    name: 'Duffle — White',
    priceCents: null,
    category: 'accessories',
    image: '/BSPORTY/BSDuffleW/all-over-print-duffle-bag-white-front-6931dbc5e2e8e.jpg',
    description: 'Exclusive B. Sporty Collection.',
    sizes: ['One size'],
  },
  {
    id: 'BSFannyB',
    name: 'Fanny Pack — Black',
    priceCents: null,
    category: 'accessories',
    image: '/BSPORTY/BSFannyB/all-over-print-fanny-pack-white-front-6931e52bb839e.jpg',
    description: 'Exclusive B. Sporty Collection.',
    sizes: ['One size'],
  },
  {
    id: 'BSFannyCB',
    name: 'Fanny Pack — Pattern C',
    priceCents: null,
    category: 'accessories',
    image: '/BSPORTY/BSFannyCB/all-over-print-fanny-pack-white-front-6931e5654ee05.jpg',
    description: 'Exclusive B. Sporty Collection.',
    sizes: ['One size'],
  },
  {
    id: 'BSFannyLogoB',
    name: 'Fanny Pack — Logo Black',
    priceCents: null,
    category: 'accessories',
    image: '/BSPORTY/BSFannyLogoB/all-over-print-fanny-pack-white-front-6931e4fa05b62.jpg',
    description: 'Exclusive B. Sporty Collection.',
    sizes: ['One size'],
  },
  {
    id: 'BSFannyLogoW',
    name: 'Fanny Pack — Logo White',
    priceCents: null,
    category: 'accessories',
    image: '/BSPORTY/BSFannyLogoW/all-over-print-fanny-pack-white-front-6931e4c697211.jpg',
    description: 'Exclusive B. Sporty Collection.',
    sizes: ['One size'],
  },
  {
    id: 'BSTumblerLogoB',
    name: 'Tumbler — Logo Black',
    priceCents: null,
    category: 'accessories',
    image: '/BSPORTY/BSTumblerLogoB/stainless-steel-tumbler-black-front-6931dea66be41.jpg',
    description: 'Exclusive B. Sporty Collection.',
    sizes: ['One size'],
  },
  {
    id: 'BSTumblerLogoW',
    name: 'Tumbler — Logo White',
    priceCents: null,
    category: 'accessories',
    image: '/BSPORTY/BSTumblerLogoW/stainless-steel-tumbler-white-front-6931df342177a.jpg',
    description: 'Exclusive B. Sporty Collection.',
    sizes: ['One size'],
  },
  {
    id: 'BSWaterBottleW',
    name: 'Water Bottle — White',
    priceCents: null,
    category: 'accessories',
    image: '/BSPORTY/BSWaterBottleW/stainless-steel-water-bottle-with-a-straw-lid-white-32-oz-front-6931de2e6d9a2.jpg',
    description: 'Exclusive B. Sporty Collection.',
    sizes: ['One size'],
  },
  {
    id: 'BSWaterBottleWLogo',
    name: 'Water Bottle — White (Logo)',
    priceCents: null,
    category: 'accessories',
    image: '/BSPORTY/BSWaterBottleWLogo/stainless-steel-water-bottle-with-a-straw-lid-white-32-oz-front-6931de6326b66.jpg',
    description: 'Exclusive B. Sporty Collection.',
    sizes: ['One size'],
  },

  {
    id: 'BSBlanketBoxW',
    name: 'Throw Blanket — Box White',
    priceCents: null,
    category: 'home',
    image: '/BSPORTY/BSBlanketBoxW/throw-blanket-50x60-front-6931dd58613a8.jpg',
    description: 'Exclusive B. Sporty Collection.',
    sizes: ['One size'],
  },
  {
    id: 'BSBlanketLogoW',
    name: 'Throw Blanket — Logo White',
    priceCents: null,
    category: 'home',
    image: '/BSPORTY/BSBlanketLogoW/throw-blanket-50x60-front-6931df78d2f9b.jpg',
    description: 'Exclusive B. Sporty Collection.',
    sizes: ['One size'],
  },
  {
    id: 'BSBlanketSW',
    name: 'Throw Blanket — S White',
    priceCents: null,
    category: 'home',
    image: '/BSPORTY/BSBlanketSW/throw-blanket-50x60-front-6931ddb382e81.jpg',
    description: 'Exclusive B. Sporty Collection.',
    sizes: ['One size'],
  },
  {
    id: 'BSBlanketW',
    name: 'Throw Blanket — White',
    priceCents: null,
    category: 'home',
    image: '/BSPORTY/BSBlanketW/throw-blanket-50x60-front-6931dd152c36a.jpg',
    description: 'Exclusive B. Sporty Collection.',
    sizes: ['One size'],
  },
  {
    id: 'BSBlanketZ',
    name: 'Throw Blanket — Zebra',
    priceCents: null,
    category: 'home',
    image: '/BSPORTY/BSBlanketZ/throw-blanket-60x80-front-6931cb5d69f41.jpg',
    description: 'Exclusive B. Sporty Collection.',
    sizes: ['One size'],
  },
  {
    id: 'BSHandsoap',
    name: 'Hand & Body Lotion',
    priceCents: null,
    category: 'home',
    image: '/BSPORTY/BSHandsoap/refreshing-hand--body-lotion-white-front-6931dad309b5b.jpg',
    description: 'Exclusive B. Sporty Collection.',
    sizes: ['One size'],
  },
  {
    id: 'BSMugBS',
    name: 'Enamel Mug — B. Sporty',
    priceCents: null,
    category: 'home',
    image: '/BSPORTY/BSMugBS/enamel-mug-white-12-oz-front-6931cba939d13.jpg',
    description: 'Exclusive B. Sporty Collection.',
    sizes: ['One size'],
  },
  {
    id: 'BSMugW',
    name: 'Enamel Mug — White',
    priceCents: null,
    category: 'home',
    image: '/BSPORTY/BSMugW/enamel-mug-white-12-oz-front-6931cb866b8fa.jpg',
    description: 'Exclusive B. Sporty Collection.',
    sizes: ['One size'],
  },
  {
    id: 'BSMugWS',
    name: 'Enamel Mug — White (Alt)',
    priceCents: null,
    category: 'home',
    image: '/BSPORTY/BSMugWS/enamel-mug-white-12-oz-front-6931cbc72d87b.jpg',
    description: 'Exclusive B. Sporty Collection.',
    sizes: ['One size'],
  },
  {
    id: 'BSPillowB',
    name: 'Pillow — Black (Basic)',
    priceCents: null,
    category: 'home',
    image: '/BSPORTY/BSPillowB/all-over-print-basic-pillow-18x18-front-6931ccc50feb6.jpg',
    description: 'Exclusive B. Sporty Collection.',
    sizes: ['One size'],
  },
  {
    id: 'BSPillowBB',
    name: 'Pillow — Black (Premium)',
    priceCents: null,
    category: 'home',
    image: '/BSPORTY/BSPillowBB/all-over-print-premium-pillow-18x18-front-6931da7242f9c.jpg',
    description: 'Exclusive B. Sporty Collection.',
    sizes: ['One size'],
  },
  {
    id: 'BSPillowW',
    name: 'Pillow — White',
    priceCents: null,
    category: 'home',
    image: '/BSPORTY/BSPillowW/all-over-print-basic-pillow-18x18-front-6931dc428fc52.jpg',
    description: 'Exclusive B. Sporty Collection.',
    sizes: ['One size'],
  },
  {
    id: 'BSPoster',
    name: 'Framed Poster',
    priceCents: null,
    category: 'home',
    image: '/BSPORTY/BSPoster/matte-paper-framed-poster-with-mat-(in)-black-12x16-front-6931ddf2bc22e.jpg',
    description: 'Exclusive B. Sporty Collection.',
    sizes: ['One size'],
  },
];

const byId = new Map(BOUTIQUE_PRODUCTS.map((p) => [p.id, p]));

export function getProduct(id: string): BoutiqueProduct | undefined {
  return byId.get(id);
}

export type CartLineInput = {
  productId: string;
  quantity: number;
  size?: string;
};

export type ValidatedLineItem = {
  productId: string;
  name: string;
  unitPriceCents: number;
  quantity: number;
  size: string | null;
  image: string;
};

function normalizeSize(product: BoutiqueProduct, size?: string): string | null {
  if (product.sizes.length === 1 && product.sizes[0] === 'One size') {
    return 'One size';
  }
  return size ?? null;
}

export function validateSize(product: BoutiqueProduct, size?: string): string | null {
  if (product.sizes.length === 1 && product.sizes[0] === 'One size') {
    return null;
  }
  if (!size || !product.sizes.includes(size)) {
    return 'Select a size';
  }
  return null;
}

export function validateCartLines(
  lines: CartLineInput[]
): { ok: true; items: ValidatedLineItem[] } | { ok: false; error: string } {
  if (!lines.length) {
    return { ok: false, error: 'Your cart is empty' };
  }
  const out: ValidatedLineItem[] = [];
  for (const line of lines) {
    const p = getProduct(line.productId);
    if (!p) {
      return { ok: false, error: `Unknown product: ${line.productId}` };
    }
    if (!productIsForSale(p)) {
      return { ok: false, error: `${p.name} is not available for purchase yet` };
    }
    const q = Math.floor(Number(line.quantity));
    if (!Number.isFinite(q) || q < 1 || q > 99) {
      return { ok: false, error: 'Invalid quantity' };
    }
    const sizeErr = validateSize(p, line.size);
    if (sizeErr) {
      return { ok: false, error: `${p.name}: ${sizeErr}` };
    }
    const size = normalizeSize(p, line.size);
    out.push({
      productId: p.id,
      name: p.name,
      unitPriceCents: p.priceCents!,
      quantity: q,
      size,
      image: p.image,
    });
  }
  return { ok: true, items: out };
}

export function lineItemsTotalCents(items: ValidatedLineItem[]): number {
  return items.reduce((s, i) => s + i.unitPriceCents * i.quantity, 0);
}
