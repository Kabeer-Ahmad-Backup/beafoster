import type { StripeMode } from '@/lib/stripeModeTypes';

export function stripePaymentsBaseForMode(mode: StripeMode): string {
  return mode === 'test'
    ? 'https://dashboard.stripe.com/test'
    : 'https://dashboard.stripe.com';
}

/** Open this PaymentIntent in the Dashboard for the given Stripe mode. */
export function stripePaymentIntentUrlForMode(
  mode: StripeMode,
  paymentIntentId: string | null | undefined
): string | null {
  if (!paymentIntentId) return null;
  return `${stripePaymentsBaseForMode(mode)}/payments/${paymentIntentId}`;
}

export function stripeCheckoutSessionWorkbenchUrlForMode(
  mode: StripeMode,
  sessionId: string | null | undefined
): string | null {
  if (!sessionId) return null;
  return `${stripePaymentsBaseForMode(mode)}/search?query=${encodeURIComponent(sessionId)}`;
}
