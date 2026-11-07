import type { PortableTextBlock } from "sanity";

/** Hizmetler listesindeki kart için gereken alanlar. */
export interface ServiceSummary {
  id: string;
  title: string;
  slug: string;
  summary: string;
}

/** Hizmet detay sayfası için tam veri (GROQ: sanity/lib/queries.ts). */
export interface Service extends ServiceSummary {
  /** Detaylı SEO makalesi (Portable Text) */
  content: PortableTextBlock[];
  seoTitle?: string | null;
  seoDescription?: string | null;
}
