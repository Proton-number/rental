import Link from "next/link";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Listings } from "./Listing";
function Featured() {
  return (
    <div>
      <h3 className=" text-2xl font-bold mb-2">Featured Listings</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        {Listings.map((listing, id) => (
          <Card
            key={id}
            className="bg-white shadow-lg rounded-lg p-4 flex flex-col "
          >
            <div className="w-full h-48 bg-gray-200 mb-4 rounded-lg"></div>
            <h2 className="text-xl font-bold ">{listing.title}</h2>
            <p className="text-gray-500  text-sm">{listing.description}</p>
            <p className="text-gray-700 font-semibold">{listing.price}</p>
            <p className="text-gray-500">{listing.location}</p>
            <Link href={`/Details/${listing.id}`}>
              <Button
                variant="outline"
                className="rounded-full font-semibold bg-black text-white cursor-pointer"
              >
                View Details
              </Button>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Featured;
