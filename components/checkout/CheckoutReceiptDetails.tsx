'use client';

import { useCallback, useEffect, useState } from 'react';
import { Printer } from 'lucide-react';
import type { CheckoutReceiptPayload } from '@/lib/checkoutReceiptTypes';

function formatMoney(cents: number, currency: string) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: (currency || 'usd').toUpperCase(),
  }).format(cents / 100);
}

function formatWhen(iso: string) {
  try {
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'full',
      timeStyle: 'short',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export default function CheckoutReceiptDetails({ sessionId }: { sessionId: string | null }) {
  const [data, setData] = useState<CheckoutReceiptPayload | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!sessionId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/receipt?session_id=${encodeURIComponent(sessionId)}`);
      const json = (await res.json()) as CheckoutReceiptPayload | { error?: string };
      if (!res.ok) {
        setData(null);
        setError((json as { error?: string }).error ?? 'Could not load receipt');
        return;
      }
      setData(json as CheckoutReceiptPayload);
    } catch {
      setData(null);
      setError('Could not load receipt');
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  useEffect(() => {
    void load();
  }, [load]);

  const onPrint = () => {
    window.print();
  };

  if (!sessionId) {
    return (
      <p className="text-left text-sm text-charcoal/70">
        If you completed checkout, open the link Stripe redirected you to (it includes your session id) to see your
        receipt here. You can also use the confirmation from your email.
      </p>
    );
  }

  if (loading) {
    return <p className="text-left text-sm text-charcoal/60">Loading receipt details…</p>;
  }

  if (error) {
    return (
      <div className="space-y-3 text-left">
        <p className="text-sm text-amber-900">{error}</p>
        <button
          type="button"
          onClick={() => void load()}
          className="text-sm font-medium text-charcoal underline decoration-gold underline-offset-2 hover:text-black"
        >
          Try again
        </button>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const pendingNote =
    data.source === 'stripe_pending' ? (
      <p className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-left text-xs text-amber-950">
        Your payment is confirmed in Stripe; our records may still be updating. Refresh in a minute for full order
        details, or keep this page for your line items and totals.
      </p>
    ) : null;

  return (
    <div className="mt-8 space-y-6 border-t border-beige pt-8 text-left">
      {pendingNote}

      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-charcoal/50">The Black Tie Chandelier Gala</p>
        <p className="font-serif text-lg text-charcoal">
          {data.source === 'ticket' ? 'Event ticket receipt' : 'Purchase receipt'}
        </p>
        <p className="text-sm text-charcoal/65">{formatWhen(data.created_at)}</p>
      </div>

      <dl className="grid gap-3 text-sm">
        <div>
          <dt className="text-charcoal/50">Customer email</dt>
          <dd className="font-medium text-charcoal">{data.customer_email ?? '— (check Stripe email or account)'}</dd>
        </div>
        <div>
          <dt className="text-charcoal/50">Payment status</dt>
          <dd className="font-medium capitalize text-charcoal">{data.payment_status}</dd>
        </div>
        {data.source === 'boutique' && (
          <div>
            <dt className="text-charcoal/50">Fulfillment</dt>
            <dd className="font-medium capitalize text-charcoal">{data.fulfillment_status ?? 'new'}</dd>
          </div>
        )}
        {data.source === 'ticket' && (
          <div>
            <dt className="text-charcoal/50">Ticket type</dt>
            <dd className="font-medium capitalize text-charcoal">
              {data.ticket_tier === 'vip' ? 'VIP Experience' : 'General Admission'} × {data.quantity}
            </dd>
          </div>
        )}
        <div>
          <dt className="text-charcoal/50">Stripe Checkout session</dt>
          <dd className="break-all font-mono text-xs text-charcoal">{data.stripe_checkout_session_id}</dd>
        </div>
        <div>
          <dt className="text-charcoal/50">Internal reference</dt>
          <dd className="break-all font-mono text-xs text-charcoal">
            {data.source === 'boutique'
              ? data.internal_order_id
              : data.source === 'ticket'
                ? data.internal_sale_id
                : 'Pending sync'}
          </dd>
        </div>
      </dl>

      <div>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-charcoal/50">Line items</h3>
        <div className="overflow-hidden rounded-md border border-beige">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-stone-50 text-left text-xs uppercase tracking-wide text-charcoal/50">
                <th className="px-3 py-2 font-medium">Item</th>
                <th className="px-3 py-2 font-medium">Qty</th>
                <th className="px-3 py-2 text-right font-medium">Each</th>
                <th className="px-3 py-2 text-right font-medium">Line</th>
              </tr>
            </thead>
            <tbody>
              {data.lines.map((line, i) => (
                <tr key={i} className="border-t border-beige">
                  <td className="px-3 py-2 text-charcoal">{line.description}</td>
                  <td className="px-3 py-2 tabular-nums text-charcoal">{line.quantity}</td>
                  <td className="px-3 py-2 text-right tabular-nums text-charcoal/80">
                    {formatMoney(line.unit_amount_cents, data.currency)}
                  </td>
                  <td className="px-3 py-2 text-right font-medium tabular-nums text-charcoal">
                    {formatMoney(line.line_total_cents, data.currency)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-beige bg-cream/50">
                <td colSpan={3} className="px-3 py-3 text-right text-sm font-semibold text-charcoal">
                  Total
                </td>
                <td className="px-3 py-3 text-right font-serif text-lg text-charcoal">
                  {formatMoney(data.amount_total_cents, data.currency)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <p className="text-xs leading-relaxed text-charcoal/55">
        Save or print this page as a PDF if you do not receive Stripe&apos;s email. For boutique shipping questions,
        reply from the address you used at checkout. For gala tickets, contact{' '}
        <a href="mailto:info@theblacktiechandeliergala.com" className="font-medium text-charcoal underline">
          info@theblacktiechandeliergala.com
        </a>
        .
      </p>

      <div className="no-print flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <button
          type="button"
          onClick={onPrint}
          className="inline-flex items-center justify-center gap-2 border border-charcoal bg-white px-5 py-3 text-sm font-semibold text-charcoal transition-colors hover:bg-cream"
        >
          <Printer className="h-4 w-4 shrink-0" aria-hidden />
          Save or print PDF
        </button>
        <p className="self-center text-xs text-charcoal/50 sm:max-w-xs">
          Opens the print dialog — choose &quot;Save as PDF&quot; (Chrome/Edge) or &quot;PDF&quot; (Safari).
        </p>
      </div>
    </div>
  );
}
