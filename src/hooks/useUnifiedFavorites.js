import useAuthStore from '../store/authStore';
import useFavoritesStore from '../store/favoriteStore';
import { useFavoritesQuery, useToggleFavorite } from './useFavorites';
import { useQueryClient } from '@tanstack/react-query';
import { getProductKey } from '../utils/productKey';

export const useFavoriteItems = () => {
  const user = useAuthStore((s) => s.user);
  const serverQuery = useFavoritesQuery();
  const localItems = useFavoritesStore((s) => s.items);

  if (user) {
    return (serverQuery.data || []).map((f) => ({
      ...f.product_data,
      product_key: f.product_key,
    }));
  }
  return localItems.map((i) => ({ ...i, product_key: getProductKey(i) }));
};

export const useFavoriteToggle = () => {
  const user = useAuthStore((s) => s.user);
  const qc = useQueryClient();
  const serverToggle = useToggleFavorite();
  const localToggle = useFavoritesStore((s) => s.toggleFavorite);

  return (product) => {
    if (!user) {
      localToggle(product);
      return;
    }
    const key = ['favorites', user.id];
    const current = qc.getQueryData(key) || [];
    const productKey = getProductKey(product);
    const isFav = current.some((f) => f.product_key === productKey);

    serverToggle.mutate({ product, action: isFav ? 'remove' : 'add' });
  };
};

export const useIsFavorite = (product) => {
  const items = useFavoriteItems();
  const key = getProductKey(product);
  return items.some((i) => i.product_key === key);
};