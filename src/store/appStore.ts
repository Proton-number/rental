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
  savedListings: string[];
  setSavedListings: (listings: string[]) => void;
  getSavedListings: () => Promise<void>;
  saveListing: (listingId: string) => Promise<void>;
  removeSavedListing: (listingId: string) => Promise<void>;
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

  savedListings: [],
  setSavedListings: (listings) => set({ savedListings: listings }),

  saveListing: async (listingId: string) => {
    const { user } = get();
    if (!user) {
      set({ registerError: "User not authenticated" });
      return;
    }

    try {
      const listingRef = doc(db, "users", user.uid, "savedListings", listingId);
      await setDoc(listingRef, { listingId });
      console.log("Listing saved successfully");
    } catch (error) {
      console.error("Error saving listing:", error);
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
      const listingRef = doc(db, "users", user.uid, "savedListings", listingId);
      await deleteDoc(listingRef);
      console.log("Listing removed successfully");
    } catch (error) {
      console.error("Error removing listing:", error);
      set({ registerError: "Failed to remove listing" });
    }
  },

  getSavedListings: async () => {
    const { user } = get();
    if (!user) {
      set({ registerError: "User not authenticated" });
      return;
    }

    try {
      const savedListingsRef = collection(
        db,
        "users",
        user.uid,
        "savedListings"
      );
      const snapshot = await getDocs(savedListingsRef);
      const savedListings = snapshot.docs.map((doc) => doc.data().listingId);
      set({ savedListings });
      console.log("Saved listings retrieved successfully");
    } catch (error) {
      console.error("Error retrieving saved listings:", error);
      set({ registerError: "Failed to retrieve saved listings" });
    }
  },
}));
