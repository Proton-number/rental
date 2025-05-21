"use client";

import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import React, { useEffect, useCallback } from "react";
import { useAppStore } from "@/store/appStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ErrorMessage from "@/components/ErrorMessage";
export default function ForgotPassword() {
  const router = useRouter();
  const { resetEmail, setResetEmail, resetHandler, resetError } = useAppStore();

  const resetButton = useCallback(async () => {
    const success = await resetHandler();
    if (success) {
      setTimeout(() => {
        setResetEmail("");
        router.push("/login");
      }, 2000);
    }
  }, [resetHandler, setResetEmail, router]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        resetButton();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [resetButton]);

  return (
    <div className="flex flex-col justify-center items-center p-4 min-h-screen">
      <Card className="w-full max-w-sm p-4 md:p-6 shadow-md">
        <div className="flex flex-col items-center mb-4">
          <h1 className="text-2xl font-extrabold text-gray-900">
            Forgot your password ?
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Enter your email address and we will send you a link to reset your
            password.
          </p>
        </div>
        <Input
          type="email"
          placeholder="Enter your Email Address"
          value={resetEmail}
          onChange={(e) => setResetEmail(e.target.value)}
        />
        <ErrorMessage message={resetError} />
        <Button
          onClick={resetButton}
          className="bg-emerald-500 hover:bg-emerald-700 cursor-pointer w-full mt-4"
        >
          Reset Password
        </Button>
      </Card>
    </div>
  );
}
