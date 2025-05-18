import { create } from "zustand";
import { auth } from "@/config/firebase";
import { signInWithEmailAndPassword, User, signOut } from "firebase/auth";
import { useAppStore } from "./appStore";

interface LOGIN {
  email: string;
  setEmail: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  error: string | null;
  SignIn: () => Promise<User | null>;
  logOut: () => Promise<void>;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

export const useLoginStore = create<LOGIN>((set, get) => ({
  email: "",
  setEmail: (val) => set({ email: val.trim() }),

  password: "",
  setPassword: (val) => set({ password: val }),
  error: null,

  SignIn: async (): Promise<User | null> => {
    try {
      const { email, password } = get();

      if (!email || !password) {
        set({ error: "Email and password are required" });
        return null;
      }

      if (!emailRegex.test(email)) {
        set({ error: "Please enter a valid email address" });
        return null;
      }

      if (!passwordRegex.test(password)) {
        set({
          error:
            "Password must contain at least 8 characters, including uppercase, lowercase, numbers and special characters",
        });
        return null;
      }

      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;

      useAppStore.getState().setUser(user);

      set({ error: null });
      return user;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      set({ error: errorMessage });
      return null;
    }
  },

  logOut: async () => {
    try {
      await signOut(auth);
      useAppStore.getState().setUser(null);
      set({ email: "", password: "", error: null });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      set({ error: errorMessage });
    }
  },
}));
