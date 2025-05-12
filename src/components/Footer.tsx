import { Twitter, Facebook, Instagram } from "lucide-react";
import Link from "next/link";

function Footer() {
  return (
    <div className=" p-6 mt-12 bg-gray-50  w-full">
      <div className="flex justify-center">
        <div className="flex flex-col md:flex-row items-start justify-between gap-16 md:gap-32 max-w-5xl w-full">
          {/* Rentify Section */}
          <div>
            <h2 className="font-bold mb-2">Rentify</h2>
            <p className="font-light text-sm">
              Find & rent properties in real-time.
            </p>
          </div>

          {/* Links Section */}
          <div>
            <h2 className="font-bold mb-2">Links</h2>
            <Link href={"/"}>
              <p className="font-light text-sm cursor-pointer hover:underline">
                Explore
              </p>
            </Link>
            <p className="font-light text-sm cursor-pointer hover:underline">
              Become an Agent
            </p>
            <Link href="/contact">
              <p className="font-light text-sm cursor-pointer hover:underline">
                Contact
              </p>
            </Link>
          </div>

          {/* Follow Us Section */}
          <div>
            <h2 className="font-bold mb-2">Follow Us</h2>
            <div className="flex space-x-4">
              <Twitter className="cursor-pointer text-gray-600 hover:text-black" />
              <Facebook className="cursor-pointer text-gray-600 hover:text-black" />
              <Instagram className="cursor-pointer text-gray-600 hover:text-black" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
