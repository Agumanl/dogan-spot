import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // CDN kapalı: istekler doğrudan Sanity API'sine gider, eski önbellek yanıtı gelmez.
  // Ürünler zaten Next.js tarafında "use cache" ile önbelleğe alınıyor.
  useCdn: false,
});
