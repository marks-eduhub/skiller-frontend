import React, { ReactNode, useState, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { message } from "antd";
import { BEARER } from "../../lib/constants";
import { getToken } from "../../lib/helpers";
import { User } from "@/lib/types";
import api from "@/lib/axios";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<User | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const authToken = getToken();

  const fetchLoggedInUser = async (token: string) => {
    setIsLoading(true);
    try {
      const response = await api.get('/api/users/me', {
        headers: { Authorization: `${BEARER} ${token}` },
      });

      setUserData(response.data); 
    } catch (error) {
      message.error("Error while getting logged-in user details");
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
