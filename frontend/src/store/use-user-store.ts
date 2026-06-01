import { create } from "zustand";
import { persist } from "zustand/middleware";

export type User = {
  name: string;
  photoUrl: string;
  url: string;
};

type UserState = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "desafio-user-storage",
    }
  )
);