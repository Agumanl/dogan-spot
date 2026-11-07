import { MessageCircle } from "lucide-react";
import { serif } from "@/lib/fonts";
import { WHATSAPP_NUMBER } from "@/lib/site";

// Ankara'nın 25 ilçesi (yerel SEO için sayfada metin olarak yer alır).
const DISTRICTS = [
  "Çankaya",
  "Yenimahalle",
  "Keçiören",
  "Mamak",
  "Etimesgut",
  "Sincan",
  "Altındağ",
  "Pursaklar",
  "Gölbaşı",
  "Polatlı",
  "Kahramankazan",
  "Akyurt",
  "Elmadağ",
  "Çubuk",
  "Beypazarı",
  "Kızılcahamam",
  "Ayaş",
  "Bala",
  "Haymana",
  "Kalecik",
  "Şereflikoçhisar",
  "Nallıhan",
  "Güdül",
  "Çamlıdere",
  "Evren",
];

const PRINCIPLES = [
  {
    term: "Aynı gün adresten alım",
    desc: "Ankara'nın tüm ilçelerinde aynı gün adresinize gelir, eşyalarınızı yerinde görürüz.",
  },
  {
    term: "Değerinde ekspertiz",
    desc: "Eşyanın markasına, yaşına ve durumuna bakar, piyasa değerine uygun teklif veririz.",
  },
  {
    term: "Kapıda ödeme",
    desc: "Anlaştığımızda ödemenizi kapınızda, nakit ya da EFT ile hemen yaparız.",
  },
  {
    term: "Dürüst ticaret",
    desc: "Satarken kusurları saklamaz, alırken eşyanızın değerini düşük göstermeyiz.",
  },
];

const OFFER_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Merhaba, satmak istediğim eşyalar için adresten ekspertiz ve fiyat teklifi almak istiyorum.",
)}`;

export function About() {
  return (
    <section
      id="hakkimizda"
      aria-labelledby="hakkimizda-baslik"
      className="scroll-mt-24 bg-[#F5EBE0]"
    >
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:gap-14">
          <div>
            <h2
              id="hakkimizda-baslik"
              className={`${serif.className} text-3xl font-semibold tracking-tight sm:text-4xl`}
            >
              Hakkımızda
            </h2>
            <p className="mt-2 text-lg font-medium text-[#8D6E63]">
              Ankara&apos;da ikinci el eşya alım satım
            </p>

            <div className="mt-5 space-y-4 leading-relaxed text-[#2C1A1D]/80">
              <p>
                Doğan Spot, Ankara&apos;da kullanılmış ev eşyasına ikinci bir
                hayat veren bir spot mağazasıdır. Beyaz eşya, mobilya,
                televizyon, halı ve büro eşyasında hem satış yapıyor hem de
                kullanmadığınız eşyaları adresinizden nakit olarak satın
                alıyoruz.
              </p>
              <p>
                Ankara&apos;nın tüm ilçelerine, Çankaya, Yenimahalle, Keçiören,
                Mamak, Etimesgut ve Sincan başta olmak üzere aynı gün adresinize
                geliyoruz. Eşyalarınızı yerinde değerinde ekspertiz ile
                inceliyor, anlaştığımızda ödemeyi kapıda yapıyoruz.
              </p>
              <p>
                Evinizi taşıyor, yeniliyor ya da boşaltıyorsanız komple ev
                eşyasını tek seferde alabiliriz. Nakliye ve ekspertiz için ücret
                istemiyoruz.
              </p>
            </div>

            <a
              href={OFFER_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2.5 rounded-xl bg-[#2C1A1D] px-6 py-3.5 text-base font-semibold text-[#F5EBE0] transition-colors hover:bg-[#3E2723] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2C1A1D]"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Eşyanız İçin Teklif Alın
            </a>
          </div>

          <dl className="divide-y divide-[#2C1A1D]/15 border-y border-[#2C1A1D]/15 md:self-start">
            {PRINCIPLES.map((item) => (
              <div
                key={item.term}
                className="grid gap-1 py-5 sm:grid-cols-[11rem_1fr] sm:gap-6"
              >
                <dt className={`${serif.className} text-lg font-semibold`}>
                  {item.term}
                </dt>
                <dd className="text-[#2C1A1D]/75">{item.desc}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Hizmet verilen ilçeler */}
        <div className="mt-12 border-t border-[#2C1A1D]/15 pt-10">
          <h3 className={`${serif.className} text-2xl font-semibold`}>
            Ankara&apos;da hizmet verdiğimiz ilçeler
          </h3>
          <ul className="mt-5 flex flex-wrap gap-2">
            {DISTRICTS.map((district) => (
              <li
                key={district}
                className="rounded-full border border-[#2C1A1D]/15 bg-[#FDFBF7] px-3.5 py-1.5 text-sm font-medium"
              >
                {district}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
