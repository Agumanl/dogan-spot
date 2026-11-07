import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { sans } from "@/lib/fonts";
import { getCategories } from "@/sanity/lib/queries";

/** Kategori ve ürün sayfalarının ortak iskeleti (ana sayfa kendi düzenini kullanır). */
export async function SiteShell({ children }: { children: ReactNode }) {
  // Menüdeki kategori şeridi için. Sanity'ye ulaşılamazsa şerit gizlenir.
  const categories = await getCategories().catch(() => []);

  return (
    // overflow-x-clip: içerik taşsa bile sayfa yatay yalpalamaz (sticky header bozulmaz)
    <div
      className={`${sans.className} min-h-screen overflow-x-clip bg-[#FDFBF7] text-[#2C1A1D] antialiased`}
    >
      <Header categories={categories} />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
