/** Ülke kodu ile başlayan, boşluksuz numara. Örn: 90 555 000 00 00 */
export const WHATSAPP_NUMBER = "905550000000";

export const SITE_NAME = "Doğan Spot";

/**
 * Sitenin canlı adresi (sonunda / olmadan). WhatsApp mesajındaki ürün linki,
 * canonical ve sosyal medya önizlemeleri için kullanılır.
 * Varsayılan canlı adrestir. Farklı bir adres için NEXT_PUBLIC_SITE_URL tanımlayın.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://spotcudogan.com"
).replace(/\/$/, "");
