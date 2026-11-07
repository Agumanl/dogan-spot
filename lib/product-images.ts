import type { Product, ProductImage } from "@/types/product";

/** Ana görsel + galeri, sırayla. Görseli (asset) olmayanlar elenir. */
export function getProductImages(
  product: Pick<Product, "mainImage" | "gallery">,
): ProductImage[] {
  return [product.mainImage, ...(product.gallery ?? [])].filter(
    (image): image is ProductImage => Boolean(image?.asset),
  );
}
