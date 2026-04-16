'use client';

import { useCallback, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { AdminOrder } from '@/lib/adminOrdersTypes';
import type { AdminCheckoutDraft } from '@/lib/adminCheckoutDraftTypes';
import type { AdminTicketSale } from '@/lib/adminTicketSalesTypes';
import type { StripeMode } from '@/lib/stripeModeTypes';
import AdminOrdersTable from '@/components/admin/AdminOrdersTable';
import AdminCheckoutDraftsSection from '@/components/admin/AdminCheckoutDraftsSection';
import AdminTicketSalesTable from '@/components/admin/AdminTicketSalesTable';
import AdminStatsCards from '@/components/admin/AdminStatsCards';
import StripeModeSettings from '@/components/admin/StripeModeSettings';

type TabId = 'boutique' | 'tickets' | 'config';

const TABS: { id: TabId; label: string; description: string }[] = [
  { id: 'boutique', label: 'Boutique', description: 'Orders, fulfillment & cart drafts' },
  { id: 'tickets', label: 'Gala tickets', description: 'Event sales & ticket checkout drafts' },
  { id: 'config', label: 'Configuration', description: 'Stripe mode & keys' },
];

type KeysInfo = {
  test_secret_configured: boolean;
  live_secret_configured: boolean;
  test_publishable_configured: boolean;
  live_publishable_configured: boolean;
};

export default function AdminDashboardTabs({
  stripeMode,
  keysInfo,
  orders,
  boutiqueDrafts,
  ticketDrafts,
  ticketSales,
  orderCount,
  revenueCents,
  openFulfillmentCount,
  boutiqueDraftCount,
  ticketsSoldQty,
  ticketRevenueCents,
  ticketGaQty,
  ticketVipQty,
  ticketCheckoutCount,
  draftsErrorMessage,
  ticketsErrorMessage,
}: {
  stripeMode: StripeMode;
  keysInfo: KeysInfo;
  orders: AdminOrder[];
  boutiqueDrafts: AdminCheckoutDraft[];
  ticketDrafts: AdminCheckoutDraft[];
  ticketSales: AdminTicketSale[];
  orderCount: number;
  revenueCents: number;
  openFulfillmentCount: number;
  boutiqueDraftCount: number;
  ticketsSoldQty: number;
  ticketRevenueCents: number;
  ticketGaQty: number;
  ticketVipQty: number;
  ticketCheckoutCount: number;
  draftsErrorMessage: string | null;
  ticketsErrorMessage: string | null;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeTab = useMemo((): TabId => {
    const t = searchParams.get('tab');
    if (t === 'tickets' || t === 'config') return t;
    return 'boutique';
  }, [searchParams]);

  const setTab = useCallback(
    (id: TabId) => {
      const params = new URLSearchParams(searchParams.toString());
      if (id === 'boutique') {
        params.delete('tab');
      } else {
        params.set('tab', id);
      }
      const q = params.toString();
      router.replace(q ? `${pathname}?${q}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  return (
    <div>
      <div className="mb-10 border-b border-beige">
        <nav className="-mb-px flex flex-wrap gap-2" aria-label="Admin sections">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setTab(tab.id)}
                className={`relative rounded-t-lg border border-b-0 px-4 py-3 text-left transition-colors sm:min-w-[10rem] ${
                  isActive
                    ? 'border-beige bg-white text-charcoal shadow-sm'
                    : 'border-transparent bg-cream/40 text-charcoal/60 hover:bg-cream/80 hover:text-charcoal'
                }`}
              >
                <span className="block font-serif text-base sm:text-lg">{tab.label}</span>
                <span className="mt-0.5 block text-xs font-normal text-charcoal/50">{tab.description}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {activeTab === 'boutique' && (
        <div className="space-y-10 pb-4">
          {draftsErrorMessage && (
            <div className="max-w-xl rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
              {draftsErrorMessage}
            </div>
          )}
          <AdminStatsCards
            orderCount={orderCount}
            revenueCents={revenueCents}
            openFulfillmentCount={openFulfillmentCount}
            draftCount={boutiqueDraftCount}
          />
          <div>
            <h2 className="mb-1 font-serif text-xl text-charcoal sm:text-2xl">All boutique orders</h2>
            <p className="mb-4 text-sm text-charcoal/55">
              Checkout uses <span className="font-medium text-charcoal">{stripeMode}</span> Stripe mode. Expand a row
              for Stripe session data and fulfillment.
            </p>
            <AdminOrdersTable initialOrders={orders} siteStripeMode={stripeMode} />
          </div>
          <AdminCheckoutDraftsSection drafts={boutiqueDrafts} />
        </div>
      )}

      {activeTab === 'tickets' && (
        <div className="space-y-10 pb-4">
          {ticketsErrorMessage && (
            <div className="max-w-xl rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
              {ticketsErrorMessage}
            </div>
          )}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-beige bg-white/90 p-5 shadow-sm">
              <p className="text-xs font-medium uppercase tracking-wider text-charcoal/50">Ticket checkouts</p>
              <p className="mt-2 font-serif text-3xl tabular-nums text-charcoal">{ticketCheckoutCount}</p>
              <p className="mt-1 text-xs text-charcoal/50">Paid sessions in list</p>
            </div>
            <div className="rounded-xl border border-beige bg-white/90 p-5 shadow-sm">
              <p className="text-xs font-medium uppercase tracking-wider text-charcoal/50">Tickets sold</p>
              <p className="mt-2 font-serif text-3xl tabular-nums text-charcoal">{ticketsSoldQty}</p>
              <p className="mt-1 text-xs text-charcoal/50">Sum of quantities</p>
            </div>
            <div className="rounded-xl border border-beige bg-white/90 p-5 shadow-sm">
              <p className="text-xs font-medium uppercase tracking-wider text-charcoal/50">GA · VIP qty</p>
              <p className="mt-2 font-serif text-3xl tabular-nums text-charcoal">
                {ticketGaQty}
                <span className="mx-1 text-charcoal/35">·</span>
                {ticketVipQty}
              </p>
              <p className="mt-1 text-xs text-charcoal/50">General vs VIP seats</p>
            </div>
            <div className="rounded-xl border border-beige bg-white/90 p-5 shadow-sm">
              <p className="text-xs font-medium uppercase tracking-wider text-charcoal/50">Gross revenue</p>
              <p className="mt-2 font-serif text-3xl tabular-nums text-gold">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(ticketRevenueCents / 100)}
              </p>
              <p className="mt-1 text-xs text-charcoal/50">Loaded rows (USD)</p>
            </div>
          </div>

          <div>
            <h2 className="mb-1 font-serif text-xl text-charcoal sm:text-2xl">Ticket sales</h2>
            <p className="mb-4 text-sm text-charcoal/55">
              From the Events page (General $100 · VIP $150). Expand any row for Stripe ids, dashboard links, and raw
              customer details from checkout.
            </p>
            <AdminTicketSalesTable rows={ticketSales} siteStripeMode={stripeMode} />
          </div>

          <AdminCheckoutDraftsSection
            drafts={ticketDrafts}
            title="Gala checkout drafts"
            description="In-progress ticket checkouts (Stripe session not completed yet). Same lifecycle as boutique drafts."
            emptyTitle="No gala checkout drafts"
            emptyDescription="Drafts appear when a guest clicks Book Now; they clear after payment or if Stripe session creation fails."
            stripeMetadataNote={
              <>
                Sent as <code className="rounded bg-beige/60 px-1">ticket_draft_id</code> and{' '}
                <code className="rounded bg-beige/60 px-1">client_reference_id</code> on the Checkout Session.
              </>
            }
          />
        </div>
      )}

      {activeTab === 'config' && (
        <div className="max-w-3xl space-y-6 pb-4">
          <div>
            <h2 className="font-serif text-xl text-charcoal sm:text-2xl">Stripe & checkout</h2>
            <p className="mt-1 text-sm text-charcoal/55">
              Controls which Stripe keys the storefront and ticket checkouts use. Webhooks must match test vs live
              signing secrets.
            </p>
          </div>
          <StripeModeSettings initialMode={stripeMode} initialKeys={keysInfo} />
        </div>
      )}
    </div>
  );
}
