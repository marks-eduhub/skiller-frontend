import api from "./axios";

export const login = async (formData: FormData) => {
  try {
    const response = await api.post('/api/auth/local', formData);

    if (response.status === 200) {
      const data = response.data;
      localStorage.setItem('token', data.jwt);
      localStorage.setItem('USER', JSON.stringify(data.user));
      return data;
    } else {
      throw new Error(response.statusText || 'Login failed');
    }
  } catch (error) {
    throw error;
  }
};