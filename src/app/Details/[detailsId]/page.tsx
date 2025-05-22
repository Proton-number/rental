"use client";

import { sanityStore } from "@/store/sanityStore";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

function Detail() {
  const { detailsId } = useParams();
  const { singleProperties, fetchSingleProperties } = sanityStore();

  useEffect(() => {
    if (detailsId && typeof detailsId === "string") {
      fetchSingleProperties(detailsId);
    }
  }, [detailsId, fetchSingleProperties]);

  if (!singleProperties) {
    return (
      <p className="text-center text-gray-500">Loading property details...</p>
    );
  }

  return (
    <div className="min-h-screen flex flex-col  p-10 items-justify relative ">
      <h1 className="text-3xl font-bold mb-4">{singleProperties.title}</h1>

      {singleProperties.mainImage?.asset?.url && (
        <div className="relative h-32 w-full mb-4">
          <Image
            src={singleProperties.mainImage.asset.url}
            alt={singleProperties.mainImage.alt || singleProperties.title}
            fill
            className="object-cover rounded-md"
            priority
          />
        </div>
      )}

      <PortableText value={singleProperties.body} />
    </div>
  );
}

export default Detail;
