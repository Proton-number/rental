import { Button } from "./ui/button";
import { Input } from "./ui/input";

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

        <Input
          placeholder="Search by city, area, or property..."
          className="rounded-full p-6 text-lg w-full max-w-lg bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-300 mx-auto"
          type="text"
          name="search"
          id="search"
        />
        <Button className="cursor-pointer rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition duration-300 text-lg p-6">
          {" "}
          Start Exploring Here
        </Button>
      </div>
    </div>
  );
}

export default Hero;
