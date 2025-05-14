import api from "@/lib/axios";

export const requestPasswordReset = async (email: string) => {
    try {
      const response = await api.post("/api/auth/forgot-password", { email });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  


  export const confirmPasswordReset = async (
    password: string,
    passwordConfirmation: string,
    code: string | null
  ) => {
    try {
      const response = await api.post("/api/auth/reset-password", {
        code,
        password,
        passwordConfirmation,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  