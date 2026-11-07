import { serif } from "@/lib/fonts";
import { WHATSAPP_NUMBER } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer id="iletisim" className="scroll-mt-20 bg-[#2C1A1D] text-[#F5EBE0]">
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
  );
}
