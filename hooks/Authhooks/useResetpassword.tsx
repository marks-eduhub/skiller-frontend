import api from "@/lib/axios";

export const requestPasswordReset = async (email: string) => {
    try {
      const response = await api.post("/api/auth/request-reset", { email });
      return response.data;
    } catch (error) {
      throw error;
    }
  };



  export const confirmPasswordReset = async (
    password: string,
    passwordConfirmation: string,
    token: string | null
  ) => {
    try {
      const response = await api.post("/api/auth/reset-password", {
        token,
        password,
        passwordConfirmation,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };