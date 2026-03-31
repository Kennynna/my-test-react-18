import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { loginRequest, getMeRequest, refreshTokenRequest } from './auth.ts';
import { useAuthStore } from '../model/store.ts';
import type { LoginRequest, User } from '../types.ts';

const USER_QUERY_KEY = ['auth', 'user'] as const;

function extractUser(data: User): User {
  return {
    id: data.id,
    username: data.username,
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    gender: data.gender,
    image: data.image,
  };
}

export function useLoginMutation() {
  const { setUser, setTokens } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    
    mutationFn: (credentials: LoginRequest) => loginRequest(credentials),
    
    onSuccess: (data) => {
      
      setTokens(data.accessToken, data.refreshToken);
      setUser(extractUser(data));
      queryClient.setQueryData(USER_QUERY_KEY, extractUser(data));
    },
    
  });
}

export function useCheckAuth() {
  const { setUser, logout, getAccessToken, getRefreshToken, setTokens } = useAuthStore();

  return useQuery({
    
    queryKey: USER_QUERY_KEY,
    queryFn: async (): Promise<User | null> => {
      const accessToken = getAccessToken();
      const refreshToken = getRefreshToken();

      if (!accessToken && !refreshToken) {
        return null;
      }

      try {
        if (accessToken) {
          return extractUser(await getMeRequest(accessToken));
        }
      } catch {
        /* accessToken истёк, пробуем refresh ниже */
      }

      if (refreshToken) {
        try {
          const data = await refreshTokenRequest(refreshToken);
          setTokens(data.accessToken, data.refreshToken);
          return extractUser(data);
        } catch {
          logout();
          return null;
        }
      }

      return null;
    },
    onSuccess: (user: User | null) => {
      if (user) {
        setUser(user);
      } else {
        logout();
      }
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  } as Parameters<typeof useQuery<User | null>>[0]);
}

export function useLogout() {
  const { logout } = useAuthStore();
  const queryClient = useQueryClient();

  return () => {
    logout();
    queryClient.removeQueries({ queryKey: USER_QUERY_KEY });
  };
}
