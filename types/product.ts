import type { PortableTextBlock } from "sanity";

// Bu liste, Sanity ürün şemasındaki (sanity/schemaTypes/product.ts) seçeneklerle birebir aynı olmalı.
export const CONDITIONS = [
  "Sıfır / Kutulu",
  "Sıfır Ayarında",
  "İkinci El - Temiz",
] as const;

export type Condition = (typeof CONDITIONS)[number];

export type CategoryType = "product" | "service";

/** Sanity'den gelen görsel nesnesi (urlFor bu nesneyi URL'ye çevirir). */
export interface ProductImage {
  _key?: string;
  alt?: string | null;
  asset?: { _ref?: string; _type?: string } | null;
  hotspot?: { x: number; y: number; width: number; height: number } | null;
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  } | null;
}

/** Sanity'deki kategori belgesi (ürün kategorisi ya da hizmet). */
export interface CategorySummary {
  id: string;
  title: string;
  slug: string;
  categoryType: CategoryType;
  description?: string | null;
  /** Detaylı makale (Portable Text). Yalnızca kategori detay sorgularında gelir. */
  content?: PortableTextBlock[] | null;
  image?: ProductImage | null;
}

/** Ürünün içinde gelen kısa kategori bilgisi. */
export type CategoryRef = Pick<
  CategorySummary,
  "id" | "title" | "slug" | "categoryType"
>;

/** GROQ sorgusunun (sanity/lib/queries.ts) döndürdüğü ürün. */
export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  condition: Condition;
  price: number;
  oldPrice?: number | null;
  brand?: string | null;
  age?: string | null;
  mainImage?: ProductImage | null;
  gallery: ProductImage[];
  /** Detaylı içerik (Portable Text). Yalnızca ürün detay sorgusunda gelir. */
  content?: PortableTextBlock[] | null;
  category: CategoryRef | null;
  /** ISO tarih, "En yeni" sıralaması için (Sanity'nin _createdAt alanı) */
  createdAt: string;
}

/** Bir kategori ve ona bağlı ürünler (kategori detay sayfası için). */
export interface CategoryWithProducts extends CategorySummary {
  products: Product[];
}
