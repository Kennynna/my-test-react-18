import type { ReactNode } from "react";
import { Navigate } from "react-router";
import { useCheckAuth } from "../entities/user/index.ts";
import { Spinner } from "../ui/index.ts";

export const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { data: user, isLoading } = useCheckAuth();

  if (isLoading) {
    return (
      <div className="container">
        <Spinner />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};
