import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCart, addCartItem, updateCartItem, removeCartItem, clearCart } from '../api/cart';
import useAuthStore from '../store/authStore';
import { getProductKey } from '../utils/productKey';

export const useCartQuery = () => {
  const user = useAuthStore((s) => s.user);
  return useQuery({
    queryKey: ['cart', user?.id],
    queryFn: getCart,
    enabled: !!user,
  });
};

export const useAddToCart = () => {
  const qc = useQueryClient();
  const user = useAuthStore((s) => s.user);
  const key = ['cart', user?.id];

  return useMutation({
    mutationFn: ({ product, quantity = 1 }) =>
      addCartItem(getProductKey(product), product, quantity),
    onMutate: async ({ product, quantity = 1 }) => {
      await qc.cancelQueries({ queryKey: key });
      const prev = qc.getQueryData(key) || [];
      const productKey = getProductKey(product);
      const existing = prev.find((i) => i.product_key === productKey);
      const next = existing
        ? prev.map((i) =>
            i.product_key === productKey ? { ...i, quantity: i.quantity + quantity } : i
          )
        : [...prev, { product_key: productKey, product_data: product, quantity }];
      qc.setQueryData(key, next);
      return { prev };
    },
    onError: (_e, _v, ctx) => ctx?.prev && qc.setQueryData(key, ctx.prev),
    onSettled: () => qc.invalidateQueries({ queryKey: key }),
  });
};

export const useUpdateCartQuantity = () => {
  const qc = useQueryClient();
  const user = useAuthStore((s) => s.user);
  const key = ['cart', user?.id];

  return useMutation({
    mutationFn: ({ productKey, quantity }) => updateCartItem(productKey, quantity),
    onMutate: async ({ productKey, quantity }) => {
      await qc.cancelQueries({ queryKey: key });
      const prev = qc.getQueryData(key) || [];
      const next = prev
        .map((i) => (i.product_key === productKey ? { ...i, quantity } : i))
        .filter((i) => i.quantity > 0);
      qc.setQueryData(key, next);
      return { prev };
    },
    onError: (_e, _v, ctx) => ctx?.prev && qc.setQueryData(key, ctx.prev),
    onSettled: () => qc.invalidateQueries({ queryKey: key }),
  });
};

export const useRemoveFromCart = () => {
  const qc = useQueryClient();
  const user = useAuthStore((s) => s.user);
  const key = ['cart', user?.id];

  return useMutation({
    mutationFn: (productKey) => removeCartItem(productKey),
    onMutate: async (productKey) => {
      await qc.cancelQueries({ queryKey: key });
      const prev = qc.getQueryData(key) || [];
      qc.setQueryData(key, prev.filter((i) => i.product_key !== productKey));
      return { prev };
    },
    onError: (_e, _v, ctx) => ctx?.prev && qc.setQueryData(key, ctx.prev),
    onSettled: () => qc.invalidateQueries({ queryKey: key }),
  });
};

export const useClearCart = () => {
  const qc = useQueryClient();
  const user = useAuthStore((s) => s.user);
  return useMutation({
    mutationFn: clearCart,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['cart', user?.id] }),
  });
};