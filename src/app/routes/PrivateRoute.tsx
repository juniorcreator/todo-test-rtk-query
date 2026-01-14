import { useAuth } from "@/shared/lib/useAuth.ts";
import { Navigate, Outlet } from "react-router";

const PrivateRoute = () => {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
