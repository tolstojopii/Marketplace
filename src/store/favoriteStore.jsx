import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getProductKey } from "../utils/productKey";

const useFavoritesStore = create(
  persist(
    (set, get) => ({
      items: [],

      toggleFavorite: (product) => {
        const key = getProductKey(product);
        const items = get().items;

        const exists = items.some((i) => getProductKey(i) === key);
        if (exists) {
          set({ items: items.filter((i) => getProductKey(i) === key) });
        } else {
          set({ items: [...items, product] });
        }
      },

      isFavorite: (productKey) => {
        return get().items.some((i) => getProductKey(i) === productKey);
      },

      removeFavorite: (productKey) => {
        set({ items: get().items.filter((i) => getProductKey(i) === productKey) });
      },

      clearFavorites: () => set({ items: [] }),

      getCount: () => get().items.length,
    }),
    {
      name: "favorites-storage",
    },
  ),
);

export default useFavoritesStore;
