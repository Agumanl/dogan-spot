import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/SiteShell";
import { getCategoryIcon } from "@/lib/category-icons";
import { serif } from "@/lib/fonts";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { productImageUrl } from "@/sanity/lib/image";
import { getCategories, getProducts } from "@/sanity/lib/queries";
import type { CategorySummary, Product } from "@/types/product";

const TITLE = `Kategoriler | Ankara İkinci El Eşya | ${SITE_NAME}`;
const DESCRIPTION =
  "Doğan Spot'ta beyaz eşya, mobilya, TV, halı ve büro eşyası kategorilerini inceleyin. Ankara'da adresten eşya alımı ve ekspertiz hizmetlerimize de buradan ulaşın.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/kategoriler` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/kategoriler`,
    siteName: SITE_NAME,
    locale: "tr_TR",
    type: "website",
  },
};

export default async function CategoriesPage() {
  let categories: CategorySummary[] = [];
  let products: Product[] = [];
  let loadFailed = false;

  try {
    [categories, products] = await Promise.all([
      getCategories(),
      getProducts(),
    ]);
  } catch (error) {
    console.error("Kategoriler alınamadı:", error);
    loadFailed = true;
  }

  const productCategories = categories.filter(
    (c) => c.categoryType === "product",
  );
  const serviceCategories = categories.filter(
    (c) => c.categoryType === "service",
  );

  const countOf = (slug: string) =>
    products.filter((p) => p.category?.slug === slug).length;

  return (
    <SiteShell>
      {/* Üst bant: breadcrumb ve başlık */}
      <section className="bg-[#2C1A1D] text-[#F5EBE0]">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <nav aria-label="Sayfa yolu" className="text-sm text-[#F5EBE0]/70">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-[#F5EBE0] hover:underline">
                  Anasayfa
                </Link>
              </li>
              <li aria-hidden="true">&gt;</li>
              <li aria-current="page" className="font-medium text-[#F5EBE0]">
                Kategoriler
              </li>
            </ol>
          </nav>

          <h1
            className={`${serif.className} mt-6 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl`}
          >
            Kategoriler
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#F5EBE0]/80 sm:text-lg">
            Satılık ürünlerimize kategoriden ulaşın, eşyanızı satmak
            istiyorsanız alım ve ekspertiz hizmetlerimizi inceleyin.
          </p>
        </div>
      </section>

      {categories.length === 0 && (
        <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <div className="rounded-2xl border border-dashed border-[#2C1A1D]/25 bg-white px-6 py-14 text-center">
            <p className={`${serif.className} text-2xl font-semibold`}>
              {loadFailed
                ? "Kategoriler şu an yüklenemedi"
                : "Kategoriler yakında burada"}
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm text-[#2C1A1D]/70">
              {loadFailed
                ? "Lütfen sayfayı birkaç dakika sonra yenileyin."
                : "Kategorilerimiz hazırlanıyor. Bu sırada WhatsApp'tan bize ulaşabilirsiniz."}
            </p>
          </div>
        </section>
      )}

      {/* a) Satılık ürün kategorileri */}
      {productCategories.length > 0 && (
        <section
          aria-labelledby="urun-kategorileri"
          className="mx-auto max-w-6xl px-4 py-12 md:py-16"
        >
          <h2
            id="urun-kategorileri"
            className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8D6E63]"
          >
            Satılık ürün kategorileri
          </h2>

          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {productCategories.map((category) => {
              const Icon = getCategoryIcon(category.slug, category.categoryType);
              const count = countOf(category.slug);
              const hasImage = Boolean(category.image?.asset);

              return (
                <li key={category.id}>
                  <Link
                    href={`/kategoriler/${category.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#2C1A1D]/10 bg-white transition-colors hover:border-[#2C1A1D] hover:bg-[#2C1A1D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2C1A1D]"
                  >
                    <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-[#F5EBE0] transition-colors group-hover:bg-[#3A2428]">
                      {hasImage && category.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={productImageUrl(category.image, 800, 600)}
                          alt={category.image.alt || ""}
                          width={800}
                          height={600}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="flex h-20 w-20 items-center justify-center rounded-full border border-[#8D6E63] bg-[#FDFBF7] transition-colors group-hover:bg-[#2C1A1D]">
                          <Icon
                            className="h-9 w-9 text-[#8D6E63] transition-colors group-hover:text-[#D7BBA8]"
                            strokeWidth={1.5}
                            aria-hidden="true"
                          />
                        </span>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <h3
                        className={`${serif.className} text-xl font-semibold leading-snug text-[#2C1A1D] transition-colors group-hover:text-[#F5EBE0]`}
                      >
                        {category.title}
                      </h3>
                      {category.description && (
                        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[#2C1A1D]/70 transition-colors group-hover:text-[#F5EBE0]/75">
                          {category.description}
                        </p>
                      )}
                      <span className="mt-auto flex items-center justify-between gap-3 pt-4 text-sm font-semibold text-[#8D6E63] transition-colors group-hover:text-[#D7BBA8]">
                        <span>{count} ürün</span>
                        <span className="inline-flex items-center gap-1.5">
                          Ürünleri gör
                          <ArrowRight
                            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                            aria-hidden="true"
                          />
                        </span>
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {/* b) Alım & ekspertiz hizmetleri */}
      {serviceCategories.length > 0 && (
        <section
          aria-labelledby="hizmet-kategorileri"
          className="mx-auto max-w-6xl px-4 pb-14 md:pb-20"
        >
          <div className="rounded-3xl bg-[#2C1A1D] px-5 py-10 text-[#F5EBE0] sm:px-8 md:px-10 md:py-12">
            <h2
              id="hizmet-kategorileri"
              className="text-sm font-semibold uppercase tracking-[0.18em] text-[#D7BBA8]"
            >
              Alım &amp; ekspertiz hizmetleri
            </h2>

            <ul className="mt-6 grid gap-3 sm:gap-4 md:grid-cols-3">
              {serviceCategories.map((service) => {
                const Icon = getCategoryIcon(service.slug, service.categoryType);
                return (
                  <li key={service.id}>
                    <Link
                      href={`/kategoriler/${service.slug}`}
                      className="group flex h-full flex-col rounded-2xl border border-[#F5EBE0]/15 bg-[#F5EBE0]/5 p-5 transition-colors hover:border-[#F5EBE0]/40 hover:bg-[#F5EBE0]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5EBE0]"
                    >
                      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#8D6E63] bg-[#3A2428]">
                        <Icon
                          className="h-6 w-6 text-[#D7BBA8]"
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                      </span>
                      <span
                        className={`${serif.className} mt-4 block text-xl font-semibold leading-snug`}
                      >
                        {service.title}
                      </span>
                      {service.description && (
                        <span className="mt-2 line-clamp-3 block text-sm leading-relaxed text-[#F5EBE0]/75">
                          {service.description}
                        </span>
                      )}
                      <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-[#D7BBA8]">
                        Detaylı bilgi
                        <ArrowRight
                          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}
    </SiteShell>
  );
}
