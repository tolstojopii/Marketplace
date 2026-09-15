import { apiClient } from './client';

export const getProducts = async ({ category, popular, search } = {}) => {
  const params = {};
  if (category) params.category = category;
  if (popular) params.popular = 'true';
  if (search) params.search = search;

  const { data } = await apiClient.get('/products', { params });
  return data.data.products;
};