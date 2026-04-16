/** Matches `ValidatedLineItem` stored in `checkout_drafts.line_items` (see checkout API + webhook). */
export type CheckoutDraftLineItem = {
  productId: string;
  name: string;
  unitPriceCents: number;
  quantity: number;
  size: string | null;
  image: string;
};

export type AdminCheckoutDraft = {
  id: string;
  created_at: string;
  line_items: CheckoutDraftLineItem[];
};

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null;
}

export function parseCheckoutDraftLineItems(raw: unknown): CheckoutDraftLineItem[] {
  if (!Array.isArray(raw)) return [];
  const out: CheckoutDraftLineItem[] = [];
  for (const row of raw) {
    if (!isRecord(row)) continue;
    const productId = typeof row.productId === 'string' ? row.productId : '';
    const name = typeof row.name === 'string' ? row.name : '';
    const unitPriceCents = Number(row.unitPriceCents);
    const quantity = Number(row.quantity);
    const size =
      row.size === null || row.size === undefined
        ? null
        : typeof row.size === 'string'
          ? row.size
          : null;
    const image = typeof row.image === 'string' ? row.image : '';
    if (!productId || !name || !Number.isFinite(unitPriceCents) || !Number.isFinite(quantity) || quantity < 1) {
      continue;
    }
    out.push({
      productId,
      name,
      unitPriceCents,
      quantity: Math.floor(quantity),
      size,
      image,
    });
  }
  return out;
}
