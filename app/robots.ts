import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Adres: https://spotcudogan.com/robots.txt
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Yönetim paneli arama sonuçlarında görünmesin
        disallow: ["/studio", "/studio/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
