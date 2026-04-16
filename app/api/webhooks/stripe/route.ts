import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { constructStripeWebhookEvent } from '@/lib/stripeMode';
import { getSupabaseAdmin } from '@/lib/supabase/admin';
import { handleEventTicketCheckoutCompleted } from '@/lib/stripeEventTicketWebhook';

export const runtime = 'nodejs';

type DraftLine = {
  productId: string;
  name: string;
  unitPriceCents: number;
  quantity: number;
  size: string | null;
  image: string;
};

export async function POST(request: Request) {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }

  const rawBody = await request.text();
  const sig = request.headers.get('stripe-signature');

  let event: Stripe.Event;
  try {
    event = constructStripeWebhookEvent(rawBody, sig ?? undefined);
  } catch (err) {
    console.error('Webhook signature verification failed', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    const ticketDraftId =
      typeof session.metadata?.ticket_draft_id === 'string'
        ? session.metadata.ticket_draft_id
        : session.metadata?.checkout_kind === 'event_ticket' && typeof session.client_reference_id === 'string'
          ? session.client_reference_id
          : null;

    if (ticketDraftId) {
      await handleEventTicketCheckoutCompleted(supabase, session, ticketDraftId);
      return NextResponse.json({ received: true });
    }

    const draftId = session.metadata?.draft_id ?? session.client_reference_id;
    if (!draftId) {
      console.error('checkout.session.completed missing draft_id', session.id);
      return NextResponse.json({ received: true });
    }

    const stripeEnv = event.livemode ? 'live' : 'test';

    const { data: existing } = await supabase
      .from('orders')
      .select('id')
      .eq('stripe_checkout_session_id', session.id)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ received: true });
    }

    const { data: draft, error: draftErr } = await supabase
      .from('checkout_drafts')
      .select('line_items')
      .eq('id', draftId)
      .maybeSingle();

    if (draftErr || !draft) {
      console.error('Missing checkout_draft', draftId, draftErr);
      return NextResponse.json({ received: true });
    }

    const lines = draft.line_items as DraftLine[];
    if (!Array.isArray(lines) || lines.length === 0) {
      console.error('Invalid draft line_items', draftId);
      return NextResponse.json({ received: true });
    }

    const amountTotal = session.amount_total ?? 0;
    const email =
      session.customer_details?.email ??
      session.customer_email ??
      null;

    const sessionExt = session as Stripe.Checkout.Session & {
      shipping_details?: Record<string, unknown> | null;
    };

    const insertRow: Record<string, unknown> = {
      stripe_checkout_session_id: session.id,
      stripe_payment_intent_id:
        typeof session.payment_intent === 'string'
          ? session.payment_intent
          : session.payment_intent?.id ?? null,
      customer_email: email,
      amount_total_cents: amountTotal,
      currency: session.currency ?? 'usd',
      status: session.payment_status === 'paid' ? 'paid' : 'pending',
      customer_details: session.customer_details as unknown as Record<string, unknown>,
      shipping_details: sessionExt.shipping_details ?? null,
      stripe_environment: stripeEnv,
    };

    const { data: order, error: orderErr } = await supabase
      .from('orders')
      .insert(insertRow)
      .select('id')
      .single();

    if (orderErr || !order) {
      console.error('orders insert', orderErr);
      return NextResponse.json({ received: true });
    }

    const rows = lines.map((line) => ({
      order_id: order.id,
      product_id: line.productId,
      product_name: line.name,
      quantity: line.quantity,
      unit_price_cents: line.unitPriceCents,
      size: line.size,
      image_url: line.image,
    }));

    const { error: itemsErr } = await supabase.from('order_items').insert(rows);
    if (itemsErr) {
      console.error('order_items insert', itemsErr);
    }

    await supabase.from('checkout_drafts').delete().eq('id', draftId);
  }

  return NextResponse.json({ received: true });
}
