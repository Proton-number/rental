import { create } from "zustand";
import { User } from "firebase/auth";

interface yorestore {
  user: User | null;
  setUser: (user: User | null) => void;
}
export const useAppStore = create<yorestore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
