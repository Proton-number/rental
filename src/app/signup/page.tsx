"use client";

import ErrorMessage from "@/components/ErrorMessage";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAppStore } from "@/store/appStore";
import { signupStore } from "@/store/signupStore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

function SignUp() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const {
    role,
    setRole,
    email,
    setEmail,
    name,
    setName,
    password,
    setPassword,
    signInWithGoogle,
    createAccount,
  } = signupStore();
  const { registerError } = useAppStore();

  const handleGoogleSignIn = async () => {
    const user = await signInWithGoogle();
    console.log("Google user:", user);
    if (user) {
      router.push("/listings");
    }
  };

  const handleEmailAndPassword = async () => {
    const user = await createAccount();
    if (user) {
      router.push("/listings");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center p-4 md:p-16 mt-6 md:mt-12 mb-6 md:mb-12">
      <Card className="w-full max-w-[384px] p-4 md:p-6 shadow-md">
        <h1 className="font-bold text-xl md:text-2xl text-center mb-4">
          Create your Rentify account
        </h1>
        <Button
          onClick={handleGoogleSignIn}
          className="cursor-pointer w-full bg-white text-gray-800 border border-gray-300 hover:bg-gray-100"
        >
          <Image
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            width={20}
            height={20}
            className="mr-2"
          />
          Sign in with Google
        </Button>
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="mx-2 text-sm text-gray-400">or</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>
        <div className="space-y-3">
          <Input
            placeholder="Full Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Email address"
            aria-label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="relative">
            <Input
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-label="Password"
              minLength={8}
              required
            />
            <Button
              size="icon"
              variant="ghost"
              onClick={togglePasswordVisibility}
              className=" cursor-pointer absolute right-1 top-0.5 text-gray-500 hover:text-gray-700 transition-colors hover:bg-transparent"
              aria-label={showPassword ? "Hide password" : "Show password"}
              type="button"
            >
              {showPassword ? (
                <EyeClosed size={20} aria-hidden="true" />
              ) : (
                <Eye size={20} aria-hidden="true" />
              )}
            </Button>
          </div>

          <ErrorMessage message={registerError} />
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 my-3">
          <Button
            onClick={() => setRole("tenant")}
            className={`w-full sm:w-auto cursor-pointer transition ${
              role === "tenant"
                ? "bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700 hover:text-white"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            I&apos;m a Tenant
          </Button>
          <Button
            onClick={() => setRole("agent")}
            className={`w-full sm:w-auto cursor-pointer transition ${
              role === "agent"
                ? "bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700 hover:text-white"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            I&apos;m an Agent
          </Button>
        </div>
        <Button
          onClick={handleEmailAndPassword}
          className="w-full bg-emerald-600 text-white p-3 rounded-md hover:bg-emerald-700 transition text-base font-medium cursor-pointer"
        >
          Create Account
        </Button>
        <p className="text-center text-sm text-gray-600 mt-3">
          Already have an account?{" "}
          <Link href="/login">
            <span className="text-emerald-600 font-bold cursor-pointer">
              Sign In
            </span>
          </Link>
        </p>
      </Card>
    </div>
  );
}

export default SignUp;
