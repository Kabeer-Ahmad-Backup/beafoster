'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export default function AdminTopBar() {
  const router = useRouter();

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-30 border-b border-beige bg-white/90 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-white/80">
      <div className="container-luxury flex flex-wrap items-center justify-between gap-3 px-4 py-3.5 sm:px-0">
        <div className="flex min-w-0 flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3">
          <Link
            href="/admin"
            className="font-serif text-lg text-charcoal transition-colors hover:text-gold sm:text-xl"
          >
            Boutique admin
          </Link>
          <span className="hidden text-xs uppercase tracking-wider text-charcoal/50 sm:inline">Orders & Stripe</span>
        </div>
        <nav className="flex flex-wrap items-center gap-1 text-sm sm:gap-2">
          <Link
            href="/"
            className="rounded-md px-3 py-1.5 text-charcoal/70 transition-colors hover:bg-cream hover:text-charcoal"
          >
            Site home
          </Link>
          <Link
            href="/boutique"
            className="rounded-md px-3 py-1.5 text-charcoal/70 transition-colors hover:bg-cream hover:text-charcoal"
          >
            Boutique
          </Link>
          <button
            type="button"
            onClick={() => void logout()}
            className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-charcoal/70 transition-colors hover:bg-cream hover:text-charcoal"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            Log out
          </button>
        </nav>
      </div>
    </header>
  );
}
