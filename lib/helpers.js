export const getToken = () => {
  if (typeof window !== 'undefined') {
return localStorage.getItem("token");
  }
};

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const logout = () => {
  localStorage.clear();
}