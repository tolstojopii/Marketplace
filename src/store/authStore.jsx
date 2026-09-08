import { create } from "zustand";
import { loginUser, getCurrentUser, registerUser } from "../api/auth";

const useAuthStore = create((set, get) => ({
  user: null,
  token: localStorage.getItem("token") || null,
  loading: true,
  error: null,

  checkAuth: async () => {
    const token = get().token;
    if (!token) {
      set({ loading: false });
      return;
    }
    try {
      const response = await getCurrentUser();
      set({
        user: response.data.user,
        token: token,
        loading: false,
      });
    } catch {
      localStorage.removeItem("token");
      set({ loading: false, user: null, token: null });
    }
  },

  login: async (email, password) => {
    try {
      const response = await loginUser({ email, password });
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      set({ user, token });
    } catch (err) {
      set({ error: err.message });
      throw err;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },

  register: async (email, password, full_name) => {
    const response = await registerUser({ full_name, email, password });
    if (response.success) {
      const loginResponse = await loginUser({ email, password });
      const { token, user } = loginResponse.data;
      localStorage.setItem("token", token);
      set({ user, token });
    }
    return response;
  },
}));
export default useAuthStore;
