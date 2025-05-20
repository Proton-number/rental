export default {
  name: "property",
  title: "Property",
  type: "document",
  icon: () => "🏠", // You can replace this with an actual icon component
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: any) => Rule.required().min(5).max(80),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 100,
      },
    },
    {
      name: "status",
      title: "Property Status",
      type: "string",
      options: {
        list: [
          { title: "Available", value: "available" },
          { title: "Under Contract", value: "under-contract" },
          { title: "Rented", value: "rented" },
        ],
      },
    },
    {
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule: any) => Rule.required().positive(),
    },
    {
      name: "propertyDetails",
      title: "Property Details",
      type: "object",
      fields: [
        { name: "bedrooms", title: "Bedrooms", type: "number" },
        { name: "bathrooms", title: "Bathrooms", type: "number" },
        { name: "area", title: "Area (sq ft)", type: "number" },
        { name: "yearBuilt", title: "Year Built", type: "number" },
      ],
    },
    {
      name: "location",
      title: "Location",
      type: "object",
      fields: [
        { name: "address", title: "Street Address", type: "string" },
        { name: "city", title: "City", type: "string" },
        { name: "state", title: "State", type: "string" },
        { name: "zipCode", title: "ZIP Code", type: "string" },
      ],
    },
    {
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              title: "Alt Text",
              type: "string",
            },
          ],
        },
      ],
    },
    {
      name: "amenities",
      title: "Amenities",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          "Parking",
          "Pool",
          "Garden",
          "Security",
          "Air Conditioning",
          "Furnished",
          "Pet Friendly",
        ],
      },
    },
    {
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "propertyType",
      title: "Property Type",
      type: "string",
      options: {
        list: ["House", "Apartment", "Event Center", "Commercial", "Land"],
      },
    },
    {
      name: "listedBy",
      title: "Listed By",
      type: "reference",
      to: [{ type: "agent" }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      readOnly: true,
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "location.city",
      media: "images.0",
    },
  },
};
