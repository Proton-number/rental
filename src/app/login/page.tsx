"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLoginStore } from "@/store/loginStore";
import { signupStore } from "@/store/signupStore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { useAppStore } from "@/store/appStore";
import ErrorMessage from "@/components/ErrorMessage";

function Login() {
  const router = useRouter();

  const { signInWithGoogle } = signupStore();
  const { SignIn, email, setEmail, password, setPassword } = useLoginStore();
  const { loginError } = useAppStore();

  const handleGoogleLogin = async () => {
    const user = await signInWithGoogle();
    console.log("Google user logged in is:", user);
    if (user) {
      router.push("/listings");
    }
  };

  const handleSignIn = async () => {
    const user = await SignIn();
    console.log("Google user logged in is:", user);
    if (user) {
      router.push("/listings");
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex flex-col justify-center items-center mt-6 md:mt-12 mb-6 md:mb-12 p-4">
      <Card className="w-full max-w-sm p-4 md:p-6 shadow-md">
        <h1 className="font-bold text-xl md:text-2xl text-center mb-4">
          Sign in to Rentify
        </h1>
        <Button
          onClick={handleGoogleLogin}
          className="cursor-pointer w-full bg-white text-gray-800 border border-gray-300 hover:bg-gray-100 text-sm md:text-base"
        >
          <Image
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            width={20}
            height={20}
            className=" mr-2"
          />
          Sign in with Google
        </Button>
        <div className="flex items-center my-3 md:my-4">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="mx-2 text-xs md:text-sm text-gray-400">or</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>
        <div className="space-y-3">
          <Input
            placeholder="Email address"
            value={email}
            aria-label="Email"
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
              size={"icon"}
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
          <ErrorMessage message={loginError} />
        </div>
        <Button
          onClick={handleSignIn}
          className="w-full mt-3 bg-emerald-600 text-white p-2 md:p-3 rounded-md hover:bg-emerald-700 transition text-sm md:text-base font-medium cursor-pointer"
        >
          Sign In
        </Button>
        <div>
          <Link href={"/forgetpassword"}>
            <p className="text-center text-xs md:text-sm text-gray-600 ">
              Forget Password ?
            </p>
          </Link>
          <p className="text-center text-xs md:text-sm text-gray-600 mt-4 md:mt-6">
            Don&apos;t have an account?{" "}
            <Link href={"/signup"}>
              <span className="text-emerald-600 font-medium cursor-pointer">
                Sign Up
              </span>
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}

export default Login;
