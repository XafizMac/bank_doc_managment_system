import { create } from 'zustand'

type Store = {
    isAuthenticated: boolean
    setAuthenticated: () => void
}

const useStore = create<Store>()((set) => ({
    isAuthenticated: false,
    setAuthenticated: () => set((state) => ({isAuthenticated: true}))
}))