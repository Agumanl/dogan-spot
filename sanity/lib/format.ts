// lib/format.ts
export function formatPrice(price: number | string): string {
  if (typeof price === 'number') {
    return new Intl.NumberFormat('tr-TR').format(price) + ' TL'
  }
  return price ? `${price} TL` : 'Fiyat Belirtilmedi'
}