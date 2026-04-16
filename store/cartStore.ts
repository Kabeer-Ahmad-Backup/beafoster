import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  lineId: string;
  productId: string;
  name: string;
  priceCents: number;
  image: string;
  quantity: number;
  size?: string;
  category?: string;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: {
    productId: string;
    name: string;
    priceCents: number;
    image: string;
    size?: string;
    category?: string;
  }) => void;
  removeItem: (lineId: string) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

function makeLineId(productId: string, size?: string) {
  return `${productId}::${size ?? 'os'}`;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (item) => {
        const lineId = makeLineId(item.productId, item.size);
        const existing = get().items.find((i) => i.lineId === lineId);
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.lineId === lineId ? { ...i, quantity: i.quantity + 1 } : i
            ),
          });
        } else {
          set({
            items: [
              ...get().items,
              {
                lineId,
                productId: item.productId,
                name: item.name,
                priceCents: item.priceCents,
                image: item.image,
                quantity: 1,
                size: item.size,
                category: item.category,
              },
            ],
          });
        }
      },
      removeItem: (lineId) => {
        set({ items: get().items.filter((i) => i.lineId !== lineId) });
      },
      updateQuantity: (lineId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(lineId);
        } else {
          set({
            items: get().items.map((i) =>
              i.lineId === lineId ? { ...i, quantity } : i
            ),
          });
        }
      },
      clearCart: () => {
        set({ items: [] });
      },
      toggleCart: () => {
        set({ isOpen: !get().isOpen });
      },
      openCart: () => {
        set({ isOpen: true });
      },
      closeCart: () => {
        set({ isOpen: false });
      },
      getTotal: () => {
        return (
          get().items.reduce(
            (total, item) => total + item.priceCents * item.quantity,
            0
          ) / 100
        );
      },
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'bea-foster-cart-v2',
    }
  )
);
