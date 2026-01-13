import { Tabs, Tab, Card, CardBody, Spinner } from "@heroui/react";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import RegisterForm from "@/features/auth/RegisterForm.tsx";
import LoginForm from "@/features/auth/LoginForm.tsx";
import { useAuth } from "@/shared/lib/useAuth.ts";

const Login = () => {
  const { user, isLoading } = useAuth();
  const [selectedTab, setSelectedTab] = useState<string>("login");

  if (isLoading) return <Spinner />;

  if (user) return <Navigate to="/boards" replace />;

  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="w-[350px] max-w-full">
        <CardBody className="">
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
                <RegisterForm />
              </div>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;
