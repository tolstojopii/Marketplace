import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

const apiClient = axios.create({
  baseURL: API_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "сетевая ошибка" };
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "сетевая ошибка" };
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await apiClient.get("/me");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Сетевая ошибка" };
  }
};