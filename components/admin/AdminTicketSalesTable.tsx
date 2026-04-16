'use client';

import { Fragment, useMemo, useState } from 'react';
import { ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';
import type { AdminTicketSale } from '@/lib/adminTicketSalesTypes';
import type { StripeMode } from '@/lib/stripeModeTypes';
import {
  stripeCheckoutSessionWorkbenchUrlForMode,
  stripePaymentIntentUrlForMode,
} from '@/lib/stripeDashboard';

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
  if (tier === 'vip') return 'VIP Experience';
  if (tier === 'general') return 'General Admission';
  return tier;
}

function stripeEnvForSale(sale: AdminTicketSale, siteStripeMode: StripeMode): StripeMode {
  const e = sale.stripe_environment?.toLowerCase();
  if (e === 'live' || e === 'test') return e;
  return siteStripeMode;
}

function safeJsonPreview(value: unknown, maxLen = 4000): string {
  try {
    const s = JSON.stringify(value, null, 2);
    if (s.length <= maxLen) return s;
    return `${s.slice(0, maxLen)}\n… (truncated)`;
  } catch {
    return String(value);
  }
}

export default function AdminTicketSalesTable({
  rows,
  siteStripeMode,
}: {
  rows: AdminTicketSale[];
  siteStripeMode: StripeMode;
}) {
  const [openId, setOpenId] = useState<string | null>(null);

  const sorted = useMemo(
    () => [...rows].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
    [rows]
  );

  if (sorted.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-beige bg-white/60 p-10 text-center text-sm text-charcoal/55">
        No ticket sales recorded yet. Completed gala checkouts appear here after the Stripe webhook runs.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-beige bg-white/95 shadow-sm">
      <table className="w-full min-w-[800px] text-left text-sm">
        <thead>
          <tr className="border-b border-beige bg-stone-50/80 text-xs uppercase tracking-wider text-charcoal/50">
            <th className="w-10 p-3" />
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
          {sorted.map((row) => {
            const open = openId === row.id;
            const dashMode = stripeEnvForSale(row, siteStripeMode);
            const piUrl = stripePaymentIntentUrlForMode(dashMode, row.stripe_payment_intent_id);
            const sessionSearchUrl = stripeCheckoutSessionWorkbenchUrlForMode(dashMode, row.stripe_checkout_session_id);
            const subtotal = row.unit_price_cents * row.quantity;

            return (
              <Fragment key={row.id}>
                <tr className="border-b border-beige/80 transition-colors hover:bg-cream/50">
                  <td className="p-2">
                    <button
                      type="button"
                      onClick={() => setOpenId(open ? null : row.id)}
                      className="rounded p-1.5 text-charcoal/45 hover:bg-beige/50 hover:text-charcoal"
                      aria-expanded={open}
                    >
                      {open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </button>
                  </td>
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
                {open && (
                  <tr className="border-b border-beige bg-stone-50/90">
                    <td colSpan={9} className="p-4 sm:p-6">
                      <div className="grid gap-8 lg:grid-cols-2">
                        <div className="space-y-4 text-sm">
                          <h3 className="text-xs font-semibold uppercase tracking-wider text-charcoal/45">
                            Sale record
                          </h3>
                          <dl className="grid gap-3 text-charcoal">
                            <div>
                              <dt className="text-charcoal/50">Internal sale id</dt>
                              <dd className="break-all font-mono text-xs">{row.id}</dd>
                            </div>
                            <div>
                              <dt className="text-charcoal/50">Checkout session</dt>
                              <dd className="break-all font-mono text-xs">{row.stripe_checkout_session_id}</dd>
                            </div>
                            <div>
                              <dt className="text-charcoal/50">PaymentIntent</dt>
                              <dd className="break-all font-mono text-xs">{row.stripe_payment_intent_id ?? '—'}</dd>
                            </div>
                            <div>
                              <dt className="text-charcoal/50">Stripe environment (stored)</dt>
                              <dd className="uppercase">{row.stripe_environment ?? '—'}</dd>
                            </div>
                            <div>
                              <dt className="text-charcoal/50">Dashboard opens in</dt>
                              <dd className="text-xs uppercase">{dashMode}</dd>
                            </div>
                          </dl>
                          <div className="flex flex-wrap gap-2">
                            {piUrl && (
                              <a
                                href={piUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 rounded-md bg-violet-700 px-3 py-2 text-xs text-white hover:bg-violet-600"
                              >
                                Open in Stripe
                                <ExternalLink className="h-3.5 w-3.5" />
                              </a>
                            )}
                            {sessionSearchUrl && (
                              <a
                                href={sessionSearchUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 rounded-md border border-beige bg-white px-3 py-2 text-xs text-charcoal hover:bg-cream"
                              >
                                Search session
                                <ExternalLink className="h-3.5 w-3.5" />
                              </a>
                            )}
                          </div>
                        </div>
                        <div className="space-y-4 text-sm">
                          <h3 className="text-xs font-semibold uppercase tracking-wider text-charcoal/45">
                            Ticket breakdown
                          </h3>
                          <div className="rounded-lg border border-beige bg-white p-4">
                            <p className="font-medium text-charcoal">{tierLabel(row.ticket_tier)}</p>
                            <p className="mt-2 text-xs text-charcoal/55">
                              {money(row.unit_price_cents, row.currency)} × {row.quantity} ={' '}
                              <span className="font-semibold text-charcoal">{money(subtotal, row.currency)}</span>
                              {row.amount_total_cents !== subtotal && (
                                <span className="mt-1 block text-amber-800">
                                  Charged total {money(row.amount_total_cents, row.currency)} (may include fees or
                                  adjustments in Stripe).
                                </span>
                              )}
                            </p>
                          </div>
                          <div>
                            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-charcoal/45">
                              Customer details (Stripe)
                            </h4>
                            <pre className="max-h-64 overflow-auto rounded-md border border-beige bg-stone-50/80 p-3 font-mono text-[11px] leading-relaxed text-charcoal/90">
                              {row.customer_details != null
                                ? safeJsonPreview(row.customer_details)
                                : '—'}
                            </pre>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
