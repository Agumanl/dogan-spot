import { defineArrayMember, defineField, defineType } from "sanity";
import { HtmlImportInput } from "../components/HtmlImportInput";
import { articleBlock } from "./articleBlock";
import { turkishSlugify } from "./slugify";

// Bu değerler, sitedeki types/product.ts içindeki CONDITIONS ile birebir aynı olmalı.
const CONDITION_LIST = [
  { title: "Sıfır / Kutulu", value: "Sıfır / Kutulu" },
  { title: "Sıfır Ayarında", value: "Sıfır Ayarında" },
  { title: "İkinci El - Temiz", value: "İkinci El - Temiz" },
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
      options: { source: "title", maxLength: 96, slugify: turkishSlugify },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Kategori",
      type: "reference",
      to: [{ type: "category" }],
      // Yalnızca "Ürünler" türündeki kategoriler seçilebilir
      options: { filter: 'categoryType == "product"' },
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
      name: "price",
      title: "Fiyat (₺)",
      type: "number",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "oldPrice",
      title: "Eski Fiyat (₺)",
      type: "number",
      description:
        "İsteğe bağlı. Doluysa üstü çizili eski fiyat ve indirim yüzdesi görünür.",
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
      name: "description",
      title: "Kısa Açıklama",
      type: "text",
      rows: 6,
      description:
        "Düz metin. Ürün kartlarında ve Google sonuçlarında görünür. Kusurlar, ölçüler ve kullanım izlerini açıkça yazın. Başlıklı uzun metin için aşağıdaki 'Detaylı İçerik' alanını kullanın.",
      validation: (rule) => rule.required().min(10).max(1500),
    }),
    defineField({
      name: "content",
      title: "Detaylı İçerik",
      type: "array",
      description:
        "İsteğe bağlı. Ürün sayfasında açıklamanın altında görünen zengin metin. Başlıklar için H2/H3, ayrıca liste, kalın ve bağlantı kullanabilirsiniz. Hazır HTML kodunuz varsa sağ üstteki 'HTML kodundan içe aktar' düğmesini kullanın.",
      // Düzenleyicinin üstüne HTML'den içe aktarma düğmesi ekler
      components: { input: HtmlImportInput },
      of: [articleBlock],
    }),
    defineField({
      name: "mainImage",
      title: "Ana Görsel",
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
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Galeri",
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
            }),
          ],
        }),
      ],
      options: { layout: "grid" },
      description: "İsteğe bağlı ek fotoğraflar (en fazla 8).",
      validation: (rule) => rule.max(8),
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
      categoryTitle: "category.title",
      media: "mainImage",
    },
    prepare({ title, price, condition, categoryTitle, media }) {
      const priceText =
        typeof price === "number"
          ? `${price.toLocaleString("tr-TR")} ₺`
          : "Fiyat girilmemiş";
      return {
        title,
        subtitle: [categoryTitle, condition, priceText]
          .filter(Boolean)
          .join(" · "),
        media,
      };
    },
  },
});
