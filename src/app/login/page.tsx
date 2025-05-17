import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
function Login() {
  return (
    <div className="flex flex-col justify-center items-center mt-6 md:mt-12 mb-6 md:mb-12 p-4">
      <Card className="w-full max-w-sm p-4 md:p-6 shadow-md">
        <h1 className="font-bold text-xl md:text-2xl text-center mb-4">
          Sign in to Rentify
        </h1>
        <Button className="cursor-pointer w-full bg-white text-gray-800 border border-gray-300 hover:bg-gray-100 text-sm md:text-base">
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
          <Input placeholder="Email address" />
          <Input placeholder="Password" type="password" />
        </div>
        <Button className="w-full mt-3 bg-emerald-600 text-white p-2 md:p-3 rounded-md hover:bg-emerald-700 transition text-sm md:text-base font-medium cursor-pointer">
          Sign In
        </Button>
        <div>
          <p className="text-center text-xs md:text-sm text-gray-600 ">
            Forget Password ?
          </p>
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
