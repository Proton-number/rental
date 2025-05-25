"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAppStore } from "@/store/appStore";
import Link from "next/link";
import { useEffect } from "react";
import Image from "next/image";
import { sanityStore } from "@/store/sanityStore";
import { PortableText } from "@portabletext/react";

function Saved() {
  const { removeSavedListing, getSavedListings, savedListings } = useAppStore();
  const { fetchProperties, properties } = sanityStore();

  useEffect(() => {
    fetchProperties(); // Load all listings
    getSavedListings(); // Load user's saved IDs
  }, [fetchProperties, getSavedListings]);

  const savedFullListings =
    properties?.filter((prop) => savedListings.includes(prop.slug.current)) ||
    [];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Your Saved Properties</h2>
      {savedFullListings.length === 0 ? (
        <p className="text-gray-500 flex items-center justify-center">
          You haven&apos;t saved any properties yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          {savedFullListings.map((listing, id) => (
            <Card
              key={id}
              className="bg-white shadow-lg rounded-lg p-4 flex flex-col"
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
              <h2 className="text-xl font-bold">{listing.title}</h2>
              <div className="text-gray-500 text-sm">
                {typeof listing.description === "string" ? (
                  listing.description
                ) : (
                  <PortableText value={listing.description} />
                )}
              </div>
              <div className="flex justify-between items-center">
                <Link href={`/Details/${listing.slug.current}`}>
                  <Button className="bg-emerald-500 text-white hover:bg-emerald-600">
                    View Details
                  </Button>
                </Link>
                <Button
                  onClick={async () => {
                    await removeSavedListing(listing.slug.current);
                    getSavedListings(); // Refresh after removal
                  }}
                  variant="outline"
                  className="border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-50"
                >
                  Remove
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default Saved;
