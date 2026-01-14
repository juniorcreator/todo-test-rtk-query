import { useState } from "react";
import { useAuth } from "@/shared/lib/useAuth.ts";
import { Card, CardBody, Spinner, Tab, Tabs } from "@heroui/react";
import { Navigate } from "react-router-dom";
import LoginForm from "@/features/auth/login/ui/LoginForm.tsx";
import RegisterForm from "@/features/auth/register/ui/RegisterForm.tsx";

const AuthLoginRegister = () => {
  const { user, isLoading } = useAuth();
  const [selectedTab, setSelectedTab] = useState<string>("login");

  if (isLoading) return <Spinner />;
  if (user) return <Navigate to="/boards" replace />;

  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="w-[350px] max-w-full">
        <CardBody className="p-6">
          <Tabs
            size="md"
            fullWidth
            selectedKey={selectedTab}
            onSelectionChange={(key) => setSelectedTab(key as string)}
          >
            <Tab key="login" title="Login">
              <div className="pt-3">
                <LoginForm />
              </div>
            </Tab>
            <Tab key="register" title="Register">
              <div className="pt-3">
                <RegisterForm onSuccess={() => setSelectedTab("login")} />
              </div>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
};

export default AuthLoginRegister;
