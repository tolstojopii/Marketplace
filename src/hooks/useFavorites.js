import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getFavorites, addFavorite, removeFavorite, clearFavorites } from '../api/favorites';
import useAuthStore from '../store/authStore';
import { getProductKey } from '../utils/productKey';

export const useFavoritesQuery = () => {
  const user = useAuthStore((s) => s.user);
  return useQuery({
    queryKey: ['favorites', user?.id],
    queryFn: getFavorites,
    enabled: !!user,
  });
};


export const useToggleFavorite = () => {
  const qc = useQueryClient();
  const user = useAuthStore((s) => s.user);
  const key = ['favorites', user?.id];

  return useMutation({
    mutationFn: async ({ product, action }) => {
      const productKey = getProductKey(product);
      if (action === 'remove') await removeFavorite(productKey);
      else await addFavorite(productKey, product);
      return { productKey, action };
    },
    onMutate: async ({ product, action }) => {
      await qc.cancelQueries({ queryKey: key });
      const prev = qc.getQueryData(key) || [];
      const productKey = getProductKey(product);
      qc.setQueryData(
        key,
        action === 'remove'
          ? prev.filter((f) => f.product_key !== productKey)
          : [{ product_key: productKey, product_data: product }, ...prev]
      );
      return { prev };
    },
    onError: (_e, _v, ctx) => ctx?.prev && qc.setQueryData(key, ctx.prev),
    onSettled: () => qc.invalidateQueries({ queryKey: key }),
  });
};

export const useClearFavorites = () => {
  const qc = useQueryClient();
  const user = useAuthStore((s) => s.user);
  return useMutation({
    mutationFn: clearFavorites,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['favorites', user?.id] }),
  });
};