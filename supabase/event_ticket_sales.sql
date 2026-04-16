-- Run in Supabase SQL Editor. Gala ticket Stripe checkouts (see /api/checkout/tickets + webhook).

create table if not exists public.event_ticket_drafts (
  id uuid primary key default gen_random_uuid(),
  line_items jsonb not null,
  created_at timestamptz not null default now()
);

create index if not exists event_ticket_drafts_created_at on public.event_ticket_drafts (created_at desc);

create table if not exists public.event_ticket_sales (
  id uuid primary key default gen_random_uuid(),
  stripe_checkout_session_id text not null unique,
  stripe_payment_intent_id text,
  stripe_environment text,
  customer_email text,
  ticket_tier text not null,
  quantity integer not null check (quantity > 0 and quantity <= 99),
  unit_price_cents integer not null,
  amount_total_cents integer not null,
  currency text not null default 'usd',
  status text not null default 'paid',
  customer_details jsonb,
  created_at timestamptz not null default now(),
  constraint event_ticket_sales_tier_chk check (ticket_tier in ('general', 'vip'))
);

create index if not exists event_ticket_sales_created_at on public.event_ticket_sales (created_at desc);

alter table public.event_ticket_drafts enable row level security;
alter table public.event_ticket_sales enable row level security;
