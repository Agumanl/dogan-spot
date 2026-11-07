// Bu listeler, Sanity şemasındaki (sanity/schemaTypes/product.ts) seçeneklerle birebir aynı olmalı.
export const CATEGORIES = [
  "Mobilya",
  "Beyaz Eşya",
  "Elektronik",
  "Ev & Mutfak",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const CONDITIONS = [
  "Sıfır Ayarında",
  "Çok İyi Durumda",
  "İyi Durumda",
  "Orta Durumda",
] as const;

export type Condition = (typeof CONDITIONS)[number];

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

/** GROQ sorgusunun (sanity/lib/queries.ts) döndürdüğü ürün. */
// types/product.ts
export interface CategorySummary {
  _id?: string
  id?: string
  title: string
  slug: string
  description?: string
  image?: string
  imageUrl?: string
  categoryType?: 'product' | 'service'
}

export interface Product {
  _id?: string
  id?: string
  title: string
  slug: string
  price: number | string
  condition?: string
  description?: string
  imageUrl?: string
  mainImage?: any
  gallery?: any[]
  category?: any
}