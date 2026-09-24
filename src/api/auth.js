import { apiClient } from './client';

export const registerUser = async (userData) => {
  const { data } = await apiClient.post('/auth/register', userData);
  return data;
};

export const loginUser = async (credentials) => {
  const { data } = await apiClient.post('/auth/login', credentials);
  return data;
};

export const getCurrentUser = async () => {
  const { data } = await apiClient.get('/auth/me');
  return data;
};