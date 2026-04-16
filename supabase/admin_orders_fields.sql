-- Optional: run in Supabase SQL Editor for admin fulfillment fields.

alter table public.orders
  add column if not exists fulfillment_status text not null default 'new';

alter table public.orders
  add column if not exists admin_notes text;

comment on column public.orders.fulfillment_status is 'Suggested values: new, processing, shipped, cancelled';
