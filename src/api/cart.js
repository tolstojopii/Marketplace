import { apiClient } from './client';

export const getCart = async () => {
  const { data } = await apiClient.get('/cart');
  return data.data.items;
};
export const addCartItem = async (productKey, product, quantity = 1) => {
  const { data } = await apiClient.post('/cart', { productKey, product, quantity });
  return data.data.item;
};
export const updateCartItem = async (productKey, quantity) => {
  const { data } = await apiClient.patch(`/cart/${encodeURIComponent(productKey)}`, { quantity });
  return data.data.item;
};
export const removeCartItem = async (productKey) => {
  await apiClient.delete(`/cart/${encodeURIComponent(productKey)}`);
};
export const clearCart = async () => {
  await apiClient.delete('/cart');
};