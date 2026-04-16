'use client';

import { Fragment, useMemo, useState } from 'react';
import { ChevronDown, ChevronRight, FileStack } from 'lucide-react';
import type { AdminCheckoutDraft } from '@/lib/adminCheckoutDraftTypes';

function money(cents: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);
}

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function draftTotalCents(d: AdminCheckoutDraft) {
  return d.line_items.reduce((s, li) => s + li.unitPriceCents * li.quantity, 0);
}

export default function AdminCheckoutDraftsSection({ drafts }: { drafts: AdminCheckoutDraft[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  const sorted = useMemo(
    () => [...drafts].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
    [drafts]
  );

  if (sorted.length === 0) {
    return (
      <section className="rounded-xl border border-dashed border-beige bg-white/60 p-8 text-center shadow-sm">
        <FileStack className="mx-auto h-9 w-9 text-charcoal/25" aria-hidden />
        <h2 className="mt-3 font-serif text-lg text-charcoal">Checkout drafts</h2>
        <p className="mx-auto mt-2 max-w-lg text-sm text-charcoal/55">
          No in-progress checkouts. Drafts appear when a customer starts Stripe checkout; they are removed when
          payment completes or if session creation fails.
        </p>
      </section>
    );
  }

  return (
    <section>
      <div className="mb-4 max-w-3xl">
        <h2 className="font-serif text-xl text-charcoal sm:text-2xl">Checkout drafts</h2>
        <p className="mt-1 text-sm text-charcoal/55">
          Carts saved when checkout begins (before Stripe confirms). Expand a row for line items and draft id.
        </p>
      </div>
      <div className="overflow-x-auto rounded-xl border border-beige bg-white/95 shadow-sm">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-beige bg-stone-50/80 text-xs uppercase tracking-wider text-charcoal/50">
              <th className="w-10 p-3" />
              <th className="p-3">Created</th>
              <th className="p-3">Lines</th>
              <th className="p-3">Est. total</th>
              <th className="p-3">Draft id</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((draft) => {
              const open = openId === draft.id;
              const total = draftTotalCents(draft);
              return (
                <Fragment key={draft.id}>
                  <tr className="border-b border-beige/80 transition-colors hover:bg-cream/50">
                    <td className="p-2">
                      <button
                        type="button"
                        onClick={() => setOpenId(open ? null : draft.id)}
                        className="rounded p-1.5 text-charcoal/45 hover:bg-beige/50 hover:text-charcoal"
                        aria-expanded={open}
                      >
                        {open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                      </button>
                    </td>
                    <td className="whitespace-nowrap p-3 text-charcoal/80">{formatDate(draft.created_at)}</td>
                    <td className="p-3 text-charcoal">{draft.line_items.length}</td>
                    <td className="p-3 font-medium tabular-nums text-charcoal">{money(total)}</td>
                    <td className="max-w-[200px] truncate p-3 font-mono text-xs text-charcoal/60" title={draft.id}>
                      {draft.id}
                    </td>
                  </tr>
                  {open && (
                    <tr className="border-b border-beige bg-stone-50/90">
                      <td colSpan={5} className="p-4 sm:p-6">
                        <div className="grid gap-6 lg:grid-cols-2">
                          <div>
                            <h3 className="text-xs font-medium uppercase tracking-wider text-charcoal/45">
                              Line items
                            </h3>
                            <ul className="mt-2 divide-y divide-beige rounded-md border border-beige bg-white">
                              {draft.line_items.map((li, idx) => (
                                <li
                                  key={`${li.productId}-${idx}`}
                                  className="flex flex-wrap items-start justify-between gap-2 p-3 text-charcoal"
                                >
                                  <div className="min-w-0">
                                    <p className="font-medium">{li.name}</p>
                                    <p className="mt-0.5 text-xs text-charcoal/50">
                                      SKU {li.productId}
                                      {li.size && li.size !== 'One size' ? ` · ${li.size}` : ''} × {li.quantity}
                                    </p>
                                  </div>
                                  <span className="shrink-0 tabular-nums text-sm text-charcoal/70">
                                    {money(li.unitPriceCents * li.quantity)}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="space-y-3 text-sm">
                            <h3 className="text-xs font-medium uppercase tracking-wider text-charcoal/45">Details</h3>
                            <dl className="grid gap-2 text-charcoal">
                              <div>
                                <dt className="text-charcoal/50">Draft UUID</dt>
                                <dd className="break-all font-mono text-xs">{draft.id}</dd>
                              </div>
                              <div>
                                <dt className="text-charcoal/50">Stripe metadata</dt>
                                <dd className="text-xs text-charcoal/65">
                                  Sent as <code className="rounded bg-beige/60 px-1">draft_id</code> and{' '}
                                  <code className="rounded bg-beige/60 px-1">client_reference_id</code> on the Checkout
                                  Session until paid or abandoned.
                                </dd>
                              </div>
                            </dl>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
