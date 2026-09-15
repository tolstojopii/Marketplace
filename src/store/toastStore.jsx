import { create } from 'zustand';

let nextId = 1;

const useToastStore = create((set, get) => ({
  toasts: [],

  show: (message, { type = 'success', duration = 2500 } = {}) => {
    const id = nextId++;
    set((s) => ({
      toasts: [...s.toasts, { id, message, type }],
    }));

    setTimeout(() => {
      get().dismiss(id);
    }, duration);

    return id;
  },

  dismiss: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),

  success: (msg, opts) => get().show(msg, { ...opts, type: 'success' }),
  error: (msg, opts) => get().show(msg, { ...opts, type: 'error' }),
  info: (msg, opts) => get().show(msg, { ...opts, type: 'info' }),
}));

export default useToastStore;