import { Banknote, Camera, Truck, type LucideIcon } from "lucide-react";
import { Cormorant_Garamond } from "next/font/google";
import { WHATSAPP_NUMBER } from "@/lib/site";

const heading = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  display: "swap",
});

interface Step {
  icon: LucideIcon;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    icon: Camera,
    title: "WhatsApp'tan Fotoğraf Gönder",
    description:
      "Satmak istediğiniz ikinci el eşyaların fotoğraflarını WhatsApp üzerinden bize kolayca ulaştırın.",
  },
  {
    icon: Banknote,
    title: "Teklifimizi Alın",
    description:
      "Eşyalarınızı inceleyip en adil ve en iyi fiyat teklifimizi kısa sürede iletelim.",
  },
  {
    icon: Truck,
    title: "Kapınızdan Teslim Alalım",
    description:
      "Anlaşmamız durumunda adresinize gelip eşyalarınızı yerinde teslim alalım, ödemenizi anında nakit/EFT yapalım.",
  },
];

const SELL_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Merhaba, satmak istediğim eşyaların fotoğraflarını göndermek istiyorum.",
)}`;

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6 fill-current"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.55-3.7 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.16-.48-.29Z" />
    </svg>
  );
}

export function SellSteps() {
  return (
    <section
      id="sat"
      aria-labelledby="sat-baslik"
      className="scroll-mt-24 bg-[#2C1A1D] text-[#F5EBE0]"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        {/* Başlık */}
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="sat-baslik"
            className={`${heading.className} text-4xl font-semibold leading-tight tracking-tight sm:text-5xl`}
          >
            Eşyanızı Nasıl Satabilirsiniz?
          </h2>
          <p className="mt-4 text-lg text-[#D7BBA8]">
            3 adımda eşyanızı satın alalım.
          </p>
        </div>

        {/* Adımlar */}
        <ol className="relative mt-14 grid gap-12 md:grid-cols-3 md:gap-8">
          {/* Masaüstünde halkaları birbirine bağlayan çizgi */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-[16.67%] right-[16.67%] top-10 hidden border-t border-dashed border-[#8D6E63]/60 md:block"
          />

          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <li
                key={step.title}
                className="relative flex flex-col items-center text-center"
              >
                <div className="relative">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#8D6E63] bg-[#3A2428]">
                    <Icon
                      className="h-8 w-8 text-[#D7BBA8]"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </div>
                  <span
                    aria-hidden="true"
                    className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#F5EBE0] text-sm font-semibold text-[#2C1A1D]"
                  >
                    {index + 1}
                  </span>
                </div>

                <h3
                  className={`${heading.className} mt-6 text-2xl font-semibold leading-snug`}
                >
                  <span className="sr-only">{index + 1}. adım: </span>
                  {step.title}
                </h3>
                <p className="mt-3 max-w-xs leading-relaxed text-[#F5EBE0]/75">
                  {step.description}
                </p>
              </li>
            );
          })}
        </ol>

        {/* Çağrı butonu */}
        <div className="mt-14 flex flex-col items-center text-center">
          <a
            href={SELL_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#F5EBE0] px-8 py-5 text-lg font-semibold text-[#2C1A1D] shadow-[0_18px_40px_-18px_rgba(0,0,0,0.7)] transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F5EBE0] sm:px-10 sm:text-xl"
          >
            <WhatsAppIcon />
            Eşyanı Satmak İçin Fotoğraf Gönder
          </a>
          <p className="mt-4 text-sm text-[#F5EBE0]/60">
            Fotoğraf göndermek sizi bir şeye bağlamaz.
          </p>
        </div>
      </div>
    </section>
  );
}
