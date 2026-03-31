import { create } from 'zustand';
import type { User } from '../types.ts';
import { getCookie, setCookie, removeCookie } from '../../../shared/lib/cookies.ts';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

function detectRememberMe(): boolean {
  if (getCookie(ACCESS_TOKEN_KEY) || getCookie(REFRESH_TOKEN_KEY)) return true;
  return false;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  rememberMe: boolean;
}

interface AuthActions {
  setUser: (user: User) => void;
  setRememberMe: (value: boolean) => void;
  logout: () => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  getAccessToken: () => string | null;
  getRefreshToken: () => string | null;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isAuthenticated: false,
  rememberMe: detectRememberMe(),

  setUser: (user) => {
    set({ user, isAuthenticated: true });
  },

  setRememberMe: (value) => {
    set({ rememberMe: value });
  },

  logout: () => {
    removeCookie(ACCESS_TOKEN_KEY);
    removeCookie(REFRESH_TOKEN_KEY);
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    set({ user: null, isAuthenticated: false });
  },

  setTokens: (accessToken, refreshToken) => {
    removeCookie(ACCESS_TOKEN_KEY);
    removeCookie(REFRESH_TOKEN_KEY);
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);

    if (get().rememberMe) {
      setCookie(ACCESS_TOKEN_KEY, accessToken, { expires: 1 });
      setCookie(REFRESH_TOKEN_KEY, refreshToken, { expires: 30 });
    } else {
      sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      sessionStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    }
  },

  getAccessToken: () =>
    getCookie(ACCESS_TOKEN_KEY) ?? sessionStorage.getItem(ACCESS_TOKEN_KEY),

  getRefreshToken: () =>
    getCookie(REFRESH_TOKEN_KEY) ?? sessionStorage.getItem(REFRESH_TOKEN_KEY),
}));
