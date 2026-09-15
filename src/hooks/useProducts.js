import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../api/products';

export const useProducts = (filters = {}) => {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => getProducts(filters),
    staleTime: 5 * 60 * 1000,
  });
};