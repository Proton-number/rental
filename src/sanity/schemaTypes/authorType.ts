import { UserIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
export const authorType = defineType({
  name: "author",
  title: "Author",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "name",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "name",
      },
    }),
    defineField({
      name: "image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "bio",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [],
        }),
      ],
    }),
    // Additional agent fields
    defineField({
      name: "title",
      title: "Job Title",
      type: "string",
      description: "Professional title (e.g., Senior Real Estate Agent)",
    }),
    defineField({
      name: "yearsExperience",
      title: "Years of Experience",
      type: "number",
      validation: (rule) => rule.min(0),
      description: "Number of years in the industry",
    }),
    defineField({
      name: "totalProperties",
      title: "Total Properties Listed",
      type: "number",
      validation: (rule) => rule.min(0),
      description: "Total number of properties listed",
    }),
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
      description: "Contact phone number with country code (e.g., +1 234 567 8900)",
      validation: (rule) => 
        rule.regex(/^\+[1-9]\d{1,14}$/).error('Please enter a valid phone number with country code (e.g., +1234567890)'),
    }),
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      validation: (rule) => rule.email(),
      description: "Contact email address",
    }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp Link",
      type: "url",
      description: "WhatsApp contact link",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "title",
      media: "image",
    },
  },
});
