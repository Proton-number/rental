"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { sanityStore } from "@/store/sanityStore";
import { useEffect } from "react";
import Image from "next/image";
function Featured() {
  const { properties, fetchFeaturedListings } = sanityStore();
  useEffect(() => {
    fetchFeaturedListings();
  }, [fetchFeaturedListings]);

  return (
    <div>
      <h3 className=" text-2xl font-bold mb-2">Featured Listings</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        {properties && properties.length > 0 ? (
          properties.map((listing, index) => (
            <Card
              key={index}
              className="bg-white shadow-lg rounded-lg p-4 flex flex-col "
            >
              <div className="relative h-32 w-full mb-4">
          <Image
            alt={listing?.mainImage?.alt || listing.title}
            src={listing?.mainImage?.asset?.url || "/vercel.svg"}
            fill
            className="object-cover rounded-md"
            priority
          />
              </div>
              <h2 className="text-xl font-bold ">{listing.title}</h2>
              <Link href={`/Details/${listing.slug.current}`}>
          <Button
            variant="default"
            className="mt-4 w-full rounded-lg font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors duration-200 py-2 cursor-pointer shadow-md hover:shadow-lg"
          >
            View Details →
          </Button>
              </Link>
            </Card>
          ))
        ) : (
          <Card className="bg-white shadow-lg rounded-lg p-4 flex flex-col">
            <div className="relative h-32 w-full mb-4">
              <Image
          alt="No properties available"
          src="/vercel.svg"
          fill
          className="object-cover rounded-md"
          priority
              />
            </div>
            <h2 className="text-xl font-bold">No properties available</h2>
          </Card>
        )}
      </div>
    </div>
  );
}

export default Featured;
