import { create } from "zustand";
import { User, sendPasswordResetEmail } from "firebase/auth";
import { auth, db } from "@/config/firebase";
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";

interface APPSTORE {
  user: User | null; // Firebase User object or null
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
  savedListings: string[];
  setSavedListings: (listings: string[]) => void;
  getSavedListings: () => Promise<void>;
  saveListing: (listingId: string) => Promise<void>;
  removeSavedListing: (listingId: string) => Promise<void>;
}
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const useAppStore = create<APPSTORE>((set, get) => ({
  // User state
  user: null,
  setUser: (user) => set({ user }),

  // Error states
  registerError: null,
  loginError: null,
  resetError: null,
  setRegisterError: (registerError) => set({ registerError }),
  setLoginError: (loginError) => set({ loginError }),
  setResetError: (resetError) => set({ resetError }),

  // UI states
  loading: false,
  setLoading: (loading) => set({ loading }),

  // Password reset
  resetEmail: "",
  setResetEmail: (email) => set({ resetEmail: email }),
  resetHandler: async () => {
    const { resetEmail } = get();
    set({ loading: true, resetError: null });

    if (!resetEmail || !emailRegex.test(resetEmail)) {
      set({ loading: false, resetError: "Please enter a valid email address." });
      return false;
    }

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      set({ loading: false, resetError: null, resetEmail: "" });
      return true;
    } catch (error) {
      set({
        loading: false,
        resetError: "Failed to send password reset email. Please try again.",
      });
      console.error("Password reset error:", error);
      return false;
    }
  },

  // Saved listings
  savedListings: [],
  setSavedListings: (listings) => set({ savedListings: listings }),

  getSavedListings: async () => {
    const { user } = get();
    if (!user) {
      set({ registerError: "User not authenticated" });
      return;
    }

    try {
      const snapshot = await getDocs(
        collection(db, "users", user.uid, "savedListings")
      );
      const listings = snapshot.docs.map((doc) => doc.data().listingId);
      set({ savedListings: listings });
    } catch (error) {
      console.error("Fetch saved listings error:", error);
      set({ registerError: "Failed to retrieve saved listings" });
    }
  },

  saveListing: async (listingId: string) => {
    const { user } = get();
    if (!user) {
      set({ registerError: "User not authenticated" });
      return;
    }

    try {
      await setDoc(
        doc(db, "users", user.uid, "savedListings", listingId),
        { listingId }
      );
    } catch (error) {
      console.error("Save listing error:", error);
      set({ registerError: "Failed to save listing" });
    }
  },

  removeSavedListing: async (listingId: string) => {
    const { user } = get();
    if (!user) {
      set({ registerError: "User not authenticated" });
      return;
    }

    try {
      await deleteDoc(doc(db, "users", user.uid, "savedListings", listingId));
    } catch (error) {
      console.error("Remove listing error:", error);
      set({ registerError: "Failed to remove listing" });
    }
  },
}));
