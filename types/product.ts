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
export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: Category;
  condition: Condition;
  price: number;
  oldPrice?: number | null;
  brand?: string | null;
  age?: string | null;
  images: ProductImage[];
  /** ISO tarih, "En yeni" sıralaması için (Sanity'nin _createdAt alanı) */
  createdAt: string;
}
