import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getCategoryIcon } from "@/lib/category-icons";
import { serif } from "@/lib/fonts";
import { productImageUrl } from "@/sanity/lib/image";
import type { CategorySummary } from "@/types/product";

interface CategoryGridProps {
  categories: CategorySummary[];
  /** Ürün kategorileri için kategori adresi (slug) başına ürün sayısı. */
  counts?: Record<string, number>;
}

export function CategoryGrid({ categories, counts }: CategoryGridProps) {
  const productCategories = categories.filter(
    (c) => c.categoryType === "product",
  );
  const serviceCategories = categories.filter(
    (c) => c.categoryType === "service",
  );

  return (
    <>
      {/* ───────── a) Satılık ürün kategorileri ───────── */}
      {productCategories.length > 0 && (
        <section
          id="kategoriler"
          aria-labelledby="kategoriler-baslik"
          className="mx-auto max-w-6xl scroll-mt-24 px-4 pt-14 md:pt-20"
        >
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div className="max-w-2xl">
              <h2
                id="kategoriler-baslik"
                className={`${serif.className} text-3xl font-semibold tracking-tight sm:text-4xl`}
              >
                Satılık Ürün Kategorileri
              </h2>
              <p className="mt-2 text-[#2C1A1D]/70">
                Aradığınız eşyaya kategoriden ulaşın.
              </p>
            </div>
            <Link
              href="/kategoriler"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#8D6E63] hover:text-[#2C1A1D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2C1A1D]"
            >
              Tüm kategoriler
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
            {productCategories.map((category) => {
              const Icon = getCategoryIcon(category.slug, category.categoryType);
              const count = counts?.[category.slug];
              const hasImage = Boolean(category.image?.asset);

              return (
                <li key={category.id}>
                  <Link
                    href={`/kategoriler/${category.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#2C1A1D]/10 bg-white transition-colors hover:border-[#2C1A1D] hover:bg-[#2C1A1D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2C1A1D]"
                  >
                    {/* Görsel alanı: görsel yoksa ikon gösterilir */}
                    <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-[#F5EBE0] transition-colors group-hover:bg-[#3A2428]">
                      {hasImage && category.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={productImageUrl(category.image, 600, 450)}
                          alt={category.image.alt || ""}
                          width={600}
                          height={450}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="flex h-16 w-16 items-center justify-center rounded-full border border-[#8D6E63] bg-[#FDFBF7] transition-colors group-hover:bg-[#2C1A1D]">
                          <Icon
                            className="h-8 w-8 text-[#8D6E63] transition-colors group-hover:text-[#D7BBA8]"
                            strokeWidth={1.5}
                            aria-hidden="true"
                          />
                        </span>
                      )}
                      <ArrowUpRight
                        className="absolute right-2.5 top-2.5 h-5 w-5 rounded-full bg-[#FDFBF7]/80 p-0.5 text-[#2C1A1D]/60 transition-colors group-hover:text-[#2C1A1D]"
                        aria-hidden="true"
                      />
                    </div>

                    <div className="flex flex-1 flex-col p-3.5 sm:p-4">
                      <h3
                        className={`${serif.className} text-lg font-semibold leading-snug text-[#2C1A1D] transition-colors group-hover:text-[#F5EBE0]`}
                      >
                        {category.title}
                      </h3>
                      {typeof count === "number" && (
                        <p className="mt-1 text-xs font-medium text-[#8D6E63] transition-colors group-hover:text-[#D7BBA8]">
                          {count} ürün
                        </p>
                      )}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {/* ───────── b) Alım & ekspertiz hizmetleri ───────── */}
      {serviceCategories.length > 0 && (
        <section
          id="hizmetler"
          aria-labelledby="hizmetler-baslik"
          className="mx-auto mt-14 max-w-6xl scroll-mt-24 px-4 md:mt-20"
        >
          <div className="rounded-3xl bg-[#2C1A1D] px-5 py-10 text-[#F5EBE0] sm:px-8 md:px-10 md:py-14">
            <div className="max-w-2xl">
              <h2
                id="hizmetler-baslik"
                className={`${serif.className} text-3xl font-semibold tracking-tight sm:text-4xl`}
              >
                Alım &amp; Ekspertiz Hizmetleri
              </h2>
              <p className="mt-2 text-[#F5EBE0]/75">
                Kullanmadığınız eşyaları adresinizden değerinde alıyoruz.
              </p>
            </div>

            <ul className="mt-8 grid gap-3 sm:gap-4 md:grid-cols-3">
              {serviceCategories.map((service) => {
                const Icon = getCategoryIcon(service.slug, service.categoryType);
                return (
                  <li key={service.id}>
                    <Link
                      href={`/kategoriler/${service.slug}`}
                      className="group flex h-full items-start gap-4 rounded-2xl border border-[#F5EBE0]/15 bg-[#F5EBE0]/5 p-4 transition-colors hover:border-[#F5EBE0]/40 hover:bg-[#F5EBE0]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5EBE0] sm:p-5"
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#8D6E63] bg-[#3A2428]">
                        <Icon
                          className="h-6 w-6 text-[#D7BBA8]"
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className={`${serif.className} block text-lg font-semibold leading-snug`}
                        >
                          {service.title}
                        </span>
                        <span className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-[#D7BBA8]">
                          Detaylı bilgi
                          <ArrowUpRight
                            className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            aria-hidden="true"
                          />
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
