import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Yayınlanmış içerik için CDN kullan (hızlı). Anlık önizleme gerekirse false yapın.
  useCdn: true,
});
