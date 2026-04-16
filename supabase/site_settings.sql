-- Site-wide settings (Stripe mode, etc.). Read/write via service role from server only.

create table if not exists public.site_settings (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;

-- Default: test mode (safe until you switch in admin).
insert into public.site_settings (key, value)
values ('stripe_mode', 'test')
on conflict (key) do nothing;

-- Track which Stripe environment created each order (for admin + API).
alter table public.orders
  add column if not exists stripe_environment text;

comment on column public.orders.stripe_environment is 'test or live — set by webhook from event.livemode';
