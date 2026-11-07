import { cacheLife, cacheTag } from "next/cache";
import type { CategorySummary, Product } from "@/types/product";
import { client } from "@/sanity/lib/client";

// ───────── Ortak alan listeleri ─────────

const IMAGE_FIELDS = `_key, alt, asset, hotspot, crop`;

const PRODUCT_FIELDS = `
  "id": _id,
  "slug": slug.current,
  title,
  description,
  condition,
  price,
  oldPrice,
  brand,
  age,
  "createdAt": _createdAt,
  mainImage{ ${IMAGE_FIELDS} },
  "gallery": coalesce(gallery[]{ ${IMAGE_FIELDS} }, []),
  "category": category->{ "id": _id, title, "slug": slug.current, categoryType }
`;

const CATEGORY_FIELDS = `
  "id": _id,
  title,
  "slug": slug.current,
  categoryType,
  description,
  image{ ${IMAGE_FIELDS} }
`;

// ───────── Sorgular ─────────

export const PRODUCTS_QUERY = `*[_type == "product" && defined(slug.current)]
  | order(_createdAt desc) { ${PRODUCT_FIELDS} }`;

const PRODUCTS_BY_CATEGORY_QUERY = `*[_type == "product" && defined(slug.current) && category->slug.current == $categorySlug]
  | order(_createdAt desc) { ${PRODUCT_FIELDS} }`;

const PRODUCT_BY_SLUG_QUERY = `*[_type == "product" && slug.current == $slug][0] { ${PRODUCT_FIELDS} }`;

const PRODUCT_SLUGS_QUERY = `*[_type == "product" && defined(slug.current)].slug.current`;

const CATEGORIES_QUERY = `*[_type == "category" && defined(slug.current)]
  | order(coalesce(order, 999) asc, title asc) { ${CATEGORY_FIELDS} }`;

const CATEGORY_BY_SLUG_QUERY = `*[_type == "category" && slug.current == $slug][0] { ${CATEGORY_FIELDS} }`;

const CATEGORY_SLUGS_QUERY = `*[_type == "category" && defined(slug.current)].slug.current`;

const SITEMAP_QUERY = `{
  "products": *[_type == "product" && defined(slug.current)]{ "slug": slug.current, "updatedAt": _updatedAt },
  "categories": *[_type == "category" && defined(slug.current)]{ "slug": slug.current, "updatedAt": _updatedAt }
}`;

// ───────── Veri çekme fonksiyonları ─────────
// Next.js 16 `cacheComponents` açık olduğu için hepsi "use cache" ile önbelleğe alınır.
// Studio'da yayınlanan içerik birkaç dakika içinde sitede görünür.

export async function getProducts(): Promise<Product[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("products");

  return client.fetch<Product[]>(PRODUCTS_QUERY);
}

export async function getProductsByCategorySlug(
  categorySlug: string,
): Promise<Product[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("products");

  return client.fetch<Product[]>(PRODUCTS_BY_CATEGORY_QUERY, { categorySlug });
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  "use cache";
  cacheLife("minutes");
  cacheTag("products");

  return client.fetch<Product | null>(PRODUCT_BY_SLUG_QUERY, { slug });
}

export async function getCategories(): Promise<CategorySummary[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("categories");

  return client.fetch<CategorySummary[]>(CATEGORIES_QUERY);
}

export async function getCategoryBySlug(
  slug: string,
): Promise<CategorySummary | null> {
  "use cache";
  cacheLife("minutes");
  cacheTag("categories");

  return client.fetch<CategorySummary | null>(CATEGORY_BY_SLUG_QUERY, { slug });
}

/**
 * Build sırasında hangi sayfaların önceden üretileceğini belirler.
 * Sanity'ye ulaşılamazsa boş liste döner, build bu yüzden çökmez.
 */
export async function getProductSlugs(): Promise<string[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("products");

  try {
    return await client.fetch<string[]>(PRODUCT_SLUGS_QUERY);
  } catch (error) {
    console.error("Ürün slug'ları alınamadı:", error);
    return [];
  }
}

export async function getCategorySlugs(): Promise<string[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("categories");

  try {
    return await client.fetch<string[]>(CATEGORY_SLUGS_QUERY);
  } catch (error) {
    console.error("Kategori slug'ları alınamadı:", error);
    return [];
  }
}

export interface SitemapItem {
  slug: string;
  updatedAt: string;
}

export async function getSitemapData(): Promise<{
  products: SitemapItem[];
  categories: SitemapItem[];
}> {
  "use cache";
  cacheLife("minutes");
  cacheTag("products", "categories");

  try {
    return await client.fetch<{
      products: SitemapItem[];
      categories: SitemapItem[];
    }>(SITEMAP_QUERY);
  } catch (error) {
    console.error("Sitemap verisi alınamadı:", error);
    return { products: [], categories: [] };
  }
}
