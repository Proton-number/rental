import Link from "next/link";
import { Button } from "./ui/button";
function Hero() {
  return (
    <div className="bg-gradient-to-r from-emerald-500 to-emerald-700 text-white p-12 sm:p-24 md:p-36 rounded-2xl mb-12 flex flex-col items-center justify-center ">
      <div className="  space-y-10  text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Find Your Dream Home in Real-Time
        </h1>
        <p className="text-lg mb-6">
          Live listings, instant chat, and seamless rent management — all in one
          place.
        </p>

        <Link href={"/listings"}>
          <Button className="cursor-pointer rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition duration-300 text-lg p-6">
            {" "}
            Start Exploring Here
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Hero;
