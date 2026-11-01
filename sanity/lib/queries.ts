import { cacheLife, cacheTag } from "next/cache";
import type { Product } from "@/types/product";
import { client } from "./client";

/** Yayınlanmış tüm ürünler, en yeni en üstte. */
export const PRODUCTS_QUERY = `*[_type == "product" && defined(slug.current)]
  | order(_createdAt desc) {
    "id": _id,
    "slug": slug.current,
    title,
    description,
    category,
    condition,
    price,
    oldPrice,
    brand,
    age,
    "createdAt": _createdAt,
    "images": coalesce(images[]{ _key, alt, asset, hotspot, crop }, [])
  }`;

/**
 * Next.js 16 `cacheComponents` modu açık olduğu için veri çekme işlemi
 * "use cache" ile önbelleğe alınır. Yeni eklenen ürünler birkaç dakika içinde görünür.
 */
export async function getProducts(): Promise<Product[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("products");

  return client.fetch<Product[]>(PRODUCTS_QUERY);
}
