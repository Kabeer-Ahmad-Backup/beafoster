export type AdminOrderItem = {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price_cents: number;
  size: string | null;
  image_url: string | null;
};

export type AdminOrder = {
  id: string;
  stripe_checkout_session_id: string;
  stripe_payment_intent_id: string | null;
  /** Set by webhook from `event.livemode` */
  stripe_environment?: string | null;
  customer_email: string | null;
  amount_total_cents: number;
  currency: string;
  status: string;
  fulfillment_status?: string | null;
  admin_notes?: string | null;
  customer_details: unknown;
  shipping_details: unknown;
  created_at: string;
  order_items?: AdminOrderItem[];
};
