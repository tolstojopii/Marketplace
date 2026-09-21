import { apiClient } from './client';

export const getProducts = async ({
  category,
  popular,
  search,
  sort,
  page,
  limit,
} = {}) => {
  const params = {};
  if (category) params.category = category;
  if (popular) params.popular = 'true';
  if (search) params.search = search;
  if (sort) params.sort = sort;
  if (page) params.page = page;
  if (limit) params.limit = limit;

  const { data } = await apiClient.get('/products', { params });
  return data.data; 
};

export const createProduct = async (productData) => {
  const { data } = await apiClient.post('/products', productData);
  return data.data.product;
};