import Stripe from 'stripe';
import { getSupabaseAdmin } from '@/lib/supabase/admin';
import type { StripeMode } from '@/lib/stripeModeTypes';

export type { StripeMode } from '@/lib/stripeModeTypes';

let modeCache: { mode: StripeMode; at: number } | null = null;
const MODE_TTL_MS = 15_000;

/** Last mode returned by `getStripeMode` (for sync fallbacks). */
let lastResolvedMode: StripeMode | null = null;

const clients: Partial<Record<StripeMode, Stripe>> = {};

export function invalidateStripeModeCache() {
  modeCache = null;
  lastResolvedMode = null;
}

export function invalidateStripeClients() {
  clients.test = undefined;
  clients.live = undefined;
}

export function invalidateAllStripeRuntimeCaches() {
  invalidateStripeModeCache();
  invalidateStripeClients();
}

function isStripeMode(v: string | undefined | null): v is StripeMode {
  return v === 'test' || v === 'live';
}

/**
 * Active Stripe mode for checkout (from Supabase `site_settings.stripe_mode`,
 * else legacy `STRIPE_SECRET_KEY` prefix / `DEFAULT_STRIPE_MODE`).
 */
export async function getStripeMode(): Promise<StripeMode> {
  if (modeCache && Date.now() - modeCache.at < MODE_TTL_MS) {
    lastResolvedMode = modeCache.mode;
    return modeCache.mode;
  }

  let resolved: StripeMode | null = null;

  const supabase = getSupabaseAdmin();
  if (supabase) {
    const { data, error } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'stripe_mode')
      .maybeSingle();
    if (!error && data?.value) {
      const raw = String(data.value).trim().toLowerCase();
      if (isStripeMode(raw)) {
        resolved = raw;
      }
    }
  }

  if (resolved === null) {
    const legacy = process.env.STRIPE_SECRET_KEY?.trim();
    if (legacy?.startsWith('sk_live')) {
      resolved = 'live';
    } else if (legacy?.startsWith('sk_test')) {
      resolved = 'test';
    } else {
      resolved = process.env.DEFAULT_STRIPE_MODE?.toLowerCase() === 'live' ? 'live' : 'test';
    }
  }

  modeCache = { mode: resolved, at: Date.now() };
  lastResolvedMode = resolved;
  return resolved;
}

/** Best-effort sync mode (after at least one `getStripeMode()`), else conservative default. */
export function getActiveStripeModeSync(): StripeMode {
  return lastResolvedMode ?? 'test';
}

/** Secret key for the given mode (split env vars + legacy fallback). */
export function getStripeSecretKey(mode: StripeMode): string | undefined {
  if (mode === 'test') {
    const k = process.env.STRIPE_SECRET_KEY_TEST?.trim();
    if (k) return k;
    const leg = process.env.STRIPE_SECRET_KEY?.trim();
    if (leg?.startsWith('sk_test')) return leg;
    return undefined;
  }
  const k = process.env.STRIPE_SECRET_KEY_LIVE?.trim();
  if (k) return k;
  const leg = process.env.STRIPE_SECRET_KEY?.trim();
  if (leg?.startsWith('sk_live')) return leg;
  return undefined;
}

export function getStripePublishableKey(mode: StripeMode): string | undefined {
  if (mode === 'test') {
    const k = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_TEST?.trim();
    if (k) return k;
    const leg = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.trim();
    if (leg?.startsWith('pk_test')) return leg;
    return undefined;
  }
  const k = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_LIVE?.trim();
  if (k) return k;
  const leg = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.trim();
  if (leg?.startsWith('pk_live')) return leg;
  return undefined;
}

/** Webhook signing secrets to try (test + live + legacy). Deduped. */
export function getStripeWebhookSecrets(): string[] {
  const raw = [
    process.env.STRIPE_WEBHOOK_SECRET_LIVE?.trim(),
    process.env.STRIPE_WEBHOOK_SECRET_TEST?.trim(),
    process.env.STRIPE_WEBHOOK_SECRET?.trim(),
  ].filter(Boolean) as string[];
  return [...new Set(raw)];
}

function webhookParserStripe(): Stripe {
  const k = getStripeSecretKey('test') || getStripeSecretKey('live');
  if (!k) {
    throw new Error('Configure STRIPE_SECRET_KEY_TEST and/or STRIPE_SECRET_KEY_LIVE to verify webhooks');
  }
  return new Stripe(k);
}

/** Verify Stripe webhook body; tries each configured signing secret. */
export function constructStripeWebhookEvent(
  rawBody: string | Buffer,
  signature: string | string[] | undefined
): Stripe.Event {
  const sig = Array.isArray(signature) ? signature[0] : signature;
  if (!sig) {
    throw new Error('Missing stripe-signature header');
  }
  const parser = webhookParserStripe();
  const secrets = getStripeWebhookSecrets();
  if (secrets.length === 0) {
    throw new Error('No STRIPE_WEBHOOK_SECRET_* configured');
  }
  let lastErr: unknown;
  for (const secret of secrets) {
    try {
      return parser.webhooks.constructEvent(rawBody, sig, secret);
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error('Webhook signature verification failed');
}

export function getStripeForMode(mode: StripeMode): Stripe | null {
  const key = getStripeSecretKey(mode);
  if (!key) return null;
  if (!clients[mode]) {
    clients[mode] = new Stripe(key);
  }
  return clients[mode]!;
}

export async function getActiveStripe(): Promise<Stripe | null> {
  const mode = await getStripeMode();
  return getStripeForMode(mode);
}
