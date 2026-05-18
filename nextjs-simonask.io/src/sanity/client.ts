import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "au2uzesy",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});
