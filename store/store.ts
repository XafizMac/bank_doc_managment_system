import { create } from 'zustand'

type Store = {
    user: User
    isAuthenticated: boolean
    setAuthenticated: (state: boolean) => void
    setUser: (user: User) => void
    clearUser: () => void
}

type User = {
    id: string
    login: string
    name: string
    role: string
    documents: string[]
}

export const useStore = create<Store>()((set) => ({
    user: {
        id: "",
        name: "",
        login: "",
        role: "",
        documents: []
    },
    isAuthenticated: false,
    setAuthenticated: (value) => set({isAuthenticated: value}),
    setUser: (user) => set((state) => ({ user: user })),
    clearUser: () => set({ user: { id: "", name: "", login: "", role: "", documents: [] }, isAuthenticated: false }),
}))