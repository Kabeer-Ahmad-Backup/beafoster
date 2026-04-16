import type Stripe from 'stripe';
import type { SupabaseClient } from '@supabase/supabase-js';
import { tierFromProductId, type GalaTicketTier } from '@/lib/eventTickets';

type DraftLine = {
  productId: string;
  name: string;
  unitPriceCents: number;
  quantity: number;
  size: string | null;
  image: string;
};

export async function handleEventTicketCheckoutCompleted(
  supabase: SupabaseClient,
  session: Stripe.Checkout.Session,
  ticketDraftId: string
): Promise<boolean> {
  const stripeEnv = session.livemode ? 'live' : 'test';

  const { data: existing } = await supabase
    .from('event_ticket_sales')
    .select('id')
    .eq('stripe_checkout_session_id', session.id)
    .maybeSingle();

  if (existing) {
    return true;
  }

  const { data: draft, error: draftErr } = await supabase
    .from('event_ticket_drafts')
    .select('line_items')
    .eq('id', ticketDraftId)
    .maybeSingle();

  if (draftErr || !draft) {
    console.error('Missing event_ticket_draft', ticketDraftId, draftErr);
    return false;
  }

  const lines = draft.line_items as DraftLine[];
  if (!Array.isArray(lines) || lines.length === 0) {
    console.error('Invalid ticket draft line_items', ticketDraftId);
    return false;
  }

  const primary = lines[0];
  const tierMeta = session.metadata?.gala_tier?.toLowerCase();
  let ticketTier: GalaTicketTier | null =
    tierMeta === 'vip' || tierMeta === 'general' ? tierMeta : tierFromProductId(primary.productId);

  if (!ticketTier) {
    console.error('Could not resolve ticket tier', ticketDraftId, primary.productId);
    return false;
  }

  const quantity = lines.reduce((s, l) => s + (Number(l.quantity) || 0), 0) || primary.quantity;
  const unitPriceCents = primary.unitPriceCents;

  const amountTotal = session.amount_total ?? 0;
  const email =
    session.customer_details?.email ?? session.customer_email ?? null;

  const insertRow: Record<string, unknown> = {
    stripe_checkout_session_id: session.id,
    stripe_payment_intent_id:
      typeof session.payment_intent === 'string'
        ? session.payment_intent
        : session.payment_intent?.id ?? null,
    customer_email: email,
    ticket_tier: ticketTier,
    quantity,
    unit_price_cents: unitPriceCents,
    amount_total_cents: amountTotal,
    currency: session.currency ?? 'usd',
    status: session.payment_status === 'paid' ? 'paid' : 'pending',
    customer_details: session.customer_details as unknown as Record<string, unknown>,
    stripe_environment: stripeEnv,
  };

  const { error: insErr } = await supabase.from('event_ticket_sales').insert(insertRow);
  if (insErr) {
    console.error('event_ticket_sales insert', insErr);
    return false;
  }

  await supabase.from('event_ticket_drafts').delete().eq('id', ticketDraftId);
  return true;
}
