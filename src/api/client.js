import axios from 'axios';

export const API_BASE =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const apiClient = axios.create({ baseURL: API_BASE });

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  (r) => r,
  (err) => {
    if (!err.response) {
      const error = new Error('Не удалось связаться с сервером');
      error.status = 0;
      return Promise.reject(error);
    }

    const body = err.response.data;

    let message = 'Произошла ошибка';

    if (typeof body === 'string' && body.trim()) {
      message = body;
    } else if (body && typeof body === 'object') {
      if (Array.isArray(body.errors) && body.errors.length) {
        message = body.errors
          .map((e) => (typeof e === 'string' ? e : e.msg || e.message))
          .join(', ');
      } else if (body.message) {
        message = body.message;
      }
    }

    const error = new Error(message);
    error.status = err.response.status;
    error.body = body;

    if (err.response.status === 401) {
      const url = err.config?.url || '';
      const isAuthEndpoint =
        url.includes('/auth/login') || url.includes('/auth/register');
      if (!isAuthEndpoint) {
        localStorage.removeItem('token');
      }
    }

    return Promise.reject(error);
  }
);