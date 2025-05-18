import { auth } from "@/config/firebase";
import { useAppStore } from "@/store/appStore";
import { onAuthStateChanged } from "firebase/auth";

let initialized = false;

export function initAuthListener() {
  if (initialized) return; // prevent multiple subscriptions
  initialized = true;

  onAuthStateChanged(auth, (user) => {
    useAppStore.getState().setUser(user);
  });
}
