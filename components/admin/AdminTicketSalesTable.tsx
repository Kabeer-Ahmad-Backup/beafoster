import type { AdminTicketSale } from '@/lib/adminTicketSalesTypes';

function money(cents: number, currency: string) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: (currency || 'usd').toUpperCase(),
  }).format(cents / 100);
}

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function tierLabel(tier: string) {
  if (tier === 'vip') return 'VIP';
  if (tier === 'general') return 'General';
  return tier;
}

export default function AdminTicketSalesTable({ rows }: { rows: AdminTicketSale[] }) {
  if (rows.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-beige bg-white/60 p-10 text-center text-sm text-charcoal/55">
        No ticket sales recorded yet. Completed gala checkouts appear here after the Stripe webhook runs.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-beige bg-white/95 shadow-sm">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead>
          <tr className="border-b border-beige bg-stone-50/80 text-xs uppercase tracking-wider text-charcoal/50">
            <th className="p-3">Date</th>
            <th className="p-3">Customer</th>
            <th className="p-3">Tier</th>
            <th className="p-3">Qty</th>
            <th className="p-3">Unit</th>
            <th className="p-3">Total</th>
            <th className="p-3">Status</th>
            <th className="p-3">Stripe</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-beige/80 transition-colors hover:bg-cream/50">
              <td className="whitespace-nowrap p-3 text-charcoal/80">{formatDate(row.created_at)}</td>
              <td className="max-w-[200px] truncate p-3 text-charcoal" title={row.customer_email ?? ''}>
                {row.customer_email ?? '—'}
              </td>
              <td className="p-3">
                <span className="inline-flex rounded-full border border-beige bg-cream/80 px-2.5 py-0.5 text-xs font-medium text-charcoal">
                  {tierLabel(row.ticket_tier)}
                </span>
              </td>
              <td className="p-3 tabular-nums text-charcoal">{row.quantity}</td>
              <td className="p-3 tabular-nums text-charcoal/80">{money(row.unit_price_cents, row.currency)}</td>
              <td className="p-3 font-medium tabular-nums text-charcoal">{money(row.amount_total_cents, row.currency)}</td>
              <td className="p-3 text-charcoal/55">{row.status}</td>
              <td className="p-3 text-[10px] font-semibold uppercase tracking-wide text-charcoal/50">
                {row.stripe_environment ?? '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
