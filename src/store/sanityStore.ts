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
}

interface SanityStore {
  error: null | string;
  properties: Array<Properties> | null;
  fetchProperties: () => Promise<void>;
  singleProperties: Properties | null;
  fetchSingleProperties: (yearId: string) => Promise<void>;
}

export const sanityStore = create<SanityStore>((set, get) => ({
  error: null,
  properties: null,
  singleProperties: null,
  fetchProperties: async () => {
    const REVIEW_QUERY = `*[_type == "post"] | order(_createdAt asc) {
        title, 
        description,  
        slug, 
        projectUrl,
        mainImage{
            asset->{
                _id, 
                url
            }, 
            alt
        }, 
        body
    }`;
    try {
      const response =
        await sanityClient.fetch<Array<Properties>>(REVIEW_QUERY);
      console.log("Fetched properties from Sanity:", response);
      set({ properties: response, error: null });
    } catch (error) {
      console.error("Error fetching projects:", error);
      set({ error: "Failed to fetch projects", properties: null });
    }
  },
  fetchSingleProperties: async (slug: string) => {
    const SINGLE_QUERY = `*[_type == "post" && slug.current == $slug] {
      title, 
      description,  
      slug, 
      projectUrl,
      mainImage{
        asset->{
          _id, 
          url
        }, 
        alt
      }, 
      body
    }`;
    try {
      const response = await sanityClient.fetch<Array<Properties>>(
        SINGLE_QUERY,
        {
          slug, // ✅ This matches the $slug param in the query
        }
      );
      set({ singleProperties: response[0], error: null });
    } catch (error) {
      console.error("Error fetching projects:", error);
      set({ error: "Failed to fetch project", singleProperties: null });
    }
  },
}));
