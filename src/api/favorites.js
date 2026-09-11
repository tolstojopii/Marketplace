import { apiClient } from './client';

export const getFavorites = async () => {
  const { data } = await apiClient.get('/favorites');
  return data.data.items;
};
export const addFavorite = async (productKey, product) => {
  const { data } = await apiClient.post('/favorites', { productKey, product });
  return data.data.item;
};
export const removeFavorite = async (productKey) => {
  await apiClient.delete(`/favorites/${encodeURIComponent(productKey)}`);
};
export const clearFavorites = async () => {
  await apiClient.delete('/favorites');
};