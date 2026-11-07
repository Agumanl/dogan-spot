import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { SellSteps } from "@/components/SellSteps";
import { SiteShell } from "@/components/SiteShell";
import { serif } from "@/lib/fonts";
import { SITE_NAME, SITE_URL, WHATSAPP_NUMBER } from "@/lib/site";
import { productImageUrl } from "@/sanity/lib/image";
import {
  getCategories,
  getCategoryBySlug,
  getCategorySlugs,
  getProductsByCategorySlug,
} from "@/sanity/lib/queries";
import type { Product } from "@/types/product";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Next.js 16 `cacheComponents` modunda generateStaticParams boş dönemez.
 * Henüz hiç kategori yoksa (veya Sanity'ye ulaşılamazsa) build'in geçmesi için
 * yer tutucu bir değer döndürülür. Bu değer sayfada 404'e çevrilir.
 */
const PLACEHOLDER_SLUG = "__placeholder__";

export async function generateStaticParams() {
  const slugs = await getCategorySlugs();
  return slugs.length > 0
    ? slugs.map((slug) => ({ slug }))
    : [{ slug: PLACEHOLDER_SLUG }];
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category =
    slug === PLACEHOLDER_SLUG ? null : await getCategoryBySlug(slug);

  if (!category) {
    return {
      title: { absolute: `Kategori bulunamadı | ${SITE_NAME}` },
      robots: { index: false },
    };
  }

  const title = `${category.title} Ankara | ${SITE_NAME}`;
  const fallback =
    category.categoryType === "service"
      ? `${category.title}: Ankara'da adresinizden nakit eşya alımı ve ekspertiz hizmeti.`
      : `Ankara'da ikinci el ${category.title.toLowerCase()} ürünleri. Doğan Spot'ta durumu açıkça yazılmış, kontrol edilmiş eşyalar.`;
  const raw = category.description?.trim() || fallback;
  const description =
    raw.length > 160 ? `${raw.slice(0, 157).trimEnd()}…` : raw;
  const url = `${SITE_URL}/kategori/${category.slug}`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "tr_TR",
      type: "website",
      images: category.image?.asset
        ? [
            {
              url: productImageUrl(category.image, 1200, 630),
              width: 1200,
              height: 630,
            },
          ]
        : undefined,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  if (slug === PLACEHOLDER_SLUG) notFound();

  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const isService = category.categoryType === "service";

  // Hizmet kategorilerinde ürün listesi yoktur; ürün kategorilerinde yalnızca bu kategorinin ürünleri çekilir
  const [products, allCategories] = await Promise.all([
    isService
      ? Promise.resolve<Product[]>([])
      : getProductsByCategorySlug(category.slug),
    getCategories(),
  ]);

  const otherCategories = allCategories.filter((c) => c.id !== category.id);
  const otherProducts = otherCategories.filter(
    (c) => c.categoryType === "product",
  );
  const otherServices = otherCategories.filter(
    (c) => c.categoryType === "service",
  );

  const serviceHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Merhaba, "${category.title}" hizmetiniz hakkında bilgi almak istiyorum.`,
  )}`;

  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <nav aria-label="Sayfa yolu" className="text-sm text-[#2C1A1D]/60">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-[#2C1A1D] hover:underline">
                Ana Sayfa
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-medium text-[#2C1A1D]">
              {category.title}
            </li>
          </ol>
        </nav>

        <header className="mt-6 max-w-3xl">
          <h1
            className={`${serif.className} text-4xl font-semibold leading-tight tracking-tight sm:text-5xl`}
          >
            {category.title}
          </h1>
          {category.description && (
            <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-[#2C1A1D]/75 sm:text-lg">
              {category.description}
            </p>
          )}
          {!isService && (
            <p className="mt-3 text-sm font-medium text-[#8D6E63]">
              {products.length} ürün
            </p>
          )}
          {isService && (
            <a
              href={serviceHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2.5 rounded-xl bg-[#2C1A1D] px-6 py-3.5 text-base font-semibold text-[#F5EBE0] transition-colors hover:bg-[#3E2723] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2C1A1D]"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              WhatsApp ile Bilgi Al
            </a>
          )}
        </header>

        {/* Ürün kategorisi: ürün listesi */}
        {!isService &&
          (products.length > 0 ? (
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <li key={product.id}>
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-8 rounded-2xl border border-dashed border-[#2C1A1D]/25 bg-white px-6 py-14 text-center">
              <p className={`${serif.className} text-2xl font-semibold`}>
                Bu kategoride şu an ürün yok
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm text-[#2C1A1D]/70">
                Yeni ürünler düzenli olarak ekleniyor. Aradığınız bir ürün
                varsa WhatsApp&apos;tan yazın, stoğa geldiğinde haber verelim.
              </p>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  `Merhaba, ${category.title} kategorisinde ürün arıyorum.`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex rounded-xl bg-[#2C1A1D] px-5 py-2.5 text-sm font-semibold text-[#F5EBE0] hover:bg-[#3E2723] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2C1A1D]"
              >
                WhatsApp&apos;tan sor
              </a>
            </div>
          ))}
      </div>

      {/* Hizmet kategorisi: 3 adımda süreç ve çağrı butonu */}
      {isService && <SellSteps />}

      <div className="mx-auto max-w-6xl px-4 pb-14 pt-10 md:pb-16">
        {otherProducts.length > 0 && (
          <nav aria-label="Ürün kategorileri" className={isService ? "" : "mt-4"}>
            <h2 className={`${serif.className} text-2xl font-semibold`}>
              Ürün kategorileri
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {otherProducts.map((other) => (
                <li key={other.id}>
                  <Link
                    href={`/kategori/${other.slug}`}
                    className="inline-flex rounded-full border border-[#2C1A1D]/15 bg-white px-4 py-2 text-sm font-medium transition-colors hover:border-[#8D6E63] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2C1A1D]"
                  >
                    {other.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {otherServices.length > 0 && (
          <nav aria-label="Hizmetler" className="mt-10">
            <h2 className={`${serif.className} text-2xl font-semibold`}>
              Alım &amp; Ekspertiz Hizmetleri
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {otherServices.map((other) => (
                <li key={other.id}>
                  <Link
                    href={`/kategori/${other.slug}`}
                    className="inline-flex rounded-full border border-[#2C1A1D] bg-[#2C1A1D] px-4 py-2 text-sm font-medium text-[#F5EBE0] transition-colors hover:bg-[#3E2723] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2C1A1D]"
                  >
                    {other.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </SiteShell>
  );
}
