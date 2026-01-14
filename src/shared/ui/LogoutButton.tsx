import { Button } from "@heroui/react";
import { useContext } from "react";
import { AuthContext } from "@/app/model/authContext.ts";

const LogoutButton = () => {
  const authContext = useContext(AuthContext);

  return (
    <Button
      className="text-white font-bold"
      size="sm"
      onPress={authContext?.logout}
      color="primary"
      variant="bordered"
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
