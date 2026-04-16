function formatUsd(cents: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100);
}

export default function AdminStatsCards({
  orderCount,
  revenueCents,
  openFulfillmentCount,
  draftCount,
}: {
  orderCount: number;
  revenueCents: number;
  openFulfillmentCount: number;
  draftCount: number;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <div className="rounded-xl border border-beige bg-white/90 p-5 shadow-sm">
        <p className="text-xs font-medium uppercase tracking-wider text-charcoal/50">Orders (loaded)</p>
        <p className="mt-2 font-serif text-3xl tabular-nums text-charcoal">{orderCount}</p>
        <p className="mt-1 text-xs text-charcoal/50">Up to 200 most recent</p>
      </div>
      <div className="rounded-xl border border-beige bg-white/90 p-5 shadow-sm">
        <p className="text-xs font-medium uppercase tracking-wider text-charcoal/50">Revenue total</p>
        <p className="mt-2 font-serif text-3xl tabular-nums text-gold">{formatUsd(revenueCents)}</p>
        <p className="mt-1 text-xs text-charcoal/50">Sum of loaded rows</p>
      </div>
      <div className="rounded-xl border border-beige bg-white/90 p-5 shadow-sm">
        <p className="text-xs font-medium uppercase tracking-wider text-charcoal/50">Open fulfillment</p>
        <p className="mt-2 font-serif text-3xl tabular-nums text-charcoal">{openFulfillmentCount}</p>
        <p className="mt-1 text-xs text-charcoal/50">Not shipped or cancelled</p>
      </div>
      <div className="rounded-xl border border-beige bg-white/90 p-5 shadow-sm">
        <p className="text-xs font-medium uppercase tracking-wider text-charcoal/50">Checkout drafts</p>
        <p className="mt-2 font-serif text-3xl tabular-nums text-charcoal">{draftCount}</p>
        <p className="mt-1 text-xs text-charcoal/50">In-progress sessions</p>
      </div>
    </div>
  );
}
