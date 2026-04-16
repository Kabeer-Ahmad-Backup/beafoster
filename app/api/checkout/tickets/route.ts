import { NextResponse } from 'next/server';
import { buildGalaTicketDraftLines, galaTicketTotalCents, type GalaTicketTier } from '@/lib/eventTickets';
import { getActiveStripe } from '@/lib/stripe';
import { getSupabaseAdmin } from '@/lib/supabase/admin';

export const runtime = 'nodejs';

function absoluteImageUrl(path: string, origin: string): string {
  if (path.startsWith('http')) return path;
  return `${origin.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`;
}

export async function POST(request: Request) {
  const stripe = await getActiveStripe();
  const supabase = getSupabaseAdmin();

  if (!stripe) {
    return NextResponse.json(
      {
        error:
          'Payments are not configured. Set STRIPE_SECRET_KEY_TEST / STRIPE_SECRET_KEY_LIVE (or legacy STRIPE_SECRET_KEY) and choose mode in Admin.',
      },
      { status: 503 }
    );
  }
  if (!supabase) {
    return NextResponse.json(
      { error: 'Database is not configured (missing Supabase env vars).' },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const tierRaw = String((body as { tier?: unknown }).tier ?? '').toLowerCase();
  const tier: GalaTicketTier | null = tierRaw === 'vip' ? 'vip' : tierRaw === 'general' ? 'general' : null;
  if (!tier) {
    return NextResponse.json({ error: 'tier must be "general" or "vip"' }, { status: 400 });
  }

  const qtyRaw = Number((body as { quantity?: unknown }).quantity);
  const quantity = Number.isFinite(qtyRaw) && qtyRaw >= 1 ? Math.min(99, Math.floor(qtyRaw)) : 1;

  const lines = buildGalaTicketDraftLines(tier, quantity);
  const total = galaTicketTotalCents(lines);
  if (total < 50) {
    return NextResponse.json({ error: 'Order total is below the minimum charge amount.' }, { status: 400 });
  }

  const originHeader = request.headers.get('origin');
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
  const origin = originHeader || siteUrl || 'http://localhost:3000';

  const { data: draft, error: draftErr } = await supabase
    .from('event_ticket_drafts')
    .insert({ line_items: lines })
    .select('id')
    .single();

  if (draftErr || !draft) {
    console.error('event_ticket_drafts insert', draftErr);
    return NextResponse.json(
      { error: 'Could not start checkout. Run supabase/event_ticket_sales.sql in Supabase if this table is missing.' },
      { status: 500 }
    );
  }

  const line_items = lines.map((item) => {
    const img = absoluteImageUrl(item.image, origin);
    return {
      price_data: {
        currency: 'usd',
        unit_amount: item.unitPriceCents,
        product_data: {
          name: item.name,
          images: [img],
          metadata: {
            product_id: item.productId,
            gala_tier: tier,
          },
        },
      },
      quantity: item.quantity,
    };
  });

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      success_url: `${origin}/events/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/events#tickets`,
      client_reference_id: draft.id,
      metadata: {
        ticket_draft_id: draft.id,
        checkout_kind: 'event_ticket',
        gala_tier: tier,
        total_cents: String(total),
      },
      phone_number_collection: { enabled: true },
      automatic_tax: { enabled: false },
    });

    return NextResponse.json({ url: session.url });
  } catch (e) {
    console.error('Stripe checkout.sessions.create (tickets)', e);
    await supabase.from('event_ticket_drafts').delete().eq('id', draft.id);
    return NextResponse.json({ error: 'Could not create payment session' }, { status: 500 });
  }
}
