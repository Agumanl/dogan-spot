import { defineField, defineType } from "sanity";
import { turkishSlugify } from "./slugify";

export const categoryType = defineType({
  name: "category",
  title: "Kategori",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Başlık",
      type: "string",
      description: "Örn: Beyaz Eşya, Adresten Nakit Eşya Alımı",
      validation: (rule) => rule.required().min(2).max(80),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      description: "Sitedeki adres: /kategori/slug. 'Generate' düğmesine basın.",
      options: { source: "title", maxLength: 96, slugify: turkishSlugify },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "categoryType",
      title: "Kategori Türü",
      type: "string",
      options: {
        list: [
          { title: "Ürünler (satılık ürün kategorisi)", value: "product" },
          { title: "Hizmetler (alım & ekspertiz)", value: "service" },
        ],
        layout: "radio",
      },
      initialValue: "product",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Açıklama",
      type: "text",
      rows: 5,
      description:
        "Kategori sayfasında ve Google sonuçlarında görünür. Birkaç cümleyle anlatın.",
      validation: (rule) => rule.required().min(20).max(1200),
    }),
    defineField({
      name: "image",
      title: "Görsel",
      type: "image",
      options: { hotspot: true },
      description: "İsteğe bağlı. Ana sayfadaki kategori kutusunda görünür.",
      fields: [
        defineField({
          name: "alt",
          title: "Alternatif metin",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "order",
      title: "Sıra",
      type: "number",
      description: "İsteğe bağlı. Küçük sayı önce görünür (1, 2, 3...).",
      validation: (rule) => rule.min(0).integer(),
    }),
  ],

  orderings: [
    {
      title: "Sıraya göre",
      name: "orderAsc",
      by: [
        { field: "order", direction: "asc" },
        { field: "title", direction: "asc" },
      ],
    },
  ],

  preview: {
    select: {
      title: "title",
      type: "categoryType",
      media: "image",
    },
    prepare({ title, type, media }) {
      return {
        title,
        subtitle: type === "service" ? "Hizmet" : "Ürün kategorisi",
        media,
      };
    },
  },
});
