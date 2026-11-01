import { Banknote, Star, Truck, type LucideIcon } from "lucide-react";
import { Fraunces } from "next/font/google";
import { WHATSAPP_NUMBER } from "@/lib/site";

const serif = Fraunces({
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

// Arka plan görseli. Kendi görselinizi kullanmak için:
// 1) dosyayı public/images/bg-hero.jpg olarak kaydedin,
// 2) aşağıdaki HERO_IMAGE değerini "/images/bg-hero.jpg" yapın ve
// 3) HERO_SRCSET değerini undefined yapın.
const HERO_IMAGE_BASE =
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc";
const HERO_IMAGE = `${HERO_IMAGE_BASE}?q=80&auto=format&fit=crop&w=1920`;
const HERO_SRCSET: string | undefined = [960, 1440, 1920]
  .map((w) => `${HERO_IMAGE_BASE}?q=80&auto=format&fit=crop&w=${w} ${w}w`)
  .join(", ");

const SELL_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Merhaba, satmak istediğim eşyalar için fiyat teklifi almak istiyorum.",
)}`;

interface TrustBadge {
  icon: LucideIcon;
  label: string;
}

const TRUST_BADGES: TrustBadge[] = [
  { icon: Truck, label: "Ücretsiz / Hızlı Nakliye" },
  { icon: Banknote, label: "Kapıda Anında Nakit" },
  { icon: Star, label: "%100 Müşteri Memnuniyeti" },
];

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F5EBE0]";

export function HeroBanner() {
  return (
    <section
      aria-labelledby="hero-baslik"
      className="relative isolate overflow-hidden bg-[#2C1A1D] text-[#F5EBE0]"
    >
      {/* Arka plan görseli (dekoratif) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={HERO_IMAGE}
        srcSet={HERO_SRCSET}
        sizes="100vw"
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      {/* Koyu kahve karartma katmanı: yazıların okunaklı kalmasını sağlar */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[#2C1A1D]/85"
      />

      <div className="mx-auto max-w-6xl px-4 pb-10 pt-16 md:pb-14 md:pt-24 lg:pt-28">
        <div className="max-w-3xl">
          <h1
            id="hero-baslik"
            className={`${serif.className} text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl`}
          >
            İkinci El Eşyada Güvenilir Adres:{" "}
            <span className="block text-[#D7BBA8]">Doğan Spot</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-[#F5EBE0]/85 sm:text-lg">
            Ankara&apos;da mobilya, beyaz eşya ve elektronikte en adil
            fiyatlar. Eşya alın veya eski eşyalarınızı anında nakde çevirin.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#urunler"
              className={`rounded-xl bg-[#F5EBE0] px-6 py-3.5 text-base font-semibold text-[#2C1A1D] transition-colors hover:bg-white ${focusRing}`}
            >
              Ürünleri İncele
            </a>

            <a
              href={SELL_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2.5 rounded-xl bg-[#8D6E63] py-3.5 pl-4 pr-6 text-base font-semibold text-white transition-colors hover:bg-[#7B5E54] ${focusRing}`}
            >
              {/* Krem zemin üzerinde yeşil WhatsApp ikonu: kahve zeminde okunur kalır */}
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F5EBE0]">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-[#16A34A]"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.55-3.7 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.16-.48-.29Z" />
                </svg>
              </span>
              Eşyanı Sat (WhatsApp)
            </a>
          </div>
        </div>

        {/* Güven rozetleri: cam efektli */}
        <ul className="mt-12 grid gap-3 sm:grid-cols-3 md:mt-16">
          {TRUST_BADGES.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex items-center gap-3 rounded-2xl border border-[#F5EBE0]/20 bg-[#F5EBE0]/10 px-4 py-3.5 backdrop-blur-md"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#8D6E63] bg-[#2C1A1D]/60">
                <Icon
                  className="h-5 w-5 text-[#D7BBA8]"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </span>
              <span className="text-sm font-semibold leading-snug text-[#F5EBE0] sm:text-base">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
