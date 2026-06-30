import { create } from 'zustand'

const useThemeStore = create((set) => ({
    theme: localStorage.getItem('theme') || 'dark',

    toggleTheme : () => 
        set((state) => {
            const next = state.theme === 'dark' ? 'light' : 'dark'
            localStorage.setItem('theme', next)
            document.documentElement.setAttribute('data-theme', next)
            return{ theme: next }
        })
}))          

export default useThemeStore;