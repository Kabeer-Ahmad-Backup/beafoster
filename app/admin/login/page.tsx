'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || '/admin';

  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/admin/session');
        if (!cancelled && res.ok) {
          router.replace(from.startsWith('/admin') ? from : '/admin');
        }
      } finally {
        if (!cancelled) setChecking(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [from, router]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? 'Login failed');
        return;
      }
      router.push(from.startsWith('/admin') ? from : '/admin');
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  if (checking) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-4 text-sm text-charcoal/50">
        Checking session…
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-1px)] flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-beige bg-white/95 p-8 shadow-lg shadow-stone-900/5 ring-1 ring-black/[0.03] backdrop-blur-sm sm:p-10">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold">Admin</p>
        <h1 className="mt-2 font-serif text-2xl text-charcoal sm:text-3xl">Boutique orders</h1>
        <p className="mt-2 text-sm text-charcoal/55">Use the password from your environment (e.g. Admin_Pass).</p>
        <form onSubmit={(e) => void onSubmit(e)} className="mt-8 space-y-4">
          <label className="block">
            <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-charcoal/50">Password</span>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-beige bg-cream/50 px-4 py-3 text-charcoal placeholder:text-charcoal/35 focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/25"
              required
            />
          </label>
          {error && <p className="text-sm font-medium text-red-700">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-charcoal py-3 font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
        <p className="mt-8 text-center text-sm text-charcoal/50">
          <Link href="/" className="text-charcoal/65 transition-colors hover:text-gold">
            ← Back to site
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center text-sm text-charcoal/50">Loading…</div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
