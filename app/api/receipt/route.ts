import { NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { getActiveStripe } from '@/lib/stripe';
import { getSupabaseAdmin } from '@/lib/supabase/admin';
import type { BoutiqueReceipt, ReceiptLine, StripePendingReceipt, TicketReceipt } from '@/lib/checkoutReceiptTypes';
import type { AdminOrder } from '@/lib/adminOrdersTypes';
import type { AdminTicketSale } from '@/lib/adminTicketSalesTypes';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function isLikelyStripeSessionId(id: string) {
  return /^cs_[A-Za-z0-9_]+$/.test(id) && id.length >= 20;
}

function moneyLinesFromOrderItems(order: AdminOrder): ReceiptLine[] {
  const items = order.order_items ?? [];
  return items.map((li) => ({
    description:
      li.size && li.size !== 'One size' ? `${li.product_name} — ${li.size}` : li.product_name,
    quantity: li.quantity,
    unit_amount_cents: li.unit_price_cents,
    line_total_cents: li.unit_price_cents * li.quantity,
  }));
}

function stripeLinesFromSession(session: Stripe.Checkout.Session): ReceiptLine[] {
  const expanded = session as Stripe.Checkout.Session & {
    line_items?: { data: Stripe.LineItem[] } | null;
  };
  const data = expanded.line_items?.data ?? [];
  return data.map((li) => {
    const qty = li.quantity ?? 1;
    const lineTotal = li.amount_total ?? 0;
    const unit = qty > 0 ? Math.round(lineTotal / qty) : lineTotal;
    return {
      description: li.description ?? 'Item',
      quantity: qty,
      unit_amount_cents: unit,
      line_total_cents: lineTotal,
    };
  });
}

function isoFromUnix(sec: number | undefined): string {
  if (!sec) return new Date().toISOString();
  return new Date(sec * 1000).toISOString();
}

export async function GET(request: Request) {
  const sessionId = new URL(request.url).searchParams.get('session_id')?.trim();
  if (!sessionId || !isLikelyStripeSessionId(sessionId)) {
    return NextResponse.json({ error: 'A valid Stripe Checkout session id is required.' }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();

  if (supabase) {
    const { data: orderRow } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .eq('stripe_checkout_session_id', sessionId)
      .maybeSingle();

    if (orderRow) {
      const order = orderRow as AdminOrder;
      const payload: BoutiqueReceipt = {
        source: 'boutique',
        stripe_checkout_session_id: sessionId,
        internal_order_id: order.id,
        created_at: order.created_at,
        customer_email: order.customer_email,
        currency: order.currency || 'usd',
        amount_total_cents: order.amount_total_cents,
        payment_status: order.status,
        fulfillment_status: order.fulfillment_status ?? null,
        lines: moneyLinesFromOrderItems(order),
      };
      return NextResponse.json(payload);
    }

    const { data: ticketRow } = await supabase
      .from('event_ticket_sales')
      .select('*')
      .eq('stripe_checkout_session_id', sessionId)
      .maybeSingle();

    if (ticketRow) {
      const t = ticketRow as AdminTicketSale;
      const tierLabel = t.ticket_tier === 'vip' ? 'VIP Experience' : 'General Admission';
      const payload: TicketReceipt = {
        source: 'ticket',
        stripe_checkout_session_id: sessionId,
        internal_sale_id: t.id,
        created_at: t.created_at,
        customer_email: t.customer_email,
        currency: t.currency || 'usd',
        amount_total_cents: t.amount_total_cents,
        payment_status: t.status,
        ticket_tier: t.ticket_tier,
        quantity: t.quantity,
        unit_price_cents: t.unit_price_cents,
        lines: [
          {
            description: `Gala ticket — ${tierLabel}`,
            quantity: t.quantity,
            unit_amount_cents: t.unit_price_cents,
            line_total_cents: t.unit_price_cents * t.quantity,
          },
        ],
      };
      return NextResponse.json(payload);
    }
  }

  const stripe = await getActiveStripe();
  if (!stripe) {
    return NextResponse.json(
      { error: 'Receipt not found yet. If you just paid, wait a moment and refresh, or check your Stripe email.' },
      { status: 404 }
    );
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items'],
    });

    if (session.payment_status !== 'paid' && session.payment_status !== 'no_payment_required') {
      return NextResponse.json({ error: 'This checkout session is not marked as paid.' }, { status: 404 });
    }

    const lines = stripeLinesFromSession(session);
    const payload: StripePendingReceipt = {
      source: 'stripe_pending',
      stripe_checkout_session_id: sessionId,
      created_at: isoFromUnix(session.created),
      customer_email: session.customer_details?.email ?? session.customer_email ?? null,
      currency: session.currency ?? 'usd',
      amount_total_cents: session.amount_total ?? 0,
      payment_status: session.payment_status ?? 'unknown',
      lines,
    };
    return NextResponse.json(payload);
  } catch (e) {
    console.error('receipt stripe retrieve', e);
    return NextResponse.json(
      { error: 'Receipt not found. Confirm the session link from your browser address bar after checkout.' },
      { status: 404 }
    );
  }
}
