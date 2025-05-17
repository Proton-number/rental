import { auth, googleProvider, db } from "@/config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  User,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { create } from "zustand";

interface SIGNIN {
  role: string;
  setRole: (val: string) => void;
  name: string;
  setName: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  phoneNumber: string;
  setPhoneNumber: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  signInWithGoogle: () => Promise<User | null>;
  createAccount: () => Promise<User | null>;
  user: User | null;
  setUser: (user: User | null) => void;
  error: string | null;
}
export const signupStore = create<SIGNIN>((set, get) => ({
  role: "tenant",
  setRole: (val) => set({ role: val }),
  name: "",
  setName: (val) => set({ name: val }),
  email: "",
  setEmail: (val) => set({ email: val }),
  phoneNumber: "",
  setPhoneNumber: (val) => set({ phoneNumber: val }),
  password: "",
  setPassword: (val) => set({ password: val }),
  user: null,
  setUser: (user) => set({ user }),

  error: null,

  signInWithGoogle: async (): Promise<User | null> => {
    set({ error: null });
    const { role, phoneNumber } = get();
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Save to Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        role: role || "tenant",
        phoneNumber: phoneNumber || "",
        createdAt: new Date().toISOString(),
      });

      set({ user });
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

  createAccount: async (): Promise<User | null> => {
    const { name, email, phoneNumber, password, role } = get();
    // Regular expressions for validations
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[0-9]{7,15}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (
      !name.trim() ||
      !emailRegex.test(email) ||
      !phoneRegex.test(phoneNumber) ||
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
      //saving additional details to firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name,
        email,
        phoneNumber,
        role,
        createdAt: new Date().toISOString(),
      });
      set({ user });
      console.log("User created:", result.user);
      console.log("Google user data saved to Firestore:", user);
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
