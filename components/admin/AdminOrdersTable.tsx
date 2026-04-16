'use client';

import { Fragment, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, ChevronRight, ExternalLink, Package, Search } from 'lucide-react';
import type { AdminOrder } from '@/lib/adminOrdersTypes';
import type { StripeMode } from '@/lib/stripeModeTypes';
import {
  stripeCheckoutSessionWorkbenchUrlForMode,
  stripePaymentIntentUrlForMode,
} from '@/lib/stripeDashboard';

const FULFILLMENT = ['new', 'processing', 'shipped', 'cancelled'] as const;

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

function fulfillmentBadgeClass(fulfill: string) {
  const f = fulfill.toLowerCase();
  if (f === 'shipped') return 'border-emerald-200 bg-emerald-50 text-emerald-900';
  if (f === 'processing') return 'border-sky-200 bg-sky-50 text-sky-900';
  if (f === 'cancelled') return 'border-stone-200 bg-stone-100 text-stone-600';
  return 'border-beige bg-white text-charcoal/80';
}

function stripeEnvBadgeClass(env: string | null | undefined) {
  const e = (env ?? '').toLowerCase();
  if (e === 'live') return 'border-amber-200 bg-amber-50 text-amber-950';
  if (e === 'test') return 'border-violet-200 bg-violet-50 text-violet-900';
  return 'border-stone-200 bg-stone-50 text-stone-500';
}

function resolveStripeDashMode(
  order: AdminOrder,
  stripeSession: Record<string, unknown> | null,
  siteStripeMode: StripeMode
): StripeMode {
  const r = stripeSession?.resolved_stripe_mode;
  if (r === 'live' || r === 'test') return r;
  const e = order.stripe_environment?.toLowerCase();
  if (e === 'live' || e === 'test') return e;
  return siteStripeMode;
}

