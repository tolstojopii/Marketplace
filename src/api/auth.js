import { apiClient } from './client';

export const registerUser = async (userData) => {
  try {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error.errors ? error : error.response?.data || { message: 'Сетевая ошибка' };
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw error.errors ? error : error.response?.data || { message: 'Сетевая ошибка' };
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await apiClient.get('/auth/me');
    return response.data;
  } catch (error) {
    throw error.errors ? error : error.response?.data || { message: 'Сетевая ошибка' };
  }
};