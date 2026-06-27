import { create } from 'zustand';

const useAuthStore = create((set) => ({
    user : null,
    isAuthenticated: false,

    setAuth: (user) => set({ user, isAuthenticated: true}),
    clearAuth: () => set({ user: null, isAuthenticated: false}),
}))

export default useAuthStore