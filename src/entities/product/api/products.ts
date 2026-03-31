import type { ProductsResponse, ProductsParams } from '../types.ts';

const BASE_URL = 'https://dummyjson.com';

export async function getProducts(params: ProductsParams = {}): Promise<ProductsResponse> {
  const searchParams = new URLSearchParams();

  if (params.limit) searchParams.set('limit', String(params.limit));
  if (params.skip !== undefined) searchParams.set('skip', String(params.skip));
  if (params.sortBy) searchParams.set('sortBy', params.sortBy);
  if (params.order) searchParams.set('order', params.order);

  const isSearch = Boolean(params.q);
  if (isSearch) searchParams.set('q', params.q!);

  const endpoint = isSearch
    ? `${BASE_URL}/products/search`
    : `${BASE_URL}/products`;

  const response = await fetch(`${endpoint}?${searchParams}`);

  if (!response.ok) {
    throw new Error('Ошибка загрузки товаров');
  }

  return response.json();
}
