import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { ProductGallery } from "@/components/ProductGallery";
import { SiteShell } from "@/components/SiteShell";
import { serif } from "@/lib/fonts";
import { formatPrice } from "@/lib/format";
import { getProductImages } from "@/lib/product-images";
import { SITE_NAME, SITE_URL, WHATSAPP_NUMBER } from "@/lib/site";
import { productImageUrl } from "@/sanity/lib/image";
import {
  getProductBySlug,
  getProductSlugs,
  getProductsByCategorySlug,
} from "@/sanity/lib/queries";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Next.js 16 `cacheComponents` modunda generateStaticParams boş dönemez.
 * Henüz hiç ürün yoksa (veya Sanity'ye ulaşılamazsa) build'in geçmesi için
 * yer tutucu bir değer döndürülür. Bu değer sayfada 404'e çevrilir.
 */
const PLACEHOLDER_SLUG = "__placeholder__";

export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return slugs.length > 0
    ? slugs.map((slug) => ({ slug }))
    : [{ slug: PLACEHOLDER_SLUG }];
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product =
    slug === PLACEHOLDER_SLUG ? null : await getProductBySlug(slug);

  if (!product) {
    return {
      title: { absolute: `Ürün bulunamadı | ${SITE_NAME}` },
      robots: { index: false },
    };
  }

  const title = `${product.title} | ${SITE_NAME}`;
  const summary = `${product.title}, ${product.condition.toLowerCase()}, ${formatPrice(product.price)}. ${product.description}`;
  const description =
    summary.length > 160 ? `${summary.slice(0, 157).trimEnd()}…` : summary;
  const url = `${SITE_URL}/urun/${product.slug}`;
  const cover = getProductImages(product)[0];

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
      images: cover
        ? [{ url: productImageUrl(cover, 1200, 630), width: 1200, height: 630 }]
        : undefined,
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  if (slug === PLACEHOLDER_SLUG) notFound();

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const url = `${SITE_URL}/urun/${product.slug}`;
  const images = getProductImages(product);

  const discount =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round((1 - product.price / product.oldPrice) * 100)
      : null;

  // WhatsApp mesajı: ürün adı ve sayfa linki otomatik eklenir
  const whatsappMessage = `Merhaba, sitenizdeki '${product.title}' ürünü hakkında bilgi almak istiyorum: ${url}`;
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  // Aynı kategoriden diğer ürünler (kendisi hariç)
  const related = product.category
    ? (await getProductsByCategorySlug(product.category.slug))
        .filter((item) => item.id !== product.id)
        .slice(0, 3)
    : [];

  // Arama motorları için yapılandırılmış veri
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    category: product.category?.title,
    image: images.slice(0, 4).map((image) => productImageUrl(image, 1200, 900)),
    brand: product.brand ? { "@type": "Brand", name: product.brand } : undefined,
    itemCondition: product.condition.startsWith("Sıfır")
      ? "https://schema.org/NewCondition"
      : "https://schema.org/UsedCondition",
    offers: {
      "@type": "Offer",
      url,
      price: product.price,
      priceCurrency: "TRY",
      availability: "https://schema.org/InStock",
    },
  };

  const details = [
    { label: "Durum", value: product.condition },
    { label: "Marka", value: product.brand },
    { label: "Ürün yaşı", value: product.age },
  ].filter((item): item is { label: string; value: string } =>
    Boolean(item.value),
  );

  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <nav aria-label="Sayfa yolu" className="text-sm text-[#2C1A1D]/60">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-[#2C1A1D] hover:underline">
                Ana Sayfa
              </Link>
            </li>
            {product.category && (
              <>
                <li aria-hidden="true">/</li>
                <li>
                  <Link
                    href={`/kategori/${product.category.slug}`}
                    className="hover:text-[#2C1A1D] hover:underline"
                  >
                    {product.category.title}
                  </Link>
                </li>
              </>
            )}
            <li aria-hidden="true">/</li>
            <li
              aria-current="page"
              className="line-clamp-1 font-medium text-[#2C1A1D]"
            >
              {product.title}
            </li>
          </ol>
        </nav>

        <div className="mt-6 grid gap-8 md:grid-cols-[1.15fr_1fr] md:gap-12">
          {/* Sol: büyük ana görsel, durum etiketi ve galeri seçici */}
          <div className="min-w-0 md:sticky md:top-24 md:self-start">
            <ProductGallery
              images={images}
              title={product.title}
              condition={product.condition}
            />
          </div>

          {/* Sağ: bilgiler */}
          <div className="min-w-0">
            <h1
              className={`${serif.className} text-3xl font-semibold leading-tight tracking-tight sm:text-4xl`}
            >
              {product.title}
            </h1>

            <div className="mt-5 flex flex-wrap items-end gap-4">
              <div className="relative inline-flex items-center rounded-md rounded-l-xl bg-[#2C1A1D] py-2 pl-8 pr-4 text-[#F5EBE0]">
                <span
                  aria-hidden="true"
                  className="absolute left-3 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-[#F5EBE0]"
                />
                <span className="text-2xl font-bold tabular-nums">
                  {formatPrice(product.price)}
                </span>
              </div>

              {product.oldPrice ? (
                <div>
                  <span className="block text-base tabular-nums text-[#2C1A1D]/45 line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                  {discount !== null && (
                    <span className="text-sm font-semibold text-[#8D6E63]">
                      %{discount} indirim
                    </span>
                  )}
                </div>
              ) : null}
            </div>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#16A34A] px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-[#128A3E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16A34A] sm:text-lg"
            >
              <MessageCircle className="h-6 w-6 shrink-0" aria-hidden="true" />
              WhatsApp ile Bilgi Al / Satın Al
            </a>
            <p className="mt-2 text-center text-xs text-[#2C1A1D]/55">
              Mesaja ürün adı ve bu sayfanın linki otomatik eklenir.
            </p>

            <section aria-labelledby="aciklama-baslik" className="mt-8">
              <h2
                id="aciklama-baslik"
                className={`${serif.className} text-xl font-semibold`}
              >
                Ürün açıklaması
              </h2>
              <p className="mt-2 whitespace-pre-line leading-relaxed text-[#2C1A1D]/80">
                {product.description}
              </p>
            </section>

            <dl className="mt-8 divide-y divide-[#2C1A1D]/10 border-y border-[#2C1A1D]/10">
              {product.category && (
                <div className="grid grid-cols-[8rem_1fr] gap-4 py-3 text-sm">
                  <dt className="text-[#2C1A1D]/60">Kategori</dt>
                  <dd className="font-medium">
                    <Link
                      href={`/kategori/${product.category.slug}`}
                      className="underline-offset-2 hover:underline"
                    >
                      {product.category.title}
                    </Link>
                  </dd>
                </div>
              )}
              {details.map((item) => (
                <div
                  key={item.label}
                  className="grid grid-cols-[8rem_1fr] gap-4 py-3 text-sm"
                >
                  <dt className="text-[#2C1A1D]/60">{item.label}</dt>
                  <dd className="font-medium">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Benzer ürünler */}
        {related.length > 0 && (
          <section aria-labelledby="benzer-baslik" className="mt-16">
            <h2
              id="benzer-baslik"
              className={`${serif.className} text-2xl font-semibold`}
            >
              Aynı kategoriden diğer ürünler
            </h2>
            <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <li key={item.id}>
                  <ProductCard product={item} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </SiteShell>
  );
}
