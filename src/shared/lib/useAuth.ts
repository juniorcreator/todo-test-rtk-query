import { useContext } from "react";
import { AuthContext } from "@/app/model/authContext.ts";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthProvider context error");
  }
  return context;
};
