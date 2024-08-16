import React, { ReactNode, useState, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext"
import { message } from "antd";
import { API, BEARER } from "../../lib/constants";
import { getToken } from "../../lib/helpers";
import { User } from "@/lib/types";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<User | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true); 

  const authToken = getToken();

  const fetchLoggedInUser = async (token: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API}/api/users/me`, {
        headers: { Authorization: `${BEARER} ${token}` },
      });
      const data = await response.json();

      setUserData(data);
    } catch (error) {
      console.error(error);
      message.error("Error While Getting Logged In User Details");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUser = (user: User) => {
    setUserData(user);
  };

  useEffect(() => {
    if (authToken) {
      fetchLoggedInUser(authToken);
    } else {
      setIsLoading(false); 
    }
  }, [authToken]);

  return (
    <AuthContext.Provider value={{ user: userData, setUser: handleUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
