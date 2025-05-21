import { createClient } from "@sanity/client";

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // Replace with your Sanity project ID
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET, // Replace with your Sanity dataset
  useCdn: false,
  apiVersion: "2023-01-01",
});

export default sanityClient;
