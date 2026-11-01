import { Fraunces, Figtree } from "next/font/google";
import { Header } from "@/components/Header";
import { HeroBanner } from "@/components/HeroBanner";
import { Catalog } from "@/components/Catalog";
import { SellSteps } from "@/components/SellSteps";
import { WHATSAPP_NUMBER } from "@/lib/site";
import { getProducts } from "@/sanity/lib/queries";
import type { Product } from "@/types/product";

const serif = Fraunces({
  subsets: ["latin", "latin-ext"],
  display: "swap",
});
const sans = Figtree({
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

// Bu dosya artık bir sunucu bileşeni ("use client" yok):
// ürünler sunucuda Sanity'den çekilir, böylece HTML içinde hazır gelir (SEO için iyi).
export default async function HomePage() {
  let products: Product[] = [];
  let loadFailed = false;

  try {
    products = await getProducts();
  } catch (error) {
    console.error("Sanity ürünleri alınamadı:", error);
    loadFailed = true;
  }

  return (
    <div
      className={`${sans.className} min-h-screen bg-[#FDFBF7] text-[#2C1A1D] antialiased`}
    >
      <Header />

      <main>
        {/* ───────── Hero ───────── */}
        <HeroBanner />

        {/* ───────── Ürünler (Sanity verisi) ───────── */}
        <Catalog products={products} loadFailed={loadFailed} />

        {/* ───────── Eşyanı Sat: 3 adım ───────── */}
        <SellSteps />

        {/* ───────── Hakkımızda ───────── */}
        <section
          id="hakkimizda"
          aria-labelledby="hakkimizda-baslik"
          className="scroll-mt-24 bg-[#F5EBE0]"
        >
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-[1fr_1.2fr] md:py-20">
            <div>
              <h2
                id="hakkimizda-baslik"
                className={`${serif.className} text-3xl font-semibold tracking-tight sm:text-4xl`}
              >
                Hakkımızda
              </h2>
              <p className="mt-4 max-w-md leading-relaxed text-[#2C1A1D]/75">
                Doğan Spot, kullanılmış ev eşyasına ikinci bir hayat veren bir
                spot mağazasıdır. Rafa yalnızca çalıştığından ve temiz
                olduğundan emin olduğumuz ürünleri koyarız.
              </p>
            </div>

            <dl className="divide-y divide-[#2C1A1D]/15 border-y border-[#2C1A1D]/15">
              {[
                {
                  term: "Test edilir",
                  desc: "Her ürün satıştan önce çalıştırılır ve kontrol edilir.",
                },
                {
                  term: "Açık anlatılır",
                  desc: "Kusurlar ve kullanım izleri ürün açıklamasında yazar.",
                },
                {
                  term: "Kolay ulaşılır",
                  desc: "Sorularınızı WhatsApp'tan yazın, size dönelim.",
                },
              ].map((item) => (
                <div
                  key={item.term}
                  className="grid gap-1 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6"
                >
                  <dt className={`${serif.className} text-lg font-semibold`}>
                    {item.term}
                  </dt>
                  <dd className="text-[#2C1A1D]/75">{item.desc}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>

      {/* ───────── İletişim / Footer ───────── */}
      <footer
        id="iletisim"
        className="scroll-mt-20 bg-[#2C1A1D] text-[#F5EBE0]"
      >
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
          <div>
            <p className={`${serif.className} text-2xl font-semibold`}>
              Doğan Spot
            </p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-[#F5EBE0]/70">
              Kontrol edilmiş ikinci el mobilya, beyaz eşya ve elektronik.
              Ürünleri yerinde görebilir, nakliyeyi bizimle ayarlayabilirsiniz.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold">Mağaza</h2>
            <address className="mt-2 text-sm not-italic leading-relaxed text-[#F5EBE0]/70">
              Örnek Mah. Sanayi Cad. No: 12
              <br />
              Çankaya / Ankara
              <br />
              Pazartesi–Cumartesi, 09.30–19.00
            </address>
          </div>

          <div>
            <h2 className="text-sm font-semibold">İletişim</h2>
            <ul className="mt-2 space-y-2 text-sm text-[#F5EBE0]/70">
              <li>
                <a
                  href="tel:+905550000000"
                  className="hover:text-[#F5EBE0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F5EBE0]"
                >
                  +90 555 000 00 00
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F5EBE0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F5EBE0]"
                >
                  WhatsApp ile yazın
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#F5EBE0]/10 py-4 text-center text-xs text-[#F5EBE0]/50">
          © 2026 Doğan Spot. Tüm hakları saklıdır.
        </div>
      </footer>
    </div>
  );
}
