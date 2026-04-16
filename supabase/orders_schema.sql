-- Run in Supabase SQL Editor (or via migration).
-- Orders are written only from the server (Stripe webhook) using the service role key.

create table if not exists public.checkout_drafts (
  id uuid primary key default gen_random_uuid(),
  line_items jsonb not null,
  created_at timestamptz not null default now()
);

create index if not exists checkout_drafts_created_at on public.checkout_drafts (created_at);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  stripe_checkout_session_id text not null unique,
  stripe_payment_intent_id text,
  customer_email text,
  amount_total_cents integer not null,
  currency text not null default 'usd',
  status text not null default 'paid',
  customer_details jsonb,
  shipping_details jsonb,
  created_at timestamptz not null default now()
);

create index if not exists orders_created_at on public.orders (created_at desc);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  product_id text not null,
  product_name text not null,
  quantity integer not null check (quantity > 0),
  unit_price_cents integer not null,
  size text,
  image_url text
);

create index if not exists order_items_order_id on public.order_items (order_id);

alter table public.checkout_drafts enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- No public policies: only service role (bypasses RLS) inserts from API routes / webhook.
