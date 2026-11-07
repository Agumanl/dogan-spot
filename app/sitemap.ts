import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getSitemapData } from "@/sanity/lib/queries";

type SitemapEntry = MetadataRoute.Sitemap[number];

// Adres: https://spotcudogan.com/sitemap.xml  (Google Search Console'a bu adresi gönderin)
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { products, categories, services } = await getSitemapData();

  const staticPages: SitemapEntry[] = [
    { url: SITE_URL, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/hizmetler`, changeFrequency: "weekly", priority: 0.9 },
  ];

  // Dinamik hizmet (makale) sayfaları
  const serviceEntries = services.map(
    (item): SitemapEntry => ({
      url: `${SITE_URL}/hizmetler/${item.slug}`,
      lastModified: new Date(item.updatedAt),
      changeFrequency: "monthly",
      priority: 0.8,
    }),
  );

  // Dinamik kategori sayfaları
  const categoryEntries = categories.map(
    (item): SitemapEntry => ({
      url: `${SITE_URL}/kategori/${item.slug}`,
      lastModified: new Date(item.updatedAt),
      changeFrequency: "daily",
      priority: 0.8,
    }),
  );

  // Dinamik ürün sayfaları
  const productEntries = products.map(
    (item): SitemapEntry => ({
      url: `${SITE_URL}/urun/${item.slug}`,
      lastModified: new Date(item.updatedAt),
      changeFrequency: "weekly",
      priority: 0.6,
    }),
  );

  return [...staticPages, ...serviceEntries, ...categoryEntries, ...productEntries];
}
