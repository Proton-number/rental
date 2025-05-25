import Link from "next/link";
import { Button } from "./ui/button";

function Started() {
  return (
    <div className="bg-gray-200 rounded-2xl flex flex-col items-center justify-center p-12 space-y-10">
      <h3 className="px-6 text-2xl font-bold mb-2">
        Are you an Agent or Landlord?
      </h3>
      <p className="mt-5 text-gray-500  text-sm">
        List your properties and connect with potential tenants instantly!
      </p>
      <Link href={"/signup"}>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 cursor-pointer">
          Get Started
        </Button>
      </Link>
    </div>
  );
}

export default Started;
