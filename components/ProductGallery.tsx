"use client";

import { useState } from "react";
import { conditionBadgeClass } from "@/lib/condition";
import { productImageUrl } from "@/sanity/lib/image";
import type { ProductImage } from "@/types/product";

interface ProductGalleryProps {
  /** Ana görsel başta olacak şekilde, görseli olan fotoğraflar (getProductImages ile hazırlanır). */
  images: ProductImage[];
  title: string;
  /** Verilirse görselin sol üst köşesinde durum etiketi olarak gösterilir. */
  condition?: string;
}

export function ProductGallery({
  images,
  title,
  condition,
}: ProductGalleryProps) {
  const [active, setActive] = useState(0);

  const badge = condition ? (
    <span
      className={`absolute left-3 top-3 z-10 rounded-full px-3.5 py-1.5 text-sm font-semibold shadow-sm ${conditionBadgeClass(condition)}`}
    >
      {condition}
    </span>
  ) : null;

  if (images.length === 0) {
    return (
      <div
        className="relative flex aspect-[4/3] w-full flex-col items-center justify-center gap-2 rounded-2xl bg-[#F5EBE0] text-[#2C1A1D]/55"
        role="img"
        aria-label={`${title} için görsel yok`}
      >
        {badge}
        <span className="text-6xl" aria-hidden="true">
          📦
        </span>
        <span className="text-sm font-medium">Görsel yakında</span>
      </div>
    );
  }

  const current = images[Math.min(active, images.length - 1)];

  return (
    <div>
      <div className="relative overflow-hidden rounded-2xl bg-[#F5EBE0]">
        {badge}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={current._key ?? active}
          src={productImageUrl(current, 1200, 900)}
          alt={current.alt || `${title}, fotoğraf ${active + 1}`}
          width={1200}
          height={900}
          fetchPriority="high"
          decoding="async"
          className="aspect-[4/3] w-full object-cover"
        />
      </div>

      {images.length > 1 && (
        <ul className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-5">
          {images.map((image, index) => {
            const selected = index === active;
            return (
              <li key={image._key ?? index}>
                <button
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={`Fotoğraf ${index + 1} / ${images.length}`}
                  aria-pressed={selected}
                  className={`block w-full overflow-hidden rounded-xl border-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2C1A1D] ${
                    selected
                      ? "border-[#2C1A1D]"
                      : "border-transparent hover:border-[#8D6E63]"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={productImageUrl(image, 240, 180)}
                    alt=""
                    width={240}
                    height={180}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
