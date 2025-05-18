"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Menu, X, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useAppStore } from "@/store/appStore";
import { useLoginStore } from "@/store/loginStore";
import { useRouter } from "next/navigation";

function Nav() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const { user } = useAppStore();
  const { logOut } = useLoginStore();
  const router = useRouter();
  // Close the mobile menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogOut = async () => {
    await logOut();
    router.push("/");
  };

  return (
    <>
      {/* Desktop Navbar */}
      <div className="flex justify-between items-center p-4 bg-white shadow-md sticky top-0 z-10">
        <Link href={"/"}>
          <h1 className="font-bold text-3xl">Rentify</h1>
        </Link>

        {/* Menu icon for mobile */}
        <div className="md:hidden">
          <Menu
            onClick={() => setIsMobileOpen(true)}
            className="cursor-pointer"
          />
        </div>

        {/* Desktop Buttons */}
        <div className="space-x-4 hidden md:flex">
          {!user ? (
            <>
              <Link href="/login">
                <Button variant="link" className="cursor-pointer">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="link" className="cursor-pointer">
                  Sign Up
                </Button>
              </Link>
            </>
          ) : (
            ""
          )}
          {user && (
            <>
              <Link href={"/listings"}>
                <Button variant="link" className="cursor-pointer">
                  Listings
                </Button>
              </Link>
              <Link href={"/saved"}>
                <Button variant="link" className="cursor-pointer">
                  Saved
                </Button>
              </Link>
              <Link href={"/messages"}>
                <Button variant="link" className="cursor-pointer">
                  Messages
                </Button>
              </Link>
              <Link href={"/notifications"}>
                <Button variant="link" className="cursor-pointer">
                  Notifications
                </Button>
              </Link>
              <Link href={"/profile"}>
                <Button variant="link" className="cursor-pointer">
                  Profile
                </Button>
              </Link>
              <Button
                onClick={handleLogOut}
                size={"icon"}
                variant={"link"}
                className="cursor-pointer"
              >
                <LogOut />
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Navbar */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            ref={navRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-64 sm:w-90 bg-white shadow-lg flex flex-col  space-y-6 p-4 z-20 md:hidden"
          >
            <X
              onClick={() => setIsMobileOpen(false)}
              className="cursor-pointer items-end"
            />
            {!user && (
              <>
                <Link href="/login">
                  <Button variant="link" className="cursor-pointer w-full">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button variant="link" className="cursor-pointer w-full">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
            {user && (
              <>
                <Link href={"/listings"}>
                  <Button variant="link" className="cursor-pointer">
                    Listings
                  </Button>
                </Link>
                <Link href={"/saved"}>
                  <Button variant="link" className="cursor-pointer">
                    Saved
                  </Button>
                </Link>
                <Link href={"/messages"}>
                  <Button variant="link" className="cursor-pointer">
                    Messages
                  </Button>
                </Link>
                <Link href={"/notifications"}>
                  <Button variant="link" className="cursor-pointer">
                    Notifications
                  </Button>
                </Link>
                <Link href={"/profile"}>
                  <Button variant="link" className="cursor-pointer">
                    Profile
                  </Button>
                </Link>
                <Button
                  onClick={handleLogOut}
                  size={"icon"}
                  variant={"link"}
                  className="cursor-pointer"
                >
                  <LogOut />
                </Button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Nav;
