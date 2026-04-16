export type AdminTicketSale = {
  id: string;
  stripe_checkout_session_id: string;
  stripe_payment_intent_id: string | null;
  stripe_environment?: string | null;
  customer_email: string | null;
  ticket_tier: string;
  quantity: number;
  unit_price_cents: number;
  amount_total_cents: number;
  currency: string;
  status: string;
  customer_details: unknown;
  created_at: string;
};
