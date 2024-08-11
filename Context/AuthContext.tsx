import { createContext, useContext } from "react";
import { User } from "@/lib/types";

export const AuthContext = createContext<{
  user: User | undefined;
  setUser: (user: User) => void;
  isLoading: boolean;
} | undefined>(undefined);
export const useAuthContext = () => useContext(AuthContext);