import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { SiteShell } from "@/components/SiteShell";
import { serif } from "@/lib/fonts";
import { getServiceIcon } from "@/lib/service-icons";
import { SITE_NAME, SITE_URL, WHATSAPP_NUMBER } from "@/lib/site";
import { getServices } from "@/sanity/lib/queries";
import type { ServiceSummary } from "@/types/service";

const TITLE = `Hizmetlerimiz | Ankara Eşya Alımı ve Ekspertiz | ${SITE_NAME}`;
const DESCRIPTION =
  "Doğan Spot'un Ankara'da sunduğu ikinci el eşya alımı, ekspertiz ve nakliye hizmetleri. Hizmetlerimizin ayrıntılarını inceleyin, WhatsApp'tan bilgi alın.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/hizmetler` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/hizmetler`,
    siteName: SITE_NAME,
    locale: "tr_TR",
    type: "website",
  },
};

const GENERAL_WHATSAPP = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Merhaba, hizmetleriniz hakkında bilgi almak istiyorum.",
)}`;

export default async function ServicesPage() {
  let services: ServiceSummary[] = [];
  let loadFailed = false;

  try {
    services = await getServices();
  } catch (error) {
    console.error("Hizmetler alınamadı:", error);
    loadFailed = true;
  }

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
                Hizmetler
              </li>
            </ol>
          </nav>

          <h1
            className={`${serif.className} mt-6 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl`}
          >
            Hizmetlerimiz
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#F5EBE0]/80 sm:text-lg">
            Ankara&apos;da eşyanızı satmak, değerini öğrenmek ya da taşımak
            istediğinizde yanınızdayız. Hizmetlerimizin ayrıntılarını aşağıdan
            inceleyebilirsiniz.
          </p>
        </div>
      </section>

      {/* Hizmet kartları */}
      <section
        aria-labelledby="neler-yapariz"
        className="mx-auto max-w-6xl px-4 py-12 md:py-16"
      >
        <h2
          id="neler-yapariz"
          className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8D6E63]"
        >
          Neler yaparız?
        </h2>

        {services.length > 0 ? (
          <ul className="mt-6 grid gap-4 md:grid-cols-2 md:gap-5">
            {services.map((service) => {
              const Icon = getServiceIcon(service.slug);
              return (
                <li key={service.id}>
                  <Link
                    href={`/hizmetler/${service.slug}`}
                    className="group flex h-full items-start gap-4 rounded-2xl border border-[#2C1A1D]/10 bg-white p-5 transition-colors hover:border-[#2C1A1D] hover:bg-[#2C1A1D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2C1A1D] sm:p-6"
                  >
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#8D6E63] bg-[#F5EBE0] transition-colors group-hover:bg-[#3A2428]">
                      <Icon
                        className="h-7 w-7 text-[#8D6E63] transition-colors group-hover:text-[#D7BBA8]"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className={`${serif.className} block text-xl font-semibold leading-snug text-[#2C1A1D] transition-colors group-hover:text-[#F5EBE0]`}
                      >
                        {service.title}
                      </span>
                      <span className="mt-2 line-clamp-3 block text-sm leading-relaxed text-[#2C1A1D]/70 transition-colors group-hover:text-[#F5EBE0]/75">
                        {service.summary}
                      </span>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#8D6E63] transition-colors group-hover:text-[#D7BBA8]">
                        Detayları oku
                        <ArrowRight
                          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="mt-6 rounded-2xl border border-dashed border-[#2C1A1D]/25 bg-white px-6 py-14 text-center">
            <p className={`${serif.className} text-2xl font-semibold`}>
              {loadFailed
                ? "Hizmetler şu an yüklenemedi"
                : "Hizmetler yakında burada"}
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm text-[#2C1A1D]/70">
              {loadFailed
                ? "Lütfen sayfayı birkaç dakika sonra yenileyin."
                : "Hizmetlerimizin ayrıntıları hazırlanıyor. Bu sırada WhatsApp'tan bize ulaşabilirsiniz."}
            </p>
          </div>
        )}
      </section>

      {/* Alt çağrı bandı */}
      <section className="mx-auto max-w-6xl px-4 pb-14 md:pb-20">
        <div className="rounded-3xl bg-[#2C1A1D] px-6 py-10 text-center text-[#F5EBE0] sm:px-10 md:py-12">
          <h2
            className={`${serif.className} text-3xl font-semibold tracking-tight`}
          >
            Eşyanız için fiyat teklifi alın
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[#F5EBE0]/75">
            Fotoğrafları WhatsApp&apos;tan gönderin, size dönüş yapalım.
          </p>
          <a
            href={GENERAL_WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2.5 rounded-xl bg-[#F5EBE0] px-7 py-3.5 text-base font-semibold text-[#2C1A1D] transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F5EBE0]"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            WhatsApp ile Ulaşın
          </a>
        </div>
      </section>
    </SiteShell>
  );
}
