import { createContext, useContext } from "react";
import { User } from "@/lib/types";

export const AuthContext = createContext<{
  user: User | undefined;
  setUser: (user: User) => void;
  isLoading: boolean;
} | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
