import axios, { InternalAxiosRequestConfig } from 'axios';


export const apiClient = axios.create({
  baseURL: 'https://prueba-tecnica-backend-phi.vercel.app/api'
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