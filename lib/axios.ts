import { message } from 'antd';
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:1337', 
    headers: {
      'Content-Type': 'application/json',
    },
  });
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  api.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 403) {
        message.error("Your session has expired, you need to login again for data access");
        localStorage.removeItem('access_token');
        localStorage.removeItem('amr_user_roles');
        window.location.href = '/auth'; 
      }
      return Promise.reject(error);
    }
  );
  export default api;
