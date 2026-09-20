import { apiClient } from './client';

export const getProducts = async ({ category, popular, search, sort } = {}) => {
  const params = {};
  if (category) params.category = category;
  if (popular) params.popular = 'true';
  if (search) params.search = search;
  if(sort) params.sort = sort;

  const { data } = await apiClient.get('/products', { params });
  return data.data.products;
};