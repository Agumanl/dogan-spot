// sanity/lib/queries.ts
import { client } from './client'

export async function getCategories() {
  return client.fetch(`*[_type == "category"]{ _id, title, "slug": slug.current, description, "image": image.asset->url, categoryType }`)
}

export async function getCategoryBySlug(slug: string) {
  return client.fetch(`*[_type == "category" && slug.current == $slug][0]{ _id, title, "slug": slug.current, description, "image": image.asset->url, categoryType }`, { slug })
}

export async function getCategorySlugs() {
  return client.fetch(`*[_type == "category"]{ "slug": slug.current }`)
}

export async function getProductsByCategorySlug(slug: string) {
  return client.fetch(`*[_type == "product" && references(*[_type == "category" && slug.current == $slug]._id)]{ _id, title, "slug": slug.current, price, condition, "imageUrl": mainImage.asset->url }`, { slug })
}

export async function getProductBySlug(slug: string) {
  return client.fetch(`*[_type == "product" && slug.current == $slug][0]{ _id, title, "slug": slug.current, price, condition, description, "imageUrl": mainImage.asset->url }`, { slug })
}

export async function getProductSlugs() {
  return client.fetch(`*[_type == "product"]{ "slug": slug.current }`)
}

export async function getProducts() {
  return client.fetch(`*[_type == "product"]{ _id, title, "slug": slug.current, price, condition, "imageUrl": mainImage.asset->url }`)
}

export async function getSitemapData() {
  const products = await client.fetch(`*[_type == "product"]{ "slug": slug.current, _updatedAt }`)
  const categories = await client.fetch(`*[_type == "category"]{ "slug": slug.current, _updatedAt }`)
  return { products, categories }
}