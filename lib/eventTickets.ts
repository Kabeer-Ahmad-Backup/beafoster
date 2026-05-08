import type { ValidatedLineItem } from '@/lib/boutiqueCatalog';
import { upcomingEvent } from '@/lib/eventData';

export type GalaTicketTier = 'general' | 'vip';

const TIER_CONFIG: Record<
  GalaTicketTier,
  { productId: string; displayName: string; unitPriceCents: number }
> = {
  general: {
    productId: 'GALA_GA',
    displayName: 'Gala — General Admission',
    unitPriceCents: 130_00,
  },
  vip: {
    productId: 'GALA_VIP',
    displayName: 'Gala — VIP Experience',
    unitPriceCents: 180_00,
  },
};

export function getGalaTicketTierConfig(tier: GalaTicketTier) {
  return TIER_CONFIG[tier];
}

/** Builds validated-style line items for Stripe + draft storage (same shape as boutique draft lines). */
export function buildGalaTicketDraftLines(tier: GalaTicketTier, quantity: number): ValidatedLineItem[] {
  const cfg = TIER_CONFIG[tier];
  const q = Math.min(99, Math.max(1, Math.floor(quantity)));
  return [
    {
      productId: cfg.productId,
      name: cfg.displayName,
      unitPriceCents: cfg.unitPriceCents,
      quantity: q,
      size: null,
      image: upcomingEvent.image.startsWith('http') ? upcomingEvent.image : upcomingEvent.image,
    },
  ];
}

export function galaTicketTotalCents(lines: ValidatedLineItem[]): number {
  return lines.reduce((s, l) => s + l.unitPriceCents * l.quantity, 0);
}

export function tierFromProductId(productId: string): GalaTicketTier | null {
  if (productId === 'GALA_VIP') return 'vip';
  if (productId === 'GALA_GA') return 'general';
  return null;
}
