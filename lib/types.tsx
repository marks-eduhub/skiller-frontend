import { createContext } from "react";

export interface User {
    email: string;
    password: string;
    username: string;
    // gender: string;
    // birthDate: string;
  }
  
  export interface RegisterResponse {
    jwt: string;
    user: {
      id: string;
      username: string;
      email: string;
    };
  }
  export interface AuthContextType {
    user: User | undefined;
    setUser: (user: User) => void;
    isLoading: boolean;
  }
  
  export const AuthContext = createContext<AuthContextType>({
    user: undefined,
    setUser: () => {}, 
    isLoading: false,
  });