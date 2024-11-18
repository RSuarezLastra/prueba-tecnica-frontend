import axios, { InternalAxiosRequestConfig } from 'axios';

const api_url = import.meta.env.VITE_API_DEV;

export const apiClient = axios.create({
  baseURL: api_url
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    config.headers = config.headers || {};

    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-token'] = token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);