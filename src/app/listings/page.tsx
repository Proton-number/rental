"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAppStore } from "@/store/appStore";
import { sanityStore } from "@/store/sanityStore";
import Image from "next/image";

function Properties() {
  const [inputValue, setInputValue] = useState(""); // What user types
  const [searchTerm, setSearchTerm] = useState(""); // Applied filter on click
  const { saveListing } = useAppStore();
  const { properties, fetchProperties } = sanityStore();

  const searchHandler = () => {
    setSearchTerm(inputValue);
  };

  useEffect(() => {
    if (inputValue.trim() === "") {
      setSearchTerm("");
    }
  }, [inputValue]);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        await fetchProperties();
      } catch (error) {
        console.error("Failed to load properties:", error);
      }
    };

    loadProperties();
  }, [fetchProperties]);

  return (
    <div className="p-4">
      {/* Search bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Input
            placeholder="Search location or property"
            className="w-full px-4 py-2 border-2 border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
          />
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <Button
          className="px-6 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
          onClick={searchHandler} // Trigger filtering
        >
          Search
        </Button>
      </div>

      {/* Property Listings */}
      <>
        <h2 className="text-2xl font-semibold mb-4">Available Properties</h2>
        {!properties && (
          <p className="text-red-500 font-medium">
            No properties loaded — check Sanity connection.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          {properties &&
            properties
              .filter(
                (listing) =>
                  searchTerm === "" ||
                  listing.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((listing) => (
                <Card
                  key={listing?.slug?.current}
                  className="bg-white shadow-lg rounded-lg p-4 flex flex-col"
                >
                  <div className="relative h-48 w-full mb-4">
                    <Image
                      alt={listing?.mainImage?.alt || listing.title}
                      src={listing?.mainImage?.asset?.url || "/vercel.svg"}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover rounded-md"
                      priority
                    />
                  </div>
                  <h2 className="text-xl font-bold">{listing.title}</h2>
                  {/* <p className="text-gray-500 text-sm">{listing.description}</p> */}
                  <div className="flex justify-between mt-2">
                    <Link href={`/Details/${listing.slug.current}`}>
                      <Button className="bg-emerald-500 text-white hover:bg-emerald-600 transition-colors duration-200 shadow-md hover:shadow-lg cursor-pointer">
                        View Details
                      </Button>
                    </Link>

                    <Button
                      onClick={() => saveListing(listing.slug.current)}
                      variant="outline"
                      className="border-2 border-emerald-500 text-emerald-500 cursor-pointer px-4 py-2 rounded-lg hover:bg-emerald-50 transition-colors duration-200 shadow-md hover:shadow-lg"
                    >
                      Save
                    </Button>
                  </div>
                </Card>
              ))}
        </div>
      </>
    </div>
  );
}

export default Properties;
