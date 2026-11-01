import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";
import type { ProductImage } from "@/types/product";
import { dataset, projectId } from "../env";

// Not: client.ts yerine env değerleri kullanılıyor, böylece tarayıcı paketine
// next-sanity istemcisi girmez. Bu dosya istemci bileşenlerinde de güvenle kullanılabilir.
const builder = createImageUrlBuilder({ projectId, dataset });

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/**
 * Ürün kartları için kırpılmış, optimize görsel adresi üretir.
 * Studio'da seçilen hotspot/crop değerlerini otomatik uygular.
 */
export function productImageUrl(
  image: ProductImage,
  width: number,
  height: number,
) {
  return urlFor(image as unknown as SanityImageSource)
    .width(width)
    .height(height)
    .fit("crop")
    .auto("format")
    .quality(80)
    .url();
}
