import useAuthStore from '../store/authStore';
import useCartStore from '../store/cartStore';
import {
  useCartQuery, useAddToCart, useUpdateCartQuantity,
  useRemoveFromCart, useClearCart,
} from './useCart';
import { getProductKey } from '../utils/productKey';

export const useCartItems = () => {
  const user = useAuthStore((s) => s.user);
  const serverQuery = useCartQuery();
  const localItems = useCartStore((s) => s.items);

  if (user) {
    return (serverQuery.data || []).map((i) => ({
      ...i.product_data,
      product_key: i.product_key,
      quantity: i.quantity,
    }));
  }
  return localItems.map((i) => ({ ...i, product_key: getProductKey(i) }));
};

export const useCartActions = () => {
  const user = useAuthStore((s) => s.user);
  const addServer = useAddToCart();
  const updateServer = useUpdateCartQuantity();
  const removeServer = useRemoveFromCart();
  const clearServer = useClearCart();

  const addLocal = useCartStore((s) => s.addToCart);
  const incLocal = useCartStore((s) => s.incrementQuantity);
  const decLocal = useCartStore((s) => s.decrementQuantity);
  const removeLocal = useCartStore((s) => s.removeFromCart);
  const clearLocal = useCartStore((s) => s.clearCart);

  if (user) {
    return {
      add: (product, qty = 1) => addServer.mutate({ product, quantity: qty }),
      setQuantity: (productKey, quantity) =>
        updateServer.mutate({ productKey, quantity }),
      remove: (productKey) => removeServer.mutate(productKey),
      clear: () => clearServer.mutate(),
    };
  }

  return {
    add: (product, qty = 1) => {
      for (let i = 0; i < qty; i++) addLocal(product);
    },
    setQuantity: (productKey, quantity) => {
      const item = useCartStore.getState().items.find(
        (i) => getProductKey(i) === productKey
      );
      if (!item) return;
      if (quantity <= 0) return removeLocal(item.id);
      const diff = quantity - item.quantity;
      if (diff > 0) for (let i = 0; i < diff; i++) incLocal(item.id);
      else for (let i = 0; i < -diff; i++) decLocal(item.id);
    },
    remove: (productKey) => {
      const item = useCartStore.getState().items.find(
        (i) => getProductKey(i) === productKey
      );
      if (item) removeLocal(item.id);
    },
    clear: clearLocal,
  };
};

export const useCartTotal = () => {
  const items = useCartItems();
  return {
    count: items.reduce((s, i) => s + i.quantity, 0),
    price: items.reduce((s, i) => s + i.price * i.quantity, 0),
  };
};