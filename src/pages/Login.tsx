import { Tabs, Tab, Card, CardBody, Button } from "@heroui/react";
import { useState } from "react";
import RegisterForm from "@/features/auth/RegisterForm.tsx";
import LoginForm from "@/features/auth/LoginForm.tsx";
import { api } from "@/shared/api/mock.ts";

const Login = () => {
  const [selectedTab, setSelectedTab] = useState<string>("login");
  console.log(selectedTab);

  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="w-[350px] h-[400px] max-w-full">
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
          <Button onPress={api.logout}>Logout</Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;
