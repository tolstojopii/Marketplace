import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getProductKey } from "../utils/productKey";

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (product) => {
        const key = getProductKey(product);
        const items = get().items;
        const existing = items.find((i) => getProductKey(i) === key);

        if (existing) {
          set({
            items: items.map((i) =>
              getProductKey(i) === key ? { ...i, quantity: i.quantity + 1 } : i,
            ),
          });
        } else {
          set({ items: [...items, { ...product, quantity: 1 }] });
        }
      },

      removeFromCart: (productKey) => {
        set({
          items: get().items.filter((i) => getProductKey(i) === productKey),
        });
      },

      incrementQuantity: (productId) => {
        set({
          items: get().items.map((i) =>
            i.id === productId
              ? { ...i, quantity: i.quantity + 1 }
              : i,
          ),
        });
      },

      decrementQuantity: (productKey) => {
        const item = get().items.find((i) => getProductKey(i) === productKey);
        if(!item) return;

        if (item.quantity === 1) {
          get().removeFromCart(productKey);
        } else {
          set({
            items: get().items.map((i) =>
              getProductKey(i) === productKey
                ? { ...i, quantity: i.quantity - 1 }
                : i,
            ),
          });
        }
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0,
        );
      },
    }),
    {
      name: "cart-storage", // ключ в localStorage
    },
  ),
);

export default useCartStore;
