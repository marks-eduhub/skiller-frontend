
export const login = async (formData: FormData) => {
  
    try {
      const response = await fetch('http://localhost:1337/api/auth/local', {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
  
      if (response.ok) {
         localStorage.setItem('token', data.jwt);
        localStorage.setItem('USER', JSON.stringify(data.user));
        return data;
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  
  };