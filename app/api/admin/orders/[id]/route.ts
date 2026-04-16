import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ADMIN_COOKIE_NAME, verifyAdminSession } from '@/lib/adminAuth';
import { getSupabaseAdmin } from '@/lib/supabase/admin';
import { getStripeForMode } from '@/lib/stripeMode';
import type { StripeMode } from '@/lib/stripeModeTypes';
import type StripeLib from 'stripe';

export const runtime = 'nodejs';

async function assertAdmin() {
  const token = (await cookies()).get(ADMIN_COOKIE_NAME)?.value;
  if (!verifyAdminSession(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}

const FULFILLMENT = ['new', 'processing', 'shipped', 'cancelled'] as const;

function orderStripeModes(order: { stripe_environment?: string | null }): StripeMode[] {
  const e = order.stripe_environment?.toLowerCase();
  if (e === 'live') return ['live'];
  if (e === 'test') return ['test'];
  return ['live', 'test'];
}

export async function GET(
  _request: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const unauth = await assertAdmin();
  if (unauth) return unauth;

  const { id } = await ctx.params;
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }

  const { data: order, error } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .eq('id', id)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (!order) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  let stripeSession: Record<string, unknown> | null = null;
  const sessionId = order.stripe_checkout_session_id as string | undefined;
  if (sessionId) {
    let lastErr: string | null = null;
    for (const mode of orderStripeModes(order)) {
      const stripe = getStripeForMode(mode);
      if (!stripe) continue;
      try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        const sessionExt = session as StripeLib.Checkout.Session & {
          shipping_details?: unknown;
        };
        stripeSession = {
          id: session.id,
          payment_status: session.payment_status,
          amount_total: session.amount_total,
          currency: session.currency,
          customer_email: session.customer_email,
          customer_details: session.customer_details,
          shipping_details: sessionExt.shipping_details,
          payment_intent:
            typeof session.payment_intent === 'string'
              ? session.payment_intent
              : session.payment_intent?.id,
          resolved_stripe_mode: mode,
        };
        lastErr = null;
        break;
      } catch (e) {
        lastErr = String(e);
      }
    }
    if (!stripeSession?.id && lastErr) {
      stripeSession = { error: lastErr };
    }
  }

  return NextResponse.json({ order, stripeSession });
}

export async function PATCH(
  request: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const unauth = await assertAdmin();
  if (unauth) return unauth;

  const { id } = await ctx.params;
  let body: { fulfillment_status?: string; admin_notes?: string | null };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const updates: Record<string, string | null> = {};
  if (body.fulfillment_status !== undefined) {
    if (!FULFILLMENT.includes(body.fulfillment_status as (typeof FULFILLMENT)[number])) {
      return NextResponse.json({ error: 'Invalid fulfillment_status' }, { status: 400 });
    }
    updates.fulfillment_status = body.fulfillment_status;
  }
  if (body.admin_notes !== undefined) {
    updates.admin_notes = body.admin_notes;
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: 'No updates' }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }

  const { data, error } = await supabase
    .from('orders')
    .update(updates)
    .eq('id', id)
    .select('*, order_items(*)')
    .maybeSingle();

  if (error) {
    return NextResponse.json(
      { error: error.message, hint: 'Run supabase/admin_orders_fields.sql if columns are missing.' },
      { status: 500 }
    );
  }
  if (!data) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({ order: data });
}
