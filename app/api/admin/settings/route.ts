import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ADMIN_COOKIE_NAME, verifyAdminSession } from '@/lib/adminAuth';
import { getSupabaseAdmin } from '@/lib/supabase/admin';
import {
  getStripeMode,
  getStripePublishableKey,
  getStripeSecretKey,
  invalidateAllStripeRuntimeCaches,
} from '@/lib/stripeMode';
import type { StripeMode } from '@/lib/stripeModeTypes';

export const runtime = 'nodejs';

async function assertAdmin() {
  const token = (await cookies()).get(ADMIN_COOKIE_NAME)?.value;
  if (!verifyAdminSession(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}

export async function GET() {
  const unauth = await assertAdmin();
  if (unauth) return unauth;

  const mode = await getStripeMode();
  const supabase = getSupabaseAdmin();

  return NextResponse.json({
    stripe_mode: mode,
    keys: {
      test_secret_configured: Boolean(getStripeSecretKey('test')),
      live_secret_configured: Boolean(getStripeSecretKey('live')),
      test_publishable_configured: Boolean(getStripePublishableKey('test')),
      live_publishable_configured: Boolean(getStripePublishableKey('live')),
    },
    supabase_settings: Boolean(supabase),
  });
}

export async function PATCH(request: Request) {
  const unauth = await assertAdmin();
  if (unauth) return unauth;

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 });
  }

  let body: { stripe_mode?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const mode = body.stripe_mode?.toLowerCase();
  if (mode !== 'test' && mode !== 'live') {
    return NextResponse.json({ error: 'stripe_mode must be "test" or "live"' }, { status: 400 });
  }

  const chosen = mode as StripeMode;
  if (!getStripeSecretKey(chosen)) {
    return NextResponse.json(
      {
        error: `No secret key for "${chosen}" mode. Set STRIPE_SECRET_KEY_${chosen.toUpperCase()} or a matching legacy STRIPE_SECRET_KEY.`,
      },
      { status: 400 }
    );
  }

  const { error } = await supabase.from('site_settings').upsert(
    {
      key: 'stripe_mode',
      value: chosen,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'key' }
  );

  if (error) {
    return NextResponse.json(
      {
        error: error.message,
        hint: 'Run supabase/site_settings.sql to create the site_settings table.',
      },
      { status: 500 }
    );
  }

  invalidateAllStripeRuntimeCaches();

  return NextResponse.json({ ok: true, stripe_mode: chosen });
}
