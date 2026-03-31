const base = import.meta.env.VITE_API_BASE_URL;

/** Полные URL для запросов к DummyJSON */
export const API_URL = {
  auth: {
    login: `${base}/auth/login`,
    me: `${base}/auth/me`,
    refresh: `${base}/auth/refresh`,
  },
  products: {
    list: `${base}/products`,
    search: `${base}/products/search`,
  },
} as const;
