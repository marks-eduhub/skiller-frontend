import { message } from 'antd';
import axios from 'axios';
import { BEARER } from './constants';

const  baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

const api = axios.create({
    baseURL: baseUrl,  
    headers: {
      'Content-Type': 'application/json',
    },
  });
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `${BEARER} ${token}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (!error.response) {
        message.error("Network error. Please check your connection.");
        return Promise.reject(error);
      }
  
      const { status } = error.response;
  
      if (status === 401) {
        message.warning("Unauthorized. Please log in again.");
        localStorage.removeItem("token");
        window.location.href = "/auth";
      } else if (status === 403) {
        message.error("Your session has expired. Please log in again.");
        localStorage.removeItem("token");
        window.location.href = "/auth";
      } else if (status === 404) {
        message.error("Requested resource not found.");
      } else if (status >= 500) {
        message.error("Server error. Please try again later.");
      } else {
        message.error(error.response.data?.message || "An error occurred.");
      }
  
      return Promise.reject(error);
    }
  );
  export default api;
