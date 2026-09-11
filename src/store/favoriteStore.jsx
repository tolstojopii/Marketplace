import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useFavoritesStore = create(
  persist(
    (set, get) => ({
      items: [],

      toggleFavorite: (product)=>{
        const items = get().items
        const exists = items.some(item => item.id === product.id )
        if(exists){
          set({items: items.filter(item=> item.id !== product.id)})
        }else{
          set({items: [...items, product]})
        }
      },
      
      isFavorite: (productId) => {
        return get().items.some((item) => item.id === productId);
      },

      removeFavorite: (productId) => {
        set({ items: get().items.filter((item) => item.id !== productId) });
      },

      clearFavorites: () => set({ items: [] }),

      getCount: () => get().items.length,
    }),
    {
      name: 'favorites-storage', 
    }
  )
);

export default useFavoritesStore;