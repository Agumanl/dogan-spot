import { defineArrayMember, defineField } from "sanity";

/**
 * Makale/içerik alanlarında ortak kullanılan Portable Text bloğu.
 * Stiller: Normal, Başlık 2 (H2), Başlık 3 (H3), Alıntı.
 * Hem hizmet hem kategori şemasında kullanılır.
 */
export const articleBlock = defineArrayMember({
  type: "block",
  styles: [
    { title: "Normal", value: "normal" },
    { title: "Başlık 2 (H2)", value: "h2" },
    { title: "Başlık 3 (H3)", value: "h3" },
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
});
