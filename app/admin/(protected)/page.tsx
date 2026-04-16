import { getSupabaseAdmin } from '@/lib/supabase/admin';
import type { AdminOrder } from '@/lib/adminOrdersTypes';
import { parseCheckoutDraftLineItems, type AdminCheckoutDraft } from '@/lib/adminCheckoutDraftTypes';
import { getStripeMode, getStripePublishableKey, getStripeSecretKey } from '@/lib/stripeMode';
import AdminOrdersTable from '@/components/admin/AdminOrdersTable';
import AdminCheckoutDraftsSection from '@/components/admin/AdminCheckoutDraftsSection';
import StripeModeSettings from '@/components/admin/StripeModeSettings';
import AdminStatsCards from '@/components/admin/AdminStatsCards';

export const dynamic = 'force-dynamic';

function isOpenFulfillment(status: string | null | undefined) {
  const f = (status ?? 'new').toLowerCase();
  return f !== 'shipped' && f !== 'cancelled';
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

  const [{ data: orders, error }, { data: draftRows, error: draftsError }] = await Promise.all([
    supabase
      .from('orders')
      .select('*, order_items(*)')
      .order('created_at', { ascending: false })
      .limit(200),
    supabase.from('checkout_drafts').select('id, line_items, created_at').order('created_at', { ascending: false }).limit(100),
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

  const drafts: AdminCheckoutDraft[] = (draftRows ?? []).map((row) => ({
    id: row.id as string,
    created_at: row.created_at as string,
    line_items: parseCheckoutDraftLineItems(row.line_items),
  }));
  const draftCount = drafts.length;

  return (
    <div className="container-luxury px-4 py-8 sm:px-0 sm:py-10 lg:py-12">
      <header className="mb-10 max-w-3xl">
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-gold/90">The Black Tie Chandelier Gala</p>
        <h1 className="font-serif text-3xl tracking-tight text-charcoal sm:text-4xl">Boutique orders</h1>
        <p className="mt-3 text-sm leading-relaxed text-charcoal/70 sm:text-base">
          Review checkout activity, open Stripe from each row, and update fulfillment. Checkout uses{' '}
          <span className="font-medium text-charcoal">{stripeMode}</span> Stripe mode site-wide.
        </p>
      </header>

      {draftsError && (
        <div className="mb-8 max-w-xl rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
          Could not load checkout drafts: {draftsError.message}
        </div>
      )}

      <div className="grid gap-10 xl:grid-cols-12 xl:items-start xl:gap-8">
        <div className="space-y-10 xl:col-span-8">
          <AdminStatsCards
            orderCount={orderCount}
            revenueCents={revenueCents}
            openFulfillmentCount={openFulfillmentCount}
            draftCount={draftCount}
          />
          <AdminCheckoutDraftsSection drafts={drafts} />
          <section>
            <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="font-serif text-xl text-charcoal sm:text-2xl">All orders</h2>
                <p className="mt-1 text-sm text-charcoal/55">Expand a row for Stripe details and fulfillment tools.</p>
              </div>
            </div>
            <AdminOrdersTable initialOrders={rows} siteStripeMode={stripeMode} />
          </section>
        </div>

        <aside className="space-y-6 xl:col-span-4 xl:sticky xl:top-[4.75rem] xl:self-start">
          <StripeModeSettings initialMode={stripeMode} initialKeys={keysInfo} />
        </aside>
      </div>
    </div>
  );
}
