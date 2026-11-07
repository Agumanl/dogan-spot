import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { ServiceBody } from "@/components/ServiceBody";
import { SiteShell } from "@/components/SiteShell";
import { serif } from "@/lib/fonts";
import { getServiceIcon } from "@/lib/service-icons";
import { SITE_NAME, SITE_URL, WHATSAPP_NUMBER } from "@/lib/site";
import {
  getServiceBySlug,
  getServiceSlugs,
  getServices,
} from "@/sanity/lib/queries";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Next.js 16 `cacheComponents` modunda generateStaticParams boş dönemez.
 * Henüz hiç hizmet yoksa (veya Sanity'ye ulaşılamazsa) build'in geçmesi için
 * yer tutucu bir değer döndürülür. Bu değer sayfada 404'e çevrilir.
 */
const PLACEHOLDER_SLUG = "__placeholder__";

export async function generateStaticParams() {
  const slugs = await getServiceSlugs();
  return slugs.length > 0
    ? slugs.map((slug) => ({ slug }))
    : [{ slug: PLACEHOLDER_SLUG }];
}

function clip(text: string, max: number): string {
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length > max ? `${clean.slice(0, max - 1).trimEnd()}…` : clean;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service =
    slug === PLACEHOLDER_SLUG ? null : await getServiceBySlug(slug);

  if (!service) {
    return {
      title: { absolute: `Hizmet bulunamadı | ${SITE_NAME}` },
      robots: { index: false },
    };
  }

  // Studio'daki SEO alanları öncelikli; boşsa başlık ve özet kullanılır
  const title =
    service.seoTitle?.trim() || `${service.title} Ankara | ${SITE_NAME}`;
  const description = clip(
    service.seoDescription?.trim() || service.summary,
    160,
  );
  const url = `${SITE_URL}/hizmetler/${service.slug}`;

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
      type: "article",
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  if (slug === PLACEHOLDER_SLUG) notFound();

  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const url = `${SITE_URL}/hizmetler/${service.slug}`;
  const Icon = getServiceIcon(service.slug);

  // WhatsApp mesajına hizmet adı ve sayfa linki otomatik eklenir
  const whatsappMessage = `Merhaba, "${service.title}" hizmetiniz hakkında bilgi almak istiyorum. ${url}`;
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  // Diğer hizmetler (iç bağlantı): kendisi hariç en fazla 4 tane
  const otherServices = (await getServices())
    .filter((item) => item.id !== service.id)
    .slice(0, 4);

  // Arama motorları için yapılandırılmış veri
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.seoDescription?.trim() || service.summary,
    url,
    areaServed: { "@type": "City", name: "Ankara" },
    provider: { "@type": "LocalBusiness", name: SITE_NAME, url: SITE_URL },
  };

  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* Üst bant: breadcrumb, ikon, başlık, özet */}
      <section className="bg-[#2C1A1D] text-[#F5EBE0]">
        <div className="mx-auto max-w-3xl px-4 py-10 md:py-14">
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
                  href="/hizmetler"
                  className="hover:text-[#F5EBE0] hover:underline"
                >
                  Hizmetler
                </Link>
              </li>
              <li aria-hidden="true">&gt;</li>
              <li
                aria-current="page"
                className="line-clamp-1 font-medium text-[#F5EBE0]"
              >
                {service.title}
              </li>
            </ol>
          </nav>

          <span className="mt-8 flex h-14 w-14 items-center justify-center rounded-full border border-[#8D6E63] bg-[#3A2428]">
            <Icon
              className="h-7 w-7 text-[#D7BBA8]"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </span>

          <h1
            className={`${serif.className} mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl`}
          >
            {service.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[#F5EBE0]/80 sm:text-lg">
            {service.summary}
          </p>
        </div>
      </section>

      {/* Makale */}
      <article className="mx-auto max-w-3xl px-4 py-10 md:py-14">
        {service.content.length > 0 ? (
          <ServiceBody value={service.content} />
        ) : (
          <p className="text-[#2C1A1D]/70">
            Bu hizmetin ayrıntıları hazırlanıyor. Bilgi almak için aşağıdaki
            düğmeyle bize yazabilirsiniz.
          </p>
        )}
      </article>

      {/* WhatsApp çağrısı */}
      <section className="mx-auto max-w-3xl px-4 pb-12 md:pb-16">
        <div className="rounded-3xl bg-[#2C1A1D] px-6 py-10 text-center text-[#F5EBE0] sm:px-10">
          <h2
            className={`${serif.className} text-2xl font-semibold tracking-tight sm:text-3xl`}
          >
            {service.title} için bilgi alın
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[#F5EBE0]/75">
            Sorularınızı WhatsApp&apos;tan yazın, size dönüş yapalım.
          </p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center gap-2.5 rounded-2xl bg-[#16A34A] px-7 py-4 text-base font-semibold text-white transition-colors hover:bg-[#128A3E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#16A34A] sm:text-lg"
          >
            <MessageCircle className="h-6 w-6 shrink-0" aria-hidden="true" />
            WhatsApp ile Bilgi Al
          </a>
        </div>
      </section>

      {/* Diğer hizmetler */}
      {otherServices.length > 0 && (
        <nav
          aria-label="Diğer hizmetler"
          className="mx-auto max-w-3xl px-4 pb-14 md:pb-20"
        >
          <h2 className={`${serif.className} text-2xl font-semibold`}>
            Diğer hizmetlerimiz
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {otherServices.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/hizmetler/${item.slug}`}
                  className="inline-flex rounded-full border border-[#2C1A1D]/15 bg-white px-4 py-2 text-sm font-medium transition-colors hover:border-[#8D6E63] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2C1A1D]"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </SiteShell>
  );
}
