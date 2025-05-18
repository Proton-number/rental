import { Listings } from "@/components/Listing";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
function Properties() {
  return (
    <div className="p-4">
      {/* Top part */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input placeholder="Search location or property" className="flex-1" />
        <Input
          placeholder="Price Range (e.g., 1000 -2000)"
          className="flex-1"
        />
        <Input placeholder="Number of Rooms" className="flex-1" />
        <Button className="cursor-pointer">Filter</Button>
      </div>
      {/* Properties */}
      <>
        <h2 className="text-2xl font-semibold mb-4">Available Properties</h2>

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
      </>
    </div>
  );
}

export default Properties;
