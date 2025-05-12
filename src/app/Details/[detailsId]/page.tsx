"use client";

import { Listings } from "@/components/Listing";
import { useParams } from "next/navigation";

function Detail() {
  const { detailsId } = useParams();
  const listing = Listings.find((item) => item.id === Number(detailsId));
  if (!listing) {
    return <div className="p-6 text-red-500">Listing not found.</div>;
  }
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">{listing.title}</h1>
      <p className="text-gray-700 mb-4">{listing.description}</p>
      <p className="text-lg font-semibold mb-1">{listing.price}</p>
      <p className="text-gray-500">{listing.location}</p>
    </div>
  );
}

export default Detail;
