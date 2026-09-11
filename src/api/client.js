import axios from 'axios';

export const API_BASE = 'http://localhost:5000/api';
export const apiClient = axios.create({ baseURL: API_BASE });

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  (r) => r,
  (err) => Promise.reject(err.response?.data || { message: 'Сетевая ошибка' })
);