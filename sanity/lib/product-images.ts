// lib/product-images.ts
export function getProductImages(product: any): string[] {
  const images: string[] = []
  if (product?.imageUrl) images.push(product.imageUrl)
  if (product?.mainImage?.asset?.url) images.push(product.mainImage.asset.url)
  if (Array.isArray(product?.gallery)) {
    product.gallery.forEach((img: any) => {
      if (typeof img === 'string') images.push(img)
      else if (img?.asset?.url) images.push(img.asset.url)
    })
  }
  return images.length > 0 ? images : ['/placeholder.jpg']
}