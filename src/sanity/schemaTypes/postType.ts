import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const postType = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: { source: "title", maxLength: 96 },
    }),
    defineField({
      name: "author",
      type: "reference",
      to: { type: "author" },
    }),
    defineField({
      name: "mainImage",
      type: "image",
      title: "Main Image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
    defineField({
      name: "price",
      type: "number",
      title: "Price (USD)",
    }),
    defineField({
      name: "priceType",
      type: "string",
      title: "Price Type",
      options: {
        list: ["per month", "per week", "per year", "one-time payment"],
      },
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
    }),
    defineField({
      name: "bedrooms",
      type: "number",
      title: "Bedrooms",
    }),
    defineField({
      name: "bathrooms",
      type: "number",
      title: "Bathrooms",
    }),
    defineField({
      name: "parking",
      type: "number",
      title: "Parking Spaces",
    }),
    defineField({
      name: "area",
      type: "string",
      title: "Area (sq ft)",
    }),
    defineField({
      name: "propertyType",
      type: "string",
      title: "Property Type",
      options: {
        list: [
          "Apartment",
          "House",
          "Condo",
          "Studio",
          "Duplex",
          "Villa",
          "Townhouse",
          "Commercial",
          "Land",
        ],
      },
    }),
    defineField({
      name: "furnished",
      type: "string",
      title: "Furnishing",
      options: {
        list: ["Fully Furnished", "Semi Furnished", "Unfurnished"],
      },
    }),
    defineField({
      name: "availability",
      type: "string",
      title: "Availability",
    }),
    defineField({
      name: "location",
      type: "string",
      title: "Location",
    }),
    defineField({
      name: "features",
      type: "array",
      title: "Features",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "nearbyPlaces",
      type: "array",
      title: "Nearby Places",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "description",
      type: "blockContent",
      title: "Description",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "mainImage",
      subtitle: "location",
    },
  },
});
