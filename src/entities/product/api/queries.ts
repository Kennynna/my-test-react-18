import { useQuery } from '@tanstack/react-query';
import { getProducts } from './products.ts';
import type { ProductsParams } from '../types.ts';

const PRODUCTS_QUERY_KEY = ['products'] as const;

export function useProducts(params: ProductsParams = {}) {
  return useQuery({
    queryKey: [...PRODUCTS_QUERY_KEY, params],
    queryFn: () => getProducts(params),
  });
}
