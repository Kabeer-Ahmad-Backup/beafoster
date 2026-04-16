'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { StripeMode } from '@/lib/stripeModeTypes';

type KeysInfo = {
  test_secret_configured: boolean;
  live_secret_configured: boolean;
  test_publishable_configured: boolean;
  live_publishable_configured: boolean;
};

function KeyStatusDot({ ok }: { ok: boolean }) {
  return (
    <span
      className={`inline-block h-2 w-2 shrink-0 rounded-full ${ok ? 'bg-emerald-600 shadow-[0_0_6px_rgba(5,150,105,0.35)]' : 'bg-stone-300'}`}
      title={ok ? 'Configured' : 'Missing'}
    />
  );
}

export default function StripeModeSettings({
  initialMode,
  initialKeys,
}: {
  initialMode: StripeMode;
  initialKeys: KeysInfo;
}) {
  const router = useRouter();
  const [mode, setMode] = useState<StripeMode>(initialMode);
  const [keys] = useState(initialKeys);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  async function save() {
    setSaving(true);
    setMessage(null);
    setError(null);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stripe_mode: mode }),
      });
      const data = (await res.json()) as { error?: string; stripe_mode?: StripeMode };
      if (!res.ok) {
        setError(data.error ?? 'Save failed');
        return;
      }
      setMessage(`Checkout now uses Stripe ${data.stripe_mode ?? mode} mode.`);
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="rounded-xl border border-beige bg-gradient-to-b from-amber-50/90 via-white to-cream/40 p-5 shadow-md sm:p-6">
      <h2 className="font-serif text-lg text-charcoal">Stripe environment</h2>
      <p className="mt-2 text-sm leading-relaxed text-charcoal/65">
        Storefront checkout uses one key pair at a time. Secrets and publishable keys come from env; this control only
        switches the active pair. Use separate webhook signing secrets in Stripe (
        <code className="rounded bg-beige/80 px-1 py-0.5 font-mono text-charcoal/90">STRIPE_WEBHOOK_SECRET_TEST</code> /{' '}
        <code className="rounded bg-beige/80 px-1 py-0.5 font-mono text-charcoal/90">STRIPE_WEBHOOK_SECRET_LIVE</code>).
      </p>

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
        <div
          className="inline-flex rounded-lg border border-beige bg-stone-100/80 p-1"
          role="group"
          aria-label="Stripe mode"
        >
          <button
            type="button"
            onClick={() => setMode('test')}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              mode === 'test'
                ? 'bg-gold text-black shadow-sm'
                : 'text-charcoal/55 hover:bg-white hover:text-charcoal'
            }`}
          >
            Test
          </button>
          <button
            type="button"
            onClick={() => setMode('live')}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              mode === 'live'
                ? 'bg-gold text-black shadow-sm'
                : 'text-charcoal/55 hover:bg-white hover:text-charcoal'
            }`}
          >
            Live
          </button>
        </div>
        <button
          type="button"
          disabled={saving || mode === initialMode}
          onClick={() => void save()}
          className="rounded-lg bg-charcoal px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 sm:ml-0"
        >
          {saving ? 'Saving…' : 'Apply changes'}
        </button>
      </div>

      <div className="mt-5 space-y-2 rounded-lg border border-beige bg-white/80 p-3 text-xs text-charcoal/65">
        <p className="mb-2 font-medium uppercase tracking-wider text-charcoal/45">Key status</p>
        <div className="flex items-center gap-2 font-mono">
          <KeyStatusDot ok={keys.test_secret_configured} /> <span>Secret (test)</span>
        </div>
        <div className="flex items-center gap-2 font-mono">
          <KeyStatusDot ok={keys.live_secret_configured} /> <span>Secret (live)</span>
        </div>
        <div className="flex items-center gap-2 font-mono">
          <KeyStatusDot ok={keys.test_publishable_configured} /> <span>Publishable (test)</span>
        </div>
        <div className="flex items-center gap-2 font-mono">
          <KeyStatusDot ok={keys.live_publishable_configured} /> <span>Publishable (live)</span>
        </div>
      </div>

      {mode === 'live' && (
        <p className="mt-4 text-sm text-amber-900/85">
          Live mode charges real cards. Double-check your Stripe Dashboard and webhook endpoints before switching.
        </p>
      )}

      {message && <p className="mt-3 text-sm font-medium text-emerald-800">{message}</p>}
      {error && <p className="mt-3 text-sm font-medium text-red-700">{error}</p>}
    </section>
  );
}
