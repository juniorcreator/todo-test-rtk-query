import { useAuth } from "@/shared/lib/useAuth.ts";
import { Spinner } from "@heroui/react";
import { Navigate } from "react-router-dom";
import AuthLoginRegister from "@/widgets/auth/ui/AuthLoginRegister.tsx";

const LoginRegisterPage = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <Spinner />;

  if (user) return <Navigate to="/boards" replace />;
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <AuthLoginRegister />
    </div>
  );
};

export default LoginRegisterPage;
