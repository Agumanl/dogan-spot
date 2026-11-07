import { defineArrayMember, defineField, defineType } from "sanity";
import { turkishSlugify } from "./slugify";

export const serviceType = defineType({
  name: "service",
  title: "Hizmet",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Başlık",
      type: "string",
      description: "Örn: Adresten Nakit Eşya Alımı",
      validation: (rule) => rule.required().min(3).max(100),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      description: "Sitedeki adres: /hizmetler/slug. 'Generate' düğmesine basın.",
      options: { source: "title", maxLength: 96, slugify: turkishSlugify },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Kısa Özet",
      type: "text",
      rows: 3,
      description: "Hizmetler listesindeki kartta görünür (1-2 cümle).",
      validation: (rule) => rule.required().min(20).max(300),
    }),
    defineField({
      name: "content",
      title: "İçerik (Makale)",
      type: "array",
      description:
        "Hizmet sayfasındaki detaylı SEO metni. Başlıklar için H2/H3 kullanın.",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Başlık 2", value: "h2" },
            { title: "Başlık 3", value: "h3" },
            { title: "Alıntı", value: "blockquote" },
          ],
          lists: [
            { title: "Madde işaretli", value: "bullet" },
            { title: "Numaralı", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Kalın", value: "strong" },
              { title: "İtalik", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Bağlantı",
                fields: [
                  defineField({
                    name: "href",
                    type: "url",
                    title: "Adres",
                    validation: (rule) =>
                      rule.uri({
                        allowRelative: true,
                        scheme: ["http", "https", "tel", "mailto"],
                      }),
                  }),
                ],
              },
            ],
          },
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Başlığı",
      type: "string",
      description:
        "Google'da görünen başlık. Boş bırakılırsa 'Hizmet Adı Ankara | Doğan Spot' kullanılır. İdeal: 60 karakter.",
      validation: (rule) =>
        rule.max(70).warning("60-70 karakteri aşan başlıklar Google'da kesilir."),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Açıklaması",
      type: "text",
      rows: 3,
      description:
        "Google'da başlığın altında görünen açıklama. Boş bırakılırsa kısa özet kullanılır. İdeal: 150-160 karakter.",
      validation: (rule) =>
        rule.max(170).warning("160 karakteri aşan açıklamalar Google'da kesilir."),
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
    select: { title: "title", subtitle: "summary" },
  },
});
