import { message } from 'antd';
import axios from 'axios';
import { BEARER } from './constants';
import { isBrowser } from './isBrowser';

const  baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

const api = axios.create({
    baseURL: baseUrl,  
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  api.interceptors.request.use((config) => {
    const token = isBrowser() ? localStorage.getItem('token') : null;
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
  
      const { status, config, data } = error.response;
  
      if (isBrowser()) {
        if (status === 401) {
          message.warning("Unauthorized. Please log in again.");
          localStorage.removeItem("token");
          window.location.href = "/auth";
        } else if (status === 403) {
          message.error("Your session has expired. Please log in again.");
          localStorage.removeItem("token");
          window.location.href = "/auth";
        }
      }
  
      if (status === 400 && config.url?.includes("/auth/local")) {
        message.error(data.error?.message || "Invalid identifier or password.");
      } else if (status === 404) {
        message.error("Requested resource not found.");
      } else if (status >= 500) {
        message.error("Server error. Please try again later.");
      } else {
        message.error(data?.message || "An error occurred.");
      }
  
      return Promise.reject(error);
    }
  );
  
  export default api;
