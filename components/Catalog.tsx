"use client";

import { useMemo, useState } from "react";
import { Fraunces } from "next/font/google";
import { ProductCard } from "@/components/ProductCard";
import { WHATSAPP_NUMBER } from "@/lib/site";
import type { CategorySummary, Product } from "@/types/product";

const serif = Fraunces({
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

type SortKey = "newest" | "price-asc" | "price-desc";

const ALL = "all";

const normalize = (value: string) => value.toLocaleLowerCase("tr-TR").trim();

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2C1A1D]";

// Kaydırma çubuğunu gizler (ek CSS gerekmez)
const noScrollbar =
  "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden";

interface CatalogProps {
  /** Sanity'den sunucuda çekilmiş ürünler */
  products: Product[];
  /** Filtre çipleri için ürün kategorileri */
  categories: CategorySummary[];
  /** Sanity'ye ulaşılamadıysa true */
  loadFailed?: boolean;
}

export function Catalog({
  products,
  categories,
  loadFailed = false,
}: CatalogProps) {
  const [category, setCategory] = useState<string>(ALL);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("newest");

  // 1) Arama: başlık, açıklama, marka ve kategori adında (Türkçe karakter duyarlı)
  const searched = useMemo(() => {
    const q = normalize(query);
    if (!q) return products;
    return products.filter((p) =>
      normalize(
        [p.title, p.description, p.brand ?? "", p.category?.title ?? ""].join(
          " ",
        ),
      ).includes(q),
    );
  }, [products, query]);

  // 2) Kategori çiplerindeki sayılar
  const counts = useMemo(() => {
    const map = new Map<string, number>();
    map.set(ALL, searched.length);
    categories.forEach((c) =>
      map.set(
        c.slug,
        searched.filter((p) => p.category?.slug === c.slug).length,
      ),
    );
    return map;
  }, [searched, categories]);

  // 3) Kategori filtresi + sıralama
  const visible = useMemo(() => {
    const list =
      category === ALL
        ? [...searched]
        : searched.filter((p) => p.category?.slug === category);

    switch (sort) {
      case "price-asc":
        return list.sort((a, b) => a.price - b.price);
      case "price-desc":
        return list.sort((a, b) => b.price - a.price);
      default:
        return list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    }
  }, [searched, category, sort]);

  const resetFilters = () => {
    setQuery("");
    setCategory(ALL);
  };

  const hasProducts = products.length > 0;
  const chips = [{ slug: ALL, title: "Tümü" }, ...categories];

  return (
    <section
      id="urunler"
      className="mx-auto max-w-6xl scroll-mt-24 px-4 py-12 md:py-16"
      aria-labelledby="urunler-baslik"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2
            id="urunler-baslik"
            className={`${serif.className} text-3xl font-semibold tracking-tight`}
          >
            Satılık ürünler
          </h2>
          <p className="mt-1 text-sm text-[#2C1A1D]/65" aria-live="polite">
            {visible.length} ürün listeleniyor
            {query.trim() && ` · “${query.trim()}” araması`}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-sm text-[#2C1A1D]/65">
            Sırala
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-lg border border-[#2C1A1D]/15 bg-white px-3 py-2 text-sm focus:border-[#8D6E63] focus:outline-none focus:ring-2 focus:ring-[#8D6E63]/30"
          >
            <option value="newest">En yeni</option>
            <option value="price-asc">Fiyat: düşükten yükseğe</option>
            <option value="price-desc">Fiyat: yüksekten düşüğe</option>
          </select>
        </div>
      </div>

      {/* Arama */}
      <form
        role="search"
        onSubmit={(e) => e.preventDefault()}
        className="mt-6"
      >
        <label htmlFor="search" className="sr-only">
          Ürün ara
        </label>
        <div className="relative">
          <svg
            viewBox="0 0 24 24"
            className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 fill-none stroke-[#2C1A1D]/45"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            id="search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Koltuk, buzdolabı, televizyon ara…"
            className="w-full rounded-xl border border-[#2C1A1D]/15 bg-white py-3 pl-11 pr-4 text-sm placeholder:text-[#2C1A1D]/45 focus:border-[#8D6E63] focus:outline-none focus:ring-2 focus:ring-[#8D6E63]/30"
          />
        </div>
      </form>

      {/* Kategori filtreleri: mobilde parmakla yatay kaydırılır, sayfa yalpalamaz */}
      <div
        role="group"
        aria-label="Kategoriye göre filtrele"
        className={`-mx-4 mt-4 flex snap-x gap-2 overflow-x-auto overscroll-x-contain px-4 pb-2 ${noScrollbar}`}
      >
        {chips.map((chip) => {
          const active = category === chip.slug;
          return (
            <button
              key={chip.slug}
              type="button"
              onClick={() => setCategory(chip.slug)}
              aria-pressed={active}
              className={`inline-flex shrink-0 snap-start items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors ${focusRing} ${
                active
                  ? "border-[#2C1A1D] bg-[#2C1A1D] text-[#F5EBE0]"
                  : "border-[#2C1A1D]/15 bg-white text-[#2C1A1D] hover:border-[#8D6E63]"
              }`}
            >
              {chip.title}
              <span
                className={`rounded-full px-2 py-0.5 text-xs tabular-nums ${
                  active
                    ? "bg-[#F5EBE0]/20 text-[#F5EBE0]"
                    : "bg-[#F5EBE0] text-[#2C1A1D]/70"
                }`}
              >
                {counts.get(chip.slug) ?? 0}
              </span>
            </button>
          );
        })}
      </div>

      {/* Ürün ızgarası */}
      {visible.length > 0 ? (
        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-[#2C1A1D]/25 bg-white px-6 py-14 text-center">
          {loadFailed ? (
            <>
              <p className={`${serif.className} text-2xl font-semibold`}>
                Ürünler şu an yüklenemedi
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm text-[#2C1A1D]/70">
                Lütfen sayfayı birkaç dakika sonra yenileyin ya da ürünleri
                WhatsApp&apos;tan sorun.
              </p>
            </>
          ) : !hasProducts ? (
            <>
              <p className={`${serif.className} text-2xl font-semibold`}>
                Henüz ürün eklenmedi
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm text-[#2C1A1D]/70">
                Yeni ürünler çok yakında burada olacak. Aradığınız bir ürün
                varsa WhatsApp&apos;tan yazın.
              </p>
            </>
          ) : (
            <>
              <p className={`${serif.className} text-2xl font-semibold`}>
                Bu aramaya uygun ürün bulunamadı
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm text-[#2C1A1D]/70">
                Farklı bir kelime deneyin ya da filtreleri temizleyin.
                Aradığınız ürünü WhatsApp&apos;tan yazarsanız stoğa geldiğinde
                haber verelim.
              </p>
            </>
          )}

          <div className="mt-5 flex flex-wrap justify-center gap-3">
            {hasProducts && !loadFailed && (
              <button
                type="button"
                onClick={resetFilters}
                className={`rounded-xl bg-[#2C1A1D] px-5 py-2.5 text-sm font-semibold text-[#F5EBE0] hover:bg-[#3E2723] ${focusRing}`}
              >
                Filtreleri temizle
              </button>
            )}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                query.trim()
                  ? `Merhaba, "${query.trim()}" ürününü arıyorum. Elinizde var mı?`
                  : "Merhaba, ürünleriniz hakkında bilgi almak istiyorum.",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-xl border border-[#2C1A1D]/25 px-5 py-2.5 text-sm font-semibold hover:bg-[#2C1A1D]/5 ${focusRing}`}
            >
              WhatsApp&apos;tan sor
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
