import { NextResponse } from 'next/server';
import { validateCartLines, lineItemsTotalCents } from '@/lib/boutiqueCatalog';
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

  const rawItems = (body as { items?: unknown }).items;
  if (!Array.isArray(rawItems)) {
    return NextResponse.json({ error: 'Expected { items: [...] }' }, { status: 400 });
  }

  const parsed = rawItems.map((row) => {
    const r = row as Record<string, unknown>;
    return {
      productId: String(r.productId ?? ''),
      quantity: Number(r.quantity),
      size: r.size != null && r.size !== '' ? String(r.size) : undefined,
    };
  });

  const validated = validateCartLines(parsed);
  if (!validated.ok) {
    return NextResponse.json({ error: validated.error }, { status: 400 });
  }

  const originHeader = request.headers.get('origin');
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
  const origin = originHeader || siteUrl || 'http://localhost:3000';

  const { data: draft, error: draftErr } = await supabase
    .from('checkout_drafts')
    .insert({ line_items: validated.items })
    .select('id')
    .single();

  if (draftErr || !draft) {
    console.error('checkout_drafts insert', draftErr);
    return NextResponse.json({ error: 'Could not start checkout' }, { status: 500 });
  }

  const line_items = validated.items.map((item) => {
    const label =
      item.size && item.size !== 'One size'
        ? `${item.name} — ${item.size}`
        : item.name;
    const img = absoluteImageUrl(item.image, origin);
    return {
      price_data: {
        currency: 'usd',
        unit_amount: item.unitPriceCents,
        product_data: {
          name: label,
          images: [img],
          metadata: {
            product_id: item.productId,
            size: item.size ?? '',
          },
        },
      },
      quantity: item.quantity,
    };
  });

  const total = lineItemsTotalCents(validated.items);
  if (total < 50) {
    return NextResponse.json({ error: 'Order total is below the minimum charge amount.' }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      success_url: `${origin}/boutique/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/boutique`,
      client_reference_id: draft.id,
      metadata: {
        draft_id: draft.id,
        total_cents: String(total),
      },
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'],
      },
      phone_number_collection: { enabled: true },
      automatic_tax: { enabled: false },
    });

    return NextResponse.json({ url: session.url });
  } catch (e) {
    console.error('Stripe checkout.sessions.create', e);
    await supabase.from('checkout_drafts').delete().eq('id', draft.id);
    return NextResponse.json({ error: 'Could not create payment session' }, { status: 500 });
  }
}
