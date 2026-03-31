import type { ProductsResponse, ProductsParams } from '../types.ts';
import { API_URL } from '../../../shared/config/index.ts';


export async function getProducts(params: ProductsParams = {}): Promise<ProductsResponse> {
  const searchParams = new URLSearchParams();

  if (params.limit) searchParams.set('limit', String(params.limit));
  if (params.skip !== undefined) searchParams.set('skip', String(params.skip));
  if (params.sortBy) searchParams.set('sortBy', params.sortBy);
  if (params.order) searchParams.set('order', params.order);

  const isSearch = Boolean(params.q);
  if (isSearch) searchParams.set('q', params.q!);

  const endpoint = isSearch ? API_URL.products.search : API_URL.products.list;

  const response = await fetch(`${endpoint}?${searchParams}`);

  if (!response.ok) {
    throw new Error('Ошибка загрузки товаров');
  }

  return response.json();
}
