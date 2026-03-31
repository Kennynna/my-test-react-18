import type { ReactNode } from 'react';
import { Navigate } from 'react-router';
import { useCheckAuth } from '../entities/user/api/queries.ts';

export const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { data: user, isLoading } = useCheckAuth();

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};
