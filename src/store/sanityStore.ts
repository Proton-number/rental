import { create } from "zustand";
import sanityClient from "@/client";

interface Image {
  asset?: {
    _id: string;
    url: string;
  };
  alt: string;
}
interface PortableTextSpan {
  _key: string;
  _type: "span";
  text: string;
  marks?: string[];
}

interface PortableTextImage {
  _key: string;
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  caption?: string;
  alt?: string;
}

// Mark definition types
interface LinkMarkDef {
  _key: string;
  _type: "link";
  href: string;
  blank?: boolean;
}

interface InternalLinkMarkDef {
  _key: string;
  _type: "internalLink";
  reference: {
    _ref: string;
    _type: "reference";
  };
}

type MarkDef = LinkMarkDef | InternalLinkMarkDef;

// Block types
interface PortableTextBlock {
  _key: string;
  _type: "block";
  children: Array<PortableTextSpan>;
  markDefs: MarkDef[];
  style: "normal" | "h1" | "h2" | "h3" | "h4" | "blockquote" | "code";
  listItem?: "bullet" | "number";
  level?: number;
}

// Main content types
type PortableTextContent = PortableTextBlock | PortableTextImage;

interface Properties {
  title: string;
  description: string;
  slug: {
    current: string;
  };
  mainImage?: Image;
  body: PortableTextContent[];
  _id: string;
  propertyGallery: any[];
  author?: {
    _id: string;
    name: string;
  };
  propertyType?: string;
  price?: string;
  location?: string;
  priceType?: string;
  parking?: number;
  area?: string;
  furnished?: boolean;
  availability?: string;
  features?: string[];
  nearbyPlaces?: string[];
  bedrooms?: number;
  bathrooms?: number;
  projectUrl?: string;
  publishedAt?: string;
}
interface Agent {
  _id: string;
  name: string;
  slug?: {
    current: string;
  };
  title?: string;
  yearsExperience?: number;
  totalProperties?: number;
  phone?: string;
  email?: string;
  whatsapp?: string;
  bio?: PortableTextContent[];
  authorImage?: string;
}

interface SanityStore {
  error: null | string;
  properties: Array<Properties> | null;
  fetchProperties: () => Promise<void>;
  singleProperties: Properties | null;
  fetchSingleProperties: (yearId: string) => Promise<void>;
  fetchFeaturedListings: () => Promise<void>;
  agent: Agent | null;
  fetchAgent: (detailsId: string) => Promise<void>;
}

export const sanityStore = create<SanityStore>((set) => {
  // Common query fragments
  const AUTHOR_FRAGMENT = `
  _id,
  name,
  slug,
  title,
  yearsExperience,
  totalProperties,
  phone,
  email,
  whatsapp,
  bio,
  "authorImage": image.asset->url
`;

  const IMAGE_FRAGMENT = `
    asset->{
      _id, 
      url
    }, 
    alt
  `;

  // Error handler
  const handleError = (
    error: any,
    errorMessage: string,
    resetState: object
  ) => {
    console.error(`Error: ${errorMessage}:`, error);
    set({ error: errorMessage, ...resetState });
  };

  return {
    error: null,
    properties: null,
    singleProperties: null,
    agent: null,

    fetchProperties: async () => {
      const query = `*[_type == "post"] | order(_createdAt asc) {
        title, 
        slug, 
        description,  
        projectUrl,
      
        mainImage{${IMAGE_FRAGMENT}}, 
        body,
        author->{${AUTHOR_FRAGMENT}}
      }`;

      try {
        const response = await sanityClient.fetch<Array<Properties>>(query);
        set({ properties: response, error: null });
      } catch (error) {
        handleError(error, "Failed to fetch projects", { properties: null });
      }
    },

    fetchSingleProperties: async (slug: string) => {
      const query = `*[_type == "post" && slug.current == $slug] {
        title, 
        description,  
        slug, 
        projectUrl,
        propertyType,
        location,
        price,
        priceType,
        parking,
        area,
        furnished,
        availability,
        features,
        nearbyPlaces,
        bedrooms,
        bathrooms,
        mainImage{${IMAGE_FRAGMENT}}, 
        body,
        author->{${AUTHOR_FRAGMENT}}
      }`;

      try {
        const response = await sanityClient.fetch<Array<Properties>>(query, {
          slug,
        });
        set({ singleProperties: response[0], error: null });
      } catch (error) {
        handleError(error, "Failed to fetch project", {
          singleProperties: null,
        });
      }
    },

    fetchFeaturedListings: async () => {
      const query = `*[_type == "post"] | order(_createdAt asc)[0...4]{
        title, 
        description, 
        slug, 
        mainImage{${IMAGE_FRAGMENT}}, 
        body,
        author->{${AUTHOR_FRAGMENT}}
      }`;

      try {
        const response = await sanityClient.fetch<Array<Properties>>(query);
        set({ properties: response, error: null });
      } catch (error) {
        handleError(error, "Failed to fetch projects", { properties: null });
      }
    },

    fetchAgent: async (detailsId: string) => {
      const query = `*[_type == "author" && _id == "${detailsId}"]{
        ${AUTHOR_FRAGMENT}
      }`;

      try {
        const response = await sanityClient.fetch(query);
        set({ agent: response[0] || null, error: null });
      } catch (error) {
        handleError(error, "Failed to fetch author", { agent: null });
      }
    },
  };
});
