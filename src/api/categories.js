import { apiClient } from './client';

export const getCategories = async () => {
  const { data } = await apiClient.get('/categories');
  return data.data.categories;
};