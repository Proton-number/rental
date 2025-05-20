import { create } from "zustand";
import { User, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/config/firebase";

interface APPSTORE {
  user: User | null;
  setUser: (user: User | null) => void;
  registerError: string | null;
  setRegisterError: (error: string | null) => void;
  loginError: string | null;
  setLoginError: (error: string | null) => void;
  resetError: string | null;
  setResetError: (error: string | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  resetEmail: string;
  setResetEmail: (email: string) => void;
  resetHandler: () => Promise<boolean>;
}
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const useAppStore = create<APPSTORE>((set, get) => ({
  user: null,
  setUser: (user) => set({ user }),
  registerError: null,
  setRegisterError: (registerError) => set({ registerError }),
  loginError: null,
  setLoginError: (loginError) => set({ loginError }),
  resetError: null,
  setResetError: (resetError) => set({ resetError }),

  loading: false,
  setLoading: (loading) => set({ loading }),
  resetEmail: "",
  setResetEmail: (email) => set({ resetEmail: email }),

  resetHandler: async () => {
    set({ loading: true, resetError: null });
    const { resetEmail } = get(); // Access current state value of resetEmail
    if (!resetEmail || !emailRegex.test(resetEmail)) {
      set({
        loading: false,
        resetError: "Please enter a valid email address.",
      });
      return false;
    }
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      set({ loading: false, resetError: null, resetEmail: "" });
      return true;
    } catch (error) {
      console.error("Error sending password reset email:", error);
      set({
        loading: false,
        resetError: "Failed to send password reset email. Please try again.",
      });
      return false;
    }
  },
}));
