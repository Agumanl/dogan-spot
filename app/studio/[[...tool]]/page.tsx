/**
 * Sanity Studio, projenin içinde /studio adresinde çalışır.
 * [[...tool]] (catch-all) rotası, Studio'nun kendi iç sayfalarının
 * (örn. /studio/structure/product) çalışması için gereklidir.
 */
import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
