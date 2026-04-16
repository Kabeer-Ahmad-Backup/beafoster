'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';

type Tier = 'general' | 'vip';

export default function TicketBookButton({
  tier,
  className,
}: {
  tier: Tier;
  className?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onClick() {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/checkout/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier, quantity: 1 }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok) {
        setError(data.error ?? 'Checkout could not start');
        return;
      }
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      setError('No checkout URL returned');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full">
      <button
        type="button"
        disabled={loading}
        onClick={() => void onClick()}
        className={className}
      >
        {loading ? (
          <span className="inline-flex items-center justify-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin shrink-0" aria-hidden />
            Redirecting…
          </span>
        ) : (
          'Book Now'
        )}
      </button>
      {error && <p className="mt-2 text-left text-sm text-red-700">{error}</p>}
    </div>
  );
}
