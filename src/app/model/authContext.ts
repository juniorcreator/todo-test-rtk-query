import { createContext } from "react";
import type { IAuthContextValue } from "@/app/model/types.ts";

export const AuthContext = createContext<IAuthContextValue | undefined>(
  undefined,
);
