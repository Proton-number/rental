import { auth, googleProvider, db } from "@/config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  User,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { create } from "zustand";
import { useAppStore } from "./appStore";

interface SIGNIN {
  role: string;
  setRole: (val: string) => void;
  name: string;
  setName: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  signInWithGoogle: () => Promise<User | null>;
  createAccount: () => Promise<User | null>;
  error: string | null;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

export const signupStore = create<SIGNIN>((set, get) => ({
  role: "tenant",
  setRole: (val) => set({ role: val }),
  name: "",
  setName: (val) => set({ name: val }),
  email: "",
  setEmail: (val) => set({ email: val }),
  password: "",
  setPassword: (val) => set({ password: val }),
  error: null,

  signInWithGoogle: async (): Promise<User | null> => {
    set({ error: null });
    const { role } = get();

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      if (!user) throw new Error("No user returned");

      const docRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(docRef);

      if (!userSnap.exists()) {
        await setDoc(docRef, {
          uid: user.uid,
          email: user.email || "",
          name: user.displayName || "",
          role: role || "tenant",
          createdAt: new Date().toISOString(),
        });
      }

      useAppStore.getState().setUser(user);
      return user;
    } catch (error: unknown) {
      console.error("Google sign-in failed:", error);
      if (error instanceof Error) {
        set({ error: error.message });
      } else {
        set({ error: "An unknown error occurred" });
      }
      return null;
    }
  },

  createAccount: async (): Promise<User | null> => {
    const { name, email, password, role } = get();

    if (
      !name.trim() ||
      !emailRegex.test(email) ||
      !passwordRegex.test(password)
    ) {
      alert("Please enter right details");
      return null;
    }

    set({ error: null });

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = result.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name,
        email,
        role,
        createdAt: new Date().toISOString(),
      });

      useAppStore.getState().setUser(user);

      console.log("User created:", user);
      return user;
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message });
      } else {
        set({ error: "An unknown error occurred" });
      }
      return null;
    }
  },
}));
