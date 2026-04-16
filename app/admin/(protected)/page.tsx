import { Suspense } from 'react';
import { getSupabaseAdmin } from '@/lib/supabase/admin';
import type { AdminOrder } from '@/lib/adminOrdersTypes';
import { parseCheckoutDraftLineItems, type AdminCheckoutDraft } from '@/lib/adminCheckoutDraftTypes';
import type { AdminTicketSale } from '@/lib/adminTicketSalesTypes';
import { getStripeMode, getStripePublishableKey, getStripeSecretKey } from '@/lib/stripeMode';
import AdminDashboardTabs from '@/components/admin/AdminDashboardTabs';

export const dynamic = 'force-dynamic';

function isOpenFulfillment(status: string | null | undefined) {
  const f = (status ?? 'new').toLowerCase();
  return f !== 'shipped' && f !== 'cancelled';
}

function AdminTabsFallback() {
  return (
    <div className="rounded-xl border border-beige bg-white/80 px-6 py-16 text-center text-sm text-charcoal/55">
      Loading dashboard…
    </div>
  );
}

export default async function AdminOrdersPage() {
  const stripeMode = await getStripeMode();
  const keysInfo = {
    test_secret_configured: Boolean(getStripeSecretKey('test')),
    live_secret_configured: Boolean(getStripeSecretKey('live')),
    test_publishable_configured: Boolean(getStripePublishableKey('test')),
    live_publishable_configured: Boolean(getStripePublishableKey('live')),
  };

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return (
      <div className="container-luxury px-4 py-12 sm:px-0">
        <div className="max-w-xl rounded-xl border border-red-200 bg-red-50 p-6 text-red-900">
          <p className="font-medium">Supabase is not configured</p>
          <p className="mt-2 text-sm text-red-800/90">
            Set <code className="rounded bg-white px-1 py-0.5 font-mono text-xs text-red-950 ring-1 ring-red-100">NEXT_PUBLIC_SUPABASE_URL</code> and{' '}
            <code className="rounded bg-white px-1 py-0.5 font-mono text-xs text-red-950 ring-1 ring-red-100">SUPABASE_SERVICE_ROLE_KEY</code>.
          </p>
        </div>
      </div>
    );
  }

  const [
    { data: orders, error },
    { data: draftRows, error: draftsError },
    { data: ticketRows, error: ticketsError },
    { data: ticketDraftRows, error: ticketDraftsError },
  ] = await Promise.all([
    supabase
      .from('orders')
      .select('*, order_items(*)')
      .order('created_at', { ascending: false })
      .limit(200),
    supabase.from('checkout_drafts').select('id, line_items, created_at').order('created_at', { ascending: false }).limit(100),
    supabase.from('event_ticket_sales').select('*').order('created_at', { ascending: false }).limit(200),
    supabase.from('event_ticket_drafts').select('id, line_items, created_at').order('created_at', { ascending: false }).limit(100),
  ]);

  if (error) {
    return (
      <div className="container-luxury px-4 py-12 sm:px-0">
        <div className="max-w-xl rounded-xl border border-red-200 bg-red-50 p-6 text-red-900">
          <p className="font-medium">Could not load orders</p>
          <p className="mt-2 font-mono text-sm text-red-800">{error.message}</p>
        </div>
      </div>
    );
  }

  const rows = (orders ?? []) as AdminOrder[];
  const orderCount = rows.length;
  const revenueCents = rows.reduce((sum, o) => sum + (Number(o.amount_total_cents) || 0), 0);
  const openFulfillmentCount = rows.filter((o) => isOpenFulfillment(o.fulfillment_status)).length;

  const boutiqueDrafts: AdminCheckoutDraft[] = (draftRows ?? []).map((row) => ({
    id: row.id as string,
    created_at: row.created_at as string,
    line_items: parseCheckoutDraftLineItems(row.line_items),
  }));
  const boutiqueDraftCount = boutiqueDrafts.length;

  const ticketSales = (ticketRows ?? []) as AdminTicketSale[];
  const ticketsSoldQty = ticketSales.reduce((s, r) => s + (Number(r.quantity) || 0), 0);
  const ticketRevenueCents = ticketSales.reduce((s, r) => s + (Number(r.amount_total_cents) || 0), 0);
  const ticketGaQty = ticketSales
    .filter((r) => r.ticket_tier === 'general')
    .reduce((s, r) => s + (Number(r.quantity) || 0), 0);
  const ticketVipQty = ticketSales
    .filter((r) => r.ticket_tier === 'vip')
    .reduce((s, r) => s + (Number(r.quantity) || 0), 0);

  const ticketDrafts: AdminCheckoutDraft[] = (ticketDraftRows ?? []).map((row) => ({
    id: row.id as string,
    created_at: row.created_at as string,
    line_items: parseCheckoutDraftLineItems(row.line_items),
  }));

  const draftsErrorMessage = draftsError
    ? `Could not load boutique checkout drafts: ${draftsError.message}`
    : null;

  const ticketsBlockError = ticketsError
    ? `Could not load gala ticket sales: ${ticketsError.message}. Run supabase/event_ticket_sales.sql if the table is missing.`
    : null;

  const ticketDraftsBlockError = ticketDraftsError
    ? `Could not load gala ticket drafts: ${ticketDraftsError.message}.`
    : null;

  const ticketsErrorMessage = [ticketsBlockError, ticketDraftsBlockError].filter(Boolean).join(' ') || null;

  return (
    <div className="container-luxury px-4 py-8 sm:px-0 sm:py-10 lg:py-12">
      <header className="mb-10 max-w-3xl">
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-gold/90">The Black Tie Chandelier Gala</p>
        <h1 className="font-serif text-3xl tracking-tight text-charcoal sm:text-4xl">Admin dashboard</h1>
        <p className="mt-3 text-sm leading-relaxed text-charcoal/70 sm:text-base">
          Boutique orders, gala ticket sales, and Stripe configuration — organized in tabs below.
        </p>
      </header>

      <Suspense fallback={<AdminTabsFallback />}>
        <AdminDashboardTabs
          stripeMode={stripeMode}
          keysInfo={keysInfo}
          orders={rows}
          boutiqueDrafts={boutiqueDrafts}
          ticketDrafts={ticketDrafts}
          ticketSales={ticketSales}
          orderCount={orderCount}
          revenueCents={revenueCents}
          openFulfillmentCount={openFulfillmentCount}
          boutiqueDraftCount={boutiqueDraftCount}
          ticketsSoldQty={ticketsSoldQty}
          ticketRevenueCents={ticketRevenueCents}
          ticketGaQty={ticketGaQty}
          ticketVipQty={ticketVipQty}
          ticketCheckoutCount={ticketSales.length}
          draftsErrorMessage={draftsErrorMessage}
          ticketsErrorMessage={ticketsErrorMessage}
        />
      </Suspense>
    </div>
  );
}
