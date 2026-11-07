import { About } from "@/components/About";
import { Catalog } from "@/components/Catalog";
import { CategoryGrid } from "@/components/CategoryGrid";
import { Header } from "@/components/Header";
import { HeroBanner } from "@/components/HeroBanner";
import { SellSteps } from "@/components/SellSteps";
import { SiteFooter } from "@/components/SiteFooter";
import { sans } from "@/lib/fonts";
import { getCategories, getProducts } from "@/sanity/lib/queries";
import type { CategorySummary, Product } from "@/types/product";

// Bu dosya bir sunucu bileşenidir ("use client" yok):
// ürünler ve kategoriler sunucuda Sanity'den çekilir, böylece HTML içinde hazır gelir (SEO için iyi).
export default async function HomePage() {
  let products: Product[] = [];
  let categories: CategorySummary[] = [];
  let loadFailed = false;

  try {
    [products, categories] = await Promise.all([
      getProducts(),
      getCategories(),
    ]);
  } catch (error) {
    console.error("Sanity verisi alınamadı:", error);
    loadFailed = true;
  }

  const productCategories = categories.filter(
    (c) => c.categoryType === "product",
  );

  // Kategori kutularında gösterilecek ürün sayıları (kategori adresine göre)
  const counts: Record<string, number> = {};
  for (const category of productCategories) {
    counts[category.slug] = products.filter(
      (p) => p.category?.slug === category.slug,
    ).length;
  }

  return (
    // overflow-x-clip: içerik taşsa bile sayfa yatay yalpalamaz (sticky header bozulmaz)
    <div
      className={`${sans.className} min-h-screen overflow-x-clip bg-[#FDFBF7] text-[#2C1A1D] antialiased`}
    >
      <Header categories={categories} />

      <main>
        <HeroBanner />

        {/* Satılık ürün kategorileri + alım & ekspertiz hizmetleri */}
        <CategoryGrid categories={categories} counts={counts} />

        {/* Ürün listesi, arama ve filtreleme */}
        <Catalog
          products={products}
          categories={productCategories}
          loadFailed={loadFailed}
        />

        <SellSteps />

        <About />
      </main>

      <SiteFooter />
    </div>
  );
}
