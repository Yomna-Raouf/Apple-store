import type { BasketItem } from '@/types/models';

/**
 * Ensures a basket row has `lineId` and `quantity` (e.g. legacy Firestore orders).
 */
export function normalizeBasketItem(
  raw: Partial<BasketItem> &
    Pick<BasketItem, 'id' | 'title' | 'image' | 'price' | 'rating'>,
  index: number,
): BasketItem {
  const qtyRaw = raw.quantity;
  const qty =
    typeof qtyRaw === 'number' &&
    Number.isFinite(qtyRaw) &&
    qtyRaw > 0 &&
    Number.isInteger(qtyRaw)
      ? qtyRaw
      : 1;

  const lineId =
    typeof raw.lineId === 'string' && raw.lineId.length > 0
      ? raw.lineId
      : `legacy-${raw.id}-${index}`;

  return {
    lineId,
    id: raw.id,
    title: raw.title,
    image: raw.image,
    price: raw.price,
    rating: raw.rating,
    quantity: qty,
  };
}