export default function AdminOrdersTable({
  initialOrders,
  siteStripeMode,
}: {
  initialOrders: AdminOrder[];
  siteStripeMode: StripeMode;
}) {
  const router = useRouter();
  const [orders, setOrders] = useState(initialOrders);
  const [openId, setOpenId] = useState<string | null>(null);
  const [detailLoading, setDetailLoading] = useState<string | null>(null);
  const [detailById, setDetailById] = useState<
    Record<string, { stripeSession: Record<string, unknown> | null }>
  >({});
  const [savingId, setSavingId] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setOrders(initialOrders);
  }, [initialOrders]);

  const sorted = useMemo(
    () => [...orders].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
    [orders]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sorted;
    return sorted.filter((o) => {
      const email = o.customer_email?.toLowerCase() ?? '';
      const id = o.id.toLowerCase();
      const session = o.stripe_checkout_session_id?.toLowerCase() ?? '';
      const items = o.order_items ?? [];
      const nameMatch = items.some((i) => i.product_name.toLowerCase().includes(q));
      return email.includes(q) || id.includes(q) || session.includes(q) || nameMatch;
    });
  }, [sorted, query]);

  async function toggleDetail(order: AdminOrder) {
    if (openId === order.id) {
      setOpenId(null);
      return;
    }
    setOpenId(order.id);
    if (detailById[order.id]) return;
    setDetailLoading(order.id);
    try {
      const res = await fetch(`/api/admin/orders/${order.id}`);
      const data = (await res.json()) as {
        stripeSession?: Record<string, unknown> | null;
        error?: string;
      };
      if (!res.ok) {
        setDetailById((m) => ({
          ...m,
          [order.id]: { stripeSession: { error: data.error ?? res.statusText } },
        }));
        return;
      }
      setDetailById((m) => ({
        ...m,
        [order.id]: { stripeSession: data.stripeSession ?? null },
      }));
    } finally {
      setDetailLoading(null);
    }
  }

  async function saveOrder(orderId: string, fulfillment_status: string, admin_notes: string) {
    setSavingId(orderId);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fulfillment_status, admin_notes: admin_notes || null }),
      });
      const data = (await res.json()) as { order?: AdminOrder; error?: string };
      if (!res.ok) {
        alert(data.error ?? 'Save failed');
        return;
      }
      if (data.order) {
        setOrders((prev) => prev.map((o) => (o.id === orderId ? data.order! : o)));
      }
      router.refresh();
    } finally {
      setSavingId(null);
    }
  }

  if (sorted.length === 0) {
    return (
      <div className="rounded-xl border border-beige bg-white/90 p-12 text-center shadow-sm">
        <Package className="mx-auto h-10 w-10 text-charcoal/30" aria-hidden />
        <p className="mt-4 font-medium text-charcoal">No orders yet</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-charcoal/55">
          Completed checkouts appear here after the Stripe webhook creates rows in Supabase.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal/40" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search email, order id, session id, product…"
            className="w-full rounded-lg border border-beige bg-white py-2.5 pl-10 pr-3 text-sm text-charcoal placeholder:text-charcoal/40 focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/20"
            aria-label="Filter orders"
          />
        </div>
        <p className="shrink-0 text-xs text-charcoal/50">
          Showing <span className="tabular-nums text-charcoal">{filtered.length}</span> of{' '}
          <span className="tabular-nums text-charcoal">{sorted.length}</span>
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-beige bg-white/90 p-10 text-center text-sm text-charcoal/60 shadow-sm">
          No orders match <span className="font-medium text-charcoal">&ldquo;{query.trim()}&rdquo;</span>. Try another
          search or clear the field.
        </div>
      ) : (
    <div className="overflow-x-auto rounded-xl border border-beige bg-white/95 shadow-sm">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead>
          <tr className="border-b border-beige bg-stone-50/80 text-charcoal/50 uppercase tracking-wider text-xs">
            <th className="p-3 w-10" />
            <th className="p-3">Date</th>
            <th className="p-3">Customer</th>
            <th className="p-3">Total</th>
            <th className="p-3">Status</th>
            <th className="p-3">Fulfillment</th>
            <th className="p-3">Stripe</th>
            <th className="p-3">Items</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((order) => {
            const items = order.order_items ?? [];
            const qty = items.reduce((s, i) => s + i.quantity, 0);
            const open = openId === order.id;
            const detail = detailById[order.id];
            const fulfill = order.fulfillment_status ?? 'new';

            return (
              <Fragment key={order.id}>
                <tr className="border-b border-beige/80 transition-colors hover:bg-cream/60">
                  <td className="p-2">
                    <button
                      type="button"
                      onClick={() => void toggleDetail(order)}
                      className="rounded p-1.5 text-charcoal/45 hover:bg-beige/50 hover:text-charcoal"
                      aria-expanded={open}
                    >
                      {open ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </button>
                  </td>
                  <td className="whitespace-nowrap p-3 text-charcoal/75">{formatDate(order.created_at)}</td>
                  <td className="max-w-[200px] truncate p-3 text-charcoal" title={order.customer_email ?? ''}>
                    {order.customer_email ?? '—'}
                  </td>
                  <td className="p-3 font-medium tabular-nums text-charcoal">
                    {money(order.amount_total_cents, order.currency)}
                  </td>
                  <td className="p-3 text-charcoal/55">{order.status}</td>
                  <td className="p-3">
                    <span
                      className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${fulfillmentBadgeClass(fulfill)}`}
                    >
                      {fulfill}
                    </span>
                  </td>
                  <td className="p-3">
                    <span
                      className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${stripeEnvBadgeClass(order.stripe_environment)}`}
                    >
                      {order.stripe_environment ?? '—'}
                    </span>
                  </td>
                  <td className="p-3 text-charcoal/50">{items.length} lines / {qty} pcs</td>
                </tr>
                {open && (
                  <tr className="border-b border-beige bg-stone-50/90">
                    <td colSpan={8} className="p-4 sm:p-6">
                      {detailLoading === order.id ? (
                        <div className="space-y-3 animate-pulse" aria-busy>
                          <div className="h-4 w-48 rounded bg-stone-200" />
                          <div className="h-24 max-w-2xl rounded-lg bg-stone-200/80" />
                          <p className="text-xs text-charcoal/45">Loading Stripe session…</p>
                        </div>
                      ) : (
                        <OrderDetailPanel
                          key={`${order.id}-${order.fulfillment_status ?? ''}-${order.admin_notes ?? ''}`}
                          order={order}
                          stripeSession={detail?.stripeSession ?? null}
                          siteStripeMode={siteStripeMode}
                          saving={savingId === order.id}
                          onSave={(status, notes) => void saveOrder(order.id, status, notes)}
                        />
                      )}
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
      )}
    </div>
  );
}

function OrderDetailPanel({
  order,
  stripeSession,
  siteStripeMode,
  saving,
  onSave,
}: {
  order: AdminOrder;
  stripeSession: Record<string, unknown> | null;
  siteStripeMode: StripeMode;
  saving: boolean;
  onSave: (status: string, notes: string) => void;
}) {
  const items = order.order_items ?? [];
  const [status, setStatus] = useState(order.fulfillment_status ?? 'new');
  const [notes, setNotes] = useState(order.admin_notes ?? '');

  const dashMode = resolveStripeDashMode(order, stripeSession, siteStripeMode);

  const pi =
    (stripeSession?.payment_intent as string | undefined) ||
    order.stripe_payment_intent_id ||
    undefined;
  const payUrl = stripePaymentIntentUrlForMode(dashMode, pi);
  const searchUrl = stripeCheckoutSessionWorkbenchUrlForMode(dashMode, order.stripe_checkout_session_id);

  return (
    <div className="grid gap-6 text-sm lg:grid-cols-2">
      <div className="space-y-4">
        <h3 className="text-xs uppercase tracking-wider text-charcoal/45">Supabase</h3>
        <dl className="grid gap-2 text-charcoal">
          <div>
            <dt className="text-charcoal/50">Order id</dt>
            <dd className="break-all font-mono text-xs">{order.id}</dd>
          </div>
          <div>
            <dt className="text-charcoal/50">Checkout session</dt>
            <dd className="break-all font-mono text-xs">{order.stripe_checkout_session_id}</dd>
          </div>
          <div>
            <dt className="text-charcoal/50">PaymentIntent</dt>
            <dd className="break-all font-mono text-xs">{order.stripe_payment_intent_id ?? '—'}</dd>
          </div>
          <div>
            <dt className="text-charcoal/50">Stripe env (stored)</dt>
            <dd>{order.stripe_environment ?? '—'}</dd>
          </div>
          <div>
            <dt className="text-charcoal/50">Dashboard links use</dt>
            <dd className="text-xs uppercase">{dashMode}</dd>
          </div>
        </dl>
        <div>
          <h4 className="mb-2 text-xs uppercase tracking-wider text-charcoal/45">Line items</h4>
          <ul className="divide-y divide-beige rounded-md border border-beige bg-white">
            {items.map((li) => (
              <li key={li.id} className="flex justify-between gap-2 p-2 text-charcoal">
                <span>
                  {li.product_name}
                  {li.size && li.size !== 'One size' ? ` · ${li.size}` : ''} × {li.quantity}
                </span>
                <span className="tabular-nums text-charcoal/60">
                  {money(li.unit_price_cents * li.quantity, order.currency)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs uppercase tracking-wider text-charcoal/45">Stripe (live fetch)</h3>
        {stripeSession && 'error' in stripeSession ? (
          <p className="text-xs text-amber-800">{String(stripeSession.error)}</p>
        ) : stripeSession ? (
          <dl className="grid gap-2 text-charcoal">
            <div>
              <dt className="text-charcoal/50">Payment status</dt>
              <dd>{String(stripeSession.payment_status ?? '—')}</dd>
            </div>
            <div>
              <dt className="text-charcoal/50">Amount (session)</dt>
              <dd className="tabular-nums">
                {typeof stripeSession.amount_total === 'number'
                  ? money(stripeSession.amount_total, String(stripeSession.currency ?? 'usd'))
                  : '—'}
              </dd>
            </div>
          </dl>
        ) : (
          <p className="text-xs text-charcoal/50">No Stripe session loaded.</p>
        )}

        <div className="flex flex-wrap gap-2">
          {payUrl && (
            <a
              href={payUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md bg-violet-700 px-3 py-2 text-xs text-white hover:bg-violet-600"
            >
              Open in Stripe
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          {searchUrl && (
            <a
              href={searchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-beige bg-white px-3 py-2 text-xs text-charcoal hover:bg-cream"
            >
              Search session in Stripe
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        <div className="space-y-3 border-t border-beige pt-4">
          <h3 className="text-xs uppercase tracking-wider text-charcoal/45">Manage</h3>
          <label className="block">
            <span className="mb-1 block text-xs text-charcoal/50">Fulfillment</span>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full max-w-xs rounded border border-beige bg-white px-3 py-2 text-charcoal focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/20"
            >
              {FULFILLMENT.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-xs text-charcoal/50">Admin notes</span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full max-w-lg rounded border border-beige bg-white px-3 py-2 text-charcoal placeholder:text-charcoal/40 focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/20"
              placeholder="Internal notes (saved to Supabase)"
            />
          </label>
          <button
            type="button"
            disabled={saving}
            onClick={() => onSave(status, notes)}
            className="rounded bg-gold px-4 py-2 text-sm font-medium text-black hover:opacity-90 disabled:opacity-50"
          >
            {saving ? 'Saving…' : 'Save changes'}
          </button>
          <p className="text-[11px] text-charcoal/45">
            Run <code className="rounded bg-beige/60 px-1 text-charcoal/80">supabase/admin_orders_fields.sql</code> if fulfillment or notes fail to save.
          </p>
        </div>
      </div>
    </div>
  );
}
