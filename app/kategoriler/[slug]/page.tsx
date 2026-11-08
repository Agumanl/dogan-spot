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
  getCategorySlugs,
  getCategoryWithProducts,
} from "@/sanity/lib/queries";

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
    slug === PLACEHOLDER_SLUG ? null : await getCategoryWithProducts(slug);

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
  const raw = (category.description?.trim() || fallback).replace(/\s+/g, " ");
  const description =
    raw.length > 160 ? `${raw.slice(0, 157).trimEnd()}…` : raw;
  const url = `${SITE_URL}/kategoriler/${category.slug}`;

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

export default async function CategoryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  if (slug === PLACEHOLDER_SLUG) notFound();

  // Kategori detayı ve ürünleri tek sorguda gelir
  const category = await getCategoryWithProducts(slug);
  if (!category) notFound();

  const isService = category.categoryType === "service";
  const products = isService ? [] : category.products;

  const allCategories = await getCategories();
  const otherCategories = allCategories.filter((c) => c.id !== category.id);
  const otherProducts = otherCategories.filter(
    (c) => c.categoryType === "product",
  );
  const otherServices = otherCategories.filter(
    (c) => c.categoryType === "service",
  );

  const contactHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    isService
      ? `Merhaba, "${category.title}" hizmetiniz hakkında bilgi almak istiyorum.`
      : `Merhaba, ${category.title} kategorisinde ürün arıyorum.`,
  )}`;

  return (
    <SiteShell>
      {/* Üst bant: breadcrumb, başlık, açıklama */}
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
              <li>
                <Link
                  href="/kategoriler"
                  className="hover:text-[#F5EBE0] hover:underline"
                >
                  Kategoriler
                </Link>
              </li>
              <li aria-hidden="true">&gt;</li>
              <li aria-current="page" className="font-medium text-[#F5EBE0]">
                {category.title}
              </li>
            </ol>
          </nav>

          <h1
            className={`${serif.className} mt-6 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl`}
          >
            {category.title}
          </h1>
          {category.description && (
            <p className="mt-4 max-w-3xl whitespace-pre-line text-base leading-relaxed text-[#F5EBE0]/80 sm:text-lg">
              {category.description}
            </p>
          )}
          {!isService && (
            <p className="mt-4 text-sm font-medium text-[#D7BBA8]">
              {products.length} ürün
            </p>
          )}
          {isService && (
            <a
              href={contactHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2.5 rounded-xl bg-[#F5EBE0] px-6 py-3.5 text-base font-semibold text-[#2C1A1D] transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F5EBE0]"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              WhatsApp ile Bilgi Al
            </a>
          )}
        </div>
      </section>

      {/* Ürün kategorisi: ürün ızgarası ya da boş durum */}
      {!isService && (
        <section
          aria-label={`${category.title} ürünleri`}
          className="mx-auto max-w-6xl px-4 py-10 md:py-14"
        >
          {products.length > 0 ? (
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <li key={product.id}>
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-2xl border border-dashed border-[#2C1A1D]/25 bg-white px-6 py-14 text-center">
              <p className={`${serif.className} text-2xl font-semibold`}>
                Bu kategoride henüz ürün bulunmuyor
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm text-[#2C1A1D]/70">
                Yeni ürünler düzenli olarak ekleniyor. Aradığınız bir ürün
                varsa WhatsApp&apos;tan yazın, stoğa geldiğinde size haber
                verelim.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <a
                  href={contactHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#2C1A1D] px-5 py-3 text-sm font-semibold text-[#F5EBE0] hover:bg-[#3E2723] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2C1A1D]"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  WhatsApp ile iletişime geç
                </a>
                <Link
                  href="/kategoriler"
                  className="inline-flex rounded-xl border border-[#2C1A1D]/25 px-5 py-3 text-sm font-semibold hover:bg-[#2C1A1D]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2C1A1D]"
                >
                  Diğer kategorilere bak
                </Link>
              </div>
            </div>
          )}
        </section>
      )}

      {/* Hizmet kategorisi: 3 adımda süreç ve çağrı butonu */}
      {isService && <SellSteps />}

      {/* Diğer kategoriler */}
      <div className="mx-auto max-w-6xl px-4 pb-14 pt-6 md:pb-16">
        {otherProducts.length > 0 && (
          <nav aria-label="Ürün kategorileri">
            <h2 className={`${serif.className} text-2xl font-semibold`}>
              Ürün kategorileri
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {otherProducts.map((other) => (
                <li key={other.id}>
                  <Link
                    href={`/kategoriler/${other.slug}`}
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
                    href={`/kategoriler/${other.slug}`}
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
