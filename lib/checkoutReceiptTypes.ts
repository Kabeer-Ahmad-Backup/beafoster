export type ReceiptLine = {
  description: string;
  quantity: number;
  unit_amount_cents: number;
  line_total_cents: number;
};

export type BoutiqueReceipt = {
  source: 'boutique';
  stripe_checkout_session_id: string;
  internal_order_id: string;
  created_at: string;
  customer_email: string | null;
  currency: string;
  amount_total_cents: number;
  payment_status: string;
  fulfillment_status: string | null;
  lines: ReceiptLine[];
};

export type TicketReceipt = {
  source: 'ticket';
  stripe_checkout_session_id: string;
  internal_sale_id: string;
  created_at: string;
  customer_email: string | null;
  currency: string;
  amount_total_cents: number;
  payment_status: string;
  ticket_tier: string;
  quantity: number;
  unit_price_cents: number;
  lines: ReceiptLine[];
};

export type StripePendingReceipt = {
  source: 'stripe_pending';
  stripe_checkout_session_id: string;
  created_at: string;
  customer_email: string | null;
  currency: string;
  amount_total_cents: number;
  payment_status: string;
  lines: ReceiptLine[];
};

export type CheckoutReceiptPayload = BoutiqueReceipt | TicketReceipt | StripePendingReceipt;
