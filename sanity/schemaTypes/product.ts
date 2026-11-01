import { defineArrayMember, defineField, defineType } from "sanity";

// Bu değerler, sitedeki types/product.ts ile birebir aynı olmalı.
const CATEGORY_LIST = [
  { title: "Mobilya", value: "Mobilya" },
  { title: "Beyaz Eşya", value: "Beyaz Eşya" },
  { title: "Elektronik", value: "Elektronik" },
  { title: "Ev & Mutfak", value: "Ev & Mutfak" },
];

const CONDITION_LIST = [
  { title: "Sıfır Ayarında", value: "Sıfır Ayarında" },
  { title: "Çok İyi Durumda", value: "Çok İyi Durumda" },
  { title: "İyi Durumda", value: "İyi Durumda" },
  { title: "Orta Durumda", value: "Orta Durumda" },
];

export const productType = defineType({
  name: "product",
  title: "Ürün",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Başlık",
      type: "string",
      description: "Örn: Üçlü Kadife Koltuk Takımı (3+3+1)",
      validation: (rule) => rule.required().min(3).max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      description: "Başlıktan otomatik üretilir. 'Generate' düğmesine basın.",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "price",
      title: "Fiyat (₺)",
      type: "number",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "oldPrice",
      title: "Eski Fiyat (₺)",
      type: "number",
      description: "İsteğe bağlı. Doluysa kartta üstü çizili eski fiyat ve indirim yüzdesi görünür.",
      validation: (rule) =>
        rule.min(0).custom((value, context) => {
          const price = (context.document as { price?: number } | undefined)
            ?.price;
          if (
            typeof value === "number" &&
            typeof price === "number" &&
            value <= price
          ) {
            return "Eski fiyat, güncel fiyattan yüksek olmalı.";
          }
          return true;
        }),
    }),
    defineField({
      name: "category",
      title: "Kategori",
      type: "string",
      options: { list: CATEGORY_LIST },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "condition",
      title: "Durum",
      type: "string",
      options: { list: CONDITION_LIST, layout: "radio" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "brand",
      title: "Marka",
      type: "string",
      description: "İsteğe bağlı. Örn: Arçelik, Bosch",
    }),
    defineField({
      name: "age",
      title: "Ürün Yaşı",
      type: "string",
      description: "İsteğe bağlı. Örn: 2 yıllık",
    }),
    defineField({
      name: "description",
      title: "Açıklama",
      type: "text",
      rows: 4,
      description: "Kusurlar, ölçüler ve kullanım izlerini açıkça yazın.",
      validation: (rule) => rule.required().min(10).max(500),
    }),
    defineField({
      name: "images",
      title: "Ürün Fotoğrafları",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alternatif metin",
              type: "string",
              description: "Görseli kısaca tarif edin (erişilebilirlik ve SEO için).",
            }),
          ],
        }),
      ],
      options: { layout: "grid" },
      description: "İlk fotoğraf kapak görseli olarak kullanılır.",
      validation: (rule) => rule.required().min(1).max(10),
    }),
  ],

  orderings: [
    {
      title: "En yeni",
      name: "newest",
      by: [{ field: "_createdAt", direction: "desc" }],
    },
    {
      title: "Fiyat (düşükten yükseğe)",
      name: "priceAsc",
      by: [{ field: "price", direction: "asc" }],
    },
  ],

  preview: {
    select: {
      title: "title",
      price: "price",
      condition: "condition",
      media: "images.0",
    },
    prepare({ title, price, condition, media }) {
      const priceText =
        typeof price === "number"
          ? `${price.toLocaleString("tr-TR")} ₺`
          : "Fiyat girilmemiş";
      return {
        title,
        subtitle: [condition, priceText].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});
