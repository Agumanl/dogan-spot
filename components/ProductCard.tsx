"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/types/product";
import { conditionBadgeClass } from "@/lib/condition";
import { formatPrice } from "@/lib/format";
import { getProductImages } from "@/lib/product-images";
import { WHATSAPP_NUMBER } from "@/lib/site";
import { productImageUrl } from "@/sanity/lib/image";

// Kartta 4:3 oran kullanılır. Üç farklı genişlikte görsel üretilir (srcSet).
const IMAGE_WIDTHS = [480, 800, 1200] as const;
const ratioHeight = (w: number) => Math.round((w * 3) / 4);

function buildWhatsAppLink(product: Product) {
  const message = `Merhaba, "${product.title}" (${formatPrice(
    product.price,
  )}) ürünü hakkında bilgi almak istiyorum. Hâlâ satışta mı?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [imageFailed, setImageFailed] = useState(false);

  const cover = getProductImages(product)[0];
  const showImage = Boolean(cover) && !imageFailed;

  const imageSrc = cover ? productImageUrl(cover, 800, ratioHeight(800)) : "";
  const imageSrcSet = cover
    ? IMAGE_WIDTHS.map(
        (w) => `${productImageUrl(cover, w, ratioHeight(w))} ${w}w`,
      ).join(", ")
    : undefined;

  const discount =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round((1 - product.price / product.oldPrice) * 100)
      : null;

  const meta = [product.brand, product.age].filter(Boolean).join(", ");
  const categoryTitle = product.category?.title;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#2C1A1D]/10 bg-white transition-shadow hover:shadow-[0_12px_32px_-16px_rgba(44,26,29,0.4)] focus-within:shadow-[0_12px_32px_-16px_rgba(44,26,29,0.4)]">
      {/* Görsel */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#F5EBE0]">
        {showImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageSrc}
            srcSet={imageSrcSet}
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 100vw"
            alt={cover?.alt || `${product.title}, ${product.condition.toLowerCase()}`}
            width={800}
            height={600}
            loading="lazy"
            decoding="async"
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        ) : (
          <div
            className="flex h-full w-full flex-col items-center justify-center gap-2 text-[#2C1A1D]/55"
            role="img"
            aria-label="Görsel yok"
          >
            <span className="text-5xl" aria-hidden="true">
              📦
            </span>
            <span className="text-xs font-medium">Görsel yakında</span>
          </div>
        )}

        <span
          className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${conditionBadgeClass(product.condition)}`}
        >
          {product.condition}
        </span>
      </div>

      {/* İçerik */}
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-medium text-[#2C1A1D]/55">
          {categoryTitle}
          {categoryTitle && meta && " · "}
          {meta}
        </p>

        <h3 className="mt-1 text-base font-semibold leading-snug text-[#2C1A1D]">
          {/* after:inset-0 ile kartın tamamı bu bağlantıya tıklanabilir olur */}
          <Link
            href={`/urun/${product.slug}`}
            className="after:absolute after:inset-0 after:content-[''] hover:underline"
          >
            {product.title}
          </Link>
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#2C1A1D]/70">
          {product.description}
        </p>

        {/* Fiyat etiketi */}
        <div className="mt-auto pt-5">
          <div className="flex items-end justify-between gap-3">
            <div className="relative inline-flex items-center rounded-md rounded-l-xl bg-[#2C1A1D] py-1.5 pl-6 pr-3 text-[#F5EBE0]">
              <span
                aria-hidden="true"
                className="absolute left-2.5 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#F5EBE0]"
              />
              <span className="text-lg font-bold tabular-nums">
                {formatPrice(product.price)}
              </span>
            </div>

            {product.oldPrice ? (
              <div className="text-right">
                <span className="block text-sm tabular-nums text-[#2C1A1D]/45 line-through">
                  {formatPrice(product.oldPrice)}
                </span>
                {discount !== null && (
                  <span className="text-xs font-semibold text-[#8D6E63]">
                    %{discount} indirim
                  </span>
                )}
              </div>
            ) : null}
          </div>

          <a
            href={buildWhatsAppLink(product)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${product.title} için WhatsApp'tan bilgi al`}
            className="relative z-10 mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#16A34A] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#128A3E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16A34A]"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 fill-current"
              aria-hidden="true"
            >
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.55-3.7 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.16-.48-.29Z" />
            </svg>
            WhatsApp&apos;tan Sor
          </a>
        </div>
      </div>
    </article>
  );
}
